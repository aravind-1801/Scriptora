/**
 * SCRIPTORA Versioned Local Workspace Backup & Restore
 *
 * Exports the entire IndexedDB workspace (scripts, screenplays, versions,
 * storyboards + binary image blobs, production data, intelligence, chat history,
 * settings, profile, and notifications) as a validated JSON archive, and restores
 * it atomically back into the current browser profile's IndexedDB database.
 */

import {
  STORES,
  getAllRecords,
  getKv,
  withTransaction,
  reqToPromise,
  ensureInstallationMetadata,
  notifyWorkspaceUpdated
} from './localDatabase.js';
import { dataUrlToBlob } from './localMigration.js';

export const BACKUP_FORMAT = 'scriptora-local-workspace-backup';
export const BACKUP_SCHEMA_VERSION = 1;

export async function blobToDataUrl(blob) {
  if (!blob) return null;
  if (typeof FileReader !== 'undefined') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error || new Error('Failed to read image blob'));
      reader.readAsDataURL(blob);
    });
  }
  const buffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }
  const base64 = btoa(binary);
  return `data:${blob.type || 'application/octet-stream'};base64,${base64}`;
}

export async function exportWorkspaceBackupPayload() {
  const [
    meta,
    profile,
    settings,
    selectedScriptId,
    chatHistory,
    notifications,
    storyboardPreferences,
    scripts,
    screenplays,
    versions,
    storyboards,
    rawBlobs,
    storyboardRecycleBin,
    productionData,
    intelligence,
    allKv
  ] = await Promise.all([
    ensureInstallationMetadata(),
    getKv('profile', null),
    getKv('settings', null),
    getKv('selectedScriptId', null),
    getKv('chatHistory', []),
    getKv('notifications', []),
    getKv('storyboardPreferences', null),
    getAllRecords(STORES.SCRIPTS),
    getAllRecords(STORES.SCREENPLAYS),
    getAllRecords(STORES.VERSIONS),
    getAllRecords(STORES.STORYBOARDS),
    getAllRecords(STORES.STORYBOARD_BLOBS),
    getAllRecords(STORES.STORYBOARD_RECYCLE_BIN),
    getAllRecords(STORES.PRODUCTION),
    getAllRecords(STORES.INTELLIGENCE),
    getAllRecords(STORES.KV)
  ]);

  const encodedBlobs = [];
  for (const record of (rawBlobs || [])) {
    if (!record || !record.id || !record.blob) continue;
    const dataUrl = await blobToDataUrl(record.blob);
    if (!dataUrl) continue;
    encodedBlobs.push({
      id: record.id,
      scriptId: record.scriptId || null,
      sceneId: record.sceneId || null,
      shotId: record.shotId || null,
      mimeType: record.mimeType || record.blob.type || 'image/png',
      size: record.size || record.blob.size || 0,
      createdAt: record.createdAt || new Date().toISOString(),
      dataUrl
    });
  }

  const extraPreferences = {};
  (allKv || []).forEach((item) => {
    if (item?.key && (item.key.startsWith('pref:') || item.key.startsWith('crypto:'))) {
      extraPreferences[item.key] = item.value;
    }
  });

  return {
    format: BACKUP_FORMAT,
    version: BACKUP_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    sourceInstallationId: meta?.installationId || null,
    data: {
      profile,
      settings,
      selectedScriptId,
      chatHistory: Array.isArray(chatHistory) ? chatHistory : [],
      notifications: Array.isArray(notifications) ? notifications : [],
      storyboardPreferences,
      extraPreferences,
      scripts: Array.isArray(scripts) ? scripts : [],
      screenplays: Array.isArray(screenplays) ? screenplays : [],
      versions: Array.isArray(versions) ? versions : [],
      storyboards: Array.isArray(storyboards) ? storyboards : [],
      storyboardBlobs: encodedBlobs,
      storyboardRecycleBin: Array.isArray(storyboardRecycleBin) ? storyboardRecycleBin : [],
      productionData: Array.isArray(productionData) ? productionData : [],
      intelligence: Array.isArray(intelligence) ? intelligence : []
    }
  };
}

export function validateWorkspaceBackup(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Backup file is not a valid JSON object.');
  }
  if (payload.format !== BACKUP_FORMAT) {
    throw new Error('Unrecognized backup format. Please select a valid SCRIPTORA local workspace backup file.');
  }
  if (typeof payload.version !== 'number' || payload.version < 1 || payload.version > BACKUP_SCHEMA_VERSION) {
    throw new Error(`Unsupported backup version: ${payload.version}`);
  }
  const d = payload.data;
  if (!d || typeof d !== 'object') {
    throw new Error('Backup file is missing workspace data.');
  }
  if (!Array.isArray(d.scripts) || !Array.isArray(d.screenplays)) {
    throw new Error('Backup file has invalid scripts or screenplays collections.');
  }
  return payload;
}

export async function restoreWorkspaceBackupPayload(rawInput, { merge = false } = {}) {
  const parsed = typeof rawInput === 'string' ? JSON.parse(rawInput) : rawInput;
  const validated = validateWorkspaceBackup(parsed);
  const d = validated.data;
  const meta = await ensureInstallationMetadata();

  const decodedBlobs = [];
  for (const b of (d.storyboardBlobs || [])) {
    if (!b || !b.id || !b.dataUrl) continue;
    const blob = dataUrlToBlob(b.dataUrl);
    if (!blob) continue;
    decodedBlobs.push({
      id: b.id,
      scriptId: b.scriptId || null,
      sceneId: b.sceneId || null,
      shotId: b.shotId || null,
      mimeType: b.mimeType || blob.type || 'image/png',
      size: blob.size,
      createdAt: b.createdAt || new Date().toISOString(),
      blob
    });
  }

  const allStores = Object.values(STORES);
  await withTransaction(allStores, 'readwrite', async (stores) => {
    if (!merge) {
      await Promise.all(allStores.map((name) => reqToPromise(stores[name].clear())));
      await reqToPromise(stores[STORES.KV].put({
        key: 'meta:installation',
        value: meta,
        updatedAt: new Date().toISOString()
      }));
      await reqToPromise(stores[STORES.KV].put({
        key: 'meta:migrated_v1',
        value: { completed: true, restoredAt: new Date().toISOString() },
        updatedAt: new Date().toISOString()
      }));
    }

    const ops = [];
    const nowIso = new Date().toISOString();

    if (d.profile !== undefined) ops.push(reqToPromise(stores[STORES.KV].put({ key: 'profile', value: d.profile, updatedAt: nowIso })));
    if (d.settings !== undefined) ops.push(reqToPromise(stores[STORES.KV].put({ key: 'settings', value: d.settings, updatedAt: nowIso })));
    if (d.selectedScriptId !== undefined) ops.push(reqToPromise(stores[STORES.KV].put({ key: 'selectedScriptId', value: d.selectedScriptId, updatedAt: nowIso })));
    if (Array.isArray(d.chatHistory)) ops.push(reqToPromise(stores[STORES.KV].put({ key: 'chatHistory', value: d.chatHistory, updatedAt: nowIso })));
    if (Array.isArray(d.notifications)) ops.push(reqToPromise(stores[STORES.KV].put({ key: 'notifications', value: d.notifications, updatedAt: nowIso })));
    if (d.storyboardPreferences !== undefined) {
      ops.push(reqToPromise(stores[STORES.KV].put({ key: 'storyboardPreferences', value: d.storyboardPreferences, updatedAt: nowIso })));
    }
    if (d.extraPreferences && typeof d.extraPreferences === 'object') {
      Object.entries(d.extraPreferences).forEach(([k, v]) => {
        ops.push(reqToPromise(stores[STORES.KV].put({ key: k, value: v, updatedAt: nowIso })));
      });
    }

    const seenScripts = new Set();
    d.scripts.forEach((sc) => {
      if (sc && sc.id && !seenScripts.has(sc.id)) {
        seenScripts.add(sc.id);
        ops.push(reqToPromise(stores[STORES.SCRIPTS].put(sc)));
      }
    });

    const seenScreenplays = new Set();
    d.screenplays.forEach((sp) => {
      if (sp && sp.id && !seenScreenplays.has(sp.id)) {
        seenScreenplays.add(sp.id);
        ops.push(reqToPromise(stores[STORES.SCREENPLAYS].put(sp)));
      }
    });

    (d.versions || []).forEach((v) => {
      if (v && v.scriptId) ops.push(reqToPromise(stores[STORES.VERSIONS].put(v)));
    });

    (d.storyboards || []).forEach((sb) => {
      if (sb && sb.key) ops.push(reqToPromise(stores[STORES.STORYBOARDS].put(sb)));
    });

    decodedBlobs.forEach((blobRec) => {
      ops.push(reqToPromise(stores[STORES.STORYBOARD_BLOBS].put(blobRec)));
    });

    (d.storyboardRecycleBin || []).forEach((bin) => {
      if (bin && bin.scriptId) ops.push(reqToPromise(stores[STORES.STORYBOARD_RECYCLE_BIN].put(bin)));
    });

    (d.productionData || []).forEach((prod) => {
      if (prod && prod.scriptId) ops.push(reqToPromise(stores[STORES.PRODUCTION].put(prod)));
    });

    (d.intelligence || []).forEach((intel) => {
      if (intel && intel.scriptId) ops.push(reqToPromise(stores[STORES.INTELLIGENCE].put(intel)));
    });

    await Promise.all(ops);
  });

  notifyWorkspaceUpdated('backup-restored', {
    scripts: d.scripts.length,
    blobs: decodedBlobs.length
  });

  return {
    scriptsCount: d.scripts.length,
    screenplaysCount: d.screenplays.length,
    storyboardsCount: (d.storyboards || []).length,
    blobsCount: decodedBlobs.length
  };
}

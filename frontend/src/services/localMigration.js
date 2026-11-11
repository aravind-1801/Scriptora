/**
 * SCRIPTORA One-Time Idempotent LocalStorage -> IndexedDB Migration
 *
 * Inspects legacy localStorage keys belonging ONLY to the current browser
 * profile and migrates them cleanly into IndexedDB stores. Does NOT fetch
 * any remote/cloud data and does NOT seed mock/demo scripts or users.
 */

import {
  STORES,
  getKv,
  setKv,
  withTransaction,
  reqToPromise,
  getAllRecords
} from './localDatabase.js';

const MIGRATION_KEY = 'meta:migrated_v1';

export function dataUrlToBlob(dataUrl) {
  if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) {
    return null;
  }
  const commaIdx = dataUrl.indexOf(',');
  if (commaIdx === -1) return null;

  const header = dataUrl.slice(5, commaIdx);
  const body = dataUrl.slice(commaIdx + 1);
  const isBase64 = header.includes(';base64');
  const mimeType = (header.split(';')[0] || 'application/octet-stream').trim();

  try {
    if (isBase64) {
      const binaryStr = atob(body);
      const len = binaryStr.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }
      return new Blob([bytes], { type: mimeType });
    }
    const decoded = decodeURIComponent(body);
    return new Blob([decoded], { type: mimeType || 'image/svg+xml' });
  } catch (_) {
    return null;
  }
}

function safeJsonParse(raw) {
  if (!raw || typeof raw !== 'string') return null;
  try {
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

export async function migrateLegacyLocalStorageIfNeeded() {
  const alreadyMigrated = await getKv(MIGRATION_KEY, null);
  if (alreadyMigrated && alreadyMigrated.completed) {
    return { migrated: false, reason: 'already_completed' };
  }

  if (typeof localStorage === 'undefined') {
    await setKv(MIGRATION_KEY, { completed: true, migratedAt: new Date().toISOString(), counts: {} });
    return { migrated: false, reason: 'no_localStorage' };
  }

  // If scripts already exist in IndexedDB (e.g. partial setup), avoid overwriting newer data
  const existingScripts = await getAllRecords(STORES.SCRIPTS);
  const existingIds = new Set((existingScripts || []).map(s => s.id));

  const scriptsToPut = new Map();
  const screenplaysToPut = new Map();
  const versionsToPut = new Map();
  const storyboardsToPut = new Map();
  const blobsToPut = [];
  const productionToPut = new Map();
  const intelligenceToPut = new Map();
  const kvEntries = [];

  const getProdBucket = (scriptId) => {
    if (!productionToPut.has(scriptId)) {
      productionToPut.set(scriptId, {
        scriptId,
        workspace: {},
        scenes: [],
        breakdown: [],
        callSheets: [],
        schedule: [],
        resources: [],
        documents: [],
        proposals: [],
        readiness: null,
        audit: []
      });
    }
    return productionToPut.get(scriptId);
  };

  const getIntelBucket = (scriptId) => {
    if (!intelligenceToPut.has(scriptId)) {
      intelligenceToPut.set(scriptId, { scriptId, context: {}, analysis: null, queries: [] });
    }
    return intelligenceToPut.get(scriptId);
  };

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;
    const raw = localStorage.getItem(key);
    if (!raw) continue;

    // Normalize user-scoped keys: scriptora_u_<uid>_<suffix>
    let suffix = key;
    const userScopedMatch = key.match(/^scriptora_u_[^_]+_(.+)$/);
    if (userScopedMatch) {
      suffix = userScopedMatch[1];
    }

    if (key === 'scriptora_user') {
      const parsed = safeJsonParse(raw);
      if (parsed && typeof parsed === 'object' && parsed.id) {
        kvEntries.push({ key: 'profile', value: parsed });
      }
      continue;
    }

    if (key === 'scriptora_autosave') {
      kvEntries.push({ key: 'pref:autosave', value: raw !== 'false' });
      continue;
    }

    if (key === 'scriptora_theme') {
      kvEntries.push({ key: 'pref:theme', value: raw });
      continue;
    }

    if (suffix === 'selected_script') {
      kvEntries.push({ key: 'selectedScriptId', value: raw });
      continue;
    }

    if (suffix === 'settings') {
      const parsed = safeJsonParse(raw);
      if (parsed && typeof parsed === 'object') {
        kvEntries.push({ key: 'settings', value: parsed });
      }
      continue;
    }

    if (suffix === 'chat_history') {
      const parsed = safeJsonParse(raw);
      if (Array.isArray(parsed)) {
        kvEntries.push({ key: 'chatHistory', value: parsed.slice(-50) });
      }
      continue;
    }

    if (suffix === 'notifications') {
      const parsed = safeJsonParse(raw);
      if (Array.isArray(parsed)) {
        kvEntries.push({ key: 'notifications', value: parsed });
      }
      continue;
    }

    if (suffix === 'sb_preferences') {
      const parsed = safeJsonParse(raw);
      if (parsed && typeof parsed === 'object') {
        kvEntries.push({ key: 'storyboardPreferences', value: parsed });
      }
      continue;
    }

    if (suffix === 'scripts' || key === 'scriptora_scripts') {
      const parsed = safeJsonParse(raw);
      if (Array.isArray(parsed)) {
        parsed.forEach((sc) => {
          if (sc && sc.id && !existingIds.has(sc.id)) {
            scriptsToPut.set(sc.id, sc);
          }
        });
      }
      continue;
    }

    if (suffix.startsWith('screenplay_key_') || suffix.startsWith('screenplay_enc_')) {
      const parsed = safeJsonParse(raw);
      kvEntries.push({ key: `crypto:${suffix}`, value: parsed !== null ? parsed : raw });
      continue;
    }

    if (suffix.startsWith('screenplay_')) {
      const scriptId = suffix.slice('screenplay_'.length);
      const parsed = safeJsonParse(raw);
      if (scriptId && parsed && typeof parsed === 'object') {
        screenplaysToPut.set(scriptId, { ...parsed, id: parsed.id || scriptId });
      }
      continue;
    }

    if (suffix.startsWith('versions_')) {
      const scriptId = suffix.slice('versions_'.length);
      const parsed = safeJsonParse(raw);
      if (scriptId && Array.isArray(parsed)) {
        versionsToPut.set(scriptId, { scriptId, versions: parsed });
      }
      continue;
    }

    if (suffix.startsWith('storyboard_')) {
      const rest = suffix.slice('storyboard_'.length);
      const parsed = safeJsonParse(raw);
      if (parsed && typeof parsed === 'object') {
        const scriptId = parsed.scriptId || rest.split('_')[0] || 'default';
        const sceneId = parsed.sceneId || rest.slice(scriptId.length + 1) || 'default';
        const sbCopy = JSON.parse(JSON.stringify(parsed));

        // Convert any large data:image raster URLs on shots into IndexedDB Blobs
        if (Array.isArray(sbCopy.shots)) {
          sbCopy.shots.forEach((shot, idx) => {
            if (!shot || !shot.imageUrl || typeof shot.imageUrl !== 'string') return;
            if (shot.imageUrl.startsWith('data:image/png') || shot.imageUrl.startsWith('data:image/jpeg') || shot.imageUrl.startsWith('data:image/webp')) {
              const blob = dataUrlToBlob(shot.imageUrl);
              if (blob) {
                const blobId = `blob_${scriptId}_${sceneId}_${shot.id || idx}_${Date.now()}`;
                blobsToPut.push({
                  id: blobId,
                  scriptId,
                  sceneId,
                  shotId: shot.id || `shot-${idx}`,
                  mimeType: blob.type || 'image/png',
                  size: blob.size,
                  createdAt: new Date().toISOString(),
                  blob
                });
                shot.blobId = blobId;
                shot.imageUrl = `idb-blob://${blobId}`;
              }
            }
          });
        }

        const compositeKey = `${scriptId}::${sceneId}`;
        storyboardsToPut.set(compositeKey, {
          key: compositeKey,
          scriptId,
          sceneId,
          storyboard: sbCopy,
          updatedAt: new Date().toISOString()
        });
      }
      continue;
    }

    if (suffix.startsWith('intel_')) {
      const scriptId = suffix.slice('intel_'.length);
      const parsed = safeJsonParse(raw);
      if (scriptId && parsed) {
        const b = getIntelBucket(scriptId);
        b.context = parsed;
      }
      continue;
    }

    // Legacy production keys if present
    const prodMatch = suffix.match(/^prod_([a-zA-Z]+)_(.+)$/);
    if (prodMatch) {
      const kind = prodMatch[1];
      const scriptId = prodMatch[2];
      const parsed = safeJsonParse(raw);
      if (scriptId && parsed !== null) {
        const b = getProdBucket(scriptId);
        if (kind === 'workspace') b.workspace = parsed;
        else if (kind === 'scenes') b.scenes = parsed;
        else if (kind === 'breakdown') b.breakdown = parsed;
        else if (kind === 'callsheets') b.callSheets = parsed;
        else if (kind === 'schedule') b.schedule = parsed;
        else if (kind === 'resources') b.resources = parsed;
        else if (kind === 'documents') b.documents = parsed;
        else if (kind === 'proposals') b.proposals = parsed;
        else if (kind === 'readiness') b.readiness = parsed;
        else if (kind === 'audit') b.audit = parsed;
      }
    }
  }

  const allStoreNames = [
    STORES.KV,
    STORES.SCRIPTS,
    STORES.SCREENPLAYS,
    STORES.VERSIONS,
    STORES.STORYBOARDS,
    STORES.STORYBOARD_BLOBS,
    STORES.PRODUCTION,
    STORES.INTELLIGENCE
  ];

  await withTransaction(allStoreNames, 'readwrite', async (stores) => {
    const ops = [];
    kvEntries.forEach(({ key, value }) => {
      ops.push(reqToPromise(stores[STORES.KV].put({ key, value, updatedAt: new Date().toISOString() })));
    });
    scriptsToPut.forEach((sc) => {
      ops.push(reqToPromise(stores[STORES.SCRIPTS].put(sc)));
    });
    screenplaysToPut.forEach((sp) => {
      ops.push(reqToPromise(stores[STORES.SCREENPLAYS].put(sp)));
    });
    versionsToPut.forEach((v) => {
      ops.push(reqToPromise(stores[STORES.VERSIONS].put(v)));
    });
    storyboardsToPut.forEach((sb) => {
      ops.push(reqToPromise(stores[STORES.STORYBOARDS].put(sb)));
    });
    blobsToPut.forEach((b) => {
      ops.push(reqToPromise(stores[STORES.STORYBOARD_BLOBS].put(b)));
    });
    productionToPut.forEach((p) => {
      ops.push(reqToPromise(stores[STORES.PRODUCTION].put(p)));
    });
    intelligenceToPut.forEach((intel) => {
      ops.push(reqToPromise(stores[STORES.INTELLIGENCE].put(intel)));
    });

    const summary = {
      completed: true,
      migratedAt: new Date().toISOString(),
      counts: {
        scripts: scriptsToPut.size,
        screenplays: screenplaysToPut.size,
        versions: versionsToPut.size,
        storyboards: storyboardsToPut.size,
        blobs: blobsToPut.length,
        production: productionToPut.size,
        intelligence: intelligenceToPut.size,
        kv: kvEntries.length
      }
    };
    ops.push(reqToPromise(stores[STORES.KV].put({ key: MIGRATION_KEY, value: summary, updatedAt: summary.migratedAt })));
    await Promise.all(ops);
  });

  return { migrated: true };
}

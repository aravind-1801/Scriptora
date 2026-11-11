/**
 * SCRIPTORA Authoritative Local Repository
 *
 * High-level local workspace repository backed strictly by IndexedDB
 * (`localDatabase.js`) with synchronous hydrated snapshot access for UI
 * renderers, BroadcastChannel multi-tab sync within the same browser profile,
 * and managed Blob/ObjectURL lifecycle for storyboard images.
 */

import {
  STORES,
  openLocalDatabase,
  ensureInstallationMetadata,
  getRecord,
  getAllRecords,
  putRecord,
  deleteRecord,
  clearAllWorkspaceStores,
  getKv,
  setKv,
  deleteKv,
  onWorkspaceBroadcast,
  notifyWorkspaceUpdated
} from './localDatabase.js';
import { migrateLegacyLocalStorageIfNeeded, dataUrlToBlob } from './localMigration.js';

// In-memory hydrated mirror populated strictly from IndexedDB transactions.
// Never acts as a silent fallback if IndexedDB itself fails.
const cache = {
  initialized: false,
  installationId: null,
  profile: null,
  settings: null,
  selectedScriptId: null,
  autoSaveEnabled: true,
  theme: 'light',
  scripts: [],
  screenplays: new Map(),
  versions: new Map(),
  storyboards: new Map(),
  storyboardPreferences: null,
  storyboardRecycleBin: new Map(),
  productionData: new Map(),
  intelligence: new Map(),
  chatHistory: [],
  notifications: [],
  cryptoKv: new Map(),
  blobUrls: new Map() // blobId -> { objectUrl, blob, mimeType, size }
};

let initPromise = null;
const subscriberCallbacks = new Set();

const DEFAULT_SETTINGS = {
  editorFont: 'Courier Prime',
  fontSize: '12pt',
  autoSave: 'Instant',
  syncCloud: false,
  theme: 'light',
  aiAssistant: true,
  defaultAspectRatio: '16:9'
};

export function onLocalWorkspaceChange(cb) {
  subscriberCallbacks.add(cb);
  return () => subscriberCallbacks.delete(cb);
}

function emitWorkspaceChange(area, detail = {}) {
  subscriberCallbacks.forEach((cb) => {
    try {
      cb({ area, detail });
    } catch (err) {
      console.warn('[LocalRepo] Subscriber callback error:', err);
    }
  });
}

const objectUrlToBlobId = new Map();

function registerBlobObjectUrl(blobRecord) {
  if (!blobRecord || !blobRecord.id || !blobRecord.blob) return null;
  const existing = cache.blobUrls.get(blobRecord.id);
  if (existing && existing.objectUrl) {
    objectUrlToBlobId.set(existing.objectUrl, blobRecord.id);
    return existing.objectUrl;
  }
  let objectUrl = null;
  if (typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
    try {
      objectUrl = URL.createObjectURL(blobRecord.blob);
    } catch (_) {
      objectUrl = null;
    }
  }
  cache.blobUrls.set(blobRecord.id, {
    objectUrl,
    blob: blobRecord.blob,
    mimeType: blobRecord.mimeType || blobRecord.blob.type || 'image/png',
    size: blobRecord.size || blobRecord.blob.size || 0
  });
  if (objectUrl) {
    objectUrlToBlobId.set(objectUrl, blobRecord.id);
  }
  return objectUrl;
}

export function revokeBlobUrl(blobId) {
  if (!blobId) return;
  const entry = cache.blobUrls.get(blobId);
  if (entry) {
    if (entry.objectUrl) {
      objectUrlToBlobId.delete(entry.objectUrl);
      if (typeof URL !== 'undefined' && typeof URL.revokeObjectURL === 'function') {
        try {
          URL.revokeObjectURL(entry.objectUrl);
        } catch (_) {}
      }
    }
    cache.blobUrls.delete(blobId);
  }
}

export function revokeAllBlobUrls() {
  Array.from(cache.blobUrls.keys()).forEach(revokeBlobUrl);
}

export function canonicalizeBlobUri(uri) {
  if (!uri || typeof uri !== 'string') return uri;
  if (uri.startsWith('blob:') && objectUrlToBlobId.has(uri)) {
    return `idb-blob://${objectUrlToBlobId.get(uri)}`;
  }
  return uri;
}

export function extractBlobId(uri) {
  if (typeof uri !== 'string') return null;
  if (uri.startsWith('idb-blob://')) {
    return uri.slice('idb-blob://'.length).trim() || null;
  }
  if (uri.startsWith('blob:') && objectUrlToBlobId.has(uri)) {
    return objectUrlToBlobId.get(uri);
  }
  return null;
}

export function resolveBlobUriSync(uri) {
  const blobId = extractBlobId(uri);
  if (!blobId) return uri;
  const entry = cache.blobUrls.get(blobId);
  if (entry && entry.objectUrl) {
    return entry.objectUrl;
  }
  if (entry && entry.blob && typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
    entry.objectUrl = URL.createObjectURL(entry.blob);
    return entry.objectUrl;
  }
  // Asynchronous backfill if a new blob arrived from another tab
  getRecord(STORES.STORYBOARD_BLOBS, blobId)
    .then((rec) => {
      if (rec?.blob) {
        registerBlobObjectUrl(rec);
        emitWorkspaceChange('storyboard-blob-ready', { blobId });
      }
    })
    .catch(() => {});
  return uri;
}

async function loadSnapshotFromIndexedDB() {
  const [
    meta,
    profile,
    settings,
    selectedScriptId,
    autoSavePref,
    themePref,
    chatHistory,
    notifications,
    storyboardPreferences,
    scripts,
    screenplays,
    versions,
    storyboards,
    blobs,
    recycleBins,
    productionList,
    intelligenceList,
    allKv
  ] = await Promise.all([
    ensureInstallationMetadata(),
    getKv('profile', null),
    getKv('settings', null),
    getKv('selectedScriptId', null),
    getKv('pref:autosave', true),
    getKv('pref:theme', 'light'),
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

  cache.installationId = meta?.installationId || null;
  cache.profile = profile || null;
  cache.settings = settings ? { ...DEFAULT_SETTINGS, ...settings, syncCloud: false } : { ...DEFAULT_SETTINGS };
  cache.selectedScriptId = selectedScriptId || null;
  cache.autoSaveEnabled = autoSavePref !== false;
  cache.theme = themePref || cache.settings.theme || 'light';
  cache.chatHistory = Array.isArray(chatHistory) ? chatHistory : [];
  cache.notifications = Array.isArray(notifications) ? notifications : [];
  cache.storyboardPreferences = storyboardPreferences || null;
  cache.scripts = (Array.isArray(scripts) ? scripts : []).sort((a, b) => {
    const tA = new Date(a?.updatedAt || a?.createdAt || 0).getTime();
    const tB = new Date(b?.updatedAt || b?.createdAt || 0).getTime();
    return tB - tA;
  });

  cache.screenplays.clear();
  (screenplays || []).forEach((sp) => {
    if (sp?.id) cache.screenplays.set(sp.id, sp);
  });

  cache.versions.clear();
  (versions || []).forEach((v) => {
    if (v?.scriptId) cache.versions.set(v.scriptId, v.versions || []);
  });

  cache.storyboards.clear();
  (storyboards || []).forEach((sb) => {
    if (sb?.key && sb?.storyboard) cache.storyboards.set(sb.key, sb.storyboard);
  });

  // Refresh blob registry cleanly while preserving valid existing object URLs
  const liveBlobIds = new Set((blobs || []).map((b) => b?.id).filter(Boolean));
  Array.from(cache.blobUrls.keys()).forEach((id) => {
    if (!liveBlobIds.has(id)) revokeBlobUrl(id);
  });
  (blobs || []).forEach((rec) => {
    if (rec?.id && rec?.blob) registerBlobObjectUrl(rec);
  });

  cache.storyboardRecycleBin.clear();
  (recycleBins || []).forEach((bin) => {
    if (bin?.scriptId) cache.storyboardRecycleBin.set(bin.scriptId, bin.items || []);
  });

  cache.productionData.clear();
  (productionList || []).forEach((prod) => {
    if (prod?.scriptId) cache.productionData.set(prod.scriptId, prod);
  });

  cache.intelligence.clear();
  (intelligenceList || []).forEach((intel) => {
    if (intel?.scriptId) cache.intelligence.set(intel.scriptId, intel);
  });

  cache.cryptoKv.clear();
  (allKv || []).forEach((entry) => {
    if (entry?.key && entry.key.startsWith('crypto:')) {
      cache.cryptoKv.set(entry.key.slice('crypto:'.length), entry.value);
    }
  });

  cache.initialized = true;
}

export async function initLocalRepository() {
  if (cache.initialized) return cache;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    await openLocalDatabase();
    await ensureInstallationMetadata();
    await migrateLegacyLocalStorageIfNeeded();
    await loadSnapshotFromIndexedDB();

    onWorkspaceBroadcast(async (msg) => {
      try {
        await loadSnapshotFromIndexedDB();
        emitWorkspaceChange(msg.area || 'remote-tab', msg.detail || {});
      } catch (err) {
        console.warn('[LocalRepo] Broadcast reload error:', err);
      }
    });

    return cache;
  })();

  try {
    return await initPromise;
  } finally {
    initPromise = null;
  }
}

export async function reloadLocalRepository() {
  await loadSnapshotFromIndexedDB();
  emitWorkspaceChange('reload', {});
  return cache;
}

// =========================================================================
// SYNCHRONOUS CACHE READERS (Hydrated from IndexedDB on startup/writes)
// =========================================================================

export function getInstallationId() {
  return cache.installationId;
}

export function isLocalRepoInitialized() {
  return cache.initialized;
}

export function getCachedProfile() {
  return cache.profile ? { ...cache.profile } : null;
}

export function getCachedSettings() {
  return cache.settings ? { ...cache.settings } : { ...DEFAULT_SETTINGS };
}

export function getCachedSelectedScriptId() {
  return cache.selectedScriptId;
}

export function getCachedAutoSave() {
  return cache.autoSaveEnabled;
}

export function getCachedTheme() {
  return cache.theme || 'light';
}

export function getCachedScripts() {
  return cache.scripts.map((s) => ({ ...s }));
}

export function getCachedScreenplay(scriptId) {
  if (!scriptId) return null;
  const sp = cache.screenplays.get(scriptId);
  return sp ? JSON.parse(JSON.stringify(sp)) : null;
}

export function getCachedChatHistory() {
  return [...cache.chatHistory];
}

export function getCachedCryptoValue(key) {
  return cache.cryptoKv.has(key) ? cache.cryptoKv.get(key) : null;
}

// =========================================================================
// PROFILE, SETTINGS, PREFERENCES, CHAT & NOTIFICATIONS
// =========================================================================

export async function getProfile() {
  await initLocalRepository();
  const stored = await getKv('profile', null);
  cache.profile = stored || null;
  return cache.profile ? { ...cache.profile } : null;
}

export async function saveProfile(profile) {
  await initLocalRepository();
  if (!profile) {
    await deleteKv('profile');
    cache.profile = null;
    notifyWorkspaceUpdated('profile', { cleared: true });
    emitWorkspaceChange('profile', { cleared: true });
    return null;
  }
  const normalized = { ...profile };
  if (normalized.name && !normalized.avatarInitials) {
    const parts = String(normalized.name).trim().split(/\s+/);
    normalized.avatarInitials = parts.length > 1
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : parts[0].substring(0, 2).toUpperCase();
  }
  normalized.updatedAt = new Date().toISOString();
  await setKv('profile', normalized);
  cache.profile = normalized;
  notifyWorkspaceUpdated('profile', { id: normalized.id });
  emitWorkspaceChange('profile', { profile: normalized });
  return { ...normalized };
}

export async function getSettings() {
  await initLocalRepository();
  const stored = await getKv('settings', null);
  cache.settings = stored ? { ...DEFAULT_SETTINGS, ...stored, syncCloud: false } : { ...DEFAULT_SETTINGS };
  return { ...cache.settings };
}

export async function saveSettings(updates = {}) {
  await initLocalRepository();
  const current = await getSettings();
  const merged = { ...current, ...updates, syncCloud: false };
  await setKv('settings', merged);
  if (updates.theme) {
    await setKv('pref:theme', updates.theme);
    cache.theme = updates.theme;
  }
  if (updates.autoSave !== undefined) {
    const boolVal = updates.autoSave === 'Instant' || updates.autoSave === true || updates.autoSave === 'true';
    await setKv('pref:autosave', boolVal);
    cache.autoSaveEnabled = boolVal;
  }
  cache.settings = merged;
  notifyWorkspaceUpdated('settings');
  emitWorkspaceChange('settings', merged);
  return { ...merged };
}

export async function setSelectedScriptId(scriptId) {
  await initLocalRepository();
  const val = scriptId || null;
  await setKv('selectedScriptId', val);
  cache.selectedScriptId = val;
  notifyWorkspaceUpdated('selectedScriptId', { selectedScriptId: val });
  return val;
}

export async function setAutoSavePreference(enabled) {
  await initLocalRepository();
  const boolVal = enabled !== false;
  await setKv('pref:autosave', boolVal);
  cache.autoSaveEnabled = boolVal;
  await saveSettings({ autoSave: boolVal ? 'Instant' : 'Manual' });
  return boolVal;
}

export async function setThemePreference(theme) {
  await initLocalRepository();
  const val = theme === 'dark' ? 'dark' : 'light';
  await setKv('pref:theme', val);
  cache.theme = val;
  await saveSettings({ theme: val });
  return val;
}

export async function getChatHistory() {
  await initLocalRepository();
  const history = await getKv('chatHistory', []);
  cache.chatHistory = Array.isArray(history) ? history : [];
  return [...cache.chatHistory];
}

export async function appendChatMessage(role, text) {
  await initLocalRepository();
  const history = await getChatHistory();
  const next = [...history, { role, text, timestamp: new Date().toISOString() }].slice(-50);
  await setKv('chatHistory', next);
  cache.chatHistory = next;
  notifyWorkspaceUpdated('chatHistory');
  return next;
}

export async function clearChatHistory() {
  await initLocalRepository();
  await setKv('chatHistory', []);
  cache.chatHistory = [];
  notifyWorkspaceUpdated('chatHistory');
  return [];
}

export async function getNotifications() {
  await initLocalRepository();
  const list = await getKv('notifications', []);
  cache.notifications = Array.isArray(list) ? list : [];
  const unreadCount = cache.notifications.filter((n) => !n.read).length;
  return { notifications: [...cache.notifications], unreadCount };
}

export async function addNotification(notification) {
  await initLocalRepository();
  const { notifications } = await getNotifications();
  const item = {
    id: notification.id || `notif_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    title: notification.title || 'Workspace Update',
    message: notification.message || '',
    category: notification.category || 'system',
    read: false,
    timestamp: new Date().toISOString(),
    ...notification
  };
  const next = [item, ...notifications].slice(0, 50);
  await setKv('notifications', next);
  cache.notifications = next;
  notifyWorkspaceUpdated('notifications');
  emitWorkspaceChange('notifications', { notifications: next });
  return item;
}

export async function markNotificationRead(id) {
  await initLocalRepository();
  const { notifications } = await getNotifications();
  const next = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
  await setKv('notifications', next);
  cache.notifications = next;
  notifyWorkspaceUpdated('notifications');
  return { success: true };
}

export async function markAllNotificationsRead() {
  await initLocalRepository();
  const { notifications } = await getNotifications();
  const next = notifications.map((n) => ({ ...n, read: true }));
  await setKv('notifications', next);
  cache.notifications = next;
  notifyWorkspaceUpdated('notifications');
  return { success: true };
}

export async function getCryptoValue(key, defaultValue = null) {
  await initLocalRepository();
  const rec = await getKv(`crypto:${key}`, null);
  if (rec !== null) {
    cache.cryptoKv.set(key, rec);
    return rec;
  }
  return defaultValue;
}

export async function setCryptoValue(key, value) {
  await initLocalRepository();
  if (value === null || value === undefined) {
    await deleteKv(`crypto:${key}`);
    cache.cryptoKv.delete(key);
  } else {
    await setKv(`crypto:${key}`, value);
    cache.cryptoKv.set(key, value);
  }
  notifyWorkspaceUpdated('crypto', { key });
  return value;
}

// =========================================================================
// SCRIPTS, SCREENPLAYS & VERSIONS
// =========================================================================

function countScreenplayWords(sp) {
  if (!sp || !Array.isArray(sp.scenes)) return 0;
  let words = 0;
  sp.scenes.forEach((sc) => {
    (sc.blocks || []).forEach((b) => {
      ['content', 'char1', 'dia1', 'char2', 'dia2'].forEach((field) => {
        if (typeof b[field] === 'string' && b[field].trim()) {
          words += b[field].trim().split(/\s+/).length;
        }
      });
    });
  });
  return words;
}

function createEmptyScreenplayModel(scriptMeta) {
  return {
    id: scriptMeta.id,
    title: scriptMeta.title || 'Untitled Screenplay',
    format: scriptMeta.format || 'Feature',
    genre: scriptMeta.genre || 'Drama',
    acts: [{ id: 'act-1', name: 'Act I' }],
    scenes: [
      {
        id: 'scene-1',
        actId: 'act-1',
        number: 1,
        slugline: '',
        blocks: [{ id: `b-${Date.now()}-1`, type: 'scene', content: '' }]
      }
    ],
    characters: [],
    wordCount: 0,
    updatedAt: new Date().toISOString()
  };
}

export async function getScripts(query = {}) {
  await initLocalRepository();
  const all = await getAllRecords(STORES.SCRIPTS);
  cache.scripts = (all || []).sort((a, b) => {
    const tA = new Date(a?.updatedAt || a?.createdAt || 0).getTime();
    const tB = new Date(b?.updatedAt || b?.createdAt || 0).getTime();
    return tB - tA;
  });

  let results = [...cache.scripts];
  if (query.status) {
    results = results.filter((s) => (s.status || 'Active') === query.status);
  }
  if (query.search) {
    const q = String(query.search).toLowerCase();
    results = results.filter((s) =>
      String(s.title || '').toLowerCase().includes(q) ||
      String(s.genre || '').toLowerCase().includes(q)
    );
  }
  return results;
}

export async function getScript(id) {
  await initLocalRepository();
  if (!id) return null;
  const rec = await getRecord(STORES.SCRIPTS, id);
  return rec ? { ...rec } : null;
}

export async function createScript(scriptData = {}) {
  await initLocalRepository();
  const id = scriptData.id || `script_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const nowIso = new Date().toISOString();
  const newScript = {
    id,
    title: (scriptData.title || 'Untitled Screenplay').trim(),
    format: scriptData.format || 'Feature',
    genre: scriptData.genre || 'Drama',
    logline: scriptData.logline || '',
    status: scriptData.status || 'Active',
    draft: scriptData.draft || 'Draft 1.0',
    industry: scriptData.industry || 'International / Hollywood',
    pages: 1,
    scenesCount: 1,
    wordsCount: 0,
    wordCount: 0,
    currentScene: 'SCENE 1',
    isCurrentDraft: true,
    archived: false,
    updated: 'Just now',
    createdAt: nowIso,
    updatedAt: nowIso,
    lastEdited: 'Just now'
  };

  for (const prev of cache.scripts) {
    if (prev.isCurrentDraft) {
      await putRecord(STORES.SCRIPTS, { ...prev, isCurrentDraft: false });
    }
  }
  await putRecord(STORES.SCRIPTS, newScript);

  const initialScreenplay = createEmptyScreenplayModel(newScript);
  await putRecord(STORES.SCREENPLAYS, initialScreenplay);
  await putRecord(STORES.VERSIONS, {
    scriptId: id,
    versions: [
      {
        id: `v-${Date.now()}`,
        name: newScript.draft,
        notes: 'Initial local draft created',
        timestamp: nowIso,
        wordCount: 0,
        snapshot: initialScreenplay
      }
    ]
  });

  cache.scripts = [newScript, ...cache.scripts.filter((s) => s.id !== id)];
  cache.screenplays.set(id, initialScreenplay);
  cache.versions.set(id, (await getRecord(STORES.VERSIONS, id))?.versions || []);
  await setSelectedScriptId(id);

  notifyWorkspaceUpdated('scripts', { scriptId: id, action: 'create' });
  emitWorkspaceChange('scripts', { scripts: cache.scripts });
  return { ...newScript };
}

export async function updateScript(id, updates = {}) {
  await initLocalRepository();
  const existing = await getRecord(STORES.SCRIPTS, id);
  if (!existing) throw new Error('Screenplay not found in local workspace.');

  const updated = {
    ...existing,
    ...updates,
    id,
    updatedAt: new Date().toISOString(),
    lastEdited: 'Just now'
  };
  await putRecord(STORES.SCRIPTS, updated);

  // Sync title to screenplay document as well
  const existingSp = await getRecord(STORES.SCREENPLAYS, id);
  if (existingSp && updates.title && existingSp.title !== updates.title) {
    const updatedSp = { ...existingSp, title: updates.title, updatedAt: updated.updatedAt };
    await putRecord(STORES.SCREENPLAYS, updatedSp);
    cache.screenplays.set(id, updatedSp);
  }

  cache.scripts = cache.scripts.map((s) => (s.id === id ? updated : s));
  notifyWorkspaceUpdated('scripts', { scriptId: id, action: 'update' });
  emitWorkspaceChange('scripts', { scripts: cache.scripts });
  return { ...updated };
}

export async function duplicateScript(id) {
  await initLocalRepository();
  const orig = await getRecord(STORES.SCRIPTS, id);
  if (!orig) throw new Error('Original screenplay not found.');
  const origSp = await getScreenplay(id);

  const newId = `script_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const nowIso = new Date().toISOString();
  const copy = {
    ...orig,
    id: newId,
    title: `${orig.title} (Copy)`,
    createdAt: nowIso,
    updatedAt: nowIso,
    lastEdited: 'Just now'
  };
  await putRecord(STORES.SCRIPTS, copy);

  if (origSp) {
    const spCopy = {
      ...JSON.parse(JSON.stringify(origSp)),
      id: newId,
      title: copy.title,
      updatedAt: nowIso
    };
    await putRecord(STORES.SCREENPLAYS, spCopy);
    cache.screenplays.set(newId, spCopy);
  }

  cache.scripts = [copy, ...cache.scripts];
  notifyWorkspaceUpdated('scripts', { scriptId: newId, action: 'duplicate' });
  emitWorkspaceChange('scripts', { scripts: cache.scripts });
  return { ...copy };
}

export async function setCurrentDraft(scriptId) {
  await initLocalRepository();
  if (!scriptId) return await getScripts();
  const existingAll = await getAllRecords(STORES.SCRIPTS);
  const nextAll = [];
  for (const sc of (existingAll || [])) {
    const next = {
      ...sc,
      isCurrentDraft: sc.id === scriptId,
      updated: sc.id === scriptId ? 'Just now' : (sc.updated || 'Recently')
    };
    await putRecord(STORES.SCRIPTS, next);
    nextAll.push(next);
  }
  cache.scripts = nextAll.sort((a, b) => new Date(b?.updatedAt || b?.createdAt || 0) - new Date(a?.updatedAt || a?.createdAt || 0));
  await setSelectedScriptId(scriptId);
  notifyWorkspaceUpdated('scripts', { scriptId, action: 'setCurrentDraft' });
  emitWorkspaceChange('scripts', { scripts: cache.scripts });
  return [...cache.scripts];
}

export async function archiveScript(id) {
  const existing = await getRecord(STORES.SCRIPTS, id);
  const nextArchived = !(existing?.archived || existing?.status === 'Archived');
  return updateScript(id, {
    status: nextArchived ? 'Archived' : 'Active',
    archived: nextArchived
  });
}

export async function deleteScript(id) {
  await initLocalRepository();
  // Also clean up related storyboards and blobs for this script cleanly
  const allStoryboards = await getAllRecords(STORES.STORYBOARDS);
  const targetStoryboards = (allStoryboards || []).filter((sb) => sb.scriptId === id);
  const allBlobs = await getAllRecords(STORES.STORYBOARD_BLOBS);
  const targetBlobs = (allBlobs || []).filter((b) => b.scriptId === id);

  await deleteRecord(STORES.SCRIPTS, id);
  await deleteRecord(STORES.SCREENPLAYS, id);
  await deleteRecord(STORES.VERSIONS, id);
  await deleteRecord(STORES.PRODUCTION, id);
  await deleteRecord(STORES.INTELLIGENCE, id);
  await deleteRecord(STORES.STORYBOARD_RECYCLE_BIN, id);

  for (const sb of targetStoryboards) {
    await deleteRecord(STORES.STORYBOARDS, sb.key);
    cache.storyboards.delete(sb.key);
  }
  for (const b of targetBlobs) {
    await deleteRecord(STORES.STORYBOARD_BLOBS, b.id);
    revokeBlobUrl(b.id);
  }

  cache.scripts = cache.scripts.filter((s) => s.id !== id);
  cache.screenplays.delete(id);
  cache.versions.delete(id);
  cache.productionData.delete(id);
  cache.intelligence.delete(id);
  cache.storyboardRecycleBin.delete(id);

  if (cache.selectedScriptId === id) {
    const nextId = cache.scripts[0]?.id || null;
    await setSelectedScriptId(nextId);
  }

  notifyWorkspaceUpdated('scripts', { scriptId: id, action: 'delete' });
  emitWorkspaceChange('scripts', { scripts: cache.scripts });
  return { success: true, id };
}

export async function getScreenplay(scriptId) {
  await initLocalRepository();
  if (!scriptId) return null;
  let sp = await getRecord(STORES.SCREENPLAYS, scriptId);
  if (!sp) {
    const scriptMeta = await getScript(scriptId);
    if (!scriptMeta) return null;
    sp = createEmptyScreenplayModel(scriptMeta);
    await putRecord(STORES.SCREENPLAYS, sp);
  }
  cache.screenplays.set(scriptId, sp);
  return JSON.parse(JSON.stringify(sp));
}

export async function saveScreenplay(scriptId, screenplay) {
  await initLocalRepository();
  if (!scriptId || !screenplay) throw new Error('Invalid screenplay payload');

  const nowIso = new Date().toISOString();
  const wordCount = countScreenplayWords(screenplay);
  const scenesCount = Array.isArray(screenplay.scenes) ? screenplay.scenes.length : 1;
  const pages = Math.max(1, Math.ceil(wordCount / 220));
  const payload = {
    ...JSON.parse(JSON.stringify(screenplay)),
    id: scriptId,
    wordCount,
    updatedAt: nowIso
  };

  await putRecord(STORES.SCREENPLAYS, payload);
  cache.screenplays.set(scriptId, payload);

  const meta = await getRecord(STORES.SCRIPTS, scriptId);
  if (meta) {
    const firstSlug = payload.scenes?.[0]?.slugline || payload.scenes?.[0]?.blocks?.find((b) => b.type === 'scene')?.content || 'SCENE 1';
    const updatedMeta = {
      ...meta,
      title: payload.title || meta.title,
      pages,
      scenesCount,
      wordCount,
      wordsCount: wordCount,
      currentScene: firstSlug || meta.currentScene || 'SCENE 1',
      updatedAt: nowIso,
      lastEdited: 'Just now'
    };
    await putRecord(STORES.SCRIPTS, updatedMeta);
    cache.scripts = cache.scripts.map((s) => (s.id === scriptId ? updatedMeta : s));
  }

  notifyWorkspaceUpdated('screenplay', { scriptId });
  emitWorkspaceChange('screenplay', { scriptId, screenplay: payload });
  return payload;
}

export async function getVersions(scriptId) {
  await initLocalRepository();
  const rec = await getRecord(STORES.VERSIONS, scriptId);
  const list = rec?.versions || [];
  cache.versions.set(scriptId, list);
  return JSON.parse(JSON.stringify(list));
}

export async function createVersion(scriptId, versionData = {}) {
  await initLocalRepository();
  const currentList = await getVersions(scriptId);
  const sp = await getScreenplay(scriptId);
  const nowIso = new Date().toISOString();

  const newVersion = {
    id: `ver_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
    name: versionData.name || `Draft ${currentList.length + 1}.0`,
    notes: versionData.notes || '',
    timestamp: nowIso,
    wordCount: sp ? countScreenplayWords(sp) : 0,
    snapshot: sp ? JSON.parse(JSON.stringify(sp)) : null
  };

  const nextList = [newVersion, ...currentList];
  await putRecord(STORES.VERSIONS, { scriptId, versions: nextList });
  cache.versions.set(scriptId, nextList);

  const scriptMeta = await getRecord(STORES.SCRIPTS, scriptId);
  if (scriptMeta && versionData.name) {
    await updateScript(scriptId, { draft: versionData.name });
  }

  notifyWorkspaceUpdated('versions', { scriptId });
  return newVersion;
}

// =========================================================================
// STORYBOARD REPOSITORY & BINARY BLOB STORAGE
// =========================================================================

export async function saveStoryboardBlob(blob, meta = {}) {
  await initLocalRepository();
  if (!blob) throw new Error('Cannot save empty storyboard image blob');

  const id = meta.id || `blob_${meta.scriptId || 's'}_${meta.sceneId || 'sc'}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const record = {
    id,
    scriptId: meta.scriptId || null,
    sceneId: meta.sceneId || null,
    shotId: meta.shotId || null,
    mimeType: blob.type || meta.mimeType || 'image/png',
    size: blob.size || 0,
    createdAt: new Date().toISOString(),
    blob
  };

  await putRecord(STORES.STORYBOARD_BLOBS, record);
  const objectUrl = registerBlobObjectUrl(record);
  return {
    blobId: id,
    blobUri: `idb-blob://${id}`,
    objectUrl,
    mimeType: record.mimeType,
    size: record.size
  };
}

export async function getStoryboardBlobRecord(blobId) {
  await initLocalRepository();
  if (!blobId) return null;
  const rec = await getRecord(STORES.STORYBOARD_BLOBS, blobId);
  if (rec?.blob) {
    const objectUrl = registerBlobObjectUrl(rec);
    return { ...rec, objectUrl };
  }
  return null;
}

export async function deleteStoryboardBlob(blobId) {
  if (!blobId) return;
  await initLocalRepository();
  await deleteRecord(STORES.STORYBOARD_BLOBS, blobId);
  revokeBlobUrl(blobId);
}

/**
 * Ensures any shot with inline data:image/* raster URL converts to an IndexedDB Blob.
 * Preserves SVG placeholders or existing idb-blob:// references cleanly.
 */
async function normalizeStoryboardShotsForStorage(scriptId, sceneId, storyboard) {
  if (!storyboard || !Array.isArray(storyboard.shots)) return storyboard;
  const copy = JSON.parse(JSON.stringify(storyboard));

  for (let i = 0; i < copy.shots.length; i++) {
    const shot = copy.shots[i];
    if (!shot) continue;

    // Convert temporary objectUrl back to canonical idb-blob:// URI
    if (typeof shot.imageUrl === 'string' && shot.imageUrl.startsWith('blob:')) {
      const canonical = canonicalizeBlobUri(shot.imageUrl);
      if (canonical && canonical.startsWith('idb-blob://')) {
        shot.blobId = extractBlobId(canonical);
        shot.imageUrl = canonical;
      }
    }

    // Preserve canonical idb-blob:// URI if previewUrl / objectUrl was hydrated on the shot
    if (shot.blobId && (!shot.imageUrl || shot.imageUrl.startsWith('blob:'))) {
      shot.imageUrl = `idb-blob://${shot.blobId}`;
    }

    if (Array.isArray(shot.history)) {
      shot.history = shot.history.map((h) => {
        if (!h || typeof h !== 'object') return h;
        const copyH = { ...h };
        if (typeof copyH.previousImageUrl === 'string') {
          copyH.previousImageUrl = canonicalizeBlobUri(copyH.previousImageUrl);
        }
        if (typeof copyH.imageUrl === 'string') {
          copyH.imageUrl = canonicalizeBlobUri(copyH.imageUrl);
        }
        return copyH;
      });
    }

    if (typeof shot.imageUrl === 'string' && shot.imageUrl.startsWith('data:image/') && !shot.imageUrl.startsWith('data:image/svg+xml')) {
      const blob = dataUrlToBlob(shot.imageUrl);
      if (blob) {
        const stored = await saveStoryboardBlob(blob, {
          scriptId,
          sceneId,
          shotId: shot.id || `shot-${i}`
        });
        shot.blobId = stored.blobId;
        shot.imageUrl = stored.blobUri;
      }
    }
  }

  return copy;
}

export async function getStoryboards(scriptId) {
  await initLocalRepository();
  const all = await getAllRecords(STORES.STORYBOARDS);
  return (all || [])
    .filter((rec) => rec.scriptId === scriptId && rec.storyboard)
    .map((rec) => JSON.parse(JSON.stringify(rec.storyboard)));
}

export async function getStoryboard(scriptId, sceneId) {
  await initLocalRepository();
  const key = `${scriptId}::${sceneId}`;
  const rec = await getRecord(STORES.STORYBOARDS, key);
  if (rec?.storyboard) {
    cache.storyboards.set(key, rec.storyboard);
    return JSON.parse(JSON.stringify(rec.storyboard));
  }
  return {
    id: `sb-${scriptId}-${sceneId}`,
    scriptId,
    sceneId,
    aspectRatio: cache.storyboardPreferences?.aspectRatio || '16:9',
    visualStyle: cache.storyboardPreferences?.visualStyle || 'Cinematic Concept Art',
    shots: [],
    updatedAt: new Date().toISOString()
  };
}

export async function saveStoryboard(scriptId, sceneId, storyboard) {
  await initLocalRepository();
  const key = `${scriptId}::${sceneId}`;
  const normalized = await normalizeStoryboardShotsForStorage(scriptId, sceneId, {
    ...storyboard,
    scriptId,
    sceneId,
    updatedAt: new Date().toISOString()
  });

  await putRecord(STORES.STORYBOARDS, {
    key,
    scriptId,
    sceneId,
    storyboard: normalized,
    updatedAt: normalized.updatedAt
  });
  cache.storyboards.set(key, normalized);
  notifyWorkspaceUpdated('storyboard', { scriptId, sceneId });
  emitWorkspaceChange('storyboard', { scriptId, sceneId, storyboard: normalized });
  return JSON.parse(JSON.stringify(normalized));
}

export async function getStoryboardPreferences() {
  await initLocalRepository();
  const prefs = await getKv('storyboardPreferences', null);
  cache.storyboardPreferences = prefs || {
    defaultStyle: 'Concept Art',
    defaultAspectRatio: '2.39:1',
    defaultShotSize: 'Medium Shot',
    defaultCameraAngle: 'Eye Level',
    defaultLens: '50mm Prime',
    defaultLighting: 'Auto / Scene-based',
    experienceLevel: 'Intermediate',
    aspectRatio: '2.39:1',
    visualStyle: 'Cinematic Concept Art'
  };
  return { ...cache.storyboardPreferences };
}

export async function saveStoryboardPreferences(prefs = {}) {
  await initLocalRepository();
  const merged = { ...(await getStoryboardPreferences()), ...prefs };
  await setKv('storyboardPreferences', merged);
  cache.storyboardPreferences = merged;
  notifyWorkspaceUpdated('storyboardPreferences');
  return { ...merged };
}

export async function getStoryboardRecycleBin(scriptId) {
  await initLocalRepository();
  const rec = await getRecord(STORES.STORYBOARD_RECYCLE_BIN, scriptId);
  const items = rec?.items || [];
  cache.storyboardRecycleBin.set(scriptId, items);
  return JSON.parse(JSON.stringify(items));
}

export async function saveStoryboardRecycleBin(scriptId, items) {
  await initLocalRepository();
  await putRecord(STORES.STORYBOARD_RECYCLE_BIN, { scriptId, items: items || [] });
  cache.storyboardRecycleBin.set(scriptId, items || []);
  notifyWorkspaceUpdated('storyboardRecycleBin', { scriptId });
  return items || [];
}

export async function deleteStoryboardScene(scriptId, sceneId) {
  await initLocalRepository();
  const sb = await getStoryboard(scriptId, sceneId);
  const shots = sb?.shots || [];

  if (shots.length > 0) {
    const bin = await getStoryboardRecycleBin(scriptId);
    const binEntry = {
      id: `bin-scene-${Date.now()}`,
      type: 'scene',
      scriptId,
      sceneId,
      sceneHeading: sb.sceneHeading || `Scene ${String(sceneId).replace('scene-', '')}`,
      shots,
      deletedAt: new Date().toISOString()
    };
    await saveStoryboardRecycleBin(scriptId, [binEntry, ...bin]);
  }

  const key = `${scriptId}::${sceneId}`;
  await deleteRecord(STORES.STORYBOARDS, key);
  cache.storyboards.delete(key);
  notifyWorkspaceUpdated('storyboard', { scriptId, sceneId, deleted: true });
  return { success: true };
}

// =========================================================================
// PRODUCTION WORKSPACE & INTELLIGENCE REPOSITORY
// =========================================================================

function extractScenesFromScreenplay(sp) {
  if (!sp || !Array.isArray(sp.scenes)) return [];
  return sp.scenes.map((sc, idx) => {
    const num = sc.number || (idx + 1);
    const slugBlock = (sc.blocks || []).find((b) => b.type === 'scene');
    const heading = (sc.slugline || slugBlock?.content || `SCENE ${num}`).trim() || `SCENE ${num}`;
    const upper = heading.toUpperCase();
    const intExt = upper.startsWith('EXT') ? 'EXT' : 'INT';
    const dayNight = upper.includes('NIGHT') ? 'NIGHT' : 'DAY';

    const castSet = new Set();
    let snippet = '';
    (sc.blocks || []).forEach((b) => {
      if (b.type === 'character' && b.content) {
        const cleanName = b.content.replace(/\(.*?\)/g, '').trim().toUpperCase();
        if (cleanName && cleanName.length < 40) castSet.add(cleanName);
      }
      if (!snippet && (b.type === 'action' || b.type === 'dialogue') && b.content) {
        snippet = b.content.trim().slice(0, 140);
      }
    });

    const words = (sc.blocks || []).reduce((acc, b) => acc + (b.content ? b.content.trim().split(/\s+/).length : 0), 0);
    const eighths = Math.max(1, Math.min(32, Math.ceil(words / 30)));
    const pagesText = `${Math.floor(eighths / 8) > 0 ? Math.floor(eighths / 8) + ' ' : ''}${eighths % 8}/8`;

    return {
      id: sc.id || `scene-${num}`,
      sceneNumber: num,
      heading,
      intExt,
      dayNight,
      pages: pagesText,
      cast: Array.from(castSet),
      snippet,
      act: sc.actId === 'act-3' ? 'Act III' : sc.actId === 'act-2' ? 'Act II' : 'Act I',
      estimatedMinutes: Math.max(20, eighths * 15)
    };
  });
}

async function getProductionBucket(scriptId) {
  await initLocalRepository();
  let bucket = await getRecord(STORES.PRODUCTION, scriptId);
  if (!bucket) {
    const script = await getScript(scriptId);
    const sp = await getScreenplay(scriptId);
    const derivedScenes = extractScenesFromScreenplay(sp);
    bucket = {
      scriptId,
      workspace: script ? {
        id: `prod-ws-${scriptId}`,
        projectId: script.projectId || `proj-${scriptId}`,
        projectName: script.title,
        scriptId,
        screenplayTitle: script.title,
        pinnedSourceVersion: script.draft || 'Draft 1.0',
        pinnedSourceVersionHash: `local-${scriptId}`,
        pinnedTimestamp: 'Local Workspace',
        currentScriptDraft: script.draft || 'Draft 1.0',
        isStale: false,
        mode: 'simple',
        userRole: 'Owner',
        roles: ['Owner', 'Director', 'Assistant Director', 'Production', 'Department Member', 'Viewer'],
        stats: {
          totalScenes: derivedScenes.length,
          breakdownElements: 0,
          callSheetsCount: 0,
          shootingDays: derivedScenes.length > 0 ? 1 : 0,
          pendingProposals: 0,
          completedApprovals: 0
        },
        updatedAt: new Date().toISOString()
      } : null,
      scenes: derivedScenes,
      breakdown: [],
      callSheets: [],
      schedule: [],
      resources: [],
      documents: [],
      proposals: [],
      readiness: null,
      audit: []
    };
    await putRecord(STORES.PRODUCTION, bucket);
  }
  cache.productionData.set(scriptId, bucket);
  return JSON.parse(JSON.stringify(bucket));
}

async function saveProductionBucket(scriptId, bucket) {
  await initLocalRepository();
  const payload = { ...bucket, scriptId, updatedAt: new Date().toISOString() };
  await putRecord(STORES.PRODUCTION, payload);
  cache.productionData.set(scriptId, payload);
  notifyWorkspaceUpdated('production', { scriptId });
  return JSON.parse(JSON.stringify(payload));
}

export async function getProductionWorkspace(scriptId) {
  if (!scriptId) return null;
  const bucket = await getProductionBucket(scriptId);
  const sp = await getScreenplay(scriptId);
  const derivedScenes = extractScenesFromScreenplay(sp);
  if (bucket.workspace) {
    bucket.workspace.stats = {
      ...(bucket.workspace.stats || {}),
      totalScenes: bucket.scenes?.length || derivedScenes.length,
      breakdownElements: bucket.breakdown?.length || 0,
      callSheetsCount: bucket.callSheets?.length || 0,
      shootingDays: bucket.schedule?.length || 0,
      pendingProposals: (bucket.proposals || []).filter((p) => p.status === 'Awaiting review').length
    };
  }
  return bucket.workspace;
}

export async function updateProductionWorkspace(scriptId, updates) {
  const bucket = await getProductionBucket(scriptId);
  bucket.workspace = { ...(bucket.workspace || { scriptId }), ...updates, updatedAt: new Date().toISOString() };
  await saveProductionBucket(scriptId, bucket);
  return bucket.workspace;
}

export async function getProductionScenes(scriptId) {
  if (!scriptId) return [];
  const bucket = await getProductionBucket(scriptId);
  const sp = await getScreenplay(scriptId);
  const extracted = extractScenesFromScreenplay(sp);

  // Merge user-edited scene metadata over freshly extracted screenplay scenes
  const byId = new Map((bucket.scenes || []).map((s) => [s.id, s]));
  const merged = extracted.map((ex) => {
    const edited = byId.get(ex.id);
    if (!edited) return ex;
    return {
      ...ex,
      ...edited,
      heading: edited.heading || ex.heading,
      cast: Array.from(new Set([...(ex.cast || []), ...(edited.cast || [])]))
    };
  });

  // Also preserve any manually added production scenes not in screenplay blocks
  (bucket.scenes || []).forEach((s) => {
    if (!extracted.some((ex) => ex.id === s.id)) {
      merged.push(s);
    }
  });

  return merged;
}

export async function updateProductionScene(scriptId, sceneId, updates) {
  const bucket = await getProductionBucket(scriptId);
  const currentList = await getProductionScenes(scriptId);
  const idx = currentList.findIndex((s) => s.id === sceneId || String(s.sceneNumber) === String(sceneId));
  if (idx !== -1) {
    currentList[idx] = { ...currentList[idx], ...updates };
  } else {
    currentList.push({ id: sceneId, ...updates });
  }
  bucket.scenes = currentList;
  await saveProductionBucket(scriptId, bucket);
  return currentList[idx !== -1 ? idx : currentList.length - 1];
}

export async function getProductionSection(scriptId, field, defaultVal = []) {
  if (!scriptId) return defaultVal;
  const bucket = await getProductionBucket(scriptId);
  return bucket[field] !== undefined ? bucket[field] : defaultVal;
}

export async function saveProductionSection(scriptId, field, value, auditEntry = null) {
  const bucket = await getProductionBucket(scriptId);
  bucket[field] = value;
  if (auditEntry) {
    bucket.audit = [
      {
        id: `audit_${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: cache.profile?.name || 'Local Writer',
        ...auditEntry
      },
      ...(bucket.audit || [])
    ].slice(0, 100);
  }
  await saveProductionBucket(scriptId, bucket);
  return bucket[field];
}

export async function getIntelligenceRecord(scriptId) {
  await initLocalRepository();
  const rec = await getRecord(STORES.INTELLIGENCE, scriptId);
  if (rec) {
    cache.intelligence.set(scriptId, rec);
    return JSON.parse(JSON.stringify(rec));
  }
  return {
    scriptId,
    context: {
      format: 'Feature',
      industry: 'International / Hollywood',
      plannedDuration: '01:36:00',
      hours: 1,
      minutes: 36,
      seconds: 0
    },
    analysis: null,
    queries: []
  };
}

export async function saveIntelligenceContext(scriptId, context) {
  await initLocalRepository();
  const rec = await getIntelligenceRecord(scriptId);
  rec.context = { ...rec.context, ...context };
  rec.updatedAt = new Date().toISOString();
  await putRecord(STORES.INTELLIGENCE, rec);
  cache.intelligence.set(scriptId, rec);
  notifyWorkspaceUpdated('intelligence', { scriptId });
  return rec.context;
}

export function computeLocalIntelligenceAnalysis(script, screenplay) {
  const scenes = screenplay?.scenes || [];
  let totalBlocks = 0;
  let dialogueBlocks = 0;
  let actionBlocks = 0;
  let wordCount = 0;
  const cast = new Set();

  scenes.forEach((sc) => {
    (sc.blocks || []).forEach((b) => {
      totalBlocks++;
      if (b.type === 'dialogue' || b.type === 'dual') dialogueBlocks++;
      if (b.type === 'action') actionBlocks++;
      if (b.type === 'character' && b.content) {
        const c = b.content.replace(/\(.*?\)/g, '').trim().toUpperCase();
        if (c) cast.add(c);
      }
      if (b.content) wordCount += b.content.trim().split(/\s+/).length;
    });
  });

  if (wordCount === 0) {
    return {
      script: {
        id: script?.id,
        title: script?.title || 'Untitled Screenplay',
        draft: script?.draft || 'Draft 1.0',
        pages: script?.pages || 1
      },
      scores: {
        overall: 0,
        pacing: 0,
        dialogue: 0,
        emotion: 0,
        characterArc: 0,
        continuity: 0,
        storyStructure: 0,
        theme: 0,
        cinema: 0,
        formatting: 0,
        production: 0
      },
      summary: {
        scenesCount: scenes.length,
        charactersCount: cast.size,
        wordCount: 0
      }
    };
  }

  const dialogueRatio = totalBlocks ? dialogueBlocks / totalBlocks : 0;
  const actionRatio = totalBlocks ? actionBlocks / totalBlocks : 0;
  const pacing = Math.min(96, Math.round(62 + Math.min(25, scenes.length * 4) + (actionRatio * 15)));
  const dialogue = Math.min(95, Math.round(65 + Math.min(25, dialogueRatio * 45)));
  const formatting = Math.min(98, totalBlocks > 3 ? 88 : 74);
  const characterArc = Math.min(94, Math.round(60 + Math.min(30, cast.size * 7)));
  const overall = Math.round((pacing + dialogue + formatting + characterArc) / 4);

  return {
    script: {
      id: script?.id,
      title: script?.title || 'Untitled Screenplay',
      draft: script?.draft || 'Draft 1.0',
      pages: Math.max(1, Math.ceil(wordCount / 220))
    },
    scores: {
      overall,
      pacing,
      dialogue,
      emotion: Math.min(94, Math.round((dialogue + characterArc) / 2)),
      characterArc,
      continuity: Math.min(94, 72 + Math.min(20, scenes.length * 3)),
      storyStructure: Math.min(95, 70 + Math.min(22, scenes.length * 4)),
      theme: Math.min(92, 68 + Math.min(20, Math.round(wordCount / 120))),
      cinema: Math.min(95, Math.round(70 + actionRatio * 30)),
      formatting,
      production: Math.min(96, 74 + Math.min(20, scenes.length * 2))
    },
    summary: {
      scenesCount: scenes.length,
      charactersCount: cast.size,
      wordCount
    }
  };
}

export async function resetLocalWorkspace() {
  await initLocalRepository();
  revokeAllBlobUrls();
  await clearAllWorkspaceStores();

  cache.profile = null;
  cache.settings = { ...DEFAULT_SETTINGS };
  cache.selectedScriptId = null;
  cache.autoSaveEnabled = true;
  cache.theme = 'light';
  cache.scripts = [];
  cache.screenplays.clear();
  cache.versions.clear();
  cache.storyboards.clear();
  cache.storyboardPreferences = null;
  cache.storyboardRecycleBin.clear();
  cache.productionData.clear();
  cache.intelligence.clear();
  cache.chatHistory = [];
  cache.notifications = [];
  cache.cryptoKv.clear();

  const meta = await ensureInstallationMetadata();
  await setKv('meta:migrated_v1', { completed: true, resetAt: new Date().toISOString() });
  cache.installationId = meta.installationId;

  notifyWorkspaceUpdated('reset');
  emitWorkspaceChange('reset', {});
  return { success: true, installationId: meta.installationId };
}

/**
 * SCRIPTORA Authoritative Local IndexedDB Storage Engine
 *
 * Provides durable per-browser-profile persistence using IndexedDB across
 * all modules (scripts, screenplays, versions, storyboards, binary image blobs,
 * production records, intelligence, AI chat, settings, profile, notifications).
 *
 * Guarantees:
 * - Never falls back silently to volatile memory-only storage if IndexedDB fails.
 * - Resolves write operations only after the IndexedDB transaction completes cleanly.
 * - Isolates each browser profile with a unique installation ID while keeping
 *   same-profile tabs synchronized via BroadcastChannel.
 */

export const LOCAL_DB_NAME = 'scriptora_local_v1';
export const LOCAL_DB_VERSION = 1;
export const BROADCAST_CHANNEL_NAME = 'scriptora_local_workspace_v1';
const INSTALLATION_ID_STORAGE_KEY = 'scriptora_installation_id';

export const STORES = {
  KV: 'kv',
  SCRIPTS: 'scripts',
  SCREENPLAYS: 'screenplays',
  VERSIONS: 'versions',
  STORYBOARDS: 'storyboards',
  STORYBOARD_BLOBS: 'storyboardBlobs',
  STORYBOARD_RECYCLE_BIN: 'storyboardRecycleBin',
  PRODUCTION: 'productionData',
  INTELLIGENCE: 'intelligence'
};

export class LocalStorageUnavailableError extends Error {
  constructor(message, cause = null) {
    super(message);
    this.name = 'LocalStorageUnavailableError';
    this.code = 'INDEXEDDB_UNAVAILABLE';
    if (cause) this.cause = cause;
  }
}

export class LocalPersistenceError extends Error {
  constructor(message, code = 'INDEXEDDB_WRITE_FAILED', cause = null) {
    super(message);
    this.name = 'LocalPersistenceError';
    this.code = code;
    if (cause) this.cause = cause;
  }
}

function generateSecureId(prefix = 'inst') {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return `${prefix}_${crypto.randomUUID()}`;
    }
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
      return `${prefix}_${hex}`;
    }
  } catch (_) {}
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`;
}

let dbPromise = null;
let cachedDb = null;
let broadcastChannel = null;
const changeListeners = new Set();

function getIndexedDBFactory() {
  if (typeof globalThis !== 'undefined' && globalThis.indexedDB) {
    return globalThis.indexedDB;
  }
  if (typeof window !== 'undefined' && window.indexedDB) {
    return window.indexedDB;
  }
  return null;
}

export function getInstallationIdSync() {
  try {
    if (typeof localStorage !== 'undefined') {
      let existing = localStorage.getItem(INSTALLATION_ID_STORAGE_KEY);
      if (!existing || !existing.trim()) {
        existing = generateSecureId('inst');
        localStorage.setItem(INSTALLATION_ID_STORAGE_KEY, existing);
      }
      return existing;
    }
  } catch (_) {}
  return generateSecureId('inst');
}

export function setupBroadcastChannel() {
  if (broadcastChannel || typeof BroadcastChannel === 'undefined') {
    return broadcastChannel;
  }
  try {
    broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    broadcastChannel.onmessage = (event) => {
      const payload = event?.data;
      if (!payload || payload.type !== 'workspace-updated') return;
      changeListeners.forEach((listener) => {
        try {
          listener(payload);
        } catch (err) {
          console.warn('[LocalDB] Change listener error:', err);
        }
      });
    };
  } catch (err) {
    console.warn('[LocalDB] BroadcastChannel initialization failed:', err?.message || err);
  }
  return broadcastChannel;
}

export function onWorkspaceBroadcast(listener) {
  setupBroadcastChannel();
  changeListeners.add(listener);
  return () => changeListeners.delete(listener);
}

export function notifyWorkspaceUpdated(area, detail = {}) {
  try {
    const channel = setupBroadcastChannel();
    if (channel) {
      channel.postMessage({
        type: 'workspace-updated',
        area,
        detail,
        ts: Date.now()
      });
    }
  } catch (_) {}
}

export function openLocalDatabase() {
  if (cachedDb) return Promise.resolve(cachedDb);
  if (dbPromise) return dbPromise;

  const factory = getIndexedDBFactory();
  if (!factory) {
    return Promise.reject(
      new LocalStorageUnavailableError(
        'IndexedDB is not available in this browser environment. SCRIPTORA requires IndexedDB to store your local workspace safely.'
      )
    );
  }

  dbPromise = new Promise((resolve, reject) => {
    let request;
    try {
      request = factory.open(LOCAL_DB_NAME, LOCAL_DB_VERSION);
    } catch (err) {
      dbPromise = null;
      reject(new LocalStorageUnavailableError('Failed to open local IndexedDB workspace database.', err));
      return;
    }

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORES.KV)) {
        db.createObjectStore(STORES.KV, { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains(STORES.SCRIPTS)) {
        db.createObjectStore(STORES.SCRIPTS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORES.SCREENPLAYS)) {
        db.createObjectStore(STORES.SCREENPLAYS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORES.VERSIONS)) {
        db.createObjectStore(STORES.VERSIONS, { keyPath: 'scriptId' });
      }
      if (!db.objectStoreNames.contains(STORES.STORYBOARDS)) {
        db.createObjectStore(STORES.STORYBOARDS, { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains(STORES.STORYBOARD_BLOBS)) {
        db.createObjectStore(STORES.STORYBOARD_BLOBS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORES.STORYBOARD_RECYCLE_BIN)) {
        db.createObjectStore(STORES.STORYBOARD_RECYCLE_BIN, { keyPath: 'scriptId' });
      }
      if (!db.objectStoreNames.contains(STORES.PRODUCTION)) {
        db.createObjectStore(STORES.PRODUCTION, { keyPath: 'scriptId' });
      }
      if (!db.objectStoreNames.contains(STORES.INTELLIGENCE)) {
        db.createObjectStore(STORES.INTELLIGENCE, { keyPath: 'scriptId' });
      }
    };

    request.onblocked = () => {
      dbPromise = null;
      reject(
        new LocalStorageUnavailableError(
          'Local workspace database upgrade is blocked by another open tab. Please close other SCRIPTORA tabs and reload.'
        )
      );
    };

    request.onerror = () => {
      dbPromise = null;
      reject(
        new LocalStorageUnavailableError(
          `Failed to open IndexedDB workspace database: ${request.error?.message || 'Unknown error'}`,
          request.error
        )
      );
    };

    request.onsuccess = () => {
      const db = request.result;
      cachedDb = db;
      db.onversionchange = () => {
        try {
          db.close();
        } catch (_) {}
        cachedDb = null;
        dbPromise = null;
      };
      db.onclose = () => {
        cachedDb = null;
        dbPromise = null;
      };
      setupBroadcastChannel();
      resolve(db);
    };
  });

  return dbPromise;
}

export function closeLocalDatabase() {
  if (cachedDb) {
    try {
      cachedDb.close();
    } catch (_) {}
    cachedDb = null;
  }
  dbPromise = null;
  if (broadcastChannel) {
    try {
      broadcastChannel.close();
    } catch (_) {}
    broadcastChannel = null;
  }
}

export function reqToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('IndexedDB request failed'));
  });
}

export async function withTransaction(storeNames, mode, executor) {
  const db = await openLocalDatabase();
  const names = Array.isArray(storeNames) ? storeNames : [storeNames];

  return new Promise((resolve, reject) => {
    let tx;
    let settled = false;
    let resultValue;

    const fail = (err) => {
      if (settled) return;
      settled = true;
      const isQuota = err?.name === 'QuotaExceededError';
      const message = isQuota
        ? 'Browser storage quota exceeded. Export your workspace backup or delete unused storyboard frames before saving more data.'
        : (err?.message || 'IndexedDB transaction failed');
      reject(new LocalPersistenceError(message, isQuota ? 'QUOTA_EXCEEDED' : 'INDEXEDDB_WRITE_FAILED', err));
    };

    try {
      tx = db.transaction(names, mode);
    } catch (err) {
      fail(err);
      return;
    }

    tx.oncomplete = () => {
      if (settled) return;
      settled = true;
      resolve(resultValue);
    };
    tx.onerror = () => fail(tx.error);
    tx.onabort = () => fail(tx.error || new Error('IndexedDB transaction aborted'));

    try {
      const stores = {};
      names.forEach((n) => {
        stores[n] = tx.objectStore(n);
      });
      const maybePromise = executor(names.length === 1 ? stores[names[0]] : stores, tx);
      Promise.resolve(maybePromise)
        .then((val) => {
          resultValue = val;
        })
        .catch((err) => {
          try {
            tx.abort();
          } catch (_) {}
          fail(err);
        });
    } catch (err) {
      try {
        tx.abort();
      } catch (_) {}
      fail(err);
    }
  });
}

export async function getRecord(storeName, key) {
  return withTransaction(storeName, 'readonly', (store) => reqToPromise(store.get(key)));
}

export async function getAllRecords(storeName) {
  return withTransaction(storeName, 'readonly', (store) => reqToPromise(store.getAll()));
}

export async function putRecord(storeName, value) {
  return withTransaction(storeName, 'readwrite', (store) => reqToPromise(store.put(value)));
}

export async function deleteRecord(storeName, key) {
  return withTransaction(storeName, 'readwrite', (store) => reqToPromise(store.delete(key)));
}

export async function clearStore(storeName) {
  return withTransaction(storeName, 'readwrite', (store) => reqToPromise(store.clear()));
}

export async function clearAllWorkspaceStores() {
  const allStores = Object.values(STORES);
  return withTransaction(allStores, 'readwrite', async (stores) => {
    await Promise.all(allStores.map((name) => reqToPromise(stores[name].clear())));
  });
}

export async function getKv(key, defaultValue = null) {
  const rec = await getRecord(STORES.KV, key);
  return rec ? rec.value : defaultValue;
}

export async function setKv(key, value) {
  return putRecord(STORES.KV, { key, value, updatedAt: new Date().toISOString() });
}

export async function deleteKv(key) {
  return deleteRecord(STORES.KV, key);
}

export async function ensureInstallationMetadata() {
  let meta = await getKv('meta:installation', null);
  const storageId = typeof localStorage !== 'undefined' ? localStorage.getItem(INSTALLATION_ID_STORAGE_KEY) : null;

  if (meta && meta.installationId) {
    if (typeof localStorage !== 'undefined' && storageId !== meta.installationId) {
      try {
        localStorage.setItem(INSTALLATION_ID_STORAGE_KEY, meta.installationId);
      } catch (_) {}
    }
    return meta;
  }

  const installationId = (storageId && storageId.trim()) ? storageId.trim() : generateSecureId('inst');
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(INSTALLATION_ID_STORAGE_KEY, installationId);
    } catch (_) {}
  }

  meta = {
    installationId,
    createdAt: new Date().toISOString(),
    schemaVersion: LOCAL_DB_VERSION,
    mode: 'local'
  };
  await setKv('meta:installation', meta);
  return meta;
}

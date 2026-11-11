import assert from 'node:assert/strict';

function createStorageMock() {
  const map = new Map();
  return {
    get length() { return map.size; },
    key(index) { return Array.from(map.keys())[index] ?? null; },
    getItem(k) { return map.has(String(k)) ? map.get(String(k)) : null; },
    setItem(k, v) { map.set(String(k), String(v)); },
    removeItem(k) { map.delete(String(k)); },
    clear() { map.clear(); }
  };
}

function createIndexedDBMock() {
  const databases = new Map();
  let forceAbortNextWrite = false;

  function makeRequest(executor) {
    const req = {
      result: undefined,
      error: null,
      onsuccess: null,
      onerror: null,
      onupgradeneeded: null,
      onblocked: null
    };
    setTimeout(() => executor(req), 0);
    return req;
  }

  class MockObjectStore {
    constructor(name, meta, dataMap, tx) {
      this.name = name;
      this.keyPath = meta.keyPath;
      this._data = dataMap;
      this._tx = tx;
    }
    _run(fn) {
      const req = { result: undefined, error: null, onsuccess: null, onerror: null };
      this._tx._pending++;
      setTimeout(() => {
        if (this._tx._aborted) {
          this._tx._pending--;
          return;
        }
        try {
          if (forceAbortNextWrite && this._tx.mode === 'readwrite') {
            forceAbortNextWrite = false;
            throw new Error('Simulated IDB disk write failure');
          }
          req.result = fn();
          if (req.onsuccess) req.onsuccess({ target: req });
        } catch (err) {
          req.error = err;
          if (req.onerror) req.onerror({ target: req });
          this._tx._fail(err);
        } finally {
          setTimeout(() => {
            this._tx._pending--;
            this._tx._maybeFinish();
          }, 0);
        }
      }, 0);
      return req;
    }
    get(key) {
      return this._run(() => this._data.get(key));
    }
    getAll() {
      return this._run(() => Array.from(this._data.values()));
    }
    put(value) {
      return this._run(() => {
        const key = this.keyPath ? value[this.keyPath] : undefined;
        if (key === undefined) throw new Error(`Missing keyPath "${this.keyPath}" on store "${this.name}"`);
        this._data.set(key, value);
        return key;
      });
    }
    delete(key) {
      return this._run(() => {
        this._data.delete(key);
        return undefined;
      });
    }
    clear() {
      return this._run(() => {
        this._data.clear();
        return undefined;
      });
    }
  }

  class MockTransaction {
    constructor(db, storeNames, mode) {
      this.db = db;
      this.mode = mode;
      this.error = null;
      this.oncomplete = null;
      this.onerror = null;
      this.onabort = null;
      this._pending = 0;
      this._aborted = false;
      this._stores = new Map();
      const names = Array.isArray(storeNames) ? storeNames : [storeNames];
      for (const n of names) {
        if (!db._stores.has(n)) {
          throw new Error(`Unknown store: ${n}`);
        }
        this._stores.set(n, new MockObjectStore(n, db._meta.get(n), db._stores.get(n), this));
      }
      setTimeout(() => this._maybeFinish(), 0);
    }
    objectStore(name) {
      const s = this._stores.get(name);
      if (!s) throw new Error(`Store ${name} not in transaction`);
      return s;
    }
    abort() {
      this._aborted = true;
      if (this.onabort) this.onabort({ target: this });
    }
    _fail(err) {
      if (this._aborted) return;
      this._aborted = true;
      this.error = err;
      if (this.onerror) this.onerror({ target: this });
      if (this.onabort) this.onabort({ target: this });
    }
    _maybeFinish() {
      if (this._aborted || this._pending > 0) return;
      if (this.oncomplete) {
        const cb = this.oncomplete;
        this.oncomplete = null;
        cb({ target: this });
      }
    }
  }

  class MockDatabase {
    constructor(name, version) {
      this.name = name;
      this.version = version;
      this._stores = new Map();
      this._meta = new Map();
      this.onversionchange = null;
      this.objectStoreNames = {
        contains: (storeName) => this._stores.has(storeName)
      };
    }
    createObjectStore(name, options = {}) {
      if (!this._stores.has(name)) {
        this._stores.set(name, new Map());
        this._meta.set(name, { keyPath: options.keyPath || 'id' });
      }
      return {};
    }
    transaction(storeNames, mode = 'readonly') {
      return new MockTransaction(this, storeNames, mode);
    }
    close() {}
  }

  return {
    __setForceAbortNextWrite(v) { forceAbortNextWrite = v; },
    __databases: databases,
    open(name, version = 1) {
      return makeRequest((req) => {
        let db = databases.get(name);
        const isUpgrade = !db || db.version < version;
        if (!db) {
          db = new MockDatabase(name, version);
          databases.set(name, db);
        }
        req.result = db;
        if (isUpgrade && req.onupgradeneeded) {
          req.onupgradeneeded({ target: req });
        }
        if (req.onsuccess) {
          req.onsuccess({ target: req });
        }
      });
    },
    deleteDatabase(name) {
      return makeRequest((req) => {
        databases.delete(name);
        if (req.onsuccess) req.onsuccess({ target: req });
      });
    }
  };
}

// Install clean global browser shims BEFORE importing modules
const localStorageMock = createStorageMock();
const sessionStorageMock = createStorageMock();
const idbMock = createIndexedDBMock();
const cloudFetchCalls = [];
const allocatedObjectUrls = new Map();
let objectUrlCounter = 0;

globalThis.localStorage = localStorageMock;
globalThis.sessionStorage = sessionStorageMock;
globalThis.indexedDB = idbMock;
globalThis.fetch = async (url) => {
  cloudFetchCalls.push(String(url));
  throw new Error(`Unexpected network fetch during offline/local unit test: ${url}`);
};

URL.createObjectURL = (blob) => {
  const url = `blob:mock-origin/${++objectUrlCounter}`;
  allocatedObjectUrls.set(url, blob);
  return url;
};
URL.revokeObjectURL = (url) => {
  allocatedObjectUrls.delete(url);
};

class MockBroadcastChannel {
  constructor(name) { this.name = name; this.onmessage = null; }
  postMessage() {}
  close() {}
}
globalThis.BroadcastChannel = MockBroadcastChannel;

const dataMode = await import('../frontend/src/services/dataMode.js');
const localDb = await import('../frontend/src/services/localDatabase.js');
const migration = await import('../frontend/src/services/localMigration.js');
const backup = await import('../frontend/src/services/localBackup.js');
const localRepo = await import('../frontend/src/services/localRepository.js');
const cloudStorage = await import('../frontend/src/services/cloudStorage.js');
const api = await import('../frontend/src/services/api.js');

// Test 1: dataMode defaults to local
assert.equal(dataMode.getDataMode(), 'local', 'Default data mode must be local');
assert.equal(dataMode.isLocalMode(), true, 'isLocalMode must default to true');
assert.equal(dataMode.isCloudMode(), false, 'isCloudMode must default to false');

// Test 2: IndexedDB unavailability throws explicitly (no silent memory fallback)
globalThis.indexedDB = undefined;
localDb.closeLocalDatabase();
await assert.rejects(
  () => localDb.openLocalDatabase(),
  (err) => err instanceof localDb.LocalStorageUnavailableError
);
globalThis.indexedDB = idbMock;

// Test 3: Seed legacy localStorage BEFORE first init and verify one-time idempotent migration + binary Blob conversion
const tinyPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';
localStorageMock.setItem('scriptora_u_userA_scripts', JSON.stringify([
  { id: 'legacy-1', title: 'Legacy Feature Script', logline: 'Migrated cleanly', author: 'Writer', pages: 12 }
]));
localStorageMock.setItem('scriptora_u_userA_screenplay_legacy-1', JSON.stringify({
  id: 'legacy-1',
  title: 'Legacy Feature Script',
  scenes: [{ id: 'sc-1', heading: 'INT. ROOM - DAY', blocks: [{ type: 'action', text: 'Migrated block' }] }]
}));
localStorageMock.setItem('scriptora_u_userA_storyboard_legacy-1_sc-1', JSON.stringify({
  scriptId: 'legacy-1',
  sceneId: 'sc-1',
  shots: [{ id: 'sh-legacy', shotNumber: 1, title: 'Opening', imageUrl: `data:image/png;base64,${tinyPngBase64}` }]
}));

await localRepo.initLocalRepository();
const migratedScripts = localRepo.getCachedScripts();
assert.equal(migratedScripts.length, 1, 'Legacy script should migrate into IndexedDB');
assert.equal(migratedScripts[0].title, 'Legacy Feature Script');
const migratedSb = await api.getStoryboard('legacy-1', 'sc-1');
assert.ok(migratedSb.shots[0].blobId, 'Migrated base64 storyboard image must become IndexedDB blobId');
assert.ok(migratedSb.shots[0].imageUrl.startsWith('idb-blob://'), 'Stored shot URI must be canonical idb-blob://');
assert.ok(localRepo.resolveBlobUriSync(migratedSb.shots[0].imageUrl).startsWith('blob:mock-origin/'), 'Resolved shot URL must become live object URL');
const secondMigrationRun = await migration.migrateLegacyLocalStorageIfNeeded();
assert.equal(secondMigrationRun.migrated, false, 'Migration must be idempotent');

// Test 4: Simulate persistence error (no silent swallow)
idbMock.__setForceAbortNextWrite(true);
await assert.rejects(
  () => localRepo.createScript({ title: 'Should Fail Write' }),
  /Simulated IDB disk write failure|failed/i
);

// Test 5: Full CRUD across scripts, screenplays, storyboards + binary Blob, production, intelligence, profile & reload
const created = await api.createScript({ title: 'DEVICE A TEST', logline: 'Isolated IndexedDB test' });
assert.ok(created.id);
await api.saveScreenplay(created.id, {
  id: created.id,
  title: 'DEVICE A TEST',
  scenes: [{ id: 'scene-1', heading: 'EXT. ROOFTOP - NIGHT', blocks: [{ type: 'action', text: 'Rain falls.' }] }]
});

const blobBytes = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 1, 2, 3]);
const rawBlob = new Blob([blobBytes], { type: 'image/png' });
const storedBlob = await localRepo.saveStoryboardBlob(rawBlob, {
  scriptId: created.id,
  sceneId: 'scene-1',
  shotId: 'shot-1',
  source: 'test'
});
assert.ok(storedBlob.blobUri.startsWith('idb-blob://'));

await api.saveStoryboard(created.id, {
  sceneId: 'scene-1',
  shots: [{
    id: 'shot-1',
    shotNumber: 1,
    shotTitle: 'Rain Close-up',
    description: 'Rain drops on camera lens',
    imageUrl: storedBlob.objectUrl,
    blobId: storedBlob.blobId
  }]
});

await api.createBreakdownItem(created.id, { id: 'el-1', name: 'Umbrella', category: 'Props' });
await api.updateProfile({ name: 'Director Alpha', headline: 'Local Author' });
await api.updateSettings({ appearance: 'Dark' });

// Verify zero cloud leakage
const cloudCfg = cloudStorage.isCloudConfigured();
assert.equal(cloudCfg.isConfigured, false, 'Cloud storage must report disabled in local mode');
assert.equal(cloudCfg.activeImageProvider, 'local-indexeddb');
assert.equal(cloudFetchCalls.length, 0, 'Zero remote/cloud fetch calls allowed in local mode');

// Force DB close + cache reload (simulates hard browser refresh)
localDb.closeLocalDatabase();
localRepo.revokeAllBlobUrls();
await localRepo.reloadLocalRepository();

const reloadedScripts = await api.getScripts();
assert.ok(reloadedScripts.some(s => s.title === 'DEVICE A TEST'), 'Script must persist across IndexedDB reopen');
const reloadedSp = await api.getScreenplay(created.id);
assert.equal(reloadedSp.scenes[0].blocks[0].text, 'Rain falls.');
const reloadedSb = await api.getStoryboard(created.id, 'scene-1');
assert.equal(reloadedSb.shots[0].blobId, storedBlob.blobId);
assert.ok(localRepo.resolveBlobUriSync(reloadedSb.shots[0].imageUrl).startsWith('blob:mock-origin/'), 'Reloaded shot must hydrate fresh blob URL');
const reloadedBreakdown = await api.getProductionBreakdown(created.id);
assert.equal(reloadedBreakdown.length, 1);
assert.equal(reloadedBreakdown[0].name, 'Umbrella');
assert.equal((await api.getProfile()).name, 'Director Alpha');

// Test 6: SignOut marks session signed out while preserving local IndexedDB workspace data, and login clears signed-out flag
await api.signOut();
assert.equal(localRepo.isLocalSignedOutSync(), true, 'signOut must mark local session signed out');
assert.equal(await api.getCurrentUser(), null, 'getCurrentUser must return null while signed out');
const afterSignoutScripts = await api.getScripts();
assert.ok(afterSignoutScripts.some(s => s.title === 'DEVICE A TEST'), 'signOut must preserve IndexedDB workspace in local mode');

// Signing back in clears signedOut flag without losing existing local data
await api.login({ email: 'director@local.test', password: 'secret' });
assert.equal(localRepo.isLocalSignedOutSync(), false, 'login must clear local signed-out flag');
assert.ok((await api.getCurrentUser()) !== null, 'getCurrentUser must restore after login');
assert.ok((await api.getScripts()).some(s => s.title === 'DEVICE A TEST'), 'login must retain existing local scripts');

// Test 7: Export JSON backup -> resetLocalWorkspace -> verify empty -> validate & restore backup
const exported = await backup.exportWorkspaceBackupPayload();
assert.equal(exported.format, backup.BACKUP_FORMAT);
assert.ok(exported.data.scripts.some(s => s.title === 'DEVICE A TEST'));
assert.ok(exported.data.storyboardBlobs.length >= 2);
assert.throws(() => backup.validateWorkspaceBackup({ format: 'wrong' }));

await api.resetLocalWorkspace();
assert.equal((await api.getScripts()).length, 0, 'Reset must clear local scripts');

await backup.restoreWorkspaceBackupPayload(exported, { merge: false });
await localRepo.reloadLocalRepository();
const restoredScripts = await api.getScripts();
assert.ok(restoredScripts.some(s => s.title === 'DEVICE A TEST'), 'Restored backup must recover scripts');
const restoredSb = await api.getStoryboard(created.id, 'scene-1');
assert.ok(localRepo.resolveBlobUriSync(restoredSb.shots[0].imageUrl).startsWith('blob:mock-origin/'), 'Restored backup must rehydrate image Blob');

console.log('ALL LOCAL INDEXEDDB MODE TESTS PASSED!');

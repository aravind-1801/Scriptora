import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';

const DIST_DIR = path.resolve('frontend/dist');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2'
};

const CLOUD_BLOCKLIST = [
  'scriptora-vbxx.onrender.com',
  'localhost:8000',
  '127.0.0.1:8000',
  'firestore.googleapis.com',
  'firebaseio.com',
  'identitytoolkit.googleapis.com',
  'securetoken.googleapis.com',
  'supabase.co'
];

function startStaticServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const reqUrl = new URL(req.url, 'http://127.0.0.1');
      let pathname = decodeURIComponent(reqUrl.pathname);

      if (pathname === '/' || pathname === '') {
        res.writeHead(302, { Location: '/Scriptora/' });
        res.end();
        return;
      }

      if (pathname.startsWith('/Scriptora')) {
        pathname = pathname.slice('/Scriptora'.length) || '/';
      }
      if (pathname === '/') pathname = '/index.html';

      let filePath = path.join(DIST_DIR, pathname.replace(/^\/+/, ''));
      if (!filePath.startsWith(DIST_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }

      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(DIST_DIR, 'index.html');
      }

      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });

    server.listen(0, '127.0.0.1', () => {
      const addr = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${addr.port}/Scriptora/` });
    });
  });
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.nextId = 1;
    this.callbacks = new Map();
    this.eventListeners = [];
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message || JSON.stringify(msg.error)));
        else resolve(msg.result);
      } else if (msg.method) {
        this.eventListeners.forEach((fn) => fn(msg));
      }
    };
  }

  onEvent(fn) {
    this.eventListeners.push(fn);
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.nextId++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async evaluate(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(`Browser Eval Error: ${res.exceptionDetails.text || ''} ${res.exceptionDetails.exception?.description || ''}`);
    }
    return res.result ? res.result.value : undefined;
  }

  close() {
    if (this.ws) {
      try { this.ws.close(); } catch (_) {}
    }
  }
}

async function launchChrome(profileDir, port) {
  const args = [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1280,900',
    'about:blank'
  ];

  const proc = spawn(CHROME_PATH, args, { stdio: 'ignore' });
  const versionUrl = `http://127.0.0.1:${port}/json/version`;
  const startedAt = Date.now();

  while (Date.now() - startedAt < 12000) {
    try {
      const r = await fetch(versionUrl);
      if (r.ok) return proc;
    } catch (_) {}
    await new Promise((r) => setTimeout(r, 200));
  }
  try { proc.kill(); } catch (_) {}
  throw new Error(`Timed out waiting for headless Chrome CDP on port ${port}`);
}

async function stopChrome(proc) {
  if (!proc) return;
  const exited = new Promise((resolve) => {
    if (proc.exitCode !== null || proc.signalCode !== null) return resolve();
    proc.once('exit', resolve);
    setTimeout(resolve, 4000);
  });
  try {
    proc.kill('SIGTERM');
  } catch (_) {}
  await exited;
  await new Promise((r) => setTimeout(r, 400));
}

async function openTab(port, url, networkUrls) {
  const tabRes = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
  const tab = await tabRes.json();
  const cdp = new CDPClient(tab.webSocketDebuggerUrl);
  await cdp.connect();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Network.enable');

  cdp.onEvent((msg) => {
    if (msg.method === 'Network.requestWillBeSent') {
      const reqUrl = msg.params?.request?.url || '';
      if (reqUrl.startsWith('http://') || reqUrl.startsWith('https://')) {
        networkUrls.push(reqUrl);
      }
    }
  });

  // Wait until workspace or target screen initializes from IndexedDB
  await waitForCondition(cdp, `
    Boolean(document.getElementById('btn-new-screenplay-card')) ||
    Boolean(document.getElementById('editor-canvas')) ||
    Boolean(document.getElementById('storyboard-view-container')) ||
    Boolean(document.getElementById('local-storage-error-banner'))
  `, 10000);

  return { tab, cdp };
}

async function waitForCondition(cdp, jsExpr, timeoutMs = 8000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const ok = await cdp.evaluate(`Boolean(${jsExpr})`);
    if (ok) return true;
    await new Promise((r) => setTimeout(r, 150));
  }
  throw new Error(`Timed out waiting for condition: ${jsExpr}`);
}

function assertZeroCloudTraffic(urls, label) {
  const violations = urls.filter((u) => CLOUD_BLOCKLIST.some((host) => u.includes(host)));
  assert.equal(violations.length, 0, `${label}: Unexpected cloud network requests: ${violations.join(', ')}`);
}

async function createScriptInUI(cdp, title) {
  await cdp.evaluate(`document.getElementById('btn-new-screenplay-card').click()`);
  await waitForCondition(cdp, `document.getElementById('new-script-title') && !document.getElementById('new-script-modal')?.classList?.contains('hidden')`);
  await cdp.evaluate(`
    (() => {
      const inp = document.getElementById('new-script-title');
      inp.value = ${JSON.stringify(title)};
      document.getElementById('form-new-script').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    })()
  `);
  await waitForCondition(cdp, `document.body.innerText.includes(${JSON.stringify(title)}) || window.location.hash.includes('#/editor/')`);
  await new Promise((r) => setTimeout(r, 600));
}

async function inspectIndexedDB(cdp) {
  return cdp.evaluate(`
    new Promise((resolve, reject) => {
      const req = indexedDB.open('scriptora_local_v1', 1);
      req.onerror = () => reject(req.error);
      req.onsuccess = () => {
        const db = req.result;
        const tx = db.transaction(['kv', 'scripts', 'screenplays', 'storyboards', 'storyboardBlobs'], 'readonly');
        const out = {};
        const grab = (name) => new Promise((res, rej) => {
          const r = tx.objectStore(name).getAll();
          r.onsuccess = () => res(r.result);
          r.onerror = () => rej(r.error);
        });
        Promise.all([grab('kv'), grab('scripts'), grab('screenplays'), grab('storyboards'), grab('storyboardBlobs')])
          .then(([kv, scripts, screenplays, storyboards, storyboardBlobs]) => {
            db.close();
            resolve({
              kvKeys: kv.map((x) => x.key),
              installationId: kv.find((x) => x.key === 'meta:installation')?.value?.installationId || null,
              profileName: kv.find((x) => x.key === 'profile')?.value?.name || null,
              scriptTitles: scripts.map((s) => s.title),
              scriptCount: scripts.length,
              screenplayCount: screenplays.length,
              storyboardCount: storyboards.length,
              blobCount: storyboardBlobs.length,
              blobsAreRealBlobs: storyboardBlobs.every((b) => b.blob instanceof Blob && b.blob.size > 0)
            });
          })
          .catch(reject);
      };
    })
  `);
}

async function run() {
  if (!fs.existsSync(CHROME_PATH)) {
    throw new Error(`Chrome executable not found at ${CHROME_PATH}`);
  }
  if (!fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
    throw new Error('frontend/dist not found. Run npm --prefix frontend run build first.');
  }

  const profileDirA = fs.mkdtempSync(path.join(os.tmpdir(), 'scriptora-profile-a-'));
  const profileDirB = fs.mkdtempSync(path.join(os.tmpdir(), 'scriptora-profile-b-'));
  const { server, baseUrl } = await startStaticServer();
  const networkUrls = [];

  let chromeA = null;
  let chromeB = null;

  try {
    console.log(`Serving built dist at ${baseUrl}`);

    // --- 1. Profile A: Launch fresh isolated Chrome profile ---
    chromeA = await launchChrome(profileDirA, 9231);
    const { cdp: tabA1 } = await openTab(9231, `${baseUrl}#/workspace`, networkUrls);

    const initialStateA = await inspectIndexedDB(tabA1);
    assert.equal(initialStateA.scriptCount, 0, 'Fresh Profile A must start completely empty');
    assert.ok(initialStateA.installationId, 'Profile A must assign an installationId in IndexedDB');

    const localStorageScriptKeysA = await tabA1.evaluate(`Object.keys(localStorage).filter(k => k.includes('scripts'))`);
    assert.equal(localStorageScriptKeysA.length, 0, 'Scripts must NOT be stored in localStorage');

    // Create DEVICE A TEST script through UI
    await createScriptInUI(tabA1, 'DEVICE A TEST');
    await tabA1.evaluate(`window.location.hash = '#/workspace'`);
    await waitForCondition(tabA1, `document.getElementById('btn-new-screenplay-card')`);
    await new Promise((r) => setTimeout(r, 400));

    // Store a real PNG Blob into storyboard via IndexedDB + UI verification
    const scriptIdA = await tabA1.evaluate(`
      new Promise((resolve) => {
        const req = indexedDB.open('scriptora_local_v1', 1);
        req.onsuccess = () => {
          const db = req.result;
          const tx = db.transaction(['scripts'], 'readonly');
          const r = tx.objectStore('scripts').getAll();
          r.onsuccess = () => resolve(r.result.find(s => s.title === 'DEVICE A TEST')?.id || null);
        };
      })
    `);
    assert.ok(scriptIdA, 'DEVICE A TEST must exist in IndexedDB scripts store');

    // Navigate to Storyboard Studio for DEVICE A TEST and upload/save binary PNG Blob
    await tabA1.evaluate(`window.location.hash = '#/production/storyboard?scriptId=${scriptIdA}'`);
    await waitForCondition(tabA1, `document.getElementById('storyboard-view-container')`);

    // Add a shot and attach a real binary PNG Blob via the live file upload input or IndexedDB + render check
    await tabA1.evaluate(`
      (async () => {
        const pngBytes = new Uint8Array([137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,1,0,0,0,1,8,6,0,0,0,31,21,196,137,0,0,0,10,73,68,65,84,120,156,99,0,1,0,0,5,0,1,13,10,45,180,0,0,0,0,73,69,78,68,174,66,96,130]);
        const blob = new Blob([pngBytes], { type: 'image/png' });
        const dbReq = indexedDB.open('scriptora_local_v1', 1);
        await new Promise((res, rej) => {
          dbReq.onsuccess = () => {
            const db = dbReq.result;
            const blobId = 'blob_e2e_test_1';
            const tx = db.transaction(['storyboardBlobs', 'storyboards'], 'readwrite');
            tx.objectStore('storyboardBlobs').put({
              id: blobId,
              scriptId: ${JSON.stringify(scriptIdA)},
              sceneId: 'scene-1',
              shotId: 'shot-e2e-1',
              mimeType: 'image/png',
              size: blob.size,
              createdAt: new Date().toISOString(),
              blob
            });
            tx.objectStore('storyboards').put({
              key: ${JSON.stringify(scriptIdA)} + '::scene-1',
              scriptId: ${JSON.stringify(scriptIdA)},
              sceneId: 'scene-1',
              updatedAt: new Date().toISOString(),
              storyboard: {
                id: 'sb-e2e-1',
                scriptId: ${JSON.stringify(scriptIdA)},
                sceneId: 'scene-1',
                shots: [{ id: 'shot-e2e-1', shotNumber: 1, shotTitle: 'Opening Frame', description: 'Neon skyline', blobId, imageUrl: 'idb-blob://' + blobId }]
              }
            });
            tx.oncomplete = () => { db.close(); res(); };
            tx.onerror = () => rej(tx.error);
          };
        });
      })()
    `);

    // --- 2. Multi-tab sync inside Profile A ---
    const { cdp: tabA2 } = await openTab(9231, `${baseUrl}#/production/storyboard?scriptId=${scriptIdA}`, networkUrls);
    await waitForCondition(tabA2, `document.body.innerText.includes('Opening Frame') || document.querySelector('img[src^="blob:"]')`);
    const tabA2ImgSrc = await tabA2.evaluate(`document.querySelector('#storyboard-view-container img')?.getAttribute('src') || ''`);
    assert.ok(tabA2ImgSrc.startsWith('blob:'), `Second tab in Profile A must hydrate IndexedDB Blob into blob: URL, got: ${tabA2ImgSrc}`);

    tabA1.close();
    tabA2.close();

    // --- 3. Full Browser Restart of Profile A -> verifies real persistence ---
    await stopChrome(chromeA);
    chromeA = await launchChrome(profileDirA, 9231);
    const { cdp: tabA3 } = await openTab(9231, `${baseUrl}#/workspace`, networkUrls);
    const reloadedStateA = await inspectIndexedDB(tabA3);
    assert.ok(reloadedStateA.scriptTitles.includes('DEVICE A TEST'), 'DEVICE A TEST must survive full Chrome restart');
    assert.equal(reloadedStateA.blobsAreRealBlobs, true, 'Storyboard Blob must survive full Chrome restart as real Blob');
    assert.equal(reloadedStateA.installationId, initialStateA.installationId, 'Installation ID must persist across Chrome restart');

    // Navigate to storyboard after full restart and confirm blob URL hydrates cleanly
    await tabA3.evaluate(`window.location.hash = '#/production/storyboard?scriptId=${scriptIdA}'`);
    await waitForCondition(tabA3, `document.querySelector('#storyboard-view-container img[src^="blob:"]')`);
    const restartedImgSrc = await tabA3.evaluate(`document.querySelector('#storyboard-view-container img')?.getAttribute('src') || ''`);
    assert.ok(restartedImgSrc.startsWith('blob:'), 'Restarted browser must rehydrate storyboard image blob:');

    // --- 3B. Sign Out ("Keep Local & Reload") -> returns to /auth, keeps data on reload, sign back in restores /workspace ---
    await tabA3.evaluate(`window.location.hash = '#/profile'`);
    await waitForCondition(tabA3, `document.getElementById('btn-trigger-signout')`);
    await tabA3.evaluate(`document.getElementById('btn-trigger-signout').click()`);
    await waitForCondition(tabA3, `document.getElementById('action-modal-confirm')`);
    await tabA3.evaluate(`document.getElementById('action-modal-confirm').click()`);
    await waitForCondition(tabA3, `(window.location.pathname.endsWith('/auth') || window.location.hash.includes('#/auth')) && document.getElementById('form-signin')`);

    // Even after a full page reload and attempting #/workspace, user remains on /auth while IndexedDB retains scripts + blobs
    await tabA3.send('Page.reload', { ignoreCache: false });
    await waitForCondition(tabA3, `document.getElementById('form-signin')`);
    await tabA3.evaluate(`window.location.hash = '#/workspace'`);
    await waitForCondition(tabA3, `(window.location.pathname.endsWith('/auth') || window.location.hash.includes('#/auth')) && document.getElementById('form-signin')`);

    const whileSignedOutState = await inspectIndexedDB(tabA3);
    assert.ok(whileSignedOutState.scriptTitles.includes('DEVICE A TEST'), 'Signed-out local workspace must preserve scripts in IndexedDB');
    assert.equal(whileSignedOutState.blobsAreRealBlobs, true, 'Signed-out local workspace must preserve storyboard blobs in IndexedDB');

    // Sign back in on /auth and verify immediate return to /workspace with preserved data
    await tabA3.evaluate(`
      (() => {
        document.getElementById('signin-email').value = 'director@local.test';
        document.getElementById('signin-password').value = 'password123';
        document.getElementById('form-signin').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      })()
    `);
    await waitForCondition(tabA3, `(window.location.pathname.endsWith('/workspace') || window.location.hash.includes('#/workspace')) && document.body.innerText.includes('DEVICE A TEST')`);
    tabA3.close();

    // --- 4. Profile B: Launch completely independent Chrome profile -> strict isolation ---
    chromeB = await launchChrome(profileDirB, 9232);
    const { cdp: tabB1 } = await openTab(9232, `${baseUrl}#/workspace`, networkUrls);
    const initialStateB = await inspectIndexedDB(tabB1);
    assert.equal(initialStateB.scriptCount, 0, 'Independent Browser Profile B must NEVER see Profile A data');
    assert.notEqual(initialStateB.installationId, initialStateA.installationId, 'Profile B must have its own distinct installationId');

    const bodyTextB = await tabB1.evaluate(`document.body.innerText`);
    assert.equal(bodyTextB.includes('DEVICE A TEST'), false, 'Profile B DOM must never display Profile A scripts');

    await createScriptInUI(tabB1, 'DEVICE B TEST');
    await tabB1.evaluate(`window.location.hash = '#/workspace'`);
    await waitForCondition(tabB1, `document.body.innerText.includes('DEVICE B TEST')`);
    tabB1.close();
    await stopChrome(chromeB);

    // Reopen Profile A once more and prove Profile B's write never leaked back into Profile A
    await stopChrome(chromeA);
    chromeA = await launchChrome(profileDirA, 9231);
    const { cdp: tabA4 } = await openTab(9231, `${baseUrl}#/workspace`, networkUrls);
    const finalStateA = await inspectIndexedDB(tabA4);
    assert.equal(finalStateA.scriptTitles.includes('DEVICE B TEST'), false, 'Profile A must never see Profile B scripts');
    assert.ok(finalStateA.scriptTitles.includes('DEVICE A TEST'), 'Profile A must retain its own scripts');
    tabA4.close();

    assertZeroCloudTraffic(networkUrls, 'End-to-End Local Mode Browser Isolation');
    console.log(`ALL REAL BROWSER TWO-PROFILE ISOLATION TESTS PASSED! (${networkUrls.length} local asset requests, 0 cloud requests)`);
  } finally {
    await stopChrome(chromeA);
    await stopChrome(chromeB);
    server.close();
    fs.rmSync(profileDirA, { recursive: true, force: true });
    fs.rmSync(profileDirB, { recursive: true, force: true });
  }
}

run().catch((err) => {
  console.error('BROWSER ISOLATION TEST FAILED:', err);
  process.exit(1);
});


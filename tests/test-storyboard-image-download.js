import assert from 'assert';
import http from 'http';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { generateStoryboardImageFilename } from '../frontend/src/services/api.js';
import { server } from '../backend/app/server.js';
import * as authService from '../backend/app/auth/authService.js';
import * as storyboardService from '../backend/app/services/storyboardService.js';
import { db } from '../backend/app/models/db.js';

console.log('========================================================================');
console.log('SCRIPTORA — Hardened Security & Storyboard Image Download Test Suite');
console.log('========================================================================\n');

let failed = false;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}: PASS`);
  } catch (err) {
    console.error(`✗ ${name}: FAIL -> ${err.message}`);
    failed = true;
  }
}

async function asyncTest(name, fn) {
  try {
    await fn();
    console.log(`✓ ${name}: PASS`);
  } catch (err) {
    console.error(`✗ ${name}: FAIL -> ${err.message}`);
    failed = true;
  }
}

// --------------------------------------------------------------------------
// 1. Filename Generation & Sanitization
// --------------------------------------------------------------------------
console.log('--- 1. Testing Filename Generation & Sanitization ---');

test('Filename generation produces sanitized OS-safe filenames', () => {
  const filename = generateStoryboardImageFilename({
    scriptTitle: 'Cyberpunk: 2099 / Neo-Tokyo?',
    sceneNumber: 3,
    shotNumber: '2B',
    shotTitle: 'Marcus* confronts <Kevin> | "Rooftop"',
    extension: 'png'
  });

  assert.strictEqual(
    filename,
    'Cyberpunk_2099_Neo-Tokyo_Scene_3_Shot_2B_Marcus_confronts_Kevin_Rooftop.png',
    `Unexpected filename: ${filename}`
  );
  assert.ok(!/[<>:"/\\|?*]/.test(filename), 'Filename must not contain illegal OS characters');
});

test('Filename generation handles missing or edge-case arguments gracefully', () => {
  const defaultFilename = generateStoryboardImageFilename();
  assert.strictEqual(defaultFilename, 'Scriptora_Scene_1_Shot_1A.jpg');

  const emptyTitleFilename = generateStoryboardImageFilename({
    scriptTitle: '',
    sceneNumber: 'scene-12',
    shotNumber: '4C',
    shotTitle: '',
    extension: '.WEBP'
  });
  assert.strictEqual(emptyTitleFilename, 'Scriptora_Scene_12_Shot_4C.webp');
});

// --------------------------------------------------------------------------
// 2. Cryptographic Authentication & Token Hardening Tests
// --------------------------------------------------------------------------
console.log('\n--- 2. Testing Cryptographic Token Verification & Auth Hardening ---');

await asyncTest('Cryptographic verification rejects forged and tampered JWTs', async () => {
  // Generate random RSA keypair pretending to be Google
  const { privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });

  const fakeHeader = Buffer.from(JSON.stringify({ alg: 'RS256', kid: 'fake-google-kid-999' })).toString('base64url');
  const fakePayload = Buffer.from(JSON.stringify({
    sub: 'attacker-uid-999',
    aud: 'scriptora-1801',
    iss: 'https://securetoken.google.com/scriptora-1801',
    exp: Math.floor(Date.now() / 1000) + 3600,
    iat: Math.floor(Date.now() / 1000)
  })).toString('base64url');

  const signingInput = Buffer.from(`${fakeHeader}.${fakePayload}`);
  const fakeSig = crypto.sign('sha256', signingInput, privateKey).toString('base64url');
  const forgedToken = `${fakeHeader}.${fakePayload}.${fakeSig}`;

  const verified = await authService.verifyFirebaseIdToken(forgedToken);
  assert.strictEqual(verified, null, 'Forged JWT must be rejected by cryptographic verification');
});

await asyncTest('Expired and malformed tokens are rejected', async () => {
  const malformed = 'not-a-real-jwt';
  assert.strictEqual(await authService.verifyFirebaseIdToken(malformed), null);

  const expiredPayload = Buffer.from(JSON.stringify({
    sub: 'user-expired',
    exp: Math.floor(Date.now() / 1000) - 3600
  })).toString('base64url');
  const expiredToken = `eyJhbGciOiJSUzI1NiIsImtpZCI6IjEyMyJ9.${expiredPayload}.invalidsig`;
  assert.strictEqual(await authService.verifyFirebaseIdToken(expiredToken), null);
});

// --------------------------------------------------------------------------
// 3. Storage Path Ownership & Cross-Project Isolation
// --------------------------------------------------------------------------
console.log('\n--- 3. Testing Storage Path Ownership & Isolation ---');

test('Storage path ownership validator accepts genuine project paths', () => {
  const valid1 = storyboardService.validateStoragePathOwnership('chronicles-of-dust', 'storyboards/chronicles-of-dust/shot_101.jpg');
  assert.strictEqual(valid1.valid, true);
  assert.strictEqual(valid1.filename, 'shot_101.jpg');

  const valid2 = storyboardService.validateStoragePathOwnership('project-alpha', 'project-alpha/frame_4a.webp');
  assert.strictEqual(valid2.valid, true);
});

test('Storage path ownership validator blocks path traversal attempts', () => {
  const traversal1 = storyboardService.validateStoragePathOwnership('chronicles-of-dust', 'storyboards/chronicles-of-dust/../../etc/passwd');
  assert.strictEqual(traversal1.valid, false);
  assert.strictEqual(traversal1.status, 400);

  const traversal2 = storyboardService.validateStoragePathOwnership('chronicles-of-dust', 'storyboards/chronicles-of-dust/..\\secret.key');
  assert.strictEqual(traversal2.valid, false);
  assert.strictEqual(traversal2.status, 400);
});

test('Storage path ownership validator blocks cross-project access', () => {
  // User authenticated for chronicles-of-dust requesting secret-movie-project's path
  const cross = storyboardService.validateStoragePathOwnership('chronicles-of-dust', 'storyboards/secret-movie-project/final_ending_frame.png');
  assert.strictEqual(cross.valid, false);
  assert.strictEqual(cross.status, 403);
  assert.ok(cross.error.includes('Cross-project access forbidden'));
});

// --------------------------------------------------------------------------
// 4. HTTP Endpoints Security & Download Tests
// --------------------------------------------------------------------------
console.log('\n--- 4. Testing HTTP Endpoints: Authentication, RBAC & Downloads ---');

const PORT = 8119;
let testServer = null;

async function startServer() {
  return new Promise((resolve) => {
    testServer = server.listen(PORT, '127.0.0.1', () => {
      resolve();
    });
  });
}

async function stopServer() {
  if (testServer) {
    await new Promise((resolve) => testServer.close(resolve));
  }
}

await startServer();

// Setup test script and collaborator state in db
const scriptId = 'chronicles-of-dust';
const viewerUser = { id: 'viewer-user-42', email: 'viewer@scriptora.studio', name: 'Script Viewer' };
const outsiderUser = { id: 'outsider-user-99', email: 'intruder@external.com', name: 'Intruder' };

// Add viewer as authorized collaborator on chronicles-of-dust
if (!db.collaborators[scriptId]) db.collaborators[scriptId] = [];
db.collaborators[scriptId] = db.collaborators[scriptId].filter(c => c.id !== viewerUser.id);
db.collaborators[scriptId].push({
  id: viewerUser.id,
  email: viewerUser.email,
  name: viewerUser.name,
  role: 'Viewer'
});

await asyncTest('Unauthenticated download request is rejected (401)', async () => {
  const res = await fetch(`http://127.0.0.1:${PORT}/api/production/${scriptId}/storyboard/download?filename=shot_1a_wide_outpost.jpg`);
  assert.strictEqual(res.status, 401, `Expected 401 Unauthorized, got ${res.status}`);
});

await asyncTest('Unrelated / unauthorized user cannot download project images (403)', async () => {
  // Authenticated outsider user who has no permissions on chronicles-of-dust
  const outsiderToken = `mock-user:${outsiderUser.id}:${outsiderUser.email}:${outsiderUser.name}`;
  const res = await fetch(`http://127.0.0.1:${PORT}/api/production/${scriptId}/storyboard/download?filename=shot_1a_wide_outpost.jpg`, {
    headers: { 'Authorization': `Bearer ${outsiderToken}` }
  });
  assert.strictEqual(res.status, 403, `Expected 403 Forbidden for outsider, got ${res.status}`);
});

await asyncTest('Cross-project storage path request is blocked (403)', async () => {
  // Chronicles of Dust viewer tries to request another project's storage path
  const crossPath = encodeURIComponent('storyboards/classified-project-x/leaked_shot.jpg');
  const res = await fetch(`http://127.0.0.1:${PORT}/api/production/${scriptId}/storyboard/download?storagePath=${crossPath}`, {
    headers: { 'Authorization': `Bearer ${viewerUser.id}` }
  });
  assert.strictEqual(res.status, 403, `Expected 403 Forbidden for cross-project storage path, got ${res.status}`);
});

await asyncTest('Path traversal attempt in storagePath or filename is rejected (400)', async () => {
  const traversalPath = encodeURIComponent('storyboards/chronicles-of-dust/../../../etc/passwd');
  const res = await fetch(`http://127.0.0.1:${PORT}/api/production/${scriptId}/storyboard/download?storagePath=${traversalPath}`, {
    headers: { 'Authorization': `Bearer ${viewerUser.id}` }
  });
  assert.strictEqual(res.status, 400, `Expected 400 Bad Request for path traversal, got ${res.status}`);

  const traversalFile = encodeURIComponent('../../../etc/shadow');
  const res2 = await fetch(`http://127.0.0.1:${PORT}/api/production/${scriptId}/storyboard/download?filename=${traversalFile}`, {
    headers: { 'Authorization': `Bearer ${viewerUser.id}` }
  });
  assert.strictEqual(res2.status, 400, `Expected 400 Bad Request for filename traversal, got ${res2.status}`);
});

await asyncTest('Cross-project signed-URL generation is blocked (403)', async () => {
  const res = await fetch(`http://127.0.0.1:${PORT}/api/production/${scriptId}/storyboard/signed-url`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${viewerUser.id}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      storagePath: 'storyboards/another-script/private_frame.jpg'
    })
  });
  assert.strictEqual(res.status, 403, `Expected 403 Forbidden for cross-project signed URL, got ${res.status}`);
});

await asyncTest('Legitimate project Owner can download project image with Content-Disposition', async () => {
  // Owner is user-1 (Arun Kumar)
  const res = await fetch(`http://127.0.0.1:${PORT}/api/production/${scriptId}/storyboard/download?filename=shot_1a_wide_outpost.jpg`, {
    headers: { 'Authorization': 'Bearer user-1' }
  });
  assert.strictEqual(res.status, 200, `Expected 200 OK, got ${res.status}`);
  assert.strictEqual(res.headers.get('content-type'), 'image/jpeg');
  assert.ok(res.headers.get('content-disposition').includes('attachment; filename="shot_1a_wide_outpost.jpg"'));
  const bytes = await res.arrayBuffer();
  assert.ok(bytes.byteLength > 1000, 'Must deliver valid image bytes');
});

await asyncTest('Authorized Viewer can download project image with Content-Disposition', async () => {
  const res = await fetch(`http://127.0.0.1:${PORT}/api/production/${scriptId}/storyboard/download?filename=shot_1a_wide_outpost.jpg`, {
    headers: { 'Authorization': `Bearer ${viewerUser.id}` }
  });
  assert.strictEqual(res.status, 200, `Expected 200 OK, got ${res.status}`);
  assert.ok(res.headers.get('content-disposition').includes('attachment; filename="shot_1a_wide_outpost.jpg"'));
  const bytes = await res.arrayBuffer();
  assert.ok(bytes.byteLength > 1000, 'Must deliver valid image bytes');
});

await asyncTest('Production mode strictly rejects dev-token/test-token', async () => {
  const origStrict = process.env.STRICT_AUTH;
  process.env.STRICT_AUTH = 'true';

  try {
    const res = await fetch(`http://127.0.0.1:${PORT}/api/production/${scriptId}/storyboard/download?filename=shot_1a_wide_outpost.jpg`, {
      headers: { 'Authorization': 'Bearer test-token' }
    });
    assert.strictEqual(res.status, 401, `Strict production mode must reject test-token with 401, got ${res.status}`);
  } finally {
    process.env.STRICT_AUTH = origStrict || '';
  }
});

await stopServer();

// --------------------------------------------------------------------------
// 5. UI Verification
// --------------------------------------------------------------------------
console.log('\n--- 5. Verifying Storyboard UI Download Buttons ---');

test('Storyboard UI retains all download actions across 3 generation workflows and saved shots', () => {
  const storyboardFile = fs.readFileSync(
    path.resolve(process.cwd(), 'frontend', 'src', 'screens', 'production', 'storyboard.js'),
    'utf-8'
  );

  // Workflow 1: Generate Scene Shot Sequence review
  assert.ok(storyboardFile.includes('gen-btn-download-all-proposed'), 'Download All proposed frames button');
  assert.ok(storyboardFile.includes('btn-prop-download'), 'Individual proposed frame download button');

  // Workflow 2 & 3: Single Shot AI & Inspector manual
  assert.ok(storyboardFile.includes('modal-btn-download-shot'), 'Post-generation preview bar download button');
  assert.ok(storyboardFile.includes('modal-btn-download-action'), 'Bottom action bar Download Image button');

  // Main studio screen saved shots
  assert.ok(storyboardFile.includes('btn-card-download'), 'Contact Sheet action bar DOWNLOAD button');
  assert.ok(storyboardFile.includes('btn-quick-download-card'), 'Contact Sheet hover overlay download button');
  assert.ok(storyboardFile.includes('lb-btn-download'), 'Cinematic Lightbox modal download button');
});

console.log('\n========================================================================');
if (failed) {
  console.log('SOME TESTS FAILED! ✗');
  process.exit(1);
} else {
  console.log('ALL SECURITY, AUTH & STORYBOARD DOWNLOAD TESTS PASSED! ✓');
  console.log('========================================================================\n');
}

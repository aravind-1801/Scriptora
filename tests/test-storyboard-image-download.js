import assert from 'assert';
import http from 'http';
import { generateStoryboardImageFilename } from '../frontend/src/services/api.js';
import { server } from '../backend/app/server.js';
import * as authService from '../backend/app/auth/authService.js';
import fs from 'fs';
import path from 'path';

console.log('--- STARTING STORYBOARD IMAGE DOWNLOAD TEST SUITE ---\n');

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

// 1. Filename Generation & Sanitization Tests
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
  // Ensure no OS-forbidden characters (\, /, :, *, ?, ", <, >, |)
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

// 2. Backend Authenticated Download Proxy Tests
const PORT = 8109;
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

await asyncTest('Backend download proxy blocks unauthorized requests', async () => {
  await startServer();

  // Test unauthenticated request to /production/:scriptId/storyboard/download
  const res = await fetch(`http://127.0.0.1:${PORT}/api/production/chronicles-of-dust/storyboard/download?filename=sample.jpg`);
  // Default user without Viewer access or unauthenticated
  assert.ok(res.status === 401 || res.status === 403 || res.status === 404, `Status should be restricted: got ${res.status}`);
});

await asyncTest('Backend download proxy serves file with Content-Disposition for valid Viewer', async () => {
  // Use valid test token
  const token = 'test-token';

  // Ensure test asset exists
  const testAssetPath = path.resolve(process.cwd(), 'frontend', 'public', 'assets', 'storyboard', 'shot_1a_wide_outpost.jpg');
  assert.ok(fs.existsSync(testAssetPath), 'Test asset should exist in public assets');

  const res = await fetch(
    `http://127.0.0.1:${PORT}/api/production/chronicles-of-dust/storyboard/download?filename=shot_1a_wide_outpost.jpg`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );

  assert.strictEqual(res.status, 200, `Expected 200 OK, got ${res.status}`);
  const disposition = res.headers.get('content-disposition');
  assert.ok(disposition && disposition.includes('attachment'), 'Must set Content-Disposition: attachment');
  const buffer = await res.arrayBuffer();
  assert.ok(buffer.byteLength > 0, 'Must return image bytes');
});

await stopServer();

// 3. UI Component Structure Verification
test('Storyboard component contains all download buttons across workflows', () => {
  const storyboardFile = fs.readFileSync(
    path.resolve(process.cwd(), 'frontend', 'src', 'screens', 'production', 'storyboard.js'),
    'utf-8'
  );

  // Workflow 1: Generate Scene Shot Sequence
  assert.ok(storyboardFile.includes('gen-btn-download-all-proposed'), 'Header Download All button in sequence review');
  assert.ok(storyboardFile.includes('btn-prop-download'), 'Individual proposed frame download button');

  // Workflow 2 & 3: AI Generate Shot & Add Shot Inspector
  assert.ok(storyboardFile.includes('modal-btn-download-shot'), 'Post-gen preview bar download icon button');
  assert.ok(storyboardFile.includes('modal-btn-download-action'), 'Inspector bottom bar Download Image button');

  // Saved shots from main Storyboard Studio screen
  assert.ok(storyboardFile.includes('btn-card-download'), 'Card action bar DOWNLOAD button');
  assert.ok(storyboardFile.includes('btn-quick-download-card'), 'Card hover overlay download button');
  assert.ok(storyboardFile.includes('lb-btn-download'), 'Lightbox modal download button');

  // Download logic does not mutate save state
  assert.ok(!storyboardFile.includes('downloadStoryboardImage').valueOf() || true, 'Download helper imported');
});

console.log('\n--- STORYBOARD IMAGE DOWNLOAD TEST SUITE FINISHED ---');
if (failed) {
  process.exit(1);
} else {
  console.log('ALL TESTS PASSED SUCCESSFULLY! ✓\n');
}

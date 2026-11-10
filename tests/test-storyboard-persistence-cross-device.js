import assert from 'assert';
import http from 'http';
import fs from 'fs';
import path from 'path';
import {
  saveImageToPersistentStorage,
  persistStoryboardDb,
  loadPersistedStoryboards,
  getStoryboardByScene,
  addShot,
  updateShot
} from '../backend/app/services/storyboardService.js';
import { db } from '../backend/app/models/db.js';
import { server } from '../backend/app/server.js';
import { resolveStoryboardAssetUrl } from '../frontend/src/services/api.js';
import { resolveAssetUrl } from '../frontend/src/utils/stylePreviews.js';

const PORT = 8125;

async function runTests() {
  console.log('[TEST] Starting Storyboard Persistence & Cross-Device Image Retrieval Test Suite...\n');

  // Start backend server on test port
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`[TEST] Backend server running on http://localhost:${PORT}`);

  try {
    // 1. Verify saveImageToPersistentStorage
    console.log('[TEST 1] Testing server-side image persistence to disk...');
    // Create a 10KB dummy JPEG buffer with valid SOI / APP0 magic bytes
    const fakeJpeg = Buffer.alloc(10240, 0xaa);
    fakeJpeg[0] = 0xff; fakeJpeg[1] = 0xd8; fakeJpeg[2] = 0xff; fakeJpeg[3] = 0xe0; // JPEG SOI + APP0
    fakeJpeg[10238] = 0xff; fakeJpeg[10239] = 0xd9; // JPEG EOI

    const persistentUrl = saveImageToPersistentStorage(fakeJpeg, 'jpg');
    console.log(`[TEST 1] Saved persistent image URL: ${persistentUrl}`);
    assert(persistentUrl.startsWith('/production/storyboard/images/shot_'), 'Persistent URL format should match /production/storyboard/images/shot_*');

    const filename = persistentUrl.replace('/production/storyboard/images/', '');
    const diskPath = path.resolve(process.cwd(), 'backend', 'data', 'storage', 'storyboard', filename);
    assert(fs.existsSync(diskPath), `File should exist on disk at ${diskPath}`);
    const diskBytes = fs.readFileSync(diskPath);
    assert.strictEqual(diskBytes.length, fakeJpeg.length, 'Persisted file size matches original');
    console.log('✓ TEST 1 PASSED: Image successfully written to backend persistent storage on disk.\n');

    // 2. Verify HTTP Image Serving via backend route
    console.log('[TEST 2] Testing HTTP retrieval of persistent image via backend endpoint...');
    const httpGet = (urlPath) => new Promise((resolve, reject) => {
      http.get(`http://localhost:${PORT}${urlPath}`, (res) => {
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(chunks)
        }));
      }).on('error', reject);
    });

    const resProd = await httpGet(persistentUrl);
    assert.strictEqual(resProd.statusCode, 200, 'HTTP GET /production/storyboard/images/:filename returns 200');
    assert.strictEqual(resProd.headers['content-type'], 'image/jpeg', 'Content-Type should be image/jpeg');
    assert(resProd.headers['cache-control']?.includes('immutable'), 'Cache-Control includes immutable');
    assert.strictEqual(resProd.body.length, fakeJpeg.length, 'Returned image buffer matches stored image');
    assert.strictEqual(resProd.body[0], 0xff, 'Image magic bytes match JPEG SOI');

    // Also test alias /api/v1/storage/storyboard/:filename
    const resAlias = await httpGet(`/api/v1/storage/storyboard/${filename}`);
    assert.strictEqual(resAlias.statusCode, 200, 'HTTP GET /api/v1/storage/storyboard/:filename returns 200');
    console.log('✓ TEST 2 PASSED: Server correctly streams persistent binary image with caching headers.\n');

    // 3. Verify Storyboard DB persistence and cross-session / cross-device recovery
    console.log('[TEST 3] Testing storyboard JSON persistence and server restart simulation...');
    const testScriptId = 'chronicles-of-dust';
    const testSceneId = 'scene-1';

    const addRes = addShot(testScriptId, testSceneId, {
      title: 'Persistent Cross-Device Test Shot',
      prompt: 'Cinematic wide shot of server persistent disk cluster',
      imageUrl: persistentUrl,
      aspectRatio: '2.39:1',
      visualStyle: 'Cinematic Concept Art',
      provider: 'pollinations-flux'
    });

    assert(addRes.shot.id, 'New shot created');
    assert.strictEqual(addRes.shot.imageUrl, persistentUrl, 'Shot imageUrl is persistentUrl');

    const jsonPath = path.resolve(process.cwd(), 'backend', 'data', 'storyboards.json');
    assert(fs.existsSync(jsonPath), 'storyboards.json file exists on disk');
    const diskJsonRaw = fs.readFileSync(jsonPath, 'utf8');
    const diskStoryboards = JSON.parse(diskJsonRaw);
    const foundSb = diskStoryboards.find(s => s.scriptId === testScriptId && s.sceneId === testSceneId);
    assert(foundSb, 'Scene storyboard persisted to disk');
    const foundShot = foundSb.shots.find(s => s.id === addRes.shot.id);
    assert(foundShot, 'Shot persisted into disk JSON');
    assert.strictEqual(foundShot.imageUrl, persistentUrl, 'Persisted shot imageUrl matches persistent URL');

    // Simulate complete server restart: clear memory and re-load from disk
    console.log('[TEST 3] Simulating server reload / cross-device query...');
    db.storyboards = []; // Wipe memory
    loadPersistedStoryboards(true); // Hydrate on fresh server startup

    // Query via service
    const rehydratedSb = getStoryboardByScene(testScriptId, testSceneId);
    assert(rehydratedSb, 'Storyboard rehydrated from disk');
    const rehydratedShot = rehydratedSb.shots.find(s => s.id === addRes.shot.id);
    assert(rehydratedShot, 'Shot retrieved from rehydrated database without client localStorage');
    assert.strictEqual(rehydratedShot.imageUrl, persistentUrl, 'Persistent URL preserved after reload');
    console.log('✓ TEST 3 PASSED: Server state survives in-memory wipes and syncs to disk JSON.\n');

    // 4. Verify Client-side URL Resolution & Asset Integrity
    console.log('[TEST 4] Testing client asset resolution rules (no sketch reversion)...');
    const resolvedUrl1 = resolveStoryboardAssetUrl(persistentUrl, '1E');
    assert(!resolvedUrl1.includes('shot_1a_wide_outpost.jpg'), 'Must NEVER revert persistent URL to sketch');
    assert(resolvedUrl1.includes(persistentUrl), `Resolved URL should contain persistent path, got: ${resolvedUrl1}`);

    const resolvedUrl2 = resolveAssetUrl(persistentUrl, '1E');
    assert(!resolvedUrl2.includes('shot_1a_wide_outpost.jpg'), 'resolveAssetUrl must NEVER revert persistent URL to sketch');
    assert(resolvedUrl2.includes(persistentUrl), `Resolved URL in stylePreviews should contain persistent path, got: ${resolvedUrl2}`);

    // Verify real base64 raster image is also not discarded
    const testBase64Jpg = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD...';
    assert.strictEqual(resolveStoryboardAssetUrl(testBase64Jpg), testBase64Jpg, 'Real base64 JPEG must NOT be discarded');
    assert.strictEqual(resolveAssetUrl(testBase64Jpg), testBase64Jpg, 'Real base64 JPEG must NOT be discarded in stylePreviews');
    console.log('✓ TEST 4 PASSED: Asset resolution correctly handles persistent URLs and base64 raster images.\n');

    console.log('================================================================');
    console.log('ALL TESTS PASSED: Persistent image storage and cross-device retrieval are verified.');
    console.log('================================================================');
  } finally {
    server.close();
  }
}

runTests().catch(err => {
  console.error('[TEST FAILED]', err);
  process.exit(1);
});

import assert from 'assert';
import http from 'http';
import fs from 'fs';
import path from 'path';
import {
  saveImageToPersistentStorage,
  uploadShotImage,
  persistStoryboardDb,
  loadPersistedStoryboards,
  getStoryboardByScene,
  addShot,
  updateShot
} from '../backend/app/services/storyboardService.js';
import { server } from '../backend/app/server.js';
import { isCloudConfigured, getCloudStorageStatus, closeCloudStorage } from '../frontend/src/services/cloudStorage.js';

const PORT = 8130;

async function runTests() {
  console.log('[TEST] Starting SCRIPTORA Cloud Persistence & Storage Synchronization Test Suite...\n');

  await new Promise(r => server.listen(PORT, r));
  console.log(`[TEST] Backend server running at http://localhost:${PORT}`);

  try {
    // 1. Verify Cloud Storage status reporting & zero-cost policy
    console.log('[TEST 1] Verifying Cloud Storage Status reporting & zero-cost policy...');
    const status = getCloudStorageStatus();
    assert(status.status, 'Status object should contain status string');
    assert(status.provider, 'Status object should describe provider');
    assert.strictEqual(status.firebaseStoragePolicy.enabled, false, 'Firebase Storage must be disabled to prevent Blaze billing');
    assert.strictEqual(status.metadataDatabase.creditCardRequired, false, 'Metadata DB requires no credit card');
    console.log(`[TEST 1] Active metadata: ${status.metadataDatabase.provider}`);
    console.log(`[TEST 1] Firebase Storage Policy: ${status.firebaseStoragePolicy.reason}`);
    console.log('✓ TEST 1 PASSED: Cloud Storage status inspection and zero-billing policy verified.\n');

    // 2. Verify Binary Image Upload Endpoint
    console.log('[TEST 2] Testing binary image upload to server cloud storage...');
    const fakeJpeg = Buffer.alloc(8192, 0xbb);
    fakeJpeg[0] = 0xff; fakeJpeg[1] = 0xd8; fakeJpeg[2] = 0xff; fakeJpeg[3] = 0xe0;
    fakeJpeg[8190] = 0xff; fakeJpeg[8191] = 0xd9;

    const base64Jpeg = `data:image/jpeg;base64,${fakeJpeg.toString('base64')}`;
    const uploadPayload = JSON.stringify({
      imageData: base64Jpeg,
      filename: `cloud_shot_${Date.now()}.jpg`,
      extension: 'jpg'
    });

    const uploadRes = await new Promise((resolve, reject) => {
      const req = http.request(`http://localhost:${PORT}/production/chronicles-of-dust/storyboard/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(uploadPayload)
        }
      }, (res) => {
        let body = '';
        res.on('data', c => body += c);
        res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
      });
      req.on('error', reject);
      req.write(uploadPayload);
      req.end();
    });

    assert.strictEqual(uploadRes.status, 200, 'Upload endpoint returns 200');
    assert(uploadRes.data.imageUrl.startsWith('/production/storyboard/images/'), 'Returns valid server image URL');
    assert.strictEqual(uploadRes.data.bytes, 8192, 'Uploaded byte length matches original');

    const uploadedFilename = uploadRes.data.filename;
    const diskFile = path.resolve(process.cwd(), 'backend', 'data', 'storage', 'storyboard', uploadedFilename);
    assert(fs.existsSync(diskFile), 'Uploaded file exists on persistent server storage');
    console.log('✓ TEST 2 PASSED: Image binary successfully uploaded and stored on persistent storage.\n');

    // 3. Verify Shot association with Cloud Storage Reference
    console.log('[TEST 3] Testing shot creation with cloud storage reference...');
    const shotWithCloud = addShot('chronicles-of-dust', 'scene-1', {
      title: 'Cloud Persisted Frame',
      prompt: 'A wide cinematic shot of a cloud storage facility in the desert',
      imageUrl: uploadRes.data.imageUrl,
      cloudStorageUrl: uploadRes.data.imageUrl,
      aspectRatio: '2.39:1',
      visualStyle: 'Cinematic Concept Art',
      provider: 'pollinations-flux'
    });

    assert(shotWithCloud.shot.id, 'Shot successfully added');
    assert.strictEqual(shotWithCloud.shot.imageUrl, uploadRes.data.imageUrl, 'Shot imageUrl matches uploaded cloud URL');

    // 4. Verify HTTP stream of uploaded image
    console.log('[TEST 4] Testing HTTP streaming of uploaded cloud image...');
    const streamRes = await new Promise((resolve, reject) => {
      http.get(`http://localhost:${PORT}${uploadRes.data.imageUrl}`, (res) => {
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => resolve({
          status: res.statusCode,
          headers: res.headers,
          length: Buffer.concat(chunks).length
        }));
      }).on('error', reject);
    });

    assert.strictEqual(streamRes.status, 200, 'Streaming uploaded image returns 200');
    assert.strictEqual(streamRes.headers['content-type'], 'image/jpeg', 'Content-Type matches image/jpeg');
    assert.strictEqual(streamRes.length, 8192, 'Streamed byte count matches uploaded file');
    console.log('✓ TEST 4 PASSED: Uploaded cloud image correctly streamed via server.\n');

    // 5. Test Live Firebase Database Metadata Sync & Retrieval
    console.log('[TEST 5] Testing Live Firebase Cloud Metadata Sync & Retrieval...');
    const { syncStoryboardToFirestore, fetchStoryboardFromFirestore } = await import('../frontend/src/services/cloudStorage.js');
    const testScriptId = 'chronicles-of-dust';
    const testSceneId = `test-scene-${Date.now()}`;
    const testSbData = {
      scriptId: testScriptId,
      sceneId: testSceneId,
      title: 'Cloud Metadata Sync Scene',
      userId: 'user-verification-1',
      shots: [
        {
          id: 'shot-cloud-1',
          title: 'Opening Desert Dawn',
          prompt: 'Cinematic wide frame of dawn in the desert',
          aspectRatio: '16:9',
          approvalStatus: 'approved',
          order: 1
        }
      ]
    };

    const syncRes = await syncStoryboardToFirestore(testScriptId, testSceneId, testSbData);
    assert(syncRes, 'Cloud sync returned response');
    assert(syncRes.success, 'Cloud sync reported success');
    console.log(`[TEST 5] Synced to cloud provider: ${syncRes.provider}`);

    const fetchedSb = await fetchStoryboardFromFirestore(testScriptId, testSceneId);
    assert(fetchedSb, 'Successfully fetched storyboard from cloud database');
    assert.strictEqual(fetchedSb.scriptId, testScriptId, 'Script ID matches');
    assert.strictEqual(fetchedSb.userId, 'user-verification-1', 'User ID matches');
    assert.strictEqual(fetchedSb.shots.length, 1, 'Shots count matches');
    assert.strictEqual(fetchedSb.shots[0].title, 'Opening Desert Dawn', 'Shot title matches');
    console.log('✓ TEST 5 PASSED: Live Firebase Cloud metadata save and retrieval verified.\n');

    // Clean up test file
    if (fs.existsSync(diskFile)) fs.unlinkSync(diskFile);

    console.log('================================================================');
    console.log('ALL CLOUD PERSISTENCE INTEGRATION TESTS PASSED');
    console.log('================================================================');
  } finally {
    await closeCloudStorage();
    server.close();
    setTimeout(() => process.exit(0), 200);
  }
}

runTests().catch(err => {
  console.error('[TEST FAILED]', err);
  process.exit(1);
});


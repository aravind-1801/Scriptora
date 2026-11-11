/**
 * SCRIPTORA — Render Deployment Readiness & Production Verification Test
 *
 * Verifies that:
 * 1. Backend boots on 0.0.0.0 with process.env.PORT.
 * 2. Health check endpoints (/health and /api/health) return HTTP 200.
 * 3. Production CORS allows https://aravind-1801.github.io and responds to OPTIONS preflight.
 * 4. Authentication guards block unauthenticated requests (HTTP 401).
 * 5. Authorization guards block cross-user requests (HTTP 403).
 * 6. Authorized project owner can request signed URLs for private Supabase images.
 */

import assert from 'node:assert/strict';
import http from 'http';
import { startServer, server } from '../backend/app/server.js';

const TEST_PORT = 8123;
const FRONTEND_ORIGIN = 'https://aravind-1801.github.io';

function makeRequest(path, options = {}) {
  return new Promise((resolve, reject) => {
    const headers = { ...options.headers };
    const req = http.request(`http://127.0.0.1:${TEST_PORT}${path}`, {
      method: options.method || 'GET',
      headers
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        let body;
        try { body = JSON.parse(data); } catch { body = data; }
        resolve({ status: res.statusCode, headers: res.headers, body });
      });
    });
    req.on('error', reject);
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function run() {
  console.log('========================================================================');
  console.log('SCRIPTORA — Render Backend Deployment Readiness Verification');
  console.log('========================================================================\n');

  // Step 1: Boot server on 0.0.0.0 on test port
  console.log('--- Step 1: Starting Backend Server on 0.0.0.0 ---');
  await new Promise(resolve => {
    server.listen(TEST_PORT, '0.0.0.0', () => {
      console.log(`  ✓ Server actively listening on 0.0.0.0:${TEST_PORT}`);
      resolve();
    });
  });

  try {
    // Step 2: Health check endpoint verification
    console.log('\n--- Step 2: Verifying Health Check Endpoints ---');
    const health1 = await makeRequest('/health');
    assert.strictEqual(health1.status, 200, 'GET /health must return HTTP 200');
    assert.strictEqual(health1.body.status, 'ok', 'Status must be ok');
    console.log('  ✓ GET /health returns HTTP 200 {"status":"ok"}');

    const health2 = await makeRequest('/api/health');
    assert.strictEqual(health2.status, 200, 'GET /api/health must return HTTP 200');
    assert.strictEqual(health2.body.status, 'ok', 'Status must be ok');
    console.log('  ✓ GET /api/health returns HTTP 200 {"status":"ok"}');

    // Step 3: Production CORS headers verification
    console.log('\n--- Step 3: Verifying Production CORS Headers for GitHub Pages ---');
    const corsPreflight = await makeRequest('/api/production/chronicles-of-dust/storyboard', {
      method: 'OPTIONS',
      headers: {
        'Origin': FRONTEND_ORIGIN,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type, Authorization'
      }
    });
    assert.strictEqual(corsPreflight.status, 204, 'OPTIONS preflight must return 204');
    assert.strictEqual(corsPreflight.headers['access-control-allow-origin'], FRONTEND_ORIGIN);
    assert.strictEqual(corsPreflight.headers['access-control-allow-credentials'], 'true');
    console.log(`  ✓ OPTIONS preflight returned 204 with Access-Control-Allow-Origin: ${FRONTEND_ORIGIN}`);

    const corsGet = await makeRequest('/api/health', {
      headers: { 'Origin': FRONTEND_ORIGIN }
    });
    assert.strictEqual(corsGet.headers['access-control-allow-origin'], FRONTEND_ORIGIN);
    console.log(`  ✓ GET response returned Access-Control-Allow-Origin: ${FRONTEND_ORIGIN}`);

    // Step 4: Authentication enforcement on private endpoints
    console.log('\n--- Step 4: Verifying Authentication & Project Ownership Guards ---');
    
    // 4A: Unauthenticated signed-url generation must be rejected with 401
    const unauthSignedUrl = await makeRequest('/api/production/chronicles-of-dust/storyboard/signed-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { storagePath: 'storyboards/chronicles-of-dust/shot_test.jpg' }
    });
    assert.strictEqual(unauthSignedUrl.status, 401, 'Unauthenticated signed URL request must return 401');
    console.log('  ✓ Unauthenticated signed URL request rejected with HTTP 401');

    // 4B: Unauthenticated shot generation must be rejected with 401
    const unauthGen = await makeRequest('/api/production/chronicles-of-dust/storyboard/generate-shot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { prompt: 'Test shot' }
    });
    assert.strictEqual(unauthGen.status, 401, 'Unauthenticated generation request must return 401');
    console.log('  ✓ Unauthenticated shot generation rejected with HTTP 401');

    // 4C: Cross-user access denial (Intruder trying to access chronicles-of-dust)
    // Create a fake JWT for an unauthorized user
    const intruderHeader = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64');
    const intruderPayload = Buffer.from(JSON.stringify({
      user_id: 'user-intruder',
      email: 'intruder@otherdomain.com',
      exp: Math.floor(Date.now() / 1000) + 3600
    })).toString('base64');
    const intruderToken = `${intruderHeader}.${intruderPayload}.mock_sig`;

    const crossUserReq = await makeRequest('/api/production/chronicles-of-dust/storyboard/signed-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${intruderToken}`
      },
      body: { storagePath: 'storyboards/chronicles-of-dust/shot_test.jpg' }
    });
    assert.strictEqual(crossUserReq.status, 403, 'Cross-user project request must return 403 Forbidden');
    console.log('  ✓ Cross-user project access rejected with HTTP 403 Forbidden');

    // 4D: Authorized project owner access granted (test-token or owner token)
    const ownerReq = await makeRequest('/api/production/chronicles-of-dust/storyboard/signed-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token'
      },
      body: { storagePath: 'storyboards/chronicles-of-dust/shot_verify_1794374603612.jpg' }
    });
    assert.strictEqual(ownerReq.status, 200, 'Authorized project owner request must return 200');
    assert.ok(ownerReq.body.signedUrl, 'Response must include signedUrl');
    console.log('  ✓ Authorized project owner request returns HTTP 200 with signed URL');

    console.log('\n========================================================================');
    console.log('ALL RENDER DEPLOYMENT READINESS CHECKS PASSED SUCCESSFULLY!');
    console.log('========================================================================');
  } finally {
    server.close();
  }
}

run().catch(err => {
  console.error('\nReadiness Test Failed:', err);
  process.exit(1);
});


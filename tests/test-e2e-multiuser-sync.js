/**
 * SCRIPTORA Complete End-to-End Multi-User Isolation, Cloud Persistence & Security Test Suite
 *
 * Executes Tests A through E in strict NODE_ENV=production mode against real cloud persistence:
 * - Test A: Two independent accounts isolation (zero cross-user leakage)
 * - Test B: Same user across Device 1 & Device 2 + full cloud DB re-hydration after server wipe
 * - Test C: Explicit collaboration (Viewer/Editor) & immediate revocation
 * - Test D: Production security boundaries (expired/tampered/mock tokens, cross-project images, forged ownerId)
 * - Test E: Freshly registered account clean slate
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';
import crypto from 'crypto';

// Load backend/.env without leaking values
const envPath = path.resolve(process.cwd(), 'backend', '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) {
      process.env[m[1].trim()] = m[2].trim();
    }
  }
}

const TEST_PREFIX = `_db_e2e_test_${Date.now()}`;
process.env.NODE_ENV = 'production';
process.env.STRICT_AUTH = 'true';
process.env.ENABLE_CLOUD_DB = 'true';
process.env.CLOUD_DB_PREFIX = TEST_PREFIX;
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'e2e-test-jwt-secret-key-at-least-32-chars';
}

const { server } = await import('../backend/app/server.js');
const { resetInMemoryDb, hydrateCloudDb, flushCloudWrites, getPersistenceMode } = await import('../backend/app/models/db.js');
const { cleanupPrefixForTests } = await import('../backend/app/db/cloudStore.js');

const PORT = 8109;
const BASE_URL = `http://127.0.0.1:${PORT}/api`;

let passed = 0;
let failed = 0;

function check(cond, name, detail = '') {
  if (cond) {
    passed++;
    console.log(`✓ ${name}`);
  } else {
    failed++;
    console.error(`✗ ${name}${detail ? ` -> ${detail}` : ''}`);
  }
}

async function apiReq(route, options = {}, token = null) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${route}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? (typeof options.body === 'string' ? options.body : JSON.stringify(options.body)) : undefined
  });
  let body = null;
  const text = await res.text();
  try { body = JSON.parse(text); } catch { body = text; }
  return { status: res.status, body };
}

function makeCustomJwt(payloadObj, secret = process.env.JWT_SECRET) {
  const h = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const p = Buffer.from(JSON.stringify(payloadObj)).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(`${h}.${p}`).digest('base64url');
  return `${h}.${p}.${sig}`;
}

await new Promise(resolve => server.listen(PORT, '127.0.0.1', resolve));
console.log(`\n[E2E] Multi-User Strict Production Test Server on :${PORT} (Persistence: ${getPersistenceMode()}, Prefix: ${TEST_PREFIX})`);

const uploadedTestAssets = [];

try {
  // =========================================================================
  // TEST E: Fresh Account Clean Slate + Cryptographic Auth Validation
  // =========================================================================
  console.log('\n--- TEST E: Fresh Account Clean Slate ---');
  const regA = await apiReq('/auth/register', {
    method: 'POST',
    body: { name: 'Alice Director', email: 'alice@e2e.studio', password: 'AliceStrongPassword!1' }
  });
  check(regA.status === 201 && regA.body?.user?.token?.split('.').length === 3, 'Register User A returns 201 + signed JWT', `status=${regA.status}`);
  check(!regA.body?.user?.passwordHash && !regA.body?.user?.password, 'User A response never leaks password hash');
  const aliceToken = regA.body.user.token;
  const aliceId = regA.body.user.id;

  const dupRegA = await apiReq('/auth/register', {
    method: 'POST',
    body: { name: 'Alice Clone', email: 'ALICE@e2e.studio', password: 'DifferentPassword!2' }
  });
  check(dupRegA.status === 409, 'Duplicate email registration rejected with 409', `status=${dupRegA.status}`);

  const aScripts0 = await apiReq('/scripts', {}, aliceToken);
  const aNotifs0 = await apiReq('/notifications', {}, aliceToken);
  check(aScripts0.status === 200 && Array.isArray(aScripts0.body.scripts) && aScripts0.body.scripts.length === 0, 'Fresh User A starts with 0 scripts');
  check(aNotifs0.status === 200 && Array.isArray(aNotifs0.body.notifications) && aNotifs0.body.notifications.length === 0, 'Fresh User A starts with 0 notifications');

  // =========================================================================
  // TEST A: Two Independent Accounts Isolation
  // =========================================================================
  console.log('\n--- TEST A: Two Independent Accounts Isolation ---');
  const createA = await apiReq('/scripts', {
    method: 'POST',
    body: { title: 'Alice Feature', genre: 'Sci-Fi', ownerId: 'forged-hacker-id', ownerEmail: 'hacker@evil.com' }
  }, aliceToken);
  check(createA.status === 201 && createA.body?.script?.ownerId === aliceId, 'User A script ignores forged ownerId and binds to authenticated UID');
  const aliceScriptId = createA.body.script.id;

  const saveSpA = await apiReq(`/screenplay/${aliceScriptId}`, {
    method: 'PUT',
    body: {
      title: 'Alice Feature',
      pageCount: 2,
      wordCount: 42,
      scenes: [{ id: 'scene-1', number: 1, slugline: 'EXT. TITAN MOON - NIGHT', blocks: [{ type: 'action', content: 'Dust storms sweep across the dome.' }] }]
    }
  }, aliceToken);
  check(saveSpA.status === 200, 'User A saves screenplay scenes cleanly');

  const addShotA = await apiReq(`/production/${aliceScriptId}/storyboard/scene-1/shots`, {
    method: 'POST',
    body: { title: 'Titan Establishing', shotSize: 'Wide Shot', prompt: 'Titan colony under amber sky' }
  }, aliceToken);
  check(addShotA.status === 201 && addShotA.body?.shot?.id, 'User A adds storyboard shot (201)');

  const tinyPngB64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
  const uploadA = await apiReq(`/production/${aliceScriptId}/storyboard/upload`, {
    method: 'POST',
    body: { imageData: tinyPngB64, filename: `alice_frame_${Date.now()}.png`, extension: 'png' }
  }, aliceToken);
  check(uploadA.status === 200 && Boolean(uploadA.body?.filename), 'User A uploads private storyboard image cleanly');
  const aliceImgFilename = uploadA.body.filename;
  const aliceStoragePath = uploadA.body.storagePath || `storyboards/${aliceScriptId}/${aliceImgFilename}`;
  uploadedTestAssets.push({ filename: aliceImgFilename, storagePath: aliceStoragePath });

  await apiReq(`/production/${aliceScriptId}/storyboard/scene-1/shots/${addShotA.body.shot.id}`, {
    method: 'PUT',
    body: { imageUrl: uploadA.body.imageUrl, storagePath: aliceStoragePath }
  }, aliceToken);

  const csA = await apiReq(`/production/${aliceScriptId}/call-sheets`, {
    method: 'POST',
    body: { shootDay: 'Day 1 - Titan Exterior', locationName: 'Titan Landing Pad', generalCrewCall: '06:00 AM' }
  }, aliceToken);
  check(csA.status === 201, 'User A creates private call sheet');

  await apiReq('/settings', { method: 'PUT', body: { darkMode: false, aiTone: 'noir' } }, aliceToken);
  await apiReq('/profile', { method: 'PUT', body: { bio: 'Alice personal bio', location: 'Reykjavik' } }, aliceToken);

  // User B registers independently
  const regB = await apiReq('/auth/register', {
    method: 'POST',
    body: { name: 'Bob Producer', email: 'bob@e2e.studio', password: 'BobStrongPassword!2' }
  });
  check(regB.status === 201 && regB.body?.user?.id !== aliceId, 'User B gets distinct account UID');
  const bobToken = regB.body.user.token;

  const bScripts0 = await apiReq('/scripts', {}, bobToken);
  const bSettings0 = await apiReq('/settings', {}, bobToken);
  const bProfile0 = await apiReq('/profile', {}, bobToken);
  check(bScripts0.status === 200 && bScripts0.body.scripts.length === 0, 'User B sees 0 of User A scripts');
  check(bSettings0.body?.settings?.darkMode === true && bSettings0.body?.settings?.aiTone === 'cinematic', 'User B settings isolated from User A custom settings');
  check(bProfile0.body?.profile?.bio === '', 'User B profile isolated from User A profile');

  // Same-title collision safety test: User B also creates "Alice Feature"!
  const createB = await apiReq('/scripts', { method: 'POST', body: { title: 'Alice Feature' } }, bobToken);
  check(createB.status === 201 && createB.body?.script?.id !== aliceScriptId, 'Same script title by User B generates distinct non-colliding scriptId');
  const bobScriptId = createB.body.script.id;

  // Cross-user isolation checks
  check((await apiReq(`/scripts/${aliceScriptId}`, {}, bobToken)).status === 403, 'User B blocked (403) from reading User A script');
  check((await apiReq(`/screenplay/${aliceScriptId}`, {}, bobToken)).status === 403, 'User B blocked (403) from reading User A screenplay');
  check((await apiReq(`/production/${aliceScriptId}/call-sheets`, {}, bobToken)).status === 403, 'User B blocked (403) from reading User A call sheets');
  check((await apiReq(`/production/${aliceScriptId}/storyboards`, {}, bobToken)).status === 403, 'User B blocked (403) from reading User A storyboards');
  check((await apiReq(`/intelligence/${aliceScriptId}`, {}, bobToken)).status === 403, 'User B blocked (403) from reading User A intelligence');

  // =========================================================================
  // TEST B: Cross-Device Sync & Durable Cloud Rehydration After Server Restart
  // =========================================================================
  console.log('\n--- TEST B: Multi-Device Sync & Cloud Persistence After Restart ---');
  await flushCloudWrites();
  resetInMemoryDb();
  await hydrateCloudDb({ force: true });

  // Wrong password rejected after restart too
  const badLoginA = await apiReq('/auth/login', {
    method: 'POST',
    body: { email: 'alice@e2e.studio', password: 'WrongPassword!' }
  });
  check(badLoginA.status === 401, 'Invalid password rejected with 401 after DB reload', `status=${badLoginA.status}`);

  // Device 2 logs in cleanly after full memory wipe
  const loginA2 = await apiReq('/auth/login', {
    method: 'POST',
    body: { email: 'alice@e2e.studio', password: 'AliceStrongPassword!1' }
  });
  check(loginA2.status === 200 && loginA2.body?.user?.id === aliceId, 'Device 2 login after full restart resolves exact canonical Alice UID');
  const aliceDevice2Token = loginA2.body.user.token;

  const d2Scripts = await apiReq('/scripts', {}, aliceDevice2Token);
  const d2Screenplay = await apiReq(`/screenplay/${aliceScriptId}`, {}, aliceDevice2Token);
  const d2Storyboards = await apiReq(`/production/${aliceScriptId}/storyboards`, {}, aliceDevice2Token);
  const d2CallSheets = await apiReq(`/production/${aliceScriptId}/call-sheets`, {}, aliceDevice2Token);
  const d2Settings = await apiReq('/settings', {}, aliceDevice2Token);
  const d2Profile = await apiReq('/profile', {}, aliceDevice2Token);

  check(d2Scripts.body?.scripts?.length === 1 && d2Scripts.body.scripts[0].id === aliceScriptId, 'Device 2 syncs User A script list from cloud');
  check(d2Screenplay.body?.screenplay?.scenes?.[0]?.slugline === 'EXT. TITAN MOON - NIGHT', 'Device 2 syncs User A saved screenplay scenes');
  check(d2Storyboards.body?.storyboards?.[0]?.shots?.[0]?.title === 'Titan Establishing', 'Device 2 syncs User A storyboard shots');
  check(
    d2CallSheets.body?.callSheets?.[0]?.shootDay === 'Day 1 - Titan Exterior' &&
    d2CallSheets.body?.callSheets?.[0]?.locationName === 'Titan Landing Pad',
    'Device 2 syncs User A production call sheets'
  );
  check(d2Settings.body?.settings?.aiTone === 'noir' && d2Profile.body?.profile?.location === 'Reykjavik', 'Device 2 syncs User A settings & profile');

  // Device 2 modifies -> Device 1 (original token) sees change cleanly
  await apiReq(`/production/${aliceScriptId}/storyboard/scene-1/shots/${addShotA.body.shot.id}`, {
    method: 'PUT',
    body: { title: 'Titan Establishing v2 (Edited on Laptop)' }
  }, aliceDevice2Token);
  const d1StoryboardsAfter = await apiReq(`/production/${aliceScriptId}/storyboards`, {}, aliceToken);
  check(d1StoryboardsAfter.body?.storyboards?.[0]?.shots?.[0]?.title === 'Titan Establishing v2 (Edited on Laptop)', 'Device 1 sees updates made on Device 2');

  // =========================================================================
  // TEST C: Explicit Collaboration & Immediate Access Revocation
  // =========================================================================
  console.log('\n--- TEST C: Explicit Collaboration & Revocation ---');
  const alicePrivateRes = await apiReq('/scripts', { method: 'POST', body: { title: 'Alice Private Vault' } }, aliceToken);
  const alicePrivateId = alicePrivateRes.body.script.id;

  const inviteB = await apiReq(`/collaborators/${aliceScriptId}/invite`, {
    method: 'POST',
    body: { email: 'bob@e2e.studio', role: 'Viewer' }
  }, aliceToken);
  check(inviteB.status === 201 && inviteB.body?.collaborator?.token, 'User A invites User B as Viewer');
  const inviteToken = inviteB.body.collaborator.token;

  // Third party User C CANNOT accept User B's invitation token
  const regC = await apiReq('/auth/register', {
    method: 'POST',
    body: { name: 'Charlie Attacker', email: 'charlie@e2e.studio', password: 'CharliePassword!3' }
  });
  const charlieToken = regC.body.user.token;
  const charlieSteal = await apiReq(`/collaborators/invitations/${inviteToken}/accept`, { method: 'POST' }, charlieToken);
  check(charlieSteal.status >= 400 && charlieSteal.status < 500, 'Third user blocked from accepting User B invitation token');

  // User B accepts legitimately
  const acceptB = await apiReq(`/collaborators/invitations/${inviteToken}/accept`, { method: 'POST' }, bobToken);
  check(acceptB.status === 200 && acceptB.body?.success === true, 'User B accepts personal invitation');

  const bScriptsCollab = await apiReq('/scripts', {}, bobToken);
  check(
    bScriptsCollab.body.scripts.some(s => s.id === aliceScriptId) &&
    !bScriptsCollab.body.scripts.some(s => s.id === alicePrivateId),
    'User B sees shared script ONLY (not Alice Private Vault)'
  );

  // Viewer cannot edit screenplay or add shots
  check((await apiReq(`/screenplay/${aliceScriptId}`, {}, bobToken)).status === 200, 'Collaborator Viewer can read shared screenplay');
  check((await apiReq(`/screenplay/${aliceScriptId}`, { method: 'PUT', body: { title: 'Vandalized' } }, bobToken)).status === 403, 'Viewer blocked (403) from editing shared screenplay');
  check((await apiReq(`/production/${aliceScriptId}/storyboard/scene-1/shots`, { method: 'POST', body: { title: 'Unauthorized Shot' } }, bobToken)).status === 403, 'Viewer blocked (403) from adding storyboard shot');

  // Upgrade to Editor -> Edit succeeds
  const upgradeB = await apiReq(`/collaborators/${aliceScriptId}/bob@e2e.studio`, {
    method: 'PUT',
    body: { role: 'Editor' }
  }, aliceToken);
  check(upgradeB.status === 200 && upgradeB.body?.collaborator?.role === 'Editor', 'Owner upgrades User B to Editor');
  check((await apiReq(`/production/${aliceScriptId}/storyboard/scene-1/shots`, { method: 'POST', body: { title: 'Bob Collab Shot' } }, bobToken)).status === 201, 'Upgraded Editor can add shot to shared project');

  // Revoke User B access -> immediate 403
  const removeB = await apiReq(`/collaborators/${aliceScriptId}/bob@e2e.studio`, { method: 'DELETE' }, aliceToken);
  check(removeB.status === 200 && removeB.body?.success === true, 'Owner removes User B collaborator');
  check((await apiReq(`/scripts/${aliceScriptId}`, {}, bobToken)).status === 403, 'Removed User B immediately loses access to script (403)');
  check((await apiReq(`/production/${aliceScriptId}/storyboards`, {}, bobToken)).status === 403, 'Removed User B immediately loses access to storyboards (403)');
  const bScriptsPostRemove = await apiReq('/scripts', {}, bobToken);
  check(!bScriptsPostRemove.body.scripts.some(s => s.id === aliceScriptId), 'Removed project disappears from User B script list');

  // =========================================================================
  // TEST D: Security Boundaries & Attack Resistance in Production Mode
  // =========================================================================
  console.log('\n--- TEST D: Security Boundary Attacks (Production Mode) ---');
  check((await apiReq('/scripts')).status === 401, 'Unauthenticated /scripts returns 401');
  check((await apiReq('/notifications')).status === 401, 'Unauthenticated /notifications returns 401');
  check((await apiReq('/settings')).status === 401, 'Unauthenticated /settings returns 401');
  check((await apiReq(`/production/${aliceScriptId}`)).status === 401, 'Unauthenticated /production/:id returns 401');

  // Reject test/dev/mock tokens in production
  check((await apiReq('/scripts', {}, 'test-token')).status === 401, 'Production rejects legacy test-token (401)');
  check((await apiReq('/scripts', {}, 'dev-token')).status === 401, 'Production rejects legacy dev-token (401)');
  check((await apiReq('/scripts', {}, 'mock-user:alice:alice@e2e.studio:Alice')).status === 401, 'Production rejects mock-user token (401)');

  // Tampered & expired JWTs
  const tamperedJwt = `${aliceToken.split('.')[0]}.${aliceToken.split('.')[1]}.tamperedSig123`;
  const expiredJwt = makeCustomJwt({
    sub: aliceId, uid: aliceId, email: 'alice@e2e.studio', name: 'Alice',
    iss: 'scriptora-api', iat: Math.floor(Date.now() / 1000) - 7200, exp: Math.floor(Date.now() / 1000) - 3600
  });
  check((await apiReq('/scripts', {}, tamperedJwt)).status === 401, 'Production rejects tampered JWT signature (401)');
  check((await apiReq('/scripts', {}, expiredJwt)).status === 401, 'Production rejects expired JWT (401)');

  // Private storyboard image endpoint & cross-project download isolation
  const imgUnauth = await apiReq(`/production/storyboard/images/${aliceImgFilename}`);
  const imgCharlie = await apiReq(`/production/storyboard/images/${aliceImgFilename}`, {}, charlieToken);
  const imgAlice = await apiReq(`/production/storyboard/images/${aliceImgFilename}`, {}, aliceToken);
  check(imgUnauth.status === 401, 'Unauthenticated storyboard image request blocked (401)');
  check(imgCharlie.status === 403, 'Unauthorized user requesting Alice storyboard image blocked (403)');
  check(imgAlice.status === 200, 'Authenticated owner can fetch private storyboard image (200)');

  const crossProjectDownload = await apiReq(
    `/production/${bobScriptId}/storyboard/download?storagePath=${encodeURIComponent(aliceStoragePath)}`,
    {},
    bobToken
  );
  check(crossProjectDownload.status === 403, 'Cross-project download with another script storagePath blocked (403)', `status=${crossProjectDownload.status}`);

  // TAMPER UPDATE ownerId via PUT /scripts/:id
  await apiReq(`/scripts/${aliceScriptId}`, {
    method: 'PUT',
    body: { ownerId: 'evil-uid', ownerEmail: 'evil@e2e.studio', title: 'Alice Updated Title' }
  }, aliceToken);
  const afterTamperUpdate = await apiReq(`/scripts/${aliceScriptId}`, {}, aliceToken);
  check(
    afterTamperUpdate.body?.script?.ownerId === aliceId &&
    afterTamperUpdate.body?.script?.title === 'Alice Updated Title',
    'PUT /scripts/:id updates allowed metadata without permitting ownerId tampering'
  );

  // =========================================================================
  // Summary
  // =========================================================================
  console.log(`\n======================================================`);
  console.log(`E2E Result: ${passed} passed, ${failed} failed`);
  console.log(`======================================================`);
  if (failed > 0) {
    process.exitCode = 1;
  }
} finally {
  await flushCloudWrites().catch(() => {});
  await cleanupPrefixForTests(TEST_PREFIX).catch(() => {});
  for (const asset of uploadedTestAssets) {
    const dirs = [
      path.resolve(process.cwd(), 'backend/data/storage/storyboard'),
      path.resolve(process.cwd(), 'frontend/public/assets/storyboard/generated'),
      path.resolve(process.cwd(), 'assets/storyboard/generated')
    ];
    for (const dir of dirs) {
      const fpath = path.join(dir, path.basename(asset.filename));
      if (fs.existsSync(fpath)) {
        try { fs.unlinkSync(fpath); } catch {}
      }
    }
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && asset.storagePath) {
      const baseUrl = process.env.SUPABASE_URL.replace(/\/+$/, '');
      await fetch(`${baseUrl}/storage/v1/object/storyboards/${asset.storagePath}`, {
        method: 'DELETE',
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
        }
      }).catch(() => {});
    }
  }
  server.close();
}


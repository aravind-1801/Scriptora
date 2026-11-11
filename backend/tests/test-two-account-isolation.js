import http from 'http';
import { server } from '../app/server.js';

const PORT = 8100;
process.env.NODE_ENV = 'test';
process.env.STRICT_AUTH = 'true'; // Enforce strict token checks

function makeRequest(path, options = {}, token = null) {
  const headers = { ...options.headers };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const opts = { ...options, headers };
  return new Promise((resolve, reject) => {
    const req = http.request(`http://localhost:${PORT}${path}`, opts, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (opts.body) req.write(typeof opts.body === 'string' ? opts.body : JSON.stringify(opts.body));
    req.end();
  });
}

server.listen(PORT, async () => {
  console.log(`[TEST] Isolation test server running on port ${PORT}...`);
  let allPassed = true;
  function assert(condition, message) {
    if (condition) {
      console.log(`✓ ${message}: PASS`);
    } else {
      console.error(`✗ ${message}: FAIL`);
      allPassed = false;
    }
  }

  try {
    const tokenA = 'mock-user:alice-uid-101:alice@studio.com:Alice Writer';
    const tokenB = 'mock-user:bob-uid-202:bob@studio.com:Bob Director';

    // 1. Unauthenticated checks (Must return 401)
    const unauthScripts = await makeRequest('/api/scripts');
    assert(unauthScripts.status === 401, 'Unauthenticated GET /api/scripts returns 401');

    const unauthSb = await makeRequest('/api/production/alice-heist/storyboards');
    assert(unauthSb.status === 401, 'Unauthenticated GET /api/production/:id/storyboards returns 401');

    // 2. User A creates screenplay "Alice Heist"
    const createResA = await makeRequest('/api/scripts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { title: 'Alice Heist', genre: 'Action Thriller' }
    }, tokenA);
    assert(createResA.status === 201 && createResA.body.script?.id === 'alice-heist', 'User A creates script "Alice Heist" (201)');
    assert(createResA.body.script?.ownerId === 'alice-uid-101', 'Script ownerId matches User A UID');

    // 3. User A adds a storyboard shot to Alice Heist Scene 1
    const shotResA = await makeRequest('/api/production/alice-heist/storyboard/scene-1/shots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        title: 'Desert Vault Perimeter',
        shotSize: 'Extreme Wide Shot',
        cameraAngle: 'Aerial Drone',
        prompt: 'Cinematic drone shot of desert vault perimeter wall at dusk'
      }
    }, tokenA);
    assert(shotResA.status === 201 && shotResA.body.shot?.title === 'Desert Vault Perimeter', 'User A adds storyboard shot to Alice Heist (201)');

    // 4. User B creates their own screenplay "Bob Thriller"
    const createResB = await makeRequest('/api/scripts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { title: 'Bob Thriller', genre: 'Noir' }
    }, tokenB);
    assert(createResB.status === 201 && createResB.body.script?.id === 'bob-thriller', 'User B creates script "Bob Thriller" (201)');
    assert(createResB.body.script?.ownerId === 'bob-uid-202', 'Script ownerId matches User B UID');

    // 5. User B lists scripts: MUST NOT contain Alice's script
    const listB = await makeRequest('/api/scripts', {}, tokenB);
    const bScriptIds = (listB.body.scripts || []).map(s => s.id);
    assert(bScriptIds.includes('bob-thriller'), 'User B sees their own script "bob-thriller"');
    assert(!bScriptIds.includes('alice-heist'), 'User B DOES NOT see User A\'s script "alice-heist"');

    // 6. User B attempts unauthorized access to Alice's project (Must return 403 Forbidden)
    const accessScriptB = await makeRequest('/api/scripts/alice-heist', {}, tokenB);
    assert(accessScriptB.status === 403, 'User B accessing GET /scripts/alice-heist returns 403');

    const accessSbB = await makeRequest('/api/production/alice-heist/storyboards', {}, tokenB);
    assert(accessSbB.status === 403, 'User B accessing GET /production/alice-heist/storyboards returns 403');

    const accessSceneB = await makeRequest('/api/production/alice-heist/storyboard?sceneId=scene-1', {}, tokenB);
    assert(accessSceneB.status === 403, 'User B accessing GET /production/alice-heist/storyboard returns 403');

    const addShotB = await makeRequest('/api/production/alice-heist/storyboard/scene-1/shots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { title: 'Intrusion Shot' }
    }, tokenB);
    assert(addShotB.status === 403, 'User B attempting POST shot to alice-heist returns 403');

    // 7. Cross-device sync verification for User A (Device 2 with same UID)
    const tokenADevice2 = 'mock-user:alice-uid-101:alice@studio.com:Alice Writer';
    const listADevice2 = await makeRequest('/api/scripts', {}, tokenADevice2);
    const aScriptIds = (listADevice2.body.scripts || []).map(s => s.id);
    assert(aScriptIds.includes('alice-heist'), 'Device 2 for User A retrieves script "alice-heist"');

    const sbADevice2 = await makeRequest('/api/production/alice-heist/storyboard?sceneId=scene-1', {}, tokenADevice2);
    const shotsA = sbADevice2.body.storyboard?.shots || [];
    assert(shotsA.some(s => s.title === 'Desert Vault Perimeter'), 'Device 2 retrieves exact storyboard shots added on Device 1');

    // 8. Explicit Collaboration: User A invites User B as Editor
    const inviteRes = await makeRequest('/api/collaborators/alice-heist/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'bob@studio.com', role: 'Editor' }
    }, tokenA);
    assert(inviteRes.status === 201 && inviteRes.body.collaborator?.email === 'bob@studio.com', 'User A invites User B as Editor (201)');

    // User B accepts the invitation
    const invitesList = await makeRequest('/api/collaborators/alice-heist/invitations', {}, tokenA);
    const inviteToken = invitesList.body.invitations?.[0]?.token;
    assert(Boolean(inviteToken), 'Invitation token generated');

    const acceptRes = await makeRequest(`/api/collaborators/invitations/${inviteToken}/accept`, {
      method: 'POST'
    }, tokenB);
    assert(acceptRes.status === 200 && acceptRes.body.success === true, 'User B accepts invitation (200)');

    // 9. After accepting, User B can access "alice-heist"
    const listBAfterCollab = await makeRequest('/api/scripts', {}, tokenB);
    const bScriptIdsAfter = (listBAfterCollab.body.scripts || []).map(s => s.id);
    assert(bScriptIdsAfter.includes('alice-heist'), 'User B now sees collaborated project "alice-heist" in scripts list');

    const sbBCollab = await makeRequest('/api/production/alice-heist/storyboard?sceneId=scene-1', {}, tokenB);
    assert(sbBCollab.status === 200 && sbBCollab.body.storyboard?.shots?.length >= 1, 'User B successfully reads collaborated storyboard');

    // User B adds a collaborated shot
    const addCollabShotB = await makeRequest('/api/production/alice-heist/storyboard/scene-1/shots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        title: 'Catwalk Surveillance',
        shotSize: 'Medium Close Up',
        prompt: 'Operative in dark surveillance vest monitoring monitors'
      }
    }, tokenB);
    assert(addCollabShotB.status === 201, 'User B successfully adds shot as Editor (201)');

    // User A sees Bob's new shot
    const sbAFinal = await makeRequest('/api/production/alice-heist/storyboard?sceneId=scene-1', {}, tokenA);
    const finalShots = sbAFinal.body.storyboard?.shots || [];
    assert(finalShots.some(s => s.title === 'Catwalk Surveillance'), 'User A sees collaborated shot added by User B');

    // 10. Non-collaborated isolation: User A creates a second private screenplay "Alice Secret"
    const createA2 = await makeRequest('/api/scripts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { title: 'Alice Secret', genre: 'Mystery' }
    }, tokenA);
    assert(createA2.status === 201, 'User A creates private script "Alice Secret"');

    // User B MUST NOT see or access "Alice Secret"
    const listBCheck2 = await makeRequest('/api/scripts', {}, tokenB);
    const bScriptIds2 = (listBCheck2.body.scripts || []).map(s => s.id);
    assert(!bScriptIds2.includes('alice-secret'), 'User B DOES NOT see User A\'s unshared script "alice-secret"');

    const accessA2ByB = await makeRequest('/api/production/alice-secret/storyboard?sceneId=scene-1', {}, tokenB);
    assert(accessA2ByB.status === 403, 'User B accessing unshared "alice-secret" returns 403 Forbidden');

    console.log(`\n======================================================`);
    if (allPassed) {
      console.log('✓ ALL TWO-ACCOUNT ISOLATION & COLLABORATION TESTS PASSED!');
    } else {
      console.error('✗ SOME ISOLATION TESTS FAILED!');
    }
    console.log(`======================================================\n`);

    server.close();
    process.exit(allPassed ? 0 : 1);
  } catch (err) {
    console.error('Test execution error:', err);
    server.close();
    process.exit(1);
  }
});

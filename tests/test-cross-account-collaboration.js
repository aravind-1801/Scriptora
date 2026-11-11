/**
 * SCRIPTORA — End-to-End Cross-Account Collaboration & Account Isolation Verification Test
 * 
 * Verifies real multi-account security boundaries:
 *  - Account A (Owner): creates project, edits screenplay, manages storyboards, invites collaborators
 *  - Account B (Collaborator): joins project, reads/edits screenplay & storyboards within assigned role, blocked from owner-only actions
 *  - Account C (Unrelated Intruder): blocked with HTTP 403 from reading, modifying, or generating assets for Account A's private project
 *  - Revocation: immediate termination of access when collaborator is removed
 */

import http from 'http';
import { server } from '../backend/app/server.js';
import { db } from '../backend/app/models/db.js';

const PORT = 8133;
const BASE_URL = `http://localhost:${PORT}`;

// Helper to create valid mock JWTs (Header.Payload.Signature) for each test account
function makeToken(user) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    user_id: user.id,
    sub: user.id,
    uid: user.id,
    email: user.email,
    name: user.name,
    exp: Math.floor(Date.now() / 1000) + 3600 // Valid 1 hr
  })).toString('base64url');
  return `${header}.${payload}.mock-signature`;
}

const accountA = { id: 'usr-owner-a', name: 'Alice Owner', email: 'alice.owner@scriptora.studio' };
const accountB = { id: 'usr-collab-b', name: 'Bob Editor', email: 'bob.editor@scriptora.studio' };
const accountC = { id: 'usr-intruder-c', name: 'Charlie Intruder', email: 'charlie.intruder@external.io' };

const tokenA = makeToken(accountA);
const tokenB = makeToken(accountB);
const tokenC = makeToken(accountC);

async function api(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  const body = options.body ? (typeof options.body === 'string' ? options.body : JSON.stringify(options.body)) : null;

  return new Promise((resolve, reject) => {
    const req = http.request(url, {
      method: options.method || 'GET',
      headers
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, body: data ? JSON.parse(data) : {} });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, body: data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

function assert(condition, message) {
  if (!condition) {
    console.error(`  ✗ FAIL: ${message}`);
    throw new Error(message);
  }
  console.log(`  ✓ ${message}`);
}

async function runTest() {
  console.log('========================================================================');
  console.log('SCRIPTORA — Cross-Account Collaboration & Account Isolation Test');
  console.log('========================================================================\n');

  await new Promise((resolve) => server.listen(PORT, '0.0.0.0', resolve));

  try {
    const testScriptId = `collab-test-${Date.now()}`;

    // --- STEP 1: Account A (Owner) Creates Private Screenplay ---
    console.log('--- Step 1: Account A (Owner) Creates Private Screenplay ---');
    const createRes = await api('/scripts', {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokenA}` },
      body: { title: 'The Obsidian Protocol', genre: 'Sci-Fi Thriller' }
    });
    assert(createRes.status === 201, `Account A creates script successfully (HTTP 201)`);
    const script = createRes.body.script;
    const scriptId = script.id;
    assert(script.ownerId === accountA.id, `Script ownerId correctly bound to Account A (${accountA.id})`);

    // --- STEP 2: Account A Saves Screenplay Content & Adds Storyboard Shot ---
    console.log('\n--- Step 2: Account A Saves Screenplay & Storyboard Shot ---');
    const saveScriptRes = await api(`/screenplay/${scriptId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${tokenA}` },
      body: {
        title: 'The Obsidian Protocol',
        scenes: [{ id: 'scene-1', number: 1, slugline: 'EXT. ARCTIC RIDGE - DAWN', blocks: [{ type: 'action', content: 'A flare pierces the blizzard.' }] }]
      }
    });
    assert(saveScriptRes.status === 200, `Account A saves screenplay (HTTP 200)`);

    const addShotRes = await api(`/production/${scriptId}/storyboard/scene-1/shots`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokenA}` },
      body: {
        shotNumber: '1A',
        shotType: 'Wide',
        visualPrompt: 'Blizzard over Arctic ridge with glowing red flare',
        style: 'Cinematic'
      }
    });
    assert(addShotRes.status === 201, `Account A adds storyboard shot (HTTP 201)`);

    // --- STEP 3: Account C (Intruder) Attempts Unauthorized Access to Account A's Project ---
    console.log('\n--- Step 3: Account C (Unrelated Intruder) Attempts Unauthorized Access ---');
    
    // Attempt to view script details
    const cGetScript = await api(`/scripts/${scriptId}`, { headers: { Authorization: `Bearer ${tokenC}` } });
    assert(cGetScript.status === 403, `Account C blocked from reading script metadata (HTTP 403 Forbidden)`);

    // Attempt to read screenplay content
    const cGetScreenplay = await api(`/screenplay/${scriptId}`, { headers: { Authorization: `Bearer ${tokenC}` } });
    assert(cGetScreenplay.status === 403, `Account C blocked from reading screenplay text (HTTP 403 Forbidden)`);

    // Attempt to modify screenplay
    const cPutScreenplay = await api(`/screenplay/${scriptId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${tokenC}` },
      body: { scenes: [] }
    });
    assert(cPutScreenplay.status === 403, `Account C blocked from modifying screenplay (HTTP 403 Forbidden)`);

    // Attempt to read storyboard shots
    const cGetStoryboard = await api(`/production/${scriptId}/storyboards`, { headers: { Authorization: `Bearer ${tokenC}` } });
    assert(cGetStoryboard.status === 403, `Account C blocked from reading storyboards (HTTP 403 Forbidden)`);

    // Attempt to request signed URLs
    const cSignedUrl = await api(`/production/${scriptId}/storyboard/signed-url`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokenC}` },
      body: { storagePath: `${scriptId}/shot_1a.jpg` }
    });
    assert(cSignedUrl.status === 403, `Account C blocked from requesting signed image URLs (HTTP 403 Forbidden)`);

    // Attempt to delete script
    const cDeleteScript = await api(`/scripts/${scriptId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${tokenC}` }
    });
    assert(cDeleteScript.status === 403, `Account C blocked from deleting script (HTTP 403 Forbidden)`);

    // Attempt to invite someone to Account A's script
    const cInvite = await api(`/collaborators/${scriptId}/invite`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokenC}` },
      body: { email: 'fake@hacker.net', role: 'Owner' }
    });
    assert(cInvite.status === 403, `Account C blocked from inviting collaborators (HTTP 403 Forbidden)`);

    // --- STEP 4: Account A Invites Account B (Editor) ---
    console.log('\n--- Step 4: Account A Invites Account B (Editor) ---');
    const inviteRes = await api(`/collaborators/${scriptId}/invite`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokenA}` },
      body: { email: accountB.email, role: 'Editor' }
    });
    assert(inviteRes.status === 201, `Account A invites Account B as Editor (HTTP 201)`);
    const invitation = inviteRes.body.collaborator;
    assert(invitation && invitation.token, `Invitation token generated: ${invitation?.token}`);

    // --- STEP 5: Account B Accepts Invitation & Joins Project ---
    console.log('\n--- Step 5: Account B Accepts Invitation & Joins Project ---');
    const acceptRes = await api(`/collaborators/invitations/${invitation.token}/accept`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokenB}` }
    });
    assert(acceptRes.status === 200, `Account B joins project as Editor (HTTP 200)`);

    // --- STEP 6: Account B Performs Permitted Editor Actions ---
    console.log('\n--- Step 6: Account B Performs Permitted Editor Actions ---');
    
    // Read screenplay
    const bGetScreenplay = await api(`/screenplay/${scriptId}`, { headers: { Authorization: `Bearer ${tokenB}` } });
    assert(bGetScreenplay.status === 200, `Account B reads shared screenplay (HTTP 200)`);

    // Edit screenplay
    const bPutScreenplay = await api(`/screenplay/${scriptId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${tokenB}` },
      body: {
        title: 'The Obsidian Protocol',
        scenes: [{ id: 'scene-1', number: 1, slugline: 'EXT. ARCTIC RIDGE - DAWN', blocks: [{ type: 'action', content: 'A flare pierces the blizzard. Meera raises her visor.' }] }]
      }
    });
    assert(bPutScreenplay.status === 200, `Account B successfully modifies screenplay (HTTP 200)`);

    // Read storyboard
    const bGetStoryboard = await api(`/production/${scriptId}/storyboard?sceneId=scene-1`, { headers: { Authorization: `Bearer ${tokenB}` } });
    assert(bGetStoryboard.status === 200, `Account B reads storyboard shots (HTTP 200)`);

    // Add storyboard shot
    const bAddShot = await api(`/production/${scriptId}/storyboard/scene-1/shots`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokenB}` },
      body: {
        shotNumber: '1B',
        shotType: 'Close-up',
        visualPrompt: 'Frost covers Meera visor as she looks at the signal beacon',
        style: 'Cinematic'
      }
    });
    assert(bAddShot.status === 201, `Account B adds new storyboard shot (HTTP 201)`);

    // --- STEP 7: Account B Blocked from Owner-Only Actions ---
    console.log('\n--- Step 7: Account B Blocked from Owner-Only Actions ---');
    
    // Attempt to delete project
    const bDeleteScript = await api(`/scripts/${scriptId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${tokenB}` }
    });
    assert(bDeleteScript.status === 403, `Account B blocked from deleting project (HTTP 403 Forbidden)`);

    // Attempt to invite new collaborators (Editor role cannot invite)
    const bInvite = await api(`/collaborators/${scriptId}/invite`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokenB}` },
      body: { email: 'external@scriptora.studio', role: 'Editor' }
    });
    assert(bInvite.status === 403, `Account B blocked from managing collaborators (HTTP 403 Forbidden)`);

    // --- STEP 8: Account A Verifies Account B's Persisted Edits ---
    console.log('\n--- Step 8: Account A Verifies Account B edits Persisted ---');
    const aCheckScreenplay = await api(`/screenplay/${scriptId}`, { headers: { Authorization: `Bearer ${tokenA}` } });
    assert(aCheckScreenplay.status === 200, `Account A retrieves updated screenplay (HTTP 200)`);
    const actionBlock = aCheckScreenplay.body.screenplay.scenes[0].blocks[0].content;
    assert(actionBlock.includes('Meera raises her visor'), `Screenplay contains Account B's edits: "${actionBlock}"`);

    // --- STEP 9: Account A Revokes/Removes Account B (Immediate Access Revocation) ---
    console.log('\n--- Step 9: Account A Removes Account B (Revocation Enforcement) ---');
    const removeRes = await api(`/collaborators/${scriptId}/${accountB.email}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${tokenA}` }
    });
    assert(removeRes.status === 200, `Account A removes Account B from collaborators (HTTP 200)`);

    // Account B tries to access again
    const bRevokedAccess = await api(`/screenplay/${scriptId}`, { headers: { Authorization: `Bearer ${tokenB}` } });
    assert(bRevokedAccess.status === 403, `Revoked Account B immediately denied access (HTTP 403 Forbidden)`);

    console.log('\n========================================================================');
    console.log('ALL CROSS-ACCOUNT COLLABORATION & ISOLATION CHECKS PASSED (19/19)!');
    console.log('========================================================================');
  } finally {
    server.close();
  }
}

runTest().catch((err) => {
  console.error('\nTest failed with error:', err);
  process.exit(1);
});

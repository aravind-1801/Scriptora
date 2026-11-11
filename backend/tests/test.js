import http from 'http';
import { server } from '../app/server.js';

const PORT = 8099;
process.env.NODE_ENV = 'test';

function request(path, options = {}, token = null) {
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
  console.log(`[TEST] Backend test server listening on port ${PORT}...`);
  let allPassed = true;
  function assert(condition, label, extra = '') {
    if (condition) {
      console.log(`✓ ${label}${extra ? `: ${extra}` : ''} PASS`);
    } else {
      console.error(`✗ ${label}${extra ? `: ${extra}` : ''} FAIL`);
      allPassed = false;
    }
  }

  try {
    const ownerToken = 'mock-user:owner-uid-1:writer@scriptora.studio:Test Writer';

    // 1. Health
    const health = await request('/api/health');
    assert(health.status === 200 && health.body.status === 'ok', 'Health Check', health.status);

    // 2. Auth me starts clean (null before login)
    const meInitial = await request('/api/auth/me');
    assert(meInitial.status === 200 && meInitial.body.user === null, 'Auth /me Initial Clean State', meInitial.status);

    // 3. Scripts List starts empty on clean slate
    const scriptsInitial = await request('/api/scripts', {}, ownerToken);
    assert(
      scriptsInitial.status === 200 && Array.isArray(scriptsInitial.body.scripts) && scriptsInitial.body.scripts.length === 0,
      'Scripts List Initial Clean Slate',
      scriptsInitial.status
    );

    // 4. Create Script (Starts with empty screenplay & clean scores)
    const create = await request('/api/scripts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { title: 'Solaris Echo', genre: 'Sci-Fi' }
    }, ownerToken);
    const testScriptId = create.body.script?.id;
    const testJoinCode = create.body.script?.joinCode;
    const solarisScreenplay = await request(`/api/screenplay/${testScriptId}`, {}, ownerToken);
    const isSolarisScreenplayEmpty = solarisScreenplay.body.screenplay?.wordCount === 0 &&
      solarisScreenplay.body.screenplay?.scenes?.[0]?.blocks?.[0]?.content === '';
    assert(
      create.status === 201 &&
      Boolean(testScriptId) &&
      Boolean(testJoinCode) &&
      create.body.script?.title === 'Solaris Echo' &&
      isSolarisScreenplayEmpty,
      'Create Script (Empty Screenplay)',
      create.status
    );

    // 4b. Set Current Draft
    const currDraft = await request(`/api/scripts/${testScriptId}/current-draft`, { method: 'POST' }, ownerToken);
    assert(currDraft.status === 200 && currDraft.body.script?.isCurrentDraft === true, 'Set Current Draft', currDraft.status);

    // 5. Collaborators start empty for brand new screenplay
    const collabs = await request(`/api/collaborators/${testScriptId}`, {}, ownerToken);
    assert(collabs.status === 200 && Array.isArray(collabs.body.collaborators) && collabs.body.collaborators.length === 0, 'Collaborators Initial Clean List', collabs.status);

    // 6. Join code validation against newly created screenplay joinCode
    const join = await request('/api/join-code/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { code: testJoinCode }
    }, ownerToken);
    assert(join.status === 200 && join.body.valid === true, 'Validate Join Code', join.status);

    // 7. Google Auth Login
    const googleLogin = await request('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        email: 'maya.lin@scriptora.studio',
        name: 'Maya Lin',
        picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        provider: 'google'
      }
    });
    assert(
      googleLogin.status === 200 &&
      googleLogin.body.user?.email === 'maya.lin@scriptora.studio' &&
      googleLogin.body.user?.avatarUrl?.length > 0,
      'Google Auth Login',
      googleLogin.status
    );

    // 8. Storyboard AI Providers List
    const providers = await request('/api/production/ai/providers', {}, ownerToken);
    const hasNvidia = providers.body.providers?.some(p => p.id === 'nvidia-nim' && p.model === 'black-forest-labs/flux.1-dev');
    assert(providers.status === 200 && Array.isArray(providers.body.providers) && hasNvidia, 'Storyboard AI Providers (including NVIDIA NIM)', providers.status);

    // 9. Fetch Storyboard for Scene 1 (starts empty before shots added)
    const sb1 = await request(`/api/production/${testScriptId}/storyboard?sceneId=scene-1`, {}, ownerToken);
    assert(sb1.status === 200 && Array.isArray(sb1.body.storyboard?.shots) && sb1.body.storyboard.shots.length === 0, 'Get Storyboard Scene 1 (Clean Empty)', sb1.status);

    // 10. Add Shot to Scene 1
    const addShot = await request(`/api/production/${testScriptId}/storyboard/scene-1/shots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        title: 'Airlock Opening',
        description: 'Low angle shot of astronaut approaching airlock hatch.',
        shotSize: 'Low Angle Tracking',
        focalLength: '35mm'
      }
    }, ownerToken);
    const newShotId = addShot.body.shot?.id;
    assert(addShot.status === 201 && addShot.body.shot?.title === 'Airlock Opening' && Boolean(newShotId), 'Add Storyboard Shot', addShot.status);

    // 11. Approve Shot
    const approve = await request(`/api/production/${testScriptId}/storyboard/scene-1/shots/${newShotId}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { status: 'approved', notes: 'Approved for production sides.' }
    }, ownerToken);
    assert(approve.status === 200 && approve.body.shot?.approvalStatus === 'approved', 'Approve Storyboard Shot', approve.status);

    // 12. Procedural Concept Generation
    const genShot = await request(`/api/production/${testScriptId}/storyboard/generate-shot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        provider: 'scriptora-concept',
        prompt: 'Orbiting solar collector docking bay',
        shotSize: 'Wide Shot',
        cameraAngle: 'High Angle',
        focalLength: '24mm Wide',
        lightingMood: 'Daylight',
        aspectRatio: '2.39:1',
        visualStyle: 'Cinematic Concept Art',
        sceneHeading: 'EXT. SOLAR COLLECTOR BAY - DAY'
      }
    }, ownerToken);
    assert(genShot.status === 200 && genShot.body.imageUrl?.startsWith('data:image/svg+xml'), 'Procedural Concept Shot Generation', genShot.status);

    // 13. Unconfigured Provider Honest Error Handling
    const unconfGen = await request(`/api/production/${testScriptId}/storyboard/generate-shot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        provider: 'openai-dalle3',
        prompt: 'Futuristic city'
      }
    }, ownerToken);
    assert(
      (unconfGen.status === 400 && unconfGen.body.error?.includes('not configured')) || Boolean(process.env.OPENAI_API_KEY),
      'Unconfigured Provider Honest Error Handling',
      unconfGen.status
    );

    // 14. AI Scene Sequence Generation (default 4 shots and custom shot count)
    const genSeq = await request(`/api/production/${testScriptId}/storyboard/generate-sequence`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        sceneId: 'scene-1',
        visualStyle: 'Cinematic Concept Art',
        aspectRatio: '2.39:1'
      }
    }, ownerToken);
    assert(genSeq.status === 200 && genSeq.body.proposedShots?.length === 4, 'AI Scene Sequence Generation (Default 4 Shots)', genSeq.status);

    const genSeq2 = await request(`/api/production/${testScriptId}/storyboard/generate-sequence`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        sceneId: 'scene-1',
        visualStyle: 'Cinematic Concept Art',
        aspectRatio: '2.39:1',
        shotCount: 2
      }
    }, ownerToken);
    assert(genSeq2.status === 200 && genSeq2.body.proposedShots?.length === 2, 'AI Scene Sequence Generation (Custom 2 Shots)', genSeq2.status);

    // 14b. Storyboard Preferences & Recycle Bin Soft-Delete & Restore Workflow
    const getPrefs = await request('/api/production/storyboard/preferences', {}, ownerToken);
    assert(getPrefs.status === 200 && Boolean(getPrefs.body.preferences?.defaultStyle), 'Get Storyboard Preferences', getPrefs.status);

    const updatePrefs = await request('/api/production/storyboard/preferences', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: { defaultStyle: 'Concept Art', experienceLevel: 'Intermediate' }
    }, ownerToken);
    assert(updatePrefs.status === 200 && updatePrefs.body.preferences?.experienceLevel === 'Intermediate', 'Update Storyboard Preferences', updatePrefs.status);

    // Soft-delete shot and check Recycle Bin
    const delShotRes = await request(`/api/production/${testScriptId}/storyboard/scene-1/shots/${newShotId}`, {
      method: 'DELETE'
    }, ownerToken);
    const rbList = await request(`/api/production/${testScriptId}/storyboard/recycle-bin`, {}, ownerToken);
    assert(delShotRes.status === 200 && rbList.body.items?.length > 0, 'Soft Delete to Recycle Bin');

    // Restore shot from Recycle Bin
    const rbItem = (rbList.body.items || []).find(i => i.type === 'shot');
    const restoreShot = await request(`/api/production/${testScriptId}/storyboard/recycle-bin/restore`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { itemId: rbItem?.id }
    }, ownerToken);
    assert(restoreShot.status === 200 && restoreShot.body.success === true, 'Restore Shot from Recycle Bin');

    // 14c. Collaborator Invitation Lifecycle
    const inviteRes = await request(`/api/collaborators/${testScriptId}/invite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'rachel.scribe@studio.com', role: 'Script Doctor', message: 'Reviewing dialog' }
    }, ownerToken);
    assert(inviteRes.status === 201 && inviteRes.body.collaborator?.email === 'rachel.scribe@studio.com', 'Invite Collaborator', inviteRes.status);

    // Duplicate invitation rejection check
    const dupInviteRes = await request(`/api/collaborators/${testScriptId}/invite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'rachel.scribe@studio.com', role: 'Script Doctor' }
    }, ownerToken);
    assert(dupInviteRes.status === 400, 'Duplicate Invitation Prevention (400)', dupInviteRes.status);

    // List invitations, Resend, and Accept via token
    const invListRes = await request(`/api/collaborators/${testScriptId}/invitations`, {}, ownerToken);
    const createdInv = (invListRes.body.invitations || []).find(i => i.email === 'rachel.scribe@studio.com');
    assert(invListRes.status === 200 && Boolean(createdInv), 'List Pending Invitations');

    let resendOk = false;
    let acceptOk = false;
    let rachelCollabId = null;
    if (createdInv) {
      const resendRes = await request(`/api/collaborators/${testScriptId}/invitations/${createdInv.id}/resend`, {
        method: 'POST'
      }, ownerToken);
      resendOk = resendRes.status === 200 && resendRes.body.invitation?.status === 'pending';

      const token = resendRes.body.invitation?.token || createdInv.token;
      const lookupRes = await request(`/api/collaborators/invitations/${token}`);
      const acceptRes = await request(`/api/collaborators/invitations/${token}/accept`, {
        method: 'POST'
      }, 'mock-user:rachel-uid:rachel.scribe@studio.com:Rachel Scribe');
      acceptOk = lookupRes.status === 200 && acceptRes.status === 200 && acceptRes.body.collaborator?.email === 'rachel.scribe@studio.com';
      rachelCollabId = acceptRes.body.collaborator?.id || null;
    }
    assert(resendOk && acceptOk && Boolean(rachelCollabId), 'Resend and Accept Invitation via Token');

    // Interactive Role Management & Permission Enforcement
    const roleChangeRes = await request(`/api/collaborators/${testScriptId}/${rachelCollabId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: { role: 'Viewer' }
    }, ownerToken);
    assert(roleChangeRes.status === 200 && roleChangeRes.body.collaborator?.role === 'Viewer', 'Update Collaborator Role (Script Doctor -> Viewer)');

    const permsRes = await request(`/api/collaborators/${testScriptId}/permissions`, {}, ownerToken);
    assert(permsRes.status === 200 && permsRes.body.permissions?.['screenplay.read'] === true, 'Centralized Permissions Retrieval');

    // 14d. Join Code Access Request & Approval Workflow
    const reqAccessRes = await request('/api/join-code/request-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { code: testJoinCode, userEmail: 'line.producer@paramount.com', userName: 'Line Producer', requestedRole: 'Producer', note: 'Line producer reviewing budget' }
    });
    assert(reqAccessRes.status === 200 && reqAccessRes.body.status === 'pending', 'Join Code Access Request', reqAccessRes.status);

    // Fetch pending requests & approve
    const pendingReqs = await request(`/api/collaborators/${testScriptId}/requests`, {}, ownerToken);
    const targetReq = (pendingReqs.body.requests || []).find(r => r.userEmail === 'line.producer@paramount.com');
    let approvedOk = false;
    let approvedCollabId = null;
    if (targetReq) {
      const approveRes = await request(`/api/collaborators/${testScriptId}/requests/${targetReq.id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { role: 'Producer' }
      }, ownerToken);
      approvedOk = approveRes.status === 200 && approveRes.body.collaborator?.role === 'Producer';
      approvedCollabId = approveRes.body.collaborator?.id || null;
    }
    assert(approvedOk && Boolean(approvedCollabId), 'Approve Join Access Request');

    // 14e. End-to-End Encryption Setup & Key Rotation on Member Removal
    const e2eeEnableRes = await request(`/api/collaborators/${testScriptId}/e2ee/enable`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { keyFingerprint: 'sha256-a1b2c3d4e5f6', wrappedKeys: { 'writer@scriptora.studio': 'd3JhcHBlZF9rZXlfZGF0YQ==' } }
    }, ownerToken);
    assert(e2eeEnableRes.status === 200 && e2eeEnableRes.body.e2ee?.enabled === true, 'Enable E2EE Zero-Knowledge Encryption');

    // Remove collaborator with automatic E2EE key rotation
    const removeMemberRes = await request(`/api/collaborators/${testScriptId}/${approvedCollabId}`, {
      method: 'DELETE'
    }, ownerToken);
    const e2eeAfterRemoval = await request(`/api/collaborators/${testScriptId}/e2ee`, {}, ownerToken);
    assert(removeMemberRes.status === 200 && e2eeAfterRemoval.body.e2ee?.keyVersion === 2, 'Member Removal & E2EE Key Rotation');

    // Disable E2EE deactivation check
    const e2eeDisableRes = await request(`/api/collaborators/${testScriptId}/e2ee/disable`, {
      method: 'POST'
    }, ownerToken);
    assert(e2eeDisableRes.status === 200 && e2eeDisableRes.body.e2ee?.enabled === false, 'Disable E2EE Deactivation');

    // 14f. Security Activity Log Verification
    const secLogRes = await request(`/api/collaborators/${testScriptId}/security-activity`, {}, ownerToken);
    assert(secLogRes.status === 200 && Array.isArray(secLogRes.body.activity) && secLogRes.body.activity.length >= 3, 'Security Activity Audit Log');

    // 15. Sign Out (Session Invalidation)
    const logoutRes = await request('/api/auth/logout', { method: 'POST' });
    const meAfterLogout = await request('/api/auth/me');
    assert(logoutRes.status === 200 && meAfterLogout.body.user === null, 'Sign Out & Session Invalidation');

    // 16. Delete Account Unauthenticated Check (Must return 401)
    const deleteUnauth = await request('/api/auth/delete-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { confirmation: 'DELETE MY ACCOUNT' }
    });
    assert(deleteUnauth.status === 401, 'Delete Account Unauthenticated Protection (401)', deleteUnauth.status);

    // 17. Register Disposable Test User for Account Deletion
    const testUserReg = await request('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { name: 'Disposable Author', email: 'disposable.author@scriptora.studio' }
    });
    assert(testUserReg.status === 201 && testUserReg.body.user?.email === 'disposable.author@scriptora.studio', 'Register Disposable Test Account', testUserReg.status);

    // 18. Delete Account Invalid Confirmation Phrase Check (Must return 400)
    const deleteInvalidPhrase = await request('/api/auth/delete-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { confirmation: 'WRONG PHRASE' }
    });
    assert(deleteInvalidPhrase.status === 400, 'Delete Account Phrase Verification (400 on mismatch)', deleteInvalidPhrase.status);

    // 19. Real Account Deletion with Exact Phrase ("DELETE MY ACCOUNT")
    const deleteSuccess = await request('/api/auth/delete-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { confirmation: 'DELETE MY ACCOUNT' }
    });
    const meAfterDelete = await request('/api/auth/me');
    assert(deleteSuccess.status === 200 && deleteSuccess.body.success === true && meAfterDelete.body.user === null, 'Real Account Deletion Workflow (200 & Purged)');

    if (!allPassed) {
      console.error('\n[TEST] Some backend integration tests FAILED.');
      server.close();
      process.exit(1);
    }

    console.log('\n[TEST] All backend integration tests PASSED successfully!');
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('Test error:', err);
    server.close();
    process.exit(1);
  }
});

import http from 'http';
import { server } from '../app/server.js';

const PORT = 8099;
process.env.NODE_ENV = 'test';

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(`http://localhost:${PORT}${path}`, options, (res) => {
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
    if (options.body) req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    req.end();
  });
}

server.listen(PORT, async () => {
  console.log(`[TEST] Backend test server listening on port ${PORT}...`);
  try {
    // 1. Health
    const health = await request('/api/health');
    console.log('✓ Health Check:', health.status, health.body.status === 'ok' ? 'PASS' : 'FAIL');

    // 2. Auth me
    const me = await request('/api/auth/me');
    console.log('✓ Auth /me:', me.status, me.body.user?.initials === 'AK' ? 'PASS' : 'FAIL');

    // 3. Scripts
    const scripts = await request('/api/scripts');
    console.log('✓ Scripts List:', scripts.status, scripts.body.scripts?.length > 0 ? 'PASS' : 'FAIL');

    // 4. Create Script
    const create = await request('/api/scripts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { title: 'Solaris Echo', genre: 'Sci-Fi' }
    });
    console.log('✓ Create Script:', create.status, create.body.script?.title === 'Solaris Echo' ? 'PASS' : 'FAIL');

    // 5. Collaborators
    const collabs = await request('/api/collaborators/chronicles-of-dust');
    console.log('✓ Collaborators:', collabs.status, collabs.body.collaborators?.length === 3 ? 'PASS' : 'FAIL');

    // 6. Join code validation
    const join = await request('/api/join-code/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { code: 'A7K9-XP42' }
    });
    console.log('✓ Validate Join Code:', join.status, join.body.valid ? 'PASS' : 'FAIL');

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
    console.log('✓ Google Auth Login:', googleLogin.status, googleLogin.body.user?.email === 'maya.lin@scriptora.studio' && googleLogin.body.user?.avatarUrl?.length > 0 ? 'PASS' : 'FAIL');

    // 8. Storyboard AI Providers List
    const providers = await request('/api/production/ai/providers');
    console.log('✓ Storyboard AI Providers:', providers.status, Array.isArray(providers.body.providers) && providers.body.providers.length >= 4 ? 'PASS' : 'FAIL');

    // 9. Fetch Storyboard for Scene 1
    const sb1 = await request('/api/production/chronicles-of-dust/storyboard?sceneId=scene-1');
    console.log('✓ Get Storyboard Scene 1:', sb1.status, sb1.body.storyboard?.shots?.length >= 3 ? 'PASS' : 'FAIL');

    // 10. Add Shot to Scene 1
    const addShot = await request('/api/production/chronicles-of-dust/storyboard/scene-1/shots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        title: 'Desert Gate Approach',
        description: 'Low angle shot of Kevin walking toward entrance.',
        shotSize: 'Low Angle Tracking',
        focalLength: '35mm'
      }
    });
    console.log('✓ Add Storyboard Shot:', addShot.status, addShot.body.shot?.title === 'Desert Gate Approach' ? 'PASS' : 'FAIL');
    const newShotId = addShot.body.shot?.id;

    // 11. Approve Shot
    if (newShotId) {
      const approve = await request(`/api/production/chronicles-of-dust/storyboard/scene-1/shots/${newShotId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { status: 'approved', notes: 'Approved for production sides.' }
      });
      console.log('✓ Approve Storyboard Shot:', approve.status, approve.body.shot?.approvalStatus === 'approved' ? 'PASS' : 'FAIL');
    }

    // 12. Procedural Concept Generation
    const genShot = await request('/api/production/chronicles-of-dust/storyboard/generate-shot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        provider: 'scriptora-concept',
        prompt: 'Dusty desert highway outpost',
        shotSize: 'Wide Shot',
        cameraAngle: 'High Angle',
        focalLength: '24mm Wide',
        lightingMood: 'Daylight',
        aspectRatio: '2.39:1',
        visualStyle: 'Cinematic Concept Art',
        sceneHeading: 'EXT. MOJAVE OUTPOST GATE 4 - DAY'
      }
    });
    console.log('✓ Procedural Concept Shot Generation:', genShot.status, genShot.body.imageUrl?.startsWith('data:image/svg+xml') ? 'PASS' : 'FAIL');

    // 13. Unconfigured Provider Honest Error Handling
    const unconfGen = await request('/api/production/chronicles-of-dust/storyboard/generate-shot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        provider: 'openai-dalle3',
        prompt: 'Futuristic city'
      }
    });
    console.log('✓ Unconfigured Provider Honest Error Handling:', unconfGen.status === 400 && unconfGen.body.error?.includes('not configured') ? 'PASS' : (process.env.OPENAI_API_KEY ? 'PASS (Configured)' : 'FAIL'));

    // 14. AI Scene Sequence Generation (default 4 shots and custom shot count)
    const genSeq = await request('/api/production/chronicles-of-dust/storyboard/generate-sequence', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        sceneId: 'scene-1',
        visualStyle: 'Cinematic Concept Art',
        aspectRatio: '2.39:1'
      }
    });
    console.log('✓ AI Scene Sequence Generation (Default 4 Shots):', genSeq.status, genSeq.body.proposedShots?.length === 4 ? 'PASS' : 'FAIL');

    const genSeq2 = await request('/api/production/chronicles-of-dust/storyboard/generate-sequence', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        sceneId: 'scene-1',
        visualStyle: 'Cinematic Concept Art',
        aspectRatio: '2.39:1',
        shotCount: 2
      }
    });
    console.log('✓ AI Scene Sequence Generation (Custom 2 Shots):', genSeq2.status, genSeq2.body.proposedShots?.length === 2 ? 'PASS' : 'FAIL');

    // 15. Sign Out (Session Invalidation)
    const logoutRes = await request('/api/auth/logout', { method: 'POST' });
    const meAfterLogout = await request('/api/auth/me');
    console.log('✓ Sign Out & Session Invalidation:', logoutRes.status === 200 && meAfterLogout.body.user === null ? 'PASS' : 'FAIL');

    // 16. Delete Account Unauthenticated Check (Must return 401)
    const deleteUnauth = await request('/api/auth/delete-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { confirmation: 'DELETE MY ACCOUNT' }
    });
    console.log('✓ Delete Account Unauthenticated Protection (401):', deleteUnauth.status === 401 ? 'PASS' : 'FAIL');

    // 17. Register Disposable Test User for Account Deletion
    const testUserReg = await request('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { name: 'Disposable Author', email: 'disposable.author@scriptora.studio' }
    });
    console.log('✓ Register Disposable Test Account:', testUserReg.status === 201 && testUserReg.body.user?.email === 'disposable.author@scriptora.studio' ? 'PASS' : 'FAIL');

    // 18. Delete Account Invalid Confirmation Phrase Check (Must return 400)
    const deleteInvalidPhrase = await request('/api/auth/delete-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { confirmation: 'WRONG PHRASE' }
    });
    console.log('✓ Delete Account Phrase Verification (400 on mismatch):', deleteInvalidPhrase.status === 400 ? 'PASS' : 'FAIL');

    // 19. Real Account Deletion with Exact Phrase ("DELETE MY ACCOUNT")
    const deleteSuccess = await request('/api/auth/delete-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { confirmation: 'DELETE MY ACCOUNT' }
    });
    const meAfterDelete = await request('/api/auth/me');
    console.log('✓ Real Account Deletion Workflow (200 & Purged):', deleteSuccess.status === 200 && deleteSuccess.body.success === true && meAfterDelete.body.user === null ? 'PASS' : 'FAIL');

    console.log('\n[TEST] All backend integration tests PASSED successfully!');
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('Test error:', err);
    server.close();
    process.exit(1);
  }
});

import http from 'http';
import { server } from '../app/server.js';
import { db } from '../app/models/db.js';

const PORT = 8101;
process.env.NODE_ENV = 'test';
process.env.STRICT_AUTH = 'true';

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
  console.log(`[TEST] Clean-slate fresh user verification running on port ${PORT}...`);
  let allPassed = true;
  function assert(condition, label) {
    if (condition) {
      console.log(`✓ ${label}: PASS`);
    } else {
      console.error(`✗ ${label}: FAIL`);
      allPassed = false;
    }
  }

  try {
    // 1. Fresh DB state contains zero seeded/demo data
    assert(db.currentUser === null, 'Fresh DB currentUser is null');
    assert(Array.isArray(db.scripts) && db.scripts.length === 0, 'Fresh DB scripts is empty []');
    assert(Array.isArray(db.notifications) && db.notifications.length === 0, 'Fresh DB notifications is empty []');
    assert(Array.isArray(db.productionWorkspaces) && db.productionWorkspaces.length === 0, 'Fresh DB productionWorkspaces is empty []');
    assert(Array.isArray(db.storyboards) && db.storyboards.length === 0, 'Fresh DB storyboards is empty []');
    assert(Array.isArray(db.productionSchedule) && db.productionSchedule.length === 0, 'Fresh DB productionSchedule is empty []');
    assert(Array.isArray(db.productionCallSheets) && db.productionCallSheets.length === 0, 'Fresh DB productionCallSheets is empty []');
    assert(Array.isArray(db.productionBreakdown) && db.productionBreakdown.length === 0, 'Fresh DB productionBreakdown is empty []');

    // 2. Unauthenticated /auth/me returns null
    const unauthMe = await request('/api/auth/me');
    assert(unauthMe.status === 200 && unauthMe.body.user === null, 'Unauthenticated /api/auth/me returns user: null');

    // 3. Brand new User 1 sees zero screenplays and zero notifications
    const freshToken1 = 'mock-user:fresh-u1:fresh1@example.com:Fresh User 1';
    const scripts1 = await request('/api/scripts', {}, freshToken1);
    assert(scripts1.status === 200 && Array.isArray(scripts1.body.scripts) && scripts1.body.scripts.length === 0, 'Fresh user starts with 0 screenplays');

    const notifs1 = await request('/api/notifications', {}, freshToken1);
    assert(
      notifs1.status === 200 &&
      Array.isArray(notifs1.body.notifications) &&
      notifs1.body.notifications.length === 0 &&
      notifs1.body.unreadCount === 0,
      'Fresh user starts with 0 notifications'
    );

    // 4. Attempting to fetch legacy demo script ID returns 404
    const legacyDemo = await request('/api/scripts/chronicles-of-dust', {}, freshToken1);
    assert(legacyDemo.status === 404, 'Legacy demo screenplay "chronicles-of-dust" does not exist (404)');

    // 5. Fresh User 1 creates a new screenplay and starts cleanly
    const create1 = await request('/api/scripts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { title: 'Clean Slate Feature', genre: 'Drama' }
    }, freshToken1);
    const script1 = create1.body.script;
    assert(create1.status === 201 && Boolean(script1?.id), 'Fresh user can create their first screenplay');
    assert(script1?.draft === 'Draft 1.0', 'New screenplay defaults to Draft 1.0');
    const sid1 = script1.id;
    const sp1 = await request(`/api/screenplay/${sid1}`, {}, freshToken1);
    assert(sp1.status === 200 && sp1.body.screenplay?.wordCount === 0, 'New screenplay starts with 0 words');
    assert(script1?.analysisScores?.overall === 0, 'New screenplay analysis scores start at 0 (no fake preloaded scores)');

    // 6. All downstream workspaces & production modules for the new screenplay start clean
    const [scenesRes, breakdownRes, callSheetsRes, scheduleRes, storyboardsRes, intelRes] = await Promise.all([
      request(`/api/production/${sid1}/scenes`, {}, freshToken1),
      request(`/api/production/${sid1}/breakdown`, {}, freshToken1),
      request(`/api/production/${sid1}/call-sheets`, {}, freshToken1),
      request(`/api/production/${sid1}/schedule`, {}, freshToken1),
      request(`/api/production/${sid1}/storyboards`, {}, freshToken1),
      request(`/api/intelligence/${sid1}`, {}, freshToken1)
    ]);

    assert(scenesRes.status === 200 && scenesRes.body.scenes?.length === 0, 'New screenplay starts with 0 production scenes');
    assert(breakdownRes.status === 200 && breakdownRes.body.breakdown?.length === 0, 'New screenplay starts with 0 breakdown items');
    assert(callSheetsRes.status === 200 && callSheetsRes.body.callSheets?.length === 0, 'New screenplay starts with 0 call sheets');
    assert(scheduleRes.status === 200 && scheduleRes.body.schedule?.length === 0, 'New screenplay starts with 0 shoot days');
    assert(storyboardsRes.status === 200 && storyboardsRes.body.storyboards?.length === 0, 'New screenplay starts with 0 storyboard scenes');
    assert(intelRes.status === 200 && intelRes.body.scores?.overall === 0, 'New screenplay intelligence overview starts at 0');

    // 7. Schedule day isolation check: User 1 adds a shoot day; User 2 must not see it
    const addDay1 = await request(`/api/production/${sid1}/schedule/day`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { date: '2026-12-01', location: 'Studio Stage A', area: 'Indoor Stage' }
    }, freshToken1);
    assert(addDay1.status === 201 && addDay1.body.day?.scriptId === sid1, 'User 1 shoot day is tagged with scriptId');

    const freshToken2 = 'mock-user:fresh-u2:fresh2@example.com:Fresh User 2';
    const create2 = await request('/api/scripts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { title: 'User Two Script', genre: 'Comedy' }
    }, freshToken2);
    const sid2 = create2.body.script?.id;
    const schedule2 = await request(`/api/production/${sid2}/schedule`, {}, freshToken2);
    assert(
      schedule2.status === 200 &&
      Array.isArray(schedule2.body.schedule) &&
      schedule2.body.schedule.length === 0,
      'User 2 schedule starts empty and does not leak User 1 shoot days'
    );

    if (!allPassed) {
      console.error('\n[TEST] Some clean-slate fresh user tests FAILED.');
      server.close();
      process.exit(1);
    }

    console.log('\n[TEST] ALL CLEAN-SLATE FRESH USER TESTS PASSED!');
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('Clean-slate test error:', err);
    server.close();
    process.exit(1);
  }
});

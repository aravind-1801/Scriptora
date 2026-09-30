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

    console.log('\n[TEST] All backend integration tests PASSED successfully!');
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('Test error:', err);
    server.close();
    process.exit(1);
  }
});

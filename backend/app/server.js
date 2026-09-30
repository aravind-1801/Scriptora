import http from 'http';
import { handleCors } from './middleware/cors.js';
import { db } from './models/db.js';
import * as authService from './auth/authService.js';
import * as scriptService from './services/scriptService.js';
import * as screenplayService from './services/screenplayService.js';
import * as collaborationService from './services/collaborationService.js';
import * as intelligenceService from './services/intelligenceService.js';

const PORT = process.env.PORT || 8000;

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

export const server = http.createServer(async (req, res) => {
  // 1. CORS
  if (handleCors(req, res)) return;

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname.replace(/^\/api/, '');
  const method = req.method;

  try {
    // Health Check
    if (pathname === '/health' || pathname === '' && method === 'GET') {
      return sendJson(res, 200, {
        status: "ok",
        service: "SCRIPTORA Narrative Engine API",
        version: "1.0.4",
        uptime: process.uptime()
      });
    }

    // 1. AUTH
    if (pathname === '/auth/me' && method === 'GET') {
      return sendJson(res, 200, { user: authService.getCurrentUser() });
    }
    if (pathname === '/auth/login' && method === 'POST') {
      const body = await readBody(req);
      return sendJson(res, 200, { user: authService.login(body) });
    }
    if (pathname === '/auth/register' && method === 'POST') {
      const body = await readBody(req);
      return sendJson(res, 201, { user: authService.register(body) });
    }
    if (pathname === '/auth/otp' && method === 'POST') {
      const body = await readBody(req);
      return sendJson(res, 200, { user: authService.verifyOtp(body.phone) });
    }
    if (pathname === '/auth/logout' && method === 'POST') {
      return sendJson(res, 200, authService.signOut());
    }

    // 2. SCRIPTS
    if (pathname === '/scripts' && method === 'GET') {
      return sendJson(res, 200, { scripts: scriptService.getScripts() });
    }
    if (pathname === '/scripts' && method === 'POST') {
      const body = await readBody(req);
      const newScript = scriptService.createScript(body);
      return sendJson(res, 201, { script: newScript });
    }

    const scriptMatch = pathname.match(/^\/scripts\/([a-zA-Z0-9_-]+)$/);
    if (scriptMatch) {
      const id = scriptMatch[1];
      if (method === 'GET') {
        const script = scriptService.getScript(id);
        if (!script) return sendJson(res, 404, { error: "Script not found" });
        return sendJson(res, 200, { script });
      }
      if (method === 'PUT') {
        const body = await readBody(req);
        const updated = scriptService.updateScript(id, body);
        return sendJson(res, 200, { script: updated });
      }
      if (method === 'DELETE') {
        scriptService.deleteScript(id);
        return sendJson(res, 200, { success: true });
      }
    }

    const dupMatch = pathname.match(/^\/scripts\/([a-zA-Z0-9_-]+)\/duplicate$/);
    if (dupMatch && method === 'POST') {
      const dup = scriptService.duplicateScript(dupMatch[1]);
      return sendJson(res, 201, { script: dup });
    }

    const archMatch = pathname.match(/^\/scripts\/([a-zA-Z0-9_-]+)\/archive$/);
    if (archMatch && method === 'PUT') {
      const arch = scriptService.archiveScript(archMatch[1]);
      return sendJson(res, 200, { script: arch });
    }

    const restMatch = pathname.match(/^\/scripts\/([a-zA-Z0-9_-]+)\/restore$/);
    if (restMatch && method === 'PUT') {
      const rest = scriptService.restoreScript(restMatch[1]);
      return sendJson(res, 200, { script: rest });
    }

    // 3. SCREENPLAY
    const screenplayMatch = pathname.match(/^\/screenplay\/([a-zA-Z0-9_-]+)$/);
    if (screenplayMatch) {
      const id = screenplayMatch[1];
      if (method === 'GET') {
        return sendJson(res, 200, { screenplay: screenplayService.getScreenplay(id) });
      }
      if (method === 'PUT') {
        const body = await readBody(req);
        const updated = screenplayService.saveScreenplay(id, body);
        return sendJson(res, 200, { success: true, screenplay: updated });
      }
    }

    // 4. VERSIONS
    const versionsMatch = pathname.match(/^\/versions\/([a-zA-Z0-9_-]+)$/);
    if (versionsMatch) {
      const id = versionsMatch[1];
      if (method === 'GET') {
        return sendJson(res, 200, { versions: db.versions[id] || [] });
      }
      if (method === 'POST') {
        const body = await readBody(req);
        if (!db.versions[id]) db.versions[id] = [];
        const newV = {
          id: `v-${Date.now()}`,
          name: body.name || `Draft ${db.versions[id].length + 1}.0`,
          tag: "Milestone Snapshot",
          timestamp: "Just now",
          author: db.currentUser?.initials || "AK",
          stats: `${body.pageCount || 96} pages · ${body.wordCount || 14200} words`,
          notes: body.notes || "Point-in-time snapshot.",
          isCurrent: true
        };
        db.versions[id].forEach(v => v.isCurrent = false);
        db.versions[id].unshift(newV);
        return sendJson(res, 201, { version: newV });
      }
    }

    // 5. COLLABORATORS
    if (pathname === '/collaborators' && method === 'GET') {
      return sendJson(res, 200, { collaborators: collaborationService.getCollaborators() });
    }

    const collabMatch = pathname.match(/^\/collaborators\/([a-zA-Z0-9_-]+)$/);
    if (collabMatch && method === 'GET') {
      return sendJson(res, 200, { collaborators: collaborationService.getCollaborators(collabMatch[1]) });
    }

    const inviteMatch = pathname.match(/^\/collaborators\/([a-zA-Z0-9_-]+)\/invite$/);
    if (inviteMatch && method === 'POST') {
      const body = await readBody(req);
      const newCollab = collaborationService.inviteCollaborator(inviteMatch[1], body);
      return sendJson(res, 201, { collaborator: newCollab });
    }

    const collabMemberMatch = pathname.match(/^\/collaborators\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)$/);
    if (collabMemberMatch) {
      const [, scriptId, memberId] = collabMemberMatch;
      if (method === 'DELETE') {
        collaborationService.removeCollaborator(scriptId, memberId);
        return sendJson(res, 200, { success: true });
      }
      if (method === 'PUT') {
        const body = await readBody(req);
        const updated = collaborationService.updateRole(scriptId, memberId, body.role);
        return sendJson(res, 200, { collaborator: updated });
      }
    }

    // 6. JOIN CODES
    const genCodeMatch = pathname.match(/^\/join-code\/generate\/([a-zA-Z0-9_-]+)$/);
    if (genCodeMatch && method === 'POST') {
      const code = collaborationService.generateJoinCode(genCodeMatch[1]);
      return sendJson(res, 200, { joinCode: code });
    }

    if (pathname === '/join-code/validate' && method === 'POST') {
      const body = await readBody(req);
      const resData = collaborationService.validateJoinCode(body.code);
      return sendJson(res, resData.valid ? 200 : 400, resData);
    }

    if (pathname === '/join-code/redeem' && method === 'POST') {
      const body = await readBody(req);
      const resData = collaborationService.redeemJoinCode(body.code);
      return sendJson(res, resData.success ? 200 : 400, resData);
    }

    // 7. NOTIFICATIONS
    if (pathname === '/notifications' && method === 'GET') {
      return sendJson(res, 200, {
        notifications: db.notifications,
        unreadCount: db.notifications.filter(n => !n.read).length
      });
    }

    if (pathname === '/notifications/unread-count' && method === 'GET') {
      return sendJson(res, 200, { count: db.notifications.filter(n => !n.read).length });
    }

    const notifReadMatch = pathname.match(/^\/notifications\/([a-zA-Z0-9_-]+)\/read$/);
    if (notifReadMatch && method === 'PUT') {
      const notif = db.notifications.find(n => n.id === notifReadMatch[1]);
      if (notif) notif.read = true;
      return sendJson(res, 200, { success: true, notif });
    }

    if (pathname === '/notifications/read-all' && method === 'PUT') {
      db.notifications.forEach(n => n.read = true);
      return sendJson(res, 200, { success: true });
    }

    // 8. PROFILE & SETTINGS
    if (pathname === '/profile' && method === 'GET') {
      return sendJson(res, 200, { profile: db.currentUser });
    }
    if (pathname === '/profile' && method === 'PUT') {
      const body = await readBody(req);
      Object.assign(db.currentUser, body);
      return sendJson(res, 200, { profile: db.currentUser });
    }
    if (pathname === '/settings' && method === 'GET') {
      return sendJson(res, 200, { settings: db.settings });
    }
    if (pathname === '/settings' && method === 'PUT') {
      const body = await readBody(req);
      Object.assign(db.settings, body);
      return sendJson(res, 200, { settings: db.settings });
    }

    // 9. INTELLIGENCE
    const intelMatch = pathname.match(/^\/intelligence\/([a-zA-Z0-9_-]+)$/);
    if (intelMatch && method === 'GET') {
      return sendJson(res, 200, intelligenceService.getIntelligence(intelMatch[1]));
    }

    const intelContextMatch = pathname.match(/^\/intelligence\/([a-zA-Z0-9_-]+)\/context$/);
    if (intelContextMatch && method === 'PUT') {
      const body = await readBody(req);
      const ctx = intelligenceService.updateContext(intelContextMatch[1], body);
      return sendJson(res, 200, { context: ctx });
    }

    if (pathname === '/intelligence/query' && method === 'POST') {
      const body = await readBody(req);
      const answer = intelligenceService.queryIntelligence(body.query, body.scriptId);
      return sendJson(res, 200, { answer });
    }

    // 404
    return sendJson(res, 404, { error: `Endpoint not found: ${method} ${pathname}` });
  } catch (err) {
    console.error("Backend error:", err);
    return sendJson(res, 500, { error: "Internal Server Error" });
  }
});

export function startServer(port = PORT) {
  return server.listen(port, () => {
    console.log(`[SCRIPTORA Backend] Server listening at http://localhost:${port}`);
  });
}

// Auto-start if executed directly
if (process.argv[1] && (process.argv[1].endsWith('server.js') || process.argv[1].endsWith('server'))) {
  startServer(PORT);
}

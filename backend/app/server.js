import http from 'http';
import fs from 'fs';
import path from 'path';

// Automatically load environment variables from local .env files
const envLocations = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), 'backend', '.env'),
  path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([a-zA-Z]:)/, '$1')), '../.env')
];
for (const envFile of envLocations) {
  if (fs.existsSync(envFile)) {
    try {
      const raw = fs.readFileSync(envFile, 'utf8');
      raw.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const idx = trimmed.indexOf('=');
          const k = trimmed.slice(0, idx).trim();
          const v = trimmed.slice(idx + 1).trim();
          if (k && !process.env[k]) {
            process.env[k] = v;
          }
        }
      });
    } catch {}
  }
}

import { handleCors } from './middleware/cors.js';
import { db } from './models/db.js';
import * as authService from './auth/authService.js';
import * as scriptService from './services/scriptService.js';
import * as screenplayService from './services/screenplayService.js';
import * as collaborationService from './services/collaborationService.js';
import * as intelligenceService from './services/intelligenceService.js';
import * as productionService from './services/productionService.js';
import * as storyboardService from './services/storyboardService.js';

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
    if ((pathname === '/auth/login' || pathname === '/auth/google') && method === 'POST') {
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
    if ((pathname === '/auth/delete-account' && method === 'POST') || (pathname === '/auth/account' && method === 'DELETE')) {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        return sendJson(res, 401, { error: 'Authentication required to delete account.' });
      }
      const body = await readBody(req);
      try {
        const result = authService.deleteAccount(body.confirmation || body.confirmPhrase);
        return sendJson(res, 200, result);
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
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

    const currentDraftMatch = pathname.match(/^\/scripts\/([a-zA-Z0-9_-]+)\/current-draft$/);
    if (currentDraftMatch && method === 'POST') {
      const script = scriptService.setCurrentDraft(currentDraftMatch[1]);
      if (!script) return sendJson(res, 404, { error: "Script not found" });
      return sendJson(res, 200, { script });
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
      if (method === 'PUT' || method === 'POST') {
        // Enforce backend permission: screenplay.edit
        if (!collaborationService.checkPermission(id, 'screenplay.edit', db.currentUser)) {
          return sendJson(res, 403, {
            error: 'Permission denied: Your assigned collaborator role does not permit modifying screenplay content.'
          });
        }
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

    // 5. COLLABORATORS & ROLE MANAGEMENT
    if (pathname === '/collaborators' && method === 'GET') {
      return sendJson(res, 200, { collaborators: collaborationService.getCollaborators() });
    }

    // Collaborator permissions for current user
    const collabPermMatch = pathname.match(/^\/collaborators\/([a-zA-Z0-9_-]+)\/permissions$/);
    if (collabPermMatch && method === 'GET') {
      const data = collaborationService.getUserPermissions(collabPermMatch[1], db.currentUser);
      return sendJson(res, 200, data);
    }

    // Security Activity Audit Log
    const collabSecLogMatch = pathname.match(/^\/collaborators\/([a-zA-Z0-9_-]+)\/security-activity$/);
    if (collabSecLogMatch && method === 'GET') {
      const activity = collaborationService.getSecurityActivity(collabSecLogMatch[1]);
      return sendJson(res, 200, { activity });
    }

    // Pending Invitations
    const collabInvitesMatch = pathname.match(/^\/collaborators\/([a-zA-Z0-9_-]+)\/invitations$/);
    if (collabInvitesMatch && method === 'GET') {
      const invitations = collaborationService.getInvitations(collabInvitesMatch[1]);
      return sendJson(res, 200, { invitations });
    }

    const revokeInviteMatch = pathname.match(/^\/collaborators\/([a-zA-Z0-9_-]+)\/invitations\/([a-zA-Z0-9_-]+)$/);
    if (revokeInviteMatch && method === 'DELETE') {
      const [, scriptId, inviteId] = revokeInviteMatch;
      try {
        collaborationService.revokeInvitation(scriptId, inviteId, db.currentUser);
        return sendJson(res, 200, { success: true });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    // Pending Join Requests
    const collabReqsMatch = pathname.match(/^\/collaborators\/([a-zA-Z0-9_-]+)\/requests$/);
    if (collabReqsMatch && method === 'GET') {
      const requests = collaborationService.getAccessRequests(collabReqsMatch[1]);
      return sendJson(res, 200, { requests });
    }

    const approveReqMatch = pathname.match(/^\/collaborators\/([a-zA-Z0-9_-]+)\/requests\/([a-zA-Z0-9_-]+)\/approve$/);
    if (approveReqMatch && method === 'POST') {
      const [, scriptId, requestId] = approveReqMatch;
      const body = await readBody(req);
      try {
        const result = collaborationService.approveAccessRequest(scriptId, requestId, body.role, db.currentUser);
        return sendJson(res, 200, result);
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    const rejectReqMatch = pathname.match(/^\/collaborators\/([a-zA-Z0-9_-]+)\/requests\/([a-zA-Z0-9_-]+)\/reject$/);
    if (rejectReqMatch && method === 'POST') {
      const [, scriptId, requestId] = rejectReqMatch;
      try {
        const result = collaborationService.rejectAccessRequest(scriptId, requestId, db.currentUser);
        return sendJson(res, 200, result);
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    // End-to-End Encryption (E2EE) settings & key rotation
    const e2eeMatch = pathname.match(/^\/collaborators\/([a-zA-Z0-9_-]+)\/e2ee$/);
    if (e2eeMatch && method === 'GET') {
      const settings = collaborationService.getE2EESettings(e2eeMatch[1], db.currentUser);
      return sendJson(res, 200, { e2ee: settings });
    }

    const e2eeEnableMatch = pathname.match(/^\/collaborators\/([a-zA-Z0-9_-]+)\/e2ee\/enable$/);
    if (e2eeEnableMatch && method === 'POST') {
      const body = await readBody(req);
      try {
        const result = collaborationService.enableE2EE(e2eeEnableMatch[1], body, db.currentUser);
        return sendJson(res, 200, { success: true, e2ee: result });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    const e2eeRotateMatch = pathname.match(/^\/collaborators\/([a-zA-Z0-9_-]+)\/e2ee\/rotate$/);
    if (e2eeRotateMatch && method === 'POST') {
      const body = await readBody(req);
      try {
        const result = collaborationService.rotateE2EEKey(e2eeRotateMatch[1], body, db.currentUser);
        return sendJson(res, 200, { success: true, e2ee: result });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    const e2eeDisableMatch = pathname.match(/^\/collaborators\/([a-zA-Z0-9_-]+)\/e2ee\/disable$/);
    if (e2eeDisableMatch && method === 'POST') {
      try {
        const result = collaborationService.disableE2EE(e2eeDisableMatch[1], db.currentUser);
        return sendJson(res, 200, { success: true, e2ee: result });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    const collabMatch = pathname.match(/^\/collaborators\/([a-zA-Z0-9_-]+)$/);
    if (collabMatch && method === 'GET') {
      return sendJson(res, 200, { collaborators: collaborationService.getCollaborators(collabMatch[1]) });
    }

    const inviteMatch = pathname.match(/^\/collaborators\/([a-zA-Z0-9_-]+)\/invite$/);
    if (inviteMatch && method === 'POST') {
      try {
        const body = await readBody(req);
        const newCollab = collaborationService.inviteCollaborator(inviteMatch[1], body, db.currentUser);
        return sendJson(res, 201, { collaborator: newCollab });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    const collabInvsMatch = pathname.match(/^\/collaborators\/([a-zA-Z0-9_-]+)\/invitations$/);
    if (collabInvsMatch && method === 'GET') {
      const invitations = collaborationService.getInvitations(collabInvsMatch[1]);
      return sendJson(res, 200, { invitations });
    }

    const collabInvResendMatch = pathname.match(/^\/collaborators\/([a-zA-Z0-9_-]+)\/invitations\/([a-zA-Z0-9_-]+)\/resend$/);
    if (collabInvResendMatch && method === 'POST') {
      const [, scriptId, inviteId] = collabInvResendMatch;
      try {
        const result = collaborationService.resendInvitation(scriptId, inviteId, db.currentUser);
        return sendJson(res, 200, { invitation: result });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    const collabInvRevokeMatch = pathname.match(/^\/collaborators\/([a-zA-Z0-9_-]+)\/invitations\/([a-zA-Z0-9_-]+)$/);
    if (collabInvRevokeMatch && method === 'DELETE') {
      const [, scriptId, inviteId] = collabInvRevokeMatch;
      try {
        const result = collaborationService.revokeInvitation(scriptId, inviteId, db.currentUser);
        return sendJson(res, 200, { success: result });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    const invAcceptMatch = pathname.match(/^\/collaborators\/invitations\/([a-zA-Z0-9_-]+)\/accept$/);
    if (invAcceptMatch && method === 'POST') {
      try {
        const result = collaborationService.acceptInvitation(invAcceptMatch[1], db.currentUser);
        return sendJson(res, 200, result);
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    const invTokenMatch = pathname.match(/^\/collaborators\/invitations\/([a-zA-Z0-9_-]+)$/);
    if (invTokenMatch && method === 'GET') {
      const inv = collaborationService.getInvitationByToken(invTokenMatch[1]);
      if (!inv) return sendJson(res, 404, { error: 'Invitation not found or revoked' });
      return sendJson(res, 200, { invitation: inv });
    }
    if (invTokenMatch && method === 'POST') {
      try {
        const result = collaborationService.acceptInvitation(invTokenMatch[1], db.currentUser);
        return sendJson(res, 200, result);
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    const collabMemberMatch = pathname.match(/^\/collaborators\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)$/);
    if (collabMemberMatch) {
      const [, scriptId, memberId] = collabMemberMatch;
      if (method === 'DELETE') {
        try {
          const result = collaborationService.removeCollaborator(scriptId, memberId, db.currentUser);
          return sendJson(res, 200, result);
        } catch (err) {
          return sendJson(res, 400, { error: err.message });
        }
      }
      if (method === 'PUT') {
        try {
          const body = await readBody(req);
          const updated = collaborationService.updateRole(scriptId, memberId, body.role, db.currentUser);
          return sendJson(res, 200, { collaborator: updated });
        } catch (err) {
          return sendJson(res, 400, { error: err.message });
        }
      }
    }

    // 6. JOIN CODES & ACCESS REQUESTS
    const genCodeMatch = pathname.match(/^\/join-code\/generate\/([a-zA-Z0-9_-]+)$/);
    if (genCodeMatch && method === 'POST') {
      try {
        const code = collaborationService.generateJoinCode(genCodeMatch[1], db.currentUser);
        return sendJson(res, 200, { joinCode: code });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    const revokeCodeMatch = pathname.match(/^\/join-code\/revoke\/([a-zA-Z0-9_-]+)$/);
    if (revokeCodeMatch && method === 'POST') {
      try {
        const result = collaborationService.revokeJoinCode(revokeCodeMatch[1], db.currentUser);
        return sendJson(res, 200, result);
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    const codeConfigMatch = pathname.match(/^\/join-code\/config\/([a-zA-Z0-9_-]+)$/);
    if (codeConfigMatch && method === 'GET') {
      const config = collaborationService.getJoinCodeConfig(codeConfigMatch[1]);
      return sendJson(res, 200, { config });
    }

    if (pathname === '/join-code/validate' && method === 'POST') {
      const body = await readBody(req);
      const resData = collaborationService.validateJoinCode(body.code);
      return sendJson(res, resData.valid ? 200 : 400, resData);
    }

    if (pathname === '/join-code/request-access' && method === 'POST') {
      const body = await readBody(req);
      try {
        const resData = collaborationService.requestJoinAccess(body.code, body, db.currentUser);
        return sendJson(res, 200, resData);
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    if (pathname === '/join-code/redeem' && method === 'POST') {
      const body = await readBody(req);
      const resData = collaborationService.redeemJoinCode(body.code, db.currentUser);
      return sendJson(res, resData.success ? 200 : 400, resData);
    }

    // Public key exchange for E2EE
    if (pathname === '/e2ee/public-key' && method === 'POST') {
      const body = await readBody(req);
      try {
        const result = collaborationService.registerUserPublicKey(db.currentUser, body);
        return sendJson(res, 200, result);
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    const userKeyMatch = pathname.match(/^\/e2ee\/public-key\/([a-zA-Z0-9@._+-]+)$/);
    if (userKeyMatch && method === 'GET') {
      const keyRecord = collaborationService.getUserPublicKey(decodeURIComponent(userKeyMatch[1]));
      return sendJson(res, 200, { keyRecord });
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

    // 10. PRE-PRODUCTION
    const prodWsMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)$/);
    if (prodWsMatch) {
      const scriptId = prodWsMatch[1];
      if (method === 'GET') {
        const ws = productionService.getProductionWorkspace(scriptId);
        return sendJson(res, 200, { workspace: ws });
      }
      if (method === 'PUT') {
        const body = await readBody(req);
        const ws = productionService.updateProductionWorkspace(scriptId, body);
        return sendJson(res, 200, { workspace: ws });
      }
    }

    const prodPinMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/pin$/);
    if (prodPinMatch && method === 'POST') {
      const body = await readBody(req);
      const ws = productionService.pinSourceVersion(prodPinMatch[1], body.version);
      return sendJson(res, 200, { workspace: ws });
    }

    const prodResMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/resources$/);
    if (prodResMatch) {
      const scriptId = prodResMatch[1];
      if (method === 'GET') {
        const category = url.searchParams.get('category');
        const resources = productionService.getProductionResources(scriptId, category);
        return sendJson(res, 200, { resources });
      }
      if (method === 'POST') {
        const body = await readBody(req);
        const resource = productionService.createProductionResource(scriptId, body);
        return sendJson(res, 201, { resource });
      }
    }

    const prodResDetailMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/resources\/([a-zA-Z0-9_-]+)$/);
    if (prodResDetailMatch) {
      const scriptId = prodResDetailMatch[1];
      const resId = prodResDetailMatch[2];
      if (method === 'PUT') {
        const body = await readBody(req);
        const resource = productionService.updateProductionResource(scriptId, resId, body);
        return sendJson(res, 200, { resource });
      }
      if (method === 'DELETE') {
        const result = productionService.deleteProductionResource(scriptId, resId);
        return sendJson(res, 200, result);
      }
    }

    const prodDocsMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/documents$/);
    if (prodDocsMatch) {
      const scriptId = prodDocsMatch[1];
      if (method === 'GET') {
        const documents = productionService.getProductionDocuments(scriptId);
        return sendJson(res, 200, { documents });
      }
      if (method === 'POST') {
        const body = await readBody(req);
        const document = productionService.createProductionDocument(scriptId, body);
        return sendJson(res, 201, { document });
      }
    }

    const prodDocsDetailMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/documents\/([a-zA-Z0-9_-]+)$/);
    if (prodDocsDetailMatch && method === 'DELETE') {
      const scriptId = prodDocsDetailMatch[1];
      const docId = prodDocsDetailMatch[2];
      const result = productionService.deleteProductionDocument(scriptId, docId);
      return sendJson(res, 200, result);
    }

    const prodPropsMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/proposals$/);
    if (prodPropsMatch) {
      const scriptId = prodPropsMatch[1];
      if (method === 'GET') {
        const proposals = productionService.getProductionProposals(scriptId);
        return sendJson(res, 200, { proposals });
      }
      if (method === 'POST') {
        const body = await readBody(req);
        const newProposal = productionService.createProductionProposal(scriptId, body);
        return sendJson(res, 201, { proposal: newProposal });
      }
    }

    const prodPropReviewMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/proposals\/([a-zA-Z0-9_-]+)\/review$/);
    if (prodPropReviewMatch && method === 'POST') {
      const scriptId = prodPropReviewMatch[1];
      const propId = prodPropReviewMatch[2];
      const body = await readBody(req);
      const updated = productionService.reviewProductionProposal(scriptId, propId, body.action, body.notes);
      return sendJson(res, 200, { proposal: updated });
    }

    const prodAuditMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/audit$/);
    if (prodAuditMatch && method === 'GET') {
      const auditTrail = productionService.getProductionAuditTrail(prodAuditMatch[1]);
      return sendJson(res, 200, { auditTrail });
    }

    // 11. SCENES & SCENE DETAILS
    const prodScenesMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/scenes$/);
    if (prodScenesMatch && method === 'GET') {
      const scenes = productionService.getProductionScenes(prodScenesMatch[1]);
      return sendJson(res, 200, { scenes });
    }

    const prodSceneDetailMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/scenes\/([a-zA-Z0-9_-]+)$/);
    if (prodSceneDetailMatch) {
      const scriptId = prodSceneDetailMatch[1];
      const sceneId = prodSceneDetailMatch[2];
      if (method === 'GET') {
        const scene = productionService.getProductionScene(scriptId, sceneId);
        if (!scene) return sendJson(res, 404, { error: "Scene not found" });
        return sendJson(res, 200, { scene });
      }
      if (method === 'PUT') {
        const body = await readBody(req);
        const scene = productionService.updateProductionScene(scriptId, sceneId, body);
        return sendJson(res, 200, { scene });
      }
    }

    // 12. SCRIPT BREAKDOWN
    const prodBreakdownMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/breakdown$/);
    if (prodBreakdownMatch) {
      const scriptId = prodBreakdownMatch[1];
      if (method === 'GET') {
        const category = url.searchParams.get('category');
        const scene = url.searchParams.get('scene');
        const breakdown = productionService.getProductionBreakdown(scriptId, category, scene);
        return sendJson(res, 200, { breakdown });
      }
      if (method === 'POST') {
        const body = await readBody(req);
        const item = productionService.createBreakdownItem(scriptId, body);
        return sendJson(res, 201, { item });
      }
    }

    const prodBreakdownItemMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/breakdown\/([a-zA-Z0-9_-]+)$/);
    if (prodBreakdownItemMatch && method === 'PUT') {
      const scriptId = prodBreakdownItemMatch[1];
      const itemId = prodBreakdownItemMatch[2];
      const body = await readBody(req);
      const item = productionService.updateBreakdownItem(scriptId, itemId, body);
      return sendJson(res, 200, { item });
    }
    if (prodBreakdownItemMatch && method === 'DELETE') {
      const scriptId = prodBreakdownItemMatch[1];
      const itemId = prodBreakdownItemMatch[2];
      const result = productionService.deleteBreakdownItem(scriptId, itemId);
      return sendJson(res, 200, result);
    }

    // 13. CALL SHEETS
    const prodCallSheetsMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/call-sheets$/);
    if (prodCallSheetsMatch) {
      const scriptId = prodCallSheetsMatch[1];
      if (method === 'GET') {
        const callSheets = productionService.getProductionCallSheets(scriptId);
        return sendJson(res, 200, { callSheets });
      }
      if (method === 'POST') {
        const body = await readBody(req);
        const callSheet = productionService.createProductionCallSheet(scriptId, body);
        return sendJson(res, 201, { callSheet });
      }
    }

    const prodCallSheetPublishMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/call-sheets\/([a-zA-Z0-9_-]+)\/publish$/);
    if (prodCallSheetPublishMatch && method === 'POST') {
      const scriptId = prodCallSheetPublishMatch[1];
      const csId = prodCallSheetPublishMatch[2];
      const callSheet = productionService.publishProductionCallSheet(scriptId, csId);
      return sendJson(res, 200, { callSheet });
    }

    const prodCallSheetDetailMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/call-sheets\/([a-zA-Z0-9_-]+)$/);
    if (prodCallSheetDetailMatch) {
      const scriptId = prodCallSheetDetailMatch[1];
      const csId = prodCallSheetDetailMatch[2];
      if (method === 'GET') {
        const callSheet = productionService.getProductionCallSheet(scriptId, csId);
        if (!callSheet) return sendJson(res, 404, { error: "Call sheet not found" });
        return sendJson(res, 200, { callSheet });
      }
      if (method === 'PUT') {
        const body = await readBody(req);
        const callSheet = productionService.updateProductionCallSheet(scriptId, csId, body);
        return sendJson(res, 200, { callSheet });
      }
      if (method === 'DELETE') {
        const result = productionService.deleteProductionCallSheet(scriptId, csId);
        return sendJson(res, 200, result);
      }
    }

    // 14. SHOOTING SCHEDULE
    const prodScheduleMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/schedule$/);
    if (prodScheduleMatch && method === 'GET') {
      const schedule = productionService.getProductionSchedule(prodScheduleMatch[1]);
      return sendJson(res, 200, { schedule });
    }

    const prodScheduleConfirmMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/schedule\/confirm$/);
    if (prodScheduleConfirmMatch && method === 'POST') {
      const schedule = productionService.confirmProductionSchedule(prodScheduleConfirmMatch[1]);
      return sendJson(res, 200, { schedule });
    }

    const prodScheduleDayPostMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/schedule\/day$/);
    if (prodScheduleDayPostMatch && method === 'POST') {
      const scriptId = prodScheduleDayPostMatch[1];
      const body = await readBody(req);
      const day = productionService.addProductionScheduleDay(scriptId, body);
      return sendJson(res, 201, { day });
    }

    const prodScheduleDayMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/schedule\/day\/([0-9]+)$/);
    if (prodScheduleDayMatch) {
      const scriptId = prodScheduleDayMatch[1];
      const dayNum = prodScheduleDayMatch[2];
      if (method === 'PUT') {
        const body = await readBody(req);
        const day = productionService.updateProductionScheduleDay(scriptId, dayNum, body);
        return sendJson(res, 200, { day });
      }
      if (method === 'DELETE') {
        const result = productionService.deleteProductionScheduleDay(scriptId, dayNum);
        return sendJson(res, 200, result);
      }
    }

    // 15. READINESS CHECKS
    const prodReadinessMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/readiness$/);
    if (prodReadinessMatch && method === 'GET') {
      const readiness = productionService.getProductionReadiness(prodReadinessMatch[1]);
      return sendJson(res, 200, { readiness });
    }

    const prodReadinessResolveMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/readiness\/([a-zA-Z0-9_-]+)\/resolve$/);
    if (prodReadinessResolveMatch && method === 'POST') {
      const item = productionService.resolveProductionReadiness(prodReadinessResolveMatch[1], prodReadinessResolveMatch[2]);
      return sendJson(res, 200, { readinessItem: item });
    }

    // 16. RESTORE SNAPSHOT
    const prodRestoreMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/restore$/);
    if (prodRestoreMatch && method === 'POST') {
      const body = await readBody(req);
      const ws = productionService.restoreProductionSnapshot(prodRestoreMatch[1], body.version);
      return sendJson(res, 200, { workspace: ws });
    }

    // 17. STORYBOARD STUDIO ENDPOINTS
    if (pathname === '/production/ai/providers' && method === 'GET') {
      const providers = storyboardService.getAiProviders();
      return sendJson(res, 200, { providers });
    }

    if (pathname === '/production/storyboard/preferences') {
      if (method === 'GET') {
        const preferences = storyboardService.getStoryboardPreferences();
        return sendJson(res, 200, { preferences });
      }
      if (method === 'PUT') {
        const body = await readBody(req);
        const preferences = storyboardService.saveStoryboardPreferences(body);
        return sendJson(res, 200, { preferences });
      }
    }

    const prodSbRbMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/storyboard\/recycle-bin$/);
    if (prodSbRbMatch && method === 'GET') {
      const scriptId = prodSbRbMatch[1];
      const items = storyboardService.getRecycleBin(scriptId);
      return sendJson(res, 200, { items });
    }

    const prodSbRbRestoreMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/storyboard\/recycle-bin\/restore$/);
    if (prodSbRbRestoreMatch && method === 'POST') {
      const scriptId = prodSbRbRestoreMatch[1];
      const body = await readBody(req);
      const result = storyboardService.restoreRecycleBinItem(scriptId, body.itemId);
      return sendJson(res, 200, result);
    }

    const prodSbRbEmptyMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/storyboard\/recycle-bin\/empty$/);
    if (prodSbRbEmptyMatch && method === 'POST') {
      const scriptId = prodSbRbEmptyMatch[1];
      const result = storyboardService.emptyRecycleBin(scriptId);
      return sendJson(res, 200, result);
    }

    const prodSbRbItemMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/storyboard\/recycle-bin\/([a-zA-Z0-9_-]+)$/);
    if (prodSbRbItemMatch && method === 'DELETE') {
      const scriptId = prodSbRbItemMatch[1];
      const itemId = prodSbRbItemMatch[2];
      const result = storyboardService.permanentlyDeleteRecycleBinItem(scriptId, itemId);
      return sendJson(res, 200, result);
    }

    const prodSbSceneDeleteMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/storyboard\/scenes\/([a-zA-Z0-9_-]+)\/soft-delete$/);
    if (prodSbSceneDeleteMatch && method === 'POST') {
      const scriptId = prodSbSceneDeleteMatch[1];
      const sceneId = prodSbSceneDeleteMatch[2];
      const result = storyboardService.softDeleteScene(scriptId, sceneId);
      return sendJson(res, 200, result);
    }

    const prodSbListMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/storyboards$/);
    if (prodSbListMatch && method === 'GET') {
      const storyboards = storyboardService.getStoryboards(prodSbListMatch[1]);
      return sendJson(res, 200, { storyboards });
    }

    const prodSbMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/storyboard$/);
    if (prodSbMatch) {
      const scriptId = prodSbMatch[1];
      if (method === 'GET') {
        const sceneId = url.searchParams.get('sceneId') || 'scene-1';
        const storyboard = storyboardService.getStoryboardByScene(scriptId, sceneId);
        return sendJson(res, 200, { storyboard });
      }
      if (method === 'POST') {
        const body = await readBody(req);
        const storyboard = storyboardService.saveStoryboard(scriptId, body);
        return sendJson(res, 200, { storyboard });
      }
    }

    const prodSbShotsMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/storyboard\/([a-zA-Z0-9_-]+)\/shots$/);
    if (prodSbShotsMatch && method === 'POST') {
      const scriptId = prodSbShotsMatch[1];
      const sceneId = prodSbShotsMatch[2];
      const body = await readBody(req);
      const result = storyboardService.addShot(scriptId, sceneId, body);
      return sendJson(res, 201, result);
    }

    const prodSbShotDetailMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/storyboard\/([a-zA-Z0-9_-]+)\/shots\/([a-zA-Z0-9_-]+)$/);
    if (prodSbShotDetailMatch) {
      const scriptId = prodSbShotDetailMatch[1];
      const sceneId = prodSbShotDetailMatch[2];
      const shotId = prodSbShotDetailMatch[3];
      if (method === 'PUT') {
        const body = await readBody(req);
        const result = storyboardService.updateShot(scriptId, sceneId, shotId, body);
        return sendJson(res, 200, result);
      }
      if (method === 'DELETE') {
        const result = storyboardService.deleteShot(scriptId, sceneId, shotId);
        return sendJson(res, 200, result);
      }
    }

    const prodSbRestoreMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/storyboard\/([a-zA-Z0-9_-]+)\/shots\/([a-zA-Z0-9_-]+)\/restore$/);
    if (prodSbRestoreMatch && method === 'POST') {
      const scriptId = prodSbRestoreMatch[1];
      const sceneId = prodSbRestoreMatch[2];
      const shotId = prodSbRestoreMatch[3];
      const body = await readBody(req);
      const result = storyboardService.restoreShotVersion(scriptId, sceneId, shotId, body.historyIndex);
      return sendJson(res, 200, result);
    }

    const prodSbReorderMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/storyboard\/([a-zA-Z0-9_-]+)\/reorder$/);
    if (prodSbReorderMatch && method === 'POST') {
      const scriptId = prodSbReorderMatch[1];
      const sceneId = prodSbReorderMatch[2];
      const body = await readBody(req);
      const result = storyboardService.reorderShots(scriptId, sceneId, body.shotIds);
      return sendJson(res, 200, result);
    }

    const prodSbApproveMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/storyboard\/([a-zA-Z0-9_-]+)\/shots\/([a-zA-Z0-9_-]+)\/approve$/);
    if (prodSbApproveMatch && method === 'POST') {
      const scriptId = prodSbApproveMatch[1];
      const sceneId = prodSbApproveMatch[2];
      const shotId = prodSbApproveMatch[3];
      const body = await readBody(req);
      const result = storyboardService.approveShot(scriptId, sceneId, shotId, body.status, body.notes);
      return sendJson(res, 200, result);
    }

    const prodSbBatchApproveMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/storyboard\/([a-zA-Z0-9_-]+)\/batch-approve$/);
    if (prodSbBatchApproveMatch && method === 'POST') {
      const scriptId = prodSbBatchApproveMatch[1];
      const sceneId = prodSbBatchApproveMatch[2];
      const body = await readBody(req);
      const result = storyboardService.batchApproveShots(scriptId, sceneId, body.shotIds, body.status, body.notes);
      return sendJson(res, 200, result);
    }

    // Storyboard Asynchronous Generation Jobs API
    const prodSbJobCreateMatch = pathname.match(/^\/(?:api\/v1|production\/([a-zA-Z0-9_-]+))\/storyboard\/jobs\/generate$/);
    if (prodSbJobCreateMatch && method === 'POST') {
      const scriptId = prodSbJobCreateMatch[1] || 'chronicles-of-dust';
      const body = await readBody(req);
      try {
        const job = storyboardService.createGenerationJob(scriptId, body);
        return sendJson(res, 202, job);
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    const prodSbJobStatusMatch = pathname.match(/^\/(?:api\/v1|production\/[a-zA-Z0-9_-]+)\/storyboard\/jobs\/([a-zA-Z0-9_.-]+)$/);
    if (prodSbJobStatusMatch && method === 'GET') {
      const jobId = prodSbJobStatusMatch[1];
      const job = storyboardService.getGenerationJob(jobId);
      if (!job) {
        return sendJson(res, 404, { error: "Job not found" });
      }
      return sendJson(res, 200, job);
    }

    const prodSbGenShotMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/storyboard\/generate-shot$/);
    if (prodSbGenShotMatch && method === 'POST') {
      const scriptId = prodSbGenShotMatch[1];
      const body = await readBody(req);
      try {
        const result = await storyboardService.generateShotImage(body);
        return sendJson(res, 200, result);
      } catch (err) {
        return sendJson(res, 400, { error: err.message, provider: body.provider });
      }
    }

    const prodSbGenSeqMatch = pathname.match(/^\/production\/([a-zA-Z0-9_-]+)\/storyboard\/generate-sequence$/);
    if (prodSbGenSeqMatch && method === 'POST') {
      const scriptId = prodSbGenSeqMatch[1];
      const body = await readBody(req);
      try {
        const result = await storyboardService.generateSceneSequence(scriptId, body.sceneId, body);
        return sendJson(res, 200, result);
      } catch (err) {
        return sendJson(res, 400, { error: err.message, provider: body.provider });
      }
    }

    // Persistent Storyboard Images Serving
    const prodSbImgMatch = pathname.match(/^\/(?:production\/storyboard\/images|(?:api\/)?v1\/storage\/storyboard)\/([a-zA-Z0-9_.-]+)$/);
    if (prodSbImgMatch && method === 'GET') {
      const filename = prodSbImgMatch[1];
      const baseDir = process.cwd().endsWith('backend') ? path.resolve(process.cwd(), '..') : process.cwd();
      const candidates = [
        path.resolve(baseDir, 'backend', 'data', 'storage', 'storyboard', filename),
        path.resolve(baseDir, 'frontend', 'public', 'assets', 'storyboard', 'generated', filename),
        path.resolve(baseDir, 'assets', 'storyboard', 'generated', filename)
      ];
      const found = candidates.find(c => fs.existsSync(c) && fs.statSync(c).isFile());
      if (found) {
        const ext = path.extname(found).toLowerCase();
        const mimeTypes = {
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.webp': 'image/webp'
        };
        res.statusCode = 200;
        res.setHeader('Content-Type', mimeTypes[ext] || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        fs.createReadStream(found).pipe(res);
        return;
      }
      return sendJson(res, 404, { error: `Image not found: ${filename}` });
    }

    // Static assets serving
    const cleanAssetPath = pathname.replace(/^\/?(Scriptora\/)?assets\//, '');
    if (pathname.includes('/assets/')) {
      const candidates = [
        path.resolve('frontend/public/assets', cleanAssetPath),
        path.resolve('assets', cleanAssetPath),
        path.resolve('frontend/dist/assets', cleanAssetPath)
      ];
      const found = candidates.find(c => fs.existsSync(c) && fs.statSync(c).isFile());
      if (found) {
        const ext = path.extname(found).toLowerCase();
        const mimeTypes = {
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.svg': 'image/svg+xml',
          '.webp': 'image/webp',
          '.gif': 'image/gif',
          '.css': 'text/css',
          '.js': 'application/javascript'
        };
        res.statusCode = 200;
        res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        fs.createReadStream(found).pipe(res);
        return;
      }
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

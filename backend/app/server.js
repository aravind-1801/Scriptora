import http from 'http';
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

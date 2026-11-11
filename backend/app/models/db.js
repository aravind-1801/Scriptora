/**
 * SCRIPTORA Multi-User Data Store
 *
 * Clean, zero-seed state container backed by durable cloud persistence
 * (PostgreSQL or private Supabase Storage shards via cloudStore.js).
 */

import {
  saveShard,
  deleteShard,
  loadAllShards,
  flushCloudWrites,
  getPersistenceMode,
  hashIdentifier
} from '../db/cloudStore.js';

export function createDefaultSettings() {
  return {
    autosave: true,
    darkMode: true,
    spellcheck: true,
    pageNumbers: true,
    scriptFont: "Courier Prime",
    revisionColor: "blue",
    collaborationNotifications: true,
    emailAlerts: true,
    aiTone: "cinematic",
    privacyMode: "strict",
    twoFactorEnabled: false,
    sessionTimeout: "7 days",
    storyboard: {
      defaultStyle: "Concept Art",
      defaultAspectRatio: "2.39:1",
      defaultVisualStyle: "Cinematic Concept Art",
      defaultShotSize: "Medium Shot",
      defaultCameraAngle: "Eye Level",
      defaultLens: "50mm Prime",
      defaultFocalLength: "50mm Prime",
      defaultLighting: "Auto / Scene-based",
      experienceLevel: "Intermediate",
      defaultProvider: "scriptora-concept",
      autoGenerateOnShotAdd: true,
      enablePromptEnhancement: true,
      enforceVisualConsistency: true
    }
  };
}

function buildEmptyDbState() {
  return {
    currentUser: null,
    users: [],
    userSettings: {},
    settings: createDefaultSettings(),
    scripts: [],
    screenplays: {},
    versions: {},
    collaborators: {},
    joinCodes: {},
    accessRequests: {},
    invitations: {},
    securityActivity: {},
    e2ee: {},
    userKeys: {},
    notifications: [],
    notificationsByUser: {},
    projects: [],
    productionWorkspaces: [],
    productionResources: [],
    productionDocuments: [],
    productionProposals: [],
    productionAudit: [],
    productionScenes: [],
    productionBreakdown: [],
    productionCallSheets: [],
    productionSchedule: [],
    productionReadiness: [],
    storyboards: [],
    storyboardRecycleBin: []
  };
}

export const db = buildEmptyDbState();

let hydrationPromise = null;
let hydrated = false;

export function resetInMemoryDb() {
  const empty = buildEmptyDbState();
  for (const key of Object.keys(empty)) {
    db[key] = empty[key];
  }
  hydrated = false;
  hydrationPromise = null;
}

export function getUserSettings(user) {
  if (!user || !user.id) return createDefaultSettings();
  if (!db.userSettings) db.userSettings = {};
  if (!db.userSettings[user.id]) {
    const existingUser = db.users.find(u => u.id === user.id);
    db.userSettings[user.id] = existingUser?.settings
      ? {
          ...createDefaultSettings(),
          ...existingUser.settings,
          storyboard: {
            ...createDefaultSettings().storyboard,
            ...(existingUser.settings.storyboard || {})
          }
        }
      : createDefaultSettings();
  }
  return db.userSettings[user.id];
}

export function updateUserSettings(user, updates = {}) {
  if (!user || !user.id) return createDefaultSettings();
  const current = getUserSettings(user);
  const next = {
    ...current,
    ...updates,
    storyboard: updates.storyboard
      ? { ...current.storyboard, ...updates.storyboard }
      : current.storyboard
  };
  db.userSettings[user.id] = next;
  const userRecord = db.users.find(u => u.id === user.id);
  if (userRecord) {
    userRecord.settings = next;
    userRecord.updatedAt = new Date().toISOString();
    persistUserState(userRecord);
  }
  return next;
}

export function getNotificationsForUser(user) {
  if (!user || !user.id) return [];
  if (!db.notificationsByUser) db.notificationsByUser = {};
  if (!db.notificationsByUser[user.id]) {
    db.notificationsByUser[user.id] = [];
  }
  return db.notificationsByUser[user.id];
}

export function addNotificationForUser(userId, notification) {
  if (!userId || !notification) return null;
  if (!db.notificationsByUser) db.notificationsByUser = {};
  if (!db.notificationsByUser[userId]) {
    db.notificationsByUser[userId] = [];
  }
  const entry = {
    id: notification.id || `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    userId,
    read: false,
    timestamp: 'Just now',
    createdAt: new Date().toISOString(),
    ...notification
  };
  db.notificationsByUser[userId].unshift(entry);
  persistNotificationsState(userId);
  return entry;
}

export function resolveUserIdByEmail(email) {
  if (!email) return null;
  const clean = String(email).trim().toLowerCase();
  const found = db.users.find(u => (u.email || '').toLowerCase() === clean);
  return found?.id || null;
}

export function persistUserState(userOrId) {
  const user = typeof userOrId === 'string'
    ? db.users.find(u => u.id === userOrId)
    : userOrId;
  if (!user || !user.id) return Promise.resolve(false);
  const payload = {
    ...user,
    settings: db.userSettings[user.id] || user.settings || createDefaultSettings()
  };
  return saveShard('users', user.id, payload, user.id).catch(err => {
    console.warn('[DB] Failed persisting user:', err.message);
    return false;
  });
}

export function persistScriptState(scriptId) {
  if (!scriptId) return Promise.resolve(false);
  const script = db.scripts.find(s => s.id === scriptId);
  if (!script) return Promise.resolve(false);

  const payload = {
    script,
    screenplay: db.screenplays[scriptId] || null,
    versions: db.versions[scriptId] || [],
    collaborators: db.collaborators[scriptId] || [],
    joinCode: db.joinCodes[scriptId] || null,
    accessRequests: db.accessRequests[scriptId] || [],
    invitations: db.invitations[scriptId] || [],
    securityActivity: db.securityActivity[scriptId] || [],
    e2ee: db.e2ee[scriptId] || null,
    production: {
      workspace: db.productionWorkspaces.find(w => w.scriptId === scriptId) || null,
      resources: db.productionResources.filter(r => r.scriptId === scriptId),
      documents: db.productionDocuments.filter(d => d.scriptId === scriptId),
      proposals: db.productionProposals.filter(p => p.scriptId === scriptId),
      audit: db.productionAudit.filter(a => a.scriptId === scriptId),
      scenes: db.productionScenes.filter(s => s.scriptId === scriptId),
      breakdown: db.productionBreakdown.find(b => b.scriptId === scriptId) || null,
      callSheets: db.productionCallSheets.filter(c => c.scriptId === scriptId),
      schedule: db.productionSchedule.filter(s => s.scriptId === scriptId),
      readiness: db.productionReadiness.find(r => r.scriptId === scriptId) || null
    },
    updatedAt: new Date().toISOString()
  };

  return saveShard('scripts', scriptId, payload, script.ownerId || null).catch(err => {
    console.warn(`[DB] Failed persisting script ${scriptId}:`, err.message);
    return false;
  });
}

export function deleteScriptCloudState(scriptId) {
  if (!scriptId) return Promise.resolve(false);
  return Promise.all([
    deleteShard('scripts', scriptId),
    deleteShard('storyboards', scriptId)
  ]).catch(err => {
    console.warn(`[DB] Failed deleting script cloud state ${scriptId}:`, err.message);
    return false;
  });
}

export function persistStoryboardState(scriptId) {
  if (!scriptId) return Promise.resolve(false);
  const payload = {
    scriptId,
    storyboards: db.storyboards.filter(sb => sb.scriptId === scriptId),
    recycleBin: (db.storyboardRecycleBin || []).filter(item => item.scriptId === scriptId),
    updatedAt: new Date().toISOString()
  };
  const script = db.scripts.find(s => s.id === scriptId);
  return saveShard('storyboards', scriptId, payload, script?.ownerId || null).catch(err => {
    console.warn(`[DB] Failed persisting storyboard ${scriptId}:`, err.message);
    return false;
  });
}

export function persistNotificationsState(userId) {
  if (!userId) return Promise.resolve(false);
  const payload = {
    userId,
    notifications: (db.notificationsByUser[userId] || []).slice(0, 100),
    updatedAt: new Date().toISOString()
  };
  return saveShard('notifications', userId, payload, userId).catch(err => {
    console.warn(`[DB] Failed persisting notifications for ${userId}:`, err.message);
    return false;
  });
}

export function persistUserKeyState(email, keyRecord) {
  if (!email || !keyRecord) return Promise.resolve(false);
  const keyId = hashIdentifier(email);
  return saveShard('userkeys', keyId, keyRecord, keyRecord.userId || null).catch(err => {
    console.warn('[DB] Failed persisting user public key:', err.message);
    return false;
  });
}

export function hydrateScriptPayload(payload) {
  if (!payload || !payload.script || !payload.script.id) return;
  const scriptId = payload.script.id;

  const sIdx = db.scripts.findIndex(s => s.id === scriptId);
  if (sIdx !== -1) db.scripts[sIdx] = payload.script;
  else db.scripts.push(payload.script);

  if (payload.screenplay) db.screenplays[scriptId] = payload.screenplay;
  if (Array.isArray(payload.versions)) db.versions[scriptId] = payload.versions;
  if (Array.isArray(payload.collaborators)) db.collaborators[scriptId] = payload.collaborators;
  if (payload.joinCode) db.joinCodes[scriptId] = payload.joinCode;
  if (Array.isArray(payload.accessRequests)) db.accessRequests[scriptId] = payload.accessRequests;
  if (Array.isArray(payload.invitations)) db.invitations[scriptId] = payload.invitations;
  if (Array.isArray(payload.securityActivity)) db.securityActivity[scriptId] = payload.securityActivity;
  if (payload.e2ee) db.e2ee[scriptId] = payload.e2ee;

  const prod = payload.production || {};
  db.productionWorkspaces = db.productionWorkspaces.filter(w => w.scriptId !== scriptId);
  if (prod.workspace) db.productionWorkspaces.push(prod.workspace);

  db.productionResources = db.productionResources.filter(r => r.scriptId !== scriptId).concat(prod.resources || []);
  db.productionDocuments = db.productionDocuments.filter(d => d.scriptId !== scriptId).concat(prod.documents || []);
  db.productionProposals = db.productionProposals.filter(p => p.scriptId !== scriptId).concat(prod.proposals || []);
  db.productionAudit = db.productionAudit.filter(a => a.scriptId !== scriptId).concat(prod.audit || []);
  db.productionScenes = db.productionScenes.filter(s => s.scriptId !== scriptId).concat(prod.scenes || []);

  db.productionBreakdown = db.productionBreakdown.filter(b => b.scriptId !== scriptId);
  if (prod.breakdown) db.productionBreakdown.push(prod.breakdown);

  db.productionCallSheets = db.productionCallSheets.filter(c => c.scriptId !== scriptId).concat(prod.callSheets || []);
  db.productionSchedule = db.productionSchedule.filter(s => s.scriptId !== scriptId).concat(prod.schedule || []);

  db.productionReadiness = db.productionReadiness.filter(r => r.scriptId !== scriptId);
  if (prod.readiness) db.productionReadiness.push(prod.readiness);
}

export async function hydrateCloudDb({ force = false } = {}) {
  if (hydrated && !force) return db;
  if (hydrationPromise && !force) return hydrationPromise;

  hydrationPromise = (async () => {
    const mode = getPersistenceMode();
    if (mode === 'memory') {
      hydrated = true;
      return db;
    }

    if (force) {
      resetInMemoryDb();
    }

    try {
      const shards = await loadAllShards();

      for (const item of shards.users || []) {
        const u = item.data;
        if (!u || !u.id) continue;
        const idx = db.users.findIndex(x => x.id === u.id);
        if (idx !== -1) db.users[idx] = u;
        else db.users.push(u);
        if (u.settings) {
          db.userSettings[u.id] = {
            ...createDefaultSettings(),
            ...u.settings,
            storyboard: {
              ...createDefaultSettings().storyboard,
              ...(u.settings.storyboard || {})
            }
          };
        }
      }

      for (const item of shards.scripts || []) {
        hydrateScriptPayload(item.data);
      }

      for (const item of shards.storyboards || []) {
        const sbPayload = item.data;
        if (!sbPayload || !sbPayload.scriptId) continue;
        db.storyboards = db.storyboards.filter(sb => sb.scriptId !== sbPayload.scriptId).concat(sbPayload.storyboards || []);
        db.storyboardRecycleBin = (db.storyboardRecycleBin || [])
          .filter(r => r.scriptId !== sbPayload.scriptId)
          .concat(sbPayload.recycleBin || []);
      }

      for (const item of shards.notifications || []) {
        const np = item.data;
        if (np && np.userId) {
          db.notificationsByUser[np.userId] = Array.isArray(np.notifications) ? np.notifications : [];
        }
      }

      for (const item of shards.userkeys || []) {
        const uk = item.data;
        if (uk && uk.email) {
          db.userKeys[uk.email.toLowerCase()] = uk;
        }
      }

      hydrated = true;
      console.log(`[CloudStore:${mode}] Hydrated ${db.users.length} users, ${db.scripts.length} scripts, ${db.storyboards.length} storyboards.`);
    } catch (err) {
      console.error('[CloudStore] Hydration warning:', err.message);
      hydrated = true;
    }

    return db;
  })();

  return hydrationPromise;
}

export async function ensureDbReady() {
  if (!hydrated) {
    await hydrateCloudDb();
  }
}

export { flushCloudWrites, getPersistenceMode, deleteShard };

import crypto from 'crypto';
import {
  db,
  persistScriptState,
  deleteScriptCloudState
} from '../models/db.js';

export function getScripts() {
  return db.scripts;
}

export function getScriptsForUser(user) {
  if (!user || !user.id) return [];
  const uid = String(user.id);
  const fbUid = user.firebaseUid ? String(user.firebaseUid) : null;
  const email = (user.email || '').toLowerCase().trim();

  return db.scripts.filter(s => {
    if (s.ownerId && (String(s.ownerId) === uid || (fbUid && String(s.ownerId) === fbUid))) return true;
    if (email && s.ownerEmail && s.ownerEmail.toLowerCase().trim() === email) return true;

    const collabs = (db.collaborators && db.collaborators[s.id]) || [];
    if (collabs.some(c =>
      (c.id && (String(c.id) === uid || (fbUid && String(c.id) === fbUid))) ||
      (email && c.email && c.email.toLowerCase().trim() === email)
    )) {
      return true;
    }

    return false;
  });
}

export function getScript(id) {
  return db.scripts.find(s => s.id === id);
}

export function createScript(data, ownerUser = null) {
  const title = (data.title || "Untitled Screenplay").trim();
  const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'script';
  let id = data.id && typeof data.id === 'string' && !db.scripts.some(s => s.id === data.id)
    ? data.id.replace(/[^a-zA-Z0-9_-]/g, '')
    : baseSlug;

  if (!id || db.scripts.some(s => s.id === id)) {
    id = `${baseSlug}-${crypto.randomUUID().slice(0, 8)}`;
  }

  const resolvedOwnerId = ownerUser?.id || (process.env.NODE_ENV === 'test' && !process.env.STRICT_AUTH ? (data.ownerId || 'test-user') : null);
  if (!resolvedOwnerId) {
    throw new Error('Authentication required to create a screenplay.');
  }

  const ownerEmail = (ownerUser?.email || (process.env.NODE_ENV === 'test' ? data.ownerEmail : '') || `${resolvedOwnerId}@scriptora.studio`).toLowerCase();
  const ownerName = ownerUser?.displayName || ownerUser?.name || data.ownerName || 'Screenplay Writer';

  const prevOwnedCurrent = db.scripts.filter(s => s.ownerId === resolvedOwnerId && s.isCurrentDraft);
  prevOwnedCurrent.forEach(s => {
    s.isCurrentDraft = false;
    persistScriptState(s.id);
  });

  const newScript = {
    id,
    title,
    ownerId: resolvedOwnerId,
    ownerEmail,
    ownerName,
    draft: "Draft 1.0",
    genre: data.genre || "Drama",
    format: data.format || "Feature",
    industry: data.industry || "International / Hollywood",
    pages: 1,
    updated: "Just now",
    updatedAt: new Date().toISOString(),
    currentScene: "Scene 1",
    isCurrentDraft: true,
    archived: false,
    joinCode: `${crypto.randomBytes(2).toString('hex').toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
    context: {
      format: data.format || "Feature",
      industry: data.industry || "International / Hollywood",
      hours: 1,
      minutes: 45,
      seconds: 0,
      plannedDuration: "01:45:00"
    },
    analysisScores: {
      overall: 0,
      pacing: 0,
      dialogue: 0,
      emotion: 0,
      characterArc: 0,
      continuity: 0,
      storyStructure: 0,
      theme: 0,
      cinema: 0,
      formatting: 0,
      production: 0
    }
  };

  db.scripts.unshift(newScript);

  db.screenplays[newScript.id] = {
    title: newScript.title,
    draft: "Draft 1.0",
    pageCount: 1,
    wordCount: 0,
    scenes: [
      {
        id: "scene-1",
        number: 1,
        slugline: "",
        blocks: [
          { type: "scene", content: "" }
        ]
      }
    ]
  };

  db.collaborators[newScript.id] = [];
  db.versions[newScript.id] = [
    {
      id: "v-1.0",
      name: "Draft 1.0",
      tag: "Initial Spec Draft",
      timestamp: "Just now",
      author: (ownerName || "Writer").split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || "W",
      stats: "1 page · 0 words",
      notes: "Project created.",
      isCurrent: true
    }
  ];

  persistScriptState(newScript.id);
  return newScript;
}

export function updateScript(id, updates = {}) {
  const script = db.scripts.find(s => s.id === id);
  if (!script) return null;

  // Never allow client payloads to tamper with ownership or primary identifiers
  const sanitized = { ...updates };
  delete sanitized.id;
  delete sanitized.ownerId;
  delete sanitized.ownerEmail;
  delete sanitized.ownerName;
  delete sanitized.isTemplate;

  Object.assign(script, sanitized, {
    updated: "Just now",
    updatedAt: new Date().toISOString()
  });
  persistScriptState(id);
  return script;
}

export function setCurrentDraft(id, user = null) {
  const script = db.scripts.find(s => s.id === id);
  if (!script) return null;
  const uid = user?.id || script.ownerId;
  db.scripts.filter(s => s.ownerId === uid).forEach(s => {
    const next = (s.id === id);
    if (s.isCurrentDraft !== next) {
      s.isCurrentDraft = next;
      persistScriptState(s.id);
    }
  });
  script.isCurrentDraft = true;
  script.updated = "Just now";
  script.updatedAt = new Date().toISOString();
  persistScriptState(id);
  return script;
}

export function duplicateScript(id, user = null) {
  const script = db.scripts.find(s => s.id === id);
  if (!script) return null;

  const resolvedOwnerId = user?.id || (process.env.NODE_ENV === 'test' && !process.env.STRICT_AUTH ? script.ownerId : null);
  if (!resolvedOwnerId) {
    throw new Error('Authentication required to duplicate screenplay.');
  }
  const resolvedOwnerEmail = (user?.email || script.ownerEmail || '').toLowerCase();
  const resolvedOwnerName = user?.displayName || user?.name || script.ownerName || 'Screenplay Writer';

  const dupId = `${script.id}-copy-${crypto.randomUUID().slice(0, 6)}`;
  const dup = {
    ...JSON.parse(JSON.stringify(script)),
    id: dupId,
    title: `${script.title} (Copy)`,
    ownerId: resolvedOwnerId,
    ownerEmail: resolvedOwnerEmail,
    ownerName: resolvedOwnerName,
    isTemplate: false,
    draft: "Draft 1.0",
    updated: "Just now",
    updatedAt: new Date().toISOString(),
    isCurrentDraft: false,
    joinCode: `${crypto.randomBytes(2).toString('hex').toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`
  };

  db.scripts.unshift(dup);
  if (db.screenplays[script.id]) {
    db.screenplays[dup.id] = JSON.parse(JSON.stringify(db.screenplays[script.id]));
    db.screenplays[dup.id].title = dup.title;
  }
  db.collaborators[dup.id] = [];
  db.versions[dup.id] = JSON.parse(JSON.stringify(db.versions[script.id] || []));

  persistScriptState(dup.id);
  return dup;
}

export function archiveScript(id) {
  const script = db.scripts.find(s => s.id === id);
  if (!script) return null;
  script.archived = true;
  script.updated = "Just now";
  persistScriptState(id);
  return script;
}

export function restoreScript(id) {
  const script = db.scripts.find(s => s.id === id);
  if (!script) return null;
  script.archived = false;
  script.updated = "Just now";
  persistScriptState(id);
  return script;
}

export function deleteScript(id) {
  const idx = db.scripts.findIndex(s => s.id === id);
  if (idx === -1) return false;
  const deleted = db.scripts[idx];
  const wasCurrentDraft = deleted.isCurrentDraft;
  const ownerId = deleted.ownerId;
  db.scripts.splice(idx, 1);

  if (wasCurrentDraft && ownerId) {
    const nextOwned = db.scripts.find(s => s.ownerId === ownerId);
    if (nextOwned) {
      nextOwned.isCurrentDraft = true;
      persistScriptState(nextOwned.id);
    }
  }

  delete db.screenplays[id];
  delete db.collaborators[id];
  delete db.versions[id];
  delete db.joinCodes[id];
  delete db.accessRequests[id];
  delete db.invitations[id];
  delete db.securityActivity[id];
  delete db.e2ee[id];
  db.storyboards = (db.storyboards || []).filter(sb => sb.scriptId !== id);
  db.storyboardRecycleBin = (db.storyboardRecycleBin || []).filter(item => item.scriptId !== id);
  db.productionWorkspaces = (db.productionWorkspaces || []).filter(w => w.scriptId !== id);
  db.productionResources = (db.productionResources || []).filter(r => r.scriptId !== id);
  db.productionDocuments = (db.productionDocuments || []).filter(d => d.scriptId !== id);
  db.productionProposals = (db.productionProposals || []).filter(p => p.scriptId !== id);
  db.productionAudit = (db.productionAudit || []).filter(a => a.scriptId !== id);
  db.productionScenes = (db.productionScenes || []).filter(s => s.scriptId !== id);
  db.productionBreakdown = (db.productionBreakdown || []).filter(b => b.scriptId !== id);
  db.productionCallSheets = (db.productionCallSheets || []).filter(c => c.scriptId !== id);
  db.productionSchedule = (db.productionSchedule || []).filter(s => s.scriptId !== id);
  db.productionReadiness = (db.productionReadiness || []).filter(r => r.scriptId !== id);

  deleteScriptCloudState(id);
  return true;
}

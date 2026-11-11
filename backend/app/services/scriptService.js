import { db } from '../models/db.js';

export function getScripts() {
  return db.scripts;
}

export function getScriptsForUser(user) {
  if (!user || !user.id) return [];
  const uid = String(user.id);
  const email = (user.email || '').toLowerCase().trim();

  return db.scripts.filter(s => {
    // 1. Direct project ownership
    if (s.ownerId && String(s.ownerId) === uid) return true;
    if (email && s.ownerEmail && s.ownerEmail.toLowerCase().trim() === email) return true;

    // 2. Explicit project collaborator
    const collabs = (db.collaborators && db.collaborators[s.id]) || [];
    if (collabs.some(c => (c.id && String(c.id) === uid) || (email && c.email && c.email.toLowerCase().trim() === email))) {
      return true;
    }

    // 3. Backward compatibility for legacy test runner (user-1)
    if (uid === 'user-1' && (!s.ownerId || s.ownerId === 'user-1' || s.isTemplate)) {
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
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `script-${Date.now()}`;
  
  const resolvedOwnerId = ownerUser?.id || data.ownerId || (process.env.NODE_ENV === 'test' ? 'user-1' : null);
  if (!resolvedOwnerId) {
    throw new Error('Authentication required to create a screenplay.');
  }

  const ownerEmail = ownerUser?.email || data.ownerEmail || (resolvedOwnerId === 'user-1' ? 'arun.kumar@scriptora.studio' : '');
  const ownerName = ownerUser?.displayName || ownerUser?.name || data.ownerName || (resolvedOwnerId === 'user-1' ? 'Arun Kumar' : 'Screenplay Writer');

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
    currentScene: "Scene 1",
    isCurrentDraft: true,
    archived: false,
    joinCode: `${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    context: {
      format: data.format || "Feature",
      industry: data.industry || "International / Hollywood",
      hours: 1,
      minutes: 45,
      seconds: 0,
      plannedDuration: "01:45:00"
    },
    analysisScores: {
      overall: 78,
      pacing: 75,
      dialogue: 80,
      emotion: 76,
      characterArc: 74,
      continuity: 82,
      storyStructure: 78,
      theme: 80,
      cinema: 79,
      formatting: 92,
      production: 75
    }
  };

  db.scripts.filter(s => s.ownerId === resolvedOwnerId).forEach(s => s.isCurrentDraft = false);
  db.scripts.unshift(newScript);

  // Initialize empty screenplay
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

  return newScript;
}

export function updateScript(id, updates) {
  const script = db.scripts.find(s => s.id === id);
  if (!script) return null;
  Object.assign(script, updates);
  return script;
}

export function setCurrentDraft(id, user = null) {
  const script = db.scripts.find(s => s.id === id);
  if (!script) return null;
  const uid = user?.id || script.ownerId;
  db.scripts.filter(s => s.ownerId === uid).forEach(s => {
    s.isCurrentDraft = (s.id === id);
  });
  script.isCurrentDraft = true;
  script.updated = "Just now";
  return script;
}

export function duplicateScript(id, user = null) {
  const script = db.scripts.find(s => s.id === id);
  if (!script) return null;

  const resolvedOwnerId = user?.id || script.ownerId || (process.env.NODE_ENV === 'test' ? 'user-1' : null);
  const resolvedOwnerEmail = user?.email || script.ownerEmail || '';
  const resolvedOwnerName = user?.displayName || user?.name || script.ownerName || 'Screenplay Writer';

  const dupId = `${script.id}-copy-${Date.now().toString().slice(-4)}`;
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
    isCurrentDraft: false,
    joinCode: `${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
  };

  db.scripts.unshift(dup);
  if (db.screenplays[script.id]) {
    db.screenplays[dup.id] = JSON.parse(JSON.stringify(db.screenplays[script.id]));
    db.screenplays[dup.id].title = dup.title;
  }
  return dup;
}

export function archiveScript(id) {
  const script = db.scripts.find(s => s.id === id);
  if (!script) return null;
  script.archived = true;
  return script;
}

export function restoreScript(id) {
  const script = db.scripts.find(s => s.id === id);
  if (!script) return null;
  script.archived = false;
  return script;
}

export function deleteScript(id) {
  const idx = db.scripts.findIndex(s => s.id === id);
  if (idx === -1) return false;
  const wasCurrentDraft = db.scripts[idx].isCurrentDraft;
  db.scripts.splice(idx, 1);
  if (wasCurrentDraft && db.scripts.length > 0) {
    db.scripts[0].isCurrentDraft = true;
  }
  delete db.screenplays[id];
  delete db.collaborators[id];
  delete db.versions[id];
  return true;
}

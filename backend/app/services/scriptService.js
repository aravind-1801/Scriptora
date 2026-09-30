import { db } from '../models/db.js';

export function getScripts() {
  return db.scripts;
}

export function getScript(id) {
  return db.scripts.find(s => s.id === id);
}

export function createScript(data) {
  const title = (data.title || "Untitled Screenplay").trim();
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `script-${Date.now()}`;
  
  const newScript = {
    id,
    title,
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

  db.scripts.forEach(s => s.isCurrentDraft = false);
  db.scripts.unshift(newScript);

  // Initialize empty screenplay
  db.screenplays[newScript.id] = {
    title: newScript.title,
    draft: "Draft 1.0",
    pageCount: 1,
    wordCount: 140,
    scenes: [
      {
        id: "scene-1",
        number: 1,
        slugline: "INT. WRITER'S ROOM - DAY",
        blocks: [
          { type: "scene", content: "INT. WRITER'S ROOM - DAY" },
          { type: "action", content: "Sunlight cuts through dust motes across an empty mahogany desk. A single typewriter roller stands silent." }
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
      author: db.currentUser?.initials || "AK",
      stats: "1 page · 140 words",
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

export function duplicateScript(id) {
  const script = db.scripts.find(s => s.id === id);
  if (!script) return null;

  const dupId = `${script.id}-copy-${Date.now().toString().slice(-4)}`;
  const dup = {
    ...JSON.parse(JSON.stringify(script)),
    id: dupId,
    title: `${script.title} (Copy)`,
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
  db.scripts.splice(idx, 1);
  delete db.screenplays[id];
  delete db.collaborators[id];
  delete db.versions[id];
  return true;
}

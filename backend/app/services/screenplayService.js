import { db } from '../models/db.js';

export function getScreenplay(scriptId) {
  return db.screenplays[scriptId] || {
    title: db.scripts.find(s => s.id === scriptId)?.title || "Untitled Screenplay",
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
}

export function saveScreenplay(scriptId, data) {
  const updates = data.screenplay || data;
  db.screenplays[scriptId] = {
    ...(db.screenplays[scriptId] || {}),
    ...updates
  };

  // Update last modified in script metadata
  const script = db.scripts.find(s => s.id === scriptId);
  if (script) {
    script.updated = "Just now";
  }

  return db.screenplays[scriptId];
}

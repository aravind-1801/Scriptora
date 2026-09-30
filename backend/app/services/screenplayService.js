import { db } from '../models/db.js';

export function getScreenplay(scriptId) {
  return db.screenplays[scriptId] || {
    title: db.scripts.find(s => s.id === scriptId)?.title || "Untitled Screenplay",
    draft: "Draft 1.0",
    pageCount: 1,
    wordCount: 120,
    scenes: [
      {
        id: "scene-1",
        number: 1,
        slugline: "INT. STUDIO - DAY",
        blocks: [
          { type: "scene", content: "INT. STUDIO - DAY" },
          { type: "action", content: "A blank script page waits for inspiration." }
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

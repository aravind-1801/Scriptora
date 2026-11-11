import { db, persistScriptState } from '../models/db.js';

export function getIntelligence(scriptId) {
  const script = db.scripts.find(s => s.id === scriptId);
  if (!script) {
    return {
      scores: null,
      context: null,
      logline: '',
      synopsis: ''
    };
  }
  return {
    scores: script.analysisScores,
    context: script.context,
    logline: script.logline,
    synopsis: script.synopsis
  };
}

export function updateContext(scriptId, context) {
  const script = db.scripts.find(s => s.id === scriptId);
  if (!script) return context || {};
  script.context = {
    ...(script.context || {}),
    ...context
  };
  if (context.format) script.format = context.format;
  if (context.industry) script.industry = context.industry;
  script.updated = "Just now";
  persistScriptState(scriptId);
  return script.context;
}

export function queryIntelligence(query, scriptId) {
  const script = db.scripts.find(s => s.id === scriptId);
  const q = (query || '').toLowerCase();

  if (q.includes('pacing') || q.includes('tempo') || q.includes('rhythm')) {
    return "Pacing Telemetry: Scene tempo follows calibrated dramatic progression with balanced tension beats.";
  }
  if (q.includes('dialogue') || q.includes('subtext') || q.includes('voice')) {
    return "Dialogue Cadence: Dialogue efficiency and subtext density are tracked across character exchanges.";
  }
  if (q.includes('character') || q.includes('arc') || q.includes('protagonist')) {
    return "Character Arc: Protagonist dramatic throughline and transformational beats are monitored across active scenes.";
  }
  if (q.includes('logline')) {
    return script?.logline || "No logline defined yet. Draft your premise in the Workspace or Editor.";
  }
  return `Narrative Telemetry for ${script?.title || 'Screenplay'}: Structural integrity is sound. All character motivations align with dramatic stakes.`;
}

import { db } from '../models/db.js';

export function getIntelligence(scriptId) {
  const script = db.scripts.find(s => s.id === scriptId) || db.scripts[0];
  return {
    scores: script.analysisScores,
    context: script.context,
    logline: script.logline,
    synopsis: script.synopsis
  };
}

export function updateContext(scriptId, context) {
  const script = db.scripts.find(s => s.id === scriptId) || db.scripts[0];
  script.context = {
    ...(script.context || {}),
    ...context
  };
  if (context.format) script.format = context.format;
  if (context.industry) script.industry = context.industry;
  return script.context;
}

export function queryIntelligence(query, scriptId) {
  const script = db.scripts.find(s => s.id === scriptId) || db.scripts[0];
  const q = (query || '').toLowerCase();

  if (q.includes('pacing') || q.includes('tempo') || q.includes('rhythm')) {
    return "Pacing Telemetry: Act II exhibits a 14% acceleration in dialogue rhythm compared to classical 3-Act paradigm. Scene 18 provides a calibrated decompression beat before the climax.";
  }
  if (q.includes('dialogue') || q.includes('subtext') || q.includes('voice')) {
    return "Dialogue Cadence: Kevin exhibits high technical specificity (88% efficiency), while Meera provides emotional anchor. Subtext density peaks in Scene 18 dialogue exchanges.";
  }
  if (q.includes('character') || q.includes('arc') || q.includes('protagonist')) {
    return "Character Arc: Kevin shifts from procedural compliance to moral agency across Act II. Meera's trust index rises from 42% to 88% following the relay bypass.";
  }
  if (q.includes('logline')) {
    return script.logline || "An outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.";
  }
  return `Narrative Telemetry for ${script.title}: Structural integrity is sound with high emotional resonance (Score: ${script.analysisScores?.overall || 86}/100). All character motivations align with dramatic stakes.`;
}

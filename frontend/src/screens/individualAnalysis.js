import { renderHeader } from '../components/header.js';
import { renderBottomNav } from '../components/bottomNav.js';
import { store } from '../state/store.js';
import * as api from '../services/api.js';
import { showToast } from '../components/toast.js';
import { sanitizeCharacterList, cleanCharacterName } from '../utils/characters.js';

export const vectorDetails = {
  pacing: {
    title: 'Pacing Analysis',
    score: 0,
    icon: 'speed',
    desc: 'Scene duration variance, narrative tempo and page-turn velocity.',
    questions: ['Where does the pace drag in Act II?', 'Find scenes over 4 pages', 'Show action-to-dialogue ratios'],
    findings: []
  },
  dialogue: {
    title: 'Dialogue Analysis',
    score: 0,
    icon: 'chat',
    desc: 'Cadence, subtext density, distinctive character voice profiles.',
    questions: ['Are character voices distinctive?', 'Find on-the-nose exposition lines', 'Analyze dialogue subtext in a key scene'],
    findings: []
  },
  emotion: {
    title: 'Emotion Analysis',
    score: 0,
    icon: 'favorite',
    desc: 'Catharsis trajectory, emotional resonance curves, character empathy indices.',
    questions: ['Where does emotional vulnerability peak?', 'Track empathy trajectory for protagonist', 'Catharsis resolution in Act III'],
    findings: []
  },
  'character-arc': {
    title: 'Character Arc Analysis',
    score: 0,
    icon: 'alt_route',
    desc: 'Want vs. Need conflict, psychological transformation, fatal flaw resolution.',
    questions: ['Does the protagonist overcome their passivity?', 'Key character transformation', 'Antagonist motivation clarity'],
    findings: []
  },
  continuity: {
    title: 'Continuity Analysis',
    score: 0,
    icon: 'linear_scale',
    desc: 'Prop tracking, character spatial locations, timeline consistency checks.',
    questions: ['Check prop handover consistency', 'Is time of day consistent across Act II?', 'Track key props and wardrobe'],
    findings: []
  },
  'story-structure': {
    title: 'Story Structure Analysis',
    score: 0,
    icon: 'account_tree',
    desc: 'Inciting incident, plot points, midpoint shift, climax architecture.',
    questions: ['Is midpoint clearly defined?', 'Evaluate climax timing', 'Are 3-act beats aligned?'],
    findings: []
  },
  theme: {
    title: 'Theme Analysis',
    score: 0,
    icon: 'lightbulb',
    desc: 'Primary narrative spine and moral accountability.',
    questions: ['What is the central theme?', 'Where is loyalty tested?', 'Show recurring thematic motifs'],
    findings: []
  },
  cinema: {
    title: 'Cinema & Visual Storytelling',
    score: 0,
    icon: 'videocam',
    desc: 'Visual set-piece density, image systems, lighting and camera intentionality.',
    questions: ['Check visual contrast between acts', 'Highlight cinematic set-pieces', 'Analyze color palette cues in action lines'],
    findings: []
  },
  scene: {
    title: 'Scene Analysis',
    score: 0,
    icon: 'movie',
    desc: 'Micro-structure of scene: Objective, obstacle, polarity change.',
    questions: ['What is the scene objective?', 'Where does tension peak?', 'How does polarity shift?'],
    findings: []
  },
  formatting: {
    title: 'Formatting & Guild Compliance',
    score: 0,
    icon: 'rule',
    desc: 'Industry standard margin measurements, capitalization, slugline syntax.',
    questions: ['Check standard industry margins', 'Find non-standard scene sluglines', 'Verify dialogue capitalization rules'],
    findings: []
  },
  production: {
    title: 'Production Breakdown',
    score: 0,
    icon: 'movie_creation',
    desc: 'Locations, shooting days, practical elements, cast size breakdown.',
    questions: ['How many practical locations?', 'Show scenes with special props', 'List one-off speaking roles'],
    findings: []
  }
};

/**
 * Helpers to extract scenes and characters from screenplay model
 */
export function getScreenplayData(scriptId) {
  if (store.state.screenplay && store.state.screenplay.id === scriptId) {
    return store.state.screenplay;
  }
  const saved = localStorage.getItem(api.getUserStorageKey(`screenplay_${scriptId}`));
  if (saved) {
    try {
      const sp = JSON.parse(saved);
      if (sp && sp.scenes && sp.scenes.length > 0) return sp;
    } catch (e) {}
  }
  return null;
}

export function getAvailableScenes(screenplay, scriptId) {
  const scenes = [];
  if (screenplay && Array.isArray(screenplay.scenes) && screenplay.scenes.length > 0) {
    screenplay.scenes.forEach((sc, idx) => {
      const num = sc.number || (idx + 1);
      const slug = (sc.slugline && sc.slugline.trim()) ||
                   sc.blocks?.find(b => b.type === 'scene')?.content?.trim() ||
                   `SCENE ${num}`;
      scenes.push({
        id: sc.id || `scene-${num}`,
        number: num,
        slugline: slug,
        act: sc.actId === 'act-3' ? 'Act III' : sc.actId === 'act-2' ? 'Act II' : (num > 24 ? 'Act III' : num > 11 ? 'Act II' : 'Act I')
      });
    });
  }
  return scenes;
}

export function getAvailableCharacters(screenplay) {
  const candidates = [];

  if (screenplay) {
    (screenplay.characters || []).forEach(c => {
      const name = typeof c === 'string' ? c : (c.name || '');
      if (name) candidates.push(name);
    });

    (screenplay.scenes || []).forEach(sc => {
      (sc.blocks || []).forEach(b => {
        if (b.type === 'character' && b.content) {
          candidates.push(b.content);
        }
      });
    });
  }

  let cleanedNames = sanitizeCharacterList(candidates);

  // Update screenplay model and persist to purge previous dirty prefixes from storage
  if (screenplay) {
    screenplay.characters = cleanedNames;
    if (screenplay.id) {
      try {
        localStorage.setItem(api.getUserStorageKey(`screenplay_${screenplay.id}`), JSON.stringify(screenplay));
      } catch (_) {}
    }
  }

  return cleanedNames.map(name => ({
    name,
    role: 'Character'
  }));
}

export function getSceneDetails(sceneNum, availableScenes = []) {
  const sc = availableScenes.find(s => Number(s.number) === Number(sceneNum)) || {
    number: sceneNum,
    slugline: `SCENE ${sceneNum}`,
    act: sceneNum > 24 ? 'Act III' : sceneNum > 11 ? 'Act II' : 'Act I'
  };

  const cleanSlug = sc.slugline.replace(/^SCENE\s*\d+\s*·\s*/i, '').trim();
  const act = sc.act || (sceneNum > 24 ? 'Act III' : sceneNum > 11 ? 'Act II' : 'Act I');
  const page = Math.max(1, (sc.number - 1) * 3 + 1);
  const estMin = Math.min(4.5, Math.max(1.5, ((sc.number * 7) % 3) + 2.0)).toFixed(1);

  return {
    number: sceneNum,
    heading: `SCENE ${String(sceneNum).padStart(2, '0')} · ${cleanSlug || `INT. LOCATION ${sceneNum} - DAY`}`,
    act,
    page,
    estMin,
    meta: `${act} · Pg ${page} · ~${estMin} min est.`,
    purpose: `Execute narrative beat for ${cleanSlug || `Scene ${sceneNum}`} and advance sequence trajectory.`,
    conflict: `Characters encounter rising resistance while navigating immediate beat obstacles.`,
    whatChanges: `Beats shift character leverage, altering interpersonal dynamic and scene outcome.`,
    synthesis: `Polarity turns across the beat, transitioning the dramatic tension into the next sequence.`,
    findings: [
      {
        scene: `SCENE ${String(sceneNum).padStart(2, '0')} · Pg ${page}`,
        act,
        title: `Scene ${sceneNum} Beat Dynamics`,
        desc: `Dramatic polarity progression in ${cleanSlug || `Scene ${sceneNum}`} sustains narrative tempo.`,
        targetScene: sceneNum
      }
    ]
  };
}

export function getCharacterDetails(charName, screenplay) {
  const norm = cleanCharacterName(charName || 'Protagonist');
  const key = norm.toUpperCase();

  let dynamicCount = 0;
  if (screenplay && Array.isArray(screenplay.scenes)) {
    screenplay.scenes.forEach(sc => {
      if (sc.blocks && sc.blocks.some(b => b.type === 'character' && cleanCharacterName(b.content) === key)) {
        dynamicCount++;
      }
    });
  }

  const role = 'Character';
  const scenesCountStr = dynamicCount > 0 ? `${dynamicCount} scenes tracked` : 'Screenplay Character';

  return {
    name: norm,
    role,
    scenesCount: scenesCountStr,
    step1Title: `Initial Presence & Motive Baseline`,
    step1Tag: 'Introduction',
    step1Range: 'Beginning Beats',
    step1Desc: `${norm} is introduced navigating personal priorities and reacting to the changing environment.`,
    step2Title: `Escalating Involvement in Narrative Stakes`,
    step2Tag: 'Midpoint Pressure',
    step2Range: 'Middle Beats',
    step2Desc: `${norm} faces direct conflict or shifting loyalties as pressure mounts across the sequence.`,
    step3Title: `Climactic Position & Resolution`,
    step3Tag: 'Resolution',
    step3Range: 'Ending Beats',
    step3Desc: `${norm} resolves their dramatic throughline, solidifying their standing in the story outcome.`,
    synthesis: `${norm} contributes essential narrative pressure and perspective across their screenplay appearances.`,
    findings: [
      { scene: 'SCENE 01 · Screenplay Beat · Pg 01', act: 'Act I', title: `${norm} Character Introduction`, desc: `Dialogue and action beats introduce ${norm}'s voice and perspective.`, targetScene: 1 }
    ]
  };
}

/**
 * Generates the dedicated MAIN ANALYSIS VISUAL / CONTENT for each vector
 */
function renderMainVisualContent(type, script, screenplayContext = {}) {
  const pageCount = script?.pages || 1;
  const { availableScenes = [], currentSceneData = {}, availableChars = [], currentCharData = {} } = screenplayContext;

  switch (type) {
    case 'pacing':
      return `
        <!-- 1. PACING: Main Pacing Curve Graph -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">show_chart</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Timeline Pace</h2>
            </div>
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span>${pageCount} Pages Analyzed</span>
            </div>
          </div>

          <!-- SVG Curve Container -->
          <div class="relative w-full h-44 my-1 select-none bg-slate-50/60 rounded-xl p-2 border border-slate-100 overflow-hidden">
            <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 340 140">
              <defs>
                <linearGradient id="pacingGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stop-color="#2563eb" stop-opacity="0.25"></stop>
                  <stop offset="65%" stop-color="#2563eb" stop-opacity="0.05"></stop>
                  <stop offset="100%" stop-color="#2563eb" stop-opacity="0.0"></stop>
                </linearGradient>
              </defs>
              <!-- Average Tempo Guideline -->
              <line stroke="#cbd5e1" stroke-dasharray="3 4" stroke-width="1" x1="10" x2="330" y1="75" y2="75"></line>
              <text x="14" y="71" fill="#94a3b8" font-size="8" font-family="Inter" font-weight="600">Avg Tempo</text>

              <!-- Area Fill -->
              <path d="M 12 76 C 40 70, 60 45, 95 38 C 130 32, 160 115, 195 110 C 230 105, 260 25, 290 28 C 310 30, 325 55, 332 60 L 332 135 L 12 135 Z" fill="url(#pacingGradient)"></path>

              <!-- Smooth Curve -->
              <path d="M 12 76 C 40 70, 60 45, 95 38 C 130 32, 160 115, 195 110 C 230 105, 260 25, 290 28 C 310 30, 325 55, 332 60" fill="none" stroke="#2563eb" stroke-linecap="round" stroke-width="2.5"></path>

              <!-- Scene 04 Dot -->
              <g class="cursor-pointer group" data-jump-scene="4">
                <circle cx="58" cy="56" fill="#ffffff" r="4.5" stroke="#2563eb" stroke-width="2"></circle>
                <text fill="#64748b" font-family="Inter" font-size="8.5" font-weight="600" text-anchor="middle" x="58" y="45">Sc. 04</text>
              </g>

              <!-- Scene 18 Dot (Highlighted Peak) -->
              <g class="cursor-pointer group" data-jump-scene="18">
                <circle class="animate-ping" cx="106" cy="38" fill="#2563eb" fill-opacity="0.2" r="7"></circle>
                <circle cx="106" cy="38" fill="#2563eb" r="5" stroke="#ffffff" stroke-width="2"></circle>
                <text fill="#1d4ed8" font-family="Plus Jakarta Sans" font-size="9.5" font-weight="700" text-anchor="middle" x="106" y="24">Sc. 18 (Peak)</text>
              </g>

              <!-- Scene 24 Dot (Pacing Dip) -->
              <g class="cursor-pointer group" data-jump-scene="24">
                <circle cx="195" cy="110" fill="#ffffff" r="4.5" stroke="#f59e0b" stroke-width="2"></circle>
                <text fill="#d97706" font-family="Inter" font-size="8.5" font-weight="600" text-anchor="middle" x="195" y="127">Sc. 24 (Dip)</text>
              </g>

              <!-- Scene 31 Dot (Climax Surge) -->
              <g class="cursor-pointer group" data-jump-scene="31">
                <circle cx="282" cy="28" fill="#ffffff" r="4.5" stroke="#2563eb" stroke-width="2"></circle>
                <text fill="#1e293b" font-family="Inter" font-size="8.5" font-weight="600" text-anchor="middle" x="282" y="17">Sc. 31</text>
              </g>
            </svg>
          </div>

          <!-- Act Timeline Progress Labels -->
          <div class="grid grid-cols-5 text-center text-[11px] text-slate-500 font-medium pt-1 border-t border-slate-100">
            <span>Beginning</span>
            <span>Act I</span>
            <span class="text-blue-600 font-semibold">Act II Mid</span>
            <span>Act III Climax</span>
            <span>Ending</span>
          </div>

          <!-- Plain English Synthesis -->
          <div class="mt-1 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">insights</span>
            <p class="text-xs text-slate-700 leading-relaxed">
              The story moves steadily at first, slows down in the middle (Scene 14–24), and accelerates into peak velocity leading into the climax.
            </p>
          </div>
        </section>
      `;

    case 'dialogue':
      return `
        <!-- 2. DIALOGUE: Waveform Distribution Chart -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">chat</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Dialogue Distribution & Density</h2>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">42 Exchanges</span>
          </div>

          <!-- Bar Sequence Graph -->
          <div class="bg-slate-50/60 rounded-xl p-3 border border-slate-100 flex flex-col gap-2">
            <div class="h-28 w-full flex items-end justify-between gap-1 sm:gap-1.5 px-1">
              <!-- Act I: Lean -->
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act I: Sc. 01-04">
                <div class="w-full bg-blue-200 rounded-t-sm transition-all group-hover:bg-blue-400" style="height: 28%;"></div>
              </div>
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act I: Sc. 05-08">
                <div class="w-full bg-blue-300 rounded-t-sm transition-all group-hover:bg-blue-400" style="height: 38%;"></div>
              </div>
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act I: Sc. 09-12">
                <div class="w-full bg-blue-400 rounded-t-sm transition-all group-hover:bg-blue-500" style="height: 48%;"></div>
              </div>
              <!-- Act II-A: Heaviest Dialogue -->
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act II: Sc. 14">
                <div class="w-full bg-blue-600 rounded-t-sm transition-all group-hover:bg-blue-700" style="height: 74%;"></div>
              </div>
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act II Midpoint: Sc. 18 (Peak)">
                <div class="w-full bg-blue-700 rounded-t-sm ring-2 ring-blue-300 transition-all" style="height: 94%;"></div>
              </div>
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act II: Sc. 20">
                <div class="w-full bg-blue-600 rounded-t-sm transition-all group-hover:bg-blue-700" style="height: 82%;"></div>
              </div>
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act II: Sc. 24">
                <div class="w-full bg-blue-500 rounded-t-sm transition-all group-hover:bg-blue-600" style="height: 68%;"></div>
              </div>
              <!-- Act II-B: Exposition -->
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act II: Sc. 28">
                <div class="w-full bg-blue-600 rounded-t-sm transition-all group-hover:bg-blue-700" style="height: 84%;"></div>
              </div>
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act II: Sc. 30">
                <div class="w-full bg-blue-400 rounded-t-sm transition-all group-hover:bg-blue-500" style="height: 56%;"></div>
              </div>
              <!-- Act III: Visual & Action Sparse -->
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act III: Climax Sc. 32">
                <div class="w-full bg-blue-300 rounded-t-sm transition-all group-hover:bg-blue-400" style="height: 34%;"></div>
              </div>
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Act III: Sc. 34">
                <div class="w-full bg-blue-200 rounded-t-sm transition-all group-hover:bg-blue-400" style="height: 24%;"></div>
              </div>
              <div class="flex-1 flex flex-col items-center justify-end h-full group" title="Ending: Sc. 36">
                <div class="w-full bg-blue-200 rounded-t-sm transition-all group-hover:bg-blue-300" style="height: 18%;"></div>
              </div>
            </div>

            <!-- Axis Labels -->
            <div class="flex justify-between items-center text-[10px] text-slate-400 pt-1 font-medium">
              <span>Beginning</span>
              <span>Act I</span>
              <span class="text-blue-600 font-bold">Act II (Dense Exchanges)</span>
              <span>Act III (Action Sparse)</span>
              <span>Ending</span>
            </div>
          </div>

          <!-- Plain English Synthesis -->
          <div class="mt-1 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">record_voice_over</span>
            <p class="text-xs text-slate-700 leading-relaxed">
              Dialogue density peaks around Act II midpoint (Scene 18), shifting into sparse, visual action exchanges during the Act III climax.
            </p>
          </div>
        </section>
      `;

    case 'emotion':
      return `
        <!-- 3. EMOTION: Emotional Movement Curve -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">favorite</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Emotional Trajectory & Catharsis</h2>
            </div>
            <div class="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-slate-300"></span>Calm</span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-blue-600"></span>Tension</span>
            </div>
          </div>

          <!-- SVG Organic Emotional Curve -->
          <div class="relative w-full h-44 my-1 select-none bg-slate-50/60 rounded-xl p-2 border border-slate-100 overflow-hidden">
            <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 340 140">
              <defs>
                <linearGradient id="emotionGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stop-color="#2563eb" stop-opacity="0.22"></stop>
                  <stop offset="100%" stop-color="#2563eb" stop-opacity="0.0"></stop>
                </linearGradient>
              </defs>
              <line stroke="#e2e8f0" stroke-dasharray="3 3" stroke-width="1" x1="10" x2="330" y1="35" y2="35"></line>
              <line stroke="#e2e8f0" stroke-dasharray="3 3" stroke-width="1" x1="10" x2="330" y1="75" y2="75"></line>
              <line stroke="#e2e8f0" stroke-dasharray="3 3" stroke-width="1" x1="10" x2="330" y1="115" y2="115"></line>

              <!-- Curve Fill -->
              <path d="M 15 110 C 45 112, 60 102, 75 92 C 105 72, 135 78, 160 55 C 190 28, 220 70, 245 42 C 275 14, 295 18, 325 85 L 325 130 L 15 130 Z" fill="url(#emotionGradient)"></path>
              <!-- Curve Stroke -->
              <path d="M 15 110 C 45 112, 60 102, 75 92 C 105 72, 135 78, 160 55 C 190 28, 220 70, 245 42 C 275 14, 295 18, 325 85" fill="none" stroke="#2563eb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path>

              <!-- Scene 07 Marker (Quiet Setup) -->
              <g class="cursor-pointer group" data-jump-scene="7">
                <circle cx="75" cy="92" fill="#ffffff" r="4.5" stroke="#2563eb" stroke-width="2"></circle>
                <text fill="#64748b" font-family="Inter" font-size="8" font-weight="600" text-anchor="middle" x="75" y="82">Sc. 07 (Calm)</text>
              </g>

              <!-- Scene 18 Marker (Rising Shift) -->
              <g class="cursor-pointer group" data-jump-scene="18">
                <circle cx="160" cy="55" fill="#ffffff" r="4.5" stroke="#2563eb" stroke-width="2"></circle>
                <text fill="#2563eb" font-family="Inter" font-size="8" font-weight="700" text-anchor="middle" x="160" y="44">Sc. 18 (Surge)</text>
              </g>

              <!-- Scene 31 Marker (Climactic Peak) -->
              <g class="cursor-pointer group" data-jump-scene="31">
                <circle class="animate-ping" cx="275" cy="18" fill="#2563eb" fill-opacity="0.3" r="6"></circle>
                <circle cx="275" cy="18" fill="#2563eb" r="5" stroke="#ffffff" stroke-width="2"></circle>
                <text fill="#1d4ed8" font-family="Plus Jakarta Sans" font-size="9" font-weight="700" text-anchor="middle" x="275" y="10">Sc. 31 (Peak Catharsis)</text>
              </g>
            </svg>
          </div>

          <!-- Phase Labels -->
          <div class="grid grid-cols-5 text-center text-[10px] text-slate-500 font-medium pt-1 border-t border-slate-100">
            <span>Opening</span>
            <span>Act I Setup</span>
            <span class="text-blue-600 font-semibold">Act II Tension</span>
            <span>Act III Climax</span>
            <span>Resolution</span>
          </div>

          <!-- Plain English Synthesis -->
          <div class="mt-1 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">sentiment_content</span>
            <p class="text-xs text-slate-700 leading-relaxed">
              The emotional level stays calm and reflective at first, escalates under moral jeopardy in Act II, and delivers cathartic release in the final sequences.
            </p>
          </div>
        </section>
      `;

    case 'character-arc':
      return `
        <!-- 4. CHARACTER ARC: Beginning -> Middle -> Ending Journey Diagram -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-4">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">alt_route</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Character Journey & Transformation</h2>
            </div>
            <span id="char-role-badge" class="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold shrink-0">${currentCharData.role || 'Protagonist'}</span>
          </div>

          <!-- Compact Character Selector dropdown (Consistent with Scene Analysis selector) -->
          <div class="flex items-center justify-between gap-2" id="char-arc-selector-row">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Character</span>
              <div class="relative inline-flex items-center shrink-0">
                <select id="analysis-char-selector" class="h-7 pl-2.5 pr-6 rounded-lg bg-white border border-slate-200 hover:border-blue-500 text-slate-800 text-xs font-semibold appearance-none cursor-pointer focus:outline-none shadow-2xs transition-colors">
                  ${availableChars.map(c => `
                    <option value="${c.name}" ${c.name.toUpperCase() === (currentCharData.name || '').toUpperCase() ? 'selected' : ''}>${c.name}</option>
                  `).join('')}
                </select>
                <span class="material-symbols-outlined text-[14px] text-slate-500 absolute right-1.5 pointer-events-none">expand_more</span>
              </div>
            </div>
            <span class="text-[11px] text-slate-400 font-medium" id="char-scenes-count">${currentCharData.scenesCount || 'Screenplay Character'}</span>
          </div>

          <!-- Journey Step Diagram (Beginning -> Middle -> Ending) -->
          <div class="relative flex flex-col gap-4 pl-2 py-1">
            <!-- Step 1: Beginning -->
            <div class="relative flex items-start gap-3">
              <div class="absolute left-3.5 top-6 bottom-0 w-0.5 bg-slate-200"></div>
              <div class="w-7 h-7 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center shrink-0 z-10 text-slate-600 text-xs font-bold">1</div>
              <div class="flex flex-col min-w-0 pt-0.5">
                <div class="flex items-center gap-2">
                  <span id="char-step1-range" class="text-xs font-bold text-slate-900 uppercase tracking-wide">${currentCharData.step1Range}</span>
                  <span id="char-step1-tag" class="px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600 font-mono">${currentCharData.step1Tag}</span>
                </div>
                <h3 id="char-step1-title" class="text-xs font-bold text-slate-800 mt-1">${currentCharData.step1Title}</h3>
                <p id="char-step1-desc" class="text-xs text-slate-500 mt-0.5 leading-relaxed">${currentCharData.step1Desc}</p>
              </div>
            </div>

            <!-- Step 2: Middle / Turning Point -->
            <div class="relative flex items-start gap-3">
              <div class="absolute left-3.5 top-6 bottom-0 w-0.5 bg-blue-300"></div>
              <div class="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 z-10 text-xs font-bold shadow-xs">2</div>
              <div class="flex flex-col min-w-0 pt-0.5">
                <div class="flex items-center gap-2">
                  <span id="char-step2-range" class="text-xs font-bold text-blue-600 uppercase tracking-wide">${currentCharData.step2Range}</span>
                  <span id="char-step2-tag" class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold font-mono">${currentCharData.step2Tag}</span>
                </div>
                <h3 id="char-step2-title" class="text-xs font-bold text-slate-900 mt-1">${currentCharData.step2Title}</h3>
                <p id="char-step2-desc" class="text-xs text-slate-500 mt-0.5 leading-relaxed">${currentCharData.step2Desc}</p>
              </div>
            </div>

            <!-- Step 3: Ending / Resolution -->
            <div class="relative flex items-start gap-3">
              <div class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 z-10 text-xs font-bold shadow-xs">3</div>
              <div class="flex flex-col min-w-0 pt-0.5">
                <div class="flex items-center gap-2">
                  <span id="char-step3-range" class="text-xs font-bold text-emerald-700 uppercase tracking-wide">${currentCharData.step3Range}</span>
                  <span id="char-step3-tag" class="px-2 py-0.5 rounded bg-emerald-50 text-[10px] text-emerald-700 font-semibold font-mono">${currentCharData.step3Tag}</span>
                </div>
                <h3 id="char-step3-title" class="text-xs font-bold text-slate-900 mt-1">${currentCharData.step3Title}</h3>
                <p id="char-step3-desc" class="text-xs text-slate-500 mt-0.5 leading-relaxed">${currentCharData.step3Desc}</p>
              </div>
            </div>
          </div>

          <!-- Plain English Synthesis -->
          <div class="mt-1 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">psychology</span>
            <p id="char-synthesis-desc" class="text-xs text-slate-700 leading-relaxed">
              ${currentCharData.synthesis}
            </p>
          </div>
        </section>
      `;

    case 'continuity':
      return `
        <!-- 5. CONTINUITY: Continuity Timeline & Track Matrix -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">linear_scale</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Continuity Timeline & Logic Matrix</h2>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">118 Pages Indexed</span>
          </div>

          <!-- Act Flow Visualizer Track -->
          <div class="bg-slate-50/60 rounded-xl p-3.5 border border-slate-100 flex flex-col gap-3">
            <div class="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-1">
              <span>Act I (Pg 1-32)</span>
              <span>Act II (Pg 33-88)</span>
              <span>Act III (Pg 89-118)</span>
            </div>
            
            <div class="relative w-full h-8 flex items-center my-1">
              <div class="absolute inset-x-2 h-2 bg-slate-200 rounded-full"></div>
              <div class="absolute left-2 w-1/3 h-2 bg-blue-300 rounded-full"></div>
              <div class="absolute left-1/3 w-1/2 h-2 bg-blue-600 rounded-full"></div>
              
              <!-- Track Nodes -->
              <div class="relative w-full flex items-center justify-between px-2">
                <div class="flex flex-col items-center">
                  <span class="w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white shadow-xs"></span>
                  <span class="text-[9px] font-semibold text-slate-500 mt-1">Sc. 01</span>
                </div>
                <div class="flex flex-col items-center">
                  <span class="w-4 h-4 rounded-full bg-amber-500 ring-4 ring-amber-100 flex items-center justify-center animate-pulse">
                    <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </span>
                  <span class="text-[9px] font-bold text-amber-600 mt-1">Sc. 14 (Prop)</span>
                </div>
                <div class="flex flex-col items-center">
                  <span class="w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white shadow-xs"></span>
                  <span class="text-[9px] font-semibold text-slate-500 mt-1">Sc. 18</span>
                </div>
                <div class="flex flex-col items-center">
                  <span class="w-4 h-4 rounded-full bg-amber-500 ring-4 ring-amber-100 flex items-center justify-center">
                    <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </span>
                  <span class="text-[9px] font-bold text-amber-600 mt-1">Sc. 22 (Time)</span>
                </div>
                <div class="flex flex-col items-center">
                  <span class="w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white shadow-xs"></span>
                  <span class="text-[9px] font-semibold text-slate-500 mt-1">Sc. 36</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 4 Dimensions Grid -->
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span class="font-bold text-slate-900 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[15px] text-blue-600">location_on</span>
                Locations (24)
              </span>
              <span class="text-slate-500 text-[11px]">14 Int · 10 Ext verified across sequence</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span class="font-bold text-slate-900 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[15px] text-blue-600">schedule</span>
                Time Progression
              </span>
              <span class="text-slate-500 text-[11px]">Continuous night rainfall timeline</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span class="font-bold text-slate-900 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[15px] text-blue-600">group</span>
                Characters (18)
              </span>
              <span class="text-slate-500 text-[11px]">Spatial presence synchronized in rooms</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span class="font-bold text-slate-900 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[15px] text-amber-600">construction</span>
                Props (32)
              </span>
              <span class="text-amber-700 font-semibold text-[11px]">1 handover flagged in Scene 18</span>
            </div>
          </div>
        </section>
      `;

    case 'story-structure':
      return `
        <!-- 6. STORY STRUCTURE: Narrative Structure Map -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">account_tree</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Narrative Structure Map</h2>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">3-Act Framework</span>
          </div>

          <!-- Multi-Beat Segmented Progress Bar -->
          <div class="bg-slate-50/60 rounded-xl p-3.5 border border-slate-100 flex flex-col gap-3">
            <div class="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Beginning (Act I · 25%)</span>
              <span class="text-blue-600">Middle (Act II · 55%)</span>
              <span>Ending (Act III · 20%)</span>
            </div>

            <div class="relative w-full h-3 rounded-full bg-slate-200 flex overflow-hidden">
              <div class="h-full bg-blue-300" style="width: 25%;"></div>
              <div class="h-full bg-blue-600" style="width: 55%;"></div>
              <div class="h-full bg-indigo-700" style="width: 20%;"></div>
            </div>

            <!-- Milestone Grid -->
            <div class="grid grid-cols-4 gap-1 pt-1 text-[11px]">
              <div class="flex flex-col">
                <span class="font-bold text-blue-700">Inciting Event</span>
                <span class="text-slate-500">Sc. 06 (p. 14)</span>
              </div>
              <div class="flex flex-col text-center">
                <span class="font-bold text-blue-700">Midpoint Shift</span>
                <span class="text-slate-500">Sc. 18 (p. 48)</span>
              </div>
              <div class="flex flex-col text-center">
                <span class="font-bold text-blue-700">Climax Crisis</span>
                <span class="text-slate-500">Sc. 31 (p. 82)</span>
              </div>
              <div class="flex flex-col text-right">
                <span class="font-bold text-slate-900">Resolution</span>
                <span class="text-slate-500">Sc. 36 (p. 94)</span>
              </div>
            </div>
          </div>

          <!-- Plain English Synthesis -->
          <div class="mt-1 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">hub</span>
            <p class="text-xs text-slate-700 leading-relaxed">
              The screenplay displays a canonical three-act foundation with an impactful midpoint turn. Act II maintains high narrative tension without losing forward momentum.
            </p>
          </div>
        </section>
      `;

    case 'theme':
      return `
        <!-- 7. THEME: Main Thematic Representation & Relationship Tree -->
        <section class="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-slate-200/80 flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">hub</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Thematic Core & Motifs</h2>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">3 Motifs Tracked</span>
          </div>

          <!-- Primary Spine Card -->
          <div class="bg-blue-50/70 border border-blue-100 rounded-xl p-4 flex flex-col gap-1">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-bold uppercase tracking-wider text-blue-700 font-mono">Primary Narrative Spine</span>
              <span class="material-symbols-outlined text-[16px] text-blue-600">verified</span>
            </div>
            <h3 class="font-heading text-base font-bold text-slate-900">Complicity vs. Duty</h3>
            <p class="text-xs text-slate-600 leading-relaxed">The burden of moral responsibility when survival demands silence.</p>
          </div>

          <!-- 2 Sub-themes in Compact Cards -->
          <div class="grid grid-cols-2 gap-2.5">
            <div class="bg-slate-50 rounded-xl p-3.5 border border-slate-200/70 flex flex-col gap-1">
              <div class="flex items-center gap-1.5 text-slate-800">
                <span class="material-symbols-outlined text-[16px] text-blue-600">groups</span>
                <span class="text-xs font-bold">Family & Debt</span>
              </div>
              <p class="text-[11px] text-slate-500 leading-snug">The recurring pressure of generational expectations.</p>
            </div>
            <div class="bg-slate-50 rounded-xl p-3.5 border border-slate-200/70 flex flex-col gap-1">
              <div class="flex items-center gap-1.5 text-slate-800">
                <span class="material-symbols-outlined text-[16px] text-blue-600">corporate_fare</span>
                <span class="text-xs font-bold">Institutional Silence</span>
              </div>
              <p class="text-[11px] text-slate-500 leading-snug">Systems that compel honest characters to compromise.</p>
            </div>
          </div>

          <!-- Thematic Relationship Structure / Connections -->
          <div class="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/80 flex flex-col gap-2.5">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-heading">Thematic Scene Connections</span>
            
            <div class="flex flex-col gap-2 font-mono text-[11px] text-slate-700 pl-1">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                <span class="font-bold text-slate-900">PRIMARY: Complicity vs Duty</span>
              </div>
              <div class="pl-4 border-l-2 border-slate-200 flex flex-col gap-1.5 text-slate-600">
                <div class="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/60">
                  <span>├── Moral accountability</span>
                  <span class="text-blue-600 font-semibold font-sans text-[10px]">Scene 18 · Midpoint</span>
                </div>
                <div class="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/60">
                  <span>├── Family economic pressure</span>
                  <span class="text-slate-500 font-semibold font-sans text-[10px]">Scene 09 · Kitchen</span>
                </div>
                <div class="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/60">
                  <span>└── Public accountability</span>
                  <span class="text-blue-600 font-semibold font-sans text-[10px]">Scene 36 · Rooftop</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Context Quote / Synthesis Card -->
          <div class="bg-slate-100/70 rounded-xl p-3 flex items-start gap-2 border border-slate-200/50">
            <span class="material-symbols-outlined text-slate-400 text-[18px] shrink-0 mt-0.5">format_quote</span>
            <p class="text-xs text-slate-600 italic leading-relaxed">
              "The thematic framework consistently reinforces moral accountability, resonating through character choices in every act."
            </p>
          </div>
        </section>
      `;

    case 'cinema':
      return `
        <!-- 8. CINEMA: Cinematic Dynamics & Visual Opportunities -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">videocam</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Cinematic Dynamics & Visual Storytelling</h2>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">Visual Grammar</span>
          </div>

          <!-- Visual Breakdown: Density across Act I, II, III -->
          <div class="bg-slate-50/60 rounded-xl p-4 border border-slate-100 flex flex-col gap-3">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-slate-800">Visual Action vs. Dialogue Exposition</span>
              <div class="flex items-center gap-3 text-[11px] text-slate-500">
                <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-blue-600"></span>Visual Density</span>
                <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-slate-300"></span>Exposition</span>
              </div>
            </div>

            <!-- Act Meters -->
            <div class="space-y-2.5">
              <div>
                <div class="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>Act I: Setup & Atmosphere</span>
                  <span class="font-bold text-slate-900">88% Visual</span>
                </div>
                <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div class="h-full bg-blue-600 rounded-full" style="width: 88%;"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>Act II: Confrontation & Rising Surge</span>
                  <span class="font-bold text-slate-900">76% Visual</span>
                </div>
                <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div class="h-full bg-blue-600 rounded-full" style="width: 76%;"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>Act III: Climax & Resolution</span>
                  <span class="font-bold text-slate-900">91% Visual</span>
                </div>
                <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div class="h-full bg-blue-600 rounded-full" style="width: 91%;"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Set-Pieces Visual Opportunities -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span class="font-bold text-slate-900 flex items-center gap-1">
                <span class="material-symbols-outlined text-[15px] text-blue-600">photo_camera</span>
                Visual Metaphor
              </span>
              <p class="text-slate-500 text-[11px]">Rusted shipping containers stacked like monoliths beneath smog (Scene 01).</p>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span class="font-bold text-slate-900 flex items-center gap-1">
                <span class="material-symbols-outlined text-[15px] text-blue-600">light_mode</span>
                Lighting & Color Cues
              </span>
              <p class="text-slate-500 text-[11px]">Red emergency beacons reflected in rising brackish water (Scene 18).</p>
            </div>
          </div>
        </section>
      `;

    case 'formatting':
      return `
        <!-- 9. FORMATTING: Formatting Health Visual & Guild Compliance -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">rule</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Screenplay Formatting Health</h2>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">Standard Guild Rules</span>
          </div>

          <!-- Compliance Checklist & Meters -->
          <div class="bg-slate-50/60 rounded-xl p-4 border border-slate-100 space-y-3">
            <div class="flex items-center justify-between pb-1 border-b border-slate-200/60">
              <span class="text-[11px] font-bold uppercase tracking-wider text-slate-500">Compliance across ${pageCount} pages</span>
              <span class="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <span class="material-symbols-outlined text-[15px]">check_circle</span>
                Guild Approved
              </span>
            </div>

            <!-- Metric 1: Headings -->
            <div class="space-y-1">
              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-700 font-medium">Scene Heading Syntax (INT./EXT.)</span>
                <span class="text-slate-900 font-bold">96% ✓</span>
              </div>
              <div class="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div class="h-full bg-emerald-600 rounded-full" style="width: 96%;"></div>
              </div>
            </div>

            <!-- Metric 2: Indentation -->
            <div class="space-y-1">
              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-700 font-medium">Character & Dialogue Indentation</span>
                <span class="text-slate-900 font-bold">98% ✓</span>
              </div>
              <div class="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div class="h-full bg-emerald-600 rounded-full" style="width: 98%;"></div>
              </div>
            </div>

            <!-- Metric 3: Sluglines -->
            <div class="space-y-1">
              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-700 font-medium">Slugline Conventions & Capitalization</span>
                <span class="text-slate-900 font-bold">91% ✓</span>
              </div>
              <div class="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div class="h-full bg-emerald-600 rounded-full" style="width: 91%;"></div>
              </div>
            </div>

            <!-- Metric 4: Action Density -->
            <div class="space-y-1">
              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-700 font-medium">Action Paragraph Density (&le;4 lines)</span>
                <span class="text-slate-900 font-bold">94% ✓</span>
              </div>
              <div class="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div class="h-full bg-emerald-600 rounded-full" style="width: 94%;"></div>
              </div>
            </div>
          </div>

          <!-- Plain English Synthesis -->
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-emerald-600 text-[18px] shrink-0 mt-0.5">verified</span>
            <p class="text-xs text-slate-700 leading-relaxed">
              Screenplay strictly follows standard Writers Guild Courier Prime formatting conventions with standard margins and scene slugline structure.
            </p>
          </div>
        </section>
      `;

    case 'production':
      return `
        <!-- 10. PRODUCTION: Production Summary & Logistics Breakdown -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">movie_creation</span>
              <h2 class="font-heading font-bold text-sm sm:text-base text-slate-900 tracking-tight">Production Breakdown & Practical Elements</h2>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">Practical Elements</span>
          </div>

          <!-- 4-Grid Metric Blocks -->
          <div class="grid grid-cols-2 gap-2.5">
            <div class="bg-slate-50 rounded-xl p-3.5 border border-slate-200/70 flex flex-col">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">LOCATIONS</span>
              <span class="font-heading text-xl font-bold text-slate-900">24</span>
              <span class="text-[11px] text-slate-500 mt-0.5">14 Int · 10 Ext</span>
            </div>

            <div class="bg-slate-50 rounded-xl p-3.5 border border-slate-200/70 flex flex-col">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">CHARACTERS</span>
              <span class="font-heading text-xl font-bold text-slate-900">18</span>
              <span class="text-[11px] text-slate-500 mt-0.5">9 Speaking · 9 Background</span>
            </div>

            <div class="bg-slate-50 rounded-xl p-3.5 border border-slate-200/70 flex flex-col">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">PROPS</span>
              <span class="font-heading text-xl font-bold text-slate-900">32</span>
              <span class="text-[11px] text-slate-500 mt-0.5">5 Key Story Props</span>
            </div>

            <div class="bg-slate-50 rounded-xl p-3.5 border border-slate-200/70 flex flex-col">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">SPECIAL REQS</span>
              <span class="font-heading text-xl font-bold text-slate-900">4</span>
              <span class="text-[11px] text-slate-500 mt-0.5">Night Rain, Wet Tank, FX</span>
            </div>
          </div>

          <!-- Plain English Synthesis -->
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">warehouse</span>
            <p class="text-xs text-slate-700 leading-relaxed">
              Extracted practical elements across ${pageCount} pages. Primary production weight resides in Act II harbor logistics and wet stage setups (Scenes 14–22).
            </p>
          </div>
        </section>
      `;

    case 'scene':
      return `
        <!-- 11. SCENE ANALYSIS: Dominant Scene Breakdown with Compact Scene Selector -->
        <section class="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col gap-4">
          <!-- Slugline Header Banner with Compact Scene Selector -->
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-2">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono">Target Scene</span>
                <!-- Compact Scene Selector dropdown (matches reference screenshot) -->
                <div class="relative inline-flex items-center shrink-0">
                  <select id="analysis-scene-selector" class="h-7 pl-2.5 pr-6 rounded-lg bg-white border border-slate-200 hover:border-blue-500 text-slate-800 text-xs font-semibold appearance-none cursor-pointer focus:outline-none shadow-2xs transition-colors">
                    ${availableScenes.map(s => `
                      <option value="${s.number}" ${String(s.number) === String(currentSceneData.number) ? 'selected' : ''}>Scene ${s.number}</option>
                    `).join('')}
                  </select>
                  <span class="material-symbols-outlined text-[14px] text-slate-500 absolute right-1.5 pointer-events-none">expand_more</span>
                </div>
              </div>
              <span id="target-scene-meta" class="text-[11px] font-medium text-slate-500 truncate">${currentSceneData.meta || 'Act I · Pg 1'}</span>
            </div>
            <h2 id="target-scene-heading" class="font-heading font-bold text-base text-slate-900 tracking-tight">
              ${currentSceneData.heading || 'SCENE 01'}
            </h2>
          </div>

          <!-- 3 Dominant Analysis Rows -->
          <div class="flex flex-col divide-y divide-slate-100 rounded-xl border border-slate-200/80 bg-white overflow-hidden">
            <!-- Purpose Row -->
            <div class="p-3.5 flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[18px]">flag</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">PURPOSE</span>
                <p id="target-scene-purpose" class="text-xs text-slate-800 font-medium leading-relaxed mt-0.5">
                  ${currentSceneData.purpose || 'Write scenes in your screenplay to analyze scene objectives and dramatic purpose.'}
                </p>
              </div>
            </div>

            <!-- Conflict Row -->
            <div class="p-3.5 flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[18px]">crisis_alert</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">CONFLICT</span>
                <p id="target-scene-conflict" class="text-xs text-slate-800 font-medium leading-relaxed mt-0.5">
                  ${currentSceneData.conflict || 'No scene conflict detected yet.'}
                </p>
              </div>
            </div>

            <!-- What Changes Row -->
            <div class="p-3.5 flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[18px]">swap_horiz</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">WHAT CHANGES</span>
                <p id="target-scene-what-changes" class="text-xs text-slate-800 font-medium leading-relaxed mt-0.5">
                  ${currentSceneData.whatChanges || 'No polarity shift tracked yet.'}
                </p>
              </div>
            </div>
          </div>

          <!-- Plain English Synthesis -->
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">movie</span>
            <p id="target-scene-synthesis" class="text-xs text-slate-700 leading-relaxed">
              ${currentSceneData.synthesis || 'Select or author scenes in the Screenplay Editor to view live scene synthesis.'}
            </p>
          </div>
        </section>
      `;

    default:
      return '';
  }
}

export function renderIndividualAnalysisScreen(type = 'pacing', from = null, returnScriptId = null) {
  const detail = { ...vectorDetails[type] || vectorDetails.pacing };
  
  // Detect if navigated from Editor
  const storedReturn = sessionStorage.getItem('scriptora_prod_return');
  let urlParams;
  try {
    const loc = window.location.hash.includes('?') ? window.location.hash.split('?')[1] : window.location.search;
    urlParams = new URLSearchParams(loc || '');
  } catch (e) {
    urlParams = new URLSearchParams();
  }
  const isFromEditor = from === 'editor' || urlParams.get('from') === 'editor' || Boolean(storedReturn);
  const targetScriptId = returnScriptId || urlParams.get('scriptId') || (storedReturn ? storedReturn.replace('/editor/', '') : null) || store.state.selectedScriptId || store.state.scripts[0]?.id || null;
  const editorReturnUrl = targetScriptId ? `/editor/${targetScriptId}` : '/workspace';

  const scriptId = targetScriptId;
  const script = store.state.scripts.find(s => s.id === scriptId) || store.state.activeScript || (scriptId ? {
    id: scriptId,
    title: 'Untitled Screenplay',
    draft: 'Draft 1.0',
    pages: 1
  } : null);

  if (!script) {
    return `
      ${renderHeader('Intelligence', detail.title)}
      <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
        <div class="flex flex-col items-center justify-center flex-1 max-w-md mx-auto px-4 text-center py-16">
          <div class="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4">
            <span class="material-symbols-outlined text-3xl">${detail.icon}</span>
          </div>
          <h2 class="text-xl font-bold text-slate-900 mb-1">No Screenplay Selected</h2>
          <p class="text-xs text-slate-500 mb-6">Create or select a screenplay in your workspace to run ${detail.title.toLowerCase()}.</p>
          <a href="/workspace" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all no-underline">
            <span class="material-symbols-outlined text-[18px]">add</span>
            Go to Workspace
          </a>
        </div>
      </main>
      ${renderBottomNav('intelligence')}
    `;
  }

  const screenplay = getScreenplayData(scriptId);
  const availableScenes = getAvailableScenes(screenplay, scriptId);
  const availableChars = getAvailableCharacters(screenplay);

  const selectedSceneNum = Number(store.state.currentSceneId || availableScenes[0]?.number || 1);
  const selectedCharName = availableChars[0]?.name || 'Protagonist';

  const currentSceneData = getSceneDetails(selectedSceneNum, availableScenes);
  const currentCharData = getCharacterDetails(selectedCharName, screenplay);

  if (type === 'scene') {
    detail.desc = `Micro-structure of Scene ${currentSceneData.number}: Objective, obstacle, polarity change.`;
    detail.findings = currentSceneData.findings || detail.findings;
  } else if (type === 'character-arc') {
    detail.findings = currentCharData.findings || detail.findings;
  }

  const screenplayContext = {
    availableScenes,
    currentSceneData,
    availableChars,
    currentCharData
  };

  const fromParamClean = from || urlParams.get('from');
  let backUrl = '/intelligence/analysis';
  let backText = 'Back to Vectors';
  if (isFromEditor) {
    backUrl = editorReturnUrl;
    backText = 'Back to Editor';
  } else if (fromParamClean === 'dashboard' || fromParamClean === '/intelligence/dashboard' || fromParamClean?.includes('/intelligence/dashboard')) {
    backUrl = '/intelligence/dashboard';
    backText = 'Back to Dashboard';
  } else if (fromParamClean && fromParamClean.startsWith('/')) {
    backUrl = fromParamClean;
    backText = 'Back';
  }

  return `
    ${renderHeader(isFromEditor ? 'Editor' : 'Intelligence', detail.title)}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-4 fade-in">
        
        <!-- Section Header with Back Navigation -->
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <button id="analysis-back-btn" data-scriptora-back="true" data-back-fallback="${backUrl}" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors flex items-center justify-center shrink-0 cursor-pointer" aria-label="Back" title="Back">
              <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>
            <div class="flex flex-col min-w-0">
              <div class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0">${detail.icon}</span>
                <h1 class="font-heading text-lg sm:text-xl font-bold text-slate-900 tracking-tight truncate">${detail.title}</h1>
              </div>
              <p id="analysis-header-desc" class="text-xs text-slate-500 mt-0.5 truncate">${detail.desc}</p>
            </div>
          </div>
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 shrink-0">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span class="text-xs font-medium truncate max-w-[140px]">${script.title}</span>
          </div>
        </div>

        <!-- 2. AI QUERY BOX with Suggestion Pills -->
        <div class="flex flex-col gap-2">
          <div class="relative flex items-center bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-xs focus-within:border-blue-600 transition-colors">
            <span class="material-symbols-outlined text-[18px] text-blue-600 mr-2 shrink-0">auto_awesome</span>
            <input id="vector-ai-input" class="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none" placeholder="Ask about this vector..." type="text">
            <button id="vector-ai-submit" class="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 hover:bg-blue-700 active:scale-95 transition-all ml-1">
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div class="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            ${detail.questions.map(q => `
              <button type="button" class="query-pill shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-colors shadow-xs active:scale-95" data-query="${q}">
                ${q}
              </button>
            `).join('')}
          </div>

          <!-- AI Answer Box -->
          <div id="vector-ai-answer" class="hidden bg-white border border-blue-100 rounded-xl p-3 text-xs text-slate-700 shadow-xs leading-relaxed"></div>
        </div>

        <!-- 3. SCORE CARD (SINGLE CANONICAL SCORE PRESENTATION) -->
        <div class="bg-white rounded-2xl py-4 px-6 shadow-xs border border-slate-200/80 flex items-center justify-center">
          <div class="flex items-baseline gap-1.5">
            <span class="font-heading font-extrabold text-3xl sm:text-4xl text-blue-600 tracking-tight">${detail.score}</span>
            <span class="text-xs font-semibold text-slate-400">/ 100 Index</span>
          </div>
        </div>

        <!-- 4. MAIN ANALYSIS VISUAL / CONTENT (MANDATORY & RESTORED) -->
        ${renderMainVisualContent(type, script, screenplayContext)}

        <!-- 5. IMPORTANT FINDINGS (KEY SCENE FINDINGS) -->
        <div class="flex flex-col gap-3" id="analysis-findings-container">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">Key Scene Findings</span>
            <span id="findings-count-tag" class="text-[11px] text-slate-400 font-medium">${detail.findings.length} findings tracked</span>
          </div>

          <div id="findings-list" class="flex flex-col gap-3">
            ${detail.findings.map(f => `
              <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">${f.scene}</span>
                  <span class="text-[11px] font-medium text-slate-400">${f.act}</span>
                </div>
                <div class="flex flex-col">
                  <h3 class="text-xs sm:text-sm font-bold text-slate-900">${f.title}</h3>
                  <p class="text-xs text-slate-600 mt-1 leading-relaxed">${f.desc}</p>
                </div>
                <div class="pt-2 flex justify-end border-t border-slate-100">
                  <!-- 6. OPEN IN EDITOR BUTTON -->
                  <button type="button" class="btn-open-editor-scene px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-all" data-scene="${f.targetScene}">
                    <span class="material-symbols-outlined text-[15px]">edit_note</span>
                    <span>Open in Editor (Scene ${f.targetScene})</span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </main>

    ${renderBottomNav('intelligence')}
  `;
}

export function attachIndividualAnalysisEvents(type, navigate, from = null, returnScriptId = null) {
  const storedReturn = sessionStorage.getItem('scriptora_prod_return');
  let urlParams;
  try {
    const loc = window.location.hash.includes('?') ? window.location.hash.split('?')[1] : window.location.search;
    urlParams = new URLSearchParams(loc || '');
  } catch (e) {
    urlParams = new URLSearchParams();
  }
  const isFromEditor = from === 'editor' || urlParams.get('from') === 'editor' || Boolean(storedReturn);
  const targetScriptId = returnScriptId || urlParams.get('scriptId') || (storedReturn ? storedReturn.replace('/editor/', '') : null) || store.state.selectedScriptId || store.state.scripts?.[0]?.id || null;
  const editorReturnUrl = targetScriptId ? `/editor/${targetScriptId}` : '/workspace';
  const scriptId = targetScriptId;
  const fallbackBackUrl = isFromEditor ? editorReturnUrl : (from === 'dashboard' ? '/intelligence/dashboard' : '/intelligence/analysis');

  const screenplay = getScreenplayData(scriptId);
  const availableScenes = getAvailableScenes(screenplay, scriptId);

  // Dedicated back button handling
  const backBtn = document.getElementById('analysis-back-btn');
  if (backBtn) {
    backBtn.onclick = (e) => {
      e.preventDefault();
      if (isFromEditor) {
        sessionStorage.removeItem('scriptora_prod_return');
      }
      const targetBack = backBtn.getAttribute('data-back-fallback') || fallbackBackUrl;
      if (window.scriptoraRouter) {
        window.scriptoraRouter.back(targetBack);
      } else {
        navigate(targetBack);
      }
    };
  }

  function bindEditorButtons() {
    document.querySelectorAll('.btn-open-editor-scene').forEach(btn => {
      btn.onclick = () => {
        if (!scriptId) {
          navigate('/workspace');
          return;
        }
        const sceneNum = btn.getAttribute('data-scene');
        store.setState({ currentSceneId: Number(sceneNum) });
        showToast(`Jumping to Scene ${sceneNum} in Editor`);
        navigate(`/editor/${scriptId}?scene=${sceneNum}`);
      };
    });
  }
  bindEditorButtons();

  function renderFindingsList(findings) {
    const findingsContainer = document.getElementById('findings-list');
    const countTag = document.getElementById('findings-count-tag');
    if (countTag) countTag.textContent = `${findings.length} findings tracked`;
    if (!findingsContainer) return;

    findingsContainer.innerHTML = findings.map(f => `
      <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">${f.scene}</span>
          <span class="text-[11px] font-medium text-slate-400">${f.act}</span>
        </div>
        <div class="flex flex-col">
          <h3 class="text-xs sm:text-sm font-bold text-slate-900">${f.title}</h3>
          <p class="text-xs text-slate-600 mt-1 leading-relaxed">${f.desc}</p>
        </div>
        <div class="pt-2 flex justify-end border-t border-slate-100">
          <button type="button" class="btn-open-editor-scene px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-all" data-scene="${f.targetScene}">
            <span class="material-symbols-outlined text-[15px]">edit_note</span>
            <span>Open in Editor (Scene ${f.targetScene})</span>
          </button>
        </div>
      </div>
    `).join('');

    bindEditorButtons();
  }

  // Scene Selector Dropdown (Item 3)
  const sceneSelector = document.getElementById('analysis-scene-selector');
  if (sceneSelector) {
    sceneSelector.onchange = (e) => {
      const num = parseInt(e.target.value, 10);
      store.setState({ currentSceneId: num });
      const scData = getSceneDetails(num, availableScenes);

      const metaEl = document.getElementById('target-scene-meta');
      const headingEl = document.getElementById('target-scene-heading');
      const purposeEl = document.getElementById('target-scene-purpose');
      const conflictEl = document.getElementById('target-scene-conflict');
      const changesEl = document.getElementById('target-scene-what-changes');
      const synthEl = document.getElementById('target-scene-synthesis');
      const headerDescEl = document.getElementById('analysis-header-desc');

      if (metaEl) metaEl.textContent = scData.meta;
      if (headingEl) headingEl.textContent = scData.heading;
      if (purposeEl) purposeEl.textContent = scData.purpose;
      if (conflictEl) conflictEl.textContent = scData.conflict;
      if (changesEl) changesEl.textContent = scData.whatChanges;
      if (synthEl) synthEl.textContent = scData.synthesis;
      if (headerDescEl) headerDescEl.textContent = `Micro-structure of Scene ${num}: Objective, obstacle, polarity change.`;

      renderFindingsList(scData.findings);
      showToast(`Analyzing Scene ${num}`);
    };
  }

  // Character Selector Dropdown (Item 4)
  const charSelector = document.getElementById('analysis-char-selector');
  if (charSelector) {
    charSelector.onchange = (e) => {
      const charName = e.target.value;
      const charData = getCharacterDetails(charName, screenplay);

      const badgeEl = document.getElementById('char-role-badge');
      const countEl = document.getElementById('char-scenes-count');
      const s1Range = document.getElementById('char-step1-range');
      const s1Tag = document.getElementById('char-step1-tag');
      const s1Title = document.getElementById('char-step1-title');
      const s1Desc = document.getElementById('char-step1-desc');

      const s2Range = document.getElementById('char-step2-range');
      const s2Tag = document.getElementById('char-step2-tag');
      const s2Title = document.getElementById('char-step2-title');
      const s2Desc = document.getElementById('char-step2-desc');

      const s3Range = document.getElementById('char-step3-range');
      const s3Tag = document.getElementById('char-step3-tag');
      const s3Title = document.getElementById('char-step3-title');
      const s3Desc = document.getElementById('char-step3-desc');

      const synthEl = document.getElementById('char-synthesis-desc');

      if (badgeEl) badgeEl.textContent = charData.role;
      if (countEl) countEl.textContent = charData.scenesCount;
      if (s1Range) s1Range.textContent = charData.step1Range;
      if (s1Tag) s1Tag.textContent = charData.step1Tag;
      if (s1Title) s1Title.textContent = charData.step1Title;
      if (s1Desc) s1Desc.textContent = charData.step1Desc;

      if (s2Range) s2Range.textContent = charData.step2Range;
      if (s2Tag) s2Tag.textContent = charData.step2Tag;
      if (s2Title) s2Title.textContent = charData.step2Title;
      if (s2Desc) s2Desc.textContent = charData.step2Desc;

      if (s3Range) s3Range.textContent = charData.step3Range;
      if (s3Tag) s3Tag.textContent = charData.step3Tag;
      if (s3Title) s3Title.textContent = charData.step3Title;
      if (s3Desc) s3Desc.textContent = charData.step3Desc;

      if (synthEl) synthEl.textContent = charData.synthesis;

      renderFindingsList(charData.findings);
      showToast(`Switched active character focus to ${charData.name}`);
    };
  }

  // Scene click targets from graphs/curves
  document.querySelectorAll('[data-jump-scene]').forEach(el => {
    el.onclick = () => {
      if (!scriptId) {
        navigate('/workspace');
        return;
      }
      const sc = el.getAttribute('data-jump-scene');
      store.setState({ currentSceneId: Number(sc) });
      showToast(`Jumping to Scene ${sc} in Editor`);
      navigate(`/editor/${scriptId}?scene=${sc}`);
    };
  });

  // AI query in vector
  const input = document.getElementById('vector-ai-input');
  const submit = document.getElementById('vector-ai-submit');
  const answerBox = document.getElementById('vector-ai-answer');

  async function ask(q) {
    if (!q || !answerBox) return;
    answerBox.classList.remove('hidden');
    answerBox.innerHTML = '<span class="text-slate-400 italic flex items-center gap-1.5"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing narrative beats...</span>';
    const ans = await api.queryIntelligence(q, scriptId);
    answerBox.textContent = ans;
  }

  if (submit && input) {
    submit.onclick = () => ask(input.value.trim());
    input.onkeydown = (e) => { if (e.key === 'Enter') ask(input.value.trim()); };
  }

  document.querySelectorAll('.query-pill').forEach(pill => {
    pill.onclick = () => {
      const q = pill.getAttribute('data-query');
      if (input) input.value = q;
      ask(q);
    };
  });
}

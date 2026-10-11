import { renderHeader } from '../components/header.js';
import { renderBottomNav } from '../components/bottomNav.js';
import { store } from '../state/store.js';
import * as api from '../services/api.js';
import { showToast } from '../components/toast.js';

export const vectorDetails = {
  pacing: {
    title: 'Pacing Analysis',
    score: 82,
    icon: 'speed',
    desc: 'Scene duration variance, narrative tempo and page-turn velocity.',
    questions: ['Where does the pace drag in Act II?', 'Find scenes over 4 pages', 'Show action-to-dialogue ratios'],
    findings: [
      { scene: 'SCENE 14 · Dockside Perimeter · Pg 36', act: 'Act II', title: 'Action beats slow down before major confrontation', desc: 'Extended exposition between dock guards lowers tension prior to container breach.', targetScene: 14 },
      { scene: 'SCENE 18 · Customs Office · Pg 48', act: 'Act II Midpoint', title: 'Peak narrative rhythm', desc: 'Fast intercut dialogue creates maximum urgency before floodgate breach.', targetScene: 18 },
      { scene: 'SCENE 26 · Coastal Highway · Pg 68', act: 'Act III', title: 'High velocity turning point', desc: 'Pursuit cadence maintains optimal beats per page.', targetScene: 26 }
    ]
  },
  dialogue: {
    title: 'Dialogue Analysis',
    score: 89,
    icon: 'chat',
    desc: 'Cadence, subtext density, distinctive character voice profiles.',
    questions: ['Are character voices distinctive?', 'Find on-the-nose exposition lines', 'Analyze dialogue subtext in Scene 18'],
    findings: [
      { scene: 'SCENE 08 · Waterfront Diner · Pg 19', act: 'Act I', title: 'Subtext is understated and powerful', desc: 'Kevin avoids speaking about his brother directly, communicating through silence and tea rituals.', targetScene: 8 },
      { scene: 'SCENE 18 · Customs Office · Pg 48', act: 'Act II', title: 'Meera O.S. dialogue establishes authority', desc: 'Radio chatter avoids fluff and communicates technical stakes concisely.', targetScene: 18 }
    ]
  },
  emotion: {
    title: 'Emotion Analysis',
    score: 91,
    icon: 'favorite',
    desc: 'Catharsis trajectory, emotional resonance curves, character empathy indices.',
    questions: ['Where does emotional vulnerability peak?', 'Track empathy trajectory for Kevin', 'Catharsis resolution in Act III'],
    findings: [
      { scene: 'SCENE 12 · Father’s Workshop · Pg 28', act: 'Act I', title: 'Emotional anchor established', desc: 'Familial debt and generational sacrifice ground Kevin’s reluctance to blow the whistle.', targetScene: 12 },
      { scene: 'SCENE 18 · Customs Office · Pg 48', act: 'Act II', title: 'Desperation under rising water', desc: 'Kevin’s fear of failing Meera is palpable as water rises past junction box.', targetScene: 18 }
    ]
  },
  'character-arc': {
    title: 'Character Arc Analysis',
    score: 84,
    icon: 'alt_route',
    desc: 'Want vs. Need conflict, psychological transformation, fatal flaw resolution.',
    questions: ['Does Kevin overcome his passivity?', 'Meera character transformation', 'Antagonist motivation clarity'],
    findings: [
      { scene: 'SCENE 04 · Port Audit Room · Pg 09', act: 'Act I', title: 'Fatal Flaw: Silent Compliance', desc: 'Kevin stamps irregular cargo manifests to keep peace with union superiors.', targetScene: 4 },
      { scene: 'SCENE 18 · Customs Office · Pg 48', act: 'Act II', title: 'The Point of No Return', desc: 'Kevin cuts the emergency seal, consciously choosing rebellion over survival.', targetScene: 18 }
    ]
  },
  continuity: {
    title: 'Continuity Analysis',
    score: 78,
    icon: 'linear_scale',
    desc: 'Prop tracking, character spatial locations, timeline consistency checks.',
    questions: ['Check prop handover in Scene 18', 'Is time of day consistent across Act II?', 'Track the brass seal location'],
    findings: [
      { scene: 'SCENE 18 · Customs Office · Pg 48', act: 'Act II', title: 'Hydro-sensor probe referenced before retrieval', desc: 'Verify Kevin picked up copper probe in Scene 16 or carries it on belt.', targetScene: 18 },
      { scene: 'SCENE 22 · Pumping Station · Pg 58', act: 'Act II', title: 'Flashlight state discrepancy', desc: 'Ensure flashlight was retrieved after water surge in Scene 19.', targetScene: 22 }
    ]
  },
  'story-structure': {
    title: 'Story Structure Analysis',
    score: 87,
    icon: 'account_tree',
    desc: 'Inciting incident, plot points, midpoint shift, climax architecture.',
    questions: ['Is midpoint clearly defined?', 'Evaluate climax timing on page 88', 'Are 3-act beats aligned?'],
    findings: [
      { scene: 'SCENE 06 · Customs Registry · Pg 14', act: 'Inciting Incident', title: 'Off-manifest container discovered', desc: 'The inciting anomaly sets Kevin on irreversible investigative path.', targetScene: 6 },
      { scene: 'SCENE 18 · Customs Office · Pg 48', act: 'Midpoint (Pg 48/96)', title: 'Stakes escalate from civil to criminal', desc: 'Kevin realizes his own brother commands the smuggling cartel.', targetScene: 18 }
    ]
  },
  theme: {
    title: 'Theme Analysis',
    score: 90,
    icon: 'lightbulb',
    desc: 'Primary narrative spine: Complicity vs. Duty and moral accountability.',
    questions: ['What is the central theme?', 'Where is loyalty tested?', 'Show recurring thematic motifs'],
    findings: [
      { scene: 'SCENE 09 · Family Kitchen · Pg 22', act: 'Act I', title: 'Familial pressure as thematic catalyst', desc: 'Kevin hides eviction notice, showing economic desperation fueling institutional silence.', targetScene: 9 },
      { scene: 'SCENE 18 · Customs Office · Pg 48', act: 'Act II', title: 'Moral test faced directly', desc: 'Kevin must decide whether to save his brother or save the port city from flooding.', targetScene: 18 },
      { scene: 'SCENE 36 · Rooftop Overlook · Pg 94', act: 'Act III', title: 'Theme delivers its final statement', desc: 'Accountability over self-preservation.', targetScene: 36 }
    ]
  },
  cinema: {
    title: 'Cinema & Visual Storytelling',
    score: 85,
    icon: 'videocam',
    desc: 'Visual set-piece density, image systems, lighting and camera intentionality.',
    questions: ['Check visual contrast between acts', 'Highlight cinematic set-pieces', 'Analyze color palette cues in action lines'],
    findings: [
      { scene: 'SCENE 01 · Harbor Drone View · Pg 01', act: 'Act I', title: 'Strong establishing visual metaphor', desc: 'Rusted shipping containers stacked like monoliths beneath smog.', targetScene: 1 },
      { scene: 'SCENE 18 · Customs Office · Pg 48', act: 'Act II', title: 'High visual tension', desc: 'Red emergency beacons reflected in rising brackish water.', targetScene: 18 }
    ]
  },
  scene: {
    title: 'Scene Analysis',
    score: 86,
    icon: 'movie',
    desc: 'Micro-structure of Scene 18: Objective, obstacle, polarity change.',
    questions: ['What is the scene objective?', 'Where does tension peak?', 'How does polarity shift?'],
    findings: [
      { scene: 'SCENE 18 · Customs Office · Pg 48', act: 'Act II', title: 'Objective: Reroute electrical relay before surge', desc: 'Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).', targetScene: 18 }
    ]
  },
  formatting: {
    title: 'Formatting & Guild Compliance',
    score: 94,
    icon: 'rule',
    desc: 'Industry standard margin measurements, capitalization, slugline syntax.',
    questions: ['Check standard industry margins', 'Find non-standard scene sluglines', 'Verify dialogue capitalization rules'],
    findings: [
      { scene: 'SCENE 18 · Customs Office · Pg 48', act: 'Act II', title: 'Perfect Courier Prime 12pt slugline', desc: 'Margins, dual dialogue spacing, and transition tags meet Writers Guild standards.', targetScene: 18 }
    ]
  },
  production: {
    title: 'Production Breakdown',
    score: 80,
    icon: 'movie_creation',
    desc: 'Locations, shooting days, practical elements, cast size breakdown.',
    questions: ['How many practical locations?', 'Show scenes with special props', 'List one-off speaking roles'],
    findings: [
      { scene: 'SCENE 18 · Customs Office · Pg 48', act: 'Act II', title: 'Location: Wet Stage / Customs Interior', desc: 'Requires controlled water flooding tank, hydro-sensor prop box, wet comm-link gear.', targetScene: 18 }
    ]
  }
};

/**
 * Helpers to extract scenes and characters from screenplay model
 */
export function getScreenplayData(scriptId) {
  if (store.state.screenplay && store.state.screenplay.id === scriptId) {
    return store.state.screenplay;
  }
  const saved = localStorage.getItem(`scriptora_screenplay_${scriptId}`);
  if (saved) {
    try {
      const sp = JSON.parse(saved);
      if (sp && sp.scenes && sp.scenes.length > 0) return sp;
    } catch (e) {}
  }
  if (scriptId === 'chronicles-of-dust') {
    return api.CANONICAL_SCREENPLAY_CHRONICLES;
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
  } else {
    const can = api.CANONICAL_SCREENPLAY_CHRONICLES;
    can.scenes.forEach(sc => {
      scenes.push({
        id: sc.id,
        number: sc.number,
        slugline: sc.slugline || `SCENE ${sc.number}`,
        act: sc.actId === 'act-2' ? 'Act II' : 'Act I'
      });
    });
  }
  return scenes;
}

export function getAvailableCharacters(screenplay) {
  const chars = [];
  const set = new Set();

  if (screenplay) {
    (screenplay.characters || []).forEach(c => {
      const name = typeof c === 'string' ? c : (c.name || '');
      const clean = name.replace(/\(.*\)/g, '').trim();
      if (clean && clean.length >= 2) {
        const key = clean.toUpperCase();
        if (!set.has(key)) {
          set.add(key);
          chars.push({ name: clean, role: key === 'KEVIN' ? 'Protagonist' : (key === 'MEERA' ? 'Confidante' : 'Character') });
        }
      }
    });

    (screenplay.scenes || []).forEach(sc => {
      (sc.blocks || []).forEach(b => {
        if (b.type === 'character') {
          const clean = (b.content || '').replace(/\(.*\)/g, '').trim();
          if (clean && clean.length >= 2) {
            const key = clean.toUpperCase();
            if (!set.has(key)) {
              set.add(key);
              chars.push({ name: clean, role: key === 'KEVIN' ? 'Protagonist' : (key === 'MEERA' ? 'Confidante' : 'Character') });
            }
          }
        }
      });
    });
  }

  if (chars.length === 0) {
    chars.push(
      { name: 'Kevin', role: 'Protagonist' },
      { name: 'Meera', role: 'Confidante' }
    );
  }

  return chars;
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

  if (Number(sceneNum) === 18) {
    return {
      number: 18,
      heading: 'SCENE 18 · INT. CUSTOMS OFFICE - NIGHT',
      act: 'Act II Midpoint',
      page: 48,
      estMin: '3.5',
      meta: 'Act II Midpoint · Pg 48 · ~3.5 min est.',
      purpose: 'Kevin attempts to reroute the electrical relay before the surge floods the basement archives.',
      conflict: 'Rising water breaches the junction box while automated emergency flood doors trigger lockouts, trapping him inside.',
      whatChanges: 'Kevin cuts the emergency seal and refuses to sign the false manifest, irreversibly shifting from passive worker to active resistance.',
      synthesis: 'Polarity shifts from cautious optimism (+1) to catastrophic physical trap and moral awakening (-2), marking the central pivot of the screenplay.',
      findings: [
        {
          scene: 'SCENE 18 · Customs Office · Pg 48',
          act: 'Act II Midpoint',
          title: 'Objective: Reroute electrical relay before surge',
          desc: 'Begins with cautious hope, ends in desperate physical race against rising water (+ to - polarity shift).',
          targetScene: 18
        }
      ]
    };
  }

  if (Number(sceneNum) === 1) {
    return {
      number: 1,
      heading: `SCENE 01 · ${cleanSlug || 'INT. HOME - EVENING'}`,
      act: 'Act I Opening',
      page: 1,
      estMin: '2.0',
      meta: 'Act I Opening · Pg 01 · ~2.0 min est.',
      purpose: 'Establish opening character presence, environment, and initial psychological stakes.',
      conflict: 'Tension and unspoken questions between characters as unfamiliar presence breaks routine.',
      whatChanges: 'Ordinary state broken by unfamiliar arrival, creating the narrative catalyst for the journey.',
      synthesis: 'Polarity shifts from neutral calm (0) to heightened curiosity and alertness (-1), establishing the dramatic question.',
      findings: [
        {
          scene: `SCENE 01 · ${cleanSlug || 'Opening'} · Pg 01`,
          act: 'Act I Opening',
          title: 'Establish protagonist baseline and primary premise',
          desc: 'Opening visual dynamic introduces character motives before inciting conflict.',
          targetScene: 1
        }
      ]
    };
  }

  if (Number(sceneNum) === 4) {
    return {
      number: 4,
      heading: `SCENE 04 · ${cleanSlug || 'INT. PORT AUDIT ROOM - DAY'}`,
      act: 'Act I',
      page: 9,
      estMin: '2.5',
      meta: 'Act I · Pg 09 · ~2.5 min est.',
      purpose: 'Kevin audits cargo registry under pressure from superiors to overlook anomalies.',
      conflict: 'Institutional compliance vs early ethical hesitation as signatures are demanded.',
      whatChanges: 'Kevin stamps the manifest with reluctance, confirming his fatal flaw of institutional compliance.',
      synthesis: 'Polarity shifts from hesitation (0) to moral compromise (-1), establishing the internal flaw to overcome.',
      findings: [
        {
          scene: `SCENE 04 · Port Audit · Pg 09`,
          act: 'Act I',
          title: 'Fatal Flaw Demonstrated: Silent Compliance',
          desc: 'Compliant stamp creates complicity guilt that fuels later revolt.',
          targetScene: 4
        }
      ]
    };
  }

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
    synthesis: `Polarity turns decisively across the beat, transitioning the dramatic tension into the next sequence.`,
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
  const norm = (charName || 'Kevin').trim();
  const key = norm.toUpperCase();

  if (key === 'KEVIN') {
    return {
      name: 'Kevin',
      role: 'Protagonist',
      scenesCount: '48 scenes tracked',
      step1Title: 'Silent Compliance & Institutional Fear',
      step1Tag: 'Fatal Flaw',
      step1Range: 'Beginning · Scene 01–11',
      step1Desc: 'Hesitant and guarded, Kevin stamps irregular manifests to keep peace with superiors and protect familial debt.',
      step2Title: 'The Point of No Return',
      step2Tag: 'Turning Point',
      step2Range: 'Middle · Scene 18 (Midpoint)',
      step2Desc: 'Cuts the emergency floodgate seal, actively defying union directives to prevent port catastrophe.',
      step3Title: 'Selfless Moral Accountability',
      step3Tag: 'Resolution',
      step3Range: 'Ending · Scene 36–38',
      step3Desc: 'Hands over the ledger to the public audit without demanding personal immunity, completing moral transformation.',
      synthesis: 'The protagonist completes a verified 3-stage transformation: overcoming passivity at the midpoint and prioritizing moral duty over self-preservation in the climax.',
      findings: [
        { scene: 'SCENE 04 · Port Audit Room · Pg 09', act: 'Act I', title: 'Fatal Flaw: Silent Compliance', desc: 'Kevin stamps irregular cargo manifests to keep peace with union superiors.', targetScene: 4 },
        { scene: 'SCENE 18 · Customs Office · Pg 48', act: 'Act II', title: 'The Point of No Return', desc: 'Kevin cuts the emergency seal, consciously choosing rebellion over survival.', targetScene: 18 }
      ]
    };
  }

  if (key === 'MEERA') {
    return {
      name: 'Meera',
      role: 'Confidante',
      scenesCount: '22 scenes tracked',
      step1Title: 'Vigilant Skepticism & Tactical Isolation',
      step1Tag: 'Origin Stance',
      step1Range: 'Beginning · Scene 01–12',
      step1Desc: 'Operates independently along pipeline perimeters, skeptical of municipal regulators and trusting only raw field telemetry.',
      step2Title: 'Calculated Alliance Under Pressure',
      step2Tag: 'Partnership Beat',
      step2Range: 'Middle · Scene 18 (Midpoint)',
      step2Desc: 'Guides Kevin via comm-link to the breaker box, choosing to rely on his technical precision despite active security alarms.',
      step3Title: 'Vindicated Shared Resistance',
      step3Tag: 'Resolution',
      step3Range: 'Ending · Scene 36–38',
      step3Desc: 'Secures and broadcasts the telemetry leak to the public frequency, cementing alliance and exposing corporate monopoly.',
      synthesis: 'The confidante evolves from protective cynicism to trusted partnership, providing the strategic resolve that enables the protagonist to act.',
      findings: [
        { scene: 'SCENE 08 · Waterfront Diner · Pg 19', act: 'Act I', title: 'Tactical Caution & Guarded Insight', desc: 'Meera warns Kevin of private security patrols monitoring pipeline telemetry.', targetScene: 8 },
        { scene: 'SCENE 18 · Customs Office · Pg 48', act: 'Act II', title: 'Emergency Comm Guidance', desc: 'Meera coordinates the junction box bypass before automated floodgates lock.', targetScene: 18 }
      ]
    };
  }

  return {
    name: norm,
    role: 'Character',
    scenesCount: 'Screenplay Character',
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
  const pageCount = script.pages || 96;
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
                    <option value="${c.name}" ${c.name.toUpperCase() === (currentCharData.name || '').toUpperCase() ? 'selected' : ''}>${c.name} ▾</option>
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
                      <option value="${s.number}" ${String(s.number) === String(currentSceneData.number) ? 'selected' : ''}>Scene ${s.number} ▾</option>
                    `).join('')}
                  </select>
                  <span class="material-symbols-outlined text-[14px] text-slate-500 absolute right-1.5 pointer-events-none">expand_more</span>
                </div>
              </div>
              <span id="target-scene-meta" class="text-[11px] font-medium text-slate-500 truncate">${currentSceneData.meta || 'Act II Midpoint · Pg 48 · ~3.5 min est.'}</span>
            </div>
            <h2 id="target-scene-heading" class="font-heading font-bold text-base text-slate-900 tracking-tight">
              ${currentSceneData.heading || 'SCENE 18 · INT. CUSTOMS OFFICE - NIGHT'}
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
                  ${currentSceneData.purpose || 'Kevin attempts to reroute the electrical relay before the surge floods the basement archives.'}
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
                  ${currentSceneData.conflict || 'Rising water breaches the junction box while automated emergency flood doors trigger lockouts, trapping him inside.'}
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
                  ${currentSceneData.whatChanges || 'Kevin cuts the emergency seal and refuses to sign the false manifest, irreversibly shifting from passive worker to active resistance.'}
                </p>
              </div>
            </div>
          </div>

          <!-- Plain English Synthesis -->
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">movie</span>
            <p id="target-scene-synthesis" class="text-xs text-slate-700 leading-relaxed">
              ${currentSceneData.synthesis || 'Polarity shifts from cautious optimism (+1) to catastrophic physical trap and moral awakening (-2), marking the central pivot of the screenplay.'}
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
  const targetScriptId = returnScriptId || urlParams.get('scriptId') || (storedReturn ? storedReturn.replace('/editor/', '') : null) || store.state.selectedScriptId || 'chronicles-of-dust';
  const editorReturnUrl = `/editor/${targetScriptId}`;

  const scriptId = targetScriptId;
  const script = store.state.scripts.find(s => s.id === scriptId) || store.state.activeScript || {
    id: scriptId,
    title: 'Chronicles of Dust',
    draft: 'Draft 4.2',
    pages: 96
  };

  const screenplay = getScreenplayData(scriptId);
  const availableScenes = getAvailableScenes(screenplay, scriptId);
  const availableChars = getAvailableCharacters(screenplay);

  const selectedSceneNum = Number(store.state.currentSceneId || (availableScenes.find(s => s.number === 18) ? 18 : availableScenes[0]?.number || 1));
  const selectedCharName = availableChars[0]?.name || 'Kevin';

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

  return `
    ${renderHeader(isFromEditor ? 'Editor' : 'Intelligence', detail.title)}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-4 fade-in">
        
        <!-- 1. SUB-HEADER NAVIGATION ROW -->
        <div class="flex items-center justify-between">
          ${isFromEditor ? `
          <a href="${editorReturnUrl}" id="analysis-back-btn" class="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 transition-colors text-xs font-semibold uppercase tracking-wider no-underline">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Editor</span>
          </a>
          ` : `
          <a href="/intelligence/analysis" id="analysis-back-btn" class="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors text-xs font-semibold uppercase tracking-wider no-underline">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Vectors</span>
          </a>
          `}
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span class="text-xs font-medium">${script.title} · ${script.draft || 'Draft 4.2'}</span>
          </div>
        </div>

        <!-- Section Title Header (Extra score beside heading removed as requested) -->
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[22px]">${detail.icon}</span>
              <h1 class="font-heading text-xl font-bold text-slate-900 tracking-tight">${detail.title}</h1>
            </div>
            <p id="analysis-header-desc" class="text-xs text-slate-500 mt-0.5">${detail.desc}</p>
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
  const targetScriptId = returnScriptId || urlParams.get('scriptId') || (storedReturn ? storedReturn.replace('/editor/', '') : null) || store.state.selectedScriptId || 'chronicles-of-dust';
  const editorReturnUrl = `/editor/${targetScriptId}`;
  const scriptId = targetScriptId;

  const screenplay = getScreenplayData(scriptId);
  const availableScenes = getAvailableScenes(screenplay, scriptId);

  // Dedicated back button handling
  const backBtn = document.getElementById('analysis-back-btn');
  if (backBtn) {
    backBtn.onclick = (e) => {
      e.preventDefault();
      if (isFromEditor) {
        sessionStorage.removeItem('scriptora_prod_return');
        navigate(editorReturnUrl);
      } else {
        navigate('/intelligence/analysis');
      }
    };
  }

  function bindEditorButtons() {
    document.querySelectorAll('.btn-open-editor-scene').forEach(btn => {
      btn.onclick = () => {
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

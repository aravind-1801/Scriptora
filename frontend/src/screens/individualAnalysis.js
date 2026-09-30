import { renderHeader } from '../components/header.js';
import { renderBottomNav } from '../components/bottomNav.js';
import { store } from '../state/store.js';
import * as api from '../services/api.js';
import { showToast } from '../components/toast.js';

const vectorDetails = {
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

export function renderIndividualAnalysisScreen(type = 'pacing') {
  const detail = vectorDetails[type] || vectorDetails.pacing;
  const scriptId = store.state.selectedScriptId || 'chronicles-of-dust';
  const script = store.state.scripts.find(s => s.id === scriptId) || store.state.activeScript || {
    title: 'Chronicles of Dust',
    draft: 'Draft 4.2'
  };

  return `
    ${renderHeader('Intelligence', detail.title)}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-4 fade-in">
        
        <!-- Sub-header Navigation Row -->
        <div class="flex items-center justify-between">
          <a href="/intelligence/analysis" class="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors text-xs font-semibold uppercase tracking-wider no-underline">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Vectors</span>
          </a>
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span class="text-xs font-medium">${script.title} · ${script.draft || 'Draft 4.2'}</span>
          </div>
        </div>

        <!-- Section Title -->
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">${detail.icon}</span>
              <h1 class="font-heading text-xl font-bold text-slate-900 tracking-tight">${detail.title}</h1>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">${detail.desc}</p>
          </div>
          <div class="flex flex-col items-end">
            <span class="text-2xl font-bold font-mono text-blue-600">${detail.score}</span>
            <span class="text-[10px] text-slate-400 font-semibold uppercase">/100 Index</span>
          </div>
        </div>

        <!-- AI Query Box with Suggestion Pills -->
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

        <!-- Findings List -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">Key Scene Findings</span>
            <span class="text-[11px] text-slate-400 font-medium">${detail.findings.length} findings tracked</span>
          </div>

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
                <button type="button" class="btn-open-editor-scene px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-all" data-scene="${f.targetScene}">
                  <span class="material-symbols-outlined text-[15px]">edit_note</span>
                  <span>Open in Editor (Scene ${f.targetScene})</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    </main>

    ${renderBottomNav('intelligence')}
  `;
}

export function attachIndividualAnalysisEvents(type, navigate) {
  const scriptId = store.state.selectedScriptId || 'chronicles-of-dust';

  // Open in editor button for each finding
  document.querySelectorAll('.btn-open-editor-scene').forEach(btn => {
    btn.onclick = () => {
      const sceneNum = btn.getAttribute('data-scene');
      store.setState({ currentSceneId: sceneNum });
      showToast(`Jumping to Scene ${sceneNum} in Editor`);
      navigate(`/editor/${scriptId}?scene=${sceneNum}`);
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

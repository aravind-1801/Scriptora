import { renderHeader } from '../components/header.js';
import { renderBottomNav } from '../components/bottomNav.js';
import { store } from '../state/store.js';
import * as api from '../services/api.js';
import { showToast } from '../components/toast.js';

export function renderIntelligenceDashboardScreen() {
  const scriptId = store.state.selectedScriptId || 'chronicles-of-dust';
  const script = store.state.scripts.find(s => s.id === scriptId) || store.state.activeScript || {
    id: 'chronicles-of-dust',
    title: 'Chronicles of Dust',
    draft: 'Draft 4.2',
    pages: 96,
    format: 'Feature',
    industry: 'International / Hollywood'
  };

  const scores = script.analysisScores || {
    overall: 86,
    pacing: 82,
    dialogue: 89,
    emotion: 91,
    characterArc: 84,
    continuity: 78,
    storyStructure: 87,
    theme: 90,
    cinema: 85,
    formatting: 94,
    production: 80
  };

  return `
    ${renderHeader('Intelligence', 'Script Analysis')}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-4 fade-in">
        
        <!-- Navigation Row -->
        <div class="flex items-center justify-between">
          <a href="/intelligence/context" class="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors text-xs font-semibold uppercase tracking-wider no-underline">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Context Setup</span>
          </a>
          <div class="flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full shadow-xs">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span class="text-xs text-blue-700 font-medium truncate max-w-[150px]">${script.title} · ${script.draft || 'Draft 4.2'}</span>
          </div>
        </div>

        <!-- Section Title & Status -->
        <div class="flex items-center justify-between pt-1">
          <div class="flex flex-col">
            <h1 class="text-2xl font-bold text-slate-900 tracking-tight font-heading">Intelligence</h1>
            <p class="text-xs text-slate-500 mt-0.5">Understand your screenplay.</p>
          </div>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100/80">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Live Telemetry</span>
          </span>
        </div>

        <!-- 1. Script Title Card -->
        <div class="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col">
          <div class="flex items-center justify-between">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-blue-100/80 text-blue-700 font-heading">ACTIVE PROJECT</span>
            <button class="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors" id="script-selector-trigger" type="button">
              <span class="material-symbols-outlined text-[15px]">schedule</span>
              <span>Updated 12m ago</span>
              <span class="material-symbols-outlined text-[15px] text-slate-400">unfold_more</span>
            </button>
          </div>
          <div class="mt-2">
            <h2 class="text-lg font-bold text-slate-900 font-heading">${script.title}</h2>
            <p class="text-xs text-slate-500 mt-0.5">${script.draft || 'Draft 4.2'} · ${script.format || 'Feature'} · ${script.pages} pages</p>
          </div>
        </div>

        <!-- 2. AI Query Box & Generator Buttons -->
        <div class="flex flex-col gap-2.5">
          <!-- AI Query Box -->
          <div class="relative flex items-center bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-xs focus-within:border-blue-600 transition-colors">
            <span class="material-symbols-outlined text-[19px] text-blue-600 shrink-0 mr-2">auto_awesome</span>
            <input class="flex-1 bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none min-w-0" id="ai-query-input" placeholder="Ask anything about your screenplay..." type="text">
            <button aria-label="Send" class="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 hover:bg-blue-700 active:scale-95 transition-all ml-1.5" id="ai-query-submit" type="button">
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <!-- Logline / Synopsis Action Buttons -->
          <div class="flex items-center gap-2">
            <button class="flex-1 py-1.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 active:scale-[0.99] rounded-full text-xs font-medium text-slate-700 flex items-center justify-center gap-1.5 transition-colors shadow-xs" id="btn-gen-logline" type="button">
              <span class="material-symbols-outlined text-[15px] text-blue-600">auto_awesome</span>
              <span>Generate Logline</span>
            </button>
            <button class="flex-1 py-1.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 active:scale-[0.99] rounded-full text-xs font-medium text-slate-700 flex items-center justify-center gap-1.5 transition-colors shadow-xs" id="btn-gen-synopsis" type="button">
              <span class="material-symbols-outlined text-[15px] text-blue-600">auto_awesome</span>
              <span>Generate Synopsis</span>
            </button>
          </div>

          <!-- Generated Content Container -->
          <div class="hidden bg-white border border-blue-100 rounded-xl p-3.5 shadow-xs transition-all flex flex-col gap-2" id="ai-generated-container">
            <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <div class="flex items-center gap-2 min-w-0">
                <span class="material-symbols-outlined text-[17px] text-blue-600 shrink-0">auto_awesome</span>
                <span class="text-xs font-bold uppercase tracking-wider text-slate-700 font-heading truncate" id="ai-generated-title">Generated Logline</span>
                <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100 shrink-0">${script.title} · ${script.draft || 'D4.2'}</span>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <button class="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 py-0.5 px-2 rounded-lg bg-blue-50 border border-blue-100" id="ai-copy-btn" type="button">
                  <span class="material-symbols-outlined text-[14px]">content_copy</span>
                  <span id="ai-copy-text">Copy</span>
                </button>
                <button aria-label="Dismiss" class="text-slate-400 hover:text-slate-600 p-0.5 rounded" id="ai-close-btn" type="button">
                  <span class="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed" id="ai-generated-body"></p>
          </div>
        </div>

        <!-- 3. Overall Score Card -->
        <div class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col gap-4">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">SCRIPT ANALYSIS</span>
            <span class="text-xs font-medium text-slate-400">10 Metrics Evaluated</span>
          </div>

          <div class="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <!-- Circular Gauge -->
            <div class="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg class="w-full h-full -rotate-90" viewBox="0 0 72 72">
                <circle class="text-slate-200" cx="36" cy="36" fill="none" r="30" stroke="currentColor" stroke-width="6"></circle>
                <circle class="text-blue-600" cx="36" cy="36" fill="none" r="30" stroke="currentColor" stroke-dasharray="188.5" stroke-dashoffset="26.4" stroke-linecap="round" stroke-width="6"></circle>
              </svg>
              <div class="absolute flex flex-col items-center justify-center">
                <span class="text-2xl font-bold text-slate-900 leading-none tracking-tight font-heading">${scores.overall}</span>
                <span class="text-[10px] uppercase font-semibold text-slate-400 leading-none mt-1">/100</span>
              </div>
            </div>
            <div class="flex flex-col min-w-0 flex-1">
              <div class="flex items-center gap-1.5">
                <span class="text-base font-bold text-slate-900 font-heading">Overall Score</span>
                <span class="material-symbols-outlined text-blue-600 text-[17px]">workspace_premium</span>
              </div>
              <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                Strong emotional coherence & dialogue rhythm. Structural tension peaks with intent at Act II midpoint.
              </p>
            </div>
          </div>

          <!-- 10 Metric Category Scores -->
          <div class="flex flex-col divide-y divide-slate-100">
            ${[
              { name: 'Pacing', score: scores.pacing, icon: 'speed' },
              { name: 'Dialogue', score: scores.dialogue, icon: 'chat' },
              { name: 'Emotion', score: scores.emotion, icon: 'favorite' },
              { name: 'Character Arc', score: scores.characterArc, icon: 'alt_route' },
              { name: 'Continuity', score: scores.continuity, icon: 'linear_scale' },
              { name: 'Story Structure', score: scores.storyStructure, icon: 'account_tree' },
              { name: 'Theme', score: scores.theme, icon: 'lightbulb' },
              { name: 'Cinema', score: scores.cinema, icon: 'videocam' },
              { name: 'Formatting', score: scores.formatting, icon: 'rule' },
              { name: 'Production', score: scores.production, icon: 'movie_creation' }
            ].map(m => `
              <div class="py-2.5 flex items-center justify-between gap-3">
                <div class="flex items-center gap-2 w-36 shrink-0">
                  <span class="material-symbols-outlined text-[17px] text-slate-400">${m.icon}</span>
                  <span class="text-xs sm:text-sm font-medium text-slate-700 truncate">${m.name}</span>
                </div>
                <div class="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div class="h-full bg-blue-600 rounded-full" style="width: ${m.score}%;"></div>
                </div>
                <span class="text-xs sm:text-sm font-bold text-slate-900 w-8 text-right font-mono">${m.score}</span>
              </div>
            `).join('')}
          </div>

          <!-- Needs Attention Micro-Indicator -->
          <a href="/intelligence/analysis" class="pt-2 pb-1 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 hover:text-slate-900 transition-colors no-underline">
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px] text-amber-500">info</span>
              <span class="font-medium">3 areas have important findings</span>
            </div>
            <span class="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
          </a>
        </div>

        <!-- 4. Primary & Secondary CTA Buttons -->
        <div class="flex flex-col gap-2 pt-1 pb-4">
          <a href="/intelligence/analysis" class="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-medium rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all no-underline" id="btn-analyse-individual">
            <span class="material-symbols-outlined text-[19px]">insights</span>
            <span>Analyse Individually</span>
          </a>
          <a href="/editor/${script.id}" class="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors no-underline">
            <span class="material-symbols-outlined text-[16px] text-slate-500">edit_document</span>
            <span>Back to Editor</span>
          </a>
          <p class="text-[11px] text-slate-400 text-center">Evaluate individual scenes, dialogue cadence, and beat breakdowns.</p>
        </div>

      </div>

      <!-- Quick Script Switcher Modal -->
      <div id="script-switcher-modal" class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm items-end sm:items-center justify-center hidden p-0 sm:p-4">
        <div class="w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl p-4 flex flex-col gap-3 shadow-xl">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-600 font-heading">Switch Screenplay</span>
            <button id="close-script-switcher-modal" class="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <div class="flex flex-col gap-2 max-h-60 overflow-y-auto">
            ${store.state.scripts.map(s => `
              <div class="script-switch-opt p-3 rounded-xl ${s.id === script.id ? 'bg-blue-50 border border-blue-200' : 'bg-white border border-slate-200 hover:bg-slate-50'} flex items-center justify-between cursor-pointer" data-id="${s.id}">
                <div class="flex flex-col">
                  <span class="text-xs font-bold text-slate-900 uppercase font-heading">${s.title}</span>
                  <span class="text-[11px] text-slate-500 mt-0.5">${s.format || 'Feature'} · ${s.pages} pages · ${s.draft || 'Draft 1.0'}</span>
                </div>
                ${s.id === script.id ? `<span class="material-symbols-outlined text-blue-600 text-[18px]">check_circle</span>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </div>

    </main>

    ${renderBottomNav('intelligence')}
  `;
}

export function attachIntelligenceDashboardEvents(navigate) {
  const scriptId = store.state.selectedScriptId || 'chronicles-of-dust';
  const script = store.state.scripts.find(s => s.id === scriptId) || store.state.scripts[0];

  const loglineBtn = document.getElementById('btn-gen-logline');
  const synopsisBtn = document.getElementById('btn-gen-synopsis');
  const aiContainer = document.getElementById('ai-generated-container');
  const aiTitle = document.getElementById('ai-generated-title');
  const aiBody = document.getElementById('ai-generated-body');
  const aiClose = document.getElementById('ai-close-btn');
  const aiCopy = document.getElementById('ai-copy-btn');
  const aiCopyText = document.getElementById('ai-copy-text');
  const queryInput = document.getElementById('ai-query-input');
  const querySubmit = document.getElementById('ai-query-submit');

  function renderGen(type) {
    if (!aiContainer) return;
    aiContainer.classList.remove('hidden');
    aiTitle.textContent = type === 'logline' ? 'Generated Logline' : 'Generated Synopsis';
    aiBody.innerHTML = '<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Generating with narrative telemetry...</span>';
    
    setTimeout(() => {
      aiBody.textContent = type === 'logline'
        ? (script?.logline || "When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.")
        : (script?.synopsis || "In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves.");
    }, 400);
  }

  if (loglineBtn) loglineBtn.onclick = () => renderGen('logline');
  if (synopsisBtn) synopsisBtn.onclick = () => renderGen('synopsis');
  if (aiClose) aiClose.onclick = () => aiContainer.classList.add('hidden');
  if (aiCopy) {
    aiCopy.onclick = () => {
      navigator.clipboard?.writeText(aiBody.textContent || '');
      aiCopyText.textContent = 'Copied!';
      setTimeout(() => { aiCopyText.textContent = 'Copy'; }, 1800);
      showToast('Copied to clipboard');
    };
  }

  if (querySubmit && queryInput) {
    const handleQuery = async () => {
      const q = queryInput.value.trim();
      if (!q) return;
      aiContainer.classList.remove('hidden');
      aiTitle.textContent = 'Intelligence AI Answer';
      aiBody.innerHTML = '<span class="text-slate-400 italic flex items-center gap-1.5 py-1"><span class="material-symbols-outlined text-[15px] animate-spin text-blue-600">progress_activity</span>Analyzing draft semantics...</span>';
      
      const answer = await api.queryIntelligence(q, scriptId);
      aiBody.textContent = answer;
      queryInput.value = '';
    };

    querySubmit.onclick = handleQuery;
    queryInput.onkeydown = (e) => {
      if (e.key === 'Enter') handleQuery();
    };
  }

  // Script Switcher Modal
  const modal = document.getElementById('script-switcher-modal');
  const trigger = document.getElementById('script-selector-trigger');
  const closeBtn = document.getElementById('close-script-switcher-modal');

  if (trigger) trigger.onclick = () => modal?.classList.remove('hidden');
  if (closeBtn) closeBtn.onclick = () => modal?.classList.add('hidden');

  document.querySelectorAll('.script-switch-opt').forEach(opt => {
    opt.onclick = () => {
      const id = opt.getAttribute('data-id');
      store.selectScript(id);
      modal?.classList.add('hidden');
      navigate('/intelligence');
    };
  });
}

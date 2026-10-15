import { renderHeader } from '../components/header.js';
import { renderBottomNav } from '../components/bottomNav.js';
import { store } from '../state/store.js';
import * as api from '../services/api.js';
import { showToast } from '../components/toast.js';

export function renderProductionScreen(fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const from = fromParam || urlParams.get('from');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const isFromEditor = from === 'editor' || (from && from.startsWith('/editor'));
  const returnUrl = isFromEditor
    ? (sessionStorage.getItem('scriptora_prod_return') || (from && from.startsWith('/editor') ? from : `/editor/${scriptId}`))
    : (from && from.startsWith('/') ? from : '/workspace');
  const returnLabel = isFromEditor
    ? 'Editor'
    : (from?.includes('/intelligence') ? 'Intelligence' : 'Workspace');

  const script = store.state.scripts?.find(s => s.id === scriptId) || store.state.scripts?.[0] || {
    id: 'chronicles-of-dust',
    title: 'Chronicles of Dust',
    draft: 'Draft 4.2',
    pages: 96
  };

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      <!-- Standard App Header -->
      ${renderHeader('Pre-Production', 'Production Tools')}

      <!-- Main Workspace Container -->
      <main class="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3.5 fade-in">
        
        <!-- Unified Header Row (Back + Title) -->
        <div class="flex items-center justify-between gap-2 py-1.5 border-b border-slate-200/70">
          <div class="flex items-center gap-2 min-w-0">
            <a href="${returnUrl}" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors text-xs font-semibold shrink-0" id="prod-back-nav" title="Back to ${returnLabel}">
              <span class="material-symbols-outlined text-[17px]">arrow_back</span>
              <span class="truncate">${returnLabel}</span>
            </a>
            <h1 class="font-heading font-semibold text-sm text-slate-900 truncate">Production Tools</h1>
          </div>
        </div>

        <!-- Screenplay & Source Version Selector Card -->
        <section class="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80">
              <span class="material-symbols-outlined text-[20px]">movie_creation</span>
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-1.5">
                <select id="prod-script-select" class="font-heading font-semibold text-sm text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-none cursor-pointer pr-1 truncate">
                  <option value="chronicles-of-dust" ${script.id === 'chronicles-of-dust' ? 'selected' : ''}>Chronicles of Dust (Feature)</option>
                  <option value="the-neon-horizon" ${script.id === 'the-neon-horizon' ? 'selected' : ''}>The Neon Horizon (Pilot)</option>
                </select>
              </div>
              <div class="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-500">
                <span class="flex items-center gap-1 text-slate-700 font-medium" id="prod-pinned-version-badge">
                  <span class="material-symbols-outlined text-[13px] text-slate-400">lock</span>
                  <span id="pinned-version-label">${script.draft || 'Draft 4.2'} (Pinned)</span>
                </span>
                <span>•</span>
                <span>18 Scenes</span>
                <span>•</span>
                <span>78 Elements</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Source Version Staleness Warning Banner -->
        <div id="source-version-alert" class="hidden bg-amber-50/70 border border-amber-200/90 rounded-2xl p-3 flex items-start justify-between gap-3 shadow-xs">
          <div class="flex items-start gap-2">
            <span class="material-symbols-outlined text-[18px] text-amber-600 shrink-0 mt-0.5">warning</span>
            <div class="text-xs text-amber-900 leading-relaxed">
              <span class="font-semibold">Source Version Out of Sync:</span> Screenplay draft updated. Production records remain pinned to <span class="font-semibold underline" id="alert-pinned-ver">Draft 4.2</span>.
            </div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button id="btn-repin-source" class="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-[11px] transition-colors">
              Update Pin
            </button>
            <button id="btn-dismiss-staleness" class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-medium hover:bg-slate-50">
              Keep Pin
            </button>
          </div>
        </div>

        <!-- Production Tools Grid -->
        <section class="flex flex-col gap-2.5">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            
            <!-- Tool 1: Script Breakdown -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="script-breakdown">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[18px]">dataset</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">78 Items</span>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Script Breakdown</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Tag and organise production requirements by scene.</p>
              </div>
              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Open Breakdown</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 2: Scene Hub -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="scene-hub">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[18px]">hub</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">18 Scenes</span>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Scene Hub</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Track scene logistics, cast requirements, and complexity.</p>
              </div>
              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>View Scenes</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 3: Shooting Schedule -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="shooting-schedule">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[18px]">calendar_view_week</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">14 Days</span>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Shooting Schedule</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Plan shooting days and sequence scene stripboards.</p>
              </div>
              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Stripboard</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 4: Call Sheets -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="call-sheets">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[18px]">assignment</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">2 Active</span>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Call Sheets</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Prepare and manage daily shooting call sheets.</p>
              </div>
              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Call Sheets</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 5: Dialogue Sheets & Actor Sides -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="dialogue-sheets">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[18px]">record_voice_over</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">Ready</span>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Dialogue Sheets & Sides</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Character-wise speech cues and scene actor sides.</p>
              </div>
              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Actor Sides</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 6: Storyboard Studio -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="storyboard-studio">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[18px]">art_track</span>
                  </div>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Storyboard Studio</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Visual shot composition and camera setups.</p>
              </div>
              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Shot Board</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

          </div>
        </section>

      </main>

      <!-- Bottom Navigation with Production Active -->
      ${renderBottomNav('production')}
    </div>
  `;
}

export async function attachProductionEvents(navigate, fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';

  // 1. Script Selector Switcher
  const scriptSelect = document.getElementById('prod-script-select');
  if (scriptSelect) {
    scriptSelect.onchange = (e) => {
      const selected = e.target.value;
      store.setState({ selectedScriptId: selected });
      navigate(`/production?scriptId=${selected}`);
    };
  }

  // 2. Source Version Alert
  const repinBtn = document.getElementById('btn-repin-source');
  if (repinBtn) {
    repinBtn.onclick = async () => {
      const latestDraft = 'Draft 4.3';
      await api.pinProductionSourceVersion(scriptId, latestDraft);
      document.getElementById('source-version-alert')?.classList.add('hidden');
      const badge = document.getElementById('pinned-version-label');
      if (badge) badge.textContent = `${latestDraft} (Pinned)`;
      showToast(`Pinned source updated to ${latestDraft}`);
    };
  }

  const dismissStalenessBtn = document.getElementById('btn-dismiss-staleness');
  if (dismissStalenessBtn) {
    dismissStalenessBtn.onclick = () => {
      document.getElementById('source-version-alert')?.classList.add('hidden');
      showToast('Retained Draft 4.2 pinned baseline');
    };
  }

  // 3. Tool Cards Navigation
  const prodStudioOrigin = `/production?scriptId=${scriptId}`;
  const routeMap = {
    'script-breakdown': `/production/breakdown?scriptId=${scriptId}&from=${encodeURIComponent(prodStudioOrigin)}`,
    'scene-hub': `/production/scenes?scriptId=${scriptId}&from=${encodeURIComponent(prodStudioOrigin)}`,
    'shooting-schedule': `/production/schedule?scriptId=${scriptId}&from=${encodeURIComponent(prodStudioOrigin)}`,
    'call-sheets': `/production/call-sheets?scriptId=${scriptId}&from=${encodeURIComponent(prodStudioOrigin)}`,
    'dialogue-sheets': `/production/dialogue-sides?scriptId=${scriptId}&from=${encodeURIComponent(prodStudioOrigin)}`,
    'storyboard-studio': `/production/storyboard?scriptId=${scriptId}&from=${encodeURIComponent(prodStudioOrigin)}`
  };

  document.querySelectorAll('.tool-card').forEach(card => {
    card.onclick = () => {
      const tool = card.getAttribute('data-tool');
      if (routeMap[tool]) {
        navigate(routeMap[tool]);
      }
    };
  });
}

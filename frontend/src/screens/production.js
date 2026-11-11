import { renderHeader } from '../components/header.js';
import { renderBottomNav } from '../components/bottomNav.js';
import { store } from '../state/store.js';
import * as api from '../services/api.js';
import { showToast } from '../components/toast.js';

function cleanScriptParam(val) {
  if (!val || val === 'null' || val === 'undefined') return null;
  return val;
}

export function renderProductionScreen(fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const from = fromParam || urlParams.get('from');
  const scripts = store.state.scripts || [];
  const requestedId = cleanScriptParam(scriptParam) || cleanScriptParam(urlParams.get('scriptId')) || cleanScriptParam(store.state.selectedScriptId);
  const script = scripts.find(s => s.id === requestedId) || scripts[0] || null;
  const scriptId = script?.id || null;
  const isFromEditor = from === 'editor' || (from && from.startsWith('/editor'));
  const returnUrl = isFromEditor
    ? (sessionStorage.getItem('scriptora_prod_return') || (from && from.startsWith('/editor') ? from : (scriptId ? `/editor/${scriptId}` : '/workspace')))
    : (from && from.startsWith('/') ? from : '/workspace');
  let dynamicLabel = null;
  if (window.scriptoraRouter) {
    const prev = window.scriptoraRouter.peekPreviousRoute?.();
    if (prev) dynamicLabel = window.scriptoraRouter.getRouteLabel(prev);
  }
  const returnLabel = isFromEditor
    ? 'Editor'
    : (dynamicLabel || (from?.includes('/intelligence') ? 'Intelligence' : 'Workspace'));

  return `
    <!-- Standard App Header -->
    ${renderHeader('Pre-Production', 'Production Tools')}

    <!-- Main Workspace Container -->
    <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-3 pb-8 space-y-3.5 fade-in">
        
        <!-- Page Title Header (Matches Workspace: Bold title + muted subtitle, no back button) -->
        <div class="flex items-center justify-between gap-3 py-1">
          <div class="flex flex-col min-w-0">
            <h1 class="page-heading font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight truncate">Production Tools</h1>
            <p class="text-xs text-slate-500 mt-0.5 truncate">Your filmmaking workspace.</p>
          </div>
        </div>

        <!-- Screenplay Selector Card (Simplified & Compact) -->
        ${script ? `
          <section class="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-3.5 shadow-xs flex items-center justify-between">
            <div class="flex items-center gap-2.5 min-w-0 flex-1">
              <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80">
                <span class="material-symbols-outlined text-[19px]">movie_creation</span>
              </div>
              <div class="min-w-0 flex-1">
                <select id="prod-script-select" class="w-full font-heading font-semibold text-sm text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-none cursor-pointer truncate py-0.5">
                  ${scripts.map(s => `
                    <option value="${s.id}" ${s.id === script.id ? 'selected' : ''}>${s.title} (${s.format || 'Feature'})</option>
                  `).join('')}
                </select>
                <!-- Pinned source version tracking preserved for underlying system state -->
                <span id="pinned-version-label" class="sr-only">${script.draft || 'Draft 1.0'} (Pinned)</span>
              </div>
            </div>
          </section>

          <!-- Source Version Staleness Warning Banner -->
          <div id="source-version-alert" class="hidden bg-amber-50/70 border border-amber-200/90 rounded-2xl p-3 flex items-start justify-between gap-3 shadow-xs">
            <div class="flex items-start gap-2">
              <span class="material-symbols-outlined text-[18px] text-amber-600 shrink-0 mt-0.5">warning</span>
              <div class="text-xs text-amber-900 leading-relaxed">
                <span class="font-semibold">Source Version Out of Sync:</span> Screenplay draft updated. Production records remain pinned to <span class="font-semibold underline" id="alert-pinned-ver">${script.draft || 'Draft 1.0'}</span>.
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
        ` : `
          <section class="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-3.5 shadow-xs flex items-center justify-between gap-3" id="prod-empty-script-banner">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80">
                <span class="material-symbols-outlined text-[19px]">movie_creation</span>
              </div>
              <div class="min-w-0">
                <p class="font-heading font-semibold text-xs sm:text-sm text-slate-900 truncate">No Screenplay Selected</p>
                <p class="text-[11px] text-slate-500 truncate">Storyboard Studio works standalone via prompt; other tools need a script.</p>
              </div>
            </div>
            <a href="/workspace" class="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold transition-colors no-underline">
              <span class="material-symbols-outlined text-[14px]">add</span>
              Workspace
            </a>
          </section>
        `}

        <!-- Production Tools Grid (Consistent 2-column on wider, naturally stacked on mobile) -->
        <section class="flex flex-col gap-2.5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            <!-- Tool 1: Script Breakdown -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="script-breakdown">
              <div>
                <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors mb-2.5">
                  <span class="material-symbols-outlined text-[18px]">dataset</span>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Script Breakdown</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Tag and organise production requirements by scene.</p>
              </div>
              <div class="pt-2.5 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Open Breakdown</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 2: Shooting Schedule -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="shooting-schedule">
              <div>
                <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors mb-2.5">
                  <span class="material-symbols-outlined text-[18px]">calendar_view_week</span>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Shooting Schedule</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Plan shooting days, calendar matrix, and scene production details.</p>
              </div>
              <div class="pt-2.5 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Open Schedule</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 3: Storyboard Studio -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="storyboard-studio">
              <div>
                <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors mb-2.5">
                  <span class="material-symbols-outlined text-[18px]">art_track</span>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Storyboard Studio</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Visual shot composition and camera setups.</p>
              </div>
              <div class="pt-2.5 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Shot Board</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 4: Call Sheets -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="call-sheets">
              <div>
                <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors mb-2.5">
                  <span class="material-symbols-outlined text-[18px]">assignment</span>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Call Sheets</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Prepare and manage daily shooting call sheets.</p>
              </div>
              <div class="pt-2.5 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Call Sheets</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 5: Dialogue Sheets & Actor Sides -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer group" data-tool="dialogue-sheets">
              <div>
                <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors mb-2.5">
                  <span class="material-symbols-outlined text-[18px]">record_voice_over</span>
                </div>
                <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Dialogue Sheets & Sides</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Character-wise speech cues and scene actor sides.</p>
              </div>
              <div class="pt-2.5 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Actor Sides</span>
                <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>

    <!-- Modal Asking User to Create Screenplay in Workspace (When 0 scripts exist) -->
    <div id="prod-needs-script-modal" class="hidden fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-xs flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full p-5 flex flex-col gap-3">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[22px]">edit_document</span>
          </div>
          <div class="min-w-0">
            <h3 class="font-heading font-bold text-sm text-slate-900" id="prod-needs-script-title">Screenplay Required</h3>
            <p class="text-xs text-slate-500 mt-1 leading-relaxed" id="prod-needs-script-desc">
              Create a screenplay in your Workspace first to use this tool. Storyboard Studio works without a script using prompts.
            </p>
          </div>
        </div>
        <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button type="button" id="prod-modal-cancel" class="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer">
            Stay Here
          </button>
          <button type="button" id="prod-modal-go-workspace" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs cursor-pointer">
            <span class="material-symbols-outlined text-[15px]">add</span>
            Go to Workspace
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation with Production Active -->
    ${renderBottomNav('production')}
  `;
}

export async function attachProductionEvents(navigate, fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scripts = store.state.scripts || [];
  const requestedId = cleanScriptParam(scriptParam) || cleanScriptParam(urlParams.get('scriptId')) || cleanScriptParam(store.state.selectedScriptId);
  const script = scripts.find(s => s.id === requestedId) || scripts[0] || null;
  const scriptId = script?.id || null;

  // Back Button
  const backBtn = document.getElementById('production-back-btn');
  if (backBtn) {
    backBtn.onclick = () => {
      if (window.scriptoraRouter) {
        window.scriptoraRouter.back('/workspace');
      } else {
        navigate('/workspace');
      }
    };
  }

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
  if (repinBtn && scriptId) {
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
      showToast('Retained pinned baseline');
    };
  }

  // Needs-Script Modal Controls
  const needsModal = document.getElementById('prod-needs-script-modal');
  const needsTitle = document.getElementById('prod-needs-script-title');
  const needsDesc = document.getElementById('prod-needs-script-desc');
  const closeNeedsModal = () => needsModal?.classList.add('hidden');

  document.getElementById('prod-modal-cancel')?.addEventListener('click', closeNeedsModal);
  document.getElementById('prod-modal-go-workspace')?.addEventListener('click', () => {
    closeNeedsModal();
    navigate('/workspace');
  });
  needsModal?.addEventListener('click', (e) => {
    if (e.target === needsModal) closeNeedsModal();
  });

  // 3. Tool Cards Navigation
  const prodStudioOrigin = scriptId ? `/production?scriptId=${scriptId}` : '/production';
  const queryPrefix = scriptId ? `scriptId=${encodeURIComponent(scriptId)}&` : '';
  const routeMap = {
    'script-breakdown': `/production/breakdown?${queryPrefix}from=${encodeURIComponent(prodStudioOrigin)}`,
    'shooting-schedule': `/production/schedule?${queryPrefix}from=${encodeURIComponent(prodStudioOrigin)}`,
    'call-sheets': `/production/call-sheets?${queryPrefix}from=${encodeURIComponent(prodStudioOrigin)}`,
    'dialogue-sheets': `/production/dialogue-sides?${queryPrefix}from=${encodeURIComponent(prodStudioOrigin)}`,
    'storyboard-studio': `/production/storyboard?${queryPrefix}from=${encodeURIComponent(prodStudioOrigin)}`
  };
  const toolLabels = {
    'script-breakdown': 'Script Breakdown',
    'shooting-schedule': 'Shooting Schedule',
    'call-sheets': 'Call Sheets',
    'dialogue-sheets': 'Dialogue Sheets & Sides'
  };

  document.querySelectorAll('.tool-card').forEach(card => {
    card.onclick = () => {
      const tool = card.getAttribute('data-tool');
      if (tool !== 'storyboard-studio' && !scriptId) {
        if (needsTitle) {
          needsTitle.textContent = `${toolLabels[tool] || 'Production Tool'} Needs a Screenplay`;
        }
        if (needsDesc) {
          needsDesc.textContent = `Create or open a screenplay in Workspace to use ${toolLabels[tool] || 'this tool'}. Storyboard Studio works standalone via prompt.`;
        }
        needsModal?.classList.remove('hidden');
        return;
      }
      if (routeMap[tool]) {
        navigate(routeMap[tool]);
      }
    };
  });
}

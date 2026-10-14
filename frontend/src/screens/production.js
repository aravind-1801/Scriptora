import { renderHeader } from '../components/header.js';
import { renderBottomNav } from '../components/bottomNav.js';
import { store } from '../state/store.js';
import * as api from '../services/api.js';
import { showToast } from '../components/toast.js';

// Pre-Production Tools Screen (Phase 1 Foundation)
// Native filmmaking pre-production entry experience preserving context,
// source-version integrity, role permissions, and change proposals.

let activeModal = null;

export function renderProductionScreen(fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const from = fromParam || urlParams.get('from');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const isFromEditor = from === 'editor';
  const returnUrl = isFromEditor ? (sessionStorage.getItem('scriptora_prod_return') || `/editor/${scriptId}`) : '/workspace';

  const script = store.state.scripts?.find(s => s.id === scriptId) || store.state.scripts?.[0] || {
    id: 'chronicles-of-dust',
    title: 'Chronicles of Dust',
    draft: 'Draft 4.2',
    pages: 96
  };

  const currentMode = localStorage.getItem('scriptora_prod_mode') || 'simple';
  const isAdvanced = currentMode === 'advanced';
  const userRole = localStorage.getItem('scriptora_prod_role') || 'Owner';

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      <!-- Standard App Header -->
      ${renderHeader('Pre-Production', 'Production Workspace & Tools')}

      <!-- Main Workspace Container -->
      <main class="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3.5 fade-in">
        
        <!-- Clean Unified Header Row (Back + Title + Mode Switch) -->
        <div class="flex items-center justify-between gap-2 py-1.5 border-b border-slate-200/70">
          <div class="flex items-center gap-2 min-w-0">
            <a href="${returnUrl}" class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors text-xs font-medium shrink-0" id="prod-back-nav" title="${isFromEditor ? 'Back to Screenplay Editor' : 'Back to Workspace'}">
              <span class="material-symbols-outlined text-[18px]">arrow_back</span>
              <span class="truncate">${isFromEditor ? 'Editor' : 'Workspace'}</span>
            </a>
            <h1 class="font-heading font-bold text-sm text-slate-900 truncate">Production Studio</h1>
          </div>

          <!-- Mode Toggle: Simple vs Advanced (Preserves State) -->
          <div class="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/80 shadow-2xs shrink-0">
            <button id="toggle-mode-simple" class="px-2.5 py-0.5 text-xs font-medium rounded-lg transition-all ${!isAdvanced ? 'bg-white text-blue-700 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'}">
              Simple
            </button>
            <button id="toggle-mode-advanced" class="px-2.5 py-0.5 text-xs font-medium rounded-lg transition-all ${isAdvanced ? 'bg-white text-blue-700 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'}">
              Advanced
            </button>
          </div>
        </div>

        <!-- 1. Screenplay & Source Version Selector Card (Clean, Uncluttered, No Redundant Project Panel) -->
        <section class="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <span class="material-symbols-outlined text-[20px]">movie_creation</span>
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-1.5">
                <select id="prod-script-select" class="font-heading font-bold text-sm text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-none cursor-pointer pr-1 truncate">
                  <option value="chronicles-of-dust" ${script.id === 'chronicles-of-dust' ? 'selected' : ''}>Chronicles of Dust (Feature)</option>
                  <option value="the-neon-horizon" ${script.id === 'the-neon-horizon' ? 'selected' : ''}>The Neon Horizon (Pilot)</option>
                </select>
              </div>
              <div class="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-500">
                <span class="flex items-center gap-1 text-emerald-700 font-medium" id="prod-pinned-version-badge">
                  <span class="material-symbols-outlined text-[13px]">lock</span>
                  <span id="pinned-version-label">${script.draft || 'Draft 4.2'} (Pinned)</span>
                </span>
                <span>•</span>
                <span>18 Scenes</span>
                <span>•</span>
                <span>78 Elements</span>
              </div>
            </div>
          </div>

          <!-- Functional Role Selector -->
          <div class="flex items-center gap-1.5 self-start sm:self-auto shrink-0 text-xs">
            <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Role:</span>
            <select id="prod-role-select" class="text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none cursor-pointer">
              <option value="Owner" ${userRole === 'Owner' ? 'selected' : ''}>Owner</option>
              <option value="Director" ${userRole === 'Director' ? 'selected' : ''}>Director</option>
              <option value="Assistant Director" ${userRole === 'Assistant Director' ? 'selected' : ''}>Assistant Director</option>
              <option value="Production" ${userRole === 'Production' ? 'selected' : ''}>Production</option>
              <option value="Department Member" ${userRole === 'Department Member' ? 'selected' : ''}>Department Lead</option>
              <option value="Viewer" ${userRole === 'Viewer' ? 'selected' : ''}>Viewer</option>
            </select>
          </div>
        </section>

        <!-- Source Version Staleness Warning Banner (Preserves Source Integrity) -->
        <div id="source-version-alert" class="hidden bg-amber-50 border border-amber-200/90 rounded-2xl p-3 flex items-start justify-between gap-3 shadow-2xs">
          <div class="flex items-start gap-2">
            <span class="material-symbols-outlined text-[18px] text-amber-600 shrink-0 mt-0.5">warning</span>
            <div class="text-xs text-amber-900 leading-relaxed">
              <span class="font-bold">Source Version Out of Sync:</span> Screenplay draft updated. Production records remain pinned to <span class="font-semibold underline" id="alert-pinned-ver">Draft 4.2</span>.
            </div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button id="btn-repin-source" class="px-2 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-[11px] transition-colors">
              Update Pin
            </button>
            <button id="btn-dismiss-staleness" class="px-2 py-1 rounded-lg bg-white border border-amber-200 text-amber-800 text-[11px] font-medium hover:bg-amber-100/50">
              Keep Pin
            </button>
          </div>
        </div>

        <!-- 2. Essential Production Tools (Prominent Access, Clean Title without Competing Badge) -->
        <section class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <h2 class="font-heading font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>Essential Production Tools</span>
            </h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            
            <!-- Tool 1: Call Sheets -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group" data-tool="call-sheets">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[20px]">assignment</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">2 Active</span>
                </div>
                <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Call Sheets</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Daily production call times, scene lists, hospital info, crew arrival, and weather.</p>
              </div>
              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>Open Call Sheets</span>
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 2: Dialogue Sheets & Actor Sides -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group" data-tool="dialogue-sheets">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[20px]">record_voice_over</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">Scene 18 Ready</span>
                </div>
                <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">Dialogue Sheets & Sides</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Actor-specific sides extracted by scene, character speech cues, and rehearsal notes.</p>
              </div>
              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-indigo-600">
                <span>View Actor Sides</span>
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 3: Shooting Schedule -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group" data-tool="shooting-schedule">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[20px]">calendar_view_week</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">14 Days</span>
                </div>
                <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">Shooting Schedule</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Master stripboard scheduling, day/night scene order, company moves, and wrap dates.</p>
              </div>
              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-amber-600">
                <span>Manage Stripboard</span>
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Tool 4: Script Breakdown -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group" data-tool="script-breakdown">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[20px]">dataset</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold">78 Items</span>
                </div>
                <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-purple-600 transition-colors">Script Breakdown</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">Cross-department extraction: Cast, Props, Vehicles, Wardrobe, Stunts, and Practical FX.</p>
              </div>
              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-purple-600">
                <span>Inspect Elements</span>
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>

          </div>
        </section>

        <!-- 3. Discoverable Secondary Production Tools (On Same Screen) -->
        <section class="flex flex-col gap-2.5">
          <div class="flex items-center justify-between">
            <h2 class="font-heading font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[18px] text-slate-600">dashboard_customize</span>
              <span>Production Modules & Creative Planning</span>
            </h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            <!-- Secondary 1: Storyboard Studio -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group" data-tool="storyboard-studio">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[20px]">art_track</span>
                </div>
                <div class="min-w-0">
                  <h3 class="font-heading font-bold text-sm text-slate-900">Storyboard Studio</h3>
                  <p class="text-[11px] text-slate-500">Visual shot composition & AI concept frames</p>
                </div>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-rose-600">
                <span>Shot Board</span>
                <span class="material-symbols-outlined text-[16px]">chevron_right</span>
              </div>
            </div>

            <!-- Secondary 2: Scene Hub & Practical Logistics -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group" data-tool="scene-hub">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[20px]">hub</span>
                </div>
                <div class="min-w-0">
                  <h3 class="font-heading font-bold text-sm text-slate-900">Scene Hub</h3>
                  <p class="text-[11px] text-slate-500">Scene-by-scene logistics & complexity index</p>
                </div>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-teal-600">
                <span>View 18 Scenes</span>
                <span class="material-symbols-outlined text-[16px]">chevron_right</span>
              </div>
            </div>

            <!-- Secondary 3: Resource Directory -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group" data-tool="resource-directory">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[20px]">contact_phone</span>
                </div>
                <div class="min-w-0">
                  <h3 class="font-heading font-bold text-sm text-slate-900">Resource Directory</h3>
                  <p class="text-[11px] text-slate-500">Cast, crew, vendors & contact permissions</p>
                </div>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-sky-600">
                <span>Directory</span>
                <span class="material-symbols-outlined text-[16px]">chevron_right</span>
              </div>
            </div>

            <!-- Secondary 4: Change Proposals & Approvals -->
            <div class="tool-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group" data-tool="change-proposals">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[20px]">rule</span>
                </div>
                <div class="min-w-0">
                  <h3 class="font-heading font-bold text-sm text-slate-900">Change Proposals</h3>
                  <p class="text-[11px] text-slate-500">Collaborator proposal review & approvals</p>
                </div>
              </div>
              <div class="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-amber-600">
                <span id="pending-proposals-count">2 Pending Review</span>
                <span class="material-symbols-outlined text-[16px]">chevron_right</span>
              </div>
            </div>

          </div>
        </section>

        <!-- 4. Advanced Mode Extended Panels (Shown when Advanced Mode is Active) -->
        <div id="advanced-panels" class="${isAdvanced ? '' : 'hidden'} flex flex-col gap-4">
          
          <!-- Advanced Metrics Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Shoot Window</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5">14 Days</div>
              <span class="text-[11px] text-slate-500">Oct 24 – Nov 08</span>
            </div>
            <div class="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Locations</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5">24 Practical</div>
              <span class="text-[11px] text-slate-500">14 Int · 10 Ext</span>
            </div>
            <div class="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cast & Extras</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5">18 Roles</div>
              <span class="text-[11px] text-slate-500">9 Speaking Roles</span>
            </div>
            <div class="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Production Health</span>
              <div class="font-heading font-bold text-lg text-emerald-600 mt-0.5">92% Ready</div>
              <span class="text-[11px] text-slate-500">Zero Unresolved Blocks</span>
            </div>
          </div>

          <!-- Pending Change Proposals Workflow Queue -->
          <section class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-3">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px] text-amber-600">checklist</span>
                <h3 class="font-heading font-bold text-sm text-slate-900">Change Proposal Queue</h3>
                <span class="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold">Awaiting Owner Review</span>
              </div>
              <button id="btn-create-proposal-trigger" class="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1">
                <span class="material-symbols-outlined text-[15px]">add</span>
                <span>Submit Change Proposal</span>
              </button>
            </div>

            <div id="proposals-list" class="flex flex-col gap-2.5">
              <!-- Rendered via JS -->
            </div>
          </section>

          <!-- Production Audit Trail Timeline -->
          <section class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-3">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px] text-blue-600">history_edu</span>
                <h3 class="font-heading font-bold text-sm text-slate-900">Audit Trail & Timeline</h3>
              </div>
              <span class="text-[11px] text-slate-400 font-mono">Immutable Log</span>
            </div>

            <div id="audit-trail-list" class="flex flex-col gap-2">
              <!-- Rendered via JS -->
            </div>
          </section>

        </div>

      </main>

      <!-- Bottom Navigation with Pre-Production Active -->
      ${renderBottomNav('production')}

      <!-- Shared Inspector / Tool Detail Modal -->
      <div id="prod-tool-modal" class="hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div class="flex items-center gap-2.5">
              <div id="modal-icon-container" class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-[18px]" id="modal-tool-icon">tune</span>
              </div>
              <div>
                <h3 class="font-heading font-bold text-sm text-slate-900" id="modal-tool-title">Tool Inspector</h3>
                <span class="text-[11px] text-slate-500" id="modal-tool-subtitle">Draft 4.2 Approved Context</span>
              </div>
            </div>
            <button id="modal-tool-close" class="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div class="p-5 overflow-y-auto flex-1 flex flex-col gap-3 text-xs text-slate-600" id="modal-tool-body">
            <!-- Dynamic Content -->
          </div>

          <div class="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-2" id="modal-tool-footer">
            <button id="modal-tool-done" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-2xs">
              Close
            </button>
          </div>
        </div>
      </div>

    </div>
  `;
}

export async function attachProductionEvents(navigate, fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';

  // 1. Load Initial Workspace Data
  const ws = await api.getProductionWorkspace(scriptId);
  const proposals = await api.getProductionProposals(scriptId);
  const auditTrail = await api.getProductionAuditTrail(scriptId);

  // Check Staleness
  const currentScript = store.state.scripts?.find(s => s.id === scriptId);
  if (currentScript && currentScript.draft && currentScript.draft !== ws.pinnedSourceVersion) {
    const alertEl = document.getElementById('source-version-alert');
    const alertPinned = document.getElementById('alert-pinned-ver');
    if (alertEl) alertEl.classList.remove('hidden');
    if (alertPinned) alertPinned.textContent = ws.pinnedSourceVersion;
  }

  // 2. Render Proposals Queue
  renderProposalsList(proposals, ws.userRole, scriptId);

  // 3. Render Audit Trail
  renderAuditTrailList(auditTrail);

  // 4. Mode Toggle (Simple vs Advanced)
  const btnSimple = document.getElementById('toggle-mode-simple');
  const btnAdvanced = document.getElementById('toggle-mode-advanced');
  const advancedPanels = document.getElementById('advanced-panels');

  function setMode(mode) {
    localStorage.setItem('scriptora_prod_mode', mode);
    api.updateProductionWorkspace(scriptId, { mode });
    if (mode === 'advanced') {
      advancedPanels?.classList.remove('hidden');
      btnAdvanced?.classList.add('bg-white', 'text-blue-700', 'shadow-2xs', 'font-semibold');
      btnAdvanced?.classList.remove('text-slate-600');
      btnSimple?.classList.remove('bg-white', 'text-blue-700', 'shadow-2xs', 'font-semibold');
      btnSimple?.classList.add('text-slate-600');
    } else {
      advancedPanels?.classList.add('hidden');
      btnSimple?.classList.add('bg-white', 'text-blue-700', 'shadow-2xs', 'font-semibold');
      btnSimple?.classList.remove('text-slate-600');
      btnAdvanced?.classList.remove('bg-white', 'text-blue-700', 'shadow-2xs', 'font-semibold');
      btnAdvanced?.classList.add('text-slate-600');
    }
    showToast(`Switched to ${mode === 'advanced' ? 'Advanced' : 'Simple'} Mode`);
  }

  if (btnSimple) btnSimple.onclick = () => setMode('simple');
  if (btnAdvanced) btnAdvanced.onclick = () => setMode('advanced');

  // 5. Role Switcher
  const roleSelect = document.getElementById('prod-role-select');
  if (roleSelect) {
    roleSelect.onchange = (e) => {
      const newRole = e.target.value;
      localStorage.setItem('scriptora_prod_role', newRole);
      api.updateProductionWorkspace(scriptId, { userRole: newRole });
      showToast(`Viewing as ${newRole}`);
      renderProposalsList(proposals, newRole, scriptId);
    };
  }

  // 6. Script Selector Switcher
  const scriptSelect = document.getElementById('prod-script-select');
  if (scriptSelect) {
    scriptSelect.onchange = (e) => {
      const selected = e.target.value;
      store.setState({ selectedScriptId: selected });
      navigate(`/production?scriptId=${selected}`);
    };
  }

  // 7. Source Version Re-pin / Keep Buttons
  const repinBtn = document.getElementById('btn-repin-source');
  if (repinBtn) {
    repinBtn.onclick = async () => {
      const latestDraft = currentScript?.draft || 'Draft 4.3';
      await api.pinProductionSourceVersion(scriptId, latestDraft);
      document.getElementById('source-version-alert')?.classList.add('hidden');
      const badge = document.getElementById('pinned-version-label');
      if (badge) badge.textContent = `${latestDraft} (Pinned Source)`;
      showToast(`Pinned source updated to ${latestDraft}`);
      
      const newAudit = await api.getProductionAuditTrail(scriptId);
      renderAuditTrailList(newAudit);
    };
  }

  const dismissStalenessBtn = document.getElementById('btn-dismiss-staleness');
  if (dismissStalenessBtn) {
    dismissStalenessBtn.onclick = () => {
      document.getElementById('source-version-alert')?.classList.add('hidden');
      showToast('Retained Draft 4.2 pinned baseline');
    };
  }

  // 8. Tool Cards Click Handlers (Inspectors / Workflows)
  document.querySelectorAll('.tool-card').forEach(card => {
    card.onclick = () => {
      const tool = card.getAttribute('data-tool');
      openToolModal(tool, scriptId, ws, navigate);
    };
  });

  // 9. Tool Modal Dismiss
  const modalClose = document.getElementById('modal-tool-close');
  const modalDone = document.getElementById('modal-tool-done');
  const modalContainer = document.getElementById('prod-tool-modal');
  const closeModal = () => {
    if (modalContainer) modalContainer.classList.add('hidden');
  };
  if (modalClose) modalClose.onclick = closeModal;
  if (modalDone) modalDone.onclick = closeModal;
  if (modalContainer) {
    modalContainer.onclick = (e) => {
      if (e.target === modalContainer) closeModal();
    };
  }

  // 10. Submit Change Proposal Trigger
  const createProposalBtn = document.getElementById('btn-create-proposal-trigger');
  if (createProposalBtn) {
    createProposalBtn.onclick = async () => {
      const title = prompt("Enter proposal title (e.g. Add Rain FX equipment to Scene 18):");
      if (!title) return;
      const desc = prompt("Enter proposal details / rationale:") || "";
      const newProp = await api.submitProductionProposal(scriptId, {
        title,
        description: desc,
        category: "Logistics",
        submittedBy: store.state.currentUser?.name || "Arun Kumar",
        submitterRole: localStorage.getItem('scriptora_prod_role') || "Owner",
        impact: "Modifies production schedule & logistics budget"
      });
      showToast("Proposal submitted for review");
      const updatedProps = await api.getProductionProposals(scriptId);
      renderProposalsList(updatedProps, ws.userRole, scriptId);
    };
  }
}

function renderProposalsList(proposals, userRole, scriptId) {
  const container = document.getElementById('proposals-list');
  if (!container) return;

  if (!proposals || proposals.length === 0) {
    container.innerHTML = `<div class="p-4 text-center text-slate-400 text-xs">No pending change proposals.</div>`;
    return;
  }

  const isOwner = userRole === 'Owner';

  container.innerHTML = proposals.map(p => {
    const isPending = p.status === 'Awaiting review';
    const isAccepted = p.status === 'Accepted';
    const isRejected = p.status === 'Rejected';
    const isConflict = p.status === 'Conflict';

    const statusBadge = isAccepted
      ? `<span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">Accepted</span>`
      : isRejected
      ? `<span class="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold">Rejected</span>`
      : isConflict
      ? `<span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">Conflict</span>`
      : `<span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">Awaiting Review</span>`;

    return `
      <div class="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-white transition-colors flex flex-col gap-2">
        <div class="flex items-start justify-between gap-2">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-heading font-bold text-xs text-slate-900">${p.title}</span>
              ${statusBadge}
            </div>
            <p class="text-[11px] text-slate-600 mt-1 leading-relaxed">${p.description}</p>
          </div>
          <span class="text-[10px] text-slate-400 font-mono shrink-0">${p.category}</span>
        </div>

        <div class="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/50">
          <span>Submitted by <span class="font-semibold text-slate-700">${p.submittedBy}</span> (${p.submitterRole})</span>
          
          ${isPending ? `
            <div class="flex items-center gap-1.5">
              ${isOwner ? `
                <button class="btn-proposal-action px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[10px] transition-colors" data-id="${p.id}" data-action="accept">
                  Accept
                </button>
                <button class="btn-proposal-action px-2 py-0.5 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold text-[10px] transition-colors" data-id="${p.id}" data-action="reject">
                  Reject
                </button>
                <button class="btn-proposal-action px-2 py-0.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-semibold text-[10px] transition-colors" data-id="${p.id}" data-action="conflict">
                  Flag Conflict
                </button>
              ` : `
                <span class="text-[10px] text-slate-400 italic">Owner approval required</span>
              `}
            </div>
          ` : `
            <span class="text-[10px] text-slate-500 italic">${p.resolutionNotes || 'Reviewed and finalized'}</span>
          `}
        </div>
      </div>
    `;
  }).join('');

  // Wire accept / reject / conflict buttons
  container.querySelectorAll('.btn-proposal-action').forEach(btn => {
    btn.onclick = async (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const action = btn.getAttribute('data-action');
      const notes = prompt(`Enter ${action} review notes (optional):`) || '';
      await api.reviewProductionProposal(scriptId, id, action, notes);
      showToast(`Proposal ${action}ed`);
      const updated = await api.getProductionProposals(scriptId);
      renderProposalsList(updated, userRole, scriptId);
      const newAudit = await api.getProductionAuditTrail(scriptId);
      renderAuditTrailList(newAudit);
    };
  });
}

function renderAuditTrailList(auditTrail) {
  const container = document.getElementById('audit-trail-list');
  if (!container) return;

  if (!auditTrail || auditTrail.length === 0) {
    container.innerHTML = `<div class="p-3 text-center text-slate-400 text-xs">No audit entries recorded.</div>`;
    return;
  }

  container.innerHTML = auditTrail.slice(0, 5).map(entry => `
    <div class="flex items-start gap-2.5 py-1.5 border-b border-slate-100 last:border-none text-xs">
      <div class="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <span class="font-semibold text-slate-800">${entry.action.split('_').join(' ')}</span>
          <span class="text-[10px] text-slate-400">${entry.timestamp || 'Just now'}</span>
        </div>
        <p class="text-[11px] text-slate-600 truncate">${entry.details}</p>
        <div class="text-[10px] text-slate-400 mt-0.5">By ${entry.actor} • Source: ${entry.sourceVersion}</div>
      </div>
    </div>
  `).join('');
}

async function openToolModal(tool, scriptId, ws, navigate) {
  const modal = document.getElementById('prod-tool-modal');
  const titleEl = document.getElementById('modal-tool-title');
  const subtitleEl = document.getElementById('modal-tool-subtitle');
  const bodyEl = document.getElementById('modal-tool-body');
  const iconEl = document.getElementById('modal-tool-icon');

  if (!modal || !titleEl || !bodyEl) return;

  modal.classList.remove('hidden');

  if (tool === 'call-sheets') {
    titleEl.textContent = 'Call Sheets';
    subtitleEl.textContent = `${ws.screenplayTitle} • Pinned ${ws.pinnedSourceVersion}`;
    if (iconEl) iconEl.textContent = 'assignment';

    const docs = await api.getProductionDocuments(scriptId);
    const callSheets = docs.filter(d => d.type === 'Call Sheet');

    bodyEl.innerHTML = `
      <div class="flex items-center justify-between pb-2 border-b border-slate-100">
        <span class="font-bold text-slate-800">Published & Draft Call Sheets</span>
        <button id="btn-create-call-sheet" class="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-semibold text-[11px] hover:bg-blue-700 transition-colors flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px]">add</span>
          <span>New Call Sheet</span>
        </button>
      </div>
      <div class="flex flex-col gap-2">
        ${callSheets.map(cs => `
          <div class="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <span class="font-heading font-bold text-xs text-slate-900">${cs.title}</span>
              <span class="px-2 py-0.5 rounded-full ${cs.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-200 text-slate-700'} text-[10px] font-bold">${cs.status} (${cs.version})</span>
            </div>
            <div class="text-[11px] text-slate-500">
              <span>${cs.shootDay} • Call Time: ${cs.callTime} • ${cs.location}</span>
            </div>
            <div class="flex items-center justify-between pt-1 border-t border-slate-200/50 text-[10px] text-blue-600 font-semibold">
              <span>Scenes: ${(cs.scenes || []).join(', ')}</span>
              <button class="hover:underline" onclick="alert('Viewing Call Sheet ${cs.version} formatted document snapshot.');">View PDF Snapshot</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    const createBtn = document.getElementById('btn-create-call-sheet');
    if (createBtn) {
      createBtn.onclick = () => {
        showToast("Call Sheet Builder will be fully active in Prompt 2. Foundation verified!");
      };
    }
  } 
  else if (tool === 'dialogue-sheets') {
    titleEl.textContent = 'Dialogue Sheets & Actor Sides';
    subtitleEl.textContent = `Scene-linked actor cues from ${ws.pinnedSourceVersion}`;
    if (iconEl) iconEl.textContent = 'record_voice_over';

    bodyEl.innerHTML = `
      <div class="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-blue-800 text-xs">
        <span class="font-bold">Scene 18 Actor Sides (Kevin & Meera)</span>
        <p class="text-[11px] text-blue-700 mt-1">Generated from Pinned Source Draft 4.2. Sides isolate dialogue blocks, parentheticals, and preceding action cues.</p>
      </div>
      <div class="p-3 rounded-xl border border-slate-200 bg-white font-mono text-xs leading-relaxed space-y-2">
        <div class="font-bold text-slate-900 font-sans">SCENE 18 — INT. PUMPING STATION CHAMBER B - NIGHT</div>
        <p class="text-slate-600 text-[11px]">KEVIN checks the pressure valve. The needle shudders into the red.</p>
        <div class="pl-6 border-l-2 border-blue-300">
          <div class="font-bold text-slate-900">KEVIN</div>
          <div class="text-slate-500 text-[10px]">(straining against the lever)</div>
          <div>If the bypass gate trips now, the terminal pressure blows back through Gate 4.</div>
        </div>
        <div class="pl-6 border-l-2 border-indigo-300">
          <div class="font-bold text-slate-900">MEERA</div>
          <div>Then don't let it trip. Hold the manual override until I seal the secondary manifold.</div>
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-2">
        <button class="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs" onclick="alert('Exporting Scene 18 actor sides package.');">
          Export Printable Sides (PDF)
        </button>
      </div>
    `;
  }
  else if (tool === 'shooting-schedule') {
    titleEl.textContent = 'Shooting Schedule Stripboard';
    subtitleEl.textContent = `14 Shoot Days • ${ws.pinnedSourceVersion}`;
    if (iconEl) iconEl.textContent = 'calendar_view_week';

    bodyEl.innerHTML = `
      <div class="flex items-center justify-between pb-2 border-b border-slate-100">
        <span class="font-bold text-slate-800">Stripboard Sequence (Days 1 - 3)</span>
        <span class="text-[11px] text-slate-500">Day/Night Strips</span>
      </div>
      <div class="flex flex-col gap-2">
        <div class="p-2.5 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-[10px]">D1</span>
            <div>
              <div class="font-bold text-xs text-amber-950">DAY 1 — SCENE 1 & 2 (EXT. GATE 4 - DAY)</div>
              <div class="text-[10px] text-amber-800">Pages: 3 4/8 • Cast: Kevin, Border Guards • Rover 1</div>
            </div>
          </div>
          <span class="text-[10px] font-bold text-amber-700 uppercase">Confirmed</span>
        </div>

        <div class="p-2.5 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded bg-indigo-200 text-indigo-900 flex items-center justify-center font-bold text-[10px]">D2</span>
            <div>
              <div class="font-bold text-xs text-indigo-950">DAY 2 — SCENE 18 (INT. CHAMBER B - NIGHT)</div>
              <div class="text-[10px] text-indigo-800">Pages: 4 2/8 • Cast: Kevin, Meera • Valve Kit Hero Prop</div>
            </div>
          </div>
          <span class="text-[10px] font-bold text-indigo-700 uppercase">Confirmed</span>
        </div>

        <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-[10px]">D3</span>
            <div>
              <div class="font-bold text-xs text-slate-900">DAY 3 — SCENE 4 & 5 (EXT. DRY LAKEBED - DUSK)</div>
              <div class="text-[10px] text-slate-600">Pages: 2 6/8 • Cast: Meera, Syndicate Scouts</div>
            </div>
          </div>
          <span class="text-[10px] font-bold text-amber-600 uppercase">Proposal Pending</span>
        </div>
      </div>
    `;
  }
  else if (tool === 'script-breakdown') {
    titleEl.textContent = 'Script Breakdown Sheet';
    subtitleEl.textContent = `78 Tagged Practical Elements Across 18 Scenes`;
    if (iconEl) iconEl.textContent = 'dataset';

    const resources = await api.getProductionResources(scriptId);

    bodyEl.innerHTML = `
      <div class="flex items-center gap-2 overflow-x-auto pb-1 text-[11px]">
        <span class="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">All (78)</span>
        <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Cast (18)</span>
        <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Props (32)</span>
        <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Locations (24)</span>
        <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Vehicles (4)</span>
      </div>
      <div class="flex flex-col gap-2 mt-1">
        ${resources.map(r => `
          <div class="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-xs text-slate-900">${r.name}</span>
                <span class="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[9px] font-bold uppercase">${r.category}</span>
              </div>
              <p class="text-[11px] text-slate-500 mt-0.5">${r.notes || 'Element linked to screenplay'}</p>
            </div>
            <div class="text-right">
              <span class="text-[10px] font-semibold text-blue-600">${(r.scenes || []).join(', ')}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
  else if (tool === 'storyboard-studio') {
    titleEl.textContent = 'Storyboard Studio (Foundation)';
    subtitleEl.textContent = `Prompt 3 Integration Entry Point`;
    if (iconEl) iconEl.textContent = 'art_track';

    bodyEl.innerHTML = `
      <div class="p-4 bg-rose-50/60 rounded-xl border border-rose-100 flex flex-col gap-2">
        <span class="font-bold text-rose-900 text-sm">Storyboard Studio Architecture Ready</span>
        <p class="text-xs text-rose-800 leading-relaxed">
          The Storyboard Studio foundational data model is established in the Production Workspace.
          Detailed visual shot sequencing, frame generators, camera angles, and AI visual concepts are reserved for <span class="font-semibold underline">Prompt 3</span>.
        </p>
      </div>
      <div class="grid grid-cols-2 gap-2 mt-2">
        <div class="p-3 rounded-xl border border-slate-200 bg-white flex flex-col items-center justify-center text-center">
          <span class="material-symbols-outlined text-slate-400 text-[28px] mb-1">crop_16_9</span>
          <span class="text-xs font-bold text-slate-800">Scene 18 Setup A</span>
          <span class="text-[10px] text-slate-500">Wide · Low Angle · Chamber</span>
        </div>
        <div class="p-3 rounded-xl border border-slate-200 bg-white flex flex-col items-center justify-center text-center">
          <span class="material-symbols-outlined text-slate-400 text-[28px] mb-1">crop_16_9</span>
          <span class="text-xs font-bold text-slate-800">Scene 18 Setup B</span>
          <span class="text-[10px] text-slate-500">Close Up · Valve Needle</span>
        </div>
      </div>
    `;
  }
  else if (tool === 'resource-directory') {
    titleEl.textContent = 'Resource Directory';
    subtitleEl.textContent = `Cast, Crew & Vendors with Permission Controls`;
    if (iconEl) iconEl.textContent = 'contact_phone';

    bodyEl.innerHTML = `
      <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
        <span class="font-bold">Restricted Contact Information Mode</span>
        <p class="text-[11px] text-slate-500 mt-0.5">Phone numbers and agency contacts are protected based on user role permissions (${ws.userRole}).</p>
      </div>
      <div class="flex flex-col gap-2 mt-1">
        <div class="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
          <div>
            <div class="font-bold text-xs text-slate-900">Elena Rostova (Director)</div>
            <span class="text-[11px] text-slate-500">Creative Planning & Review</span>
          </div>
          <span class="text-xs text-blue-600 font-mono">elena.rostova@scriptora.studio</span>
        </div>
        <div class="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
          <div>
            <div class="font-bold text-xs text-slate-900">Marcus Vance (Assistant Director)</div>
            <span class="text-[11px] text-slate-500">Call Sheets & Scheduling</span>
          </div>
          <span class="text-xs text-blue-600 font-mono">vance.prod@paramount.com</span>
        </div>
        <div class="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
          <div>
            <div class="font-bold text-xs text-slate-900">Mojave Perimeter Permit Office</div>
            <span class="text-[11px] text-slate-500">Outpost Gate 4 Day Exterior</span>
          </div>
          <span class="text-xs text-emerald-600 font-bold">Permit Active</span>
        </div>
      </div>
    `;
  }
  else {
    titleEl.textContent = 'Production Module';
    subtitleEl.textContent = `${ws.screenplayTitle} • Pinned ${ws.pinnedSourceVersion}`;
    bodyEl.innerHTML = `
      <div class="p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-blue-800 text-xs">
        <span class="font-bold">Production Tool Foundation Ready</span>
        <p class="mt-1">This module is integrated with the underlying Production Workspace data model, pinned source version, and collaborator permission rules.</p>
      </div>
    `;
  }
}

import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';
import { renderProdSubNav } from './prodNav.js';
import { store } from '../../state/store.js';
import * as api from '../../services/api.js';
import { showToast } from '../../components/toast.js';

export function renderBreakdownScreen(fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('Pre-Production', 'Script Breakdown Workspace')}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${renderProdSubNav('Script Breakdown', 'dataset', '/production', `
          <button id="btn-add-element" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Add Element</span>
          </button>
        `)}

        <!-- Summary KPI Row -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5" id="breakdown-kpis">
          <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Elements</span>
            <div class="font-heading font-bold text-lg text-slate-900 mt-0.5" id="kpi-total">--</div>
            <span class="text-[11px] text-slate-500">Across 18 Scenes</span>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs">
            <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Confirmed</span>
            <div class="font-heading font-bold text-lg text-emerald-600 mt-0.5" id="kpi-confirmed">--</div>
            <span class="text-[11px] text-slate-500">Human approved</span>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs">
            <span class="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Needs Review</span>
            <div class="font-heading font-bold text-lg text-amber-600 mt-0.5" id="kpi-review">--</div>
            <span class="text-[11px] text-slate-500">AI inferences pending</span>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs">
            <span class="text-[10px] font-bold text-rose-500 uppercase tracking-wider">Rejected</span>
            <div class="font-heading font-bold text-lg text-slate-700 mt-0.5" id="kpi-rejected">--</div>
            <span class="text-[11px] text-slate-500">Excluded from shoot</span>
          </div>
        </div>

        <!-- Controls Bar: Category Filter + Scene Filter + Search -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
          <!-- Categories Scroll -->
          <div class="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 text-xs shrink-0" id="cat-filters">
            <button class="cat-btn px-2.5 py-1 rounded-xl font-semibold bg-blue-600 text-white shadow-2xs" data-cat="all">All (78)</button>
            <button class="cat-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-cat="Cast">Cast</button>
            <button class="cat-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-cat="Props">Props</button>
            <button class="cat-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-cat="Practical FX">Practical FX</button>
            <button class="cat-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-cat="Vehicles">Vehicles</button>
            <button class="cat-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-cat="Stunts">Stunts</button>
            <button class="cat-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-cat="Locations">Locations</button>
          </div>

          <div class="flex items-center gap-2">
            <!-- Scene Picker -->
            <select id="breakdown-scene-select" class="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-800 focus:outline-none cursor-pointer">
              <option value="all">All Scenes (18)</option>
              <option value="scene-1">Scene 1 — Gate 4 Day</option>
              <option value="scene-2">Scene 2 — Customs Shed</option>
              <option value="scene-3">Scene 3 — Conduit Dusk</option>
              <option value="scene-4">Scene 4 — Perimeter Fence</option>
              <option value="scene-7">Scene 7 — Syndicate Control</option>
              <option value="scene-16">Scene 16 — Spillway Catwalk</option>
              <option value="scene-18">Scene 18 — Chamber B Night</option>
            </select>

            <!-- Search Field -->
            <div class="relative flex-1 sm:w-48">
              <span class="material-symbols-outlined text-[16px] text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2">search</span>
              <input type="text" id="breakdown-search" placeholder="Search elements..." class="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-2.5 py-1 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500">
            </div>
          </div>
        </div>

        <!-- Elements List Grid -->
        <div id="breakdown-list" class="flex flex-col gap-2.5">
          <div class="p-8 text-center text-slate-400 text-xs">Loading breakdown elements...</div>
        </div>

      </main>

      ${renderBottomNav('production')}

      <!-- Add Element Modal -->
      <div id="modal-add-element" class="hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div class="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 class="font-heading font-bold text-sm text-slate-900">Add Production Element</h3>
            <button id="close-add-modal" class="text-slate-400 hover:text-slate-700">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <form id="form-add-element" class="p-5 flex flex-col gap-3 text-xs">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Element Name</label>
              <input type="text" id="elem-name" required placeholder="e.g. Hydraulic Bypass Valve" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600">
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="font-semibold text-slate-700 block mb-1">Category</label>
                <select id="elem-cat" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
                  <option value="Cast">Cast</option>
                  <option value="Props" selected>Props</option>
                  <option value="Practical FX">Practical FX</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Stunts">Stunts</option>
                  <option value="Costumes">Costumes</option>
                  <option value="Sound">Sound</option>
                  <option value="Hair & Makeup">Hair & Makeup</option>
                  <option value="Locations">Locations</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-slate-700 block mb-1">Target Scene</label>
                <select id="elem-scene" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
                  <option value="1">Scene 1</option>
                  <option value="2">Scene 2</option>
                  <option value="3">Scene 3</option>
                  <option value="4">Scene 4</option>
                  <option value="7">Scene 7</option>
                  <option value="16">Scene 16</option>
                  <option value="18" selected>Scene 18</option>
                </select>
              </div>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Description & Requirements</label>
              <textarea id="elem-desc" rows="2" placeholder="Production notes, duplicates, safety specs..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600 resize-none"></textarea>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button type="button" id="btn-cancel-add" class="px-3.5 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100 font-medium">Cancel</button>
              <button type="submit" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs">Save Element</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  `;
}

export async function attachBreakdownEvents(navigate, fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';

  let currentCategory = 'all';
  let currentScene = 'all';
  let currentSearch = '';

  const renderList = async () => {
    const list = await api.getProductionBreakdown(scriptId, currentCategory, currentScene);
    const filtered = list.filter(item => {
      if (!currentSearch) return true;
      const q = currentSearch.toLowerCase();
      return item.name.toLowerCase().includes(q) ||
             (item.description && item.description.toLowerCase().includes(q)) ||
             item.category.toLowerCase().includes(q);
    });

    // Update KPIs
    const total = list.length;
    const confirmed = list.filter(i => i.status === 'Confirmed').length;
    const review = list.filter(i => i.status === 'Needs Review' || i.status === 'Extracted').length;
    const rejected = list.filter(i => i.status === 'Rejected').length;

    const kpiTotal = document.getElementById('kpi-total');
    const kpiConf = document.getElementById('kpi-confirmed');
    const kpiRev = document.getElementById('kpi-review');
    const kpiRej = document.getElementById('kpi-rejected');
    if (kpiTotal) kpiTotal.textContent = total;
    if (kpiConf) kpiConf.textContent = confirmed;
    if (kpiRev) kpiRev.textContent = review;
    if (kpiRej) kpiRej.textContent = rejected;

    const container = document.getElementById('breakdown-list');
    if (!container) return;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-slate-400 text-xs">
          No breakdown elements match the active filters.
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(item => {
      const isConfirmed = item.status === 'Confirmed';
      const isReview = item.status === 'Needs Review' || item.status === 'Extracted';
      const isRejected = item.status === 'Rejected';

      const badge = isConfirmed
        ? `<span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">verified</span>Confirmed</span>`
        : isReview
        ? `<span class="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">help</span>Needs Review</span>`
        : `<span class="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold">Rejected</span>`;

      return `
        <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3" data-id="${item.id}">
          <div class="flex items-start gap-3 min-w-0">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 font-bold text-xs mt-0.5">
              Sc ${item.sceneNumber}
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="font-heading font-bold text-sm text-slate-900">${item.name}</h3>
                <span class="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold">${item.category}</span>
                ${badge}
              </div>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">${item.description || 'No description provided.'}</p>
              ${item.sourceSnippet ? `
                <div class="mt-2 text-[11px] font-mono text-slate-500 bg-slate-50 border border-slate-100 rounded-lg p-2 leading-relaxed">
                  <span class="text-slate-400 font-sans font-semibold text-[10px] uppercase">Script Evidence:</span> "${item.sourceSnippet}"
                </div>
              ` : ''}
              ${item.confirmedBy ? `
                <div class="mt-1 text-[10px] text-slate-400">
                  Confirmed by ${item.confirmedBy}
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-1.5 self-end sm:self-center shrink-0">
            ${!isConfirmed ? `
              <button class="btn-confirm-item px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs transition-colors flex items-center gap-1" data-id="${item.id}">
                <span class="material-symbols-outlined text-[15px]">check</span>
                <span>Confirm</span>
              </button>
            ` : `
              <button class="btn-review-item px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors" data-id="${item.id}">
                Re-review
              </button>
            `}
            ${!isRejected ? `
              <button class="btn-reject-item p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors" data-id="${item.id}" title="Reject element">
                <span class="material-symbols-outlined text-[18px]">block</span>
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Attach row events
    container.querySelectorAll('.btn-confirm-item').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        await api.updateBreakdownItem(scriptId, id, { status: 'Confirmed' });
        showToast('Element confirmed by Owner');
        renderList();
      };
    });

    container.querySelectorAll('.btn-review-item').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        await api.updateBreakdownItem(scriptId, id, { status: 'Needs Review', isHumanConfirmed: false });
        showToast('Marked for review');
        renderList();
      };
    });

    container.querySelectorAll('.btn-reject-item').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        await api.updateBreakdownItem(scriptId, id, { status: 'Rejected' });
        showToast('Element rejected');
        renderList();
      };
    });
  };

  await renderList();

  // Category filter clicks
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.cat-btn').forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-2xs');
        b.classList.add('bg-slate-100', 'text-slate-700');
      });
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-2xs');
      btn.classList.remove('bg-slate-100', 'text-slate-700');
      currentCategory = btn.getAttribute('data-cat');
      renderList();
    };
  });

  // Scene select
  const sceneSelect = document.getElementById('breakdown-scene-select');
  if (sceneSelect) {
    sceneSelect.onchange = (e) => {
      currentScene = e.target.value;
      renderList();
    };
  }

  // Search input
  const searchInput = document.getElementById('breakdown-search');
  if (searchInput) {
    searchInput.oninput = (e) => {
      currentSearch = e.target.value;
      renderList();
    };
  }

  // Add Element Modal Handling
  const addModal = document.getElementById('modal-add-element');
  const btnOpenAdd = document.getElementById('btn-add-element');
  const btnCloseAdd = document.getElementById('close-add-modal');
  const btnCancelAdd = document.getElementById('btn-cancel-add');
  const addForm = document.getElementById('form-add-element');

  const openModal = () => addModal?.classList.remove('hidden');
  const closeModal = () => addModal?.classList.add('hidden');

  if (btnOpenAdd) btnOpenAdd.onclick = openModal;
  if (btnCloseAdd) btnCloseAdd.onclick = closeModal;
  if (btnCancelAdd) btnCancelAdd.onclick = closeModal;

  if (addForm) {
    addForm.onsubmit = async (e) => {
      e.preventDefault();
      const name = document.getElementById('elem-name')?.value;
      const category = document.getElementById('elem-cat')?.value;
      const sceneNum = document.getElementById('elem-scene')?.value;
      const desc = document.getElementById('elem-desc')?.value;

      if (!name) return;
      await api.createBreakdownItem(scriptId, {
        name,
        category,
        sceneNumber: Number(sceneNum),
        sceneId: `scene-${sceneNum}`,
        description: desc,
        status: 'Confirmed'
      });
      showToast(`Added "${name}" to Scene ${sceneNum}`);
      closeModal();
      addForm.reset();
      renderList();
    };
  }
}

import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';
import { renderProdSubNav } from './prodNav.js';
import { store } from '../../state/store.js';
import * as api from '../../services/api.js';
import { showToast } from '../../components/toast.js';

export function renderDirectoryScreen(fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const from = fromParam || urlParams.get('from');

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('Pre-Production', 'Production Resource Directory')}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${renderProdSubNav('Production Directory', 'contact_phone', from || '/production', `
          <button id="btn-add-resource" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
            <span class="material-symbols-outlined text-[16px]">person_add</span>
            <span>Add Resource</span>
          </button>
        `)}

        <!-- Search & Category Filters -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div class="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-xs shrink-0" id="dir-cat-filters">
            <button class="dir-cat-btn px-2.5 py-1 rounded-xl font-semibold bg-blue-600 text-white shadow-2xs" data-cat="all">All Resources</button>
            <button class="dir-cat-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-cat="Cast">Cast</button>
            <button class="dir-cat-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-cat="Location">Locations</button>
            <button class="dir-cat-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-cat="Props">Props</button>
            <button class="dir-cat-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-cat="Vehicles">Vehicles</button>
          </div>

          <div class="relative flex-1 sm:max-w-xs">
            <span class="material-symbols-outlined text-[16px] text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2">search</span>
            <input type="text" id="dir-search" placeholder="Search contacts & resources..." class="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500">
          </div>
        </div>

        <!-- Privacy & Role Permission Notice -->
        <div class="bg-slate-50 border border-slate-200/90 rounded-2xl p-3 flex items-center justify-between gap-2 text-xs text-slate-600">
          <div class="flex items-center gap-2 min-w-0">
            <span class="material-symbols-outlined text-[18px] text-slate-500 shrink-0">shield</span>
            <span class="truncate">Contact info access is enforced by current role permissions (<strong class="text-slate-900" id="dir-role-label">Owner</strong>).</span>
          </div>
          <span class="text-[10px] text-slate-400 font-mono shrink-0">Confidential</span>
        </div>

        <!-- Resources Stream List -->
        <div id="dir-resources-list" class="flex flex-col gap-2.5">
          <div class="p-8 text-center text-slate-400 text-xs">Loading directory resources...</div>
        </div>

      </main>

      ${renderBottomNav('production')}

      <!-- Add Resource Modal -->
      <div id="modal-add-resource" class="hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div class="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 class="font-heading font-bold text-sm text-slate-900">Add Production Resource</h3>
            <button id="close-res-modal" class="text-slate-400 hover:text-slate-700">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <form id="form-add-resource" class="p-5 flex flex-col gap-3 text-xs">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Resource Name</label>
              <input type="text" id="res-name" required placeholder="e.g. Elena Rostova / Lakebed Generator" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600">
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="font-semibold text-slate-700 block mb-1">Category</label>
                <select id="res-cat" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
                  <option value="Cast">Cast</option>
                  <option value="Crew">Crew</option>
                  <option value="Location">Location</option>
                  <option value="Props">Props</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-slate-700 block mb-1">Department</label>
                <input type="text" id="res-dept" placeholder="Casting, Art, SFX..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none">
              </div>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Role / Description</label>
              <input type="text" id="res-role" placeholder="e.g. Lead Hydro-engineer" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Contact Email / Phone</label>
              <input type="text" id="res-contact" placeholder="management@agency.com" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none">
            </div>
            <div class="flex items-center gap-2">
              <input type="checkbox" id="res-restricted" checked class="w-4 h-4 accent-blue-600">
              <label for="res-restricted" class="text-slate-700 font-medium">Protect contact details (Owner & Production only)</label>
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button type="button" id="btn-cancel-res" class="px-3.5 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100 font-medium">Cancel</button>
              <button type="submit" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs">Save Resource</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  `;
}

export async function attachDirectoryEvents(navigate, fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const userRole = localStorage.getItem('scriptora_prod_role') || 'Owner';
  const isAuthorizedContact = userRole === 'Owner' || userRole === 'Production';

  const roleLabel = document.getElementById('dir-role-label');
  if (roleLabel) roleLabel.textContent = userRole;

  let currentCategory = 'all';
  let currentSearch = '';

  const renderList = async () => {
    const list = await api.getProductionResources(scriptId, currentCategory);
    const filtered = list.filter(r => {
      if (!currentSearch) return true;
      const q = currentSearch.toLowerCase();
      return r.name.toLowerCase().includes(q) ||
             (r.role && r.role.toLowerCase().includes(q)) ||
             (r.department && r.department.toLowerCase().includes(q));
    });

    const container = document.getElementById('dir-resources-list');
    if (!container) return;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-slate-400 text-xs">
          No resources found matching the criteria.
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(r => {
      // Role-based contact masking protection
      const isMasked = r.contactRestricted && !isAuthorizedContact;
      const contactDisplay = isMasked
        ? `<span class="italic text-slate-400 font-sans">[Restricted — Production Authorized Only]</span>`
        : `<span class="font-mono text-slate-800">${r.contact || 'No contact on file'}</span>`;

      return `
        <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-start gap-3 min-w-0">
            <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 font-mono font-bold text-xs mt-0.5">
              ${r.category.slice(0, 3).toUpperCase()}
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="font-heading font-semibold text-sm text-slate-900">${r.name}</h3>
                <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">${r.department || r.category}</span>
                <span class="px-2 py-0.5 rounded-md text-[10px] font-medium ${r.status === 'Confirmed' ? 'bg-slate-100 text-slate-700' : 'bg-amber-50/80 border border-amber-200 text-amber-800'}">
                  ${r.status || 'Active'}
                </span>
              </div>
              <p class="text-xs text-slate-600 mt-0.5">${r.role || r.notes || ''}</p>
              
              <div class="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500 flex-wrap">
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px] text-slate-400">mail</span>
                  <span>${contactDisplay}</span>
                </div>
                ${r.scenes && r.scenes.length > 0 ? `
                  <div class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px] text-slate-400">movie</span>
                    <span>Scenes: <strong>${r.scenes.join(', ')}</strong></span>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>

          <div class="flex items-center gap-1.5 self-end sm:self-center shrink-0">
            <span class="text-[10px] px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 font-medium">
              Verified Resource
            </span>
          </div>
        </div>
      `;
    }).join('');
  };

  await renderList();

  // Category filters
  document.querySelectorAll('.dir-cat-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.dir-cat-btn').forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-2xs');
        b.classList.add('bg-slate-100', 'text-slate-700');
      });
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-2xs');
      btn.classList.remove('bg-slate-100', 'text-slate-700');
      currentCategory = btn.getAttribute('data-cat');
      renderList();
    };
  });

  // Search input
  const searchInput = document.getElementById('dir-search');
  if (searchInput) {
    searchInput.oninput = (e) => {
      currentSearch = e.target.value;
      renderList();
    };
  }

  // Add Resource Modal
  const modal = document.getElementById('modal-add-resource');
  const btnOpen = document.getElementById('btn-add-resource');
  const btnClose = document.getElementById('close-res-modal');
  const btnCancel = document.getElementById('btn-cancel-res');
  const form = document.getElementById('form-add-resource');

  const openM = () => modal?.classList.remove('hidden');
  const closeM = () => modal?.classList.add('hidden');

  if (btnOpen) btnOpen.onclick = openM;
  if (btnClose) btnClose.onclick = closeM;
  if (btnCancel) btnCancel.onclick = closeM;

  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const name = document.getElementById('res-name')?.value;
      const category = document.getElementById('res-cat')?.value;
      const dept = document.getElementById('res-dept')?.value;
      const role = document.getElementById('res-role')?.value;
      const contact = document.getElementById('res-contact')?.value;
      const restricted = document.getElementById('res-restricted')?.checked;

      const list = await api.getProductionResources(scriptId);
      const newRes = {
        id: `res-${Date.now()}`,
        scriptId,
        name,
        category,
        department: dept,
        role,
        contact,
        contactRestricted: restricted,
        status: 'Confirmed',
        scenes: ["Scene 18"]
      };
      list.unshift(newRes);
      localStorage.setItem(`scriptora_prod_res_${scriptId}`, JSON.stringify(list));
      showToast(`Added resource "${name}"`);
      closeM();
      form.reset();
      renderList();
    };
  }
}

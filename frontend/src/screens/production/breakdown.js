import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';
import { renderProdSubNav } from './prodNav.js';
import { store } from '../../state/store.js';
import * as api from '../../services/api.js';
import { showToast } from '../../components/toast.js';
import { exportBreakdownPdf } from '../../services/pdfExport.js';

// Category grouping configuration (Disciplined neutral palette matching Intelligence)
const CATEGORY_CONFIG = {
  'Cast': { icon: 'person' },
  'Locations': { icon: 'location_on' },
  'Props': { icon: 'inventory_2' },
  'Practical FX': { icon: 'science' },
  'Stunts': { icon: 'sports_kabaddi' },
  'Costumes': { icon: 'checkroom' },
  'Vehicles': { icon: 'commute' },
  'Sound': { icon: 'music_note' },
  'Hair & Makeup': { icon: 'face' }
};

export function renderBreakdownScreen(fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const from = fromParam || urlParams.get('from');

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('Pre-Production', 'Script Breakdown Workspace')}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${renderProdSubNav('Script Breakdown', 'dataset', from || '/production', `
          <div class="flex items-center gap-2">
            <button id="btn-export-breakdown-pdf" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer" title="Export genuine Script Breakdown Report PDF">
              <span class="material-symbols-outlined text-[16px]">download</span>
              <span class="hidden sm:inline">Export PDF</span>
            </button>
            <button id="btn-add-element" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">add</span>
              <span>Add Element</span>
            </button>
          </div>
        `)}

        <!-- Breakdown Status Summary -->
        <div class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
          <div class="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div class="p-2 sm:px-3 first:pl-1">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Total Elements</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5" id="kpi-total">--</div>
              <span class="text-[11px] text-slate-400">Across 18 Scenes</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Confirmed</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5" id="kpi-confirmed">--</div>
              <span class="text-[11px] text-slate-400">Locked for shoot</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">In Review</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5" id="kpi-review">--</div>
              <span class="text-[11px] text-slate-400">Pending sign-off</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Excluded</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5" id="kpi-rejected">--</div>
              <span class="text-[11px] text-slate-400">Out of schedule</span>
            </div>
          </div>
        </div>

        <!-- Category & Filter Controls Bar -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs flex flex-col gap-2.5">
          <!-- Top Row: Scene Select + Search + Filter Info -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold text-slate-500 shrink-0">Filter Scene:</span>
              <select id="breakdown-scene-select" class="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                <option value="all">All Scenes (18 Scenes)</option>
                <option value="scene-1">Scene 1 — Gate 4 Day</option>
                <option value="scene-2">Scene 2 — Customs Shed</option>
                <option value="scene-3">Scene 3 — Conduit Dusk</option>
                <option value="scene-4">Scene 4 — Perimeter Fence</option>
                <option value="scene-7">Scene 7 — Syndicate Control</option>
                <option value="scene-16">Scene 16 — Spillway Catwalk</option>
                <option value="scene-18">Scene 18 — Chamber B Night</option>
              </select>
            </div>

            <!-- Search Field -->
            <div class="relative flex-1 sm:max-w-xs">
              <span class="material-symbols-outlined text-[16px] text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2">search</span>
              <input type="text" id="breakdown-search" placeholder="Search elements, actors, notes..." class="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500">
            </div>
          </div>

          <!-- Bottom Row: Category Tabs -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs shrink-0 border-t border-slate-100 pt-2" id="cat-filters">
            <button class="cat-btn px-2.5 py-1 rounded-lg font-semibold bg-blue-600 text-white shadow-xs flex items-center gap-1 cursor-pointer" data-cat="all">
              <span>All Categories</span>
            </button>
            <button class="cat-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer" data-cat="Cast">
              <span class="material-symbols-outlined text-[14px] text-slate-400">person</span>
              <span>Cast & Characters</span>
            </button>
            <button class="cat-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer" data-cat="Locations">
              <span class="material-symbols-outlined text-[14px] text-slate-400">location_on</span>
              <span>Locations</span>
            </button>
            <button class="cat-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer" data-cat="Props">
              <span class="material-symbols-outlined text-[14px] text-slate-400">inventory_2</span>
              <span>Props</span>
            </button>
            <button class="cat-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer" data-cat="Practical FX">
              <span class="material-symbols-outlined text-[14px] text-slate-400">science</span>
              <span>Practical FX</span>
            </button>
            <button class="cat-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer" data-cat="Stunts">
              <span class="material-symbols-outlined text-[14px] text-slate-400">sports_kabaddi</span>
              <span>Stunts & Action</span>
            </button>
            <button class="cat-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer" data-cat="Costumes">
              <span class="material-symbols-outlined text-[14px] text-slate-400">checkroom</span>
              <span>Costumes</span>
            </button>
            <button class="cat-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer" data-cat="Vehicles">
              <span class="material-symbols-outlined text-[14px] text-slate-400">commute</span>
              <span>Vehicles</span>
            </button>
          </div>
        </div>

        <!-- Elements List Grid -->
        <div id="breakdown-list" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading breakdown elements...</div>
        </div>

      </main>

      ${renderBottomNav('production')}

      <!-- Add Element Modal -->
      <div id="modal-add-element" class="hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
        <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div class="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-blue-600">playlist_add</span>
              <h3 class="font-heading font-bold text-sm text-slate-900">Add Production Element</h3>
            </div>
            <button id="close-add-modal" class="text-slate-400 hover:text-slate-700 cursor-pointer">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          
          <form id="form-add-element" class="p-5 flex flex-col gap-3 text-xs overflow-y-auto flex-1">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="font-semibold text-slate-700 block mb-1">Element Name *</label>
                <input type="text" id="elem-name" required placeholder="e.g. Hydraulic Bypass Valve Kit" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600">
              </div>
              <div>
                <label class="font-semibold text-slate-700 block mb-1">Production Category *</label>
                <select id="elem-cat" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
                  <option value="Cast">Cast & Characters</option>
                  <option value="Props" selected>Props</option>
                  <option value="Practical FX">Practical FX & Special FX</option>
                  <option value="Stunts">Stunts & Action</option>
                  <option value="Locations">Locations</option>
                  <option value="Costumes">Costumes & Wardrobe</option>
                  <option value="Vehicles">Vehicles & Equipment</option>
                  <option value="Sound">Sound & Audio</option>
                  <option value="Hair & Makeup">Hair & Makeup</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="font-semibold text-slate-700 block mb-1">Associated Scenes (comma-separated)</label>
                <input type="text" id="elem-scenes" value="18" placeholder="e.g. 18 or 1, 4, 18" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600">
                <span class="text-[10px] text-slate-400 mt-0.5 block">Can link to multiple scenes simultaneously</span>
              </div>
              <div>
                <label class="font-semibold text-slate-700 block mb-1">Review Status</label>
                <select id="elem-status" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
                  <option value="Confirmed" selected>Confirmed (Human Approved)</option>
                  <option value="Needs Review">Needs Review (Pending Inspection)</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div>
              <label class="font-semibold text-slate-700 block mb-1">Description / Screenplay Context</label>
              <textarea id="elem-desc" rows="2" placeholder="Description of item, screenplay requirements or role..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600 resize-none"></textarea>
            </div>

            <!-- Dynamic Category Specific Inputs Area -->
            <div id="add-modal-category-fields" class="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col gap-2.5">
              <!-- Dynamically populated based on category -->
            </div>

            <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button type="button" id="btn-cancel-add" class="px-3.5 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100 font-medium cursor-pointer">Cancel</button>
              <button type="submit" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs cursor-pointer">Save Element</button>
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

  let currentCategory = urlParams.get('category') || 'all';
  let currentScene = urlParams.get('scene') || 'all';
  let currentSearch = urlParams.get('character') || urlParams.get('search') || '';
  let activeEditingItemId = null;

  // Initialize scene select value from URL if provided
  const sceneSelectInit = document.getElementById('breakdown-scene-select');
  if (sceneSelectInit && currentScene !== 'all') {
    sceneSelectInit.value = currentScene.startsWith('scene-') ? currentScene : `scene-${currentScene}`;
  }

  // Initialize category buttons if provided in URL
  if (currentCategory !== 'all') {
    document.querySelectorAll('.cat-btn').forEach(b => {
      if (b.getAttribute('data-cat') === currentCategory) {
        b.classList.add('bg-blue-600', 'text-white', 'shadow-2xs');
        b.classList.remove('bg-slate-100', 'text-slate-700');
      } else {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-2xs');
        b.classList.add('bg-slate-100', 'text-slate-700');
      }
    });
  }

  // Initialize search input if provided in URL
  const searchInputInit = document.getElementById('breakdown-search');
  if (searchInputInit && currentSearch) {
    searchInputInit.value = currentSearch;
  }

  const renderCategorySpecificCardContent = (item) => {
    const cat = item.category;

    if (cat === 'Cast') {
      const isUncast = !item.assignedActor || item.assignedActor.toLowerCase().includes('unassigned') || item.assignedActor.toLowerCase().includes('open');
      const castingStatusClass = item.castingStatus === 'Confirmed Cast' 
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
        : item.castingStatus === 'Offer Out'
        ? 'bg-sky-50 text-sky-700 border-sky-200'
        : 'bg-amber-50 text-amber-700 border-amber-200';

      return `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Actor</span>
            <div class="font-semibold text-slate-900 mt-0.5">
              ${isUncast ? `<span class="text-amber-700 italic">Unassigned (Open Role)</span>` : `<span class="text-indigo-700 font-bold">${item.assignedActor}</span>`}
            </div>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Casting Status</span>
            <span class="inline-block mt-0.5 px-2 py-0.5 rounded-lg border text-[11px] font-semibold ${castingStatusClass}">
              ${item.castingStatus || 'Auditioning'}
            </span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Actor Availability</span>
            <div class="text-slate-700 mt-0.5 font-medium truncate" title="${item.actorAvailability || 'Not specified'}">
              ${item.actorAvailability || 'Not specified'}
            </div>
          </div>
        </div>
      `;
    }

    if (cat === 'Props') {
      return `
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sourcing</span>
            <span class="font-semibold text-emerald-800 text-[11px]">${item.sourcingType || 'Prop House'}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quantity</span>
            <span class="font-semibold text-slate-900 text-[11px]">${item.quantity || '1'}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Readiness</span>
            <span class="font-semibold text-teal-700 text-[11px]">${item.readinessStatus || 'Ready'}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Continuity Notes</span>
            <span class="text-slate-600 text-[11px] truncate block" title="${item.continuityNotes || 'Standard'}">${item.continuityNotes || 'Standard'}</span>
          </div>
        </div>
      `;
    }

    if (cat === 'Practical FX') {
      return `
        <div class="flex flex-col gap-1.5 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div class="bg-purple-50/50 p-2 rounded-xl border border-purple-100">
              <span class="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">Required Resources</span>
              <span class="font-semibold text-purple-900 text-[11px]">${item.requiredResources || 'Standard FX Kit'}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Technical Specs</span>
              <span class="text-slate-800 font-medium text-[11px]">${item.technicalRequirements || 'Per department'}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prep Status</span>
              <span class="font-semibold text-emerald-700 text-[11px]">${item.prepStatus || 'Rigged & Tested'}</span>
            </div>
          </div>
          ${item.safetyNotes ? `
            <div class="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-1.5 text-[11px]">
              <span class="material-symbols-outlined text-[15px] text-rose-600 shrink-0 mt-0.5">warning</span>
              <div><strong class="font-semibold">Safety Mandate:</strong> ${item.safetyNotes}</div>
            </div>
          ` : ''}
        </div>
      `;
    }

    if (cat === 'Stunts') {
      return `
        <div class="flex flex-col gap-1.5 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div class="bg-rose-50/50 p-2 rounded-xl border border-rose-100">
              <span class="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">Safety Planning</span>
              <span class="font-semibold text-rose-900 text-[11px]">${item.safetyPlanningStatus || 'Review in Progress'}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Qualified Personnel</span>
              <span class="text-slate-800 font-medium text-[11px]">${item.qualifiedPersonnel || 'Lead Stunt Performer'}</span>
            </div>
            <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rigging Requirements</span>
              <span class="text-slate-800 font-medium text-[11px]">${item.coordinationRequirements || 'Coordinator on set'}</span>
            </div>
          </div>
        </div>
      `;
    }

    if (cat === 'Locations') {
      return `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-amber-50/50 p-2 rounded-xl border border-amber-100">
            <span class="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Context & Lighting</span>
            <span class="font-semibold text-amber-900 text-[11px]">${item.context || 'INT.'} · ${item.lighting || 'DAY'}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Location Status</span>
            <span class="font-semibold text-emerald-700 text-[11px]">${item.locationStatus || 'Permitted & Locked'}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Access Details</span>
            <span class="text-slate-700 text-[11px] truncate block" title="${item.accessDetails || 'Standard access'}">${item.accessDetails || 'Standard access'}</span>
          </div>
        </div>
      `;
    }

    if (cat === 'Costumes') {
      return `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-teal-50/50 p-2 rounded-xl border border-teal-100">
            <span class="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">Character</span>
            <span class="font-semibold text-teal-900 text-[11px]">${item.character || 'Cast member'}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Continuity Changes</span>
            <span class="text-slate-700 text-[11px] truncate block" title="${item.continuityChanges || 'Stage 1'}">${item.continuityChanges || 'Stage 1'}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prep Status</span>
            <span class="font-semibold text-emerald-700 text-[11px]">${item.prepStatus || 'Fitted & Approved'}</span>
          </div>
        </div>
      `;
    }

    if (cat === 'Vehicles') {
      return `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Availability</span>
            <span class="font-semibold text-slate-900 text-[11px]">${item.availability || 'On Set'}</span>
          </div>
          <div class="bg-slate-50/80 p-2 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Operational Requirements</span>
            <span class="text-slate-700 text-[11px]">${item.operationalRequirements || 'Qualified operator'}</span>
          </div>
        </div>
      `;
    }

    return '';
  };

  const renderInlineEditForm = (item) => {
    const cat = item.category;
    const sceneNumbers = (item.scenes && item.scenes.length > 0) ? item.scenes.join(', ') : item.sceneNumber;

    return `
      <div class="edit-panel mt-3 p-4 bg-slate-50/90 rounded-2xl border-2 border-blue-400/80 shadow-md flex flex-col gap-3 text-xs animate-in fade-in duration-150">
        <div class="flex items-center justify-between border-b border-slate-200 pb-2">
          <div class="flex items-center gap-1.5 font-heading font-bold text-blue-900">
            <span class="material-symbols-outlined text-[18px]">edit</span>
            <span>Edit Production Element: ${item.name}</span>
          </div>
          <span class="text-[10px] text-slate-500 font-medium">Owner Permissions Active</span>
        </div>

        <form class="form-edit-inline flex flex-col gap-3" data-id="${item.id}">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Element Name</label>
              <input type="text" name="name" value="${item.name || ''}" required class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Category</label>
              <select name="category" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                <option value="Cast" ${cat === 'Cast' ? 'selected' : ''}>Cast & Characters</option>
                <option value="Locations" ${cat === 'Locations' ? 'selected' : ''}>Locations</option>
                <option value="Props" ${cat === 'Props' ? 'selected' : ''}>Props</option>
                <option value="Practical FX" ${cat === 'Practical FX' ? 'selected' : ''}>Practical FX</option>
                <option value="Stunts" ${cat === 'Stunts' ? 'selected' : ''}>Stunts & Action</option>
                <option value="Costumes" ${cat === 'Costumes' ? 'selected' : ''}>Costumes & Wardrobe</option>
                <option value="Vehicles" ${cat === 'Vehicles' ? 'selected' : ''}>Vehicles & Equipment</option>
                <option value="Sound" ${cat === 'Sound' ? 'selected' : ''}>Sound</option>
                <option value="Hair & Makeup" ${cat === 'Hair & Makeup' ? 'selected' : ''}>Hair & Makeup</option>
              </select>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Review Status</label>
              <select name="status" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                <option value="Confirmed" ${item.status === 'Confirmed' ? 'selected' : ''}>Confirmed (Human Approved)</option>
                <option value="Needs Review" ${item.status === 'Needs Review' ? 'selected' : ''}>Needs Review</option>
                <option value="Rejected" ${item.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Scenes (comma separated)</label>
              <input type="text" name="scenes" value="${sceneNumbers}" placeholder="e.g. 1, 4, 18" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              <span class="text-[10px] text-slate-400">Links element to multiple scenes simultaneously</span>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Description / Screenplay Context</label>
              <input type="text" name="description" value="${item.description || ''}" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
            </div>
          </div>

          <!-- Dynamic Category Fields inside Edit Panel -->
          ${cat === 'Cast' ? `
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Assigned Actor</label>
                <input type="text" name="assignedActor" value="${item.assignedActor || ''}" placeholder="e.g. Dev Patel (or leave blank for Open)" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Casting Status</label>
                <select name="castingStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Confirmed Cast" ${item.castingStatus === 'Confirmed Cast' ? 'selected' : ''}>Confirmed Cast</option>
                  <option value="Offer Out" ${item.castingStatus === 'Offer Out' ? 'selected' : ''}>Offer Out</option>
                  <option value="Auditioning" ${item.castingStatus === 'Auditioning' ? 'selected' : ''}>Auditioning</option>
                  <option value="Uncast / Open" ${item.castingStatus === 'Uncast / Open' ? 'selected' : ''}>Uncast / Open Role</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-indigo-900 block mb-1">Actor Availability</label>
                <input type="text" name="actorAvailability" value="${item.actorAvailability || ''}" placeholder="e.g. Shoot Days 1-14" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          ` : ''}

          ${cat === 'Props' ? `
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-2.5 p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Sourcing Type</label>
                <select name="sourcingType" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Hero Prop" ${item.sourcingType === 'Hero Prop' ? 'selected' : ''}>Hero Prop</option>
                  <option value="Custom Build / Fabricate" ${item.sourcingType === 'Custom Build / Fabricate' ? 'selected' : ''}>Custom Build</option>
                  <option value="Prop House Rental" ${item.sourcingType === 'Prop House Rental' ? 'selected' : ''}>Prop House</option>
                  <option value="Purchased" ${item.sourcingType === 'Purchased' ? 'selected' : ''}>Purchased</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Quantity</label>
                <input type="text" name="quantity" value="${item.quantity || '1'}" placeholder="e.g. x2 Hero, x4 Rubber" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Readiness Status</label>
                <select name="readinessStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Ready in Art Dept" ${item.readinessStatus === 'Ready in Art Dept' ? 'selected' : ''}>Ready in Art Dept</option>
                  <option value="Fabrication Ready" ${item.readinessStatus === 'Fabrication Ready' ? 'selected' : ''}>Fabrication Ready</option>
                  <option value="In Progress" ${item.readinessStatus === 'In Progress' ? 'selected' : ''}>In Progress</option>
                  <option value="Pending Sourcing" ${item.readinessStatus === 'Pending Sourcing' ? 'selected' : ''}>Pending Sourcing</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-emerald-900 block mb-1">Continuity Notes</label>
                <input type="text" name="continuityNotes" value="${item.continuityNotes || ''}" placeholder="Continuity tracking..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          ` : ''}

          ${cat === 'Practical FX' ? `
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-purple-50/50 rounded-xl border border-purple-100">
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Required Resources</label>
                <input type="text" name="requiredResources" value="${item.requiredResources || ''}" placeholder="CO2, Brine Reservoir..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Technical Specs</label>
                <input type="text" name="technicalRequirements" value="${item.technicalRequirements || ''}" placeholder="Pressure limits, wiring..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-purple-900 block mb-1">Safety Notes</label>
                <input type="text" name="safetyNotes" value="${item.safetyNotes || ''}" placeholder="Goggles, splash radius..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          ` : ''}

          ${cat === 'Stunts' ? `
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-rose-50/50 rounded-xl border border-rose-100">
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Safety Planning Status</label>
                <select name="safetyPlanningStatus" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                  <option value="Rigging Rig Approved" ${item.safetyPlanningStatus === 'Rigging Rig Approved' ? 'selected' : ''}>Rigging Rig Approved</option>
                  <option value="Rehearsal Pending" ${item.safetyPlanningStatus === 'Rehearsal Pending' ? 'selected' : ''}>Rehearsal Pending</option>
                  <option value="In Coordinator Review" ${item.safetyPlanningStatus === 'In Coordinator Review' ? 'selected' : ''}>In Review</option>
                </select>
              </div>
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Qualified Personnel</label>
                <input type="text" name="qualifiedPersonnel" value="${item.qualifiedPersonnel || ''}" placeholder="Stunt double, rigger..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-rose-900 block mb-1">Coordination Details</label>
                <input type="text" name="coordinationRequirements" value="${item.coordinationRequirements || ''}" placeholder="Ratchet, cables..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          ` : ''}

          ${cat === 'Locations' ? `
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-amber-50/50 rounded-xl border border-amber-100">
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Context & Lighting</label>
                <input type="text" name="context" value="${item.context || 'INT.'}" placeholder="INT. or EXT." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Location Status</label>
                <input type="text" name="locationStatus" value="${item.locationStatus || 'Permitted & Locked'}" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="font-semibold text-amber-900 block mb-1">Access Details</label>
                <input type="text" name="accessDetails" value="${item.accessDetails || ''}" placeholder="Access permits, route..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-blue-500">
              </div>
            </div>
          ` : ''}

          <div class="flex items-center justify-between pt-2 border-t border-slate-200">
            <button type="button" class="btn-delete-element text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1 rounded-xl font-medium transition-colors cursor-pointer flex items-center gap-1" data-id="${item.id}">
              <span class="material-symbols-outlined text-[16px]">delete</span>
              <span>Delete / Archive</span>
            </button>
            <div class="flex items-center gap-2">
              <button type="button" class="btn-cancel-edit px-3 py-1.5 rounded-xl text-slate-600 hover:bg-slate-200 font-medium cursor-pointer">Cancel</button>
              <button type="submit" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs cursor-pointer flex items-center gap-1">
                <span class="material-symbols-outlined text-[15px]">save</span>
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    `;
  };

  const renderList = async () => {
    const list = await api.getProductionBreakdown(scriptId, currentCategory, currentScene);
    const filtered = list.filter(item => {
      if (!currentSearch) return true;
      const q = currentSearch.toLowerCase();
      return item.name.toLowerCase().includes(q) ||
             (item.description && item.description.toLowerCase().includes(q)) ||
             item.category.toLowerCase().includes(q) ||
             (item.assignedActor && item.assignedActor.toLowerCase().includes(q)) ||
             (item.notes && item.notes.toLowerCase().includes(q));
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
          No breakdown elements match the active category, scene, or search filters.
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(item => {
      const isConfirmed = item.status === 'Confirmed';
      const isReview = item.status === 'Needs Review' || item.status === 'Extracted';
      const isRejected = item.status === 'Rejected';
      const isEditing = activeEditingItemId === item.id;

      const catCfg = CATEGORY_CONFIG[item.category] || { icon: 'label' };

      const statusBadge = isConfirmed
        ? `<span class="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200 text-[10px] font-medium flex items-center gap-1"><span class="material-symbols-outlined text-[11px] text-emerald-600">check</span>Confirmed</span>`
        : isReview
        ? `<span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-medium flex items-center gap-1">Needs Review</span>`
        : `<span class="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-medium flex items-center gap-1">Excluded</span>`;

      // Multi-scene pills
      const scenesArr = Array.isArray(item.scenes) && item.scenes.length > 0 ? item.scenes : [item.sceneNumber];
      const scenesDisplay = scenesArr.map(s => `Sc ${s}`).join(', ');

      return `
        <div class="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs hover:border-slate-300 transition-colors flex flex-col gap-2.5" data-id="${item.id}">
          <!-- Top Row: Element Name on Left, then Scene Tag, Category Tag, Status, Action Buttons -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div class="flex items-center gap-2 flex-wrap min-w-0">
              <h3 class="font-heading font-bold text-base text-slate-900 tracking-tight shrink-0 mr-1">${item.name}</h3>
              <span class="px-2 py-0.5 rounded-md bg-blue-50/70 text-blue-700 border border-blue-100 font-semibold text-xs shrink-0 flex items-center gap-1">
                <span class="material-symbols-outlined text-[13px]">movie</span>
                <span>${scenesDisplay}</span>
              </span>
              <span class="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50 text-[11px] font-medium text-slate-700 flex items-center gap-1 shrink-0">
                <span class="material-symbols-outlined text-[13px] text-slate-400">${catCfg.icon}</span>
                <span>${item.category}</span>
              </span>
              ${statusBadge}
            </div>

            <!-- Primary Action Buttons -->
            <div class="flex items-center gap-1.5 self-end sm:self-center shrink-0">
              <button class="btn-toggle-edit px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer" data-id="${item.id}" title="Edit all fields of this element">
                <span class="material-symbols-outlined text-[15px]">${isEditing ? 'expand_less' : 'edit'}</span>
                <span>${isEditing ? 'Close' : 'Edit'}</span>
              </button>

              ${!isConfirmed ? `
                <button class="btn-confirm-item px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer" data-id="${item.id}">
                  <span class="material-symbols-outlined text-[15px]">check</span>
                  <span>Confirm</span>
                </button>
              ` : `
                <button class="btn-review-item px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-xs transition-colors cursor-pointer" data-id="${item.id}">
                  Re-review
                </button>
              `}

              ${!isRejected ? `
                <button class="btn-reject-item p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer" data-id="${item.id}" title="Reject element">
                  <span class="material-symbols-outlined text-[18px]">block</span>
                </button>
              ` : ''}
            </div>
          </div>

          <!-- Description / Role -->
          <p class="text-xs text-slate-600 leading-relaxed font-sans">${item.description || item.characterRole || 'No description provided.'}</p>

          <!-- Category Specific Rich Presentation Row -->
          ${renderCategorySpecificCardContent(item)}

          <!-- Traceability & Evidence Row -->
          <div class="flex flex-col gap-1.5 mt-1 pt-2 border-t border-slate-100">
            ${item.sourceSnippet ? `
              <div class="text-[11px] font-mono text-slate-600 bg-slate-50/80 border border-slate-200/60 rounded-xl p-2 leading-relaxed">
                <span class="text-slate-400 font-sans font-bold text-[10px] uppercase tracking-wider block mb-0.5">Screenplay Evidence (Draft 4.2):</span>
                "${item.sourceSnippet}"
              </div>
            ` : ''}

            <div class="flex items-center justify-between flex-wrap gap-2 text-[10px] text-slate-400">
              <div class="flex items-center gap-2">
                ${item.originalAiSuggestion ? `
                  <span class="text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">AI Extracted</span>
                ` : `
                  <span class="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-medium">Manual Entry</span>
                `}
                ${item.userCorrection ? `
                  <span class="text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5" title="Modified by user">
                    <span class="material-symbols-outlined text-[12px]">tune</span>
                    <span>Corrected by ${item.userCorrection.correctedBy || 'Owner'}</span>
                  </span>
                ` : ''}
              </div>

              ${item.confirmedBy ? `
                <div>Confirmed by <strong class="font-semibold text-slate-600">${item.confirmedBy}</strong></div>
              ` : ''}
            </div>
          </div>

          <!-- Inline Edit Area if active -->
          ${isEditing ? renderInlineEditForm(item) : ''}
        </div>
      `;
    }).join('');

    // Attach row events
    container.querySelectorAll('.btn-toggle-edit').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        activeEditingItemId = activeEditingItemId === id ? null : id;
        renderList();
      };
    });

    container.querySelectorAll('.btn-cancel-edit').forEach(btn => {
      btn.onclick = () => {
        activeEditingItemId = null;
        renderList();
      };
    });

    container.querySelectorAll('.form-edit-inline').forEach(form => {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const id = form.getAttribute('data-id');
        const formData = new FormData(form);

        // Parse scenes comma separated
        const scenesStr = formData.get('scenes') || '18';
        const scenes = scenesStr.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
        const sceneNum = scenes.length > 0 ? scenes[0] : 18;

        const updates = {
          name: formData.get('name'),
          category: formData.get('category'),
          status: formData.get('status'),
          description: formData.get('description'),
          scenes: scenes,
          sceneNumber: sceneNum,
          sceneId: `scene-${sceneNum}`,
          // Category-specific fields
          assignedActor: formData.get('assignedActor') || '',
          castingStatus: formData.get('castingStatus') || 'Uncast / Open',
          actorAvailability: formData.get('actorAvailability') || '',
          sourcingType: formData.get('sourcingType') || '',
          quantity: formData.get('quantity') || '',
          readinessStatus: formData.get('readinessStatus') || '',
          continuityNotes: formData.get('continuityNotes') || '',
          requiredResources: formData.get('requiredResources') || '',
          technicalRequirements: formData.get('technicalRequirements') || '',
          safetyNotes: formData.get('safetyNotes') || '',
          safetyPlanningStatus: formData.get('safetyPlanningStatus') || '',
          qualifiedPersonnel: formData.get('qualifiedPersonnel') || '',
          coordinationRequirements: formData.get('coordinationRequirements') || '',
          context: formData.get('context') || '',
          locationStatus: formData.get('locationStatus') || '',
          accessDetails: formData.get('accessDetails') || ''
        };

        await api.updateBreakdownItem(scriptId, id, updates);
        showToast(`Saved updates for "${updates.name}"`);
        activeEditingItemId = null;
        renderList();
      };
    });

    container.querySelectorAll('.btn-delete-element').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Are you sure you want to remove or archive this element from the breakdown?')) {
          await api.deleteBreakdownItem(scriptId, id);
          showToast('Element removed from breakdown');
          activeEditingItemId = null;
          renderList();
        }
      };
    });

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

  // Add Element Modal Dynamic Category Fields
  const elemCatSelect = document.getElementById('elem-cat');
  const catFieldsContainer = document.getElementById('add-modal-category-fields');

  const updateModalCategoryFields = () => {
    if (!catFieldsContainer || !elemCatSelect) return;
    const cat = elemCatSelect.value;

    if (cat === 'Cast') {
      catFieldsContainer.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Assigned Real-World Actor</label>
            <input type="text" id="add-actor" placeholder="Actor name (leave empty for Open role)" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Casting Status</label>
            <select id="add-casting-status" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
              <option value="Confirmed Cast">Confirmed Cast</option>
              <option value="Offer Out">Offer Out</option>
              <option value="Auditioning" selected>Auditioning</option>
              <option value="Uncast / Open">Uncast / Open Role</option>
            </select>
          </div>
        </div>
        <div>
          <label class="font-semibold text-slate-700 block mb-1">Actor Availability & Schedule</label>
          <input type="text" id="add-availability" placeholder="e.g. Weeks 1-3, Day shoot only" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
        </div>
      `;
    } else if (cat === 'Props') {
      catFieldsContainer.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Sourcing Type</label>
            <select id="add-prop-source" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
              <option value="Hero Prop">Hero Prop</option>
              <option value="Custom Build / Fabricate">Custom Build</option>
              <option value="Prop House Rental">Prop House Rental</option>
              <option value="Purchased">Purchased</option>
            </select>
          </div>
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Quantity</label>
            <input type="text" id="add-prop-qty" value="1" placeholder="e.g. x2 Hero" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Readiness</label>
            <select id="add-prop-readiness" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
              <option value="Ready in Art Dept">Ready in Art Dept</option>
              <option value="Fabrication Ready">Fabrication Ready</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending Sourcing">Pending Sourcing</option>
            </select>
          </div>
        </div>
        <div>
          <label class="font-semibold text-slate-700 block mb-1">Continuity Notes</label>
          <input type="text" id="add-prop-continuity" placeholder="e.g. Needs matching mud patina across scenes" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
        </div>
      `;
    } else if (cat === 'Practical FX') {
      catFieldsContainer.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Required Resources</label>
            <input type="text" id="add-fx-res" placeholder="e.g. Solenoid valves, Brine tanks" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Technical Specs</label>
            <input type="text" id="add-fx-tech" placeholder="e.g. 60 PSI regulator, catchment" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
          </div>
        </div>
        <div>
          <label class="font-semibold text-slate-700 block mb-1">Safety Notes & Mandates</label>
          <input type="text" id="add-fx-safety" placeholder="e.g. Splash goggles within 15ft, PPE" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
        </div>
      `;
    } else if (cat === 'Stunts') {
      catFieldsContainer.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Safety Planning Status</label>
            <select id="add-stunt-status" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
              <option value="Rigging Rig Approved">Rigging Rig Approved</option>
              <option value="Rehearsal Pending">Rehearsal Pending</option>
              <option value="In Coordinator Review" selected>In Review</option>
            </select>
          </div>
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Qualified Personnel</label>
            <input type="text" id="add-stunt-personnel" placeholder="e.g. Stunt Double, Rigging Lead" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
          </div>
        </div>
        <div>
          <label class="font-semibold text-slate-700 block mb-1">Coordination Requirements</label>
          <input type="text" id="add-stunt-coordination" placeholder="e.g. Tensioned cable, decelerator" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
        </div>
      `;
    } else if (cat === 'Locations') {
      catFieldsContainer.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Context</label>
            <select id="add-loc-context" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
              <option value="INT.">INT.</option>
              <option value="EXT.">EXT.</option>
              <option value="INT./EXT.">INT./EXT.</option>
            </select>
          </div>
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Lighting</label>
            <select id="add-loc-lighting" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
              <option value="DAY">DAY</option>
              <option value="NIGHT">NIGHT</option>
              <option value="DUSK">DUSK</option>
            </select>
          </div>
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Location Status</label>
            <input type="text" id="add-loc-status" value="Secured & Permitted" class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
          </div>
        </div>
      `;
    } else {
      catFieldsContainer.innerHTML = `
        <div>
          <label class="font-semibold text-slate-700 block mb-1">Department Notes</label>
          <input type="text" id="add-dept-notes" placeholder="Department-specific instructions..." class="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500">
        </div>
      `;
    }
  };

  if (elemCatSelect) {
    elemCatSelect.onchange = updateModalCategoryFields;
    updateModalCategoryFields();
  }

  // Add Element Modal Handling
  const addModal = document.getElementById('modal-add-element');
  const btnOpenAdd = document.getElementById('btn-add-element');
  const btnCloseAdd = document.getElementById('close-add-modal');
  const btnCancelAdd = document.getElementById('btn-cancel-add');
  const addForm = document.getElementById('form-add-element');

  const openModal = () => {
    updateModalCategoryFields();
    addModal?.classList.remove('hidden');
  };
  const closeModal = () => addModal?.classList.add('hidden');

  if (btnOpenAdd) btnOpenAdd.onclick = openModal;
  if (btnCloseAdd) btnCloseAdd.onclick = closeModal;
  if (btnCancelAdd) btnCancelAdd.onclick = closeModal;

  const exportBreakdownBtn = document.getElementById('btn-export-breakdown-pdf');
  if (exportBreakdownBtn) {
    exportBreakdownBtn.onclick = async () => {
      try {
        const list = await api.getProductionBreakdown(scriptId, currentCategory, currentScene);
        exportBreakdownPdf(list, {
          title: 'Chronicles of Dust',
          draft: 'Draft 4.2'
        });
        showToast(`Exported Breakdown Report (${list.length} elements) PDF`);
      } catch (err) {
        console.error(err);
        showToast('Failed to export breakdown PDF');
      }
    };
  }

  if (addForm) {
    addForm.onsubmit = async (e) => {
      e.preventDefault();
      const name = document.getElementById('elem-name')?.value;
      const category = document.getElementById('elem-cat')?.value;
      const scenesInput = document.getElementById('elem-scenes')?.value || '18';
      const status = document.getElementById('elem-status')?.value || 'Confirmed';
      const desc = document.getElementById('elem-desc')?.value;

      if (!name) return;

      const scenes = scenesInput.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
      const sceneNum = scenes.length > 0 ? scenes[0] : 18;

      const itemPayload = {
        name,
        category,
        sceneNumber: sceneNum,
        sceneId: `scene-${sceneNum}`,
        scenes: scenes,
        description: desc,
        status: status,
        sourceSnippet: `Manual production element registered for Scene ${scenes.join(', ')}`,
        assignedActor: document.getElementById('add-actor')?.value || '',
        castingStatus: document.getElementById('add-casting-status')?.value || 'Uncast / Open',
        actorAvailability: document.getElementById('add-availability')?.value || '',
        sourcingType: document.getElementById('add-prop-source')?.value || '',
        quantity: document.getElementById('add-prop-qty')?.value || '',
        readinessStatus: document.getElementById('add-prop-readiness')?.value || '',
        continuityNotes: document.getElementById('add-prop-continuity')?.value || '',
        requiredResources: document.getElementById('add-fx-res')?.value || '',
        technicalRequirements: document.getElementById('add-fx-tech')?.value || '',
        safetyNotes: document.getElementById('add-fx-safety')?.value || '',
        safetyPlanningStatus: document.getElementById('add-stunt-status')?.value || '',
        qualifiedPersonnel: document.getElementById('add-stunt-personnel')?.value || '',
        coordinationRequirements: document.getElementById('add-stunt-coordination')?.value || '',
        context: document.getElementById('add-loc-context')?.value || '',
        lighting: document.getElementById('add-loc-lighting')?.value || '',
        locationStatus: document.getElementById('add-loc-status')?.value || '',
        notes: document.getElementById('add-dept-notes')?.value || ''
      };

      await api.createBreakdownItem(scriptId, itemPayload);
      showToast(`Added "${name}" to Scene ${scenes.join(', ')}`);
      closeModal();
      addForm.reset();
      renderList();
    };
  }
}

import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';
import { renderProdSubNav } from './prodNav.js';
import { store } from '../../state/store.js';
import * as api from '../../services/api.js';
import { showToast } from '../../components/toast.js';
import { exportSchedulePdf, exportBreakdownPdf } from '../../services/pdfExport.js';

// Category icon map matching SCRIPTORA design tokens
const CATEGORY_ICONS = {
  'Cast': 'person',
  'Locations': 'location_on',
  'Props': 'inventory_2',
  'Practical FX': 'science',
  'Stunts': 'sports_kabaddi',
  'Costumes': 'checkroom',
  'Vehicles': 'commute',
  'Sound': 'music_note',
  'Hair & Makeup': 'face',
  'Equipment': 'videocam',
  'Special Equipment': 'videocam'
};

export function renderScheduleScreen(fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const from = fromParam || urlParams.get('from');

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('Pre-Production', 'Master Shooting Schedule')}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-4 fade-in">
        <!-- SubNav with Title, Project Context & Primary Actions -->
        ${renderProdSubNav('Shooting Schedule', 'calendar_month', from || '/production', `
          <div class="flex items-center gap-2">
            <button id="btn-export-schedule-pdf" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer" title="Export genuine Master Shooting Schedule PDF">
              <span class="material-symbols-outlined text-[16px]">download</span>
              <span class="hidden sm:inline">Export PDF</span>
            </button>
            <button id="btn-add-shoot-day" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer" title="Add a new shoot day to schedule">
              <span class="material-symbols-outlined text-[16px]">add_circle</span>
              <span>Add Date</span>
            </button>
          </div>
        `)}

        <!-- Top Context Header Bar: Project & Pinned Screenplay -->
        <div class="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 shadow-xs flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-lg">calendar_month</span>
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-heading font-semibold text-sm text-slate-900 truncate">Chronicles of Dust</span>
                <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  Draft 4.2 (Pinned)
                </span>
              </div>
              <p class="text-[11px] text-slate-500 truncate mt-0.5">Master shooting calendar • 7 Shoot Days • October 24 – October 30, 2026</p>
            </div>
          </div>
          <div class="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>100% Scenes Scheduled</span>
          </div>
        </div>

        <!-- Schedule Metrics Summary Bar -->
        <div class="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs">
          <div class="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div class="p-2 sm:px-3 first:pl-1">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Shoot Window</span>
              <div class="font-heading font-bold text-base sm:text-lg text-slate-900 mt-0.5">7 Days</div>
              <span class="text-[11px] text-slate-400">Oct 24 – Oct 30</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Scenes Scheduled</span>
              <div class="font-heading font-bold text-base sm:text-lg text-slate-900 mt-0.5">10 of 10 Scenes</div>
              <span class="text-[11px] text-emerald-600 font-medium">100% Allocated</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Script Pages</span>
              <div class="font-heading font-bold text-base sm:text-lg text-slate-900 mt-0.5">52.0 Pages</div>
              <span class="text-[11px] text-slate-400">Avg 7.4 pgs / day</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Primary Locations</span>
              <div class="font-heading font-bold text-base sm:text-lg text-slate-900 mt-0.5">3 Areas</div>
              <span class="text-[11px] text-slate-400">Mojave & Spillway</span>
            </div>
          </div>
        </div>

        <!-- Master Calendar Container -->
        <div id="schedule-calendar-container" class="flex flex-col gap-3 min-h-[300px]">
          <div class="p-12 text-center text-slate-400 text-xs">Loading shooting calendar...</div>
        </div>

        <!-- Simplified Day Details Modal (Opens when user clicks any calendar day) -->
        <div id="day-detail-modal" class="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
          <div class="bg-white rounded-2xl border border-slate-200/90 shadow-xl max-w-xl w-full p-4 sm:p-5 flex flex-col gap-3 max-h-[90vh] overflow-hidden">
            <!-- Modal Header: Day number, date, location & compact contextual menu -->
            <div class="flex items-center justify-between border-b border-slate-100 pb-3 gap-2">
              <div class="flex items-center gap-2.5 min-w-0">
                <div id="modal-day-badge" class="w-8 h-8 rounded-lg bg-slate-900 text-white font-heading font-bold text-xs flex items-center justify-center shrink-0">D1</div>
                <div class="min-w-0">
                  <h3 id="modal-day-title" class="font-heading font-bold text-sm text-slate-900 truncate">Day 1 • Oct 24</h3>
                  <p id="modal-day-sub" class="text-[11px] text-slate-500 truncate">Mojave Gate 4 • 7 5/8 pgs</p>
                </div>
              </div>
              <div class="flex items-center gap-1 shrink-0">
                <!-- Contextual menu for secondary day actions -->
                <div class="relative">
                  <button id="modal-day-menu-btn" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" title="Day actions">
                    <span class="material-symbols-outlined text-lg">more_vert</span>
                  </button>
                  <div id="modal-day-menu-dropdown" class="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl border border-slate-200 shadow-lg py-1 z-30 hidden">
                    <button id="modal-day-lock-toggle" class="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer">
                      <span id="modal-day-lock-icon" class="material-symbols-outlined text-[16px]">lock</span>
                      <span id="modal-day-lock-label">Lock Day</span>
                    </button>
                    <button id="modal-day-delete" class="w-full px-3 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer">
                      <span class="material-symbols-outlined text-[16px]">delete</span>
                      <span>Delete Day</span>
                    </button>
                  </div>
                </div>
                <button id="modal-day-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" title="Close">
                  <span class="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
            </div>

            <!-- Modal Content (Scene reordering & inline details) -->
            <div id="modal-day-content" class="flex-1 overflow-y-auto flex flex-col gap-2.5 pr-1 text-xs">
              <!-- Injected dynamically -->
            </div>

            <!-- Compact Footer: Essential action only -->
            <div class="flex items-center justify-end pt-2 border-t border-slate-100">
              <button id="modal-day-done" class="w-full sm:w-auto px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer text-center">
                Done
              </button>
            </div>
          </div>
        </div>

        <!-- Add Shoot Date Modal -->
        <div id="modal-add-day" class="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
          <div class="bg-white rounded-2xl border border-slate-200/90 shadow-xl max-w-md w-full p-4 sm:p-5 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <span class="material-symbols-outlined text-lg">calendar_add_on</span>
                </div>
                <div>
                  <h3 class="font-heading font-bold text-sm text-slate-900">Add Shoot Date</h3>
                  <p class="text-[11px] text-slate-500">Append a new shooting day to the calendar</p>
                </div>
              </div>
              <button id="modal-add-day-close" type="button" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
                <span class="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form id="form-add-shoot-day" class="flex flex-col gap-3">
              <div class="grid grid-cols-2 gap-2.5">
                <div class="flex flex-col gap-1">
                  <label class="text-[11px] font-semibold text-slate-600">Day Number</label>
                  <input type="number" id="input-add-day-num" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl text-slate-900 font-mono bg-slate-50 focus:outline-none focus:border-blue-600" required>
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-[11px] font-semibold text-slate-600">Calendar Date</label>
                  <input type="text" id="input-add-day-date" placeholder="e.g. Oct 31, 2026" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" required>
                </div>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-600">Shoot Day Title / Focus</label>
                <input type="text" id="input-add-day-title" placeholder="e.g. Day 8 — Second Unit & Pickups" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" required>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-600">Location / Stage</label>
                <input type="text" id="input-add-day-location" placeholder="e.g. Mojave Desert Facility — Sector 4" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" required>
              </div>

              <div class="grid grid-cols-2 gap-2.5">
                <div class="flex flex-col gap-1">
                  <label class="text-[11px] font-semibold text-slate-600">Est. Hours</label>
                  <input type="number" id="input-add-day-hours" value="10" min="1" max="24" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600">
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-[11px] font-semibold text-slate-600">Est. Pages</label>
                  <input type="text" id="input-add-day-pages" value="0.0" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600">
                </div>
              </div>

              <div class="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button type="button" id="modal-add-day-cancel" class="flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer">Cancel</button>
                <button type="submit" class="flex-1 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer">Add Shoot Date</button>
              </div>
            </form>
          </div>
        </div>

      </main>

      ${renderBottomNav('production')}
    </div>
  `;
}

export async function attachScheduleEvents(navigate, fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';

  const calendarContainer = document.getElementById('schedule-calendar-container');
  const dayModal = document.getElementById('day-detail-modal');
  if (!calendarContainer) return;

  let days = await api.getProductionSchedule(scriptId);
  let scenes = await api.getProductionScenes(scriptId);
  let breakdown = await api.getProductionBreakdown(scriptId);

  // Track currently expanded inline scenes inside the day modal: Set of scene IDs
  const expandedSceneIds = new Set();
  // Track open 'more details' sections: Set of scene IDs
  const openMoreDetailsIds = new Set();
  // Track scene editing state: Set of scene IDs
  const editingNotesSceneIds = new Set();

  // ---------------------------------------------------------------------------
  // CALENDAR VIEW RENDERER (Clean, readable chronological matrix)
  // ---------------------------------------------------------------------------
  function renderCalendar() {
    calendarContainer.innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col gap-3">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-blue-600 text-lg">calendar_month</span>
            <h3 class="font-heading font-semibold text-sm text-slate-900">Shooting Calendar Matrix</h3>
          </div>
          <span class="text-xs text-slate-500 font-medium">October 24 – October 30, 2026</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-1">
          ${days.map(d => {
            const dayScenes = (d.sceneNumbers || [])
              .map(num => scenes.find(s => s.sceneNumber === num))
              .filter(Boolean);

            return `
              <div class="calendar-day-card rounded-xl border border-slate-200/90 p-3 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between gap-2.5 bg-slate-50/40" data-day="${d.dayNumber}">
                <div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                      <span class="font-heading font-bold text-xs text-slate-900">Day ${d.dayNumber}</span>
                      ${d.isLocked ? `<span class="material-symbols-outlined text-slate-400 text-[13px]" title="Day locked">lock</span>` : ''}
                    </div>
                    <span class="text-[11px] font-mono text-slate-500 font-medium">${d.date.split(',')[0]}</span>
                  </div>
                  <div class="text-[11px] text-slate-700 font-medium mt-1 truncate">${d.location}</div>
                  <div class="text-[10px] text-slate-400 mt-0.5">${d.totalPages} pgs • ${d.estHours} hrs</div>
                </div>

                <div class="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <div class="flex items-center gap-1 overflow-hidden">
                    ${dayScenes.slice(0, 3).map(s => `
                      <button class="btn-badge-scene px-1.5 py-0.5 rounded bg-white hover:bg-blue-50 hover:border-blue-300 border border-slate-200 font-mono text-[9px] font-bold text-slate-700 transition-colors cursor-pointer" data-scene-id="${s.id}" title="View Scene ${s.sceneNumber} details">#${s.sceneNumber}</button>
                    `).join('')}
                    ${dayScenes.length > 3 ? `<span class="text-[10px] text-slate-400">+${dayScenes.length - 3}</span>` : ''}
                  </div>
                  <span class="text-blue-600 font-semibold text-[10px] flex items-center gap-0.5">
                    Open &rarr;
                  </span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Attach click events on day cards to open Day Details modal
    calendarContainer.querySelectorAll('.calendar-day-card').forEach(el => {
      el.onclick = () => {
        const dayNum = el.getAttribute('data-day');
        if (dayNum) openDayModal(dayNum);
      };
    });

    // Attach click events specifically on scene badges to directly open that day with scene details expanded inline
    calendarContainer.querySelectorAll('.btn-badge-scene').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const scId = btn.getAttribute('data-scene-id');
        if (scId) openSceneDetail(scId);
      };
    });
  }

  // ---------------------------------------------------------------------------
  // DAY DETAILS MODAL LOGIC (Compact view with inline scene expansion)
  // ---------------------------------------------------------------------------
  let currentOpenDayNumber = null;

  function openDayModal(dayNumber, autoExpandSceneId = null) {
    const day = days.find(d => d.dayNumber === Number(dayNumber));
    if (!day) return;
    currentOpenDayNumber = day.dayNumber;

    if (autoExpandSceneId) {
      const matchScene = scenes.find(s => s.id === autoExpandSceneId || String(s.sceneNumber) === String(autoExpandSceneId));
      if (matchScene) {
        expandedSceneIds.add(matchScene.id);
      }
    }

    const modalBadge = document.getElementById('modal-day-badge');
    const modalTitle = document.getElementById('modal-day-title');
    const modalSub = document.getElementById('modal-day-sub');
    const modalContent = document.getElementById('modal-day-content');
    const menuBtn = document.getElementById('modal-day-menu-btn');
    const menuDropdown = document.getElementById('modal-day-menu-dropdown');
    const lockToggle = document.getElementById('modal-day-lock-toggle');
    const lockLabel = document.getElementById('modal-day-lock-label');
    const lockIcon = document.getElementById('modal-day-lock-icon');
    const deleteBtn = document.getElementById('modal-day-delete');

    // Header: Keep only day number, date, location & pages
    if (modalBadge) modalBadge.textContent = `D${day.dayNumber}`;
    if (modalTitle) modalTitle.textContent = `Day ${day.dayNumber} • ${day.date.split(',')[0]}`;
    if (modalSub) modalSub.textContent = `${day.location}${day.totalPages ? ` • ${day.totalPages} pgs` : ''}`;

    // Contextual menu setup
    if (menuDropdown) menuDropdown.classList.add('hidden');
    if (menuBtn && menuDropdown) {
      menuBtn.onclick = (e) => {
        e.stopPropagation();
        menuDropdown.classList.toggle('hidden');
      };
    }

    if (lockLabel) lockLabel.textContent = day.isLocked ? 'Unlock Day' : 'Lock Day';
    if (lockIcon) lockIcon.textContent = day.isLocked ? 'lock_open' : 'lock';

    if (lockToggle) {
      lockToggle.onclick = async (e) => {
        e.stopPropagation();
        menuDropdown?.classList.add('hidden');
        day.isLocked = !day.isLocked;
        await api.updateProductionScheduleDay(scriptId, day.dayNumber, { isLocked: day.isLocked });
        showToast(`Day ${day.dayNumber} ${day.isLocked ? 'locked' : 'unlocked'}`);
        if (lockLabel) lockLabel.textContent = day.isLocked ? 'Unlock Day' : 'Lock Day';
        if (lockIcon) lockIcon.textContent = day.isLocked ? 'lock_open' : 'lock';
        renderCalendar();
      };
    }

    if (deleteBtn) {
      deleteBtn.onclick = async (e) => {
        e.stopPropagation();
        menuDropdown?.classList.add('hidden');
        if (!confirm(`Are you sure you want to remove Shoot Day ${day.dayNumber}? Any scenes should be moved first.`)) return;
        const res = await api.deleteProductionScheduleDay(scriptId, day.dayNumber);
        if (res.success) {
          showToast(`Shoot Day ${day.dayNumber} deleted`);
          closeDayModal();
          days = await api.getProductionSchedule(scriptId);
          renderCalendar();
        } else {
          showToast(res.message || 'Failed to delete day');
        }
      };
    }

    const dayScenes = (day.sceneNumbers || [])
      .map(num => scenes.find(s => s.sceneNumber === num))
      .filter(Boolean);

    if (modalContent) {
      modalContent.innerHTML = `
        <!-- Collapsible Production Constraints (Progressive Disclosure) -->
        <div class="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/50">
          <button id="btn-toggle-day-constraints" class="w-full px-3 py-2 flex items-center justify-between text-left text-xs text-slate-700 hover:bg-slate-100/60 transition-colors cursor-pointer">
            <span class="font-medium flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[15px] text-slate-400">info</span>
              <span>Production Constraints (${day.estHours} hrs)</span>
            </span>
            <span id="constraints-chevron" class="material-symbols-outlined text-[16px] text-slate-400 transition-transform">expand_more</span>
          </button>
          <div id="day-constraints-content" class="px-3 pb-2.5 pt-1 text-[11px] text-slate-600 border-t border-slate-200/60 hidden flex flex-col gap-1">
            <div><span class="text-slate-400 font-medium">Location:</span> ${day.location}</div>
            <div><span class="text-slate-400 font-medium">Estimated Daily Hours:</span> ${day.estHours} hrs (including meal break)</div>
            <div><span class="text-slate-400 font-medium">Rest Turnaround:</span> Standard 12-hour crew rest turnaround active</div>
          </div>
        </div>

        <!-- Assigned Scenes Header -->
        <div class="flex items-center justify-between pt-1">
          <span class="font-heading font-semibold text-slate-900 text-xs">Assigned Scenes (${dayScenes.length})</span>
          <span class="text-[11px] text-slate-400 font-mono">${day.totalPages} pages total</span>
        </div>

        <!-- Concise Scene List with Inline Expansion -->
        <div class="flex flex-col gap-2">
          ${dayScenes.length > 0 ? dayScenes.map((s, idx) => {
            const isExpanded = expandedSceneIds.has(s.id);
            const isMoreOpen = openMoreDetailsIds.has(s.id);
            const isEditingNotes = editingNotesSceneIds.has(s.id);

            // Fetch elements for this scene from cached breakdown
            const sElements = breakdown.filter(b => b.sceneId === s.id || b.sceneNumber === s.sceneNumber || (Array.isArray(b.scenes) && b.scenes.includes(s.sceneNumber)));

            return `
              <div class="scene-item-card rounded-xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs transition-all" data-scene-num="${s.sceneNumber}" data-scene-id="${s.id}">
                <!-- Compact Scene Row -->
                <div class="p-2.5 sm:p-3 flex items-center justify-between gap-2">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <span class="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 font-mono font-bold text-xs flex items-center justify-center text-slate-800 shrink-0">#${s.sceneNumber}</span>
                    <div class="min-w-0">
                      <div class="font-medium text-slate-900 text-xs truncate leading-snug">${s.heading}</div>
                      <div class="text-[11px] text-slate-500 font-medium">${s.pages} pgs</div>
                    </div>
                  </div>

                  <div class="flex items-center gap-1 shrink-0">
                    <button class="btn-scene-up p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer" data-scene="${s.sceneNumber}" ${idx === 0 ? 'disabled' : ''} title="Move earlier in shooting order">
                      <span class="material-symbols-outlined text-[16px]">arrow_upward</span>
                    </button>
                    <button class="btn-scene-down p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer" data-scene="${s.sceneNumber}" ${idx === dayScenes.length - 1 ? 'disabled' : ''} title="Move later in shooting order">
                      <span class="material-symbols-outlined text-[16px]">arrow_downward</span>
                    </button>
                    <button class="btn-toggle-scene-inline px-2.5 py-1 rounded-lg ${isExpanded ? 'bg-blue-600 text-white font-semibold' : 'bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold border border-blue-200/80'} text-[11px] flex items-center gap-1 transition-colors cursor-pointer" data-scene-id="${s.id}">
                      <span>Details</span>
                      <span class="material-symbols-outlined text-[14px] transition-transform inline-details-chevron ${isExpanded ? 'rotate-180' : ''}">expand_more</span>
                    </button>
                  </div>
                </div>

                <!-- Inline Expanded Scene Details (Normal Document Flow) -->
                <div class="scene-inline-details border-t border-slate-100 bg-slate-50/60 p-3 ${isExpanded ? '' : 'hidden'} flex flex-col gap-2.5 text-xs text-slate-700">
                  <!-- Initial Compact Summary: Full heading, assigned day, screenplay/draft, snippet, compact quick actions -->
                  <div class="flex flex-col gap-1.5">
                    <div>
                      <h4 class="font-heading font-bold text-xs text-slate-900 leading-snug">#${s.sceneNumber} ${s.heading}</h4>
                      <p class="text-[11px] text-slate-500 mt-0.5">
                        Shoot Day ${day.dayNumber} • Chronicles of Dust • Draft 4.2 (Pinned)
                      </p>
                    </div>

                    ${s.snippet ? `
                      <p class="text-[11px] text-slate-600 bg-white border border-slate-200/80 rounded-lg p-2 leading-relaxed">
                        ${s.snippet}
                      </p>
                    ` : ''}

                    <!-- Quick Action Links -->
                    <div class="flex items-center gap-2 pt-0.5 flex-wrap">
                      <button class="btn-scene-breakdown inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-medium text-slate-700 shadow-2xs transition-colors cursor-pointer" data-scene-num="${s.sceneNumber}">
                        <span class="material-symbols-outlined text-[14px] text-blue-600">dataset</span>
                        <span>Breakdown</span>
                      </button>
                      <button class="btn-scene-sides inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-medium text-slate-700 shadow-2xs transition-colors cursor-pointer" data-scene-num="${s.sceneNumber}">
                        <span class="material-symbols-outlined text-[14px] text-blue-600">description</span>
                        <span>Actor Sides</span>
                      </button>
                      <button class="btn-scene-pdf inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-medium text-slate-700 shadow-2xs transition-colors cursor-pointer" data-scene-id="${s.id}">
                        <span class="material-symbols-outlined text-[14px] text-blue-600">download</span>
                        <span>Export PDF</span>
                      </button>
                    </div>
                  </div>

                  <!-- Expandable 'More Details' Section -->
                  <div class="pt-1">
                    <button class="btn-toggle-more-details w-full py-1.5 px-2.5 rounded-lg bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer" data-scene-id="${s.id}">
                      <span class="flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-[15px] text-slate-500">tune</span>
                        <span>More Details</span>
                      </span>
                      <span class="material-symbols-outlined text-[16px] text-slate-400 transition-transform more-details-chevron ${isMoreOpen ? 'rotate-180' : ''}">expand_more</span>
                    </button>

                    <div class="more-details-panel ${isMoreOpen ? '' : 'hidden'} flex flex-col gap-2.5 pt-2 text-xs">
                      <!-- Cast -->
                      <div class="flex flex-col gap-1">
                        <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Cast</span>
                        <div class="flex items-center gap-1.5 flex-wrap">
                          ${(s.cast && s.cast.length > 0) ? s.cast.map(c => `
                            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-800">
                              <span class="w-3.5 h-3.5 rounded-full bg-slate-100 text-slate-600 text-[9px] flex items-center justify-center font-bold">${c.charAt(0)}</span>
                              <span>${c}</span>
                            </span>
                          `).join('') : '<span class="text-slate-400 text-[11px] italic">No cast assigned</span>'}
                        </div>
                      </div>

                      <!-- Breakdown Elements -->
                      <div class="flex flex-col gap-1 pt-1 border-t border-slate-200/60">
                        <div class="flex items-center justify-between">
                          <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Breakdown Elements (${sElements.length})</span>
                          <button class="btn-scene-breakdown text-[11px] text-blue-600 font-medium hover:underline cursor-pointer" data-scene-num="${s.sceneNumber}">Edit in Breakdown &rarr;</button>
                        </div>
                        ${sElements.length > 0 ? `
                          <div class="flex items-center gap-1.5 flex-wrap">
                            ${sElements.map(elem => `
                              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] text-slate-700">
                                <span class="material-symbols-outlined text-[13px] text-blue-600">${CATEGORY_ICONS[elem.category] || 'label'}</span>
                                <span>${elem.name}</span>
                                ${elem.category ? `<span class="text-slate-400 text-[9px]">(${elem.category})</span>` : ''}
                              </span>
                            `).join('')}
                          </div>
                        ` : `
                          <div class="text-[11px] text-slate-400 italic py-0.5">No breakdown elements tagged for this scene.</div>
                        `}
                      </div>

                      <!-- Move Shoot Day -->
                      <div class="flex items-center justify-between gap-2 pt-1 border-t border-slate-200/60">
                        <span class="text-[11px] font-medium text-slate-600">Assigned Shoot Day:</span>
                        <div class="flex items-center gap-1.5">
                          <select class="select-inline-move-day bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] text-slate-800 font-medium focus:outline-none cursor-pointer" data-scene="${s.sceneNumber}">
                            ${days.map(d => `
                              <option value="${d.dayNumber}" ${d.dayNumber === day.dayNumber ? 'selected' : ''}>
                                Day ${d.dayNumber} (${d.date.split(',')[0]})
                              </option>
                            `).join('')}
                          </select>
                          <button class="btn-inline-move-day px-2 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold cursor-pointer" data-scene="${s.sceneNumber}">
                            Move
                          </button>
                        </div>
                      </div>

                      <!-- Production & Continuity Notes (Compact Editable Workflow) -->
                      <div class="notes-container border-t border-slate-200/60 pt-1.5 flex flex-col gap-1.5">
                        <div class="flex items-center justify-between">
                          <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Production & Continuity Notes</span>
                          <button class="btn-edit-notes text-[11px] text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer" data-scene-id="${s.id}">
                            <span class="material-symbols-outlined text-[13px]">edit</span>
                            <span>${(s.directorNotes || s.continuityNotes) ? 'Edit Notes' : 'Add Notes'}</span>
                          </button>
                        </div>

                        <!-- Display Mode (Collapsed by default, shown when not editing) -->
                        <div class="notes-display-mode ${isEditingNotes ? 'hidden' : ''} flex flex-col gap-1 text-[11px] text-slate-600 bg-white border border-slate-200/70 rounded-lg p-2">
                          ${(s.directorNotes || s.continuityNotes) ? `
                            ${s.directorNotes ? `<div><span class="font-medium text-slate-800">Director:</span> ${s.directorNotes}</div>` : ''}
                            ${s.continuityNotes ? `<div><span class="font-medium text-slate-800">Continuity:</span> ${s.continuityNotes}</div>` : ''}
                          ` : `
                            <div class="text-slate-400 italic">No production or continuity notes logged.</div>
                          `}
                        </div>

                        <!-- Editable Fields (Only visible when explicitly editing) -->
                        <div class="notes-edit-mode ${isEditingNotes ? '' : 'hidden'} flex flex-col gap-2 bg-white border border-slate-200 rounded-xl p-2.5">
                          <div>
                            <label class="block text-[10px] font-semibold text-slate-600 mb-0.5">Director's Notes</label>
                            <textarea class="input-director-notes w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" rows="2" placeholder="Camera, lighting, director preferences...">${s.directorNotes || ''}</textarea>
                          </div>
                          <div>
                            <label class="block text-[10px] font-semibold text-slate-600 mb-0.5">Continuity Notes</label>
                            <textarea class="input-continuity-notes w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" rows="2" placeholder="Props, costume, timeline markers...">${s.continuityNotes || ''}</textarea>
                          </div>
                          <div class="flex items-center justify-end gap-2 pt-1">
                            <button class="btn-cancel-notes px-2.5 py-1 rounded-lg text-slate-600 hover:bg-slate-100 text-[11px] font-medium cursor-pointer" data-scene-id="${s.id}">
                              Cancel
                            </button>
                            <button class="btn-save-notes px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold shadow-2xs transition-colors cursor-pointer" data-scene-id="${s.id}">
                              Save Notes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('') : `
            <div class="text-center py-4 text-slate-400 text-xs italic">No scenes assigned to this day.</div>
          `}
        </div>
      `;

      // 1. Wire Constraints toggle
      const constraintsBtn = document.getElementById('btn-toggle-day-constraints');
      const constraintsContent = document.getElementById('day-constraints-content');
      const constraintsChevron = document.getElementById('constraints-chevron');
      if (constraintsBtn && constraintsContent) {
        constraintsBtn.onclick = () => {
          const isHidden = constraintsContent.classList.toggle('hidden');
          if (constraintsChevron) {
            constraintsChevron.classList.toggle('rotate-180', !isHidden);
          }
        };
      }

      // 2. Wire Inline Scene Details Expand/Collapse
      modalContent.querySelectorAll('.btn-toggle-scene-inline').forEach(btn => {
        btn.onclick = () => {
          const scId = btn.getAttribute('data-scene-id');
          if (!scId) return;
          if (expandedSceneIds.has(scId)) {
            expandedSceneIds.delete(scId);
          } else {
            expandedSceneIds.add(scId);
          }
          openDayModal(day.dayNumber);
        };
      });

      // 3. Wire More Details Toggle
      modalContent.querySelectorAll('.btn-toggle-more-details').forEach(btn => {
        btn.onclick = () => {
          const scId = btn.getAttribute('data-scene-id');
          if (!scId) return;
          if (openMoreDetailsIds.has(scId)) {
            openMoreDetailsIds.delete(scId);
          } else {
            openMoreDetailsIds.add(scId);
          }
          openDayModal(day.dayNumber);
        };
      });

      // 4. Wire Scene Reorder Up / Down
      modalContent.querySelectorAll('.btn-scene-up').forEach(btn => {
        btn.onclick = async () => {
          const scNum = Number(btn.getAttribute('data-scene'));
          const idx = day.sceneNumbers.indexOf(scNum);
          if (idx > 0) {
            const arr = [...day.sceneNumbers];
            const temp = arr[idx];
            arr[idx] = arr[idx - 1];
            arr[idx - 1] = temp;
            day.sceneNumbers = arr;
            await api.reorderSceneWithinDay(scriptId, day.dayNumber, arr);
            showToast('Scene shooting order updated');
            renderCalendar();
            openDayModal(day.dayNumber);
          }
        };
      });

      modalContent.querySelectorAll('.btn-scene-down').forEach(btn => {
        btn.onclick = async () => {
          const scNum = Number(btn.getAttribute('data-scene'));
          const idx = day.sceneNumbers.indexOf(scNum);
          if (idx < day.sceneNumbers.length - 1) {
            const arr = [...day.sceneNumbers];
            const temp = arr[idx];
            arr[idx] = arr[idx + 1];
            arr[idx + 1] = temp;
            day.sceneNumbers = arr;
            await api.reorderSceneWithinDay(scriptId, day.dayNumber, arr);
            showToast('Scene shooting order updated');
            renderCalendar();
            openDayModal(day.dayNumber);
          }
        };
      });

      // 5. Wire Inline Move Shoot Day
      modalContent.querySelectorAll('.btn-inline-move-day').forEach(btn => {
        btn.onclick = async () => {
          const scNum = Number(btn.getAttribute('data-scene'));
          const card = btn.closest('.scene-item-card');
          const select = card?.querySelector('.select-inline-move-day');
          const targetDayNum = Number(select?.value);
          if (!targetDayNum || targetDayNum === day.dayNumber) {
            showToast(`Scene ${scNum} is already on Day ${day.dayNumber}`);
            return;
          }
          await api.moveSceneBetweenDays(scriptId, scNum, day.dayNumber, targetDayNum);
          days = await api.getProductionSchedule(scriptId);
          showToast(`Scene ${scNum} moved to Shoot Day ${targetDayNum}`);
          renderCalendar();
          openDayModal(day.dayNumber);
        };
      });

      // 6. Wire Production Notes Editing Workflow
      modalContent.querySelectorAll('.btn-edit-notes').forEach(btn => {
        btn.onclick = () => {
          const scId = btn.getAttribute('data-scene-id');
          if (scId) {
            editingNotesSceneIds.add(scId);
            openDayModal(day.dayNumber);
          }
        };
      });

      modalContent.querySelectorAll('.btn-cancel-notes').forEach(btn => {
        btn.onclick = () => {
          const scId = btn.getAttribute('data-scene-id');
          if (scId) {
            editingNotesSceneIds.delete(scId);
            openDayModal(day.dayNumber);
          }
        };
      });

      modalContent.querySelectorAll('.btn-save-notes').forEach(btn => {
        btn.onclick = async () => {
          const scId = btn.getAttribute('data-scene-id');
          const card = btn.closest('.scene-item-card');
          const dirNotes = card?.querySelector('.input-director-notes')?.value || '';
          const contNotes = card?.querySelector('.input-continuity-notes')?.value || '';
          const sc = scenes.find(s => s.id === scId);
          if (sc) {
            sc.directorNotes = dirNotes;
            sc.continuityNotes = contNotes;
            await api.updateProductionScene(scriptId, sc.id, {
              directorNotes: dirNotes,
              continuityNotes: contNotes
            });
            showToast(`Scene ${sc.sceneNumber} notes saved`);
            editingNotesSceneIds.delete(scId);
            openDayModal(day.dayNumber);
          }
        };
      });

      // 7. Wire Quick Links: Breakdown, Sides, PDF
      modalContent.querySelectorAll('.btn-scene-breakdown').forEach(btn => {
        btn.onclick = () => {
          const scNum = btn.getAttribute('data-scene-num');
          navigate(`/production/breakdown?scriptId=${scriptId}&scene=${scNum}`);
        };
      });

      modalContent.querySelectorAll('.btn-scene-sides').forEach(btn => {
        btn.onclick = () => {
          const scNum = btn.getAttribute('data-scene-num');
          navigate(`/production/dialogue-sides?scriptId=${scriptId}&scene=${scNum}`);
        };
      });

      modalContent.querySelectorAll('.btn-scene-pdf').forEach(btn => {
        btn.onclick = () => {
          const scId = btn.getAttribute('data-scene-id');
          const sc = scenes.find(s => s.id === scId);
          if (!sc) return;
          const scElements = breakdown.filter(b => b.sceneId === sc.id || b.sceneNumber === sc.sceneNumber || (Array.isArray(b.scenes) && b.scenes.includes(sc.sceneNumber)));
          try {
            exportBreakdownPdf(scElements, {
              title: `Chronicles of Dust — Scene ${sc.sceneNumber}`,
              draft: 'Draft 4.2'
            });
            showToast(`Exported Scene ${sc.sceneNumber} Logistics PDF`);
          } catch (err) {
            console.error(err);
            showToast('Failed to export scene PDF');
          }
        };
      });

      // If auto-expand requested, scroll matching scene into view
      if (autoExpandSceneId) {
        setTimeout(() => {
          const targetCard = modalContent.querySelector(`[data-scene-id="${autoExpandSceneId}"], [data-scene-num="${autoExpandSceneId}"]`);
          targetCard?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
      }
    }

    dayModal?.classList.remove('hidden');
  }

  // Close Day Modal
  const modalClose = document.getElementById('modal-day-close');
  const modalDone = document.getElementById('modal-day-done');
  const closeDayModal = () => {
    dayModal?.classList.add('hidden');
    currentOpenDayNumber = null;
    document.getElementById('modal-day-menu-dropdown')?.classList.add('hidden');
  };
  if (modalClose) modalClose.onclick = closeDayModal;
  if (modalDone) modalDone.onclick = closeDayModal;
  if (dayModal) {
    dayModal.onclick = (e) => {
      if (e.target === dayModal) closeDayModal();
    };
  }

  // Close dropdown on window click outside
  window.addEventListener('click', (e) => {
    const dropdown = document.getElementById('modal-day-menu-dropdown');
    const menuBtn = document.getElementById('modal-day-menu-btn');
    if (dropdown && !dropdown.classList.contains('hidden')) {
      if (!dropdown.contains(e.target) && !menuBtn?.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    }
  });

  // ---------------------------------------------------------------------------
  // INTEGRATED SCENE OPENER (Opens day and expands scene inline in normal flow)
  // ---------------------------------------------------------------------------
  async function openSceneDetail(sceneId) {
    let scene = scenes.find(s => s.id === sceneId || String(s.sceneNumber) === String(sceneId) || `scene-${s.sceneNumber}` === String(sceneId));
    if (!scene) {
      scene = await api.getProductionScene(scriptId, sceneId);
    }
    if (!scene) {
      showToast('Scene not found in current schedule');
      return;
    }

    // Find currently assigned day in schedule
    const assignedDay = days.find(d => (d.sceneNumbers || []).includes(scene.sceneNumber));
    if (assignedDay) {
      openDayModal(assignedDay.dayNumber, scene.id);
    } else if (days.length > 0) {
      openDayModal(days[0].dayNumber, scene.id);
    }
  }

  // ---------------------------------------------------------------------------
  // PRIMARY ACTION BUTTON: EXPORT MASTER SCHEDULE PDF
  // ---------------------------------------------------------------------------
  const exportPdfBtn = document.getElementById('btn-export-schedule-pdf');
  if (exportPdfBtn) {
    exportPdfBtn.onclick = () => {
      try {
        exportSchedulePdf(days, scenes, {
          title: 'Chronicles of Dust',
          draft: 'Draft 4.2'
        });
        showToast('Exported Master Shooting Schedule PDF');
      } catch (err) {
        console.error(err);
        showToast('Failed to export schedule PDF');
      }
    };
  }

  // ---------------------------------------------------------------------------
  // ADD SHOOT DATE MODAL LOGIC
  // ---------------------------------------------------------------------------
  const addDayModal = document.getElementById('modal-add-day');
  const addDayBtn = document.getElementById('btn-add-shoot-day');
  const addDayCloseBtn = document.getElementById('modal-add-day-close');
  const addDayCancelBtn = document.getElementById('modal-add-day-cancel');
  const addDayForm = document.getElementById('form-add-shoot-day');

  function openAddDayModal() {
    if (!addDayModal) return;
    const nextDayNum = days.length > 0 ? Math.max(...days.map(d => d.dayNumber)) + 1 : 1;
    const inputNum = document.getElementById('input-add-day-num');
    const inputDate = document.getElementById('input-add-day-date');
    const inputTitle = document.getElementById('input-add-day-title');
    const inputLocation = document.getElementById('input-add-day-location');
    const inputHours = document.getElementById('input-add-day-hours');
    const inputPages = document.getElementById('input-add-day-pages');

    if (inputNum) inputNum.value = nextDayNum;
    if (inputDate) {
      const baseDate = new Date(2026, 9, 23 + nextDayNum);
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      inputDate.value = `${months[baseDate.getMonth()]} ${baseDate.getDate()}, ${baseDate.getFullYear()}`;
    }
    if (inputTitle) inputTitle.value = `Day ${nextDayNum} — Second Unit & Pickups`;
    if (inputLocation) inputLocation.value = 'Mojave Soundstage 2';
    if (inputHours) inputHours.value = '10';
    if (inputPages) inputPages.value = '0.0';

    addDayModal.classList.remove('hidden');
  }

  function closeAddDayModal() {
    addDayModal?.classList.add('hidden');
  }

  if (addDayBtn) addDayBtn.onclick = openAddDayModal;
  if (addDayCloseBtn) addDayCloseBtn.onclick = closeAddDayModal;
  if (addDayCancelBtn) addDayCancelBtn.onclick = closeAddDayModal;
  if (addDayModal) {
    addDayModal.onclick = (e) => {
      if (e.target === addDayModal) closeAddDayModal();
    };
  }

  if (addDayForm) {
    addDayForm.onsubmit = async (e) => {
      e.preventDefault();
      const dayNumber = Number(document.getElementById('input-add-day-num')?.value) || (days.length + 1);
      const date = document.getElementById('input-add-day-date')?.value || `Shoot Day ${dayNumber}`;
      const title = document.getElementById('input-add-day-title')?.value || `Day ${dayNumber}`;
      const location = document.getElementById('input-add-day-location')?.value || 'Location TBD';
      const estHours = Number(document.getElementById('input-add-day-hours')?.value) || 10;
      const totalPages = document.getElementById('input-add-day-pages')?.value || '0.0';

      await api.addProductionScheduleDay(scriptId, {
        dayNumber,
        title,
        date,
        location,
        estHours,
        totalPages,
        sceneNumbers: []
      });

      days = await api.getProductionSchedule(scriptId);
      closeAddDayModal();
      showToast(`Added Shoot Day ${dayNumber} (${date})`);
      renderCalendar();
    };
  }

  // Initial Calendar Render
  renderCalendar();

  // If a sceneId or scene query parameter was provided, open the scene details immediately
  const targetSceneId = urlParams.get('sceneId') || urlParams.get('scene');
  if (targetSceneId) {
    openSceneDetail(targetSceneId);
  }
}

import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';
import { renderProdSubNav } from './prodNav.js';
import { store } from '../../state/store.js';
import * as api from '../../services/api.js';
import { showToast } from '../../components/toast.js';
import { exportSchedulePdf, exportBreakdownPdf } from '../../services/pdfExport.js';
import { setupPopupToggle, openModal, closeModal } from '../../utils/popupPosition.js';

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
        `, null, 'Master shooting schedule & stripboard.')}

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
        <div id="day-detail-modal" class="scriptora-modal-overlay fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-xs flex hidden">
          <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-xl max-w-xl w-full p-4 sm:p-5 flex flex-col gap-3 overflow-hidden">
            <!-- Modal Header: Day number, date, location & compact contextual menu -->
            <div class="flex items-center justify-between border-b border-slate-100 pb-3 gap-2">
              <div class="flex items-center gap-2.5 min-w-0">
                <div id="modal-day-badge" class="w-8 h-8 rounded-lg bg-slate-900 text-white font-heading font-bold text-xs flex items-center justify-center shrink-0">D1</div>
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5">
                    <h3 id="modal-day-title" class="font-heading font-bold text-sm text-slate-900 truncate">Day 1 • Oct 24</h3>
                    <button id="modal-day-edit-btn" class="p-0.5 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer" title="Edit Shoot Day Info">
                      <span class="material-symbols-outlined text-[15px]">edit</span>
                    </button>
                  </div>
                  <p id="modal-day-sub" class="text-[11px] text-slate-500 truncate cursor-pointer hover:text-blue-600 transition-colors" title="Click to edit location & hours">Mojave Gate 4 • 7 5/8 pgs</p>
                </div>
              </div>
              <div class="flex items-center gap-1 shrink-0">
                <!-- Contextual menu for secondary day actions -->
                <div class="relative">
                  <button id="modal-day-menu-btn" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" title="Day actions">
                    <span class="material-symbols-outlined text-lg">more_vert</span>
                  </button>
                  <div id="modal-day-menu-dropdown" class="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl border border-slate-200 shadow-lg py-1 z-30 hidden">
                    <button id="modal-day-menu-edit" class="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer">
                      <span class="material-symbols-outlined text-[16px]">edit_calendar</span>
                      <span>Edit Day Info</span>
                    </button>
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
            <div id="modal-day-content" class="scriptora-modal-body flex-1 overflow-y-auto flex flex-col gap-2.5 pr-1 text-xs">
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
        <div id="modal-add-day" class="scriptora-modal-overlay fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-xs flex hidden">
          <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-xl max-w-md w-full p-4 sm:p-5 flex flex-col gap-4 overflow-y-auto">
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
  // DAY DETAILS MODAL LOGIC (Fully editable with inline scene expansion)
  // ---------------------------------------------------------------------------
  let currentOpenDayNumber = null;
  let editingDayInfo = false;
  let editingDayConstraints = false;
  const editingSceneCards = new Set();
  let showAssignSceneDropdown = false;
  const editingSnippetSceneIds = new Set();
  const addingCastSceneIds = new Set();
  let modalMenuHandler = null;

  function recalculateDayPages(dayObj) {
    const scs = (dayObj.sceneNumbers || []).map(num => scenes.find(s => s.sceneNumber === num)).filter(Boolean);
    let totalEighths = 0;
    scs.forEach(sc => {
      const m = (sc.pages || '').match(/(\d+)\s*(\d+)\/8/);
      if (m) {
        totalEighths += parseInt(m[1], 10) * 8 + parseInt(m[2], 10);
      } else {
        const p = parseFloat(sc.pages);
        if (!isNaN(p)) {
          totalEighths += Math.round(p * 8);
        }
      }
    });
    const whole = Math.floor(totalEighths / 8);
    const eighths = totalEighths % 8;
    dayObj.totalPages = `${whole} ${eighths}/8`;
    return dayObj.totalPages;
  }

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
    const editDayBtn = document.getElementById('modal-day-edit-btn');
    const menuEditBtn = document.getElementById('modal-day-menu-edit');
    const lockToggle = document.getElementById('modal-day-lock-toggle');
    const lockLabel = document.getElementById('modal-day-lock-label');
    const lockIcon = document.getElementById('modal-day-lock-icon');
    const deleteBtn = document.getElementById('modal-day-delete');

    // Header: Keep day badge, date, location & pages
    if (modalBadge) modalBadge.textContent = `D${day.dayNumber}`;
    if (modalTitle) modalTitle.textContent = `Day ${day.dayNumber} • ${day.date.split(',')[0]}`;
    if (modalSub) modalSub.textContent = `${day.location}${day.totalPages ? ` • ${day.totalPages} pgs` : ''}`;

    // Contextual menu setup with robust positioning
    if (menuBtn && menuDropdown) {
      menuDropdown.classList.add('hidden');
      modalMenuHandler = setupPopupToggle(menuBtn, menuDropdown, { placement: 'bottom-end', zIndex: 120 });
      menuBtn.onclick = (e) => { e.stopPropagation(); modalMenuHandler.toggle(); };
    }

    if (editDayBtn) {
      editDayBtn.onclick = () => {
        editingDayInfo = !editingDayInfo;
        openDayModal(day.dayNumber);
      };
    }
    if (menuEditBtn) {
      menuEditBtn.onclick = (e) => {
        e.stopPropagation();
        modalMenuHandler?.close();
        editingDayInfo = !editingDayInfo;
        openDayModal(day.dayNumber);
      };
    }
    if (modalSub) {
      modalSub.onclick = () => {
        editingDayInfo = true;
        openDayModal(day.dayNumber);
      };
    }

    if (lockLabel) lockLabel.textContent = day.isLocked ? 'Unlock Day' : 'Lock Day';
    if (lockIcon) lockIcon.textContent = day.isLocked ? 'lock_open' : 'lock';

    if (lockToggle) {
      lockToggle.onclick = async (e) => {
        e.stopPropagation();
        modalMenuHandler?.close();
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
        modalMenuHandler?.close();
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

    // Scenes not yet assigned to this day
    const availableScenesToAssign = scenes.filter(s => !day.sceneNumbers.includes(s.sceneNumber));

    if (modalContent) {
      modalContent.innerHTML = `
        <!-- Optional Inline Day Info Editor -->
        ${editingDayInfo ? `
          <div class="bg-blue-50/70 border border-blue-200 rounded-xl p-3 flex flex-col gap-2.5 animate-in fade-in">
            <div class="flex items-center justify-between">
              <span class="font-heading font-bold text-xs text-blue-950 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[15px] text-blue-600">edit_calendar</span>
                <span>Edit Shoot Day ${day.dayNumber} Info</span>
              </span>
              <button id="btn-cancel-day-top" class="text-slate-400 hover:text-slate-700 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div>
                <label class="block text-slate-600 font-medium mb-1">Shoot Date</label>
                <input type="text" id="input-edit-day-date" class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500" value="${day.date}" placeholder="e.g. Oct 25, 2026" />
              </div>
              <div>
                <label class="block text-slate-600 font-medium mb-1">Estimated Daily Hours</label>
                <input type="number" id="input-edit-day-hours" class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500" value="${day.estHours || 11}" step="0.5" />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-slate-600 font-medium mb-1">Primary Location / Focus</label>
                <input type="text" id="input-edit-day-loc" class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500" value="${day.location || ''}" placeholder="e.g. Chamber B Dry Tank" />
              </div>
            </div>
            <div class="flex items-center justify-end gap-2 pt-1 border-t border-blue-200/60">
              <button id="btn-cancel-day-info" class="px-2.5 py-1 rounded-lg text-slate-600 hover:bg-slate-200/60 text-[11px] font-medium cursor-pointer">Cancel</button>
              <button id="btn-save-day-info" class="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold shadow-2xs transition-colors cursor-pointer">Save Day</button>
            </div>
          </div>
        ` : ''}

        <!-- Assigned Scenes Header with Assign Button -->
        <div class="flex items-center justify-between pt-0.5">
          <span class="font-heading font-semibold text-slate-900 text-xs">Assigned Scenes (${dayScenes.length})</span>
          <button id="btn-toggle-assign-scene" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 text-[11px] font-semibold transition-colors cursor-pointer" title="Assign scene to this shoot day">
            <span class="material-symbols-outlined text-[13px]">add</span>
            <span>Assign Scene</span>
          </button>
        </div>

        <!-- Inline Scene Assign Selector -->
        ${showAssignSceneDropdown ? `
          <div class="bg-blue-50/70 border border-blue-200 rounded-xl p-2.5 flex flex-col gap-2 animate-in fade-in">
            <div class="flex items-center justify-between text-xs font-semibold text-blue-900">
              <span>Add Screenplay Scene to Shoot Day ${day.dayNumber}</span>
              <button id="btn-close-assign-scene" class="text-slate-400 hover:text-slate-700 cursor-pointer">
                <span class="material-symbols-outlined text-[15px]">close</span>
              </button>
            </div>
            ${availableScenesToAssign.length > 0 ? `
              <div class="flex items-center gap-2">
                <select id="select-scene-to-assign" class="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none cursor-pointer">
                  ${availableScenesToAssign.map(sc => `
                    <option value="${sc.sceneNumber}">#${sc.sceneNumber} ${sc.heading} (${sc.pages} pgs)</option>
                  `).join('')}
                </select>
                <button id="btn-confirm-assign-scene" class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs transition-colors cursor-pointer shrink-0">
                  Add to Day
                </button>
              </div>
            ` : `
              <div class="text-[11px] text-slate-500 py-1">All scenes from this screenplay are already assigned.</div>
            `}
          </div>
        ` : ''}

        <!-- Concise Scene List with Inline Expansion & Inline Quick-Edit -->
        <div class="flex flex-col gap-2">
          ${dayScenes.length > 0 ? dayScenes.map((s, idx) => {
            const isExpanded = expandedSceneIds.has(s.id);
            const isMoreOpen = openMoreDetailsIds.has(s.id);
            const isEditingNotes = editingNotesSceneIds.has(s.id);
            const isEditingCard = editingSceneCards.has(s.id);
            const isEditingSnippet = editingSnippetSceneIds.has(s.id);
            const isAddingCast = addingCastSceneIds.has(s.id);

            // Fetch elements for this scene from cached breakdown
            const sElements = breakdown.filter(b => b.sceneId === s.id || b.sceneNumber === s.sceneNumber || (Array.isArray(b.scenes) && b.scenes.includes(s.sceneNumber)));

            return `
              <div class="scene-item-card rounded-xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs transition-all" data-scene-num="${s.sceneNumber}" data-scene-id="${s.id}">
                ${isEditingCard ? `
                  <!-- Inline Edit Scene Mode -->
                  <div class="p-3 bg-blue-50/40 flex flex-col gap-2">
                    <div class="text-[11px] font-bold text-slate-800 flex items-center justify-between border-b border-blue-200/60 pb-1.5">
                      <span>Edit Scene #${s.sceneNumber}</span>
                      <button class="btn-cancel-scene-edit text-slate-400 hover:text-slate-700 cursor-pointer" data-scene-id="${s.id}">
                        <span class="material-symbols-outlined text-[15px]">close</span>
                      </button>
                    </div>
                    <div class="flex flex-col gap-1.5">
                      <div>
                        <label class="block text-[10px] text-slate-500 font-semibold mb-0.5">Scene Heading</label>
                        <input type="text" class="input-scene-heading w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 focus:outline-none focus:border-blue-500" value="${s.heading}" />
                      </div>
                      <div class="grid grid-cols-2 gap-2">
                        <div>
                          <label class="block text-[10px] text-slate-500 font-semibold mb-0.5">Pages</label>
                          <input type="text" class="input-scene-pages w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 focus:outline-none focus:border-blue-500" value="${s.pages}" placeholder="e.g. 7 2/8" />
                        </div>
                        <div>
                          <label class="block text-[10px] text-slate-500 font-semibold mb-0.5">Complexity</label>
                          <select class="input-scene-complexity w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 focus:outline-none">
                            <option value="Low" ${s.complexity === 'Low' ? 'selected' : ''}>Low</option>
                            <option value="Medium" ${s.complexity === 'Medium' || !s.complexity ? 'selected' : ''}>Medium</option>
                            <option value="High" ${s.complexity === 'High' ? 'selected' : ''}>High</option>
                          </select>
                        </div>
                      </div>
                      <div class="flex items-center justify-between pt-1">
                        <button class="btn-remove-scene-day text-rose-600 hover:text-rose-700 text-[11px] font-medium flex items-center gap-1 cursor-pointer" data-scene="${s.sceneNumber}">
                          <span class="material-symbols-outlined text-[13px]">delete</span>
                          <span>Remove from Day</span>
                        </button>
                        <div class="flex items-center gap-1.5">
                          <button class="btn-cancel-scene-edit px-2 py-1 text-[11px] text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer" data-scene-id="${s.id}">Cancel</button>
                          <button class="btn-save-scene-edit px-3 py-1 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs cursor-pointer" data-scene-id="${s.id}">Save Scene</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ` : `
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
                      <button class="btn-edit-scene-quick p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer" data-scene-id="${s.id}" title="Edit scene heading & pages">
                        <span class="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                      <button class="btn-toggle-scene-inline px-2.5 py-1 rounded-lg ${isExpanded ? 'bg-blue-600 text-white font-semibold' : 'bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold border border-blue-200/80'} text-[11px] flex items-center gap-1 transition-colors cursor-pointer" data-scene-id="${s.id}">
                        <span>Details</span>
                        <span class="material-symbols-outlined text-[14px] transition-transform inline-details-chevron ${isExpanded ? 'rotate-180' : ''}">expand_more</span>
                      </button>
                    </div>
                  </div>
                `}

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

                    <!-- Editable Scene Snippet -->
                    ${isEditingSnippet ? `
                      <div class="flex flex-col gap-1.5 bg-white border border-slate-200 rounded-lg p-2">
                        <label class="text-[10px] font-semibold text-slate-500">Edit Scene Snippet / Description</label>
                        <textarea class="input-scene-snippet w-full text-xs p-1.5 border border-slate-200 rounded focus:outline-none focus:border-blue-500" rows="3">${s.snippet || ''}</textarea>
                        <div class="flex items-center justify-end gap-1.5">
                          <button class="btn-cancel-snippet px-2 py-0.5 rounded text-[11px] text-slate-600 hover:bg-slate-100 cursor-pointer" data-scene-id="${s.id}">Cancel</button>
                          <button class="btn-save-snippet px-2.5 py-0.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold cursor-pointer" data-scene-id="${s.id}">Save</button>
                        </div>
                      </div>
                    ` : `
                      <div class="flex flex-col gap-1 bg-white border border-slate-200/80 rounded-lg p-2">
                        <div class="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                          <span>Scene Snippet</span>
                          <button class="btn-edit-snippet text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5" data-scene-id="${s.id}">
                            <span class="material-symbols-outlined text-[12px]">edit</span>
                            <span>Edit</span>
                          </button>
                        </div>
                        <p class="text-[11px] text-slate-600 leading-relaxed">
                          ${s.snippet || '<span class="italic text-slate-400">No snippet provided.</span>'}
                        </p>
                      </div>
                    `}

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
                      <!-- Cast with Add & Remove functionality -->
                      <div class="flex flex-col gap-1.5">
                        <div class="flex items-center justify-between">
                          <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Cast</span>
                          <button class="btn-toggle-add-cast text-[11px] text-blue-600 font-medium hover:underline flex items-center gap-0.5 cursor-pointer" data-scene-id="${s.id}">
                            <span class="material-symbols-outlined text-[13px]">add</span>
                            <span>Add Cast</span>
                          </button>
                        </div>
                        ${isAddingCast ? `
                          <div class="flex items-center gap-1.5 py-1">
                            <input type="text" class="input-new-cast-name flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-500" placeholder="Character name (e.g. AARAV)" />
                            <button class="btn-save-new-cast px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] shadow-2xs cursor-pointer" data-scene-id="${s.id}">Add</button>
                            <button class="btn-cancel-new-cast px-2 py-1 rounded-lg text-slate-500 hover:bg-slate-100 text-[11px] cursor-pointer" data-scene-id="${s.id}">Cancel</button>
                          </div>
                        ` : ''}
                        <div class="flex items-center gap-1.5 flex-wrap">
                          ${(s.cast && s.cast.length > 0) ? s.cast.map(c => `
                            <span class="inline-flex items-center gap-1 pl-1.5 pr-1 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-800">
                              <span class="w-3.5 h-3.5 rounded-full bg-slate-100 text-slate-600 text-[9px] flex items-center justify-center font-bold">${c.charAt(0)}</span>
                              <span>${c}</span>
                              <button class="btn-remove-cast-member text-slate-400 hover:text-rose-600 ml-0.5 cursor-pointer" data-scene-id="${s.id}" data-cast="${c}" title="Remove character">
                                <span class="material-symbols-outlined text-[12px]">close</span>
                              </button>
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

      // 1. Wire Day Info Editor Buttons
      const btnCancelDayTop = document.getElementById('btn-cancel-day-top');
      const btnCancelDayInfo = document.getElementById('btn-cancel-day-info');
      const btnSaveDayInfo = document.getElementById('btn-save-day-info');

      if (btnCancelDayTop) btnCancelDayTop.onclick = () => { editingDayInfo = false; openDayModal(day.dayNumber); };
      if (btnCancelDayInfo) btnCancelDayInfo.onclick = () => { editingDayInfo = false; openDayModal(day.dayNumber); };
      if (btnSaveDayInfo) {
        btnSaveDayInfo.onclick = async () => {
          const dateVal = document.getElementById('input-edit-day-date')?.value?.trim();
          const hoursVal = parseFloat(document.getElementById('input-edit-day-hours')?.value) || day.estHours;
          const locVal = document.getElementById('input-edit-day-loc')?.value?.trim();
          if (dateVal) day.date = dateVal;
          if (hoursVal) day.estHours = hoursVal;
          if (locVal) day.location = locVal;
          await api.updateProductionScheduleDay(scriptId, day.dayNumber, {
            date: day.date,
            estHours: day.estHours,
            location: day.location
          });
          showToast(`Shoot Day ${day.dayNumber} updated`);
          editingDayInfo = false;
          renderCalendar();
          openDayModal(day.dayNumber);
        };
      }

      // 2. Wire Constraints toggle & edit
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

      const btnEditConstraints = document.getElementById('btn-edit-constraints');
      const btnCancelConstraints = document.getElementById('btn-cancel-constraints');
      const btnSaveConstraints = document.getElementById('btn-save-constraints');

      if (btnEditConstraints) {
        btnEditConstraints.onclick = () => {
          editingDayConstraints = true;
          openDayModal(day.dayNumber);
          // Keep constraints open
          document.getElementById('day-constraints-content')?.classList.remove('hidden');
        };
      }
      if (btnCancelConstraints) {
        btnCancelConstraints.onclick = () => {
          editingDayConstraints = false;
          openDayModal(day.dayNumber);
          document.getElementById('day-constraints-content')?.classList.remove('hidden');
        };
      }
      if (btnSaveConstraints) {
        btnSaveConstraints.onclick = async () => {
          const locVal = document.getElementById('input-constraints-loc')?.value?.trim();
          const hoursVal = parseFloat(document.getElementById('input-constraints-hours')?.value) || day.estHours;
          const turnaroundVal = document.getElementById('input-constraints-turnaround')?.value?.trim();
          if (locVal) day.location = locVal;
          if (hoursVal) day.estHours = hoursVal;
          if (turnaroundVal) day.turnaroundNote = turnaroundVal;
          await api.updateProductionScheduleDay(scriptId, day.dayNumber, {
            location: day.location,
            estHours: day.estHours,
            turnaroundNote: day.turnaroundNote
          });
          showToast(`Production constraints updated`);
          editingDayConstraints = false;
          renderCalendar();
          openDayModal(day.dayNumber);
          document.getElementById('day-constraints-content')?.classList.remove('hidden');
        };
      }

      // 3. Wire Scene Assignment
      const btnToggleAssign = document.getElementById('btn-toggle-assign-scene');
      const btnCloseAssign = document.getElementById('btn-close-assign-scene');
      const btnConfirmAssign = document.getElementById('btn-confirm-assign-scene');

      if (btnToggleAssign) {
        btnToggleAssign.onclick = () => {
          showAssignSceneDropdown = !showAssignSceneDropdown;
          openDayModal(day.dayNumber);
        };
      }
      if (btnCloseAssign) {
        btnCloseAssign.onclick = () => {
          showAssignSceneDropdown = false;
          openDayModal(day.dayNumber);
        };
      }
      if (btnConfirmAssign) {
        btnConfirmAssign.onclick = async () => {
          const scNum = Number(document.getElementById('select-scene-to-assign')?.value);
          if (scNum && !day.sceneNumbers.includes(scNum)) {
            day.sceneNumbers.push(scNum);
            recalculateDayPages(day);
            await api.updateProductionScheduleDay(scriptId, day.dayNumber, {
              sceneNumbers: day.sceneNumbers,
              totalPages: day.totalPages
            });
            showToast(`Scene #${scNum} added to Shoot Day ${day.dayNumber}`);
            showAssignSceneDropdown = false;
            renderCalendar();
            openDayModal(day.dayNumber);
          }
        };
      }

      // 4. Wire Scene Card Quick-Edit
      modalContent.querySelectorAll('.btn-edit-scene-quick').forEach(btn => {
        btn.onclick = () => {
          const scId = btn.getAttribute('data-scene-id');
          if (scId) {
            editingSceneCards.add(scId);
            openDayModal(day.dayNumber);
          }
        };
      });

      modalContent.querySelectorAll('.btn-cancel-scene-edit').forEach(btn => {
        btn.onclick = () => {
          const scId = btn.getAttribute('data-scene-id');
          if (scId) {
            editingSceneCards.delete(scId);
            openDayModal(day.dayNumber);
          }
        };
      });

      modalContent.querySelectorAll('.btn-save-scene-edit').forEach(btn => {
        btn.onclick = async () => {
          const scId = btn.getAttribute('data-scene-id');
          const card = btn.closest('.scene-item-card');
          const heading = card?.querySelector('.input-scene-heading')?.value?.trim();
          const pages = card?.querySelector('.input-scene-pages')?.value?.trim();
          const complexity = card?.querySelector('.input-scene-complexity')?.value;
          const sc = scenes.find(s => s.id === scId);
          if (sc) {
            if (heading) sc.heading = heading;
            if (pages) sc.pages = pages;
            if (complexity) sc.complexity = complexity;
            await api.updateProductionScene(scriptId, sc.id, { heading, pages, complexity });
            recalculateDayPages(day);
            await api.updateProductionScheduleDay(scriptId, day.dayNumber, { totalPages: day.totalPages });
            showToast(`Scene #${sc.sceneNumber} updated`);
            editingSceneCards.delete(scId);
            renderCalendar();
            openDayModal(day.dayNumber);
          }
        };
      });

      // 5. Wire Remove Scene from Day
      modalContent.querySelectorAll('.btn-remove-scene-day').forEach(btn => {
        btn.onclick = async () => {
          const scNum = Number(btn.getAttribute('data-scene'));
          if (scNum) {
            day.sceneNumbers = day.sceneNumbers.filter(n => n !== scNum);
            recalculateDayPages(day);
            await api.updateProductionScheduleDay(scriptId, day.dayNumber, {
              sceneNumbers: day.sceneNumbers,
              totalPages: day.totalPages
            });
            showToast(`Scene #${scNum} removed from Day ${day.dayNumber}`);
            renderCalendar();
            openDayModal(day.dayNumber);
          }
        };
      });

      // 6. Wire Snippet Editing
      modalContent.querySelectorAll('.btn-edit-snippet').forEach(btn => {
        btn.onclick = () => {
          const scId = btn.getAttribute('data-scene-id');
          if (scId) {
            editingSnippetSceneIds.add(scId);
            openDayModal(day.dayNumber);
          }
        };
      });

      modalContent.querySelectorAll('.btn-cancel-snippet').forEach(btn => {
        btn.onclick = () => {
          const scId = btn.getAttribute('data-scene-id');
          if (scId) {
            editingSnippetSceneIds.delete(scId);
            openDayModal(day.dayNumber);
          }
        };
      });

      modalContent.querySelectorAll('.btn-save-snippet').forEach(btn => {
        btn.onclick = async () => {
          const scId = btn.getAttribute('data-scene-id');
          const card = btn.closest('.scene-item-card');
          const snippetVal = card?.querySelector('.input-scene-snippet')?.value?.trim();
          const sc = scenes.find(s => s.id === scId);
          if (sc) {
            sc.snippet = snippetVal;
            await api.updateProductionScene(scriptId, sc.id, { snippet: snippetVal });
            showToast(`Scene #${sc.sceneNumber} snippet updated`);
            editingSnippetSceneIds.delete(scId);
            openDayModal(day.dayNumber);
          }
        };
      });

      // 7. Wire Cast Editing (Add & Remove)
      modalContent.querySelectorAll('.btn-toggle-add-cast').forEach(btn => {
        btn.onclick = () => {
          const scId = btn.getAttribute('data-scene-id');
          if (scId) {
            addingCastSceneIds.add(scId);
            openDayModal(day.dayNumber);
          }
        };
      });

      modalContent.querySelectorAll('.btn-cancel-new-cast').forEach(btn => {
        btn.onclick = () => {
          const scId = btn.getAttribute('data-scene-id');
          if (scId) {
            addingCastSceneIds.delete(scId);
            openDayModal(day.dayNumber);
          }
        };
      });

      modalContent.querySelectorAll('.btn-save-new-cast').forEach(btn => {
        btn.onclick = async () => {
          const scId = btn.getAttribute('data-scene-id');
          const card = btn.closest('.scene-item-card');
          const castName = card?.querySelector('.input-new-cast-name')?.value?.trim().toUpperCase();
          const sc = scenes.find(s => s.id === scId);
          if (sc && castName) {
            sc.cast = sc.cast || [];
            if (!sc.cast.includes(castName)) {
              sc.cast.push(castName);
              await api.updateProductionScene(scriptId, sc.id, { cast: sc.cast });
              showToast(`Character ${castName} added to Scene #${sc.sceneNumber}`);
            }
            addingCastSceneIds.delete(scId);
            openDayModal(day.dayNumber);
          }
        };
      });

      modalContent.querySelectorAll('.btn-remove-cast-member').forEach(btn => {
        btn.onclick = async () => {
          const scId = btn.getAttribute('data-scene-id');
          const castName = btn.getAttribute('data-cast');
          const sc = scenes.find(s => s.id === scId);
          if (sc && castName) {
            sc.cast = (sc.cast || []).filter(c => c !== castName);
            await api.updateProductionScene(scriptId, sc.id, { cast: sc.cast });
            showToast(`Character ${castName} removed from Scene #${sc.sceneNumber}`);
            openDayModal(day.dayNumber);
          }
        };
      });

      // 8. Wire Inline Scene Details Expand/Collapse
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

      // 9. Wire More Details Toggle
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

      // 10. Wire Scene Reorder Up / Down
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

      // 11. Wire Inline Move Shoot Day
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

      // 12. Wire Production Notes Editing Workflow
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

      // 13. Wire Quick Links: Breakdown, Sides, PDF
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

    openModal(dayModal);
  }

  // Close Day Modal
  const modalClose = document.getElementById('modal-day-close');
  const modalDone = document.getElementById('modal-day-done');
  const closeDayModal = () => {
    closeModal(dayModal);
    currentOpenDayNumber = null;
    editingDayInfo = false;
    editingDayConstraints = false;
    editingSceneCards.clear();
    showAssignSceneDropdown = false;
    editingSnippetSceneIds.clear();
    addingCastSceneIds.clear();
    modalMenuHandler?.close();
  };
  if (modalClose) modalClose.onclick = closeDayModal;
  if (modalDone) modalDone.onclick = closeDayModal;
  if (dayModal) {
    dayModal.onclick = (e) => {
      if (e.target === dayModal) closeDayModal();
    };
  }

  // Multi-stage Shooting Schedule Back Navigation:
  // 1. Edit Scene -> Scene Details (cancel edit state, retain scene details)
  // 2. Scene Details -> Shooting Schedule (close day modal, return to matrix)
  // 3. Shooting Schedule -> Production Tools
  if (window.scriptoraRouter) {
    window.scriptoraRouter.registerBackHandler(() => {
      // Stage 1: If in any scene/day edit mode, step back to scene details
      if (
        editingSceneCards.size > 0 ||
        editingNotesSceneIds.size > 0 ||
        editingSnippetSceneIds.size > 0 ||
        addingCastSceneIds.size > 0 ||
        editingDayInfo ||
        editingDayConstraints ||
        showAssignSceneDropdown
      ) {
        editingSceneCards.clear();
        editingNotesSceneIds.clear();
        editingSnippetSceneIds.clear();
        addingCastSceneIds.clear();
        editingDayInfo = false;
        editingDayConstraints = false;
        showAssignSceneDropdown = false;
        if (currentOpenDayNumber) {
          renderModalDayContent(currentOpenDayNumber);
        }
        return true;
      }

      // Stage 2: If day modal is open, step back to calendar
      if (dayModal && !dayModal.classList.contains('hidden')) {
        closeDayModal();
        return true;
      }

      return false;
    });
  }



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

    openModal(addDayModal);
  }

  function closeAddDayModal() {
    closeModal(addDayModal);
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

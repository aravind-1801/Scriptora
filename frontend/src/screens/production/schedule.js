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
            <button id="btn-add-shoot-day" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer" title="Add a new shoot day to schedule">
              <span class="material-symbols-outlined text-[16px]">add</span>
              <span class="hidden sm:inline">Add Day</span>
            </button>
            <button id="btn-confirm-schedule" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer" title="Confirm and lock master shooting schedule">
              <span class="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Confirm</span>
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
              <p class="text-[11px] text-slate-500 truncate mt-0.5">Master shooting calendar • 14 Shoot Days • October 24 – November 06, 2026</p>
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
              <div class="font-heading font-bold text-base sm:text-lg text-slate-900 mt-0.5">14 Days</div>
              <span class="text-[11px] text-slate-400">Oct 24 – Nov 06</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Scenes Scheduled</span>
              <div class="font-heading font-bold text-base sm:text-lg text-slate-900 mt-0.5">18 of 18 Scenes</div>
              <span class="text-[11px] text-emerald-600 font-medium">100% Allocated</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Script Pages</span>
              <div class="font-heading font-bold text-base sm:text-lg text-slate-900 mt-0.5">96.0 Pages</div>
              <span class="text-[11px] text-slate-400">Avg 6.8 pgs / day</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Primary Locations</span>
              <div class="font-heading font-bold text-base sm:text-lg text-slate-900 mt-0.5">3 Areas</div>
              <span class="text-[11px] text-slate-400">Mojave & Soundstage</span>
            </div>
          </div>
        </div>

        <!-- Master Calendar Container -->
        <div id="schedule-calendar-container" class="flex flex-col gap-3 min-h-[300px]">
          <div class="p-12 text-center text-slate-400 text-xs">Loading shooting calendar...</div>
        </div>

        <!-- Day Details Modal (Opens when user clicks any calendar day) -->
        <div id="day-detail-modal" class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
          <div class="bg-white rounded-2xl border border-slate-200/90 shadow-xl max-w-xl w-full p-4 sm:p-5 flex flex-col gap-4 max-h-[90vh] overflow-hidden">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5 min-w-0">
                <div id="modal-day-badge" class="w-8 h-8 rounded-lg bg-slate-900 text-white font-heading font-bold text-xs flex items-center justify-center">D1</div>
                <div class="min-w-0">
                  <h3 id="modal-day-title" class="font-heading font-bold text-sm text-slate-900 truncate">Day 1 Details</h3>
                  <p id="modal-day-sub" class="text-[11px] text-slate-500">Date • Location • Call time</p>
                </div>
              </div>
              <button id="modal-day-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
                <span class="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <!-- Modal Content (Scene reordering & day constraints) -->
            <div id="modal-day-content" class="flex-1 overflow-y-auto flex flex-col gap-3 pr-1 text-xs">
              <!-- Injected dynamically -->
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-slate-100">
              <div class="flex items-center gap-2">
                <button id="modal-day-lock-toggle" class="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs flex items-center gap-1.5 cursor-pointer">
                  <span class="material-symbols-outlined text-[15px]">lock</span>
                  <span id="modal-day-lock-label">Lock Day</span>
                </button>
                <button id="modal-day-delete" class="px-2.5 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 font-medium text-xs flex items-center gap-1 cursor-pointer" title="Delete this shoot day">
                  <span class="material-symbols-outlined text-[15px]">delete</span>
                  <span>Delete Day</span>
                </button>
              </div>
              <button id="modal-day-done" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer">
                Done
              </button>
            </div>
          </div>
        </div>

        <!-- Integrated Scene Detail Modal / Panel -->
        <div id="scene-detail-modal" class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
          <div class="bg-white rounded-2xl border border-slate-200/90 shadow-xl max-w-2xl w-full p-4 sm:p-6 flex flex-col gap-4 max-h-[92vh] overflow-hidden">
            <!-- Header -->
            <div class="flex items-start justify-between border-b border-slate-100 pb-3 gap-3">
              <div class="flex items-start gap-3 min-w-0">
                <div id="scene-detail-num" class="w-10 h-10 rounded-xl bg-slate-900 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">#--</div>
                <div class="min-w-0">
                  <h3 id="scene-detail-heading" class="font-heading font-bold text-sm sm:text-base text-slate-900 leading-tight">Scene Heading</h3>
                  <p id="scene-detail-meta" class="text-[11px] text-slate-500 mt-0.5">Chronicles of Dust • Draft 4.2 (Pinned) • -- Pages</p>
                </div>
              </div>
              <button id="scene-detail-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer" title="Close scene details">
                <span class="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <!-- Scrollable Body -->
            <div id="scene-detail-body" class="flex-1 overflow-y-auto flex flex-col gap-4 pr-1 text-xs text-slate-700">
              <!-- Injected dynamically by openSceneDetail() -->
            </div>

            <!-- Footer with Actions -->
            <div class="flex items-center justify-between pt-3 border-t border-slate-100 gap-2 flex-wrap">
              <div class="flex items-center gap-2 flex-wrap">
                <button id="btn-scene-export-pdf" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer" title="Export Scene Logistics PDF">
                  <span class="material-symbols-outlined text-[15px]">download</span>
                  <span>Export Scene PDF</span>
                </button>
                <button id="btn-scene-open-breakdown" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer" title="Open scene in Script Breakdown">
                  <span class="material-symbols-outlined text-[15px]">dataset</span>
                  <span>Breakdown</span>
                </button>
                <button id="btn-scene-open-sides" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer" title="Open Actor Sides for this scene">
                  <span class="material-symbols-outlined text-[15px]">description</span>
                  <span>Actor Sides</span>
                </button>
              </div>
              <button id="btn-scene-close" class="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer">
                Close
              </button>
            </div>
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
  const sceneModal = document.getElementById('scene-detail-modal');
  if (!calendarContainer) return;

  let days = await api.getProductionSchedule(scriptId);
  let scenes = await api.getProductionScenes(scriptId);

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
          <span class="text-xs text-slate-500 font-medium">October 24 – November 06, 2026</span>
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

    // Attach click events specifically on scene badges to directly open integrated scene details
    calendarContainer.querySelectorAll('.btn-badge-scene').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const scId = btn.getAttribute('data-scene-id');
        if (scId) openSceneDetail(scId);
      };
    });
  }

  // ---------------------------------------------------------------------------
  // DAY DETAILS MODAL LOGIC (Inspect scenes, shooting order, move scene, lock)
  // ---------------------------------------------------------------------------
  function openDayModal(dayNumber) {
    const day = days.find(d => d.dayNumber === Number(dayNumber));
    if (!day) return;

    const modalBadge = document.getElementById('modal-day-badge');
    const modalTitle = document.getElementById('modal-day-title');
    const modalSub = document.getElementById('modal-day-sub');
    const modalContent = document.getElementById('modal-day-content');
    const lockToggle = document.getElementById('modal-day-lock-toggle');
    const lockLabel = document.getElementById('modal-day-lock-label');

    if (modalBadge) modalBadge.textContent = `D${day.dayNumber}`;
    if (modalTitle) modalTitle.textContent = `Day ${day.dayNumber} — ${day.title}`;
    if (modalSub) modalSub.textContent = `${day.date} • ${day.location} • Call: 07:00 AM • ${day.totalPages} pgs`;
    if (lockLabel) lockLabel.textContent = day.isLocked ? 'Unlock Day' : 'Lock Day';

    if (lockToggle) {
      lockToggle.onclick = async () => {
        day.isLocked = !day.isLocked;
        await api.updateProductionScheduleDay(scriptId, day.dayNumber, { isLocked: day.isLocked });
        showToast(`Day ${day.dayNumber} ${day.isLocked ? 'locked' : 'unlocked'}`);
        if (lockLabel) lockLabel.textContent = day.isLocked ? 'Unlock Day' : 'Lock Day';
        renderCalendar();
      };
    }

    const dayScenes = (day.sceneNumbers || [])
      .map(num => scenes.find(s => s.sceneNumber === num))
      .filter(Boolean);

    if (modalContent) {
      modalContent.innerHTML = `
        <div class="flex items-center justify-between pb-1">
          <span class="font-semibold text-slate-700 text-xs">Scenes in Shooting Order (${dayScenes.length})</span>
          <span class="text-[11px] text-slate-400">Use arrows to adjust shooting order</span>
        </div>
        <div class="flex flex-col gap-2">
          ${dayScenes.length > 0 ? dayScenes.map((s, idx) => `
            <div class="rounded-xl border border-slate-200 p-2.5 bg-slate-50 flex items-center justify-between gap-2">
              <div class="flex items-center gap-2.5 min-w-0">
                <span class="w-6 h-6 rounded bg-white border border-slate-200 font-mono font-bold text-xs flex items-center justify-center text-slate-800 shrink-0">#${s.sceneNumber}</span>
                <div class="min-w-0">
                  <div class="font-medium text-slate-800 text-xs truncate">${s.heading}</div>
                  <div class="text-[10px] text-slate-500 font-mono">${s.intExt} · ${s.dayNight} · ${s.pages} pgs</div>
                </div>
              </div>

              <div class="flex items-center gap-1.5 shrink-0">
                <button class="btn-modal-up p-1 rounded hover:bg-slate-200 text-slate-500 disabled:opacity-30 disabled:pointer-events-none cursor-pointer" data-scene="${s.sceneNumber}" ${idx === 0 ? 'disabled' : ''} title="Move earlier in shooting order">
                  <span class="material-symbols-outlined text-[16px]">arrow_upward</span>
                </button>
                <button class="btn-modal-down p-1 rounded hover:bg-slate-200 text-slate-500 disabled:opacity-30 disabled:pointer-events-none cursor-pointer" data-scene="${s.sceneNumber}" ${idx === dayScenes.length - 1 ? 'disabled' : ''} title="Move later in shooting order">
                  <span class="material-symbols-outlined text-[16px]">arrow_downward</span>
                </button>
                <button class="btn-modal-move-out px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-[10px] font-semibold text-slate-700 cursor-pointer" data-scene="${s.sceneNumber}" title="Move scene to another day">
                  Move Day
                </button>
                <button class="btn-inspect-scene px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-semibold text-[10px] ml-1 cursor-pointer" data-scene-id="${s.id}" title="View integrated scene production details">
                  Details
                </button>
              </div>
            </div>
          `).join('') : `
            <div class="text-center py-4 text-slate-400 text-xs italic">No scenes assigned to this day.</div>
          `}
        </div>

        <div class="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 flex flex-col gap-1">
          <div class="font-semibold text-slate-800">Production Constraints</div>
          <div>• Location: ${day.location}</div>
          <div>• Estimated Daily Hours: ${day.estHours} hrs (including meal break)</div>
          <div>• Turnaround: Standard 12-hour crew rest requirement active</div>
        </div>
      `;

      // Wire Inspect / Details buttons
      modalContent.querySelectorAll('.btn-inspect-scene').forEach(btn => {
        btn.onclick = () => {
          const scId = btn.getAttribute('data-scene-id');
          if (scId) openSceneDetail(scId);
        };
      });

      // Wire Up/Down inside modal
      modalContent.querySelectorAll('.btn-modal-up').forEach(btn => {
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
            openDayModal(day.dayNumber);
            renderCalendar();
          }
        };
      });

      modalContent.querySelectorAll('.btn-modal-down').forEach(btn => {
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
            openDayModal(day.dayNumber);
            renderCalendar();
          }
        };
      });

      // Wire Move Day inside modal
      modalContent.querySelectorAll('.btn-modal-move-out').forEach(btn => {
        btn.onclick = async () => {
          const scNum = btn.getAttribute('data-scene');
          const targetDayNum = prompt(`Enter target shoot day number (1 - 14) to move Scene ${scNum} to:`);
          if (!targetDayNum || targetDayNum === String(day.dayNumber)) return;
          const targetNum = Number(targetDayNum);
          if (targetNum >= 1 && targetNum <= 14) {
            await api.moveSceneBetweenDays(scriptId, scNum, day.dayNumber, targetNum);
            days = await api.getProductionSchedule(scriptId);
            showToast(`Scene ${scNum} moved to Day ${targetNum}`);
            openDayModal(day.dayNumber);
            renderCalendar();
          } else {
            alert('Please enter a valid day number between 1 and 14.');
          }
        };
      });

      // Wire Delete Day inside modal
      const deleteDayBtn = document.getElementById('modal-day-delete');
      if (deleteDayBtn) {
        deleteDayBtn.onclick = async () => {
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
    }

    dayModal?.classList.remove('hidden');
  }

  // Close Day Modal
  const modalClose = document.getElementById('modal-day-close');
  const modalDone = document.getElementById('modal-day-done');
  const closeDayModal = () => dayModal?.classList.add('hidden');
  if (modalClose) modalClose.onclick = closeDayModal;
  if (modalDone) modalDone.onclick = closeDayModal;
  if (dayModal) {
    dayModal.onclick = (e) => {
      if (e.target === dayModal) closeDayModal();
    };
  }

  // ---------------------------------------------------------------------------
  // INTEGRATED SCENE DETAIL MODAL / DRAWER
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

    // Ensure full elements list is loaded from breakdown
    const breakdown = await api.getProductionBreakdown(scriptId);
    const elements = breakdown.filter(b => b.sceneId === scene.id || b.sceneNumber === scene.sceneNumber || (Array.isArray(b.scenes) && b.scenes.includes(scene.sceneNumber)));
    scene.elements = elements;

    // Find currently assigned day in schedule
    const assignedDay = days.find(d => (d.sceneNumbers || []).includes(scene.sceneNumber));

    // Populate modal header
    const numEl = document.getElementById('scene-detail-num');
    const headEl = document.getElementById('scene-detail-heading');
    const metaEl = document.getElementById('scene-detail-meta');
    if (numEl) numEl.textContent = `#${scene.sceneNumber}`;
    if (headEl) headEl.textContent = scene.heading;
    if (metaEl) metaEl.textContent = `Chronicles of Dust • Draft 4.2 (Pinned) • ${scene.pages || '1 0/8'} Pages • ${assignedDay ? `Shoot Day ${assignedDay.dayNumber}` : 'Unscheduled'}`;

    const body = document.getElementById('scene-detail-body');
    if (body) {
      // Group elements by category
      const categories = {};
      elements.forEach(elem => {
        const cat = elem.category || 'Other';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(elem);
      });

      body.innerHTML = `
        <!-- Alignment & Status Chips -->
        <div class="flex items-center gap-2 flex-wrap">
          <span class="px-2 py-0.5 rounded-md font-mono text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200">${scene.intExt}</span>
          <span class="px-2 py-0.5 rounded-md font-mono text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200">${scene.dayNight}</span>
          <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            ${assignedDay ? `Day ${assignedDay.dayNumber}: ${assignedDay.location}` : 'Unscheduled'}
          </span>
          <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold ${scene.complexity === 'Complex' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-50 text-slate-600 border border-slate-200'}">
            Complexity: ${scene.complexity || 'Standard'}
          </span>
          <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            ${scene.status || 'Scheduled'}
          </span>
        </div>

        <!-- Warning Banner if Needs Review / Source Changed -->
        ${scene.status === 'Needs Review' ? `
          <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-[18px] text-amber-600 shrink-0 mt-0.5">warning</span>
            <div>
              <div class="font-semibold text-xs">Source Screenplay Revision Notice</div>
              <div class="text-[11px] text-amber-800 mt-0.5">Dialogue and stage directions in Draft 4.2 were adjusted for Scene ${scene.sceneNumber}. Confirm associated breakdown items match the revision.</div>
            </div>
          </div>
        ` : ''}

        <!-- Source Screenplay Scene Description -->
        <div class="rounded-xl border border-slate-200 p-3 bg-slate-50 flex flex-col gap-1.5">
          <div class="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
            <span>SOURCE SCENE SNIPPET</span>
            <span class="text-blue-600 font-normal">Draft 4.2 Baseline</span>
          </div>
          <p class="font-mono text-xs text-slate-800 leading-relaxed">${scene.snippet || 'Scene description synchronized from screenplay source.'}</p>
        </div>

        <!-- Cast Members in Scene -->
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <span class="font-semibold text-slate-800 text-xs">Cast & Characters (${(scene.cast || []).length})</span>
            <span class="text-[11px] text-slate-400">Confirmed cast assignments</span>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            ${(scene.cast && scene.cast.length > 0) ? scene.cast.map(c => `
              <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div class="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center font-heading">${c.charAt(0)}</div>
                <span class="font-semibold text-slate-800 text-xs">${c}</span>
              </div>
            `).join('') : `
              <span class="text-slate-400 text-xs italic">No cast assigned to this scene.</span>
            `}
          </div>
        </div>

        <!-- Confirmed Production Elements (Breakdown Integration) -->
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <span class="font-semibold text-slate-800 text-xs">Confirmed Breakdown Elements (${elements.length})</span>
            <span class="text-[11px] text-slate-400">Props, Costumes, FX & Stunts</span>
          </div>
          ${elements.length > 0 ? `
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${Object.entries(categories).map(([category, items]) => `
                <div class="p-2.5 rounded-xl border border-slate-200 bg-white flex flex-col gap-1.5">
                  <div class="flex items-center gap-1.5 text-slate-700 font-semibold text-[11px]">
                    <span class="material-symbols-outlined text-[15px] text-blue-600">${CATEGORY_ICONS[category] || 'label'}</span>
                    <span>${category}</span>
                    <span class="text-[10px] text-slate-400 font-normal">(${items.length})</span>
                  </div>
                  <div class="flex flex-col gap-1">
                    ${items.map(it => `
                      <div class="flex items-center justify-between text-xs py-0.5 border-b border-slate-100 last:border-b-0">
                        <span class="font-medium text-slate-800 truncate">${it.name}</span>
                        <span class="text-[10px] text-slate-400 shrink-0 ml-2">${it.quantity || it.status || ''}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="p-3 rounded-xl border border-dashed border-slate-200 text-center text-slate-400 text-xs">
              No elements tagged for Scene ${scene.sceneNumber}. Open Script Breakdown to tag elements.
            </div>
          `}
        </div>

        <!-- Day Assignment Selector -->
        <div class="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <div>
            <div class="font-semibold text-slate-800 text-xs">Assigned Shoot Day</div>
            <div class="text-[11px] text-slate-500">Move scene to another day in the shooting schedule</div>
          </div>
          <div class="flex items-center gap-2">
            <select id="select-scene-shoot-day" class="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none cursor-pointer">
              ${days.map(d => `
                <option value="${d.dayNumber}" ${assignedDay && assignedDay.dayNumber === d.dayNumber ? 'selected' : ''}>
                  Day ${d.dayNumber} — ${d.date.split(',')[0]} (${d.location})
                </option>
              `).join('')}
            </select>
            <button id="btn-update-scene-day" class="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer">
              Move
            </button>
          </div>
        </div>

        <!-- Editable Production Notes & Continuity Notes -->
        <div class="flex flex-col gap-2.5 pt-1">
          <div class="flex items-center justify-between">
            <span class="font-semibold text-slate-800 text-xs">Production & Continuity Notes</span>
            <span class="text-[11px] text-slate-400">Editable logistics and camera notes</span>
          </div>
          <div class="flex flex-col gap-2">
            <div>
              <label class="block text-[11px] font-semibold text-slate-600 mb-1">Director's Production Notes</label>
              <textarea id="edit-scene-director-notes" rows="2" class="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 transition-colors" placeholder="Log camera setup, lighting notes, director preferences...">${scene.directorNotes || ''}</textarea>
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-600 mb-1">Continuity Notes</label>
              <textarea id="edit-scene-continuity-notes" rows="2" class="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 transition-colors" placeholder="Log hair, costume, prop condition, timeline markers...">${scene.continuityNotes || ''}</textarea>
            </div>
            <div class="flex justify-end">
              <button id="btn-save-scene-notes" class="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs transition-colors cursor-pointer">
                Save Scene Notes
              </button>
            </div>
          </div>
        </div>
      `;

      // Wire Save Scene Notes
      const saveNotesBtn = document.getElementById('btn-save-scene-notes');
      if (saveNotesBtn) {
        saveNotesBtn.onclick = async () => {
          const directorNotes = document.getElementById('edit-scene-director-notes')?.value || '';
          const continuityNotes = document.getElementById('edit-scene-continuity-notes')?.value || '';
          scene.directorNotes = directorNotes;
          scene.continuityNotes = continuityNotes;
          await api.updateProductionScene(scriptId, scene.id, { directorNotes, continuityNotes });
          showToast(`Scene ${scene.sceneNumber} notes saved successfully`);
        };
      }

      // Wire Move Shoot Day
      const updateDayBtn = document.getElementById('btn-update-scene-day');
      if (updateDayBtn) {
        updateDayBtn.onclick = async () => {
          const targetDayNum = Number(document.getElementById('select-scene-shoot-day')?.value);
          if (assignedDay && assignedDay.dayNumber === targetDayNum) {
            showToast(`Scene ${scene.sceneNumber} is already on Day ${targetDayNum}`);
            return;
          }
          if (assignedDay) {
            await api.moveSceneBetweenDays(scriptId, scene.sceneNumber, assignedDay.dayNumber, targetDayNum);
          } else {
            const targetDay = days.find(d => d.dayNumber === targetDayNum);
            if (targetDay) {
              targetDay.sceneNumbers = [...(targetDay.sceneNumbers || []), scene.sceneNumber];
              await api.updateProductionScheduleDay(scriptId, targetDayNum, { sceneNumbers: targetDay.sceneNumbers });
            }
          }
          days = await api.getProductionSchedule(scriptId);
          showToast(`Scene ${scene.sceneNumber} moved to Shoot Day ${targetDayNum}`);
          renderCalendar();
          openSceneDetail(scene.id);
        };
      }
    }

    // Wire Footer Quick Actions
    const exportScenePdfBtn = document.getElementById('btn-scene-export-pdf');
    if (exportScenePdfBtn) {
      exportScenePdfBtn.onclick = () => {
        try {
          exportBreakdownPdf(scene.elements || [], {
            title: `Chronicles of Dust — Scene ${scene.sceneNumber}`,
            draft: 'Draft 4.2'
          });
          showToast(`Exported Scene ${scene.sceneNumber} Logistics PDF`);
        } catch (err) {
          console.error(err);
          showToast('Failed to export scene PDF');
        }
      };
    }

    const openBreakdownBtn = document.getElementById('btn-scene-open-breakdown');
    if (openBreakdownBtn) {
      openBreakdownBtn.onclick = () => {
        navigate(`/production/breakdown?scriptId=${scriptId}&scene=${scene.sceneNumber}`);
      };
    }

    const openSidesBtn = document.getElementById('btn-scene-open-sides');
    if (openSidesBtn) {
      openSidesBtn.onclick = () => {
        navigate(`/production/dialogue-sides?scriptId=${scriptId}&scene=${scene.sceneNumber}`);
      };
    }

    sceneModal?.classList.remove('hidden');
  }

  function closeSceneDetail() {
    sceneModal?.classList.add('hidden');
  }

  // Wire close triggers for scene modal
  const sceneCloseBtn = document.getElementById('scene-detail-close');
  const btnSceneClose = document.getElementById('btn-scene-close');
  if (sceneCloseBtn) sceneCloseBtn.onclick = closeSceneDetail;
  if (btnSceneClose) btnSceneClose.onclick = closeSceneDetail;
  if (sceneModal) {
    sceneModal.onclick = (e) => {
      if (e.target === sceneModal) closeSceneDetail();
    };
  }

  // ---------------------------------------------------------------------------
  // PRIMARY ACTION BUTTONS: EXPORT PDF, ADD DAY & CONFIRM SCHEDULE
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

  const addDayBtn = document.getElementById('btn-add-shoot-day');
  if (addDayBtn) {
    addDayBtn.onclick = async () => {
      const nextDayNum = days.length > 0 ? Math.max(...days.map(d => d.dayNumber)) + 1 : 1;
      const title = prompt(`Enter title/focus for Shoot Day ${nextDayNum}:`, `Day ${nextDayNum} — Secondary Unit & Pickups`);
      if (!title) return;
      const location = prompt('Enter shoot location for this day:', 'Mojave Desert Facility');
      if (!location) return;
      await api.addProductionScheduleDay(scriptId, {
        dayNumber: nextDayNum,
        title,
        date: `Shoot Day ${nextDayNum}`,
        location,
        estHours: 10,
        sceneNumbers: []
      });
      days = await api.getProductionSchedule(scriptId);
      showToast(`Added Shoot Day ${nextDayNum}`);
      renderCalendar();
    };
  }

  const confirmBtn = document.getElementById('btn-confirm-schedule');
  if (confirmBtn) {
    confirmBtn.onclick = async () => {
      if (!confirm('Confirm and lock the master shooting calendar for Chronicles of Dust?')) return;
      days = await api.confirmProductionSchedule(scriptId);
      showToast('Master shooting schedule confirmed and locked by Owner');
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

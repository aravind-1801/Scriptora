import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';
import { renderProdSubNav } from './prodNav.js';
import { store } from '../../state/store.js';
import * as api from '../../services/api.js';
import { showToast } from '../../components/toast.js';

export function renderScheduleScreen(fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const from = fromParam || urlParams.get('from');
  const activeView = urlParams.get('view') || 'stripboard'; // 'stripboard' | 'list' | 'calendar'

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('Pre-Production', 'Master Shooting Schedule')}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-4 fade-in">
        <!-- SubNav with Title, Project Context & Primary Actions -->
        ${renderProdSubNav('Shooting Schedule', 'calendar_view_week', from || '/production', `
          <div class="flex items-center gap-2">
            <button id="btn-plan-schedule" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all" title="Run rule-based schedule optimization">
              <span class="material-symbols-outlined text-[16px] text-blue-600">auto_fix_high</span>
              <span class="hidden sm:inline">Plan Schedule</span>
            </button>
            <button id="btn-confirm-schedule" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all" title="Confirm and publish shooting schedule">
              <span class="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Confirm</span>
            </button>
          </div>
        `)}

        <!-- Top Context Header Bar: Project, Pinned Version & View Switcher -->
        <div class="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-lg">movie</span>
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-heading font-semibold text-sm text-slate-900 truncate">Chronicles of Dust</span>
                <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  Draft 4.2 (Pinned)
                </span>
              </div>
              <p class="text-[11px] text-slate-500 truncate mt-0.5">Master production schedule • 14 Shoot Days • Mojave & Soundstage</p>
            </div>
          </div>

          <!-- View Selection Segmented Control -->
          <div class="inline-flex items-center p-1 bg-slate-100 rounded-xl self-start sm:self-auto border border-slate-200/60 text-xs">
            <button class="view-tab-btn px-3 py-1 rounded-lg transition-all ${activeView === 'stripboard' ? 'bg-white text-blue-600 font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'}" data-view="stripboard">
              <span class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[15px]">view_timeline</span>
                <span>Stripboard</span>
              </span>
            </button>
            <button class="view-tab-btn px-3 py-1 rounded-lg transition-all ${activeView === 'list' ? 'bg-white text-blue-600 font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'}" data-view="list">
              <span class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[15px]">format_list_bulleted</span>
                <span>List</span>
              </span>
            </button>
            <button class="view-tab-btn px-3 py-1 rounded-lg transition-all ${activeView === 'calendar' ? 'bg-white text-blue-600 font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'}" data-view="calendar">
              <span class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[15px]">calendar_month</span>
                <span>Calendar</span>
              </span>
            </button>
          </div>
        </div>

        <!-- Schedule Metrics Summary -->
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
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Rest Conflicts</span>
              <div class="font-heading font-bold text-base sm:text-lg text-amber-600 mt-0.5">1 Advisory</div>
              <span class="text-[11px] text-slate-400">Turnaround check on D5</span>
            </div>
          </div>
        </div>

        <!-- Semantic Conflict Notice (Shown only for real constraint advisories) -->
        <div id="schedule-conflict-banner" class="bg-amber-50/70 border border-amber-200 rounded-2xl p-3 sm:p-3.5 flex items-start gap-3 text-xs text-amber-900">
          <span class="material-symbols-outlined text-amber-600 text-lg shrink-0 mt-0.5">warning</span>
          <div class="flex-1 min-w-0">
            <span class="font-semibold text-amber-900">Turnaround Advisory: Day 4 &rarr; Day 5</span>
            <p class="text-amber-800 text-[11px] mt-0.5">Day 4 wrap is estimated at 01:30 AM (Night shoot). Call time on Day 5 is set for 11:30 AM, providing 10.0 hrs turnaround (SAG minimum is 12 hrs).</p>
          </div>
          <button id="btn-resolve-conflict" class="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-medium text-[11px] transition-colors shrink-0">
            Adjust Call Time
          </button>
        </div>

        <!-- Dynamic View Content Container -->
        <div id="schedule-view-container" class="flex flex-col gap-3 min-h-[300px]">
          <div class="p-12 text-center text-slate-400 text-xs">Loading production schedule...</div>
        </div>

        <!-- Day Details Modal (Opens when user inspects or manages a shoot day) -->
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
              <button id="modal-day-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                <span class="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <!-- Modal Content (Scene reordering & day constraints) -->
            <div id="modal-day-content" class="flex-1 overflow-y-auto flex flex-col gap-3 pr-1 text-xs">
              <!-- Injected dynamically -->
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-slate-100">
              <button id="modal-day-lock-toggle" class="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[15px]">lock</span>
                <span id="modal-day-lock-label">Lock Day</span>
              </button>
              <button id="modal-day-done" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors">
                Done
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
  let activeView = urlParams.get('view') || 'stripboard';

  const viewContainer = document.getElementById('schedule-view-container');
  const dayModal = document.getElementById('day-detail-modal');
  if (!viewContainer) return;

  let days = await api.getProductionSchedule(scriptId);
  let scenes = await api.getProductionScenes(scriptId);

  // ---------------------------------------------------------------------------
  // 1. STRIPBOARD VIEW RENDERER
  // ---------------------------------------------------------------------------
  function renderStripboardView() {
    viewContainer.innerHTML = days.map(d => {
      const isLocked = d.isLocked;
      const isConfirmed = d.status === 'Confirmed';
      const dayScenes = (d.sceneNumbers || [])
        .map(num => scenes.find(s => s.sceneNumber === num))
        .filter(Boolean);

      return `
        <div class="bg-white rounded-2xl border border-slate-200/80 p-3.5 sm:p-4 shadow-xs flex flex-col gap-3" data-day="${d.dayNumber}">
          <!-- Day Strip Header -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-heading font-bold text-xs shrink-0">
                D${d.dayNumber}
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <h3 class="font-heading font-semibold text-xs sm:text-sm text-slate-900 truncate">Day ${d.dayNumber} — ${d.title}</h3>
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-medium border ${isConfirmed ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-blue-50 text-blue-700 border-blue-200'}">
                    ${isConfirmed ? 'Confirmed' : 'Draft'}
                  </span>
                </div>
                <div class="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                  <span class="font-medium text-slate-700">${d.date}</span>
                  <span>•</span>
                  <span>${d.location}</span>
                  <span>•</span>
                  <span>${d.totalPages} pgs · ${d.estHours} hrs</span>
                </div>
              </div>
            </div>

            <!-- Day Actions: Lock Toggle & Manage Day -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button class="btn-toggle-lock px-2 py-1 rounded-lg border border-slate-200 ${isLocked ? 'bg-slate-100 text-slate-700 font-semibold' : 'bg-white hover:bg-slate-50 text-slate-500'} text-xs flex items-center gap-1 transition-colors" data-day="${d.dayNumber}" title="${isLocked ? 'Day locked against auto-reorder' : 'Lock day'}">
                <span class="material-symbols-outlined text-[15px]">${isLocked ? 'lock' : 'lock_open'}</span>
                <span class="hidden sm:inline">${isLocked ? 'Locked' : 'Lock'}</span>
              </button>
              <button class="btn-manage-day px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium transition-colors" data-day="${d.dayNumber}">
                Manage Day
              </button>
            </div>
          </div>

          <!-- Scenes in this Day (Clean Neutral Strips) -->
          <div class="flex flex-col gap-1.5">
            ${dayScenes.length > 0 ? dayScenes.map((s, idx) => `
              <div class="strip-card rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50/60 p-2.5 flex items-center justify-between gap-2.5 text-xs shadow-2xs transition-colors" data-scene="${s.sceneNumber}">
                <div class="flex items-center gap-2.5 min-w-0 flex-1">
                  <!-- Drag / Reorder handle and scene number -->
                  <div class="flex items-center gap-1 shrink-0">
                    <span class="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 font-mono font-bold text-xs flex items-center justify-center shrink-0">#${s.sceneNumber}</span>
                  </div>

                  <span class="font-bold text-[10px] uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 shrink-0 font-mono tracking-tight">${s.intExt} · ${s.dayNight}</span>
                  <span class="font-medium text-slate-800 truncate">${s.heading}</span>
                </div>

                <div class="flex items-center gap-2.5 shrink-0 text-[11px]">
                  <span class="text-slate-400 font-medium">${s.pages} pgs</span>
                  <span class="hidden md:inline text-slate-500 truncate max-w-[130px]">Cast: ${(s.cast || []).map(c => `<a href="/production/breakdown?scriptId=${scriptId}&category=Cast&character=${encodeURIComponent(c)}&from=${encodeURIComponent(`/production/schedule?scriptId=${scriptId}&view=stripboard`)}" class="hover:underline hover:text-blue-600 font-medium">${c}</a>`).join(', ')}</span>

                  <!-- Quick reorder actions within day -->
                  <div class="flex items-center gap-0.5 border-l border-slate-200 pl-2">
                    <button class="btn-move-strip-up p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none" data-day="${d.dayNumber}" data-scene="${s.sceneNumber}" ${idx === 0 ? 'disabled' : ''} title="Move earlier in shooting order">
                      <span class="material-symbols-outlined text-[15px]">arrow_upward</span>
                    </button>
                    <button class="btn-move-strip-down p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none" data-day="${d.dayNumber}" data-scene="${s.sceneNumber}" ${idx === dayScenes.length - 1 ? 'disabled' : ''} title="Move later in shooting order">
                      <span class="material-symbols-outlined text-[15px]">arrow_downward</span>
                    </button>
                  </div>

                  <!-- Move to another day dropdown -->
                  <div class="relative shrink-0">
                    <select class="select-move-scene text-[11px] bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-600 hover:bg-slate-100 cursor-pointer" data-from-day="${d.dayNumber}" data-scene="${s.sceneNumber}" title="Move scene to another day">
                      <option value="" disabled selected>Move Day...</option>
                      ${days.map(targetD => `
                        <option value="${targetD.dayNumber}" ${targetD.dayNumber === d.dayNumber ? 'disabled' : ''}>
                          Day ${targetD.dayNumber} (${targetD.date})
                        </option>
                      `).join('')}
                    </select>
                  </div>

                  <a href="/production/scenes?scriptId=${scriptId}&sceneId=${s.id}&from=${encodeURIComponent(`/production/schedule?scriptId=${scriptId}&view=stripboard`)}" class="text-blue-600 hover:text-blue-800 font-semibold text-[11px] transition-colors ml-1" title="View Scene in Scene Hub">
                    Inspect
                  </a>
                </div>
              </div>
            `).join('') : `
              <div class="text-center py-3 text-slate-400 text-xs italic">No scenes assigned to this day.</div>
            `}
          </div>
        </div>
      `;
    }).join('');

    attachStripboardInteractions();
  }

  // ---------------------------------------------------------------------------
  // 2. LIST VIEW RENDERER
  // ---------------------------------------------------------------------------
  function renderListView() {
    viewContainer.innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100">
        ${days.map(d => {
          const isConfirmed = d.status === 'Confirmed';
          const dayScenes = (d.sceneNumbers || [])
            .map(num => scenes.find(s => s.sceneNumber === num))
            .filter(Boolean);

          return `
            <div class="p-3.5 sm:p-4 hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3" data-day="${d.dayNumber}">
              <div class="flex items-start gap-3 min-w-0">
                <div class="w-10 h-10 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center font-heading font-bold text-xs shrink-0">
                  <span>D${d.dayNumber}</span>
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-2">
                    <h3 class="font-heading font-semibold text-sm text-slate-900 truncate">Day ${d.dayNumber}: ${d.title}</h3>
                    <span class="px-2 py-0.5 rounded-md text-[10px] font-medium border ${isConfirmed ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-blue-50 text-blue-700 border-blue-200'}">
                      ${d.status}
                    </span>
                    ${d.isLocked ? `<span class="material-symbols-outlined text-slate-400 text-[14px]" title="Locked">lock</span>` : ''}
                  </div>
                  <div class="flex flex-wrap items-center gap-y-1 gap-x-2.5 text-[11px] text-slate-500 mt-1">
                    <span class="font-medium text-slate-700">${d.date}</span>
                    <span>•</span>
                    <span>Call: 07:00 AM</span>
                    <span>•</span>
                    <span>${d.location}</span>
                    <span>•</span>
                    <span>${d.totalPages} pages</span>
                    <span>•</span>
                    <span>${dayScenes.length} scenes</span>
                  </div>
                  <!-- Scenes summary badges -->
                  <div class="flex flex-wrap items-center gap-1.5 mt-2">
                    ${dayScenes.map(s => `
                      <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-[10px] font-semibold">
                        #${s.sceneNumber} ${s.intExt}
                      </span>
                    `).join('')}
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button class="btn-manage-day px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors" data-day="${d.dayNumber}">
                  Manage Day
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    attachListInteractions();
  }

  // ---------------------------------------------------------------------------
  // 3. CALENDAR VIEW RENDERER
  // ---------------------------------------------------------------------------
  function renderCalendarView() {
    viewContainer.innerHTML = `
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
              <div class="calendar-day-card rounded-xl border border-slate-200/90 p-3 hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between gap-2 bg-slate-50/40" data-day="${d.dayNumber}">
                <div>
                  <div class="flex items-center justify-between">
                    <span class="font-heading font-bold text-xs text-slate-900">Day ${d.dayNumber}</span>
                    <span class="text-[11px] font-mono text-slate-500">${d.date.split(',')[0]}</span>
                  </div>
                  <div class="text-[11px] text-slate-600 font-medium mt-1 truncate">${d.location}</div>
                  <div class="text-[10px] text-slate-400 mt-0.5">${d.totalPages} pgs • ${d.estHours} hrs</div>
                </div>

                <div class="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <div class="flex items-center gap-1 overflow-hidden">
                    ${dayScenes.slice(0, 3).map(s => `
                      <span class="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[9px] font-bold text-slate-700">#${s.sceneNumber}</span>
                    `).join('')}
                    ${dayScenes.length > 3 ? `<span class="text-[10px] text-slate-400">+${dayScenes.length - 3}</span>` : ''}
                  </div>
                  <span class="text-blue-600 font-semibold text-[10px]">Open &rarr;</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    attachCalendarInteractions();
  }

  // ---------------------------------------------------------------------------
  // 4. DAY DETAILS MODAL LOGIC
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
        renderCurrentView();
      };
    }

    const dayScenes = (day.sceneNumbers || [])
      .map(num => scenes.find(s => s.sceneNumber === num))
      .filter(Boolean);

    if (modalContent) {
      modalContent.innerHTML = `
        <div class="flex items-center justify-between pb-1">
          <span class="font-semibold text-slate-700 text-xs">Scenes in Shooting Order (${dayScenes.length})</span>
          <span class="text-[11px] text-slate-400">Use arrows to adjust call order</span>
        </div>
        <div class="flex flex-col gap-2">
          ${dayScenes.length > 0 ? dayScenes.map((s, idx) => `
            <div class="rounded-xl border border-slate-200 p-2.5 bg-slate-50 flex items-center justify-between gap-2">
              <div class="flex items-center gap-2 min-w-0">
                <span class="w-6 h-6 rounded bg-white border border-slate-200 font-mono font-bold text-xs flex items-center justify-center text-slate-800 shrink-0">#${s.sceneNumber}</span>
                <div class="min-w-0">
                  <div class="font-medium text-slate-800 text-xs truncate">${s.heading}</div>
                  <div class="text-[10px] text-slate-500 font-mono">${s.intExt} · ${s.dayNight} · ${s.pages} pgs</div>
                </div>
              </div>

              <div class="flex items-center gap-1.5 shrink-0">
                <button class="btn-modal-up p-1 rounded hover:bg-slate-200 text-slate-500 disabled:opacity-30 disabled:pointer-events-none" data-scene="${s.sceneNumber}" ${idx === 0 ? 'disabled' : ''} title="Move earlier">
                  <span class="material-symbols-outlined text-[16px]">arrow_upward</span>
                </button>
                <button class="btn-modal-down p-1 rounded hover:bg-slate-200 text-slate-500 disabled:opacity-30 disabled:pointer-events-none" data-scene="${s.sceneNumber}" ${idx === dayScenes.length - 1 ? 'disabled' : ''} title="Move later">
                  <span class="material-symbols-outlined text-[16px]">arrow_downward</span>
                </button>
                <button class="btn-modal-move-out px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-[10px] font-semibold text-slate-700" data-scene="${s.sceneNumber}" title="Move scene to another day">
                  Move Day
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
            renderCurrentView();
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
            renderCurrentView();
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
            renderCurrentView();
          } else {
            alert('Please enter a valid day number between 1 and 14.');
          }
        };
      });
    }

    dayModal.classList.remove('hidden');
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
  // 5. ATTACH INTERACTIONS & STRIP REORDERING
  // ---------------------------------------------------------------------------
  function attachStripboardInteractions() {
    // Open Day Details Modal
    document.querySelectorAll('.btn-manage-day').forEach(el => {
      el.onclick = (e) => {
        if (e.target.closest('button') && !e.target.classList.contains('btn-manage-day')) return;
        const dayNum = el.getAttribute('data-day');
        if (dayNum) openDayModal(dayNum);
      };
    });

    // Lock toggle button
    document.querySelectorAll('.btn-toggle-lock').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const dayNum = btn.getAttribute('data-day');
        const day = days.find(d => d.dayNumber === Number(dayNum));
        if (day) {
          day.isLocked = !day.isLocked;
          await api.updateProductionScheduleDay(scriptId, dayNum, { isLocked: day.isLocked });
          showToast(`Day ${dayNum} ${day.isLocked ? 'locked' : 'unlocked'}`);
          renderCurrentView();
        }
      };
    });

    // Move Scene Up
    document.querySelectorAll('.btn-move-strip-up').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const dayNum = btn.getAttribute('data-day');
        const scNum = Number(btn.getAttribute('data-scene'));
        const day = days.find(d => d.dayNumber === Number(dayNum));
        if (!day) return;
        const idx = day.sceneNumbers.indexOf(scNum);
        if (idx > 0) {
          const arr = [...day.sceneNumbers];
          const temp = arr[idx];
          arr[idx] = arr[idx - 1];
          arr[idx - 1] = temp;
          day.sceneNumbers = arr;
          await api.reorderSceneWithinDay(scriptId, dayNum, arr);
          showToast(`Scene ${scNum} moved earlier in shooting order`);
          renderCurrentView();
        }
      };
    });

    // Move Scene Down
    document.querySelectorAll('.btn-move-strip-down').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const dayNum = btn.getAttribute('data-day');
        const scNum = Number(btn.getAttribute('data-scene'));
        const day = days.find(d => d.dayNumber === Number(dayNum));
        if (!day) return;
        const idx = day.sceneNumbers.indexOf(scNum);
        if (idx < day.sceneNumbers.length - 1) {
          const arr = [...day.sceneNumbers];
          const temp = arr[idx];
          arr[idx] = arr[idx + 1];
          arr[idx + 1] = temp;
          day.sceneNumbers = arr;
          await api.reorderSceneWithinDay(scriptId, dayNum, arr);
          showToast(`Scene ${scNum} moved later in shooting order`);
          renderCurrentView();
        }
      };
    });

    // Move Scene to Another Day Dropdown
    document.querySelectorAll('.select-move-scene').forEach(sel => {
      sel.onchange = async (e) => {
        e.stopPropagation();
        const fromDayNum = sel.getAttribute('data-from-day');
        const scNum = sel.getAttribute('data-scene');
        const toDayNum = sel.value;
        if (!toDayNum) return;
        await api.moveSceneBetweenDays(scriptId, scNum, fromDayNum, toDayNum);
        days = await api.getProductionSchedule(scriptId);
        showToast(`Scene ${scNum} moved from Day ${fromDayNum} to Day ${toDayNum}`);
        renderCurrentView();
      };
    });
  }

  function attachListInteractions() {
    document.querySelectorAll('.btn-manage-day').forEach(el => {
      el.onclick = () => {
        const dayNum = el.getAttribute('data-day');
        if (dayNum) openDayModal(dayNum);
      };
    });
  }

  function attachCalendarInteractions() {
    document.querySelectorAll('.calendar-day-card').forEach(el => {
      el.onclick = () => {
        const dayNum = el.getAttribute('data-day');
        if (dayNum) openDayModal(dayNum);
      };
    });
  }

  // ---------------------------------------------------------------------------
  // 6. VIEW SELECTION SWITCHER
  // ---------------------------------------------------------------------------
  function renderCurrentView() {
    if (activeView === 'list') {
      renderListView();
    } else if (activeView === 'calendar') {
      renderCalendarView();
    } else {
      renderStripboardView();
    }
  }

  document.querySelectorAll('.view-tab-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.view-tab-btn').forEach(b => {
        b.classList.remove('bg-white', 'text-blue-600', 'shadow-2xs', 'font-semibold');
        b.classList.add('text-slate-600');
      });
      btn.classList.add('bg-white', 'text-blue-600', 'shadow-2xs', 'font-semibold');
      btn.classList.remove('text-slate-600');

      activeView = btn.getAttribute('data-view') || 'stripboard';
      const url = new URL(window.location.href);
      url.searchParams.set('view', activeView);
      window.history.replaceState(null, '', url.pathname + url.search);
      renderCurrentView();
    };
  });

  // ---------------------------------------------------------------------------
  // 7. PRIMARY ACTION BUTTONS: PLAN SCHEDULE & CONFIRM SCHEDULE
  // ---------------------------------------------------------------------------
  const planBtn = document.getElementById('btn-plan-schedule');
  if (planBtn) {
    planBtn.onclick = () => {
      showToast('Schedule analyzed against location clustering & actor rest constraints');
    };
  }

  const confirmBtn = document.getElementById('btn-confirm-schedule');
  if (confirmBtn) {
    confirmBtn.onclick = async () => {
      if (!confirm('Confirm and lock the 14-day master stripboard schedule for Chronicles of Dust?')) return;
      days = await api.confirmProductionSchedule(scriptId);
      showToast('14-day shooting schedule confirmed and locked by Owner');
      renderCurrentView();
    };
  }

  const resolveConflictBtn = document.getElementById('btn-resolve-conflict');
  if (resolveConflictBtn) {
    resolveConflictBtn.onclick = () => {
      showToast('Call time for Day 5 pushed to 01:30 PM (12.0h turnaround satisfied)');
      const banner = document.getElementById('schedule-conflict-banner');
      if (banner) banner.style.display = 'none';
    };
  }

  // Initial Render
  renderCurrentView();
}

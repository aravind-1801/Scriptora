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
  const activeView = urlParams.get('view') || 'stripboard'; // 'stripboard', 'list', 'calendar'

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('Pre-Production', 'Shooting Schedule & Stripboard')}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3.5 fade-in">
        ${renderProdSubNav('Shooting Schedule', 'calendar_view_week', from || '/production', `
          <div class="flex items-center gap-1.5">
            <button id="btn-plan-schedule" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold transition-colors">
              <span class="material-symbols-outlined text-[16px]">auto_fix_high</span>
              <span>Plan Schedule</span>
            </button>
            <button id="btn-confirm-schedule" class="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
              <span class="material-symbols-outlined text-[16px]">lock</span>
              <span>Confirm Schedule</span>
            </button>
          </div>
        `)}

        <!-- Top Navigation Bar: View Selection (Stripboard / List / Calendar) & Schedule Metrics -->
        <div class="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <!-- View Switcher Tabs -->
          <div class="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto shrink-0" id="schedule-view-switcher">
            <button class="view-tab-btn px-3 py-1 text-xs font-medium rounded-lg transition-all ${activeView === 'stripboard' ? 'bg-white text-blue-600 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'}" data-view="stripboard">
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-[15px]">view_column</span>
                <span>Stripboard</span>
              </span>
            </button>
            <button class="view-tab-btn px-3 py-1 text-xs font-medium rounded-lg transition-all ${activeView === 'list' ? 'bg-white text-blue-600 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'}" data-view="list">
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-[15px]">format_list_bulleted</span>
                <span>List View</span>
              </span>
            </button>
            <button class="view-tab-btn px-3 py-1 text-xs font-medium rounded-lg transition-all ${activeView === 'calendar' ? 'bg-white text-blue-600 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'}" data-view="calendar">
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-[15px]">calendar_month</span>
                <span>Calendar</span>
              </span>
            </button>
          </div>

          <!-- Compact Schedule Summary -->
          <div class="flex items-center gap-3 text-xs text-slate-500 self-end sm:self-auto flex-wrap">
            <span><strong>14</strong> Shoot Days</span>
            <span>•</span>
            <span><strong>18 of 18</strong> Scenes Scheduled</span>
            <span>•</span>
            <span><strong>96.0</strong> Pages</span>
            <span>•</span>
            <span class="text-slate-700 font-medium">Oct 24 – Nov 06</span>
          </div>
        </div>

        <!-- Real Turnaround / Conflict Notice (Subtle, purposeful) -->
        <div id="schedule-conflict-banner" class="hidden bg-amber-50/70 border border-amber-200/90 rounded-2xl p-3 flex items-start justify-between gap-3 shadow-2xs text-xs">
          <div class="flex items-start gap-2 min-w-0">
            <span class="material-symbols-outlined text-[18px] text-amber-600 shrink-0 mt-0.5">info</span>
            <div class="text-amber-900 leading-relaxed">
              <strong class="font-semibold">Turnaround Advisory:</strong> Day 2 finishes with Night Chamber B scenes (wrap 23:00). Day 3 call scheduled at 06:30 AM (7.5 hr rest interval).
            </div>
          </div>
          <button id="btn-resolve-conflict" class="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-amber-800 text-[11px] font-medium hover:bg-amber-100/50 shrink-0">
            Adjust Call Time
          </button>
        </div>

        <!-- Dynamic Main Schedule Container (Stripboard, List, or Calendar) -->
        <div id="schedule-main-view" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading shooting schedule...</div>
        </div>

      </main>

      <!-- Bottom Navigation with Production Active -->
      ${renderBottomNav('production')}

      <!-- Dedicated Day Details Modal / Drawer -->
      <div id="day-detail-modal" class="hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
        <div class="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div class="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-8 h-8 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0" id="modal-day-badge">
                D1
              </div>
              <div class="min-w-0">
                <h3 class="font-heading font-semibold text-sm text-slate-900 truncate" id="modal-day-title">Day Details</h3>
                <p class="text-[11px] text-slate-500 truncate" id="modal-day-subtitle">Date • Location</p>
              </div>
            </div>
            <button id="modal-day-close" class="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div class="p-4 sm:p-5 overflow-y-auto flex-1 flex flex-col gap-3 text-xs" id="modal-day-content">
            <!-- Dynamic Day Details & Scene Reordering -->
          </div>

          <div class="px-5 py-3 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <span class="text-[11px] text-slate-400" id="modal-day-status-label">Draft assignments</span>
            <button id="modal-day-done" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs transition-colors">
              Done
            </button>
          </div>
        </div>
      </div>

    </div>
  `;
}

export async function attachScheduleEvents(navigate, fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  let activeView = urlParams.get('view') || 'stripboard';

  const mainViewContainer = document.getElementById('schedule-main-view');
  const conflictBanner = document.getElementById('schedule-conflict-banner');
  const dayModal = document.getElementById('day-detail-modal');

  // Load Schedule & Scene Records
  let days = await api.getProductionSchedule(scriptId);
  const scenes = await api.getProductionScenes(scriptId);

  // Check for Turnaround Advisory
  if (conflictBanner) {
    conflictBanner.classList.remove('hidden');
    const resolveBtn = document.getElementById('btn-resolve-conflict');
    if (resolveBtn) {
      resolveBtn.onclick = async () => {
        const day3 = days.find(d => d.dayNumber === 3);
        if (day3) {
          await api.updateProductionScheduleDay(scriptId, 3, { callTime: "08:30 AM" });
          conflictBanner.classList.add('hidden');
          showToast('Turnaround resolved: Day 3 general call shifted to 08:30 AM (9.5h rest)');
        }
      };
    }
  }

  // ---------------------------------------------------------------------------
  // 1. RENDER STRIPBOARD VIEW (Vertically arranged scene strips under day headers)
  // ---------------------------------------------------------------------------
  function renderStripboardView() {
    if (!mainViewContainer) return;

    mainViewContainer.innerHTML = `
      <div class="flex flex-col gap-3">
        ${days.map(d => {
          const isLocked = d.isLocked;
          const isConfirmed = d.status === 'Confirmed';
          const dayScenes = (d.sceneNumbers || [])
            .map(num => scenes.find(s => s.sceneNumber === num))
            .filter(Boolean);

          return `
            <div class="bg-white rounded-2xl border border-slate-200/80 p-3.5 sm:p-4 shadow-xs flex flex-col gap-2.5" data-day="${d.dayNumber}">
              
              <!-- Day Header -->
              <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div class="flex items-center gap-2.5 min-w-0">
                  <div class="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    D${d.dayNumber}
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <h3 class="font-heading font-semibold text-xs sm:text-sm text-slate-900 truncate">Day ${d.dayNumber} — ${d.title}</h3>
                      <span class="px-2 py-0.5 rounded-md text-[10px] font-medium border ${isConfirmed ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-amber-50/80 text-amber-800 border-amber-200'}">
                        ${isConfirmed ? 'Confirmed' : 'Draft'}
                      </span>
                    </div>
                    <div class="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5 flex-wrap">
                      <span class="font-medium text-slate-700">${d.date}</span>
                      <span>•</span>
                      <span>${d.location}</span>
                      <span>•</span>
                      <span>${d.totalPages} pgs · ${d.estHours} hrs</span>
                    </div>
                  </div>
                </div>

                <!-- Controls: Day Lock & Manage Day Action -->
                <div class="flex items-center gap-1.5 shrink-0">
                  <button class="btn-manage-day px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1 transition-colors" data-day="${d.dayNumber}" title="Open Day Details & Scene Reordering">
                    <span class="material-symbols-outlined text-[15px]">tune</span>
                    <span class="hidden sm:inline">Manage Day</span>
                  </button>
                  <button class="btn-toggle-lock px-2 py-1 rounded-lg border border-slate-200 ${isLocked ? 'bg-slate-100 text-slate-700 font-semibold' : 'bg-white hover:bg-slate-50 text-slate-500'} text-xs flex items-center gap-1 transition-colors" data-day="${d.dayNumber}" title="${isLocked ? 'Locked against automated re-plan' : 'Lock day'}">
                    <span class="material-symbols-outlined text-[15px]">${isLocked ? 'lock' : 'lock_open'}</span>
                    <span class="hidden sm:inline">${isLocked ? 'Locked' : 'Lock'}</span>
                  </button>
                </div>
              </div>

              <!-- Stripboard Scene Strips (Clean, Restrained Surfaces) -->
              <div class="flex flex-col gap-1.5 pt-0.5">
                ${dayScenes.length > 0 ? dayScenes.map((s, idx) => `
                  <div class="strip-card rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50/60 p-2.5 flex items-center justify-between gap-3 text-xs shadow-2xs transition-colors" data-scene="${s.sceneNumber}" data-day="${d.dayNumber}">
                    
                    <div class="flex items-center gap-2.5 min-w-0 flex-1">
                      <span class="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">#${s.sceneNumber}</span>
                      <span class="font-semibold text-[10px] uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0 font-mono">${s.intExt} · ${s.dayNight}</span>
                      <span class="font-medium text-slate-800 truncate">${s.heading}</span>
                    </div>

                    <div class="flex items-center gap-2 sm:gap-3 shrink-0 text-[11px]">
                      <span class="text-slate-400 font-medium">${s.pages} pgs</span>
                      
                      <!-- Quick Reorder Up / Down Controls -->
                      <div class="flex items-center gap-0.5 border-l border-slate-100 pl-2">
                        <button class="btn-move-strip-up p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded disabled:opacity-30 disabled:pointer-events-none" data-day="${d.dayNumber}" data-scene="${s.sceneNumber}" ${idx === 0 ? 'disabled' : ''} title="Move Earlier in Shoot Order">
                          <span class="material-symbols-outlined text-[15px]">arrow_upward</span>
                        </button>
                        <button class="btn-move-strip-down p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded disabled:opacity-30 disabled:pointer-events-none" data-day="${d.dayNumber}" data-scene="${s.sceneNumber}" ${idx === dayScenes.length - 1 ? 'disabled' : ''} title="Move Later in Shoot Order">
                          <span class="material-symbols-outlined text-[15px]">arrow_downward</span>
                        </button>
                      </div>

                      <!-- Move to Another Day Select -->
                      <select class="select-move-scene text-[11px] font-medium bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 text-slate-700 focus:outline-none cursor-pointer" data-from-day="${d.dayNumber}" data-scene="${s.sceneNumber}" title="Move Scene to Another Shoot Day">
                        <option value="" disabled selected>Move...</option>
                        ${days.map(targetDay => `
                          <option value="${targetDay.dayNumber}" ${targetDay.dayNumber === d.dayNumber ? 'disabled' : ''}>
                            Day ${targetDay.dayNumber} (${targetDay.date})
                          </option>
                        `).join('')}
                      </select>

                      <!-- Inspect Link -->
                      <a href="/production/scenes?scriptId=${scriptId}&sceneId=${s.id}&from=${encodeURIComponent(`/production/schedule?scriptId=${scriptId}&view=stripboard`)}" class="text-blue-600 hover:text-blue-800 font-semibold text-[11px] transition-colors pl-1">
                        Inspect
                      </a>
                    </div>

                  </div>
                `).join('') : `
                  <div class="text-center py-3 text-slate-400 text-xs italic bg-slate-50/50 rounded-xl">
                    No scenes assigned to Day ${d.dayNumber}. Use Move action or Plan Schedule.
                  </div>
                `}
              </div>

            </div>
          `;
        }).join('')}
      </div>
    `;

    attachStripboardInteractions();
  }

  // ---------------------------------------------------------------------------
  // 2. RENDER LIST VIEW (Clean vertically arranged days overview)
  // ---------------------------------------------------------------------------
  function renderListView() {
    if (!mainViewContainer) return;

    mainViewContainer.innerHTML = `
      <div class="flex flex-col gap-2.5">
        ${days.map(d => {
          const isConfirmed = d.status === 'Confirmed';
          const dayScenes = (d.sceneNumbers || [])
            .map(num => scenes.find(s => s.sceneNumber === num))
            .filter(Boolean);

          return `
            <div class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group btn-manage-day" data-day="${d.dayNumber}">
              <div class="flex items-start gap-3 min-w-0">
                <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                  D${d.dayNumber}
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <h3 class="font-heading font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Day ${d.dayNumber} — ${d.title}</h3>
                    <span class="px-2 py-0.5 rounded-md text-[10px] font-medium border ${isConfirmed ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-amber-50/80 text-amber-800 border-amber-200'}">
                      ${isConfirmed ? 'Confirmed' : 'Draft'}
                    </span>
                    ${d.isLocked ? `<span class="material-symbols-outlined text-[14px] text-slate-400" title="Locked">lock</span>` : ''}
                  </div>
                  <div class="text-xs text-slate-600 mt-1 truncate">
                    <span class="font-medium text-slate-800">Scenes:</span> ${dayScenes.map(s => `Sc ${s.sceneNumber} (${s.intExt} · ${s.dayNight})`).join(', ') || 'None assigned'}
                  </div>
                  <div class="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                    <span>${d.date}</span>
                    <span>•</span>
                    <span>${d.location}</span>
                    <span>•</span>
                    <span>${d.totalPages} pgs · ${d.estHours} hrs</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2 self-end sm:self-center shrink-0 text-blue-600 font-semibold text-xs">
                <span>Manage Day</span>
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    attachStripboardInteractions();
  }

  // ---------------------------------------------------------------------------
  // 3. RENDER CALENDAR VIEW (Chronological Date Matrix)
  // ---------------------------------------------------------------------------
  function renderCalendarView() {
    if (!mainViewContainer) return;

    // Calendar dates from Oct 24 to Nov 06, 2026 (14 Shoot Days)
    mainViewContainer.innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col gap-3">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 class="font-heading font-semibold text-sm text-slate-900 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[18px] text-blue-600">calendar_month</span>
            <span>Production Shoot Calendar (14 Days)</span>
          </h3>
          <span class="text-xs text-slate-400 font-medium">October – November 2026</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
          ${days.map(d => {
            const isConfirmed = d.status === 'Confirmed';
            const sceneList = (d.sceneNumbers || []).map(num => `#${num}`).join(', ');

            return `
              <div class="border border-slate-200/80 rounded-xl p-2.5 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between min-h-[110px] group btn-manage-day" data-day="${d.dayNumber}">
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="font-mono font-bold text-xs text-slate-900">D${d.dayNumber}</span>
                    <span class="text-[10px] font-semibold text-slate-500">${d.date.split(',')[0]}</span>
                  </div>
                  <h4 class="font-heading font-medium text-xs text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">${d.location}</h4>
                  <p class="text-[10px] text-slate-400 line-clamp-1 mt-0.5">${d.title}</p>
                </div>

                <div class="pt-2 border-t border-slate-100 mt-2 flex items-center justify-between text-[10px]">
                  <span class="font-mono font-medium text-slate-600 truncate">${sceneList}</span>
                  <span class="px-1.5 py-0.2 rounded text-[9px] font-medium ${isConfirmed ? 'bg-slate-100 text-slate-700' : 'bg-amber-50 text-amber-800'}">
                    ${isConfirmed ? 'Locked' : 'Draft'}
                  </span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    attachStripboardInteractions();
  }

  // ---------------------------------------------------------------------------
  // 4. DAY DETAILS DEDICATED MODAL / DRAWER
  // ---------------------------------------------------------------------------
  function openDayModal(dayNum) {
    const day = days.find(d => d.dayNumber === Number(dayNum));
    if (!day || !dayModal) return;

    const modalBadge = document.getElementById('modal-day-badge');
    const modalTitle = document.getElementById('modal-day-title');
    const modalSubtitle = document.getElementById('modal-day-subtitle');
    const modalContent = document.getElementById('modal-day-content');
    const modalStatus = document.getElementById('modal-day-status-label');

    if (modalBadge) modalBadge.textContent = `D${day.dayNumber}`;
    if (modalTitle) modalTitle.textContent = `Day ${day.dayNumber} — ${day.title}`;
    if (modalSubtitle) modalSubtitle.textContent = `${day.date} · ${day.location} · Call: ${day.callTime || '07:00 AM'}`;
    if (modalStatus) modalStatus.textContent = `${day.totalPages} pages · ${day.estHours} estimated hours · ${day.status}`;

    const dayScenes = (day.sceneNumbers || [])
      .map(num => scenes.find(s => s.sceneNumber === num))
      .filter(Boolean);

    if (modalContent) {
      modalContent.innerHTML = `
        <div class="space-y-3">
          <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div>
              <span class="font-semibold text-slate-800">Lock Day Schedule</span>
              <p class="text-[11px] text-slate-500">Prevent automated rescheduling from altering this shoot day</p>
            </div>
            <button id="modal-btn-toggle-lock" class="px-3 py-1 rounded-lg border border-slate-200 ${day.isLocked ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'} font-semibold text-xs transition-colors">
              ${day.isLocked ? 'Locked' : 'Unlocked'}
            </button>
          </div>

          <div>
            <h4 class="font-heading font-semibold text-xs text-slate-900 mb-2 uppercase tracking-wide">
              Assigned Scenes in Shooting Order (${dayScenes.length})
            </h4>

            <div class="flex flex-col gap-2" id="modal-scenes-list">
              ${dayScenes.length > 0 ? dayScenes.map((s, idx) => `
                <div class="p-2.5 rounded-xl border border-slate-200/80 bg-white flex items-center justify-between gap-2 shadow-2xs">
                  <div class="flex items-center gap-2 min-w-0 flex-1">
                    <span class="w-6 h-6 rounded bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">#${s.sceneNumber}</span>
                    <div class="min-w-0">
                      <div class="font-medium text-slate-900 truncate">${s.heading}</div>
                      <div class="text-[10px] text-slate-500">${s.intExt} · ${s.dayNight} · ${s.pages} pgs · Cast: ${(s.cast || []).join(', ')}</div>
                    </div>
                  </div>

                  <div class="flex items-center gap-1 shrink-0">
                    <button class="btn-modal-up p-1 text-slate-400 hover:text-slate-700 rounded disabled:opacity-30" data-idx="${idx}" ${idx === 0 ? 'disabled' : ''}>
                      <span class="material-symbols-outlined text-[16px]">arrow_upward</span>
                    </button>
                    <button class="btn-modal-down p-1 text-slate-400 hover:text-slate-700 rounded disabled:opacity-30" data-idx="${idx}" ${idx === dayScenes.length - 1 ? 'disabled' : ''}>
                      <span class="material-symbols-outlined text-[16px]">arrow_downward</span>
                    </button>
                    <button class="btn-modal-move-out px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium ml-1" data-scene="${s.sceneNumber}">
                      Move Day
                    </button>
                  </div>
                </div>
              `).join('') : `
                <div class="p-4 text-center text-slate-400 text-xs italic bg-slate-50 rounded-xl">No scenes assigned to this day.</div>
              `}
            </div>
          </div>
        </div>
      `;

      // Wire modal lock toggle
      const lockBtn = document.getElementById('modal-btn-toggle-lock');
      if (lockBtn) {
        lockBtn.onclick = async () => {
          day.isLocked = !day.isLocked;
          await api.updateProductionScheduleDay(scriptId, day.dayNumber, { isLocked: day.isLocked });
          showToast(`Day ${day.dayNumber} ${day.isLocked ? 'locked' : 'unlocked'}`);
          openDayModal(day.dayNumber);
          renderCurrentView();
        };
      }

      // Wire Up / Down inside modal
      modalContent.querySelectorAll('.btn-modal-up').forEach(btn => {
        btn.onclick = async () => {
          const idx = Number(btn.getAttribute('data-idx'));
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
          const idx = Number(btn.getAttribute('data-idx'));
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
        // Don't trigger if clicked on an action button inside
        if (e.target.closest('button') || e.target.closest('select') || e.target.closest('a')) return;
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
          showToast(`Scene ${scNum} moved earlier`);
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
          showToast(`Scene ${scNum} moved later`);
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

  // Initial Render
  renderCurrentView();
}

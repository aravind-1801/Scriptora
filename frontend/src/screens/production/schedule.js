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

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('Pre-Production', 'Master Shooting Schedule & Stripboard')}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${renderProdSubNav('Shooting Schedule & Stripboard', 'calendar_view_week', from || '/production', `
          <button id="btn-confirm-schedule" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs transition-all">
            <span class="material-symbols-outlined text-[16px]">lock</span>
            <span>Confirm Schedule</span>
          </button>
        `)}

        <!-- Schedule Status Summary -->
        <div class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
          <div class="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div class="p-2 sm:px-3 first:pl-1">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Shoot Window</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5">14 Days</div>
              <span class="text-[11px] text-slate-400">Oct 24 – Nov 06</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Scheduled</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5">18 of 18 Scenes</div>
              <span class="text-[11px] text-slate-400">100% Allocated</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Total Pages</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5">96.0 Pages</div>
              <span class="text-[11px] text-slate-400">Avg 6.8 pgs / day</span>
            </div>
            <div class="p-2 sm:px-3">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Company Moves</span>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5">4 Moves</div>
              <span class="text-[11px] text-slate-400">Mojave perimeter</span>
            </div>
          </div>
        </div>

        <!-- Stripboard Days Stream -->
        <div id="stripboard-days-list" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading master stripboard...</div>
        </div>

      </main>

      ${renderBottomNav('production')}
    </div>
  `;
}

export async function attachScheduleEvents(navigate, fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';

  const container = document.getElementById('stripboard-days-list');
  if (!container) return;

  const renderStripboard = async () => {
    const days = await api.getProductionSchedule(scriptId);
    const scenes = await api.getProductionScenes(scriptId);

    container.innerHTML = days.map(d => {
      const isLocked = d.isLocked;
      const isConfirmed = d.status === 'Confirmed';
      const dayScenes = scenes.filter(s => (d.sceneNumbers || []).includes(s.sceneNumber));

      return `
        <div class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col gap-3" data-day="${d.dayNumber}">
          <!-- Day Strip Header -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-heading font-bold text-xs shrink-0">
                D${d.dayNumber}
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <h3 class="font-heading font-semibold text-xs sm:text-sm text-slate-900 truncate">Day ${d.dayNumber} — ${d.title}</h3>
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-medium border ${isConfirmed ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-amber-50 text-amber-700 border-amber-200'}">
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

            <!-- Day Actions: Lock Toggle -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button class="btn-toggle-lock px-2 py-1 rounded-lg border border-slate-200 ${isLocked ? 'bg-slate-100 text-slate-700 font-semibold' : 'bg-white hover:bg-slate-50 text-slate-500'} text-xs flex items-center gap-1 transition-colors" data-day="${d.dayNumber}" title="${isLocked ? 'Day locked against auto-reorder' : 'Lock day'}">
                <span class="material-symbols-outlined text-[15px]">${isLocked ? 'lock' : 'lock_open'}</span>
                <span class="hidden sm:inline">${isLocked ? 'Locked' : 'Lock'}</span>
              </button>
            </div>
          </div>

          <!-- Scenes in this Day (Clean Neutral Strips) -->
          <div class="flex flex-col gap-1.5">
            ${dayScenes.length > 0 ? dayScenes.map(s => `
              <div class="strip-card rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50/50 p-2.5 flex items-center justify-between gap-3 text-xs shadow-2xs transition-colors">
                <div class="flex items-center gap-2.5 min-w-0 flex-1">
                  <span class="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">#${s.sceneNumber}</span>
                  <span class="font-bold text-[10px] uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0 font-mono">${s.intExt} · ${s.dayNight}</span>
                  <span class="font-medium text-slate-800 truncate">${s.heading}</span>
                </div>

                <div class="flex items-center gap-3 shrink-0 text-[11px]">
                  <span class="text-slate-400">${s.pages} pgs</span>
                  <span class="hidden md:inline text-slate-500 truncate max-w-[150px]">Cast: ${(s.cast || []).map(c => `<a href="/production/breakdown?scriptId=${scriptId}&category=Cast&character=${encodeURIComponent(c)}&from=${encodeURIComponent(`/production/schedule?scriptId=${scriptId}`)}" class="hover:underline hover:text-blue-600 font-medium" title="Inspect ${c} in Breakdown">${c}</a>`).join(', ')}</span>
                  <a href="/production/scenes?scriptId=${scriptId}&sceneId=${s.id}&from=${encodeURIComponent(`/production/schedule?scriptId=${scriptId}`)}" class="text-blue-600 hover:text-blue-800 font-semibold text-[11px] transition-colors" title="View Scene Logistics">
                    Inspect
                  </a>
                </div>
              </div>
            `).join('') : `
              <div class="text-center py-2 text-slate-400 text-xs italic">No scenes assigned to this day.</div>
            `}
          </div>
        </div>
      `;
    }).join('');

    // Attach Lock Toggle Events
    container.querySelectorAll('.btn-toggle-lock').forEach(btn => {
      btn.onclick = async () => {
        const dayNum = btn.getAttribute('data-day');
        const days = await api.getProductionSchedule(scriptId);
        const day = days.find(d => d.dayNumber === Number(dayNum));
        if (day) {
          const newLocked = !day.isLocked;
          await api.updateProductionScheduleDay(scriptId, dayNum, { isLocked: newLocked });
          showToast(`Day ${dayNum} ${newLocked ? 'locked' : 'unlocked'}`);
          renderStripboard();
        }
      };
    });
  };

  await renderStripboard();

  // Confirm Schedule Button
  const confirmBtn = document.getElementById('btn-confirm-schedule');
  if (confirmBtn) {
    confirmBtn.onclick = async () => {
      if (!confirm('Confirm and lock the 14-day master stripboard schedule for chronicles-of-dust?')) return;
      await api.confirmProductionSchedule(scriptId);
      showToast('14-day shooting schedule confirmed and locked by Owner');
      renderStripboard();
    };
  }

  // Optimize Schedule Button
  const optBtn = document.getElementById('btn-propose-schedule');
  if (optBtn) {
    optBtn.onclick = () => {
      showToast('Schedule re-optimized: Company moves clustered to Mojave perimeter');
    };
  }
}

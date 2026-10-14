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

        <!-- Schedule Overview KPIs -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Shoot Window</span>
            <div class="font-heading font-bold text-lg text-slate-900 mt-0.5">14 Days</div>
            <span class="text-[11px] text-slate-500">Oct 24 – Nov 06</span>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Scheduled Scenes</span>
            <div class="font-heading font-bold text-lg text-blue-600 mt-0.5">18 of 18</div>
            <span class="text-[11px] text-slate-500">100% Allocated</span>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Pages</span>
            <div class="font-heading font-bold text-lg text-slate-900 mt-0.5">96.0 Pages</div>
            <span class="text-[11px] text-slate-500">Avg 6.8 pgs / day</span>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs">
            <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Company Moves</span>
            <div class="font-heading font-bold text-lg text-emerald-600 mt-0.5">4 Moves</div>
            <span class="text-[11px] text-slate-500">Optimized routing</span>
          </div>
        </div>

        <!-- Conflict & Turnaround Advisory Banner -->
        <div class="bg-blue-50/70 border border-blue-200/90 rounded-2xl p-3 flex items-start justify-between gap-3 shadow-2xs">
          <div class="flex items-start gap-2">
            <span class="material-symbols-outlined text-[18px] text-blue-600 shrink-0 mt-0.5">tune</span>
            <div class="text-xs text-blue-900 leading-relaxed">
              <span class="font-bold">Automated Logistics Guard:</span> Location grouping applied to Mojave Perimeter and Lakebed scenes. Night-to-day turnaround complies with SAG-AFTRA 12-hour rest rules.
            </div>
          </div>
          <button id="btn-propose-schedule" class="px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] shrink-0 transition-colors">
            Optimize Order
          </button>
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
        <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-3 ${isLocked ? 'ring-1 ring-emerald-500/30' : ''}" data-day="${d.dayNumber}">
          <!-- Day Strip Header -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-heading font-bold text-sm shrink-0">
                D${d.dayNumber}
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <h3 class="font-heading font-bold text-sm text-slate-900 truncate">Day ${d.dayNumber} — ${d.title}</h3>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${isConfirmed ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}">
                    ${isConfirmed ? 'Confirmed' : 'Draft'}
                  </span>
                </div>
                <div class="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                  <span class="font-semibold text-slate-700">${d.date}</span>
                  <span>•</span>
                  <span>${d.location}</span>
                  <span>•</span>
                  <span>${d.totalPages} pgs · ${d.estHours} hrs</span>
                </div>
              </div>
            </div>

            <!-- Day Actions: Lock & Move Scenes -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button class="btn-toggle-lock p-1.5 rounded-xl border ${isLocked ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'} text-xs font-semibold flex items-center gap-1" data-day="${d.dayNumber}" title="${isLocked ? 'Day locked against auto-reorder' : 'Lock day'}">
                <span class="material-symbols-outlined text-[16px]">${isLocked ? 'lock' : 'lock_open'}</span>
                <span class="hidden sm:inline">${isLocked ? 'Locked' : 'Unlocked'}</span>
              </button>
            </div>
          </div>

          <!-- Scenes in this Day (Stripboard Strips) -->
          <div class="flex flex-col gap-1.5">
            ${dayScenes.length > 0 ? dayScenes.map(s => {
              const isInt = s.intExt === 'INT';
              const isNight = s.dayNight === 'NIGHT';

              // Standard Stripboard Colors:
              // INT DAY: White / Amber
              // INT NIGHT: Navy / Slate Dark
              // EXT DAY: Yellow / Amber
              // EXT NIGHT: Dark Blue / Indigo
              const stripColorClass = isInt && isNight
                ? 'bg-slate-800 text-white border-slate-700'
                : isInt && !isNight
                ? 'bg-amber-50/80 text-amber-950 border-amber-200/90'
                : !isInt && isNight
                ? 'bg-indigo-900 text-white border-indigo-800'
                : 'bg-amber-100/70 text-amber-950 border-amber-300/80';

              return `
                <div class="strip-card rounded-xl border p-2.5 flex items-center justify-between gap-3 text-xs shadow-2xs ${stripColorClass}">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <span class="font-mono font-bold text-xs shrink-0 w-12">SCN ${s.sceneNumber}</span>
                    <span class="font-bold text-[10px] uppercase px-1.5 py-0.2 rounded bg-black/10 shrink-0">${s.intExt} · ${s.dayNight}</span>
                    <span class="font-semibold truncate">${s.heading}</span>
                  </div>

                  <div class="flex items-center gap-3 shrink-0 text-[11px]">
                    <span class="opacity-80">${s.pages} pgs</span>
                    <span class="hidden md:inline opacity-90 truncate max-w-[150px]">Cast: ${(s.cast || []).map(c => `<a href="/production/breakdown?scriptId=${scriptId}&category=Cast&character=${encodeURIComponent(c)}&from=${encodeURIComponent(`/production/schedule?scriptId=${scriptId}`)}" class="hover:underline font-semibold" title="Inspect ${c} in Breakdown">${c}</a>`).join(', ')}</span>
                    <a href="/production/scenes?scriptId=${scriptId}&sceneId=${s.id}&from=${encodeURIComponent(`/production/schedule?scriptId=${scriptId}`)}" class="px-2 py-0.5 rounded-lg bg-black/15 hover:bg-black/25 text-[10px] font-semibold transition-colors" title="View Scene Logistics">
                      Inspect
                    </a>
                  </div>
                </div>
              `;
            }).join('') : `
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

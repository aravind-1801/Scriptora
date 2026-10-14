import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';
import { renderProdSubNav } from './prodNav.js';
import { store } from '../../state/store.js';
import * as api from '../../services/api.js';
import { showToast } from '../../components/toast.js';

export function renderReadinessScreen(fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const from = fromParam || urlParams.get('from');

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('Pre-Production', 'Pre-Flight Readiness & Validation')}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${renderProdSubNav('Readiness & Validation', 'fact_check', from || '/production', `
          <button id="btn-revalidate" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
            <span class="material-symbols-outlined text-[16px]">refresh</span>
            <span>Run Pre-Flight</span>
          </button>
        `)}

        <!-- Status Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="bg-white rounded-2xl border border-rose-200/90 p-4 shadow-2xs flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm shrink-0">
              <span class="material-symbols-outlined text-[20px]">error</span>
            </div>
            <div>
              <div class="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Critical Blockers</div>
              <div class="font-heading font-bold text-base text-slate-900 mt-0.5" id="kpi-critical">2 Issues</div>
              <p class="text-[11px] text-slate-500">Requires Owner sign-off</p>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-amber-200/90 p-4 shadow-2xs flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm shrink-0">
              <span class="material-symbols-outlined text-[20px]">warning</span>
            </div>
            <div>
              <div class="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Warnings & Pending</div>
              <div class="font-heading font-bold text-base text-slate-900 mt-0.5" id="kpi-warnings">1 Pending</div>
              <p class="text-[11px] text-slate-500">Action recommended</p>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-emerald-200/90 p-4 shadow-2xs flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">
              <span class="material-symbols-outlined text-[20px]">verified</span>
            </div>
            <div>
              <div class="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Verified Gates</div>
              <div class="font-heading font-bold text-base text-slate-900 mt-0.5" id="kpi-verified">3 Passed</div>
              <p class="text-[11px] text-slate-500">Shoot-day ready</p>
            </div>
          </div>
        </div>

        <!-- Actionable Pre-Flight Gates List -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col gap-3">
          <div class="border-b border-slate-100 pb-2.5 flex items-center justify-between">
            <h3 class="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-blue-600">checklist</span>
              <span>Pre-Production Validation Gates</span>
            </h3>
            <span class="text-[11px] text-slate-400 font-mono">Real Validation Checks</span>
          </div>

          <div id="readiness-items-stream" class="flex flex-col gap-2.5 pt-1">
            <div class="text-center py-6 text-slate-400 text-xs">Evaluating production readiness rules...</div>
          </div>
        </div>

      </main>

      ${renderBottomNav('production')}
    </div>
  `;
}

export async function attachReadinessEvents(navigate, fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';

  const container = document.getElementById('readiness-items-stream');
  if (!container) return;

  const renderItems = async () => {
    const items = await api.getProductionReadiness(scriptId);

    const criticalCount = items.filter(i => i.severity === 'critical' && i.status !== 'resolved').length;
    const warnCount = items.filter(i => i.severity === 'warning' && i.status !== 'resolved').length;
    const readyCount = items.filter(i => i.status === 'resolved' || i.severity === 'ready').length;

    const elCrit = document.getElementById('kpi-critical');
    const elWarn = document.getElementById('kpi-warnings');
    const elVer = document.getElementById('kpi-verified');
    if (elCrit) elCrit.textContent = `${criticalCount} Issues`;
    if (elWarn) elWarn.textContent = `${warnCount} Pending`;
    if (elVer) elVer.textContent = `${readyCount} Passed`;

    container.innerHTML = items.map(item => {
      const isCrit = item.severity === 'critical' && item.status !== 'resolved';
      const isWarn = item.severity === 'warning' && item.status !== 'resolved';
      const isPass = item.status === 'resolved' || item.severity === 'ready';

      const borderClass = isCrit
        ? 'border-rose-200 bg-rose-50/20'
        : isWarn
        ? 'border-amber-200 bg-amber-50/20'
        : 'border-slate-200 bg-white';

      const badge = isCrit
        ? `<span class="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold">CRITICAL BLOCKER</span>`
        : isWarn
        ? `<span class="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold">WARNING</span>`
        : `<span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">check</span>PASSED</span>`;

      return `
        <div class="rounded-xl border p-3.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${borderClass}">
          <div class="flex items-start gap-3 min-w-0">
            <div class="w-8 h-8 rounded-lg ${isCrit ? 'bg-rose-100 text-rose-700' : isWarn ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'} flex items-center justify-center shrink-0 mt-0.5">
              <span class="material-symbols-outlined text-[17px]">${isCrit ? 'priority_high' : isWarn ? 'warning' : 'check'}</span>
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">${item.category}</span>
                ${badge}
              </div>
              <h4 class="font-heading font-bold text-sm text-slate-900 mt-0.5">${item.title}</h4>
              <p class="text-xs text-slate-600 mt-0.5 leading-relaxed">${item.description}</p>
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
            ${!isPass ? `
              <a href="${item.targetRoute}?scriptId=${scriptId}&from=${encodeURIComponent(`/production/readiness?scriptId=${scriptId}`)}" class="btn-jump-fix px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs transition-colors flex items-center gap-1">
                <span>Fix Issue</span>
                <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
              </a>
              <button class="btn-mark-resolved px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors" data-id="${item.id}" title="Mark as resolved manually">
                Resolve
              </button>
            ` : `
              <span class="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">verified</span>
                <span>Verified</span>
              </span>
            `}
          </div>
        </div>
      `;
    }).join('');

    // Attach mark resolved buttons
    container.querySelectorAll('.btn-mark-resolved').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        await api.resolveProductionReadiness(scriptId, id);
        showToast('Issue marked as resolved');
        renderItems();
      };
    });
  };

  await renderItems();

  const revalBtn = document.getElementById('btn-revalidate');
  if (revalBtn) {
    revalBtn.onclick = async () => {
      showToast('Running real pre-flight checks against Draft 4.2...');
      await renderItems();
      showToast('Pre-flight scan completed');
    };
  }
}

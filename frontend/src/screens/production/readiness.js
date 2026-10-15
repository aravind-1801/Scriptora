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

        <!-- Production Verification Status Summary -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs">
          <div class="grid grid-cols-3 divide-x divide-slate-100">
            <div class="px-3 first:pl-1">
              <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Sign-off Required</div>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5" id="kpi-critical">0 Issues</div>
              <p class="text-[11px] text-slate-400 mt-0.5">Owner review</p>
            </div>
            <div class="px-3">
              <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">In Review</div>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5" id="kpi-warnings">0 Pending</div>
              <p class="text-[11px] text-slate-400 mt-0.5">Department follow-up</p>
            </div>
            <div class="px-3">
              <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Confirmed</div>
              <div class="font-heading font-bold text-lg text-slate-900 mt-0.5" id="kpi-verified">0 Passed</div>
              <p class="text-[11px] text-slate-400 mt-0.5">Production locked</p>
            </div>
          </div>
        </div>

        <!-- Pre-Production Verification Gates -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs flex flex-col gap-3">
          <div class="border-b border-slate-100 pb-2.5 flex items-center justify-between">
            <h3 class="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-blue-600">checklist</span>
              <span>Pre-Production Verification Gates</span>
            </h3>
            <span class="text-[11px] text-slate-400 font-mono">Draft 4.2 Baseline</span>
          </div>

          <div id="readiness-items-stream" class="flex flex-col gap-2.5 pt-1">
            <div class="text-center py-6 text-slate-400 text-xs">Evaluating production verification rules...</div>
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

      const badge = isCrit
        ? `<span class="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200">Sign-off Required</span>`
        : isWarn
        ? `<span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">Pending Review</span>`
        : `<span class="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[10px] font-semibold border border-slate-200 flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">check</span>Verified</span>`;

      return `
        <div class="rounded-xl border border-slate-200/90 bg-white p-3.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition-colors">
          <div class="flex items-start gap-3 min-w-0">
            <div class="w-7 h-7 rounded-lg ${isCrit ? 'bg-rose-50 text-rose-600' : isWarn ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-500'} flex items-center justify-center shrink-0 mt-0.5 border border-slate-100">
              <span class="material-symbols-outlined text-[16px]">${isCrit ? 'priority_high' : isWarn ? 'warning' : 'check'}</span>
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
              <span class="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
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

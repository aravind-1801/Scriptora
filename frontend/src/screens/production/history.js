import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';
import { renderProdSubNav } from './prodNav.js';
import { store } from '../../state/store.js';
import * as api from '../../services/api.js';
import { showToast } from '../../components/toast.js';

export function renderHistoryScreen(fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const from = fromParam || urlParams.get('from');

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('Pre-Production', 'Production Version History & Audit Trail')}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${renderProdSubNav('Version History & Timeline', 'history_edu', from || '/production', `
          <button id="btn-restore-version-trigger" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
            <span class="material-symbols-outlined text-[16px]">restore</span>
            <span>Restore Snapshot</span>
          </button>
        `)}

        <!-- Version Comparison & Restoration Banner -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-1">
                <span class="material-symbols-outlined text-[13px]">lock</span>
                <span>Active Production Baseline: Draft 4.2</span>
              </span>
              <span class="text-xs text-slate-500 font-medium">Hash: 88f2</span>
            </div>
            <p class="text-xs text-slate-500 mt-1 leading-relaxed">
              Every production extraction, approval, and schedule adjustment is recorded in an immutable chronological audit trail.
            </p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <select id="select-compare-version" class="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
              <option value="Draft 3.0">Compare vs Draft 3.0</option>
              <option value="Draft 2.0">Compare vs Draft 2.0</option>
              <option value="Draft 1.0">Compare vs Draft 1.0</option>
            </select>
            <button id="btn-run-compare" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors">
              Compare
            </button>
          </div>
        </div>

        <!-- Semantic Comparison Modal/Drawer Preview -->
        <div id="compare-diff-panel" class="hidden bg-slate-900 text-slate-200 rounded-2xl p-4 shadow-md flex flex-col gap-2.5 text-xs font-mono">
          <div class="flex items-center justify-between border-b border-slate-700 pb-2">
            <span class="text-emerald-400 font-bold font-sans">Semantic Production Baseline Diff: Draft 4.2 vs Draft 3.0</span>
            <button id="close-diff" class="text-slate-400 hover:text-white">
              <span class="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
          <div class="space-y-1.5 leading-relaxed">
            <div class="text-emerald-300">+ Added Scene 18: INT. PUMPING STATION CHAMBER B - NIGHT (Pages 94-96)</div>
            <div class="text-emerald-300">+ Tagged Practical FX: High-pressure brine valve spray</div>
            <div class="text-blue-300">~ Modified Call Sheet #01 call times from 07:00 AM to 06:30 AM</div>
            <div class="text-slate-400 font-sans italic pt-1">Restoration will spawn Draft 4.3 as a new version, preserving all historical records.</div>
          </div>
        </div>

        <!-- Audit Trail Timeline Stream -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col gap-3">
          <div class="border-b border-slate-100 pb-2.5 flex items-center justify-between">
            <h3 class="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-blue-600">history</span>
              <span>Unified Production Event Stream</span>
            </h3>
            <span class="text-[11px] text-slate-400 font-mono">Real Audit Trail</span>
          </div>

          <div id="history-events-list" class="flex flex-col gap-3 pt-2">
            <!-- Rendered via JS -->
          </div>
        </div>

      </main>

      ${renderBottomNav('production')}
    </div>
  `;
}

export async function attachHistoryEvents(navigate, fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';

  const container = document.getElementById('history-events-list');
  if (!container) return;

  const renderTimeline = async () => {
    const auditTrail = await api.getProductionAuditTrail(scriptId);

    if (auditTrail.length === 0) {
      container.innerHTML = `<div class="text-center py-6 text-slate-400 text-xs">No audit events recorded yet.</div>`;
      return;
    }

    container.innerHTML = auditTrail.map((ev, idx) => {
      const isApproval = ev.category === 'APPROVAL';
      const isVersion = ev.category === 'VERSION_INTEGRITY';
      const isProposal = ev.category === 'CHANGE_MANAGEMENT';

      const icon = isApproval
        ? 'check_circle'
        : isVersion
        ? 'lock'
        : isProposal
        ? 'rule'
        : 'dataset';

      const iconColor = isApproval
        ? 'text-emerald-600 bg-emerald-50/60'
        : isVersion
        ? 'text-blue-600 bg-blue-50/60'
        : isProposal
        ? 'text-amber-600 bg-amber-50/60'
        : 'text-slate-600 bg-slate-100';

      return `
        <div class="flex items-start gap-3 text-xs group">
          <div class="w-8 h-8 rounded-lg ${iconColor} flex items-center justify-center shrink-0 border border-slate-200/80 shadow-2xs mt-0.5">
            <span class="material-symbols-outlined text-[16px]">${icon}</span>
          </div>

          <div class="flex-1 min-w-0 pb-3 border-b border-slate-100 last:border-b-0">
            <div class="flex items-center justify-between gap-2">
              <span class="font-heading font-bold text-slate-900">${ev.action.replace(/_/g, ' ')}</span>
              <span class="text-[10px] text-slate-400 font-mono">${ev.timestamp || 'Just now'}</span>
            </div>
            <p class="text-slate-600 text-xs mt-0.5 leading-relaxed">${ev.details}</p>
            <div class="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
              <span>Actor: <strong class="text-slate-600">${ev.actor || 'Arun Kumar'}</strong></span>
              <span>•</span>
              <span class="font-mono text-emerald-700 font-semibold">${ev.sourceVersion || 'Draft 4.2'}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  };

  await renderTimeline();

  // Compare diff toggle
  const compareBtn = document.getElementById('btn-run-compare');
  const diffPanel = document.getElementById('compare-diff-panel');
  const closeDiff = document.getElementById('close-diff');

  if (compareBtn && diffPanel) {
    compareBtn.onclick = () => {
      diffPanel.classList.remove('hidden');
      showToast('Loaded version baseline comparison');
    };
  }
  if (closeDiff && diffPanel) {
    closeDiff.onclick = () => diffPanel.classList.add('hidden');
  }

  // Restore Version Action
  const restoreBtn = document.getElementById('btn-restore-version-trigger');
  if (restoreBtn) {
    restoreBtn.onclick = async () => {
      const targetVersion = prompt("Enter previous draft label to restore as new version baseline (e.g. Draft 3.0):", "Draft 3.0");
      if (!targetVersion) return;
      await api.restoreProductionSnapshot(scriptId, targetVersion);
      showToast(`Restored baseline to ${targetVersion} as new version`);
      renderTimeline();
    };
  }
}

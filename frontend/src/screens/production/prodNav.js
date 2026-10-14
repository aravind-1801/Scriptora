// Shared Pre-Production Navigation Bar for all Dedicated Tool Screens
// Preserves context: selected screenplay, pinned source version (Draft 4.2), and user role.

export function getBackLabelFromUrl(url) {
  if (!url) return 'Studio';
  const clean = url.split('?')[0].toLowerCase();
  if (clean.includes('/schedule') || clean.includes('/stripboard')) return 'Schedule';
  if (clean.includes('/scenes') || clean.includes('/scene-hub')) return 'Scenes';
  if (clean.includes('/breakdown')) return 'Breakdown';
  if (clean.includes('/call-sheets')) return 'Call Sheets';
  if (clean.includes('/dialogue-sides') || clean.includes('/sides')) return 'Sides';
  if (clean.includes('/directory') || clean.includes('/resources')) return 'Directory';
  if (clean.includes('/documents')) return 'Documents';
  if (clean.includes('/changes') || clean.includes('/proposals')) return 'Changes';
  if (clean.includes('/history') || clean.includes('/timeline')) return 'History';
  if (clean.includes('/readiness') || clean.includes('/validation')) return 'Readiness';
  if (clean.includes('/storyboard')) return 'Storyboard';
  if (clean.includes('/editor')) return 'Editor';
  if (clean.includes('/workspace')) return 'Workspace';
  if (clean.includes('/intelligence')) return 'Intelligence';
  if (clean.includes('/production')) return 'Studio';
  return 'Back';
}

export function renderProdSubNav(title, icon = 'tune', backUrl = null, extraActionsHtml = '', customBackLabel = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const fromParam = urlParams.get('from');
  const resolvedBackUrl = backUrl || fromParam || '/production';
  const resolvedBackLabel = customBackLabel || getBackLabelFromUrl(resolvedBackUrl);

  const currentRole = localStorage.getItem('scriptora_prod_role') || 'Owner';
  const currentMode = localStorage.getItem('scriptora_prod_mode') || 'simple';

  return `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 py-2 px-1 border-b border-slate-200/80 mb-3">
      <div class="flex items-center gap-2 min-w-0">
        <a href="${resolvedBackUrl}" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors text-xs font-semibold shrink-0" title="Back to ${resolvedBackLabel}">
          <span class="material-symbols-outlined text-[17px]">arrow_back</span>
          <span>${resolvedBackLabel}</span>
        </a>
        <div class="flex items-center gap-2 min-w-0">
          <div class="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80">
            <span class="material-symbols-outlined text-[17px]">${icon}</span>
          </div>
          <div class="min-w-0">
            <h1 class="font-heading font-bold text-sm text-slate-900 truncate leading-tight">${title}</h1>
            <div class="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium truncate">
              <span class="text-blue-700 font-semibold truncate">Chronicles of Dust</span>
              <span>•</span>
              <span class="flex items-center gap-0.5 text-emerald-700 font-semibold">
                <span class="material-symbols-outlined text-[11px]">lock</span>
                <span>Draft 4.2 (Pinned)</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2 shrink-0 self-end sm:self-auto">
        <div class="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-[10px] font-semibold text-slate-600">
          <span class="text-slate-400">ROLE:</span>
          <span class="text-slate-800">${currentRole}</span>
        </div>
        ${extraActionsHtml}
      </div>
    </div>
  `;
}

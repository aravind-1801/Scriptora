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
  if (clean.includes('/documents')) return 'Documents';
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
  
  // Dynamic previous label if available in router history
  let dynamicLabel = null;
  if (window.scriptoraRouter) {
    const prevRoute = window.scriptoraRouter.peekPreviousRoute?.();
    if (prevRoute) {
      dynamicLabel = window.scriptoraRouter.getRouteLabel(prevRoute);
    }
  }
  const resolvedBackLabel = customBackLabel || dynamicLabel || getBackLabelFromUrl(resolvedBackUrl);

  return `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 py-2 px-1 border-b border-slate-200/80 mb-3">
      <div class="flex items-center gap-2.5 min-w-0 flex-1">
        <button type="button" id="prod-subnav-back" data-scriptora-back="true" data-back-fallback="${resolvedBackUrl}" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors flex items-center justify-center shrink-0 cursor-pointer" aria-label="Back to ${resolvedBackLabel}" title="Back to ${resolvedBackLabel}">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
        </button>
        <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80">
          <span class="material-symbols-outlined text-[18px]">${icon}</span>
        </div>
        <div class="min-w-0 flex-1">
          <h1 class="font-heading font-semibold text-sm sm:text-base text-slate-900 truncate leading-tight">${title}</h1>
          <div class="text-[11px] text-blue-700 font-medium truncate leading-normal">
            Chronicles of Dust
          </div>
        </div>
      </div>

      ${extraActionsHtml ? `
        <div class="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          ${extraActionsHtml}
        </div>
      ` : ''}
    </div>
  `;
}

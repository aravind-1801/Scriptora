import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';

// Shared Pre-Production Navigation Bar for all Dedicated Tool Screens
// Preserves context: selected screenplay, pinned source version, and user role.

export function cleanScriptParam(val) {
  if (!val || val === 'null' || val === 'undefined') return null;
  return val;
}

export function renderRequiresScriptScreen(sectionSubtitle, toolName, iconName = 'movie_creation', backUrl = '/production') {
  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('Pre-Production', sectionSubtitle)}

      <main class="flex-1 w-full max-w-2xl mx-auto px-4 pt-16 pb-20 flex flex-col">
        ${renderProdSubNav(toolName, iconName, backUrl, '', null, 'Screenplay required from Workspace.')}
        <div class="flex flex-col items-center justify-center flex-1 max-w-md mx-auto px-4 text-center py-12">
          <div class="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4">
            <span class="material-symbols-outlined text-3xl">${iconName}</span>
          </div>
          <h2 class="text-xl font-bold text-slate-900 mb-1">No Screenplay Selected</h2>
          <p class="text-xs text-slate-500 mb-6 leading-relaxed">
            Create or select a screenplay in your Workspace to use ${toolName}. Storyboard Studio works standalone via prompt without a script.
          </p>
          <a href="/workspace" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all no-underline">
            <span class="material-symbols-outlined text-[18px]">add</span>
            Go to Workspace
          </a>
        </div>
      </main>

      ${renderBottomNav('production')}
    </div>
  `;
}

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

export function renderProdSubNav(title, icon = 'tune', backUrl = null, extraActionsHtml = '', customBackLabel = null, subtitle = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const fromParam = urlParams.get('from');
  const resolvedBackUrl = backUrl || fromParam || '/production';
  const resolvedSubtitle = subtitle || 'Pre-Production Studio';

  return `
    <div class="flex items-center justify-between gap-3 py-1 border-b border-slate-200/70 pb-3 mb-2">
      <div class="flex items-center gap-2.5 min-w-0 flex-1">
        <button type="button" id="prod-subnav-back" data-scriptora-back="true" data-back-fallback="${resolvedBackUrl}" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors flex items-center justify-center shrink-0 cursor-pointer" aria-label="Back" title="Back">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
        </button>
        <div class="flex flex-col min-w-0">
          <h1 class="font-heading font-bold text-lg sm:text-xl text-slate-900 tracking-tight truncate">${title}</h1>
          <p class="text-xs text-slate-500 mt-0.5 truncate">${resolvedSubtitle}</p>
        </div>
      </div>

      ${extraActionsHtml ? `
        <div class="flex items-center gap-2 shrink-0">
          ${extraActionsHtml}
        </div>
      ` : ''}
    </div>
  `;
}

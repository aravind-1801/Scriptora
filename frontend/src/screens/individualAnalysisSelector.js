import { renderHeader } from '../components/header.js';
import { renderBottomNav } from '../components/bottomNav.js';
import { store } from '../state/store.js';

export function renderIndividualAnalysisSelectorScreen() {
  const scriptId = store.state.selectedScriptId || 'chronicles-of-dust';
  const script = store.state.scripts.find(s => s.id === scriptId) || store.state.activeScript || {
    id: 'chronicles-of-dust',
    title: 'Chronicles of Dust',
    draft: 'Draft 4.2',
    pages: 96
  };

  const tiles = [
    { type: 'pacing', title: 'Pacing', desc: 'See where the story moves too fast or too slowly.', icon: 'speed', score: 82, telemetry: `${script.pages || 96} Pages Telemetry` },
    { type: 'dialogue', title: 'Dialogue', desc: 'Cadence, subtext density and character voice rhythm.', icon: 'chat', score: 89, telemetry: '42 Dialogue Exchanges' },
    { type: 'emotion', title: 'Emotion', desc: 'Emotional heatmaps, catharsis curves and sentiment.', icon: 'favorite', score: 91, telemetry: 'Peak Catharsis: Act II' },
    { type: 'character-arc', title: 'Character Arc', desc: 'Want vs. need trajectories and transformation tracking.', icon: 'alt_route', score: 84, telemetry: '4 Major Protagonists' },
    { type: 'continuity', title: 'Continuity', desc: 'Props, character locations, and temporal logic rules.', icon: 'linear_scale', score: 78, telemetry: '2 Minor Prop Conflicts' },
    { type: 'story-structure', title: 'Story Structure', desc: 'Beat breakdowns, midpoint shifts and turning points.', icon: 'account_tree', score: 87, telemetry: '3-Act Paradigm Standard' },
    { type: 'theme', title: 'Theme', desc: 'Core philosophical spines, motifs and moral arguments.', icon: 'lightbulb', score: 90, telemetry: '3 Tracked Motifs' },
    { type: 'cinema', title: 'Cinema', desc: 'Visual storytelling, shot economy and set-piece power.', icon: 'videocam', score: 85, telemetry: 'Cinematic Visual Index' },
    { type: 'scene', title: 'Scene Analysis', desc: 'Deep dive breakdown of goals, conflict and polarity.', icon: 'movie', score: 86, telemetry: 'Scene 18 Active Scope' },
    { type: 'formatting', title: 'Formatting', desc: 'Standard industry margins, sluglines and font rules.', icon: 'rule', score: 94, telemetry: 'Standard Guild Rules' },
    { type: 'production', title: 'Production', desc: 'Locations, shooting cast, props and cost estimators.', icon: 'movie_creation', score: 80, telemetry: '24 Practical Locations' }
  ];

  return `
    ${renderHeader('Intelligence', 'Analyse Individually')}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-4 fade-in">
        
        <!-- Section Header with Back Navigation -->
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <button id="individual-analysis-selector-back-btn" data-scriptora-back="true" data-back-fallback="/intelligence/dashboard" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors flex items-center justify-center shrink-0 cursor-pointer" aria-label="Back" title="Back">
              <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>
            <div class="flex flex-col min-w-0">
              <h1 class="page-heading font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight truncate">Analyse Individually</h1>
              <p class="text-xs text-slate-500 mt-0.5 truncate">Choose an area to explore in your screenplay.</p>
            </div>
          </div>
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 shrink-0">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span class="text-xs font-medium truncate max-w-[140px]">${script.title}</span>
          </div>
        </div>

        <!-- Search & Filter Bar -->
        <div class="relative w-full">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-slate-400">search</span>
          <input class="w-full h-10 pl-9 pr-3 rounded-xl bg-white text-slate-900 border border-slate-200 placeholder:text-slate-400 text-xs focus:outline-none focus:border-blue-600 shadow-xs" id="analysis-filter-input" placeholder="Filter vectors (e.g. pacing, dialogue, cinema)..." type="text">
        </div>

        <!-- 11 Canonical Tiles Grid -->
        <div class="grid grid-cols-2 gap-3" id="analysis-tiles-grid">
          ${tiles.map(tile => `
            <a href="/intelligence/analysis/${tile.type}" class="analysis-tile group flex flex-col justify-between p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm hover:border-blue-300 transition-all active:scale-[0.98] min-h-[148px] no-underline text-inherit cursor-pointer" data-keyword="${tile.title.toLowerCase()} ${tile.desc.toLowerCase()}">
              <div>
                <div class="flex items-center justify-between">
                  <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[19px]">${tile.icon}</span>
                  </div>
                  <span class="material-symbols-outlined text-[18px] text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5">arrow_forward</span>
                </div>
                <h2 class="font-heading font-bold text-slate-900 mt-2.5 text-sm leading-tight">${tile.title}</h2>
                <p class="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">${tile.desc}</p>
              </div>

              <div class="pt-2 flex items-center justify-between border-t border-slate-100">
                <span class="text-[10px] text-slate-400 truncate max-w-[90px]">${tile.telemetry}</span>
                <span class="text-xs font-mono font-bold text-blue-600">${tile.score}</span>
              </div>
            </a>
          `).join('')}
        </div>

      </div>
    </main>

    ${renderBottomNav('intelligence')}
  `;
}

export function attachIndividualAnalysisSelectorEvents(navigate) {
  const filterInput = document.getElementById('analysis-filter-input');
  if (filterInput) {
    filterInput.oninput = (e) => {
      const term = e.target.value.toLowerCase().trim();
      document.querySelectorAll('#analysis-tiles-grid .analysis-tile').forEach(tile => {
        const kw = tile.getAttribute('data-keyword') || '';
        tile.style.display = kw.includes(term) ? 'flex' : 'none';
      });
    };
  }
}

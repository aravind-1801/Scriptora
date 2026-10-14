import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';
import { renderProdSubNav } from './prodNav.js';
import { store } from '../../state/store.js';
import * as api from '../../services/api.js';
import { showToast } from '../../components/toast.js';

export function renderDialogueSidesScreen(fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const initialMode = urlParams.get('mode') || 'dialogue'; // 'dialogue' or 'sides'

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('Pre-Production', 'Dialogue Sheets & Actor Sides')}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${renderProdSubNav('Dialogue Sheets & Actor Sides', 'record_voice_over', '/production', `
          <button id="btn-export-pdf" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
            <span class="material-symbols-outlined text-[16px]">print</span>
            <span>Export PDF</span>
          </button>
        `)}

        <!-- Mode Switcher Tabs (2 distinct modes) -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div class="flex items-center bg-slate-100 p-1 rounded-xl max-w-xs">
            <button id="tab-mode-dialogue" class="flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all ${initialMode === 'dialogue' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}">
              1. Dialogue Sheets
            </button>
            <button id="tab-mode-sides" class="flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all ${initialMode === 'sides' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}">
              2. Actor Sides
            </button>
          </div>

          <!-- Dynamic Selector based on active mode -->
          <div class="flex items-center gap-2" id="filter-controls">
            <!-- Rendered via JS -->
          </div>
        </div>

        <!-- Document Viewer Area -->
        <div id="dialogue-sides-content" class="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs flex flex-col gap-4 font-mono text-xs text-slate-800">
          <div class="text-center text-slate-400 py-8 font-sans">Generating extract...</div>
        </div>

      </main>

      ${renderBottomNav('production')}
    </div>
  `;
}

export async function attachDialogueSidesEvents(navigate, fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  let activeMode = urlParams.get('mode') || 'dialogue'; // 'dialogue' or 'sides'
  let selectedChar = 'KEVIN';
  let selectedScene = urlParams.get('scene') || '18';

  const tabDialogue = document.getElementById('tab-mode-dialogue');
  const tabSides = document.getElementById('tab-mode-sides');
  const filterArea = document.getElementById('filter-controls');
  const contentArea = document.getElementById('dialogue-sides-content');

  // Dialogue Repository for Chronicles of Dust (Draft 4.2)
  const scriptDialogue = [
    {
      sceneNum: 1,
      heading: "EXT. MOJAVE OUTPOST GATE 4 - DAY",
      character: "KEVIN",
      parenthetical: "(adjusting filter)",
      dialogue: "Wind gauge is spiking past forty knots, Marcus. Did you check the terminal pressure at the intake valve?",
      action: "Kevin wipes gritty red dust from the gauge glass with his thumb."
    },
    {
      sceneNum: 1,
      heading: "EXT. MOJAVE OUTPOST GATE 4 - DAY",
      character: "MARCUS",
      parenthetical: "(shrugging)",
      dialogue: "Telemetry's been on the fritz since dawn. Central syndicate says it's thermal fluctuation.",
      action: "Marcus gestures with a cigarette toward the desert horizon."
    },
    {
      sceneNum: 2,
      heading: "INT. OUTPOST CUSTOMS SHED - DAY",
      character: "MEERA",
      parenthetical: "(eyes on monitor)",
      dialogue: "That's no fluctuation. Look at line three. Someone bypassed the telemetry loop eighty miles upriver.",
      action: "Meera brings up a wireframe map showing a hidden subterranean siphon branch."
    },
    {
      sceneNum: 2,
      heading: "INT. OUTPOST CUSTOMS SHED - DAY",
      character: "KEVIN",
      parenthetical: "(tense)",
      dialogue: "They're siphoning straight out of the municipal reservoir into private holding tanks.",
      action: "Kevin taps the terminal screen, freezing the anomaly coordinates."
    },
    {
      sceneNum: 7,
      heading: "INT. SYNDICATE PUMPING CONTROL - DAY",
      character: "COMMANDER VANCE",
      parenthetical: "(smooth, unhurried)",
      dialogue: "Water belongs to those who possess the energy to lift it from the rock, Kevin. The frontier was built on that premise.",
      action: "Vance sips cold tea, watching the massive hydraulic pump pistons rise and plunge."
    },
    {
      sceneNum: 7,
      heading: "INT. SYNDICATE PUMPING CONTROL - DAY",
      character: "KEVIN",
      parenthetical: "(stepping forward)",
      dialogue: "You signed the 2041 Treaty. If the southern aquifer collapses, ten thousand families wake up to dry taps.",
      action: "Kevin places the legal registry deed onto Vance's polished mahogany desk."
    },
    {
      sceneNum: 18,
      heading: "INT. PUMPING STATION CHAMBER B - NIGHT",
      character: "KEVIN",
      parenthetical: "(shouting over the roar)",
      dialogue: "Hold the pylon, Meera! If the high-pressure valve seals now, the back-surge will fracture the entire chamber!",
      action: "Brine water sprays across Kevin's visor as he locks the hydraulic bypass manifold."
    },
    {
      sceneNum: 18,
      heading: "INT. PUMPING STATION CHAMBER B - NIGHT",
      character: "MEERA",
      parenthetical: "(straining on cable)",
      dialogue: "Then don't let them break! Reroute the secondary relay through the floodgate breaker!",
      action: "Meera kicks off the iron catwalk, swinging across the chasm to secure the emergency lock."
    },
    {
      sceneNum: 18,
      heading: "INT. PUMPING STATION CHAMBER B - NIGHT",
      character: "KEVIN",
      parenthetical: "(levering the valve bar)",
      dialogue: "Bypass locked! Bleed the line! Three... two... one!",
      action: "The pressure needles drop from red to blue as the municipal pipeline fills with fresh current."
    }
  ];

  function renderFilters() {
    if (!filterArea) return;
    if (activeMode === 'dialogue') {
      filterArea.innerHTML = `
        <span class="text-xs font-semibold text-slate-500">Character:</span>
        <select id="char-select" class="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-900 focus:outline-none cursor-pointer">
          <option value="KEVIN" ${selectedChar === 'KEVIN' ? 'selected' : ''}>KEVIN (Lead)</option>
          <option value="MEERA" ${selectedChar === 'MEERA' ? 'selected' : ''}>MEERA (Lead)</option>
          <option value="COMMANDER VANCE" ${selectedChar === 'COMMANDER VANCE' ? 'selected' : ''}>COMMANDER VANCE</option>
          <option value="MARCUS" ${selectedChar === 'MARCUS' ? 'selected' : ''}>MARCUS</option>
        </select>
      `;
      const sel = document.getElementById('char-select');
      if (sel) {
        sel.onchange = (e) => {
          selectedChar = e.target.value;
          renderContent();
        };
      }
    } else {
      filterArea.innerHTML = `
        <span class="text-xs font-semibold text-slate-500">Scene Extract:</span>
        <select id="scene-select" class="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-900 focus:outline-none cursor-pointer">
          <option value="1" ${selectedScene === '1' ? 'selected' : ''}>Scene 1 — Outpost Gate 4</option>
          <option value="2" ${selectedScene === '2' ? 'selected' : ''}>Scene 2 — Customs Shed</option>
          <option value="7" ${selectedScene === '7' ? 'selected' : ''}>Scene 7 — Syndicate Control</option>
          <option value="18" ${selectedScene === '18' ? 'selected' : ''}>Scene 18 — Chamber B Climax</option>
        </select>
      `;
      const sel = document.getElementById('scene-select');
      if (sel) {
        sel.onchange = (e) => {
          selectedScene = e.target.value;
          renderContent();
        };
      }
    }
  }

  function renderContent() {
    if (!contentArea) return;

    if (activeMode === 'dialogue') {
      // -----------------------------------------------------------------------
      // MODE 1: CHARACTER DIALOGUE SHEET (Screenplay Order)
      // -----------------------------------------------------------------------
      const charLines = scriptDialogue.filter(d => d.character === selectedChar);

      contentArea.innerHTML = `
        <!-- Watermark Header -->
        <div class="border-b-2 border-slate-900 pb-3 font-sans flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div class="text-[10px] font-bold text-slate-400 tracking-widest uppercase">SCRIPTORA · PRODUCTION EXTRACT</div>
            <h2 class="font-heading font-extrabold text-lg text-slate-900">CHARACTER DIALOGUE SHEET — ${selectedChar}</h2>
            <div class="text-[11px] text-slate-600 font-medium">Screenplay: Chronicles of Dust · Pinned Version: Draft 4.2</div>
          </div>
          <div class="text-left sm:text-right text-[11px] text-slate-500">
            <div>Lines: ${charLines.length} Cues</div>
            <div>Date: ${new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <!-- Dialogue Elements -->
        <div class="space-y-6 pt-2 max-w-2xl mx-auto">
          ${charLines.map((line, idx) => `
            <div class="space-y-1">
              <div class="font-sans font-bold text-[11px] text-blue-700 uppercase tracking-wider">
                SCENE ${line.sceneNum} — ${line.heading}
              </div>
              <div class="text-center font-bold text-[13px] text-slate-900 uppercase tracking-widest pt-2">
                ${line.character}
              </div>
              ${line.parenthetical ? `
                <div class="text-center italic text-slate-600 text-[12px]">
                  ${line.parenthetical}
                </div>
              ` : ''}
              <div class="text-slate-900 text-[13px] leading-relaxed max-w-lg mx-auto text-left">
                ${line.dialogue}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="border-t border-slate-200 pt-3 mt-6 text-center font-sans text-[10px] text-slate-400">
          Generated from Draft 4.2 pinned baseline. Exact dialogue punctuation and wording preserved.
        </div>
      `;
    } else {
      // -----------------------------------------------------------------------
      // MODE 2: ACTOR SIDES (Scene-wise with surrounding action cues)
      // -----------------------------------------------------------------------
      const sceneLines = scriptDialogue.filter(d => String(d.sceneNum) === String(selectedScene));
      const firstLine = sceneLines[0] || { heading: `SCENE ${selectedScene}` };

      contentArea.innerHTML = `
        <!-- Sides Masthead -->
        <div class="border-b-2 border-slate-900 pb-3 font-sans flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div class="text-[10px] font-bold text-slate-400 tracking-widest uppercase">SCRIPTORA · PRODUCTION SIDES</div>
            <h2 class="font-heading font-extrabold text-lg text-slate-900">ACTOR SIDES — SCENE ${selectedScene}</h2>
            <div class="text-[11px] text-slate-600 font-medium">${firstLine.heading} · Draft 4.2</div>
          </div>
          <div class="text-left sm:text-right text-[11px] text-slate-500">
            <div>Rehearsal & On-Set Copy</div>
            <div>Generated: Today</div>
          </div>
        </div>

        <!-- Formatted Script Scene Beat -->
        <div class="space-y-4 pt-2 max-w-2xl mx-auto leading-relaxed">
          <div class="font-bold text-[13px] text-slate-900 uppercase">
            ${firstLine.heading}
          </div>

          ${sceneLines.map(line => `
            <div class="space-y-1 my-3">
              ${line.action ? `
                <div class="text-slate-700 text-[12px] leading-relaxed italic mb-2">
                  ${line.action}
                </div>
              ` : ''}
              <div class="text-center font-bold text-[13px] text-slate-900 uppercase tracking-widest">
                ${line.character}
              </div>
              ${line.parenthetical ? `
                <div class="text-center italic text-slate-600 text-[12px]">
                  ${line.parenthetical}
                </div>
              ` : ''}
              <div class="text-slate-900 text-[13px] leading-relaxed max-w-lg mx-auto">
                ${line.dialogue}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="border-t border-slate-200 pt-3 mt-6 text-center font-sans text-[10px] text-slate-400">
          END OF SCENE ${selectedScene} SIDES · STAMPED APPROVED DRAFT 4.2
        </div>
      `;
    }
  }

  // Switch modes
  if (tabDialogue && tabSides) {
    tabDialogue.onclick = () => {
      activeMode = 'dialogue';
      tabDialogue.classList.add('bg-white', 'text-blue-700', 'shadow-2xs');
      tabSides.classList.remove('bg-white', 'text-blue-700', 'shadow-2xs');
      renderFilters();
      renderContent();
    };

    tabSides.onclick = () => {
      activeMode = 'sides';
      tabSides.classList.add('bg-white', 'text-blue-700', 'shadow-2xs');
      tabDialogue.classList.remove('bg-white', 'text-blue-700', 'shadow-2xs');
      renderFilters();
      renderContent();
    };
  }

  // Export PDF button
  const exportBtn = document.getElementById('btn-export-pdf');
  if (exportBtn) {
    exportBtn.onclick = () => {
      window.print();
      showToast(`Exported ${activeMode === 'dialogue' ? `${selectedChar} Dialogue Sheet` : `Scene ${selectedScene} Actor Sides`} PDF`);
    };
  }

  renderFilters();
  renderContent();
}

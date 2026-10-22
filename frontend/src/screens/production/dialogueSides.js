import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';
import { renderProdSubNav } from './prodNav.js';
import { store } from '../../state/store.js';
import * as api from '../../services/api.js';
import { showToast } from '../../components/toast.js';
import { exportDialogueSheetPdf, exportActorSidesPdf } from '../../services/pdfExport.js';

export function renderDialogueSidesScreen(fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const initialMode = urlParams.get('mode') || 'dialogue'; // 'dialogue' or 'sides'
  const from = fromParam || urlParams.get('from');
  const mainProductionUrl = from || `/production?scriptId=${scriptId}`;

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('Pre-Production', 'Dialogue Sheets & Actor Sides')}

      <main class="flex-1 w-full max-w-2xl mx-auto px-4 pt-16 pb-28 flex flex-col gap-3.5 fade-in">
        ${renderProdSubNav(
          'Dialogue & Actor Sides',
          'theater_comedy',
          mainProductionUrl,
          '',
          null,
          'Dialogue sheets and actor scene sides.'
        )}
        
        <!-- Mode Switcher Tabs Card (Segmented Control & Selector beneath it) -->
        <div class="bg-white rounded-3xl border border-slate-200/80 p-3.5 shadow-2xs flex flex-col gap-3">
          <!-- Segmented Control -->
          <div class="flex items-center bg-slate-100/90 p-1 rounded-2xl w-full">
            <button id="tab-mode-dialogue" class="flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all ${initialMode === 'dialogue' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'} cursor-pointer text-center">
              Dialogue Sheets
            </button>
            <button id="tab-mode-sides" class="flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all ${initialMode === 'sides' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'} cursor-pointer text-center">
              Actor Sides
            </button>
          </div>

          <!-- Dynamic Selector based on active mode -->
          <div class="flex items-center gap-2" id="filter-controls">
            <!-- Rendered via JS -->
          </div>
        </div>

        <!-- Document Viewer Area (Screenplay Document Typesetting) -->
        <div id="dialogue-sides-content" class="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-2xs flex flex-col gap-3 font-mono text-xs text-slate-800">
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
  let selectedScene = urlParams.get('scene') || '1';

  const tabDialogue = document.getElementById('tab-mode-dialogue');
  const tabSides = document.getElementById('tab-mode-sides');
  const filterArea = document.getElementById('filter-controls');
  const contentArea = document.getElementById('dialogue-sides-content');

  // Wire back button in subnav to return directly to main production screen
  const subnavBackBtn = document.getElementById('prod-subnav-back');
  if (subnavBackBtn) {
    subnavBackBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const targetUrl = fromParam || `/production?scriptId=${scriptId}`;
      if (typeof navigate === 'function') {
        navigate(targetUrl);
      } else if (window.scriptoraRouter) {
        window.scriptoraRouter.navigate(targetUrl);
      } else {
        window.location.href = targetUrl;
      }
    };
  }

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

  function getFormattedDate() {
    const today = new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${pad(today.getDate())}/${pad(today.getMonth() + 1)}/${today.getFullYear()}`;
  }

  function renderFilters() {
    if (!filterArea) return;
    if (activeMode === 'dialogue') {
      filterArea.innerHTML = `
        <span class="text-xs font-semibold text-slate-500 shrink-0">Character:</span>
        <div class="relative inline-flex items-center flex-1 max-w-xs">
          <select id="char-select" class="w-full text-xs font-semibold bg-white border border-slate-200/90 rounded-2xl pl-3 pr-8 py-2 text-slate-900 appearance-none focus:outline-none focus:border-blue-500 shadow-2xs cursor-pointer">
            <option value="KEVIN" ${selectedChar === 'KEVIN' ? 'selected' : ''}>KEVIN (Lead)</option>
            <option value="MEERA" ${selectedChar === 'MEERA' ? 'selected' : ''}>MEERA (Lead)</option>
            <option value="COMMANDER VANCE" ${selectedChar === 'COMMANDER VANCE' ? 'selected' : ''}>COMMANDER VANCE</option>
            <option value="MARCUS" ${selectedChar === 'MARCUS' ? 'selected' : ''}>MARCUS</option>
          </select>
          <span class="material-symbols-outlined text-[18px] text-slate-400 absolute right-2.5 pointer-events-none">expand_more</span>
        </div>
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
        <span class="text-xs font-semibold text-slate-500 shrink-0">Scene Extract:</span>
        <div class="relative inline-flex items-center flex-1 max-w-xs">
          <select id="scene-select" class="w-full text-xs font-semibold bg-white border border-slate-200/90 rounded-2xl pl-3 pr-8 py-2 text-slate-900 appearance-none focus:outline-none focus:border-blue-500 shadow-2xs cursor-pointer">
            <option value="1" ${selectedScene === '1' ? 'selected' : ''}>Scene 1 — Outpost Gate 4</option>
            <option value="2" ${selectedScene === '2' ? 'selected' : ''}>Scene 2 — Customs Shed</option>
            <option value="7" ${selectedScene === '7' ? 'selected' : ''}>Scene 7 — Syndicate Control</option>
            <option value="18" ${selectedScene === '18' ? 'selected' : ''}>Scene 18 — Chamber B Climax</option>
          </select>
          <span class="material-symbols-outlined text-[18px] text-slate-400 absolute right-2.5 pointer-events-none">expand_more</span>
        </div>
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
    const formattedDate = getFormattedDate();

    if (activeMode === 'dialogue') {
      // -----------------------------------------------------------------------
      // MODE 1: CHARACTER DIALOGUE SHEET (Screenplay Order)
      // -----------------------------------------------------------------------
      const charLines = scriptDialogue.filter(d => d.character === selectedChar);

      contentArea.innerHTML = `
        <!-- Watermark Header -->
        <div class="font-sans flex flex-col gap-1">
          <div class="text-[11px] font-bold text-slate-400 tracking-wider uppercase">SCRIPTORA · PRODUCTION EXTRACT</div>
          <h2 class="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-snug">
            CHARACTER DIALOGUE SHEET<br />— ${selectedChar}
          </h2>
          <div class="text-[12px] text-slate-600 font-medium mt-0.5">Screenplay: Chronicles of Dust · Pinned Version: Draft 4.2</div>
          <div class="text-[12px] text-slate-500">Lines: ${charLines.length} Cues</div>
          <div class="text-[12px] text-slate-500">Date: ${formattedDate}</div>
          <div class="w-full h-0.5 bg-slate-900 mt-2 mb-4"></div>
        </div>

        <!-- Dialogue Elements -->
        <div class="space-y-6 pt-1 max-w-2xl mx-auto font-mono w-full">
          ${charLines.map((line) => `
            <div class="space-y-1.5">
              <div class="font-sans font-bold text-[12px] text-blue-700 uppercase tracking-wide">
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

        <div class="border-t border-slate-200 pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 font-sans text-[11px] text-slate-400">
          <span>Generated from Draft 4.2 pinned baseline.</span>
          <button id="btn-export-pdf" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-2xs">
            <span class="material-symbols-outlined text-[15px]">print</span>
            <span>Export Genuine PDF</span>
          </button>
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
        <div class="font-sans flex flex-col gap-1">
          <div class="text-[11px] font-bold text-slate-400 tracking-wider uppercase">SCRIPTORA · PRODUCTION SIDES</div>
          <h2 class="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-snug">
            ACTOR SIDES<br />— SCENE ${selectedScene}
          </h2>
          <div class="text-[12px] text-slate-600 font-medium mt-0.5">${firstLine.heading} · Draft 4.2</div>
          <div class="text-[12px] text-slate-500">Rehearsal & On-Set Copy</div>
          <div class="text-[12px] text-slate-500">Date: ${formattedDate}</div>
          <div class="w-full h-0.5 bg-slate-900 mt-2 mb-4"></div>
        </div>

        <!-- Formatted Script Scene Beat -->
        <div class="space-y-4 pt-1 max-w-2xl mx-auto leading-relaxed font-mono w-full">
          <div class="font-bold text-[13px] text-slate-900 uppercase">
            ${firstLine.heading}
          </div>

          ${sceneLines.map(line => `
            <div class="space-y-1.5 my-3">
              ${line.action ? `
                <div class="text-slate-700 text-[12px] leading-relaxed italic mb-2 font-sans">
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

        <div class="border-t border-slate-200 pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 font-sans text-[11px] text-slate-400">
          <span>END OF SCENE ${selectedScene} SIDES · STAMPED APPROVED DRAFT 4.2</span>
          <button id="btn-export-pdf" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-2xs">
            <span class="material-symbols-outlined text-[15px]">print</span>
            <span>Export Genuine PDF</span>
          </button>
        </div>
      `;
    }

    bindExportBtn();
  }

  function bindExportBtn() {
    const exportBtn = document.getElementById('btn-export-pdf');
    if (exportBtn) {
      exportBtn.onclick = () => {
        try {
          if (activeMode === 'dialogue') {
            const charLines = scriptDialogue.filter(d => d.character === selectedChar);
            exportDialogueSheetPdf(selectedChar, charLines, {
              title: 'Chronicles of Dust',
              draft: 'Draft 4.2'
            });
            showToast(`Exported ${selectedChar} Dialogue Sheet PDF`);
          } else {
            const scNum = Number(selectedScene);
            const sceneLines = scriptDialogue.filter(d => d.sceneNum === scNum);
            const firstLine = sceneLines[0] || { heading: `SCENE ${scNum}` };
            exportActorSidesPdf(selectedScene, sceneLines, {
              heading: firstLine.heading,
              pages: '2 1/8'
            }, {
              title: 'Chronicles of Dust',
              draft: 'Draft 4.2'
            });
            showToast(`Exported Scene ${selectedScene} Actor Sides PDF`);
          }
        } catch (err) {
          console.error(err);
          showToast('Failed to generate PDF document');
        }
      };
    }
  }

  // Switch modes
  if (tabDialogue && tabSides) {
    tabDialogue.onclick = () => {
      activeMode = 'dialogue';
      tabDialogue.className = 'flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all bg-white text-blue-600 shadow-2xs cursor-pointer text-center';
      tabSides.className = 'flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all text-slate-600 hover:text-slate-900 cursor-pointer text-center';
      renderFilters();
      renderContent();
    };

    tabSides.onclick = () => {
      activeMode = 'sides';
      tabSides.className = 'flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all bg-white text-blue-600 shadow-2xs cursor-pointer text-center';
      tabDialogue.className = 'flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all text-slate-600 hover:text-slate-900 cursor-pointer text-center';
      renderFilters();
      renderContent();
    };
  }

  renderFilters();
  renderContent();
}

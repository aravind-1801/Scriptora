import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';
import { renderProdSubNav, cleanScriptParam, renderRequiresScriptScreen } from './prodNav.js';
import { store } from '../../state/store.js';
import * as api from '../../services/api.js';
import { showToast } from '../../components/toast.js';
import { exportDialogueSheetPdf, exportActorSidesPdf } from '../../services/pdfExport.js';

export function renderDialogueSidesScreen(fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scripts = store.state.scripts || [];
  const requestedId = cleanScriptParam(scriptParam) || cleanScriptParam(urlParams.get('scriptId')) || cleanScriptParam(store.state.selectedScriptId);
  const activeScript = scripts.find(s => s.id === requestedId) || scripts[0] || null;
  const scriptId = activeScript?.id || null;
  const from = fromParam || urlParams.get('from');

  if (!scriptId) {
    return renderRequiresScriptScreen('Dialogue Sheets & Actor Sides', 'Dialogue Sheets & Sides', 'theater_comedy', from || '/production');
  }
  const initialMode = urlParams.get('mode') || 'dialogue'; // 'dialogue' or 'sides'
  const mainProductionUrl = from || (scriptId ? `/production?scriptId=${scriptId}` : '/production');

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
  const scripts = store.state.scripts || [];
  const requestedId = cleanScriptParam(scriptParam) || cleanScriptParam(urlParams.get('scriptId')) || cleanScriptParam(store.state.selectedScriptId);
  const activeScript = scripts.find(s => s.id === requestedId) || scripts[0] || null;
  const scriptId = activeScript?.id || null;
  if (!scriptId) return;
  let activeMode = urlParams.get('mode') || 'dialogue'; // 'dialogue' or 'sides'
  let selectedChar = '';
  let selectedScene = urlParams.get('scene') || '1';

  const tabDialogue = document.getElementById('tab-mode-dialogue');
  const tabSides = document.getElementById('tab-mode-sides');
  const filterArea = document.getElementById('filter-controls');
  const contentArea = document.getElementById('dialogue-sides-content');

  // Dialogue Repository (extracted dynamically from the user's screenplay)
  const scriptDialogue = [];

  async function loadScriptDialogue() {
    if (!scriptId) return;
    try {
      let sp = store.state.screenplay && store.state.screenplay.id === scriptId ? store.state.screenplay : null;
      if (!sp) {
        sp = await api.getScreenplay(scriptId);
      }
      const scenes = Array.isArray(sp?.scenes) ? sp.scenes : [];
      scenes.forEach((sc, idx) => {
        const sceneNum = sc.number || (idx + 1);
        const heading = sc.slugline || sc.heading || `SCENE ${sceneNum}`;
        const blocks = Array.isArray(sc.blocks) ? sc.blocks : [];
        let lastAction = '';
        let activeChar = '';
        let activeParen = '';
        blocks.forEach((b) => {
          const text = (b.content || '').trim();
          if (!text) return;
          if (b.type === 'action') {
            lastAction = text;
          } else if (b.type === 'character') {
            activeChar = text.replace(/\s*\(.*?\)\s*$/, '').trim().toUpperCase();
            activeParen = '';
          } else if (b.type === 'parenthetical') {
            activeParen = text;
          } else if (b.type === 'dialogue' && activeChar) {
            scriptDialogue.push({
              sceneNum,
              heading,
              character: activeChar,
              parenthetical: activeParen,
              dialogue: text,
              action: lastAction
            });
            lastAction = '';
            activeParen = '';
          }
        });
      });
    } catch (_) {}
  }

  function getFormattedDate() {
    const today = new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${pad(today.getDate())}/${pad(today.getMonth() + 1)}/${today.getFullYear()}`;
  }

  function renderFilters() {
    if (!filterArea) return;
    if (activeMode === 'dialogue') {
      const chars = Array.from(new Set(scriptDialogue.map(d => d.character).filter(Boolean)));
      if (chars.length === 0) {
        filterArea.innerHTML = `<span class="text-xs text-slate-400">No character dialogue extracted for this screenplay yet.</span>`;
        return;
      }
      if (!chars.includes(selectedChar)) selectedChar = chars[0];
      filterArea.innerHTML = `
        <span class="text-xs font-semibold text-slate-500 shrink-0">Character:</span>
        <div class="relative inline-flex items-center flex-1 max-w-xs">
          <select id="char-select" class="w-full text-xs font-semibold bg-white border border-slate-200/90 rounded-2xl pl-3 pr-8 py-2 text-slate-900 appearance-none focus:outline-none focus:border-blue-500 shadow-2xs cursor-pointer">
            ${chars.map(c => `<option value="${c}" ${selectedChar === c ? 'selected' : ''}>${c}</option>`).join('')}
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
      const sceneNums = Array.from(new Set(scriptDialogue.map(d => String(d.sceneNum)).filter(Boolean)));
      if (sceneNums.length === 0) {
        filterArea.innerHTML = `<span class="text-xs text-slate-400">No scene sides extracted for this screenplay yet.</span>`;
        return;
      }
      if (!sceneNums.includes(String(selectedScene))) selectedScene = sceneNums[0];
      filterArea.innerHTML = `
        <span class="text-xs font-semibold text-slate-500 shrink-0">Scene Extract:</span>
        <div class="relative inline-flex items-center flex-1 max-w-xs">
          <select id="scene-select" class="w-full text-xs font-semibold bg-white border border-slate-200/90 rounded-2xl pl-3 pr-8 py-2 text-slate-900 appearance-none focus:outline-none focus:border-blue-500 shadow-2xs cursor-pointer">
            ${sceneNums.map(n => `<option value="${n}" ${String(selectedScene) === n ? 'selected' : ''}>Scene ${n}</option>`).join('')}
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

      if (!scriptId || scriptDialogue.length === 0 || charLines.length === 0) {
        contentArea.innerHTML = `
          <div class="font-sans py-10 px-4 text-center flex flex-col items-center justify-center gap-2.5">
            <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <span class="material-symbols-outlined text-2xl">theater_comedy</span>
            </div>
            <h3 class="font-heading font-bold text-sm text-slate-900">No Dialogue Sheets Yet</h3>
            <p class="text-xs text-slate-500 max-w-sm leading-relaxed">
              ${scriptId
                ? 'Write character dialogue scenes in the Screenplay Editor to generate printable character dialogue sheets.'
                : 'Create or select a screenplay in your Workspace to view character dialogue sheets.'}
            </p>
            <a href="${scriptId ? `/editor/${scriptId}` : '/workspace'}" class="mt-1 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors no-underline">
              <span class="material-symbols-outlined text-[16px]">edit_document</span>
              <span>${scriptId ? 'Open Screenplay Editor' : 'Go to Workspace'}</span>
            </a>
          </div>
        `;
        return;
      }

      contentArea.innerHTML = `
        <!-- Watermark Header -->
        <div class="font-sans flex flex-col gap-1">
          <div class="text-[11px] font-bold text-slate-400 tracking-wider uppercase">SCRIPTORA · PRODUCTION EXTRACT</div>
          <h2 class="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-snug">
            CHARACTER DIALOGUE SHEET<br />— ${selectedChar}
          </h2>
          <div class="text-[12px] text-slate-600 font-medium mt-0.5">Screenplay: ${store.state.activeScript?.title || 'Screenplay'}</div>
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
          <span>Generated from active script baseline.</span>
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
      if (!scriptId || scriptDialogue.length === 0 || sceneLines.length === 0) {
        contentArea.innerHTML = `
          <div class="font-sans py-10 px-4 text-center flex flex-col items-center justify-center gap-2.5">
            <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <span class="material-symbols-outlined text-2xl">description</span>
            </div>
            <h3 class="font-heading font-bold text-sm text-slate-900">No Actor Sides Available</h3>
            <p class="text-xs text-slate-500 max-w-sm leading-relaxed">
              ${scriptId
                ? 'Add scenes with dialogue in the Screenplay Editor to extract rehearsal and on-set actor sides.'
                : 'Create or select a screenplay in your Workspace to generate actor sides.'}
            </p>
            <a href="${scriptId ? `/editor/${scriptId}` : '/workspace'}" class="mt-1 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors no-underline">
              <span class="material-symbols-outlined text-[16px]">edit_document</span>
              <span>${scriptId ? 'Open Screenplay Editor' : 'Go to Workspace'}</span>
            </a>
          </div>
        `;
        return;
      }
      const firstLine = sceneLines[0] || { heading: `SCENE ${selectedScene}` };

      contentArea.innerHTML = `
        <!-- Sides Masthead -->
        <div class="font-sans flex flex-col gap-1">
          <div class="text-[11px] font-bold text-slate-400 tracking-wider uppercase">SCRIPTORA · PRODUCTION SIDES</div>
          <h2 class="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-snug">
            ACTOR SIDES<br />— SCENE ${selectedScene}
          </h2>
          <div class="text-[12px] text-slate-600 font-medium mt-0.5">${firstLine.heading}</div>
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
          <span>END OF SCENE ${selectedScene} SIDES</span>
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
              title: store.state.activeScript?.title || 'Screenplay',
              draft: store.state.activeScript?.draft || 'Draft 1.0'
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
              title: store.state.activeScript?.title || 'Screenplay',
              draft: store.state.activeScript?.draft || 'Draft 1.0'
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

  await loadScriptDialogue();
  renderFilters();
  renderContent();
}

import { renderHeader } from '../components/header.js';
import { renderBottomNav } from '../components/bottomNav.js';
import { store } from '../state/store.js';
import * as api from '../services/api.js';
import { showToast } from '../components/toast.js';

function parseImportedScreenplayText(rawText, fallbackTitle = 'Imported Screenplay') {
  const cleanText = String(rawText || '').replace(/\r\n/g, '\n');
  const lines = cleanText.split('\n');
  const scenes = [];
  let currentScene = null;
  let blockCounter = 1;

  const ensureScene = (slug = 'INT. IMPORTED SCENE - DAY') => {
    const num = scenes.length + 1;
    currentScene = {
      id: `scene-${num}`,
      number: num,
      slugline: slug,
      blocks: [{ id: `b-${Date.now()}-${blockCounter++}`, type: 'scene', content: slug }]
    };
    scenes.push(currentScene);
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    if (/^(INT\.|EXT\.|INT\.\/EXT\.|INT\/EXT\.|I\/E\.)/i.test(line)) {
      ensureScene(line.toUpperCase());
      continue;
    }
    if (!currentScene) ensureScene();
    const isParenthetical = line.startsWith('(') && line.endsWith(')');
    const isTransition = /(?:TO:|FADE OUT\.|CUT TO:)$/i.test(line) && line === line.toUpperCase();
    const isCharacter = !isTransition && line.length <= 36 && line === line.toUpperCase() && /[A-Z]/.test(line);
    const prevBlock = currentScene.blocks[currentScene.blocks.length - 1];
    const type = isTransition
      ? 'transition'
      : isParenthetical
        ? 'parenthetical'
        : isCharacter
          ? 'character'
          : (prevBlock && (prevBlock.type === 'character' || prevBlock.type === 'parenthetical') ? 'dialogue' : 'action');

    currentScene.blocks.push({
      id: `b-${Date.now()}-${blockCounter++}`,
      type,
      content: line
    });
  }

  if (scenes.length === 0) {
    ensureScene('INT. IMPORTED SCENE - DAY');
  }

  const wordCount = cleanText.trim() ? cleanText.trim().split(/\s+/).length : 0;
  return {
    title: fallbackTitle,
    draft: 'Imported 1.0',
    pageCount: Math.max(1, Math.ceil(lines.length / 45)),
    wordCount,
    scenes
  };
}
export function renderIntelligenceSelectorScreen() {
  const scripts = store.state.scripts || [];
  const selectedId = store.state.selectedScriptId || scripts[0]?.id || null;
  const active = scripts.find(s => s.id === selectedId) || scripts[0] || null;

  return `
    ${renderHeader('Intelligence', 'Script Selector')}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-44 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-3 pb-8 space-y-4 fade-in">
        
        <!-- Section Header -->
        <div class="flex items-center justify-between gap-3 py-1">
          <div class="flex flex-col min-w-0">
            <h1 class="page-heading font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight truncate">Select Screenplay</h1>
            <p class="text-xs text-slate-500 mt-0.5 truncate">Choose a script to understand its story, characters and structure.</p>
          </div>
          <div class="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full font-medium shrink-0">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span class="text-[10px] font-semibold uppercase tracking-wider">Intelligence</span>
          </div>
        </div>

        <!-- Script List Container -->
        <div class="flex flex-col gap-2.5">
          <!-- Import Screenplay Option -->
          <button class="w-full p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-300 transition-colors flex items-center justify-between text-left group" id="btn-import-script-modal" type="button">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 group-hover:text-blue-600 group-hover:border-blue-300 transition-colors">
                <span class="material-symbols-outlined text-[20px]">upload_file</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-xs font-semibold text-slate-900 truncate">Import Other Screenplay</span>
                <span class="text-[11px] text-slate-500 truncate mt-0.5">Supports .fdx, .fountain, .docx, .txt, .pdf</span>
              </div>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
              <span class="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">Parse & Review</span>
              <span class="material-symbols-outlined text-slate-400 group-hover:text-blue-600 text-[18px]">add</span>
            </div>
          </button>

          <!-- Screenplays Selection Radio Cards -->
          <div class="flex flex-col gap-2" role="radiogroup" id="selector-script-cards">
            ${scripts.length === 0 ? `
              <div class="p-8 text-center bg-white rounded-xl border border-slate-200">
                <p class="text-xs text-slate-500 mb-3">No screenplays available yet.</p>
                <a href="/workspace" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium no-underline">
                  <span class="material-symbols-outlined text-[16px]">add</span> Create Screenplay
                </a>
              </div>
            ` : scripts.map(s => {
              const isSelected = s.id === selectedId;
              return `
                <div data-script-id="${s.id}" data-script-title="${s.title}" class="script-select-card relative p-3.5 rounded-xl border ${isSelected ? 'border-blue-600 bg-blue-50/70' : 'border-slate-200/80 bg-white hover:bg-slate-50'} transition-all cursor-pointer flex items-center justify-between group shadow-xs">
                  <div class="flex items-center gap-3 min-w-0 relative z-10">
                    <div class="shrink-0 w-9 h-9 rounded-lg ${isSelected ? 'bg-white border-blue-200 text-blue-600' : 'bg-slate-50 border-slate-200 text-slate-600'} border flex items-center justify-center shadow-xs">
                      <span class="material-symbols-outlined text-[20px]">movie</span>
                    </div>
                    <div class="flex flex-col min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-semibold text-slate-900 truncate uppercase">${s.title}</span>
                        <span class="text-[10px] font-medium px-1.5 py-0.5 rounded ${isSelected ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'} shrink-0">${s.draft || 'Draft 1.0'}</span>
                      </div>
                      <span class="text-[11px] text-slate-500 truncate mt-0.5">${s.format || 'Screenplay'} · ${s.pages || 1} pages · Updated ${s.updated || 'recently'}</span>
                    </div>
                  </div>
                  <div class="script-select-indicator w-6 h-6 rounded-full ${isSelected ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-400'} flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-[16px] font-bold">${isSelected ? 'check' : 'arrow_forward'}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="px-2 py-1 flex items-center gap-2">
            <span class="material-symbols-outlined text-[15px] text-slate-400">verified</span>
            <span class="text-[11px] text-slate-500">Scripts are tokenized locally prior to narrative synthesis</span>
          </div>
        </div>

      </div>

      <!-- Hidden File Input for Direct Local Screenplay Import -->
      <input type="file" id="intel-import-file-input" accept=".txt,.fountain,.fdx,.md,.screenplay" class="hidden" />

      <!-- Sticky Bottom Action Tray -->
      <div class="fixed left-0 right-0 z-30 bg-surface/90 backdrop-blur-md px-4 pt-2.5 pb-2 border-t border-slate-100 flex flex-col items-center gap-1 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] max-w-2xl mx-auto" style="bottom: calc(3.5rem + 16px + env(safe-area-inset-bottom, 0px));">
        <button type="button" id="submit-continue-analysis-btn" class="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all text-white font-medium text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer">
          <span class="truncate font-semibold" id="selector-btn-label">${active ? `Continue to Context (${active.title})` : 'Import Screenplay to Analyze'}</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
        <span class="text-[10px] text-slate-400 tracking-tight">${active ? 'Establishes selectedScriptId for Script Analysis' : 'Import a local script file or create one in Workspace'}</span>
        <!-- One empty line below for visual spacing and professional breathing room -->
        <div class="h-4 w-full select-none pointer-events-none" aria-hidden="true"></div>
      </div>

    </main>

    ${renderBottomNav('intelligence')}
  `;
}

export function attachIntelligenceSelectorEvents(navigate) {
  let selectedId = store.state.selectedScriptId || (store.state.scripts && store.state.scripts[0]?.id) || null;
  const importInput = document.getElementById('intel-import-file-input');

  document.querySelectorAll('.script-select-card').forEach(card => {
    card.onclick = () => {
      const id = card.getAttribute('data-script-id');
      const title = card.getAttribute('data-script-title');
      selectedId = id;
      store.selectScript(id);

      // Update UI classes
      document.querySelectorAll('.script-select-card').forEach(c => {
        c.className = "script-select-card relative p-3.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between group shadow-xs";
        const ind = c.querySelector('.script-select-indicator');
        if (ind) {
          ind.className = "script-select-indicator w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0";
          ind.innerHTML = '<span class="material-symbols-outlined text-[16px]">arrow_forward</span>';
        }
      });

      card.className = "script-select-card relative p-3.5 rounded-xl border border-blue-600 bg-blue-50/70 transition-all cursor-pointer flex items-center justify-between group shadow-xs";
      const ind = card.querySelector('.script-select-indicator');
      if (ind) {
        ind.className = "script-select-indicator w-6 h-6 rounded-full bg-blue-600 text-white shadow-xs flex items-center justify-center shrink-0";
        ind.innerHTML = '<span class="material-symbols-outlined text-[16px] font-bold">check</span>';
      }

      const label = document.getElementById('selector-btn-label');
      if (label) label.textContent = `Continue to Context (${title})`;
    };
  });

  const continueBtn = document.getElementById('submit-continue-analysis-btn');
  if (continueBtn) {
    continueBtn.onclick = () => {
      if (selectedId) {
        store.selectScript(selectedId);
        navigate('/intelligence/context');
        return;
      }
      if (importInput) {
        importInput.click();
      } else {
        showToast('Import a screenplay file or create one in Workspace first', 'info');
      }
    };
  }

  const importBtn = document.getElementById('btn-import-script-modal');
  if (importBtn) {
    importBtn.onclick = () => {
      if (importInput) {
        importInput.value = '';
        importInput.click();
      } else {
        showToast('Select screenplay file (.fountain, .fdx, .txt) to parse', 'info');
      }
    };
  }

  if (importInput) {
    importInput.onchange = async (e) => {
      const file = e.target?.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const title = file.name.replace(/\.[^.]+$/, '') || 'Imported Screenplay';
        const parsed = parseImportedScreenplayText(text, title);
        const created = await api.createScript({
          title,
          format: 'Feature Film',
          draft: 'Imported 1.0',
          logline: `Imported from ${file.name}`
        });
        await api.saveScreenplay(created.id, {
          ...parsed,
          id: created.id,
          title: created.title || title
        });
        await store.refreshScripts();
        store.selectScript(created.id);
        showToast(`Imported "${title}" for Intelligence analysis`);
        navigate('/intelligence/context');
      } catch (err) {
        console.error('Intelligence import failed:', err);
        showToast(err?.message || 'Failed to import screenplay file', 'error');
      }
    };
  }
}

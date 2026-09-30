import { store } from '../state/store.js';
import * as api from '../services/api.js';
import { showToast } from '../components/toast.js';

export function renderEditorScreen(scriptId, targetScene = null) {
  const script = store.state.scripts.find(s => s.id === scriptId) || store.state.activeScript || {
    id: scriptId || 'chronicles-of-dust',
    title: 'Chronicles of Dust',
    draft: 'Draft 4.2',
    pages: 96
  };

  const userInitials = store.state.currentUser?.initials || 'JD';

  return `
    <div id="editor-wrapper" class="flex flex-col min-h-screen bg-surface w-full relative transition-all duration-200">
      
      <!-- Top Fixed Editor Header -->
      <header id="editor-header" class="fixed top-0 w-full z-40 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-slate-100 transition-transform duration-200">
        <div class="h-12 px-3 flex items-center justify-between max-w-4xl mx-auto">
          <div class="flex items-center gap-1.5 min-w-0">
            <!-- Back to Workspace button -->
            <button aria-label="Back to Workspace" id="editor-back-btn" class="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors">
              <span class="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div class="flex items-center gap-2 select-none min-w-0">
              <img src="/assets/scriptora-logo.png" alt="Scriptora" class="w-7 h-7 object-contain shrink-0" />
              <div class="flex flex-col min-w-0 leading-tight">
                <span class="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate">${script.title}</span>
                <span class="text-[10px] text-slate-500 truncate" id="editor-save-status">Autosaved Just now</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-1.5 shrink-0">
            <!-- Collaborators Link -->
            <a href="/profile/collaborators" aria-label="Collaborators" class="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors no-underline">
              <span class="material-symbols-outlined text-[19px]">group</span>
            </a>
            <!-- User Avatar -->
            <a href="/profile" aria-label="User profile" class="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center shadow-xs no-underline">
              ${userInitials}
            </a>
          </div>
        </div>
      </header>

      <!-- Main Editor Container -->
      <main class="flex flex-col relative w-full pt-12 pb-safe bg-surface min-h-screen">
        <div class="flex flex-col w-full max-w-4xl mx-auto pb-8">
          
          <!-- Sub-header Toolbar Strip -->
          <div id="editor-toolbar-strip" class="w-full bg-slate-100/70 border-b border-slate-200/60 px-3 py-1.5 flex flex-col gap-1.5 transition-all">
            <div class="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5 text-nowrap">
              <!-- Production Button -->
              <button id="btn-open-production" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200/80 hover:bg-slate-50 active:scale-95 transition-all">
                <span class="material-symbols-outlined text-[15px] text-blue-600">movie</span>
                <span>Production</span>
              </button>

              <!-- Export Button -->
              <button id="exportModalBtn" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200/80 hover:bg-slate-50 active:scale-95 transition-all">
                <span class="material-symbols-outlined text-[15px] text-blue-600">ios_share</span>
                <span>Export (PDF/FDX)</span>
              </button>

              <!-- Scene #s Toggle -->
              <button id="sceneNumberToggle" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-caption text-xs font-semibold border border-blue-200/80 active:scale-95 transition-all">
                <span class="material-symbols-outlined text-[15px]">pin</span>
                <span id="sceneNumberToggleText">Scene #s: On</span>
              </button>

              <!-- Focus Mode Toggle -->
              <button id="focusModeToggle" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200/80 hover:bg-slate-50 active:scale-95 transition-all">
                <span class="material-symbols-outlined text-[15px]">center_focus_strong</span>
                <span id="focusModeText">Focus Mode</span>
              </button>

              <!-- Language Toggle -->
              <button id="langToggleBtn" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200/80 hover:bg-slate-50 active:scale-95 transition-all">
                <span class="material-symbols-outlined text-[15px] text-blue-600">translate</span>
                <span id="langToggleText">EN / தமிழ்</span>
              </button>

              <!-- Versions Button -->
              <button id="versionsModalBtn" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs font-medium border border-slate-200/80 hover:bg-slate-50 active:scale-95 transition-all">
                <span class="material-symbols-outlined text-[14px] text-blue-600">history</span>
                <span id="currentVersionTag">${script.draft || 'Draft 4.2'}</span>
              </button>
            </div>
          </div>

          <!-- Scene Jump & Formatting Accessory Tray -->
          <div id="editor-accessory-tray" class="w-full bg-white border-b border-slate-200 px-3 py-2 flex flex-col gap-2 shadow-xs z-30 transition-all">
            <div class="flex items-center justify-between pb-0.5">
              <div class="flex items-center gap-1">
                <button aria-label="Undo" id="btn-undo" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-all">
                  <span class="material-symbols-outlined text-[18px]">undo</span>
                </button>
                <button aria-label="Redo" id="btn-redo" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-all">
                  <span class="material-symbols-outlined text-[18px]">redo</span>
                </button>
                <button id="btn-insert-intext" class="px-2.5 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 text-xs font-semibold active:scale-95 transition-all">
                  INT/EXT
                </button>
              </div>

              <div class="flex items-center gap-1.5">
                <!-- Scene Jump Selector -->
                <div class="relative">
                  <select id="sceneJumpSelect" class="h-8 pl-3 pr-7 rounded-full bg-blue-600 text-white font-caption text-xs uppercase font-semibold appearance-none cursor-pointer focus:outline-none shadow-xs">
                    <option value="scene-18">SCENE 18</option>
                    <option value="scene-19">SCENE 19</option>
                    <option value="scene-1">SCENE 1</option>
                  </select>
                  <span class="material-symbols-outlined text-[14px] text-white absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">expand_more</span>
                </div>

                <button id="screenplayDualBtn" class="px-2.5 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center gap-1 text-slate-700 text-xs font-medium active:scale-95 transition-all" title="Dual Dialogue">
                  <span class="material-symbols-outlined text-[16px]">splitscreen</span>
                  <span>Dual</span>
                </button>
              </div>
            </div>

            <!-- Grammar Semantic Element Buttons -->
            <div class="flex items-center justify-between gap-1 overflow-x-auto scrollbar-none py-0.5">
              <button class="format-btn flex-1 min-w-[56px] py-1.5 px-2 rounded-lg bg-blue-600 text-white text-xs flex items-center justify-center gap-1 shrink-0 shadow-xs active:opacity-90 font-medium" data-type="action">
                <span class="material-symbols-outlined text-[15px]">edit_note</span>
                <span>Act</span>
              </button>
              <button class="format-btn flex-1 min-w-[56px] py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs flex items-center justify-center gap-1 shrink-0 font-medium active:bg-blue-600 active:text-white transition-colors" data-type="scene">
                <span class="material-symbols-outlined text-[15px]">label</span>
                <span>Scen</span>
              </button>
              <button class="format-btn flex-1 min-w-[56px] py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs flex items-center justify-center gap-1 shrink-0 font-medium active:bg-blue-600 active:text-white transition-colors" data-type="character">
                <span class="material-symbols-outlined text-[15px]">person</span>
                <span>Char</span>
              </button>
              <button class="format-btn flex-1 min-w-[56px] py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs flex items-center justify-center gap-1 shrink-0 font-medium active:bg-blue-600 active:text-white transition-colors" data-type="dialogue">
                <span class="material-symbols-outlined text-[15px]">chat_bubble</span>
                <span>Dia</span>
              </button>
              <button class="format-btn flex-1 min-w-[56px] py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs flex items-center justify-center gap-1 shrink-0 font-medium active:bg-blue-600 active:text-white transition-colors" data-type="parenthetical">
                <span class="material-symbols-outlined text-[15px]">format_quote</span>
                <span>Para</span>
              </button>
            </div>
          </div>

          <!-- THE PHYSICAL SCREENPLAY PAGE -->
          <div class="px-2 sm:px-4 py-4 flex justify-center">
            <div id="screenplay-page" class="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 sm:p-10 flex flex-col font-courier text-[14px] sm:text-[15px] leading-[22px] sm:leading-[24px] text-slate-900 border border-slate-100">
              
              <!-- SCENE 18 -->
              <div id="anchor-scene-18" class="flex items-baseline justify-between py-2 font-bold text-slate-900 mb-3 border-b border-transparent">
                <span class="scene-num-indicator mr-3 shrink-0 text-slate-500 font-bold">18</span>
                <span class="flex-1 tracking-wide uppercase outline-none" contenteditable="true" id="slugline-18">INT. CUSTOMS OFFICE - NIGHT</span>
                <span class="scene-num-indicator ml-3 shrink-0 text-slate-500 font-bold">18</span>
              </div>

              <!-- Action Paragraph -->
              <p class="mb-4 text-slate-900 text-justify outline-none p-1 rounded focus:bg-blue-50/50" contenteditable="true" id="action-1">
                Kevin kneels over the cracked hydro-sensor junction box. Static hiss whispers through the damp comm-link. A lone flicker illuminates the tarnished brass seal.
              </p>

              <!-- Action Paragraph 2 -->
              <p class="mb-5 text-slate-900 text-justify outline-none p-1 rounded focus:bg-blue-50/50" contenteditable="true" id="action-2">
                Water droplets bead along the corroded circuit wires. He slides a copper probe between the connectors.
              </p>

              <!-- Character Cue 1 -->
              <div class="w-full flex justify-center mt-2 mb-0">
                <p class="w-7/12 uppercase tracking-wider font-bold text-center outline-none" contenteditable="true">
                  KEVIN
                </p>
              </div>

              <!-- Parenthetical -->
              <div class="w-full flex justify-center mb-0">
                <p class="w-6/12 italic text-center text-slate-500 outline-none" contenteditable="true">
                  (whispering into comm)
                </p>
              </div>

              <!-- Dialogue -->
              <div class="w-full flex justify-center mb-5">
                <p class="w-9/12 sm:w-8/12 text-left outline-none p-1 rounded focus:bg-blue-50/50" contenteditable="true" id="dialogue-1">
                  If the seals break before dawn, the sector won't hold the surge.
                </p>
              </div>

              <!-- Character Cue 2 -->
              <div class="w-full flex justify-center mt-1 mb-0">
                <p class="w-7/12 uppercase tracking-wider font-bold text-center outline-none" contenteditable="true">
                  MEERA (O.S.)
                </p>
              </div>

              <!-- Dialogue 2 -->
              <div class="w-full flex justify-center mb-6">
                <p class="w-9/12 sm:w-8/12 text-left outline-none p-1 rounded focus:bg-blue-50/50" contenteditable="true" id="dialogue-2">
                  Then don't let them break. Reroute the secondary relay through the floodgate breaker.
                </p>
              </div>

              <!-- Transition -->
              <div class="w-full flex justify-end mb-6">
                <p class="uppercase font-bold tracking-wider outline-none" contenteditable="true">
                  CUT TO:
                </p>
              </div>

              <!-- SCENE 19 -->
              <div id="anchor-scene-19" class="flex items-baseline justify-between py-2 font-bold text-slate-900 mb-3 border-t border-slate-100 pt-4">
                <span class="scene-num-indicator mr-3 shrink-0 text-slate-500 font-bold">19</span>
                <span class="flex-1 tracking-wide uppercase outline-none" contenteditable="true" id="slugline-19">EXT. FLOODGATE GANTRY - CONTINUOUS</span>
                <span class="scene-num-indicator ml-3 shrink-0 text-slate-500 font-bold">19</span>
              </div>

              <!-- Editable Target Action -->
              <div class="outline-none mb-4 text-slate-900 focus:bg-blue-50/50 rounded p-1 transition-colors" contenteditable="true" id="editableLine">
                Sirens pulse through the red fog. Meera anchors her cable to the iron pylon, visor reflecting the rising floodwaters below.
              </div>

            </div>
          </div>

          <!-- Telemetry Bar -->
          <div class="px-4 py-2 flex items-center justify-between gap-2 text-slate-500 font-caption text-xs select-none border-t border-slate-200 bg-white">
            <div class="flex items-center gap-2">
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">format_shapes</span>
                <span>Courier Prime 12pt</span>
              </span>
              <span>•</span>
              <span class="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium" id="tamilLangBadge">Tamil IME: Ready</span>
            </div>
            <div class="flex items-center gap-2">
              <span>Page 34 of 96</span>
              <span>•</span>
              <span id="word-count-display">14,280 words</span>
            </div>
          </div>

        </div>
      </main>

      <!-- EXPORT MODAL -->
      <div id="exportModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm hidden items-end sm:items-center justify-center p-0 sm:p-4">
        <div class="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden">
          <div class="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px]">ios_share</span>
              </div>
              <div>
                <h3 class="font-heading font-bold text-base text-slate-900 leading-tight">Export Screenplay</h3>
                <p class="text-[11px] text-slate-500 mt-0.5">${script.title} · ${script.draft || 'Draft 4.2'}</p>
              </div>
            </div>
            <button id="closeExportModal" aria-label="Close export dialog" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div class="p-5 flex flex-col gap-4 overflow-y-auto">
            <div class="flex flex-col gap-1.5">
              <label for="exportFormatSelect" class="text-xs font-semibold text-slate-700">Export Format</label>
              <div class="relative">
                <select id="exportFormatSelect" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-600 cursor-pointer">
                  <option value="pdf">PDF Document (.pdf) - Industry Standard</option>
                  <option value="fdx">Final Draft (.fdx)</option>
                  <option value="fountain">Fountain (.fountain)</option>
                  <option value="docx">Microsoft Word (.docx)</option>
                  <option value="txt">Plain Text Screenplay (.txt)</option>
                </select>
              </div>
            </div>

            <div class="flex flex-col gap-2.5 pt-1">
              <p class="text-xs font-semibold text-slate-700">Options</p>
              <label class="flex items-center gap-2.5 cursor-pointer text-xs text-slate-700">
                <input type="checkbox" id="optSceneNumbers" checked class="w-4 h-4 accent-blue-600 rounded">
                <span>Include scene numbers (18, 19, etc.)</span>
              </label>
              <label class="flex items-center gap-2.5 cursor-pointer text-xs text-slate-700">
                <input type="checkbox" id="optTitlePage" checked class="w-4 h-4 accent-blue-600 rounded">
                <span>Include title page & metadata</span>
              </label>
              <label class="flex items-center gap-2.5 cursor-pointer text-xs text-slate-700">
                <input type="checkbox" id="optRevisionInfo" checked class="w-4 h-4 accent-blue-600 rounded">
                <span>Include revision information & date</span>
              </label>
            </div>

            <div id="exportProgressArea" class="hidden flex flex-col gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div class="flex items-center gap-2 text-xs font-medium text-slate-800" id="exportStatusLabel">
                <span class="material-symbols-outlined text-[18px] animate-spin text-blue-600">progress_activity</span>
                <span id="exportStatusText">Preparing screenplay...</span>
              </div>
              <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div id="exportProgressBar" class="bg-blue-600 h-full transition-all duration-300 w-1/3"></div>
              </div>
            </div>
          </div>

          <div class="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
            <button id="cancelExportBtn" class="px-3.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-medium">Cancel</button>
            <button id="startExportBtn" class="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:bg-blue-700">
              <span class="material-symbols-outlined text-[18px]">file_download</span>
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      <!-- VERSIONS MODAL -->
      <div id="versionsModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm hidden items-end sm:items-center justify-center p-0 sm:p-4">
        <div class="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden">
          <div class="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px]">history</span>
              </div>
              <div>
                <h3 class="font-heading font-bold text-base text-slate-900 leading-tight">Versions & History</h3>
                <p class="text-[11px] text-slate-500 mt-0.5">${script.title}</p>
              </div>
            </div>
            <button id="closeVersionsModal" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div class="px-5 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-2">
            <button id="openNewVersionPrompt" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold shadow-xs hover:bg-blue-700">
              <span class="material-symbols-outlined text-[16px]">add</span>
              <span>Create New Version</span>
            </button>
            <button id="openCompareBtn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-medium transition-colors">
              <span class="material-symbols-outlined text-[16px]">compare_arrows</span>
              <span>Compare Versions</span>
            </button>
          </div>

          <div class="p-4 overflow-y-auto flex flex-col gap-2.5 max-h-[420px]" id="versionsListContainer">
            <!-- Versions rendered dynamically -->
          </div>
        </div>
      </div>

      <!-- NEW VERSION SNAPSHOT MODAL -->
      <div id="newVersionModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden items-center justify-center p-4">
        <div class="w-full max-w-sm bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
          <div class="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <h3 class="font-bold text-sm text-slate-900">Create New Version Snapshot</h3>
            <button id="closeNewVersionModal" class="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <div class="p-4 flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-700">Version Label</label>
              <input type="text" id="newVersionNameInput" value="Draft 5.0 (Locked)" class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600">
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-700">Snapshot Notes</label>
              <textarea id="newVersionNotesInput" rows="2" placeholder="e.g. Approved revision after studio table read..." class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 resize-none"></textarea>
            </div>
          </div>
          <div class="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
            <button id="cancelNewVersionBtn" class="px-3 py-1 rounded-lg text-slate-600 text-xs">Cancel</button>
            <button id="saveNewVersionBtn" class="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold shadow-xs hover:bg-blue-700">Create Snapshot</button>
          </div>
        </div>
      </div>

      <!-- COMPARE / DIFF MODAL -->
      <div id="compareModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden items-end sm:items-center justify-center p-0 sm:p-4">
        <div class="w-full sm:max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col max-h-[92vh] overflow-hidden">
          <div class="flex items-center justify-between px-5 py-3 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px]">compare_arrows</span>
              </div>
              <div>
                <h3 class="font-bold text-base text-slate-900 leading-tight">Semantic Script Diff</h3>
                <p class="text-[11px] text-slate-500 mt-0.5">Comparing: Draft 3.0 vs. Draft 4.2 (Current)</p>
              </div>
            </div>
            <button id="closeCompareModal" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div class="px-4 py-2 bg-slate-50 flex items-center justify-between text-xs border-b border-slate-100">
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-500"></span><span class="font-medium text-slate-800">1 Addition</span></span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-red-400"></span><span class="font-medium text-slate-800">1 Deletion</span></span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-blue-500"></span><span class="font-medium text-slate-800">1 Modified Dialogue</span></span>
            </div>
            <span class="font-mono text-[11px] text-slate-500">Scene 18</span>
          </div>

          <div class="p-4 sm:p-6 overflow-y-auto flex flex-col gap-4 font-courier text-xs sm:text-sm leading-relaxed max-h-[460px]">
            <div class="border-l-4 border-blue-500 pl-3 py-1 bg-blue-50/40 rounded-r-lg">
              <div class="text-[11px] font-sans font-semibold text-blue-700 uppercase tracking-wide mb-1">Modified Dialogue · MEERA (O.S.)</div>
              <div class="text-red-700 line-through bg-red-50 px-2 py-0.5 rounded mb-1">- Then don't let them break. Reroute the secondary conduit.</div>
              <div class="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">+ Then don't let them break. Reroute the secondary relay through the floodgate breaker.</div>
            </div>
            <div class="border-l-4 border-emerald-500 pl-3 py-1 bg-emerald-50/40 rounded-r-lg">
              <div class="text-[11px] font-sans font-semibold text-emerald-700 uppercase tracking-wide mb-1">Added Action · SCENE 19</div>
              <div class="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">+ Sirens pulse through the red fog. Meera anchors her cable to the iron pylon, visor reflecting the rising floodwaters below.</div>
            </div>
            <div class="border-l-4 border-red-400 pl-3 py-1 bg-red-50/40 rounded-r-lg">
              <div class="text-[11px] font-sans font-semibold text-red-600 uppercase tracking-wide mb-1">Removed Transition</div>
              <div class="text-red-700 line-through bg-red-50 px-2 py-0.5 rounded">- FADE TO BLACK.</div>
            </div>
          </div>

          <div class="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs text-slate-500">Filtered by screenplay semantic blocks</span>
            <button id="closeCompareBtn2" class="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold">Done</button>
          </div>
        </div>
      </div>

    </div>
  `;
}

export function attachEditorEvents(scriptId, navigate) {
  // Back navigation to /workspace
  const backBtn = document.getElementById('editor-back-btn');
  if (backBtn) {
    backBtn.onclick = () => {
      navigate('/workspace');
    };
  }

  // Production shortcut
  const prodBtn = document.getElementById('btn-open-production');
  if (prodBtn) {
    prodBtn.onclick = () => {
      navigate('/intelligence/analysis/production');
    };
  }

  // Scene Numbers Toggle
  const sceneToggle = document.getElementById('sceneNumberToggle');
  const sceneToggleText = document.getElementById('sceneNumberToggleText');
  let sceneNumbersOn = true;
  if (sceneToggle) {
    sceneToggle.onclick = () => {
      sceneNumbersOn = !sceneNumbersOn;
      sceneToggleText.textContent = `Scene #s: ${sceneNumbersOn ? 'On' : 'Off'}`;
      document.querySelectorAll('.scene-num-indicator').forEach(el => {
        el.style.opacity = sceneNumbersOn ? '1' : '0';
      });
      showToast(`Scene numbers ${sceneNumbersOn ? 'enabled' : 'hidden'}`);
    };
  }

  // Focus Mode Toggle
  const focusBtn = document.getElementById('focusModeToggle');
  const focusText = document.getElementById('focusModeText');
  let focusOn = false;
  if (focusBtn) {
    focusBtn.onclick = () => {
      focusOn = !focusOn;
      focusText.textContent = focusOn ? 'Exit Focus' : 'Focus Mode';
      document.getElementById('editor-toolbar-strip').style.display = focusOn ? 'none' : 'flex';
      document.getElementById('editor-accessory-tray').style.display = focusOn ? 'none' : 'flex';
      showToast(focusOn ? 'Focus Mode active (distraction-free)' : 'Exited Focus Mode');
    };
  }

  // Language Toggle
  const langBtn = document.getElementById('langToggleBtn');
  const langText = document.getElementById('langToggleText');
  const tamilBadge = document.getElementById('tamilLangBadge');
  let currentLang = 'EN';
  if (langBtn) {
    langBtn.onclick = () => {
      currentLang = currentLang === 'EN' ? 'TA' : 'EN';
      langText.textContent = currentLang === 'EN' ? 'EN / தமிழ்' : 'தமிழ் / EN';
      if (tamilBadge) {
        tamilBadge.textContent = currentLang === 'TA' ? 'தமிழ் விசைப்பலகை: இயங்குகிறது' : 'Tamil IME: Ready';
      }
      showToast(`Screenplay language set to ${currentLang === 'TA' ? 'Tamil' : 'English'}`);
    };
  }

  // INT/EXT Insert
  const intExtBtn = document.getElementById('btn-insert-intext');
  const editableLine = document.getElementById('editableLine');
  if (intExtBtn && editableLine) {
    intExtBtn.onclick = () => {
      editableLine.focus();
      document.execCommand('insertText', false, 'INT/EXT. ');
    };
  }

  // Scene Jump
  const sceneSelect = document.getElementById('sceneJumpSelect');
  if (sceneSelect) {
    sceneSelect.onchange = (e) => {
      const val = e.target.value;
      const target = document.getElementById(val === 'scene-19' ? 'anchor-scene-19' : 'anchor-scene-18');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.add('bg-blue-50/50');
        setTimeout(() => target.classList.remove('bg-blue-50/50'), 1200);
      }
    };
  }

  // Grammar formatting buttons
  document.querySelectorAll('.format-btn').forEach(btn => {
    btn.onclick = () => {
      const type = btn.getAttribute('data-type');
      if (!editableLine) return;
      editableLine.focus();
      if (type === 'scene') {
        editableLine.className = 'outline-none mb-4 text-slate-900 font-bold uppercase tracking-wider p-1 rounded focus:bg-blue-50/50';
      } else if (type === 'character') {
        editableLine.className = 'outline-none mb-2 text-slate-900 font-bold uppercase text-center w-7/12 mx-auto tracking-wide p-1 rounded focus:bg-blue-50/50';
      } else if (type === 'parenthetical') {
        editableLine.className = 'outline-none mb-2 text-slate-500 italic text-center w-6/12 mx-auto p-1 rounded focus:bg-blue-50/50';
      } else if (type === 'dialogue') {
        editableLine.className = 'outline-none mb-4 text-slate-900 w-9/12 sm:w-8/12 mx-auto text-left p-1 rounded focus:bg-blue-50/50';
      } else {
        editableLine.className = 'outline-none mb-4 text-slate-900 p-1 rounded focus:bg-blue-50/50';
      }
    };
  });

  // Undo / Redo
  const undoBtn = document.getElementById('btn-undo');
  const redoBtn = document.getElementById('btn-redo');
  if (undoBtn) undoBtn.onclick = () => document.execCommand('undo');
  if (redoBtn) redoBtn.onclick = () => document.execCommand('redo');

  // Autosave simulation
  let autosaveTimeout = null;
  const saveStatus = document.getElementById('editor-save-status');
  document.getElementById('screenplay-page')?.addEventListener('input', () => {
    if (saveStatus) saveStatus.textContent = 'Saving changes...';
    clearTimeout(autosaveTimeout);
    autosaveTimeout = setTimeout(async () => {
      const p = document.getElementById('editableLine')?.innerText;
      await api.saveScreenplay(scriptId, { lastEdit: p });
      if (saveStatus) saveStatus.textContent = 'Autosaved Just now';
    }, 1000);
  });

  // EXPORT MODAL
  const exportModal = document.getElementById('exportModal');
  const exportBtn = document.getElementById('exportModalBtn');
  const closeExportModal = document.getElementById('closeExportModal');
  const cancelExportBtn = document.getElementById('cancelExportBtn');
  const startExportBtn = document.getElementById('startExportBtn');
  const exportProgressArea = document.getElementById('exportProgressArea');
  const exportProgressBar = document.getElementById('exportProgressBar');
  const exportStatusText = document.getElementById('exportStatusText');

  function toggleExport(open) {
    if (!exportModal) return;
    if (open) {
      exportModal.classList.remove('hidden');
      exportModal.classList.add('flex');
    } else {
      exportModal.classList.add('hidden');
      exportModal.classList.remove('flex');
      exportProgressArea?.classList.add('hidden');
    }
  }

  if (exportBtn) exportBtn.onclick = () => toggleExport(true);
  if (closeExportModal) closeExportModal.onclick = () => toggleExport(false);
  if (cancelExportBtn) cancelExportBtn.onclick = () => toggleExport(false);

  if (startExportBtn) {
    startExportBtn.onclick = () => {
      const format = document.getElementById('exportFormatSelect')?.value || 'pdf';
      exportProgressArea.classList.remove('hidden');
      exportProgressBar.style.width = '20%';
      exportStatusText.textContent = 'Typesetting Courier Prime screenplay pages...';

      setTimeout(() => {
        exportProgressBar.style.width = '70%';
        exportStatusText.textContent = `Formatting ${format.toUpperCase()} structure & scene locks...`;
      }, 500);

      setTimeout(() => {
        exportProgressBar.style.width = '100%';
        exportStatusText.textContent = `Completed! Packaging ${format.toUpperCase()} download...`;
        
        // Generate actual file download
        const textContent = `CHRONICLES OF DUST\nDraft 4.2\n\nSCENE 18\nINT. CUSTOMS OFFICE - NIGHT\n\nKevin kneels over cracked hydro-sensor junction box.\n\nKEVIN\nIf the seals break before dawn, the sector won't hold the surge.\n\nMEERA (O.S.)\nThen don't let them break. Reroute the secondary relay through the floodgate breaker.\n\nCUT TO:\n\nSCENE 19\nEXT. FLOODGATE GANTRY - CONTINUOUS\nSirens pulse through the red fog.`;
        const blob = new Blob([textContent], { type: format === 'pdf' ? 'application/pdf' : 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Chronicles_of_Dust_Draft4.2.${format}`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        showToast(`Exported "${a.download}" successfully`);
        setTimeout(() => toggleExport(false), 900);
      }, 1100);
    };
  }

  // VERSIONS MODAL
  const versionsModal = document.getElementById('versionsModal');
  const versionsBtn = document.getElementById('versionsModalBtn');
  const closeVersionsModal = document.getElementById('closeVersionsModal');
  const versionsContainer = document.getElementById('versionsListContainer');

  async function loadVersions() {
    const list = await api.getVersions(scriptId);
    if (!versionsContainer) return;
    versionsContainer.innerHTML = list.map(v => `
      <div class="p-3 rounded-xl border ${v.isCurrent ? 'border-2 border-blue-600 bg-blue-50/30' : 'border-slate-200 bg-white hover:bg-slate-50'} transition-colors flex flex-col gap-1.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="font-heading font-bold text-sm text-slate-900">${v.name}</span>
            <span class="px-2 py-0.5 rounded-full ${v.isCurrent ? 'bg-blue-600 text-white font-semibold' : 'bg-slate-100 text-slate-600 font-medium'} text-[10px]">${v.tag}</span>
          </div>
          <span class="text-[11px] text-slate-400 font-caption">${v.timestamp}</span>
        </div>
        <p class="text-xs text-slate-600">${v.notes || 'Point-in-time snapshot.'}</p>
        <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <span>Edited by ${v.author}</span>
          <div class="flex items-center gap-2">
            <span class="font-medium text-slate-700">${v.stats}</span>
            ${!v.isCurrent ? `<button class="restore-version-btn text-blue-600 font-semibold hover:underline" data-vname="${v.name}">Restore</button>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.restore-version-btn').forEach(btn => {
      btn.onclick = () => {
        const vname = btn.getAttribute('data-vname');
        showToast(`Restored version "${vname}"`);
        document.getElementById('currentVersionTag').textContent = vname;
        versionsModal.classList.add('hidden');
      };
    });
  }

  if (versionsBtn) {
    versionsBtn.onclick = () => {
      versionsModal.classList.remove('hidden');
      versionsModal.classList.add('flex');
      loadVersions();
    };
  }
  if (closeVersionsModal) versionsModal.onclick = (e) => {
    if (e.target === versionsModal || e.target.closest('#closeVersionsModal')) {
      versionsModal.classList.add('hidden');
      versionsModal.classList.remove('flex');
    }
  };

  // NEW VERSION SNAPSHOT MODAL
  const newVModal = document.getElementById('newVersionModal');
  const openNewVPrompt = document.getElementById('openNewVersionPrompt');
  const closeNewVModal = document.getElementById('closeNewVersionModal');
  const cancelNewVBtn = document.getElementById('cancelNewVersionBtn');
  const saveNewVBtn = document.getElementById('saveNewVersionBtn');

  if (openNewVPrompt) openNewVPrompt.onclick = () => {
    newVModal.classList.remove('hidden');
    newVModal.classList.add('flex');
  };
  if (closeNewVModal) closeNewVModal.onclick = () => newVModal.classList.add('hidden');
  if (cancelNewVBtn) cancelNewVBtn.onclick = () => newVModal.classList.add('hidden');

  if (saveNewVBtn) {
    saveNewVBtn.onclick = async () => {
      const name = document.getElementById('newVersionNameInput')?.value.trim();
      const notes = document.getElementById('newVersionNotesInput')?.value.trim();
      if (!name) return;
      await api.createVersion(scriptId, { name, notes });
      showToast(`Created version snapshot "${name}"`);
      document.getElementById('currentVersionTag').textContent = name;
      newVModal.classList.add('hidden');
      loadVersions();
    };
  }

  // COMPARE MODAL
  const compareModal = document.getElementById('compareModal');
  const openCompareBtn = document.getElementById('openCompareBtn');
  const closeCompareModal = document.getElementById('closeCompareModal');
  const closeCompareBtn2 = document.getElementById('closeCompareBtn2');

  function toggleCompare(open) {
    if (!compareModal) return;
    if (open) {
      compareModal.classList.remove('hidden');
      compareModal.classList.add('flex');
    } else {
      compareModal.classList.add('hidden');
      compareModal.classList.remove('flex');
    }
  }

  if (openCompareBtn) openCompareBtn.onclick = () => toggleCompare(true);
  if (closeCompareModal) closeCompareModal.onclick = () => toggleCompare(false);
  if (closeCompareBtn2) closeCompareBtn2.onclick = () => toggleCompare(false);
}

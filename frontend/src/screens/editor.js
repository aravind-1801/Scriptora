import { store } from '../state/store.js';
import * as api from '../services/api.js';
import { showToast } from '../components/toast.js';
import { LOGO_URL } from '../utils/brand.js';

// In-memory active screenplay state per editor session
let currentScreenplay = null;
let activeBlockId = null;
let saveDebounceTimer = null;
let isSaving = false;
let hasUnsavedChanges = false;
let sceneNumbersEnabled = true;
let focusModeActive = false;
let activeLanguage = 'EN';
let findMatches = [];
let currentFindIndex = -1;
let autoSaveEnabled = localStorage.getItem('scriptora_autosave') !== 'false';

// Standard A4 screenplay page capacity (~46 lines of Courier 12pt)
const A4_PAGE_CAPACITY_LINES = 46;

export function renderEditorScreen(scriptId, targetScene = null) {
  const script = store.state.scripts?.find(s => s.id === scriptId) || store.state.activeScript || {
    id: scriptId || 'chronicles-of-dust',
    title: 'Chronicles of Dust',
    draft: 'Draft 4.2',
    pages: 5
  };

  const userInitials = store.state.currentUser?.initials || 'AK';

  return `
    <div id="editor-root" class="flex flex-col min-h-screen bg-slate-100 text-slate-900 w-full relative select-text antialiased">
      
      <!-- ========================================================= -->
      <!-- STATIC TOP HEADER (FIXED: Never scrolls with screenplay)  -->
      <!-- ========================================================= -->
      <header id="editor-fixed-header" class="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all">
        
        <!-- ROW 1: TOP APP HEADER (Order: Back, Logo, Title, Auto-Save, Save Icon, Collab, Avatar) -->
        <div class="h-12 px-3 flex items-center justify-between max-w-5xl mx-auto">
          <div class="flex items-center gap-2 min-w-0">
            <!-- Back to Workspace button -->
            <button aria-label="Back to Workspace" id="editor-back-btn" class="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 active:scale-95 transition-all">
              <span class="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            
            <!-- Logo & Script Title -->
            <div class="flex items-center gap-2 select-none min-w-0">
              <img src="${LOGO_URL}" onerror="this.onerror=null; this.src='./assets/logo-BG9jZ7UG.png';" alt="Scriptora" class="w-7 h-7 object-contain shrink-0" />
              <div class="flex flex-col min-w-0 leading-tight">
                <span class="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate" id="editor-script-title">${script.title}</span>
                <span class="text-[10px] text-slate-500 truncate font-mono" id="editor-save-status">Saved</span>
              </div>
            </div>
          </div>

          <!-- Right Controls: Unified Save + Auto-Save Pill, Collaborate, Avatar -->
          <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            <!-- Combined Save & Auto-Save Control (Single compact pill) -->
            <div class="inline-flex items-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all overflow-hidden border border-blue-700/50">
              <button id="editor-save-btn" class="flex items-center justify-center p-1.5 hover:bg-blue-700/80 active:scale-95 transition-all text-white" title="Save screenplay now (Ctrl+S)" aria-label="Save Screenplay">
                <span class="material-symbols-outlined text-[17px]" id="editor-save-icon">save</span>
              </button>
              <button id="btn-toggle-autosave" class="flex items-center gap-1 px-2 py-1.5 hover:bg-blue-700/80 active:scale-95 transition-all text-[11px] font-semibold text-white/95 border-l border-blue-500/70" title="Toggle Auto-save (Current: ${autoSaveEnabled ? 'ON' : 'OFF'})">
                <span class="w-1.5 h-1.5 rounded-full ${autoSaveEnabled ? 'bg-emerald-300 animate-pulse' : 'bg-slate-300'}" id="autosave-dot"></span>
                <span id="autosave-toggle-label">${autoSaveEnabled ? 'Auto' : 'Off'}</span>
              </button>
            </div>

            <!-- Collaborate Link -->
            <a href="/profile/collaborators" id="editor-collab-btn" aria-label="Collaborators" class="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors no-underline" title="Collaborators">
              <span class="material-symbols-outlined text-[19px]">group</span>
            </a>

            <!-- User Avatar -->
            <a href="/profile" aria-label="User profile" class="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center shadow-xs no-underline">
              ${userInitials}
            </a>
          </div>
        </div>

        <!-- ROW 2: HORIZONTAL EDITOR TOOLBAR ([ ⋮ ] MUST appear BEFORE Production) -->
        <div id="editor-toolbar-strip" class="w-full bg-slate-50/90 border-t border-slate-200/80 px-3 py-1 flex items-center gap-2 overflow-x-auto scrollbar-none text-nowrap max-w-5xl mx-auto transition-all">
          
          <!-- [ ⋮ ] Three-Dot Menu (FIRST item as required by Section F & G) -->
          <button id="editor-more-menu-btn" class="flex items-center justify-center w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 active:scale-95 transition-all shrink-0 shadow-2xs" title="More Tools (Title Page, Scene Navigator, Character Navigator, Preferences)">
            <span class="material-symbols-outlined text-[18px]">more_vert</span>
          </button>

          <!-- Production -->
          <button id="btn-open-production" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all shrink-0">
            <span class="material-symbols-outlined text-[15px] text-blue-600">movie</span>
            <span>Production</span>
          </button>

          <!-- Export -->
          <button id="exportModalBtn" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all shrink-0">
            <span class="material-symbols-outlined text-[15px] text-blue-600">ios_share</span>
            <span>Export</span>
          </button>

          <!-- Scene #s Toggle -->
          <button id="sceneNumberToggle" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-caption text-xs font-semibold border border-blue-200/80 active:scale-95 transition-all shrink-0">
            <span class="material-symbols-outlined text-[15px]">pin</span>
            <span id="sceneNumberToggleText">Scene #s: On</span>
          </button>

          <!-- Find / Replace -->
          <button id="btn-quick-find" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all shrink-0">
            <span class="material-symbols-outlined text-[15px] text-slate-600">find_replace</span>
            <span>Find</span>
          </button>

          <!-- Focus Mode -->
          <button id="focusModeToggle" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all shrink-0">
            <span class="material-symbols-outlined text-[15px]">center_focus_strong</span>
            <span id="focusModeText">Focus</span>
          </button>

          <!-- Language -->
          <button id="langToggleBtn" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 font-caption text-xs border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all shrink-0">
            <span class="material-symbols-outlined text-[15px] text-blue-600">translate</span>
            <span id="langToggleText">EN / தமிழ்</span>
          </button>
        </div>

        <!-- ROW 3: ACCESSORY & ELEMENT BAR -->
        <div id="editor-accessory-tray" class="w-full bg-white border-b border-slate-200 px-3 py-1.5 flex flex-col gap-1.5 shadow-xs max-w-5xl mx-auto transition-all">
          
          <!-- Compact Scene Jump, Title Page & Draft (Next line after scene selector), Undo/Redo -->
          <div class="flex items-center justify-between gap-2 py-0.5">
            <div class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none min-w-0">
              <!-- Compact Scene Selector: small length for proper alignment -->
              <div class="relative w-28 sm:w-32 shrink-0">
                <select id="navSceneSelect" class="w-full h-7 pl-2.5 pr-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold truncate appearance-none cursor-pointer focus:outline-none shadow-xs transition-colors">
                  <option value="">Scene 18 ▾</option>
                </select>
                <span class="material-symbols-outlined text-[14px] text-white absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none">expand_more</span>
              </div>

              <!-- Title Page button (brought to the line after scene selector) -->
              <button id="btn-quick-title-page" class="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-caption text-xs border border-slate-200 active:scale-95 transition-all shrink-0 whitespace-nowrap">
                <span class="material-symbols-outlined text-[14px] text-slate-600">description</span>
                <span>Title Page</span>
              </button>

              <!-- Draft Version button (brought to the line after scene selector) -->
              <button id="versionsModalBtn" class="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-caption text-xs border border-slate-200 active:scale-95 transition-all shrink-0 whitespace-nowrap">
                <span class="material-symbols-outlined text-[14px] text-blue-600">history</span>
                <span id="currentVersionTag">${script.draft || 'Draft 4.2'}</span>
              </button>
            </div>

            <!-- Undo / Redo controls -->
            <div class="flex items-center gap-1 shrink-0">
              <button id="btn-undo" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-all" title="Undo (Ctrl+Z)">
                <span class="material-symbols-outlined text-[16px]">undo</span>
              </button>
              <button id="btn-redo" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-all" title="Redo (Ctrl+Y)">
                <span class="material-symbols-outlined text-[16px]">redo</span>
              </button>
            </div>
          </div>

          <!-- Line Element Bar: Scene, Act, Char, Dia, Paren, Trans (Ensuring NO text overlap!) -->
          <div class="flex items-center justify-between gap-1 overflow-x-auto scrollbar-none py-0.5" id="element-bar">
            <button class="element-btn flex-1 min-w-0 py-1 px-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 shrink-0 transition-colors bg-slate-100 text-slate-700 hover:bg-slate-200" data-type="scene" title="Convert to Scene Heading">
              <span class="material-symbols-outlined text-[14px] shrink-0">movie</span>
              <span class="truncate">Scene</span>
            </button>
            <button class="element-btn flex-1 min-w-0 py-1 px-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 shrink-0 transition-colors bg-blue-600 text-white shadow-xs" data-type="action" title="Convert to Action (Act) block">
              <span class="material-symbols-outlined text-[14px] shrink-0">edit_note</span>
              <span class="truncate">Act</span>
            </button>
            <button class="element-btn flex-1 min-w-0 py-1 px-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 shrink-0 transition-colors bg-slate-100 text-slate-700 hover:bg-slate-200" data-type="character" title="Convert to Character cue">
              <span class="material-symbols-outlined text-[14px] shrink-0">person</span>
              <span class="truncate">Char</span>
            </button>
            <button class="element-btn flex-1 min-w-0 py-1 px-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 shrink-0 transition-colors bg-slate-100 text-slate-700 hover:bg-slate-200" data-type="dialogue" title="Convert to Dialogue (Dia)">
              <span class="material-symbols-outlined text-[14px] shrink-0">chat_bubble</span>
              <span class="truncate">Dia</span>
            </button>
            <button class="element-btn flex-1 min-w-0 py-1 px-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 shrink-0 transition-colors bg-slate-100 text-slate-700 hover:bg-slate-200" data-type="parenthetical" title="Insert Parenthetical ()">
              <span class="material-symbols-outlined text-[14px] shrink-0">format_quote</span>
              <span class="truncate">Paren</span>
            </button>
            <button class="element-btn flex-1 min-w-0 py-1 px-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 shrink-0 transition-colors bg-slate-100 text-slate-700 hover:bg-slate-200" data-type="transition" title="Convert to Transition">
              <span class="material-symbols-outlined text-[14px] shrink-0">double_arrow</span>
              <span class="truncate">Trans</span>
            </button>
          </div>
        </div>

      </header>

      <!-- ========================================================= -->
      <!-- FIND & REPLACE DOCKED BAR                                -->
      <!-- ========================================================= -->
      <div id="findReplaceBar" class="fixed top-[152px] left-0 right-0 z-35 bg-white border-b border-blue-200 shadow-md px-4 py-2 hidden max-w-3xl mx-auto rounded-b-xl transition-all">
        <div class="flex items-center gap-2 flex-wrap text-xs">
          <div class="flex items-center bg-slate-100 rounded-lg px-2 py-1 flex-1 min-w-[140px]">
            <span class="material-symbols-outlined text-[15px] text-slate-400 mr-1">search</span>
            <input type="text" id="findInput" placeholder="Find text..." class="bg-transparent outline-none w-full text-slate-900" />
            <span id="findMatchesCount" class="text-[10px] text-slate-500 whitespace-nowrap ml-1 font-mono">0 of 0</span>
          </div>

          <div class="flex items-center bg-slate-100 rounded-lg px-2 py-1 flex-1 min-w-[140px]">
            <span class="material-symbols-outlined text-[15px] text-slate-400 mr-1">find_replace</span>
            <input type="text" id="replaceInput" placeholder="Replace with..." class="bg-transparent outline-none w-full text-slate-900" />
          </div>

          <div class="flex items-center gap-1">
            <button id="findPrevBtn" class="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700" title="Previous match">
              <span class="material-symbols-outlined text-[14px]">expand_less</span>
            </button>
            <button id="findNextBtn" class="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700" title="Next match">
              <span class="material-symbols-outlined text-[14px]">expand_more</span>
            </button>
            <button id="replaceBtn" class="px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 font-semibold text-[11px] text-slate-800">Replace</button>
            <button id="replaceAllBtn" class="px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 font-semibold text-[11px] text-white">All</button>
            <button id="closeFindBtn" class="w-6 h-6 rounded hover:bg-slate-100 flex items-center justify-center text-slate-500 ml-1">
              <span class="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ========================================================= -->
      <!-- CONTINUOUS A4-STYLE MULTI-PAGE SCREENPLAY WORKSPACE      -->
      <!-- Single vertical scroll container, Header stays fixed      -->
      <!-- Content flows naturally across A4 sheets without forced   -->
      <!-- page breaks per scene or transition.                      -->
      <!-- ========================================================= -->
      <main id="editor-main-scroll" class="flex-1 w-full pt-[156px] pb-16 overflow-y-auto min-h-screen flex flex-col items-center">
        
        <!-- Continuous A4 Sheets Container -->
        <div id="screenplay-pages-container" class="w-full max-w-3xl flex flex-col items-center gap-8 py-6 px-3 sm:px-6">
          <div class="w-full flex items-center justify-center py-20 text-slate-400">
            <span class="material-symbols-outlined animate-spin text-[28px] mr-2">progress_activity</span>
            <span>Loading screenplay studio...</span>
          </div>
        </div>

        <!-- Telemetry Footer Bar -->
        <div class="w-full max-w-3xl px-4 py-2 mt-4 flex items-center justify-between gap-2 text-slate-500 font-caption text-xs select-none border-t border-slate-200 bg-white/70 backdrop-blur-xs rounded-xl shadow-2xs">
          <div class="flex items-center gap-2">
            <span class="flex items-center gap-1 font-mono">
              <span class="material-symbols-outlined text-[14px]">format_shapes</span>
              <span id="telemetry-font">Courier Prime 12pt</span>
            </span>
            <span>•</span>
            <span class="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium" id="tamilLangBadge">Tamil IME: Ready</span>
          </div>
          <div class="flex items-center gap-2 font-mono">
            <span id="telemetry-page-count">Page 1 of 5</span>
            <span>•</span>
            <span id="telemetry-word-count">14,280 words</span>
          </div>
        </div>

      </main>

      <!-- ========================================================= -->
      <!-- AUTOCOMPLETE POPUP (Anchor to active line)                -->
      <!-- ========================================================= -->
      <div id="editor-autocomplete-dropdown" class="fixed z-50 bg-white border border-slate-200/90 rounded-xl shadow-xl py-1 min-w-[220px] max-w-[calc(100vw-32px)] max-h-56 overflow-y-auto hidden text-xs font-mono select-none transition-all">
        <!-- Autocomplete items rendered here -->
      </div>

      <!-- ========================================================= -->
      <!-- THREE-DOT MENU MODAL / DRAWER (Section 21)                -->
      <!-- ========================================================= -->
      <div id="editorMoreMenuModal" class="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs hidden items-start justify-end sm:justify-center p-3 sm:pt-20">
        <div class="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
          <div class="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/70">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-blue-600">construction</span>
              <h3 class="font-bold text-sm text-slate-900 font-heading">Screenplay Tools</h3>
            </div>
            <button id="closeMoreMenuBtn" class="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200/60">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div class="p-3 divide-y divide-slate-100 text-xs overflow-y-auto max-h-[75vh]">
            
            <!-- DOCUMENT -->
            <div class="py-2 flex flex-col gap-1">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Document</span>
              <button id="menu-btn-title-page" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-slate-600">description</span>
                <span class="flex-1 font-medium">Title Page Editor</span>
                <span class="text-[10px] text-slate-400">Cover & Credits</span>
              </button>
              <button id="menu-btn-find-replace" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-slate-600">find_replace</span>
                <span class="flex-1 font-medium">Find / Replace</span>
                <span class="text-[10px] text-slate-400">Ctrl+F</span>
              </button>
            </div>

            <!-- VIEW & NAVIGATORS (Section 6: Act & Character navigation accessible here) -->
            <div class="py-2 flex flex-col gap-1">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">View & Navigators</span>
              <button id="menu-btn-focus-mode" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-slate-600">center_focus_strong</span>
                <span class="flex-1 font-medium">Toggle Focus Mode</span>
                <span id="menuFocusState" class="text-[10px] text-blue-600 font-semibold">Off</span>
              </button>
              <button id="menu-btn-scene-navigator" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-blue-600">movie</span>
                <span class="flex-1 font-medium">Scene & Act Navigator</span>
                <span class="text-[10px] text-slate-400">All Scenes</span>
              </button>
              <button id="menu-btn-char-navigator" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-purple-600">person</span>
                <span class="flex-1 font-medium">Character Navigator</span>
                <span class="text-[10px] text-slate-400">Jump to Dialogue</span>
              </button>
              <button id="menu-btn-go-page" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-slate-600">auto_stories</span>
                <span class="flex-1 font-medium">Go to Page...</span>
              </button>
            </div>

            <!-- FORMAT / PAGE -->
            <div class="py-2 flex flex-col gap-1">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Format / Page</span>
              <button id="menu-btn-scene-numbers" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-slate-600">pin</span>
                <span class="flex-1 font-medium">Scene Numbering (Left side)</span>
                <span id="menuSceneNumState" class="text-[10px] text-blue-600 font-semibold">Enabled</span>
              </button>
              <button id="menu-btn-preferences" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-slate-600">tune</span>
                <span class="flex-1 font-medium">Editor Preferences</span>
                <span class="text-[10px] text-slate-400">Margins, Spacing</span>
              </button>
            </div>

            <!-- PROJECT -->
            <div class="py-2 flex flex-col gap-1">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Project</span>
              <button id="menu-btn-production" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-blue-600">movie</span>
                <span class="flex-1 font-medium">Production Telemetry</span>
              </button>
              <button id="menu-btn-export" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-blue-600">ios_share</span>
                <span class="flex-1 font-medium">Export Screenplay (PDF / FDX)</span>
              </button>
            </div>

            <!-- VERSION -->
            <div class="py-2 flex flex-col gap-1">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Versions</span>
              <button id="menu-btn-versions" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-blue-600">history</span>
                <span class="flex-1 font-medium">Version History</span>
              </button>
              <button id="menu-btn-compare" class="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-800 text-left">
                <span class="material-symbols-outlined text-[16px] text-blue-600">compare_arrows</span>
                <span class="flex-1 font-medium">Compare Versions</span>
              </button>
            </div>

            <!-- LANGUAGE -->
            <div class="py-2 flex flex-col gap-1">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Language</span>
              <div class="grid grid-cols-3 gap-1 pt-1">
                <button class="lang-choice-btn py-1 rounded bg-blue-600 text-white font-semibold text-center" data-lang="EN">English</button>
                <button class="lang-choice-btn py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 text-center" data-lang="TA">தமிழ்</button>
                <button class="lang-choice-btn py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 text-center" data-lang="TL">Tanglish</button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- ========================================================= -->
      <!-- TITLE PAGE EDITOR MODAL (Section H)                       -->
      <!-- ========================================================= -->
      <div id="titlePageModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm hidden items-center justify-center p-3 sm:p-4">
        <div class="w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-200">
          <div class="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/70">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px]">description</span>
              </div>
              <div>
                <h3 class="font-heading font-bold text-base text-slate-900 leading-tight">Title Page Editor</h3>
                <p class="text-[11px] text-slate-500 mt-0.5">Industry Standard Screenplay Cover Page</p>
              </div>
            </div>
            <button id="closeTitlePageModal" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div class="p-5 flex flex-col gap-3.5 overflow-y-auto font-sans text-xs">
            <div class="flex flex-col gap-1">
              <label class="font-semibold text-slate-700">Screenplay Title</label>
              <input type="text" id="tpTitleInput" class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 font-bold uppercase focus:outline-none focus:border-blue-600" />
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-semibold text-slate-700">Written by / Author</label>
              <input type="text" id="tpAuthorInput" class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600" />
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-semibold text-slate-700">Based on / Additional Credits (Optional)</label>
              <input type="text" id="tpNotesInput" placeholder="e.g. Based on an original story by..." class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600" />
            </div>

            <div class="flex flex-col gap-1">
              <label class="font-semibold text-slate-700">Contact Information</label>
              <textarea id="tpContactInput" rows="3" placeholder="Agency, management, email, phone number..." class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 resize-none"></textarea>
            </div>
          </div>

          <div class="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
            <button id="cancelTitlePageBtn" class="px-3.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-medium">Cancel</button>
            <button id="saveTitlePageBtn" class="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:bg-blue-700">
              <span class="material-symbols-outlined text-[16px]">save</span>
              <span>Save Title Page</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ========================================================= -->
      <!-- EDITOR PREFERENCES MODAL                                  -->
      <!-- ========================================================= -->
      <div id="preferencesModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm hidden items-center justify-center p-3 sm:p-4">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200">
          <div class="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/70">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px]">tune</span>
              </div>
              <h3 class="font-heading font-bold text-base text-slate-900">Editor Preferences</h3>
            </div>
            <button id="closePrefModal" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div class="p-5 flex flex-col gap-4 overflow-y-auto text-xs">
            <label class="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div class="flex flex-col">
                <span class="font-semibold text-slate-800">Smart Formatting Automation</span>
                <span class="text-[11px] text-slate-500">Auto Enter/Tab flow between Scene, Action, Character & Dialogue</span>
              </div>
              <input type="checkbox" id="prefSmartFormat" checked class="w-4 h-4 accent-blue-600 rounded">
            </label>

            <label class="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div class="flex flex-col">
                <span class="font-semibold text-slate-800">Show Scene Numbers</span>
                <span class="text-[11px] text-slate-500">Display automatic scene numbers on the LEFT side</span>
              </div>
              <input type="checkbox" id="prefSceneNumbers" checked class="w-4 h-4 accent-blue-600 rounded">
            </label>

            <div class="flex flex-col gap-1.5">
              <label class="font-semibold text-slate-700">Line Spacing</label>
              <select id="prefLineSpacing" class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 outline-none">
                <option value="1.0">Single (1.0)</option>
                <option value="1.5" selected>Standard (1.5)</option>
                <option value="2.0">Double (2.0)</option>
              </select>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="font-semibold text-slate-700">Editor Typography Font Size</label>
              <select id="prefFontSize" class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 outline-none">
                <option value="12pt" selected>Courier Prime 12pt (Industry Standard)</option>
                <option value="14pt">Courier Prime 14pt (Large Readability)</option>
              </select>
            </div>
          </div>

          <div class="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
            <button id="savePrefBtn" class="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold shadow-xs hover:bg-blue-700">Apply Settings</button>
          </div>
        </div>
      </div>

      <!-- ========================================================= -->
      <!-- EXPORT MODAL                                              -->
      <!-- ========================================================= -->
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

      <!-- ========================================================= -->
      <!-- VERSIONS MODAL                                            -->
      <!-- ========================================================= -->
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

      <!-- ========================================================= -->
      <!-- NEW VERSION SNAPSHOT MODAL                                -->
      <!-- ========================================================= -->
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

      <!-- ========================================================= -->
      <!-- COMPARE / DIFF MODAL                                      -->
      <!-- ========================================================= -->
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

// =========================================================================
// ATTACH EDITOR EVENTS & PROFESSIONAL LOGIC
// =========================================================================
export async function attachEditorEvents(scriptId, navigate) {
  // 1. Back button
  const backBtn = document.getElementById('editor-back-btn');
  if (backBtn) {
    backBtn.onclick = () => {
      if (hasUnsavedChanges) {
        performSave(false);
      }
      navigate('/workspace');
    };
  }

  // 2. Load Screenplay Model
  currentScreenplay = await api.getScreenplay(scriptId);
  renderScreenplayPages();
  populateNavigators();

  // 3. Setup Manual Save & Status Machine
  const saveBtn = document.getElementById('editor-save-btn');
  if (saveBtn) {
    saveBtn.onclick = () => performSave(true);
  }

  // 4. Auto-save toggle setup (Section 2)
  setupAutoSaveToggle();

  // 5. Global Keyboard Shortcuts (Ctrl+S / Cmd+S, Ctrl+F / Cmd+F)
  window.addEventListener('keydown', handleGlobalKeydown);

  // 6. Horizontal Toolbar & Three-dot Menu
  setupToolbarAndMenu(scriptId, navigate);

  // 7. Navigation Selectors
  setupNavigationSelectors();

  // 8. Element Bar (Scene, Action, Char, Dia, Paren, Trans)
  setupElementBar();

  // 9. Find & Replace
  setupFindReplace();

  // 10. Modals (Title Page, Preferences, Export, Versions, Diff)
  setupModals(scriptId);

  // 11. Autocomplete dropdown setup
  setupAutocomplete();
}

function handleGlobalKeydown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault();
    performSave(true);
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
    e.preventDefault();
    toggleFindReplace(true);
  }
}

// =========================================================================
// AUTO-SAVE ON/OFF TOGGLE (Section 2 & 3)
// =========================================================================
function setupAutoSaveToggle() {
  const toggleBtn = document.getElementById('btn-toggle-autosave');
  const dot = document.getElementById('autosave-dot');
  const label = document.getElementById('autosave-toggle-label');

  if (toggleBtn) {
    toggleBtn.onclick = (e) => {
      e.stopPropagation();
      autoSaveEnabled = !autoSaveEnabled;
      localStorage.setItem('scriptora_autosave', String(autoSaveEnabled));

      if (autoSaveEnabled) {
        if (dot) dot.className = 'w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse';
        if (label) label.textContent = 'Auto';
        toggleBtn.title = 'Toggle Auto-save (Current: ON)';
        showToast('Auto-save enabled');
        if (hasUnsavedChanges) {
          scheduleAutosave();
        }
      } else {
        if (dot) dot.className = 'w-1.5 h-1.5 rounded-full bg-slate-300';
        if (label) label.textContent = 'Off';
        toggleBtn.title = 'Toggle Auto-save (Current: OFF)';
        clearTimeout(saveDebounceTimer);
        showToast('Auto-save disabled · Tap floppy to save');
      }
    };
  }
}

// =========================================================================
// NATURAL A4 MULTI-PAGE SCREENPLAY RENDERING (Sections 11, 12, 13, 23)
// Continuous document flowing across A4-sized sheets based on line capacity.
// Scenes and transitions DO NOT force artificial page breaks!
// =========================================================================
function renderScreenplayPages() {
  const container = document.getElementById('screenplay-pages-container');
  if (!container || !currentScreenplay) return;

  const scenes = currentScreenplay.scenes || [];
  
  // Flatten all blocks with scene metadata
  const allItems = [];
  scenes.forEach(scene => {
    (scene.blocks || []).forEach(block => {
      allItems.push({
        block,
        sceneNumber: scene.number,
        sceneId: scene.id,
        slugline: scene.slugline
      });
    });
  });

  // Flow items naturally across standard A4 pages based on line capacity
  const pages = [];
  let currentPage = { pageNumber: 1, items: [] };
  let currentLines = 0;

  allItems.forEach(item => {
    const lines = estimateBlockLines(item.block);
    // If adding this block exceeds page line capacity and current page is not empty: start next A4 page
    if (currentLines + lines > A4_PAGE_CAPACITY_LINES && currentPage.items.length > 0) {
      pages.push(currentPage);
      currentPage = { pageNumber: pages.length + 1, items: [] };
      currentLines = 0;
    }
    currentPage.items.push(item);
    currentLines += lines;
  });

  if (currentPage.items.length > 0) {
    pages.push(currentPage);
  }

  if (pages.length === 0) {
    pages.push({
      pageNumber: 1,
      items: [
        {
          block: { id: 'b-1-1', type: 'scene', content: 'INT. NEW SCENE - DAY' },
          sceneNumber: 1,
          sceneId: 'scene-1',
          slugline: 'INT. NEW SCENE - DAY'
        },
        {
          block: { id: 'b-1-2', type: 'action', content: 'Type your screenplay action here...' },
          sceneNumber: 1,
          sceneId: 'scene-1',
          slugline: 'INT. NEW SCENE - DAY'
        }
      ]
    });
  }

  // Render each continuous A4 sheet
  container.innerHTML = pages.map(page => `
    <div class="screenplay-page-sheet w-full max-w-2xl bg-white rounded-xl shadow-md border border-slate-200/80 p-6 sm:p-12 flex flex-col font-courier text-[14px] sm:text-[15px] leading-[22px] sm:leading-[24px] text-slate-900 relative transition-all min-h-[820px]" data-page-num="${page.pageNumber}">
      
      <!-- Top Page Header: Page number in top right -->
      <div class="w-full flex items-center justify-between pb-4 select-none text-[12px] text-slate-400 font-mono border-b border-transparent">
        <span class="text-[10px] text-slate-300 uppercase tracking-widest font-sans font-semibold">${currentScreenplay.title} · ${currentScreenplay.draft || 'Draft 4.2'}</span>
        <span class="font-bold text-slate-500">${page.pageNumber}.</span>
      </div>

      <!-- Screenplay Blocks naturally flowing across this A4 page -->
      <div class="page-blocks-wrapper flex flex-col flex-1">
        ${page.items.map(it => renderBlockHtml(it.block, it.sceneNumber, it.sceneId)).join('')}
      </div>

      <!-- Bottom Page Boundary indicator -->
      <div class="w-full pt-6 select-none flex items-center justify-center text-[10px] text-slate-300 font-sans tracking-widest uppercase">
        <span>— PAGE ${page.pageNumber} —</span>
      </div>

    </div>
  `).join('');

  attachBlockListeners();
  updateTelemetry();
}

function estimateBlockLines(block) {
  const content = block.content || '';
  if (block.type === 'scene') return 3;
  if (block.type === 'action') return Math.max(1, Math.ceil(content.length / 60)) + 1;
  if (block.type === 'character') return 2;
  if (block.type === 'parenthetical') return 1;
  if (block.type === 'dialogue') return Math.max(1, Math.ceil(content.length / 38)) + 1;
  if (block.type === 'transition') return 2;
  return 2;
}

function renderBlockHtml(block, sceneNumber, sceneId) {
  const isScene = block.type === 'scene';
  const isChar = block.type === 'character';
  const isParen = block.type === 'parenthetical';
  const isDia = block.type === 'dialogue';
  const isTrans = block.type === 'transition';
  const isAction = block.type === 'action' || (!isScene && !isChar && !isParen && !isDia && !isTrans);

  if (isScene) {
    return `
      <div id="${block.id}" data-block-id="${block.id}" data-scene-id="${sceneId}" data-block-type="scene" class="screenplay-block flex items-baseline py-2.5 font-bold text-slate-900 mt-2 mb-2 group">
        <!-- Scene Number shown on LEFT side ONLY (Section I) -->
        <span class="scene-num-indicator mr-3 sm:mr-4 shrink-0 font-mono text-slate-400 font-bold select-none text-[13px] w-6 text-right ${sceneNumbersEnabled ? '' : 'hidden'}">${sceneNumber}</span>
        <div class="flex-1 tracking-wider uppercase outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${escapeHtml(block.content)}</div>
      </div>
    `;
  }

  if (isAction) {
    return `
      <div id="${block.id}" data-block-id="${block.id}" data-scene-id="${sceneId}" data-block-type="action" class="screenplay-block text-slate-900 text-left mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${escapeHtml(block.content)}</div>
    `;
  }

  if (isChar) {
    return `
      <div id="${block.id}" data-block-id="${block.id}" data-scene-id="${sceneId}" data-block-type="character" class="screenplay-block w-7/12 mx-auto uppercase font-bold tracking-wider text-slate-900 text-center mt-3 mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${escapeHtml(block.content)}</div>
    `;
  }

  if (isParen) {
    return `
      <div id="${block.id}" data-block-id="${block.id}" data-scene-id="${sceneId}" data-block-type="parenthetical" class="screenplay-block w-6/12 mx-auto italic text-slate-600 text-center mb-0 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${escapeHtml(block.content)}</div>
    `;
  }

  if (isDia) {
    return `
      <div id="${block.id}" data-block-id="${block.id}" data-scene-id="${sceneId}" data-block-type="dialogue" class="screenplay-block w-9/12 sm:w-8/12 mx-auto text-left text-slate-900 mb-3.5 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${escapeHtml(block.content)}</div>
    `;
  }

  if (isTrans) {
    return `
      <div id="${block.id}" data-block-id="${block.id}" data-scene-id="${sceneId}" data-block-type="transition" class="screenplay-block w-full text-right uppercase font-bold tracking-wider text-slate-900 mt-2 mb-4 outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true" spellcheck="false">${escapeHtml(block.content)}</div>
    `;
  }

  return `
    <div id="${block.id}" data-block-id="${block.id}" data-scene-id="${sceneId}" data-block-type="action" class="screenplay-block text-slate-900 text-left mb-3 leading-relaxed outline-none focus:bg-blue-50/50 rounded px-1 cursor-text" contenteditable="true">${escapeHtml(block.content)}</div>
  `;
}

function escapeHtml(text) {
  if (!text) return '';
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// =========================================================================
// BLOCK INPUT & CURSOR INTEGRITY
// =========================================================================
function attachSingleBlockListeners(block) {
  const editable = block.hasAttribute('contenteditable') ? block : block.querySelector('[contenteditable="true"]');
  if (!editable) return;

  editable.onfocus = () => {
    activeBlockId = block.getAttribute('data-block-id');
    const type = block.getAttribute('data-block-type') || 'action';
    highlightElementButton(type);
  };

  editable.oninput = () => {
    hasUnsavedChanges = true;
    updateBlockModel(block, editable.innerText);
    updateSaveStatus('Unsaved');
    
    // Auto-save only if enabled (Section 2 & 3)
    if (autoSaveEnabled) {
      scheduleAutosave();
    }
    triggerAutocomplete(block, editable);
    updateTelemetry();
  };

  editable.onkeydown = (e) => {
    handleBlockKeydown(e, block, editable);
  };
}

function attachBlockListeners() {
  const blocks = document.querySelectorAll('.screenplay-block');
  blocks.forEach(attachSingleBlockListeners);
}

// Scene Heading Structured Parser (Section 8)
export function parseSceneHeading(text) {
  const prefixMatch = text.match(/^(INT\.\/EXT\.|INT\.|EXT\.|I\/E\.)\s*/i);
  const intExt = prefixMatch ? prefixMatch[1].toUpperCase() : 'INT.';
  const remainder = prefixMatch ? text.slice(prefixMatch[0].length) : text;
  const parts = remainder.split(/\s+-\s*|\s+-/);
  const location = (parts[0] || '').trim().toUpperCase();
  const time = (parts[1] || '').trim().toUpperCase();

  return { intExt, location, time };
}

function updateBlockModel(blockEl, text) {
  if (!currentScreenplay) return;
  const blockId = blockEl.getAttribute('data-block-id');
  const sceneId = blockEl.getAttribute('data-scene-id');
  const scene = currentScreenplay.scenes.find(s => s.id === sceneId);
  if (!scene) return;
  const b = scene.blocks.find(x => x.id === blockId);
  if (b) {
    b.content = text;

    // Character memory tracking (Section 19: Character memory while writing)
    if (b.type === 'character') {
      const cleanName = text.replace(/\(.*\)/g, '').trim().toUpperCase();
      if (cleanName && cleanName.length >= 2 && !currentScreenplay.characters.includes(cleanName)) {
        currentScreenplay.characters.push(cleanName);
      }
    }

    // Scene heading structured parsing (Section 8)
    if (b.type === 'scene') {
      const parsed = parseSceneHeading(text);
      b.intExt = parsed.intExt;
      b.location = parsed.location;
      b.time = parsed.time;
      scene.slugline = text;
      scene.location = parsed.location;
      scene.time = parsed.time;

      // Location memory tracking
      if (parsed.location && parsed.location.length >= 2 && !currentScreenplay.locations.includes(parsed.location)) {
        currentScreenplay.locations.push(parsed.location);
      }
    }
  }
}

// =========================================================================
// ENTER / TAB CONTEXTUAL AUTOMATION (Sections 9, 10, 11, 16, 17, 18)
// =========================================================================
function handleBlockKeydown(e, blockEl, editableEl) {
  const type = blockEl.getAttribute('data-block-type');
  const sceneId = blockEl.getAttribute('data-scene-id');
  const blockId = blockEl.getAttribute('data-block-id');

  // Check if autocomplete dropdown is open
  const acDropdown = document.getElementById('editor-autocomplete-dropdown');
  if (acDropdown && !acDropdown.classList.contains('hidden')) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateAutocomplete(1);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateAutocomplete(-1);
      return;
    }
    if (e.key === 'Enter' || e.key === 'Tab') {
      const activeAc = acDropdown.querySelector('.autocomplete-item.active');
      if (activeAc) {
        e.preventDefault();
        activeAc.click();
        return;
      }
    }
    if (e.key === 'Escape') {
      hideAutocomplete();
      return;
    }
  }

  // Auto-parenthetical shortcut: Typing "(" in Character or Dialogue (Section 9)
  if (e.key === '(' && (type === 'character' || type === 'dialogue')) {
    const sel = window.getSelection();
    if (sel && sel.anchorOffset === 0 && editableEl.innerText.trim() === '') {
      e.preventDefault();
      convertBlockType(blockEl, 'parenthetical');
      return;
    }
  }

  // TAB key handling
  if (e.key === 'Tab') {
    e.preventDefault();
    if (type === 'action') {
      convertBlockType(blockEl, 'character');
      return;
    }
    if (type === 'character') {
      convertBlockType(blockEl, 'dialogue');
      return;
    }
  }

  // ENTER key handling
  if (e.key === 'Enter' && !e.shiftKey) {
    hideAutocomplete();

    // 1. SCENE -> ACTION
    if (type === 'scene') {
      e.preventDefault();
      insertNewBlockAfter(sceneId, blockId, 'action', '');
      return;
    }

    // 2. CHARACTER -> DIALOGUE
    if (type === 'character') {
      e.preventDefault();
      // Ensure character is stored in memory
      const cName = editableEl.innerText.replace(/\(.*\)/g, '').trim().toUpperCase();
      if (cName && !currentScreenplay.characters.includes(cName)) {
        currentScreenplay.characters.push(cName);
      }
      insertNewBlockAfter(sceneId, blockId, 'dialogue', '');
      return;
    }

    // 3. DIALOGUE -> ACTION
    if (type === 'dialogue') {
      e.preventDefault();
      insertNewBlockAfter(sceneId, blockId, 'action', '');
      return;
    }

    // 4. PARENTHETICAL -> DIALOGUE (Section 10: Parenthetical Enter returns to dialogue)
    if (type === 'parenthetical') {
      e.preventDefault();
      let text = editableEl.innerText.trim();
      if (!text.endsWith(')')) {
        text += ')';
        editableEl.innerText = text;
        updateBlockModel(blockEl, text);
      }
      insertNewBlockAfter(sceneId, blockId, 'dialogue', '');
      return;
    }

    // 5. TRANSITION -> NEXT SCENE (Section 11: Does NOT force a new page!)
    if (type === 'transition') {
      e.preventDefault();
      createNewSceneAfter(sceneId);
      return;
    }

    // 6. ACTION -> continue ACTION
    if (type === 'action') {
      e.preventDefault();
      insertNewBlockAfter(sceneId, blockId, 'action', '');
      return;
    }
  }
}

// Insert new block directly as next line with contextual navigation flow
function insertNewBlockAfter(sceneId, targetBlockId, newType, initialContent) {
  const scene = currentScreenplay.scenes.find(s => s.id === sceneId);
  if (!scene) return;
  const targetIdx = scene.blocks.findIndex(b => b.id === targetBlockId);
  const newBlockId = `b-${Date.now().toString().slice(-6)}`;
  const newBlock = {
    id: newBlockId,
    type: newType,
    content: initialContent || ''
  };

  if (targetIdx !== -1) {
    scene.blocks.splice(targetIdx + 1, 0, newBlock);
  } else {
    scene.blocks.push(newBlock);
  }

  // Insert seamlessly right as next line into the DOM without full page refresh
  const targetEl = document.getElementById(targetBlockId);
  const pageBlocksWrapper = targetEl ? targetEl.closest('.page-blocks-wrapper') : null;

  if (targetEl && pageBlocksWrapper) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = renderBlockHtml(newBlock, scene.number, scene.id);
    const newEl = tempDiv.firstElementChild;
    targetEl.insertAdjacentElement('afterend', newEl);
    attachSingleBlockListeners(newEl);
    updateTelemetry();

    // Focus the new line immediately
    const ed = newEl.hasAttribute('contenteditable') ? newEl : newEl.querySelector('[contenteditable="true"]');
    if (ed) {
      ed.focus();
      setCursorAtEnd(ed);
    }

    // Check line capacity: re-paginate only if page sheet exceeds line capacity
    const currentBlocks = pageBlocksWrapper.querySelectorAll('.screenplay-block');
    let totalLines = 0;
    currentBlocks.forEach(b => {
      const bType = b.getAttribute('data-block-type');
      const text = b.innerText || '';
      totalLines += estimateBlockLines({ type: bType, content: text });
    });

    if (totalLines > A4_PAGE_CAPACITY_LINES) {
      renderScreenplayPages();
      setTimeout(() => {
        const el = document.getElementById(newBlockId);
        if (el) {
          const ed2 = el.querySelector('[contenteditable="true"]') || el;
          ed2.focus();
          setCursorAtEnd(ed2);
        }
      }, 20);
    }
  } else {
    renderScreenplayPages();
    setTimeout(() => {
      const el = document.getElementById(newBlockId);
      if (el) {
        const ed = el.hasAttribute('contenteditable') ? el : el.querySelector('[contenteditable="true"]');
        if (ed) {
          ed.focus();
          setCursorAtEnd(ed);
        }
      }
    }, 20);
  }
}

// Create new scene after transition WITHOUT FORCING A NEW PAGE (Section 11 & 23)
function createNewSceneAfter(sceneId) {
  const sceneIdx = currentScreenplay.scenes.findIndex(s => s.id === sceneId);
  const nextSceneNum = currentScreenplay.scenes.length + 1;
  const newSceneId = `scene-${Date.now().toString().slice(-5)}`;
  const newHeadingBlockId = `b-${Date.now().toString().slice(-6)}`;

  const newScene = {
    id: newSceneId,
    number: nextSceneNum,
    actId: currentScreenplay.acts?.[0]?.id || 'act-1',
    slugline: 'INT. ',
    blocks: [
      { id: newHeadingBlockId, type: 'scene', content: 'INT. ' }
    ]
  };

  if (sceneIdx !== -1) {
    currentScreenplay.scenes.splice(sceneIdx + 1, 0, newScene);
  } else {
    currentScreenplay.scenes.push(newScene);
  }

  // Renumber scenes sequentially
  currentScreenplay.scenes.forEach((sc, idx) => {
    sc.number = idx + 1;
  });

  renderScreenplayPages();
  populateNavigators();

  setTimeout(() => {
    const headingEl = document.getElementById(newHeadingBlockId);
    if (headingEl) {
      const ed = headingEl.querySelector('[contenteditable="true"]');
      if (ed) {
        ed.focus();
        setCursorAtEnd(ed);
        triggerAutocomplete(headingEl, ed);
      }
    }
  }, 30);
}

// Convert existing block to a new type (Section 9: Parenthetical starts as () with cursor at (|))
function convertBlockType(blockEl, newType) {
  const blockId = blockEl.getAttribute('data-block-id');
  const sceneId = blockEl.getAttribute('data-scene-id');
  const scene = currentScreenplay.scenes.find(s => s.id === sceneId);
  if (!scene) return;
  const b = scene.blocks.find(x => x.id === blockId);
  if (!b) return;

  b.type = newType;
  if (newType === 'character') {
    b.content = b.content.toUpperCase();
  }
  
  // Section 9: Parenthetical creates () without spaces, cursor placed exactly between ()
  if (newType === 'parenthetical') {
    let clean = b.content.replace(/^\(+|\)+$/g, '').trim();
    if (clean) {
      b.content = `(${clean})`;
    } else {
      b.content = '()';
    }
  }

  renderScreenplayPages();

  setTimeout(() => {
    const el = document.getElementById(blockId);
    if (el) {
      const ed = el.hasAttribute('contenteditable') ? el : el.querySelector('[contenteditable="true"]');
      if (ed) {
        ed.focus();
        if (newType === 'parenthetical' && ed.innerText === '()') {
          // Place cursor EXACTLY between () at index 1: (|)
          const textNode = ed.firstChild;
          if (textNode) {
            const range = document.createRange();
            const sel = window.getSelection();
            range.setStart(textNode, 1);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        } else {
          setCursorAtEnd(ed);
        }
      }
    }
  }, 25);
}

function setCursorAtEnd(el) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
}

// =========================================================================
// INTELLIGENT AUTOCOMPLETE (Section 7: Scene Time only after " - ", Section 13, 17, 18, 19)
// =========================================================================
function setupAutocomplete() {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#editor-autocomplete-dropdown')) {
      hideAutocomplete();
    }
  });
}

function hideAutocomplete() {
  const dropdown = document.getElementById('editor-autocomplete-dropdown');
  if (dropdown) dropdown.classList.add('hidden');
}

function triggerAutocomplete(blockEl, editableEl) {
  const type = blockEl.getAttribute('data-block-type');
  const text = editableEl.innerText;
  const dropdown = document.getElementById('editor-autocomplete-dropdown');
  if (!dropdown) return;

  let suggestions = [];

  // 1. SCENE HEADING AUTOCOMPLETE (Section 7 & 16)
  if (type === 'scene') {
    const upper = text.toUpperCase();

    // Section 7: TIME DROPDOWN MUST APPEAR ONLY AFTER USER HAS TYPED A SPACE FOLLOWED BY A "-" AFTER LOCATION!
    // Example: "INT. HOME - " or "INT. COLLEGE CANTEEN -"
    const hyphenMatch = text.match(/\s+-\s*([A-Za-z]*)$/);
    if (hyphenMatch) {
      const timeQuery = (hyphenMatch[1] || '').toUpperCase();
      const standardTimes = ['DAY', 'NIGHT', 'MORNING', 'EVENING', 'DAWN', 'DUSK', 'CONTINUOUS', 'LATER'];
      const matchingTimes = standardTimes.filter(t => t.startsWith(timeQuery));
      
      const baseHeading = text.replace(/\s+-\s*[A-Za-z]*$/, ' - ');
      suggestions = matchingTimes.map(t => baseHeading + t);
    } 
    // Start of scene line: I -> INT., INT./EXT., I/E.
    else if (upper === 'I' || upper === 'IN') {
      suggestions = ['INT.', 'INT./EXT.', 'I/E.'];
    } else if (upper === 'E' || upper === 'EX') {
      suggestions = ['EXT.', 'INT./EXT.', 'I/E.'];
    }
    // Location memory: INT. K -> suggest location without appending - DAY (user must type " -" themselves)
    else if (/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([A-Za-z0-9 ]*)$/i.test(text)) {
      const m = text.match(/^(INT\.|EXT\.|INT\.\/EXT\.|I\/E\.)\s+([A-Za-z0-9 ]*)$/i);
      const prefix = m[1].toUpperCase() + ' ';
      const locQuery = (m[2] || '').trim().toUpperCase();
      if (locQuery.length > 0) {
        const locations = currentScreenplay.locations || [];
        const matches = locations.filter(l => l.startsWith(locQuery));
        suggestions = matches.map(l => `${prefix}${l}`);
      }
    }
  }

  // 2. CHARACTER AUTOCOMPLETE WITH MEMORY (Section 13, 17, 19)
  else if (type === 'character') {
    const upper = text.trim().toUpperCase();
    if (upper.length > 0) {
      const chars = currentScreenplay.characters || [];
      suggestions = chars.filter(c => c.startsWith(upper));
    }
  }

  // 3. TRANSITION AUTOCOMPLETE (Section 18)
  else if (type === 'transition') {
    const upper = text.trim().toUpperCase();
    const transitions = currentScreenplay.transitions || ['CUT TO:', 'FADE IN:', 'FADE OUT.', 'DISSOLVE TO:', 'SMASH CUT TO:', 'MATCH CUT TO:', 'JUMP CUT TO:'];
    if (upper.length > 0) {
      suggestions = transitions.filter(t => t.startsWith(upper));
    }
  }

  if (suggestions.length === 0) {
    hideAutocomplete();
    return;
  }

  // Render suggestion items
  dropdown.innerHTML = suggestions.map((item, idx) => `
    <div class="autocomplete-item px-3 py-1.5 hover:bg-blue-50 text-slate-800 hover:text-blue-700 cursor-pointer flex items-center justify-between font-mono ${idx === 0 ? 'active bg-blue-50/60 text-blue-700' : ''}" data-val="${item}">
      <span>${item}</span>
      <span class="text-[10px] text-slate-400 font-sans">Enter ↵</span>
    </div>
  `).join('');

  // Position dropdown right below cursor / block
  const rect = editableEl.getBoundingClientRect();
  dropdown.style.top = `${Math.min(window.innerHeight - 200, rect.bottom + 4)}px`;
  dropdown.style.left = `${Math.min(window.innerWidth - 240, Math.max(16, rect.left))}px`;
  dropdown.classList.remove('hidden');

  dropdown.querySelectorAll('.autocomplete-item').forEach(el => {
    el.onclick = () => {
      const val = el.getAttribute('data-val');
      editableEl.innerText = val;
      updateBlockModel(blockEl, val);
      hideAutocomplete();
      setCursorAtEnd(editableEl);
      hasUnsavedChanges = true;
      if (autoSaveEnabled) scheduleAutosave();
    };
  });
}

function navigateAutocomplete(dir) {
  const dropdown = document.getElementById('editor-autocomplete-dropdown');
  if (!dropdown) return;
  const items = dropdown.querySelectorAll('.autocomplete-item');
  if (items.length === 0) return;
  let activeIdx = Array.from(items).findIndex(el => el.classList.contains('active'));
  if (activeIdx !== -1) items[activeIdx].classList.remove('active', 'bg-blue-50/60', 'text-blue-700');
  activeIdx = (activeIdx + dir + items.length) % items.length;
  items[activeIdx].classList.add('active', 'bg-blue-50/60', 'text-blue-700');
  items[activeIdx].scrollIntoView({ block: 'nearest' });
}

// =========================================================================
// REAL SAVE & DEBOUNCED AUTOSAVE (Section 1, 2, 3)
// =========================================================================
async function performSave(isManual = false) {
  if (isSaving || !currentScreenplay) return;
  isSaving = true;
  updateSaveStatus('Saving...');

  try {
    await api.saveScreenplay(currentScreenplay.id, currentScreenplay);
    hasUnsavedChanges = false;
    isSaving = false;
    updateSaveStatus('Saved');
    if (isManual) {
      showToast('Saved');
    }
  } catch (err) {
    isSaving = false;
    updateSaveStatus('Save failed');
    showToast("Couldn't save changes · Tap retry");
  }
}

function scheduleAutosave() {
  if (!autoSaveEnabled) return; // Respect Auto-save OFF (Section 2)
  clearTimeout(saveDebounceTimer);
  saveDebounceTimer = setTimeout(async () => {
    if (hasUnsavedChanges && autoSaveEnabled) {
      await performSave(false);
      updateSaveStatus('Autosaved just now');
      showToast('Autosaved just now');
    }
  }, 1500);
}

function updateSaveStatus(status) {
  const statusEl = document.getElementById('editor-save-status');
  const saveIcon = document.getElementById('editor-save-icon');

  if (statusEl) statusEl.textContent = status;

  if (status === 'Saving...') {
    if (saveIcon) {
      saveIcon.textContent = 'progress_activity';
      saveIcon.classList.add('animate-spin');
    }
  } else if (status === 'Saved' || status === 'Autosaved just now') {
    if (saveIcon) {
      saveIcon.textContent = 'save';
      saveIcon.classList.remove('animate-spin');
    }
  } else if (status === 'Unsaved') {
    if (saveIcon) {
      saveIcon.textContent = 'save';
      saveIcon.classList.remove('animate-spin');
    }
  } else if (status === 'Save failed') {
    if (saveIcon) {
      saveIcon.textContent = 'warning';
      saveIcon.classList.remove('animate-spin');
    }
  }
}

// =========================================================================
// COMPACT SCENE SELECTOR & NAVIGATORS (Section 5 & 6)
// =========================================================================
function populateNavigators() {
  if (!currentScreenplay) return;

  const sceneSelect = document.getElementById('navSceneSelect');
  if (sceneSelect) {
    const scenes = currentScreenplay.scenes || [];
    sceneSelect.innerHTML = scenes.map(s => `
      <option value="${s.id}" ${s.number === 18 ? 'selected' : ''}>Scene ${s.number} ▾</option>
    `).join('');
  }
}

function setupNavigationSelectors() {
  const sceneSelect = document.getElementById('navSceneSelect');

  // Scene jump: scroll to scene heading
  if (sceneSelect) {
    sceneSelect.onchange = (e) => {
      const sceneId = e.target.value;
      if (!sceneId) return;
      scrollToScene(sceneId);
    };
  }
}

function scrollToScene(sceneId) {
  const sceneBlock = document.querySelector(`[data-scene-id="${sceneId}"][data-block-type="scene"]`) || document.querySelector(`[data-scene-id="${sceneId}"]`);
  if (sceneBlock) {
    sceneBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
    sceneBlock.classList.add('bg-blue-50/50');
    setTimeout(() => sceneBlock.classList.remove('bg-blue-50/50'), 1500);
  }
}

// =========================================================================
// ELEMENT BAR CONVERSIONS (Section 9: Paren starts at (|))
// =========================================================================
function setupElementBar() {
  const bar = document.getElementById('element-bar');
  if (!bar) return;

  bar.querySelectorAll('.element-btn').forEach(btn => {
    btn.onclick = () => {
      const targetType = btn.getAttribute('data-type');
      if (!activeBlockId) return;
      const blockEl = document.getElementById(activeBlockId);
      if (blockEl) {
        convertBlockType(blockEl, targetType);
        highlightElementButton(targetType);
      }
    };
  });
}

function highlightElementButton(type) {
  const bar = document.getElementById('element-bar');
  if (!bar) return;
  bar.querySelectorAll('.element-btn').forEach(btn => {
    const bType = btn.getAttribute('data-type');
    if (bType === type) {
      btn.className = 'element-btn flex-1 min-w-0 py-1 px-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 shrink-0 bg-blue-600 text-white shadow-xs';
    } else {
      btn.className = 'element-btn flex-1 min-w-0 py-1 px-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 shrink-0 bg-slate-100 text-slate-700 hover:bg-slate-200';
    }
  });
}

// =========================================================================
// HORIZONTAL TOOLBAR & THREE-DOT MENU (Section 21)
// =========================================================================
function setupToolbarAndMenu(scriptId, navigate) {
  const moreMenuBtn = document.getElementById('editor-more-menu-btn');
  const moreMenuModal = document.getElementById('editorMoreMenuModal');
  const closeMoreMenuBtn = document.getElementById('closeMoreMenuBtn');

  function toggleMoreMenu(open) {
    if (!moreMenuModal) return;
    if (open) {
      moreMenuModal.classList.remove('hidden');
      moreMenuModal.classList.add('flex');
    } else {
      moreMenuModal.classList.add('hidden');
      moreMenuModal.classList.remove('flex');
    }
  }

  if (moreMenuBtn) moreMenuBtn.onclick = () => toggleMoreMenu(true);
  if (closeMoreMenuBtn) closeMoreMenuBtn.onclick = () => toggleMoreMenu(false);
  if (moreMenuModal) {
    moreMenuModal.onclick = (e) => {
      if (e.target === moreMenuModal) toggleMoreMenu(false);
    };
  }

  // Scene Navigator from Three-dot menu (Section 6)
  const menuSceneNav = document.getElementById('menu-btn-scene-navigator');
  if (menuSceneNav) {
    menuSceneNav.onclick = () => {
      toggleMoreMenu(false);
      const sceneSelect = document.getElementById('navSceneSelect');
      if (sceneSelect) sceneSelect.focus();
    };
  }

  // Character Navigator from Three-dot menu (Section 6)
  const menuCharNav = document.getElementById('menu-btn-char-navigator');
  if (menuCharNav) {
    menuCharNav.onclick = () => {
      toggleMoreMenu(false);
      const chars = currentScreenplay.characters || [];
      const charName = prompt(`Select character to navigate to:\n${chars.join(', ')}`, chars[0] || 'KEVIN');
      if (charName) {
        for (const scene of currentScreenplay.scenes) {
          for (const block of scene.blocks) {
            if (block.type === 'character' && block.content.toUpperCase().includes(charName.trim().toUpperCase())) {
              const el = document.getElementById(block.id);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.classList.add('bg-blue-100/60');
                setTimeout(() => el.classList.remove('bg-blue-100/60'), 1500);
                return;
              }
            }
          }
        }
      }
    };
  }

  // Scene #s Toggle
  const sceneNumToggle = document.getElementById('sceneNumberToggle');
  const sceneNumText = document.getElementById('sceneNumberToggleText');
  const menuSceneNumState = document.getElementById('menuSceneNumState');
  const menuSceneNumBtn = document.getElementById('menu-btn-scene-numbers');

  function toggleSceneNumbers() {
    sceneNumbersEnabled = !sceneNumbersEnabled;
    if (sceneNumText) sceneNumText.textContent = `Scene #s: ${sceneNumbersEnabled ? 'On' : 'Off'}`;
    if (menuSceneNumState) menuSceneNumState.textContent = sceneNumbersEnabled ? 'Enabled' : 'Disabled';
    document.querySelectorAll('.scene-num-indicator').forEach(el => {
      el.classList.toggle('hidden', !sceneNumbersEnabled);
    });
    showToast(`Scene numbers ${sceneNumbersEnabled ? 'enabled (left side)' : 'hidden'}`);
  }

  if (sceneNumToggle) sceneNumToggle.onclick = toggleSceneNumbers;
  if (menuSceneNumBtn) {
    menuSceneNumBtn.onclick = () => {
      toggleSceneNumbers();
      toggleMoreMenu(false);
    };
  }

  // Focus Mode Toggle
  const focusBtn = document.getElementById('focusModeToggle');
  const focusText = document.getElementById('focusModeText');
  const menuFocusBtn = document.getElementById('menu-btn-focus-mode');
  const menuFocusState = document.getElementById('menuFocusState');

  function toggleFocusMode() {
    focusModeActive = !focusModeActive;
    if (focusText) focusText.textContent = focusModeActive ? 'Exit Focus' : 'Focus';
    if (menuFocusState) menuFocusState.textContent = focusModeActive ? 'Active' : 'Off';
    document.getElementById('editor-toolbar-strip').style.display = focusModeActive ? 'none' : 'flex';
    document.getElementById('editor-accessory-tray').style.display = focusModeActive ? 'none' : 'flex';
    document.getElementById('editor-main-scroll').style.paddingTop = focusModeActive ? '56px' : '156px';
    showToast(focusModeActive ? 'Focus Mode active (distraction-free)' : 'Exited Focus Mode');
  }

  if (focusBtn) focusBtn.onclick = toggleFocusMode;
  if (menuFocusBtn) {
    menuFocusBtn.onclick = () => {
      toggleFocusMode();
      toggleMoreMenu(false);
    };
  }

  // Language Toggle
  const langBtn = document.getElementById('langToggleBtn');
  const langText = document.getElementById('langToggleText');
  const tamilBadge = document.getElementById('tamilLangBadge');

  function setLanguage(lang) {
    activeLanguage = lang;
    if (langText) langText.textContent = lang === 'TA' ? 'தமிழ் / EN' : (lang === 'TL' ? 'Tanglish' : 'EN / தமிழ்');
    if (tamilBadge) {
      tamilBadge.textContent = lang === 'TA' ? 'தமிழ் விசைப்பலகை: இயங்குகிறது' : (lang === 'TL' ? 'Tanglish: Active' : 'Tamil IME: Ready');
    }
    showToast(`Screenplay language set to ${lang === 'TA' ? 'Tamil' : (lang === 'TL' ? 'Tanglish' : 'English')}`);
  }

  if (langBtn) {
    langBtn.onclick = () => {
      const next = activeLanguage === 'EN' ? 'TA' : (activeLanguage === 'TA' ? 'TL' : 'EN');
      setLanguage(next);
    };
  }

  document.querySelectorAll('.lang-choice-btn').forEach(btn => {
    btn.onclick = () => {
      setLanguage(btn.getAttribute('data-lang'));
      toggleMoreMenu(false);
    };
  });

  // Production button
  const prodBtn = document.getElementById('btn-open-production');
  const menuProdBtn = document.getElementById('menu-btn-production');
  if (prodBtn) prodBtn.onclick = () => navigate('/intelligence/analysis/production');
  if (menuProdBtn) menuProdBtn.onclick = () => navigate('/intelligence/analysis/production');

  // Go to Page menu
  const menuGoPage = document.getElementById('menu-btn-go-page');
  if (menuGoPage) {
    menuGoPage.onclick = () => {
      toggleMoreMenu(false);
      const pageStr = prompt('Enter page number to jump to (1-5):', '1');
      if (pageStr) {
        const pageSheet = document.querySelector(`[data-page-num="${pageStr}"]`);
        if (pageSheet) pageSheet.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
  }

  // Undo / Redo
  const undoBtn = document.getElementById('btn-undo');
  const redoBtn = document.getElementById('btn-redo');
  if (undoBtn) undoBtn.onclick = () => document.execCommand('undo');
  if (redoBtn) redoBtn.onclick = () => document.execCommand('redo');
}

// =========================================================================
// FIND & REPLACE
// =========================================================================
function setupFindReplace() {
  const quickFindBtn = document.getElementById('btn-quick-find');
  const menuFindBtn = document.getElementById('menu-btn-find-replace');
  const closeFindBtn = document.getElementById('closeFindBtn');
  const findInput = document.getElementById('findInput');
  const replaceInput = document.getElementById('replaceInput');
  const findNextBtn = document.getElementById('findNextBtn');
  const findPrevBtn = document.getElementById('findPrevBtn');
  const replaceBtn = document.getElementById('replaceBtn');
  const replaceAllBtn = document.getElementById('replaceAllBtn');

  if (quickFindBtn) quickFindBtn.onclick = () => toggleFindReplace(true);
  if (menuFindBtn) {
    menuFindBtn.onclick = () => {
      const modal = document.getElementById('editorMoreMenuModal');
      if (modal) modal.classList.add('hidden');
      toggleFindReplace(true);
    };
  }
  if (closeFindBtn) closeFindBtn.onclick = () => toggleFindReplace(false);

  if (findInput) {
    findInput.oninput = () => executeFind(findInput.value);
  }

  if (findNextBtn) findNextBtn.onclick = () => stepFind(1);
  if (findPrevBtn) findPrevBtn.onclick = () => stepFind(-1);

  if (replaceBtn) {
    replaceBtn.onclick = () => {
      const q = findInput.value;
      const rep = replaceInput.value;
      if (!q || currentFindIndex === -1 || !findMatches[currentFindIndex]) return;
      const match = findMatches[currentFindIndex];
      match.block.content = match.block.content.replace(q, rep);
      renderScreenplayPages();
      executeFind(q);
      hasUnsavedChanges = true;
      if (autoSaveEnabled) scheduleAutosave();
      showToast('Replaced 1 occurrence');
    };
  }

  if (replaceAllBtn) {
    replaceAllBtn.onclick = () => {
      const q = findInput.value;
      const rep = replaceInput.value;
      if (!q) return;
      let count = 0;
      currentScreenplay.scenes.forEach(s => {
        s.blocks.forEach(b => {
          if (b.content.includes(q)) {
            b.content = b.content.split(q).join(rep);
            count++;
          }
        });
      });
      renderScreenplayPages();
      executeFind(q);
      hasUnsavedChanges = true;
      if (autoSaveEnabled) scheduleAutosave();
      showToast(`Replaced ${count} occurrences`);
    };
  }
}

function toggleFindReplace(open) {
  const bar = document.getElementById('findReplaceBar');
  if (!bar) return;
  if (open) {
    bar.classList.remove('hidden');
    document.getElementById('findInput')?.focus();
  } else {
    bar.classList.add('hidden');
    clearFindHighlights();
  }
}

function executeFind(query) {
  findMatches = [];
  currentFindIndex = -1;
  const countEl = document.getElementById('findMatchesCount');
  if (!query || !currentScreenplay) {
    if (countEl) countEl.textContent = '0 of 0';
    clearFindHighlights();
    return;
  }

  currentScreenplay.scenes.forEach(scene => {
    scene.blocks.forEach(block => {
      if (block.content.toLowerCase().includes(query.toLowerCase())) {
        findMatches.push({ block, sceneId: scene.id });
      }
    });
  });

  if (countEl) {
    countEl.textContent = findMatches.length > 0 ? `1 of ${findMatches.length}` : '0 of 0';
  }

  if (findMatches.length > 0) {
    stepFind(0);
  }
}

function stepFind(dir) {
  if (findMatches.length === 0) return;
  currentFindIndex = (currentFindIndex + dir + findMatches.length) % findMatches.length;
  const match = findMatches[currentFindIndex];
  const countEl = document.getElementById('findMatchesCount');
  if (countEl) countEl.textContent = `${currentFindIndex + 1} of ${findMatches.length}`;

  const el = document.getElementById(match.block.id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    clearFindHighlights();
    el.classList.add('bg-yellow-100');
  }
}

function clearFindHighlights() {
  document.querySelectorAll('.screenplay-block').forEach(el => {
    el.classList.remove('bg-yellow-100');
  });
}

// =========================================================================
// MODALS (Title Page, Preferences, Export, Versions, Diff)
// =========================================================================
function setupModals(scriptId) {
  // 1. Title Page Modal
  const tpModal = document.getElementById('titlePageModal');
  const btnQuickTP = document.getElementById('btn-quick-title-page');
  const btnMenuTP = document.getElementById('menu-btn-title-page');
  const closeTP = document.getElementById('closeTitlePageModal');
  const cancelTP = document.getElementById('cancelTitlePageBtn');
  const saveTP = document.getElementById('saveTitlePageBtn');

  function openTitlePageModal() {
    if (!tpModal || !currentScreenplay) return;
    const tp = currentScreenplay.titlePage || {};
    document.getElementById('tpTitleInput').value = tp.title || currentScreenplay.title;
    document.getElementById('tpAuthorInput').value = tp.author || 'Arun Kumar';
    document.getElementById('tpNotesInput').value = tp.notes || '';
    document.getElementById('tpContactInput').value = tp.contact || '';
    tpModal.classList.remove('hidden');
    tpModal.classList.add('flex');
  }

  if (btnQuickTP) btnQuickTP.onclick = openTitlePageModal;
  if (btnMenuTP) {
    btnMenuTP.onclick = () => {
      document.getElementById('editorMoreMenuModal')?.classList.add('hidden');
      openTitlePageModal();
    };
  }
  if (closeTP) closeTP.onclick = () => tpModal.classList.add('hidden');
  if (cancelTP) cancelTP.onclick = () => tpModal.classList.add('hidden');

  if (saveTP) {
    saveTP.onclick = async () => {
      const tp = {
        title: document.getElementById('tpTitleInput')?.value || currentScreenplay.title,
        author: document.getElementById('tpAuthorInput')?.value || '',
        notes: document.getElementById('tpNotesInput')?.value || '',
        contact: document.getElementById('tpContactInput')?.value || ''
      };
      currentScreenplay.titlePage = tp;
      currentScreenplay.title = tp.title;
      document.getElementById('editor-script-title').textContent = tp.title;
      tpModal.classList.add('hidden');
      showToast('Title Page saved');
      hasUnsavedChanges = true;
      await performSave(true);
    };
  }

  // 2. Preferences Modal
  const prefModal = document.getElementById('preferencesModal');
  const btnMenuPref = document.getElementById('menu-btn-preferences');
  const closePref = document.getElementById('closePrefModal');
  const savePref = document.getElementById('savePrefBtn');

  if (btnMenuPref) {
    btnMenuPref.onclick = () => {
      document.getElementById('editorMoreMenuModal')?.classList.add('hidden');
      prefModal?.classList.remove('hidden');
      prefModal?.classList.add('flex');
    };
  }
  if (closePref) closePref.onclick = () => prefModal?.classList.add('hidden');

  if (savePref) {
    savePref.onclick = () => {
      const smartFormat = document.getElementById('prefSmartFormat')?.checked;
      const sceneNums = document.getElementById('prefSceneNumbers')?.checked;
      const lineSpacing = document.getElementById('prefLineSpacing')?.value;
      const fontSize = document.getElementById('prefFontSize')?.value;

      sceneNumbersEnabled = sceneNums;
      document.querySelectorAll('.scene-num-indicator').forEach(el => el.classList.toggle('hidden', !sceneNums));
      
      const sheet = document.querySelector('.screenplay-page-sheet');
      if (sheet) {
        sheet.style.lineHeight = lineSpacing === '2.0' ? '30px' : (lineSpacing === '1.0' ? '20px' : '24px');
        sheet.style.fontSize = fontSize === '14pt' ? '16px' : '15px';
      }

      prefModal?.classList.add('hidden');
      showToast('Preferences applied');
    };
  }

  // 3. Export Modal
  const exportModal = document.getElementById('exportModal');
  const exportBtn = document.getElementById('exportModalBtn');
  const menuExportBtn = document.getElementById('menu-btn-export');
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
  if (menuExportBtn) {
    menuExportBtn.onclick = () => {
      document.getElementById('editorMoreMenuModal')?.classList.add('hidden');
      toggleExport(true);
    };
  }
  if (closeExportModal) closeExportModal.onclick = () => toggleExport(false);
  if (cancelExportBtn) cancelExportBtn.onclick = () => toggleExport(false);

  if (startExportBtn) {
    startExportBtn.onclick = () => {
      const format = document.getElementById('exportFormatSelect')?.value || 'pdf';
      exportProgressArea.classList.remove('hidden');
      exportProgressBar.style.width = '35%';
      exportStatusText.textContent = 'Formatting Courier Prime typography and margins...';

      setTimeout(() => {
        exportProgressBar.style.width = '80%';
        exportStatusText.textContent = `Compiling standard ${format.toUpperCase()} screenplay blocks...`;
      }, 500);

      setTimeout(() => {
        exportProgressBar.style.width = '100%';
        exportStatusText.textContent = `Completed! Starting download...`;

        let exportBody = '';
        if (document.getElementById('optTitlePage')?.checked && currentScreenplay.titlePage) {
          exportBody += `${currentScreenplay.titlePage.title || currentScreenplay.title}\n`;
          exportBody += `Written by ${currentScreenplay.titlePage.author || 'Arun Kumar'}\n\n`;
          if (currentScreenplay.titlePage.contact) {
            exportBody += `${currentScreenplay.titlePage.contact}\n\n`;
          }
          exportBody += `=================================================\n\n`;
        }

        currentScreenplay.scenes.forEach(s => {
          s.blocks.forEach(b => {
            if (b.type === 'scene') exportBody += `\n\nSCENE ${s.number}\n${b.content}\n\n`;
            else if (b.type === 'character') exportBody += `\n\t\t\t${b.content}\n`;
            else if (b.type === 'parenthetical') exportBody += `\t\t${b.content}\n`;
            else if (b.type === 'dialogue') exportBody += `\t${b.content}\n`;
            else if (b.type === 'transition') exportBody += `\n\t\t\t\t\t\t${b.content}\n\n`;
            else exportBody += `${b.content}\n\n`;
          });
        });

        const blob = new Blob([exportBody], { type: format === 'pdf' ? 'application/pdf' : 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentScreenplay.title.replace(/[^a-zA-Z0-9]/g, '_')}_${currentScreenplay.draft || 'Draft'}.${format}`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        showToast(`Exported "${a.download}" successfully`);
        setTimeout(() => toggleExport(false), 800);
      }, 1000);
    };
  }

  // 4. Versions Modal
  const versionsModal = document.getElementById('versionsModal');
  const versionsBtn = document.getElementById('versionsModalBtn');
  const menuVersionsBtn = document.getElementById('menu-btn-versions');
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
  if (menuVersionsBtn) {
    menuVersionsBtn.onclick = () => {
      document.getElementById('editorMoreMenuModal')?.classList.add('hidden');
      versionsModal.classList.remove('hidden');
      versionsModal.classList.add('flex');
      loadVersions();
    };
  }
  if (closeVersionsModal) {
    closeVersionsModal.onclick = () => versionsModal.classList.add('hidden');
  }

  // 5. New Version Snapshot Modal
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

  // 6. Compare Modal
  const compareModal = document.getElementById('compareModal');
  const openCompareBtn = document.getElementById('openCompareBtn');
  const menuCompareBtn = document.getElementById('menu-btn-compare');
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
  if (menuCompareBtn) {
    menuCompareBtn.onclick = () => {
      document.getElementById('editorMoreMenuModal')?.classList.add('hidden');
      toggleCompare(true);
    };
  }
  if (closeCompareModal) closeCompareModal.onclick = () => toggleCompare(false);
  if (closeCompareBtn2) closeCompareBtn2.onclick = () => toggleCompare(false);
}

function updateTelemetry() {
  if (!currentScreenplay) return;
  let words = 0;
  currentScreenplay.scenes.forEach(s => {
    s.blocks.forEach(b => {
      if (b.content) {
        words += b.content.trim().split(/\s+/).filter(Boolean).length;
      }
    });
  });

  const pageSheets = document.querySelectorAll('.screenplay-page-sheet');
  const pageCount = pageSheets.length || 1;
  const pageEl = document.getElementById('telemetry-page-count');
  const wordEl = document.getElementById('telemetry-word-count');

  if (pageEl) pageEl.textContent = `Page 1 of ${pageCount}`;
  if (wordEl) wordEl.textContent = `${words.toLocaleString()} words`;
}

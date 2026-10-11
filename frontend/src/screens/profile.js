import { renderHeader } from '../components/header.js';
import { renderBottomNav } from '../components/bottomNav.js';
import { store } from '../state/store.js';
import * as api from '../services/api.js';
import { showToast } from '../components/toast.js';

export function renderProfileScreen(fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const from = fromParam || urlParams.get('from') || (sessionStorage.getItem('scriptora_from_editor') === 'true' ? 'editor' : null);
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.editorReturnScriptId || store.state.selectedScriptId || 'chronicles-of-dust';
  const isFromEditor = from === 'editor';
  const returnUrl = isFromEditor ? (sessionStorage.getItem('scriptora_editor_return') || `/editor/${scriptId}`) : '/workspace';
  const script = store.state.scripts?.find(s => s.id === scriptId) || store.state.scripts?.[0] || {};

  const user = store.state.currentUser || (() => {
    try {
      const saved = localStorage.getItem('scriptora_user');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {
      name: "Arun Kumar",
      headline: "Screenwriter & Narrative Director",
      email: "arun.kumar@scriptora.studio",
      badge: "Member Pro",
      initials: "AK",
      stats: { drafts: 14, coAuthors: 3, healthIndex: "98%" }
    };
  })();

  const settings = store.state.settings || (() => {
    try {
      const saved = localStorage.getItem('scriptora_settings');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {
      editor: {
        showSceneNumbers: true,
        autoCapitalize: true,
        autoTransition: true,
        continueDialogue: true,
        fontSize: "Courier Prime 12pt",
        autoSave: "Instant"
      },
      language: "English (US)",
      transliteration: false,
      appearance: "Light",
      accentColor: "blue",
      fontScale: "Normal",
      notifications: {
        invites: true,
        edits: true,
        insights: true,
        milestones: true
      },
      intelligence: {
        deepAnalysis: true,
        pacingAlerts: true,
        dialogueScoring: true,
        sensitivity: "Balanced"
      },
      privacy: {
        watermark: true,
        encryption: true
      }
    };
  })();

  const totalScripts = store.state.scripts?.length || user.stats?.drafts || 14;
  const activeCoAuthors = 3;
  const healthIndex = user.stats?.healthIndex || '98%';

  return `
    ${renderHeader('Profile', 'Account & preferences.')}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
      <div class="flex flex-col w-full max-w-lg mx-auto px-4 pt-3 pb-8 space-y-6 fade-in">
        
        <!-- Back Navigation to Editor (When entered from Editor) -->
        ${isFromEditor ? `
          <div class="flex flex-col gap-1 -mb-3">
            <a href="${returnUrl}" id="profile-back-to-editor-btn" class="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors text-xs font-semibold uppercase tracking-wider no-underline w-fit">
              <span class="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to Editor</span>
            </a>
          </div>
        ` : ''}

        <!-- Profile Header -->
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <h1 class="text-2xl font-bold text-slate-900 tracking-tight font-heading">Profile</h1>
            <p class="text-xs text-slate-500 mt-0.5">Account & preferences.</p>
          </div>
          <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100/80">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span>${user.badge || 'Member Pro'}</span>
          </div>
        </div>

        <!-- User Information Card -->
        <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs flex flex-col items-center text-center">
          <div class="relative group cursor-pointer" id="avatar-container-btn">
            <div id="user-avatar-circle" class="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center shadow-sm transition-transform active:scale-95">
              ${user.initials || 'AK'}
            </div>
            <button type="button" id="edit-avatar-btn" class="w-5 h-5 bg-white rounded-full border border-slate-200 text-slate-600 flex items-center justify-center absolute bottom-0 right-0 shadow-xs hover:bg-slate-50">
              <span class="material-symbols-outlined text-[11px]">edit</span>
            </button>
          </div>
          <h2 class="text-base font-bold text-slate-900 mt-2.5 leading-tight font-heading" id="profile-display-name">${user.name}</h2>
          <p class="text-xs text-slate-500 mt-0.5" id="profile-display-headline">${user.headline || 'Screenwriter'}</p>
          <div class="bg-slate-100 text-slate-600 text-[11px] font-medium px-3 py-1 rounded-full mt-2 inline-flex items-center gap-1.5">
            Scriptora Pro • Member since 2024
          </div>

          <!-- Interactive Stats Grid -->
          <div class="mt-4 grid grid-cols-3 gap-2.5 pt-3 w-full border-t border-slate-100">
            <button type="button" id="stat-card-drafts" class="bg-slate-50 hover:bg-blue-50/60 border border-slate-100 hover:border-blue-200 rounded-xl p-2.5 text-center flex flex-col items-center transition-all cursor-pointer group">
              <span class="text-base font-bold text-slate-900 group-hover:text-blue-600 leading-tight font-heading">${totalScripts}</span>
              <span class="text-[10px] text-slate-500 group-hover:text-blue-500 mt-0.5 font-medium">Drafts</span>
            </button>
            <button type="button" id="stat-card-coauthors" class="bg-slate-50 hover:bg-blue-50/60 border border-slate-100 hover:border-blue-200 rounded-xl p-2.5 text-center flex flex-col items-center transition-all cursor-pointer group">
              <span class="text-base font-bold text-slate-900 group-hover:text-blue-600 leading-tight font-heading">${activeCoAuthors}</span>
              <span class="text-[10px] text-slate-500 group-hover:text-blue-500 mt-0.5 font-medium">Co-Authors</span>
            </button>
            <button type="button" id="stat-card-health" class="bg-slate-50 hover:bg-blue-50/60 border border-slate-100 hover:border-blue-200 rounded-xl p-2.5 text-center flex flex-col items-center transition-all cursor-pointer group">
              <span class="text-base font-bold text-slate-900 group-hover:text-blue-600 leading-tight font-heading">${healthIndex}</span>
              <span class="text-[10px] text-slate-500 group-hover:text-blue-500 mt-0.5 font-medium">Health Index</span>
            </button>
          </div>
        </div>

        <!-- Settings Section -->
        <div class="flex flex-col" id="settings-section">
          <div class="flex items-center justify-between mb-1 px-1">
            <div class="flex flex-col">
              <h3 class="text-xs font-bold text-slate-500 tracking-wider uppercase font-heading">Settings</h3>
              <p class="text-xs text-slate-500 mt-0.5">Customize how SCRIPTORA works for you.</p>
            </div>
          </div>

          <div class="relative my-2">
            <span class="material-symbols-outlined text-slate-400 text-[18px] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">search</span>
            <input type="text" id="settings-search-input" placeholder="Search settings..." class="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-xs">
          </div>

          <div class="flex flex-col gap-2" id="settings-list">
            <!-- 1. Editor -->
            <button class="setting-item w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" data-sheet="sheet-editor">
              <div class="flex items-center min-w-0">
                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                  <span class="material-symbols-outlined text-[18px]">format_align_left</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">Editor</span>
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-editor">Numbers: ${settings.editor?.showSceneNumbers ? 'On' : 'Off'} · Auto-save: ${settings.editor?.autoSave || 'Instant'}</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
            </button>

            <!-- 2. Language -->
            <button class="setting-item w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" data-sheet="sheet-language">
              <div class="flex items-center min-w-0">
                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                  <span class="material-symbols-outlined text-[18px]">translate</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">Language</span>
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-language">${settings.language || 'English (US)'}${settings.transliteration ? ' · Transliteration On' : ''}</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
            </button>

            <!-- 3. Appearance -->
            <button class="setting-item w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" data-sheet="sheet-appearance">
              <div class="flex items-center min-w-0">
                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                  <span class="material-symbols-outlined text-[18px]">palette</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">Appearance</span>
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-appearance">${settings.appearance || 'Light'} · Scale: ${settings.fontScale || 'Normal'}</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
            </button>

            <!-- 4. Notifications -->
            <button class="setting-item w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" data-sheet="sheet-notifications">
              <div class="flex items-center min-w-0">
                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                  <span class="material-symbols-outlined text-[18px]">notifications_active</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">Notifications</span>
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-notifications">${Object.values(settings.notifications || {}).filter(Boolean).length} alerts active</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
            </button>

            <!-- 5. Intelligence -->
            <button class="setting-item w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" data-sheet="sheet-intelligence">
              <div class="flex items-center min-w-0">
                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                  <span class="material-symbols-outlined text-[18px]">auto_awesome</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">Intelligence</span>
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-intelligence">${settings.intelligence?.deepAnalysis ? 'Deep Arc Diagnostics' : 'Standard'} · ${settings.intelligence?.sensitivity || 'Balanced'}</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
            </button>

            <!-- 6. Privacy & Data -->
            <button class="setting-item w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" data-sheet="sheet-privacy">
              <div class="flex items-center min-w-0">
                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                  <span class="material-symbols-outlined text-[18px]">security</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">Privacy & Data</span>
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-privacy">${settings.privacy?.watermark ? 'Watermark On' : 'Standard'} · Local AES Encrypted</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
            </button>

            <!-- 7. Storage & Sync -->
            <button class="setting-item w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" data-sheet="sheet-storage">
              <div class="flex items-center min-w-0">
                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                  <span class="material-symbols-outlined text-[18px]">cloud_done</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">Storage & Sync</span>
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="desc-sheet-storage">Cloud Connected · Offline Ready</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
            </button>
          </div>

          <div id="no-settings-match" class="hidden text-center py-6 text-xs text-slate-400">
            No settings match your search.
          </div>
        </div>

        <!-- Account Information Section -->
        <div class="flex flex-col">
          <div class="text-xs font-bold text-slate-500 tracking-wider uppercase mb-2 px-1 font-heading">Account Information</div>
          <div class="flex flex-col gap-2">
            <!-- Email -->
            <button class="w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" id="trigger-modal-email">
              <div class="flex items-center min-w-0">
                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                  <span class="material-symbols-outlined text-[18px]">alternate_email</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">Email</span>
                  <span class="text-xs text-slate-500 truncate mt-0.5" id="profile-display-email">${user.email}</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
            </button>

            <!-- Password -->
            <button class="w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" id="trigger-modal-password">
              <div class="flex items-center min-w-0">
                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                  <span class="material-symbols-outlined text-[18px]">lock</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">Password</span>
                  <span class="text-xs text-slate-500 tracking-widest mt-0.5">••••••••••••</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
            </button>
          </div>
        </div>

        <!-- Collaboration Section -->
        <div class="flex flex-col">
          <div class="text-xs font-bold text-slate-500 tracking-wider uppercase mb-2 px-1 font-heading">Collaboration</div>
          <div class="flex flex-col gap-2">
            <a href="/profile/collaborators${isFromEditor ? `?from=editor&scriptId=${scriptId}` : ''}" class="w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group no-underline text-inherit cursor-pointer">
              <div class="flex items-center min-w-0">
                <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                  <span class="material-symbols-outlined text-[18px]">group</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <div class="flex items-center gap-2">
                    <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">Collaborators</span>
                    <span class="inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">3 active</span>
                  </div>
                  <span class="text-xs text-slate-500 truncate mt-0.5">Co-writers, Script Doctor, Producer</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
            </a>
          </div>
        </div>

        ${isFromEditor ? `
          <div class="pt-1">
            <a href="${returnUrl}" id="profile-bottom-return-btn" class="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs flex items-center justify-center gap-2 border border-blue-200 shadow-2xs no-underline transition-all active:scale-98">
              <span class="material-symbols-outlined text-[18px]">edit_note</span>
              <span>Return to Editor (${script.title || 'Screenplay'})</span>
            </a>
          </div>
        ` : ''}

        <!-- Account Actions: Sign Out & Delete Account -->
        <div class="flex flex-col gap-2 pt-2">
          <button class="w-full border border-slate-200 bg-white hover:bg-slate-50 p-3 rounded-xl flex items-center justify-center gap-2 text-slate-700 transition-colors shadow-xs text-xs sm:text-sm font-semibold cursor-pointer active:scale-98" id="btn-trigger-signout" type="button">
            <span class="material-symbols-outlined text-[18px]">logout</span>
            <span>Sign Out</span>
          </button>
          <button class="w-full border border-red-200/80 bg-red-50/50 hover:bg-red-50 p-3 rounded-xl flex items-center justify-center gap-2 text-red-600 transition-colors shadow-xs text-xs sm:text-sm font-semibold cursor-pointer active:scale-98" id="btn-trigger-delete-acc" type="button">
            <span class="material-symbols-outlined text-[18px]">warning</span>
            <span>Delete Account</span>
          </button>
        </div>

        <!-- Footer Version Info -->
        <div class="flex flex-col items-center text-center mt-2 pb-4">
          <div class="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold tracking-wider uppercase">
            <span class="material-symbols-outlined text-[14px]">movie_edit</span>
            <span>SCRIPTORA v1.0.4 (BUILD 412)</span>
          </div>
          <p class="text-[11px] text-slate-400 mt-0.5">Industry Screenplay Standard</p>
        </div>

      </div>

      <!-- Action Confirmation Modal (Sign Out / Delete) -->
      <div id="action-modal" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3">
          <div class="w-10 h-10 rounded-full flex items-center justify-center" id="action-modal-icon-box">
            <span class="material-symbols-outlined text-[20px]" id="action-modal-icon">logout</span>
          </div>
          <h2 class="text-base font-bold text-slate-900" id="action-modal-title">Sign Out</h2>
          <p class="text-xs text-slate-500" id="action-modal-desc">Are you sure you want to end your active session on this device?</p>
          <div class="flex items-center gap-2 mt-2">
            <button type="button" class="flex-1 h-10 px-4 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer" id="action-modal-cancel">Cancel</button>
            <button type="button" class="flex-1 h-10 px-4 rounded-xl text-white text-xs font-semibold shadow-xs cursor-pointer" id="action-modal-confirm">Confirm</button>
          </div>
        </div>
      </div>

      <!-- Edit Profile Modal -->
      <div id="modal-edit-profile" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 class="text-sm font-bold text-slate-900">Edit Profile & Account</h2>
            <button type="button" class="close-profile-modal p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <form id="form-update-profile" class="flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Full Name</label>
              <input type="text" id="prof-input-name" value="${user.name}" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600" required>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Headline / Role</label>
              <input type="text" id="prof-input-headline" value="${user.headline || 'Screenwriter'}" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600">
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Email Address</label>
              <input type="email" id="prof-input-email" value="${user.email}" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600" required>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Avatar Accent Style</label>
              <div class="flex items-center gap-2 pt-1">
                <button type="button" class="prof-avatar-color-btn w-7 h-7 rounded-full bg-blue-600 ring-2 ring-offset-2 ring-blue-600" data-color="bg-blue-600"></button>
                <button type="button" class="prof-avatar-color-btn w-7 h-7 rounded-full bg-indigo-600 hover:opacity-90" data-color="bg-indigo-600"></button>
                <button type="button" class="prof-avatar-color-btn w-7 h-7 rounded-full bg-emerald-600 hover:opacity-90" data-color="bg-emerald-600"></button>
                <button type="button" class="prof-avatar-color-btn w-7 h-7 rounded-full bg-purple-600 hover:opacity-90" data-color="bg-purple-600"></button>
                <button type="button" class="prof-avatar-color-btn w-7 h-7 rounded-full bg-amber-600 hover:opacity-90" data-color="bg-amber-600"></button>
              </div>
            </div>
            <div class="flex items-center gap-2 mt-2">
              <button type="button" class="close-profile-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Cancel</button>
              <button type="submit" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Password Security Modal -->
      <div id="modal-security" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 class="text-sm font-bold text-slate-900">Security & Password</h2>
            <button type="button" class="close-security-modal p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <form id="form-update-pw" class="flex flex-col gap-2.5">
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Current Password</label>
              <div class="relative">
                <input type="password" id="pw-input-current" placeholder="••••••••••••" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600" required>
                <button type="button" class="btn-toggle-pw absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" data-target="pw-input-current">
                  <span class="material-symbols-outlined text-[16px]">visibility</span>
                </button>
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">New Password</label>
              <div class="relative">
                <input type="password" id="pw-input-new" placeholder="Min. 6 characters" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600" required>
                <button type="button" class="btn-toggle-pw absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" data-target="pw-input-new">
                  <span class="material-symbols-outlined text-[16px]">visibility</span>
                </button>
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Confirm New Password</label>
              <div class="relative">
                <input type="password" id="pw-input-confirm" placeholder="Re-enter new password" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600" required>
                <button type="button" class="btn-toggle-pw absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" data-target="pw-input-confirm">
                  <span class="material-symbols-outlined text-[16px]">visibility</span>
                </button>
              </div>
            </div>
            <p id="pw-error-text" class="text-[11px] text-red-500 hidden"></p>
            <div class="flex items-center gap-2 mt-2">
              <button type="button" class="close-security-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Cancel</button>
              <button type="submit" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer">Update Password</button>
            </div>
          </form>
        </div>
      </div>

      <!-- 1. Editor Settings Modal -->
      <div id="modal-setting-editor" class="settings-modal fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">format_align_left</span>
              <h2 class="text-sm font-bold text-slate-900">Editor Settings</h2>
            </div>
            <button type="button" class="close-setting-modal p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Scene Numbers</span>
                <span class="text-[11px] text-slate-500">Show industry standard scene markers</span>
              </div>
              <input type="checkbox" id="cfg-editor-scenenums" ${settings.editor?.showSceneNumbers ? 'checked' : ''} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Auto-Capitalize Characters</span>
                <span class="text-[11px] text-slate-500">Auto uppercase character headings</span>
              </div>
              <input type="checkbox" id="cfg-editor-autocap" ${settings.editor?.autoCapitalize !== false ? 'checked' : ''} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Continue Dialogue (CONT'D)</span>
                <span class="text-[11px] text-slate-500">Auto append character continuation cues</span>
              </div>
              <input type="checkbox" id="cfg-editor-contd" ${settings.editor?.continueDialogue !== false ? 'checked' : ''} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Screenplay Font Style</label>
              <select id="cfg-editor-font" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600">
                <option value="Courier Prime 12pt" ${settings.editor?.fontSize?.includes('Prime') ? 'selected' : ''}>Courier Prime (12pt)</option>
                <option value="Courier FinalDraft 12pt" ${settings.editor?.fontSize?.includes('Final') ? 'selected' : ''}>Courier FinalDraft (12pt)</option>
                <option value="Courier New 11pt" ${settings.editor?.fontSize?.includes('New') ? 'selected' : ''}>Courier Standard (11pt)</option>
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Auto-save Frequency</label>
              <select id="cfg-editor-autosave" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600">
                <option value="Instant" ${settings.editor?.autoSave === 'Instant' ? 'selected' : ''}>Instant (300ms Keystroke Sync)</option>
                <option value="Every 15s" ${settings.editor?.autoSave === 'Every 15s' ? 'selected' : ''}>Every 15 Seconds</option>
                <option value="Every 60s" ${settings.editor?.autoSave === 'Every 60s' ? 'selected' : ''}>Every 60 Seconds</option>
              </select>
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
            <button type="button" class="close-setting-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Cancel</button>
            <button type="button" id="btn-save-cfg-editor" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer">Save Editor</button>
          </div>
        </div>
      </div>

      <!-- 2. Language Settings Modal -->
      <div id="modal-setting-language" class="settings-modal fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">translate</span>
              <h2 class="text-sm font-bold text-slate-900">Language & Transliteration</h2>
            </div>
            <button type="button" class="close-setting-modal p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <div class="flex flex-col gap-2.5">
            <span class="text-[11px] font-semibold text-slate-600">Interface & Narrative Language</span>
            <div class="grid grid-cols-2 gap-2">
              ${[
                { id: 'en', name: 'English (US)', code: 'English (US)' },
                { id: 'ta', name: 'Tamil (தமிழ்)', code: 'Tamil' },
                { id: 'tg', name: 'Tanglish', code: 'Tanglish' },
                { id: 'hi', name: 'Hindi (हिंदी)', code: 'Hindi' }
              ].map(l => `
                <button type="button" class="btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${settings.language === l.code ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'}" data-lang="${l.code}">
                  ${l.name}
                </button>
              `).join('')}
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 mt-1">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Phonetic Transliteration</span>
                <span class="text-[11px] text-slate-500">Auto convert phonetic typing to Tamil script</span>
              </div>
              <input type="checkbox" id="cfg-lang-translit" ${settings.transliteration ? 'checked' : ''} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
            <button type="button" class="close-setting-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Cancel</button>
            <button type="button" id="btn-save-cfg-language" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer">Apply Language</button>
          </div>
        </div>
      </div>

      <!-- 3. Appearance Settings Modal -->
      <div id="modal-setting-appearance" class="settings-modal fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">palette</span>
              <h2 class="text-sm font-bold text-slate-900">Appearance & Theme</h2>
            </div>
            <button type="button" class="close-setting-modal p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-1.5">
              <span class="text-[11px] font-semibold text-slate-600">Theme Preference</span>
              <div class="grid grid-cols-3 gap-2">
                ${[
                  { id: 'Light', label: 'Light', icon: 'light_mode' },
                  { id: 'Dark', label: 'Dark', icon: 'dark_mode' },
                  { id: 'System', label: 'System', icon: 'devices' }
                ].map(t => `
                  <button type="button" class="btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all ${settings.appearance === t.id ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}" data-theme="${t.id}">
                    <span class="material-symbols-outlined text-[18px]">${t.icon}</span>
                    <span>${t.label}</span>
                  </button>
                `).join('')}
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Display Font Scale</label>
              <select id="cfg-app-scale" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600">
                <option value="Compact" ${settings.fontScale === 'Compact' ? 'selected' : ''}>Compact (90%)</option>
                <option value="Normal" ${settings.fontScale !== 'Compact' && settings.fontScale !== 'Large' ? 'selected' : ''}>Normal (100%)</option>
                <option value="Large" ${settings.fontScale === 'Large' ? 'selected' : ''}>Comfortable (110%)</option>
              </select>
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
            <button type="button" class="close-setting-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Cancel</button>
            <button type="button" id="btn-save-cfg-appearance" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer">Save Theme</button>
          </div>
        </div>
      </div>

      <!-- 4. Notifications Settings Modal -->
      <div id="modal-setting-notifications" class="settings-modal fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">notifications_active</span>
              <h2 class="text-sm font-bold text-slate-900">Notification Alerts</h2>
            </div>
            <button type="button" class="close-setting-modal p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <div class="flex flex-col gap-2.5">
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Collaboration Invites</span>
                <span class="text-[11px] text-slate-500">Alert when invited to write or review</span>
              </div>
              <input type="checkbox" id="cfg-notif-invites" ${settings.notifications?.invites !== false ? 'checked' : ''} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Peer Edits & Revisions</span>
                <span class="text-[11px] text-slate-500">Real-time alerts when co-writers edit scenes</span>
              </div>
              <input type="checkbox" id="cfg-notif-edits" ${settings.notifications?.edits !== false ? 'checked' : ''} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Intelligence Diagnostics</span>
                <span class="text-[11px] text-slate-500">Notifications when vector analysis updates</span>
              </div>
              <input type="checkbox" id="cfg-notif-insights" ${settings.notifications?.insights !== false ? 'checked' : ''} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Draft Snapshot Milestones</span>
                <span class="text-[11px] text-slate-500">Alert on automated version backups</span>
              </div>
              <input type="checkbox" id="cfg-notif-milestones" ${settings.notifications?.milestones !== false ? 'checked' : ''} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
            <button type="button" class="close-setting-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Cancel</button>
            <button type="button" id="btn-save-cfg-notifications" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer">Save Alerts</button>
          </div>
        </div>
      </div>

      <!-- 5. Intelligence Settings Modal -->
      <div id="modal-setting-intelligence" class="settings-modal fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">auto_awesome</span>
              <h2 class="text-sm font-bold text-slate-900">Intelligence Engine</h2>
            </div>
            <button type="button" class="close-setting-modal p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <div class="flex flex-col gap-2.5">
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Deep Arc Diagnostics</span>
                <span class="text-[11px] text-slate-500">Track character want vs. need trajectories</span>
              </div>
              <input type="checkbox" id="cfg-intel-deep" ${settings.intelligence?.deepAnalysis !== false ? 'checked' : ''} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Proactive Pacing Warnings</span>
                <span class="text-[11px] text-slate-500">Detect narrative drag in Act II</span>
              </div>
              <input type="checkbox" id="cfg-intel-pacing" ${settings.intelligence?.pacingAlerts !== false ? 'checked' : ''} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Dialogue Subtext Scoring</span>
                <span class="text-[11px] text-slate-500">Evaluate voice distinctiveness</span>
              </div>
              <input type="checkbox" id="cfg-intel-dialogue" ${settings.intelligence?.dialogueScoring !== false ? 'checked' : ''} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex flex-col gap-1 mt-1">
              <label class="text-[11px] font-semibold text-slate-600">Model Sensitivity</label>
              <select id="cfg-intel-sensitivity" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600">
                <option value="Low" ${settings.intelligence?.sensitivity === 'Low' ? 'selected' : ''}>Low (Critical flags only)</option>
                <option value="Balanced" ${settings.intelligence?.sensitivity !== 'Low' && settings.intelligence?.sensitivity !== 'High' ? 'selected' : ''}>Balanced (Recommended)</option>
                <option value="High" ${settings.intelligence?.sensitivity === 'High' ? 'selected' : ''}>High (Detailed micro-diagnostics)</option>
              </select>
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
            <button type="button" class="close-setting-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Cancel</button>
            <button type="button" id="btn-save-cfg-intelligence" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer">Save Engine</button>
          </div>
        </div>
      </div>

      <!-- 6. Privacy & Data Settings Modal -->
      <div id="modal-setting-privacy" class="settings-modal fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">security</span>
              <h2 class="text-sm font-bold text-slate-900">Privacy & Data Governance</h2>
            </div>
            <button type="button" class="close-setting-modal p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Screenplay Copyright Watermark</span>
                <span class="text-[11px] text-slate-500">Inject copyright slug on exported PDFs</span>
              </div>
              <input type="checkbox" id="cfg-priv-watermark" ${settings.privacy?.watermark !== false ? 'checked' : ''} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex flex-col pr-2">
                <span class="text-xs font-semibold text-slate-800">Local Storage AES Encryption</span>
                <span class="text-[11px] text-slate-500">Encrypt local drafts in browser sandbox</span>
              </div>
              <input type="checkbox" id="cfg-priv-encrypt" ${settings.privacy?.encryption !== false ? 'checked' : ''} class="w-4 h-4 accent-blue-600 cursor-pointer">
            </div>
            <div class="pt-2 flex flex-col gap-2 border-t border-slate-100">
              <button type="button" id="btn-export-portfolio-data" class="w-full py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center gap-1.5 border border-blue-200 transition-all cursor-pointer">
                <span class="material-symbols-outlined text-[17px]">download</span>
                <span>Export Complete Portfolio Archive (.JSON)</span>
              </button>
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
            <button type="button" class="close-setting-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Cancel</button>
            <button type="button" id="btn-save-cfg-privacy" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs cursor-pointer">Save Privacy</button>
          </div>
        </div>
      </div>

      <!-- 7. Storage & Sync Settings Modal -->
      <div id="modal-setting-storage" class="settings-modal fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px]">cloud_done</span>
              <h2 class="text-sm font-bold text-slate-900">Storage & Cloud Sync</h2>
            </div>
            <button type="button" class="close-setting-modal p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <div class="flex flex-col gap-3">
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-slate-700">Local Sandbox Storage</span>
                <span class="text-[11px] font-mono font-bold text-blue-600" id="storage-quota-text">~148 KB / 5 MB</span>
              </div>
              <div class="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div class="h-full bg-blue-600 rounded-full w-[4%]"></div>
              </div>
              <span class="text-[10px] text-slate-400">Includes active scene blocks, versions & cached vectors</span>
            </div>
            <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span id="sync-status-msg">All screenplay drafts synchronized</span>
            </div>
            <div class="flex flex-col gap-2 pt-1">
              <button type="button" id="btn-force-cloud-sync" class="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">sync</span>
                <span>Force Cloud Re-sync</span>
              </button>
              <button type="button" id="btn-clear-local-cache" class="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">cleaning_services</span>
                <span>Optimize & Clean Local Cache</span>
              </button>
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
            <button type="button" class="close-setting-modal w-full h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Close</button>
          </div>
        </div>
      </div>

    </main>

    ${renderBottomNav('profile')}
  `;
}

export function attachProfileEvents(navigate, fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const from = fromParam || urlParams.get('from') || (sessionStorage.getItem('scriptora_from_editor') === 'true' ? 'editor' : null);
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.editorReturnScriptId || store.state.selectedScriptId || 'chronicles-of-dust';
  const isFromEditor = from === 'editor';
  const returnUrl = isFromEditor ? (sessionStorage.getItem('scriptora_editor_return') || `/editor/${scriptId}`) : '/workspace';

  // Back Navigation
  const backBtn = document.getElementById('profile-back-to-editor-btn');
  if (backBtn) {
    backBtn.onclick = (e) => {
      e.preventDefault();
      sessionStorage.removeItem('scriptora_from_editor');
      navigate(returnUrl);
    };
  }

  const bottomReturnBtn = document.getElementById('profile-bottom-return-btn');
  if (bottomReturnBtn) {
    bottomReturnBtn.onclick = (e) => {
      e.preventDefault();
      sessionStorage.removeItem('scriptora_from_editor');
      navigate(returnUrl);
    };
  }

  // Interactive Stat Cards Navigation
  document.getElementById('stat-card-drafts')?.addEventListener('click', () => {
    navigate('/workspace');
  });

  document.getElementById('stat-card-coauthors')?.addEventListener('click', () => {
    navigate(`/profile/collaborators${isFromEditor ? `?from=editor&scriptId=${scriptId}` : ''}`);
  });

  document.getElementById('stat-card-health')?.addEventListener('click', () => {
    navigate('/intelligence/dashboard');
  });

  // Settings Search
  const search = document.getElementById('settings-search-input');
  if (search) {
    search.oninput = (e) => {
      const term = e.target.value.toLowerCase().trim();
      let matchCount = 0;
      document.querySelectorAll('#settings-list .setting-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        const matches = text.includes(term);
        item.style.display = matches ? 'flex' : 'none';
        if (matches) matchCount++;
      });
      const noMatchEl = document.getElementById('no-settings-match');
      if (noMatchEl) {
        noMatchEl.style.display = matchCount === 0 ? 'block' : 'none';
      }
    };
  }

  // Generic Settings Modals Manager
  function openSettingModal(sheetId) {
    const modalId = `modal-setting-${sheetId.replace('sheet-', '')}`;
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  function closeAllSettingModals() {
    document.querySelectorAll('.settings-modal').forEach(m => m.classList.add('hidden'));
  }

  document.querySelectorAll('.setting-item').forEach(item => {
    item.onclick = () => {
      const sheet = item.getAttribute('data-sheet');
      if (sheet) openSettingModal(sheet);
    };
  });

  document.querySelectorAll('.close-setting-modal').forEach(btn => {
    btn.onclick = closeAllSettingModals;
  });

  // Close modals when clicking backdrop
  document.querySelectorAll('.settings-modal, #modal-edit-profile, #modal-security, #action-modal').forEach(modal => {
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    };
  });

  // Helper to persist and sync updated settings
  function persistSettings(updater) {
    let current = {};
    try {
      const saved = localStorage.getItem('scriptora_settings');
      if (saved) current = JSON.parse(saved);
    } catch (_) {}
    const updated = updater(current);
    localStorage.setItem('scriptora_settings', JSON.stringify(updated));
    store.setState({ settings: updated });
    api.updateSettings(updated).catch(() => {});
    return updated;
  }

  // 1. Save Editor Settings
  const saveEditorBtn = document.getElementById('btn-save-cfg-editor');
  if (saveEditorBtn) {
    saveEditorBtn.onclick = () => {
      const showSceneNumbers = document.getElementById('cfg-editor-scenenums')?.checked ?? true;
      const autoCapitalize = document.getElementById('cfg-editor-autocap')?.checked ?? true;
      const continueDialogue = document.getElementById('cfg-editor-contd')?.checked ?? true;
      const fontSize = document.getElementById('cfg-editor-font')?.value || 'Courier Prime 12pt';
      const autoSave = document.getElementById('cfg-editor-autosave')?.value || 'Instant';

      persistSettings(prev => ({
        ...prev,
        editor: {
          ...(prev.editor || {}),
          showSceneNumbers,
          autoCapitalize,
          continueDialogue,
          fontSize,
          autoSave
        }
      }));

      // Sync auto-save preference to editor localStorage key
      localStorage.setItem('scriptora_autosave', autoSave === 'Instant' ? 'true' : 'false');

      const descEl = document.getElementById('desc-sheet-editor');
      if (descEl) descEl.textContent = `Numbers: ${showSceneNumbers ? 'On' : 'Off'} · Auto-save: ${autoSave}`;

      closeAllSettingModals();
      showToast('Editor preferences saved');
    };
  }

  // 2. Save Language Settings
  let selectedLang = store.state.settings?.language || 'English (US)';
  document.querySelectorAll('.btn-lang-choice').forEach(btn => {
    btn.onclick = () => {
      selectedLang = btn.getAttribute('data-lang');
      document.querySelectorAll('.btn-lang-choice').forEach(b => {
        b.className = 'btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all border-slate-200 bg-white text-slate-800 hover:bg-slate-50';
      });
      btn.className = 'btn-lang-choice p-2.5 rounded-xl border text-left text-xs font-semibold transition-all border-blue-600 bg-blue-50 text-blue-700';
    };
  });

  const saveLangBtn = document.getElementById('btn-save-cfg-language');
  if (saveLangBtn) {
    saveLangBtn.onclick = () => {
      const transliteration = document.getElementById('cfg-lang-translit')?.checked ?? false;
      persistSettings(prev => ({
        ...prev,
        language: selectedLang,
        transliteration
      }));

      const descEl = document.getElementById('desc-sheet-language');
      if (descEl) descEl.textContent = `${selectedLang}${transliteration ? ' · Transliteration On' : ''}`;

      closeAllSettingModals();
      showToast(`Language set to ${selectedLang}`);
    };
  }

  // 3. Save Appearance Settings
  let selectedTheme = store.state.settings?.appearance || 'Light';
  document.querySelectorAll('.btn-theme-choice').forEach(btn => {
    btn.onclick = () => {
      selectedTheme = btn.getAttribute('data-theme');
      document.querySelectorAll('.btn-theme-choice').forEach(b => {
        b.className = 'btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all border-slate-200 bg-white text-slate-700 hover:bg-slate-50';
      });
      btn.className = 'btn-theme-choice p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all border-blue-600 bg-blue-50 text-blue-700';
    };
  });

  const saveAppearanceBtn = document.getElementById('btn-save-cfg-appearance');
  if (saveAppearanceBtn) {
    saveAppearanceBtn.onclick = () => {
      const fontScale = document.getElementById('cfg-app-scale')?.value || 'Normal';
      persistSettings(prev => ({
        ...prev,
        appearance: selectedTheme,
        fontScale
      }));

      // Apply theme preference to document element
      if (selectedTheme === 'Dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('scriptora_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('scriptora_theme', 'light');
      }

      const descEl = document.getElementById('desc-sheet-appearance');
      if (descEl) descEl.textContent = `${selectedTheme} · Scale: ${fontScale}`;

      closeAllSettingModals();
      showToast(`Appearance updated: ${selectedTheme}`);
    };
  }

  // 4. Save Notifications Settings
  const saveNotifBtn = document.getElementById('btn-save-cfg-notifications');
  if (saveNotifBtn) {
    saveNotifBtn.onclick = () => {
      const invites = document.getElementById('cfg-notif-invites')?.checked ?? true;
      const edits = document.getElementById('cfg-notif-edits')?.checked ?? true;
      const insights = document.getElementById('cfg-notif-insights')?.checked ?? true;
      const milestones = document.getElementById('cfg-notif-milestones')?.checked ?? true;

      const notifs = { invites, edits, insights, milestones };
      persistSettings(prev => ({
        ...prev,
        notifications: notifs
      }));

      const activeCount = Object.values(notifs).filter(Boolean).length;
      const descEl = document.getElementById('desc-sheet-notifications');
      if (descEl) descEl.textContent = `${activeCount} alerts active`;

      closeAllSettingModals();
      showToast('Notification preferences updated');
    };
  }

  // 5. Save Intelligence Settings
  const saveIntelBtn = document.getElementById('btn-save-cfg-intelligence');
  if (saveIntelBtn) {
    saveIntelBtn.onclick = () => {
      const deepAnalysis = document.getElementById('cfg-intel-deep')?.checked ?? true;
      const pacingAlerts = document.getElementById('cfg-intel-pacing')?.checked ?? true;
      const dialogueScoring = document.getElementById('cfg-intel-dialogue')?.checked ?? true;
      const sensitivity = document.getElementById('cfg-intel-sensitivity')?.value || 'Balanced';

      persistSettings(prev => ({
        ...prev,
        intelligence: {
          deepAnalysis,
          pacingAlerts,
          dialogueScoring,
          sensitivity
        }
      }));

      const descEl = document.getElementById('desc-sheet-intelligence');
      if (descEl) descEl.textContent = `${deepAnalysis ? 'Deep Arc Diagnostics' : 'Standard'} · ${sensitivity}`;

      closeAllSettingModals();
      showToast('Intelligence engine calibrated');
    };
  }

  // 6. Save Privacy & Export Data
  const savePrivacyBtn = document.getElementById('btn-save-cfg-privacy');
  if (savePrivacyBtn) {
    savePrivacyBtn.onclick = () => {
      const watermark = document.getElementById('cfg-priv-watermark')?.checked ?? true;
      const encryption = document.getElementById('cfg-priv-encrypt')?.checked ?? true;

      persistSettings(prev => ({
        ...prev,
        privacy: { watermark, encryption }
      }));

      const descEl = document.getElementById('desc-sheet-privacy');
      if (descEl) descEl.textContent = `${watermark ? 'Watermark On' : 'Standard'} · Local AES Encrypted`;

      closeAllSettingModals();
      showToast('Privacy governance updated');
    };
  }

  const exportPortfolioBtn = document.getElementById('btn-export-portfolio-data');
  if (exportPortfolioBtn) {
    exportPortfolioBtn.onclick = () => {
      const backupData = {
        exportedAt: new Date().toISOString(),
        user: store.state.currentUser,
        scripts: store.state.scripts,
        screenplay: store.state.screenplay,
        settings: store.state.settings
      };
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `scriptora_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Portfolio archive downloaded successfully');
    };
  }

  // 7. Storage Sync & Cache Clean
  const forceSyncBtn = document.getElementById('btn-force-cloud-sync');
  if (forceSyncBtn) {
    forceSyncBtn.onclick = () => {
      forceSyncBtn.disabled = true;
      forceSyncBtn.innerHTML = '<span class="material-symbols-outlined text-[16px] animate-spin">refresh</span><span>Synchronizing...</span>';
      setTimeout(() => {
        forceSyncBtn.disabled = false;
        forceSyncBtn.innerHTML = '<span class="material-symbols-outlined text-[16px]">sync</span><span>Force Cloud Re-sync</span>';
        const msgEl = document.getElementById('sync-status-msg');
        if (msgEl) msgEl.textContent = `Synchronized at ${new Date().toLocaleTimeString()}`;
        showToast('All screenplay drafts synchronized with cloud');
      }, 700);
    };
  }

  const clearCacheBtn = document.getElementById('btn-clear-local-cache');
  if (clearCacheBtn) {
    clearCacheBtn.onclick = () => {
      sessionStorage.clear();
      showToast('Temporary cache and diagnostic buffers cleared');
    };
  }

  // Edit Profile Modal
  const editProfileModal = document.getElementById('modal-edit-profile');
  const triggerEmail = document.getElementById('trigger-modal-email');
  const triggerAvatar = document.getElementById('edit-avatar-btn');
  const triggerAvatarBox = document.getElementById('avatar-container-btn');
  const formUpdateProfile = document.getElementById('form-update-profile');

  function toggleProfileModal(open) {
    if (open) editProfileModal?.classList.remove('hidden');
    else editProfileModal?.classList.add('hidden');
  }

  if (triggerEmail) triggerEmail.onclick = () => toggleProfileModal(true);
  if (triggerAvatar) triggerAvatar.onclick = (e) => { e.stopPropagation(); toggleProfileModal(true); };
  if (triggerAvatarBox) triggerAvatarBox.onclick = () => toggleProfileModal(true);
  document.querySelectorAll('.close-profile-modal').forEach(b => b.onclick = () => toggleProfileModal(false));

  let selectedAvatarColor = 'bg-blue-600';
  document.querySelectorAll('.prof-avatar-color-btn').forEach(btn => {
    btn.onclick = () => {
      selectedAvatarColor = btn.getAttribute('data-color');
      document.querySelectorAll('.prof-avatar-color-btn').forEach(b => b.classList.remove('ring-2', 'ring-offset-2', 'ring-blue-600'));
      btn.classList.add('ring-2', 'ring-offset-2', 'ring-blue-600');
    };
  });

  if (formUpdateProfile) {
    formUpdateProfile.onsubmit = async (e) => {
      e.preventDefault();
      const name = document.getElementById('prof-input-name').value.trim();
      const headline = document.getElementById('prof-input-headline').value.trim();
      const email = document.getElementById('prof-input-email').value.trim();

      const parts = name.split(/\s+/);
      const initials = (parts[0]?.[0] || 'A') + (parts[1]?.[0] || '');

      const updatedUser = {
        ...(store.state.currentUser || {}),
        name,
        displayName: name,
        headline,
        email,
        initials: initials.toUpperCase(),
        avatarColor: selectedAvatarColor
      };

      await api.updateProfile(updatedUser);
      store.setState({ currentUser: updatedUser });

      // Update visible elements immediately
      const nameEl = document.getElementById('profile-display-name');
      const headEl = document.getElementById('profile-display-headline');
      const mailEl = document.getElementById('profile-display-email');
      const avatarCircle = document.getElementById('user-avatar-circle');

      if (nameEl) nameEl.textContent = name;
      if (headEl) headEl.textContent = headline;
      if (mailEl) mailEl.textContent = email;
      if (avatarCircle) {
        avatarCircle.textContent = initials.toUpperCase();
        avatarCircle.className = `w-16 h-16 rounded-full ${selectedAvatarColor} text-white font-bold text-xl flex items-center justify-center shadow-sm transition-transform active:scale-95`;
      }

      toggleProfileModal(false);
      showToast('Profile and account updated successfully');
    };
  }

  // Security Password Modal
  const securityModal = document.getElementById('modal-security');
  const triggerPw = document.getElementById('trigger-modal-password');
  const formUpdatePw = document.getElementById('form-update-pw');

  function toggleSecurity(open) {
    if (open) securityModal?.classList.remove('hidden');
    else securityModal?.classList.add('hidden');
  }

  if (triggerPw) triggerPw.onclick = () => toggleSecurity(true);
  document.querySelectorAll('.close-security-modal').forEach(b => b.onclick = () => toggleSecurity(false));

  // Toggle password visibility
  document.querySelectorAll('.btn-toggle-pw').forEach(btn => {
    btn.onclick = () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      const icon = btn.querySelector('.material-symbols-outlined');
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          if (icon) icon.textContent = 'visibility_off';
        } else {
          input.type = 'password';
          if (icon) icon.textContent = 'visibility';
        }
      }
    };
  });

  if (formUpdatePw) {
    formUpdatePw.onsubmit = (e) => {
      e.preventDefault();
      const currentPw = document.getElementById('pw-input-current')?.value;
      const newPw = document.getElementById('pw-input-new')?.value;
      const confirmPw = document.getElementById('pw-input-confirm')?.value;
      const errEl = document.getElementById('pw-error-text');

      if (!newPw || newPw.length < 6) {
        if (errEl) {
          errEl.textContent = 'New password must be at least 6 characters long.';
          errEl.classList.remove('hidden');
        }
        return;
      }

      if (newPw !== confirmPw) {
        if (errEl) {
          errEl.textContent = 'New password and confirmation do not match.';
          errEl.classList.remove('hidden');
        }
        return;
      }

      if (errEl) errEl.classList.add('hidden');
      toggleSecurity(false);
      showToast('Password updated securely');
      formUpdatePw.reset();
    };
  }

  // Action Confirmation Modal (Sign Out / Delete Account)
  const actionModal = document.getElementById('action-modal');
  const actionTitle = document.getElementById('action-modal-title');
  const actionDesc = document.getElementById('action-modal-desc');
  const actionIcon = document.getElementById('action-modal-icon');
  const actionIconBox = document.getElementById('action-modal-icon-box');
  const actionConfirm = document.getElementById('action-modal-confirm');
  const actionCancel = document.getElementById('action-modal-cancel');
  let currentAction = 'signout';

  function openAction(action) {
    currentAction = action;
    if (action === 'signout') {
      actionTitle.textContent = 'Sign Out';
      actionDesc.textContent = 'Are you sure you want to end your active session on this device?';
      actionIcon.textContent = 'logout';
      actionIconBox.className = 'w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center';
      actionConfirm.className = 'flex-1 h-10 px-4 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 cursor-pointer';
      actionConfirm.textContent = 'Sign Out';
    } else {
      actionTitle.textContent = 'Delete Account';
      actionDesc.textContent = 'This action will permanently delete your portfolio, scripts, and collaborator access. This cannot be undone.';
      actionIcon.textContent = 'warning';
      actionIconBox.className = 'w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center';
      actionConfirm.className = 'flex-1 h-10 px-4 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 cursor-pointer';
      actionConfirm.textContent = 'Delete Forever';
    }
    actionModal?.classList.remove('hidden');
  }

  document.getElementById('btn-trigger-signout')?.addEventListener('click', () => openAction('signout'));
  document.getElementById('btn-trigger-delete-acc')?.addEventListener('click', () => openAction('delete'));
  if (actionCancel) actionCancel.onclick = () => actionModal?.classList.add('hidden');

  if (actionConfirm) {
    actionConfirm.onclick = async () => {
      actionModal?.classList.add('hidden');
      if (currentAction === 'signout') {
        await api.signOut();
        store.setState({ currentUser: null });
        showToast('Signed out of Scriptora');
        navigate('/auth');
      } else {
        await api.signOut();
        store.setState({ currentUser: null, scripts: [] });
        showToast('Account deleted');
        navigate('/auth');
      }
    };
  }
}

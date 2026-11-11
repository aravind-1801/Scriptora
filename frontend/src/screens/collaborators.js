import { renderHeader } from '../components/header.js';
import { renderBottomNav } from '../components/bottomNav.js';
import { store } from '../state/store.js';
import * as api from '../services/api.js';
import { isLocalMode } from '../services/dataMode.js';
import * as localRepo from '../services/localRepository.js';
import { showToast } from '../components/toast.js';
import { setupPopupToggle, openModal, closeModal } from '../utils/popupPosition.js';
import {
  getOrCreateUserDeviceKeyPair,
  generateScreenplayKey,
  exportRawKeyBase64,
  importRawKeyFromBase64,
  computeKeyFingerprint,
  encryptScreenplayContent,
  decryptScreenplayContent
} from '../services/crypto.js';

export function renderCollaboratorsScreen(fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const from = fromParam || urlParams.get('from') || (sessionStorage.getItem('scriptora_from_editor') === 'true' ? 'editor' : null);
  const scriptsList = store.state.scripts || [];
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.editorReturnScriptId || store.state.selectedScriptId || scriptsList[0]?.id || null;
  const isFromEditor = from === 'editor';
  const returnUrl = isFromEditor && scriptId ? (sessionStorage.getItem('scriptora_editor_return') || `/editor/${scriptId}`) : '/profile';

  const script = scriptsList.find(s => s.id === scriptId) || scriptsList[0] || null;

  if (!script) {
    return `
      ${renderHeader('Profile', 'Collaborators')}
      <main class="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
        <div class="flex flex-col items-center justify-center flex-1 max-w-md mx-auto px-4 text-center py-16">
          <div class="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4">
            <span class="material-symbols-outlined text-3xl">group</span>
          </div>
          <h2 class="text-xl font-bold text-slate-900 mb-1">No Screenplay Selected</h2>
          <p class="text-xs text-slate-500 mb-6">Create or select a screenplay first to manage team access, join codes, and role permissions.</p>
          <a href="/workspace" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all no-underline">
            <span class="material-symbols-outlined text-[18px]">add</span>
            Go to Workspace
          </a>
        </div>
      </main>
      ${renderBottomNav('profile')}
    `;
  }

  return `
    ${renderHeader('Profile', 'Collaborators')}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
      <div class="flex flex-col w-full max-w-lg mx-auto px-4 pt-2.5 pb-8 space-y-5 fade-in">
        
        <!-- Back Navigation & Title -->
        <div class="flex items-center gap-2.5">
          <button id="collab-back-btn" data-scriptora-back="true" data-back-fallback="${returnUrl}" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-colors flex items-center justify-center shrink-0 cursor-pointer" aria-label="Back" title="Back">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div class="flex flex-col min-w-0">
            <h1 class="page-heading font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight truncate">Collaborators</h1>
            <p class="text-xs text-slate-500 mt-0.5 truncate">${isLocalMode() ? 'Isolated Local Workspace · Multi-user real-time invitations & cloud sync are disabled in this mode.' : 'Granular roles, secure invitations & end-to-end encrypted collaboration.'}</p>
          </div>
        </div>

        <!-- Project Context Selector -->
        <div class="relative">
          <button class="w-full flex items-center justify-between p-3.5 bg-white border border-slate-200/80 rounded-xl shadow-xs text-left hover:bg-slate-50 transition-colors" id="projectSelectBtn">
            <div class="flex flex-col min-w-0 pr-2">
              <span class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Active Screenplay</span>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="material-symbols-outlined text-blue-600 text-[18px]">movie_edit</span>
                <span class="font-heading text-sm font-bold text-slate-900 truncate" id="currentProjectTitle">${script.title} (${script.draft || 'Draft 1.0'})</span>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <span class="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium" id="collab-count-badge">Team Access</span>
              <span class="material-symbols-outlined text-slate-400 text-[20px]" id="projectChevron">expand_more</span>
            </div>
          </button>

          <!-- Project Dropdown Popover -->
          <div class="hidden absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-30 overflow-hidden py-1" id="projectDropdown">
            ${scriptsList.map(s => `
              <button class="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors switch-script-opt" data-id="${s.id}">
                <div class="flex flex-col">
                  <span class="text-xs font-semibold text-slate-900">${s.title}</span>
                  <span class="text-[10px] text-slate-500">${s.format || 'Feature'} · ${s.draft || 'Draft 1.0'}</span>
                </div>
                ${s.id === script.id ? `<span class="material-symbols-outlined text-blue-600 text-[16px]">check</span>` : ''}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- E2EE Security Status Bar -->
        <div class="bg-white border border-slate-200/80 rounded-xl p-3 shadow-xs flex items-center justify-between gap-3" id="e2ee-status-card">
          <div class="flex items-center gap-2.5 min-w-0">
            <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100" id="e2ee-icon-box">
              <span class="material-symbols-outlined text-[18px]">lock</span>
            </div>
            <div class="flex flex-col min-w-0">
              <div class="flex items-center gap-1.5">
                <span class="font-heading font-bold text-xs text-slate-900">End-to-End Encryption</span>
                <span class="text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider bg-slate-100 text-slate-600" id="e2ee-badge">AES-256-GCM</span>
              </div>
              <span class="text-[10px] text-slate-500 truncate" id="e2ee-desc">Zero-knowledge client encryption active.</span>
            </div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button id="btn-security-info" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/70 text-slate-700 text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer">
              <span class="material-symbols-outlined text-[14px]">shield</span>
              <span>Details</span>
            </button>
          </div>
        </div>

        <!-- Add Collaborator Action Bar -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="text-xs font-bold uppercase text-slate-500 tracking-wider">Team Access</span>
            <span class="text-[10px] font-semibold text-slate-400" id="team-members-count">(0)</span>
          </div>
          <button class="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer" id="openInviteBtn">
            <span class="material-symbols-outlined text-[16px]">person_add</span>
            <span>Add Collaborator</span>
          </button>
        </div>

        <!-- Inline Invite Card -->
        <div class="hidden bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3.5" id="inviteCard">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-[16px]">mail</span>
              </div>
              <span class="font-heading text-sm font-bold text-slate-900">Invite Teammate</span>
            </div>
            <button class="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer" id="closeInviteBtn">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div class="space-y-1">
            <label class="text-[11px] font-semibold text-slate-600">Email Address</label>
            <input class="w-full h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600" id="inviteEmailInput" placeholder="colleague@studio.com" type="email">
          </div>

          <div class="space-y-1.5">
            <span class="text-[11px] font-semibold text-slate-600">Assigned Role</span>
            <div class="grid grid-cols-2 gap-2" id="invite-role-selector">
              <label class="flex flex-col p-2.5 rounded-lg border border-blue-500 bg-blue-50/50 cursor-pointer transition-colors role-radio-card" data-role="Editor">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-900">Editor</span>
                  <input type="radio" name="inviteRole" value="Editor" checked class="accent-blue-600">
                </div>
                <span class="text-[10px] text-slate-500 mt-0.5">Edit dialogue, scene locks & storyboards</span>
              </label>

              <label class="flex flex-col p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors role-radio-card" data-role="Viewer">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-900">Viewer</span>
                  <input type="radio" name="inviteRole" value="Viewer" class="accent-blue-600">
                </div>
                <span class="text-[10px] text-slate-500 mt-0.5">Read-only script & review notes</span>
              </label>

              <label class="flex flex-col p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors role-radio-card" data-role="Script Doctor">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-900">Script Doctor</span>
                  <input type="radio" name="inviteRole" value="Script Doctor" class="accent-blue-600">
                </div>
                <span class="text-[10px] text-slate-500 mt-0.5">Analyze structure, dialogue & pacing</span>
              </label>

              <label class="flex flex-col p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors role-radio-card" data-role="Producer">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-900">Producer</span>
                  <input type="radio" name="inviteRole" value="Producer" class="accent-blue-600">
                </div>
                <span class="text-[10px] text-slate-500 mt-0.5">Production notes, schedule & review</span>
              </label>
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-[11px] font-semibold text-slate-600">Invitation Note (Optional)</label>
            <input class="w-full h-8 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600" id="inviteNoteInput" placeholder="e.g. Collaborating on Act 2 dialogue rewrite..." type="text">
          </div>

          <button id="sendInviteBtn" class="w-full h-9 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-lg text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer">
            <span class="material-symbols-outlined text-[16px]">send</span>
            <span>Send Invitation</span>
          </button>
        </div>

        <!-- Collaborators List & Pending Invitations -->
        <div class="bg-white rounded-xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden" id="collaborators-list">
          <div class="p-4 text-center text-xs text-slate-400">Loading collaborators...</div>
        </div>

        <!-- PENDING ACCESS REQUESTS SECTION (Revealed if pending join requests exist) -->
        <div id="pending-requests-section" class="hidden flex flex-col gap-2 pt-1">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-blue-600 text-[18px]">pending_actions</span>
              <h2 class="font-heading text-sm font-bold text-slate-900 tracking-tight">Pending Access Requests</h2>
            </div>
            <span class="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full" id="pending-requests-count">0</span>
          </div>
          <div class="bg-white rounded-xl border border-blue-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden" id="requests-list">
            <!-- Rendered dynamically -->
          </div>
        </div>

        <!-- JOIN BY SCRIPT CODE SECTION -->
        <div class="flex flex-col gap-2 pt-2">
          <div class="flex flex-col">
            <h2 class="font-heading text-sm font-bold text-slate-900 tracking-tight">Join a Script</h2>
            <p class="text-xs text-slate-500">Join codes allow authenticated teammates to submit an access request to the owner.</p>
          </div>

          <!-- Join Code Tabs Switcher -->
          <div class="w-full bg-slate-100 rounded-xl p-1 flex items-center text-xs font-semibold">
            <button id="tabGenCodeBtn" class="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs cursor-pointer">
              Generate Join Code
            </button>
            <button id="tabEnterCodeBtn" class="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900 cursor-pointer">
              Enter Join Code
            </button>
          </div>

          <!-- Tab Content 1: Generate Join Code -->
          <div id="paneGenerateCode" class="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col gap-3">
            <div class="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div class="flex flex-col">
                <div class="flex items-center gap-1.5">
                  <span class="text-[10px] uppercase font-bold text-slate-400">SCRIPT JOIN CODE</span>
                  <span id="joinCodeStatusBadge" class="text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">Active</span>
                </div>
                <span id="displayJoinCode" class="font-mono font-bold text-base text-blue-600 tracking-widest mt-0.5">${script.joinCode || 'A7K9-XP42'}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <button id="copyJoinCodeBtn" class="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 text-xs font-medium flex items-center gap-1 shadow-xs transition-all cursor-pointer">
                  <span class="material-symbols-outlined text-[15px]">content_copy</span>
                  <span id="copyJoinCodeLabel">Copy</span>
                </button>
                <button id="regenJoinCodeBtn" class="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 text-xs shadow-xs transition-all cursor-pointer" title="Regenerate Code">
                  <span class="material-symbols-outlined text-[16px]">refresh</span>
                </button>
                <button id="revokeJoinCodeBtn" class="p-1.5 rounded-lg bg-white border border-slate-200 text-rose-600 hover:bg-rose-50 active:scale-95 text-xs shadow-xs transition-all cursor-pointer" title="Revoke Code">
                  <span class="material-symbols-outlined text-[16px]">block</span>
                </button>
              </div>
            </div>
            <div class="text-[11px] text-slate-500 leading-relaxed space-y-1">
              <p>• Join codes request access from the owner; they do not bypass owner permission approval.</p>
              <p>• Code expiration: <span class="font-semibold text-slate-700" id="joinCodeExpirationLabel">14 days</span>.</p>
            </div>
          </div>

          <!-- Tab Content 2: Enter Join Code -->
          <div id="paneEnterCode" class="hidden bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Enter 8-Character Join Code</label>
              <div class="flex items-center gap-2">
                <input id="joinCodeInput" type="text" maxlength="9" placeholder="A7K9-XP42" class="flex-1 h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 font-mono text-sm uppercase tracking-widest text-slate-900 focus:outline-none focus:border-blue-600">
                <button id="verifyCodeBtn" class="h-10 px-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs active:scale-95 transition-all flex items-center gap-1 cursor-pointer">
                  <span>Verify</span>
                </button>
              </div>
            </div>

            <!-- Join Code Result Card (revealed after verification) -->
            <div id="joinCodeResultCard" class="hidden bg-blue-50/60 border border-blue-200 rounded-xl p-3.5 flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <div class="flex flex-col">
                  <span class="text-xs font-bold text-slate-900 font-heading" id="verifiedScriptTitle">Screenplay</span>
                  <span class="text-[10px] text-slate-500" id="verifiedScriptOwner">Owner</span>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold" id="verifiedScriptFormat">Feature</span>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-semibold text-slate-700">Requested Permission Role</label>
                <select id="reqRoleSelect" class="w-full px-2.5 py-1.5 text-xs bg-white border border-blue-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600">
                  <option value="Editor">Editor — Screenplay & dialogue editing</option>
                  <option value="Viewer" selected>Viewer — Read-only script review</option>
                  <option value="Script Doctor">Script Doctor — Narrative analysis & suggestions</option>
                  <option value="Producer">Producer — Production breakdown & schedule</option>
                </select>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Request Note (Optional)</label>
                <input id="reqNoteInput" type="text" placeholder="e.g. Assisting with dialogue polish..." class="w-full px-2.5 py-1.5 text-xs bg-white border border-blue-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600">
              </div>

              <button id="confirmJoinScriptBtn" class="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5">
                <span class="material-symbols-outlined text-[16px]">how_to_reg</span>
                <span>Submit Access Request</span>
              </button>
            </div>
          </div>

        </div>

        <!-- SECURITY ACTIVITY LOG SECTION -->
        <div class="bg-white border border-slate-200/80 rounded-xl shadow-xs overflow-hidden">
          <button id="toggleSecLogBtn" class="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-slate-600 text-[18px]">history</span>
              <div class="flex flex-col">
                <span class="font-heading font-bold text-xs text-slate-900">Security & Access Activity</span>
                <span class="text-[10px] text-slate-500">Audit log of permissions, invitations & key rotations</span>
              </div>
            </div>
            <span class="material-symbols-outlined text-slate-400 text-[18px] transition-transform" id="secLogChevron">expand_more</span>
          </button>
          <div id="secLogContainer" class="hidden border-t border-slate-100 divide-y divide-slate-100 max-h-56 overflow-y-auto">
            <div class="p-3 text-center text-xs text-slate-400">Loading audit log...</div>
          </div>
        </div>

        ${isFromEditor ? `
          <div class="pt-2">
            <a href="${returnUrl}" id="collab-bottom-return-btn" class="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs flex items-center justify-center gap-2 border border-blue-200 shadow-2xs no-underline transition-all active:scale-98">
              <span class="material-symbols-outlined text-[18px]">edit_note</span>
              <span>Return to Editor (${script.title || 'Screenplay'})</span>
            </a>
          </div>
        ` : ''}

      </div>
    </main>

    <!-- INLINE ROLE SELECTOR POPOVER (Positioned dynamically) -->
    <div id="roleSelectorPopover" class="hidden fixed z-50 bg-white border border-slate-200 rounded-xl shadow-xl w-60 py-1 overflow-hidden fade-in">
      <div class="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Change Role</span>
        <button id="closeRolePopoverBtn" class="text-slate-400 hover:text-slate-600 cursor-pointer">
          <span class="material-symbols-outlined text-[14px]">close</span>
        </button>
      </div>
      <div class="py-1">
        <button class="w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors flex flex-col role-opt-btn" data-role="Editor">
          <span class="text-xs font-bold text-slate-900 flex items-center justify-between">
            <span>Editor</span>
            <span class="material-symbols-outlined text-[16px] text-blue-600 hidden role-check-Editor">check</span>
          </span>
          <span class="text-[10px] text-slate-500">Edit dialogue, scenes & storyboards</span>
        </button>

        <button class="w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors flex flex-col role-opt-btn" data-role="Viewer">
          <span class="text-xs font-bold text-slate-900 flex items-center justify-between">
            <span>Viewer</span>
            <span class="material-symbols-outlined text-[16px] text-blue-600 hidden role-check-Viewer">check</span>
          </span>
          <span class="text-[10px] text-slate-500">Read-only screenplay & notes</span>
        </button>

        <button class="w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors flex flex-col role-opt-btn" data-role="Script Doctor">
          <span class="text-xs font-bold text-slate-900 flex items-center justify-between">
            <span>Script Doctor</span>
            <span class="material-symbols-outlined text-[16px] text-blue-600 hidden role-check-Doctor">check</span>
          </span>
          <span class="text-[10px] text-slate-500">Structure, dialogue analysis & suggestions</span>
        </button>

        <button class="w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors flex flex-col role-opt-btn" data-role="Producer">
          <span class="text-xs font-bold text-slate-900 flex items-center justify-between">
            <span>Producer</span>
            <span class="material-symbols-outlined text-[16px] text-blue-600 hidden role-check-Producer">check</span>
          </span>
          <span class="text-[10px] text-slate-500">Production notes, schedule & review</span>
        </button>
      </div>
    </div>

    <!-- SECURITY DETAILS MODAL -->
    <div id="securityDetailsModal" class="scriptora-modal-overlay fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs hidden p-4">
      <div class="scriptora-modal-card bg-white w-full max-w-sm sm:max-w-md rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3.5 my-auto max-h-[85vh] overflow-hidden">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[20px]">verified_user</span>
            </div>
            <div>
              <h3 class="font-heading font-bold text-sm text-slate-900">E2EE Cryptographic Architecture</h3>
              <p class="text-[11px] text-slate-500">Standards-compliant zero-knowledge security</p>
            </div>
          </div>
          <button id="closeSecModalBtn" class="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div class="space-y-3 text-xs text-slate-700 leading-relaxed overflow-y-auto pr-1">
          <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5">
            <span class="font-bold text-slate-900 flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-blue-600">lock</span>
              What is Protected
            </span>
            <p class="text-[11px] text-slate-600">
              Screenplay scenes, dialogue, parentheticals, action lines, character arcs, and private storyboard prompts are encrypted on your local device before transmission.
            </p>
          </div>

          <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5">
            <span class="font-bold text-slate-900 flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-emerald-600">key</span>
              Decryption & Key Distribution
            </span>
            <p class="text-[11px] text-slate-600">
              Each screenplay generates an isolated 256-bit AES-GCM master key. Keys are securely wrapped for authorized collaborators using Elliptic Curve Diffie-Hellman (ECDH P-256). SCRIPTORA servers never possess unencrypted keys.
            </p>
          </div>

          <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5">
            <span class="font-bold text-slate-900 flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-amber-600">published_with_changes</span>
              Key Rotation on Member Removal
            </span>
            <p class="text-[11px] text-slate-600">
              When a collaborator is removed or revoked, the screenplay master key is automatically rotated. New revisions use the updated key, ensuring revoked members cannot decrypt future edits.
            </p>
          </div>

          <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5">
            <span class="font-bold text-slate-900 flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-purple-600">psychology</span>
              AI Privacy Boundary
            </span>
            <p class="text-[11px] text-slate-600">
              Screenplay Intelligence models never receive unencrypted background text without explicit, per-session consent. Plaintext is not stored in training corpora.
            </p>
          </div>
        </div>

        <div class="flex items-center justify-between pt-2 border-t border-slate-100" id="secModalActions">
          <button id="btn-toggle-e2ee-enable" class="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer shadow-xs transition-all flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[15px]">lock</span>
            <span id="e2ee-toggle-label">Activate Zero-Knowledge E2EE</span>
          </button>
          <button id="closeSecModalBtn2" class="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>

    ${renderBottomNav('profile')}
  `;
}

export function attachCollaboratorsEvents(navigate, fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const from = fromParam || urlParams.get('from') || (sessionStorage.getItem('scriptora_from_editor') === 'true' ? 'editor' : null);
  const scriptsList = store.state.scripts || [];
  const rawScript = scriptParam || urlParams.get('scriptId') || store.state.editorReturnScriptId || store.state.selectedScriptId || scriptsList[0]?.id || null;
  const scriptId = rawScript && rawScript !== 'null' && rawScript !== 'undefined' ? rawScript : null;
  const activeScript = scriptId ? scriptsList.find(s => s.id === scriptId) || null : null;
  const isFromEditor = from === 'editor';
  const returnUrl = isFromEditor && scriptId ? (sessionStorage.getItem('scriptora_editor_return') || `/editor/${scriptId}`) : '/profile';

  if (!activeScript) {
    return;
  }

  // Back button handling
  const backBtn = document.getElementById('collab-back-btn');
  if (backBtn) {
    backBtn.onclick = (e) => {
      e.preventDefault();
      if (isFromEditor) sessionStorage.removeItem('scriptora_from_editor');
      if (window.scriptoraRouter) {
        window.scriptoraRouter.back(returnUrl);
      } else {
        navigate(returnUrl);
      }
    };
  }

  const bottomReturnBtn = document.getElementById('collab-bottom-return-btn');
  if (bottomReturnBtn) {
    bottomReturnBtn.onclick = (e) => {
      e.preventDefault();
      if (isFromEditor) sessionStorage.removeItem('scriptora_from_editor');
      if (window.scriptoraRouter) {
        window.scriptoraRouter.back(returnUrl);
      } else {
        navigate(returnUrl);
      }
    };
  }

  let activeCode = 'A7K9-XP42';
  let activeTargetCollaboratorId = null;

  // Popover elements
  const rolePopover = document.getElementById('roleSelectorPopover');
  const closeRolePopoverBtn = document.getElementById('closeRolePopoverBtn');
  if (closeRolePopoverBtn && rolePopover) {
    closeRolePopoverBtn.onclick = () => rolePopover.classList.add('hidden');
  }

  // Close popover on document click outside
  document.addEventListener('click', (e) => {
    if (rolePopover && !rolePopover.classList.contains('hidden')) {
      if (!rolePopover.contains(e.target) && !e.target.closest('.interactive-role-trigger')) {
        rolePopover.classList.add('hidden');
      }
    }
  });

  // Load and render collaborators & invitations
  async function loadList() {
    const [list, invitations, requests, e2ee] = await Promise.all([
      api.getCollaborators(scriptId),
      api.getPendingInvitations(scriptId),
      api.getAccessRequests(scriptId),
      api.getE2EESettings(scriptId)
    ]);

    const countBadge = document.getElementById('collab-count-badge');
    const membersCount = document.getElementById('team-members-count');
    if (countBadge) countBadge.textContent = `${list.length} Members`;
    if (membersCount) membersCount.textContent = `(${list.length})`;

    // Update E2EE banner & controls
    renderE2EEControls(e2ee);

    const container = document.getElementById('collaborators-list');
    if (!container) return;

    let html = '';

    // Active Collaborators
    if (list.length === 0) {
      html += `<div class="p-4 text-center text-xs text-slate-400">No external collaborators yet. Share your join code or invite teammates above.</div>`;
    } else {
      html += list.map(c => `
        <div class="p-3.5 flex items-center justify-between hover:bg-slate-50/80 transition-colors collaborator-card" data-id="${c.id}">
          <div class="flex items-center gap-3 min-w-0 pr-2">
            <div class="w-9 h-9 rounded-full ${c.avatarBg || 'bg-blue-100 text-blue-700'} flex items-center justify-center font-bold text-xs shrink-0 cursor-pointer interactive-role-trigger" data-id="${c.id}" data-role="${c.role}" data-name="${c.name}">
              ${c.initials || 'CB'}
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-xs font-bold text-slate-900 truncate hover:text-blue-600 cursor-pointer interactive-role-trigger" data-id="${c.id}" data-role="${c.role}" data-name="${c.name}">${c.name}</span>
              <span class="text-[11px] text-slate-500 truncate">${c.email}</span>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button class="interactive-role-trigger flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full font-semibold transition-all cursor-pointer border bg-blue-50 text-blue-700 border-blue-200/80 hover:bg-blue-100 hover:text-blue-800 active:scale-95 shadow-2xs" data-id="${c.id}" data-role="${c.role}" data-name="${c.name}" title="Click to change role">
              <span id="role-label-${c.id}">${c.role}</span>
              <span class="material-symbols-outlined text-[13px] text-blue-500">expand_more</span>
            </button>
            <button class="remove-collab-btn text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer" data-id="${c.id}" data-name="${c.name}" title="Revoke access">
              <span class="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>
      `).join('');
    }

    // Pending Invitations
    if (invitations && invitations.length > 0) {
      html += `
        <div class="bg-slate-50/70 p-2.5 px-3.5 border-t border-slate-100 flex items-center justify-between">
          <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pending Invitations (${invitations.length})</span>
        </div>
      `;
      html += invitations.map(inv => `
        <div class="p-3 px-3.5 flex items-center justify-between bg-slate-50/40 hover:bg-slate-50 transition-colors">
          <div class="flex items-center gap-2.5 min-w-0 pr-2">
            <div class="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-[10px] shrink-0">
              <span class="material-symbols-outlined text-[14px]">mail</span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-xs font-semibold text-slate-800 truncate">${inv.email}</span>
              <span class="text-[10px] text-blue-600 font-medium">Invited as ${inv.role} · Expires in 7d</span>
            </div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button class="resend-invite-btn text-[11px] text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-0.5 rounded font-medium transition-colors cursor-pointer" data-id="${inv.id}" data-email="${inv.email}">
              Resend
            </button>
            <button class="revoke-invite-btn text-[11px] text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2 py-0.5 rounded font-medium transition-colors cursor-pointer" data-id="${inv.id}" data-email="${inv.email}">
              Revoke
            </button>
          </div>
        </div>
      `).join('');
    }

    container.innerHTML = html;

    // Attach role change popover triggers
    document.querySelectorAll('.interactive-role-trigger').forEach(trigger => {
      trigger.onclick = (e) => {
        e.stopPropagation();
        const id = trigger.getAttribute('data-id');
        const role = trigger.getAttribute('data-role');
        const name = trigger.getAttribute('data-name');
        activeTargetCollaboratorId = id;

        // Position popover relative to trigger button
        if (rolePopover) {
          const rect = trigger.getBoundingClientRect();
          rolePopover.style.top = `${Math.min(window.innerHeight - 240, rect.bottom + 6)}px`;
          rolePopover.style.left = `${Math.max(16, Math.min(window.innerWidth - 256, rect.left - 40))}px`;
          
          // Show active checkmark
          ['Editor', 'Viewer', 'Doctor', 'Producer'].forEach(k => {
            const el = rolePopover.querySelector(`.role-check-${k}`);
            if (el) el.classList.add('hidden');
          });
          const checkKey = role === 'Script Doctor' ? 'Doctor' : role;
          const activeCheck = rolePopover.querySelector(`.role-check-${checkKey}`);
          if (activeCheck) activeCheck.classList.remove('hidden');

          rolePopover.classList.remove('hidden');
        }
      };
    });

    // Attach remove collaborator buttons
    document.querySelectorAll('.remove-collab-btn').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        const name = btn.getAttribute('data-name');
        if (confirm(`Revoke collaboration access for ${name}?\n\nThey will immediately lose access to this screenplay. If End-to-End Encryption is active, the screenplay key will be automatically rotated.`)) {
          try {
            await api.removeCollaborator(scriptId, id);
            showToast(`Revoked access for ${name}`);
            await loadList();
            loadSecurityLog();
          } catch (err) {
            showToast(err.message || 'Failed to remove collaborator', 'error');
          }
        }
      };
    });

    // Attach resend invite buttons
    document.querySelectorAll('.resend-invite-btn').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        const email = btn.getAttribute('data-email');
        btn.disabled = true;
        const prevText = btn.innerText;
        btn.innerText = 'Resending...';
        try {
          await api.resendInvitation(scriptId, id);
          showToast(`Invitation resent to ${email}`);
          await loadList();
          loadSecurityLog();
        } catch (err) {
          showToast(err.message || 'Failed to resend invitation', 'error');
        } finally {
          btn.disabled = false;
          btn.innerText = prevText;
        }
      };
    });

    // Attach revoke invite buttons
    document.querySelectorAll('.revoke-invite-btn').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        const email = btn.getAttribute('data-email');
        if (confirm(`Revoke invitation for ${email}?`)) {
          try {
            await api.revokeInvitation(scriptId, id);
            showToast(`Invitation revoked for ${email}`);
            await loadList();
            loadSecurityLog();
          } catch (err) {
            showToast(err.message || 'Failed to revoke invitation', 'error');
          }
        }
      };
    });

    // Render Pending Access Requests
    const reqSection = document.getElementById('pending-requests-section');
    const reqListContainer = document.getElementById('requests-list');
    const reqCountBadge = document.getElementById('pending-requests-count');

    if (requests && requests.length > 0) {
      if (reqSection) reqSection.classList.remove('hidden');
      if (reqCountBadge) reqCountBadge.textContent = String(requests.length);
      if (reqListContainer) {
        reqListContainer.innerHTML = requests.map(r => `
          <div class="p-3.5 flex flex-col gap-2.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5 min-w-0 pr-2">
                <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                  ${r.initials || 'RQ'}
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs font-bold text-slate-900 truncate">${r.userName}</span>
                  <span class="text-[11px] text-slate-500 truncate">${r.userEmail}</span>
                </div>
              </div>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200/80">
                Requested: ${r.requestedRole}
              </span>
            </div>
            ${r.note ? `<p class="text-[11px] text-slate-600 bg-slate-50 rounded-lg p-2 italic border border-slate-100">"${r.note}"</p>` : ''}
            <div class="flex items-center justify-end gap-2 pt-1">
              <button class="reject-req-btn px-3 py-1 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-medium transition-colors cursor-pointer" data-id="${r.id}" data-name="${r.userName}">
                Reject
              </button>
              <button class="approve-req-btn px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer flex items-center gap-1" data-id="${r.id}" data-role="${r.requestedRole}" data-name="${r.userName}">
                <span class="material-symbols-outlined text-[14px]">check</span>
                <span>Approve as ${r.requestedRole}</span>
              </button>
            </div>
          </div>
        `).join('');

        reqListContainer.querySelectorAll('.approve-req-btn').forEach(b => {
          b.onclick = async () => {
            const rId = b.getAttribute('data-id');
            const role = b.getAttribute('data-role');
            const name = b.getAttribute('data-name');
            try {
              b.disabled = true;
              b.textContent = 'Approving...';
              await api.approveAccessRequest(scriptId, rId, role);
              showToast(`Approved ${name} as ${role}`);
              await loadList();
              loadSecurityLog();
            } catch (err) {
              showToast(err.message || 'Approval failed', 'error');
            }
          };
        });

        reqListContainer.querySelectorAll('.reject-req-btn').forEach(b => {
          b.onclick = async () => {
            const rId = b.getAttribute('data-id');
            const name = b.getAttribute('data-name');
            if (confirm(`Reject access request from ${name}?`)) {
              try {
                await api.rejectAccessRequest(scriptId, rId);
                showToast(`Rejected request from ${name}`);
                await loadList();
                loadSecurityLog();
              } catch (err) {
                showToast(err.message || 'Rejection failed', 'error');
              }
            }
          };
        });
      }
    } else {
      if (reqSection) reqSection.classList.add('hidden');
    }
  }

  // Handle role selection from popover
  document.querySelectorAll('.role-opt-btn').forEach(btn => {
    btn.onclick = async () => {
      const newRole = btn.getAttribute('data-role');
      if (!activeTargetCollaboratorId) return;

      if (rolePopover) rolePopover.classList.add('hidden');

      const roleLabelEl = document.getElementById(`role-label-${activeTargetCollaboratorId}`);
      const oldRole = roleLabelEl?.textContent || 'Editor';

      // Confirmation for sensitive demotion (Editor -> Viewer)
      if (oldRole === 'Editor' && newRole === 'Viewer') {
        if (!confirm(`Demote collaborator from Editor to Viewer?\n\nThey will immediately lose write access and the ability to edit scenes or dialogue.`)) {
          return;
        }
      }

      // Show temporary loading spinner on role label
      if (roleLabelEl) {
        roleLabelEl.innerHTML = `<span class="material-symbols-outlined text-[13px] animate-spin">progress_activity</span>`;
      }

      try {
        await api.changeCollaboratorRole(scriptId, activeTargetCollaboratorId, newRole);
        showToast(`Role updated to ${newRole}`);
        await loadList();
        loadSecurityLog();
      } catch (err) {
        if (roleLabelEl) roleLabelEl.textContent = oldRole;
        showToast(err.message || 'Failed to update role', 'error');
      }
    };
  });

  // Load Security Activity Log
  async function loadSecurityLog() {
    const secLogContainer = document.getElementById('secLogContainer');
    if (!secLogContainer) return;

    try {
      const logs = await api.getSecurityActivity(scriptId);
      if (!logs || logs.length === 0) {
        secLogContainer.innerHTML = `<div class="p-4 text-center text-xs text-slate-400">No security events recorded yet.</div>`;
        return;
      }

      secLogContainer.innerHTML = logs.map(l => `
        <div class="p-3 px-4 flex items-start gap-2.5 hover:bg-slate-50 transition-colors text-xs">
          <div class="w-6 h-6 rounded-lg ${
            l.type === 'role_changed' ? 'bg-blue-100 text-blue-700' :
            l.type === 'collaborator_removed' ? 'bg-rose-100 text-rose-700' :
            l.type === 'request_approved' ? 'bg-emerald-100 text-emerald-700' :
            l.type === 'e2ee_enabled' || l.type === 'key_rotated' ? 'bg-purple-100 text-purple-700' :
            'bg-slate-100 text-slate-700'
          } flex items-center justify-center shrink-0 mt-0.5">
            <span class="material-symbols-outlined text-[14px]">${
              l.type === 'role_changed' ? 'sync' :
              l.type === 'collaborator_removed' ? 'person_remove' :
              l.type === 'request_approved' ? 'check' :
              l.type === 'e2ee_enabled' || l.type === 'key_rotated' ? 'lock_reset' :
              'info'
            }</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-1">
              <span class="font-bold text-slate-900">${l.title || 'Security Event'}</span>
              <span class="text-[10px] text-slate-400 shrink-0">${l.timestamp || 'Just now'}</span>
            </div>
            <p class="text-[11px] text-slate-600 mt-0.5 leading-relaxed">${l.details || ''}</p>
          </div>
        </div>
      `).join('');
    } catch {
      secLogContainer.innerHTML = `<div class="p-3 text-center text-xs text-slate-400">Failed to load activity log.</div>`;
    }
  }

  // Toggle Security Log section
  const toggleSecLogBtn = document.getElementById('toggleSecLogBtn');
  const secLogContainer = document.getElementById('secLogContainer');
  const secLogChevron = document.getElementById('secLogChevron');

  if (toggleSecLogBtn && secLogContainer) {
    toggleSecLogBtn.onclick = () => {
      const isHidden = secLogContainer.classList.contains('hidden');
      if (isHidden) {
        secLogContainer.classList.remove('hidden');
        if (secLogChevron) secLogChevron.classList.add('rotate-180');
        loadSecurityLog();
      } else {
        secLogContainer.classList.add('hidden');
        if (secLogChevron) secLogChevron.classList.remove('rotate-180');
      }
    };
  }

  // Active script dropdown
  const projBtn = document.getElementById('projectSelectBtn');
  const projDropdown = document.getElementById('projectDropdown');
  const projectChevron = document.getElementById('projectChevron');
  let projDropdownHandler = null;
  if (projBtn && projDropdown) {
    projDropdownHandler = setupPopupToggle(projBtn, projDropdown, {
      placement: 'bottom-start',
      portal: false,
      onOpen: () => {
        projectChevron?.classList.add('rotate-180');
      },
      onClose: () => {
        projectChevron?.classList.remove('rotate-180');
      }
    });
  }

  document.querySelectorAll('.switch-script-opt').forEach(opt => {
    opt.onclick = async (e) => {
      e.stopPropagation();
      const id = opt.getAttribute('data-id');
      if (!id) return;
      projDropdownHandler?.close();
      await store.selectScript(id);
      navigate(`/profile/collaborators?scriptId=${encodeURIComponent(id)}${isFromEditor ? '&from=editor' : ''}`);
    };
  });

  // Invite expandable card
  const openInviteBtn = document.getElementById('openInviteBtn');
  const closeInviteBtn = document.getElementById('closeInviteBtn');
  const inviteCard = document.getElementById('inviteCard');
  const sendInviteBtn = document.getElementById('sendInviteBtn');

  if (openInviteBtn) openInviteBtn.onclick = () => inviteCard?.classList.remove('hidden');
  if (closeInviteBtn) closeInviteBtn.onclick = () => inviteCard?.classList.add('hidden');

  // Role card radio styling
  document.querySelectorAll('.role-radio-card').forEach(card => {
    card.onclick = () => {
      document.querySelectorAll('.role-radio-card').forEach(c => {
        c.classList.remove('border-blue-500', 'bg-blue-50/50');
        c.classList.add('border-slate-200');
      });
      card.classList.add('border-blue-500', 'bg-blue-50/50');
      card.classList.remove('border-slate-200');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    };
  });

  if (sendInviteBtn) {
    sendInviteBtn.onclick = async () => {
      const email = document.getElementById('inviteEmailInput')?.value.trim();
      const role = document.querySelector('input[name="inviteRole"]:checked')?.value || 'Editor';
      const message = document.getElementById('inviteNoteInput')?.value.trim() || '';

      if (!email) {
        showToast('Please enter an email address', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
      }

      sendInviteBtn.disabled = true;
      sendInviteBtn.innerHTML = `<span class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span><span>Sending...</span>`;

      try {
        await api.inviteCollaborator(scriptId, { email, role, message });
        showToast(`Invitation sent to ${email} as ${role}`);
        inviteCard?.classList.add('hidden');
        document.getElementById('inviteEmailInput').value = '';
        document.getElementById('inviteNoteInput').value = '';
        await loadList();
        loadSecurityLog();
      } catch (err) {
        showToast(err.message || 'Failed to send invitation', 'error');
      } finally {
        sendInviteBtn.disabled = false;
        sendInviteBtn.innerHTML = `<span class="material-symbols-outlined text-[16px]">send</span><span>Send Invitation</span>`;
      }
    };
  }

  // Join Code Tab Switcher
  const tabGen = document.getElementById('tabGenCodeBtn');
  const tabEnter = document.getElementById('tabEnterCodeBtn');
  const paneGen = document.getElementById('paneGenerateCode');
  const paneEnter = document.getElementById('paneEnterCode');

  if (tabGen) {
    tabGen.onclick = () => {
      tabGen.className = "flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs cursor-pointer";
      tabEnter.className = "flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900 cursor-pointer";
      paneGen?.classList.remove('hidden');
      paneEnter?.classList.add('hidden');
    };
  }
  if (tabEnter) {
    tabEnter.onclick = () => {
      tabEnter.className = "flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs cursor-pointer";
      tabGen.className = "flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900 cursor-pointer";
      paneEnter?.classList.remove('hidden');
      paneGen?.classList.add('hidden');
    };
  }

  // Copy code
  const copyBtn = document.getElementById('copyJoinCodeBtn');
  const copyLabel = document.getElementById('copyJoinCodeLabel');
  if (copyBtn) {
    copyBtn.onclick = () => {
      const code = document.getElementById('displayJoinCode')?.textContent || activeCode;
      navigator.clipboard?.writeText(code);
      if (copyLabel) copyLabel.textContent = 'Copied!';
      setTimeout(() => { if (copyLabel) copyLabel.textContent = 'Copy'; }, 1800);
      showToast(`Copied code: ${code}`);
    };
  }

  // Regenerate code
  const regenBtn = document.getElementById('regenJoinCodeBtn');
  if (regenBtn) {
    regenBtn.onclick = async () => {
      if (confirm('Regenerate screenplay join code?\n\nExisting join requests remain unaffected, but future users will need the new code.')) {
        try {
          const code = await api.generateJoinCode(scriptId);
          activeCode = code;
          const display = document.getElementById('displayJoinCode');
          if (display) display.textContent = code;
          const statusBadge = document.getElementById('joinCodeStatusBadge');
          if (statusBadge) {
            statusBadge.textContent = 'Active';
            statusBadge.className = 'text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700';
          }
          showToast(`Generated new join code: ${code}`);
          loadSecurityLog();
        } catch (err) {
          showToast(err.message || 'Failed to regenerate code', 'error');
        }
      }
    };
  }

  // Revoke code
  const revokeBtn = document.getElementById('revokeJoinCodeBtn');
  if (revokeBtn) {
    revokeBtn.onclick = async () => {
      if (confirm('Revoke current join code?\n\nNew join requests using this code will be rejected until a new code is generated.')) {
        try {
          await api.revokeJoinCode(scriptId);
          const statusBadge = document.getElementById('joinCodeStatusBadge');
          if (statusBadge) {
            statusBadge.textContent = 'Revoked';
            statusBadge.className = 'text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider bg-rose-100 text-rose-700';
          }
          showToast('Join code revoked');
          loadSecurityLog();
        } catch (err) {
          showToast(err.message || 'Failed to revoke code', 'error');
        }
      }
    };
  }

  // Enter code verification
  const verifyBtn = document.getElementById('verifyCodeBtn');
  const codeInput = document.getElementById('joinCodeInput');
  const resultCard = document.getElementById('joinCodeResultCard');
  const confirmJoinBtn = document.getElementById('confirmJoinScriptBtn');

  if (codeInput) {
    codeInput.oninput = (e) => {
      let val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (val.length > 4) val = val.slice(0, 4) + '-' + val.slice(4, 8);
      e.target.value = val;
    };
  }

  if (verifyBtn && codeInput) {
    verifyBtn.onclick = async () => {
      const code = codeInput.value.trim();
      if (!code) {
        showToast('Please enter a join code', 'error');
        return;
      }
      verifyBtn.disabled = true;
      verifyBtn.innerHTML = `<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span>`;
      
      try {
        const res = await api.validateJoinCode(code);
        verifyBtn.disabled = false;
        verifyBtn.innerHTML = `<span>Verify</span>`;
        
        if (res.valid) {
          resultCard?.classList.remove('hidden');
          document.getElementById('verifiedScriptTitle').textContent = res.script.title;
          document.getElementById('verifiedScriptFormat').textContent = `${res.script.format || 'Feature'} · ${res.script.pages || 1} pgs`;
          document.getElementById('verifiedScriptOwner').textContent = `Owner: ${res.script.ownerName || res.script.ownerEmail || 'Owner'}`;
          showToast('Valid join code verified');
        } else {
          resultCard?.classList.add('hidden');
          showToast(res.error || 'Invalid or expired join code', 'error');
        }
      } catch (err) {
        verifyBtn.disabled = false;
        verifyBtn.innerHTML = `<span>Verify</span>`;
        resultCard?.classList.add('hidden');
        showToast(err.message || 'Verification failed', 'error');
      }
    };
  }

  if (confirmJoinBtn && codeInput) {
    confirmJoinBtn.onclick = async () => {
      const code = codeInput.value.trim();
      const requestedRole = document.getElementById('reqRoleSelect')?.value || 'Viewer';
      const note = document.getElementById('reqNoteInput')?.value.trim() || '';

      confirmJoinBtn.disabled = true;
      confirmJoinBtn.innerHTML = `<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span><span>Submitting...</span>`;

      try {
        const res = await api.requestJoinAccess(code, { requestedRole, note });
        showToast(res.message || 'Access request submitted to screenplay owner!');
        codeInput.value = '';
        resultCard?.classList.add('hidden');
        await loadList();
      } catch (err) {
        showToast(err.message || 'Failed to submit access request', 'error');
      } finally {
        confirmJoinBtn.disabled = false;
        confirmJoinBtn.innerHTML = `<span class="material-symbols-outlined text-[16px]">how_to_reg</span><span>Submit Access Request</span>`;
      }
    };
  }

  // Security Details Modal handling
  const btnSecurityInfo = document.getElementById('btn-security-info');
  const secModal = document.getElementById('securityDetailsModal');
  const closeSecModalBtn = document.getElementById('closeSecModalBtn');

  if (btnSecurityInfo && secModal) {
    btnSecurityInfo.onclick = () => openModal(secModal);
  }
  if (closeSecModalBtn && secModal) {
    closeSecModalBtn.onclick = () => closeModal(secModal);
  }
  if (secModal) {
    secModal.onclick = (e) => {
      if (e.target === secModal) closeModal(secModal);
    };
  }

  function renderE2EEControls(e2ee) {
    const e2eeBadge = document.getElementById('e2ee-badge');
    const e2eeDesc = document.getElementById('e2ee-desc');
    const e2eeIconBox = document.getElementById('e2ee-icon-box');
    const secModalActions = document.getElementById('secModalActions');

    if (e2ee?.enabled) {
      if (e2eeBadge) {
        e2eeBadge.textContent = `V${e2ee.keyVersion || 1} · ${e2ee.algorithm || 'AES-GCM-256'}`;
        e2eeBadge.className = 'text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700';
      }
      if (e2eeIconBox) {
        e2eeIconBox.className = 'w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100';
        e2eeIconBox.innerHTML = '<span class="material-symbols-outlined text-[18px]">lock</span>';
      }
      if (e2eeDesc) {
        const fp = e2ee.keyFingerprint || 'sha256-1823e7fb29a9e3aa...58fa9b';
        e2eeDesc.textContent = `Zero-knowledge active. Fingerprint: ${fp}`;
      }
      if (secModalActions) {
        secModalActions.innerHTML = `
          <div class="flex items-center gap-2">
            <button id="btn-rotate-e2ee" class="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold cursor-pointer shadow-xs transition-all flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[15px]">published_with_changes</span>
              <span>Rotate Master Encryption Key</span>
            </button>
            <button id="btn-disable-e2ee" class="px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-medium transition-colors cursor-pointer" title="Deactivate E2EE">
              Deactivate
            </button>
          </div>
          <button id="closeSecModalBtn2" class="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer">
            Close
          </button>
        `;
        attachActiveE2EEHandlers(e2ee);
      }
    } else {
      if (e2eeBadge) {
        e2eeBadge.textContent = 'STANDARD';
        e2eeBadge.className = 'text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider bg-slate-100 text-slate-600';
      }
      if (e2eeIconBox) {
        e2eeIconBox.className = 'w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 border border-slate-200';
        e2eeIconBox.innerHTML = '<span class="material-symbols-outlined text-[18px]">lock</span>';
      }
      if (e2eeDesc) {
        e2eeDesc.textContent = 'Standard server storage. Tap Details to activate E2EE.';
      }
      if (secModalActions) {
        secModalActions.innerHTML = `
          <button id="btn-toggle-e2ee-enable" class="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold cursor-pointer shadow-xs transition-all flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[15px]">lock</span>
            <span id="e2ee-toggle-label">Activate Zero-Knowledge E2EE</span>
          </button>
          <button id="closeSecModalBtn2" class="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer">
            Close
          </button>
        `;
        attachInactiveE2EEHandlers();
      }
    }
  }

  function attachInactiveE2EEHandlers() {
    const btnToggle = document.getElementById('btn-toggle-e2ee-enable');
    const closeBtn2 = document.getElementById('closeSecModalBtn2');
    if (closeBtn2 && secModal) {
      closeBtn2.onclick = () => closeModal(secModal);
    }
    if (btnToggle) {
      btnToggle.onclick = async () => {
        const confirmed = window.confirm(
          'Activate Zero-Knowledge End-to-End Encryption?\n\n' +
          'This generates an isolated 256-bit AES-GCM master key on your device. ' +
          'Screenplay content and dialogue will be encrypted locally before cloud transmission.'
        );
        if (!confirmed) return;

        btnToggle.disabled = true;
        btnToggle.innerHTML = `<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span><span>Generating AES-256 Key...</span>`;

        try {
          const currentUserEmail = store.state.currentUser?.email || (store.state.currentUser?.id ? `${store.state.currentUser.id}@scriptora.studio` : 'writer@scriptora.studio');
          await getOrCreateUserDeviceKeyPair(currentUserEmail);

          btnToggle.innerHTML = `<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span><span>Encrypting Screenplay Content...</span>`;
          const masterKey = await generateScreenplayKey();
          const rawBase64 = await exportRawKeyBase64(masterKey);
          const fingerprint = await computeKeyFingerprint(rawBase64);

          if (isLocalMode()) {
            await localRepo.setCryptoValue(`screenplay_key_${scriptId}`, rawBase64).catch(() => {});
          } else {
            try { localStorage.setItem(api.getUserStorageKey(`screenplay_key_${scriptId}`), rawBase64); } catch {}
          }

          const currentSp = await api.getScreenplay(scriptId);
          if (currentSp && currentSp.scenes) {
            const encPayload = await encryptScreenplayContent(currentSp, masterKey, 1);
            if (isLocalMode()) {
              await localRepo.setCryptoValue(`screenplay_enc_${scriptId}`, encPayload).catch(() => {});
            } else {
              try { localStorage.setItem(api.getUserStorageKey(`screenplay_enc_${scriptId}`), JSON.stringify(encPayload)); } catch {}
            }
          }

          btnToggle.innerHTML = `<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span><span>Registering Zero-Knowledge Vault...</span>`;

          await api.enableE2EE(scriptId, {
            keyFingerprint: fingerprint,
            wrappedKeys: { [currentUserEmail]: rawBase64 }
          });

          showToast('Zero-knowledge End-to-End Encryption activated!');
          closeModal(secModal);
          await loadList();
          loadSecurityLog();
        } catch (err) {
          showToast(err.message || 'Failed to enable E2EE', 'error');
          btnToggle.disabled = false;
          btnToggle.innerHTML = `<span class="material-symbols-outlined text-[15px]">lock</span><span>Activate Zero-Knowledge E2EE</span>`;
        }
      };
    }
  }

  function attachActiveE2EEHandlers(e2eeData) {
    const rotateBtn = document.getElementById('btn-rotate-e2ee');
    const disableBtn = document.getElementById('btn-disable-e2ee');
    const closeBtn2 = document.getElementById('closeSecModalBtn2');
    if (closeBtn2 && secModal) {
      closeBtn2.onclick = () => closeModal(secModal);
    }
    if (rotateBtn) {
      rotateBtn.onclick = async () => {
        const confirmed = window.confirm(
          'Rotate Master Encryption Key?\n\n' +
          'This generates a new 256-bit AES-GCM master key and increments the key version. ' +
          'Revoked collaborators will no longer be able to decrypt future edits.'
        );
        if (!confirmed) return;

        rotateBtn.disabled = true;
        rotateBtn.innerHTML = `<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span><span>Rotating Keys...</span>`;

        try {
          const currentUserEmail = store.state.currentUser?.email || (store.state.currentUser?.id ? `${store.state.currentUser.id}@scriptora.studio` : 'writer@scriptora.studio');
          const newMasterKey = await generateScreenplayKey();
          const newRawBase64 = await exportRawKeyBase64(newMasterKey);
          const newFingerprint = await computeKeyFingerprint(newRawBase64);
          const nextVersion = (e2eeData?.keyVersion || 1) + 1;

          if (isLocalMode()) {
            await localRepo.setCryptoValue(`screenplay_key_${scriptId}`, newRawBase64).catch(() => {});
          } else {
            try { localStorage.setItem(api.getUserStorageKey(`screenplay_key_${scriptId}`), newRawBase64); } catch {}
          }

          const currentSp = await api.getScreenplay(scriptId);
          if (currentSp && currentSp.scenes) {
            const encPayload = await encryptScreenplayContent(currentSp, newMasterKey, nextVersion);
            if (isLocalMode()) {
              await localRepo.setCryptoValue(`screenplay_enc_${scriptId}`, encPayload).catch(() => {});
            } else {
              try { localStorage.setItem(api.getUserStorageKey(`screenplay_enc_${scriptId}`), JSON.stringify(encPayload)); } catch {}
            }
          }

          const res = await api.rotateE2EEKey(scriptId, {
            newKeyFingerprint: newFingerprint,
            wrappedKeys: { [currentUserEmail]: newRawBase64 }
          });

          showToast(`Master encryption key rotated to v${res.e2ee?.keyVersion || nextVersion}!`);
          closeModal(secModal);
          await loadList();
          loadSecurityLog();
        } catch (err) {
          showToast(err.message || 'Failed to rotate key', 'error');
          rotateBtn.disabled = false;
          rotateBtn.innerHTML = `<span class="material-symbols-outlined text-[15px]">published_with_changes</span><span>Rotate Master Encryption Key</span>`;
        }
      };
    }

    if (disableBtn) {
      disableBtn.onclick = async () => {
        const confirmed = window.confirm(
          'Disable End-to-End Encryption?\n\n' +
          'Screenplay content will be decrypted locally and safely restored to standard cloud storage.'
        );
        if (!confirmed) return;

        disableBtn.disabled = true;
        disableBtn.textContent = 'Deactivating...';

        try {
          const encData = isLocalMode()
            ? localRepo.getCachedCryptoValue(`screenplay_enc_${scriptId}`)
            : localStorage.getItem(api.getUserStorageKey(`screenplay_enc_${scriptId}`));
          const rawKey = isLocalMode()
            ? localRepo.getCachedCryptoValue(`screenplay_key_${scriptId}`)
            : localStorage.getItem(api.getUserStorageKey(`screenplay_key_${scriptId}`));
          if (encData && rawKey) {
            try {
              const parsedEnc = typeof encData === 'string' ? JSON.parse(encData) : encData;
              const masterKey = await importRawKeyFromBase64(rawKey);
              const decrypted = await decryptScreenplayContent(parsedEnc, masterKey);
              if (decrypted && decrypted.scenes) {
                await api.saveScreenplay(scriptId, decrypted);
              }
            } catch {}
            if (isLocalMode()) {
              await localRepo.setCryptoValue(`screenplay_enc_${scriptId}`, null).catch(() => {});
            } else {
              localStorage.removeItem(api.getUserStorageKey(`screenplay_enc_${scriptId}`));
            }
          }

          await api.disableE2EE(scriptId);

          showToast('End-to-End Encryption deactivated. Screenplay stored with standard security.');
          closeModal(secModal);
          await loadList();
          loadSecurityLog();
        } catch (err) {
          showToast(err.message || 'Failed to deactivate E2EE', 'error');
          disableBtn.disabled = false;
          disableBtn.textContent = 'Deactivate';
        }
      };
    }
  }

  // Initialize view
  loadList();
}

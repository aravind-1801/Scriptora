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
  const script = store.state.scripts.find(s => s.id === scriptId) || store.state.scripts[0] || {};

  const user = store.state.currentUser || {
    name: "Arun Kumar",
    headline: "Screenwriter & Narrative Director",
    email: "arun.kumar@scriptora.studio",
    badge: "Member Pro",
    initials: "AK",
    stats: { drafts: 14, coAuthors: 3, healthIndex: "98%" }
  };

  const settings = store.state.settings || {};

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
          <div class="relative">
            <div class="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center shadow-sm">
              ${user.initials || 'AK'}
            </div>
            <button type="button" id="edit-avatar-btn" class="w-5 h-5 bg-white rounded-full border border-slate-200 text-slate-600 flex items-center justify-center absolute bottom-0 right-0 shadow-xs hover:bg-slate-50">
              <span class="material-symbols-outlined text-[11px]">edit</span>
            </button>
          </div>
          <h2 class="text-base font-bold text-slate-900 mt-2.5 leading-tight font-heading">${user.name}</h2>
          <p class="text-xs text-slate-500 mt-0.5">${user.headline || 'Screenwriter'}</p>
          <div class="bg-slate-100 text-slate-600 text-[11px] font-medium px-3 py-1 rounded-full mt-2 inline-flex items-center gap-1.5">
            Scriptora Pro • Member since 2024
          </div>

          <div class="mt-4 grid grid-cols-3 gap-2.5 pt-3 w-full border-t border-slate-100">
            <div class="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center flex flex-col items-center">
              <span class="text-base font-bold text-slate-900 leading-tight font-heading">${user.stats?.drafts || 14}</span>
              <span class="text-[10px] text-slate-500 mt-0.5">Drafts</span>
            </div>
            <div class="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center flex flex-col items-center">
              <span class="text-base font-bold text-slate-900 leading-tight font-heading">${user.stats?.coAuthors || 3}</span>
              <span class="text-[10px] text-slate-500 mt-0.5">Co-Authors</span>
            </div>
            <div class="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center flex flex-col items-center">
              <span class="text-base font-bold text-slate-900 leading-tight font-heading">${user.stats?.healthIndex || '98%'}</span>
              <span class="text-[10px] text-slate-500 mt-0.5">Health Index</span>
            </div>
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
            ${[
              { id: 'sheet-editor', title: 'Editor', desc: 'Screenplay formatting & behaviour', icon: 'format_align_left' },
              { id: 'sheet-language', title: 'Language', desc: 'English (US) / Tamil / Tanglish', icon: 'translate' },
              { id: 'sheet-appearance', title: 'Appearance', desc: 'Light (System Default)', icon: 'palette' },
              { id: 'sheet-notifications', title: 'Notifications', desc: 'Collaboration and activity alerts', icon: 'notifications_active' },
              { id: 'sheet-intelligence', title: 'Intelligence', desc: 'AI analysis and prompt suggestions', icon: 'auto_awesome' },
              { id: 'sheet-privacy', title: 'Privacy & Data', desc: 'End-to-end IP protection & export', icon: 'security' },
              { id: 'sheet-storage', title: 'Storage & Sync', desc: 'Cloud backup & offline persistence', icon: 'cloud_done' }
            ].map(item => `
              <button class="setting-item w-full border border-slate-200/80 bg-white hover:bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-left transition-colors shadow-xs group" type="button" data-sheet="${item.id}">
                <div class="flex items-center min-w-0">
                  <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-3 border border-blue-100">
                    <span class="material-symbols-outlined text-[18px]">${item.icon}</span>
                  </div>
                  <div class="flex flex-col min-w-0">
                    <span class="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">${item.title}</span>
                    <span class="text-xs text-slate-500 truncate mt-0.5">${item.desc}</span>
                  </div>
                </div>
                <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-600 text-[20px] shrink-0">chevron_right</span>
              </button>
            `).join('')}
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
                  <span class="text-xs text-slate-500 truncate mt-0.5">${user.email}</span>
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
          <button class="w-full border border-slate-200 bg-white hover:bg-slate-50 p-3 rounded-xl flex items-center justify-center gap-2 text-slate-700 transition-colors shadow-xs text-xs sm:text-sm font-semibold" id="btn-trigger-signout" type="button">
            <span class="material-symbols-outlined text-[18px]">logout</span>
            <span>Sign Out</span>
          </button>
          <button class="w-full border border-red-200/80 bg-red-50/50 hover:bg-red-50 p-3 rounded-xl flex items-center justify-center gap-2 text-red-600 transition-colors shadow-xs text-xs sm:text-sm font-semibold" id="btn-trigger-delete-acc" type="button">
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
      <div id="action-modal" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4 pb-safe hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3">
          <div class="w-10 h-10 rounded-full flex items-center justify-center" id="action-modal-icon-box">
            <span class="material-symbols-outlined text-[20px]" id="action-modal-icon">logout</span>
          </div>
          <h2 class="text-base font-bold text-slate-900" id="action-modal-title">Sign Out</h2>
          <p class="text-xs text-slate-500" id="action-modal-desc">Are you sure you want to end your active session on this device?</p>
          <div class="flex items-center gap-2 mt-2">
            <button type="button" class="flex-1 h-10 px-4 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200" id="action-modal-cancel">Cancel</button>
            <button type="button" class="flex-1 h-10 px-4 rounded-xl text-white text-xs font-semibold shadow-xs" id="action-modal-confirm">Confirm</button>
          </div>
        </div>
      </div>

      <!-- Edit Profile Modal -->
      <div id="modal-edit-profile" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 class="text-sm font-bold text-slate-900">Edit Profile</h2>
            <button type="button" class="close-profile-modal p-1 text-slate-400 hover:text-slate-600"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <form id="form-update-profile" class="flex flex-col gap-2.5">
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Full Name</label>
              <input type="text" id="prof-input-name" value="${user.name}" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600">
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Headline</label>
              <input type="text" id="prof-input-headline" value="${user.headline || 'Screenwriter'}" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600">
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Email Address</label>
              <input type="email" id="prof-input-email" value="${user.email}" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600">
            </div>
            <div class="flex items-center gap-2 mt-2">
              <button type="button" class="close-profile-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">Cancel</button>
              <button type="submit" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Password Security Modal -->
      <div id="modal-security" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm hidden p-0 sm:p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col gap-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 class="text-sm font-bold text-slate-900">Security & Password</h2>
            <button type="button" class="close-security-modal p-1 text-slate-400 hover:text-slate-600"><span class="material-symbols-outlined text-[18px]">close</span></button>
          </div>
          <form id="form-update-pw" class="flex flex-col gap-2.5">
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Current Password</label>
              <input type="password" placeholder="••••••••••••" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600">
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">New Password</label>
              <input type="password" placeholder="Min. 8 characters" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600">
            </div>
            <div class="flex items-center gap-2 mt-2">
              <button type="button" class="close-security-modal flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">Cancel</button>
              <button type="submit" class="flex-1 h-9 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs">Update Password</button>
            </div>
          </form>
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

  // Search Settings
  const search = document.getElementById('settings-search-input');
  if (search) {
    search.oninput = (e) => {
      const term = e.target.value.toLowerCase().trim();
      document.querySelectorAll('#settings-list .setting-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(term) ? 'flex' : 'none';
      });
    };
  }

  // Setting item click feedback
  document.querySelectorAll('.setting-item').forEach(item => {
    item.onclick = () => {
      const title = item.querySelector('.font-semibold')?.textContent;
      showToast(`${title} settings are up to date`);
    };
  });

  // Edit Profile Modal
  const editProfileModal = document.getElementById('modal-edit-profile');
  const triggerEmail = document.getElementById('trigger-modal-email');
  const triggerAvatar = document.getElementById('edit-avatar-btn');
  const formUpdateProfile = document.getElementById('form-update-profile');

  function toggleProfileModal(open) {
    if (open) editProfileModal?.classList.remove('hidden');
    else editProfileModal?.classList.add('hidden');
  }

  if (triggerEmail) triggerEmail.onclick = () => toggleProfileModal(true);
  if (triggerAvatar) triggerAvatar.onclick = () => toggleProfileModal(true);
  document.querySelectorAll('.close-profile-modal').forEach(b => b.onclick = () => toggleProfileModal(false));

  if (formUpdateProfile) {
    formUpdateProfile.onsubmit = async (e) => {
      e.preventDefault();
      const name = document.getElementById('prof-input-name').value;
      const headline = document.getElementById('prof-input-headline').value;
      const email = document.getElementById('prof-input-email').value;
      await api.updateProfile({ name, headline, email });
      toggleProfileModal(false);
      showToast('Profile updated successfully');
      navigate('/profile');
    };
  }

  // Security Modal
  const securityModal = document.getElementById('modal-security');
  const triggerPw = document.getElementById('trigger-modal-password');
  const formUpdatePw = document.getElementById('form-update-pw');

  function toggleSecurity(open) {
    if (open) securityModal?.classList.remove('hidden');
    else securityModal?.classList.add('hidden');
  }

  if (triggerPw) triggerPw.onclick = () => toggleSecurity(true);
  document.querySelectorAll('.close-security-modal').forEach(b => b.onclick = () => toggleSecurity(false));

  if (formUpdatePw) {
    formUpdatePw.onsubmit = (e) => {
      e.preventDefault();
      toggleSecurity(false);
      showToast('Password updated securely');
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
      actionConfirm.className = 'flex-1 h-10 px-4 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900';
      actionConfirm.textContent = 'Sign Out';
    } else {
      actionTitle.textContent = 'Delete Account';
      actionDesc.textContent = 'This action will permanently delete your portfolio, scripts, and collaborator access. This cannot be undone.';
      actionIcon.textContent = 'warning';
      actionIconBox.className = 'w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center';
      actionConfirm.className = 'flex-1 h-10 px-4 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700';
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

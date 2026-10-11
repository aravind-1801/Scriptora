import { renderHeader } from '../components/header.js';
import { renderBottomNav } from '../components/bottomNav.js';
import { store } from '../state/store.js';
import * as api from '../services/api.js';
import { showToast } from '../components/toast.js';

export function renderCollaboratorsScreen(fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const from = fromParam || urlParams.get('from') || (sessionStorage.getItem('scriptora_from_editor') === 'true' ? 'editor' : null);
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.editorReturnScriptId || store.state.selectedScriptId || 'chronicles-of-dust';
  const isFromEditor = from === 'editor';
  const returnUrl = isFromEditor ? (sessionStorage.getItem('scriptora_editor_return') || `/editor/${scriptId}`) : '/profile';
  const returnLabel = isFromEditor ? 'Back to Editor' : 'Back to Profile';

  const script = store.state.scripts.find(s => s.id === scriptId) || store.state.scripts[0] || {
    id: 'chronicles-of-dust',
    title: 'Chronicles of Dust',
    draft: 'Draft 4.2',
    joinCode: 'A7K9-XP42'
  };

  return `
    ${renderHeader('Profile', 'Collaborators')}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
      <div class="flex flex-col w-full max-w-lg mx-auto px-4 pt-2.5 pb-8 space-y-5 fade-in">
        
        <!-- Back Navigation & Title -->
        <div class="flex flex-col gap-1">
          <a href="${returnUrl}" id="collab-back-btn" class="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors text-xs font-semibold uppercase tracking-wider no-underline w-fit">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>${returnLabel}</span>
          </a>
          <h1 class="font-heading text-2xl font-bold text-slate-900 tracking-tight mt-1">Collaborators</h1>
          <p class="text-xs text-slate-500">Work together on your screenplay with controlled access.</p>
        </div>

        <!-- Project Context Selector -->
        <div class="relative">
          <button class="w-full flex items-center justify-between p-3.5 bg-white border border-slate-200/80 rounded-xl shadow-xs text-left hover:bg-slate-50 transition-colors" id="projectSelectBtn">
            <div class="flex flex-col min-w-0 pr-2">
              <span class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Active Screenplay</span>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="material-symbols-outlined text-blue-600 text-[18px]">movie_edit</span>
                <span class="font-heading text-sm font-bold text-slate-900 truncate" id="currentProjectTitle">${script.title} (${script.draft || 'Draft 4.2'})</span>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <span class="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium" id="collab-count-badge">Team Access</span>
              <span class="material-symbols-outlined text-slate-400 text-[20px]" id="projectChevron">expand_more</span>
            </div>
          </button>

          <!-- Project Dropdown Popover -->
          <div class="hidden absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-30 overflow-hidden py-1" id="projectDropdown">
            ${store.state.scripts.map(s => `
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

        <!-- Add Collaborator Action Bar -->
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase text-slate-500 tracking-wider">Team Access</span>
          <button class="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-all" id="openInviteBtn">
            <span class="material-symbols-outlined text-[16px]">person_add</span>
            <span>Add Collaborator</span>
          </button>
        </div>

        <!-- Inline Invite Card -->
        <div class="hidden bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3" id="inviteCard">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-[16px]">mail</span>
              </div>
              <span class="font-heading text-sm font-bold text-slate-900">Invite Teammate</span>
            </div>
            <button class="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100" id="closeInviteBtn">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div class="space-y-1">
            <label class="text-[11px] font-semibold text-slate-600">Email Address</label>
            <input class="w-full h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600" id="inviteEmailInput" placeholder="colleague@studio.com" type="email">
          </div>

          <div class="space-y-1.5">
            <span class="text-[11px] font-semibold text-slate-600">Permission Level</span>
            <div class="grid grid-cols-2 gap-2">
              <label class="flex flex-col p-2.5 rounded-lg border border-blue-200 bg-blue-50/50 cursor-pointer">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-900">Editor</span>
                  <input type="radio" name="inviteRole" value="editor" checked class="accent-blue-600">
                </div>
                <span class="text-[10px] text-slate-500 mt-0.5">Can edit dialogue & scene locks</span>
              </label>
              <label class="flex flex-col p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-900">Viewer</span>
                  <input type="radio" name="inviteRole" value="viewer" class="accent-blue-600">
                </div>
                <span class="text-[10px] text-slate-500 mt-0.5">Read-only script & review notes</span>
              </label>
            </div>
          </div>

          <button id="sendInviteBtn" class="w-full h-9 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-lg text-xs font-semibold shadow-xs transition-all">
            Send Invitation
          </button>
        </div>

        <!-- Collaborators List -->
        <div class="bg-white rounded-xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden" id="collaborators-list">
          <div class="p-4 text-center text-xs text-slate-400">Loading collaborators...</div>
        </div>

        <!-- JOIN BY SCRIPT CODE SECTION -->
        <div class="flex flex-col gap-2 pt-2">
          <div class="flex flex-col">
            <h2 class="font-heading text-sm font-bold text-slate-900 tracking-tight">Join a Script</h2>
            <p class="text-xs text-slate-500">Use a script join code to collaborate without an email invitation.</p>
          </div>

          <!-- Join Code Tabs Switcher -->
          <div class="w-full bg-slate-100 rounded-xl p-1 flex items-center text-xs font-semibold">
            <button id="tabGenCodeBtn" class="flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs">
              Generate Join Code
            </button>
            <button id="tabEnterCodeBtn" class="flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900">
              Enter Join Code
            </button>
          </div>

          <!-- Tab Content 1: Generate Join Code -->
          <div id="paneGenerateCode" class="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col gap-3">
            <div class="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div class="flex flex-col">
                <span class="text-[10px] uppercase font-bold text-slate-400">SCRIPT JOIN CODE</span>
                <span id="displayJoinCode" class="font-mono font-bold text-base text-blue-600 tracking-widest mt-0.5">${script.joinCode || 'A7K9-XP42'}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <button id="copyJoinCodeBtn" class="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 text-xs font-medium flex items-center gap-1 shadow-xs transition-all">
                  <span class="material-symbols-outlined text-[15px]">content_copy</span>
                  <span id="copyJoinCodeLabel">Copy</span>
                </button>
                <button id="regenJoinCodeBtn" class="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 text-xs shadow-xs transition-all" title="Regenerate Code">
                  <span class="material-symbols-outlined text-[16px]">refresh</span>
                </button>
              </div>
            </div>
            <p class="text-[11px] text-slate-400 leading-relaxed">
              Anyone with this join code can request Editor or Viewer access to "${script.title}".
            </p>
          </div>

          <!-- Tab Content 2: Enter Join Code -->
          <div id="paneEnterCode" class="hidden bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-600">Enter 8-Character Join Code</label>
              <div class="flex items-center gap-2">
                <input id="joinCodeInput" type="text" maxlength="9" placeholder="A7K9-XP42" class="flex-1 h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 font-mono text-sm uppercase tracking-widest text-slate-900 focus:outline-none focus:border-blue-600">
                <button id="verifyCodeBtn" class="h-10 px-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs active:scale-95 transition-all flex items-center gap-1">
                  <span>Verify</span>
                </button>
              </div>
            </div>

            <!-- Join Code Result Card (revealed after verification) -->
            <div id="joinCodeResultCard" class="hidden bg-blue-50/50 border border-blue-200 rounded-xl p-3.5 flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-900 font-heading" id="verifiedScriptTitle">Chronicles of Dust</span>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold" id="verifiedScriptFormat">Feature · 96 pages</span>
              </div>
              <p class="text-[11px] text-slate-500">Ready to join this shared screenplay workspace.</p>
              <button id="confirmJoinScriptBtn" class="w-full mt-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg shadow-xs active:scale-95 transition-all">
                Request to Join Workspace
              </button>
            </div>
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

    ${renderBottomNav('profile')}
  `;
}

export function attachCollaboratorsEvents(navigate, fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const from = fromParam || urlParams.get('from') || (sessionStorage.getItem('scriptora_from_editor') === 'true' ? 'editor' : null);
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.editorReturnScriptId || store.state.selectedScriptId || 'chronicles-of-dust';
  const isFromEditor = from === 'editor';
  const returnUrl = isFromEditor ? (sessionStorage.getItem('scriptora_editor_return') || `/editor/${scriptId}`) : '/profile';

  // Back button handling
  const backBtn = document.getElementById('collab-back-btn');
  if (backBtn) {
    backBtn.onclick = (e) => {
      e.preventDefault();
      if (isFromEditor) sessionStorage.removeItem('scriptora_from_editor');
      navigate(returnUrl);
    };
  }

  const bottomReturnBtn = document.getElementById('collab-bottom-return-btn');
  if (bottomReturnBtn) {
    bottomReturnBtn.onclick = (e) => {
      e.preventDefault();
      if (isFromEditor) sessionStorage.removeItem('scriptora_from_editor');
      navigate(returnUrl);
    };
  }

  let activeCode = 'A7K9-XP42';

  // Load collaborators list
  async function loadList() {
    const list = await api.getCollaborators(scriptId);
    const container = document.getElementById('collaborators-list');
    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = `<div class="p-4 text-center text-xs text-slate-400">No external collaborators yet. Share your join code to invite teammates.</div>`;
      return;
    }

    container.innerHTML = list.map(c => `
      <div class="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
        <div class="flex items-center gap-3 min-w-0 pr-2">
          <div class="w-9 h-9 rounded-full ${c.avatarBg || 'bg-blue-100 text-blue-700'} flex items-center justify-center font-bold text-xs shrink-0">
            ${c.initials}
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-xs font-bold text-slate-900 truncate">${c.name}</span>
            <span class="text-[11px] text-slate-500 truncate">${c.email}</span>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">${c.role}</span>
          <button class="remove-collab-btn text-slate-400 hover:text-red-600 p-1" data-id="${c.id}" title="Remove access">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.remove-collab-btn').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        if (confirm("Remove collaborator access for this user?")) {
          await api.removeCollaborator(scriptId, id);
          showToast('Collaborator access removed');
          loadList();
        }
      };
    });
  }

  loadList();

  // Active script dropdown
  const projBtn = document.getElementById('projectSelectBtn');
  const projDropdown = document.getElementById('projectDropdown');
  if (projBtn) projBtn.onclick = () => projDropdown?.classList.toggle('hidden');

  document.querySelectorAll('.switch-script-opt').forEach(opt => {
    opt.onclick = () => {
      const id = opt.getAttribute('data-id');
      store.selectScript(id);
      projDropdown?.classList.add('hidden');
      navigate(`/profile/collaborators${isFromEditor ? `?from=editor&scriptId=${id}` : ''}`);
    };
  });

  // Invite expandable card
  const openInviteBtn = document.getElementById('openInviteBtn');
  const closeInviteBtn = document.getElementById('closeInviteBtn');
  const inviteCard = document.getElementById('inviteCard');
  const sendInviteBtn = document.getElementById('sendInviteBtn');

  if (openInviteBtn) openInviteBtn.onclick = () => inviteCard?.classList.remove('hidden');
  if (closeInviteBtn) closeInviteBtn.onclick = () => inviteCard?.classList.add('hidden');

  if (sendInviteBtn) {
    sendInviteBtn.onclick = async () => {
      const email = document.getElementById('inviteEmailInput')?.value.trim();
      const role = document.querySelector('input[name="inviteRole"]:checked')?.value || 'editor';
      if (!email) return;

      await api.inviteCollaborator(scriptId, { email, role });
      showToast(`Invited ${email} as ${role}`);
      inviteCard?.classList.add('hidden');
      loadList();
    };
  }

  // Join Code Tab Switcher
  const tabGen = document.getElementById('tabGenCodeBtn');
  const tabEnter = document.getElementById('tabEnterCodeBtn');
  const paneGen = document.getElementById('paneGenerateCode');
  const paneEnter = document.getElementById('paneEnterCode');

  if (tabGen) {
    tabGen.onclick = () => {
      tabGen.className = "flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs";
      tabEnter.className = "flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900";
      paneGen?.classList.remove('hidden');
      paneEnter?.classList.add('hidden');
    };
  }
  if (tabEnter) {
    tabEnter.onclick = () => {
      tabEnter.className = "flex-1 py-1.5 px-3 rounded-lg transition-all bg-white text-blue-700 shadow-xs";
      tabGen.className = "flex-1 py-1.5 px-3 rounded-lg transition-all text-slate-600 hover:text-slate-900";
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
      copyLabel.textContent = 'Copied!';
      setTimeout(() => { copyLabel.textContent = 'Copy'; }, 1800);
      showToast(`Copied code: ${code}`);
    };
  }

  // Regenerate code
  const regenBtn = document.getElementById('regenJoinCodeBtn');
  if (regenBtn) {
    regenBtn.onclick = async () => {
      const code = await api.generateJoinCode(scriptId);
      activeCode = code;
      const display = document.getElementById('displayJoinCode');
      if (display) display.textContent = code;
      showToast(`Generated new join code: ${code}`);
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
      if (!code) return;
      verifyBtn.innerHTML = `<span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span>`;
      
      const res = await api.validateJoinCode(code);
      verifyBtn.innerHTML = `<span>Verify</span>`;
      
      if (res.valid) {
        resultCard?.classList.remove('hidden');
        document.getElementById('verifiedScriptTitle').textContent = res.script.title;
        document.getElementById('verifiedScriptFormat').textContent = `${res.script.format} · ${res.script.pages} pages`;
        showToast('Valid join code');
      } else {
        resultCard?.classList.add('hidden');
        showToast('Invalid or expired join code', 'error');
      }
    };
  }

  if (confirmJoinBtn && codeInput) {
    confirmJoinBtn.onclick = async () => {
      const code = codeInput.value.trim();
      await api.joinWithCode(code);
      showToast('Successfully joined screenplay workspace!');
      navigate('/workspace');
    };
  }
}

import { renderHeader } from '../components/header.js';
import { renderBottomNav } from '../components/bottomNav.js';
import { store } from '../state/store.js';
import * as api from '../services/api.js';
import { showToast } from '../components/toast.js';

export function renderWorkspaceScreen() {
  const scripts = store.state.scripts || [];
  const currentDraft = scripts.find(s => s.isCurrentDraft) || scripts[0];
  const recentScripts = scripts.slice(0, 3);

  return `
    ${renderHeader('Workspace', 'Your writing space.')}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-3 pb-8 space-y-5 fade-in">
        
        <!-- Header Title & Telemetry -->
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <h1 class="text-2xl font-bold tracking-tight text-slate-900 font-heading">Workspace</h1>
            <p class="text-xs text-slate-500 mt-0.5">Your writing space.</p>
          </div>
          <div class="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full font-medium">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Sync active</span>
          </div>
        </div>

        <!-- Current Draft Spotlight Card -->
        ${currentDraft ? `
          <div class="w-full bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="bg-blue-100/70 text-blue-700 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">CURRENT DRAFT</span>
              <span class="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                <span class="material-symbols-outlined text-[13px]">schedule</span>
                ${currentDraft.updated || 'Recently'}
              </span>
            </div>
            <h2 class="font-semibold text-base text-slate-900 mt-2 font-heading tracking-tight">${currentDraft.title}</h2>
            <p class="text-xs text-slate-500 mt-0.5">${currentDraft.draft} · ${currentDraft.currentScene || 'Scene 1'} · ${currentDraft.pages} pages</p>
            
            <div class="rounded-xl p-3 mt-3 bg-slate-50 border border-slate-100">
              <div class="flex items-center justify-between text-xs font-bold text-blue-600 uppercase tracking-wider">
                <span>${currentDraft.currentScene || 'SCENE 1'}</span>
                <span class="material-symbols-outlined text-[15px] text-slate-400">movie</span>
              </div>
              <p class="font-mono italic text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                "INT. CUSTOMS OFFICE - NIGHT - Kevin kneels over cracked hydro-sensor junction box, static..."
              </p>
            </div>

            <button type="button" id="btn-continue-writing" data-script-id="${currentDraft.id}" class="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-medium text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 mt-3 shadow-xs transition-all">
              <span>Continue Writing (${currentDraft.currentScene || 'Scene 18'})</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        ` : ''}

        <!-- Recent Screenplays -->
        <div class="flex flex-col">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-bold text-slate-900 tracking-tight font-heading">Recent</h3>
            <button type="button" id="btn-new-script" class="inline-flex items-center gap-1 text-blue-600 bg-blue-50 hover:bg-blue-100 active:scale-95 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all">
              <span class="material-symbols-outlined text-[14px]">add</span>
              <span>New Script</span>
            </button>
          </div>

          <div class="bg-white rounded-xl border border-slate-100 shadow-sm divide-y divide-slate-100 overflow-hidden" id="recent-scripts-list">
            ${recentScripts.map(script => `
              <div data-script-id="${script.id}" class="script-item-row px-3.5 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors">
                <div class="flex items-center gap-3 min-w-0 pr-2">
                  <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-[18px]">description</span>
                  </div>
                  <div class="flex flex-col min-w-0">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-semibold text-slate-900 truncate">${script.title}</span>
                      <span class="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">${script.genre}</span>
                    </div>
                    <span class="text-[11px] text-slate-500 truncate mt-0.5">${script.draft} · ${script.pages} pages · Edited ${script.updated}</span>
                  </div>
                </div>
                <span class="material-symbols-outlined text-[16px] text-slate-400 shrink-0">chevron_right</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- All Screenplays -->
        <div class="flex flex-col">
          <div class="flex items-center justify-between mb-2.5">
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-bold text-slate-900 tracking-tight font-heading">Screenplays</h3>
              <span class="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-medium" id="total-scripts-badge">${scripts.length} total</span>
            </div>
            <button type="button" id="sort-scripts-btn" class="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-0.5 font-medium">
              <span>Recent</span>
              <span class="material-symbols-outlined text-[15px]">expand_more</span>
            </button>
          </div>

          <!-- Search Bar -->
          <div class="relative mb-3">
            <span class="material-symbols-outlined text-[17px] text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">search</span>
            <input type="text" id="screenplay-search" placeholder="Search screenplays..." class="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white placeholder-slate-400 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs">
          </div>

          <!-- Scripts Library Container -->
          <div class="bg-white rounded-xl border border-slate-100 shadow-sm divide-y divide-slate-100 overflow-hidden" id="screenplays-library-list">
            ${scripts.map(script => `
              <div data-script-id="${script.id}" class="script-item-row px-3.5 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                <div class="flex items-center gap-3 min-w-0 pr-2 flex-1">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <span class="material-symbols-outlined text-[16px]">movie</span>
                  </div>
                  <div class="flex flex-col min-w-0">
                    <span class="text-xs font-semibold text-slate-900 truncate">${script.title}</span>
                    <span class="text-[11px] text-slate-500 truncate mt-0.5">${script.draft} · ${script.pages} pages · Edited ${script.updated}</span>
                  </div>
                </div>

                <div class="relative">
                  <button type="button" class="script-more-btn w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" data-script-id="${script.id}" aria-label="More actions">
                    <span class="material-symbols-outlined text-[18px]">more_vert</span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Footer Actions -->
          <div class="flex items-center justify-between mt-3 px-1">
            <span class="text-[11px] text-slate-400">Showing all active scripts</span>
            <button type="button" id="btn-export-library" class="text-[11px] text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 active:scale-95 transition-transform">
              <span class="material-symbols-outlined text-[14px]">download</span>
              <span>Export Library</span>
            </button>
          </div>
        </div>

      </div>
    </main>

    <!-- New Script Modal -->
    <div id="new-script-modal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm hidden items-end sm:items-center justify-center p-0 sm:p-4">
      <div class="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-5 shadow-xl flex flex-col gap-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <span class="material-symbols-outlined text-[20px]">movie_edit</span>
            </div>
            <h3 class="font-bold text-base text-slate-900">Create New Screenplay</h3>
          </div>
          <button id="close-new-script-modal" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form id="form-new-script" class="flex flex-col gap-3">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-semibold text-slate-700">Screenplay Title</label>
            <input type="text" id="new-script-title" placeholder="e.g. Echoes of Tomorrow" required class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-semibold text-slate-700">Format</label>
              <select id="new-script-format" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-blue-600">
                <option value="Feature">Feature Film</option>
                <option value="Short">Short Film</option>
                <option value="Pilot">Television Pilot</option>
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs font-semibold text-slate-700">Genre</label>
              <select id="new-script-genre" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-blue-600">
                <option value="Drama">Drama</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Thriller">Thriller</option>
                <option value="Comedy">Comedy</option>
                <option value="Action">Action</option>
              </select>
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <button type="button" id="cancel-new-script-btn" class="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200">Cancel</button>
            <button type="submit" class="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs">Create & Write</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Script Options Menu Popover -->
    <div id="script-menu-popover" class="fixed z-50 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 w-44 hidden">
      <button class="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2" id="menu-opt-open">
        <span class="material-symbols-outlined text-[16px] text-blue-600">edit_document</span>
        <span>Open in Editor</span>
      </button>
      <button class="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2" id="menu-opt-rename">
        <span class="material-symbols-outlined text-[16px] text-slate-500">drive_file_rename_outline</span>
        <span>Rename</span>
      </button>
      <button class="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2" id="menu-opt-duplicate">
        <span class="material-symbols-outlined text-[16px] text-slate-500">content_copy</span>
        <span>Duplicate</span>
      </button>
      <button class="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2" id="menu-opt-archive">
        <span class="material-symbols-outlined text-[16px] text-slate-500">archive</span>
        <span>Archive</span>
      </button>
      <div class="h-px bg-slate-100 my-1"></div>
      <button class="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2" id="menu-opt-delete">
        <span class="material-symbols-outlined text-[16px] text-red-500">delete</span>
        <span>Delete Script</span>
      </button>
    </div>

    ${renderBottomNav('workspace')}
  `;
}

export function attachWorkspaceEvents(navigate) {
  let targetScriptId = null;

  // Continue writing button
  const continueBtn = document.getElementById('btn-continue-writing');
  if (continueBtn) {
    continueBtn.onclick = () => {
      const scriptId = continueBtn.getAttribute('data-script-id');
      store.selectScript(scriptId);
      navigate(`/editor/${scriptId}?scene=18`);
    };
  }

  // Row clicks to open editor
  document.querySelectorAll('.script-item-row').forEach(row => {
    row.onclick = (e) => {
      if (e.target.closest('.script-more-btn')) return;
      const scriptId = row.getAttribute('data-script-id');
      store.selectScript(scriptId);
      navigate(`/editor/${scriptId}`);
    };
  });

  // Search input live filter
  const searchInput = document.getElementById('screenplay-search');
  if (searchInput) {
    searchInput.oninput = (e) => {
      const term = e.target.value.toLowerCase().trim();
      const rows = document.querySelectorAll('#screenplays-library-list .script-item-row');
      rows.forEach(r => {
        const title = r.querySelector('.font-semibold')?.textContent.toLowerCase() || '';
        r.style.display = title.includes(term) ? 'flex' : 'none';
      });
    };
  }

  // New script modal
  const newScriptBtn = document.getElementById('btn-new-script');
  const newScriptModal = document.getElementById('new-script-modal');
  const closeNewScriptModal = document.getElementById('close-new-script-modal');
  const cancelNewScriptBtn = document.getElementById('cancel-new-script-btn');
  const formNewScript = document.getElementById('form-new-script');

  function toggleNewScriptModal(open) {
    if (!newScriptModal) return;
    if (open) {
      newScriptModal.classList.remove('hidden');
      newScriptModal.classList.add('flex');
      document.getElementById('new-script-title')?.focus();
    } else {
      newScriptModal.classList.add('hidden');
      newScriptModal.classList.remove('flex');
    }
  }

  if (newScriptBtn) newScriptBtn.onclick = () => toggleNewScriptModal(true);
  if (closeNewScriptModal) closeNewScriptModal.onclick = () => toggleNewScriptModal(false);
  if (cancelNewScriptBtn) cancelNewScriptBtn.onclick = () => toggleNewScriptModal(false);

  if (formNewScript) {
    formNewScript.onsubmit = async (e) => {
      e.preventDefault();
      const title = document.getElementById('new-script-title').value.trim();
      const format = document.getElementById('new-script-format').value;
      const genre = document.getElementById('new-script-genre').value;
      if (!title) return;

      try {
        const script = await api.createScript({ title, format, genre });
        await store.refreshScripts();
        store.selectScript(script.id);
        toggleNewScriptModal(false);
        showToast(`Created "${script.title}"`);
        navigate(`/editor/${script.id}`);
      } catch (err) {
        showToast(err.message, 'error');
      }
    };
  }

  // More menu popover
  const menuPopover = document.getElementById('script-menu-popover');
  document.querySelectorAll('.script-more-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      targetScriptId = btn.getAttribute('data-script-id');
      const rect = btn.getBoundingClientRect();
      menuPopover.style.top = `${rect.bottom + window.scrollY + 4}px`;
      menuPopover.style.left = `${Math.min(rect.left - 130, window.innerWidth - 180)}px`;
      menuPopover.classList.remove('hidden');
    };
  });

  window.onclick = (e) => {
    if (!e.target.closest('#script-menu-popover') && !e.target.closest('.script-more-btn')) {
      menuPopover?.classList.add('hidden');
    }
  };

  // Popover Actions
  document.getElementById('menu-opt-open')?.addEventListener('click', () => {
    menuPopover.classList.add('hidden');
    if (targetScriptId) {
      store.selectScript(targetScriptId);
      navigate(`/editor/${targetScriptId}`);
    }
  });

  document.getElementById('menu-opt-rename')?.addEventListener('click', async () => {
    menuPopover.classList.add('hidden');
    const newName = prompt("Enter new title for this screenplay:");
    if (newName && newName.trim()) {
      await api.updateScript(targetScriptId, { title: newName.trim() });
      await store.refreshScripts();
      showToast('Screenplay renamed');
      navigate('/workspace');
    }
  });

  document.getElementById('menu-opt-duplicate')?.addEventListener('click', async () => {
    menuPopover.classList.add('hidden');
    await api.duplicateScript(targetScriptId);
    await store.refreshScripts();
    showToast('Screenplay duplicated');
    navigate('/workspace');
  });

  document.getElementById('menu-opt-archive')?.addEventListener('click', async () => {
    menuPopover.classList.add('hidden');
    await api.archiveScript(targetScriptId);
    await store.refreshScripts();
    showToast('Screenplay archived');
    navigate('/workspace');
  });

  document.getElementById('menu-opt-delete')?.addEventListener('click', async () => {
    menuPopover.classList.add('hidden');
    if (confirm("Are you sure you want to delete this screenplay? This action cannot be undone.")) {
      await api.deleteScript(targetScriptId);
      await store.refreshScripts();
      showToast('Screenplay deleted');
      navigate('/workspace');
    }
  });

  // Export library button
  const exportLibBtn = document.getElementById('btn-export-library');
  if (exportLibBtn) {
    exportLibBtn.onclick = () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(store.state.scripts, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `scriptora_library_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Exported library manifest (.json)');
    };
  }
}

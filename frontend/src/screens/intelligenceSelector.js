import { renderHeader } from '../components/header.js';
import { renderBottomNav } from '../components/bottomNav.js';
import { store } from '../state/store.js';
import { showToast } from '../components/toast.js';

export function renderIntelligenceSelectorScreen() {
  const scripts = store.state.scripts || [];
  const selectedId = store.state.selectedScriptId || 'chronicles-of-dust';
  const active = scripts.find(s => s.id === selectedId) || scripts[0] || { title: 'Chronicles of Dust', id: 'chronicles-of-dust' };

  return `
    ${renderHeader('Intelligence', 'Script Selector')}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-28 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-4 fade-in">
        
        <!-- Navigation Breadcrumb -->
        <div class="flex items-center justify-between">
          <a href="/workspace" class="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors text-xs font-medium no-underline">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Workspace</span>
          </a>
          <div class="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full font-medium shrink-0">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span class="text-[10px] font-semibold uppercase tracking-wider">Select Script</span>
          </div>
        </div>

        <!-- Section Title -->
        <div class="flex flex-col">
          <h2 class="font-heading text-xl font-bold tracking-tight text-slate-900 leading-tight">Select a screenplay</h2>
          <span class="text-xs text-slate-500 mt-0.5">Choose a script to understand its story, characters and structure.</span>
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
            ${scripts.map(s => {
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
                      <span class="text-[11px] text-slate-500 truncate mt-0.5">${s.format || 'Screenplay'} · ${s.pages} pages · Updated ${s.updated || 'recently'}</span>
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

      <!-- Sticky Bottom Action Tray -->
      <div class="fixed bottom-14 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md px-4 py-2.5 border-t border-slate-100 flex flex-col items-center gap-1 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] max-w-2xl mx-auto">
        <button type="button" id="submit-continue-analysis-btn" class="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all text-white font-medium text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer">
          <span class="truncate font-semibold" id="selector-btn-label">Continue to Context (${active.title})</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
        <span class="text-[10px] text-slate-400 tracking-tight">Establishes selectedScriptId for Script Analysis</span>
      </div>

    </main>

    ${renderBottomNav('intelligence')}
  `;
}

export function attachIntelligenceSelectorEvents(navigate) {
  let selectedId = store.state.selectedScriptId || 'chronicles-of-dust';

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
      store.selectScript(selectedId);
      navigate('/intelligence/context');
    };
  }

  const importBtn = document.getElementById('btn-import-script-modal');
  if (importBtn) {
    importBtn.onclick = () => {
      showToast('Select screenplay file (.fountain, .fdx, .pdf) to parse', 'info');
    };
  }
}

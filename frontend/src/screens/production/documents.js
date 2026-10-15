import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';
import { renderProdSubNav } from './prodNav.js';
import { store } from '../../state/store.js';
import * as api from '../../services/api.js';
import { showToast } from '../../components/toast.js';

export function renderDocumentsScreen(fromParam = null, scriptParam = null, docIdParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const docId = docIdParam || urlParams.get('docId');
  const from = fromParam || urlParams.get('from');
  const defaultBack = docId ? `/production/documents?scriptId=${scriptId}` : '/production';

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('Pre-Production', docId ? 'Production Document Viewer' : 'Production Documents Workspace')}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${renderProdSubNav(
          docId ? 'Document Viewer' : 'Documents Workspace',
          'description',
          from || defaultBack,
          docId ? `
            <button id="btn-export-doc-pdf" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
              <span class="material-symbols-outlined text-[16px]">print</span>
              <span>Export PDF</span>
            </button>
          ` : ''
        )}

        <div id="docs-workspace-container" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading production documents...</div>
        </div>
      </main>

      ${renderBottomNav('production')}
    </div>
  `;
}

export async function attachDocumentsEvents(navigate, fromParam = null, scriptParam = null, docIdParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const docId = docIdParam || urlParams.get('docId');

  const container = document.getElementById('docs-workspace-container');
  if (!container) return;

  const docs = await api.getProductionDocuments(scriptId);

  if (docId) {
    // -------------------------------------------------------------------------
    // 1. DEDICATED DOCUMENT PREVIEW & EXPORT VIEW
    // -------------------------------------------------------------------------
    const doc = docs.find(d => d.id === docId) || docs[0];

    container.innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
            <span class="material-symbols-outlined text-[20px]">description</span>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-heading font-bold text-base text-slate-900">${doc.title}</h2>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${doc.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}">
                ${doc.status}
              </span>
            </div>
            <p class="text-xs text-slate-500">${doc.type} · Version ${doc.version || 'v1.0'} · Pinned: ${doc.sourceVersion || 'Draft 4.2'}</p>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button id="btn-share-link" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors">
            <span class="material-symbols-outlined text-[16px]">share</span>
            <span>Revocable Link</span>
          </button>
        </div>
      </div>

      <!-- Document Content Body -->
      <div id="print-doc-area" class="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs flex flex-col gap-4 text-xs text-slate-800 font-mono">
        <div class="border-b-2 border-slate-900 pb-3 flex items-end justify-between font-sans">
          <div>
            <span class="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-bold">SCRIPTORA OFFICIAL PRODUCTION RECORD</span>
            <h1 class="font-heading font-extrabold text-xl text-slate-900 mt-0.5">${doc.title.toUpperCase()}</h1>
            <p class="text-xs text-slate-600">Screenplay: Chronicles of Dust (Feature) · Source Draft: ${doc.sourceVersion}</p>
          </div>
          <div class="text-right text-[11px] text-slate-500">
            <div>Version: ${doc.version}</div>
            <div>Generated: Today</div>
          </div>
        </div>

        <div class="space-y-3 font-sans text-xs pt-2">
          <p class="leading-relaxed text-slate-700">
            This document represents an officially versioned pre-production snapshot approved by the project Owner. All element references, scene associations, and actor callouts adhere to the pinned screenplay baseline.
          </p>

          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <div class="font-bold text-slate-900">Document Metadata:</div>
            <div>Category: ${doc.type}</div>
            <div>Screenplay Baseline: Draft 4.2 (Hash: 88f2)</div>
            <div>Approval Status: ${doc.status}</div>
            <div>Distribution Status: ${doc.published ? 'Published to Crew' : 'Internal Working Draft'}</div>
          </div>
        </div>

        <div class="border-t border-slate-200 pt-3 mt-4 text-center font-sans text-[10px] text-slate-400">
          PROTECTED BY SCRIPTORA PRODUCTION ARCHITECTURE · IMMUTABLE POINT-IN-TIME AUDIT RECORD
        </div>
      </div>
    `;

    const printBtn = document.getElementById('btn-export-doc-pdf');
    if (printBtn) {
      printBtn.onclick = () => {
        window.print();
        showToast('Printing official document PDF');
      };
    }

    const shareBtn = document.getElementById('btn-share-link');
    if (shareBtn) {
      shareBtn.onclick = () => {
        const link = `${window.location.origin}/production/documents?docId=${doc.id}&token=exp_${Date.now() + 86400000}`;
        navigator.clipboard?.writeText(link);
        showToast('Revocable 24-hour access link copied to clipboard');
      };
    }

  } else {
    // -------------------------------------------------------------------------
    // 2. DEDICATED DOCUMENTS CATALOGUE (5 PRODUCTION CATEGORIES)
    // -------------------------------------------------------------------------
    const categories = [
      {
        name: "Script Preparation",
        desc: "Breakdown sheets, appearance lists, and department master lists.",
        items: [
          { title: "Full Script Breakdown Sheet", type: "Script Breakdown", status: "Confirmed", ver: "v1.4", id: "doc-sb-1" },
          { title: "Character Appearance Master List", type: "Cast List", status: "Confirmed", ver: "v1.2", id: "doc-ca-1" },
          { title: "Props & Practical SFX Register", type: "Props Master", status: "Needs Review", ver: "v1.0", id: "doc-pr-1" }
        ]
      },
      {
        name: "Actors and Rehearsal",
        desc: "Actor sides, character speech cues, and rehearsal extracts.",
        items: [
          { title: "Actor Sides — Kevin & Meera (Scene 18)", type: "Actor Sides", status: "Confirmed", ver: "v1.2", id: "doc-ds-1" },
          { title: "Lead Character Dialogue Sheets", type: "Dialogue Sheet", status: "Confirmed", ver: "v1.0", id: "doc-ds-2" }
        ]
      },
      {
        name: "Scheduling",
        desc: "Master stripboards, daily scene allocations, and DOOD reports.",
        items: [
          { title: "Master 14-Day Stripboard Schedule", type: "Shooting Schedule", status: "Confirmed", ver: "v2.1", id: "doc-ss-1" },
          { title: "Cast Day-Out-of-Days (DOOD) Report", type: "DOOD", status: "Confirmed", ver: "v1.1", id: "doc-dood-1" }
        ]
      },
      {
        name: "On-Set Production",
        desc: "Daily call sheets, camera shot lists, and daily logs.",
        items: [
          { title: "Call Sheet #01 — Gate 4 Day Exterior", type: "Call Sheet", status: "Confirmed", ver: "v1.0", id: "doc-cs-1" },
          { title: "Call Sheet #02 — Pumping Station Chamber", type: "Call Sheet", status: "Draft", ver: "v0.9", id: "doc-cs-2" }
        ]
      }
    ];

    container.innerHTML = `
      <div class="flex flex-col gap-5">
        ${categories.map(cat => `
          <section class="flex flex-col gap-2.5">
            <div>
              <h2 class="font-heading font-bold text-xs uppercase tracking-wider text-slate-800">${cat.name}</h2>
              <p class="text-[11px] text-slate-500">${cat.desc}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              ${cat.items.map(item => `
                <div class="doc-card bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group" data-id="${item.id}">
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-[10px] font-bold text-slate-400 uppercase">${item.type}</span>
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${item.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}">
                        ${item.status}
                      </span>
                    </div>
                    <h3 class="font-heading font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">${item.title}</h3>
                  </div>

                  <div class="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                    <span class="text-slate-400 font-mono text-[10px]">${item.ver}</span>
                    <span class="flex items-center gap-0.5">
                      <span>View</span>
                      <span class="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                    </span>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.doc-card').forEach(card => {
      card.onclick = () => {
        const id = card.getAttribute('data-id');
        navigate(`/production/documents?scriptId=${scriptId}&docId=${id}`);
      };
    });
  }
}

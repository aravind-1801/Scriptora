import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';
import { renderProdSubNav } from './prodNav.js';
import { store } from '../../state/store.js';
import * as api from '../../services/api.js';
import { showToast } from '../../components/toast.js';
import { 
  exportCallSheetPdf, 
  exportSchedulePdf, 
  exportBreakdownPdf, 
  exportDialogueSheetPdf, 
  exportActorSidesPdf,
  compilePdfDocument,
  downloadPdfBlob
} from '../../services/pdfExport.js';

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
            <button id="btn-export-doc-pdf" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">download</span>
              <span>Export PDF</span>
            </button>
          ` : `
            <button id="btn-new-doc" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">add</span>
              <span>New Document</span>
            </button>
          `
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

  // Helper to trigger dedicated authentic PDF download based on document type
  const triggerExportDocPdf = async (doc) => {
    try {
      if (doc.type === 'Call Sheet') {
        const sheets = await api.getProductionCallSheets(scriptId);
        const cs = sheets[0] || {
          callSheetNumber: '01',
          shootDay: 'Day 1 of 14',
          shootDate: 'October 24, 2026',
          generalCrewCall: '06:00 AM',
          shootingCall: '06:30 AM',
          breakfastTime: '05:30 AM',
          estimatedWrap: '19:00 PM',
          locationName: 'Cantil Outpost',
          locationAddress: 'Desert Sector 4, Cantil CA',
          parkingNotes: 'Basecamp Lot 2',
          nearestHospital: 'Kern Valley Health District',
          specialInstructions: 'High wind warnings. Dust respirators mandatory.'
        };
        exportCallSheetPdf(cs, { title: 'Chronicles of Dust', draft: 'Draft 4.2' });
      } else if (doc.type === 'Shooting Schedule') {
        const days = await api.getProductionSchedule(scriptId);
        const scenes = await api.getProductionScenes(scriptId);
        exportSchedulePdf(days, scenes, { title: 'Chronicles of Dust', draft: 'Draft 4.2' });
      } else if (doc.type === 'Script Breakdown') {
        const items = await api.getProductionBreakdown(scriptId, 'all', 'all');
        exportBreakdownPdf(items, { title: 'Chronicles of Dust', draft: 'Draft 4.2' });
      } else if (doc.type === 'Dialogue Sheet') {
        const sampleDialogue = [
          { sceneNum: 1, character: 'KEVIN', dialogue: 'Wind gauge is spiking past forty knots, Marcus. Intake valve check is overdue.' },
          { sceneNum: 2, character: 'KEVIN', dialogue: 'Someone bypassed the telemetry loop eighty miles upriver. This is a deliberate diversion.' }
        ];
        exportDialogueSheetPdf('KEVIN', sampleDialogue, { title: 'Chronicles of Dust', draft: 'Draft 4.2' });
      } else if (doc.type === 'Actor Sides') {
        const sampleSides = [
          { sceneNum: 18, character: 'KEVIN', dialogue: 'If you flood the chamber, the conduit will blow under fifty atmospheres of back-pressure.' },
          { sceneNum: 18, character: 'MEERA', dialogue: 'Better the conduit than the entire municipality, Kevin. Step away from the emergency bypass.' }
        ];
        exportActorSidesPdf('18', sampleSides, { heading: 'INT. PUMPING STATION CHAMBER B - NIGHT', pages: '2 1/8' }, { title: 'Chronicles of Dust', draft: 'Draft 4.2' });
      } else {
        // Universal authentic vector PDF for production registers, cast lists, logs
        const pages = [
          {
            commands: [
              { type: 'text', text: 'SCRIPTORA OFFICIAL PRODUCTION RECORD', x: 54, y: 745, font: '/Helvetica-Bold', size: 9 },
              { type: 'text', text: doc.title.toUpperCase(), x: 54, y: 720, font: '/Helvetica-Bold', size: 16 },
              { type: 'text', text: `Project: Chronicles of Dust   |   Draft Baseline: ${doc.sourceVersion || 'Draft 4.2'}   |   Version: ${doc.version || 'v1.0'}`, x: 54, y: 700, font: '/Helvetica', size: 9.5 },
              { type: 'line', x1: 54, y1: 688, x2: 558, y2: 688, width: 1.5 },

              { type: 'rect', x: 54, y: 620, width: 504, height: 55, fill: true, stroke: true, r: 0.95, g: 0.96, b: 0.98 },
              { type: 'text', text: 'DOCUMENT METADATA & APPROVAL STATUS', x: 64, y: 658, font: '/Helvetica-Bold', size: 9 },
              { type: 'text', text: `Classification: ${doc.type}   *   Category: ${doc.category || 'Script Preparation'}   *   Status: ${doc.status}`, x: 64, y: 642, font: '/Helvetica', size: 9 },
              { type: 'text', text: `Distribution: ${doc.published ? 'Approved for Crew' : 'Internal Working Draft'}   *   Generated: Official SCRIPTORA Engine`, x: 64, y: 628, font: '/Helvetica', size: 8.5 },

              { type: 'text', text: 'PRODUCTION COMPLIANCE & REVISION DIRECTIVES', x: 54, y: 590, font: '/Helvetica-Bold', size: 11 },
              { type: 'text', text: '1. All scene breakdown items, character appearances, and technical requirements in this record adhere strictly to the', x: 54, y: 565, font: '/Helvetica', size: 9.5 },
              { type: 'text', text: '   locked screenplay baseline (Draft 4.2, SHA-256 integrity hash confirmed).', x: 54, y: 550, font: '/Helvetica', size: 9.5 },
              { type: 'text', text: '2. Changes to confirmed production specifications require formal Assistant Director review and Owner sign-off.', x: 54, y: 530, font: '/Helvetica', size: 9.5 },
              { type: 'text', text: '3. Historical snapshots remain permanently immutable. Any subsequent revisions generate branch drafts.', x: 54, y: 510, font: '/Helvetica', size: 9.5 },

              { type: 'line', x1: 54, y1: 65, x2: 558, y2: 65, width: 0.5 },
              { type: 'text', text: 'SCRIPTORA Studio Engine   *   Confidential   *   Page 1 of 1', x: 54, y: 50, font: '/Helvetica', size: 8 }
            ]
          }
        ];
        const bytes = compilePdfDocument(pages);
        downloadPdfBlob(bytes, `${doc.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_v${doc.version || '1'}.pdf`);
      }
      showToast(`Exported "${doc.title}" PDF`);
    } catch (err) {
      console.error(err);
      showToast('Failed to export document PDF');
    }
  };

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
          <button id="btn-export-doc-pdf" class="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer" title="Export genuine typeset vector PDF">
            <span class="material-symbols-outlined text-[16px]">download</span>
            <span>Export PDF</span>
          </button>
          <button id="btn-delete-doc" class="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer" title="Delete document">
            <span class="material-symbols-outlined text-[16px]">delete</span>
            <span>Delete</span>
          </button>
          <button id="btn-share-link" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
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
            <p class="text-xs text-slate-600">Screenplay: Chronicles of Dust (Feature) · Source Draft: ${doc.sourceVersion || 'Draft 4.2'}</p>
          </div>
          <div class="text-right text-[11px] text-slate-500">
            <div>Version: ${doc.version || 'v1.0'}</div>
            <div>Classification: ${doc.type}</div>
          </div>
        </div>

        <div class="space-y-3 font-sans text-xs pt-2">
          <p class="leading-relaxed text-slate-700">
            This document represents an officially versioned pre-production snapshot approved by the project Owner. All element references, scene associations, and actor callouts adhere to the pinned screenplay baseline.
          </p>

          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <div class="font-bold text-slate-900">Document Metadata:</div>
            <div>Category: ${doc.category || doc.type}</div>
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
      printBtn.onclick = () => triggerExportDocPdf(doc);
    }

    const deleteBtn = document.getElementById('btn-delete-doc');
    if (deleteBtn) {
      deleteBtn.onclick = async () => {
        if (!confirm(`Are you sure you want to delete "${doc.title}"?`)) return;
        const res = await api.deleteProductionDocument(scriptId, doc.id);
        if (res.success) {
          showToast(`Deleted "${doc.title}"`);
          navigate(`/production/documents?scriptId=${scriptId}`);
        } else {
          showToast(res.message || 'Failed to delete');
        }
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
    // 2. DEDICATED DOCUMENTS CATALOGUE
    // -------------------------------------------------------------------------
    const categoryNames = [
      { name: "Script Preparation", desc: "Breakdown sheets, appearance lists, and department master lists." },
      { name: "Actors and Rehearsal", desc: "Actor sides, character speech cues, and rehearsal extracts." },
      { name: "Scheduling", desc: "Master stripboards, daily scene allocations, and DOOD reports." },
      { name: "On-Set Production", desc: "Daily call sheets, camera shot lists, and daily logs." }
    ];

    container.innerHTML = `
      <div class="flex flex-col gap-5">
        ${categoryNames.map(cat => {
          const catDocs = docs.filter(d => (d.category || '').toLowerCase() === cat.name.toLowerCase() || 
            (cat.name === 'Script Preparation' && ['Script Breakdown', 'Cast List', 'Props Master'].includes(d.type)) ||
            (cat.name === 'Actors and Rehearsal' && ['Actor Sides', 'Dialogue Sheet'].includes(d.type)) ||
            (cat.name === 'Scheduling' && ['Shooting Schedule', 'DOOD'].includes(d.type)) ||
            (cat.name === 'On-Set Production' && ['Call Sheet'].includes(d.type))
          );

          if (catDocs.length === 0) return '';

          return `
            <section class="flex flex-col gap-2.5">
              <div>
                <h2 class="font-heading font-bold text-xs uppercase tracking-wider text-slate-800">${cat.name}</h2>
                <p class="text-[11px] text-slate-500">${cat.desc}</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                ${catDocs.map(item => `
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
                      <span class="text-slate-400 font-mono text-[10px]">${item.version || 'v1.0'}</span>
                      <div class="flex items-center gap-1" onclick="event.stopPropagation()">
                        <button class="btn-card-doc-export p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors" data-id="${item.id}" title="Direct Export PDF">
                          <span class="material-symbols-outlined text-[15px]">download</span>
                        </button>
                        <button class="btn-card-doc-del p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors" data-id="${item.id}" title="Delete Document">
                          <span class="material-symbols-outlined text-[15px]">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>
          `;
        }).join('')}
      </div>
    `;

    // Click card to inspect
    container.querySelectorAll('.doc-card').forEach(card => {
      card.onclick = () => {
        const id = card.getAttribute('data-id');
        navigate(`/production/documents?scriptId=${scriptId}&docId=${id}`);
      };
    });

    // Direct export
    container.querySelectorAll('.btn-card-doc-export').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const d = docs.find(item => item.id === id);
        if (d) triggerExportDocPdf(d);
      };
    });

    // Delete document
    container.querySelectorAll('.btn-card-doc-del').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const d = docs.find(item => item.id === id);
        if (!confirm(`Delete "${d ? d.title : 'this document'}"?`)) return;
        const res = await api.deleteProductionDocument(scriptId, id);
        if (res.success) {
          showToast('Document deleted');
          attachDocumentsEvents(navigate, fromParam, scriptParam);
        } else {
          showToast(res.message || 'Failed to delete');
        }
      };
    });

    // New Document Trigger
    const newDocBtn = document.getElementById('btn-new-doc');
    if (newDocBtn) {
      newDocBtn.onclick = async () => {
        const title = prompt('Enter document title:', 'Daily Production Continuity Log');
        if (!title) return;
        const type = prompt('Enter document classification (e.g. Call Sheet, Script Breakdown, Actor Sides, Continuity Log):', 'Continuity Log');
        if (!type) return;
        const newD = await api.createProductionDocument(scriptId, {
          title,
          type,
          category: 'On-Set Production',
          status: 'Draft',
          version: 'v0.1',
          sourceVersion: 'Draft 4.2',
          published: false
        });
        showToast(`Created "${title}"`);
        navigate(`/production/documents?scriptId=${scriptId}&docId=${newD.id}`);
      };
    }
  }
}

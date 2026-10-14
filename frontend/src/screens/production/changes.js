import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';
import { renderProdSubNav } from './prodNav.js';
import { store } from '../../state/store.js';
import * as api from '../../services/api.js';
import { showToast } from '../../components/toast.js';

export function renderChangesScreen(fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('Pre-Production', 'Production Change Proposals & Approvals')}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${renderProdSubNav('Change Proposals & Approvals', 'rule', '/production', `
          <button id="btn-new-proposal" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Submit Proposal</span>
          </button>
        `)}

        <!-- Banner Explaining Owner Authority & Version Integrity -->
        <div class="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-3.5 flex items-start justify-between gap-3 shadow-2xs">
          <div class="flex items-start gap-2.5">
            <span class="material-symbols-outlined text-[20px] text-amber-600 shrink-0 mt-0.5">verified_user</span>
            <div class="text-xs text-amber-950 leading-relaxed">
              <span class="font-bold">Collaborator Proposal Governance:</span> Changes to confirmed production logistics remain staged until reviewed and confirmed by the project <strong class="underline">Owner</strong>. No silent overwrites or unreviewed modifications.
            </div>
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold shrink-0">Review Queue</span>
        </div>

        <!-- Proposals Stream List -->
        <div id="changes-proposals-stream" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading change proposal queue...</div>
        </div>

      </main>

      ${renderBottomNav('production')}

      <!-- New Proposal Modal -->
      <div id="modal-submit-proposal" class="hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div class="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 class="font-heading font-bold text-sm text-slate-900">Submit Production Change Proposal</h3>
            <button id="close-proposal-modal" class="text-slate-400 hover:text-slate-700">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <form id="form-submit-proposal" class="p-5 flex flex-col gap-3 text-xs">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Proposal Title</label>
              <input type="text" id="prop-title" required placeholder="e.g. Add Standby Water Truck for Scene 18" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Category</label>
              <select id="prop-cat" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
                <option value="SFX / Logistics">SFX / Logistics</option>
                <option value="Schedule">Schedule & Stripboard</option>
                <option value="Cast & Wardrobe">Cast & Wardrobe</option>
                <option value="Stunts">Stunts & Safety</option>
                <option value="Equipment">Camera & Equipment</option>
              </select>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Rationale / Description</label>
              <textarea id="prop-desc" rows="3" required placeholder="Detailed explanation and reasons for modification..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600 resize-none"></textarea>
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Impact Analysis (Budget, Safety, Turnaround)</label>
              <input type="text" id="prop-impact" placeholder="e.g. Affects crew call times for Scene 18" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none">
            </div>
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button type="button" id="btn-cancel-prop" class="px-3.5 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100 font-medium">Cancel</button>
              <button type="submit" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs">Submit for Owner Review</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  `;
}

export async function attachChangesEvents(navigate, fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const userRole = localStorage.getItem('scriptora_prod_role') || 'Owner';
  const isOwner = userRole === 'Owner';

  const container = document.getElementById('changes-proposals-stream');
  if (!container) return;

  const renderProposals = async () => {
    const proposals = await api.getProductionProposals(scriptId);

    if (proposals.length === 0) {
      container.innerHTML = `
        <div class="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-slate-400 text-xs">
          No proposals in the review queue.
        </div>
      `;
      return;
    }

    container.innerHTML = proposals.map(p => {
      const isPending = p.status === 'Awaiting review';
      const isAccepted = p.status === 'Accepted';
      const isRejected = p.status === 'Rejected';
      const isConflict = p.status === 'Conflict';

      const badge = isAccepted
        ? `<span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">check_circle</span>Accepted</span>`
        : isRejected
        ? `<span class="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">cancel</span>Rejected</span>`
        : isConflict
        ? `<span class="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">warning</span>Conflict Flagged</span>`
        : `<span class="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">hourglass_top</span>Awaiting Owner Review</span>`;

      return `
        <div class="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs flex flex-col gap-3">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">${p.category}</span>
                <span class="text-slate-300">•</span>
                <span class="text-[11px] font-semibold text-slate-600">Submitted by ${p.submittedBy} (${p.submitterRole})</span>
                ${badge}
              </div>
              <h3 class="font-heading font-bold text-sm text-slate-900 mt-1">${p.title}</h3>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">${p.description}</p>
            </div>
            <span class="text-[10px] text-slate-400 font-mono shrink-0">${p.sourceVersion || 'Draft 4.2'}</span>
          </div>

          <!-- Impact Box -->
          <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-xs">
            <span class="material-symbols-outlined text-[16px] text-slate-400">info</span>
            <span class="text-slate-600"><strong class="text-slate-800">Impact:</strong> ${p.impact}</span>
          </div>

          ${p.resolutionNotes ? `
            <div class="p-2.5 rounded-xl bg-slate-100/70 border border-slate-200/60 text-[11px] text-slate-600 font-sans">
              <span class="font-bold text-slate-800">Resolution Note:</span> ${p.resolutionNotes}
            </div>
          ` : ''}

          <!-- Owner Review Controls -->
          ${isPending && isOwner ? `
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button class="btn-conflict-prop px-3 py-1.5 rounded-xl text-amber-700 bg-amber-50 hover:bg-amber-100 text-xs font-semibold transition-colors" data-id="${p.id}">
                Flag Conflict
              </button>
              <button class="btn-reject-prop px-3 py-1.5 rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 text-xs font-semibold transition-colors" data-id="${p.id}">
                Reject Proposal
              </button>
              <button class="btn-accept-prop px-4 py-1.5 rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold shadow-2xs transition-all flex items-center gap-1" data-id="${p.id}">
                <span class="material-symbols-outlined text-[16px]">check</span>
                <span>Accept & Update Record</span>
              </button>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    // Attach Proposal Review Actions
    container.querySelectorAll('.btn-accept-prop').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        const notes = prompt("Enter resolution acceptance note (optional):", "Approved by Owner. Records updated.") || "Approved by Owner.";
        await api.reviewProductionProposal(scriptId, id, 'accept', notes);
        showToast('Proposal accepted. Production records updated.');
        renderProposals();
      };
    });

    container.querySelectorAll('.btn-reject-prop').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        const notes = prompt("Enter rejection reason:", "Scheduling conflict with Day 2 shooting window.") || "Declined during Owner review.";
        await api.reviewProductionProposal(scriptId, id, 'reject', notes);
        showToast('Proposal rejected.');
        renderProposals();
      };
    });

    container.querySelectorAll('.btn-conflict-prop').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        await api.reviewProductionProposal(scriptId, id, 'conflict', 'Underlying draft conflict flagged.');
        showToast('Conflict status flagged.');
        renderProposals();
      };
    });
  };

  await renderProposals();

  // Modal Submit Proposal
  const modal = document.getElementById('modal-submit-proposal');
  const btnOpen = document.getElementById('btn-new-proposal');
  const btnClose = document.getElementById('close-proposal-modal');
  const btnCancel = document.getElementById('btn-cancel-prop');
  const form = document.getElementById('form-submit-proposal');

  const openM = () => modal?.classList.remove('hidden');
  const closeM = () => modal?.classList.add('hidden');

  if (btnOpen) btnOpen.onclick = openM;
  if (btnClose) btnClose.onclick = closeM;
  if (btnCancel) btnCancel.onclick = closeM;

  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const title = document.getElementById('prop-title')?.value;
      const category = document.getElementById('prop-cat')?.value;
      const desc = document.getElementById('prop-desc')?.value;
      const impact = document.getElementById('prop-impact')?.value;

      await api.submitProductionProposal(scriptId, {
        title,
        category,
        description: desc,
        impact: impact || "Modifies production schedule & logistics budget",
        submittedBy: store.state.currentUser?.name || "Arun Kumar",
        submitterRole: userRole
      });
      showToast('Proposal submitted for review');
      closeM();
      form.reset();
      renderProposals();
    };
  }
}

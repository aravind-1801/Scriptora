import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';
import { renderProdSubNav } from './prodNav.js';
import { store } from '../../state/store.js';
import * as api from '../../services/api.js';
import { showToast } from '../../components/toast.js';

export function renderCallSheetsScreen(fromParam = null, scriptParam = null, csIdParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const csId = csIdParam || urlParams.get('csId');
  const isNew = urlParams.get('action') === 'new';

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('Pre-Production', csId ? 'Call Sheet Inspector' : isNew ? 'Create New Call Sheet' : 'Call Sheets Workspace')}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${renderProdSubNav(
          csId ? 'Call Sheet Detail' : isNew ? 'New Call Sheet' : 'Call Sheets',
          'assignment',
          csId || isNew ? `/production/call-sheets?scriptId=${scriptId}` : '/production',
          !csId && !isNew ? `
            <a href="/production/call-sheets?scriptId=${scriptId}&action=new" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all">
              <span class="material-symbols-outlined text-[16px]">add</span>
              <span>New Call Sheet</span>
            </a>
          ` : ''
        )}

        <div id="callsheet-view-container" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading call sheet records...</div>
        </div>
      </main>

      ${renderBottomNav('production')}
    </div>
  `;
}

export async function attachCallSheetsEvents(navigate, fromParam = null, scriptParam = null, csIdParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const csId = csIdParam || urlParams.get('csId');
  const isNew = urlParams.get('action') === 'new';

  const container = document.getElementById('callsheet-view-container');
  if (!container) return;

  const userRole = localStorage.getItem('scriptora_prod_role') || 'Owner';
  const isOwner = userRole === 'Owner';

  if (isNew) {
    // -------------------------------------------------------------------------
    // 1. CREATE NEW CALL SHEET (SCHEDULE-LINKED VS MANUAL)
    // -------------------------------------------------------------------------
    const schedule = await api.getProductionSchedule(scriptId);

    container.innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col gap-4">
        <div class="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h2 class="font-heading font-bold text-base text-slate-900">Create Production Call Sheet</h2>
            <p class="text-xs text-slate-500 mt-0.5">Select a confirmed shooting day or configure a standalone manual draft.</p>
          </div>
          <span class="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold">Draft 4.2</span>
        </div>

        <!-- Creation Mode Tabs -->
        <div class="flex items-center gap-2 p-1 bg-slate-100 rounded-xl max-w-sm">
          <button id="tab-linked" class="flex-1 py-1 text-xs font-semibold rounded-lg bg-white text-blue-700 shadow-2xs">
            Schedule-Linked
          </button>
          <button id="tab-manual" class="flex-1 py-1 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900">
            Standalone Manual
          </button>
        </div>

        <form id="form-create-callsheet" class="flex flex-col gap-3 text-xs">
          <!-- Linked Shoot Day Picker -->
          <div id="section-linked-day">
            <label class="font-semibold text-slate-700 block mb-1">Select Confirmed Shoot Day</label>
            <select id="new-cs-day" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none cursor-pointer">
              ${schedule.map(d => `
                <option value="${d.dayNumber}" data-title="${d.title}" data-loc="${d.location}" data-date="${d.date}">
                  Day ${d.dayNumber} of 14 · ${d.date} — ${d.title} (${d.location})
                </option>
              `).join('')}
            </select>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Shooting Date</label>
              <input type="text" id="new-cs-date" value="Monday, Oct 26, 2026" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">General Crew Call Time</label>
              <input type="text" id="new-cs-crewcall" value="06:00 AM" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Location Name & Facility</label>
              <input type="text" id="new-cs-locname" value="Perimeter Sector 9" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none">
            </div>
            <div>
              <label class="font-semibold text-slate-700 block mb-1">Physical Address / Map GPS</label>
              <input type="text" id="new-cs-address" value="Cantil Desert Facility, Cantil, CA" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none">
            </div>
          </div>

          <div>
            <label class="font-semibold text-slate-700 block mb-1">Emergency Hospital & Contact</label>
            <input type="text" id="new-cs-hospital" value="Kern Valley Healthcare District, 6412 Laurel Ave, Lake Isabella, CA (Ph: 760-379-2681)" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none">
          </div>

          <div>
            <label class="font-semibold text-slate-700 block mb-1">Parking & Basecamp Instructions</label>
            <textarea id="new-cs-parking" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none resize-none">Basecamp Lot 3. Security badge inspection at gate.</textarea>
          </div>

          <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <a href="/production/call-sheets?scriptId=${scriptId}" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium">Cancel</a>
            <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs">
              Generate Draft Call Sheet
            </button>
          </div>
        </form>
      </div>
    `;

    // Creation Tabs
    const tabLinked = document.getElementById('tab-linked');
    const tabManual = document.getElementById('tab-manual');
    const secLinked = document.getElementById('section-linked-day');

    if (tabLinked && tabManual) {
      tabLinked.onclick = () => {
        tabLinked.classList.add('bg-white', 'text-blue-700', 'shadow-2xs');
        tabManual.classList.remove('bg-white', 'text-blue-700', 'shadow-2xs');
        secLinked?.classList.remove('hidden');
      };
      tabManual.onclick = () => {
        tabManual.classList.add('bg-white', 'text-blue-700', 'shadow-2xs');
        tabLinked.classList.remove('bg-white', 'text-blue-700', 'shadow-2xs');
        secLinked?.classList.add('hidden');
      };
    }

    const form = document.getElementById('form-create-callsheet');
    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const shootDayNum = document.getElementById('new-cs-day')?.value || '3';
        const date = document.getElementById('new-cs-date')?.value;
        const crewCall = document.getElementById('new-cs-crewcall')?.value;
        const locName = document.getElementById('new-cs-locname')?.value;
        const address = document.getElementById('new-cs-address')?.value;
        const hospital = document.getElementById('new-cs-hospital')?.value;
        const parking = document.getElementById('new-cs-parking')?.value;

        const newSheet = await api.createProductionCallSheet(scriptId, {
          shootDay: `Day ${shootDayNum} of 14`,
          shootDate: date,
          generalCrewCall: crewCall,
          shootingCall: "06:30 AM",
          locationName: locName,
          locationAddress: address,
          nearestHospital: hospital,
          parkingNotes: parking
        });
        showToast(`Created Call Sheet #${newSheet.callSheetNumber}`);
        navigate(`/production/call-sheets?scriptId=${scriptId}&csId=${newSheet.id}`);
      };
    }

  } else if (csId) {
    // -------------------------------------------------------------------------
    // 2. DEDICATED CALL SHEET DETAIL & OWNER PUBLISH WORKSPACE
    // -------------------------------------------------------------------------
    const cs = await api.getProductionCallSheet(scriptId, csId);
    if (!cs) {
      container.innerHTML = `<div class="p-8 text-center text-rose-500 text-xs">Call sheet not found.</div>`;
      return;
    }

    const isPublished = cs.status === 'Confirmed' || cs.isPublished;

    container.innerHTML = `
      <!-- Top Action Banner -->
      <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <div class="w-10 h-10 rounded-xl ${isPublished ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'} flex items-center justify-center shrink-0 border">
            <span class="material-symbols-outlined text-[20px]">${isPublished ? 'verified' : 'pending'}</span>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-heading font-bold text-base text-slate-900">Call Sheet #${cs.callSheetNumber}</h2>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}">
                ${isPublished ? 'Published Snapshot' : 'Draft — Pending Owner Approval'}
              </span>
            </div>
            <p class="text-xs text-slate-500">${cs.shootDay} · ${cs.shootDate}</p>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button id="btn-print-callsheet" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors">
            <span class="material-symbols-outlined text-[16px]">print</span>
            <span>Print / PDF</span>
          </button>
          ${!isPublished && isOwner ? `
            <button id="btn-publish-callsheet" class="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Approve & Publish</span>
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Printable Call Sheet Container -->
      <div id="printable-callsheet" class="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs flex flex-col gap-5 text-xs text-slate-800">
        <!-- Call Sheet Masthead -->
        <div class="border-b-2 border-slate-900 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span class="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-bold">SCRIPTORA OFFICIAL CALL SHEET</span>
            <h1 class="font-heading font-extrabold text-xl text-slate-900 leading-tight">CHRONICLES OF DUST</h1>
            <p class="text-xs text-slate-600 font-medium">Production Company: Badlands Anthology LLC · Baseline: Draft 4.2</p>
          </div>
          <div class="text-left sm:text-right">
            <div class="font-mono text-sm font-bold text-slate-900">${cs.shootDay.toUpperCase()}</div>
            <div class="text-xs text-slate-600 font-semibold">${cs.shootDate}</div>
          </div>
        </div>

        <!-- Times & Weather Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase">General Crew Call</span>
            <div class="font-heading font-bold text-sm text-slate-900">${cs.generalCrewCall}</div>
          </div>
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase">Shooting Call</span>
            <div class="font-heading font-bold text-sm text-blue-700">${cs.shootingCall}</div>
          </div>
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase">Breakfast</span>
            <div class="font-heading font-bold text-sm text-slate-900">${cs.breakfastTime}</div>
          </div>
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase">Estimated Wrap</span>
            <div class="font-heading font-bold text-sm text-slate-900">${cs.estimatedWrap}</div>
          </div>
        </div>

        <!-- Location & Hospital Directives -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="p-3.5 rounded-xl border border-slate-200 flex flex-col gap-1">
            <span class="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px] text-blue-600">location_on</span>
              <span>Set Location & Parking</span>
            </span>
            <div class="font-semibold text-slate-900 text-xs">${cs.locationName}</div>
            <p class="text-slate-600 text-[11px]">${cs.locationAddress}</p>
            <p class="text-slate-500 text-[11px] mt-1 italic">${cs.parkingNotes}</p>
          </div>
          <div class="p-3.5 rounded-xl border border-rose-200 bg-rose-50/30 flex flex-col gap-1">
            <span class="text-[10px] font-bold text-rose-700 uppercase flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">local_hospital</span>
              <span>Nearest Emergency Hospital</span>
            </span>
            <p class="text-slate-800 text-[11px] font-medium leading-relaxed">${cs.nearestHospital}</p>
            <div class="text-[10px] text-slate-500 mt-1">Weather: ${cs.weatherSummary}</div>
          </div>
        </div>

        <!-- Scenes to Shoot Schedule Table -->
        <div>
          <h3 class="font-heading font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">Scenes To Shoot</h3>
          <div class="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
            <div class="bg-slate-100/80 px-3 py-1.5 flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase">
              <span class="w-16">Scene #</span>
              <span class="flex-1">Heading / Description</span>
              <span class="w-20 text-center">Pages</span>
              <span class="w-32 text-right">Cast Members</span>
            </div>
            ${(cs.scenes || []).map(s => `
              <div class="px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                <span class="w-16 font-mono font-bold text-blue-700">Sc ${s.sceneNumber}</span>
                <div class="flex-1 min-w-0 pr-2">
                  <div class="font-semibold text-slate-900 truncate">${s.heading}</div>
                  <div class="text-[11px] text-slate-500 truncate">${s.desc}</div>
                </div>
                <span class="w-20 text-center font-mono text-[11px]">${s.pages}</span>
                <span class="w-32 text-right font-medium text-[11px] text-slate-700 truncate">${(s.cast || []).join(', ')}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Cast & Talent Call Table -->
        <div>
          <h3 class="font-heading font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">Cast & Talent Calls</h3>
          <div class="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
            <div class="bg-slate-100/80 px-3 py-1.5 flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase">
              <span class="w-32">Character</span>
              <span class="flex-1">Actor</span>
              <span class="w-20 text-center">Pickup</span>
              <span class="w-20 text-center">H/MU</span>
              <span class="w-20 text-right">Set Call</span>
            </div>
            ${(cs.castCalls || []).map(c => `
              <div class="px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                <span class="w-32 font-bold text-slate-900">${c.character}</span>
                <span class="flex-1 font-medium text-slate-700">${c.actor}</span>
                <span class="w-20 text-center font-mono text-[11px] text-slate-600">${c.pickup}</span>
                <span class="w-20 text-center font-mono text-[11px] text-slate-600">${c.hmuCall}</span>
                <span class="w-20 text-right font-mono font-bold text-blue-700">${c.onSet}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Special Notes Footer -->
        <div class="p-3 bg-amber-50/50 border border-amber-200/80 rounded-xl">
          <span class="font-bold text-amber-900 uppercase text-[10px]">Safety & Production Directives:</span>
          <p class="text-amber-800 text-[11px] mt-0.5 leading-relaxed">${cs.specialInstructions}</p>
        </div>
      </div>
    `;

    // Print / PDF Snapshot Trigger
    const printBtn = document.getElementById('btn-print-callsheet');
    if (printBtn) {
      printBtn.onclick = () => {
        window.print();
        showToast('Print dialog launched');
      };
    }

    // Owner Approve & Publish Trigger
    const pubBtn = document.getElementById('btn-publish-callsheet');
    if (pubBtn) {
      pubBtn.onclick = async () => {
        if (!confirm('Approve and lock this call sheet as an official immutable snapshot?')) return;
        await api.publishProductionCallSheet(scriptId, cs.id);
        showToast('Call Sheet published & snapshot locked');
        navigate(`/production/call-sheets?scriptId=${scriptId}&csId=${cs.id}`);
      };
    }

  } else {
    // -------------------------------------------------------------------------
    // 3. CALL SHEETS MASTER CATALOGUE
    // -------------------------------------------------------------------------
    const sheets = await api.getProductionCallSheets(scriptId);

    container.innerHTML = `
      <div class="flex items-center justify-between">
        <h2 class="font-heading font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[18px] text-blue-600">assignment</span>
          <span>Call Sheets Catalogue (${sheets.length})</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${sheets.map(cs => {
          const isPub = cs.status === 'Confirmed' || cs.isPublished;
          return `
            <div class="cs-card bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group" data-id="${cs.id}">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2">
                    <div class="w-10 h-10 rounded-xl ${isPub ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'} flex items-center justify-center font-mono font-bold text-sm">
                      #${cs.callSheetNumber}
                    </div>
                    <div>
                      <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">${cs.shootDay}</h3>
                      <p class="text-[11px] text-slate-500">${cs.shootDate}</p>
                    </div>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${isPub ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}">
                    ${isPub ? 'Published' : 'Draft'}
                  </span>
                </div>

                <div class="space-y-1.5 text-xs text-slate-600 mt-2">
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[15px] text-slate-400">schedule</span>
                    <span>General Call: <strong class="text-slate-800">${cs.generalCrewCall}</strong> · Set: <strong class="text-blue-600">${cs.shootingCall}</strong></span>
                  </div>
                  <div class="flex items-center gap-1.5 truncate">
                    <span class="material-symbols-outlined text-[15px] text-slate-400">location_on</span>
                    <span class="truncate">${cs.locationName}</span>
                  </div>
                </div>
              </div>

              <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>View & Print Call Sheet</span>
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.querySelectorAll('.cs-card').forEach(card => {
      card.onclick = () => {
        const id = card.getAttribute('data-id');
        navigate(`/production/call-sheets?scriptId=${scriptId}&csId=${id}`);
      };
    });
  }
}

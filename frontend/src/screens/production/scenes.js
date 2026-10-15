import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';
import { renderProdSubNav } from './prodNav.js';
import { store } from '../../state/store.js';
import * as api from '../../services/api.js';
import { showToast } from '../../components/toast.js';

// Category grouping configuration (Disciplined neutral palette matching Intelligence)
const SCENE_CATEGORIES = [
  { key: 'Cast', title: 'Cast & Characters', icon: 'person' },
  { key: 'Locations', title: 'Locations & Environment', icon: 'location_on' },
  { key: 'Props', title: 'Props & Sourced Assets', icon: 'inventory_2' },
  { key: 'Practical FX', title: 'Practical FX & Special FX', icon: 'science' },
  { key: 'Stunts', title: 'Stunts & Action Rigging', icon: 'sports_kabaddi' },
  { key: 'Costumes', title: 'Costumes & Wardrobe', icon: 'checkroom' },
  { key: 'Vehicles', title: 'Vehicles & Heavy Equipment', icon: 'commute' },
  { key: 'Sound', title: 'Sound & Audio Requirements', icon: 'music_note' },
  { key: 'Hair & Makeup', title: 'Hair & Special Makeup', icon: 'face' }
];

export function renderScenesScreen(fromParam = null, scriptParam = null, sceneIdParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const sceneId = sceneIdParam || urlParams.get('sceneId');
  const from = fromParam || urlParams.get('from');

  const defaultBackUrl = sceneId ? `/production/scenes?scriptId=${scriptId}` : '/production';
  const backUrl = from || defaultBackUrl;
  const currentSceneLocation = `/production/scenes?scriptId=${scriptId}${sceneId ? '&sceneId=' + sceneId : ''}${from ? '&from=' + encodeURIComponent(from) : ''}`;

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('Pre-Production', sceneId ? 'Scene Details & Logistics' : 'Scene Hub & Logistics')}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${renderProdSubNav(
          sceneId ? `Scene Logistics` : 'Scene Hub (18 Scenes)',
          sceneId ? 'movie' : 'hub',
          backUrl,
          sceneId ? `
            <a href="/production/dialogue-sides?scriptId=${scriptId}&scene=${sceneId}&from=${encodeURIComponent(currentSceneLocation)}" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors">
              <span class="material-symbols-outlined text-[15px]">record_voice_over</span>
              <span>Actor Sides</span>
            </a>
          ` : ''
        )}

        <div id="scenes-view-container" class="flex flex-col gap-3">
          <div class="p-8 text-center text-slate-400 text-xs">Loading scene records...</div>
        </div>
      </main>

      ${renderBottomNav('production')}
    </div>
  `;
}

export async function attachScenesEvents(navigate, fromParam = null, scriptParam = null, sceneIdParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const sceneId = sceneIdParam || urlParams.get('sceneId');

  const container = document.getElementById('scenes-view-container');
  if (!container) return;

  if (sceneId) {
    // -------------------------------------------------------------------------
    // RENDER DEDICATED SCENE DETAIL VIEW
    // -------------------------------------------------------------------------
    const scene = await api.getProductionScene(scriptId, sceneId);
    if (!scene) {
      container.innerHTML = `<div class="p-8 text-center text-rose-500 text-xs">Scene not found.</div>`;
      return;
    }

    const elements = scene.elements || [];

    // Group elements by category
    const categorizedElements = {};
    elements.forEach(elem => {
      const cat = elem.category || 'Other';
      if (!categorizedElements[cat]) categorizedElements[cat] = [];
      categorizedElements[cat].push(elem);
    });

    // Counts summary pills
    const categoryCountsHtml = SCENE_CATEGORIES.map(c => {
      const count = (categorizedElements[c.key] || []).length;
      if (count === 0) return '';
      return `
        <span class="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50 text-[11px] font-medium text-slate-700 flex items-center gap-1">
          <span class="material-symbols-outlined text-[13px] text-slate-400">${c.icon}</span>
          <span>${c.key}: <strong>${count}</strong></span>
        </span>
      `;
    }).filter(Boolean).join('');

    // Category sections html
    const categorySectionsHtml = SCENE_CATEGORIES.map(cfg => {
      const catList = categorizedElements[cfg.key];
      if (!catList || catList.length === 0) return '';

      return `
        <div class="flex flex-col gap-2 pt-2 border-t border-slate-100 first:border-t-0 first:pt-0">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5 font-heading font-semibold text-xs text-slate-800">
              <span class="material-symbols-outlined text-[15px] text-slate-400">${cfg.icon}</span>
              <span>${cfg.title}</span>
              <span class="text-[10px] text-slate-400 font-normal">(${catList.length})</span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${catList.map(e => {
              const isConfirmed = e.status === 'Confirmed';
              const statusBadge = isConfirmed
                ? `<span class="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[10px] font-medium border border-slate-200 flex items-center gap-1"><span class="material-symbols-outlined text-[11px] text-emerald-600">check</span>Confirmed</span>`
                : `<span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-medium border border-amber-200">Needs Review</span>`;

              // Category tailored fields
              let customMeta = '';
              if (cfg.key === 'Cast') {
                const isUncast = !e.assignedActor || e.assignedActor.toLowerCase().includes('unassigned') || e.assignedActor.toLowerCase().includes('open');
                customMeta = `
                  <div class="mt-1.5 pt-1.5 border-t border-slate-100 flex flex-col gap-1 text-[11px]">
                    <div class="flex items-center justify-between">
                      <span class="text-slate-400">Assigned Actor:</span>
                      ${isUncast ? `<span class="text-amber-700 italic font-semibold">Unassigned / Open Role</span>` : `<span class="font-bold text-indigo-700">${e.assignedActor}</span>`}
                    </div>
                    ${e.castingStatus ? `
                      <div class="flex items-center justify-between">
                        <span class="text-slate-400">Casting Status:</span>
                        <span class="font-medium text-slate-700">${e.castingStatus}</span>
                      </div>
                    ` : ''}
                    ${e.actorAvailability ? `
                      <div class="text-[10px] text-slate-500 font-medium truncate">
                        Schedule: ${e.actorAvailability}
                      </div>
                    ` : ''}
                  </div>
                `;
              } else if (cfg.key === 'Props') {
                customMeta = `
                  <div class="mt-1.5 pt-1.5 border-t border-slate-100 flex flex-wrap gap-1.5 text-[10px]">
                    <span class="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-100">${e.sourcingType || 'Hero Prop'}</span>
                    <span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">Qty: ${e.quantity || '1'}</span>
                    <span class="px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 font-medium">${e.readinessStatus || 'Ready'}</span>
                  </div>
                  ${e.continuityNotes ? `<div class="text-[10px] text-slate-400 mt-1 italic truncate">Continuity: ${e.continuityNotes}</div>` : ''}
                `;
              } else if (cfg.key === 'Practical FX') {
                customMeta = `
                  <div class="mt-1.5 pt-1.5 border-t border-slate-100 flex flex-col gap-1 text-[10px]">
                    <div class="text-purple-900 font-medium truncate">Resources: ${e.requiredResources || 'Special FX kit'}</div>
                    <div class="text-slate-600 font-medium">${e.prepStatus || 'Rigged & Tested'}</div>
                    ${e.safetyNotes ? `
                      <div class="p-1.5 bg-rose-50 border border-rose-100 rounded-lg text-rose-800 flex items-start gap-1 text-[10px] font-medium">
                        <span class="material-symbols-outlined text-[13px] text-rose-600 shrink-0">warning</span>
                        <span>Safety: ${e.safetyNotes}</span>
                      </div>
                    ` : ''}
                  </div>
                `;
              } else if (cfg.key === 'Stunts') {
                customMeta = `
                  <div class="mt-1.5 pt-1.5 border-t border-slate-100 flex flex-col gap-1 text-[10px]">
                    <div class="text-slate-700 font-medium">Personnel: <strong class="text-rose-900">${e.qualifiedPersonnel || 'Lead Stunt Performer'}</strong></div>
                    <div class="text-slate-600">Planning: <span class="font-semibold text-amber-800">${e.safetyPlanningStatus || 'Review in Progress'}</span></div>
                  </div>
                `;
              } else if (cfg.key === 'Locations') {
                customMeta = `
                  <div class="mt-1.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span class="font-semibold text-amber-900">${e.context || 'INT.'} · ${e.lighting || 'DAY'}</span>
                    <span class="font-medium text-emerald-700">${e.locationStatus || 'Permitted & Locked'}</span>
                  </div>
                `;
              } else if (cfg.key === 'Costumes') {
                customMeta = `
                  <div class="mt-1.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span class="text-slate-700 font-medium">${e.character || 'Cast member'}</span>
                    <span class="font-semibold text-emerald-700">${e.prepStatus || 'Fitted'}</span>
                  </div>
                `;
              }

              return `
                <div class="p-3.5 rounded-xl bg-white border border-slate-200/80 flex flex-col justify-between gap-1 shadow-xs hover:border-slate-300 transition-colors">
                  <div>
                    <div class="flex items-start justify-between gap-2">
                      <div class="font-heading font-bold text-xs text-slate-900 leading-snug">${e.name}</div>
                      ${statusBadge}
                    </div>
                    <p class="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">${e.description || e.characterRole || ''}</p>
                    ${customMeta}
                  </div>

                  <div class="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span class="text-slate-400 font-mono">Sc ${scene.sceneNumber}</span>
                    <a href="/production/breakdown?scriptId=${scriptId}&scene=${scene.id}&from=${encodeURIComponent(currentSceneLocation)}" class="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5">
                      <span>Edit in Breakdown</span>
                      <span class="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </a>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).filter(Boolean).join('');

    container.innerHTML = `
      <!-- Scene Header Card -->
      <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-2.5">
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800 font-mono font-bold text-xs">SCENE ${scene.sceneNumber}</span>
              <span class="text-xs font-medium px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 font-mono">${scene.intExt} · ${scene.dayNight}</span>
              <span class="text-xs text-slate-500 font-medium">${scene.pages} Pages</span>
            </div>
            <h2 class="font-heading font-bold text-base text-slate-900 mt-2">${scene.heading}</h2>
            <p class="text-xs text-slate-500 mt-0.5 font-mono italic">"${scene.snippet}"</p>
          </div>
          <div class="text-right shrink-0">
            <span class="px-2 py-1 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs">${scene.shootDay}</span>
            <div class="text-[10px] text-slate-500 font-medium mt-1">Complexity: ${scene.complexity}</div>
          </div>
        </div>

        <div class="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap text-xs">
          <span class="text-slate-400 font-medium">Cast in scene:</span>
          ${(scene.cast || []).map(c => `<a href="/production/breakdown?scriptId=${scriptId}&category=Cast&character=${encodeURIComponent(c)}&from=${encodeURIComponent(currentSceneLocation)}" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors" title="Inspect ${c} in Breakdown">${c}</a>`).join('')}
          <div class="ml-auto flex items-center gap-1.5">
            <a href="/production/dialogue-sides?scriptId=${scriptId}&scene=${scene.id}&from=${encodeURIComponent(currentSceneLocation)}" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              <span class="material-symbols-outlined text-[15px]">record_voice_over</span>
              <span>Open Actor Sides for Scene ${scene.sceneNumber}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Category-Aware Confirmed Breakdown Elements in Scene -->
      <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-3">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[20px] text-blue-600">dataset</span>
            <h3 class="font-heading font-bold text-sm text-slate-900">
              Confirmed Elements for Scene ${scene.sceneNumber} (${elements.length})
            </h3>
          </div>
          <a href="/production/breakdown?scriptId=${scriptId}&scene=${scene.id}&from=${encodeURIComponent(currentSceneLocation)}" class="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
            <span>Manage Full Breakdown</span>
            <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
          </a>
        </div>

        <!-- Category Counts Bar -->
        ${categoryCountsHtml ? `
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span class="text-slate-400 text-[10px] font-bold uppercase tracking-wider shrink-0">By Category:</span>
            ${categoryCountsHtml}
          </div>
        ` : ''}

        <!-- Grouped Category Sections -->
        ${elements.length > 0 ? `
          <div class="flex flex-col gap-4 mt-1">
            ${categorySectionsHtml}
          </div>
        ` : `
          <div class="p-6 text-center text-slate-400 text-xs bg-slate-50 rounded-xl">
            No production elements tagged for this scene yet.
            <div class="mt-2">
              <a href="/production/breakdown?scriptId=${scriptId}&scene=${scene.id}&from=${encodeURIComponent(currentSceneLocation)}" class="text-blue-600 font-semibold hover:underline">
                Add Elements in Breakdown Workspace →
              </a>
            </div>
          </div>
        `}
      </div>

      <!-- Director & Production Notes Form -->
      <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-3">
        <div class="border-b border-slate-100 pb-2">
          <h3 class="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[18px] text-blue-600">edit_note</span>
            <span>Production Notes (Independent from Screenplay Text)</span>
          </h3>
          <p class="text-[11px] text-slate-500">Director framing directives, lens requirements, and continuity safeguards.</p>
        </div>

        <form id="form-scene-notes" class="flex flex-col gap-3 text-xs">
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Director Vision & Camera Setup</label>
            <textarea id="scene-dir-notes" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-blue-600">${scene.directorNotes || ''}</textarea>
          </div>
          <div>
            <label class="font-semibold text-slate-700 block mb-1">Continuity & Wardrobe Tracking</label>
            <textarea id="scene-cont-notes" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-blue-600">${scene.continuityNotes || ''}</textarea>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-slate-100">
            <span class="text-[10px] text-slate-400">Edits persist to scene logistics record</span>
            <button type="submit" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs transition-all cursor-pointer">
              Save Scene Logistics
            </button>
          </div>
        </form>
      </div>
    `;

    const notesForm = document.getElementById('form-scene-notes');
    if (notesForm) {
      notesForm.onsubmit = async (e) => {
        e.preventDefault();
        const dirNotes = document.getElementById('scene-dir-notes')?.value;
        const contNotes = document.getElementById('scene-cont-notes')?.value;
        await api.updateProductionScene(scriptId, scene.id, {
          directorNotes: dirNotes,
          continuityNotes: contNotes
        });
        showToast(`Saved logistics notes for Scene ${scene.sceneNumber}`);
      };
    }

  } else {
    // -------------------------------------------------------------------------
    // RENDER SCENE HUB MASTER LIST (18 SCENES)
    // -------------------------------------------------------------------------
    const scenes = await api.getProductionScenes(scriptId);

    container.innerHTML = `
      <!-- Scene Filter Bar -->
      <div class="bg-white rounded-xl border border-slate-200/80 p-2.5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs" id="scene-filter-btns">
          <button class="scene-filter-btn px-2.5 py-1 rounded-lg font-semibold bg-blue-600 text-white shadow-xs cursor-pointer" data-filter="all">All (18)</button>
          <button class="scene-filter-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer" data-filter="INT">INT</button>
          <button class="scene-filter-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer" data-filter="EXT">EXT</button>
          <button class="scene-filter-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer" data-filter="DAY">DAY</button>
          <button class="scene-filter-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer" data-filter="NIGHT">NIGHT</button>
        </div>
        <div class="text-[11px] text-slate-400 font-medium self-end sm:self-auto">
          Aligned with <span class="font-semibold text-slate-600">Draft 4.2</span>
        </div>
      </div>

      <!-- Scenes Grid -->
      <div class="grid grid-cols-1 gap-2" id="scenes-list-grid">
        ${scenes.map(s => `
          <div class="scene-row-card bg-white rounded-xl border border-slate-200/80 px-3.5 py-3 shadow-xs hover:border-slate-300 hover:bg-slate-50/50 transition-colors cursor-pointer flex items-center justify-between gap-3 group" data-scene="${s.id}" data-int="${s.intExt}" data-dn="${s.dayNight}">
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <span class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">#${s.sceneNumber}</span>
              <div class="min-w-0 flex-1">
                <h3 class="font-heading font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors truncate">${s.heading}</h3>
                <div class="flex items-center gap-2 text-[11px] text-slate-500 truncate mt-0.5">
                  <span class="font-medium text-slate-700">${s.shootDay}</span>
                  <span>•</span>
                  <span>${s.pages} pgs</span>
                  <span>•</span>
                  <span>${s.intExt} · ${s.dayNight}</span>
                  <span>•</span>
                  <span class="truncate">Cast: ${(s.cast || []).join(', ')}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3 shrink-0">
              ${s.status === 'Needs Review'
                ? `<span class="text-[11px] font-medium text-amber-700">Needs Review</span>`
                : `<span class="text-[11px] font-medium text-slate-500">Scheduled</span>`
              }
              <span class="material-symbols-outlined text-[16px] text-slate-300 group-hover:text-blue-600 transition-colors">
                chevron_right
              </span>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Row clicks navigate to Scene Detail
    container.querySelectorAll('.scene-row-card').forEach(card => {
      card.onclick = () => {
        const scId = card.getAttribute('data-scene');
        navigate(`/production/scenes?scriptId=${scriptId}&sceneId=${scId}`);
      };
    });

    // Scene filters
    const filterBtns = container.querySelectorAll('.scene-filter-btn');
    filterBtns.forEach(btn => {
      btn.onclick = () => {
        filterBtns.forEach(b => {
          b.classList.remove('bg-blue-600', 'text-white', 'shadow-2xs');
          b.classList.add('bg-slate-100', 'text-slate-700');
        });
        btn.classList.add('bg-blue-600', 'text-white', 'shadow-2xs');
        btn.classList.remove('bg-slate-100', 'text-slate-700');
        const filter = btn.getAttribute('data-filter');

        container.querySelectorAll('.scene-row-card').forEach(row => {
          if (filter === 'all') {
            row.classList.remove('hidden');
          } else if (filter === 'INT' || filter === 'EXT') {
            row.classList.toggle('hidden', row.getAttribute('data-int') !== filter);
          } else if (filter === 'DAY' || filter === 'NIGHT') {
            row.classList.toggle('hidden', row.getAttribute('data-dn') !== filter);
          }
        });
      };
    });
  }
}

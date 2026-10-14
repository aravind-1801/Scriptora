import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';
import { renderProdSubNav } from './prodNav.js';
import { store } from '../../state/store.js';
import * as api from '../../services/api.js';
import { showToast } from '../../components/toast.js';

export function renderScenesScreen(fromParam = null, scriptParam = null, sceneIdParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const sceneId = sceneIdParam || urlParams.get('sceneId');

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('Pre-Production', sceneId ? 'Scene Details & Logistics' : 'Scene Hub & Logistics')}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${renderProdSubNav(
          sceneId ? `Scene Logistics` : 'Scene Hub (18 Scenes)',
          sceneId ? 'movie' : 'hub',
          sceneId ? `/production/scenes?scriptId=${scriptId}` : '/production',
          sceneId ? `
            <a href="/production/dialogue-sides?scriptId=${scriptId}&scene=${sceneId}" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-colors">
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

    container.innerHTML = `
      <!-- Scene Header Card -->
      <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-2.5">
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs">SCENE ${scene.sceneNumber}</span>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-lg ${scene.intExt === 'INT' ? 'bg-amber-50 text-amber-800' : 'bg-sky-50 text-sky-800'}">${scene.intExt} · ${scene.dayNight}</span>
              <span class="text-xs text-slate-500 font-medium">${scene.pages} Pages</span>
            </div>
            <h2 class="font-heading font-bold text-base text-slate-900 mt-2">${scene.heading}</h2>
            <p class="text-xs text-slate-500 mt-0.5 font-mono italic">"${scene.snippet}"</p>
          </div>
          <div class="text-right shrink-0">
            <span class="px-2 py-1 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs">${scene.shootDay}</span>
            <div class="text-[10px] text-emerald-600 font-medium mt-1">Complexity: ${scene.complexity}</div>
          </div>
        </div>

        <div class="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap text-xs">
          <span class="text-slate-400 font-medium">Cast in scene:</span>
          ${(scene.cast || []).map(c => `<span class="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 font-semibold">${c}</span>`).join('')}
          <div class="ml-auto flex items-center gap-1.5">
            <a href="/production/dialogue-sides?scriptId=${scriptId}&scene=${scene.id}" class="text-indigo-600 hover:underline font-semibold flex items-center gap-1">
              <span class="material-symbols-outlined text-[15px]">record_voice_over</span>
              <span>Open Actor Sides for Scene ${scene.sceneNumber}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Confirmed Breakdown Elements in Scene -->
      <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-2.5">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 class="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[18px] text-blue-600">dataset</span>
            <span>Confirmed Elements for Scene ${scene.sceneNumber} (${elements.length})</span>
          </h3>
          <a href="/production/breakdown?scriptId=${scriptId}&scene=${scene.id}" class="text-xs font-semibold text-blue-600 hover:underline">
            Manage Breakdown →
          </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${elements.length > 0 ? elements.map(e => `
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-2">
              <div>
                <span class="text-[10px] font-bold text-slate-500 uppercase">${e.category}</span>
                <div class="font-heading font-bold text-xs text-slate-900">${e.name}</div>
                <p class="text-[11px] text-slate-500 line-clamp-1 mt-0.5">${e.description || e.sourceSnippet || ''}</p>
              </div>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${e.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}">
                ${e.status}
              </span>
            </div>
          `).join('') : `
            <div class="col-span-2 text-center text-slate-400 py-3 text-xs">No elements tagged for this scene yet.</div>
          `}
        </div>
      </div>

      <!-- Director & Production Notes Form -->
      <div class="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col gap-3">
        <div class="border-b border-slate-100 pb-2">
          <h3 class="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[18px] text-teal-600">edit_note</span>
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
            <button type="submit" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xs transition-all">
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
      <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs" id="scene-filter-btns">
          <button class="scene-filter-btn px-2.5 py-1 rounded-xl font-semibold bg-blue-600 text-white shadow-2xs" data-filter="all">All (18)</button>
          <button class="scene-filter-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-filter="INT">INT</button>
          <button class="scene-filter-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-filter="EXT">EXT</button>
          <button class="scene-filter-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-filter="DAY">DAY</button>
          <button class="scene-filter-btn px-2.5 py-1 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 text-slate-700" data-filter="NIGHT">NIGHT</button>
        </div>
        <div class="text-[11px] text-slate-500 font-medium self-end sm:self-auto">
          Aligned with <span class="font-semibold text-blue-700">Draft 4.2</span>
        </div>
      </div>

      <!-- Scenes Grid -->
      <div class="grid grid-cols-1 gap-2.5" id="scenes-list-grid">
        ${scenes.map(s => `
          <div class="scene-row-card bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group" data-scene="${s.id}" data-int="${s.intExt}" data-dn="${s.dayNight}">
            <div class="flex items-start gap-3 min-w-0">
              <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex flex-col items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <span class="text-[10px] uppercase font-bold leading-none">SCN</span>
                <span class="font-heading font-bold text-base leading-tight">${s.sceneNumber}</span>
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">${s.heading}</h3>
                  <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">${s.pages} pgs</span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded ${s.intExt === 'INT' ? 'bg-amber-50 text-amber-700' : 'bg-sky-50 text-sky-700'} font-semibold">${s.intExt} · ${s.dayNight}</span>
                </div>
                <p class="text-xs text-slate-500 line-clamp-1 mt-1 font-mono italic">"${s.snippet}"</p>
                <div class="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                  <span class="font-medium text-slate-600">${s.shootDay}</span>
                  <span>•</span>
                  <span>Cast: ${(s.cast || []).join(', ')}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${s.status === 'Needs Review' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}">
                ${s.status}
              </span>
              <span class="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform">
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

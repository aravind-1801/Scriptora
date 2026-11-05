import { VISUAL_STYLE_PREVIEWS, getStylePreview } from '../../utils/stylePreviews.js';
import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';
import { renderProdSubNav } from './prodNav.js';
import { store } from '../../state/store.js';
import * as api from '../../services/api.js';
import { showToast } from '../../components/toast.js';
import { exportStoryboardPdf } from '../../services/pdfExport.js';
import { openModal, closeModal } from '../../utils/popupPosition.js';

// SCRIPTORA Intermediate Filmmaking & Cinematography Options
export const SHOT_TYPES = [
  "Establishing Shot",
  "Action Shot",
  "Reaction Shot",
  "Dialogue Shot",
  "Insert / Detail Shot",
  "Transition Shot"
];

export const SHOT_SIZES = [
  "Extreme Wide",
  "Wide",
  "Medium",
  "Close-up",
  "Extreme Close-up"
];

export const CAMERA_ANGLES = [
  "Eye Level",
  "Low Angle",
  "High Angle",
  "Bird's Eye View",
  "Over-the-Shoulder",
  "Dutch Angle"
];

export const ASPECT_RATIOS = ["2.39:1", "16:9", "4:3", "9:16"];

export const CAMERA_MOVEMENTS = [
  "Static",
  "Pan",
  "Tilt",
  "Tracking",
  "Dolly"
];

export const LENS_OPTIONS = [
  "24mm",
  "35mm",
  "50mm",
  "85mm"
];

export const LIGHTING_OPTIONS = [
  "Auto / Scene-based",
  "Daylight",
  "Night",
  "Golden Hour",
  "Low-key",
  "Backlit"
];

export const SCREEN_DIRECTIONS = [
  "Left to Right",
  "Right to Left",
  "Static"
];

export const STYLE_PRESETS = [
  "Concept Art",
  "Cinematic Realism",
  "Storyboard Sketch",
  "Photorealistic"
];

const QUALITY_OPTIONS = ["Standard Draft", "High Definition Production"];

export function renderStoryboardScreen(fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const from = fromParam || urlParams.get('from');

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('Pre-Production', 'Storyboard Studio')}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3.5 fade-in">
        <!-- SubNav with Title, Project Context & Primary Actions -->
        ${renderProdSubNav('Storyboard Studio', 'art_track', from || '/production', `
          <div class="flex items-center gap-2">
            <button id="btn-export-storyboard-pdf" class="w-8 h-8 sm:w-auto sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0" title="Export genuine Storyboard Studio PDF" aria-label="Export PDF">
              <span class="material-symbols-outlined text-[17px]">download</span>
              <span class="hidden sm:inline">Export PDF</span>
            </button>
            <button id="btn-storyboard-preferences" class="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-2xs transition-all cursor-pointer shrink-0" title="Storyboard Preferences & Defaults" aria-label="Preferences">
              <span class="material-symbols-outlined text-[18px]">tune</span>
            </button>
            <button id="btn-storyboard-recycle-bin" class="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-2xs transition-all cursor-pointer shrink-0 relative" title="Recycle Bin" aria-label="Recycle Bin">
              <span class="material-symbols-outlined text-[18px]">delete_outline</span>
              <span id="recycle-bin-badge" class="hidden absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[9px] font-bold leading-tight">0</span>
            </button>
            <button id="btn-generate-sequence" class="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white flex items-center justify-center shadow-2xs transition-all cursor-pointer shrink-0" title="Generate Scene" aria-label="Generate Scene">
              <span class="material-symbols-outlined text-[18px]">auto_awesome</span>
            </button>
            <button id="btn-add-shot" class="w-8 h-8 sm:w-auto sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-black active:scale-95 text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0" title="Add shot manually" aria-label="Add Shot">
              <span class="material-symbols-outlined text-[18px]">add</span>
              <span class="hidden sm:inline">Add Shot</span>
            </button>
          </div>
        `, null, 'Visual shot composition and camera setups.')}

        <!-- Context & Scene Selector Bar -->
        <section class="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs flex flex-col gap-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div class="flex items-center gap-2.5 min-w-0 flex-1">
              <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80">
                <span class="material-symbols-outlined text-[19px]">movie_filter</span>
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <select id="storyboard-scene-select" class="font-heading font-bold text-sm text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-none cursor-pointer truncate py-0.5 max-w-full">
                    <option value="scene-1">Loading screenplay scenes...</option>
                  </select>
                  <button id="btn-delete-scene-storyboard" class="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0" title="Move scene storyboard to Recycle Bin" aria-label="Delete Scene">
                    <span class="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                  <button id="btn-delete-scene-storyboard" class="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0" title="Move scene storyboard to Recycle Bin" aria-label="Delete Scene">
                    <span class="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
                <div id="scene-context-badges" class="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5 flex-wrap">
                  <span id="badge-int-ext" class="px-1.5 py-0.5 rounded-md bg-slate-100 font-mono text-slate-700 font-semibold text-[10px]">INT</span>
                  <span id="badge-day-night" class="px-1.5 py-0.5 rounded-md bg-slate-100 font-mono text-slate-700 font-semibold text-[10px]">DAY</span>
                  <span id="badge-pages" class="text-slate-400">4 1/8 pgs</span>
                  <span class="text-slate-300">·</span>
                  <span id="badge-shoot-day" class="text-slate-600 font-medium">Day 1 of 7</span>
                </div>
              </div>
            </div>

            <!-- View Switcher & Schedule Link -->
            <div class="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <!-- View Switcher -->
              <div class="inline-flex p-0.5 rounded-xl bg-slate-100 border border-slate-200/60 text-xs">
                <button id="view-tab-contact" class="px-2.5 py-1 rounded-lg font-semibold text-slate-900 bg-white shadow-2xs transition-all cursor-pointer flex items-center gap-1.5" title="Contact Sheet View">
                  <span class="material-symbols-outlined text-[15px]">grid_view</span>
                  <span class="text-[11px]">Contact Sheet</span>
                </button>
                <button id="view-tab-sequence" class="px-2.5 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800 transition-all cursor-pointer flex items-center gap-1.5" title="Sequence Editor View">
                  <span class="material-symbols-outlined text-[15px]">reorder</span>
                  <span class="text-[11px]">Sequence Editor</span>
                </button>
              </div>

              <!-- Shooting Schedule Context Link -->
              <a id="btn-view-in-schedule" href="/production/schedule?scriptId=${scriptId}" class="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-blue-600 transition-colors" title="View shoot day in Shooting Schedule">
                <span class="material-symbols-outlined text-[18px]">calendar_month</span>
              </a>
            </div>
          </div>

          <!-- Scene Source Context Strip -->
          <div id="scene-source-snippet" class="bg-slate-50/70 rounded-xl p-2.5 border border-slate-100 text-xs text-slate-600 flex items-start gap-2">
            <span class="material-symbols-outlined text-slate-400 text-[16px] shrink-0 mt-0.5">menu_book</span>
            <div class="flex-1 min-w-0">
              <span class="font-semibold text-slate-800 text-[11px]">Screenplay Context: </span>
              <span id="scene-snippet-text" class="italic text-[11px] text-slate-600 leading-relaxed">Loading context...</span>
            </div>
          </div>
        </section>

        <!-- Version Staleness Alert (shown if script draft has changed since storyboard was pinned) -->
        <div id="storyboard-stale-alert" class="hidden bg-amber-50/80 border border-amber-200 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-xs">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-amber-600 text-[18px] shrink-0">warning</span>
            <span class="text-xs text-amber-900 leading-relaxed">
              <strong>Source Screenplay Changed:</strong> Storyboard is pinned to <span id="stale-pinned-ver" class="font-semibold">Draft 4.2</span>, but active script is <span id="stale-active-ver" class="font-semibold">Draft 4.3</span>.
            </span>
          </div>
          <button id="btn-repin-storyboard" class="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold shrink-0 cursor-pointer">
            Acknowledge & Update Pin
          </button>
        </div>

        <!-- Continuity Alert Banner (shown when consecutive shots have eyeline/direction conflict) -->
        <div id="continuity-warning-banner" class="hidden bg-rose-50/90 border border-rose-200 rounded-2xl p-3 flex items-start gap-2.5 shadow-xs">
          <span class="material-symbols-outlined text-rose-600 text-[18px] shrink-0 mt-0.5">error_outline</span>
          <div class="flex-1 text-xs text-rose-900 leading-relaxed">
            <span class="font-semibold">Potential Continuity Disruption Detected:</span>
            <p id="continuity-warning-text" class="text-[11px] text-rose-800 mt-0.5">Consecutive shots have conflicting screen directions.</p>
          </div>
        </div>

        <!-- MAIN VIEW CONTAINER: Swapped dynamically between Contact Sheet and Sequence Editor -->
        <div id="storyboard-view-container" class="flex flex-col gap-3 min-h-[360px]">
          <div class="p-16 text-center text-slate-400 text-xs">Loading storyboard shots...</div>
        </div>
      </main>

      <!-- ===================================================================== -->
      <!-- MODAL 1: FRAME DETAIL & INSPECTOR DRAWER -->
      <!-- ===================================================================== -->
      <div id="shot-inspector-modal" class="scriptora-modal-overlay fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
        <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-2xl w-full p-4 sm:p-5 flex flex-col gap-3.5 max-h-[92vh] overflow-y-auto">
          <!-- Modal Header -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <div class="flex items-center gap-2">
              <div id="modal-shot-pill" class="px-2 py-0.5 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs">1A</div>
              <h3 id="modal-shot-heading" class="font-heading font-bold text-sm text-slate-900">Edit Shot Details</h3>
            </div>
            <button id="modal-shot-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" title="Close">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <!-- Shot Image Preview Canvas -->
          <div class="flex flex-col gap-2">
            <div id="modal-preview-box" class="w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center relative min-h-[220px]">
              <img id="modal-shot-image" src="" alt="Shot visual preview" class="w-full h-auto object-contain max-h-[260px] hidden" />
              <div id="modal-empty-image-placeholder" class="flex flex-col items-center justify-center text-slate-500 py-10 gap-1.5">
                <span class="material-symbols-outlined text-3xl text-slate-400">image</span>
                <span class="text-xs">No image rendered yet</span>
                <span class="text-[10px] text-slate-500">Tap Generate or Import Photo below</span>
              </div>
              <div id="modal-image-loading" class="hidden absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2 text-white">
                <span class="w-6 h-6 border-2 border-white/40 border-t-blue-500 rounded-full animate-spin"></span>
                <span class="text-xs font-semibold">Generating shot visual...</span>
              </div>
            </div>

            <!-- Image Generation & Import Actions -->
            <div class="grid grid-cols-2 gap-2">
              <button type="button" id="modal-btn-generate-action" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 active:scale-[0.99] text-xs font-semibold cursor-pointer transition-all">
                <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                <span id="modal-generate-action-label" class="truncate">Generate Image</span>
              </button>
              <label class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-[0.99] text-xs font-semibold cursor-pointer transition-all">
                <span class="material-symbols-outlined text-[16px]">upload</span>
                <span class="truncate">Import Photo</span>
                <input type="file" id="modal-file-import" accept="image/*" class="sr-only" />
              </label>
            </div>

            <!-- Post-Generation Review & History Actions Bar -->
            <div id="modal-post-gen-actions" class="hidden flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
              <div class="flex items-center gap-1.5">
                <button type="button" id="modal-btn-view-fullscreen" class="px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 text-[11px] font-semibold flex items-center gap-1 cursor-pointer">
                  <span class="material-symbols-outlined text-[14px]">fullscreen</span>
                  <span>Inspect Fullscreen</span>
                </button>
                <button type="button" id="modal-btn-open-history" class="px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 text-[11px] font-semibold flex items-center gap-1 cursor-pointer">
                  <span class="material-symbols-outlined text-[14px]">history</span>
                  <span>Versions (<span id="modal-history-count">0</span>)</span>
                </button>
              </div>
              <div class="flex items-center gap-1.5">
                <button type="button" id="modal-btn-toggle-approve" class="px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-[11px] font-semibold flex items-center gap-1 cursor-pointer">
                  <span class="material-symbols-outlined text-[14px]">check</span>
                  <span id="modal-approve-toggle-label">Approve</span>
                </button>
                <button type="button" id="modal-btn-toggle-reject" class="px-2 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-[11px] font-semibold flex items-center gap-1 cursor-pointer">
                  <span class="material-symbols-outlined text-[14px]">close</span>
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Form Fields (Organized into 3 Structured Sections) -->
          <form id="shot-detail-form" class="flex flex-col gap-3.5">
            <!-- SECTION A: SHOT IDENTITY -->
            <div class="rounded-2xl border border-slate-200/90 p-3.5 bg-slate-50/50 flex flex-col gap-3">
              <div class="flex items-center justify-between border-b border-slate-200/70 pb-2">
                <div class="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span>Section A — Shot Identity</span>
                </div>
                <div class="flex items-center gap-1.5 font-mono text-[11px] text-slate-600 bg-white px-2 py-0.5 rounded-lg border border-slate-200/80">
                  <span class="text-slate-400 font-normal">Index:</span>
                  <span id="display-shot-number" class="font-bold text-blue-600">1A</span>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div class="flex flex-col gap-1 sm:col-span-2">
                  <label class="text-[11px] font-semibold text-slate-700 flex items-center gap-1">
                    <span>Shot Title</span>
                    <span class="text-rose-500 font-bold">*</span>
                  </label>
                  <input type="text" id="input-shot-title" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 bg-white shadow-2xs" placeholder="e.g. Guard tower silhouette at sunset" required />
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-[11px] font-semibold text-slate-700">Shot Type <span class="text-slate-400 font-normal">(Optional)</span></label>
                  <select id="input-shot-type" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-600 shadow-2xs">
                    <option value="">None / Custom</option>
                    ${SHOT_TYPES.map(t => `<option value="${t}">${t}</option>`).join('')}
                  </select>
                </div>
              </div>
              <input type="hidden" id="input-shot-number" value="1A" />
            </div>

            <!-- SECTION B: VISUAL DIRECTION -->
            <div class="rounded-2xl border border-slate-200/90 p-3.5 bg-slate-50/50 flex flex-col gap-3">
              <div class="flex items-center justify-between border-b border-slate-200/70 pb-2">
                <div class="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span>Section B — Visual Direction</span>
                </div>
                <span class="text-[10px] text-slate-500 font-medium">Primary Creative Input</span>
              </div>

              <!-- Visual Description -->
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Visual Description</label>
                <textarea id="input-shot-desc" rows="3" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 bg-white leading-relaxed shadow-2xs" placeholder="Describe framing, blocking, key visual action, lighting, characters, and environmental atmosphere..."></textarea>
              </div>

              <!-- Visual Style Image Preview Cards (4 Styles of SAME Desert Checkpoint Scene) -->
              <div class="flex flex-col gap-1.5 mt-0.5">
                <div class="flex items-center justify-between">
                  <label class="text-[11px] font-semibold text-slate-700">Visual Style — Select Treatment</label>
                  <span class="text-[10px] text-slate-500">Same scene rendered in 4 visual styles</span>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2" id="style-preview-cards-container">
                  ${VISUAL_STYLE_PREVIEWS.map(style => `
                    <button type="button" class="style-preview-card text-left p-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all cursor-pointer flex flex-col gap-1.5 group relative" data-style-id="${style.id}">
                      <div class="w-full aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-100 relative">
                        <img src="${style.previewImage}" alt="${style.name}" class="w-full h-full object-cover" />
                        <div class="style-check-badge hidden absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                          <span class="material-symbols-outlined text-[11px] font-bold">check</span>
                        </div>
                      </div>
                      <div>
                        <div class="text-[11px] font-bold text-slate-900 group-hover:text-blue-600 leading-tight">${style.name}</div>
                        <div class="text-[9px] text-slate-500 line-clamp-2 leading-tight mt-0.5">${style.description}</div>
                      </div>
                    </button>
                  `).join('')}
                </div>
                <input type="hidden" id="input-shot-style" value="Concept Art" />
              </div>
            </div>

            <!-- SECTION C: CAMERA & COMPOSITION -->
            <div class="rounded-2xl border border-slate-200/90 p-3.5 bg-slate-50/50 flex flex-col gap-3">
              <div class="flex items-center justify-between border-b border-slate-200/70 pb-2">
                <div class="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span>Section C — Camera & Composition</span>
                </div>
                <span class="text-[10px] text-slate-500 font-medium">Filmmaking Controls</span>
              </div>

              <!-- Primary Camera Controls: Shot Size, Camera Angle, Aspect Ratio -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div class="flex flex-col gap-1">
                  <label class="text-[10px] font-semibold text-slate-600 uppercase">Shot Size</label>
                  <select id="input-shot-size" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-600 shadow-2xs">
                    ${SHOT_SIZES.map(s => `<option value="${s}">${s}</option>`).join('')}
                  </select>
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-[10px] font-semibold text-slate-600 uppercase">Camera Angle</label>
                  <select id="input-shot-angle" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-600 shadow-2xs">
                    ${CAMERA_ANGLES.map(a => `<option value="${a}">${a}</option>`).join('')}
                  </select>
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-[10px] font-semibold text-slate-600 uppercase">Aspect Ratio</label>
                  <select id="input-shot-ratio" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-600 shadow-2xs">
                    ${ASPECT_RATIOS.map(r => `<option value="${r}">${r}</option>`).join('')}
                  </select>
                </div>
              </div>

              <!-- Collapsible More Camera Settings -->
              <div class="border border-slate-200/80 rounded-xl overflow-hidden bg-white mt-1 shadow-2xs">
                <button type="button" id="btn-toggle-more-camera" class="w-full px-3 py-2.5 flex items-center justify-between text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[16px] text-blue-600">tune</span>
                    <span>More Camera Settings</span>
                    <span class="text-[10px] text-slate-400 font-normal">(Movement, Lens, Lighting, Direction)</span>
                  </div>
                  <span id="more-camera-chevron" class="material-symbols-outlined text-[18px] text-slate-400 transition-transform">expand_more</span>
                </button>
                <div id="more-camera-panel" class="hidden p-3 border-t border-slate-200/60 bg-slate-50/50 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div class="flex flex-col gap-1">
                    <label class="text-[10px] font-semibold text-slate-500 uppercase">Camera Movement</label>
                    <select id="input-shot-movement" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                      ${CAMERA_MOVEMENTS.map(m => `<option value="${m}">${m}</option>`).join('')}
                    </select>
                  </div>
                  <div class="flex flex-col gap-1">
                    <label class="text-[10px] font-semibold text-slate-500 uppercase">Lens</label>
                    <select id="input-shot-focal" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                      ${LENS_OPTIONS.map(l => `<option value="${l}">${l}</option>`).join('')}
                    </select>
                  </div>
                  <div class="flex flex-col gap-1">
                    <label class="text-[10px] font-semibold text-slate-500 uppercase">Lighting</label>
                    <select id="input-shot-lighting" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                      ${LIGHTING_OPTIONS.map(l => `<option value="${l}">${l}</option>`).join('')}
                    </select>
                  </div>
                  <div class="flex flex-col gap-1">
                    <label class="text-[10px] font-semibold text-slate-500 uppercase">Screen Direction</label>
                    <select id="input-shot-direction" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                      ${SCREEN_DIRECTIONS.map(d => `<option value="${d}">${d}</option>`).join('')}
                    </select>
                  </div>
                </div>
              </div>

              <!-- Notes & Approval -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-0.5">
                <div class="flex flex-col gap-1">
                  <label class="text-[10px] font-semibold text-slate-600 uppercase">Director & Continuity Notes</label>
                  <input type="text" id="input-shot-notes" placeholder="Notes for camera operator, props, or costumes..." class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 bg-white" />
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-[10px] font-semibold text-slate-600 uppercase">Approval State</label>
                  <select id="input-shot-approval" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-semibold">
                    <option value="draft">Draft</option>
                    <option value="proposed">Proposed (Needs Review)</option>
                    <option value="approved">Approved for Production</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
              <button type="button" id="modal-btn-delete-shot" class="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">delete</span>
                <span>Move to Recycle Bin</span>
              </button>
              <div class="flex items-center gap-2">
                <button type="button" id="modal-btn-cancel-shot" class="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer">Cancel</button>
                <button type="submit" id="modal-btn-save-shot" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer">Save Changes</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- MODAL 2: AI GENERATION & PROVIDER SELECTION MODAL -->
      <!-- ===================================================================== -->
      <div id="ai-generate-modal" class="scriptora-modal-overlay fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
        <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-2xl w-full p-4 sm:p-5 flex flex-col gap-3.5 max-h-[92vh] overflow-y-auto">
          <!-- Modal Header -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-xl">auto_awesome</span>
              <h3 id="gen-modal-title" class="font-heading font-bold text-sm text-slate-900">Generate Scene Shot Sequence</h3>
            </div>
            <button id="gen-modal-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" title="Close">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <!-- Scene Context Strip -->
          <div class="bg-blue-50/60 border border-blue-100 rounded-xl p-2.5 text-xs text-blue-900 flex flex-col gap-1">
            <div class="flex items-center justify-between font-semibold">
              <span id="gen-scene-heading-display">SCENE 1</span>
              <span id="gen-scene-cast-display" class="text-blue-700 font-mono text-[11px]">Cast: KEVIN, MARCUS</span>
            </div>
            <p id="gen-scene-snippet-display" class="italic text-slate-600 text-[11px] line-clamp-2">Loading scene context...</p>
          </div>

          <!-- STEP 1: CONFIGURATION VIEW -->
          <div id="gen-step-config" class="flex flex-col gap-3">
            <!-- Shot Sequence Length Selection Control (1 to 4 shots) -->
            <div id="gen-shot-count-container" class="flex flex-col gap-1">
              <label for="gen-shot-count-select" class="text-[11px] font-semibold text-slate-700">Shot Sequence Length (Coverage Beats)</label>
              <select id="gen-shot-count-select" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600">
                <option value="1">1-Shot Sequence (Single Establishing / Climax)</option>
                <option value="2">2-Shot Sequence (Master + Coverage)</option>
                <option value="3">3-Shot Sequence (Establishing + Two-Shot + Close-Up)</option>
                <option value="4" selected>4-Shot Sequence (Full Scene Coverage)</option>
              </select>
            </div>

            <!-- Provider Selector -->
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-700">Image Generation Provider</label>
              <select id="gen-provider-select" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600">
                <option value="scriptora-concept">SCRIPTORA Concept Engine (Free / Built-in)</option>
                <option value="gemini-imagen3">Google Imagen 3 (Paid API)</option>
                <option value="stability-sdxl">Stability AI SDXL (Paid API)</option>
                <option value="openai-dalle3">OpenAI DALL-E 3 (Paid API)</option>
              </select>
              <div id="gen-provider-status" class="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">check_circle</span>
                <span>Configured & Ready</span>
              </div>
            </div>

            <!-- Cost Disclosure Banner -->
            <div id="gen-cost-disclosure" class="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-xs text-slate-700 flex items-start gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[16px] shrink-0 mt-0.5">info</span>
              <div class="flex-1">
                <span class="font-semibold text-slate-800">Cost Disclosure: </span>
                <span id="gen-cost-label">Free (Built-in Concept Engine, no charges).</span>
              </div>
            </div>

            <!-- Visual Style, Quality, and Aspect Ratio Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Visual Style Preset</label>
                <select id="gen-style-select" class="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${STYLE_PRESETS.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Image Quality</label>
                <select id="gen-quality-select" class="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${QUALITY_OPTIONS.map(q => `<option value="${q}">${q}</option>`).join('')}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Aspect Ratio</label>
                <select id="gen-ratio-select" class="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${ASPECT_RATIOS.map(r => `<option value="${r}">${r}</option>`).join('')}
                </select>
              </div>
            </div>

            <!-- Custom Creative Prompt -->
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-700">Creative Direction / Extra Prompt</label>
              <textarea id="gen-prompt-input" rows="2" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" placeholder="Optional creative guidance for lighting, lens atmosphere, mood..."></textarea>
            </div>

            <!-- Generation Error Alert -->
            <div id="gen-error-alert" class="hidden bg-rose-50 border border-rose-200 rounded-xl p-2.5 text-xs text-rose-800 flex items-start gap-2">
              <span class="material-symbols-outlined text-rose-600 text-[16px] shrink-0 mt-0.5">error</span>
              <div class="flex-1 text-[11px] leading-relaxed" id="gen-error-message">Provider error</div>
            </div>

            <!-- Bottom Actions -->
            <div class="flex items-center justify-end gap-2 pt-2.5 border-t border-slate-100">
              <button type="button" id="gen-modal-cancel" class="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
              <button type="button" id="gen-btn-start" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                <span id="gen-submit-label">Generate 4-Shot Sequence</span>
              </button>
            </div>
          </div>

          <!-- STEP 2: GENERATION PROGRESS VIEW -->
          <div id="gen-step-progress" class="hidden flex flex-col items-center justify-center py-10 px-4 text-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <span class="w-7 h-7 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></span>
            </div>
            <div>
              <h4 id="gen-progress-title" class="font-heading font-bold text-sm text-slate-900">Generating Storyboard Sequence</h4>
              <p id="gen-progress-status" class="text-xs text-slate-500 mt-1">Preparing scene context...</p>
            </div>
            <div id="gen-progress-stepper" class="flex items-center gap-2 mt-2">
              <!-- Stepper dots injected dynamically -->
            </div>
          </div>

          <!-- STEP 3 & 4: PREVIEW & REVIEW GRID VIEW -->
          <div id="gen-step-preview" class="hidden flex flex-col gap-3">
            <div class="flex items-center justify-between pb-1 border-b border-slate-100">
              <div>
                <h4 class="font-heading font-bold text-xs text-slate-900">Proposed Scene Sequence</h4>
                <p class="text-[11px] text-slate-500">Inspect frames, toggle approval, or regenerate individual shots before saving.</p>
              </div>
              <div class="flex items-center gap-2">
                <span id="gen-preview-count-label" class="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">4 Shots Proposed</span>
                <button type="button" id="gen-btn-approve-all-proposed" class="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-[11px] font-semibold cursor-pointer transition-all flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px]">done_all</span>
                  <span>Approve All</span>
                </button>
              </div>
            </div>

            <!-- Preview Contact Sheet Grid -->
            <div id="gen-preview-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
              <!-- Proposed cards rendered dynamically -->
            </div>

            <!-- Bottom Save / Discard Actions -->
            <div class="flex items-center justify-between pt-2.5 border-t border-slate-100 gap-2">
              <button type="button" id="gen-btn-discard-preview" class="px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer">Discard Sequence</button>
              <div class="flex items-center gap-2">
                <button type="button" id="gen-btn-save-as-draft" class="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold cursor-pointer">Save as Draft</button>
                <button type="button" id="gen-btn-confirm-save" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer">
                  <span class="material-symbols-outlined text-[15px]">check_circle</span>
                  <span>Save to Storyboard</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- MODAL 3: SINGLE FRAME REGENERATION MODAL -->
      <!-- ===================================================================== -->
      <div id="single-regen-modal" class="scriptora-modal-overlay fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
        <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-md w-full p-4 sm:p-5 flex flex-col gap-3.5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <div id="regen-shot-pill" class="px-2 py-0.5 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs">1B</div>
              <h3 class="font-heading font-bold text-sm text-slate-900">Regenerate Single Frame</h3>
            </div>
            <button id="regen-modal-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" title="Close">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <div class="aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
            <img id="regen-current-image" src="" alt="Current frame" class="w-full h-full object-cover" />
          </div>

          <div class="flex flex-col gap-2.5">
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-700">Image Provider</label>
              <select id="regen-provider-select" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600">
                <option value="scriptora-concept">SCRIPTORA Concept Engine (Free / Built-in)</option>
                <option value="gemini-imagen3">Google Imagen 3 (Paid API)</option>
                <option value="stability-sdxl">Stability AI SDXL (Paid API)</option>
                <option value="openai-dalle3">OpenAI DALL-E 3 (Paid API)</option>
              </select>
              <div id="regen-cost-banner" class="text-[10px] text-slate-500 italic mt-0.5">Free (Built-in Concept Engine, no charges).</div>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-700">Visual Style</label>
              <select id="regen-style-select" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                ${STYLE_PRESETS.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-700">Updated Prompt / Creative Direction</label>
              <textarea id="regen-prompt-input" rows="2" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" placeholder="Specify framing adjustments or lighting revisions..."></textarea>
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2.5 border-t border-slate-100">
            <button type="button" id="regen-modal-cancel" class="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
            <button type="button" id="regen-modal-confirm" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[15px]">auto_awesome</span>
              <span>Regenerate Frame</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- MODAL 4: SHOT HISTORY & VERSION RESTORATION MODAL -->
      <!-- ===================================================================== -->
      <div id="shot-history-modal" class="scriptora-modal-overlay fixed inset-0 z-[125] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
        <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-lg w-full p-4 sm:p-5 flex flex-col gap-3.5 max-h-[85vh] overflow-y-auto">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-slate-600 text-xl">history</span>
              <h3 id="history-modal-title" class="font-heading font-bold text-sm text-slate-900">Generation History</h3>
            </div>
            <button id="history-modal-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" title="Close">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <div id="history-items-container" class="flex flex-col gap-2.5 overflow-y-auto max-h-[55vh] pr-1">
            <div class="p-8 text-center text-slate-400 text-xs">No prior versions recorded.</div>
          </div>

          <div class="flex items-center justify-end pt-2 border-t border-slate-100">
            <button type="button" id="history-modal-done" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer">Done</button>
          </div>
        </div>
      </div>


      <!-- ===================================================================== -->
      <!-- MODAL 6: STORYBOARD RECYCLE BIN (SOFT-DELETE & RESTORATION) -->
      <!-- ===================================================================== -->
      <div id="recycle-bin-modal" class="scriptora-modal-overlay fixed inset-0 z-[130] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
        <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-2xl w-full p-4 sm:p-5 flex flex-col gap-3.5 max-h-[88vh] overflow-y-auto">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                <span class="material-symbols-outlined text-lg">delete_sweep</span>
              </div>
              <div>
                <h3 class="font-heading font-bold text-sm text-slate-900">Storyboard Recycle Bin</h3>
                <p class="text-[11px] text-slate-500">Soft-deleted shots and scenes can be restored anytime or permanently removed.</p>
              </div>
            </div>
            <button id="rb-modal-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" title="Close">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <!-- Filter Tabs & Empty All -->
          <div class="flex items-center justify-between gap-2">
            <div class="inline-flex p-0.5 rounded-xl bg-slate-100 text-xs font-medium">
              <button type="button" id="rb-tab-all" class="px-2.5 py-1 rounded-lg bg-white shadow-2xs font-semibold text-slate-900 cursor-pointer">All Items (<span id="rb-count-all">0</span>)</button>
              <button type="button" id="rb-tab-shots" class="px-2.5 py-1 rounded-lg text-slate-600 hover:text-slate-900 cursor-pointer">Shots (<span id="rb-count-shots">0</span>)</button>
              <button type="button" id="rb-tab-scenes" class="px-2.5 py-1 rounded-lg text-slate-600 hover:text-slate-900 cursor-pointer">Scenes (<span id="rb-count-scenes">0</span>)</button>
            </div>
            <button type="button" id="rb-btn-empty-bin" class="px-2.5 py-1 rounded-lg text-rose-600 hover:bg-rose-50 text-[11px] font-semibold flex items-center gap-1 cursor-pointer">
              <span class="material-symbols-outlined text-[14px]">delete_forever</span>
              <span>Empty Bin</span>
            </button>
          </div>

          <!-- Items Container -->
          <div id="rb-items-container" class="flex flex-col gap-2 min-h-[220px] max-h-[50vh] overflow-y-auto pr-1">
            <div id="rb-empty-state" class="flex flex-col items-center justify-center py-12 text-slate-400 gap-1.5">
              <span class="material-symbols-outlined text-4xl text-slate-300">delete_outline</span>
              <span class="text-xs font-semibold text-slate-600">Recycle Bin is empty</span>
              <span class="text-[10px] text-slate-400">Deleted shots or scenes will appear here for safe recovery.</span>
            </div>
          </div>

          <div class="flex items-center justify-end pt-3 border-t border-slate-100">
            <button type="button" id="rb-modal-done" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer">Close</button>
          </div>
        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- MODAL 7: STORYBOARD PREFERENCES -->
      <!-- ===================================================================== -->
      <div id="storyboard-preferences-modal" class="scriptora-modal-overlay fixed inset-0 z-[130] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
        <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-lg w-full p-4 sm:p-5 flex flex-col gap-3.5 max-h-[88vh] overflow-y-auto">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <span class="material-symbols-outlined text-lg">tune</span>
              </div>
              <div>
                <h3 class="font-heading font-bold text-sm text-slate-900">Storyboard Preferences</h3>
                <p class="text-[11px] text-slate-500">Configure default cinematography applied to new shots.</p>
              </div>
            </div>
            <button id="pref-modal-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" title="Close">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <form id="storyboard-pref-form" class="flex flex-col gap-3 text-xs">
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/70 border border-blue-100">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-blue-600 text-[18px]">verified</span>
                <div>
                  <div class="font-bold text-blue-950 text-[11px]">Experience Level</div>
                  <div class="text-[10px] text-blue-700">Intermediate Storyboard Studio active</div>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-[10px] uppercase tracking-wider shadow-2xs">Intermediate</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Visual Style</label>
                <select id="pref-default-style" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${STYLE_PRESETS.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Aspect Ratio</label>
                <select id="pref-default-ratio" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${ASPECT_RATIOS.map(r => `<option value="${r}">${r}</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Shot Size</label>
                <select id="pref-default-size" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${SHOT_SIZES.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Camera Angle</label>
                <select id="pref-default-angle" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${CAMERA_ANGLES.map(a => `<option value="${a}">${a}</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Lens</label>
                <select id="pref-default-lens" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${LENS_OPTIONS.map(l => `<option value="${l}">${l}</option>`).join('')}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Default Lighting</label>
                <select id="pref-default-lighting" class="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${LIGHTING_OPTIONS.map(l => `<option value="${l}">${l}</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-slate-100 gap-2 mt-2">
              <button type="button" id="pref-btn-reset" class="px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer">Reset Defaults</button>
              <div class="flex items-center gap-2">
                <button type="button" id="pref-modal-cancel" class="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer">Cancel</button>
                <button type="submit" id="pref-btn-save" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs cursor-pointer">Save Preferences</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- MODAL 5: FULL-SCREEN CINEMATIC LIGHTBOX -->
      <!-- ===================================================================== -->
      <div id="lightbox-modal" class="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 hidden">
        <!-- Top Toolbar -->
        <div class="flex items-center justify-between text-white shrink-0">
          <div class="flex items-center gap-3">
            <span id="lb-shot-num" class="font-mono font-bold text-xs bg-white/10 px-2.5 py-1 rounded-lg">REC · 1A</span>
            <span id="lb-specs" class="text-xs text-white/70 font-mono hidden sm:inline">2.39:1 · 50mm Prime · Wide Shot</span>
          </div>
          <button id="lb-close" class="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer" title="Close Lightbox (Esc)">
            <span class="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <!-- Center Image View with Nav Chevrons -->
        <div class="flex-1 flex items-center justify-center relative min-h-0 my-3">
          <button id="lb-prev" class="absolute left-2 sm:left-4 z-10 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer" title="Previous Shot (Arrow Left)">
            <span class="material-symbols-outlined text-2xl">chevron_left</span>
          </button>
          
          <img id="lb-image" src="" alt="Full size preview" class="max-h-full max-w-full object-contain rounded-lg shadow-2xl select-none" />

          <button id="lb-next" class="absolute right-2 sm:right-4 z-10 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer" title="Next Shot (Arrow Right)">
            <span class="material-symbols-outlined text-2xl">chevron_right</span>
          </button>
        </div>

        <!-- Bottom Metadata & Actions Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white shrink-0 pt-2 border-t border-white/10">
          <div class="min-w-0 flex-1">
            <h4 id="lb-title" class="font-heading font-bold text-sm truncate">Shot Title</h4>
            <p id="lb-desc" class="text-xs text-white/70 line-clamp-1 mt-0.5">Visual description</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button id="lb-btn-approve" class="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors">
              <span class="material-symbols-outlined text-[16px]">check</span>
              <span id="lb-approve-label">Approve</span>
            </button>
            <button id="lb-btn-reject" class="px-3.5 py-1.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors">
              <span class="material-symbols-outlined text-[16px]">close</span>
              <span>Reject</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Navigation with Production Active -->
      ${renderBottomNav('production')}
    </div>
  `;
}


// Helper: Structured generation prompt construction
function buildStructuredPrompt({
  description,
  visualStyle,
  shotSize,
  cameraAngle,
  aspectRatio,
  cameraMovement,
  lens,
  lighting,
  screenDirection,
  sceneContext
}) {
  const parts = [];
  if (visualStyle) parts.push(`[Style: ${visualStyle}]`);
  if (shotSize) parts.push(`[Framing: ${shotSize}]`);
  if (cameraAngle) parts.push(`[Angle: ${cameraAngle}]`);
  if (lens) parts.push(`[Lens: ${lens}]`);
  if (cameraMovement && cameraMovement !== 'Static') parts.push(`[Movement: ${cameraMovement}]`);
  if (lighting && lighting !== 'Auto / Scene-based') parts.push(`[Lighting: ${lighting}]`);
  if (screenDirection && screenDirection !== 'Static') parts.push(`[Direction: ${screenDirection}]`);
  if (aspectRatio) parts.push(`[Aspect: ${aspectRatio}]`);
  if (sceneContext) parts.push(`[Scene Context: ${sceneContext}]`);

  const desc = (description || '').trim();
  if (desc) {
    parts.push(desc);
  } else {
    parts.push('Cinematic storyboard composition');
  }

  return parts.join(' - ');
}

export function attachStoryboardEvents(navigate, fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  let currentSceneId = urlParams.get('sceneId') || 'scene-1';
  let currentView = 'contact'; // 'contact' | 'sequence'
  let activeEditingShotId = null;
  let activeRegenShotId = null;
  let activeHistoryShotId = null;
  let activeLightboxShotIndex = 0;
  let proposedSequenceShots = [];
  let selectedShotCount = 4;
  const sequenceSelectedShotIds = new Set();

  // In-modal shot creation draft state
  let currentModalDraftImage = null;
  let currentModalDraftPrompt = '';
  let currentModalDraftApproval = 'draft';

  // Primary DOM Elements
  const sceneSelect = document.getElementById('storyboard-scene-select');
  const viewContainer = document.getElementById('storyboard-view-container');
  const viewTabContact = document.getElementById('view-tab-contact');
  const viewTabSequence = document.getElementById('view-tab-sequence');
  const btnExportPdf = document.getElementById('btn-export-storyboard-pdf');
  const btnGenSequence = document.getElementById('btn-generate-sequence');
  const btnAddShot = document.getElementById('btn-add-shot');
  const btnScheduleLink = document.getElementById('btn-view-in-schedule');
  const staleBanner = document.getElementById('storyboard-stale-alert');
  const btnRepin = document.getElementById('btn-repin-storyboard');
  const continuityBanner = document.getElementById('continuity-warning-banner');

  // Modals DOM Elements
  const inspectorModal = document.getElementById('shot-inspector-modal');
  const inspectorClose = document.getElementById('modal-shot-close');
  const inspectorCancel = document.getElementById('modal-btn-cancel-shot');
  const shotForm = document.getElementById('shot-detail-form');
  const btnDeleteShot = document.getElementById('modal-btn-delete-shot');
  const btnModalGenAction = document.getElementById('modal-btn-generate-action');
  const modalFileImport = document.getElementById('modal-file-import');
  const btnModalViewFullscreen = document.getElementById('modal-btn-view-fullscreen');
  const btnModalToggleApprove = document.getElementById('modal-btn-toggle-approve');
  const btnModalToggleReject = document.getElementById('modal-btn-toggle-reject');
  const btnModalOpenHistory = document.getElementById('modal-btn-open-history');

  const genModal = document.getElementById('ai-generate-modal');
  const genClose = document.getElementById('gen-modal-close');
  const genCancel = document.getElementById('gen-modal-cancel');
  const genBtnStart = document.getElementById('gen-btn-start');
  const genProviderSelect = document.getElementById('gen-provider-select');
  const genProviderStatus = document.getElementById('gen-provider-status');
  const genCostLabel = document.getElementById('gen-cost-label');
  const genShotCountSelect = document.getElementById('gen-shot-count-select');
  const genErrorAlert = document.getElementById('gen-error-alert');
  const genErrorMsg = document.getElementById('gen-error-message');

  const regenModal = document.getElementById('single-regen-modal');
  const regenClose = document.getElementById('regen-modal-close');
  const regenCancel = document.getElementById('regen-modal-cancel');
  const regenConfirm = document.getElementById('regen-modal-confirm');

  const historyModal = document.getElementById('shot-history-modal');
  const historyClose = document.getElementById('history-modal-close');
  const historyDone = document.getElementById('history-modal-done');

  const lightboxModal = document.getElementById('lightbox-modal');
  const lbClose = document.getElementById('lb-close');
  const lbPrev = document.getElementById('lb-prev');
  const lbNext = document.getElementById('lb-next');
  const lbBtnApprove = document.getElementById('lb-btn-approve');
  const lbBtnReject = document.getElementById('lb-btn-reject');

  // Storyboard and Scenes Memory State
  let allScenes = [];
  let providers = [];
  let currentStoryboard = null;

  // =========================================================================
  // 1. SYNCHRONOUS EVENT ATTACHMENTS (Guaranteed to work immediately)
  // =========================================================================

  // View Switcher (Contact Sheet <-> Sequence Editor)
  if (viewTabContact && viewTabSequence) {
    viewTabContact.onclick = (e) => {
      e.preventDefault();
      currentView = 'contact';
      viewTabContact.className = 'px-2.5 py-1 rounded-lg font-semibold text-slate-900 bg-white shadow-2xs transition-all cursor-pointer flex items-center gap-1.5';
      viewTabSequence.className = 'px-2.5 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800 transition-all cursor-pointer flex items-center gap-1.5';
      renderCurrentView();
    };

    viewTabSequence.onclick = (e) => {
      e.preventDefault();
      currentView = 'sequence';
      viewTabSequence.className = 'px-2.5 py-1 rounded-lg font-semibold text-slate-900 bg-white shadow-2xs transition-all cursor-pointer flex items-center gap-1.5';
      viewTabContact.className = 'px-2.5 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800 transition-all cursor-pointer flex items-center gap-1.5';
      renderCurrentView();
    };
  }

  // Primary Header Actions
  if (btnGenSequence) {
    btnGenSequence.onclick = (e) => {
      e.preventDefault();
      openSequenceGenerationModal();
    };
  }

  if (btnAddShot) {
    btnAddShot.onclick = (e) => {
      e.preventDefault();
      openShotInspector(null);
    };
  }

  // PDF Export
  if (btnExportPdf) {
    btnExportPdf.onclick = (e) => {
      e.preventDefault();
      try {
        const scene = allScenes.find(s => s.id === currentSceneId) || {};
        const script = store.state.scripts?.find(s => s.id === scriptId) || {
          title: 'Chronicles of Dust',
          draft: 'Draft 4.2'
        };

        exportStoryboardPdf(currentStoryboard, {
          title: script.title,
          draft: script.draft || currentStoryboard?.sourceVersion || 'Draft 4.2',
          heading: scene.heading || currentStoryboard?.sceneHeading || 'SCENE 1'
        });
        showToast('Exported Storyboard Studio PDF');
      } catch (err) {
        console.error(err);
        showToast('Failed to export Storyboard PDF');
      }
    };
  }

  // Repin source version acknowledgement
  if (btnRepin) {
    btnRepin.onclick = async (e) => {
      e.preventDefault();
      if (currentStoryboard) {
        currentStoryboard.sourceVersion = currentStoryboard.currentScriptDraft || 'Draft 4.2';
        currentStoryboard.isVersionStale = false;
        try {
          await api.saveStoryboard(scriptId, currentStoryboard);
        } catch (_) {}
        staleBanner?.classList.add('hidden');
        showToast(`Pinned Storyboard to ${currentStoryboard.sourceVersion}`);
      }
    };
  }

  // Modal 1 (Inspector) Close & Cancel
  if (inspectorClose) inspectorClose.onclick = () => closeModal(inspectorModal);
  if (inspectorCancel) inspectorCancel.onclick = () => closeModal(inspectorModal);

  // Modal 1: Generate Action
  if (btnModalGenAction) {
    btnModalGenAction.onclick = async (e) => {
      e.preventDefault();
      const loadingEl = document.getElementById('modal-image-loading');
      const placeholderEl = document.getElementById('modal-empty-image-placeholder');
      const imgEl = document.getElementById('modal-shot-image');

      if (loadingEl) loadingEl.classList.remove('hidden');
      if (placeholderEl) placeholderEl.classList.add('hidden');
      if (imgEl) imgEl.classList.add('hidden');
      btnModalGenAction.disabled = true;

      const shotNum = document.getElementById('input-shot-number')?.value.trim() || '1A';
      const descVal = document.getElementById('input-shot-desc')?.value.trim() || '';
      const styleVal = document.getElementById('input-shot-style')?.value || 'Concept Art';
      const sizeVal = document.getElementById('input-shot-size')?.value || 'Medium';
      const angleVal = document.getElementById('input-shot-angle')?.value || 'Eye Level';
      const ratioVal = document.getElementById('input-shot-ratio')?.value || '2.39:1';
      const movementVal = document.getElementById('input-shot-movement')?.value || 'Static';
      const lensVal = document.getElementById('input-shot-focal')?.value || '50mm';
      const lightingVal = document.getElementById('input-shot-lighting')?.value || 'Auto / Scene-based';
      const directionVal = document.getElementById('input-shot-direction')?.value || 'Left to Right';
      const sceneContext = `${currentStoryboard?.sceneHeading || ''} ${currentStoryboard?.sceneSummary || ''}`.trim();

      const structuredPrompt = buildStructuredPrompt({
        description: descVal,
        visualStyle: styleVal,
        shotSize: sizeVal,
        cameraAngle: angleVal,
        aspectRatio: ratioVal,
        cameraMovement: movementVal,
        lens: lensVal,
        lighting: lightingVal,
        screenDirection: directionVal,
        sceneContext
      });

      try {
        const res = await api.generateStoryboardShot(scriptId, {
          provider: 'scriptora-concept',
          prompt: structuredPrompt,
          userDescription: descVal,
          shotSize: sizeVal,
          cameraAngle: angleVal,
          cameraMovement: movementVal,
          focalLength: lensVal,
          lens: lensVal,
          lightingMood: lightingVal,
          lighting: lightingVal,
          aspectRatio: ratioVal,
          visualStyle: styleVal,
          screenDirection: directionVal,
          sceneHeading: currentStoryboard?.sceneHeading || 'SCENE 1',
          shotNumber: shotNum
        });

        if (res?.imageUrl) {
          currentModalDraftImage = res.imageUrl;
          currentModalDraftPrompt = structuredPrompt;
          showToast('Image generated successfully');
        }
      } catch (err) {
        showToast(err.message || 'Generation failed');
      } finally {
        if (loadingEl) loadingEl.classList.add('hidden');
        btnModalGenAction.disabled = false;
        updateInspectorImagePreviewUI();
      }
    };
  }

  // Modal 1: File import (Reference image support)
  if (modalFileImport) {
    modalFileImport.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        currentModalDraftImage = event.target.result;
        updateInspectorImagePreviewUI();
        showToast('Reference image imported');
      };
      reader.readAsDataURL(file);
    };
  }

  // Modal 1: Quick Status Toggles
  if (btnModalToggleApprove) {
    btnModalToggleApprove.onclick = () => {
      currentModalDraftApproval = 'approved';
      const apprInput = document.getElementById('input-shot-approval');
      if (apprInput) apprInput.value = 'approved';
      updateInspectorImagePreviewUI();
      showToast('Frame marked as Approved for Production');
    };
  }

  if (btnModalToggleReject) {
    btnModalToggleReject.onclick = () => {
      currentModalDraftApproval = 'rejected';
      const apprInput = document.getElementById('input-shot-approval');
      if (apprInput) apprInput.value = 'rejected';
      updateInspectorImagePreviewUI();
      showToast('Frame marked as Rejected');
    };
  }

  if (btnModalViewFullscreen) {
    btnModalViewFullscreen.onclick = () => {
      if (currentModalDraftImage) {
        const dummyShot = {
          shotNumber: document.getElementById('input-shot-number')?.value.trim() || '1A',
          title: document.getElementById('input-shot-title')?.value.trim() || 'Preview',
          description: document.getElementById('input-shot-desc')?.value.trim() || '',
          aspectRatio: document.getElementById('input-shot-ratio')?.value || '2.39:1',
          focalLength: document.getElementById('input-shot-focal')?.value || '50mm',
          shotSize: document.getElementById('input-shot-size')?.value || 'Medium',
          cameraAngle: document.getElementById('input-shot-angle')?.value || 'Eye Level',
          imageUrl: currentModalDraftImage,
          approvalStatus: currentModalDraftApproval
        };
        openLightboxWithShot(dummyShot);
      }
    };
  }

  if (btnModalOpenHistory) {
    btnModalOpenHistory.onclick = () => {
      if (activeEditingShotId) {
        openShotHistoryModal(activeEditingShotId);
      }
    };
  }

  // Modal 1: Form submission & Save
  if (shotForm) {
    shotForm.onsubmit = async (e) => {
      e.preventDefault();
      const descVal = document.getElementById('input-shot-desc')?.value.trim() || '';
      const styleVal = document.getElementById('input-shot-style')?.value || 'Concept Art';
      const sizeVal = document.getElementById('input-shot-size')?.value || 'Medium';
      const angleVal = document.getElementById('input-shot-angle')?.value || 'Eye Level';
      const ratioVal = document.getElementById('input-shot-ratio')?.value || '2.39:1';
      const movementVal = document.getElementById('input-shot-movement')?.value || 'Static';
      const lensVal = document.getElementById('input-shot-focal')?.value || '50mm';
      const lightingVal = document.getElementById('input-shot-lighting')?.value || 'Auto / Scene-based';
      const directionVal = document.getElementById('input-shot-direction')?.value || 'Left to Right';
      const sceneContext = `${currentStoryboard?.sceneHeading || ''} ${currentStoryboard?.sceneSummary || ''}`.trim();

      const structuredPrompt = buildStructuredPrompt({
        description: descVal,
        visualStyle: styleVal,
        shotSize: sizeVal,
        cameraAngle: angleVal,
        aspectRatio: ratioVal,
        cameraMovement: movementVal,
        lens: lensVal,
        lighting: lightingVal,
        screenDirection: directionVal,
        sceneContext
      });

      const updates = {
        shotNumber: document.getElementById('input-shot-number')?.value.trim() || '1A',
        title: document.getElementById('input-shot-title')?.value.trim() || 'Shot',
        shotType: document.getElementById('input-shot-type')?.value || '',
        description: descVal,
        shotSize: sizeVal,
        cameraAngle: angleVal,
        cameraMovement: movementVal,
        focalLength: lensVal,
        lens: lensVal,
        aspectRatio: ratioVal,
        lightingMood: lightingVal,
        lighting: lightingVal,
        visualStyle: styleVal,
        prompt: structuredPrompt,
        approvalStatus: document.getElementById('input-shot-approval')?.value || 'draft',
        directorNotes: document.getElementById('input-shot-notes')?.value.trim() || '',
        imageUrl: currentModalDraftImage,
        imageSource: currentModalDraftImage ? (currentModalDraftImage.startsWith('data:image/svg') ? 'ai' : 'imported') : null,
        continuity: {
          screenDirection: directionVal
        }
      };

      try {
        if (activeEditingShotId) {
          await api.updateStoryboardShot(scriptId, currentSceneId, activeEditingShotId, updates);
          showToast('Updated shot details');
        } else {
          await api.addStoryboardShot(scriptId, currentSceneId, updates);
          showToast('Added new shot to scene');
        }
        closeModal(inspectorModal);
        loadStoryboardData();
      } catch (err) {
        showToast('Failed to save shot');
      }
    };
  }

  // Modal 1: Soft-delete shot to Recycle Bin
  if (btnDeleteShot) {
    btnDeleteShot.onclick = async () => {
      if (!activeEditingShotId) return;
      if (!confirm('Move this shot to the Storyboard Recycle Bin?')) return;
      try {
        await api.deleteStoryboardShot(scriptId, currentSceneId, activeEditingShotId);
        showToast('Shot moved to Recycle Bin');
        closeModal(inspectorModal);
        await updateRecycleBinBadge();
        loadStoryboardData();
      } catch (err) {
        showToast('Failed to delete shot');
      }
    };
  }

  // Collapsible More Camera Settings toggle
  const btnToggleMoreCamera = document.getElementById('btn-toggle-more-camera');
  const moreCameraPanel = document.getElementById('more-camera-panel');
  const moreCameraChevron = document.getElementById('more-camera-chevron');

  if (btnToggleMoreCamera && moreCameraPanel) {
    btnToggleMoreCamera.onclick = () => {
      const isHidden = moreCameraPanel.classList.toggle('hidden');
      if (moreCameraChevron) {
        moreCameraChevron.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
      }
    };
  }

  // Storyboard Preferences Modal Handling
  const btnStoryboardPreferences = document.getElementById('btn-storyboard-preferences');
  const prefModal = document.getElementById('storyboard-preferences-modal');
  const prefForm = document.getElementById('storyboard-pref-form');
  const prefClose = document.getElementById('pref-modal-close');
  const prefCancel = document.getElementById('pref-modal-cancel');
  const prefReset = document.getElementById('pref-btn-reset');

  if (btnStoryboardPreferences && prefModal) {
    btnStoryboardPreferences.onclick = async () => {
      const prefs = await loadStoryboardPreferences();
      const styleEl = document.getElementById('pref-default-style');
      const ratioEl = document.getElementById('pref-default-ratio');
      const sizeEl = document.getElementById('pref-default-size');
      const angleEl = document.getElementById('pref-default-angle');
      const lensEl = document.getElementById('pref-default-lens');
      const lightingEl = document.getElementById('pref-default-lighting');

      if (styleEl) styleEl.value = prefs?.visualStyle || 'Concept Art';
      if (ratioEl) ratioEl.value = prefs?.aspectRatio || '2.39:1';
      if (sizeEl) sizeEl.value = prefs?.shotSize || 'Medium';
      if (angleEl) angleEl.value = prefs?.cameraAngle || 'Eye Level';
      if (lensEl) lensEl.value = prefs?.lens || '50mm';
      if (lightingEl) lightingEl.value = prefs?.lighting || 'Auto / Scene-based';

      openModal(prefModal);
    };
  }

  if (prefClose) prefClose.onclick = () => closeModal(prefModal);
  if (prefCancel) prefCancel.onclick = () => closeModal(prefModal);

  if (prefReset) {
    prefReset.onclick = () => {
      const styleEl = document.getElementById('pref-default-style');
      const ratioEl = document.getElementById('pref-default-ratio');
      const sizeEl = document.getElementById('pref-default-size');
      const angleEl = document.getElementById('pref-default-angle');
      const lensEl = document.getElementById('pref-default-lens');
      const lightingEl = document.getElementById('pref-default-lighting');

      if (styleEl) styleEl.value = 'Concept Art';
      if (ratioEl) ratioEl.value = '2.39:1';
      if (sizeEl) sizeEl.value = 'Medium';
      if (angleEl) angleEl.value = 'Eye Level';
      if (lensEl) lensEl.value = '50mm';
      if (lightingEl) lightingEl.value = 'Auto / Scene-based';
      showToast('Reset to default settings');
    };
  }

  if (prefForm) {
    prefForm.onsubmit = async (e) => {
      e.preventDefault();
      const payload = {
        visualStyle: document.getElementById('pref-default-style')?.value || 'Concept Art',
        aspectRatio: document.getElementById('pref-default-ratio')?.value || '2.39:1',
        shotSize: document.getElementById('pref-default-size')?.value || 'Medium',
        cameraAngle: document.getElementById('pref-default-angle')?.value || 'Eye Level',
        lens: document.getElementById('pref-default-lens')?.value || '50mm',
        lighting: document.getElementById('pref-default-lighting')?.value || 'Auto / Scene-based',
        experienceLevel: "Intermediate"
      };

      try {
        await api.saveStoryboardPreferences(payload);
        cachedPreferences = payload;
        showToast('Storyboard preferences saved');
        closeModal(prefModal);
      } catch (err) {
        showToast('Failed to save preferences');
      }
    };
  }

  // Storyboard Recycle Bin Modal Handling
  const btnStoryboardRecycleBin = document.getElementById('btn-storyboard-recycle-bin');
  const recycleBinModal = document.getElementById('recycle-bin-modal');
  const rbClose = document.getElementById('rb-modal-close');
  const rbDone = document.getElementById('rb-modal-done');
  const rbEmptyBtn = document.getElementById('rb-btn-empty-bin');
  const rbBadge = document.getElementById('recycle-bin-badge');

  async function updateRecycleBinBadge() {
    try {
      const items = await api.getStoryboardRecycleBin(scriptId);
      const count = Array.isArray(items) ? items.length : 0;
      if (rbBadge) {
        rbBadge.textContent = count;
        if (count > 0) {
          rbBadge.classList.remove('hidden');
        } else {
          rbBadge.classList.add('hidden');
        }
      }
      return items || [];
    } catch (e) {
      return [];
    }
  }

  async function reloadScenesList() {
    try {
      const fetchedScenes = await api.getProductionScenes(scriptId);
      allScenes = fetchedScenes || [];
    } catch (e) {
      console.warn("Offline fallback for scenes:", e);
    }
    if (sceneSelect) {
      if (allScenes.length) {
        if (!allScenes.find(s => s.id === currentSceneId)) {
          currentSceneId = allScenes[0].id;
        }
        sceneSelect.innerHTML = allScenes.map(s => `
          <option value="${s.id}" ${s.id === currentSceneId ? 'selected' : ''}>
            Scene ${s.sceneNumber}: ${s.heading}
          </option>
        `).join('');
      } else {
        sceneSelect.innerHTML = `<option value="">No active scenes (all in Recycle Bin)</option>`;
      }
    }
    await loadStoryboardData();
  }

  async function renderRecycleBinItems() {
    const container = document.getElementById('rb-items-container');
    if (!container) return;

    try {
      const items = await api.getStoryboardRecycleBin(scriptId);
      const allCount = items.length;
      const shotCount = items.filter(i => i.itemType === 'shot').length;
      const sceneCount = items.filter(i => i.itemType === 'scene').length;

      const cAll = document.getElementById('rb-count-all');
      const cShots = document.getElementById('rb-count-shots');
      const cScenes = document.getElementById('rb-count-scenes');
      if (cAll) cAll.textContent = allCount;
      if (cShots) cShots.textContent = shotCount;
      if (cScenes) cScenes.textContent = sceneCount;

      const filtered = items.filter(item => {
        if (activeRecycleFilter === 'shots') return item.itemType === 'shot';
        if (activeRecycleFilter === 'scenes') return item.itemType === 'scene';
        return true;
      });

      if (!filtered.length) {
        container.innerHTML = `
          <div id="rb-empty-state" class="flex flex-col items-center justify-center py-12 text-slate-400 gap-1.5">
            <span class="material-symbols-outlined text-4xl text-slate-300">delete_outline</span>
            <span class="text-xs font-semibold text-slate-600">Recycle Bin is empty</span>
            <span class="text-[10px] text-slate-400">No deleted items match the selected filter.</span>
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map(item => {
        const isScene = item.itemType === 'scene';
        const title = isScene ? `Scene: ${item.data?.sceneHeading || item.title || 'Scene'}` : (item.title || `Shot ${item.shotNumber || ''}`);
        const subtitle = isScene ? `${item.data?.shots?.length || 0} shots included` : `Original Scene: ${item.originalSceneId || 'Scene'}`;
        const dateStr = item.deletedAt ? new Date(item.deletedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
        const thumb = !isScene && item.data?.imageUrl ? item.data.imageUrl : null;

        return `
          <div class="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors gap-2.5">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden text-slate-500">
                ${thumb ? `<img src="${thumb}" alt="" class="w-full h-full object-cover" />` : (isScene ? '<span class="material-symbols-outlined text-lg text-blue-600">movie_filter</span>' : '<span class="material-symbols-outlined text-lg text-slate-400">crop_original</span>')}
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-1.5">
                  <span class="text-xs font-bold text-slate-800 truncate">${title}</span>
                  <span class="px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold ${isScene ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-slate-100 text-slate-600'}">${isScene ? 'SCENE' : 'SHOT'}</span>
                </div>
                <div class="text-[10px] text-slate-500 truncate">${subtitle} ${dateStr ? `· Deleted ${dateStr}` : ''}</div>
              </div>
            </div>

            <div class="flex items-center gap-1.5 shrink-0">
              <button type="button" class="rb-item-restore px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors" data-item-id="${item.id}">
                <span class="material-symbols-outlined text-[14px]">restore_from_trash</span>
                <span>Restore</span>
              </button>
              <button type="button" class="rb-item-delete px-2 py-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 text-[11px] cursor-pointer transition-colors" title="Delete permanently" data-item-id="${item.id}">
                <span class="material-symbols-outlined text-[15px]">delete_forever</span>
              </button>
            </div>
          </div>
        `;
      }).join('');

      container.querySelectorAll('.rb-item-restore').forEach(btn => {
        btn.onclick = async () => {
          const itemId = btn.getAttribute('data-item-id');
          try {
            await api.restoreStoryboardRecycleBinItem(scriptId, itemId);
            showToast('Item restored successfully');
            await renderRecycleBinItems();
            await updateRecycleBinBadge();
            await reloadScenesList();
          } catch (err) {
            showToast('Failed to restore item');
          }
        };
      });

      container.querySelectorAll('.rb-item-delete').forEach(btn => {
        btn.onclick = async () => {
          const itemId = btn.getAttribute('data-item-id');
          if (!confirm('Permanently delete this item? This action cannot be undone.')) return;
          try {
            await api.permanentlyDeleteStoryboardRecycleBinItem(scriptId, itemId);
            showToast('Item permanently deleted');
            await renderRecycleBinItems();
            await updateRecycleBinBadge();
          } catch (err) {
            showToast('Failed to delete item');
          }
        };
      });

    } catch (err) {
      container.innerHTML = `<div class="p-6 text-center text-xs text-rose-500">Failed to load Recycle Bin items</div>`;
    }
  }

  // Recycle Bin Filter Tabs
  const rbTabAll = document.getElementById('rb-tab-all');
  const rbTabShots = document.getElementById('rb-tab-shots');
  const rbTabScenes = document.getElementById('rb-tab-scenes');

  function updateRbTabs(active) {
    activeRecycleFilter = active;
    [rbTabAll, rbTabShots, rbTabScenes].forEach(tab => {
      if (!tab) return;
      tab.classList.remove('bg-white', 'shadow-2xs', 'font-semibold', 'text-slate-900');
      tab.classList.add('text-slate-600');
    });
    const current = active === 'shots' ? rbTabShots : (active === 'scenes' ? rbTabScenes : rbTabAll);
    if (current) {
      current.classList.add('bg-white', 'shadow-2xs', 'font-semibold', 'text-slate-900');
      current.classList.remove('text-slate-600');
    }
    renderRecycleBinItems();
  }

  if (rbTabAll) rbTabAll.onclick = () => updateRbTabs('all');
  if (rbTabShots) rbTabShots.onclick = () => updateRbTabs('shots');
  if (rbTabScenes) rbTabScenes.onclick = () => updateRbTabs('scenes');

  if (btnStoryboardRecycleBin && recycleBinModal) {
    btnStoryboardRecycleBin.onclick = () => {
      openModal(recycleBinModal);
      renderRecycleBinItems();
    };
  }

  if (rbClose) rbClose.onclick = () => closeModal(recycleBinModal);
  if (rbDone) rbDone.onclick = () => closeModal(recycleBinModal);

  if (rbEmptyBtn) {
    rbEmptyBtn.onclick = async () => {
      if (!confirm('Empty the entire Storyboard Recycle Bin? All deleted items will be permanently erased.')) return;
      try {
        await api.emptyStoryboardRecycleBin(scriptId);
        showToast('Recycle Bin emptied');
        await renderRecycleBinItems();
        await updateRecycleBinBadge();
      } catch (err) {
        showToast('Failed to empty Recycle Bin');
      }
    };
  }

  // Scene Soft Delete button
  const btnDeleteSceneStoryboard = document.getElementById('btn-delete-scene-storyboard');
  if (btnDeleteSceneStoryboard) {
    btnDeleteSceneStoryboard.onclick = async () => {
      if (!currentStoryboard) return;
      const heading = currentStoryboard.sceneHeading || `Scene ${currentStoryboard.sceneNumber || ''}`;
      if (!confirm(`Move ${heading} and all its shots to the Storyboard Recycle Bin?`)) return;

      try {
        await api.deleteStoryboardScene(scriptId, currentSceneId);
        showToast(`${heading} moved to Recycle Bin`);
        await updateRecycleBinBadge();
        await reloadScenesList();
      } catch (err) {
        showToast('Failed to delete scene');
      }
    };
  }

// Modal 2 (AI Generation) Close & Cancel
  if (genClose) genClose.onclick = () => closeModal(genModal);
  if (genCancel) genCancel.onclick = () => closeModal(genModal);

  if (genProviderSelect) {
    genProviderSelect.onchange = updateProviderCostDisclosure;
  }

  if (genShotCountSelect) {
    genShotCountSelect.onchange = () => {
      selectedShotCount = parseInt(genShotCountSelect.value, 10) || 4;
      updateGenSubmitLabel();
      updateProviderCostDisclosure();
    };
  }

  // Start sequence generation button
  if (genBtnStart) {
    genBtnStart.onclick = async (e) => {
      e.preventDefault();
      const pId = genProviderSelect ? genProviderSelect.value : 'scriptora-concept';
      const selectedProv = providers.find(p => p.id === pId) || providers[0] || { pricingType: 'free', name: 'Concept Engine' };
      const style = document.getElementById('gen-style-select')?.value || 'Cinematic Concept Art';
      const ratio = document.getElementById('gen-ratio-select')?.value || '2.39:1';
      const quality = document.getElementById('gen-quality-select')?.value || 'Standard Draft';
      const userPrompt = document.getElementById('gen-prompt-input')?.value.trim() || '';
      const count = parseInt(genShotCountSelect?.value, 10) || selectedShotCount || 4;

      if (selectedProv.pricingType === 'paid') {
        if (!selectedProv.isConfigured) {
          if (genErrorAlert) {
            genErrorAlert.classList.remove('hidden');
            if (genErrorMsg) genErrorMsg.textContent = `Provider '${selectedProv.name}' requires API credentials. Please switch to SCRIPTORA Concept Engine (Free).`;
          }
          return;
        }
        if (!confirm(`Confirm generation using ${selectedProv.name}? Estimated cost: ${selectedProv.costLabel}.`)) {
          return;
        }
      }

      // Transition to progress step
      document.getElementById('gen-step-config')?.classList.add('hidden');
      const stepProgress = document.getElementById('gen-step-progress');
      if (stepProgress) stepProgress.classList.remove('hidden');

      const progressTitle = document.getElementById('gen-progress-title');
      const progressStatus = document.getElementById('gen-progress-status');
      const stepperEl = document.getElementById('gen-progress-stepper');

      if (progressTitle) progressTitle.textContent = `Generating ${count}-Shot Storyboard Sequence`;
      if (progressStatus) progressStatus.textContent = 'Preparing scene context...';

      if (stepperEl) {
        stepperEl.innerHTML = Array.from({ length: count }, (_, i) => `
          <span class="w-3 h-3 rounded-full bg-slate-200 transition-colors" data-step="${i + 1}"></span>
        `).join('');
      }

      try {
        for (let i = 1; i <= count; i++) {
          if (progressStatus) progressStatus.textContent = `Generating shot ${i} of ${count}...`;
          const dot = stepperEl?.querySelector(`[data-step="${i}"]`);
          if (dot) dot.className = 'w-3 h-3 rounded-full bg-blue-600 animate-pulse';
          await new Promise(r => setTimeout(r, 180));
        }

        const res = await api.generateStoryboardSequence(scriptId, currentSceneId, {
          provider: pId,
          visualStyle: style,
          aspectRatio: ratio,
          quality,
          prompt: userPrompt,
          shotCount: count
        });

        if (res?.proposedShots && res.proposedShots.length) {
          proposedSequenceShots = res.proposedShots;
          renderSequenceReviewGrid();
        } else {
          throw new Error('No shots returned from generator');
        }
      } catch (err) {
        console.error(err);
        if (stepProgress) stepProgress.classList.add('hidden');
        document.getElementById('gen-step-config')?.classList.remove('hidden');
        if (genErrorAlert) {
          genErrorAlert.classList.remove('hidden');
          if (genErrorMsg) genErrorMsg.textContent = err.message || 'Generation failed. Please try again.';
        }
      }
    };
  }

  // Sequence review buttons
  const btnApproveAllProp = document.getElementById('gen-btn-approve-all-proposed');
  if (btnApproveAllProp) {
    btnApproveAllProp.onclick = () => {
      proposedSequenceShots.forEach(s => { s.approvalStatus = 'approved'; });
      renderSequenceReviewGrid();
      showToast('All proposed shots marked as Approved');
    };
  }

  const btnConfirmSave = document.getElementById('gen-btn-confirm-save');
  if (btnConfirmSave) {
    btnConfirmSave.onclick = async () => {
      if (!proposedSequenceShots.length) return;
      btnConfirmSave.disabled = true;
      try {
        const updated = {
          ...currentStoryboard,
          shots: proposedSequenceShots,
          visualStyle: proposedSequenceShots[0]?.visualStyle || currentStoryboard?.visualStyle,
          aspectRatio: proposedSequenceShots[0]?.aspectRatio || currentStoryboard?.aspectRatio
        };
        await api.saveStoryboard(scriptId, updated);
        showToast(`Saved ${proposedSequenceShots.length} shots to storyboard.`);
        closeModal(genModal);
        loadStoryboardData();
      } catch (err) {
        showToast('Failed to save sequence');
      } finally {
        btnConfirmSave.disabled = false;
      }
    };
  }

  const btnSaveAsDraft = document.getElementById('gen-btn-save-as-draft');
  if (btnSaveAsDraft) {
    btnSaveAsDraft.onclick = async () => {
      if (!proposedSequenceShots.length) return;
      proposedSequenceShots.forEach(s => { s.approvalStatus = 'draft'; });
      const updated = {
        ...currentStoryboard,
        shots: proposedSequenceShots
      };
      await api.saveStoryboard(scriptId, updated);
      showToast('Saved sequence as draft');
      closeModal(genModal);
      loadStoryboardData();
    };
  }

  const btnDiscardPrev = document.getElementById('gen-btn-discard-preview');
  if (btnDiscardPrev) {
    btnDiscardPrev.onclick = () => {
      proposedSequenceShots = [];
      closeModal(genModal);
    };
  }

  // Modal 3 (Single Frame Regen)
  if (regenClose) regenClose.onclick = () => closeModal(regenModal);
  if (regenCancel) regenCancel.onclick = () => closeModal(regenModal);

  const regenProvSelect = document.getElementById('regen-provider-select');
  if (regenProvSelect) {
    regenProvSelect.onchange = updateRegenCostDisclosure;
  }

  if (regenConfirm) {
    regenConfirm.onclick = async () => {
      const shot = currentStoryboard?.shots?.find(s => s.id === activeRegenShotId);
      if (!shot) return;

      const pId = document.getElementById('regen-provider-select')?.value || 'scriptora-concept';
      const promptVal = document.getElementById('regen-prompt-input')?.value.trim() || shot.prompt || shot.description || 'Cinematic composition';
      const styleVal = document.getElementById('regen-style-select')?.value || shot.visualStyle || 'Cinematic Concept Art';

      regenConfirm.disabled = true;
      regenConfirm.innerHTML = `<span class="w-3.5 h-3.5 border-2 border-white/60 border-t-white rounded-full animate-spin"></span><span>Regenerating...</span>`;

      try {
        const res = await api.generateStoryboardShot(scriptId, {
          provider: pId,
          prompt: promptVal,
          shotSize: shot.shotSize,
          cameraAngle: shot.cameraAngle,
          focalLength: shot.focalLength,
          lightingMood: shot.lightingMood,
          aspectRatio: shot.aspectRatio,
          visualStyle: styleVal,
          sceneHeading: currentStoryboard?.sceneHeading || 'SCENE 1',
          shotNumber: shot.shotNumber
        });

        if (res?.imageUrl) {
          await api.updateStoryboardShot(scriptId, currentSceneId, activeRegenShotId, {
            imageUrl: res.imageUrl,
            prompt: promptVal,
            visualStyle: styleVal,
            provider: pId,
            imageSource: 'ai'
          });

          showToast(`Regenerated Shot ${shot.shotNumber}. Other shots preserved.`);
          closeModal(regenModal);
          loadStoryboardData();
        }
      } catch (err) {
        showToast(err.message || 'Regeneration failed');
      } finally {
        regenConfirm.disabled = false;
        regenConfirm.innerHTML = `<span class="material-symbols-outlined text-[15px]">auto_awesome</span><span>Regenerate Frame</span>`;
      }
    };
  }

  // Modal 4 (History)
  if (historyClose) historyClose.onclick = () => closeModal(historyModal);
  if (historyDone) historyDone.onclick = () => closeModal(historyModal);

  // Modal 5 (Lightbox)
  if (lbClose) lbClose.onclick = () => lightboxModal?.classList.add('hidden');
  if (lbPrev) {
    lbPrev.onclick = () => {
      const shots = currentStoryboard?.shots || [];
      if (!shots.length) return;
      activeLightboxShotIndex = (activeLightboxShotIndex - 1 + shots.length) % shots.length;
      updateLightboxUI();
    };
  }
  if (lbNext) {
    lbNext.onclick = () => {
      const shots = currentStoryboard?.shots || [];
      if (!shots.length) return;
      activeLightboxShotIndex = (activeLightboxShotIndex + 1) % shots.length;
      updateLightboxUI();
    };
  }
  if (lbBtnApprove) {
    lbBtnApprove.onclick = async () => {
      const shots = currentStoryboard?.shots || [];
      const shot = shots[activeLightboxShotIndex];
      if (!shot) return;
      try {
        await api.approveStoryboardShot(scriptId, currentSceneId, shot.id, 'approved');
        shot.approvalStatus = 'approved';
        showToast(`Shot ${shot.shotNumber} approved`);
        updateLightboxUI();
        renderCurrentView();
      } catch (e) {
        showToast('Failed to approve shot');
      }
    };
  }
  if (lbBtnReject) {
    lbBtnReject.onclick = async () => {
      const shots = currentStoryboard?.shots || [];
      const shot = shots[activeLightboxShotIndex];
      if (!shot) return;
      try {
        await api.approveStoryboardShot(scriptId, currentSceneId, shot.id, 'rejected');
        shot.approvalStatus = 'rejected';
        showToast(`Shot ${shot.shotNumber} marked as rejected`);
        updateLightboxUI();
        renderCurrentView();
      } catch (e) {
        showToast('Failed to reject shot');
      }
    };
  }

  // Keyboard navigation for Lightbox
  const keyHandler = (e) => {
    if (lightboxModal && !lightboxModal.classList.contains('hidden')) {
      if (e.key === 'Escape') lightboxModal.classList.add('hidden');
      if (e.key === 'ArrowLeft' && lbPrev) lbPrev.click();
      if (e.key === 'ArrowRight' && lbNext) lbNext.click();
    }
  };
  document.removeEventListener('keydown', keyHandler);
  document.addEventListener('keydown', keyHandler);


  // =========================================================================
  // 2. MODAL HELPER FUNCTIONS
  // =========================================================================

  let cachedPreferences = null;
  let activeRecycleFilter = 'all';

  function selectStyleCard(styleName) {
    const cards = document.querySelectorAll('.style-preview-card');
    const inputStyle = document.getElementById('input-shot-style');
    let matchedCard = null;

    cards.forEach(card => {
      const cardStyle = card.getAttribute('data-style-id') || '';
      const isMatch = (cardStyle.toLowerCase() === (styleName || '').toLowerCase()) ||
                      (cardStyle.includes('concept') && (styleName || '').includes('Concept')) ||
                      (cardStyle.includes('realism') && (styleName || '').includes('Realism')) ||
                      (cardStyle.includes('sketch') && (styleName || '').includes('Sketch')) ||
                      (cardStyle.includes('photo') && (styleName || '').includes('Photo'));

      if (isMatch && !matchedCard) {
        matchedCard = card;
        card.classList.add('border-blue-600', 'ring-2', 'ring-blue-500/30', 'bg-blue-50/20');
        card.classList.remove('border-slate-200');
        card.querySelector('.style-check-badge')?.classList.remove('hidden');
      } else {
        card.classList.remove('border-blue-600', 'ring-2', 'ring-blue-500/30', 'bg-blue-50/20');
        card.classList.add('border-slate-200');
        card.querySelector('.style-check-badge')?.classList.add('hidden');
      }
    });

    if (matchedCard) {
      if (inputStyle) inputStyle.value = matchedCard.getAttribute('data-style-id') || styleName;
    } else if (cards.length > 0) {
      const first = cards[0];
      first.classList.add('border-blue-600', 'ring-2', 'ring-blue-500/30', 'bg-blue-50/20');
      first.classList.remove('border-slate-200');
      first.querySelector('.style-check-badge')?.classList.remove('hidden');
      if (inputStyle) inputStyle.value = first.getAttribute('data-style-id') || 'Concept Art';
    }
  }

  function setupStylePreviewCards() {
    const cards = document.querySelectorAll('.style-preview-card');
    cards.forEach(card => {
      card.onclick = () => {
        const styleId = card.getAttribute('data-style-id');
        selectStyleCard(styleId);
      };
    });
  }

  async function loadStoryboardPreferences() {
    try {
      cachedPreferences = await api.getStoryboardPreferences();
    } catch (e) {
      cachedPreferences = {
        visualStyle: "Concept Art",
        aspectRatio: "2.39:1",
        shotSize: "Medium",
        cameraAngle: "Eye Level",
        lens: "50mm",
        lighting: "Auto / Scene-based",
        experienceLevel: "Intermediate"
      };
    }
    return cachedPreferences;
  }

  async function openShotInspector(shotId) {
    activeEditingShotId = shotId;
    const isNew = !shotId;
    const shots = currentStoryboard?.shots || [];
    const shot = isNew ? null : shots.find(s => s.id === shotId);

    const prefs = cachedPreferences || (await loadStoryboardPreferences());

    const defaultShotLetter = String.fromCharCode(65 + (shots.length % 26));
    const defaultShotNum = `${currentStoryboard?.sceneNumber || 1}${defaultShotLetter}`;
    const activeNum = shot?.shotNumber || defaultShotNum;

    const pill = document.getElementById('modal-shot-pill');
    const heading = document.getElementById('modal-shot-heading');
    const displayNum = document.getElementById('display-shot-number');

    if (pill) pill.textContent = activeNum;
    if (heading) heading.textContent = isNew ? 'Add New Shot' : `Edit Shot ${activeNum}`;
    if (displayNum) displayNum.textContent = activeNum;

    const numInput = document.getElementById('input-shot-number');
    const titleInput = document.getElementById('input-shot-title');
    const typeInput = document.getElementById('input-shot-type');
    const descInput = document.getElementById('input-shot-desc');
    const sizeInput = document.getElementById('input-shot-size');
    const angleInput = document.getElementById('input-shot-angle');
    const ratioInput = document.getElementById('input-shot-ratio');
    const movementInput = document.getElementById('input-shot-movement');
    const focalInput = document.getElementById('input-shot-focal');
    const lightingInput = document.getElementById('input-shot-lighting');
    const directionInput = document.getElementById('input-shot-direction');
    const approvalInput = document.getElementById('input-shot-approval');
    const notesInput = document.getElementById('input-shot-notes');

    if (numInput) numInput.value = activeNum;
    if (titleInput) titleInput.value = shot?.title || (isNew ? `Shot ${activeNum}` : '');
    if (typeInput) typeInput.value = shot?.shotType || '';
    if (descInput) descInput.value = shot?.description || '';
    if (sizeInput) sizeInput.value = shot?.shotSize || prefs?.shotSize || 'Medium';
    if (angleInput) angleInput.value = shot?.cameraAngle || prefs?.cameraAngle || 'Eye Level';
    if (ratioInput) ratioInput.value = shot?.aspectRatio || currentStoryboard?.aspectRatio || prefs?.aspectRatio || '2.39:1';
    if (movementInput) movementInput.value = shot?.cameraMovement || 'Static';
    if (focalInput) focalInput.value = shot?.focalLength || shot?.lens || prefs?.lens || '50mm';
    if (lightingInput) lightingInput.value = shot?.lightingMood || shot?.lighting || prefs?.lighting || 'Auto / Scene-based';
    if (directionInput) directionInput.value = shot?.continuity?.screenDirection || 'Left to Right';
    if (approvalInput) approvalInput.value = shot?.approvalStatus || 'draft';
    if (notesInput) notesInput.value = shot?.directorNotes || '';

    // Style preview cards selection
    setupStylePreviewCards();
    const activeStyle = shot?.visualStyle || currentStoryboard?.visualStyle || prefs?.visualStyle || 'Concept Art';
    selectStyleCard(activeStyle);

    currentModalDraftImage = shot?.imageUrl || null;
    currentModalDraftPrompt = shot?.prompt || '';
    currentModalDraftApproval = shot?.approvalStatus || 'draft';

    updateInspectorImagePreviewUI();

    if (btnDeleteShot) {
      btnDeleteShot.classList.toggle('hidden', isNew);
    }

    openModal(inspectorModal);
  }

  function updateInspectorImagePreviewUI() {
    const imgEl = document.getElementById('modal-shot-image');
    const placeholderEl = document.getElementById('modal-empty-image-placeholder');
    const postGenBar = document.getElementById('modal-post-gen-actions');
    const fullscreenBtn = document.getElementById('modal-btn-view-fullscreen');
    const genActionLabel = document.getElementById('modal-generate-action-label');
    const approveLabel = document.getElementById('modal-approve-toggle-label');
    const historyCountEl = document.getElementById('modal-history-count');

    if (currentModalDraftImage) {
      if (imgEl) {
        imgEl.src = currentModalDraftImage;
        imgEl.classList.remove('hidden');
      }
      if (placeholderEl) placeholderEl.classList.add('hidden');
      if (postGenBar) postGenBar.classList.remove('hidden');
      if (fullscreenBtn) fullscreenBtn.classList.remove('hidden');
      if (genActionLabel) genActionLabel.textContent = 'Regenerate Image';
    } else {
      if (imgEl) imgEl.classList.add('hidden');
      if (placeholderEl) placeholderEl.classList.remove('hidden');
      if (postGenBar) postGenBar.classList.add('hidden');
      if (fullscreenBtn) fullscreenBtn.classList.add('hidden');
      if (genActionLabel) genActionLabel.textContent = 'Generate Image';
    }

    const shot = activeEditingShotId ? currentStoryboard?.shots?.find(s => s.id === activeEditingShotId) : null;
    const histLen = Array.isArray(shot?.history) ? shot.history.length : 0;
    if (historyCountEl) historyCountEl.textContent = String(histLen);

    if (approveLabel) {
      approveLabel.textContent = currentModalDraftApproval === 'approved' ? 'Approved' : 'Approve';
    }
  }

  function openSequenceGenerationModal() {
    const scene = allScenes.find(s => s.id === currentSceneId) || allScenes[0] || {};
    const sceneHeadingDisp = document.getElementById('gen-scene-heading-display');
    const sceneCastDisp = document.getElementById('gen-scene-cast-display');
    const sceneSnippetDisp = document.getElementById('gen-scene-snippet-display');

    if (sceneHeadingDisp) sceneHeadingDisp.textContent = scene.heading || 'SCENE 1';
    if (sceneCastDisp) sceneCastDisp.textContent = `Cast: ${(scene.cast || ['KEVIN', 'MARCUS']).join(', ')}`;
    if (sceneSnippetDisp) sceneSnippetDisp.textContent = scene.snippet || 'Scene awaiting visual direction.';

    document.getElementById('gen-step-config')?.classList.remove('hidden');
    document.getElementById('gen-step-progress')?.classList.add('hidden');
    document.getElementById('gen-step-preview')?.classList.add('hidden');

    if (genShotCountSelect) {
      genShotCountSelect.value = String(selectedShotCount);
    }
    updateGenSubmitLabel();
    updateProviderCostDisclosure();

    if (genErrorAlert) genErrorAlert.classList.add('hidden');
    openModal(genModal);
  }

  function updateGenSubmitLabel() {
    const submitLabel = document.getElementById('gen-submit-label');
    if (!submitLabel) return;
    submitLabel.textContent = `Generate ${selectedShotCount}-Shot Sequence`;
  }

  function updateProviderCostDisclosure() {
    if (!genProviderSelect) return;
    const pId = genProviderSelect.value;
    const p = providers.find(prov => prov.id === pId) || providers[0] || { pricingType: 'free', isConfigured: true };

    if (genProviderStatus) {
      if (p.isConfigured || !p.requiresApiKey) {
        genProviderStatus.className = 'text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1';
        genProviderStatus.innerHTML = `<span class="material-symbols-outlined text-[14px]">check_circle</span><span>Configured & Ready</span>`;
      } else {
        genProviderStatus.className = 'text-[11px] text-amber-600 font-medium mt-0.5 flex items-center gap-1';
        genProviderStatus.innerHTML = `<span class="material-symbols-outlined text-[14px]">info</span><span>Key missing in backend .env (${p.envVarName || 'API_KEY'})</span>`;
      }
    }

    if (genCostLabel) {
      if (p.pricingType === 'free') {
        genCostLabel.textContent = 'Free (Built-in Concept Engine, no API keys or charges required).';
      } else {
        const count = selectedShotCount || 4;
        const est = `$${((p.costPerImage || 0.04) * count).toFixed(3)} (${count}-shot batch)`;
        genCostLabel.textContent = `${p.costLabel || 'Paid API'} — Estimated: ${est}. Server credentials required.`;
      }
    }
  }

  function renderSequenceReviewGrid() {
    document.getElementById('gen-step-progress')?.classList.add('hidden');
    const previewStep = document.getElementById('gen-step-preview');
    if (previewStep) previewStep.classList.remove('hidden');

    const countLabel = document.getElementById('gen-preview-count-label');
    if (countLabel) countLabel.textContent = `${proposedSequenceShots.length} Shots Proposed`;

    const grid = document.getElementById('gen-preview-grid');
    if (!grid) return;

    grid.innerHTML = proposedSequenceShots.map((shot, idx) => `
      <div class="bg-white rounded-xl border border-slate-200 p-2.5 flex flex-col gap-2 shadow-2xs" data-proposed-idx="${idx}">
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-1.5">
            <span class="font-mono font-bold text-blue-600">${shot.shotNumber}</span>
            <span class="font-semibold text-slate-800 truncate max-w-[140px]">${shot.title}</span>
          </div>
          <button type="button" class="btn-toggle-prop-approve px-2 py-0.5 rounded text-[10px] font-semibold border cursor-pointer capitalize ${shot.approvalStatus === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}" data-proposed-idx="${idx}">
            ${shot.approvalStatus || 'Proposed'}
          </button>
        </div>

        <div class="aspect-video bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center relative cursor-pointer btn-prop-lightbox" data-proposed-idx="${idx}">
          <img src="${shot.imageUrl}" alt="${shot.title}" class="w-full h-full object-cover" />
          <div class="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/75 text-white font-mono text-[9px]">
            ${shot.aspectRatio || '2.39:1'} · ${shot.focalLength || '50mm'}
          </div>
        </div>

        <div class="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
          <span>${shot.shotSize || 'Wide'} · ${shot.cameraAngle || 'Eye Level'}</span>
          <button type="button" class="btn-prop-regen text-blue-600 hover:text-blue-800 font-semibold cursor-pointer" data-proposed-idx="${idx}">
            Regenerate
          </button>
        </div>
      </div>
    `).join('');

    // Toggle approval
    grid.querySelectorAll('.btn-toggle-prop-approve').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const idx = Number(btn.getAttribute('data-proposed-idx'));
        if (proposedSequenceShots[idx]) {
          proposedSequenceShots[idx].approvalStatus = proposedSequenceShots[idx].approvalStatus === 'approved' ? 'proposed' : 'approved';
          renderSequenceReviewGrid();
        }
      };
    });

    // Lightbox for proposed frame
    grid.querySelectorAll('.btn-prop-lightbox').forEach(el => {
      el.onclick = () => {
        const idx = Number(el.getAttribute('data-proposed-idx'));
        if (proposedSequenceShots[idx]) {
          openLightboxWithShot(proposedSequenceShots[idx]);
        }
      };
    });

    // Regenerate individual proposed shot
    grid.querySelectorAll('.btn-prop-regen').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const idx = Number(btn.getAttribute('data-proposed-idx'));
        const shot = proposedSequenceShots[idx];
        if (!shot) return;

        btn.disabled = true;
        btn.textContent = 'Generating...';

        try {
          const res = await api.generateStoryboardShot(scriptId, {
            provider: shot.provider || 'scriptora-concept',
            prompt: shot.prompt || shot.description || 'Cinematic composition',
            shotSize: shot.shotSize,
            cameraAngle: shot.cameraAngle,
            focalLength: shot.focalLength,
            lightingMood: shot.lightingMood,
            aspectRatio: shot.aspectRatio,
            visualStyle: shot.visualStyle,
            sceneHeading: currentStoryboard?.sceneHeading || 'SCENE 1',
            shotNumber: shot.shotNumber
          });

          if (res?.imageUrl) {
            shot.imageUrl = res.imageUrl;
            showToast(`Regenerated proposed frame ${shot.shotNumber}`);
            renderSequenceReviewGrid();
          }
        } catch (err) {
          showToast(err.message || 'Regeneration failed');
        } finally {
          btn.disabled = false;
        }
      };
    });
  }

  function openSingleFrameRegenModal(shotId) {
    activeRegenShotId = shotId;
    const shot = currentStoryboard?.shots?.find(s => s.id === shotId);
    if (!shot) return;

    const pill = document.getElementById('regen-shot-pill');
    const curImg = document.getElementById('regen-current-image');
    const promptInput = document.getElementById('regen-prompt-input');
    const styleInput = document.getElementById('regen-style-select');

    if (pill) pill.textContent = shot.shotNumber;
    if (curImg) curImg.src = shot.imageUrl || '';
    if (promptInput) promptInput.value = shot.prompt || shot.description || '';
    if (styleInput) styleInput.value = shot.visualStyle || 'Cinematic Concept Art';

    updateRegenCostDisclosure();
    openModal(regenModal);
  }

  function updateRegenCostDisclosure() {
    const provSelect = document.getElementById('regen-provider-select');
    const costBanner = document.getElementById('regen-cost-banner');
    if (!provSelect || !costBanner) return;
    const p = providers.find(prov => prov.id === provSelect.value) || providers[0] || { pricingType: 'free' };
    if (p.pricingType === 'free') {
      costBanner.textContent = 'Free (Built-in Concept Engine, no charges).';
    } else {
      costBanner.textContent = `Estimated: ${p.costLabel || '$0.040'}. Server credentials required.`;
    }
  }

  function openShotHistoryModal(shotId) {
    activeHistoryShotId = shotId;
    const shot = currentStoryboard?.shots?.find(s => s.id === shotId);
    if (!shot) return;

    const titleEl = document.getElementById('history-modal-title');
    if (titleEl) titleEl.textContent = `History for Shot ${shot.shotNumber}`;
    const container = document.getElementById('history-items-container');
    if (!container) return;

    const history = Array.isArray(shot.history) ? shot.history : [];

    if (!history.length) {
      container.innerHTML = `
        <div class="p-8 text-center text-slate-400 text-xs">
          <span class="material-symbols-outlined text-2xl text-slate-400">history</span>
          <p class="mt-1">No previous versions recorded for this shot.</p>
        </div>
      `;
    } else {
      container.innerHTML = history.slice().reverse().map((h, revIdx) => {
        const realIdx = history.length - 1 - revIdx;
        const dateStr = h.timestamp ? new Date(h.timestamp).toLocaleString() : 'Past Version';

        return `
          <div class="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex flex-col gap-2">
            <div class="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span class="font-mono text-blue-600">${dateStr}</span>
              <span class="px-1.5 py-0.5 rounded text-[10px] bg-slate-200 text-slate-700 font-mono">${h.sourceVersion || 'Draft 4.2'}</span>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-20 h-14 bg-slate-950 rounded-lg overflow-hidden border border-slate-800 shrink-0 flex items-center justify-center">
                ${h.previousImageUrl ? `
                  <img src="${h.previousImageUrl}" alt="Historical version" class="w-full h-full object-cover" />
                ` : `
                  <span class="material-symbols-outlined text-slate-600 text-base">image</span>
                `}
              </div>
              <div class="min-w-0 flex-1 text-[11px] text-slate-600">
                <p class="line-clamp-2 italic">${h.previousPrompt || 'No prompt recorded'}</p>
                <div class="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                  <span>Provider: ${h.provider || 'scriptora-concept'}</span>
                  <span>·</span>
                  <span>By: ${h.updatedBy || 'Director'}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-end pt-1 border-t border-slate-200/60">
              <button type="button" class="btn-restore-version px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] transition-colors cursor-pointer" data-hist-idx="${realIdx}">
                Restore This Version
              </button>
            </div>
          </div>
        `;
      }).join('');

      container.querySelectorAll('.btn-restore-version').forEach(btn => {
        btn.onclick = async () => {
          const idx = Number(btn.getAttribute('data-hist-idx'));
          try {
            await api.restoreStoryboardShotVersion(scriptId, currentSceneId, activeHistoryShotId, idx);
            showToast(`Restored past version to Shot ${shot.shotNumber}`);
            closeModal(historyModal);
            loadStoryboardData();
          } catch (e) {
            showToast('Failed restoring version');
          }
        };
      });
    }

    openModal(historyModal);
  }

  function openLightbox(index) {
    const shots = currentStoryboard?.shots || [];
    if (!shots.length) return;
    activeLightboxShotIndex = (index >= 0 && index < shots.length) ? index : 0;
    updateLightboxUI();
    lightboxModal?.classList.remove('hidden');
  }

  function openLightboxWithShot(shot) {
    const imgEl = document.getElementById('lb-image');
    const numEl = document.getElementById('lb-shot-num');
    const specsEl = document.getElementById('lb-specs');
    const titleEl = document.getElementById('lb-title');
    const descEl = document.getElementById('lb-desc');
    const approveBtn = document.getElementById('lb-btn-approve');
    const rejectBtn = document.getElementById('lb-btn-reject');
    const prevBtn = document.getElementById('lb-prev');
    const nextBtn = document.getElementById('lb-next');

    if (imgEl) imgEl.src = shot.imageUrl || '';
    if (numEl) numEl.textContent = `REC · ${shot.shotNumber}`;
    if (specsEl) specsEl.textContent = `${shot.aspectRatio || '2.39:1'} · ${shot.focalLength || '50mm'} · ${shot.shotSize || 'Medium'}`;
    if (titleEl) titleEl.textContent = shot.title;
    if (descEl) descEl.textContent = shot.description || 'No description provided.';
    if (prevBtn) prevBtn.classList.add('hidden');
    if (nextBtn) nextBtn.classList.add('hidden');
    if (approveBtn) approveBtn.classList.add('hidden');
    if (rejectBtn) rejectBtn.classList.add('hidden');

    lightboxModal?.classList.remove('hidden');
  }

  function updateLightboxUI() {
    const shots = currentStoryboard?.shots || [];
    const shot = shots[activeLightboxShotIndex];
    if (!shot) return;

    const imgEl = document.getElementById('lb-image');
    const numEl = document.getElementById('lb-shot-num');
    const specsEl = document.getElementById('lb-specs');
    const titleEl = document.getElementById('lb-title');
    const descEl = document.getElementById('lb-desc');
    const approveLabel = document.getElementById('lb-approve-label');
    const prevBtn = document.getElementById('lb-prev');
    const nextBtn = document.getElementById('lb-next');
    const approveBtn = document.getElementById('lb-btn-approve');
    const rejectBtn = document.getElementById('lb-btn-reject');

    if (prevBtn) prevBtn.classList.remove('hidden');
    if (nextBtn) nextBtn.classList.remove('hidden');
    if (approveBtn) approveBtn.classList.remove('hidden');
    if (rejectBtn) rejectBtn.classList.remove('hidden');

    if (imgEl) imgEl.src = shot.imageUrl || '';
    if (numEl) numEl.textContent = `REC · ${shot.shotNumber}`;
    if (specsEl) specsEl.textContent = `${shot.aspectRatio || '2.39:1'} · ${shot.focalLength || '50mm'} · ${shot.shotSize || 'Medium'}`;
    if (titleEl) titleEl.textContent = shot.title;
    if (descEl) descEl.textContent = shot.description || 'No description provided.';

    if (approveLabel) {
      approveLabel.textContent = shot.approvalStatus === 'approved' ? 'Approved' : 'Approve';
    }
  }


  // =========================================================================
  // 3. ASYNC INITIALIZATION & DATA LOADING
  // =========================================================================

  async function loadStoryboardData() {
    if (!viewContainer) return;
    viewContainer.innerHTML = `<div class="p-16 text-center text-slate-400 text-xs">Loading storyboard shots...</div>`;

    try {
      currentStoryboard = await api.getStoryboard(scriptId, currentSceneId);
    } catch (err) {
      console.error(err);
      currentStoryboard = { sceneId: currentSceneId, shots: [] };
    }

    updateSceneContextUI();
    renderCurrentView();
  }

  function updateSceneContextUI() {
    const scene = allScenes.find(s => s.id === currentSceneId) || allScenes[0] || {};
    const intExtEl = document.getElementById('badge-int-ext');
    const dayNightEl = document.getElementById('badge-day-night');
    const pagesEl = document.getElementById('badge-pages');
    const shootDayEl = document.getElementById('badge-shoot-day');
    const snippetEl = document.getElementById('scene-snippet-text');

    if (intExtEl) intExtEl.textContent = scene.intExt || 'INT';
    if (dayNightEl) dayNightEl.textContent = scene.dayNight || 'DAY';
    if (pagesEl) pagesEl.textContent = `${scene.pages || '1.0'} pgs`;
    if (shootDayEl) shootDayEl.textContent = scene.shootDay || 'Day 1 of 7';
    if (snippetEl) snippetEl.textContent = scene.snippet || 'Scene awaiting visual direction.';

    if (btnScheduleLink) {
      const dayNum = String(scene.shootDay || '1').match(/\d+/)?.[0] || '1';
      btnScheduleLink.href = `/production/schedule?scriptId=${scriptId}&day=${dayNum}&sceneId=${scene.id}`;
    }

    if (staleBanner) {
      if (currentStoryboard?.isVersionStale) {
        staleBanner.classList.remove('hidden');
        const pinVer = document.getElementById('stale-pinned-ver');
        const actVer = document.getElementById('stale-active-ver');
        if (pinVer) pinVer.textContent = currentStoryboard.sourceVersion || 'Draft 4.2';
        if (actVer) actVer.textContent = currentStoryboard.currentScriptDraft || 'Draft 4.3';
      } else {
        staleBanner.classList.add('hidden');
      }
    }

    checkContinuityWarnings();
  }

  function checkContinuityWarnings() {
    if (!continuityBanner) return;
    const shots = currentStoryboard?.shots || [];
    let conflictFound = false;
    let conflictText = '';

    for (let i = 0; i < shots.length - 1; i++) {
      const cur = shots[i];
      const next = shots[i + 1];
      const curSize = cur?.shotSize || '';
      const nextSize = next?.shotSize || '';
      if (curSize.includes('Close') && nextSize.includes('Close')) {
        const curEye = cur.continuity?.eyeline?.toLowerCase() || cur.continuity?.screenDirection?.toLowerCase() || '';
        const nextEye = next.continuity?.eyeline?.toLowerCase() || next.continuity?.screenDirection?.toLowerCase() || '';
        if (curEye && nextEye && curEye === nextEye && (curEye.includes('screen') || curEye.includes('left') || curEye.includes('right'))) {
          conflictFound = true;
          conflictText = `Shot ${cur.shotNumber} and Shot ${next.shotNumber} both have screen direction "${cur.continuity.screenDirection || cur.continuity.eyeline}", which may create a jump or reverse-angle crossing.`;
          break;
        }
      }
    }

    if (conflictFound) {
      continuityBanner.classList.remove('hidden');
      const bannerText = document.getElementById('continuity-warning-text');
      if (bannerText) bannerText.textContent = conflictText;
    } else {
      continuityBanner.classList.add('hidden');
    }
  }

  function renderCurrentView() {
    if (!viewContainer) return;
    const shots = currentStoryboard?.shots || [];

    if (!shots.length) {
      viewContainer.innerHTML = `
        <div class="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center flex flex-col items-center justify-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">art_track</span>
          </div>
          <div class="max-w-md">
            <h4 class="font-heading font-bold text-sm text-slate-900">No Storyboard Frames Yet</h4>
            <p class="text-xs text-slate-500 mt-1 leading-relaxed">
              This scene does not have a visual storyboard. Generate an AI proposed sequence grounded in the screenplay or add shots manually.
            </p>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <button id="btn-empty-generate" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
              <span>Generate Scene Sequence</span>
            </button>
            <button id="btn-empty-add" class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer">
              <span>+ Add Shot Manually</span>
            </button>
          </div>
        </div>
      `;

      const emptyGen = document.getElementById('btn-empty-generate');
      const emptyAdd = document.getElementById('btn-empty-add');
      if (emptyGen) emptyGen.onclick = () => openSequenceGenerationModal();
      if (emptyAdd) emptyAdd.onclick = () => openShotInspector(null);
      return;
    }

    if (currentView === 'contact') {
      renderContactSheet(shots);
    } else {
      renderSequenceEditor(shots);
    }
  }

  function renderContactSheet(shots) {
    viewContainer.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        ${shots.map(s => {
          const statusBg = s.approvalStatus === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
            (s.approvalStatus === 'proposed' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              (s.approvalStatus === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-slate-100 text-slate-600 border-slate-200'));

          const historyCount = Array.isArray(s.history) ? s.history.length : 0;

          return `
            <div class="storyboard-card bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-blue-400 hover:shadow-sm transition-all flex flex-col justify-between" data-shot-id="${s.id}">
              <div>
                <!-- Top Card Meta Header -->
                <div class="px-3 py-2 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                  <div class="flex items-center gap-1.5">
                    <span class="font-mono font-bold text-xs text-slate-900">${s.shotNumber}</span>
                    <span class="text-[10px] text-slate-400">#${s.order}</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold border ${statusBg} capitalize">
                      ${s.approvalStatus || 'Draft'}
                    </span>
                    ${historyCount > 0 ? `
                      <button class="btn-card-history p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${s.id}" title="View generation history (${historyCount} previous versions)">
                        <span class="material-symbols-outlined text-[15px]">history</span>
                      </button>
                    ` : ''}
                  </div>
                </div>

                <!-- Primary Visual Image Canvas -->
                <div class="aspect-video bg-slate-950 flex items-center justify-center relative overflow-hidden cursor-pointer group btn-open-lightbox" data-shot-id="${s.id}">
                  ${s.imageUrl ? `
                    <img src="${s.imageUrl}" alt="${s.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102" />
                  ` : `
                    <div class="flex flex-col items-center justify-center text-slate-500 gap-1 p-4 text-center">
                      <span class="material-symbols-outlined text-2xl text-slate-600">art_track</span>
                      <span class="text-[10px] font-medium text-slate-400">Tap to inspect & generate frame</span>
                    </div>
                  `}
                  <!-- Badges overlay -->
                  <div class="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/75 text-white font-mono text-[9px] backdrop-blur-xs">
                    ${s.aspectRatio || '2.39:1'} · ${s.focalLength || '50mm'}
                  </div>
                  <button class="absolute bottom-2 right-2 p-1 rounded bg-black/60 hover:bg-black/80 text-white text-[12px] opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer" title="View Full Size">
                    <span class="material-symbols-outlined text-[14px]">fullscreen</span>
                  </button>
                </div>

                <!-- Title & Details -->
                <div class="p-3 flex flex-col gap-1.5">
                  <h4 class="font-heading font-bold text-xs text-slate-900 truncate" title="${s.title}">${s.title}</h4>
                  <p class="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">${s.description || 'No description provided.'}</p>
                  
                  <!-- Metadata Chips -->
                  <div class="flex items-center gap-1.5 pt-1 text-[10px] text-slate-600 flex-wrap">
                    <span class="px-1.5 py-0.5 rounded bg-slate-100 font-medium">${s.shotSize || 'Wide'}</span>
                    <span class="px-1.5 py-0.5 rounded bg-slate-100 font-medium">${s.cameraAngle || 'Eye Level'}</span>
                    ${s.cameraMovement && s.cameraMovement !== 'Static' ? `<span class="px-1.5 py-0.5 rounded bg-slate-100 font-medium">${s.cameraMovement}</span>` : ''}
                    ${s.continuity?.screenDirection ? `<span class="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium truncate max-w-[140px]">${s.continuity.screenDirection}</span>` : ''}
                  </div>
                </div>
              </div>

              <!-- Card Action Bar -->
              <div class="px-3 py-2 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between text-xs gap-1">
                <!-- Reorder arrows -->
                <div class="flex items-center gap-0.5">
                  <button class="btn-move-up p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${s.id}" title="Move left / up">
                    <span class="material-symbols-outlined text-[16px]">arrow_back</span>
                  </button>
                  <button class="btn-move-down p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${s.id}" title="Move right / down">
                    <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                <!-- Action controls -->
                <div class="flex items-center gap-1">
                  <button class="btn-quick-approve p-1 rounded ${s.approvalStatus === 'approved' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-emerald-600'} cursor-pointer transition-colors" data-shot-id="${s.id}" title="${s.approvalStatus === 'approved' ? 'Mark as Draft' : 'Approve Frame'}">
                    <span class="material-symbols-outlined text-[16px]">${s.approvalStatus === 'approved' ? 'check_circle' : 'check'}</span>
                  </button>
                  <button class="btn-card-regen p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${s.id}" title="Regenerate this frame">
                    <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                  </button>
                  <button class="btn-open-inspector px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 text-[11px] font-semibold transition-all cursor-pointer" data-shot-id="${s.id}">
                    Edit Details
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    attachSharedCardEventListeners();
  }

  function renderSequenceEditor(shots) {
    const allSelected = shots.length > 0 && shots.every(s => sequenceSelectedShotIds.has(s.id));
    const selectedCount = sequenceSelectedShotIds.size;

    viewContainer.innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs flex flex-col">
        <!-- Sequence Toolbar with Batch Selection -->
        <div class="px-3.5 sm:px-4 py-2.5 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
          <div class="flex items-center gap-2">
            <label class="inline-flex items-center gap-1.5 cursor-pointer select-none">
              <input type="checkbox" id="seq-select-all" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" ${allSelected ? 'checked' : ''} />
              <span class="font-heading font-bold text-slate-800 text-xs sm:text-sm">${shots.length} Shots in Sequence</span>
            </label>
            ${selectedCount > 0 ? `
              <span class="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                ${selectedCount} selected
              </span>
            ` : ''}
          </div>

          <!-- Batch Action Controls -->
          <div class="flex items-center gap-2 flex-wrap">
            ${selectedCount > 0 ? `
              <button id="btn-batch-approve-selected" class="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-[11px] font-semibold cursor-pointer transition-all flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">done_all</span>
                <span>Approve Selected (${selectedCount})</span>
              </button>
              <button id="btn-batch-reject-selected" class="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-[11px] font-semibold cursor-pointer transition-all flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">close</span>
                <span>Reject</span>
              </button>
            ` : `
              <button id="btn-batch-approve-all" class="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-[11px] font-semibold cursor-pointer transition-all flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">done_all</span>
                <span>Approve All Proposed</span>
              </button>
            `}
            <button id="btn-seq-add-shot" class="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-semibold hover:bg-black cursor-pointer flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">add</span>
              <span>Add Shot</span>
            </button>
          </div>
        </div>

        <!-- Shots Sequence Table -->
        <div class="divide-y divide-slate-100">
          ${shots.map(s => {
            const statusBg = s.approvalStatus === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
              (s.approvalStatus === 'proposed' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                (s.approvalStatus === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-slate-100 text-slate-600 border-slate-200'));

            const isChecked = sequenceSelectedShotIds.has(s.id);

            return `
              <div class="p-3 sm:p-4 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0 w-full overflow-hidden" data-shot-id="${s.id}">
                <div class="flex items-start gap-2.5 sm:gap-3 min-w-0 flex-1 w-full">
                  <!-- Row selection checkbox -->
                  <div class="pt-1.5 shrink-0">
                    <input type="checkbox" class="seq-shot-check rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" data-shot-id="${s.id}" ${isChecked ? 'checked' : ''} />
                  </div>

                  <!-- Reorder Controls -->
                  <div class="flex sm:flex-col items-center gap-0.5 sm:gap-1 shrink-0 pt-0.5">
                    <button class="btn-move-up p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${s.id}" title="Move up in sequence">
                      <span class="material-symbols-outlined text-[16px]">expand_less</span>
                    </button>
                    <span class="font-mono font-bold text-xs text-slate-700">${s.order}</span>
                    <button class="btn-move-down p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${s.id}" title="Move down in sequence">
                      <span class="material-symbols-outlined text-[16px]">expand_more</span>
                    </button>
                  </div>

                  <!-- Thumbnail Preview -->
                  <div class="w-16 h-12 sm:w-20 sm:h-12 bg-slate-950 rounded-lg overflow-hidden shrink-0 border border-slate-800 flex items-center justify-center cursor-pointer btn-open-lightbox" data-shot-id="${s.id}">
                    ${s.imageUrl ? `
                      <img src="${s.imageUrl}" alt="${s.title}" class="w-full h-full object-cover" />
                    ` : `
                      <span class="material-symbols-outlined text-slate-600 text-base sm:text-lg">image</span>
                    `}
                  </div>

                  <!-- Shot Summary Info -->
                  <div class="min-w-0 flex-1 overflow-hidden">
                    <div class="flex items-center gap-1.5 flex-wrap min-w-0">
                      <span class="font-mono font-bold text-xs text-blue-600 shrink-0">${s.shotNumber}</span>
                      <h4 class="font-heading font-semibold text-xs text-slate-900 truncate min-w-0 flex-1" title="${s.title}">${s.title}</h4>
                      <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold border ${statusBg} capitalize shrink-0">
                        ${s.approvalStatus || 'Draft'}
                      </span>
                    </div>
                    <p class="text-[11px] text-slate-600 mt-0.5 line-clamp-2 leading-relaxed break-words">${s.description || 'No description'}</p>
                    <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-slate-500 mt-1.5 min-w-0">
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${s.shotSize || 'Wide'}</span>
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${s.cameraAngle || 'Eye Level'}</span>
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${s.focalLength || '50mm'}</span>
                      ${s.continuity?.screenDirection ? `
                        <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium truncate max-w-full" title="${s.continuity.screenDirection}">
                          ${s.continuity.screenDirection}
                        </span>
                      ` : ''}
                    </div>
                  </div>
                </div>

                <!-- Action Controls -->
                <div class="flex items-center gap-1.5 shrink-0 self-end sm:self-center mt-1 sm:mt-0">
                  <button class="btn-quick-approve p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-emerald-600 active:scale-95 text-xs cursor-pointer transition-all" data-shot-id="${s.id}" title="${s.approvalStatus === 'approved' ? 'Mark as Draft' : 'Approve Shot'}">
                    <span class="material-symbols-outlined text-[16px]">${s.approvalStatus === 'approved' ? 'check_circle' : 'check'}</span>
                  </button>
                  <button class="btn-card-regen p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-blue-600 active:scale-95 text-xs cursor-pointer transition-all" data-shot-id="${s.id}" title="Regenerate this frame">
                    <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                  </button>
                  <button class="btn-open-inspector px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-xs font-semibold cursor-pointer transition-all" data-shot-id="${s.id}">
                    Edit Details
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    attachSharedCardEventListeners();

    // Sequence batch checkbox handlers
    const selectAllCheck = document.getElementById('seq-select-all');
    if (selectAllCheck) {
      selectAllCheck.onchange = (e) => {
        if (e.target.checked) {
          shots.forEach(s => sequenceSelectedShotIds.add(s.id));
        } else {
          sequenceSelectedShotIds.clear();
        }
        renderSequenceEditor(shots);
      };
    }

    document.querySelectorAll('.seq-shot-check').forEach(chk => {
      chk.onchange = (e) => {
        const id = chk.getAttribute('data-shot-id');
        if (e.target.checked) sequenceSelectedShotIds.add(id);
        else sequenceSelectedShotIds.delete(id);
        renderSequenceEditor(shots);
      };
    });

    const btnBatchApproveSelected = document.getElementById('btn-batch-approve-selected');
    if (btnBatchApproveSelected) {
      btnBatchApproveSelected.onclick = async () => {
        const ids = Array.from(sequenceSelectedShotIds);
        if (!ids.length) return;
        try {
          await api.batchApproveStoryboardShots(scriptId, currentSceneId, ids, 'approved', 'Batch approved via Sequence Editor');
          showToast(`Approved ${ids.length} shots.`);
          sequenceSelectedShotIds.clear();
          loadStoryboardData();
        } catch (e) {
          showToast('Failed batch approval.');
        }
      };
    }

    const btnBatchRejectSelected = document.getElementById('btn-batch-reject-selected');
    if (btnBatchRejectSelected) {
      btnBatchRejectSelected.onclick = async () => {
        const ids = Array.from(sequenceSelectedShotIds);
        if (!ids.length) return;
        try {
          await api.batchApproveStoryboardShots(scriptId, currentSceneId, ids, 'rejected', 'Batch rejected via Sequence Editor');
          showToast(`Marked ${ids.length} shots as rejected.`);
          sequenceSelectedShotIds.clear();
          loadStoryboardData();
        } catch (e) {
          showToast('Failed batch rejection.');
        }
      };
    }

    const btnBatchApproveAll = document.getElementById('btn-batch-approve-all');
    if (btnBatchApproveAll) {
      btnBatchApproveAll.onclick = async () => {
        try {
          const proposedIds = (currentStoryboard?.shots || [])
            .filter(s => s.approvalStatus === 'proposed' || s.approvalStatus === 'draft')
            .map(s => s.id);
          if (!proposedIds.length) {
            showToast('All shots are already approved.');
            return;
          }
          await api.batchApproveStoryboardShots(scriptId, currentSceneId, proposedIds, 'approved', 'Batch approved for production');
          showToast(`Approved ${proposedIds.length} shots.`);
          loadStoryboardData();
        } catch (e) {
          showToast('Failed batch approval.');
        }
      };
    }

    const btnSeqAdd = document.getElementById('btn-seq-add-shot');
    if (btnSeqAdd) {
      btnSeqAdd.onclick = () => openShotInspector(null);
    }
  }

  function attachSharedCardEventListeners() {
    // Open Inspector (Edit Details)
    document.querySelectorAll('.btn-open-inspector').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const shotId = btn.getAttribute('data-shot-id');
        openShotInspector(shotId);
      };
    });

    // Open Lightbox
    document.querySelectorAll('.btn-open-lightbox').forEach(el => {
      el.onclick = (e) => {
        e.stopPropagation();
        const shotId = el.getAttribute('data-shot-id');
        const shots = currentStoryboard?.shots || [];
        const idx = shots.findIndex(s => s.id === shotId);
        openLightbox(idx !== -1 ? idx : 0);
      };
    });

    // Move Up / Left
    document.querySelectorAll('.btn-move-up').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const shotId = btn.getAttribute('data-shot-id');
        moveShot(shotId, -1);
      };
    });

    // Move Down / Right
    document.querySelectorAll('.btn-move-down').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const shotId = btn.getAttribute('data-shot-id');
        moveShot(shotId, 1);
      };
    });

    // Quick toggle approval
    document.querySelectorAll('.btn-quick-approve').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const shotId = btn.getAttribute('data-shot-id');
        const shot = currentStoryboard?.shots?.find(s => s.id === shotId);
        if (!shot) return;
        const newStatus = shot.approvalStatus === 'approved' ? 'draft' : 'approved';
        try {
          await api.approveStoryboardShot(scriptId, currentSceneId, shotId, newStatus);
          showToast(`Shot ${shot.shotNumber} marked ${newStatus}`);
          loadStoryboardData();
        } catch (err) {
          showToast('Failed to update shot approval');
        }
      };
    });

    // Single frame regeneration button on card
    document.querySelectorAll('.btn-card-regen').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const shotId = btn.getAttribute('data-shot-id');
        openSingleFrameRegenModal(shotId);
      };
    });

    // Open History on card
    document.querySelectorAll('.btn-card-history').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const shotId = btn.getAttribute('data-shot-id');
        openShotHistoryModal(shotId);
      };
    });
  }

  async function moveShot(shotId, direction) {
    const shots = currentStoryboard?.shots || [];
    const idx = shots.findIndex(s => s.id === shotId);
    if (idx === -1) return;
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= shots.length) return;

    const newShots = [...shots];
    const [moved] = newShots.splice(idx, 1);
    newShots.splice(targetIdx, 0, moved);
    const newIds = newShots.map(s => s.id);

    try {
      await api.reorderStoryboardShots(scriptId, currentSceneId, newIds);
      loadStoryboardData();
    } catch (e) {
      showToast('Failed to reorder shots');
    }
  }

  // Self-executing background data initialization (Never blocks button wiring)
  (async function initData() {
    loadStoryboardPreferences();
    updateRecycleBinBadge();
    try {
      const [fetchedScenes, fetchedProviders] = await Promise.all([
        api.getProductionScenes(scriptId),
        api.getAiImageProviders()
      ]);
      allScenes = fetchedScenes || [];
      providers = fetchedProviders || [];
    } catch (e) {
      console.warn("Using offline fallback data for storyboard:", e);
    }

    // Populate scene dropdown
    if (sceneSelect && allScenes.length) {
      sceneSelect.innerHTML = allScenes.map(s => `
        <option value="${s.id}" ${s.id === currentSceneId ? 'selected' : ''}>
          Scene ${s.sceneNumber}: ${s.heading}
        </option>
      `).join('');

      sceneSelect.onchange = (e) => {
        currentSceneId = e.target.value;
        sequenceSelectedShotIds.clear();
        loadStoryboardData();
      };
    }

    // Load initial storyboard shots
    loadStoryboardData();
  })();
}

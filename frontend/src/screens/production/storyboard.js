import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';
import { renderProdSubNav } from './prodNav.js';
import { store } from '../../state/store.js';
import * as api from '../../services/api.js';
import { showToast } from '../../components/toast.js';
import { exportStoryboardPdf } from '../../services/pdfExport.js';
import { openModal, closeModal } from '../../utils/popupPosition.js';

// Category style & camera presets matching SCRIPTORA design tokens
const STYLE_PRESETS = [
  "Cinematic Concept Art",
  "Storyboard Ink",
  "Pencil Sketch",
  "Photorealistic / Live Action",
  "3D Animation",
  "Anime / Illustration",
  "Custom"
];

const ASPECT_RATIOS = ["2.39:1", "16:9", "4:3", "9:16"];
const SHOT_SIZES = ["Wide Shot", "Medium Shot", "Close-Up", "Extreme Close-Up", "Medium Two-Shot", "Over-the-Shoulder", "Point of View (POV)"];
const CAMERA_ANGLES = ["Eye Level", "Low Angle", "High Angle", "Dutch Angle", "Bird's Eye"];
const CAMERA_MOVEMENTS = ["Static", "Pan", "Tilt", "Tracking Dolly", "Crane / Jib", "Handheld"];
const FOCAL_LENGTHS = ["18mm Ultra-Wide", "24mm Wide", "35mm Standard", "50mm Prime", "85mm Portrait", "105mm Telephoto", "Anamorphic 40mm"];
const LIGHTING_MOODS = ["Daylight Dust", "Golden Hour Sun", "Harsh Fluorescent Rim", "Low-Key Shadow / Noir", "Cyan Emergency Strobe", "Tungsten Warm Interior"];

export function renderStoryboardScreen(fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const sceneId = urlParams.get('sceneId') || 'scene-1';
  const from = fromParam || urlParams.get('from');

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('Pre-Production', 'Storyboard Studio')}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3.5 fade-in">
        <!-- SubNav with Title, Project Context & Primary Actions -->
        ${renderProdSubNav('Storyboard Studio', 'art_track', from || '/production', `
          <div class="flex items-center gap-2">
            <button id="btn-export-storyboard-pdf" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer" title="Export genuine Storyboard Studio PDF">
              <span class="material-symbols-outlined text-[16px]">download</span>
              <span class="hidden sm:inline">Export PDF</span>
            </button>
            <button id="btn-generate-sequence" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer" title="Generate AI proposed shot sequence for scene">
              <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
              <span>Generate Scene</span>
            </button>
            <button id="btn-add-shot" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer" title="Add shot manually">
              <span class="material-symbols-outlined text-[16px]">add</span>
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

      <!-- MODAL 1: FRAME DETAIL & INSPECTOR DRAWER -->
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
                <span class="text-[10px] text-slate-500">Tap Generate or Import Image below</span>
              </div>
            </div>

            <!-- Image Actions -->
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-1.5">
                <button id="modal-btn-regenerate" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-semibold cursor-pointer">
                  <span class="material-symbols-outlined text-[15px]">auto_awesome</span>
                  <span>Regenerate Image</span>
                </button>
                <label class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer">
                  <span class="material-symbols-outlined text-[15px]">upload</span>
                  <span>Import Photo</span>
                  <input type="file" id="modal-file-import" accept="image/*" class="sr-only" />
                </label>
              </div>
              <div id="modal-cost-badge" class="text-[11px] text-slate-400 font-mono">Free (Built-in)</div>
            </div>
          </div>

          <!-- Form Fields -->
          <form id="shot-detail-form" class="flex flex-col gap-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Shot Number</label>
                <input type="text" id="input-shot-number" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-mono font-bold" required />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Shot Title</label>
                <input type="text" id="input-shot-title" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" required />
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-700">Description & Visual Action</label>
              <textarea id="input-shot-desc" rows="2" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" placeholder="Describe the framing, action, and key visual beats..."></textarea>
            </div>

            <!-- Camera Parameters Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-semibold text-slate-500 uppercase">Shot Size</label>
                <select id="input-shot-size" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                  ${SHOT_SIZES.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-semibold text-slate-500 uppercase">Camera Angle</label>
                <select id="input-shot-angle" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                  ${CAMERA_ANGLES.map(a => `<option value="${a}">${a}</option>`).join('')}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-semibold text-slate-500 uppercase">Camera Movement</label>
                <select id="input-shot-movement" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                  ${CAMERA_MOVEMENTS.map(m => `<option value="${m}">${m}</option>`).join('')}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-semibold text-slate-500 uppercase">Focal Length</label>
                <select id="input-shot-focal" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                  ${FOCAL_LENGTHS.map(f => `<option value="${f}">${f}</option>`).join('')}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-semibold text-slate-500 uppercase">Aspect Ratio</label>
                <select id="input-shot-ratio" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                  ${ASPECT_RATIOS.map(r => `<option value="${r}">${r}</option>`).join('')}
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-semibold text-slate-500 uppercase">Lighting Mood</label>
                <select id="input-shot-lighting" class="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800">
                  ${LIGHTING_MOODS.map(l => `<option value="${l}">${l}</option>`).join('')}
                </select>
              </div>
            </div>

            <!-- Continuity & Director Notes -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Screen Direction / Eyeline</label>
                <input type="text" id="input-shot-direction" placeholder="e.g. Left to Right / Looking Screen Right" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Approval State</label>
                <select id="input-shot-approval" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 font-semibold">
                  <option value="draft">Draft</option>
                  <option value="proposed">Proposed (Needs Review)</option>
                  <option value="approved">Approved for Production</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-700">Director & Continuity Notes</label>
              <input type="text" id="input-shot-notes" placeholder="Notes for camera operator, lighting rim, or costume state..." class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" />
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
              <button type="button" id="modal-btn-delete-shot" class="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">delete</span>
                <span>Delete</span>
              </button>
              <div class="flex items-center gap-2">
                <button type="button" id="modal-btn-cancel-shot" class="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer">Cancel</button>
                <button type="submit" id="modal-btn-save-shot" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer">Save Changes</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- MODAL 2: AI GENERATION & PROVIDER SELECTION MODAL -->
      <div id="ai-generate-modal" class="scriptora-modal-overlay fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 hidden">
        <div class="scriptora-modal-card bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-lg w-full p-4 sm:p-5 flex flex-col gap-3.5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-xl">auto_awesome</span>
              <h3 id="gen-modal-title" class="font-heading font-bold text-sm text-slate-900">Generate Storyboard Visuals</h3>
            </div>
            <button id="gen-modal-close" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer" title="Close">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <form id="ai-generation-form" class="flex flex-col gap-3">
            <!-- Provider Selector -->
            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-semibold text-slate-700">Image Generation Provider</label>
              <select id="gen-provider-select" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600">
                <option value="scriptora-concept">SCRIPTORA Concept Engine (Free / Built-in)</option>
                <option value="openai-dalle3">OpenAI DALL-E 3 (Paid API)</option>
                <option value="gemini-imagen3">Google Imagen 3 (Paid API)</option>
                <option value="stability-sdxl">Stability AI SDXL (Paid API)</option>
              </select>
              <div id="gen-provider-status" class="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">check_circle</span>
                <span>Configured & Ready</span>
              </div>
            </div>

            <!-- Cost Disclosure Banner -->
            <div id="gen-cost-disclosure" class="bg-blue-50/70 border border-blue-200/80 rounded-xl p-2.5 text-xs text-blue-900 flex items-start gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[16px] shrink-0 mt-0.5">info</span>
              <div class="flex-1">
                <span class="font-semibold">Cost Disclosure: </span>
                <span id="gen-cost-label">Free (Built-in Engine, no external API charges).</span>
              </div>
            </div>

            <!-- Visual Style -->
            <div class="grid grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-slate-700">Visual Style Preset</label>
                <select id="gen-style-select" class="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-800">
                  ${STYLE_PRESETS.map(s => `<option value="${s}">${s}</option>`).join('')}
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
              <label class="text-[11px] font-semibold text-slate-700">Creative Direction / Prompt</label>
              <textarea id="gen-prompt-input" rows="2" class="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600" placeholder="Optional creative guidance for framing, atmosphere, or lighting..."></textarea>
            </div>

            <!-- Generation Error Callout (if API key missing or provider fails) -->
            <div id="gen-error-alert" class="hidden bg-rose-50 border border-rose-200 rounded-xl p-2.5 text-xs text-rose-800 flex items-start gap-2">
              <span class="material-symbols-outlined text-rose-600 text-[16px] shrink-0 mt-0.5">error</span>
              <div class="flex-1 text-[11px] leading-relaxed" id="gen-error-message">Provider error</div>
            </div>

            <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button type="button" id="gen-modal-cancel" class="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer">Cancel</button>
              <button type="submit" id="gen-modal-submit" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">sparkles</span>
                <span id="gen-submit-label">Start Generation</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Bottom Navigation with Production Active -->
      ${renderBottomNav('production')}
    </div>
  `;
}

export async function attachStoryboardEvents(navigate, fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  let currentSceneId = urlParams.get('sceneId') || 'scene-1';
  let currentView = 'contact'; // 'contact' or 'sequence'
  let activeEditingShotId = null;
  let generationTargetType = 'sequence'; // 'sequence' or 'shot'

  // DOM Elements
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

  // Modals
  const inspectorModal = document.getElementById('shot-inspector-modal');
  const inspectorClose = document.getElementById('modal-shot-close');
  const inspectorCancel = document.getElementById('modal-btn-cancel-shot');
  const shotForm = document.getElementById('shot-detail-form');
  const btnDeleteShot = document.getElementById('modal-btn-delete-shot');
  const btnRegenerate = document.getElementById('modal-btn-regenerate');
  const fileImport = document.getElementById('modal-file-import');

  const genModal = document.getElementById('ai-generate-modal');
  const genClose = document.getElementById('gen-modal-close');
  const genCancel = document.getElementById('gen-modal-cancel');
  const genForm = document.getElementById('ai-generation-form');
  const genProviderSelect = document.getElementById('gen-provider-select');
  const genProviderStatus = document.getElementById('gen-provider-status');
  const genCostLabel = document.getElementById('gen-cost-label');
  const genErrorAlert = document.getElementById('gen-error-alert');
  const genErrorMsg = document.getElementById('gen-error-message');

  // 1. Load initial scenes and providers
  let allScenes = [];
  let providers = [];
  let currentStoryboard = null;

  try {
    allScenes = await api.getProductionScenes(scriptId);
    providers = await api.getAiImageProviders();
  } catch (e) {
    console.error("Failed loading scenes:", e);
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
      loadStoryboardData();
    };
  }

  // 2. Load storyboard data for current scene
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

  // Update scene metadata badges & snippet
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

    // Update shooting schedule link
    if (btnScheduleLink) {
      const dayNum = String(scene.shootDay || '1').match(/\d+/)?.[0] || '1';
      btnScheduleLink.href = `/production/schedule?scriptId=${scriptId}&day=${dayNum}&sceneId=${scene.id}`;
    }

    // Check version staleness
    if (staleBanner) {
      if (currentStoryboard?.isVersionStale) {
        staleBanner.classList.remove('hidden');
        document.getElementById('stale-pinned-ver').textContent = currentStoryboard.sourceVersion || 'Draft 4.2';
        document.getElementById('stale-active-ver').textContent = currentStoryboard.currentScriptDraft || 'Draft 4.3';
      } else {
        staleBanner.classList.add('hidden');
      }
    }

    // Check continuity warnings
    checkContinuityWarnings();
  }

  // Check continuity conflicts across consecutive shots
  function checkContinuityWarnings() {
    if (!continuityBanner) return;
    const shots = currentStoryboard?.shots || [];
    let conflictFound = false;
    let conflictText = '';

    for (let i = 0; i < shots.length - 1; i++) {
      const cur = shots[i];
      const next = shots[i + 1];
      // Eyeline conflict: if two consecutive reverse-angle conversation shots look in identical screen direction
      if (cur.shotSize.includes('Close') && next.shotSize.includes('Close')) {
        const curEye = cur.continuity?.eyeline?.toLowerCase() || '';
        const nextEye = next.continuity?.eyeline?.toLowerCase() || '';
        if (curEye && nextEye && curEye === nextEye && curEye.includes('screen')) {
          conflictFound = true;
          conflictText = `Shot ${cur.shotNumber} and Shot ${next.shotNumber} both have eyeline "${cur.continuity.eyeline}", which may create a reverse-angle crossing.`;
          break;
        }
      }
    }

    if (conflictFound) {
      continuityBanner.classList.remove('hidden');
      document.getElementById('continuity-warning-text').textContent = conflictText;
    } else {
      continuityBanner.classList.add('hidden');
    }
  }

  // 3. Render current view (Contact Sheet or Sequence Editor)
  function renderCurrentView() {
    if (!viewContainer) return;
    const shots = currentStoryboard?.shots || [];

    // Empty state
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
            <button id="btn-empty-generate" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer">
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
      if (emptyGen) emptyGen.onclick = () => openGenerationModal('sequence');
      if (emptyAdd) emptyAdd.onclick = () => openShotInspector(null);
      return;
    }

    if (currentView === 'contact') {
      renderContactSheet(shots);
    } else {
      renderSequenceEditor(shots);
    }
  }

  // Render View A: Contact Sheet Grid
  function renderContactSheet(shots) {
    viewContainer.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        ${shots.map(s => {
          const statusBg = s.approvalStatus === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
            (s.approvalStatus === 'proposed' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              (s.approvalStatus === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-slate-100 text-slate-600 border-slate-200'));

          return `
            <div class="storyboard-card bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-blue-400 hover:shadow-sm transition-all flex flex-col justify-between" data-shot-id="${s.id}">
              <div>
                <!-- Top Card Meta Header -->
                <div class="px-3 py-2 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div class="flex items-center gap-1.5">
                    <span class="font-mono font-bold text-xs text-slate-900">${s.shotNumber}</span>
                    <span class="text-[10px] text-slate-400">#${s.order}</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold border ${statusBg} capitalize">
                      ${s.approvalStatus || 'Draft'}
                    </span>
                    <button class="btn-card-quick-menu p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer" data-shot-id="${s.id}" title="Shot actions">
                      <span class="material-symbols-outlined text-[15px]">more_vert</span>
                    </button>
                  </div>
                </div>

                <!-- Visual Image Canvas -->
                <div class="aspect-video bg-slate-950 flex items-center justify-center relative overflow-hidden cursor-pointer btn-open-inspector" data-shot-id="${s.id}">
                  ${s.imageUrl ? `
                    <img src="${s.imageUrl}" alt="${s.title}" class="w-full h-full object-cover" />
                  ` : `
                    <div class="flex flex-col items-center justify-center text-slate-500 gap-1 p-4 text-center">
                      <span class="material-symbols-outlined text-2xl text-slate-600">art_track</span>
                      <span class="text-[10px]">Tap to inspect & generate frame</span>
                    </div>
                  `}
                  <!-- In-Canvas Aspect & Lens Badges -->
                  <div class="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/70 text-white font-mono text-[9px]">
                    ${s.aspectRatio || '2.39:1'} · ${s.focalLength || '50mm'}
                  </div>
                </div>

                <!-- Title & Description Details -->
                <div class="p-3 flex flex-col gap-1.5">
                  <h4 class="font-heading font-bold text-xs text-slate-900 truncate">${s.title}</h4>
                  <p class="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">${s.description || 'No description provided.'}</p>
                  
                  <!-- Metadata Chips -->
                  <div class="flex items-center gap-1.5 pt-1 text-[10px] text-slate-600 flex-wrap">
                    <span class="px-1.5 py-0.5 rounded bg-slate-100">${s.shotSize}</span>
                    <span class="px-1.5 py-0.5 rounded bg-slate-100">${s.cameraAngle}</span>
                    ${s.cameraMovement !== 'Static' ? `<span class="px-1.5 py-0.5 rounded bg-slate-100">${s.cameraMovement}</span>` : ''}
                  </div>
                </div>
              </div>

              <!-- Card Action Bar -->
              <div class="px-3 py-2 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between text-xs">
                <!-- Reorder buttons -->
                <div class="flex items-center gap-1">
                  <button class="btn-move-up p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer" data-shot-id="${s.id}" title="Move left / up">
                    <span class="material-symbols-outlined text-[16px]">arrow_back</span>
                  </button>
                  <button class="btn-move-down p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer" data-shot-id="${s.id}" title="Move right / down">
                    <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                <div class="flex items-center gap-1.5">
                  <button class="btn-quick-approve p-1 rounded text-slate-400 hover:text-emerald-600 cursor-pointer" data-shot-id="${s.id}" title="${s.approvalStatus === 'approved' ? 'Mark as Draft' : 'Approve Frame'}">
                    <span class="material-symbols-outlined text-[16px]">${s.approvalStatus === 'approved' ? 'check_circle' : 'radio_button_unchecked'}</span>
                  </button>
                  <button class="btn-open-inspector px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 text-[11px] font-semibold transition-all cursor-pointer" data-shot-id="${s.id}">
                    Inspect
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    attachCardEventListeners();
  }

  // Render View B: Sequence Editor View
  function renderSequenceEditor(shots) {
    viewContainer.innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs flex flex-col">
        <!-- Sequence Toolbar -->
        <div class="px-4 py-2.5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <span class="font-heading font-bold text-slate-800">${shots.length} Shots in Sequence</span>
            <span class="text-slate-400">·</span>
            <span class="text-slate-500 text-[11px]">Use arrows to reorder shots</span>
          </div>
          <button id="btn-batch-approve-all" class="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-[11px] font-semibold cursor-pointer">
            Approve All Proposed
          </button>
        </div>

        <!-- Shots Sequence Table / List -->
        <div class="divide-y divide-slate-100">
          ${shots.map((s, idx) => `
            <div class="p-3 sm:p-4 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3" data-shot-id="${s.id}">
              <div class="flex items-start gap-3 min-w-0 flex-1">
                <!-- Reorder Controls -->
                <div class="flex sm:flex-col items-center gap-1 shrink-0 pt-1">
                  <button class="btn-move-up p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer" data-shot-id="${s.id}" title="Move up">
                    <span class="material-symbols-outlined text-[16px]">expand_less</span>
                  </button>
                  <span class="font-mono font-bold text-xs text-slate-700">${s.order}</span>
                  <button class="btn-move-down p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer" data-shot-id="${s.id}" title="Move down">
                    <span class="material-symbols-outlined text-[16px]">expand_more</span>
                  </button>
                </div>

                <!-- Thumbnail Preview -->
                <div class="w-20 h-12 bg-slate-950 rounded-lg overflow-hidden shrink-0 border border-slate-800 flex items-center justify-center cursor-pointer btn-open-inspector" data-shot-id="${s.id}">
                  ${s.imageUrl ? `
                    <img src="${s.imageUrl}" alt="${s.title}" class="w-full h-full object-cover" />
                  ` : `
                    <span class="material-symbols-outlined text-slate-600 text-lg">image</span>
                  `}
                </div>

                <!-- Shot Summary Info -->
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono font-bold text-xs text-blue-600">${s.shotNumber}</span>
                    <h4 class="font-heading font-semibold text-xs text-slate-900 truncate">${s.title}</h4>
                    <span class="px-1.5 py-0.2 rounded text-[9px] font-semibold ${s.approvalStatus === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'} capitalize">
                      ${s.approvalStatus}
                    </span>
                  </div>
                  <p class="text-[11px] text-slate-600 mt-0.5 line-clamp-1 leading-relaxed">${s.description || 'No description'}</p>
                  <div class="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                    <span>${s.shotSize}</span>
                    <span>·</span>
                    <span>${s.cameraAngle}</span>
                    <span>·</span>
                    <span>${s.focalLength}</span>
                    <span>·</span>
                    <span>${s.continuity?.screenDirection || 'Screen Left to Right'}</span>
                  </div>
                </div>
              </div>

              <!-- Action Controls -->
              <div class="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                <button class="btn-quick-approve p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-emerald-600 text-xs cursor-pointer" data-shot-id="${s.id}" title="Toggle approval">
                  <span class="material-symbols-outlined text-[16px]">${s.approvalStatus === 'approved' ? 'check_circle' : 'check'}</span>
                </button>
                <button class="btn-open-inspector px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer" data-shot-id="${s.id}">
                  Edit Details
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    attachCardEventListeners();

    const btnBatchApprove = document.getElementById('btn-batch-approve-all');
    if (btnBatchApprove) {
      btnBatchApprove.onclick = async () => {
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
  }

  // Attach click events on cards & sequence items
  function attachCardEventListeners() {
    // Open inspector
    document.querySelectorAll('.btn-open-inspector').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const shotId = btn.getAttribute('data-shot-id');
        openShotInspector(shotId);
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
  }

  // Move shot in sequence order
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

  // 4. Open Shot Inspector Modal
  function openShotInspector(shotId) {
    activeEditingShotId = shotId;
    const isNew = !shotId;
    const shot = isNew ? null : currentStoryboard?.shots?.find(s => s.id === shotId);

    document.getElementById('modal-shot-pill').textContent = shot?.shotNumber || `${currentStoryboard?.sceneNumber || 1}${String.fromCharCode(65 + ((currentStoryboard?.shots?.length || 0) % 26))}`;
    document.getElementById('modal-shot-heading').textContent = isNew ? 'Add New Shot' : `Edit Shot ${shot.shotNumber}`;
    document.getElementById('input-shot-number').value = shot?.shotNumber || '';
    document.getElementById('input-shot-title').value = shot?.title || '';
    document.getElementById('input-shot-desc').value = shot?.description || '';
    document.getElementById('input-shot-size').value = shot?.shotSize || 'Medium Shot';
    document.getElementById('input-shot-angle').value = shot?.cameraAngle || 'Eye Level';
    document.getElementById('input-shot-movement').value = shot?.cameraMovement || 'Static';
    document.getElementById('input-shot-focal').value = shot?.focalLength || '50mm Prime';
    document.getElementById('input-shot-ratio').value = shot?.aspectRatio || currentStoryboard?.aspectRatio || '2.39:1';
    document.getElementById('input-shot-lighting').value = shot?.lightingMood || 'Daylight Dust';
    document.getElementById('input-shot-direction').value = shot?.continuity?.screenDirection || 'Left to Right';
    document.getElementById('input-shot-approval').value = shot?.approvalStatus || 'draft';
    document.getElementById('input-shot-notes').value = shot?.directorNotes || '';

    const imgEl = document.getElementById('modal-shot-image');
    const placeholderEl = document.getElementById('modal-empty-image-placeholder');
    if (shot?.imageUrl) {
      imgEl.src = shot.imageUrl;
      imgEl.classList.remove('hidden');
      placeholderEl.classList.add('hidden');
    } else {
      imgEl.classList.add('hidden');
      placeholderEl.classList.remove('hidden');
    }

    if (btnDeleteShot) {
      btnDeleteShot.classList.toggle('hidden', isNew);
    }

    openModal(inspectorModal);
  }

  // 5. Shot Inspector Modal Events
  if (inspectorClose) inspectorClose.onclick = () => closeModal(inspectorModal);
  if (inspectorCancel) inspectorCancel.onclick = () => closeModal(inspectorModal);

  if (shotForm) {
    shotForm.onsubmit = async (e) => {
      e.preventDefault();
      const updates = {
        shotNumber: document.getElementById('input-shot-number').value.trim(),
        title: document.getElementById('input-shot-title').value.trim(),
        description: document.getElementById('input-shot-desc').value.trim(),
        shotSize: document.getElementById('input-shot-size').value,
        cameraAngle: document.getElementById('input-shot-angle').value,
        cameraMovement: document.getElementById('input-shot-movement').value,
        focalLength: document.getElementById('input-shot-focal').value,
        aspectRatio: document.getElementById('input-shot-ratio').value,
        lightingMood: document.getElementById('input-shot-lighting').value,
        approvalStatus: document.getElementById('input-shot-approval').value,
        directorNotes: document.getElementById('input-shot-notes').value.trim(),
        continuity: {
          screenDirection: document.getElementById('input-shot-direction').value.trim()
        }
      };

      try {
        if (activeEditingShotId) {
          await api.updateStoryboardShot(scriptId, currentSceneId, activeEditingShotId, updates);
          showToast('Updated shot details');
        } else {
          await api.addStoryboardShot(scriptId, currentSceneId, updates);
          showToast('Added new shot to storyboard');
        }
        closeModal(inspectorModal);
        loadStoryboardData();
      } catch (err) {
        showToast('Failed saving shot');
      }
    };
  }

  if (btnDeleteShot) {
    btnDeleteShot.onclick = async () => {
      if (!activeEditingShotId) return;
      if (!confirm('Are you sure you want to delete this shot?')) return;
      try {
        await api.deleteStoryboardShot(scriptId, currentSceneId, activeEditingShotId);
        showToast('Shot deleted');
        closeModal(inspectorModal);
        loadStoryboardData();
      } catch (err) {
        showToast('Failed to delete shot');
      }
    };
  }

  // Regenerate image for current shot
  if (btnRegenerate) {
    btnRegenerate.onclick = () => {
      closeModal(inspectorModal);
      openGenerationModal('shot', activeEditingShotId);
    };
  }

  // Manual image import via file picker
  if (fileImport) {
    fileImport.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (event) => {
        const dataUrl = event.target.result;
        if (activeEditingShotId) {
          try {
            await api.updateStoryboardShot(scriptId, currentSceneId, activeEditingShotId, {
              imageUrl: dataUrl,
              imageSource: 'imported'
            });
            showToast('Imported reference image successfully');
            loadStoryboardData();
            openShotInspector(activeEditingShotId);
          } catch (err) {
            showToast('Failed importing image');
          }
        }
      };
      reader.readAsDataURL(file);
    };
  }

  // 6. Open AI Generation Modal
  function openGenerationModal(type = 'sequence', shotId = null) {
    generationTargetType = type;
    activeEditingShotId = shotId;

    document.getElementById('gen-modal-title').textContent = type === 'sequence'
      ? 'Generate Scene Shot Sequence (AI)'
      : 'Regenerate Frame Visual (AI)';

    document.getElementById('gen-submit-label').textContent = type === 'sequence'
      ? 'Generate 4-Shot Sequence'
      : 'Generate Frame';

    if (genErrorAlert) genErrorAlert.classList.add('hidden');
    updateProviderCostDisclosure();
    openModal(genModal);
  }

  // Update provider status and pricing disclosure
  function updateProviderCostDisclosure() {
    if (!genProviderSelect) return;
    const pId = genProviderSelect.value;
    const p = providers.find(prov => prov.id === pId) || providers[0];

    if (genProviderStatus) {
      if (p.isConfigured || !p.requiresApiKey) {
        genProviderStatus.className = 'text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1';
        genProviderStatus.innerHTML = `<span class="material-symbols-outlined text-[14px]">check_circle</span><span>Configured & Ready</span>`;
      } else {
        genProviderStatus.className = 'text-[11px] text-amber-600 font-medium mt-0.5 flex items-center gap-1';
        genProviderStatus.innerHTML = `<span class="material-symbols-outlined text-[14px]">info</span><span>Key missing in backend .env (${p.envVarName})</span>`;
      }
    }

    if (genCostLabel) {
      if (p.pricingType === 'free') {
        genCostLabel.textContent = 'Free (Built-in Concept Engine, no API keys or charges required).';
      } else {
        const est = generationTargetType === 'sequence' ? `$${(p.costPerImage * 4).toFixed(3)} (4-shot batch)` : `$${p.costPerImage.toFixed(3)}`;
        genCostLabel.textContent = `${p.costLabel} — Estimated: ${est}. Server credentials required.`;
      }
    }
  }

  if (genProviderSelect) {
    genProviderSelect.onchange = updateProviderCostDisclosure;
  }

  if (genClose) genClose.onclick = () => closeModal(genModal);
  if (genCancel) genCancel.onclick = () => closeModal(genModal);

  // Submit AI Generation
  if (genForm) {
    genForm.onsubmit = async (e) => {
      e.preventDefault();
      const pId = genProviderSelect.value;
      const selectedProv = providers.find(p => p.id === pId) || providers[0];
      const style = document.getElementById('gen-style-select').value;
      const ratio = document.getElementById('gen-ratio-select').value;
      const userPrompt = document.getElementById('gen-prompt-input').value.trim();

      // Transparent paid generation check
      if (selectedProv.pricingType === 'paid') {
        if (!selectedProv.isConfigured) {
          if (genErrorAlert) {
            genErrorAlert.classList.remove('hidden');
            genErrorMsg.textContent = `Provider '${selectedProv.name}' requires ${selectedProv.envVarName} configured in backend/.env. Please switch to SCRIPTORA Concept Engine (Free) or Manual Image Import.`;
          }
          return;
        }
        if (!confirm(`Confirm generation using ${selectedProv.name}? Estimated cost: ${selectedProv.costLabel}.`)) {
          return;
        }
      }

      const submitBtn = document.getElementById('gen-modal-submit');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="w-3.5 h-3.5 border-2 border-white/60 border-t-white rounded-full animate-spin"></span><span>Generating...</span>`;

      try {
        if (generationTargetType === 'sequence') {
          const res = await api.generateStoryboardSequence(scriptId, currentSceneId, {
            provider: pId,
            visualStyle: style,
            aspectRatio: ratio,
            prompt: userPrompt
          });

          if (res?.proposedShots) {
            // Save proposed shots into current storyboard
            const updated = {
              ...currentStoryboard,
              shots: res.proposedShots,
              visualStyle: style,
              aspectRatio: ratio
            };
            await api.saveStoryboard(scriptId, updated);
            showToast(`Generated ${res.proposedShots.length} proposed shots for review.`);
            closeModal(genModal);
            loadStoryboardData();
          }
        } else {
          // Regenerate single shot
          const shot = currentStoryboard?.shots?.find(s => s.id === activeEditingShotId);
          const res = await api.generateStoryboardShot(scriptId, {
            provider: pId,
            prompt: userPrompt || shot?.prompt || shot?.description || "Cinematic composition",
            shotSize: shot?.shotSize || "Medium Shot",
            cameraAngle: shot?.cameraAngle || "Eye Level",
            focalLength: shot?.focalLength || "50mm Prime",
            lightingMood: shot?.lightingMood || "Daylight Dust",
            aspectRatio: ratio,
            visualStyle: style,
            sceneHeading: currentStoryboard?.sceneHeading || "SCENE 1",
            shotNumber: shot?.shotNumber || "1A"
          });

          if (res?.imageUrl) {
            await api.updateStoryboardShot(scriptId, currentSceneId, activeEditingShotId, {
              imageUrl: res.imageUrl,
              provider: pId,
              prompt: userPrompt || shot?.prompt,
              imageSource: 'ai'
            });
            showToast(`Regenerated image for Shot ${shot?.shotNumber}`);
            closeModal(genModal);
            loadStoryboardData();
          }
        }
      } catch (err) {
        console.error(err);
        if (genErrorAlert) {
          genErrorAlert.classList.remove('hidden');
          genErrorMsg.textContent = err.message || 'Generation failed. Please try again.';
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span class="material-symbols-outlined text-[16px]">sparkles</span><span>Start Generation</span>`;
      }
    };
  }

  // 7. View Tab Toggle
  if (viewTabContact && viewTabSequence) {
    viewTabContact.onclick = () => {
      currentView = 'contact';
      viewTabContact.className = 'px-2.5 py-1 rounded-lg font-semibold text-slate-900 bg-white shadow-2xs transition-all cursor-pointer flex items-center gap-1.5';
      viewTabSequence.className = 'px-2.5 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800 transition-all cursor-pointer flex items-center gap-1.5';
      renderCurrentView();
    };

    viewTabSequence.onclick = () => {
      currentView = 'sequence';
      viewTabSequence.className = 'px-2.5 py-1 rounded-lg font-semibold text-slate-900 bg-white shadow-2xs transition-all cursor-pointer flex items-center gap-1.5';
      viewTabContact.className = 'px-2.5 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-800 transition-all cursor-pointer flex items-center gap-1.5';
      renderCurrentView();
    };
  }

  // 8. Primary Buttons
  if (btnGenSequence) {
    btnGenSequence.onclick = () => openGenerationModal('sequence');
  }

  if (btnAddShot) {
    btnAddShot.onclick = () => openShotInspector(null);
  }

  // PDF Export using actual saved storyboard
  if (btnExportPdf) {
    btnExportPdf.onclick = () => {
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
    btnRepin.onclick = async () => {
      if (currentStoryboard) {
        currentStoryboard.sourceVersion = currentStoryboard.currentScriptDraft || 'Draft 4.2';
        currentStoryboard.isVersionStale = false;
        await api.saveStoryboard(scriptId, currentStoryboard);
        staleBanner?.classList.add('hidden');
        showToast(`Pinned Storyboard to ${currentStoryboard.sourceVersion}`);
      }
    };
  }

  // Initial load
  loadStoryboardData();
}

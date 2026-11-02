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
            <button id="btn-export-storyboard-pdf" class="w-8 h-8 sm:w-auto sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0" title="Export genuine Storyboard Studio PDF" aria-label="Export PDF">
              <span class="material-symbols-outlined text-[17px]">download</span>
              <span class="hidden sm:inline">Export PDF</span>
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
            <div class="grid grid-cols-2 gap-2">
              <button type="button" id="modal-btn-regenerate" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 active:scale-[0.99] text-xs font-semibold cursor-pointer transition-all">
                <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                <span class="truncate">Regenerate Image</span>
              </button>
              <label class="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-[0.99] text-xs font-semibold cursor-pointer transition-all">
                <span class="material-symbols-outlined text-[16px]">upload</span>
                <span class="truncate">Import Photo</span>
                <input type="file" id="modal-file-import" accept="image/*" class="sr-only" />
              </label>
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

          <form id="ai-generation-form" class="flex flex-col gap-3 min-h-0 flex-1 overflow-hidden">
            <div class="scriptora-modal-body flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
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

              <!-- Shot Sequence Length (Only shown when generating a sequence) -->
              <div id="gen-shot-count-container" class="flex flex-col gap-1">
                <label for="gen-shot-count-select" class="text-[11px] font-semibold text-slate-700">Shot Sequence Length</label>
                <select id="gen-shot-count-select" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600">
                  <option value="1">1 — One-shot sequence</option>
                  <option value="2">2 — Two-shot sequence</option>
                  <option value="3">3 — Three-shot sequence</option>
                  <option value="4" selected>4 — Four-shot sequence</option>
                </select>
              </div>

              <!-- Visual Style & Aspect Ratio -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
            </div>

            <!-- Fixed Bottom Actions -->
            <div class="flex items-center justify-end gap-2 pt-2.5 border-t border-slate-100 shrink-0">
              <button type="button" id="gen-modal-cancel" class="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
              <button type="submit" id="gen-modal-submit" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                <span id="gen-submit-label">Generate 4-Shot Sequence</span>
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
  let currentView = 'contact'; // 'contact' | 'sequence'
  let activeEditingShotId = null;
  let activeRegenShotId = null;
  let activeHistoryShotId = null;
  let activeLightboxShotIndex = 0;
  let proposedSequenceShots = [];
  let selectedShotCount = 4;
  const sequenceSelectedShotIds = new Set();

  // In-modal shot creation state
  let currentModalDraftImage = null;
  let currentModalDraftPrompt = '';
  let currentModalDraftApproval = 'draft';

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

  // App State
  let allScenes = [];
  let providers = [];
  let currentStoryboard = null;

  try {
    allScenes = await api.getProductionScenes(scriptId);
    providers = await api.getAiImageProviders();
  } catch (e) {
    console.error("Failed loading initial storyboard data:", e);
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

  // Load storyboard data for current scene
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

    if (btnScheduleLink) {
      const dayNum = String(scene.shootDay || '1').match(/\d+/)?.[0] || '1';
      btnScheduleLink.href = `/production/schedule?scriptId=${scriptId}&day=${dayNum}&sceneId=${scene.id}`;
    }

    if (staleBanner) {
      if (currentStoryboard?.isVersionStale) {
        staleBanner.classList.remove('hidden');
        document.getElementById('stale-pinned-ver').textContent = currentStoryboard.sourceVersion || 'Draft 4.2';
        document.getElementById('stale-active-ver').textContent = currentStoryboard.currentScriptDraft || 'Draft 4.3';
      } else {
        staleBanner.classList.add('hidden');
      }
    }

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

  // Render current view
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

  // =========================================================================
  // VIEW A: CONTACT SHEET (Requirement 2.A)
  // =========================================================================
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

                <!-- Primary Visual Image Canvas (Primary visual element) -->
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

                <!-- Title & Details Details (No clipping, responsive wrapping) -->
                <div class="p-3 flex flex-col gap-1.5">
                  <h4 class="font-heading font-bold text-xs text-slate-900 truncate" title="${s.title}">${s.title}</h4>
                  <p class="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">${s.description || 'No description provided.'}</p>
                  
                  <!-- Metadata Chips (Responsive wrapping) -->
                  <div class="flex items-center gap-1.5 pt-1 text-[10px] text-slate-600 flex-wrap">
                    <span class="px-1.5 py-0.5 rounded bg-slate-100 font-medium">${s.shotSize}</span>
                    <span class="px-1.5 py-0.5 rounded bg-slate-100 font-medium">${s.cameraAngle}</span>
                    ${s.cameraMovement !== 'Static' ? `<span class="px-1.5 py-0.5 rounded bg-slate-100 font-medium">${s.cameraMovement}</span>` : ''}
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
                  <!-- Quick Toggle Approve -->
                  <button class="btn-quick-approve p-1 rounded ${s.approvalStatus === 'approved' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-emerald-600'} cursor-pointer transition-colors" data-shot-id="${s.id}" title="${s.approvalStatus === 'approved' ? 'Mark as Draft' : 'Approve Frame'}">
                    <span class="material-symbols-outlined text-[16px]">${s.approvalStatus === 'approved' ? 'check_circle' : 'check'}</span>
                  </button>
                  <!-- Quick Regenerate Frame -->
                  <button class="btn-card-regen p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${s.id}" title="Regenerate this frame">
                    <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                  </button>
                  <!-- Edit Details -->
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

  // =========================================================================
  // VIEW B: SEQUENCE EDITOR (Requirement 2.B)
  // =========================================================================
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

        <!-- Shots Sequence Table / List -->
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

                  <!-- Reorder Controls (Accessible Up / Down buttons, NO helper text) -->
                  <div class="flex sm:flex-col items-center gap-0.5 sm:gap-1 shrink-0 pt-0.5">
                    <button class="btn-move-up p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${s.id}" title="Move up in sequence">
                      <span class="material-symbols-outlined text-[16px]">expand_less</span>
                    </button>
                    <span class="font-mono font-bold text-xs text-slate-700">${s.order}</span>
                    <button class="btn-move-down p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer transition-colors" data-shot-id="${s.id}" title="Move down in sequence">
                      <span class="material-symbols-outlined text-[16px]">expand_more</span>
                    </button>
                  </div>

                  <!-- Thumbnail Preview (Clickable to Lightbox) -->
                  <div class="w-16 h-12 sm:w-20 sm:h-12 bg-slate-950 rounded-lg overflow-hidden shrink-0 border border-slate-800 flex items-center justify-center cursor-pointer btn-open-lightbox" data-shot-id="${s.id}">
                    ${s.imageUrl ? `
                      <img src="${s.imageUrl}" alt="${s.title}" class="w-full h-full object-cover" />
                    ` : `
                      <span class="material-symbols-outlined text-slate-600 text-base sm:text-lg">image</span>
                    `}
                  </div>

                  <!-- Shot Summary Info (Responsive wrapping, no horizontal scroll) -->
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
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${s.shotSize}</span>
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${s.cameraAngle}</span>
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">${s.focalLength}</span>
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

  // Attach shared event listeners for cards and list rows
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

  // =========================================================================
  // MODAL 1: ADD NEW SHOT / EDIT SHOT INSPECTOR LOGIC (Requirement 3.A, 9.A)
  // =========================================================================
  function openShotInspector(shotId) {
    activeEditingShotId = shotId;
    const isNew = !shotId;
    const shots = currentStoryboard?.shots || [];
    const shot = isNew ? null : shots.find(s => s.id === shotId);

    const defaultShotLetter = String.fromCharCode(65 + (shots.length % 26));
    const defaultShotNum = `${currentStoryboard?.sceneNumber || 1}${defaultShotLetter}`;

    document.getElementById('modal-shot-pill').textContent = shot?.shotNumber || defaultShotNum;
    document.getElementById('modal-shot-heading').textContent = isNew ? 'Add New Shot' : `Edit Shot ${shot.shotNumber}`;
    document.getElementById('input-shot-number').value = shot?.shotNumber || defaultShotNum;
    document.getElementById('input-shot-title').value = shot?.title || (isNew ? `Shot ${defaultShotNum}` : '');
    document.getElementById('input-shot-desc').value = shot?.description || '';
    document.getElementById('input-shot-size').value = shot?.shotSize || 'Medium Shot';
    document.getElementById('input-shot-angle').value = shot?.cameraAngle || 'Eye Level';
    document.getElementById('input-shot-movement').value = shot?.cameraMovement || 'Static';
    document.getElementById('input-shot-focal').value = shot?.focalLength || '50mm Prime';
    document.getElementById('input-shot-ratio').value = shot?.aspectRatio || currentStoryboard?.aspectRatio || '2.39:1';
    document.getElementById('input-shot-lighting').value = shot?.lightingMood || 'Daylight Dust';
    document.getElementById('input-shot-style').value = shot?.visualStyle || currentStoryboard?.visualStyle || 'Cinematic Concept Art';
    document.getElementById('input-shot-prompt').value = shot?.prompt || '';
    document.getElementById('input-shot-direction').value = shot?.continuity?.screenDirection || 'Left to Right';
    document.getElementById('input-shot-approval').value = shot?.approvalStatus || 'draft';
    document.getElementById('input-shot-notes').value = shot?.directorNotes || '';

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
      imgEl.src = currentModalDraftImage;
      imgEl.classList.remove('hidden');
      placeholderEl.classList.add('hidden');
      if (postGenBar) postGenBar.classList.remove('hidden');
      if (fullscreenBtn) fullscreenBtn.classList.remove('hidden');
      if (genActionLabel) genActionLabel.textContent = 'Regenerate Image';
    } else {
      imgEl.classList.add('hidden');
      placeholderEl.classList.remove('hidden');
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

  if (inspectorClose) inspectorClose.onclick = () => closeModal(inspectorModal);
  if (inspectorCancel) inspectorCancel.onclick = () => closeModal(inspectorModal);

  // In-modal "Generate Image" action
  if (btnModalGenAction) {
    btnModalGenAction.onclick = async () => {
      const loadingEl = document.getElementById('modal-image-loading');
      const placeholderEl = document.getElementById('modal-empty-image-placeholder');
      const imgEl = document.getElementById('modal-shot-image');

      if (loadingEl) loadingEl.classList.remove('hidden');
      if (placeholderEl) placeholderEl.classList.add('hidden');
      if (imgEl) imgEl.classList.add('hidden');
      btnModalGenAction.disabled = true;

      const shotNum = document.getElementById('input-shot-number').value.trim() || '1A';
      const promptVal = document.getElementById('input-shot-prompt').value.trim() || document.getElementById('input-shot-desc').value.trim() || 'Cinematic composition';
      const sizeVal = document.getElementById('input-shot-size').value;
      const angleVal = document.getElementById('input-shot-angle').value;
      const focalVal = document.getElementById('input-shot-focal').value;
      const ratioVal = document.getElementById('input-shot-ratio').value;
      const lightingVal = document.getElementById('input-shot-lighting').value;
      const styleVal = document.getElementById('input-shot-style').value;

      try {
        const res = await api.generateStoryboardShot(scriptId, {
          provider: 'scriptora-concept',
          prompt: promptVal,
          shotSize: sizeVal,
          cameraAngle: angleVal,
          focalLength: focalVal,
          lightingMood: lightingVal,
          aspectRatio: ratioVal,
          visualStyle: styleVal,
          sceneHeading: currentStoryboard?.sceneHeading || 'SCENE 1',
          shotNumber: shotNum
        });

        if (res?.imageUrl) {
          currentModalDraftImage = res.imageUrl;
          currentModalDraftPrompt = promptVal;
          showToast('Image generated successfully inside shot preview');
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

  // Import photo via file picker inside inspector
  if (modalFileImport) {
    modalFileImport.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        currentModalDraftImage = event.target.result;
        updateInspectorImagePreviewUI();
        showToast('Photo imported into preview canvas');
      };
      reader.readAsDataURL(file);
    };
  }

  // In-modal post-gen approve / reject toggles
  if (btnModalToggleApprove) {
    btnModalToggleApprove.onclick = () => {
      currentModalDraftApproval = 'approved';
      document.getElementById('input-shot-approval').value = 'approved';
      updateInspectorImagePreviewUI();
      showToast('Frame set to Approved');
    };
  }

  if (btnModalToggleReject) {
    btnModalToggleReject.onclick = () => {
      currentModalDraftApproval = 'rejected';
      document.getElementById('input-shot-approval').value = 'rejected';
      updateInspectorImagePreviewUI();
      showToast('Frame marked as Rejected');
    };
  }

  // Fullscreen button inside modal
  if (btnModalViewFullscreen) {
    btnModalViewFullscreen.onclick = () => {
      if (currentModalDraftImage) {
        const dummyShot = {
          shotNumber: document.getElementById('input-shot-number').value.trim() || '1A',
          title: document.getElementById('input-shot-title').value.trim() || 'Preview',
          description: document.getElementById('input-shot-desc').value.trim() || '',
          aspectRatio: document.getElementById('input-shot-ratio').value,
          focalLength: document.getElementById('input-shot-focal').value,
          shotSize: document.getElementById('input-shot-size').value,
          cameraAngle: document.getElementById('input-shot-angle').value,
          imageUrl: currentModalDraftImage,
          approvalStatus: currentModalDraftApproval
        };
        openLightboxWithShot(dummyShot);
      }
    };
  }

  // Open history from inspector
  if (btnModalOpenHistory) {
    btnModalOpenHistory.onclick = () => {
      if (activeEditingShotId) {
        openShotHistoryModal(activeEditingShotId);
      }
    };
  }

  // Save shot form submission
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
        visualStyle: document.getElementById('input-shot-style').value,
        prompt: document.getElementById('input-shot-prompt').value.trim(),
        approvalStatus: document.getElementById('input-shot-approval').value,
        directorNotes: document.getElementById('input-shot-notes').value.trim(),
        imageUrl: currentModalDraftImage,
        imageSource: currentModalDraftImage ? (currentModalDraftImage.startsWith('data:image/svg') ? 'ai' : 'imported') : null,
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

  // =========================================================================
  // MODAL 2: GENERATE ENTIRE SCENE SHOT SEQUENCE (Requirement 3.B, 4, 9.C, 9.F)
  // =========================================================================
  function openSequenceGenerationModal() {
    const scene = allScenes.find(s => s.id === currentSceneId) || allScenes[0] || {};
    const sceneHeadingDisp = document.getElementById('gen-scene-heading-display');
    const sceneCastDisp = document.getElementById('gen-scene-cast-display');
    const sceneSnippetDisp = document.getElementById('gen-scene-snippet-display');

    if (sceneHeadingDisp) sceneHeadingDisp.textContent = scene.heading || 'SCENE 1';
    if (sceneCastDisp) sceneCastDisp.textContent = `Cast: ${(scene.cast || ['KEVIN', 'MARCUS']).join(', ')}`;
    if (sceneSnippetDisp) sceneSnippetDisp.textContent = scene.snippet || 'Scene awaiting visual direction.';

    // Show config step
    document.getElementById('gen-step-config').classList.remove('hidden');
    document.getElementById('gen-step-progress').classList.add('hidden');
    document.getElementById('gen-step-preview').classList.add('hidden');

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
        const count = selectedShotCount || 4;
        const est = `$${(p.costPerImage * count).toFixed(3)} (${count}-shot batch)`;
        genCostLabel.textContent = `${p.costLabel} — Estimated: ${est}. Server credentials required.`;
      }
    }
  }

  if (genProviderSelect) genProviderSelect.onchange = updateProviderCostDisclosure;

  if (genShotCountSelect) {
    genShotCountSelect.onchange = () => {
      selectedShotCount = parseInt(genShotCountSelect.value, 10) || 4;
      updateGenSubmitLabel();
      updateProviderCostDisclosure();
    };
  }

  if (genClose) genClose.onclick = () => closeModal(genModal);
  if (genCancel) genCancel.onclick = () => closeModal(genModal);

  // Start sequence generation
  if (genBtnStart) {
    genBtnStart.onclick = async () => {
      const pId = genProviderSelect.value;
      const selectedProv = providers.find(p => p.id === pId) || providers[0];
      const style = document.getElementById('gen-style-select').value;
      const ratio = document.getElementById('gen-ratio-select').value;
      const quality = document.getElementById('gen-quality-select').value;
      const userPrompt = document.getElementById('gen-prompt-input').value.trim();
      const count = parseInt(genShotCountSelect?.value, 10) || selectedShotCount || 4;

      // Transparent paid generation confirmation
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

      // STEP 2: Transition to generation progress
      document.getElementById('gen-step-config').classList.add('hidden');
      const stepProgress = document.getElementById('gen-step-progress');
      stepProgress.classList.remove('hidden');

      const progressTitle = document.getElementById('gen-progress-title');
      const progressStatus = document.getElementById('gen-progress-status');
      const stepperEl = document.getElementById('gen-progress-stepper');

      progressTitle.textContent = `Generating ${count}-Shot Storyboard Sequence`;
      progressStatus.textContent = 'Preparing screenplay scene context & coverage beats...';

      if (stepperEl) {
        stepperEl.innerHTML = Array.from({ length: count }, (_, i) => `
          <span class="w-3 h-3 rounded-full bg-slate-200 transition-colors" data-step="${i + 1}"></span>
        `).join('');
      }

      try {
        // Sequential progress simulation matching actual generation
        for (let i = 1; i <= count; i++) {
          progressStatus.textContent = `Generating shot ${i} of ${count}...`;
          const dot = stepperEl?.querySelector(`[data-step="${i}"]`);
          if (dot) {
            dot.className = 'w-3 h-3 rounded-full bg-blue-600 animate-pulse';
          }
          await new Promise(r => setTimeout(r, 200));
        }

        const res = await api.generateStoryboardSequence(scriptId, currentSceneId, {
          provider: pId,
          visualStyle: style,
          aspectRatio: ratio,
          quality,
          prompt: userPrompt,
          shotCount: count
        });

        if (res?.proposedShots) {
          proposedSequenceShots = res.proposedShots;
          // STEP 3 & 4: Transition to preview review workflow
          renderSequenceReviewGrid();
        } else {
          throw new Error('No shots returned from generator');
        }
      } catch (err) {
        console.error(err);
        stepProgress.classList.add('hidden');
        document.getElementById('gen-step-config').classList.remove('hidden');
        if (genErrorAlert) {
          genErrorAlert.classList.remove('hidden');
          genErrorMsg.textContent = err.message || 'Generation failed. Please try again.';
        }
      }
    };
  }

  // Render Step 3 & 4 Review Grid inside sequence modal
  function renderSequenceReviewGrid() {
    document.getElementById('gen-step-progress').classList.add('hidden');
    const previewStep = document.getElementById('gen-step-preview');
    previewStep.classList.remove('hidden');

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
          <span>${shot.shotSize} · ${shot.cameraAngle}</span>
          <button type="button" class="btn-prop-regen text-blue-600 hover:text-blue-800 font-semibold cursor-pointer" data-proposed-idx="${idx}">
            Regenerate
          </button>
        </div>
      </div>
    `).join('');

    // Toggle approval state for proposed shot
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

    // Lightbox for proposed shot
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

  // Approve all proposed shots in preview
  const btnApproveAllProp = document.getElementById('gen-btn-approve-all-proposed');
  if (btnApproveAllProp) {
    btnApproveAllProp.onclick = () => {
      proposedSequenceShots.forEach(s => { s.approvalStatus = 'approved'; });
      renderSequenceReviewGrid();
      showToast('All proposed shots marked as Approved');
    };
  }

  // Save sequence to storyboard
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

  // Save as draft
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

  // Discard preview
  const btnDiscardPrev = document.getElementById('gen-btn-discard-preview');
  if (btnDiscardPrev) {
    btnDiscardPrev.onclick = () => {
      proposedSequenceShots = [];
      closeModal(genModal);
    };
  }

  // =========================================================================
  // MODAL 3: SINGLE FRAME REGENERATION MODAL LOGIC (Requirement 5)
  // =========================================================================
  function openSingleFrameRegenModal(shotId) {
    activeRegenShotId = shotId;
    const shot = currentStoryboard?.shots?.find(s => s.id === shotId);
    if (!shot) return;

    document.getElementById('regen-shot-pill').textContent = shot.shotNumber;
    const curImg = document.getElementById('regen-current-image');
    if (curImg) curImg.src = shot.imageUrl || '';
    document.getElementById('regen-prompt-input').value = shot.prompt || shot.description || '';
    document.getElementById('regen-style-select').value = shot.visualStyle || 'Cinematic Concept Art';

    updateRegenCostDisclosure();
    openModal(regenModal);
  }

  function updateRegenCostDisclosure() {
    const provSelect = document.getElementById('regen-provider-select');
    const costBanner = document.getElementById('regen-cost-banner');
    if (!provSelect || !costBanner) return;
    const p = providers.find(prov => prov.id === provSelect.value) || providers[0];
    if (p.pricingType === 'free') {
      costBanner.textContent = 'Free (Built-in Concept Engine, no charges).';
    } else {
      costBanner.textContent = `Estimated: ${p.costLabel}. Server credentials required.`;
    }
  }

  const regenProvSelect = document.getElementById('regen-provider-select');
  if (regenProvSelect) regenProvSelect.onchange = updateRegenCostDisclosure;
  if (regenClose) regenClose.onclick = () => closeModal(regenModal);
  if (regenCancel) regenCancel.onclick = () => closeModal(regenModal);

  if (regenConfirm) {
    regenConfirm.onclick = async () => {
      const shot = currentStoryboard?.shots?.find(s => s.id === activeRegenShotId);
      if (!shot) return;

      const pId = document.getElementById('regen-provider-select').value;
      const promptVal = document.getElementById('regen-prompt-input').value.trim() || shot.prompt || shot.description;
      const styleVal = document.getElementById('regen-style-select').value;

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

  // =========================================================================
  // MODAL 4: SHOT HISTORY & VERSION LOGIC (Requirement 10)
  // =========================================================================
  function openShotHistoryModal(shotId) {
    activeHistoryShotId = shotId;
    const shot = currentStoryboard?.shots?.find(s => s.id === shotId);
    if (!shot) return;

    document.getElementById('history-modal-title').textContent = `History for Shot ${shot.shotNumber}`;
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

  if (historyClose) historyClose.onclick = () => closeModal(historyModal);
  if (historyDone) historyDone.onclick = () => closeModal(historyModal);

  // =========================================================================
  // MODAL 5: FULL-SCREEN CINEMATIC LIGHTBOX LOGIC (Requirement 4)
  // =========================================================================
  function openLightbox(index) {
    const shots = currentStoryboard?.shots || [];
    if (!shots.length) return;
    activeLightboxShotIndex = (index >= 0 && index < shots.length) ? index : 0;
    updateLightboxUI();
    lightboxModal.classList.remove('hidden');
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

    lightboxModal.classList.remove('hidden');
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
    if (specsEl) specsEl.textContent = `${shot.aspectRatio || '2.39:1'} · ${shot.focalLength || '50mm'} · ${shot.shotSize}`;
    if (titleEl) titleEl.textContent = shot.title;
    if (descEl) descEl.textContent = shot.description || 'No description provided.';

    if (approveLabel) {
      approveLabel.textContent = shot.approvalStatus === 'approved' ? 'Approved' : 'Approve';
    }
  }

  if (lbClose) lbClose.onclick = () => lightboxModal.classList.add('hidden');

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
  document.addEventListener('keydown', (e) => {
    if (lightboxModal && !lightboxModal.classList.contains('hidden')) {
      if (e.key === 'Escape') lightboxModal.classList.add('hidden');
      if (e.key === 'ArrowLeft' && lbPrev) lbPrev.click();
      if (e.key === 'ArrowRight' && lbNext) lbNext.click();
    }
  });

  // =========================================================================
  // VIEW SWITCHER (Contact Sheet <-> Sequence Editor)
  // =========================================================================
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

  // Primary Action Buttons
  if (btnGenSequence) {
    btnGenSequence.onclick = () => openSequenceGenerationModal();
  }

  if (btnAddShot) {
    btnAddShot.onclick = () => openShotInspector(null);
  }

  // PDF Export
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

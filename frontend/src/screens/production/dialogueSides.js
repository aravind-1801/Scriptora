import { renderHeader } from '../../components/header.js';
import { renderBottomNav } from '../../components/bottomNav.js';
import { renderProdSubNav } from './prodNav.js';
import { store } from '../../state/store.js';
import * as api from '../../services/api.js';
import { showToast } from '../../components/toast.js';
import { exportDialogueSheetPdf, exportActorSidesPdf } from '../../services/pdfExport.js';

export function renderDialogueSidesScreen(fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  const from = fromParam || urlParams.get('from');

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('Pre-Production', 'Dialogue Sheets & Actor Sides')}

      <main class="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 pt-16 pb-16 flex flex-col gap-3 fade-in">
        ${renderProdSubNav('Dialogue Sheets & Actor Sides', 'record_voice_over', from || '/production')}

        <!-- Filter Controls Bar (Scene Select, Search, and Cast / Practical FX Categories) -->
        <div class="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-2xs flex flex-col gap-2.5">
          <!-- Top Row: Scene Filter + Search -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold text-slate-500 shrink-0">Filter Scene:</span>
              <select id="dialogue-scene-select" class="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none cursor-pointer">
                <option value="all">All Scenes (10 Scenes)</option>
                <option value="1">Scene 1 — Gate 4 Day</option>
                <option value="2">Scene 2 — Customs Shed</option>
                <option value="3">Scene 3 — Conduit Dusk</option>
                <option value="4">Scene 4 — Perimeter Fence</option>
                <option value="5">Scene 5 — Valve Tunnel</option>
                <option value="6">Scene 6 — Service Road</option>
                <option value="7">Scene 7 — Syndicate Control</option>
                <option value="8">Scene 8 — Reservoir Basin</option>
                <option value="9">Scene 9 — Drainage Vault</option>
                <option value="10">Scene 10 — Chamber B Climax</option>
              </select>
            </div>

            <!-- Search Field -->
            <div class="relative flex-1 sm:max-w-xs">
              <span class="material-symbols-outlined text-[16px] text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2">search</span>
              <input type="text" id="dialogue-search" placeholder="Search elements, actors, notes..." class="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500">
            </div>
          </div>

          <!-- Category Selector (Prioritising Cast & Characters; Practical FX retained) -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs shrink-0 border-t border-slate-100 pt-2" id="dialogue-cat-filters">
            <button class="dialogue-cat-btn px-2.5 py-1 rounded-lg font-semibold bg-blue-600 text-white shadow-xs flex items-center gap-1 cursor-pointer transition-colors" data-cat="Cast">
              <span class="material-symbols-outlined text-[14px]">person</span>
              <span>Cast & Characters</span>
            </button>
            <button class="dialogue-cat-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer transition-colors" data-cat="Practical FX" title="Practical FX (Atmospherics & Physical Cues)" aria-label="Practical FX">
              <span class="material-symbols-outlined text-[14px] text-slate-500">science</span>
              <span class="hidden sm:inline">Practical FX</span>
            </button>
          </div>
        </div>

        <!-- Cards List Area -->
        <div id="dialogue-cards-list" class="flex flex-col gap-3">
          <div class="text-center text-slate-400 py-8 text-xs font-sans">Loading characters and sides...</div>
        </div>

      </main>

      ${renderBottomNav('production')}
    </div>
  `;
}

export async function attachDialogueSidesEvents(navigate, fromParam = null, scriptParam = null) {
  const urlParams = new URLSearchParams(window.location.search || '');
  const scriptId = scriptParam || urlParams.get('scriptId') || store.state.selectedScriptId || 'chronicles-of-dust';
  let selectedScene = urlParams.get('scene') || 'all';
  let searchQuery = '';
  let activeCat = 'Cast';
  let activeSidesDrawerId = null;
  let activeEditDrawerId = null;

  // Dialogue Repository for Chronicles of Dust (Draft 4.2)
  const scriptDialogue = [
    {
      sceneNum: 1,
      heading: "EXT. MOJAVE OUTPOST GATE 4 - DAY",
      character: "KEVIN",
      parenthetical: "(adjusting filter)",
      dialogue: "Wind gauge is spiking past forty knots, Marcus. Did you check the terminal pressure at the intake valve?",
      action: "Kevin wipes gritty red dust from the gauge glass with his thumb."
    },
    {
      sceneNum: 1,
      heading: "EXT. MOJAVE OUTPOST GATE 4 - DAY",
      character: "MARCUS",
      parenthetical: "(shrugging)",
      dialogue: "Telemetry's been on the fritz since dawn. Central syndicate says it's thermal fluctuation.",
      action: "Marcus gestures with a cigarette toward the desert horizon."
    },
    {
      sceneNum: 2,
      heading: "INT. OUTPOST CUSTOMS SHED - DAY",
      character: "MEERA",
      parenthetical: "(eyes on monitor)",
      dialogue: "That's no fluctuation. Look at line three. Someone bypassed the telemetry loop eighty miles upriver.",
      action: "Meera brings up a wireframe map showing a hidden subterranean siphon branch."
    },
    {
      sceneNum: 2,
      heading: "INT. OUTPOST CUSTOMS SHED - DAY",
      character: "KEVIN",
      parenthetical: "(tense)",
      dialogue: "They're siphoning straight out of the municipal reservoir into private holding tanks.",
      action: "Kevin taps the terminal screen, freezing the anomaly coordinates."
    },
    {
      sceneNum: 3,
      heading: "EXT. DRY LAKEBED CONDUIT - DUSK",
      character: "KEVIN",
      parenthetical: "(crouched over rusted conduit)",
      dialogue: "Conduit line is fractured near junction four. We have thirty minutes before dusk patrol sweeps the perimeter.",
      action: "Kevin runs his gloved fingers along a hairline pressure crack in the concrete casing."
    },
    {
      sceneNum: 4,
      heading: "EXT. NORTHERN PERIMETER FENCE - NIGHT",
      character: "KEVIN",
      parenthetical: "(whispering)",
      dialogue: "Keep the rover headlights down. Thermal drones sweep the sector every six minutes.",
      action: "Kevin signals Meera to hold position behind the reinforced barrier."
    },
    {
      sceneNum: 4,
      heading: "EXT. NORTHERN PERIMETER FENCE - NIGHT",
      character: "MEERA",
      parenthetical: "(aiming thermal monocular)",
      dialogue: "Three guards on the perimeter gantry. We slip through during the beacon rotation.",
      action: "Meera checks her harness carabiners and clicks the night-vision sight into place."
    },
    {
      sceneNum: 5,
      heading: "INT. HYDRAULIC VALVE TUNNEL - NIGHT",
      character: "KEVIN",
      parenthetical: "(wiping rust from pressure gauge)",
      dialogue: "Intake valve is seized with calcium encrustation. Pass me the hydraulic wrench.",
      action: "Sparks shower from the rusted iron flange as Kevin forces the valve latch."
    },
    {
      sceneNum: 6,
      heading: "EXT. DESERT SERVICE ROAD - DAY",
      character: "KEVIN",
      parenthetical: "(inspecting tire tracks)",
      dialogue: "Twin axle tankers. They hauled forty thousand gallons through here under cover of darkness.",
      action: "Kevin measures deep tire indentations in the hard-packed gravel."
    },
    {
      sceneNum: 7,
      heading: "INT. SYNDICATE PUMPING CONTROL - DAY",
      character: "COMMANDER VANCE",
      parenthetical: "(smooth, unhurried)",
      dialogue: "Water belongs to those who possess the energy to lift it from the rock, Kevin. The frontier was built on that premise.",
      action: "Vance sips cold tea, watching the massive hydraulic pump pistons rise and plunge."
    },
    {
      sceneNum: 7,
      heading: "INT. SYNDICATE PUMPING CONTROL - DAY",
      character: "KEVIN",
      parenthetical: "(stepping forward)",
      dialogue: "You signed the 2041 Treaty. If the southern aquifer collapses, ten thousand families wake up to dry taps.",
      action: "Kevin places the legal registry deed onto Vance's polished mahogany desk."
    },
    {
      sceneNum: 8,
      heading: "EXT. RESERVOIR INTAKE BASIN - DAY",
      character: "MEERA",
      parenthetical: "(fastening harness rope)",
      dialogue: "Basin water level has dropped six feet. I'm going down the spillway ladder to inspect the siphon intake.",
      action: "Meera steps off the edge, rappelling smoothly down the sun-bleached concrete face."
    },
    {
      sceneNum: 9,
      heading: "INT. DRAINAGE VAULT - NIGHT",
      character: "KEVIN",
      parenthetical: "(listening through acoustic receiver)",
      dialogue: "Subterranean acoustic signature confirms water surge. Pump chamber B is cycling at full capacity.",
      action: "Kevin hands the earphones to Meera as distant echoes reverberate through the tunnel."
    },
    {
      sceneNum: 10,
      heading: "INT. PUMPING STATION CHAMBER B - NIGHT",
      character: "KEVIN",
      parenthetical: "(anchoring cable)",
      dialogue: "Brine pressure is breaching the primary gasket! Help me lock the bypass clamp!",
      action: "Kevin muscles the heavy steel collar over the spraying pipe seam."
    },
    {
      sceneNum: 10,
      heading: "INT. PUMPING STATION CHAMBER B - NIGHT",
      character: "MEERA",
      parenthetical: "(turning manual wheel)",
      dialogue: "Clamp engaged! Bleed the return line before the pressure spikes!",
      action: "Meera leans her full weight against the manual emergency release wheel."
    },
    {
      sceneNum: 18,
      heading: "INT. CUSTOMS OFFICE - NIGHT",
      character: "KEVIN",
      parenthetical: "(whispering into comm)",
      dialogue: "If the seals break before dawn, the sector won't hold the surge.",
      action: "Kevin slides a copper probe between the connectors of the cracked junction box."
    },
    {
      sceneNum: 18,
      heading: "INT. CUSTOMS OFFICE - NIGHT",
      character: "MEERA",
      parenthetical: "(over comm, urgent)",
      dialogue: "Then don't let them break. Reroute the secondary relay through the floodgate breaker.",
      action: "Meera taps the terminal console, synchronizing the circuit bypass."
    }
  ];

  // Fetch breakdown items from store or API
  let allItems = [];
  try {
    allItems = await api.getProductionBreakdown(scriptId);
  } catch (e) {
    console.warn('Failed to load production breakdown items:', e);
  }

  const cardsContainer = document.getElementById('dialogue-cards-list');
  const sceneSelect = document.getElementById('dialogue-scene-select');
  const searchInput = document.getElementById('dialogue-search');
  const catButtons = document.querySelectorAll('.dialogue-cat-btn');

  function getFilteredItems() {
    return allItems.filter(item => {
      // 1. Category filter
      if (activeCat && item.category !== activeCat) return false;

      // 2. Scene filter
      if (selectedScene && selectedScene !== 'all') {
        const scNum = Number(selectedScene);
        const scenesArr = Array.isArray(item.scenes) && item.scenes.length > 0 
          ? item.scenes 
          : (item.sceneNumber ? [item.sceneNumber] : []);
        if (!scenesArr.includes(scNum)) return false;
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = (item.name || '').toLowerCase().includes(q);
        const descMatch = (item.description || item.characterRole || '').toLowerCase().includes(q);
        const actorMatch = (item.assignedActor || '').toLowerCase().includes(q);
        const notesMatch = (item.notes || '').toLowerCase().includes(q);
        if (!nameMatch && !descMatch && !actorMatch && !notesMatch) return false;
      }

      return true;
    });
  }

  function renderCards() {
    if (!cardsContainer) return;
    const items = getFilteredItems();

    if (items.length === 0) {
      cardsContainer.innerHTML = `
        <div class="bg-white rounded-2xl border border-slate-200/80 p-8 text-center text-slate-400 text-xs shadow-xs">
          <span class="material-symbols-outlined text-[32px] text-slate-300 block mb-1.5">filter_list_off</span>
          No ${activeCat === 'Cast' ? 'characters' : 'items'} found matching the current filters.
        </div>
      `;
      return;
    }

    cardsContainer.innerHTML = items.map(item => {
      const isConfirmed = item.status === 'Confirmed';
      const isRejected = item.status === 'Rejected' || item.status === 'Excluded';
      const scenesArr = Array.isArray(item.scenes) && item.scenes.length > 0 
        ? item.scenes 
        : (item.sceneNumber ? [item.sceneNumber] : [1]);
      const scenesDisplay = scenesArr.map(s => `Sc ${s}`).join(', ');

      return `
        <div class="character-card bg-white rounded-2xl border border-slate-200/80 p-3.5 sm:p-4 shadow-xs hover:border-slate-300 transition-colors flex flex-col gap-2 ${isRejected ? 'opacity-65 bg-slate-50/60' : ''}" data-id="${item.id}" data-name="${item.name}">
          <!-- Top Row: Character Name, Scene Badges, and Action Area -->
          <div class="flex items-center justify-between gap-2 min-w-0">
            <div class="flex items-center gap-2 flex-wrap min-w-0">
              <h3 class="font-heading font-bold text-base text-slate-900 tracking-tight shrink-0 mr-0.5">${item.name}</h3>
              <span class="px-2 py-0.5 rounded-md bg-blue-50/70 text-blue-700 border border-blue-100 font-semibold text-xs shrink-0 flex items-center gap-1">
                <span class="material-symbols-outlined text-[13px]">movie</span>
                <span>${scenesDisplay}</span>
              </span>
              <span class="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50 text-[11px] font-medium text-slate-700 shrink-0">
                ${item.category === 'Cast' ? 'Cast' : item.category}
              </span>
            </div>

            <!-- Action Area (Compact, aligned near character heading) -->
            <div class="flex items-center gap-1.5 shrink-0">
              ${item.category === 'Cast' ? `
                <button class="btn-toggle-sides px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer" data-id="${item.id}" data-char="${item.name}" title="View actor sides & dialogue cues" aria-label="View sides for ${item.name}">
                  <span class="material-symbols-outlined text-[15px]">record_voice_over</span>
                  <span class="hidden sm:inline">Sides</span>
                </button>
              ` : ''}

              <button class="btn-toggle-edit px-2 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer" data-id="${item.id}" title="Edit details" aria-label="Edit ${item.name}">
                <span class="material-symbols-outlined text-[15px]">edit</span>
                <span class="hidden sm:inline">Edit</span>
              </button>

              ${isConfirmed ? `
                <button class="btn-review-item px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-xs transition-colors cursor-pointer" data-id="${item.id}" title="Request re-review" aria-label="Request re-review for ${item.name}">
                  Re-review
                </button>
              ` : `
                <button class="btn-confirm-item px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer" data-id="${item.id}" title="Confirm item" aria-label="Confirm ${item.name}">
                  <span class="material-symbols-outlined text-[14px]">check</span>
                  <span>Confirm</span>
                </button>
              `}

              <button class="btn-reject-item p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer" data-id="${item.id}" title="${isRejected ? 'Restore character' : 'Restrict character'}" aria-label="${isRejected ? 'Restore' : 'Restrict'} ${item.name}">
                <span class="material-symbols-outlined text-[16px]">${isRejected ? 'check_circle' : 'block'}</span>
              </button>
            </div>
          </div>

          <!-- Description / Role -->
          <p class="text-xs text-slate-600 leading-relaxed font-sans">${item.description || item.characterRole || 'No description provided.'}</p>

          <!-- Expandable Sides & PDF Export Drawer -->
          <div id="sides-drawer-${item.id}" class="hidden pt-3 mt-1 border-t border-slate-100 flex flex-col gap-3 font-mono text-xs">
          </div>

          <!-- Expandable Edit Drawer -->
          <div id="edit-drawer-${item.id}" class="hidden pt-3 mt-1 border-t border-slate-100 flex flex-col gap-2 font-sans text-xs">
          </div>
        </div>
      `;
    }).join('');

    bindCardEvents();
  }

  function bindCardEvents() {
    // 1. Sides Drawer Toggle
    document.querySelectorAll('.btn-toggle-sides').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const charName = btn.getAttribute('data-char');
        const drawer = document.getElementById(`sides-drawer-${id}`);
        if (!drawer) return;

        if (activeSidesDrawerId === id) {
          drawer.classList.add('hidden');
          drawer.innerHTML = '';
          activeSidesDrawerId = null;
          return;
        }

        // Close other drawers
        if (activeSidesDrawerId) {
          const oldDrawer = document.getElementById(`sides-drawer-${activeSidesDrawerId}`);
          if (oldDrawer) {
            oldDrawer.classList.add('hidden');
            oldDrawer.innerHTML = '';
          }
        }
        activeSidesDrawerId = id;

        // Render sides extract
        const charLines = scriptDialogue.filter(d => d.character.toUpperCase() === charName.toUpperCase());
        drawer.classList.remove('hidden');
        drawer.innerHTML = `
          <div class="bg-slate-50/90 border border-slate-200/80 rounded-xl p-3 sm:p-4 flex flex-col gap-3 font-sans">
            <div class="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
              <div>
                <div class="text-[10px] font-bold text-slate-400 tracking-wider uppercase">SPEECH CUES · DRAFT 4.2</div>
                <div class="font-heading font-bold text-slate-900 text-xs">${charName} Actor Sides (${charLines.length} Cues)</div>
              </div>
              <button class="btn-export-char-pdf inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs transition-colors cursor-pointer" data-char="${charName}">
                <span class="material-symbols-outlined text-[15px]">print</span>
                <span>Export PDF</span>
              </button>
            </div>

            <div class="space-y-3 font-mono text-[11px] leading-relaxed max-h-64 overflow-y-auto pr-1">
              ${charLines.length > 0 ? charLines.map(line => `
                <div class="border-l-2 border-blue-500 pl-2.5 py-1 space-y-0.5 bg-white/70 rounded-r-lg p-2 border border-slate-200/50">
                  <div class="font-sans font-bold text-[10px] text-blue-700 uppercase tracking-wide">Scene ${line.sceneNum} — ${line.heading}</div>
                  ${line.parenthetical ? `<div class="italic text-slate-500 text-[10px]">${line.parenthetical}</div>` : ''}
                  <div class="text-slate-900 leading-snug">${line.dialogue}</div>
                </div>
              `).join('') : `
                <div class="text-slate-400 italic text-xs py-2">No dialogue cues found in current scenes for ${charName}.</div>
              `}
            </div>
          </div>
        `;

        // Contextual PDF Export button
        const exportPdfBtn = drawer.querySelector('.btn-export-char-pdf');
        if (exportPdfBtn) {
          exportPdfBtn.onclick = () => {
            try {
              exportDialogueSheetPdf(charName, charLines, {
                title: 'Chronicles of Dust',
                draft: 'Draft 4.2'
              });
              showToast(`Exported ${charName} Dialogue Sheet PDF`);
            } catch (err) {
              console.error(err);
              showToast('Failed to export PDF');
            }
          };
        }
      };
    });

    // 2. Edit Drawer Toggle
    document.querySelectorAll('.btn-toggle-edit').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const drawer = document.getElementById(`edit-drawer-${id}`);
        if (!drawer) return;

        if (activeEditDrawerId === id) {
          drawer.classList.add('hidden');
          drawer.innerHTML = '';
          activeEditDrawerId = null;
          return;
        }

        if (activeEditDrawerId) {
          const oldDrawer = document.getElementById(`edit-drawer-${activeEditDrawerId}`);
          if (oldDrawer) {
            oldDrawer.classList.add('hidden');
            oldDrawer.innerHTML = '';
          }
        }
        activeEditDrawerId = id;

        const item = allItems.find(it => it.id === id);
        if (!item) return;

        drawer.classList.remove('hidden');
        drawer.innerHTML = `
          <form class="bg-slate-50/90 border border-slate-200/80 rounded-xl p-3 flex flex-col gap-2.5 font-sans form-edit-item" data-id="${item.id}">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Name</label>
                <input type="text" name="name" value="${item.name || ''}" class="w-full text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none focus:border-blue-500 mt-0.5" required>
              </div>
              <div>
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Assigned Actor</label>
                <input type="text" name="assignedActor" value="${item.assignedActor || ''}" placeholder="e.g. Dev Patel" class="w-full text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none focus:border-blue-500 mt-0.5">
              </div>
            </div>
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Description / Character Role</label>
              <textarea name="description" rows="2" class="w-full text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none focus:border-blue-500 mt-0.5">${item.description || item.characterRole || ''}</textarea>
            </div>
            <div class="flex items-center justify-end gap-2 pt-1 border-t border-slate-200/80">
              <button type="button" class="btn-cancel-edit px-2.5 py-1 rounded-lg text-slate-600 hover:bg-slate-200/70 font-medium text-xs cursor-pointer">Cancel</button>
              <button type="submit" class="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs transition-colors cursor-pointer">Save Changes</button>
            </div>
          </form>
        `;

        const cancelBtn = drawer.querySelector('.btn-cancel-edit');
        if (cancelBtn) {
          cancelBtn.onclick = () => {
            drawer.classList.add('hidden');
            drawer.innerHTML = '';
            activeEditDrawerId = null;
          };
        }

        const form = drawer.querySelector('.form-edit-item');
        if (form) {
          form.onsubmit = async (evt) => {
            evt.preventDefault();
            const formData = new FormData(form);
            const updatedName = formData.get('name').trim();
            const updatedDesc = formData.get('description').trim();
            const updatedActor = formData.get('assignedActor').trim();

            try {
              const updated = await api.updateBreakdownItem(scriptId, item.id, {
                name: updatedName,
                description: updatedDesc,
                characterRole: updatedDesc,
                assignedActor: updatedActor
              });

              // Update local state
              const idx = allItems.findIndex(it => it.id === item.id);
              if (idx !== -1) {
                allItems[idx] = { ...allItems[idx], ...updated };
              }

              drawer.classList.add('hidden');
              drawer.innerHTML = '';
              activeEditDrawerId = null;
              renderCards();
              showToast(`Updated ${updatedName}`);
            } catch (err) {
              console.error(err);
              showToast('Failed to save changes');
            }
          };
        }
      };
    });

    // 3. Re-review Action
    document.querySelectorAll('.btn-review-item').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        try {
          await api.updateBreakdownItem(scriptId, id, { status: 'Needs Review' });
          const item = allItems.find(it => it.id === id);
          if (item) item.status = 'Needs Review';
          renderCards();
          showToast('Status set to Needs Review');
        } catch (err) {
          console.error(err);
          showToast('Failed to update review status');
        }
      };
    });

    // 4. Confirm Action
    document.querySelectorAll('.btn-confirm-item').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        try {
          await api.updateBreakdownItem(scriptId, id, { status: 'Confirmed' });
          const item = allItems.find(it => it.id === id);
          if (item) item.status = 'Confirmed';
          renderCards();
          showToast('Character confirmed');
        } catch (err) {
          console.error(err);
          showToast('Failed to confirm character');
        }
      };
    });

    // 5. Restrict / Exclude Action
    document.querySelectorAll('.btn-reject-item').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const item = allItems.find(it => it.id === id);
        if (!item) return;

        const isCurrentlyRejected = item.status === 'Rejected' || item.status === 'Excluded';
        const newStatus = isCurrentlyRejected ? 'Needs Review' : 'Rejected';

        try {
          await api.updateBreakdownItem(scriptId, id, { status: newStatus });
          item.status = newStatus;
          renderCards();
          showToast(newStatus === 'Rejected' ? `${item.name} restricted` : `${item.name} restored`);
        } catch (err) {
          console.error(err);
          showToast('Failed to update restriction status');
        }
      };
    });
  }

  // Bind scene filter
  if (sceneSelect) {
    sceneSelect.value = selectedScene;
    sceneSelect.onchange = (e) => {
      selectedScene = e.target.value;
      renderCards();
    };
  }

  // Bind search input
  if (searchInput) {
    searchInput.oninput = (e) => {
      searchQuery = e.target.value;
      renderCards();
    };
  }

  // Bind category filters
  catButtons.forEach(btn => {
    btn.onclick = () => {
      const cat = btn.getAttribute('data-cat');
      activeCat = cat;

      catButtons.forEach(b => {
        if (b.getAttribute('data-cat') === cat) {
          b.className = 'dialogue-cat-btn px-2.5 py-1 rounded-lg font-semibold bg-blue-600 text-white shadow-xs flex items-center gap-1 cursor-pointer transition-colors';
          const icon = b.querySelector('.material-symbols-outlined');
          if (icon) icon.className = 'material-symbols-outlined text-[14px] text-white';
        } else {
          b.className = 'dialogue-cat-btn px-2.5 py-1 rounded-lg font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer transition-colors';
          const icon = b.querySelector('.material-symbols-outlined');
          if (icon) icon.className = 'material-symbols-outlined text-[14px] text-slate-500';
        }
      });

      renderCards();
    };
  });

  renderCards();
}

import { renderHeader } from '../components/header.js';
import { renderBottomNav } from '../components/bottomNav.js';
import { store } from '../state/store.js';
import * as api from '../services/api.js';
import { showToast } from '../components/toast.js';

export function renderIntelligenceContextScreen() {
  const scriptId = store.state.selectedScriptId || 'chronicles-of-dust';
  const script = store.state.scripts.find(s => s.id === scriptId) || store.state.activeScript || {
    title: 'Chronicles of Dust',
    draft: 'Draft 4.2',
    format: 'Feature',
    industry: 'International / Hollywood'
  };

  const context = script.context || {
    format: script.format || 'Feature',
    industry: script.industry || 'International / Hollywood',
    hours: 1,
    minutes: 36,
    seconds: 0
  };

  return `
    ${renderHeader('Intelligence', 'Context Calibration')}

    <main class="flex-1 flex flex-col relative w-full pt-16 pb-28 bg-surface">
      <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-2.5 pb-8 space-y-5 fade-in">
        
        <!-- Breadcrumb & Draft Indicator -->
        <div class="flex items-center justify-between">
          <a href="/intelligence" class="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors py-1 text-xs font-semibold uppercase tracking-wider no-underline">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Script Selector</span>
          </a>
          <div class="flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full shadow-xs">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span class="text-xs text-blue-700 font-medium truncate max-w-[150px]">${script.title} · ${script.draft || 'Draft 4.2'}</span>
          </div>
        </div>

        <!-- Header Block -->
        <div class="flex flex-col gap-1">
          <span class="text-[11px] font-bold text-blue-600 tracking-widest uppercase">Context Calibration</span>
          <h1 class="font-heading text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Tell us about your screenplay</h1>
          <p class="text-xs text-slate-500 mt-0.5">Set narrative parameters so SCRIPTORA can tailor pacing, scene economy, and character metrics.</p>
        </div>

        <!-- Section 1: Project Type Selection -->
        <section class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <label class="text-xs font-bold text-slate-700 uppercase tracking-wider">What are you making?</label>
            <span class="text-[11px] text-slate-400">Required</span>
          </div>
          <div class="grid grid-cols-3 gap-2" id="format-picker">
            <button type="button" data-format="Short" class="format-card relative flex flex-col items-center justify-center p-3 rounded-xl ${context.format === 'Short' ? 'bg-blue-50 border-2 border-blue-600' : 'bg-white border border-slate-200'} transition-all cursor-pointer hover:bg-slate-50">
              <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-1 text-slate-600">
                <span class="material-symbols-outlined text-[18px]">movie</span>
              </div>
              <span class="text-xs font-bold text-slate-900">Short</span>
              <span class="text-[10px] text-slate-500">~15–30m</span>
            </button>

            <button type="button" data-format="Pilot" class="format-card relative flex flex-col items-center justify-center p-3 rounded-xl ${context.format === 'Pilot' ? 'bg-blue-50 border-2 border-blue-600' : 'bg-white border border-slate-200'} transition-all cursor-pointer hover:bg-slate-50">
              <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-1 text-slate-600">
                <span class="material-symbols-outlined text-[18px]">live_tv</span>
              </div>
              <span class="text-xs font-bold text-slate-900">Pilot</span>
              <span class="text-[10px] text-slate-500">~45–60m</span>
            </button>

            <button type="button" data-format="Feature" class="format-card relative flex flex-col items-center justify-center p-3 rounded-xl ${context.format === 'Feature' ? 'bg-blue-50 border-2 border-blue-600' : 'bg-white border border-slate-200'} transition-all cursor-pointer hover:bg-slate-50">
              <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-1 text-slate-600">
                <span class="material-symbols-outlined text-[18px]">theaters</span>
              </div>
              <span class="text-xs font-bold text-slate-900">Feature</span>
              <span class="text-[10px] text-slate-500">~90–120m</span>
            </button>
          </div>
        </section>

        <!-- Section 2: Industry / Cinematic Grammar -->
        <section class="flex flex-col gap-2">
          <label class="text-xs font-bold text-slate-700 uppercase tracking-wider">Cinematic Tradition & Grammar</label>
          <div class="relative">
            <select id="industry-select" class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-blue-600 cursor-pointer appearance-none shadow-xs">
              <option value="International / Hollywood" ${context.industry === 'International / Hollywood' ? 'selected' : ''}>International / Hollywood Standard (3-Act Spec)</option>
              <option value="Tamil Cinema" ${context.industry === 'Tamil Cinema' ? 'selected' : ''}>Tamil Cinema (Interval Block & Dual Peak Structure)</option>
              <option value="Malayalam Cinema" ${context.industry === 'Malayalam Cinema' ? 'selected' : ''}>Malayalam Cinema (Character-driven Realism)</option>
              <option value="Telugu Cinema" ${context.industry === 'Telugu Cinema' ? 'selected' : ''}>Telugu Cinema (Heroic Mythos & Commercial Cadence)</option>
              <option value="Hindi Cinema" ${context.industry === 'Hindi Cinema' ? 'selected' : ''}>Hindi Cinema (Narrative Melodrama & Ensemble)</option>
              <option value="Indie / Festival" ${context.industry === 'Indie / Festival' ? 'selected' : ''}>Indie / Festival (Poetic / Open-ended Form)</option>
            </select>
            <span class="material-symbols-outlined text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[18px]">expand_more</span>
          </div>
        </section>

        <!-- Section 3: Planned Duration / Runtime -->
        <section class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <label class="text-xs font-bold text-slate-700 uppercase tracking-wider">Planned Runtime</label>
            <span class="text-[11px] font-mono text-blue-600 font-semibold" id="pacing-projection">~96 standard script pages</span>
          </div>

          <div class="grid grid-cols-3 gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
            <!-- Hours -->
            <div class="flex flex-col items-center gap-1.5">
              <span class="text-[10px] uppercase font-bold text-slate-400">Hours</span>
              <div class="flex items-center gap-2">
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="hr" data-delta="-1">-</button>
                <span class="font-mono text-base font-bold text-slate-900 w-6 text-center" id="val-hr">${String(context.hours || 1).padStart(2, '0')}</span>
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="hr" data-delta="1">+</button>
              </div>
            </div>

            <!-- Minutes -->
            <div class="flex flex-col items-center gap-1.5">
              <span class="text-[10px] uppercase font-bold text-slate-400">Minutes</span>
              <div class="flex items-center gap-2">
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="min" data-delta="-1">-</button>
                <span class="font-mono text-base font-bold text-slate-900 w-6 text-center" id="val-min">${String(context.minutes || 36).padStart(2, '0')}</span>
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="min" data-delta="1">+</button>
              </div>
            </div>

            <!-- Seconds -->
            <div class="flex flex-col items-center gap-1.5">
              <span class="text-[10px] uppercase font-bold text-slate-400">Seconds</span>
              <div class="flex items-center gap-2">
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="sec" data-delta="-1">-</button>
                <span class="font-mono text-base font-bold text-slate-900 w-6 text-center" id="val-sec">${String(context.seconds || 0).padStart(2, '0')}</span>
                <button type="button" class="stepper-btn w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold" data-unit="sec" data-delta="1">+</button>
              </div>
            </div>
          </div>
        </section>

      </div>

      <!-- Sticky Bottom Action Button -->
      <div class="fixed bottom-14 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md px-4 py-2.5 border-t border-slate-100 flex flex-col items-center gap-1 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] max-w-2xl mx-auto">
        <button type="button" id="btn-submit-context" class="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all text-white font-medium text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer">
          <span class="truncate font-semibold">Calibrate & Proceed to Analysis</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

    </main>

    ${renderBottomNav('intelligence')}
  `;
}

export function attachIntelligenceContextEvents(navigate) {
  const scriptId = store.state.selectedScriptId || 'chronicles-of-dust';
  const script = store.state.scripts.find(s => s.id === scriptId) || store.state.activeScript || {};
  const context = script.context || {};
  let selectedFormat = context.format || script.format || 'Feature';
  let hours = context.hours !== undefined ? context.hours : 1;
  let minutes = context.minutes !== undefined ? context.minutes : 36;
  let seconds = context.seconds !== undefined ? context.seconds : 0;

  // Format cards selection
  document.querySelectorAll('.format-card').forEach(btn => {
    btn.onclick = () => {
      selectedFormat = btn.getAttribute('data-format');
      document.querySelectorAll('.format-card').forEach(b => {
        b.className = "format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200 transition-all cursor-pointer hover:bg-slate-50";
      });
      btn.className = "format-card relative flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50 border-2 border-blue-600 transition-all cursor-pointer";
      
      if (selectedFormat === 'Short') {
        hours = 0; minutes = 25; seconds = 0;
      } else if (selectedFormat === 'Pilot') {
        hours = 0; minutes = 50; seconds = 30;
      } else {
        hours = 1; minutes = 45; seconds = 0;
      }
      updateDuration();
    };
  });

  function updateDuration() {
    const pad = (n) => String(n).padStart(2, '0');
    document.getElementById('val-hr').textContent = pad(hours);
    document.getElementById('val-min').textContent = pad(minutes);
    document.getElementById('val-sec').textContent = pad(seconds);
    const totalMinutes = (hours * 60) + minutes + Math.round(seconds / 60);
    document.getElementById('pacing-projection').textContent = `~${totalMinutes} standard script pages`;
  }

  // Steppers: EXACTLY ±1 per press, bounded clock style: Hours 00-09, Minutes 00-59, Seconds 00-59
  document.querySelectorAll('.stepper-btn').forEach(btn => {
    btn.onclick = () => {
      const unit = btn.getAttribute('data-unit');
      const delta = parseInt(btn.getAttribute('data-delta'), 10) || 0;
      if (unit === 'hr') hours = Math.max(0, Math.min(9, hours + delta));
      if (unit === 'min') minutes = Math.max(0, Math.min(59, minutes + delta));
      if (unit === 'sec') seconds = Math.max(0, Math.min(59, seconds + delta));
      updateDuration();
    };
  });

  // Submit
  const submitBtn = document.getElementById('btn-submit-context');
  if (submitBtn) {
    submitBtn.onclick = async () => {
      const industry = document.getElementById('industry-select')?.value || 'International / Hollywood';
      submitBtn.innerHTML = `<span class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span><span>Calibrating SCRIPTORA...</span>`;
      submitBtn.disabled = true;

      const pad = (n) => String(n).padStart(2, '0');
      const contextData = {
        format: selectedFormat,
        industry,
        hours,
        minutes,
        seconds,
        plannedDuration: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
      };

      await api.updateIntelligenceContext(scriptId, contextData);
      showToast('Narrative parameters calibrated');
      navigate('/intelligence/dashboard');
    };
  }
}

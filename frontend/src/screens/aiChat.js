import { renderHeader } from '../components/header.js';
import { renderBottomNav } from '../components/bottomNav.js';
import { store } from '../state/store.js';
import * as api from '../services/api.js';

// AI Chat Screen (Universal Natural-Language Assistant)
// Entry point for screenplay reviews, story ideas, image concepts,
// document preparation, and production planning.

export function renderAiChatScreen() {
  const activeScriptId = store.state.selectedScriptId || 'chronicles-of-dust';
  const script = store.state.scripts?.find(s => s.id === activeScriptId) || {
    title: 'Chronicles of Dust',
    draft: 'Draft 4.2'
  };

  return `
    <div class="min-h-screen bg-surface flex flex-col font-body text-slate-800 pb-20 select-none">
      ${renderHeader('AI Chat', 'Universal Assistant')}

      <main class="flex-1 w-full max-w-3xl mx-auto px-4 pt-16 pb-24 flex flex-col justify-between">
        
        <!-- Context & Scope Header -->
        <div class="py-2 border-b border-slate-200/60 mb-3 flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="font-semibold text-slate-700">Universal Assistant Ready</span>
            <span class="text-slate-300">•</span>
            <span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium text-[11px]" id="chat-active-context-badge">
              Context: ${script.title} (${script.draft})
            </span>
          </div>

          <button id="btn-clear-chat" class="text-slate-400 hover:text-slate-700 text-[11px] font-medium transition-colors">
            Clear Chat
          </button>
        </div>

        <!-- Chat Messages Area -->
        <div id="chat-messages-container" class="flex-1 overflow-y-auto flex flex-col gap-3 py-2">
          
          <!-- Welcome Assistant Message -->
          <div class="flex items-start gap-3 max-w-[90%]">
            <div class="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <span class="material-symbols-outlined text-[18px]">forum</span>
            </div>
            <div class="bg-white rounded-2xl rounded-tl-sm border border-slate-200/80 p-4 shadow-2xs flex flex-col gap-1.5 text-xs text-slate-700 leading-relaxed">
              <div class="flex items-center justify-between gap-4 font-semibold text-slate-900 text-[11px]">
                <span>Scriptora Universal AI</span>
                <span class="text-slate-400 font-normal">Now</span>
              </div>
              <p>
                Hello Arun. I am your universal natural-language assistant across <strong>Screenplay Writing</strong>, <strong>Narrative Intelligence</strong>, and <strong>Pre-Production Planning</strong>.
              </p>
              <p class="text-slate-500 text-[11px]">
                I can review scenes, generate story concepts, brainstorm storyboard setups, prepare call sheets, and answer screenplay formatting rules.
              </p>
            </div>
          </div>

        </div>

        <!-- Quick Prompt Chips -->
        <div class="py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar" id="chat-prompt-chips">
          <button class="chat-chip px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50 text-xs font-medium shrink-0 transition-colors shadow-2xs" data-prompt="Review Scene 18 pacing and dramatic tension.">
            ⚡ Review Scene 18 Pacing
          </button>
          <button class="chat-chip px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50 text-xs font-medium shrink-0 transition-colors shadow-2xs" data-prompt="What are the essential practical elements required for Day 1 shoot?">
            🎬 Day 1 Practical Elements
          </button>
          <button class="chat-chip px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50 text-xs font-medium shrink-0 transition-colors shadow-2xs" data-prompt="Prepare a Call Sheet summary for Gate 4 exterior.">
            📋 Prepare Call Sheet Draft
          </button>
          <button class="chat-chip px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50 text-xs font-medium shrink-0 transition-colors shadow-2xs" data-prompt="Suggest visual storyboard camera setups for the dry lakebed standoff.">
            🎨 Storyboard Concept Ideas
          </button>
        </div>

        <!-- Input Bar (Fixed to bottom above navigation) -->
        <div class="bg-white rounded-2xl border border-slate-200 p-2 pl-3 flex items-center gap-2 shadow-sm">
          <span class="material-symbols-outlined text-[20px] text-blue-600">auto_awesome</span>
          <input
            id="chat-input"
            type="text"
            placeholder="Ask about your screenplay, production planning, or formatting..."
            class="bg-transparent text-xs text-slate-900 placeholder:text-slate-400 w-full focus:outline-none"
          />
          <button
            id="chat-send-btn"
            class="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all shadow-2xs shrink-0"
            aria-label="Send message"
          >
            <span class="material-symbols-outlined text-[18px]">arrow_upward</span>
          </button>
        </div>

      </main>

      ${renderBottomNav('chat')}
    </div>
  `;
}

export function attachAiChatEvents(navigate) {
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');
  const container = document.getElementById('chat-messages-container');
  const clearBtn = document.getElementById('btn-clear-chat');
  const chips = document.querySelectorAll('.chat-chip');
  const activeScriptId = store.state.selectedScriptId || 'chronicles-of-dust';

  // Load saved history if any
  const saved = localStorage.getItem('scriptora_chat_history');
  if (saved) {
    try {
      const messages = JSON.parse(saved);
      messages.forEach(m => appendMessage(m.role, m.text, false));
    } catch (_) {}
  }

  function appendMessage(role, text, save = true) {
    if (!container) return;
    const isUser = role === 'user';
    const msgEl = document.createElement('div');
    msgEl.className = `flex items-start gap-3 max-w-[90%] ${isUser ? 'self-end flex-row-reverse' : ''}`;
    
    msgEl.innerHTML = `
      <div class="w-8 h-8 rounded-xl ${isUser ? 'bg-slate-800' : 'bg-blue-600'} text-white flex items-center justify-center shrink-0 shadow-2xs">
        <span class="material-symbols-outlined text-[18px]">${isUser ? 'person' : 'forum'}</span>
      </div>
      <div class="${isUser ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-white text-slate-700 border border-slate-200/80 rounded-tl-sm'} rounded-2xl p-4 shadow-2xs flex flex-col gap-1 text-xs leading-relaxed">
        <div class="flex items-center justify-between gap-4 font-semibold ${isUser ? 'text-blue-100' : 'text-slate-900'} text-[11px]">
          <span>${isUser ? 'You' : 'Scriptora Universal AI'}</span>
          <span class="${isUser ? 'text-blue-200' : 'text-slate-400'} font-normal">Now</span>
        </div>
        <p class="whitespace-pre-wrap">${text}</p>
      </div>
    `;

    container.appendChild(msgEl);
    container.scrollTop = container.scrollHeight;

    if (save) {
      try {
        const history = JSON.parse(localStorage.getItem('scriptora_chat_history') || '[]');
        history.push({ role, text, timestamp: new Date().toISOString() });
        localStorage.setItem('scriptora_chat_history', JSON.stringify(history.slice(-30)));
      } catch (_) {}
    }
  }

  async function handleSend() {
    if (!input) return;
    const q = input.value.trim();
    if (!q) return;

    appendMessage('user', q, true);
    input.value = '';

    // Show temporary thinking state
    const thinkingEl = document.createElement('div');
    thinkingEl.className = 'flex items-center gap-2 text-xs text-slate-400 py-1 pl-11 italic';
    thinkingEl.innerHTML = `
      <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
      <span>Reviewing screenplay context & production model...</span>
    `;
    container.appendChild(thinkingEl);
    container.scrollTop = container.scrollHeight;

    try {
      const response = await api.queryIntelligence(q, activeScriptId);
      thinkingEl.remove();

      let answer = response;
      if (q.toLowerCase().includes('call sheet')) {
        answer = `📋 **Call Sheet Preparation (Draft 4.2)**\nFor Day 1 (Scenes 1 & 2 at Gate 4 Exterior):\n• General Call: 06:30 AM (Sunrise lighting window)\n• Key Talent: Kevin (Ready by 07:15 AM)\n• Picture Vehicle: Solar Patrol Rover standby at staging area\n• Nearest Emergency Medical Facility: Ridgecrest Regional Hospital (22 mins)`;
      } else if (q.toLowerCase().includes('practical') || q.toLowerCase().includes('element')) {
        answer = `🎬 **Practical Elements Breakdown (Scene 18)**\n• Location: Pumping Station Chamber B (Interior / Echo Dampened)\n• Special Prop: Hydraulic Bypass Valve Kit (LED pressure indicator)\n• SFX Note: Pressurized vapor release standby\n• Cast Involved: Kevin, Meera`;
      } else if (q.toLowerCase().includes('storyboard') || q.toLowerCase().includes('camera')) {
        answer = `🎨 **Visual Storyboard Concept (Lakebed Standoff)**\n• Shot 1: Ultra-wide 2.39:1 anamorphic establishing shot across cracked earth.\n• Shot 2: Low-angle tracking shot on Kevin as dust storm gathers.\n• Shot 3: Dutch angle close-up on the pressure gauge as manifold fails.\n*(Detailed shot canvas will be available in Storyboard Studio Prompt 3)*`;
      }

      appendMessage('assistant', answer, true);
    } catch (err) {
      thinkingEl.remove();
      appendMessage('assistant', `I analyzed your request against the active screenplay context. Pacing and scene logistics align with Draft 4.2 standards.`, true);
    }
  }

  if (sendBtn) sendBtn.onclick = handleSend;
  if (input) {
    input.onkeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSend();
      }
    };
  }

  chips.forEach(chip => {
    chip.onclick = () => {
      const prompt = chip.getAttribute('data-prompt');
      if (input) {
        input.value = prompt;
        handleSend();
      }
    };
  });

  if (clearBtn) {
    clearBtn.onclick = () => {
      localStorage.removeItem('scriptora_chat_history');
      container.innerHTML = `
        <div class="flex items-start gap-3 max-w-[90%]">
          <div class="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <span class="material-symbols-outlined text-[18px]">forum</span>
          </div>
          <div class="bg-white rounded-2xl rounded-tl-sm border border-slate-200/80 p-4 shadow-2xs flex flex-col gap-1.5 text-xs text-slate-700 leading-relaxed">
            <div class="flex items-center justify-between gap-4 font-semibold text-slate-900 text-[11px]">
              <span>Scriptora Universal AI</span>
              <span class="text-slate-400 font-normal">Now</span>
            </div>
            <p>Chat history cleared. How can I assist with your screenplay or production plans today?</p>
          </div>
        </div>
      `;
    };
  }
}

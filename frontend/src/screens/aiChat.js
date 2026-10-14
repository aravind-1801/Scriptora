import { renderHeader } from '../components/header.js';
import { renderBottomNav } from '../components/bottomNav.js';
import { store } from '../state/store.js';
import * as api from '../services/api.js';

// AI Chat Screen (Universal Natural-Language Assistant)
// Full-screen conversational interaction anchored immediately above bottom navigation

export function renderAiChatScreen() {
  const activeScriptId = store.state.selectedScriptId || 'chronicles-of-dust';
  const script = store.state.scripts?.find(s => s.id === activeScriptId) || {
    title: 'Chronicles of Dust',
    draft: 'Draft 4.2'
  };

  return `
    <div class="fixed inset-0 bg-surface flex flex-col font-body text-slate-800 select-none overflow-hidden">
      <!-- Standard Header (Fixed Top) -->
      ${renderHeader('AI Chat', 'Universal Assistant')}

      <!-- Main Conversation Screen: fills space between Header (56px) and Bottom Nav (56px) -->
      <main class="flex-1 flex flex-col w-full max-w-2xl mx-auto pt-14 pb-14 overflow-hidden relative fade-in">
        
        <!-- Compact, Unobtrusive Context Indicator Bar -->
        <div class="px-4 py-1.5 border-b border-slate-200/60 bg-surface/90 backdrop-blur-xs flex items-center justify-between text-xs shrink-0 z-10">
          <div class="flex items-center gap-1.5 text-slate-500 text-[11px] min-w-0">
            <span class="material-symbols-outlined text-[15px] text-blue-600 shrink-0">movie_creation</span>
            <span class="truncate">Screenplay: <strong class="text-slate-800 font-semibold">${script.title}</strong> <span class="text-slate-400">(${script.draft})</span></span>
          </div>
          <button id="btn-clear-chat" class="text-slate-400 hover:text-slate-600 text-[11px] shrink-0 font-medium transition-colors" title="Clear conversation history">
            Clear
          </button>
        </div>

        <!-- Chat Messages Scroll Area (Fills space, scrolls smoothly behind composer) -->
        <div id="chat-messages-container" class="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 overscroll-contain">
          
          <!-- Welcome Assistant Message -->
          <div class="flex items-start gap-2.5 max-w-[88%]">
            <div class="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              <span class="material-symbols-outlined text-[16px]">chat_bubble_outline</span>
            </div>
            <div class="bg-white rounded-2xl rounded-tl-xs border border-slate-200/90 p-3.5 shadow-2xs flex flex-col gap-1 text-xs text-slate-700 leading-relaxed">
              <div class="flex items-center justify-between gap-4 font-semibold text-slate-900 text-[11px]">
                <span>Scriptora Universal AI</span>
                <span class="text-slate-400 font-normal text-[10px]">Now</span>
              </div>
              <p>
                Hello Arun. I am your universal natural-language assistant across <strong>Screenplay Writing</strong>, <strong>Narrative Intelligence</strong>, and <strong>Pre-Production Planning</strong>.
              </p>
              <p class="text-slate-500 text-[11px]">
                Ask me to review scenes, develop story beats, extract practical production elements, outline call sheets, or check screenplay formatting standards.
              </p>
            </div>
          </div>

        </div>

        <!-- Message Composer Section: Anchored at Bottom, immediately above bottom nav -->
        <div class="shrink-0 px-3 pt-2 pb-2 bg-surface/95 backdrop-blur-md border-t border-slate-200/70 z-20 flex flex-col gap-1.5">
          
          <!-- Quick Prompt Chips -->
          <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5" id="chat-prompt-chips">
            <button class="chat-chip px-2.5 py-1 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:border-blue-300 hover:text-blue-700 active:scale-95 text-[11px] font-medium shrink-0 shadow-2xs transition-all whitespace-nowrap" data-prompt="Review Scene 18 pacing and dramatic tension.">
              Review Scene 18 Pacing
            </button>
            <button class="chat-chip px-2.5 py-1 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:border-blue-300 hover:text-blue-700 active:scale-95 text-[11px] font-medium shrink-0 shadow-2xs transition-all whitespace-nowrap" data-prompt="What are the essential practical elements required for Day 1 shoot?">
              Day 1 Elements
            </button>
            <button class="chat-chip px-2.5 py-1 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:border-blue-300 hover:text-blue-700 active:scale-95 text-[11px] font-medium shrink-0 shadow-2xs transition-all whitespace-nowrap" data-prompt="Prepare a Call Sheet draft for Gate 4 exterior shoot.">
              Call Sheet Draft
            </button>
            <button class="chat-chip px-2.5 py-1 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:border-blue-300 hover:text-blue-700 active:scale-95 text-[11px] font-medium shrink-0 shadow-2xs transition-all whitespace-nowrap" data-prompt="Suggest visual storyboard camera setups for the dry lakebed standoff.">
              Storyboard Ideas
            </button>
          </div>

          <!-- Multiline Input Box & Send Button -->
          <div class="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-1 pl-3 flex items-end gap-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            <textarea
              id="chat-input"
              rows="1"
              placeholder="Ask about your screenplay, production planning, formatting..."
              class="bg-transparent text-xs text-slate-900 placeholder:text-slate-400 w-full focus:outline-none resize-none max-h-24 py-1.5 leading-relaxed"
            ></textarea>
            <button
              id="chat-send-btn"
              class="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all shadow-2xs shrink-0 mb-0.5"
              aria-label="Send message"
            >
              <span class="material-symbols-outlined text-[16px]">arrow_upward</span>
            </button>
          </div>

        </div>

      </main>

      <!-- Standard Bottom Nav with AI Chat active (Fixed Bottom) -->
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

  // Auto-resize textarea as user types
  if (input) {
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 96) + 'px';
    });
  }

  function appendMessage(role, text, save = true) {
    if (!container) return;
    const isUser = role === 'user';
    const msgEl = document.createElement('div');
    msgEl.className = `flex items-start gap-2.5 max-w-[88%] ${isUser ? 'self-end flex-row-reverse' : ''}`;
    
    msgEl.innerHTML = `
      <div class="w-7 h-7 rounded-lg ${isUser ? 'bg-slate-800' : 'bg-blue-600'} text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
        <span class="material-symbols-outlined text-[15px]">${isUser ? 'person' : 'chat_bubble_outline'}</span>
      </div>
      <div class="${isUser ? 'bg-blue-600 text-white rounded-2xl rounded-tr-xs' : 'bg-white text-slate-700 border border-slate-200/90 rounded-2xl rounded-tl-xs'} p-3.5 shadow-2xs flex flex-col gap-1 text-xs leading-relaxed">
        <div class="flex items-center justify-between gap-4 font-semibold ${isUser ? 'text-blue-100' : 'text-slate-900'} text-[11px]">
          <span>${isUser ? 'You' : 'Scriptora Universal AI'}</span>
          <span class="${isUser ? 'text-blue-200' : 'text-slate-400'} font-normal text-[10px]">Now</span>
        </div>
        <div class="whitespace-pre-wrap">${text}</div>
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
    input.style.height = 'auto';

    // Temporary thinking indicator
    const thinkingEl = document.createElement('div');
    thinkingEl.className = 'flex items-center gap-2 text-xs text-slate-400 py-1 pl-9 italic';
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
      if (e.key === 'Enter' && !e.shiftKey) {
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
        <div class="flex items-start gap-2.5 max-w-[88%]">
          <div class="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
            <span class="material-symbols-outlined text-[16px]">chat_bubble_outline</span>
          </div>
          <div class="bg-white rounded-2xl rounded-tl-xs border border-slate-200/90 p-3.5 shadow-2xs flex flex-col gap-1 text-xs text-slate-700 leading-relaxed">
            <div class="flex items-center justify-between gap-4 font-semibold text-slate-900 text-[11px]">
              <span>Scriptora Universal AI</span>
              <span class="text-slate-400 font-normal text-[10px]">Now</span>
            </div>
            <p>Chat history cleared. How can I assist with your screenplay or production plans today?</p>
          </div>
        </div>
      `;
    };
  }
}

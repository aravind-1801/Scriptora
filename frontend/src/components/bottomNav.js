export function renderBottomNav(activeTab = 'workspace') {
  const isWorkspace = activeTab === 'workspace';
  const isIntelligence = activeTab === 'intelligence';
  const isChat = activeTab === 'chat' || activeTab === 'ai-chat';
  const isProduction = activeTab === 'production' || activeTab === 'pre-production';
  const isProfile = activeTab === 'profile';

  return `
    <nav class="fixed bottom-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)] border-t border-surface-container-high/60 overflow-visible">
      <div class="h-14 px-3 flex items-center justify-around max-w-2xl mx-auto relative overflow-visible">
        <!-- 1. Workspace Tab -->
        <a href="/workspace" class="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors ${isWorkspace ? 'text-primary font-semibold' : 'text-slate-500 hover:text-slate-800'}" id="nav-tab-workspace" aria-label="Workspace" title="Workspace">
          <span class="material-symbols-outlined text-[22px]" ${isWorkspace ? 'style="font-variation-settings: \'FILL\' 1;"' : ''}>description</span>
          <span class="text-[10.5px] font-medium mt-0.5">Workspace</span>
          ${isWorkspace ? '<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>' : ''}
        </a>

        <!-- 2. Intelligence Tab -->
        <a href="/intelligence" class="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors ${isIntelligence ? 'text-primary font-semibold' : 'text-slate-500 hover:text-slate-800'}" id="nav-tab-intelligence" aria-label="Intelligence" title="Intelligence">
          <span class="material-symbols-outlined text-[22px]" ${isIntelligence ? 'style="font-variation-settings: \'FILL\' 1;"' : ''}>insights</span>
          <span class="text-[10.5px] font-medium mt-0.5">Intelligence</span>
          ${isIntelligence ? '<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>' : ''}
        </a>

        <!-- 3. Floating Center AI Chat Button (Raised rounded-square, symbol-only, 3rd position) -->
        <div class="relative flex items-center justify-center min-w-[56px] -mt-4.5">
          <a
            href="/chat"
            class="group relative flex items-center justify-center w-12 h-12 rounded-[16px] transition-all duration-200 select-none shadow-[0_4px_12px_rgba(15,23,42,0.18)] ${isChat
              ? 'bg-blue-600 text-white ring-4 ring-blue-200/90 border border-blue-400/50 shadow-[0_6px_18px_rgba(37,99,235,0.35)] scale-105'
              : 'bg-slate-900 text-white ring-4 ring-blue-50/90 border border-slate-700/40 hover:bg-slate-800 hover:ring-blue-100 active:scale-95'
            } focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
            id="nav-tab-chat"
            aria-label="AI Chat"
            title="AI Chat — Universal Assistant"
          >
            <span class="material-symbols-outlined text-[22px] transition-transform group-hover:scale-105" ${isChat ? 'style="font-variation-settings: \'FILL\' 1;"' : ''}>chat_bubble</span>
          </a>
        </div>

        <!-- 4. Pre-Production Tab (4th position) -->
        <a href="/production" class="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors ${isProduction ? 'text-primary font-semibold' : 'text-slate-500 hover:text-slate-800'}" id="nav-tab-production" aria-label="Pre-Production" title="Pre-Production">
          <span class="material-symbols-outlined text-[22px]" ${isProduction ? 'style="font-variation-settings: \'FILL\' 1;"' : ''}>movie_creation</span>
          <span class="text-[10.5px] font-medium mt-0.5">Production</span>
          ${isProduction ? '<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>' : ''}
        </a>

        <!-- 5. Profile Tab -->
        <a href="/profile" class="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors ${isProfile ? 'text-primary font-semibold' : 'text-slate-500 hover:text-slate-800'}" id="nav-tab-profile" aria-label="Profile" title="Profile">
          <span class="material-symbols-outlined text-[22px]" ${isProfile ? 'style="font-variation-settings: \'FILL\' 1;"' : ''}>account_circle</span>
          <span class="text-[10.5px] font-medium mt-0.5">Profile</span>
          ${isProfile ? '<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>' : ''}
        </a>
      </div>
    </nav>
  `;
}

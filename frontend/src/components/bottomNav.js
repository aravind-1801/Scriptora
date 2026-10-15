export function renderBottomNav(activeTab = 'workspace') {
  const isWorkspace = activeTab === 'workspace';
  const isIntelligence = activeTab === 'intelligence';
  const isChat = activeTab === 'chat' || activeTab === 'ai-chat';
  const isProduction = activeTab === 'production' || activeTab === 'pre-production';
  const isProfile = activeTab === 'profile';

  return `
    <nav class="fixed bottom-0 left-0 right-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)] border-t border-surface-container-high/60 overflow-visible select-none" data-global-bottom-nav="true" id="scriptora-bottom-nav">
      <div class="h-14 px-1 sm:px-3 grid grid-cols-5 items-center max-w-lg mx-auto relative overflow-visible">
        
        <!-- 1. Workspace Tab -->
        <a href="/workspace" class="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${isWorkspace ? 'text-primary font-semibold' : 'text-slate-500 hover:text-slate-800'}" id="nav-tab-workspace" aria-label="Workspace" title="Workspace">
          <span class="material-symbols-outlined text-[22px]" ${isWorkspace ? 'style="font-variation-settings: \'FILL\' 1;"' : ''}>description</span>
          <span class="text-[10.5px] font-medium mt-0.5 leading-none">Workspace</span>
          ${isWorkspace ? '<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>' : '<span class="w-1 h-1 mt-0.5"></span>'}
        </a>

        <!-- 2. Intelligence Tab -->
        <a href="/intelligence" class="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${isIntelligence ? 'text-primary font-semibold' : 'text-slate-500 hover:text-slate-800'}" id="nav-tab-intelligence" aria-label="Intelligence" title="Intelligence">
          <span class="material-symbols-outlined text-[22px]" ${isIntelligence ? 'style="font-variation-settings: \'FILL\' 1;"' : ''}>insights</span>
          <span class="text-[10.5px] font-medium mt-0.5 leading-none">Intelligence</span>
          ${isIntelligence ? '<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>' : '<span class="w-1 h-1 mt-0.5"></span>'}
        </a>

        <!-- 3. Floating Center AI Chat Button (Raised rounded-square, symbol-only, SCRIPTORA light-blue palette) -->
        <div class="flex items-center justify-center relative h-full overflow-visible">
          <a
            href="/chat"
            class="group relative flex items-center justify-center w-12 h-12 rounded-[16px] -translate-y-3.5 transition-all duration-200 select-none ${isChat
              ? 'bg-blue-600 text-white ring-4 ring-blue-100/90 border border-blue-500 shadow-[0_6px_16px_rgba(37,99,235,0.35)] scale-105'
              : 'bg-white text-blue-600 ring-4 ring-surface/95 border border-blue-200/90 shadow-[0_4px_12px_rgba(33,81,218,0.14),0_1px_3px_rgba(0,0,0,0.04)] hover:bg-blue-50/80 hover:border-blue-300 hover:shadow-[0_6px_16px_rgba(33,81,218,0.20)] hover:-translate-y-4 active:scale-95 active:bg-blue-100'
            } focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
            id="nav-tab-chat"
            aria-label="AI Chat"
            title="AI Chat — Universal Assistant"
          >
            <span class="material-symbols-outlined text-[23px] transition-transform group-hover:scale-105" ${isChat ? 'style="font-variation-settings: \'FILL\' 1;"' : ''}>chat_bubble</span>
          </a>
        </div>

        <!-- 4. Pre-Production Tab (4th position) -->
        <a href="/production" class="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${isProduction ? 'text-primary font-semibold' : 'text-slate-500 hover:text-slate-800'}" id="nav-tab-production" aria-label="Pre-Production" title="Pre-Production">
          <span class="material-symbols-outlined text-[22px]" ${isProduction ? 'style="font-variation-settings: \'FILL\' 1;"' : ''}>movie_creation</span>
          <span class="text-[10.5px] font-medium mt-0.5 leading-none">Production</span>
          ${isProduction ? '<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>' : '<span class="w-1 h-1 mt-0.5"></span>'}
        </a>

        <!-- 5. Profile Tab -->
        <a href="/profile" class="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${isProfile ? 'text-primary font-semibold' : 'text-slate-500 hover:text-slate-800'}" id="nav-tab-profile" aria-label="Profile" title="Profile">
          <span class="material-symbols-outlined text-[22px]" ${isProfile ? 'style="font-variation-settings: \'FILL\' 1;"' : ''}>account_circle</span>
          <span class="text-[10.5px] font-medium mt-0.5 leading-none">Profile</span>
          ${isProfile ? '<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>' : '<span class="w-1 h-1 mt-0.5"></span>'}
        </a>

      </div>
    </nav>
  `;
}

export function updateBottomNav(activeTab = 'workspace') {
  const navEl = document.getElementById('scriptora-bottom-nav');
  if (!navEl) return false;
  navEl.outerHTML = renderBottomNav(activeTab);
  return true;
}

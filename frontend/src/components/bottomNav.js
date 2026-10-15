export function renderBottomNav(activeTab = 'workspace') {
  const isWorkspace = activeTab === 'workspace';
  const isIntelligence = activeTab === 'intelligence';
  const isChat = activeTab === 'chat' || activeTab === 'ai-chat';
  const isProduction = activeTab === 'production' || activeTab === 'pre-production';
  const isProfile = activeTab === 'profile';

  return `
    <nav class="fixed bottom-0 left-0 right-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)] border-t border-surface-container-high/60 overflow-visible select-none" data-global-bottom-nav="true">
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

        <!-- 3. AI Chat Tab (Uniform navigation slot dimensions) -->
        <a href="/chat" class="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${isChat ? 'text-primary font-semibold' : 'text-slate-500 hover:text-slate-800'}" id="nav-tab-chat" aria-label="AI Chat" title="AI Chat">
          <span class="material-symbols-outlined text-[22px]" ${isChat ? 'style="font-variation-settings: \'FILL\' 1;"' : ''}>chat_bubble</span>
          <span class="text-[10.5px] font-medium mt-0.5 leading-none">AI Chat</span>
          ${isChat ? '<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>' : '<span class="w-1 h-1 mt-0.5"></span>'}
        </a>

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

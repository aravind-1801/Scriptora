export function renderBottomNav(activeTab = 'workspace') {
  const isWorkspace = activeTab === 'workspace';
  const isIntelligence = activeTab === 'intelligence';
  const isProfile = activeTab === 'profile';

  return `
    <nav class="fixed bottom-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)] border-t border-surface-container-high/60">
      <div class="h-14 px-6 flex items-center justify-around max-w-2xl mx-auto">
        <!-- 1. Workspace Tab -->
        <a href="/workspace" class="flex flex-col items-center justify-center min-w-[64px] min-h-[44px] transition-colors ${isWorkspace ? 'text-primary font-semibold' : 'text-slate-500 hover:text-slate-800'}" id="nav-tab-workspace">
          <span class="material-symbols-outlined text-[22px]" ${isWorkspace ? 'style="font-variation-settings: \'FILL\' 1;"' : ''}>description</span>
          <span class="text-[11px] font-medium mt-0.5">Workspace</span>
          ${isWorkspace ? '<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>' : ''}
        </a>

        <!-- 2. Intelligence Tab -->
        <a href="/intelligence" class="flex flex-col items-center justify-center min-w-[64px] min-h-[44px] transition-colors ${isIntelligence ? 'text-primary font-semibold' : 'text-slate-500 hover:text-slate-800'}" id="nav-tab-intelligence">
          <span class="material-symbols-outlined text-[22px]" ${isIntelligence ? 'style="font-variation-settings: \'FILL\' 1;"' : ''}>insights</span>
          <span class="text-[11px] font-medium mt-0.5">Intelligence</span>
          ${isIntelligence ? '<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>' : ''}
        </a>

        <!-- 3. Profile Tab -->
        <a href="/profile" class="flex flex-col items-center justify-center min-w-[64px] min-h-[44px] transition-colors ${isProfile ? 'text-primary font-semibold' : 'text-slate-500 hover:text-slate-800'}" id="nav-tab-profile">
          <span class="material-symbols-outlined text-[22px]" ${isProfile ? 'style="font-variation-settings: \'FILL\' 1;"' : ''}>account_circle</span>
          <span class="text-[11px] font-medium mt-0.5">Profile</span>
          ${isProfile ? '<span class="w-1 h-1 rounded-full bg-primary mt-0.5"></span>' : ''}
        </a>
      </div>
    </nav>
  `;
}

// SCRIPTORA Bottom Navigation — Single-Line, Instagram-Style Selection
// All 5 destinations sit neatly on the exact same horizontal line.
// Zero protrusion, zero overlapping, smooth sliding selection indicator.

export const NAV_ITEMS = [
  { id: 'workspace', label: 'Workspace', icon: 'description', path: '/workspace' },
  { id: 'intelligence', label: 'Intelligence', icon: 'insights', path: '/intelligence' },
  { id: 'chat', label: 'AI Chat', icon: 'chat_bubble', path: '/chat' },
  { id: 'production', label: 'Production', icon: 'movie_creation', path: '/production' },
  { id: 'profile', label: 'Profile', icon: 'account_circle', path: '/profile' }
];

export function getActiveNavIndex(activeTab = 'workspace') {
  if (activeTab === 'workspace') return 0;
  if (activeTab === 'intelligence') return 1;
  if (activeTab === 'chat' || activeTab === 'ai-chat') return 2;
  if (activeTab === 'production' || activeTab === 'pre-production') return 3;
  if (activeTab === 'profile') return 4;
  return -1;
}

export function renderBottomNav(activeTab = 'workspace') {
  const activeIndex = getActiveNavIndex(activeTab);

  return `
    <nav class="fixed bottom-0 left-0 right-0 w-full z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-1px_6px_rgba(0,0,0,0.03)] select-none" style="padding-bottom: env(safe-area-inset-bottom, 0px);" data-global-bottom-nav="true" id="scriptora-bottom-nav">
      <div class="h-14 sm:h-16 max-w-md mx-auto relative px-1">
        
        <!-- Instagram-style Sliding Selection Indicator -->
        <div class="absolute bottom-1 left-1 right-1 grid grid-cols-5 pointer-events-none" aria-hidden="true">
          <div id="nav-sliding-track" class="col-span-1 flex justify-center transition-transform duration-200 ease-out" style="transform: translateX(${Math.max(0, activeIndex) * 100}%);">
            <span class="w-1 h-1 rounded-full bg-blue-600"></span>
          </div>
        </div>

        <!-- 5 Single-Line Equal Touch Targets -->
        <div class="grid grid-cols-5 h-full items-center relative z-10" id="nav-tabs-container">
          ${NAV_ITEMS.map((item, idx) => {
            const isActive = idx === activeIndex;
            return `
              <a href="${item.path}" 
                 class="nav-tab-item flex flex-col items-center justify-center h-full min-h-[48px] py-1 px-0.5 text-center transition-colors duration-150 select-none min-w-0 ${isActive ? 'text-blue-600 font-semibold' : 'text-slate-400 hover:text-slate-700 font-medium'}" 
                 id="nav-tab-${item.id}" 
                 data-tab-id="${item.id}"
                 data-tab-index="${idx}"
                 aria-label="${item.label}" 
                 title="${item.label}">
                <span class="material-symbols-outlined text-[22px] leading-none transition-all duration-150 shrink-0" ${isActive ? 'style="font-variation-settings: \'FILL\' 1;"' : ''}>
                  ${item.icon}
                </span>
                <span class="text-[10px] sm:text-[10.5px] leading-tight font-medium tracking-tight mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis max-w-full block select-none">
                  ${item.label}
                </span>
              </a>
            `;
          }).join('')}
        </div>

      </div>
    </nav>
  `;
}

export function updateBottomNav(activeTab = 'workspace') {
  const navEl = document.getElementById('scriptora-bottom-nav');
  if (!navEl) return false;

  const activeIndex = getActiveNavIndex(activeTab);
  const track = document.getElementById('nav-sliding-track');
  if (track && activeIndex >= 0) {
    track.style.transform = `translateX(${activeIndex * 100}%)`;
  }

  NAV_ITEMS.forEach((item, idx) => {
    const tabEl = document.getElementById(`nav-tab-${item.id}`);
    if (!tabEl) return;
    const isActive = idx === activeIndex;
    const iconEl = tabEl.querySelector('.material-symbols-outlined');

    if (isActive) {
      tabEl.classList.remove('text-slate-400', 'hover:text-slate-700', 'font-medium');
      tabEl.classList.add('text-blue-600', 'font-semibold');
      if (iconEl) iconEl.style.fontVariationSettings = "'FILL' 1";
    } else {
      tabEl.classList.remove('text-blue-600', 'font-semibold');
      tabEl.classList.add('text-slate-400', 'hover:text-slate-700', 'font-medium');
      if (iconEl) iconEl.style.fontVariationSettings = "";
    }
  });

  return true;
}

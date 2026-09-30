import { store } from '../state/store.js';
import { LOGO_URL } from '../utils/brand.js';

export function renderHeader(sectionTitle = 'Workspace', subtitle = 'Your writing space.') {
  const unreadCount = store.state.unreadNotifications;
  const userInitials = store.state.currentUser?.initials || 'JD';

  return `
    <header class="fixed top-0 w-full z-40 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-surface-container-high/60">
      <div class="h-14 px-4 flex items-center justify-between max-w-2xl mx-auto">
        <a href="/workspace" class="flex items-center gap-2.5 min-w-0 no-underline text-inherit cursor-pointer active:opacity-80 transition-opacity">
          <img src="${LOGO_URL}" onerror="this.onerror=null; this.src='./assets/scriptora-logo.png';" alt="Scriptora" class="w-8 h-8 object-contain shrink-0" />
          <div class="flex flex-col min-w-0 leading-tight">
            <span class="font-heading font-bold text-base tracking-tight text-on-surface">Scriptora</span>
            <span class="text-[11px] text-slate-500 font-medium truncate">${sectionTitle}</span>
          </div>
        </a>

        <div class="flex items-center gap-2">
          <!-- Notification Bell connecting to /notifications -->
          <a href="/notifications" class="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-on-surface hover:bg-slate-100 transition-colors" aria-label="Notifications" id="header-notif-btn">
            <span class="material-symbols-outlined text-[20px]">notifications</span>
            ${unreadCount > 0 ? `<span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white animate-pulse"></span>` : ''}
          </a>

          <!-- Profile Avatar connecting to /profile -->
          <a href="/profile" class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-xs shadow-xs hover:bg-blue-700 active:scale-95 transition-all no-underline" aria-label="User account" id="header-profile-btn">
            <span>${userInitials}</span>
          </a>
        </div>
      </div>
    </header>
  `;
}

import { store } from '../state/store.js';
import * as api from '../services/api.js';
import { showToast } from '../components/toast.js';
import { LOGO_URL } from '../utils/brand.js';
import { setupPopupToggle } from '../utils/popupPosition.js';

export function renderNotificationsScreen() {
  const userInitials = store.state.currentUser?.initials || 'JD';

  return `
    <div class="flex flex-col min-h-screen bg-surface w-full relative">
      <!-- Main Notifications Stream with contextual subnav bar -->
      <main class="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
        <div class="flex flex-col w-full max-w-2xl mx-auto px-4 pt-1 space-y-4 fade-in">
          
          <!-- Contextual Sub-bar: Back Navigation and Mark All Read Action -->
          <div class="flex items-center justify-between pb-2 border-b border-slate-200/70">
            <div class="flex items-center gap-2">
              <button aria-label="Go back" id="btn-back-notif" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors text-xs font-semibold shrink-0">
                <span class="material-symbols-outlined text-[17px]">arrow_back</span>
                <span>Back</span>
              </button>
              <span class="font-heading font-bold text-sm text-slate-800">Notifications Activity</span>
            </div>

            <button id="btn-mark-all-read" class="px-2.5 py-1 text-xs text-blue-600 font-semibold hover:bg-blue-50 rounded-lg active:scale-95 transition-all flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px]">done_all</span>
              <span>Mark all read</span>
            </button>
          </div>
          
          <!-- Top Meta Bar: Filter Tabs & State Simulator -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <button class="h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all" id="filter-all-btn">
                <span>All</span>
                <span class="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]" id="badge-all-count">5</span>
              </button>
              <button class="h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all" id="filter-unread-btn">
                <span>Unread</span>
                <span class="px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[10px]" id="badge-unread-count">3</span>
              </button>
            </div>

            <!-- State Simulator Dropdown -->
            <div class="relative">
              <button id="btn-toggle-sim" class="h-8 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs flex items-center gap-1 transition-colors">
                <span class="material-symbols-outlined text-[15px]">tune</span>
                <span>Simulate</span>
              </button>

              <div id="sim-menu-dropdown" class="hidden absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-lg p-1 z-40">
                <button class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between sim-opt" data-state="normal">
                  <span>Active Feed</span>
                </button>
                <button class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between sim-opt" data-state="loading">
                  <span>Loading Skeleton</span>
                </button>
                <button class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between sim-opt" data-state="empty">
                  <span>Empty (Caught Up)</span>
                </button>
                <button class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between sim-opt" data-state="error">
                  <span>Sync Error State</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Real-time sync feedback telemetry -->
          <div class="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-100/80 text-slate-600 text-xs">
            <div class="flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              <span class="text-[11px] font-medium">Scriptora Cloud Sync Engine Active</span>
            </div>
            <span class="text-[10px] font-mono text-slate-400">v4.2.1</span>
          </div>

          <!-- Notification Feed Container -->
          <div id="notif-feed-container" class="flex flex-col gap-4">
            <!-- Dynamic Content -->
          </div>

        </div>
      </main>
    </div>
  `;
}

export function attachNotificationsEvents(navigate) {
  // Back navigation: go back to previous screen
  const backBtn = document.getElementById('btn-back-notif');
  if (backBtn) {
    backBtn.onclick = () => {
      const prev = store.getPreviousRoute('/workspace');
      navigate(prev);
    };
  }

  let filter = 'all';
  let simState = 'normal';
  let notifications = [];

  async function loadData() {
    const feedContainer = document.getElementById('notif-feed-container');
    if (!feedContainer) return;

    if (simState === 'loading') {
      feedContainer.innerHTML = `
        <div class="space-y-3 animate-pulse">
          <div class="h-20 bg-slate-100 rounded-xl"></div>
          <div class="h-20 bg-slate-100 rounded-xl"></div>
          <div class="h-20 bg-slate-100 rounded-xl"></div>
        </div>
      `;
      return;
    }

    if (simState === 'error') {
      feedContainer.innerHTML = `
        <div class="p-6 bg-white border border-red-200 rounded-2xl flex flex-col items-center text-center gap-2">
          <span class="material-symbols-outlined text-3xl text-red-500">wifi_off</span>
          <h3 class="font-bold text-sm text-slate-900">Sync Connection Lost</h3>
          <p class="text-xs text-slate-500 max-w-xs">Unable to refresh notification stream. Please check network connection.</p>
          <button id="btn-retry-sync" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-xs hover:bg-blue-700">
            Retry Connection
          </button>
        </div>
      `;
      document.getElementById('btn-retry-sync')?.addEventListener('click', () => {
        simState = 'normal';
        loadData();
      });
      return;
    }

    const data = await api.getNotifications();
    notifications = data.notifications || [];

    if (simState === 'empty' || (filter === 'unread' && notifications.filter(n => n.unread).length === 0)) {
      feedContainer.innerHTML = `
        <div class="p-8 bg-white border border-slate-200/80 rounded-2xl flex flex-col items-center text-center gap-2">
          <div class="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">check_circle</span>
          </div>
          <h3 class="font-bold text-sm text-slate-900">You’re all caught up!</h3>
          <p class="text-xs text-slate-500 max-w-xs">No pending notifications or requests requiring your review.</p>
        </div>
      `;
      return;
    }

    const unreadCount = notifications.filter(n => n.unread).length;
    document.getElementById('badge-all-count').textContent = notifications.length;
    document.getElementById('badge-unread-count').textContent = unreadCount;
    store.setState({ unreadNotifications: unreadCount });

    let displayed = notifications;
    if (filter === 'unread') {
      displayed = displayed.filter(n => n.unread);
    }

    const todayItems = displayed.filter(n => n.group === 'today');
    const earlierItems = displayed.filter(n => n.group !== 'today');

    function renderGroup(title, items) {
      if (items.length === 0) return '';
      return `
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between px-1">
            <h2 class="text-xs font-bold text-slate-400 tracking-wider uppercase font-heading">${title}</h2>
          </div>
          <div class="flex flex-col gap-2">
            ${items.map(n => `
              <div class="notif-row relative flex items-start gap-3 p-3.5 rounded-xl bg-white border ${n.unread ? 'border-l-4 border-l-blue-600 border-slate-200/80 shadow-xs' : 'border-slate-200/60 opacity-80'} hover:shadow-sm transition-all cursor-pointer" data-id="${n.id}" data-route="${n.actionRoute}">
                <div class="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                  ${n.sender.startsWith('icon:') ? `<span class="material-symbols-outlined text-[18px] text-blue-600">${n.sender.replace('icon:', '')}</span>` : n.sender}
                </div>
                <div class="flex flex-col flex-1 min-w-0">
                  <div class="flex items-baseline justify-between gap-2">
                    <h3 class="text-xs font-bold text-slate-900 truncate">${n.title}</h3>
                    <span class="text-[10px] text-slate-400 shrink-0">${n.time}</span>
                  </div>
                  <p class="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">${n.body}</p>
                  <div class="mt-2 flex items-center gap-1.5 flex-wrap">
                    ${(n.tags || []).map(t => `<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">${t}</span>`).join('')}
                    <span class="text-blue-600 text-[11px] font-semibold ml-auto">${n.actionLabel || 'View →'}</span>
                  </div>
                </div>
                ${n.unread ? `<div class="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1"></div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    feedContainer.innerHTML = renderGroup('Today', todayItems) + renderGroup('Earlier', earlierItems);

    // Row clicks
    document.querySelectorAll('.notif-row').forEach(row => {
      row.onclick = async () => {
        const id = parseInt(row.getAttribute('data-id'));
        const route = row.getAttribute('data-route');
        await api.markNotificationRead(id);
        await store.refreshNotifications();
        if (route) {
          navigate(route);
        } else {
          loadData();
        }
      };
    });
  }

  loadData();

  // Filter Buttons
  const filterAll = document.getElementById('filter-all-btn');
  const filterUnread = document.getElementById('filter-unread-btn');

  if (filterAll) {
    filterAll.onclick = () => {
      filter = 'all';
      filterAll.className = "h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all";
      filterUnread.className = "h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all";
      loadData();
    };
  }

  if (filterUnread) {
    filterUnread.onclick = () => {
      filter = 'unread';
      filterUnread.className = "h-8 px-3 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all";
      filterAll.className = "h-8 px-3 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-all";
      loadData();
    };
  }

  // Mark all read
  const markAllBtn = document.getElementById('btn-mark-all-read');
  if (markAllBtn) {
    markAllBtn.onclick = async () => {
      await api.markAllNotificationsRead();
      await store.refreshNotifications();
      showToast('All notifications marked as read');
      loadData();
    };
  }

  // Simulator Menu
  const simToggle = document.getElementById('btn-toggle-sim');
  const simMenu = document.getElementById('sim-menu-dropdown');
  let simMenuHandler = null;
  if (simToggle && simMenu) {
    simMenuHandler = setupPopupToggle(simToggle, simMenu, { placement: 'bottom-end' });
  }

  document.querySelectorAll('.sim-opt').forEach(opt => {
    opt.onclick = () => {
      simState = opt.getAttribute('data-state');
      simMenuHandler?.close();
      loadData();
      showToast(`Simulating ${simState} state`);
    };
  });
}

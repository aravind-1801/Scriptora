import { store } from './state/store.js';
import { renderHeader } from './components/header.js';
import { renderBottomNav, updateBottomNav } from './components/bottomNav.js';
import { renderAuthScreen, attachAuthEvents } from './screens/auth.js';
import { renderWelcomeScreen, attachWelcomeEvents } from './screens/welcome.js';
import { renderWorkspaceScreen, attachWorkspaceEvents } from './screens/workspace.js';
import { renderEditorScreen, attachEditorEvents } from './screens/editor.js';
import { renderIntelligenceSelectorScreen, attachIntelligenceSelectorEvents } from './screens/intelligenceSelector.js';
import { renderIntelligenceContextScreen, attachIntelligenceContextEvents } from './screens/intelligenceContext.js';
import { renderIntelligenceDashboardScreen, attachIntelligenceDashboardEvents } from './screens/intelligenceDashboard.js';
import { renderIndividualAnalysisSelectorScreen, attachIndividualAnalysisSelectorEvents } from './screens/individualAnalysisSelector.js';
import { renderIndividualAnalysisScreen, attachIndividualAnalysisEvents } from './screens/individualAnalysis.js';
import { renderProfileScreen, attachProfileEvents } from './screens/profile.js';
import { renderCollaboratorsScreen, attachCollaboratorsEvents } from './screens/collaborators.js';
import { renderNotificationsScreen, attachNotificationsEvents } from './screens/notifications.js';
import { renderProductionScreen, attachProductionEvents } from './screens/production.js';
import { renderAiChatScreen, attachAiChatEvents } from './screens/aiChat.js';
import { renderBreakdownScreen, attachBreakdownEvents } from './screens/production/breakdown.js';
import { renderCallSheetsScreen, attachCallSheetsEvents } from './screens/production/callSheets.js';
import { renderDialogueSidesScreen, attachDialogueSidesEvents } from './screens/production/dialogueSides.js';
import { renderScheduleScreen, attachScheduleEvents } from './screens/production/schedule.js';
import { renderStoryboardScreen, attachStoryboardEvents } from './screens/production/storyboard.js';
import { unlockBodyScroll, closeModal } from './utils/popupPosition.js';


class Router {
  constructor() {
    this.appEl = null;
    this.currentPath = null;
    this.isFullScreen = false;
    this.isNavigatingBack = false;
    this.backHandlers = [];
    this.scrollPositions = {};
  }

  getBasePath() {
    const p = window.location.pathname;
    if (p.toLowerCase().startsWith('/scriptora')) {
      return '/Scriptora';
    }
    return '';
  }

  getCurrentLocation() {
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      return window.location.hash.slice(1);
    }
    return window.location.pathname + window.location.search;
  }

  normalizePath(path) {
    if (!path) return '/';
    const base = this.getBasePath();
    let p = path;
    if (base && p.toLowerCase().startsWith(base.toLowerCase())) {
      p = p.slice(base.length) || '/';
    }
    // Remove query and hash for path-level comparison
    const qIndex = p.indexOf('?');
    const hIndex = p.indexOf('#');
    let cutIndex = p.length;
    if (qIndex !== -1) cutIndex = Math.min(cutIndex, qIndex);
    if (hIndex !== -1) cutIndex = Math.min(cutIndex, hIndex);
    const pathOnly = p.slice(0, cutIndex).replace(/\/+$/, '') || '/';
    return pathOnly.startsWith('/') ? pathOnly : '/' + pathOnly;
  }

  getRouteFallback(path) {
    const norm = this.normalizePath(path);
    if (norm.startsWith('/production/') && norm !== '/production') {
      return '/production';
    }
    if (norm === '/production') {
      return '/workspace';
    }
    if (norm.startsWith('/intelligence/analysis/')) {
      return '/intelligence/analysis';
    }
    if (norm === '/intelligence/analysis' || norm === '/intelligence/analysis/select') {
      return '/intelligence/dashboard';
    }
    if (norm === '/intelligence/dashboard' || norm === '/intelligence/overview') {
      return '/intelligence/context';
    }
    if (norm === '/intelligence/context') {
      return '/intelligence';
    }
    if (norm === '/intelligence' || norm === '/intelligence/select') {
      return '/workspace';
    }
    if (norm === '/profile/collaborators') {
      return '/profile';
    }
    if (norm === '/profile' || norm === '/notifications' || norm === '/chat' || norm.startsWith('/editor')) {
      return '/workspace';
    }
    return '/workspace';
  }

  getRouteLabel(path) {
    const norm = this.normalizePath(path);
    if (norm === '/workspace') return 'Workspace';
    if (norm === '/production') return 'Production';
    if (norm.startsWith('/production/schedule')) return 'Schedule';
    if (norm.startsWith('/production/breakdown')) return 'Breakdown';
    if (norm.startsWith('/production/call-sheets')) return 'Call Sheets';
    if (norm.startsWith('/production/dialogue-sides')) return 'Dialogue Sides';
    if (norm.startsWith('/production/storyboard')) return 'Storyboard';
    if (norm.startsWith('/editor')) return 'Editor';
    if (norm === '/intelligence') return 'Intelligence';
    if (norm === '/intelligence/context') return 'Context';
    if (norm === '/intelligence/dashboard') return 'Analysis';
    if (norm.startsWith('/intelligence/analysis')) return 'Vectors';
    if (norm === '/profile') return 'Profile';
    if (norm === '/profile/collaborators') return 'Collaborators';
    if (norm === '/notifications') return 'Notifications';
    if (norm === '/chat') return 'AI Chat';
    return 'Back';
  }

  registerBackHandler(handler) {
    if (typeof handler !== 'function') return () => {};
    this.backHandlers.push(handler);
    return () => {
      const idx = this.backHandlers.indexOf(handler);
      if (idx !== -1) this.backHandlers.splice(idx, 1);
    };
  }

  triggerBackHandlers() {
    // 1. Explicitly registered back handlers (e.g. Day Modal in Schedule, Scene Edit modes, Editor sub-views)
    for (let i = this.backHandlers.length - 1; i >= 0; i--) {
      const handler = this.backHandlers[i];
      try {
        const handled = handler();
        if (handled) return true;
      } catch (err) {
        console.error("Back handler error:", err);
      }
    }

    // 2. Open modals in portal or page
    const openModals = Array.from(document.querySelectorAll(
      '#scriptora-modal-portal .scriptora-modal-overlay:not(.hidden), .scriptora-modal-overlay:not(.hidden)'
    ));
    if (openModals.length > 0) {
      const topmostModal = openModals[openModals.length - 1];
      const closeBtn = topmostModal.querySelector(
        '[data-modal-close], #modal-day-close, #modal-day-done, .close-setting-modal, .close-profile-modal, #action-modal-cancel, #new-script-cancel, [id$="-cancel"], [id$="-close"]'
      );
      if (closeBtn) {
        closeBtn.click();
      } else {
        closeModal(topmostModal);
      }
      return true;
    }

    // 3. Visible popups, contextual dropdowns, and overlays
    const visiblePopups = Array.from(document.querySelectorAll(
      '.scriptora-popup:not(.hidden), [data-scriptora-popup]:not(.hidden), [role="menu"]:not(.hidden), #quick-add-menu:not(.hidden)'
    ));
    if (visiblePopups.length > 0) {
      const topmost = visiblePopups[visiblePopups.length - 1];
      topmost.classList.add('hidden');
      return true;
    }

    return false;
  }

  peekPreviousRoute() {
    return store.peekPreviousRoute(null);
  }

  back(fallback = null) {
    // 1. Check overlays / sub-views first
    if (this.triggerBackHandlers()) {
      return;
    }

    // 2. Pop the immediate preceding route from navigation journey
    let prev = store.popHistory();
    // Drop duplicates matching current path
    while (prev && this.normalizePath(prev) === this.normalizePath(this.currentPath)) {
      prev = store.popHistory();
    }

    const target = prev || fallback || this.getRouteFallback(this.currentPath);
    this.isNavigatingBack = true;
    this.navigate(target, false);
    this.isNavigatingBack = false;
  }

  ensureShell() {
    if (!this.appEl) return;
    let shell = document.getElementById('scriptora-app-shell');
    if (!shell) {
      this.appEl.innerHTML = `
        <div id="scriptora-app-shell" class="flex flex-col min-h-screen w-full relative bg-surface select-text">
          <!-- Persistent Global Header Container -->
          <div id="scriptora-global-header" class="fixed top-0 left-0 right-0 z-40 transition-all duration-200"></div>

          <!-- Dynamic Screen Content Area -->
          <main id="scriptora-global-content" class="flex-1 w-full min-h-screen flex flex-col relative transition-opacity duration-200"></main>

          <!-- Persistent Global Bottom Navigation Container -->
          <div id="scriptora-global-nav" class="fixed bottom-0 left-0 right-0 z-40 transition-all duration-200 overflow-visible"></div>
        </div>
      `;
    }
  }

  init(mountSelector = '#app') {
    this.appEl = document.querySelector(mountSelector);
    if (!this.appEl) {
      console.error(`Mount element ${mountSelector} not found.`);
      return;
    }

    // Ensure application shell is ready
    this.ensureShell();
    window.scriptoraRouter = this;

    // Global fullscreen handler for focused writing modes (e.g. Focus Mode)
    window.setScriptoraFullScreen = (isFull) => {
      this.isFullScreen = !!isFull;
      const headerSlot = document.getElementById('scriptora-global-header');
      const navSlot = document.getElementById('scriptora-global-nav');
      if (headerSlot) headerSlot.classList.toggle('hidden', !!isFull);
      if (navSlot) navSlot.classList.toggle('hidden', !!isFull);
    };

    // Intercept clicks on local links and back buttons
    document.body.addEventListener('click', (e) => {
      // 1. Back button click interception
      const backTrigger = e.target.closest(
        '[data-scriptora-back], #prod-subnav-back, #editor-back-btn, #btn-back-notif, #analysis-back-btn, #collab-back-btn, #profile-back-to-editor-btn, #profile-back-btn, #production-back-btn, #chat-back-btn, #intelligence-selector-back-btn'
      );
      if (backTrigger) {
        e.preventDefault();
        e.stopPropagation();
        const fallback = backTrigger.getAttribute('data-back-fallback') || backTrigger.getAttribute('href') || null;
        this.back(fallback);
        return;
      }

      // 2. Local link navigation interception
      const anchor = e.target.closest('a');
      if (
        anchor &&
        anchor.href &&
        anchor.origin === window.location.origin &&
        !anchor.hasAttribute('download') &&
        anchor.getAttribute('target') !== '_blank' &&
        !anchor.getAttribute('rel')?.includes('external')
      ) {
        const url = new URL(anchor.href);
        const path = url.pathname + url.search + url.hash;
        if (!path.startsWith('/api')) {
          e.preventDefault();
          this.navigate(path);
        }
      }
    });

    // Listen to browser Back/Forward & hash changes
    window.addEventListener('popstate', (e) => {
      if (typeof window.__scriptoraEditorPopstate === 'function') {
        const handled = window.__scriptoraEditorPopstate(e);
        if (handled) return;
      }

      // If an overlay or modal or dropdown was open, close it instead of leaving!
      if (this.triggerBackHandlers()) {
        const cur = this.getCurrentLocation();
        window.history.pushState({ scriptoraPath: cur }, '', cur);
        return;
      }

      // Normal browser popstate
      store.popHistory();
      this.isNavigatingBack = true;
      this.resolve(this.getCurrentLocation());
      this.isNavigatingBack = false;
    });

    window.addEventListener('hashchange', () => {
      this.resolve(this.getCurrentLocation());
    });

    // Initial resolution
    this.resolve(this.getCurrentLocation());
  }

  navigate(path, replace = false) {
    unlockBodyScroll();
    // Record current scroll position
    if (this.currentPath) {
      this.scrollPositions[this.normalizePath(this.currentPath)] = window.scrollY;
    }

    // Only record into history stack for normal forward navigation
    if (!this.isNavigatingBack && !replace && this.currentPath) {
      const normCurrent = this.normalizePath(this.currentPath);
      const normTarget = this.normalizePath(path);
      if (normCurrent !== normTarget) {
        store.pushHistory(this.currentPath);
      }
    }

    const base = this.getBasePath();
    const cleanPath = (base && path.toLowerCase().startsWith(base.toLowerCase()))
      ? path.slice(base.length) || '/'
      : path;
    const fullTarget = (base && !path.startsWith(base))
      ? `${base}${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}`
      : path;

    if (replace) {
      window.history.replaceState({ scriptoraPath: cleanPath }, '', fullTarget);
    } else {
      window.history.pushState({ scriptoraPath: cleanPath }, '', fullTarget);
    }

    this.resolve(cleanPath);
  }

  resolve(fullPath) {
    const firstQ = fullPath.indexOf('?');
    const pathPart = firstQ === -1 ? fullPath : fullPath.slice(0, firstQ);
    const queryPart = firstQ === -1 ? '' : fullPath.slice(firstQ + 1);
    let path = pathPart.replace(/\/+$/, '') || '/';
    
    // Strip repository subpath if present (e.g. /Scriptora)
    const base = this.getBasePath();
    if (base && path.toLowerCase().startsWith(base.toLowerCase())) {
      path = path.slice(base.length) || '/';
    }
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    const query = new URLSearchParams(queryPart || '');
    this.currentPath = fullPath;

    // Manage viewport and stationary header mode for editor
    if (path.startsWith('/editor')) {
      document.body.classList.add('editor-mode');
      document.documentElement.classList.add('editor-mode');
    } else {
      document.body.classList.remove('editor-mode');
      document.documentElement.classList.remove('editor-mode');
    }

    // Check authentication for protected routes
    const isAuth = !!store.state.currentUser;
    const publicPaths = ['/welcome', '/auth'];

    if (!isAuth && !publicPaths.includes(path)) {
      this.navigate('/auth', true);
      return;
    }

    if (isAuth && path === '/auth') {
      this.navigate('/workspace', true);
      return;
    }

    // Match routes
    if (path === '/') {
      if (isAuth) {
        this.navigate('/workspace', true);
      } else {
        this.navigate('/welcome', true);
      }
      return;
    }

    if (path === '/welcome') {
      this.render(renderWelcomeScreen(), () => attachWelcomeEvents(this.navigate.bind(this)), { isPublic: true });
      return;
    }

    if (path === '/auth') {
      this.render(renderAuthScreen(), () => attachAuthEvents(this.navigate.bind(this)), { isPublic: true });
      return;
    }

    if (path === '/workspace') {
      this.render(
        renderWorkspaceScreen(),
        () => attachWorkspaceEvents(this.navigate.bind(this)),
        { activeTab: 'workspace', sectionTitle: 'Workspace', subtitle: 'Your writing space.' }
      );
      return;
    }

    if (path === '/editor') {
      const activeId = store.state.selectedScriptId || 'chronicles-of-dust';
      const sceneParam = query.get('scene');
      this.navigate(`/editor/${activeId}${sceneParam ? `?scene=${sceneParam}` : ''}`, true);
      return;
    }

    if (path.startsWith('/editor/')) {
      const scriptId = path.split('/')[2];
      const targetScene = query.get('scene');
      store.setState({ selectedScriptId: scriptId });
      const currentScript = store.state.scripts?.find(s => s.id === scriptId) || { title: 'Untitled Screenplay' };
      this.render(
        renderEditorScreen(scriptId, targetScene),
        () => attachEditorEvents(scriptId, this.navigate.bind(this)),
        { activeTab: 'workspace', sectionTitle: 'Editor', subtitle: currentScript.title || 'Screenplay Studio', hideHeader: true, hideNav: true }
      );
      return;
    }

    // Strict Intelligence flow: /intelligence ALWAYS enters at Script Selector
    if (path === '/intelligence' || path === '/intelligence/select') {
      this.render(
        renderIntelligenceSelectorScreen(),
        () => attachIntelligenceSelectorEvents(this.navigate.bind(this)),
        { activeTab: 'intelligence', sectionTitle: 'Intelligence', subtitle: 'Script Selector' }
      );
      return;
    }

    if (path === '/intelligence/context') {
      this.render(
        renderIntelligenceContextScreen(),
        () => attachIntelligenceContextEvents(this.navigate.bind(this)),
        { activeTab: 'intelligence', sectionTitle: 'Intelligence', subtitle: 'Context Calibration' }
      );
      return;
    }

    if (path === '/intelligence/dashboard' || path === '/intelligence/overview') {
      this.render(
        renderIntelligenceDashboardScreen(),
        () => attachIntelligenceDashboardEvents(this.navigate.bind(this)),
        { activeTab: 'intelligence', sectionTitle: 'Intelligence', subtitle: 'Script Analysis' }
      );
      return;
    }

    if (path === '/intelligence/analysis' || path === '/intelligence/analysis/select') {
      this.render(
        renderIndividualAnalysisSelectorScreen(),
        () => attachIndividualAnalysisSelectorEvents(this.navigate.bind(this)),
        { activeTab: 'intelligence', sectionTitle: 'Intelligence', subtitle: 'Analyse Individually' }
      );
      return;
    }

    if (path.startsWith('/intelligence/analysis/')) {
      const type = path.split('/')[3] || 'pacing';
      const fromParam = query.get('from');
      const scriptParam = query.get('scriptId');
      this.render(
        renderIndividualAnalysisScreen(type, fromParam, scriptParam),
        () => attachIndividualAnalysisEvents(type, this.navigate.bind(this), fromParam, scriptParam),
        { activeTab: 'intelligence', sectionTitle: 'Intelligence', subtitle: 'Vector Analysis' }
      );
      return;
    }

    if (path === '/profile') {
      const fromParam = query.get('from');
      const scriptParam = query.get('scriptId');
      this.render(
        renderProfileScreen(fromParam, scriptParam),
        () => attachProfileEvents(this.navigate.bind(this), fromParam, scriptParam),
        { activeTab: 'profile', sectionTitle: 'Profile', subtitle: 'Account & preferences.' }
      );
      return;
    }

    if (path === '/profile/collaborators') {
      const fromParam = query.get('from');
      const scriptParam = query.get('scriptId');
      this.render(
        renderCollaboratorsScreen(fromParam, scriptParam),
        () => attachCollaboratorsEvents(this.navigate.bind(this), fromParam, scriptParam),
        { activeTab: 'profile', sectionTitle: 'Profile', subtitle: 'Collaborators' }
      );
      return;
    }

    if (path === '/notifications') {
      this.render(
        renderNotificationsScreen(),
        () => attachNotificationsEvents(this.navigate.bind(this)),
        { activeTab: 'workspace', sectionTitle: 'Notifications', subtitle: 'Activity Stream' }
      );
      return;
    }

    // 4. PRE-PRODUCTION (Native Production Tools entry & Dedicated Screens)
    if (path === '/production' || path === '/pre-production') {
      const fromParam = query.get('from');
      const scriptParam = query.get('scriptId');
      this.render(
        renderProductionScreen(fromParam, scriptParam),
        () => attachProductionEvents(this.navigate.bind(this), fromParam, scriptParam),
        { activeTab: 'production', sectionTitle: 'Pre-Production', subtitle: 'Production Workspace & Tools' }
      );
      return;
    }

    // 4.1 Script Breakdown Dedicated Screen
    if (path === '/production/breakdown') {
      const fromParam = query.get('from');
      const scriptParam = query.get('scriptId');
      this.render(
        renderBreakdownScreen(fromParam, scriptParam),
        () => attachBreakdownEvents(this.navigate.bind(this), fromParam, scriptParam),
        { activeTab: 'production', sectionTitle: 'Pre-Production', subtitle: 'Script Breakdown Workspace' }
      );
      return;
    }

    // 4.2 Scene Hub Redirect -> Shooting Schedule with integrated scene details
    const sceneMatch = path.match(/^\/production\/scenes(?:\/([a-zA-Z0-9_-]+))?$/);
    if (sceneMatch) {
      const fromParam = query.get('from');
      const scriptParam = query.get('scriptId') || 'chronicles-of-dust';
      const sceneId = sceneMatch[1] || query.get('sceneId');
      const dest = `/production/schedule?scriptId=${scriptParam}${sceneId ? `&sceneId=${sceneId}` : ''}${fromParam ? `&from=${encodeURIComponent(fromParam)}` : ''}`;
      this.navigate(dest, false);
      return;
    }

    // 4.3 Call Sheets Dedicated Screen
    const callSheetMatch = path.match(/^\/production\/call-sheets(?:\/([a-zA-Z0-9_-]+))?$/);
    if (callSheetMatch) {
      const fromParam = query.get('from');
      const scriptParam = query.get('scriptId');
      const csId = callSheetMatch[1] || query.get('csId');
      this.render(
        renderCallSheetsScreen(fromParam, scriptParam, csId),
        () => attachCallSheetsEvents(this.navigate.bind(this), fromParam, scriptParam, csId),
        { activeTab: 'production', sectionTitle: 'Pre-Production', subtitle: csId ? 'Call Sheet Inspector' : 'Call Sheets Workspace' }
      );
      return;
    }

    // 4.4 Dialogue Sheets & Actor Sides Dedicated Screen
    if (path === '/production/dialogue-sides' || path === '/production/dialogue-sheets' || path === '/production/sides') {
      const fromParam = query.get('from');
      const scriptParam = query.get('scriptId');
      this.render(
        renderDialogueSidesScreen(fromParam, scriptParam),
        () => attachDialogueSidesEvents(this.navigate.bind(this), fromParam, scriptParam),
        { activeTab: 'production', sectionTitle: 'Pre-Production', subtitle: 'Dialogue Sheets & Actor Sides' }
      );
      return;
    }

    // 4.5 Shooting Schedule & Stripboard Dedicated Screen
    if (path === '/production/schedule' || path === '/production/stripboard') {
      const fromParam = query.get('from');
      const scriptParam = query.get('scriptId');
      this.render(
        renderScheduleScreen(fromParam, scriptParam),
        () => attachScheduleEvents(this.navigate.bind(this), fromParam, scriptParam),
        { activeTab: 'production', sectionTitle: 'Pre-Production', subtitle: 'Master Shooting Schedule & Stripboard' }
      );
      return;
    }

    // 4.6 Storyboard Studio (Visual Planning)
    if (path === '/production/storyboard' || path === '/production/storyboards') {
      const fromParam = query.get('from');
      const scriptParam = query.get('scriptId');
      this.render(
        renderStoryboardScreen(fromParam, scriptParam),
        () => attachStoryboardEvents(this.navigate.bind(this), fromParam, scriptParam),
        { activeTab: 'production', sectionTitle: 'Pre-Production', subtitle: 'Storyboard Studio' }
      );
      return;
    }

    // 3. AI CHAT (Universal Assistant)
    if (path === '/chat' || path === '/ai-chat' || path === '/writer-room' || path === '/ai-writer-room') {
      this.render(
        renderAiChatScreen(),
        () => attachAiChatEvents(this.navigate.bind(this)),
        { activeTab: 'chat', sectionTitle: 'AI Chat', subtitle: 'Universal Assistant' }
      );
      return;
    }

    // 404 fallback
    this.renderNotFound(path);
  }

  render(html, attachEventsFn, options = {}) {
    this.ensureShell();
    const headerSlot = document.getElementById('scriptora-global-header');
    const contentSlot = document.getElementById('scriptora-global-content');
    const navSlot = document.getElementById('scriptora-global-nav');

    const isPublic = !!options.isPublic;
    const hideHeader = !!options.hideHeader;
    const hideNav = !!options.hideNav;
    const activeTab = options.activeTab || 'workspace';
    const sectionTitle = options.sectionTitle || 'Scriptora';
    const subtitle = options.subtitle || '';

    if (isPublic) {
      if (headerSlot) headerSlot.classList.add('hidden');
      if (navSlot) navSlot.classList.add('hidden');
    } else {
      if (headerSlot && !this.isFullScreen) {
        if (hideHeader) {
          headerSlot.classList.add('hidden');
          headerSlot.innerHTML = '';
        } else {
          headerSlot.classList.remove('hidden');
          headerSlot.innerHTML = renderHeader(sectionTitle, subtitle);
        }
      }
      if (navSlot && !this.isFullScreen) {
        if (hideNav) {
          navSlot.classList.add('hidden');
          navSlot.innerHTML = '';
        } else {
          navSlot.classList.remove('hidden');
          if (!updateBottomNav(activeTab)) {
            navSlot.innerHTML = renderBottomNav(activeTab);
          }
        }
      }
    }

    if (contentSlot) {
      // Clear any portaled modals from previous screen and reset scroll lock
      const modalPortal = document.getElementById('scriptora-modal-portal');
      if (modalPortal) {
        modalPortal.innerHTML = '';
      }
      unlockBodyScroll();

      // Remove any duplicate header or bottom navigation tags from screen template
      let cleanHtml = html || '';
      cleanHtml = cleanHtml.replace(/<header[^>]*data-global-header="true"[^>]*>[\s\S]*?<\/header>/gi, '');
      cleanHtml = cleanHtml.replace(/<header\s+class="fixed\s+top-0\s+w-full\s+z-40\s+pt-safe\s+bg-surface[^>]*>[\s\S]*?<\/header>/gi, '');
      cleanHtml = cleanHtml.replace(/<nav[^>]*data-global-bottom-nav="true"[^>]*>[\s\S]*?<\/nav>/gi, '');
      cleanHtml = cleanHtml.replace(/<nav\s+class="fixed\s+bottom-0[^>]*>[\s\S]*?<\/nav>/gi, '');

      contentSlot.innerHTML = cleanHtml;
      const targetNorm = this.normalizePath(this.currentPath);
      const savedScroll = this.scrollPositions[targetNorm];
      if (this.isNavigatingBack && savedScroll !== undefined) {
        setTimeout(() => {
          window.scrollTo({ top: savedScroll, behavior: 'instant' });
        }, 10);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }

      // Trigger smooth inward transition
      contentSlot.classList.remove('fade-in');
      void contentSlot.offsetWidth; // Force reflow
      contentSlot.classList.add('fade-in');

      if (typeof attachEventsFn === 'function') {
        try {
          attachEventsFn();
        } catch (err) {
          console.error("Error attaching screen events:", err);
        }
      }
    }
  }

  renderNotFound(path) {
    this.render(
      `
      <div class="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-surface pt-16 pb-24">
        <div class="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
          <span class="material-symbols-outlined text-[32px]">sentiment_dissatisfied</span>
        </div>
        <h1 class="font-heading font-bold text-xl text-slate-900 mb-1">Page Not Found</h1>
        <p class="text-xs text-slate-500 mb-6 max-w-xs">The route <code class="font-mono bg-slate-100 px-1 py-0.5 rounded text-blue-600">${path}</code> does not exist.</p>
        <button id="notfound-home" class="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-xs shadow-xs hover:bg-blue-700 transition-colors">
          Return to Workspace
        </button>
      </div>
      `,
      () => {
        const btn = document.getElementById('notfound-home');
        if (btn) btn.onclick = () => this.navigate('/workspace');
      },
      { activeTab: 'workspace', sectionTitle: 'Page Not Found', subtitle: '404' }
    );
  }
}

export const router = new Router();

import { store } from './state/store.js';
import { renderHeader } from './components/header.js';
import { renderBottomNav } from './components/bottomNav.js';
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
import { renderScenesScreen, attachScenesEvents } from './screens/production/scenes.js';
import { renderCallSheetsScreen, attachCallSheetsEvents } from './screens/production/callSheets.js';
import { renderDialogueSidesScreen, attachDialogueSidesEvents } from './screens/production/dialogueSides.js';
import { renderScheduleScreen, attachScheduleEvents } from './screens/production/schedule.js';
import { renderDirectoryScreen, attachDirectoryEvents } from './screens/production/directory.js';
import { renderDocumentsScreen, attachDocumentsEvents } from './screens/production/documents.js';
import { renderChangesScreen, attachChangesEvents } from './screens/production/changes.js';
import { renderHistoryScreen, attachHistoryEvents } from './screens/production/history.js';
import { renderReadinessScreen, attachReadinessEvents } from './screens/production/readiness.js';
import { renderStoryboardScreen, attachStoryboardEvents } from './screens/production/storyboard.js';


class Router {
  constructor() {
    this.appEl = null;
    this.currentPath = null;
    this.isFullScreen = false;
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

    // Global fullscreen handler for focused writing modes (e.g. Focus Mode)
    window.setScriptoraFullScreen = (isFull) => {
      this.isFullScreen = !!isFull;
      const headerSlot = document.getElementById('scriptora-global-header');
      const navSlot = document.getElementById('scriptora-global-nav');
      if (headerSlot) headerSlot.classList.toggle('hidden', !!isFull);
      if (navSlot) navSlot.classList.toggle('hidden', !!isFull);
    };

    // Intercept clicks on local links
    document.body.addEventListener('click', (e) => {
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
      this.resolve(this.getCurrentLocation());
    });
    window.addEventListener('hashchange', () => {
      this.resolve(this.getCurrentLocation());
    });

    // Initial resolution
    this.resolve(this.getCurrentLocation());
  }

  navigate(path, replace = false) {
    if (this.currentPath) {
      store.pushHistory(this.currentPath);
    }

    const base = this.getBasePath();
    const cleanPath = (base && path.toLowerCase().startsWith(base.toLowerCase()))
      ? path.slice(base.length) || '/'
      : path;
    const fullTarget = (base && !path.startsWith(base))
      ? `${base}${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}`
      : path;

    if (replace) {
      window.history.replaceState(null, '', fullTarget);
    } else {
      window.history.pushState(null, '', fullTarget);
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
        { activeTab: 'workspace', sectionTitle: 'Editor', subtitle: currentScript.title || 'Screenplay Studio', hideHeader: true }
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

    // 4.2 Scene Hub & Scene Details Dedicated Screen
    const sceneMatch = path.match(/^\/production\/scenes(?:\/([a-zA-Z0-9_-]+))?$/);
    if (sceneMatch) {
      const fromParam = query.get('from');
      const scriptParam = query.get('scriptId');
      const sceneId = sceneMatch[1] || query.get('sceneId');
      this.render(
        renderScenesScreen(fromParam, scriptParam, sceneId),
        () => attachScenesEvents(this.navigate.bind(this), fromParam, scriptParam, sceneId),
        { activeTab: 'production', sectionTitle: 'Pre-Production', subtitle: sceneId ? 'Scene Details & Logistics' : 'Scene Hub & Logistics' }
      );
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

    // 4.6 Production Directory Dedicated Screen
    if (path === '/production/directory' || path === '/production/resources') {
      const fromParam = query.get('from');
      const scriptParam = query.get('scriptId');
      this.render(
        renderDirectoryScreen(fromParam, scriptParam),
        () => attachDirectoryEvents(this.navigate.bind(this), fromParam, scriptParam),
        { activeTab: 'production', sectionTitle: 'Pre-Production', subtitle: 'Production Resource Directory' }
      );
      return;
    }

    // 4.7 Documents Dedicated Screen
    const docMatch = path.match(/^\/production\/documents(?:\/([a-zA-Z0-9_-]+))?$/);
    if (docMatch) {
      const fromParam = query.get('from');
      const scriptParam = query.get('scriptId');
      const docId = docMatch[1] || query.get('docId');
      this.render(
        renderDocumentsScreen(fromParam, scriptParam, docId),
        () => attachDocumentsEvents(this.navigate.bind(this), fromParam, scriptParam, docId),
        { activeTab: 'production', sectionTitle: 'Pre-Production', subtitle: docId ? 'Production Document Viewer' : 'Production Documents Workspace' }
      );
      return;
    }

    // 4.8 Production Changes & Approvals Dedicated Screen
    if (path === '/production/changes' || path === '/production/proposals') {
      const fromParam = query.get('from');
      const scriptParam = query.get('scriptId');
      this.render(
        renderChangesScreen(fromParam, scriptParam),
        () => attachChangesEvents(this.navigate.bind(this), fromParam, scriptParam),
        { activeTab: 'production', sectionTitle: 'Pre-Production', subtitle: 'Production Change Proposals & Approvals' }
      );
      return;
    }

    // 4.9 Unified History & Audit Dedicated Screen
    if (path === '/production/history' || path === '/production/timeline') {
      const fromParam = query.get('from');
      const scriptParam = query.get('scriptId');
      this.render(
        renderHistoryScreen(fromParam, scriptParam),
        () => attachHistoryEvents(this.navigate.bind(this), fromParam, scriptParam),
        { activeTab: 'production', sectionTitle: 'Pre-Production', subtitle: 'Production Version History & Audit Trail' }
      );
      return;
    }

    // 4.10 Guided Readiness & Validation Dedicated Screen
    if (path === '/production/readiness' || path === '/production/validation') {
      const fromParam = query.get('from');
      const scriptParam = query.get('scriptId');
      this.render(
        renderReadinessScreen(fromParam, scriptParam),
        () => attachReadinessEvents(this.navigate.bind(this), fromParam, scriptParam),
        { activeTab: 'production', sectionTitle: 'Pre-Production', subtitle: 'Pre-Flight Readiness & Validation' }
      );
      return;
    }

    // 4.11 Storyboard Studio (Discovery / Prompt 3 Staged)
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
        navSlot.classList.remove('hidden');
        navSlot.innerHTML = renderBottomNav(activeTab);
      }
    }

    if (contentSlot) {
      // Remove any duplicate header or bottom navigation tags from screen template
      let cleanHtml = html || '';
      cleanHtml = cleanHtml.replace(/<header[^>]*data-global-header="true"[^>]*>[\s\S]*?<\/header>/gi, '');
      cleanHtml = cleanHtml.replace(/<header\s+class="fixed\s+top-0\s+w-full\s+z-40\s+pt-safe\s+bg-surface[^>]*>[\s\S]*?<\/header>/gi, '');
      cleanHtml = cleanHtml.replace(/<nav[^>]*data-global-bottom-nav="true"[^>]*>[\s\S]*?<\/nav>/gi, '');
      cleanHtml = cleanHtml.replace(/<nav\s+class="fixed\s+bottom-0\s+w-full\s+z-40\s+pb-safe\s+bg-surface[^>]*>[\s\S]*?<\/nav>/gi, '');

      contentSlot.innerHTML = cleanHtml;
      window.scrollTo({ top: 0, behavior: 'instant' });

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

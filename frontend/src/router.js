import { store } from './state/store.js';
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

class Router {
  constructor() {
    this.appEl = null;
    this.currentPath = null;
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

  init(mountSelector = '#app') {
    this.appEl = document.querySelector(mountSelector);
    if (!this.appEl) {
      console.error(`Mount element ${mountSelector} not found.`);
      return;
    }

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
    const [pathPart, queryPart] = fullPath.split('?');
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
      this.render(renderWelcomeScreen(), () => attachWelcomeEvents(this.navigate.bind(this)));
      return;
    }

    if (path === '/auth') {
      this.render(renderAuthScreen(), () => attachAuthEvents(this.navigate.bind(this)));
      return;
    }

    if (path === '/workspace') {
      this.render(renderWorkspaceScreen(), () => attachWorkspaceEvents(this.navigate.bind(this)));
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
      this.render(
        renderEditorScreen(scriptId, targetScene),
        () => attachEditorEvents(scriptId, this.navigate.bind(this))
      );
      return;
    }

    // Strict Intelligence flow: /intelligence ALWAYS enters at Script Selector
    if (path === '/intelligence' || path === '/intelligence/select') {
      this.render(renderIntelligenceSelectorScreen(), () => attachIntelligenceSelectorEvents(this.navigate.bind(this)));
      return;
    }

    if (path === '/intelligence/context') {
      this.render(renderIntelligenceContextScreen(), () => attachIntelligenceContextEvents(this.navigate.bind(this)));
      return;
    }

    if (path === '/intelligence/dashboard' || path === '/intelligence/overview') {
      this.render(renderIntelligenceDashboardScreen(), () => attachIntelligenceDashboardEvents(this.navigate.bind(this)));
      return;
    }

    if (path === '/intelligence/analysis' || path === '/intelligence/analysis/select') {
      this.render(renderIndividualAnalysisSelectorScreen(), () => attachIndividualAnalysisSelectorEvents(this.navigate.bind(this)));
      return;
    }

    if (path.startsWith('/intelligence/analysis/')) {
      const type = path.split('/')[3] || 'pacing';
      const fromParam = query.get('from');
      const scriptParam = query.get('scriptId');
      this.render(
        renderIndividualAnalysisScreen(type, fromParam, scriptParam),
        () => attachIndividualAnalysisEvents(type, this.navigate.bind(this), fromParam, scriptParam)
      );
      return;
    }

    if (path === '/profile') {
      const fromParam = query.get('from');
      const scriptParam = query.get('scriptId');
      this.render(
        renderProfileScreen(fromParam, scriptParam),
        () => attachProfileEvents(this.navigate.bind(this), fromParam, scriptParam)
      );
      return;
    }

    if (path === '/profile/collaborators') {
      const fromParam = query.get('from');
      const scriptParam = query.get('scriptId');
      this.render(
        renderCollaboratorsScreen(fromParam, scriptParam),
        () => attachCollaboratorsEvents(this.navigate.bind(this), fromParam, scriptParam)
      );
      return;
    }

    if (path === '/notifications') {
      this.render(renderNotificationsScreen(), () => attachNotificationsEvents(this.navigate.bind(this)));
      return;
    }

    // 404 fallback
    this.renderNotFound(path);
  }

  render(html, attachEventsFn) {
    if (!this.appEl) return;
    this.appEl.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (typeof attachEventsFn === 'function') {
      try {
        attachEventsFn();
      } catch (err) {
        console.error("Error attaching screen events:", err);
      }
    }
  }

  renderNotFound(path) {
    this.appEl.innerHTML = `
      <div class="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-surface">
        <div class="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
          <span class="material-symbols-outlined text-[32px]">sentiment_dissatisfied</span>
        </div>
        <h1 class="font-heading font-bold text-xl text-slate-900 mb-1">Page Not Found</h1>
        <p class="text-xs text-slate-500 mb-6 max-w-xs">The route <code class="font-mono bg-slate-100 px-1 py-0.5 rounded text-blue-600">${path}</code> does not exist.</p>
        <button id="notfound-home" class="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-xs shadow-xs hover:bg-blue-700 transition-colors">
          Return to Workspace
        </button>
      </div>
    `;
    const btn = document.getElementById('notfound-home');
    if (btn) btn.onclick = () => this.navigate('/workspace');
  }
}

export const router = new Router();

// Reactive application state management for Scriptora
import * as api from '../services/api.js';
import { isLocalMode, getDataMode } from '../services/dataMode.js';
import * as localRepo from '../services/localRepository.js';

class Store {
  constructor() {
    try {
      sessionStorage.removeItem('scriptora_history_stack');
    } catch (e) {}

    this.state = {
      dataMode: getDataMode(),
      installationId: null,
      storageError: null,
      currentUser: null,
      selectedScriptId: isLocalMode() ? null : (localStorage.getItem(api.getUserStorageKey('selected_script')) || null),
      selectedVersionId: null,
      currentSceneId: null,
      unreadNotifications: 0,
      scripts: [],
      activeScript: null,
      screenplay: null,
      settings: null,
      historyStack: []
    };
    this.listeners = new Set();
    this._localChangeUnsub = null;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (e) {
        console.error("Store listener error:", e);
      }
    }
  }

  setState(partial) {
    this.state = { ...this.state, ...partial };
    if (partial.selectedScriptId) {
      if (isLocalMode()) {
        localRepo.setSelectedScriptId(partial.selectedScriptId).catch(() => {});
      } else {
        localStorage.setItem(api.getUserStorageKey('selected_script'), partial.selectedScriptId);
      }
    }
    this.notify();
  }

  pushHistory(route) {
    if (!route) return;
    const clean = route.trim();
    const stack = this.state.historyStack;
    // Don't push if it's identical to top of stack
    if (stack.length === 0 || stack[stack.length - 1] !== clean) {
      stack.push(clean);
      if (stack.length > 50) stack.shift();
    }
  }

  popHistory() {
    return this.state.historyStack.pop();
  }

  getPreviousRoute(fallback = '/workspace') {
    return this.popHistory() || fallback;
  }

  peekPreviousRoute(fallback = '/workspace') {
    const stack = this.state.historyStack;
    if (stack.length > 0) {
      return stack[stack.length - 1];
    }
    return fallback;
  }

  clearHistory() {
    this.state.historyStack = [];
    try {
      sessionStorage.removeItem('scriptora_history_stack');
    } catch (e) {}
  }

  resetUserSession(options = {}) {
    if (isLocalMode() && !options.clearWorkspace) {
      this.setState({
        currentUser: null,
        historyStack: []
      });
      this.clearHistory();
      return;
    }

    try {
      localStorage.removeItem(api.getUserStorageKey('selected_script'));
    } catch (_) {}
    this.setState({
      currentUser: null,
      scripts: [],
      activeScript: null,
      screenplay: null,
      historyStack: [],
      selectedScriptId: null,
      selectedVersionId: null,
      currentSceneId: null,
      unreadNotifications: 0
    });
    this.clearHistory();
  }

  async init() {
    if (isLocalMode()) {
      await localRepo.initLocalRepository();
      if (!this._localChangeUnsub) {
        this._localChangeUnsub = localRepo.onLocalWorkspaceChange(async ({ area }) => {
          if (['auth', 'scripts', 'reset', 'backup-restored', 'reload', 'profile', 'settings', 'notifications', 'selectedScriptId'].includes(area)) {
            await this.syncFromLocalSnapshot();
          }
        });
      }
      await this.syncFromLocalSnapshot();
      return;
    }

    try {
      const user = await api.getCurrentUser();
      const scripts = await api.getScripts();
      const unreadCount = await api.getUnreadNotificationCount();
      const settings = await api.getSettings();

      let selectedId = localStorage.getItem(api.getUserStorageKey('selected_script'));
      const currentDraft = (scripts && scripts.length > 0) ? scripts.find(s => s.isCurrentDraft) : null;
      if (currentDraft) {
        selectedId = currentDraft.id;
      } else if (scripts && scripts.length > 0) {
        if (!selectedId || !scripts.some(s => s.id === selectedId)) {
          selectedId = scripts[0].id;
        }
      } else {
        selectedId = null;
      }

      if (selectedId) {
        localStorage.setItem(api.getUserStorageKey('selected_script'), selectedId);
      } else {
        localStorage.removeItem(api.getUserStorageKey('selected_script'));
      }

      const activeScript = (scripts && scripts.length > 0)
        ? (scripts.find(s => s.id === selectedId) || scripts[0])
        : null;

      this.setState({
        currentUser: user,
        scripts: scripts || [],
        selectedScriptId: selectedId,
        activeScript,
        unreadNotifications: unreadCount,
        settings
      });
    } catch (err) {
      console.error("Init store error:", err);
    }
  }

  async syncFromLocalSnapshot() {
    const user = await localRepo.getProfile();
    const scripts = await localRepo.getScripts();
    const { unreadCount } = await localRepo.getNotifications();
    const settings = await localRepo.getSettings();

    let selectedId = localRepo.getCachedSelectedScriptId();
    const currentDraft = (scripts && scripts.length > 0) ? scripts.find(s => s.isCurrentDraft) : null;
    if (currentDraft) {
      selectedId = currentDraft.id;
    } else if (scripts && scripts.length > 0) {
      if (!selectedId || !scripts.some(s => s.id === selectedId)) {
        selectedId = scripts[0].id;
      }
    } else {
      selectedId = null;
    }

    if (selectedId !== localRepo.getCachedSelectedScriptId()) {
      await localRepo.setSelectedScriptId(selectedId);
    }

    const activeScript = (scripts && scripts.length > 0)
      ? (scripts.find(s => s.id === selectedId) || scripts[0])
      : null;

    this.state = {
      ...this.state,
      dataMode: 'local',
      installationId: localRepo.getInstallationId(),
      storageError: null,
      currentUser: localRepo.isLocalSignedOutSync() ? null : user,
      scripts: scripts || [],
      selectedScriptId: selectedId,
      activeScript,
      unreadNotifications: unreadCount || 0,
      settings
    };
    this.notify();
  }

  async selectScript(scriptId) {
    if (!scriptId) return;
    const updatedScripts = await api.setCurrentDraft(scriptId);
    const script = (updatedScripts || this.state.scripts).find(s => s.id === scriptId) || (await api.getScript(scriptId));
    this.setState({
      selectedScriptId: scriptId,
      activeScript: script,
      scripts: updatedScripts || this.state.scripts
    });
  }

  async refreshNotifications() {
    const unread = await api.getUnreadNotificationCount();
    this.setState({ unreadNotifications: unread });
  }

  async refreshScripts() {
    const scripts = await api.getScripts();
    const currentDraft = (scripts && scripts.length > 0) ? scripts.find(s => s.isCurrentDraft) : null;
    let selectedId = currentDraft ? currentDraft.id : this.state.selectedScriptId;
    if (scripts && scripts.length > 0) {
      if (!selectedId || !scripts.some(s => s.id === selectedId)) {
        selectedId = scripts[0].id;
      }
    } else {
      selectedId = null;
    }
    const active = (scripts && scripts.length > 0) ? (scripts.find(s => s.id === selectedId) || scripts[0]) : null;
    if (isLocalMode()) {
      await localRepo.setSelectedScriptId(selectedId);
    } else if (selectedId) {
      localStorage.setItem(api.getUserStorageKey('selected_script'), selectedId);
    } else {
      localStorage.removeItem(api.getUserStorageKey('selected_script'));
    }
    this.setState({ scripts: scripts || [], selectedScriptId: selectedId, activeScript: active });
    return scripts;
  }
}

export const store = new Store();

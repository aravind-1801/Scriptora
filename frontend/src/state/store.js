// Reactive application state management for Scriptora
import * as api from '../services/api.js';

class Store {
  constructor() {
    try {
      sessionStorage.removeItem('scriptora_history_stack');
    } catch (e) {}

    this.state = {
      currentUser: null,
      selectedScriptId: localStorage.getItem('scriptora_selected_script') || 'chronicles-of-dust',
      selectedVersionId: 'Draft 4.2',
      currentSceneId: 18,
      unreadNotifications: 3,
      scripts: [],
      activeScript: null,
      screenplay: null,
      settings: null,
      historyStack: []
    };
    this.listeners = new Set();
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
      localStorage.setItem('scriptora_selected_script', partial.selectedScriptId);
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

  resetUserSession() {
    this.setState({
      currentUser: null,
      scripts: [],
      activeScript: null,
      screenplay: null,
      historyStack: [],
      selectedScriptId: 'chronicles-of-dust',
      unreadNotifications: 0
    });
    this.clearHistory();
  }

  async init() {
    try {
      const user = await api.getCurrentUser();
      const scripts = await api.getScripts();
      const unreadCount = await api.getUnreadNotificationCount();
      const settings = await api.getSettings();

      const activeScript = scripts.find(s => s.id === this.state.selectedScriptId) || scripts[0];

      this.setState({
        currentUser: user,
        scripts,
        activeScript,
        unreadNotifications: unreadCount,
        settings
      });
    } catch (err) {
      console.error("Init store error:", err);
    }
  }

  async selectScript(scriptId) {
    const script = this.state.scripts.find(s => s.id === scriptId) || (await api.getScript(scriptId));
    this.setState({
      selectedScriptId: scriptId,
      activeScript: script
    });
  }

  async refreshNotifications() {
    const unread = await api.getUnreadNotificationCount();
    this.setState({ unreadNotifications: unread });
  }

  async refreshScripts() {
    const scripts = await api.getScripts();
    const active = scripts.find(s => s.id === this.state.selectedScriptId) || scripts[0];
    this.setState({ scripts, activeScript: active });
  }
}

export const store = new Store();

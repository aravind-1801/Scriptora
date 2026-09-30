// Reactive application state management for Scriptora
import * as api from '../services/api.js';

class Store {
  constructor() {
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
    if (this.state.historyStack[this.state.historyStack.length - 1] !== route) {
      this.state.historyStack.push(route);
    }
  }

  getPreviousRoute(fallback = '/workspace') {
    if (this.state.historyStack.length > 1) {
      this.state.historyStack.pop(); // remove current
      return this.state.historyStack.pop(); // previous
    }
    return fallback;
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

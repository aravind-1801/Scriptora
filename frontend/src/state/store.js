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

      let selectedId = localStorage.getItem('scriptora_selected_script');
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
        localStorage.setItem('scriptora_selected_script', selectedId);
      } else {
        localStorage.removeItem('scriptora_selected_script');
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
    if (selectedId) {
      localStorage.setItem('scriptora_selected_script', selectedId);
    } else {
      localStorage.removeItem('scriptora_selected_script');
    }
    this.setState({ scripts: scripts || [], selectedScriptId: selectedId, activeScript: active });
    return scripts;
  }
}

export const store = new Store();

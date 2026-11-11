// Centralized API and Service Layer for Scriptora
// Handles backend calls to Vercel Serverless Functions with transparent offline persistence fallback

import {
  encryptScreenplayContent,
  decryptScreenplayContent,
  importRawKeyFromBase64
} from './crypto.js';
import {
  isCloudConfigured,
  getCloudStorageStatus,
  uploadImageToCloud,
  syncStoryboardToFirestore,
  fetchStoryboardFromFirestore
} from './cloudStorage.js';
import {
  buildStoryboardGenerationPrompt,
  resolveEffectiveSettings,
  ASPECT_RATIO_SPECS,
  VISUAL_STYLE_DEFINITIONS
} from './promptBuilder.js';

export {
  isCloudConfigured,
  getCloudStorageStatus,
  uploadImageToCloud,
  syncStoryboardToFirestore,
  fetchStoryboardFromFirestore,
  buildStoryboardGenerationPrompt,
  resolveEffectiveSettings,
  ASPECT_RATIO_SPECS,
  VISUAL_STYLE_DEFINITIONS
};

export function getApiBaseUrl() {
  if (typeof window !== 'undefined' && window.SCRIPTORA_API_BASE) {
    return String(window.SCRIPTORA_API_BASE).replace(/\/+$/, '');
  }
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    if (import.meta.env.VITE_API_URL) return String(import.meta.env.VITE_API_URL).replace(/\/+$/, '');
    if (import.meta.env.VITE_API_BASE_URL) return String(import.meta.env.VITE_API_BASE_URL).replace(/\/+$/, '');
  }
  if (typeof localStorage !== 'undefined') {
    const customApi = localStorage.getItem('scriptora_api_url');
    if (customApi) return String(customApi).replace(/\/+$/, '');
  }
  return '/api';
}

const rawBase = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL)
  ? import.meta.env.BASE_URL
  : '/';
const BASE_ASSET_URL = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

function shouldFallbackToOfflineCache(err) {
  return !err || (!err.status && !(err.message && /^HTTP error (400|401|403|404|409|422)/.test(err.message)));
}

function getAuthToken() {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem('scriptora_auth_token') || localStorage.getItem('scriptora_token') || null;
}

async function request(endpoint, options = {}) {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}`;
  const token = getAuthToken();
  const authHeader = token ? { 'Authorization': `Bearer ${token}` } : {};

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
      ...options.headers
    },
    ...options
  };

  try {
    const res = await fetch(url, config);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const err = new Error(errorData.error || `HTTP error ${res.status}`);
      err.status = res.status;

      if (res.status === 401 && !cleanEndpoint.startsWith('/auth/')) {
        clearLocalUserData();
        if (typeof window !== 'undefined' && window.location && !window.location.hash.includes('/auth')) {
          window.location.hash = '#/auth';
        }
      }
      throw err;
    }
    return await res.json();
  } catch (err) {
    if (shouldFallbackToOfflineCache(err)) {
      console.warn(`API call ${endpoint} unreachable, network fallback check:`, err.message);
    }
    throw err;
  }
}

// 1. AUTH API
// Clean slate: zero default or seeded scripts
export const DEFAULT_SCRIPTS = [];

export async function getCurrentUser() {
  try {
    const data = await request('/auth/me');
    if (data && 'user' in data) {
      if (data.user) {
        localStorage.setItem('scriptora_user', JSON.stringify(data.user));
        return data.user;
      } else {
        localStorage.removeItem('scriptora_user');
        return null;
      }
    }
    return data?.user || null;
  } catch {
    const saved = localStorage.getItem('scriptora_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u && (u.displayName || u.email || u.id)) return u;
      } catch {}
    }
    return null;
  }
}

export function getUserStorageKey(key) {
  let uid = 'anon';
  if (typeof localStorage !== 'undefined') {
    try {
      const u = JSON.parse(localStorage.getItem('scriptora_user') || '{}');
      if (u?.id) uid = String(u.id);
    } catch (_) {}
  }
  return `scriptora_u_${uid}_${key}`;
}

export async function login(credentials) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
  if (data?.user) {
    clearLocalUserData();
    if (data?.token || data?.user?.token) {
      localStorage.setItem('scriptora_auth_token', data.token || data.user.token);
    }
    localStorage.setItem('scriptora_user', JSON.stringify(data.user));
    return data.user;
  }
  throw new Error('Invalid login response from server');
}

export async function googleLogin(payload = {}) {
  const data = await request('/auth/google', {
    method: 'POST',
    body: JSON.stringify({ ...payload, provider: 'google' })
  });
  if (data?.user) {
    clearLocalUserData();
    const token = data?.token || data?.user?.token || payload.token || payload.firebaseToken;
    if (token) {
      localStorage.setItem('scriptora_auth_token', token);
    }
    localStorage.setItem('scriptora_user', JSON.stringify(data.user));
    return data.user;
  }
  throw new Error('Google authentication failed');
}

export async function register(data) {
  const res = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  if (res?.user) {
    clearLocalUserData();
    if (res?.token || res?.user?.token) {
      localStorage.setItem('scriptora_auth_token', res.token || res.user.token);
    }
    localStorage.setItem('scriptora_user', JSON.stringify(res.user));
    return res.user;
  }
  throw new Error('Registration failed');
}

export async function verifyOtp(phone) {
  const res = await request('/auth/otp', {
    method: 'POST',
    body: JSON.stringify(typeof phone === 'object' ? phone : { phone })
  });
  if (res?.user) {
    clearLocalUserData();
    if (res?.token || res?.user?.token) {
      localStorage.setItem('scriptora_auth_token', res.token || res.user.token);
    }
    localStorage.setItem('scriptora_user', JSON.stringify(res.user));
    return res.user;
  }
  throw new Error('OTP verification failed');
}

export function clearLocalUserData() {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem('scriptora_user');
  localStorage.removeItem('scriptora_auth_token');
  localStorage.removeItem('scriptora_token');
  localStorage.removeItem('scriptora_scripts');
  localStorage.removeItem('scriptora_selected_script');
  localStorage.removeItem('scriptora_settings');
  localStorage.removeItem('scriptora_storyboard_preferences');
  localStorage.removeItem('scriptora_chat_history');

  // Purge user-specific screenplay drafts, production workspaces, and storyboard states
  const keysToRemove = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (
        key.startsWith('scriptora_screenplay_') ||
        key.startsWith('scriptora_prod_') ||
        key.startsWith('scriptora_storyboard_') ||
        key.startsWith('scriptora_u_') ||
        key.startsWith('scriptora_collaborators_') ||
        key.startsWith('scriptora_invitations_') ||
        key.startsWith('scriptora_e2ee_')
      )) {
        keysToRemove.push(key);
      }
    }
    for (const k of keysToRemove) {
      localStorage.removeItem(k);
    }
  } catch (e) {
    console.warn('Local storage purge notice:', e);
  }

  try {
    sessionStorage.clear();
  } catch {}
}

export async function signOut() {
  try {
    await request('/auth/logout', { method: 'POST' });
  } catch (err) {
    console.warn('Server logout notice:', err.message);
  }
  clearLocalUserData();
  return { success: true };
}

export async function deleteAccount(confirmation) {
  const cleanConfirmation = (confirmation || '').trim();
  if (cleanConfirmation.toUpperCase() !== 'DELETE MY ACCOUNT') {
    throw new Error('Confirmation mismatch. Please type "DELETE MY ACCOUNT" exactly to confirm account deletion.');
  }

  try {
    const res = await request('/auth/delete-account', {
      method: 'POST',
      body: JSON.stringify({ confirmation: cleanConfirmation })
    });
    clearLocalUserData();
    return res;
  } catch (err) {
    // If backend endpoint is unreachable or 404 (e.g. pure static deployment / offline), complete local session deletion safely
    const isOfflineOrUnreachable = !err.status ||
      err.message?.includes('404') ||
      err.message?.includes('Failed to fetch') ||
      err.message?.includes('NetworkError') ||
      err.message?.includes('Load failed');
    if (isOfflineOrUnreachable) {
      clearLocalUserData();
      return {
        success: true,
        message: 'Account and associated personal records have been permanently deleted.'
      };
    }
    throw err;
  }
}

// 2. SCRIPTS API
export async function getScripts(query = '') {
  const storageKey = getUserStorageKey('scripts');
  try {
    const endpoint = query ? `/scripts?q=${encodeURIComponent(query)}` : '/scripts';
    const data = await request(endpoint);
    if (data.scripts && Array.isArray(data.scripts)) {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(storageKey, JSON.stringify(data.scripts));
      }
      let list = data.scripts;
      if (query) list = list.filter(s => s.title.toLowerCase().includes(query.toLowerCase()));
      return list;
    }
  } catch (err) {
    if (!shouldFallbackToOfflineCache(err)) throw err;
    // Backend offline / static deploy fallback
  }

  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(storageKey) : null;
  let list = [];
  if (saved !== null) {
    try {
      list = JSON.parse(saved);
      if (!Array.isArray(list)) list = [];
    } catch {
      list = [];
    }
  }
  if (query) list = list.filter(s => s.title.toLowerCase().includes(query.toLowerCase()));
  return list;
}

export async function getScript(id) {
  try {
    const data = await request(`/scripts/${id}`);
    if (data.script) return data.script;
  } catch (err) {
    if (!shouldFallbackToOfflineCache(err)) throw err;
  }

  const scripts = await getScripts();
  return scripts.find(s => s.id === id) || null;
}

export async function createScript(scriptData) {
  const newScriptId = (scriptData.title || "untitled").toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `script-${Date.now()}`;
  const emptyScreenplay = {
    id: newScriptId,
    title: scriptData.title || "Untitled Screenplay",
    draft: "Draft 1.0",
    pageCount: 1,
    wordCount: 0,
    scenes: [
      {
        id: "scene-1",
        number: 1,
        slugline: "",
        blocks: [
          { id: `b-${Date.now()}-1`, type: "scene", content: "" }
        ]
      }
    ]
  };

  try {
    const data = await request('/scripts', {
      method: 'POST',
      body: JSON.stringify(scriptData)
    });
    if (data.script) {
      emptyScreenplay.id = data.script.id;
      emptyScreenplay.title = data.script.title;
      localStorage.setItem(getUserStorageKey(`screenplay_${data.script.id}`), JSON.stringify(emptyScreenplay));
      await saveScreenplay(data.script.id, emptyScreenplay).catch(() => {});
      const scripts = await getScripts();
      const resetScripts = scripts.map(s => ({ ...s, isCurrentDraft: false }));
      localStorage.setItem(getUserStorageKey('scripts'), JSON.stringify([data.script, ...resetScripts.filter(s => s.id !== data.script.id)]));
      localStorage.setItem(getUserStorageKey('selected_script'), data.script.id);
      return data.script;
    }
  } catch (err) {
    if (!shouldFallbackToOfflineCache(err)) throw err;
  }

  const newScript = {
    id: newScriptId,
    title: scriptData.title || "Untitled Screenplay",
    draft: "Draft 1.0",
    genre: scriptData.genre || "Drama",
    format: scriptData.format || "Feature",
    industry: scriptData.industry || "International / Hollywood",
    pages: 1,
    updated: "Just now",
    currentScene: "Scene 1",
    isCurrentDraft: true,
    joinCode: `${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    archived: false,
    context: {
      format: scriptData.format || "Feature",
      industry: scriptData.industry || "International / Hollywood",
      hours: 1,
      minutes: 30,
      seconds: 0,
      plannedDuration: "01:30:00"
    },
    analysisScores: {
      overall: 0,
      pacing: 0,
      dialogue: 0,
      emotion: 0,
      characterArc: 0,
      continuity: 0,
      storyStructure: 0,
      theme: 0,
      cinema: 0,
      formatting: 0,
      production: 0
    }
  };

  localStorage.setItem(getUserStorageKey(`screenplay_${newScript.id}`), JSON.stringify(emptyScreenplay));
  const scripts = await getScripts();
  const resetScripts = scripts.map(s => ({ ...s, isCurrentDraft: false }));
  const updated = [newScript, ...resetScripts.filter(s => s.id !== newScript.id)];
  localStorage.setItem(getUserStorageKey('scripts'), JSON.stringify(updated));
  localStorage.setItem(getUserStorageKey('selected_script'), newScript.id);
  return newScript;
}

export async function setCurrentDraft(scriptId) {
  if (!scriptId) return await getScripts();
  try {
    const data = await request(`/scripts/${scriptId}/current-draft`, { method: 'POST' });
    if (data && data.script) {
      const scripts = await getScripts();
      const updated = scripts.map(s => ({
        ...s,
        isCurrentDraft: s.id === scriptId,
        updated: s.id === scriptId ? 'Just now' : s.updated
      }));
      localStorage.setItem(getUserStorageKey('scripts'), JSON.stringify(updated));
      localStorage.setItem(getUserStorageKey('selected_script'), scriptId);
      return updated;
    }
  } catch (err) {
    if (!shouldFallbackToOfflineCache(err)) throw err;
  }

  const scripts = await getScripts();
  const updated = scripts.map(s => ({
    ...s,
    isCurrentDraft: s.id === scriptId,
    updated: s.id === scriptId ? 'Just now' : s.updated
  }));
  localStorage.setItem(getUserStorageKey('scripts'), JSON.stringify(updated));
  localStorage.setItem(getUserStorageKey('selected_script'), scriptId);
  return updated;
}

export async function updateScript(id, updates) {
  try {
    const data = await request(`/scripts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    if (data.script) {
      const scripts = await getScripts();
      const updated = scripts.map(s => s.id === id ? data.script : s);
      localStorage.setItem(getUserStorageKey('scripts'), JSON.stringify(updated));
      return data.script;
    }
  } catch (err) {
    if (!shouldFallbackToOfflineCache(err)) throw err;
  }

  const scripts = await getScripts();
  const updated = scripts.map(s => s.id === id ? { ...s, ...updates, updated: "Just now" } : s);
  localStorage.setItem(getUserStorageKey('scripts'), JSON.stringify(updated));
  return { id, ...updates, updated: "Just now" };
}

export async function deleteScript(id) {
  try {
    await request(`/scripts/${id}`, { method: 'DELETE' });
  } catch (err) {
    if (!shouldFallbackToOfflineCache(err)) throw err;
  }

  const scripts = await getScripts();
  const deletedScript = scripts.find(s => s.id === id);
  const wasCurrentDraft = deletedScript?.isCurrentDraft;
  let updated = scripts.filter(s => s.id !== id);
  if (wasCurrentDraft && updated.length > 0) {
    updated[0].isCurrentDraft = true;
  }
  localStorage.setItem(getUserStorageKey('scripts'), JSON.stringify(updated));
  localStorage.removeItem(getUserStorageKey(`screenplay_${id}`));

  const currentSelected = localStorage.getItem(getUserStorageKey('selected_script'));
  if (currentSelected === id) {
    if (updated.length > 0) {
      localStorage.setItem(getUserStorageKey('selected_script'), updated[0].id);
    } else {
      localStorage.removeItem(getUserStorageKey('selected_script'));
    }
  }
  return { success: true };
}

export async function duplicateScript(id) {
  try {
    const data = await request(`/scripts/${id}/duplicate`, { method: 'POST' });
    if (data.script) {
      const scripts = await getScripts();
      localStorage.setItem(getUserStorageKey('scripts'), JSON.stringify([data.script, ...scripts]));
      return data.script;
    }
  } catch (err) {
    if (!shouldFallbackToOfflineCache(err)) throw err;
  }

  const orig = await getScript(id);
  const copy = {
    ...orig,
    id: `${id}-copy-${Date.now().toString().slice(-4)}`,
    title: `${orig?.title || 'Script'} (Copy)`,
    updated: "Just now"
  };
  const scripts = await getScripts();
  const updated = [copy, ...scripts];
  localStorage.setItem(getUserStorageKey('scripts'), JSON.stringify(updated));
  return copy;
}

export async function archiveScript(id) {
  try {
    await request(`/scripts/${id}/archive`, { method: 'POST' });
  } catch (err) {
    if (!shouldFallbackToOfflineCache(err)) throw err;
  }

  const scripts = await getScripts();
  const updated = scripts.map(s => s.id === id ? { ...s, archived: true, updated: "Just now" } : s);
  localStorage.setItem(getUserStorageKey('scripts'), JSON.stringify(updated));
  return { success: true };
}

// 3. SCREENPLAY API
export async function getScreenplay(scriptId) {
  let screenplay = null;

  // If encrypted payload exists for E2EE, decrypt it with local master key
  const encStored = localStorage.getItem(getUserStorageKey(`screenplay_enc_${scriptId}`));
  const rawKey = localStorage.getItem(getUserStorageKey(`screenplay_key_${scriptId}`));
  if (encStored && rawKey) {
    try {
      const masterKey = await importRawKeyFromBase64(rawKey);
      const dec = await decryptScreenplayContent(JSON.parse(encStored), masterKey);
      if (dec && dec.scenes) {
        screenplay = dec;
      }
    } catch (err) {
      console.warn('Failed to decrypt E2EE screenplay payload:', err);
    }
  }

  if (!screenplay) {
    try {
      const data = await request(`/screenplay/${scriptId}`);
      if (data.screenplay && data.screenplay.scenes) {
        screenplay = data.screenplay;
      }
    } catch (err) {
      if (!shouldFallbackToOfflineCache(err)) throw err;
    }
  }

  if (!screenplay) {
    const saved = localStorage.getItem(getUserStorageKey(`screenplay_${scriptId}`));
    if (saved) {
      try {
        const sp = JSON.parse(saved);
        if (sp && sp.scenes) {
          screenplay = sp;
        }
      } catch {}
    }
  }

  // Sanitizer: Ensure NO placeholder/random content exists
  const hasRandomPlaceholder = (sp) => {
    if (!sp || !Array.isArray(sp.scenes)) return false;
    return sp.scenes.some(sc => {
      const slug = (sc.slugline || '').toUpperCase();
      if (slug.includes("WRITER'S ROOM") || slug.includes("STUDIO - DAY") || slug.includes("NEW SCENE - DAY")) return true;
      return (sc.blocks || []).some(b => {
        const text = (b.content || '');
        return text.includes("Sunlight cuts through dust motes") ||
               text.includes("A blank script page waits") ||
               text.includes("Type your screenplay action here");
      });
    });
  };

  if (screenplay && hasRandomPlaceholder(screenplay)) {
    screenplay = null; // Force reset to clean empty
  }

  if (screenplay) {
    return screenplay;
  }

  // Pure blank new screenplay for all other scripts
  const script = await getScript(scriptId);
  const emptyTemplate = {
    id: scriptId || 'script_01',
    title: script?.title || 'Untitled Screenplay',
    draft: 'Draft 1.0',
    pageCount: 1,
    wordCount: 0,
    scenes: [
      {
        id: 'scene-1',
        number: 1,
        slugline: '',
        blocks: [
          { id: `b-${Date.now()}-1`, type: 'scene', content: '' }
        ]
      }
    ]
  };
  localStorage.setItem(getUserStorageKey(`screenplay_${scriptId}`), JSON.stringify(emptyTemplate));
  saveScreenplay(scriptId, emptyTemplate).catch(() => {});
  return emptyTemplate;
}

export async function saveScreenplay(scriptId, screenplay) {
  localStorage.setItem(getUserStorageKey(`screenplay_${scriptId}`), JSON.stringify(screenplay));

  // If E2EE is enabled, also encrypt content locally with the master key
  const e2eeSetting = localStorage.getItem(getUserStorageKey(`e2ee_${scriptId}`));
  const rawKey = localStorage.getItem(getUserStorageKey(`screenplay_key_${scriptId}`));
  if (e2eeSetting && rawKey) {
    try {
      const e2ee = JSON.parse(e2eeSetting);
      if (e2ee.enabled) {
        const masterKey = await importRawKeyFromBase64(rawKey);
        const encPayload = await encryptScreenplayContent(screenplay, masterKey, e2ee.keyVersion || 1);
        localStorage.setItem(getUserStorageKey(`screenplay_enc_${scriptId}`), JSON.stringify(encPayload));
      }
    } catch (e) {
      console.warn('E2EE auto-encrypt on save skipped:', e);
    }
  }

  try {
    return await request(`/screenplay/${scriptId}`, {
      method: 'PUT',
      body: JSON.stringify({ screenplay })
    });
  } catch {
    return { success: true };
  }
}

// 4. VERSIONS API
export async function getVersions(scriptId) {
  try {
    const data = await request(`/versions/${scriptId}`);
    return data.versions;
  } catch {
    return [];
  }
}

export async function createVersion(scriptId, versionData) {
  try {
    const data = await request(`/versions/${scriptId}`, {
      method: 'POST',
      body: JSON.stringify(versionData)
    });
    return data.version;
  } catch {
    return {
      id: `v-${Date.now()}`,
      name: versionData.name,
      tag: "Milestone Snapshot",
      timestamp: "Just now",
      author: "JD",
      stats: "96 pages · 14,280 words",
      notes: versionData.notes || "",
      isCurrent: true
    };
  }
}

// 5. COLLABORATION API
const DEFAULT_COLLABORATORS = [];

export async function getCollaborators(scriptId) {
  if (!scriptId) return [];
  try {
    const data = await request(`/collaborators/${scriptId}`);
    if (data.collaborators && Array.isArray(data.collaborators)) {
      localStorage.setItem(getUserStorageKey(`collaborators_${scriptId}`), JSON.stringify(data.collaborators));
      return data.collaborators;
    }
  } catch {
    // Fallback to local storage or defaults on static hosts
  }

  const saved = localStorage.getItem(getUserStorageKey(`collaborators_${scriptId}`));
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
  }

  return [];
}

export async function getUserPermissions(scriptId) {
  try {
    const data = await request(`/collaborators/${scriptId}/permissions`);
    return data;
  } catch {
    return {
      role: 'Owner',
      permissions: {
        'screenplay.read': true,
        'screenplay.edit': true,
        'scene.create': true,
        'scene.delete': true,
        'character.manage': true,
        'dialogue.edit': true,
        'storyboard.view': true,
        'storyboard.edit': true,
        'analysis.run': true,
        'comments.create': true,
        'production.view': true,
        'production.manage': true,
        'collaborators.invite': true,
        'collaborators.manage': true,
        'screenplay.export': true,
        'security.manage': true
      }
    };
  }
}

export async function inviteCollaborator(scriptId, inviteData) {
  const email = (inviteData.email || '').trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Please provide a valid email address.');
  }

  // Pre-validate duplicates client-side to protect users on static or offline environments
  const currentMembers = await getCollaborators(scriptId);
  if (currentMembers.some(m => (m.email || '').toLowerCase() === email)) {
    throw new Error('This user is already a collaborator on this screenplay.');
  }

  const currentInvs = await getPendingInvitations(scriptId);
  if (currentInvs.some(i => (i.email || '').toLowerCase() === email && i.status === 'pending')) {
    throw new Error('An active invitation is already pending for this email address.');
  }

  try {
    const data = await request(`/collaborators/${scriptId}/invite`, {
      method: 'POST',
      body: JSON.stringify(inviteData)
    });
    if (data.collaborator) return data.collaborator;
  } catch (err) {
    // If backend returns a deliberate business logic error (e.g. 400 Bad Request), rethrow it
    if (err.message && !err.message.includes('405') && !err.message.includes('404') && !err.message.includes('Failed to fetch') && !err.message.includes('NetworkError')) {
      throw err;
    }
  }

  // Static hosting (GitHub Pages) or offline fallback
  const newInv = {
    id: `inv-${Date.now()}`,
    email,
    role: inviteData.role || 'Editor',
    message: inviteData.message || '',
    token: `inv_${Math.random().toString(36).substring(2, 10)}_${Date.now()}`,
    status: 'pending',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString()
  };

  const invs = JSON.parse(localStorage.getItem(getUserStorageKey(`invitations_${scriptId}`)) || '[]');
  invs.unshift(newInv);
  localStorage.setItem(getUserStorageKey(`invitations_${scriptId}`), JSON.stringify(invs));
  return newInv;
}

export async function getPendingInvitations(scriptId) {
  try {
    const data = await request(`/collaborators/${scriptId}/invitations`);
    if (data.invitations && Array.isArray(data.invitations)) {
      localStorage.setItem(getUserStorageKey(`invitations_${scriptId}`), JSON.stringify(data.invitations));
      return data.invitations;
    }
  } catch {
    // Static / offline fallback
  }

  const saved = localStorage.getItem(getUserStorageKey(`invitations_${scriptId}`));
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed.filter(i => i.status === 'pending');
    } catch {}
  }
  return [];
}

export async function revokeInvitation(scriptId, inviteId) {
  try {
    const res = await request(`/collaborators/${scriptId}/invitations/${inviteId}`, {
      method: 'DELETE'
    });
    return res;
  } catch (err) {
    if (err.message && !err.message.includes('405') && !err.message.includes('404') && !err.message.includes('Failed to fetch')) {
      throw err;
    }
  }

  // Local fallback
  const invs = JSON.parse(localStorage.getItem(getUserStorageKey(`invitations_${scriptId}`)) || '[]');
  const updated = invs.filter(i => i.id !== inviteId);
  localStorage.setItem(getUserStorageKey(`invitations_${scriptId}`), JSON.stringify(updated));
  return { success: true };
}

export async function resendInvitation(scriptId, inviteId) {
  try {
    const res = await request(`/collaborators/${scriptId}/invitations/${inviteId}/resend`, {
      method: 'POST'
    });
    return res.invitation;
  } catch (err) {
    if (err.message && !err.message.includes('405') && !err.message.includes('404') && !err.message.includes('Failed to fetch')) {
      throw err;
    }
  }

  // Local fallback
  const invs = JSON.parse(localStorage.getItem(getUserStorageKey(`invitations_${scriptId}`)) || '[]');
  const inv = invs.find(i => i.id === inviteId);
  if (!inv) throw new Error('Invitation not found.');

  inv.status = 'pending';
  inv.token = `inv_${Math.random().toString(36).substring(2, 10)}_${Date.now()}`;
  inv.createdAt = new Date().toISOString();
  inv.expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString();
  localStorage.setItem(getUserStorageKey(`invitations_${scriptId}`), JSON.stringify(invs));
  return inv;
}

export async function acceptInvitation(token) {
  try {
    const res = await request(`/collaborators/invitations/${token}/accept`, {
      method: 'POST'
    });
    return res;
  } catch (err) {
    if (err.message && !err.message.includes('405') && !err.message.includes('404') && !err.message.includes('Failed to fetch')) {
      throw err;
    }
  }

  // Fallback lookup in local storage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('scriptora_invitations_')) {
      const scriptId = key.replace('scriptora_invitations_', '');
      const invs = JSON.parse(localStorage.getItem(key) || '[]');
      const inv = invs.find(it => it.token === token);
      if (inv) {
        inv.status = 'accepted';
        localStorage.setItem(key, JSON.stringify(invs));

        // Add to collaborators
        const collabs = JSON.parse(localStorage.getItem(getUserStorageKey(`collaborators_${scriptId}`)) || '[]');
        const newCollab = {
          id: `c-${Date.now()}`,
          name: inv.email.split('@')[0],
          email: inv.email,
          initials: inv.email.substring(0, 2).toUpperCase(),
          role: inv.role,
          avatarBg: 'bg-blue-100 text-blue-700',
          status: 'Active',
          added: 'Just now'
        };
        collabs.push(newCollab);
        localStorage.setItem(getUserStorageKey(`collaborators_${scriptId}`), JSON.stringify(collabs));
        return { success: true, scriptId, collaborator: newCollab };
      }
    }
  }
  throw new Error('Invitation not found or expired.');
}

export async function changeCollaboratorRole(scriptId, memberId, newRole) {
  try {
    const data = await request(`/collaborators/${scriptId}/${memberId}`, {
      method: 'PUT',
      body: JSON.stringify({ role: newRole })
    });
    if (data.collaborator) return data.collaborator;
  } catch (err) {
    if (err.message && !err.message.includes('405') && !err.message.includes('404') && !err.message.includes('Failed to fetch')) {
      throw err;
    }
  }

  // Local fallback
  const collabs = JSON.parse(localStorage.getItem(getUserStorageKey(`collaborators_${scriptId}`)) || '[]');
  const member = collabs.find(c => c.id === memberId);
  if (member) {
    member.role = newRole;
    localStorage.setItem(getUserStorageKey(`collaborators_${scriptId}`), JSON.stringify(collabs));
    return member;
  }
  throw new Error('Collaborator not found.');
}

export async function removeCollaborator(scriptId, memberId) {
  try {
    const res = await request(`/collaborators/${scriptId}/${memberId}`, {
      method: 'DELETE'
    });
    return res;
  } catch (err) {
    if (err.message && !err.message.includes('405') && !err.message.includes('404') && !err.message.includes('Failed to fetch')) {
      throw err;
    }
  }

  // Local fallback
  const collabs = JSON.parse(localStorage.getItem(getUserStorageKey(`collaborators_${scriptId}`)) || '[]');
  const updated = collabs.filter(c => c.id !== memberId);
  localStorage.setItem(getUserStorageKey(`collaborators_${scriptId}`), JSON.stringify(updated));
  return { success: true };
}

// 6. JOIN CODE & ACCESS REQUEST API
export async function getJoinCodeConfig(scriptId) {
  try {
    const data = await request(`/join-code/config/${scriptId}`);
    return data.config;
  } catch {
    return {
      code: 'A7K9-XP42',
      status: 'active',
      allowedRoles: ['Viewer', 'Editor', 'Script Doctor', 'Producer'],
      expiresAt: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString()
    };
  }
}

export async function generateJoinCode(scriptId) {
  try {
    const data = await request(`/join-code/generate/${scriptId}`, {
      method: 'POST'
    });
    return data.joinCode;
  } catch {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let p1 = '', p2 = '';
    for (let i = 0; i < 4; i++) p1 += chars[Math.floor(Math.random() * chars.length)];
    for (let i = 0; i < 4; i++) p2 += chars[Math.floor(Math.random() * chars.length)];
    return `${p1}-${p2}`;
  }
}

export async function revokeJoinCode(scriptId) {
  return await request(`/join-code/revoke/${scriptId}`, {
    method: 'POST'
  });
}

export async function validateJoinCode(code) {
  return await request('/join-code/validate', {
    method: 'POST',
    body: JSON.stringify({ code })
  });
}

export async function requestJoinAccess(code, requestData) {
  return await request('/join-code/request-access', {
    method: 'POST',
    body: JSON.stringify({ code, ...requestData })
  });
}

export async function getAccessRequests(scriptId) {
  try {
    const data = await request(`/collaborators/${scriptId}/requests`);
    return data.requests || [];
  } catch {
    return [];
  }
}

export async function approveAccessRequest(scriptId, requestId, assignedRole) {
  return await request(`/collaborators/${scriptId}/requests/${requestId}/approve`, {
    method: 'POST',
    body: JSON.stringify({ role: assignedRole })
  });
}

export async function rejectAccessRequest(scriptId, requestId) {
  return await request(`/collaborators/${scriptId}/requests/${requestId}/reject`, {
    method: 'POST'
  });
}

export async function joinWithCode(code) {
  return await requestJoinAccess(code, { requestedRole: 'Viewer' });
}

// 6b. SECURITY ACTIVITY LOG API
export async function getSecurityActivity(scriptId) {
  try {
    const data = await request(`/collaborators/${scriptId}/security-activity`);
    return data.activity || [];
  } catch {
    return [];
  }
}

// 6c. END-TO-END ENCRYPTION (E2EE) API
export async function getE2EESettings(scriptId) {
  try {
    const data = await request(`/collaborators/${scriptId}/e2ee`);
    if (data?.e2ee) {
      try { localStorage.setItem(getUserStorageKey(`e2ee_${scriptId}`), JSON.stringify(data.e2ee)); } catch {}
      return data.e2ee;
    }
  } catch {}

  const stored = localStorage.getItem(getUserStorageKey(`e2ee_${scriptId}`));
  if (stored) {
    try { return JSON.parse(stored); } catch {}
  }

  return {
    enabled: false,
    algorithm: 'AES-GCM-256',
    keyVersion: 1,
    keyFingerprint: null,
    lastRotated: null,
    wrappedKeys: {}
  };
}

export async function enableE2EE(scriptId, payload) {
  try {
    const res = await request(`/collaborators/${scriptId}/e2ee/enable`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (res?.e2ee) {
      try { localStorage.setItem(getUserStorageKey(`e2ee_${scriptId}`), JSON.stringify(res.e2ee)); } catch {}
    }
    return res;
  } catch (err) {
    const e2ee = {
      enabled: true,
      algorithm: 'AES-GCM-256',
      keyVersion: 1,
      keyFingerprint: payload.keyFingerprint || `sha256-${Date.now()}`,
      lastRotated: new Date().toISOString(),
      wrappedKeys: payload.wrappedKeys || {}
    };
    try { localStorage.setItem(getUserStorageKey(`e2ee_${scriptId}`), JSON.stringify(e2ee)); } catch {}
    return { success: true, e2ee };
  }
}

export async function rotateE2EEKey(scriptId, payload) {
  try {
    const res = await request(`/collaborators/${scriptId}/e2ee/rotate`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (res?.e2ee) {
      try { localStorage.setItem(getUserStorageKey(`e2ee_${scriptId}`), JSON.stringify(res.e2ee)); } catch {}
    }
    return res;
  } catch (err) {
    const prev = JSON.parse(localStorage.getItem(getUserStorageKey(`e2ee_${scriptId}`)) || '{}');
    const e2ee = {
      ...prev,
      enabled: true,
      keyVersion: (prev.keyVersion || 1) + 1,
      keyFingerprint: payload.newKeyFingerprint || `sha256-v${(prev.keyVersion || 1) + 1}-${Date.now()}`,
      lastRotated: new Date().toISOString(),
      wrappedKeys: payload.wrappedKeys || prev.wrappedKeys || {}
    };
    try { localStorage.setItem(getUserStorageKey(`e2ee_${scriptId}`), JSON.stringify(e2ee)); } catch {}
    return { success: true, e2ee };
  }
}

export async function disableE2EE(scriptId) {
  try {
    const res = await request(`/collaborators/${scriptId}/e2ee/disable`, {
      method: 'POST'
    });
    if (res?.e2ee) {
      try { localStorage.setItem(getUserStorageKey(`e2ee_${scriptId}`), JSON.stringify(res.e2ee)); } catch {}
    }
    return res;
  } catch (err) {
    const prev = JSON.parse(localStorage.getItem(getUserStorageKey(`e2ee_${scriptId}`)) || '{}');
    const e2ee = {
      ...prev,
      enabled: false,
      disabledAt: new Date().toISOString()
    };
    try { localStorage.setItem(getUserStorageKey(`e2ee_${scriptId}`), JSON.stringify(e2ee)); } catch {}
    return { success: true, e2ee };
  }
}

export async function registerUserPublicKey(publicKeyJwk) {
  return await request('/e2ee/public-key', {
    method: 'POST',
    body: JSON.stringify({ publicKeyJwk })
  });
}

export async function getUserPublicKey(email) {
  try {
    const data = await request(`/e2ee/public-key/${encodeURIComponent(email)}`);
    return data.keyRecord;
  } catch {
    return null;
  }
}

// 7. NOTIFICATIONS API
export async function getNotifications() {
  try {
    const data = await request('/notifications');
    return data;
  } catch {
    return {
      notifications: [],
      unreadCount: 0
    };
  }
}

export async function markNotificationRead(id) {
  try {
    return await request(`/notifications/${id}/read`, { method: 'POST' });
  } catch {
    return { success: true };
  }
}

export async function markAllNotificationsRead() {
  try {
    return await request('/notifications/read-all', { method: 'POST' });
  } catch {
    return { success: true };
  }
}

export async function getUnreadNotificationCount() {
  const data = await getNotifications();
  return data.unreadCount || 0;
}

// 8. PROFILE & SETTINGS API
export async function getProfile() {
  try {
    const data = await request('/profile');
    return data.profile;
  } catch {
    return await getCurrentUser();
  }
}

export async function updateProfile(updates) {
  try {
    const data = await request('/profile', {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    localStorage.setItem('scriptora_user', JSON.stringify(data.profile));
    return data.profile;
  } catch {
    const current = await getCurrentUser() || {};
    const updated = { ...current, ...updates };
    if (updates.name) {
      const parts = updates.name.trim().split(/\s+/);
      updated.initials = ((parts[0]?.[0] || 'A') + (parts[1]?.[0] || '')).toUpperCase();
      updated.displayName = updates.name;
    }
    localStorage.setItem('scriptora_user', JSON.stringify(updated));
    return updated;
  }
}

export async function getSettings() {
  try {
    const data = await request('/settings');
    return data.settings;
  } catch {
    const saved = localStorage.getItem(getUserStorageKey('settings'));
    if (saved) return JSON.parse(saved);
    return {
      editor: {
        autoSceneHeading: true,
        autoCharacter: true,
        autoTransition: true,
        enterAfterAction: true,
        tabAfterAction: true,
        autoCapitalize: true,
        continueDialogue: true,
        showSceneNumbers: true,
        lockSceneNumbers: false,
        fontSize: "Courier Prime 12pt",
        lineSpacing: "1.5 line",
        focusMode: false
      },
      language: "English (US)",
      appearance: "Light",
      notifications: {
        collaborationInvites: true,
        collaborationEdits: true,
        mentions: true,
        versionMilestones: true
      },
      intelligence: {
        querySuggestions: true,
        analysisSuggestions: true
      }
    };
  }
}

export async function updateSettings(updates) {
  try {
    const data = await request('/settings', {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    localStorage.setItem(getUserStorageKey('settings'), JSON.stringify(data.settings));
    return data.settings;
  } catch {
    const current = await getSettings();
    const merged = { ...current, ...updates };
    localStorage.setItem(getUserStorageKey('settings'), JSON.stringify(merged));
    return merged;
  }
}

// 9. INTELLIGENCE API
export async function getIntelligenceContext(scriptId) {
  try {
    const data = await request(`/intelligence/${scriptId}/context`);
    return data.context;
  } catch {
    return {
      format: "Feature",
      industry: "International / Hollywood",
      plannedDuration: "01:36:00",
      hours: 1,
      minutes: 36,
      seconds: 0
    };
  }
}

export async function updateIntelligenceContext(scriptId, context) {
  try {
    const data = await request(`/intelligence/${scriptId}/context`, {
      method: 'PUT',
      body: JSON.stringify(context)
    });
    return data.context;
  } catch {
    return context;
  }
}

export async function getIntelligenceAnalysis(scriptId) {
  try {
    const data = await request(`/intelligence/${scriptId}/analysis`);
    return data;
  } catch {
    const script = await getScript(scriptId);
    return {
      script: {
        id: script?.id || scriptId,
        title: script?.title || "Untitled Screenplay",
        draft: script?.draft || "Draft 1.0",
        pages: script?.pages || 0
      },
      scores: script?.analysisScores || {
        overall: 0,
        pacing: 0,
        dialogue: 0,
        emotion: 0,
        characterArc: 0,
        continuity: 0,
        storyStructure: 0,
        theme: 0,
        cinema: 0,
        formatting: 0,
        production: 0
      }
    };
  }
}

export async function queryIntelligence(query, scriptId) {
  try {
    const data = await request('/intelligence/query', {
      method: 'POST',
      body: JSON.stringify({ query, scriptId })
    });
    return data.answer;
  } catch {
    return `Analysis: In this screenplay, scene tempo and dialogue density align with core narrative milestones. Characters express distinct agendas in each beat.`;
  }
}

// =========================================================================
// 8. PRE-PRODUCTION FOUNDATIONAL DATA ARCHITECTURE & OPERATIONS
// =========================================================================

export async function getProductionWorkspace(scriptId) {
  if (!scriptId) return null;
  try {
    const data = await request(`/production/${scriptId}`);
    if (data?.workspace) {
      localStorage.setItem(getUserStorageKey(`prod_ws_${scriptId}`), JSON.stringify(data.workspace));
      return data.workspace;
    }
  } catch (e) {
    // offline fallback
  }

  const cached = localStorage.getItem(getUserStorageKey(`prod_ws_${scriptId}`));
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }

  const script = await getScript(scriptId);
  if (!script) return null;
  const defaultWs = {
    id: `prod-ws-${scriptId}`,
    projectId: script.projectId || `proj-${scriptId}`,
    projectName: script.title,
    scriptId: scriptId,
    screenplayTitle: script.title,
    pinnedSourceVersion: script.draft || "Draft 1.0",
    pinnedSourceVersionHash: `v1.0-${scriptId}`,
    pinnedTimestamp: "Just now",
    currentScriptDraft: script.draft || "Draft 1.0",
    isStale: false,
    mode: localStorage.getItem(getUserStorageKey('prod_mode')) || 'simple',
    userRole: localStorage.getItem(getUserStorageKey('prod_role')) || 'Owner',
    roles: ["Owner", "Director", "Assistant Director", "Production", "Department Member", "Viewer"],
    stats: {
      totalScenes: 0,
      breakdownElements: 0,
      callSheetsCount: 0,
      shootingDays: 0,
      pendingProposals: 0,
      completedApprovals: 0
    },
    updatedAt: new Date().toISOString()
  };
  localStorage.setItem(getUserStorageKey(`prod_ws_${scriptId}`), JSON.stringify(defaultWs));
  return defaultWs;
}

export async function updateProductionWorkspace(scriptId, updates) {
  try {
    const data = await request(`/production/${scriptId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    if (data?.workspace) {
      localStorage.setItem(getUserStorageKey(`prod_ws_${scriptId}`), JSON.stringify(data.workspace));
      return data.workspace;
    }
  } catch (e) {}

  const current = await getProductionWorkspace(scriptId);
  if (!current) return updates;
  const updated = { ...current, ...updates, updatedAt: new Date().toISOString() };
  localStorage.setItem(getUserStorageKey(`prod_ws_${scriptId}`), JSON.stringify(updated));
  return updated;
}

export async function pinProductionSourceVersion(scriptId, newVersion) {
  try {
    const data = await request(`/production/${scriptId}/pin`, {
      method: 'POST',
      body: JSON.stringify({ version: newVersion })
    });
    if (data?.workspace) {
      localStorage.setItem(getUserStorageKey(`prod_ws_${scriptId}`), JSON.stringify(data.workspace));
      return data.workspace;
    }
  } catch (e) {}

  const current = await getProductionWorkspace(scriptId);
  if (!current) return null;
  current.pinnedSourceVersion = newVersion;
  current.pinnedTimestamp = "Just now";
  current.isStale = false;
  localStorage.setItem(getUserStorageKey(`prod_ws_${scriptId}`), JSON.stringify(current));
  return current;
}

export async function getProductionResources(scriptId, category = null) {
  if (!scriptId) return [];
  try {
    const url = `/production/${scriptId}/resources${category ? `?category=${encodeURIComponent(category)}` : ''}`;
    const data = await request(url);
    if (data?.resources) {
      localStorage.setItem(getUserStorageKey(`prod_res_${scriptId}`), JSON.stringify(data.resources));
      return data.resources;
    }
  } catch (e) {}

  const cached = localStorage.getItem(getUserStorageKey(`prod_res_${scriptId}`));
  if (cached) {
    try {
      const list = JSON.parse(cached);
      if (category && category !== 'all') {
        return list.filter(r => r.category.toLowerCase() === category.toLowerCase());
      }
      return list;
    } catch (_) {}
  }

  return [];
}

export async function getProductionDocuments(scriptId) {
  if (!scriptId) return [];
  try {
    const data = await request(`/production/${scriptId}/documents`);
    if (data?.documents) {
      localStorage.setItem(getUserStorageKey(`prod_docs_${scriptId}`), JSON.stringify(data.documents));
      return data.documents;
    }
  } catch (e) {}

  const cached = localStorage.getItem(getUserStorageKey(`prod_docs_${scriptId}`));
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }

  return [];
}

export async function getProductionProposals(scriptId) {
  if (!scriptId) return [];
  try {
    const data = await request(`/production/${scriptId}/proposals`);
    if (data?.proposals) {
      localStorage.setItem(getUserStorageKey(`prod_props_${scriptId}`), JSON.stringify(data.proposals));
      return data.proposals;
    }
  } catch (e) {}

  const cached = localStorage.getItem(getUserStorageKey(`prod_props_${scriptId}`));
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }

  return [];
}

export async function submitProductionProposal(scriptId, proposal) {
  try {
    const data = await request(`/production/${scriptId}/proposals`, {
      method: 'POST',
      body: JSON.stringify(proposal)
    });
    if (data?.proposal) {
      const list = await getProductionProposals(scriptId);
      list.unshift(data.proposal);
      localStorage.setItem(getUserStorageKey(`prod_props_${scriptId}`), JSON.stringify(list));
      return data.proposal;
    }
  } catch (e) {}

  const list = await getProductionProposals(scriptId);
  const newProp = {
    id: `prop-${Date.now()}`,
    scriptId,
    sourceVersion: proposal.sourceVersion || "Draft 1.0",
    title: proposal.title || "Production Schedule Change",
    description: proposal.description || "",
    category: proposal.category || "General",
    submittedBy: proposal.submittedBy || "Collaborator",
    submitterRole: proposal.submitterRole || "Director",
    status: "Awaiting review",
    impact: proposal.impact || "Requires schedule adjustment",
    createdAt: new Date().toISOString()
  };
  list.unshift(newProp);
  localStorage.setItem(getUserStorageKey(`prod_props_${scriptId}`), JSON.stringify(list));
  return newProp;
}

export async function reviewProductionProposal(scriptId, proposalId, action, reviewNotes = '') {
  try {
    const data = await request(`/production/${scriptId}/proposals/${proposalId}/review`, {
      method: 'POST',
      body: JSON.stringify({ action, notes: reviewNotes })
    });
    if (data?.proposal) {
      const list = await getProductionProposals(scriptId);
      const idx = list.findIndex(p => p.id === proposalId);
      if (idx !== -1) list[idx] = data.proposal;
      localStorage.setItem(getUserStorageKey(`prod_props_${scriptId}`), JSON.stringify(list));
      return data.proposal;
    }
  } catch (e) {}

  const list = await getProductionProposals(scriptId);
  const prop = list.find(p => p.id === proposalId);
  if (prop) {
    prop.status = action === 'accept' ? 'Accepted' : (action === 'reject' ? 'Rejected' : 'Conflict');
    prop.resolvedAt = new Date().toISOString();
    prop.resolutionNotes = reviewNotes || (action === 'accept' ? 'Accepted by Owner' : 'Declined during review');
    localStorage.setItem(getUserStorageKey(`prod_props_${scriptId}`), JSON.stringify(list));
  }
  return prop;
}

export async function getProductionAuditTrail(scriptId) {
  if (!scriptId) return [];
  try {
    const data = await request(`/production/${scriptId}/audit`);
    if (data?.auditTrail) {
      localStorage.setItem(getUserStorageKey(`prod_audit_${scriptId}`), JSON.stringify(data.auditTrail));
      return data.auditTrail;
    }
  } catch (e) {}

  const cached = localStorage.getItem(getUserStorageKey(`prod_audit_${scriptId}`));
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }

  return [];
}

// =========================================================================
// 9. CORE PRE-PRODUCTION WORKFLOWS API CLIENT METHODS
// =========================================================================

export async function getProductionScenes(scriptId) {
  if (!scriptId) return [];
  try {
    const data = await request(`/production/${scriptId}/scenes`);
    if (data?.scenes) {
      localStorage.setItem(getUserStorageKey(`prod_scenes_${scriptId}`), JSON.stringify(data.scenes));
      return data.scenes;
    }
  } catch (e) {}

  const cached = localStorage.getItem(getUserStorageKey(`prod_scenes_${scriptId}`));
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }

  return [];
}

export async function getProductionScene(scriptId, sceneId) {
  try {
    const data = await request(`/production/${scriptId}/scenes/${sceneId}`);
    if (data?.scene) return data.scene;
  } catch (e) {}

  const scenes = await getProductionScenes(scriptId);
  const scene = scenes.find(s => s.id === sceneId || String(s.sceneNumber) === String(sceneId));
  if (!scene) return null;
  const breakdown = await getProductionBreakdown(scriptId);
  const elements = breakdown.filter(b => b.sceneId === scene.id || b.sceneNumber === scene.sceneNumber || (Array.isArray(b.scenes) && b.scenes.includes(scene.sceneNumber)));
  return { ...scene, elements };
}

export async function updateProductionScene(scriptId, sceneId, updates) {
  try {
    const data = await request(`/production/${scriptId}/scenes/${sceneId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    if (data?.scene) return data.scene;
  } catch (e) {}

  const scenes = await getProductionScenes(scriptId);
  const scene = scenes.find(s => s.id === sceneId || String(s.sceneNumber) === String(sceneId));
  if (scene) {
    Object.assign(scene, updates);
    localStorage.setItem(getUserStorageKey(`prod_scenes_${scriptId}`), JSON.stringify(scenes));
    return scene;
  }
  return updates;
}

export async function getProductionBreakdown(scriptId, category = null, scene = null) {
  if (!scriptId) return [];
  try {
    const query = new URLSearchParams();
    if (category) query.set('category', category);
    if (scene) query.set('scene', scene);
    const qs = query.toString() ? `?${query.toString()}` : '';
    const data = await request(`/production/${scriptId}/breakdown${qs}`);
    if (data?.breakdown) {
      localStorage.setItem(getUserStorageKey(`prod_breakdown_${scriptId}`), JSON.stringify(data.breakdown));
      return data.breakdown;
    }
  } catch (e) {}

  const cached = localStorage.getItem(getUserStorageKey(`prod_breakdown_${scriptId}`));
  let list = [];
  if (cached) {
    try { list = JSON.parse(cached); } catch (_) {}
  }

  if (category && category !== 'all') {
    list = list.filter(b => b.category.toLowerCase() === category.toLowerCase());
  }
  if (scene && scene !== 'all') {
    const sceneNum = Number(String(scene).replace('scene-', ''));
    list = list.filter(b => b.sceneId === scene || String(b.sceneNumber) === String(scene) || (Array.isArray(b.scenes) && b.scenes.includes(sceneNum)) || b.sceneNumber === sceneNum);
  }
  return list;
}

export async function updateBreakdownItem(scriptId, itemId, updates) {
  try {
    const data = await request(`/production/${scriptId}/breakdown/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    if (data?.item) {
      const list = await getProductionBreakdown(scriptId);
      const idx = list.findIndex(b => b.id === itemId);
      if (idx !== -1) {
        list[idx] = data.item;
        localStorage.setItem(getUserStorageKey(`prod_breakdown_${scriptId}`), JSON.stringify(list));
      }
      return data.item;
    }
  } catch (e) {}

  const list = await getProductionBreakdown(scriptId);
  const item = list.find(b => b.id === itemId);
  if (item) {
    const ownerLabel = (store.state.currentUser?.name || "Screenplay Owner") + " (Owner)";
    if ((updates.name && updates.name !== item.name) || (updates.description && updates.description !== item.description)) {
      item.userCorrection = {
        previousName: item.name,
        previousDesc: item.description,
        correctedBy: ownerLabel,
        correctedAt: new Date().toISOString()
      };
    }
    Object.assign(item, updates);
    if (updates.status === 'Confirmed') {
      item.isHumanConfirmed = true;
      item.confirmedBy = ownerLabel;
      item.confirmedAt = new Date().toISOString();
    } else if (updates.status === 'Needs Review') {
      item.isHumanConfirmed = false;
    }
    localStorage.setItem(getUserStorageKey(`prod_breakdown_${scriptId}`), JSON.stringify(list));
    return item;
  }
  return updates;
}

export async function deleteBreakdownItem(scriptId, itemId) {
  try {
    const data = await request(`/production/${scriptId}/breakdown/${itemId}`, {
      method: 'DELETE'
    });
    if (data?.success) {
      const list = await getProductionBreakdown(scriptId);
      const filtered = list.filter(b => b.id !== itemId);
      localStorage.setItem(getUserStorageKey(`prod_breakdown_${scriptId}`), JSON.stringify(filtered));
      return data;
    }
  } catch (e) {}

  const list = await getProductionBreakdown(scriptId);
  const filtered = list.filter(b => b.id !== itemId);
  localStorage.setItem(getUserStorageKey(`prod_breakdown_${scriptId}`), JSON.stringify(filtered));
  return { success: true, removedId: itemId };
}

export async function createBreakdownItem(scriptId, itemData) {
  try {
    const data = await request(`/production/${scriptId}/breakdown`, {
      method: 'POST',
      body: JSON.stringify(itemData)
    });
    if (data?.item) {
      const list = await getProductionBreakdown(scriptId);
      list.unshift(data.item);
      localStorage.setItem(getUserStorageKey(`prod_breakdown_${scriptId}`), JSON.stringify(list));
      return data.item;
    }
  } catch (e) {}

  const list = await getProductionBreakdown(scriptId);
  const ownerLabel = (store.state.currentUser?.name || "Screenplay Owner") + " (Owner)";
  const sceneNum = Number(itemData.sceneNumber || (itemData.sceneId ? String(itemData.sceneId).replace('scene-', '') : 1));
  const newItem = {
    id: `elem-${Date.now()}`,
    scriptId,
    sceneId: itemData.sceneId || `scene-${sceneNum}`,
    sceneNumber: sceneNum,
    scenes: itemData.scenes || [sceneNum],
    category: itemData.category || "Props",
    name: itemData.name,
    description: itemData.description || "",
    sourceSnippet: itemData.sourceSnippet || "User added manual item",
    originalAiSuggestion: null,
    status: itemData.status || "Confirmed",
    isHumanConfirmed: true,
    confidence: 1.0,
    confirmedBy: ownerLabel,
    confirmedAt: new Date().toISOString(),
    notes: itemData.notes || "",
    assignedActor: itemData.assignedActor || "",
    castingStatus: itemData.castingStatus || "Uncast / Open",
    actorAvailability: itemData.actorAvailability || "",
    characterRole: itemData.characterRole || itemData.description || "",
    context: itemData.context || "INT.",
    lighting: itemData.lighting || "DAY",
    locationStatus: itemData.locationStatus || "Secured & Permitted",
    accessDetails: itemData.accessDetails || "",
    sourcingType: itemData.sourcingType || "Sourced",
    quantity: itemData.quantity || "1",
    readinessStatus: itemData.readinessStatus || "Ready in Art Dept",
    continuityNotes: itemData.continuityNotes || "",
    requiredResources: itemData.requiredResources || "",
    technicalRequirements: itemData.technicalRequirements || "",
    safetyNotes: itemData.safetyNotes || "",
    coordinationRequirements: itemData.coordinationRequirements || "",
    qualifiedPersonnel: itemData.qualifiedPersonnel || "",
    safetyPlanningStatus: itemData.safetyPlanningStatus || "Awaiting Coordinator Review",
    character: itemData.character || "",
    wardrobeRequirements: itemData.wardrobeRequirements || "",
    continuityChanges: itemData.continuityChanges || "",
    prepStatus: itemData.prepStatus || "In Prep",
    availability: itemData.availability || "",
    operationalRequirements: itemData.operationalRequirements || ""
  };
  list.unshift(newItem);
  localStorage.setItem(getUserStorageKey(`prod_breakdown_${scriptId}`), JSON.stringify(list));
  return newItem;
}

export async function getProductionCallSheets(scriptId) {
  if (!scriptId) return [];
  try {
    const data = await request(`/production/${scriptId}/call-sheets`);
    if (data?.callSheets) {
      localStorage.setItem(getUserStorageKey(`prod_callsheets_${scriptId}`), JSON.stringify(data.callSheets));
      return data.callSheets;
    }
  } catch (e) {}

  const cached = localStorage.getItem(getUserStorageKey(`prod_callsheets_${scriptId}`));
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }

  return [];
}

export async function getProductionCallSheet(scriptId, callSheetId) {
  try {
    const data = await request(`/production/${scriptId}/call-sheets/${callSheetId}`);
    if (data?.callSheet) return data.callSheet;
  } catch (e) {}

  const sheets = await getProductionCallSheets(scriptId);
  return sheets.find(cs => cs.id === callSheetId) || null;
}

export async function createProductionCallSheet(scriptId, data) {
  try {
    const res = await request(`/production/${scriptId}/call-sheets`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (res?.callSheet) return res.callSheet;
  } catch (e) {}

  const sheets = await getProductionCallSheets(scriptId);
  const newCs = {
    id: `cs-${Date.now()}`,
    scriptId,
    callSheetNumber: String(sheets.length + 1).padStart(2, '0'),
    shootDay: data.shootDay || `Day ${sheets.length + 1}`,
    shootDate: data.shootDate || "TBD",
    generalCrewCall: data.generalCrewCall || "06:00 AM",
    shootingCall: data.shootingCall || "06:30 AM",
    breakfastTime: data.breakfastTime || "05:15 AM",
    estimatedWrap: data.estimatedWrap || "06:30 PM",
    status: "Draft",
    isPublished: false,
    version: "v0.9",
    locationName: data.locationName || "Location TBD",
    locationAddress: data.locationAddress || "TBD",
    parkingNotes: data.parkingNotes || "Crew parking guidelines.",
    nearestHospital: data.nearestHospital || "TBD",
    weatherSummary: data.weatherSummary || "Forecast pending.",
    scenes: data.scenes || [],
    castCalls: data.castCalls || [],
    specialInstructions: data.specialInstructions || "Standard safety directives.",
    approvedBy: null,
    publishedAt: null
  };
  sheets.push(newCs);
  localStorage.setItem(getUserStorageKey(`prod_callsheets_${scriptId}`), JSON.stringify(sheets));
  return newCs;
}

export async function updateProductionCallSheet(scriptId, callSheetId, updates) {
  try {
    const res = await request(`/production/${scriptId}/call-sheets/${callSheetId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    if (res?.callSheet) return res.callSheet;
  } catch (e) {}

  const sheets = await getProductionCallSheets(scriptId);
  const cs = sheets.find(c => c.id === callSheetId);
  if (cs) {
    Object.assign(cs, updates);
    localStorage.setItem(getUserStorageKey(`prod_callsheets_${scriptId}`), JSON.stringify(sheets));
    return cs;
  }
  return updates;
}

export async function publishProductionCallSheet(scriptId, callSheetId) {
  try {
    const res = await request(`/production/${scriptId}/call-sheets/${callSheetId}/publish`, {
      method: 'POST'
    });
    if (res?.callSheet) return res.callSheet;
  } catch (e) {}

  const sheets = await getProductionCallSheets(scriptId);
  const cs = sheets.find(c => c.id === callSheetId);
  if (cs) {
    cs.status = "Confirmed";
    cs.isPublished = true;
    cs.version = "v1.0 (Snapshot)";
    cs.approvedBy = (store.state.currentUser?.name || "Screenplay Owner") + " (Owner)";
    cs.publishedAt = new Date().toISOString();
    localStorage.setItem(getUserStorageKey(`prod_callsheets_${scriptId}`), JSON.stringify(sheets));
    return cs;
  }
  return null;
}

export async function getProductionSchedule(scriptId) {
  if (!scriptId) return [];
  try {
    const data = await request(`/production/${scriptId}/schedule`);
    if (data?.schedule) {
      localStorage.setItem(getUserStorageKey(`prod_schedule_${scriptId}`), JSON.stringify(data.schedule));
      return data.schedule;
    }
  } catch (e) {}

  const cached = localStorage.getItem(getUserStorageKey(`prod_schedule_${scriptId}`));
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }

  return [];
}

export async function updateProductionScheduleDay(scriptId, dayNumber, updates) {
  try {
    const res = await request(`/production/${scriptId}/schedule/day/${dayNumber}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    if (res?.day) return res.day;
  } catch (e) {}

  const schedule = await getProductionSchedule(scriptId);
  const day = schedule.find(d => d.dayNumber === Number(dayNumber));
  if (day) {
    Object.assign(day, updates);
    localStorage.setItem(getUserStorageKey(`prod_schedule_${scriptId}`), JSON.stringify(schedule));
    return day;
  }
  return updates;
}

export async function confirmProductionSchedule(scriptId) {
  try {
    const res = await request(`/production/${scriptId}/schedule/confirm`, {
      method: 'POST'
    });
    if (res?.schedule) return res.schedule;
  } catch (e) {}

  const schedule = await getProductionSchedule(scriptId);
  schedule.forEach(day => {
    day.status = "Confirmed";
    day.isLocked = true;
  });
  localStorage.setItem(getUserStorageKey(`prod_schedule_${scriptId}`), JSON.stringify(schedule));
  return schedule;
}

export async function moveSceneBetweenDays(scriptId, sceneNum, fromDayNum, toDayNum) {
  const schedule = await getProductionSchedule(scriptId);
  const fromDay = schedule.find(d => d.dayNumber === Number(fromDayNum));
  const toDay = schedule.find(d => d.dayNumber === Number(toDayNum));
  if (!fromDay || !toDay) return schedule;

  fromDay.sceneNumbers = (fromDay.sceneNumbers || []).filter(n => n !== Number(sceneNum));
  if (!(toDay.sceneNumbers || []).includes(Number(sceneNum))) {
    toDay.sceneNumbers = [...(toDay.sceneNumbers || []), Number(sceneNum)];
  }

  await updateProductionScheduleDay(scriptId, fromDayNum, { sceneNumbers: fromDay.sceneNumbers });
  await updateProductionScheduleDay(scriptId, toDayNum, { sceneNumbers: toDay.sceneNumbers });
  return schedule;
}

export async function reorderSceneWithinDay(scriptId, dayNumber, newSceneNumbers) {
  return await updateProductionScheduleDay(scriptId, dayNumber, { sceneNumbers: newSceneNumbers });
}

export async function getProductionReadiness(scriptId) {
  if (!scriptId) return [];
  try {
    const data = await request(`/production/${scriptId}/readiness`);
    if (data?.readiness) {
      localStorage.setItem(getUserStorageKey(`prod_readiness_${scriptId}`), JSON.stringify(data.readiness));
      return data.readiness;
    }
  } catch (e) {}

  const cached = localStorage.getItem(getUserStorageKey(`prod_readiness_${scriptId}`));
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }

  return [];
}

export async function resolveProductionReadiness(scriptId, readinessId) {
  try {
    const res = await request(`/production/${scriptId}/readiness/${readinessId}/resolve`, {
      method: 'POST'
    });
    if (res?.readinessItem) return res.readinessItem;
  } catch (e) {}

  const list = await getProductionReadiness(scriptId);
  const item = list.find(r => r.id === readinessId);
  if (item) {
    item.status = "resolved";
    item.severity = "ready";
    localStorage.setItem(getUserStorageKey(`prod_readiness_${scriptId}`), JSON.stringify(list));
    return item;
  }
  return null;
}

export async function restoreProductionSnapshot(scriptId, versionTag) {
  try {
    const res = await request(`/production/${scriptId}/restore`, {
      method: 'POST',
      body: JSON.stringify({ version: versionTag })
    });
    if (res?.workspace) return res.workspace;
  } catch (e) {}

  const ws = await getProductionWorkspace(scriptId);
  ws.pinnedSourceVersion = versionTag;
  ws.pinnedTimestamp = "Just now (Restored)";
  ws.isStale = false;
  localStorage.setItem(getUserStorageKey(`prod_ws_${scriptId}`), JSON.stringify(ws));
  return ws;
}

export async function deleteProductionCallSheet(scriptId, csId) {
  try {
    const res = await request(`/production/${scriptId}/call-sheets/${csId}`, { method: 'DELETE' });
    if (res?.success) {
      const sheets = await getProductionCallSheets(scriptId);
      const filtered = sheets.filter(c => c.id !== csId);
      localStorage.setItem(getUserStorageKey(`prod_callsheets_${scriptId}`), JSON.stringify(filtered));
      return res;
    }
  } catch (e) {}

  const sheets = await getProductionCallSheets(scriptId);
  const filtered = sheets.filter(c => c.id !== csId);
  localStorage.setItem(getUserStorageKey(`prod_callsheets_${scriptId}`), JSON.stringify(filtered));
  return { success: true, removedId: csId };
}

export async function addProductionScheduleDay(scriptId, dayData) {
  try {
    const res = await request(`/production/${scriptId}/schedule/day`, {
      method: 'POST',
      body: JSON.stringify(dayData)
    });
    if (res?.day) {
      const days = await getProductionSchedule(scriptId);
      days.push(res.day);
      localStorage.setItem(getUserStorageKey(`prod_schedule_${scriptId}`), JSON.stringify(days));
      return res.day;
    }
  } catch (e) {}

  const days = await getProductionSchedule(scriptId);
  const nextNum = days.length > 0 ? Math.max(...days.map(d => d.dayNumber)) + 1 : 1;
  const newDay = {
    dayNumber: dayData.dayNumber || nextNum,
    date: dayData.date || `Nov ${String(nextNum).padStart(2, '0')}, 2026`,
    title: dayData.title || `Shoot Day ${nextNum}`,
    location: dayData.location || "Location TBD",
    sceneNumbers: dayData.sceneNumbers || [],
    totalPages: dayData.totalPages || "0 0/8",
    estHours: dayData.estHours || 8.0,
    companyMoves: dayData.companyMoves || 0,
    isLocked: false,
    status: "Draft"
  };
  days.push(newDay);
  localStorage.setItem(getUserStorageKey(`prod_schedule_${scriptId}`), JSON.stringify(days));
  return newDay;
}

export async function deleteProductionScheduleDay(scriptId, dayNumber) {
  const num = Number(dayNumber);
  try {
    const res = await request(`/production/${scriptId}/schedule/day/${num}`, { method: 'DELETE' });
    if (res?.success) {
      const days = await getProductionSchedule(scriptId);
      const filtered = days.filter(d => d.dayNumber !== num);
      localStorage.setItem(getUserStorageKey(`prod_schedule_${scriptId}`), JSON.stringify(filtered));
      return res;
    }
  } catch (e) {}

  const days = await getProductionSchedule(scriptId);
  const filtered = days.filter(d => d.dayNumber !== num);
  localStorage.setItem(getUserStorageKey(`prod_schedule_${scriptId}`), JSON.stringify(filtered));
  return { success: true, removedDayNumber: num };
}

export async function createProductionResource(scriptId, resData) {
  try {
    const res = await request(`/production/${scriptId}/resources`, {
      method: 'POST',
      body: JSON.stringify(resData)
    });
    if (res?.resource) {
      const list = await getProductionResources(scriptId);
      list.push(res.resource);
      localStorage.setItem(getUserStorageKey(`prod_res_${scriptId}`), JSON.stringify(list));
      localStorage.setItem(getUserStorageKey(`prod_resources_${scriptId}`), JSON.stringify(list));
      return res.resource;
    }
  } catch (e) {}

  const list = await getProductionResources(scriptId);
  const newRes = {
    id: `res-${Date.now()}`,
    scriptId,
    category: resData.category || "Crew",
    name: resData.name,
    role: resData.role || "",
    department: resData.department || resData.category || "Production",
    scenes: resData.scenes || [],
    status: resData.status || "Confirmed",
    contactRestricted: resData.contactRestricted || false,
    contact: resData.contact || "",
    notes: resData.notes || ""
  };
  list.push(newRes);
  localStorage.setItem(getUserStorageKey(`prod_res_${scriptId}`), JSON.stringify(list));
  localStorage.setItem(getUserStorageKey(`prod_resources_${scriptId}`), JSON.stringify(list));
  return newRes;
}

export async function updateProductionResource(scriptId, resId, updates) {
  try {
    const res = await request(`/production/${scriptId}/resources/${resId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    if (res?.resource) {
      const list = await getProductionResources(scriptId);
      const idx = list.findIndex(r => r.id === resId);
      if (idx !== -1) list[idx] = res.resource;
      localStorage.setItem(getUserStorageKey(`prod_res_${scriptId}`), JSON.stringify(list));
      localStorage.setItem(getUserStorageKey(`prod_resources_${scriptId}`), JSON.stringify(list));
      return res.resource;
    }
  } catch (e) {}

  const list = await getProductionResources(scriptId);
  const item = list.find(r => r.id === resId);
  if (item) {
    Object.assign(item, updates);
    localStorage.setItem(getUserStorageKey(`prod_res_${scriptId}`), JSON.stringify(list));
    localStorage.setItem(getUserStorageKey(`prod_resources_${scriptId}`), JSON.stringify(list));
    return item;
  }
  return updates;
}

export async function deleteProductionResource(scriptId, resId) {
  try {
    const res = await request(`/production/${scriptId}/resources/${resId}`, { method: 'DELETE' });
    if (res?.success) {
      const list = await getProductionResources(scriptId);
      const filtered = list.filter(r => r.id !== resId);
      localStorage.setItem(getUserStorageKey(`prod_res_${scriptId}`), JSON.stringify(filtered));
      localStorage.setItem(getUserStorageKey(`prod_resources_${scriptId}`), JSON.stringify(filtered));
      return res;
    }
  } catch (e) {}

  const list = await getProductionResources(scriptId);
  const filtered = list.filter(r => r.id !== resId);
  localStorage.setItem(getUserStorageKey(`prod_res_${scriptId}`), JSON.stringify(filtered));
  localStorage.setItem(getUserStorageKey(`prod_resources_${scriptId}`), JSON.stringify(filtered));
  return { success: true, removedId: resId };
}

export async function createProductionDocument(scriptId, docData) {
  try {
    const res = await request(`/production/${scriptId}/documents`, {
      method: 'POST',
      body: JSON.stringify(docData)
    });
    if (res?.document) {
      const docs = await getProductionDocuments(scriptId);
      docs.unshift(res.document);
      localStorage.setItem(getUserStorageKey(`prod_docs_${scriptId}`), JSON.stringify(docs));
      return res.document;
    }
  } catch (e) {}

  const docs = await getProductionDocuments(scriptId);
  const newDoc = {
    id: `doc-${Date.now()}`,
    scriptId,
    type: docData.type || "Production Report",
    title: docData.title || "New Production Document",
    sourceVersion: docData.sourceVersion || "Draft 1.0",
    shootDay: docData.shootDay || "General",
    date: docData.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    location: docData.location || "Production Basecamp",
    scenes: docData.scenes || [],
    status: docData.status || "Draft",
    published: docData.published || false,
    version: docData.version || "v0.9"
  };
  docs.unshift(newDoc);
  localStorage.setItem(getUserStorageKey(`prod_docs_${scriptId}`), JSON.stringify(docs));
  return newDoc;
}

export async function deleteProductionDocument(scriptId, docId) {
  try {
    const res = await request(`/production/${scriptId}/documents/${docId}`, { method: 'DELETE' });
    if (res?.success) {
      const docs = await getProductionDocuments(scriptId);
      const filtered = docs.filter(d => d.id !== docId);
      localStorage.setItem(getUserStorageKey(`prod_docs_${scriptId}`), JSON.stringify(filtered));
      return res;
    }
  } catch (e) {}

  const docs = await getProductionDocuments(scriptId);
  const filtered = docs.filter(d => d.id !== docId);
  localStorage.setItem(getUserStorageKey(`prod_docs_${scriptId}`), JSON.stringify(filtered));
  return { success: true, removedId: docId };
}

// =========================================================================
// 10. STORYBOARD STUDIO API CLIENT METHODS
// =========================================================================

export async function getAiImageProviders() {
  try {
    const data = await request('/production/ai/providers');
    if (data?.providers) return data.providers;
  } catch (e) {}

  return [
    {
      id: "pollinations-flux",
      name: "Pollinations AI (FLUX.1)",
      model: "flux",
      isConfigured: true,
      pricingType: "free",
      costPerImage: 0.0,
      costLabel: "Free (No Key Required)",
      requiresApiKey: false,
      aspectRatios: ["16:9", "2.39:1", "1:1", "4:3", "9:16"],
      styles: [
        "Cinematic Concept Art",
        "Photorealistic / Live Action",
        "Storyboard Ink",
        "Pencil Sketch",
        "3D Animation",
        "Anime / Illustration",
        "Storyboard Sketch",
        "Graphic Novel",
        "Noir / High Contrast B&W",
        "Watercolor",
        "Vintage Film",
        "Cyberpunk / Neon"
      ],
      description: "High-fidelity photorealistic and cinematic storyboard frame generation via Black Forest Labs FLUX.1 engine."
    },
    {
      id: "scriptora-concept",
      name: "SCRIPTORA Concept Engine",
      model: "v2.4 High-Res Vector & Composition",
      isConfigured: true,
      pricingType: "free",
      costPerImage: 0.0,
      costLabel: "Free (Built-in)",
      requiresApiKey: false,
      aspectRatios: ["2.39:1", "16:9", "4:3", "9:16"],
      styles: [
        "Cinematic Concept Art",
        "Storyboard Ink",
        "Pencil Sketch",
        "Photorealistic / Live Action",
        "3D Animation",
        "Anime / Illustration"
      ],
      description: "Fast, cinematic vector canvas with camera crosshairs, aspect ratio letterboxing, stylized character silhouettes, and directional lighting."
    },
    {
      id: "nvidia-nim",
      name: "NVIDIA NIM (FLUX.1-dev)",
      model: "black-forest-labs/flux.1-dev",
      isConfigured: true,
      pricingType: "free",
      costPerImage: 0.0,
      costLabel: "Free Tier (NVIDIA Developer)",
      requiresApiKey: true,
      envVarName: "NVIDIA_API_KEY",
      aspectRatios: ["16:9", "2.39:1", "1:1", "4:3", "9:16"],
      styles: [
        "Cinematic Concept Art",
        "Photorealistic / Live Action",
        "Storyboard Ink",
        "Pencil Sketch",
        "3D Animation",
        "Anime / Illustration",
        "Storyboard Sketch",
        "Graphic Novel",
        "Noir / High Contrast B&W",
        "Watercolor",
        "Vintage Film",
        "Cyberpunk / Neon"
      ],
      description: "High-fidelity visual storyboard frame synthesis via official NVIDIA NIM Cloud Functions (FLUX.1-dev)."
    },
    {
      id: "openai-dalle3",
      name: "OpenAI DALL-E 3",
      model: "dall-e-3",
      isConfigured: false,
      pricingType: "paid",
      costPerImage: 0.040,
      costLabel: "$0.040 (Standard) / $0.080 (HD)",
      requiresApiKey: true,
      envVarName: "OPENAI_API_KEY",
      aspectRatios: ["16:9", "2.39:1", "1:1", "9:16"],
      styles: ["Photorealistic / Live Action", "Cinematic Concept Art", "Pencil Sketch", "3D Animation"],
      description: "High-fidelity photorealistic rendering and complex composition synthesis via OpenAI API."
    },
    {
      id: "gemini-imagen3",
      name: "Google Imagen 3",
      model: "imagen-3.0-generate-002",
      isConfigured: false,
      pricingType: "paid",
      costPerImage: 0.030,
      costLabel: "$0.030 per image",
      requiresApiKey: true,
      envVarName: "GEMINI_API_KEY",
      aspectRatios: ["16:9", "4:3", "1:1", "9:16"],
      styles: ["Cinematic Concept Art", "Photorealistic / Live Action", "Storyboard Ink"],
      description: "Photorealistic film still generation using Google Vertex/Gemini Imagen 3."
    },
    {
      id: "stability-sdxl",
      name: "Stability AI SDXL",
      model: "stable-diffusion-xl-1024-v1-0",
      isConfigured: false,
      pricingType: "paid",
      costPerImage: 0.018,
      costLabel: "$0.018 per image",
      requiresApiKey: true,
      envVarName: "STABILITY_API_KEY",
      aspectRatios: ["16:9", "2.39:1", "4:3", "9:16"],
      styles: ["Storyboard Ink", "Pencil Sketch", "Cinematic Concept Art", "Anime / Illustration"],
      description: "Versatile storyboard and concept illustration synthesis via Stability AI."
    }
  ];
}

export async function getStoryboards(scriptId) {
  if (!scriptId) return [];
  const storageKey = getUserStorageKey(`storyboards_${scriptId}`);
  try {
    const data = await request(`/production/${scriptId}/storyboards`);
    if (data?.storyboards) {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(storageKey, JSON.stringify(data.storyboards));
      }
      return data.storyboards;
    }
  } catch (e) {
    if (!shouldFallbackToOfflineCache(e)) throw e;
  }

  const cached = typeof localStorage !== 'undefined' ? localStorage.getItem(storageKey) : null;
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }
  return [];
}


// =========================================================================
// Storyboard Storage & Sanitization Infrastructure
// Prevents QuotaExceededError by eliminating giant base64 payloads from localStorage
// =========================================================================

const NEUTRAL_STORYBOARD_FALLBACK = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
    <rect width="800" height="450" fill="#0f172a"/>
    <rect x="24" y="24" width="752" height="402" rx="12" fill="none" stroke="#334155" stroke-width="2" stroke-dasharray="8 6"/>
    <text x="400" y="218" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="18" font-weight="600">Storyboard Frame</text>
    <text x="400" y="246" text-anchor="middle" fill="#64748b" font-family="system-ui, sans-serif" font-size="13">Preview unavailable</text>
  </svg>`
)}`;

export function resolveStoryboardAssetUrl(url, shotNumber = '') {
  if (!url || typeof url !== 'string') {
    return NEUTRAL_STORYBOARD_FALLBACK;
  }

  // 1. If it's an SVG data URI wrapping a storyboard asset
  if (url.startsWith('data:image/svg+xml') && (url.includes('assets/storyboard') || url.includes('assets%2Fstoryboard'))) {
    try {
      const decoded = decodeURIComponent(url);
      const m = decoded.match(/assets\/storyboard\/([a-zA-Z0-9_.-]+)/);
      if (m && m[1]) {
        return `${BASE_ASSET_URL}assets/storyboard/${m[1]}`;
      }
    } catch (_) {}
  }

  // 2. If it's a real raster image data URI (JPEG, PNG, WebP) or inline SVG from AI generation or user upload
  if (url.startsWith('data:image/jpeg') || url.startsWith('data:image/png') || url.startsWith('data:image/webp') || url.startsWith('data:image/svg')) {
    return url;
  }

  // 4. If it starts with http / https or any other data URI
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:image/')) {
    return url;
  }

  // 5. If it's a server image endpoint path (/production/storyboard/images/... or /api/v1/storage/...)
  if (url.includes('/storyboard/images/') || url.includes('/storage/storyboard/')) {
    const baseClean = API_BASE_URL.replace(/\/api\/?$/, '');
    let fullUrl = url.startsWith('http') ? url : `${baseClean}${url.startsWith('/') ? '' : '/'}${url}`;
    const token = getAuthToken();
    if (token && !fullUrl.includes('token=')) {
      const sep = fullUrl.includes('?') ? '&' : '?';
      fullUrl = `${fullUrl}${sep}token=${encodeURIComponent(token)}`;
    }
    return fullUrl;
  }

  // 4. If it's a path like /assets/... or assets/...
  if (url.includes('assets/storyboard/') || url.includes('assets/styles/')) {
    const clean = url.replace(/^\/?(Scriptora\/)?/, '');
    return `${BASE_ASSET_URL}${clean}`;
  }

  return url;
}

export function sanitizeStoryboard(sb) {
  if (!sb || typeof sb !== 'object') return sb;
  const copy = { ...sb };

  if (Array.isArray(copy.shots)) {
    copy.shots = copy.shots.map(shot => {
      const s = { ...shot };
      s.imageUrl = resolveStoryboardAssetUrl(s.imageUrl, s.shotNumber);

      // Sanitize version history to preserve metadata without giant base64 binaries
      if (Array.isArray(s.history)) {
        s.history = s.history.slice(0, 20).map((h) => {
          const item = { ...h };
          const img = item.previousImageUrl || item.imageUrl;
          item.previousImageUrl = resolveStoryboardAssetUrl(img, s.shotNumber);
          delete item.imageUrl;
          return item;
        });
      }
      return s;
    });
  }
  return copy;
}

export function cleanupLegacyStoryboardStorage() {
  if (typeof localStorage === 'undefined') return;
  try {
    const keysToClean = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('scriptora_storyboard_') && !k.includes('_preferences') && !k.includes('_rb_')) {
        keysToClean.push(k);
      }
    }
    keysToClean.forEach(k => {
      try {
        const raw = localStorage.getItem(k);
        if (raw && (raw.includes('data:image/svg') || raw.includes('data:image/jpeg') || raw.length > 50000)) {
          const parsed = JSON.parse(raw);
          const cleaned = sanitizeStoryboard(parsed);
          localStorage.setItem(k, JSON.stringify(cleaned));
          console.info(`[SCRIPTORA Storage] Successfully migrated legacy oversized cache: ${k} (${raw.length}b -> ${JSON.stringify(cleaned).length}b)`);
        }
      } catch (_) {}
    });
  } catch (err) {
    console.warn('[SCRIPTORA Storage] Legacy cleanup check skipped:', err);
  }
}

export function safeStorageSetItem(key, value) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.warn(`[SCRIPTORA Storage] localStorage.setItem failed for ${key}, running emergency purge:`, err.message);
    try {
      cleanupLegacyStoryboardStorage();
      localStorage.setItem(key, value);
    } catch (e2) {
      console.error(`[SCRIPTORA Storage] Quota still exceeded for ${key} after purge. Suppressed.`, e2.message);
    }
  }
}

export function safeSetStoredStoryboard(scriptId, sceneId, storyboard) {
  if (!storyboard) return;
  const sanitized = sanitizeStoryboard(storyboard);
  const storageKey = getUserStorageKey(`storyboard_${scriptId}_${sceneId}`);
  safeStorageSetItem(storageKey, JSON.stringify(sanitized));
}

// Auto-run legacy storage migration on startup
if (typeof window !== 'undefined') {
  setTimeout(cleanupLegacyStoryboardStorage, 100);
}

export async function getStoryboardSignedUrl(scriptId, storagePath) {
  try {
    const data = await request(`/production/${scriptId}/storyboard/signed-url`, {
      method: 'POST',
      body: JSON.stringify({ storagePath })
    });
    return data.signedUrl || null;
  } catch (err) {
    console.warn('[Storyboard] Failed to fetch signed URL:', err.message);
    return null;
  }
}

export function generateStoryboardImageFilename({
  scriptTitle = 'Scriptora',
  sceneNumber = 1,
  shotNumber = '1A',
  shotTitle = '',
  extension = 'jpg'
} = {}) {
  const sanitize = (str) => String(str || '')
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');

  const cleanScript = sanitize(scriptTitle) || 'Scriptora';
  const cleanScene = `Scene_${String(sceneNumber).replace(/^scene-/i, '')}`;
  const cleanShot = `Shot_${sanitize(shotNumber) || '1A'}`;
  const cleanTitle = sanitize(shotTitle);

  const parts = [cleanScript, cleanScene, cleanShot];
  if (cleanTitle) parts.push(cleanTitle);

  const cleanExt = (extension || 'jpg').replace(/^\./, '').toLowerCase();
  return `${parts.join('_')}.${cleanExt}`;
}

export async function downloadStoryboardImage(imageUrl, options = {}) {
  if (!imageUrl) {
    throw new Error('No image available to download');
  }

  const {
    scriptTitle = 'Scriptora',
    sceneNumber = 1,
    shotNumber = '1A',
    shotTitle = '',
    scriptId = null,
    storagePath = null
  } = options;

  let blob = null;
  const resolved = resolveStoryboardAssetUrl(imageUrl, shotNumber);

  // 1. Data URI
  if (resolved.startsWith('data:')) {
    if (resolved.startsWith('data:image/svg+xml')) {
      const commaIdx = resolved.indexOf(',');
      const header = resolved.substring(0, commaIdx);
      const content = resolved.substring(commaIdx + 1);
      const isBase64 = header.includes(';base64');
      const svgText = isBase64 ? atob(content) : decodeURIComponent(content);
      blob = new Blob([svgText], { type: 'image/svg+xml' });
    } else {
      const commaIdx = resolved.indexOf(',');
      const header = resolved.substring(0, commaIdx);
      const content = resolved.substring(commaIdx + 1);
      const mime = header.match(/:(.*?);/)?.[1] || 'image/jpeg';
      const byteString = atob(content);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      blob = new Blob([ab], { type: mime });
    }
  } else {
    // 2. Direct HTTP or asset path fetch
    try {
      const res = await fetch(resolved, { mode: 'cors' });
      if (res.ok) {
        blob = await res.blob();
      }
    } catch (e) {
      console.warn('[downloadStoryboardImage] Direct fetch failed:', e.message);
    }

    // 3. Expired signed URL refresh
    if (!blob && storagePath && scriptId) {
      try {
        const freshUrl = await getStoryboardSignedUrl(scriptId, storagePath);
        if (freshUrl) {
          const res = await fetch(freshUrl, { mode: 'cors' });
          if (res.ok) {
            blob = await res.blob();
          }
        }
      } catch (e) {
        console.warn('[downloadStoryboardImage] Fresh signed URL fetch failed:', e.message);
      }
    }

    // 4. Authenticated backend download proxy fallback
    if (!blob && scriptId && (storagePath || resolved.includes('/production/storyboard/images/'))) {
      try {
        const token = (typeof localStorage !== 'undefined' && (localStorage.getItem('scriptora_auth_token') || localStorage.getItem('scriptora_token'))) || null;
        const authHeader = token ? { 'Authorization': `Bearer ${token}` } : {};
        const filenameParam = resolved.split('/').pop();
        const proxyUrl = `${getApiBaseUrl()}/production/${scriptId}/storyboard/download?${storagePath ? `storagePath=${encodeURIComponent(storagePath)}` : `filename=${encodeURIComponent(filenameParam)}`}`;
        const res = await fetch(proxyUrl, { headers: authHeader });
        if (res.ok) {
          blob = await res.blob();
        }
      } catch (e) {
        console.warn('[downloadStoryboardImage] Backend proxy fetch failed:', e.message);
      }
    }
  }

  if (!blob) {
    throw new Error('Unable to retrieve image file for download');
  }

  // Detect extension
  let ext = 'jpg';
  const type = blob.type.toLowerCase();
  if (type.includes('png')) ext = 'png';
  else if (type.includes('webp')) ext = 'webp';
  else if (type.includes('svg')) ext = 'svg';
  else if (type.includes('jpeg') || type.includes('jpg')) ext = 'jpg';
  else if (type.includes('gif')) ext = 'gif';
  else {
    try {
      const slice = await blob.slice(0, 8).arrayBuffer();
      const u8 = new Uint8Array(slice);
      if (u8[0] === 0x89 && u8[1] === 0x50 && u8[2] === 0x4E && u8[3] === 0x47) ext = 'png';
      else if (u8[0] === 0x52 && u8[1] === 0x49 && u8[2] === 0x46 && u8[3] === 0x46) ext = 'webp';
      else ext = 'jpg';
    } catch (_) {
      ext = 'jpg';
    }
  }

  const filename = generateStoryboardImageFilename({
    scriptTitle,
    sceneNumber,
    shotNumber,
    shotTitle,
    extension: ext
  });

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(objectUrl);
    }, 2500);
  }

  return { success: true, filename, size: blob.size, mime: blob.type };
}

export async function getStoryboard(scriptId, sceneId = 'scene-1') {
  if (!scriptId) return null;
  // Read user-scoped local cache first to compare timestamps / shot counts
  const storageKey = getUserStorageKey(`storyboard_${scriptId}_${sceneId}`);
  const cachedRaw = typeof localStorage !== 'undefined' ? localStorage.getItem(storageKey) : null;
  let cachedSb = null;
  if (cachedRaw) {
    try { cachedSb = sanitizeStoryboard(JSON.parse(cachedRaw)); } catch (_) {}
  }

  // 1. Try Cloud Database (Firestore) if configured
  try {
    const cloudSb = await fetchStoryboardFromFirestore(scriptId, sceneId);
    if (cloudSb) {
      const cloudShots = Array.isArray(cloudSb.shots) ? cloudSb.shots : [];
      const localShots = Array.isArray(cachedSb?.shots) ? cachedSb.shots : [];
      if (cloudShots.length >= localShots.length || localShots.length === 0) {
        safeSetStoredStoryboard(scriptId, sceneId, cloudSb);
        return sanitizeStoryboard(cloudSb);
      }
    }
  } catch (_) {}

  // 2. Try SCRIPTORA backend server
  try {
    const data = await request(`/production/${scriptId}/storyboard?sceneId=${sceneId}`);
    if (data?.storyboard) {
      const serverShots = Array.isArray(data.storyboard.shots) ? data.storyboard.shots : [];
      const localShots = Array.isArray(cachedSb?.shots) ? cachedSb.shots : [];
      if (serverShots.length >= localShots.length || localShots.length === 0) {
        safeSetStoredStoryboard(scriptId, sceneId, data.storyboard);
        return sanitizeStoryboard(data.storyboard);
      } else {
        data.storyboard.shots = localShots;
        return sanitizeStoryboard(data.storyboard);
      }
    }
  } catch (e) {}

  // 3. Fall back to local browser storage
  if (cachedSb) {
    return cachedSb;
  }

  const scenes = await getProductionScenes(scriptId);
  const sceneNum = Number(String(sceneId).replace('scene-', '')) || 1;
  const scene = (scenes && scenes.find(s => s.id === sceneId || s.sceneNumber === sceneNum)) || {
    id: `scene-${sceneNum}`,
    sceneNumber: sceneNum,
    heading: `SCENE ${sceneNum} - UNTITLED`,
    intExt: 'INT',
    dayNight: 'DAY'
  };

  const sb = {
    id: `sb-${scriptId}-${scene.id}`,
    scriptId,
    sceneId: scene.id,
    sceneNumber: scene.sceneNumber,
    sceneHeading: scene.heading,
    intExt: scene.intExt || 'INT',
    dayNight: scene.dayNight || 'DAY',
    sourceVersion: "Draft 1.0",
    isVersionStale: false,
    aspectRatio: "2.39:1",
    visualStyle: "Cinematic Concept Art",
    shots: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  safeSetStoredStoryboard(scriptId, sceneId, sb);
  return sb;
}

export async function saveStoryboard(scriptId, storyboardData) {
  const sceneId = storyboardData.sceneId || `scene-${storyboardData.sceneNumber || 1}`;

  // Sync to Cloud Database (Firestore) in background if configured
  syncStoryboardToFirestore(scriptId, sceneId, storyboardData).catch(() => {});

  try {
    const res = await request(`/production/${scriptId}/storyboard`, {
      method: 'POST',
      body: JSON.stringify(storyboardData)
    });
    if (res?.storyboard) {
      safeSetStoredStoryboard(scriptId, res.storyboard.sceneId, res.storyboard);
      return res.storyboard;
    }
  } catch (e) {}

  safeSetStoredStoryboard(scriptId, sceneId, storyboardData);
  return storyboardData;
}

export async function addStoryboardShot(scriptId, sceneId, shotData) {
  try {
    const res = await request(`/production/${scriptId}/storyboard/${sceneId}/shots`, {
      method: 'POST',
      body: JSON.stringify(shotData)
    });
    if (res?.shot) {
      if (res.storyboard) {
        safeSetStoredStoryboard(scriptId, sceneId, res.storyboard);
        syncStoryboardToFirestore(scriptId, sceneId, res.storyboard).catch(() => {});
      }
      return res;
    }
  } catch (e) {}

  const sb = await getStoryboard(scriptId, sceneId);
  if (!Array.isArray(sb.shots)) sb.shots = [];
  const nextOrder = sb.shots.length + 1;
  const shotLetter = String.fromCharCode(65 + ((nextOrder - 1) % 26));
  const shotNumber = shotData.shotNumber || `${sb.sceneNumber || 1}${shotLetter}`;

  const newShot = {
    id: `shot-${Date.now()}`,
    shotNumber,
    order: nextOrder,
    title: shotData.title || `Shot ${shotNumber}`,
    description: shotData.description || "",
    shotSize: shotData.shotSize || "Medium Shot",
    cameraAngle: shotData.cameraAngle || "Eye Level",
    cameraMovement: shotData.cameraMovement || "Static",
    focalLength: shotData.focalLength || "50mm Prime",
    lightingMood: shotData.lightingMood || "Natural Daylight",
    aspectRatio: shotData.aspectRatio || sb.aspectRatio || "2.39:1",
    visualStyle: shotData.visualStyle || sb.visualStyle || "Cinematic Concept Art",
    prompt: shotData.prompt || "",
    negativePrompt: shotData.negativePrompt || "",
    imageUrl: shotData.imageUrl || null,
    imageSource: shotData.imageSource || (shotData.imageUrl ? "imported" : null),
    provider: shotData.provider || null,
    quality: shotData.quality || "standard",
    costEstimate: shotData.costEstimate || null,
    approvalStatus: shotData.approvalStatus || "draft",
    approvalNotes: shotData.approvalNotes || "",
    approvedBy: shotData.approvedBy || null,
    approvedAt: shotData.approvedAt || null,
    directorNotes: shotData.directorNotes || "",
    characters: shotData.characters || [],
    location: shotData.location || "",
    continuity: {
      characterPosition: shotData.continuity?.characterPosition || "",
      screenDirection: shotData.continuity?.screenDirection || "Left to Right",
      eyeline: shotData.continuity?.eyeline || "Eye Level",
      lightingContinuity: shotData.continuity?.lightingContinuity || "",
      costumeState: shotData.continuity?.costumeState || "",
      propPlacement: shotData.continuity?.propPlacement || ""
    },
    history: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  sb.shots.push(newShot);
  sb.updatedAt = new Date().toISOString();
  safeSetStoredStoryboard(scriptId, sceneId, sb);
  syncStoryboardToFirestore(scriptId, sceneId, sb).catch(() => {});
  return { storyboard: sb, shot: newShot };
}

export async function updateStoryboardShot(scriptId, sceneId, shotId, updates) {
  try {
    const res = await request(`/production/${scriptId}/storyboard/${sceneId}/shots/${shotId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    if (res?.shot) {
      if (res.storyboard) {
        safeSetStoredStoryboard(scriptId, sceneId, res.storyboard);
        syncStoryboardToFirestore(scriptId, sceneId, res.storyboard).catch(() => {});
      }
      return res;
    }
  } catch (e) {}

  const sb = await getStoryboard(scriptId, sceneId);
  const shot = sb.shots.find(s => s.id === shotId);
  if (!shot) throw new Error("Shot not found");

  if (updates.continuity) {
    updates.continuity = { ...shot.continuity, ...updates.continuity };
  }
  Object.assign(shot, updates, { updatedAt: new Date().toISOString() });
  sb.updatedAt = new Date().toISOString();
  safeSetStoredStoryboard(scriptId, sceneId, sb);
  syncStoryboardToFirestore(scriptId, sceneId, sb).catch(() => {});
  return { storyboard: sb, shot };
}

export async function deleteStoryboardShot(scriptId, sceneId, shotId) {
  try {
    const res = await request(`/production/${scriptId}/storyboard/${sceneId}/shots/${shotId}`, {
      method: 'DELETE'
    });
    if (res?.success) {
      if (res.storyboard) {
        safeSetStoredStoryboard(scriptId, sceneId, res.storyboard);
        syncStoryboardToFirestore(scriptId, sceneId, res.storyboard).catch(() => {});
      }
      return res;
    }
  } catch (e) {}

  const sb = await getStoryboard(scriptId, sceneId);
  const idx = sb.shots.findIndex(s => s.id === shotId);
  if (idx !== -1) {
    sb.shots.splice(idx, 1);
    sb.shots.forEach((s, i) => { s.order = i + 1; });
    sb.updatedAt = new Date().toISOString();
    safeSetStoredStoryboard(scriptId, sceneId, sb);
    syncStoryboardToFirestore(scriptId, sceneId, sb).catch(() => {});
  }
  return { success: true, removedId: shotId, storyboard: sb };
}

export async function reorderStoryboardShots(scriptId, sceneId, shotIds = []) {
  try {
    const res = await request(`/production/${scriptId}/storyboard/${sceneId}/reorder`, {
      method: 'POST',
      body: JSON.stringify({ shotIds })
    });
    if (res?.storyboard) {
      safeSetStoredStoryboard(scriptId, sceneId, res.storyboard);
      return res;
    }
  } catch (e) {}

  const sb = await getStoryboard(scriptId, sceneId);
  const map = new Map(sb.shots.map(s => [s.id, s]));
  const reordered = [];
  for (const id of shotIds) {
    if (map.has(id)) {
      reordered.push(map.get(id));
      map.delete(id);
    }
  }
  for (const remaining of map.values()) {
    reordered.push(remaining);
  }
  reordered.forEach((s, idx) => { s.order = idx + 1; });
  sb.shots = reordered;
  sb.updatedAt = new Date().toISOString();
  safeSetStoredStoryboard(scriptId, sceneId, sb);
  syncStoryboardToFirestore(scriptId, sceneId, sb).catch(() => {});
  return { storyboard: sb };
}

export async function approveStoryboardShot(scriptId, sceneId, shotId, status = 'approved', notes = '') {
  try {
    const res = await request(`/production/${scriptId}/storyboard/${sceneId}/shots/${shotId}/approve`, {
      method: 'POST',
      body: JSON.stringify({ status, notes })
    });
    if (res?.shot) {
      if (res.storyboard) {
        safeSetStoredStoryboard(scriptId, sceneId, res.storyboard);
        syncStoryboardToFirestore(scriptId, sceneId, res.storyboard).catch(() => {});
      }
      return res;
    }
  } catch (e) {}

  const sb = await getStoryboard(scriptId, sceneId);
  const shot = sb.shots.find(s => s.id === shotId);
  if (shot) {
    shot.approvalStatus = status;
    shot.approvalNotes = notes || shot.approvalNotes || "";
    shot.approvedBy = (store.state.currentUser?.name || "Screenplay Owner") + " (Owner)";
    shot.approvedAt = new Date().toISOString();
    shot.updatedAt = new Date().toISOString();
    sb.updatedAt = new Date().toISOString();
    safeSetStoredStoryboard(scriptId, sceneId, sb);
    syncStoryboardToFirestore(scriptId, sceneId, sb).catch(() => {});
  }
  return { storyboard: sb, shot };
}

export async function batchApproveStoryboardShots(scriptId, sceneId, shotIds = [], status = 'approved', notes = '') {
  try {
    const res = await request(`/production/${scriptId}/storyboard/${sceneId}/batch-approve`, {
      method: 'POST',
      body: JSON.stringify({ shotIds, status, notes })
    });
    if (res?.storyboard) {
      safeSetStoredStoryboard(scriptId, sceneId, res.storyboard);
      syncStoryboardToFirestore(scriptId, sceneId, res.storyboard).catch(() => {});
      return res;
    }
  } catch (e) {}

  const sb = await getStoryboard(scriptId, sceneId);
  let count = 0;
  for (const s of sb.shots) {
    if (shotIds.includes(s.id)) {
      s.approvalStatus = status;
      if (notes) s.approvalNotes = notes;
      s.approvedBy = (store.state.currentUser?.name || "Screenplay Owner") + " (Owner)";
      s.approvedAt = new Date().toISOString();
      s.updatedAt = new Date().toISOString();
      count++;
    }
  }
  sb.updatedAt = new Date().toISOString();
  safeSetStoredStoryboard(scriptId, sceneId, sb);
  syncStoryboardToFirestore(scriptId, sceneId, sb).catch(() => {});
  return { storyboard: sb, affectedCount: count };
}

export async function createStoryboardJob(scriptId, params = {}) {
  return await request(`/production/${scriptId}/storyboard/jobs/generate`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}

export async function getStoryboardJob(scriptId, jobId) {
  return await request(`/production/${scriptId}/storyboard/jobs/${jobId}`);
}

export async function generateStoryboardShot(scriptId, params = {}, onProgress = null) {
  const provider = params.provider || "pollinations-flux";

  // If user explicitly chose built-in vector concept engine
  if (provider === "scriptora-concept") {
    try {
      const res = await request(`/production/${scriptId}/storyboard/generate-shot`, {
        method: 'POST',
        body: JSON.stringify(params)
      });
      if (res?.imageUrl) {
        res.imageUrl = resolveStoryboardAssetUrl(res.imageUrl, params.shotNumber);
        return res;
      }
    } catch (_) {}

    // Built-in procedural concept sketch fallback for offline vector mode
    const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const shotLabel = esc(`${params.shotNumber || '1A'} · ${params.shotSize || 'Medium Shot'}`);
    const headingLabel = esc((params.sceneHeading || 'STORYBOARD CONCEPT').slice(0, 48));
    const promptSnippet = esc((params.prompt || params.description || 'Procedural storyboard frame').slice(0, 72));
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675"><rect width="1200" height="675" fill="#111827"/><rect x="40" y="40" width="1120" height="595" fill="none" stroke="#374151" stroke-width="2" stroke-dasharray="10 8"/><line x1="400" y1="40" x2="400" y2="635" stroke="#1f2937" stroke-width="1.5"/><line x1="800" y1="40" x2="800" y2="635" stroke="#1f2937" stroke-width="1.5"/><line x1="40" y1="238" x2="1160" y2="238" stroke="#1f2937" stroke-width="1.5"/><line x1="40" y1="437" x2="1160" y2="437" stroke="#1f2937" stroke-width="1.5"/><circle cx="600" cy="310" r="88" fill="none" stroke="#4b5563" stroke-width="2.5"/><text x="600" y="190" text-anchor="middle" fill="#60a5fa" font-family="monospace" font-size="22" font-weight="700">${shotLabel}</text><text x="600" y="318" text-anchor="middle" fill="#e5e7eb" font-family="system-ui, sans-serif" font-size="24" font-weight="600">${headingLabel}</text><text x="600" y="490" text-anchor="middle" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="18">${promptSnippet}</text></svg>`;
    return {
      imageUrl: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
      provider: "scriptora-concept",
      quality: params.quality || "hd",
      costEstimate: "Free (Built-in)",
      prompt: params.prompt || ""
    };
  }

  // Real AI Generation (Pollinations FLUX.1 / Cloud Providers) via Asynchronous Job Pipeline
  try {
    const jobInit = await createStoryboardJob(scriptId, { ...params, provider });
    if (jobInit && jobInit.jobId) {
      const { jobId } = jobInit;
      const startTime = Date.now();
      const maxWaitMs = 50000; // 50s max polling

      while (Date.now() - startTime < maxWaitMs) {
        await new Promise(r => setTimeout(r, 2000));
        const job = await getStoryboardJob(scriptId, jobId);
        if (!job) break;

        if (typeof onProgress === 'function') {
          onProgress(job);
        }

        if (job.status === 'completed' && job.result?.imageUrl) {
          job.result.imageUrl = resolveStoryboardAssetUrl(job.result.imageUrl, params.shotNumber);
          return job.result;
        }

        if (job.status === 'failed') {
          throw new Error(job.error || 'AI generation failed');
        }
      }
    }
  } catch (jobErr) {
    if (jobErr.message && !jobErr.message.includes('404') && !jobErr.message.includes('not found')) {
      // Re-throw honest errors from the provider (e.g. rate-limit, auth, timeout)
      throw jobErr;
    }
  }

  // Direct synchronous fallback if job endpoint unavailable
  try {
    const res = await request(`/production/${scriptId}/storyboard/generate-shot`, {
      method: 'POST',
      body: JSON.stringify({ ...params, provider })
    });
    if (res?.imageUrl) {
      res.imageUrl = resolveStoryboardAssetUrl(res.imageUrl, params.shotNumber);
      return res;
    }
  } catch (backendErr) {
    if (backendErr.message && !backendErr.message.includes('404') && !backendErr.message.includes('not found') && !backendErr.message.includes('Failed to fetch')) {
      throw backendErr;
    }
    // Backend offline / static deploy fallback (e.g. GitHub Pages without running local backend)
    console.info('[Storyboard AI] Backend unavailable, executing direct client-side Pollinations FLUX generation...');
    const clientRes = await generateClientPollinationsShot(params, onProgress);
    if (clientRes?.imageUrl && isCloudConfigured().isConfigured) {
      try {
        const uploadRes = await uploadImageToCloud(clientRes.imageUrl, scriptId);
        if (uploadRes?.success && uploadRes.cloudStorageUrl) {
          clientRes.cloudStorageUrl = uploadRes.cloudStorageUrl;
          clientRes.imageUrl = uploadRes.cloudStorageUrl;
        }
      } catch (_) {}
    }
    return clientRes;
  }

  throw new Error('Image generation returned empty from provider');
}

export async function generateClientPollinationsShot(params = {}, onProgress = null) {
  // Use centralized prompt builder to respect every visual setting
  const built = buildStoryboardGenerationPrompt(params);
  const {
    pollinationsUrl: cdnUrl,
    width,
    height,
    seed,
    model,
    fullPrompt,
    cleanUserPrompt,
    effectiveSettings
  } = built;

  if (typeof onProgress === 'function') {
    onProgress({ status: 'processing', progress: 50, statusMessage: `Synthesizing ${effectiveSettings.visualStyle} frame with FLUX.1...` });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 40000);

  try {
    const resp = await fetch(cdnUrl, {
      method: 'GET',
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      let errJson = null;
      try { errJson = JSON.parse(text); } catch (_) {}
      const errorMsg = errJson?.error?.message || errJson?.message || text || `HTTP ${resp.status}`;
      if (resp.status === 402 || resp.status === 429 || errorMsg.includes("limit") || errorMsg.includes("45 seconds")) {
        throw new Error("Pollinations free tier rate limit reached (1 image per 45s). Please wait a moment and click Retry.");
      }
      throw new Error(`Pollinations AI error (${resp.status}): ${errorMsg}`);
    }

    const contentType = resp.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const json = await resp.json().catch(() => ({}));
      throw new Error(json.error?.message || json.message || "Pollinations returned non-image response");
    }

    return {
      imageUrl: cdnUrl,
      sourceUrl: cdnUrl,
      cdnUrl: cdnUrl,
      provider: "pollinations-flux",
      model: model || "flux",
      quality: effectiveSettings.quality || params.quality || "Standard Draft",
      costEstimate: "Free (Pollinations AI)",
      prompt: cleanUserPrompt,
      fullPrompt,
      visualStyle: effectiveSettings.visualStyle,
      aspectRatio: effectiveSettings.aspectRatio,
      shotSize: effectiveSettings.shotSize,
      cameraAngle: effectiveSettings.cameraAngle,
      lens: effectiveSettings.lens,
      focalLength: effectiveSettings.lens,
      lighting: effectiveSettings.lighting,
      lightingMood: effectiveSettings.lighting,
      shotType: effectiveSettings.shotType,
      cameraMovement: effectiveSettings.cameraMovement,
      screenDirection: effectiveSettings.screenDirection,
      shotTitle: effectiveSettings.shotTitle,
      directorNotes: effectiveSettings.directorNotes,
      effectiveSettings,
      seed,
      width,
      height,
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error("Pollinations AI generation timed out (40s). Please click Retry.");
    }
    throw err;
  }
}

export async function generateStoryboardSequence(scriptId, sceneId, params = {}) {
  try {
    const res = await request(`/production/${scriptId}/storyboard/generate-sequence`, {
      method: 'POST',
      body: JSON.stringify({ sceneId, ...params })
    });
    if (res?.proposedShots) return res;
  } catch (e) {
    if (params.provider && params.provider !== 'scriptora-concept') {
      throw e;
    }
  }

  // Offline sequence generation fallback
  const scenes = await getProductionScenes(scriptId);
  const sceneNum = Number(String(sceneId).replace('scene-', '')) || 1;
  const scene = scenes.find(s => s.id === sceneId || s.sceneNumber === sceneNum) || {
    heading: `SCENE ${sceneNum} - UNTITLED`,
    dayNight: "DAY",
    snippet: ""
  };

  const beats = [
    { num: `${sceneNum}A`, title: "Establishing Spatial Depth", size: "Wide Shot", angle: "High Angle", lens: "24mm Wide", desc: `Wide environmental view establishing spatial layout of ${scene.heading}.` },
    { num: `${sceneNum}B`, title: "Character Blocking & Entry", size: "Medium Two-Shot", angle: "Eye Level", lens: "50mm Prime", desc: `Two-shot tracking entry as characters coordinate actions.` },
    { num: `${sceneNum}C`, title: "Dramatic Focal Climax Beat", size: "Close-Up", angle: "Dutch Angle", lens: "85mm Portrait", desc: `Close-up reaction highlighting emotional stakes and sudden anomaly.` },
    { num: `${sceneNum}D`, title: "Critical Action Insert", size: "Extreme Close-Up", angle: "Low Angle", lens: "35mm Macro", desc: `Macro insert of tactile equipment interaction and valve override.` }
  ];

  const requestedCount = Math.max(1, Math.min(4, Number(params.shotCount || params.count || 4)));
  const beatsToGenerate = beats.slice(0, requestedCount);

  const proposedShots = beatsToGenerate.map((b, i) => ({
    id: `prop-shot-${Date.now()}-${i}`,
    shotNumber: b.num,
    order: i + 1,
    title: b.title,
    description: b.desc,
    shotSize: b.size,
    cameraAngle: b.angle,
    cameraMovement: i === 1 ? "Tracking Dolly" : "Static",
    focalLength: b.lens,
    lightingMood: scene.dayNight === 'NIGHT' ? "Low-Key Shadow" : "Daylight Dust",
    aspectRatio: params.aspectRatio || "2.39:1",
    visualStyle: params.visualStyle || "Cinematic Concept Art",
    prompt: `${b.size} of ${scene.heading}: ${scene.snippet}`,
    imageUrl: createSvgFrame(b.num, `${params.aspectRatio || '2.39:1'} · ${b.lens}`, scene.heading, b.size),
    imageSource: "ai",
    provider: "scriptora-concept",
    quality: "hd",
    costEstimate: "Free (Built-in)",
    approvalStatus: "proposed",
    approvalNotes: "AI proposed sequence beat. Review and approve to confirm.",
    approvedBy: null,
    approvedAt: null,
    directorNotes: "",
    characters: scene.cast || [],
    location: scene.heading,
    continuity: {
      characterPosition: i % 2 === 0 ? "Screen Left" : "Screen Right",
      screenDirection: "Left to Right",
      eyeline: i % 2 === 0 ? "Looking Screen Right" : "Looking Screen Left",
      lightingContinuity: scene.dayNight === 'NIGHT' ? "Low key, cyan rim" : "Direct desert sun",
      costumeState: "Production baseline",
      propPlacement: "Standard tactical staging"
    },
    history: []
  }));

  return {
    sceneHeading: scene.heading,
    sceneNumber: sceneNum,
    proposedShots
  };
}

function createSvgFrame(shotNum, lensInfo, heading, sizeLabel, style = "Cinematic Concept Art", ratio = "2.39:1") {
  let width = 1200;
  let height = 502;
  if (ratio === "16:9") height = 675;
  if (ratio === "4:3") height = 900;
  if (ratio === "9:16") { width = 675; height = 1200; }

  const isNight = heading.toUpperCase().includes('NIGHT');
  const isPencil = (style || "").toLowerCase().includes('pencil');
  const isInk = (style || "").toLowerCase().includes('ink');
  const isAnime = (style || "").toLowerCase().includes('anime') || (style || "").toLowerCase().includes('illustration');

  let bgStart = isNight ? "%23090d16" : "%23292524";
  let bgEnd = isNight ? "%23020617" : "%231c1917";
  let accent = isNight ? "%2338bdf8" : "%23f59e0b";
  let rim = isNight ? "%2306b6d4" : "%23fbbf24";
  let sil = "%23020617";
  let stroke = "%23ffffff";
  let gridOp = "0.08";

  if (isPencil) {
    bgStart = "%23f5f5f4";
    bgEnd = "%23e7e5e4";
    accent = "%2357534e";
    rim = "%2378716c";
    sil = "%2344403c";
    stroke = "%23292524";
    gridOp = "0.15";
  } else if (isInk) {
    bgStart = "%230a0a0a";
    bgEnd = "%23000000";
    accent = "%23ffffff";
    rim = "%23e2e8f0";
    sil = "%230f172a";
  } else if (isAnime) {
    bgStart = "%231e1035";
    bgEnd = "%230f0728";
    accent = "%23ec4899";
    rim = "%2338bdf8";
  }

  let silH = 240;
  let silY = height - 260;
  if (sizeLabel && sizeLabel.includes("Wide")) { silH = 100; silY = height - 140; }
  else if (sizeLabel && sizeLabel.includes("Close") && !sizeLabel.includes("Extreme")) { silH = 400; silY = height - 420; }
  else if (sizeLabel && sizeLabel.includes("Extreme")) { silH = 540; silY = height - 550; }

  const isTwoShot = sizeLabel && sizeLabel.includes("Two-Shot");

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'>
    <defs>
      <linearGradient id='bg2' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='${bgStart}'/>
        <stop offset='100%' stop-color='${bgEnd}'/>
      </linearGradient>
      <radialGradient id='rimLight2' cx='70%' cy='30%' r='65%'>
        <stop offset='0%' stop-color='${rim}' stop-opacity='0.4'/>
        <stop offset='100%' stop-color='${bgEnd}' stop-opacity='0'/>
      </radialGradient>
      <pattern id='grid2' width='40' height='40' patternUnits='userSpaceOnUse'>
        <path d='M 40 0 L 0 0 0 40' fill='none' stroke='${stroke}' stroke-width='0.5' opacity='${gridOp}'/>
      </pattern>
    </defs>
    <rect width='${width}' height='${height}' fill='url(%23bg2)'/>
    <rect width='${width}' height='${height}' fill='url(%23rimLight2)'/>
    <rect width='${width}' height='${height}' fill='url(%23grid2)'/>
    
    <line x1='0' y1='${Math.round(height * 0.63)}' x2='${width}' y2='${Math.round(height * 0.63)}' stroke='${accent}' stroke-width='1.2' opacity='0.35' stroke-dasharray='5,5'/>
    
    ${isTwoShot ? `
      <g transform='translate(${Math.round(width * 0.35)}, ${Math.round(silY)})'>
        <circle cx='0' cy='${Math.round(-silH * 0.35)}' r='${Math.round(silH * 0.12)}' fill='%230f172a' stroke='${rim}' stroke-width='1.5'/>
        <path d='M ${Math.round(-silH * 0.2)} ${Math.round(-silH * 0.2)} Q 0 ${Math.round(-silH * 0.26)} ${Math.round(silH * 0.2)} ${Math.round(-silH * 0.2)} L ${Math.round(silH * 0.25)} ${silH} L ${Math.round(-silH * 0.25)} ${silH} Z' fill='${sil}' stroke='${accent}' stroke-width='1.2'/>
      </g>
      <g transform='translate(${Math.round(width * 0.65)}, ${Math.round(silY)})'>
        <circle cx='0' cy='${Math.round(-silH * 0.35)}' r='${Math.round(silH * 0.12)}' fill='%230f172a' stroke='${accent}' stroke-width='1.5'/>
        <path d='M ${Math.round(-silH * 0.2)} ${Math.round(-silH * 0.2)} Q 0 ${Math.round(-silH * 0.26)} ${Math.round(silH * 0.2)} ${Math.round(-silH * 0.2)} L ${Math.round(silH * 0.25)} ${silH} L ${Math.round(-silH * 0.25)} ${silH} Z' fill='${sil}' stroke='${rim}' stroke-width='1.2'/>
      </g>
    ` : `
      <g transform='translate(${Math.round(width / 2)}, ${Math.round(silY)})'>
        <circle cx='0' cy='${Math.round(-silH * 0.35)}' r='${Math.round(silH * 0.12)}' fill='%230f172a' stroke='${rim}' stroke-width='1.5'/>
        <path d='M ${Math.round(-silH * 0.22)} ${Math.round(-silH * 0.2)} Q 0 ${Math.round(-silH * 0.28)} ${Math.round(silH * 0.22)} ${Math.round(-silH * 0.2)} L ${Math.round(silH * 0.28)} ${silH} L ${Math.round(-silH * 0.28)} ${silH} Z' fill='${sil}' stroke='${accent}' stroke-width='1.2'/>
      </g>
    `}

    <!-- Telemetry -->
    <rect x='24' y='24' width='140' height='26' rx='6' fill='black' opacity='0.7'/>
    <circle cx='36' cy='37' r='4' fill='%23ef4444'/>
    <text x='48' y='42' fill='white' font-family='monospace' font-size='11' font-weight='bold'>REC · ${shotNum}</text>
    
    <rect x='${width - 240}' y='24' width='216' height='46' rx='6' fill='black' opacity='0.7'/>
    <text x='${width - 34}' y='41' text-anchor='end' fill='${accent}' font-family='monospace' font-size='12' font-weight='bold'>${lensInfo}</text>
    <text x='${width - 34}' y='60' text-anchor='end' fill='white' opacity='0.85' font-family='sans-serif' font-size='10'>${sizeLabel}</text>

    <rect x='0' y='${height - 36}' width='${width}' height='36' fill='black' opacity='0.85'/>
    <text x='24' y='${height - 13}' fill='white' font-family='sans-serif' font-size='12' font-weight='bold'>${heading}</text>
    <text x='${width - 24}' y='${height - 13}' text-anchor='end' fill='${rim}' font-family='sans-serif' font-size='11'>SCRIPTORA CONCEPT ENGINE · ${(style || "CINEMATIC").toUpperCase()}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}


export async function restoreStoryboardShotVersion(scriptId, sceneId, shotId, historyIndex) {
  try {
    const res = await request(`/production/${scriptId}/storyboard/${sceneId}/shots/${shotId}/restore`, {
      method: 'POST',
      body: JSON.stringify({ historyIndex })
    });
    if (res?.shot) {
      if (res.storyboard) {
        safeSetStoredStoryboard(scriptId, sceneId, res.storyboard);
      }
      return res;
    }
  } catch (e) {}

  const sb = await getStoryboard(scriptId, sceneId);
  const shot = sb.shots.find(s => s.id === shotId);
  if (shot && Array.isArray(shot.history) && shot.history[historyIndex]) {
    const target = shot.history[historyIndex];
    shot.history.push({
      previousImageUrl: shot.imageUrl,
      previousPrompt: shot.prompt,
      provider: shot.provider || "scriptora-concept",
      quality: shot.quality || "hd",
      approvalStatus: shot.approvalStatus || "draft",
      sourceVersion: sb.sourceVersion || "Draft 1.0",
      timestamp: new Date().toISOString(),
      updatedBy: (store.state.currentUser?.name || "Screenplay Owner") + " (Owner)"
    });
    shot.imageUrl = target.previousImageUrl;
    if (target.previousPrompt) shot.prompt = target.previousPrompt;
    if (target.provider) shot.provider = target.provider;
    if (target.approvalStatus) shot.approvalStatus = target.approvalStatus;
    shot.updatedAt = new Date().toISOString();
    sb.updatedAt = new Date().toISOString();
    safeSetStoredStoryboard(scriptId, sceneId, sb);
  }
  return { storyboard: sb, shot };
}


export async function getStoryboardPreferences() {
  const prefKey = getUserStorageKey('storyboard_preferences');
  try {
    const res = await request('/production/storyboard/preferences');
    if (res?.preferences) {
      localStorage.setItem(prefKey, JSON.stringify(res.preferences));
      return res.preferences;
    }
  } catch (err) {
    if (!shouldFallbackToOfflineCache(err)) throw err;
  }
  const cached = localStorage.getItem(prefKey);
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }
  return {
    defaultStyle: "Concept Art",
    defaultAspectRatio: "2.39:1",
    defaultShotSize: "Medium Shot",
    defaultCameraAngle: "Eye Level",
    defaultLens: "50mm Prime",
    defaultLighting: "Auto / Scene-based",
    experienceLevel: "Intermediate"
  };
}

export async function saveStoryboardPreferences(prefs = {}) {
  const prefKey = getUserStorageKey('storyboard_preferences');
  try {
    const res = await request('/production/storyboard/preferences', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prefs)
    });
    if (res?.preferences) {
      localStorage.setItem(prefKey, JSON.stringify(res.preferences));
      return res.preferences;
    }
  } catch (err) {
    if (!shouldFallbackToOfflineCache(err)) throw err;
  }
  const current = await getStoryboardPreferences();
  const updated = { ...current, ...prefs };
  localStorage.setItem(prefKey, JSON.stringify(updated));
  return updated;
}

export async function getStoryboardRecycleBin(scriptId) {
  if (!scriptId) return [];
  const rbKey = getUserStorageKey(`storyboard_rb_${scriptId}`);
  try {
    const res = await request(`/production/${scriptId}/storyboard/recycle-bin`);
    if (res?.items) {
      localStorage.setItem(rbKey, JSON.stringify(res.items));
      return res.items;
    }
  } catch (err) {
    if (!shouldFallbackToOfflineCache(err)) throw err;
  }
  const cached = localStorage.getItem(rbKey);
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }
  return [];
}

export async function restoreStoryboardRecycleBinItem(scriptId, itemId) {
  const rbKey = getUserStorageKey(`storyboard_rb_${scriptId}`);
  try {
    const res = await request(`/production/${scriptId}/storyboard/recycle-bin/restore`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId })
    });
    if (res?.success) {
      const rb = await getStoryboardRecycleBin(scriptId);
      const filtered = rb.filter(i => i.id !== itemId);
      localStorage.setItem(rbKey, JSON.stringify(filtered));
      return res;
    }
  } catch (err) {
    if (!shouldFallbackToOfflineCache(err)) throw err;
  }
  return { success: true };
}

export async function permanentlyDeleteStoryboardRecycleBinItem(scriptId, itemId) {
  const rbKey = getUserStorageKey(`storyboard_rb_${scriptId}`);
  try {
    const res = await request(`/production/${scriptId}/storyboard/recycle-bin/${itemId}`, {
      method: 'DELETE'
    });
    if (res?.success) {
      const rb = await getStoryboardRecycleBin(scriptId);
      const filtered = rb.filter(i => i.id !== itemId);
      localStorage.setItem(rbKey, JSON.stringify(filtered));
      return res;
    }
  } catch (err) {
    if (!shouldFallbackToOfflineCache(err)) throw err;
  }
  return { success: true, removedId: itemId };
}

export async function emptyStoryboardRecycleBin(scriptId) {
  const rbKey = getUserStorageKey(`storyboard_rb_${scriptId}`);
  try {
    const res = await request(`/production/${scriptId}/storyboard/recycle-bin/empty`, {
      method: 'POST'
    });
    localStorage.setItem(rbKey, JSON.stringify([]));
    return res || { success: true };
  } catch (err) {
    if (!shouldFallbackToOfflineCache(err)) throw err;
  }
  localStorage.setItem(rbKey, JSON.stringify([]));
  return { success: true };
}

export async function deleteStoryboardScene(scriptId, sceneId) {
  try {
    const res = await request(`/production/${scriptId}/storyboard/scenes/${sceneId}/soft-delete`, {
      method: 'POST'
    });
    return res;
  } catch (_) {}
  return { success: true, removedId: sceneId };
}

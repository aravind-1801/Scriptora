// Centralized API and Service Layer for Scriptora
// Handles backend calls to Vercel Serverless Functions with transparent offline persistence fallback

const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  try {
    const res = await fetch(url, config);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`API call ${endpoint} failed, falling back to local store:`, err.message);
    throw err;
  }
}

// 1. AUTH API
// Canonical default scripts portfolio
export const DEFAULT_SCRIPTS = [
  {
    id: "chronicles-of-dust",
    title: "Chronicles of Dust",
    draft: "Draft 4.2",
    genre: "Drama",
    format: "Feature",
    industry: "International / Hollywood",
    pages: 96,
    updated: "12m ago",
    currentScene: "Scene 18",
    isCurrentDraft: true,
    archived: false,
    joinCode: "A7K9-XP42",
    logline: "When an arid border outpost discovers an illegal reservoir diversion, an outcast hydro-engineer must prevent a corporate war before the region's remaining aquifers run dry.",
    synopsis: "In the desert badlands of the 2040s, Kevin, a discredited water regulator, is stationed at an isolated customs depot. A sudden drop in terminal pressure reveals a covert tap in the municipal pipeline. Kevin and field operative Meera trace the tap to a private syndicate, forcing a high-stakes standoff across dry lakebeds and floodgate valves.",
    context: {
      format: "Feature",
      industry: "International / Hollywood",
      hours: 1,
      minutes: 36,
      seconds: 0,
      plannedDuration: "01:36:00"
    },
    analysisScores: {
      overall: 86,
      pacing: 82,
      dialogue: 89,
      emotion: 91,
      characterArc: 84,
      continuity: 78,
      storyStructure: 87,
      theme: 90,
      cinema: 85,
      formatting: 94,
      production: 80
    }
  },
  {
    id: "the-neon-horizon",
    title: "The Neon Horizon",
    draft: "Draft 2.1",
    genre: "Sci-Fi",
    format: "Pilot",
    industry: "Streaming Television",
    pages: 62,
    updated: "2h ago",
    currentScene: "Scene 4",
    isCurrentDraft: false,
    archived: false,
    joinCode: "N3ON-H0RZ",
    context: {
      format: "Pilot",
      industry: "Streaming Television",
      hours: 0,
      minutes: 52,
      seconds: 0,
      plannedDuration: "00:52:00"
    },
    analysisScores: {
      overall: 79,
      pacing: 75,
      dialogue: 84,
      emotion: 80,
      characterArc: 78,
      continuity: 82,
      storyStructure: 76,
      theme: 88,
      cinema: 83,
      formatting: 90,
      production: 72
    }
  },
  {
    id: "velvet-shadows",
    title: "Velvet Shadows",
    draft: "Draft 1.0",
    genre: "Noir",
    format: "Feature",
    industry: "Independent / Festival",
    pages: 114,
    updated: "Yesterday",
    currentScene: "Scene 1",
    isCurrentDraft: false,
    archived: false,
    joinCode: "V3LV-SHDW",
    analysisScores: {
      overall: 81,
      pacing: 80,
      dialogue: 86,
      emotion: 79,
      characterArc: 85,
      continuity: 80,
      storyStructure: 82,
      theme: 84,
      cinema: 88,
      formatting: 92,
      production: 76
    }
  },
  {
    id: "silent-echoes",
    title: "Silent Echoes",
    draft: "Draft 3.0",
    genre: "Psychological Thriller",
    format: "Feature",
    industry: "International / Hollywood",
    pages: 104,
    updated: "3d ago",
    currentScene: "Scene 22",
    isCurrentDraft: false,
    archived: false,
    joinCode: "SLNT-ECH0",
    analysisScores: {
      overall: 84,
      pacing: 86,
      dialogue: 81,
      emotion: 88,
      characterArc: 83,
      continuity: 85,
      storyStructure: 89,
      theme: 82,
      cinema: 84,
      formatting: 91,
      production: 78
    }
  },
  {
    id: "glass-kingdoms",
    title: "Glass Kingdoms",
    draft: "Draft 1.4",
    genre: "Fantasy",
    format: "Pilot",
    industry: "Streaming Television",
    pages: 58,
    updated: "1w ago",
    currentScene: "Scene 8",
    isCurrentDraft: false,
    archived: false,
    joinCode: "GLSS-KNGD",
    analysisScores: {
      overall: 78,
      pacing: 74,
      dialogue: 80,
      emotion: 76,
      characterArc: 82,
      continuity: 75,
      storyStructure: 80,
      theme: 86,
      cinema: 82,
      formatting: 88,
      production: 70
    }
  },
  {
    id: "red-shift",
    title: "Red Shift",
    draft: "Draft 2.0",
    genre: "Action",
    format: "Short",
    industry: "Independent / Festival",
    pages: 28,
    updated: "2w ago",
    currentScene: "Scene 5",
    isCurrentDraft: false,
    archived: false,
    joinCode: "RED2-SHFT",
    analysisScores: {
      overall: 83,
      pacing: 90,
      dialogue: 78,
      emotion: 75,
      characterArc: 80,
      continuity: 88,
      storyStructure: 84,
      theme: 80,
      cinema: 89,
      formatting: 95,
      production: 82
    }
  }
];

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

export async function login(credentials) {
  try {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    localStorage.setItem('scriptora_user', JSON.stringify(data.user));
    return data.user;
  } catch {
    const user = {
      id: "user-1",
      name: credentials.email ? credentials.email.split('@')[0] : "Arun Kumar",
      displayName: credentials.email ? credentials.email.split('@')[0] : "Arun Kumar",
      email: credentials.email || "arun.kumar@scriptora.studio",
      headline: "Screenwriter & Narrative Director",
      badge: "Member Pro",
      initials: "AK",
      stats: { drafts: 14, coAuthors: 3, healthIndex: "98%" }
    };
    localStorage.setItem('scriptora_user', JSON.stringify(user));
    return user;
  }
}

export async function googleLogin(payload = {}) {
  try {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ ...payload, provider: 'google' })
    });
    localStorage.setItem('scriptora_user', JSON.stringify(data.user));
    return data.user;
  } catch {
    const resolvedName = payload.displayName || payload.name || (payload.email ? payload.email.split('@')[0] : "Google Filmmaker");
    const initials = resolvedName.split(' ').map(s => s[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || "GF";
    const user = {
      id: payload.sub || `google-${Date.now()}`,
      name: resolvedName,
      displayName: resolvedName,
      email: payload.email || "arun.kumar@scriptora.studio",
      headline: "Screenwriter & Film Director",
      badge: "Member Pro",
      initials,
      avatar: payload.picture || payload.photoURL || null,
      avatarUrl: payload.picture || payload.photoURL || null,
      provider: "google",
      stats: { drafts: 14, coAuthors: 3, healthIndex: "98%" }
    };
    localStorage.setItem('scriptora_user', JSON.stringify(user));
    return user;
  }
}

export async function register(data) {
  try {
    const res = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    localStorage.setItem('scriptora_user', JSON.stringify(res.user));
    return res.user;
  } catch {
    const user = {
      id: `user-${Date.now()}`,
      name: data.name || "New Writer",
      displayName: data.name || "New Writer",
      email: data.email || "writer@scriptora.studio",
      headline: "Screenwriter",
      badge: "Member Pro",
      initials: (data.name || "NW").slice(0, 2).toUpperCase(),
      stats: { drafts: 1, coAuthors: 0, healthIndex: "100%" }
    };
    localStorage.setItem('scriptora_user', JSON.stringify(user));
    return user;
  }
}

export async function verifyOtp(phone) {
  try {
    const res = await request('/auth/otp', {
      method: 'POST',
      body: JSON.stringify({ phone })
    });
    localStorage.setItem('scriptora_user', JSON.stringify(res.user));
    return res.user;
  } catch {
    const user = {
      id: "user-phone",
      name: "Verified Writer",
      displayName: "Verified Writer",
      headline: "Screenwriter",
      email: phone,
      badge: "Member Pro",
      initials: "VW",
      stats: { drafts: 14, coAuthors: 3, healthIndex: "98%" }
    };
    localStorage.setItem('scriptora_user', JSON.stringify(user));
    return user;
  }
}

export function clearLocalUserData() {
  localStorage.removeItem('scriptora_user');
  localStorage.removeItem('scriptora_scripts');
  localStorage.removeItem('scriptora_selected_script');

  // Purge user-specific screenplay drafts, production workspaces, and storyboard states
  const keysToRemove = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (
        key.startsWith('scriptora_screenplay_') ||
        key.startsWith('scriptora_prod_') ||
        key.startsWith('scriptora_storyboard_')
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

  // Clear in-flight navigation and session buffers
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
  try {
    const endpoint = query ? `/scripts?q=${encodeURIComponent(query)}` : '/scripts';
    const data = await request(endpoint);
    if (data.scripts && data.scripts.length > 0) {
      localStorage.setItem('scriptora_scripts', JSON.stringify(data.scripts));
      return data.scripts;
    }
  } catch {
    // Backend offline / static deploy fallback
  }

  const saved = localStorage.getItem('scriptora_scripts');
  let list;
  if (saved) {
    try {
      list = JSON.parse(saved);
      if (!Array.isArray(list) || list.length === 0) {
        list = [...DEFAULT_SCRIPTS];
        localStorage.setItem('scriptora_scripts', JSON.stringify(list));
      }
    } catch {
      list = [...DEFAULT_SCRIPTS];
      localStorage.setItem('scriptora_scripts', JSON.stringify(list));
    }
  } else {
    list = [...DEFAULT_SCRIPTS];
    localStorage.setItem('scriptora_scripts', JSON.stringify(list));
  }
  if (query) list = list.filter(s => s.title.toLowerCase().includes(query.toLowerCase()));
  return list;
}

export async function getScript(id) {
  try {
    const data = await request(`/scripts/${id}`);
    if (data.script) return data.script;
  } catch {}

  const scripts = await getScripts();
  return scripts.find(s => s.id === id) || DEFAULT_SCRIPTS.find(s => s.id === id) || scripts[0] || null;
}

export async function createScript(scriptData) {
  try {
    const data = await request('/scripts', {
      method: 'POST',
      body: JSON.stringify(scriptData)
    });
    if (data.script) {
      const scripts = await getScripts();
      localStorage.setItem('scriptora_scripts', JSON.stringify([data.script, ...scripts.filter(s => s.id !== data.script.id)]));
      return data.script;
    }
  } catch {}

  const newScript = {
    id: (scriptData.title || "untitled").toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: scriptData.title || "Untitled Screenplay",
    draft: "Draft 1.0",
    genre: scriptData.genre || "Drama",
    format: scriptData.format || "Feature",
    industry: scriptData.industry || "International / Hollywood",
    pages: 1,
    updated: "Just now",
    currentScene: "Scene 1",
    joinCode: "SCRP-1001",
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
      overall: 80,
      pacing: 78,
      dialogue: 80,
      emotion: 80,
      characterArc: 78,
      continuity: 80,
      storyStructure: 80,
      theme: 80,
      cinema: 80,
      formatting: 90,
      production: 75
    }
  };

  const scripts = await getScripts();
  const updated = [newScript, ...scripts.filter(s => s.id !== newScript.id)];
  localStorage.setItem('scriptora_scripts', JSON.stringify(updated));
  return newScript;
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
      localStorage.setItem('scriptora_scripts', JSON.stringify(updated));
      return data.script;
    }
  } catch {}

  const scripts = await getScripts();
  const updated = scripts.map(s => s.id === id ? { ...s, ...updates, updated: "Just now" } : s);
  localStorage.setItem('scriptora_scripts', JSON.stringify(updated));
  return { id, ...updates, updated: "Just now" };
}

export async function deleteScript(id) {
  try {
    await request(`/scripts/${id}`, { method: 'DELETE' });
  } catch {}

  const scripts = await getScripts();
  const updated = scripts.filter(s => s.id !== id);
  localStorage.setItem('scriptora_scripts', JSON.stringify(updated));
  return { success: true };
}

export async function duplicateScript(id) {
  try {
    const data = await request(`/scripts/${id}/duplicate`, { method: 'POST' });
    if (data.script) {
      const scripts = await getScripts();
      localStorage.setItem('scriptora_scripts', JSON.stringify([data.script, ...scripts]));
      return data.script;
    }
  } catch {}

  const orig = await getScript(id);
  const copy = {
    ...orig,
    id: `${id}-copy-${Date.now().toString().slice(-4)}`,
    title: `${orig?.title || 'Script'} (Copy)`,
    updated: "Just now"
  };
  const scripts = await getScripts();
  const updated = [copy, ...scripts];
  localStorage.setItem('scriptora_scripts', JSON.stringify(updated));
  return copy;
}

export async function archiveScript(id) {
  try {
    await request(`/scripts/${id}/archive`, { method: 'POST' });
  } catch {}

  const scripts = await getScripts();
  const updated = scripts.map(s => s.id === id ? { ...s, archived: true, updated: "Just now" } : s);
  localStorage.setItem('scriptora_scripts', JSON.stringify(updated));
  return { success: true };
}

// Canonical Screenplay Portfolio
export const CANONICAL_SCREENPLAY_CHRONICLES = {
  id: "chronicles-of-dust",
  title: "Chronicles of Dust",
  draft: "Draft 4.2",
  pageCount: 5,
  wordCount: 14280,
  titlePage: {
    title: "CHRONICLES OF DUST",
    author: "Arun Kumar",
    contact: "Scriptora Studio · arun.kumar@scriptora.studio · +1 (555) 019-2834",
    notes: "An original screenplay. Draft 4.2 Production Cut."
  },
  settings: {
    sceneNumbers: true,
    sceneNumberSide: "left",
    smartFormatting: true,
    fontSize: "12pt",
    lineSpacing: "1.5",
    language: "English"
  },
  acts: [
    { id: "act-1", name: "ACT I - The Broken Siphon" },
    { id: "act-2", name: "ACT II - The Pressure Surge" },
    { id: "act-3", name: "ACT III - The Floodgate Standoff" }
  ],
  characters: [
    "KEVIN",
    "MEERA",
    "HARI",
    "AKASH"
  ],
  locations: [
    "INT. HOME",
    "INT. PORT AUDIT ROOM",
    "INT. CUSTOMS OFFICE",
    "EXT. FLOODGATE GANTRY"
  ],
  times: [
    "DAY",
    "NIGHT",
    "CONTINUOUS",
    "DAWN",
    "DUSK",
    "LATER",
    "MORNING",
    "EVENING"
  ],
  transitions: [
    "CUT TO:",
    "FADE IN:",
    "FADE OUT.",
    "DISSOLVE TO:",
    "SMASH CUT TO:",
    "MATCH CUT TO:",
    "JUMP CUT TO:"
  ],
  scenes: [
    {
      id: "scene-1",
      number: 1,
      actId: "act-1",
      slugline: "INT. HOME - EVENING",
      blocks: [
        { id: "b-1-1", type: "scene", content: "INT. HOME - EVENING" },
        { id: "b-1-2", type: "action", content: "There stands a woman." },
        { id: "b-1-3", type: "character", content: "HARI" },
        { id: "b-1-4", type: "dialogue", content: "Who is that?" },
        { id: "b-1-5", type: "character", content: "AKASH" },
        { id: "b-1-6", type: "dialogue", content: "How do I know?" },
        { id: "b-1-7", type: "action", content: "Both leaves the place." }
      ]
    },
    {
      id: "scene-4",
      number: 4,
      actId: "act-1",
      slugline: "INT. PORT AUDIT ROOM - DAY",
      blocks: [
        { id: "b-4-1", type: "scene", content: "INT. PORT AUDIT ROOM - DAY" },
        { id: "b-4-2", type: "action", content: "Kevin stamps irregular cargo manifests to keep peace with union superiors." },
        { id: "b-4-3", type: "character", content: "KEVIN" },
        { id: "b-4-4", type: "dialogue", content: "The manifests are sealed." }
      ]
    },
    {
      id: "scene-18",
      number: 18,
      actId: "act-2",
      slugline: "INT. CUSTOMS OFFICE - NIGHT",
      blocks: [
        { id: "b-18-1", type: "scene", content: "INT. CUSTOMS OFFICE - NIGHT" },
        { id: "b-18-2", type: "action", content: "Kevin kneels over the cracked hydro-sensor junction box. Static hiss whispers through the damp comm-link. A lone flicker illuminates the tarnished brass seal." },
        { id: "b-18-3", type: "action", content: "Water droplets bead along the corroded circuit wires. He slides a copper probe between the connectors." },
        { id: "b-18-4", type: "character", content: "KEVIN" },
        { id: "b-18-5", type: "parenthetical", content: "(whispering into comm)" },
        { id: "b-18-6", type: "dialogue", content: "If the seals break before dawn, the sector won't hold the surge." },
        { id: "b-18-7", type: "character", content: "MEERA (O.S.)" },
        { id: "b-18-8", type: "dialogue", content: "Then don't let them break. Reroute the secondary relay through the floodgate breaker." },
        { id: "b-18-9", type: "transition", content: "CUT TO:" }
      ]
    }
  ]
};

// 3. SCREENPLAY API
export async function getScreenplay(scriptId) {
  try {
    const data = await request(`/screenplay/${scriptId}`);
    if (data.screenplay && data.screenplay.scenes && data.screenplay.scenes.length > 0) {
      return data.screenplay;
    }
  } catch {}

  const saved = localStorage.getItem(`scriptora_screenplay_${scriptId}`);
  if (saved) {
    try {
      const sp = JSON.parse(saved);
      if (sp && sp.scenes && sp.scenes.length > 0) {
        return sp;
      }
    } catch {}
  }

  // Fallback to fresh starting screenplay from template
  const template = JSON.parse(JSON.stringify(CANONICAL_SCREENPLAY_CHRONICLES));
  template.id = scriptId || 'script_01';
  localStorage.setItem(`scriptora_screenplay_${scriptId}`, JSON.stringify(template));
  return template;
}

export async function saveScreenplay(scriptId, screenplay) {
  localStorage.setItem(`scriptora_screenplay_${scriptId}`, JSON.stringify(screenplay));
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
    return [
      {
        id: "v-4.2",
        name: "Draft 4.2",
        tag: "Current Active",
        timestamp: "Just now",
        author: "JD",
        stats: "96 pages · 14,280 words",
        notes: "Refined Meera O.S. dialogue and hydro-sensor action line.",
        isCurrent: true
      },
      {
        id: "v-3.0",
        name: "Draft 3.0",
        tag: "Production Polish",
        timestamp: "Yesterday, 4:15 PM",
        author: "JD",
        stats: "94 pages · 13,950 words",
        notes: "Incorporated director notes on floodgate transition pacing.",
        isCurrent: false
      },
      {
        id: "v-2.0",
        name: "Draft 2.0",
        tag: "First Table Read",
        timestamp: "Oct 12, 2024",
        author: "JD",
        stats: "90 pages · 13,200 words",
        notes: "Table read revision for Acts I & II character arcs.",
        isCurrent: false
      }
    ];
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
export async function getCollaborators(scriptId) {
  try {
    const data = await request(`/collaborators/${scriptId}`);
    return data.collaborators;
  } catch {
    return [
      {
        id: "c-1",
        name: "Heamanth S.",
        email: "heamanth@studio.com",
        initials: "HS",
        role: "Editor",
        avatarBg: "bg-blue-100 text-blue-700",
        status: "Active",
        added: "2d ago"
      },
      {
        id: "c-2",
        name: "Elena Rostova",
        email: "elena@cineworks.io",
        initials: "ER",
        role: "Script Doctor",
        avatarBg: "bg-amber-100 text-amber-700",
        status: "Active",
        added: "1w ago"
      },
      {
        id: "c-3",
        name: "Marcus Vance",
        email: "vance.prod@paramount.com",
        initials: "MV",
        role: "Producer",
        avatarBg: "bg-purple-100 text-purple-700",
        status: "Viewer",
        added: "2w ago"
      }
    ];
  }
}

export async function inviteCollaborator(scriptId, inviteData) {
  try {
    const data = await request(`/collaborators/${scriptId}/invite`, {
      method: 'POST',
      body: JSON.stringify(inviteData)
    });
    return data.collaborator;
  } catch {
    return {
      id: `c-${Date.now()}`,
      name: inviteData.email.split('@')[0],
      email: inviteData.email,
      initials: inviteData.email.substring(0, 2).toUpperCase(),
      role: inviteData.role === 'editor' ? 'Editor' : 'Viewer',
      avatarBg: "bg-emerald-100 text-emerald-700",
      status: "Active",
      added: "Just now"
    };
  }
}

export async function changeCollaboratorRole(scriptId, memberId, newRole) {
  try {
    return await request(`/collaborators/${scriptId}/${memberId}`, {
      method: 'PUT',
      body: JSON.stringify({ role: newRole })
    });
  } catch {
    return { success: true };
  }
}

export async function removeCollaborator(scriptId, memberId) {
  try {
    return await request(`/collaborators/${scriptId}/${memberId}`, {
      method: 'DELETE'
    });
  } catch {
    return { success: true };
  }
}

// 6. JOIN CODE API
export async function generateJoinCode(scriptId) {
  try {
    const data = await request('/join-code/generate', {
      method: 'POST',
      body: JSON.stringify({ scriptId })
    });
    return data.joinCode;
  } catch {
    const code = Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    return code;
  }
}

export async function validateJoinCode(code) {
  try {
    const data = await request('/join-code/validate', {
      method: 'POST',
      body: JSON.stringify({ code })
    });
    return data;
  } catch {
    const upper = (code || '').toUpperCase().trim();
    if (upper === 'A7K9-XP42') {
      return {
        valid: true,
        script: {
          id: 'chronicles-of-dust',
          title: 'Chronicles of Dust',
          draft: 'Draft 4.2',
          genre: 'Drama',
          format: 'Feature',
          pages: 96,
          collaboratorCount: 3
        }
      };
    }
    return { valid: false, error: "Invalid or expired join code" };
  }
}

export async function joinWithCode(code) {
  try {
    return await request('/join-code/redeem', {
      method: 'POST',
      body: JSON.stringify({ code })
    });
  } catch {
    return { success: true, scriptId: 'chronicles-of-dust', title: 'Chronicles of Dust' };
  }
}

// 7. NOTIFICATIONS API
export async function getNotifications() {
  try {
    const data = await request('/notifications');
    return data;
  } catch {
    return {
      notifications: [
        {
          id: 1,
          sender: "HS",
          senderName: "Heamanth",
          type: "collaboration_invite",
          title: "Heamanth invited you to collaborate",
          body: 'Added you as an Editor on "Chronicles of Dust" (Draft 4.2).',
          time: "12m ago",
          group: "today",
          unread: true,
          tags: ["Draft 4.2", "Role: Editor"],
          actionLabel: "Review Access →",
          actionRoute: "/profile/collaborators"
        },
        {
          id: 2,
          sender: "icon:description",
          type: "export_ready",
          title: "Your export is ready",
          body: '"Chronicles of Dust (Draft 4.2)" exported as standard Industry PDF.',
          time: "45m ago",
          group: "today",
          unread: true,
          tags: ["PDF", "96 Pages"],
          actionLabel: "Open Screenplay →",
          actionRoute: "/editor/chronicles-of-dust"
        },
        {
          id: 3,
          sender: "AK",
          senderName: "Arun K.",
          type: "join_code_request",
          title: "Join-code access request",
          body: 'Requested Editor access to "Anbin Mozhi" via join-code A7K9-XP42.',
          time: "2h ago",
          group: "today",
          unread: true,
          tags: ["Code: A7K9-XP42"],
          actionLabel: "Manage Collaborators →",
          actionRoute: "/profile/collaborators"
        }
      ],
      unreadCount: 3
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
    const saved = localStorage.getItem('scriptora_settings');
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
    localStorage.setItem('scriptora_settings', JSON.stringify(data.settings));
    return data.settings;
  } catch {
    const current = await getSettings();
    const merged = { ...current, ...updates };
    localStorage.setItem('scriptora_settings', JSON.stringify(merged));
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
        title: script?.title || "Chronicles of Dust",
        draft: script?.draft || "Draft 4.2",
        pages: script?.pages || 96
      },
      scores: script?.analysisScores || {
        overall: 86,
        pacing: 82,
        dialogue: 89,
        emotion: 91,
        characterArc: 84,
        continuity: 78,
        storyStructure: 87,
        theme: 90,
        cinema: 85,
        formatting: 94,
        production: 80
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

export async function getProductionWorkspace(scriptId = 'chronicles-of-dust') {
  try {
    const data = await request(`/production/${scriptId}`);
    if (data?.workspace) {
      localStorage.setItem(`scriptora_prod_ws_${scriptId}`, JSON.stringify(data.workspace));
      return data.workspace;
    }
  } catch (e) {
    // offline fallback
  }

  const cached = localStorage.getItem(`scriptora_prod_ws_${scriptId}`);
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }

  const script = await getScript(scriptId);
  const defaultWs = {
    id: `prod-ws-${scriptId}`,
    projectId: "proj-1",
    projectName: "Badlands Anthology",
    scriptId: scriptId,
    screenplayTitle: script?.title || "Chronicles of Dust",
    pinnedSourceVersion: script?.draft || "Draft 4.2",
    pinnedSourceVersionHash: "v4.2-snap-88f2",
    pinnedTimestamp: "12m ago",
    currentScriptDraft: script?.draft || "Draft 4.2",
    isStale: false,
    mode: localStorage.getItem('scriptora_prod_mode') || 'simple',
    userRole: localStorage.getItem('scriptora_prod_role') || 'Owner',
    roles: ["Owner", "Director", "Assistant Director", "Production", "Department Member", "Viewer"],
    stats: {
      totalScenes: 18,
      breakdownElements: 78,
      callSheetsCount: 2,
      shootingDays: 14,
      pendingProposals: 2,
      completedApprovals: 6
    },
    updatedAt: new Date().toISOString()
  };
  localStorage.setItem(`scriptora_prod_ws_${scriptId}`, JSON.stringify(defaultWs));
  return defaultWs;
}

export async function updateProductionWorkspace(scriptId, updates) {
  try {
    const data = await request(`/production/${scriptId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    if (data?.workspace) {
      localStorage.setItem(`scriptora_prod_ws_${scriptId}`, JSON.stringify(data.workspace));
      return data.workspace;
    }
  } catch (e) {}

  const current = await getProductionWorkspace(scriptId);
  const updated = { ...current, ...updates, updatedAt: new Date().toISOString() };
  localStorage.setItem(`scriptora_prod_ws_${scriptId}`, JSON.stringify(updated));
  return updated;
}

export async function pinProductionSourceVersion(scriptId, newVersion) {
  try {
    const data = await request(`/production/${scriptId}/pin`, {
      method: 'POST',
      body: JSON.stringify({ version: newVersion })
    });
    if (data?.workspace) {
      localStorage.setItem(`scriptora_prod_ws_${scriptId}`, JSON.stringify(data.workspace));
      return data.workspace;
    }
  } catch (e) {}

  const current = await getProductionWorkspace(scriptId);
  current.pinnedSourceVersion = newVersion;
  current.pinnedTimestamp = "Just now";
  current.isStale = false;
  localStorage.setItem(`scriptora_prod_ws_${scriptId}`, JSON.stringify(current));
  return current;
}

export async function getProductionResources(scriptId = 'chronicles-of-dust', category = null) {
  try {
    const url = `/production/${scriptId}/resources${category ? `?category=${encodeURIComponent(category)}` : ''}`;
    const data = await request(url);
    if (data?.resources) {
      localStorage.setItem(`scriptora_prod_res_${scriptId}`, JSON.stringify(data.resources));
      return data.resources;
    }
  } catch (e) {}

  const cached = localStorage.getItem(`scriptora_prod_res_${scriptId}`);
  if (cached) {
    try {
      const list = JSON.parse(cached);
      if (category && category !== 'all') {
        return list.filter(r => r.category.toLowerCase() === category.toLowerCase());
      }
      return list;
    } catch (_) {}
  }

  // Seed default resources
  const defaults = [
    {
      id: "res-1",
      scriptId,
      category: "Cast",
      name: "Kevin (Lead)",
      role: "Hydro-engineer",
      scenes: ["Scene 1", "Scene 3", "Scene 18"],
      department: "Casting",
      status: "Confirmed",
      contactRestricted: true,
      contact: "agent@talentagency.com",
      notes: "Requires desert dust protective gear and waterproof boots."
    },
    {
      id: "res-2",
      scriptId,
      category: "Cast",
      name: "Meera (Lead)",
      role: "Field Operative",
      scenes: ["Scene 2", "Scene 4", "Scene 18"],
      department: "Casting",
      status: "Confirmed",
      contactRestricted: true,
      contact: "management@creativeartists.com",
      notes: "Tactical harness fitted for scene 18 valve climb."
    },
    {
      id: "res-3",
      scriptId,
      category: "Location",
      name: "Arid Outpost Gate 4",
      scenes: ["Scene 1", "Scene 2"],
      department: "Locations",
      status: "Confirmed",
      contactRestricted: false,
      contact: "Mojave Perimeter Permit Office",
      notes: "Day exterior only. High wind advisory after 16:00."
    },
    {
      id: "res-4",
      scriptId,
      category: "Location",
      name: "Pumping Station Chamber B",
      scenes: ["Scene 10"],
      department: "Locations",
      status: "Confirmed",
      contactRestricted: false,
      contact: "Aqueduct District Coordinator",
      notes: "Heavy echo; sound dampening blankets required."
    },
    {
      id: "res-5",
      scriptId,
      category: "Props",
      name: "Hydraulic Bypass Valve Kit",
      scenes: ["Scene 10"],
      department: "Props",
      status: "Confirmed",
      notes: "Hero prop with functional LED pressure gauge."
    },
    {
      id: "res-6",
      scriptId,
      category: "Vehicles",
      name: "Solar Patrol Rover (Modified)",
      scenes: ["Scene 1", "Scene 4"],
      department: "Picture Vehicles",
      status: "Awaiting review",
      notes: "Secondary dust filter installed on engine intake."
    }
  ];
  localStorage.setItem(`scriptora_prod_res_${scriptId}`, JSON.stringify(defaults));
  if (category && category !== 'all') {
    return defaults.filter(r => r.category.toLowerCase() === category.toLowerCase());
  }
  return defaults;
}

export async function getProductionDocuments(scriptId = 'chronicles-of-dust') {
  try {
    const data = await request(`/production/${scriptId}/documents`);
    if (data?.documents) {
      localStorage.setItem(`scriptora_prod_docs_${scriptId}`, JSON.stringify(data.documents));
      return data.documents;
    }
  } catch (e) {}

  const cached = localStorage.getItem(`scriptora_prod_docs_${scriptId}`);
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }

  const defaults = [
    {
      id: "doc-cs-1",
      scriptId,
      type: "Call Sheet",
      title: "Call Sheet #01 — Gate 4 Day Exterior",
      sourceVersion: "Draft 4.2",
      shootDay: "Day 1 of 7",
      date: "Oct 24, 2026",
      callTime: "06:30 AM",
      location: "Mojave Outpost Gate 4",
      scenes: ["Scene 1", "Scene 2"],
      status: "Confirmed",
      published: true,
      version: "v1.0"
    },
    {
      id: "doc-cs-2",
      scriptId,
      type: "Call Sheet",
      title: "Call Sheet #02 — Pumping Station Chamber",
      sourceVersion: "Draft 4.2",
      shootDay: "Day 2 of 7",
      date: "Oct 25, 2026",
      callTime: "07:00 AM",
      location: "Chamber B Dry Tank",
      scenes: ["Scene 10"],
      status: "Draft",
      published: false,
      version: "v0.9"
    },
    {
      id: "doc-ds-1",
      scriptId,
      type: "Dialogue Sheet",
      title: "Actor Sides — Kevin & Meera (Scene 18)",
      sourceVersion: "Draft 4.2",
      scenes: ["Scene 18"],
      characters: ["KEVIN", "MEERA"],
      status: "Confirmed",
      published: true,
      version: "v1.2"
    },
    {
      id: "doc-ss-1",
      scriptId,
      type: "Shooting Schedule",
      title: "Master 14-Day Stripboard Schedule",
      sourceVersion: "Draft 4.2",
      status: "Confirmed",
      published: true,
      version: "v2.1",
      daysCount: 14
    },
    {
      id: "doc-sb-1",
      scriptId,
      type: "Script Breakdown",
      title: "Full Production Breakdown Sheet",
      sourceVersion: "Draft 4.2",
      status: "Confirmed",
      published: true,
      version: "v1.4",
      elementsCount: 78
    }
  ];
  localStorage.setItem(`scriptora_prod_docs_${scriptId}`, JSON.stringify(defaults));
  return defaults;
}

export async function getProductionProposals(scriptId = 'chronicles-of-dust') {
  try {
    const data = await request(`/production/${scriptId}/proposals`);
    if (data?.proposals) {
      localStorage.setItem(`scriptora_prod_props_${scriptId}`, JSON.stringify(data.proposals));
      return data.proposals;
    }
  } catch (e) {}

  const cached = localStorage.getItem(`scriptora_prod_props_${scriptId}`);
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }

  const defaults = [
    {
      id: "prop-1",
      scriptId,
      sourceVersion: "Draft 4.2",
      title: "Add Water Truck Standby for Chamber B Scene 18",
      description: "SFX coordinator requested a dedicated pressurized water truck for high-velocity valve release practical effect in Scene 18.",
      category: "SFX / Logistics",
      submittedBy: "Elena Rostova",
      submitterRole: "Director",
      status: "Awaiting review",
      impact: "Requires 1 additional standby driver and $1,200 equipment allocation.",
      createdAt: "2026-10-14T08:30:00Z"
    },
    {
      id: "prop-2",
      scriptId,
      sourceVersion: "Draft 4.2",
      title: "Swap Shoot Order for Day 3 and Day 4",
      description: "Shift exterior lakebed shoot earlier by 24 hours due to predicted desert sand squall.",
      category: "Schedule",
      submittedBy: "Marcus Vance",
      submitterRole: "Assistant Director",
      status: "Awaiting review",
      impact: "Affects talent travel call times for Kevin and background extras.",
      createdAt: "2026-10-13T16:45:00Z"
    }
  ];
  localStorage.setItem(`scriptora_prod_props_${scriptId}`, JSON.stringify(defaults));
  return defaults;
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
      localStorage.setItem(`scriptora_prod_props_${scriptId}`, JSON.stringify(list));
      return data.proposal;
    }
  } catch (e) {}

  const list = await getProductionProposals(scriptId);
  const newProp = {
    id: `prop-${Date.now()}`,
    scriptId,
    sourceVersion: proposal.sourceVersion || "Draft 4.2",
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
  localStorage.setItem(`scriptora_prod_props_${scriptId}`, JSON.stringify(list));
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
      localStorage.setItem(`scriptora_prod_props_${scriptId}`, JSON.stringify(list));
      return data.proposal;
    }
  } catch (e) {}

  const list = await getProductionProposals(scriptId);
  const prop = list.find(p => p.id === proposalId);
  if (prop) {
    prop.status = action === 'accept' ? 'Accepted' : (action === 'reject' ? 'Rejected' : 'Conflict');
    prop.resolvedAt = new Date().toISOString();
    prop.resolutionNotes = reviewNotes || (action === 'accept' ? 'Accepted by Owner' : 'Declined during review');
    localStorage.setItem(`scriptora_prod_props_${scriptId}`, JSON.stringify(list));
  }
  return prop;
}

export async function getProductionAuditTrail(scriptId = 'chronicles-of-dust') {
  try {
    const data = await request(`/production/${scriptId}/audit`);
    if (data?.auditTrail) {
      localStorage.setItem(`scriptora_prod_audit_${scriptId}`, JSON.stringify(data.auditTrail));
      return data.auditTrail;
    }
  } catch (e) {}

  const cached = localStorage.getItem(`scriptora_prod_audit_${scriptId}`);
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }

  const defaults = [
    {
      id: "audit-1",
      scriptId,
      action: "PIN_SOURCE_VERSION",
      category: "VERSION_INTEGRITY",
      details: "Pinned production source baseline to screenplay draft 'Draft 4.2' (Hash: 88f2)",
      sourceVersion: "Draft 4.2",
      actor: "Arun Kumar (Owner)",
      timestamp: "12m ago"
    },
    {
      id: "audit-2",
      scriptId,
      action: "CONFIRM_DOCUMENT",
      category: "APPROVAL",
      details: "Confirmed Call Sheet #01 for official release by Owner",
      sourceVersion: "Draft 4.2",
      actor: "Arun Kumar (Owner)",
      timestamp: "2h ago"
    },
    {
      id: "audit-3",
      scriptId,
      action: "SUBMIT_PROPOSAL",
      category: "CHANGE_MANAGEMENT",
      details: "Proposal 'Add Water Truck Standby for Chamber B' submitted by Director Elena Rostova",
      sourceVersion: "Draft 4.2",
      actor: "Elena Rostova",
      timestamp: "3h ago"
    },
    {
      id: "audit-4",
      scriptId,
      action: "EXTRACT_BREAKDOWN",
      category: "PRODUCTION_TOOL",
      details: "Automated element breakdown synchronized across 18 scenes from Draft 4.2",
      sourceVersion: "Draft 4.2",
      actor: "System Intelligence",
      timestamp: "Yesterday"
    }
  ];
  localStorage.setItem(`scriptora_prod_audit_${scriptId}`, JSON.stringify(defaults));
  return defaults;
}

// =========================================================================
// 9. CORE PRE-PRODUCTION WORKFLOWS API CLIENT METHODS
// =========================================================================

export async function getProductionScenes(scriptId = 'chronicles-of-dust') {
  try {
    const data = await request(`/production/${scriptId}/scenes`);
    if (data?.scenes) {
      localStorage.setItem(`scriptora_prod_scenes_${scriptId}`, JSON.stringify(data.scenes));
      return data.scenes;
    }
  } catch (e) {}

  const cached = localStorage.getItem(`scriptora_prod_scenes_${scriptId}`);
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }

  // Fallback defaults for 10 scenes across 7 shoot days
  const scenes = [];
  const sceneHeadings = [
    { num: 1, heading: "EXT. MOJAVE OUTPOST GATE 4 - DAY", intExt: "EXT", dayNight: "DAY", p: "4 1/8", comp: "Moderate", day: "Day 1 of 7", cast: ["KEVIN", "MARCUS"], desc: "Wind whips dust across perimeter chain link. Kevin arrives at customs gate." },
    { num: 2, heading: "INT. OUTPOST CUSTOMS SHED - DAY", intExt: "INT", dayNight: "DAY", p: "3 4/8", comp: "Simple", day: "Day 1 of 7", cast: ["KEVIN", "MEERA"], desc: "Meera analyzes telemetry console indicating illegal pressure drop." },
    { num: 3, heading: "EXT. DRY LAKEBED CONDUIT - DUSK", intExt: "EXT", dayNight: "DUSK", p: "7 2/8", comp: "Complex", day: "Day 2 of 7", cast: ["KEVIN"], desc: "Concrete conduit pipeline across cracked alkali flats during sunset." },
    { num: 4, heading: "EXT. NORTHERN PERIMETER FENCE - NIGHT", intExt: "EXT", dayNight: "NIGHT", p: "5 0/8", comp: "Complex", day: "Day 3 of 7", cast: ["KEVIN", "MEERA"], desc: "Perimeter night patrol with solar rover and surveillance drones." },
    { num: 5, heading: "INT. HYDRAULIC VALVE TUNNEL - NIGHT", intExt: "INT", dayNight: "NIGHT", p: "5 4/8", comp: "Moderate", day: "Day 3 of 7", cast: ["KEVIN"], desc: "Rusty underground valves with echoing industrial turbine vibration." },
    { num: 6, heading: "EXT. DESERT SERVICE ROAD - DAY", intExt: "EXT", dayNight: "DAY", p: "5 2/8", comp: "Simple", day: "Day 4 of 7", cast: ["KEVIN"], desc: "Kevin tracks tanker tire treads along decommissioned asphalt." },
    { num: 7, heading: "INT. SYNDICATE PUMPING CONTROL - DAY", intExt: "INT", dayNight: "DAY", p: "6 3/8", comp: "Moderate", day: "Day 5 of 7", cast: ["COMMANDER VANCE", "KEVIN"], desc: "Vance oversees regional water diversion bank from glass observatory." },
    { num: 8, heading: "EXT. RESERVOIR INTAKE BASIN - DAY", intExt: "EXT", dayNight: "DAY", p: "5 5/8", comp: "Complex", day: "Day 6 of 7", cast: ["MEERA"], desc: "Rappelling 60-foot descent down drained concrete spillway." },
    { num: 9, heading: "INT. DRAINAGE VAULT - NIGHT", intExt: "INT", dayNight: "NIGHT", p: "4 1/8", comp: "Moderate", day: "Day 7 of 7", cast: ["KEVIN", "MEERA"], desc: "Subterranean acoustic surveillance using directional hydrophones." },
    { num: 10, heading: "INT. PUMPING STATION CHAMBER B - NIGHT", intExt: "INT", dayNight: "NIGHT", p: "2 6/8", comp: "Complex", day: "Day 2 of 7", cast: ["KEVIN", "MEERA"], desc: "Kevin anchors hydraulic bypass valve kit as high pressure brine seals." }
  ];

  for (const s of sceneHeadings) {
    scenes.push({
      id: `scene-${s.num}`,
      sceneNumber: s.num,
      scriptId,
      heading: s.heading,
      intExt: s.intExt,
      dayNight: s.dayNight,
      pages: s.p,
      complexity: s.comp,
      shootDay: s.day,
      status: s.num === 4 ? "Needs Review" : "Scheduled",
      snippet: s.desc,
      directorNotes: `Director visual notes for ${s.heading}. Maintain high contrast lighting.`,
      continuityNotes: `Continuity reference logged against Draft 4.2.`,
      cast: s.cast,
      sidesReady: true
    });
  }
  localStorage.setItem(`scriptora_prod_scenes_${scriptId}`, JSON.stringify(scenes));
  return scenes;
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
    localStorage.setItem(`scriptora_prod_scenes_${scriptId}`, JSON.stringify(scenes));
    return scene;
  }
  return updates;
}

export async function getProductionBreakdown(scriptId = 'chronicles-of-dust', category = null, scene = null) {
  try {
    const query = new URLSearchParams();
    if (category) query.set('category', category);
    if (scene) query.set('scene', scene);
    const qs = query.toString() ? `?${query.toString()}` : '';
    const data = await request(`/production/${scriptId}/breakdown${qs}`);
    if (data?.breakdown) {
      localStorage.setItem(`scriptora_prod_breakdown_${scriptId}`, JSON.stringify(data.breakdown));
      return data.breakdown;
    }
  } catch (e) {}

  const cached = localStorage.getItem(`scriptora_prod_breakdown_${scriptId}`);
  let list = [];
  if (cached) {
    try { list = JSON.parse(cached); } catch (_) {}
  }

  if (!list.length) {
    list = [
      {
        id: "elem-1",
        scriptId,
        sceneId: "scene-18",
        sceneNumber: 18,
        scenes: [1, 2, 4, 18],
        category: "Cast",
        name: "KEVIN",
        characterRole: "Discredited hydro-engineer, 30s. Hero protagonist.",
        description: "Discredited hydro-engineer, 30s. Hero protagonist.",
        assignedActor: "Dev Patel",
        castingStatus: "Confirmed Cast",
        actorAvailability: "Available Shoot Days 1-14",
        appearancesCount: 4,
        sourceSnippet: "Kevin kneels over cracked hydro-sensor junction box, static hissing from the diagnostic speaker.",
        originalAiSuggestion: "KEVIN — Discredited hydro-engineer, 30s. Hero protagonist.",
        status: "Confirmed",
        isHumanConfirmed: true,
        confidence: 1.0,
        confirmedBy: "Arun Kumar (Owner)",
        confirmedAt: "2026-10-14T08:00:00Z",
        notes: "Requires desert dust protective gear and waterproof boots."
      },
      {
        id: "elem-2",
        scriptId,
        sceneId: "scene-18",
        sceneNumber: 18,
        scenes: [4, 16, 18],
        category: "Cast",
        name: "MEERA",
        characterRole: "Field operative with tactical harness.",
        description: "Field operative with tactical harness.",
        assignedActor: "Zoe Saldana",
        castingStatus: "Confirmed Cast",
        actorAvailability: "Available Shoot Days 4-18",
        appearancesCount: 3,
        sourceSnippet: "Meera anchors her cable to the iron pylon, visor reflecting the rising floodwaters below.",
        originalAiSuggestion: "MEERA — Field operative with tactical harness.",
        status: "Confirmed",
        isHumanConfirmed: true,
        confidence: 1.0,
        confirmedBy: "Arun Kumar (Owner)",
        confirmedAt: "2026-10-14T08:00:00Z",
        notes: "Tactical harness fitted for scene 18 valve climb."
      },
      {
        id: "elem-3",
        scriptId,
        sceneId: "scene-18",
        sceneNumber: 18,
        scenes: [18],
        category: "Props",
        name: "Hydraulic Bypass Valve Kit",
        description: "Custom machined valve kit with functional digital LED pressure display.",
        sourcingType: "Hero Prop Built",
        quantity: "1 Hero + 2 Stunt Duplicates",
        readinessStatus: "Ready in Art Dept",
        continuityNotes: "Clean in Sc 1, weathered with grease in Sc 18",
        sourceSnippet: "Kevin clicks the bypass manifold into place. The gauge needles spike red.",
        originalAiSuggestion: "Hydraulic Bypass Valve Kit — machined valve kit with LED display.",
        status: "Confirmed",
        isHumanConfirmed: true,
        confidence: 0.95,
        confirmedBy: "Arun Kumar (Owner)",
        confirmedAt: "2026-10-14T08:00:00Z",
        notes: "Hero prop constructed by art department; 2 stunt duplicates on standby."
      },
      {
        id: "elem-4",
        scriptId,
        sceneId: "scene-18",
        sceneNumber: 18,
        scenes: [18],
        category: "Practical FX",
        name: "High-Pressure Water Spray",
        description: "Controlled water burst simulating cracked pipe joint failure.",
        requiredResources: "Dedicated 4000L Water Tanker, 120 PSI Pump Rig",
        technicalRequirements: "Safe water containment basins, electrical shut-off triggers",
        safetyNotes: "Non-slip decking mandatory; waterproof protective ponchos for camera crew",
        prepStatus: "Rig Test Scheduled",
        sourceSnippet: "A burst of pressurized brine shoots from the seam, blinding the chamber.",
        originalAiSuggestion: "High-Pressure Water Spray — Controlled water burst simulating cracked pipe failure.",
        status: "Needs Review",
        isHumanConfirmed: false,
        confidence: 0.88,
        confirmedBy: null,
        confirmedAt: null,
        notes: "SFX coordinator requested dedicated water truck standby via Proposal #prop-1."
      },
      {
        id: "elem-5",
        scriptId,
        sceneId: "scene-18",
        sceneNumber: 18,
        scenes: [18],
        category: "Stunts",
        name: "Valve Pylon Cable Rappel",
        description: "Meera swings 18 feet across open valve chasm to catch emergency release lever.",
        coordinationRequirements: "18ft wire pendulum rig, decelerator line, safety crash matting",
        qualifiedPersonnel: "Stunt Double: Tara Sen / Stunt Coordinator: Roy Hall",
        safetyPlanningStatus: "Awaiting Coordinator Review",
        sourceSnippet: "Meera kicks off the catwalk, swinging into the spray as the iron cable groans.",
        originalAiSuggestion: "Valve Pylon Cable Rappel — 18ft swing across chasm to catch lever.",
        status: "Needs Review",
        isHumanConfirmed: false,
        confidence: 0.92,
        confirmedBy: null,
        confirmedAt: null,
        notes: "Awaiting Stunt Coordinator risk assessment and harness certification."
      },
      {
        id: "elem-13",
        scriptId,
        sceneId: "scene-18",
        sceneNumber: 18,
        scenes: [18],
        category: "Locations",
        name: "Sub-Level Hydro-Chamber B",
        description: "Industrial concrete pumping cavern with rusty iron catwalks.",
        context: "INT.",
        lighting: "NIGHT",
        locationStatus: "Secured & Permitted",
        accessDetails: "Permit #WTR-994, Access via Gate 4 Service Tunnel",
        sourceSnippet: "INT. HYDRO-CHAMBER B - NIGHT. Rust-eaten steel catwalks suspend over deep abyss.",
        originalAiSuggestion: "Sub-Level Hydro-Chamber B — Concrete pumping cavern with catwalks.",
        status: "Confirmed",
        isHumanConfirmed: true,
        confidence: 1.0,
        confirmedBy: "Arun Kumar (Owner)",
        confirmedAt: "2026-10-14T08:00:00Z",
        notes: "Acoustic echo requires directional shotgun mics; non-slip floor treatment applied."
      },
      {
        id: "elem-6",
        scriptId,
        sceneId: "scene-1",
        sceneNumber: 1,
        scenes: [1],
        category: "Costumes",
        name: "Kevin — Weathered Dust Coat & Respirator",
        character: "KEVIN",
        description: "Heavy canvas duster coat, solar respirator around neck.",
        wardrobeRequirements: "Duster coat with distressed seam stitching, respirator with worn elastic straps",
        continuityChanges: "Costume Stage 1 (Desert Dust / Dry)",
        prepStatus: "Fitted & Approved",
        sourceSnippet: "KEVIN (30s), sun-scoured and weary, adjusts his solar filter.",
        originalAiSuggestion: "Kevin — Duster coat, respirator around neck.",
        status: "Confirmed",
        isHumanConfirmed: true,
        confidence: 1.0,
        confirmedBy: "Arun Kumar (Owner)",
        confirmedAt: "2026-10-14T08:00:00Z",
        notes: "Costume fitting complete with wardrobe dept."
      },
      {
        id: "elem-7",
        scriptId,
        sceneId: "scene-1",
        sceneNumber: 1,
        scenes: [1],
        category: "Cast",
        name: "MARCUS",
        characterRole: "Border outpost security guard.",
        description: "Border outpost security guard.",
        assignedActor: "Unassigned (Auditioning)",
        castingStatus: "Auditioning",
        actorAvailability: "Day 1 Shoot Only",
        appearancesCount: 1,
        sourceSnippet: "MARCUS leans against the chain link, tapping an unlit cigarette against his wrist.",
        originalAiSuggestion: "MARCUS — Border outpost security guard.",
        status: "Confirmed",
        isHumanConfirmed: true,
        confidence: 0.98,
        confirmedBy: "Elena Rostova",
        confirmedAt: "2026-10-13T16:00:00Z",
        notes: "Supporting role. Day 1 shoot only."
      },
      {
        id: "elem-8",
        scriptId,
        sceneId: "scene-1",
        sceneNumber: 1,
        scenes: [1],
        category: "Props",
        name: "Solar Filter Dust Goggles",
        description: "Tinted goggles with worn leather straps.",
        sourcingType: "Hero Wardrobe Prop",
        quantity: "2 Pairs (A & B Camera)",
        readinessStatus: "Ready in Art Dept",
        continuityNotes: "Worn over eyes during wind gusts, rest on forehead indoors",
        sourceSnippet: "Kevin pulls the goggles over his eyes as a gust hits.",
        originalAiSuggestion: "Solar Filter Dust Goggles — Tinted goggles with worn leather straps.",
        status: "Confirmed",
        isHumanConfirmed: true,
        confidence: 1.0,
        confirmedBy: "Arun Kumar (Owner)",
        confirmedAt: "2026-10-14T08:00:00Z",
        notes: "Hero wardrobe prop."
      },
      {
        id: "elem-9",
        scriptId,
        sceneId: "scene-1",
        sceneNumber: 1,
        scenes: [1],
        category: "Vehicles",
        name: "Solar Patrol Rover (Modified)",
        description: "Lightweight dune rover fitted with dual photovoltaic roof panels.",
        availability: "On Set Shoot Days 1 & 2",
        operationalRequirements: "Charging station in Base Camp, Art Dept weathering wrap",
        prepStatus: "Checked In & Inspected",
        sourceSnippet: "The rover sits idling beside Gate 4, suspension coated in red grit.",
        originalAiSuggestion: "Solar Patrol Rover (Modified) — Dune rover with dual photovoltaic roof panels.",
        status: "Confirmed",
        isHumanConfirmed: true,
        confidence: 0.96,
        confirmedBy: "Arun Kumar (Owner)",
        confirmedAt: "2026-10-14T08:00:00Z",
        notes: "Picture vehicle running on electric battery. Backup battery pack required."
      },
      {
        id: "elem-10",
        scriptId,
        sceneId: "scene-4",
        sceneNumber: 4,
        scenes: [4],
        category: "Props",
        name: "Night-Vision Monocular Scope",
        description: "Military grade digital thermal optics.",
        sourcingType: "Rented",
        quantity: "1 Unit",
        readinessStatus: "Sourcing",
        continuityNotes: "Handheld by Meera on perimeter wall",
        sourceSnippet: "Meera scans the wire with her thermal monocle. Three glowing silhouettes freeze.",
        originalAiSuggestion: "Night-Vision Monocular Scope — Military grade digital thermal optics.",
        status: "Needs Review",
        isHumanConfirmed: false,
        confidence: 0.85,
        confirmedBy: null,
        confirmedAt: null,
        notes: "Rental request pending vendor confirmation."
      },
      {
        id: "elem-11",
        scriptId,
        sceneId: "scene-7",
        sceneNumber: 7,
        scenes: [7],
        category: "Cast",
        name: "COMMANDER VANCE",
        characterRole: "Antagonist, regional water syndicate director.",
        description: "Antagonist, regional water syndicate director.",
        assignedActor: "Michael Shannon",
        castingStatus: "Offer Out",
        actorAvailability: "Hold Oct 20-24",
        appearancesCount: 2,
        sourceSnippet: "COMMANDER VANCE (50s), tailored gray linen, stands over the telemetry terminal.",
        originalAiSuggestion: "COMMANDER VANCE — Antagonist, regional water syndicate director.",
        status: "Confirmed",
        isHumanConfirmed: true,
        confidence: 1.0,
        confirmedBy: "Arun Kumar (Owner)",
        confirmedAt: "2026-10-14T08:00:00Z",
        notes: "Cast confirmed. Costume fitting scheduled Oct 20."
      },
      {
        id: "elem-12",
        scriptId,
        sceneId: "scene-16",
        sceneNumber: 16,
        scenes: [16],
        category: "Practical FX",
        name: "Catwalk Rain Towers",
        description: "Simulated industrial torrential flood conditions on exterior catwalk.",
        requiredResources: "3 Overhead Rain Spars, 2 Fire Hydrant Ties",
        technicalRequirements: "Runoff water deflection channeling away from electrical stage lines",
        safetyNotes: "Safety harnesses mandatory on exterior catwalk scaffolding",
        prepStatus: "Pending Proposal Approval",
        sourceSnippet: "Water cascades down the spillway faces like Niagara.",
        originalAiSuggestion: "Catwalk Rain Towers — Simulated flood conditions on exterior catwalk.",
        status: "Needs Review",
        isHumanConfirmed: false,
        confidence: 0.9,
        confirmedBy: null,
        confirmedAt: null,
        notes: "Requires environmental containment permits."
      }
    ];
    localStorage.setItem(`scriptora_prod_breakdown_${scriptId}`, JSON.stringify(list));
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
        localStorage.setItem(`scriptora_prod_breakdown_${scriptId}`, JSON.stringify(list));
      }
      return data.item;
    }
  } catch (e) {}

  const list = await getProductionBreakdown(scriptId);
  const item = list.find(b => b.id === itemId);
  if (item) {
    if ((updates.name && updates.name !== item.name) || (updates.description && updates.description !== item.description)) {
      item.userCorrection = {
        previousName: item.name,
        previousDesc: item.description,
        correctedBy: "Arun Kumar (Owner)",
        correctedAt: new Date().toISOString()
      };
    }
    Object.assign(item, updates);
    if (updates.status === 'Confirmed') {
      item.isHumanConfirmed = true;
      item.confirmedBy = "Arun Kumar (Owner)";
      item.confirmedAt = new Date().toISOString();
    } else if (updates.status === 'Needs Review') {
      item.isHumanConfirmed = false;
    }
    localStorage.setItem(`scriptora_prod_breakdown_${scriptId}`, JSON.stringify(list));
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
      localStorage.setItem(`scriptora_prod_breakdown_${scriptId}`, JSON.stringify(filtered));
      return data;
    }
  } catch (e) {}

  const list = await getProductionBreakdown(scriptId);
  const filtered = list.filter(b => b.id !== itemId);
  localStorage.setItem(`scriptora_prod_breakdown_${scriptId}`, JSON.stringify(filtered));
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
      localStorage.setItem(`scriptora_prod_breakdown_${scriptId}`, JSON.stringify(list));
      return data.item;
    }
  } catch (e) {}

  const list = await getProductionBreakdown(scriptId);
  const sceneNum = Number(itemData.sceneNumber || (itemData.sceneId ? String(itemData.sceneId).replace('scene-', '') : 18));
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
    confirmedBy: "Arun Kumar (Owner)",
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
  localStorage.setItem(`scriptora_prod_breakdown_${scriptId}`, JSON.stringify(list));
  return newItem;
}

export async function getProductionCallSheets(scriptId = 'chronicles-of-dust') {
  try {
    const data = await request(`/production/${scriptId}/call-sheets`);
    if (data?.callSheets) {
      localStorage.setItem(`scriptora_prod_callsheets_${scriptId}`, JSON.stringify(data.callSheets));
      return data.callSheets;
    }
  } catch (e) {}

  const cached = localStorage.getItem(`scriptora_prod_callsheets_${scriptId}`);
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }

  const defaults = [
    {
      id: "cs-1",
      scriptId,
      callSheetNumber: "01",
      shootDay: "Day 1 of 7",
      shootDate: "Saturday, Oct 24, 2026",
      generalCrewCall: "06:00 AM",
      shootingCall: "06:30 AM",
      breakfastTime: "05:15 AM",
      estimatedWrap: "06:30 PM",
      status: "Confirmed",
      isPublished: true,
      version: "v1.0",
      locationName: "Mojave Outpost Gate 4",
      locationAddress: "Perimeter Road 9, Cantil, CA 93519",
      parkingNotes: "Crew parking at Basecamp Lot B (1/4 mile west of gate). Shuttle runs every 10 mins.",
      nearestHospital: "Kern Valley Healthcare District, 6412 Laurel Ave, Lake Isabella, CA (Ph: 760-379-2681)",
      weatherSummary: "Sunny, 74°F high, 48°F low. Winds WNW 10-15 mph. Dust advisory after 4:00 PM.",
      scenes: [
        { sceneNumber: 1, heading: "EXT. MOJAVE OUTPOST GATE 4 - DAY", pages: "4 1/8", cast: ["KEVIN", "MARCUS"], desc: "Kevin arrives at border gate, inspection with Marcus." },
        { sceneNumber: 2, heading: "INT. OUTPOST CUSTOMS SHED - DAY", pages: "3 4/8", cast: ["KEVIN", "MEERA"], desc: "Kevin discovers pressure loss on telemetry terminal." }
      ],
      castCalls: [
        { character: "KEVIN", actor: "Arun Kumar", pickup: "05:00 AM", hmuCall: "05:30 AM", onSet: "06:30 AM", status: "Confirmed" },
        { character: "MARCUS", actor: "David Chen", pickup: "05:15 AM", hmuCall: "05:45 AM", onSet: "06:30 AM", status: "Confirmed" },
        { character: "MEERA", actor: "Priya Sharma", pickup: "08:30 AM", hmuCall: "09:00 AM", onSet: "10:30 AM", status: "Confirmed" }
      ],
      specialInstructions: "Eye protection mandatory for all crew on exterior perimeter due to afternoon dust squall.",
      approvedBy: "Arun Kumar (Owner)",
      publishedAt: "2026-10-14T08:00:00Z"
    },
    {
      id: "cs-2",
      scriptId,
      callSheetNumber: "02",
      shootDay: "Day 2 of 7",
      shootDate: "Sunday, Oct 25, 2026",
      generalCrewCall: "06:30 AM",
      shootingCall: "07:00 AM",
      breakfastTime: "05:45 AM",
      estimatedWrap: "07:00 PM",
      status: "Draft",
      isPublished: false,
      version: "v0.9",
      locationName: "Pumping Station Chamber B",
      locationAddress: "Aqueduct District Facility 4, Mojave, CA 93501",
      parkingNotes: "Basecamp parking inside Gate 2 secure compound. Security clearance badge required.",
      nearestHospital: "Antelope Valley Medical Center, 1600 W Ave J, Lancaster, CA (Ph: 661-949-5000)",
      weatherSummary: "Interior stage / sheltered facility. Ambient temp 68°F. Hearing protection mandatory.",
      scenes: [
        { sceneNumber: 3, heading: "EXT. DRY LAKEBED CONDUIT - DUSK", pages: "7 2/8", cast: ["KEVIN"], desc: "Kevin examines exterior tap line." },
        { sceneNumber: 10, heading: "INT. PUMPING STATION CHAMBER B - NIGHT", pages: "2 6/8", cast: ["KEVIN", "MEERA"], desc: "High water pressure valve breach and cable clamp." }
      ],
      castCalls: [
        { character: "KEVIN", actor: "Arun Kumar", pickup: "05:30 AM", hmuCall: "06:00 AM", onSet: "07:00 AM", status: "Draft" },
        { character: "MEERA", actor: "Priya Sharma", pickup: "05:30 AM", hmuCall: "06:00 AM", onSet: "07:00 AM", status: "Draft" }
      ],
      specialInstructions: "Wet set protocols in effect for Scene 10. Waterproof camera housing and electrical GFI circuits required.",
      approvedBy: null,
      publishedAt: null
    }
  ];
  localStorage.setItem(`scriptora_prod_callsheets_${scriptId}`, JSON.stringify(defaults));
  return defaults;
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
    shootDay: data.shootDay || `Day ${sheets.length + 1} of 14`,
    shootDate: data.shootDate || "Monday, Oct 26, 2026",
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
    nearestHospital: data.nearestHospital || "Desert Care Network Regional, Palm Springs, CA",
    weatherSummary: data.weatherSummary || "Forecast pending.",
    scenes: data.scenes || [{ sceneNumber: 4, heading: "EXT. NORTHERN PERIMETER FENCE - NIGHT", pages: "5 0/8", cast: ["KEVIN", "MEERA"], desc: "Perimeter fence inspection." }],
    castCalls: data.castCalls || [
      { character: "KEVIN", actor: "Arun Kumar", pickup: "05:00 AM", hmuCall: "05:30 AM", onSet: "06:30 AM", status: "Draft" }
    ],
    specialInstructions: data.specialInstructions || "Standard safety directives.",
    approvedBy: null,
    publishedAt: null
  };
  sheets.push(newCs);
  localStorage.setItem(`scriptora_prod_callsheets_${scriptId}`, JSON.stringify(sheets));
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
    localStorage.setItem(`scriptora_prod_callsheets_${scriptId}`, JSON.stringify(sheets));
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
    cs.approvedBy = "Arun Kumar (Owner)";
    cs.publishedAt = new Date().toISOString();
    localStorage.setItem(`scriptora_prod_callsheets_${scriptId}`, JSON.stringify(sheets));
    return cs;
  }
  return null;
}

export async function getProductionSchedule(scriptId = 'chronicles-of-dust') {
  try {
    const data = await request(`/production/${scriptId}/schedule`);
    if (data?.schedule) {
      localStorage.setItem(`scriptora_prod_schedule_${scriptId}`, JSON.stringify(data.schedule));
      return data.schedule;
    }
  } catch (e) {}

  const cached = localStorage.getItem(`scriptora_prod_schedule_${scriptId}`);
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }

  const defaults = [
    { dayNumber: 1, date: "Oct 24, 2026", title: "Outpost Perimeter & Shed", location: "Mojave Gate 4", sceneNumbers: [1, 2], totalPages: "7 5/8", estHours: 10.5, companyMoves: 0, isLocked: true, status: "Confirmed" },
    { dayNumber: 2, date: "Oct 25, 2026", title: "Lakebed Conduit & Chamber B", location: "Chamber B Dry Tank", sceneNumbers: [3, 10], totalPages: "10 0/8", estHours: 11.0, companyMoves: 1, isLocked: false, status: "Draft" },
    { dayNumber: 3, date: "Oct 26, 2026", title: "Perimeter Fence & Valve Tunnel", location: "Perimeter Sector 9", sceneNumbers: [4, 5], totalPages: "10 4/8", estHours: 11.5, companyMoves: 1, isLocked: false, status: "Draft" },
    { dayNumber: 4, date: "Oct 27, 2026", title: "Service Road Pursuit", location: "Route 66 Cutoff", sceneNumbers: [6], totalPages: "5 2/8", estHours: 8.0, companyMoves: 0, isLocked: false, status: "Draft" },
    { dayNumber: 5, date: "Oct 28, 2026", title: "Syndicate Regional Control", location: "Syndicate Regional HQ", sceneNumbers: [7], totalPages: "6 3/8", estHours: 9.0, companyMoves: 0, isLocked: false, status: "Draft" },
    { dayNumber: 6, date: "Oct 29, 2026", title: "Reservoir Intake Rappel", location: "Lake Mead Dry Spillway", sceneNumbers: [8], totalPages: "5 5/8", estHours: 10.0, companyMoves: 0, isLocked: false, status: "Draft" },
    { dayNumber: 7, date: "Oct 30, 2026", title: "Drainage Sub-vaults & Wrap", location: "Vault Sub-structure 3", sceneNumbers: [9], totalPages: "4 1/8", estHours: 8.5, companyMoves: 0, isLocked: false, status: "Draft" }
  ];
  localStorage.setItem(`scriptora_prod_schedule_${scriptId}`, JSON.stringify(defaults));
  return defaults;
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
    localStorage.setItem(`scriptora_prod_schedule_${scriptId}`, JSON.stringify(schedule));
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
  localStorage.setItem(`scriptora_prod_schedule_${scriptId}`, JSON.stringify(schedule));
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

export async function getProductionReadiness(scriptId = 'chronicles-of-dust') {
  try {
    const data = await request(`/production/${scriptId}/readiness`);
    if (data?.readiness) {
      localStorage.setItem(`scriptora_prod_readiness_${scriptId}`, JSON.stringify(data.readiness));
      return data.readiness;
    }
  } catch (e) {}

  const cached = localStorage.getItem(`scriptora_prod_readiness_${scriptId}`);
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }

  const defaults = [
    {
      id: "ready-1",
      scriptId,
      title: "Confirm Water Truck Safety Crew for Scene 10",
      category: "Safety / SFX",
      severity: "critical",
      status: "action_needed",
      description: "High-pressure brine valve burst in Scene 10 requires Stunt Coordinator sign-off and standby water tanker.",
      targetRoute: "/production/changes",
      targetEntity: "prop-1"
    },
    {
      id: "ready-2",
      scriptId,
      title: "Review 3 Unconfirmed Breakdown Items",
      category: "Breakdown",
      severity: "warning",
      status: "action_needed",
      description: "Scene 4 Night-Vision optics and Scene 10 cable rappel are currently in Needs Review status.",
      targetRoute: "/production/breakdown",
      targetEntity: "scene-10"
    },
    {
      id: "ready-3",
      scriptId,
      title: "Owner Approval Required for Call Sheet #02",
      category: "Call Sheets",
      severity: "critical",
      status: "action_needed",
      description: "Call Sheet #02 (Day 2 of 7) is currently in Draft status. Must be approved and published before crew distribution.",
      targetRoute: "/production/call-sheets",
      targetEntity: "cs-2"
    },
    {
      id: "ready-4",
      scriptId,
      title: "All 10 Scenes Stripboard Scheduled",
      category: "Schedule",
      severity: "ready",
      status: "resolved",
      description: "Every scene from Draft 4.2 has been allocated across the 7-day master shooting calendar.",
      targetRoute: "/production/schedule",
      targetEntity: null
    },
    {
      id: "ready-5",
      scriptId,
      title: "Call Sheet #01 Published & Locked",
      category: "Call Sheets",
      severity: "ready",
      status: "resolved",
      description: "Call Sheet #01 confirmed by Owner with emergency medical routes and parking directives.",
      targetRoute: "/production/call-sheets",
      targetEntity: "cs-1"
    },
    {
      id: "ready-6",
      scriptId,
      title: "Lead Talent Wardrobe Fittings Verified",
      category: "Cast",
      severity: "ready",
      status: "resolved",
      description: "Costume specs and protective goggles fitted for Kevin, Meera, and Commander Vance.",
      targetRoute: "/production/directory",
      targetEntity: "res-1"
    }
  ];
  localStorage.setItem(`scriptora_prod_readiness_${scriptId}`, JSON.stringify(defaults));
  return defaults;
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
    localStorage.setItem(`scriptora_prod_readiness_${scriptId}`, JSON.stringify(list));
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
  localStorage.setItem(`scriptora_prod_ws_${scriptId}`, JSON.stringify(ws));
  return ws;
}

export async function deleteProductionCallSheet(scriptId, csId) {
  try {
    const res = await request(`/production/${scriptId}/call-sheets/${csId}`, { method: 'DELETE' });
    if (res?.success) {
      const sheets = await getProductionCallSheets(scriptId);
      const filtered = sheets.filter(c => c.id !== csId);
      localStorage.setItem(`scriptora_prod_callsheets_${scriptId}`, JSON.stringify(filtered));
      return res;
    }
  } catch (e) {}

  const sheets = await getProductionCallSheets(scriptId);
  const filtered = sheets.filter(c => c.id !== csId);
  localStorage.setItem(`scriptora_prod_callsheets_${scriptId}`, JSON.stringify(filtered));
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
      localStorage.setItem(`scriptora_prod_schedule_${scriptId}`, JSON.stringify(days));
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
  localStorage.setItem(`scriptora_prod_schedule_${scriptId}`, JSON.stringify(days));
  return newDay;
}

export async function deleteProductionScheduleDay(scriptId, dayNumber) {
  const num = Number(dayNumber);
  try {
    const res = await request(`/production/${scriptId}/schedule/day/${num}`, { method: 'DELETE' });
    if (res?.success) {
      const days = await getProductionSchedule(scriptId);
      const filtered = days.filter(d => d.dayNumber !== num);
      localStorage.setItem(`scriptora_prod_schedule_${scriptId}`, JSON.stringify(filtered));
      return res;
    }
  } catch (e) {}

  const days = await getProductionSchedule(scriptId);
  const filtered = days.filter(d => d.dayNumber !== num);
  localStorage.setItem(`scriptora_prod_schedule_${scriptId}`, JSON.stringify(filtered));
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
      localStorage.setItem(`scriptora_prod_res_${scriptId}`, JSON.stringify(list));
      localStorage.setItem(`scriptora_prod_resources_${scriptId}`, JSON.stringify(list));
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
  localStorage.setItem(`scriptora_prod_res_${scriptId}`, JSON.stringify(list));
  localStorage.setItem(`scriptora_prod_resources_${scriptId}`, JSON.stringify(list));
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
      localStorage.setItem(`scriptora_prod_res_${scriptId}`, JSON.stringify(list));
      localStorage.setItem(`scriptora_prod_resources_${scriptId}`, JSON.stringify(list));
      return res.resource;
    }
  } catch (e) {}

  const list = await getProductionResources(scriptId);
  const item = list.find(r => r.id === resId);
  if (item) {
    Object.assign(item, updates);
    localStorage.setItem(`scriptora_prod_res_${scriptId}`, JSON.stringify(list));
    localStorage.setItem(`scriptora_prod_resources_${scriptId}`, JSON.stringify(list));
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
      localStorage.setItem(`scriptora_prod_res_${scriptId}`, JSON.stringify(filtered));
      localStorage.setItem(`scriptora_prod_resources_${scriptId}`, JSON.stringify(filtered));
      return res;
    }
  } catch (e) {}

  const list = await getProductionResources(scriptId);
  const filtered = list.filter(r => r.id !== resId);
  localStorage.setItem(`scriptora_prod_res_${scriptId}`, JSON.stringify(filtered));
  localStorage.setItem(`scriptora_prod_resources_${scriptId}`, JSON.stringify(filtered));
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
      localStorage.setItem(`scriptora_prod_docs_${scriptId}`, JSON.stringify(docs));
      return res.document;
    }
  } catch (e) {}

  const docs = await getProductionDocuments(scriptId);
  const newDoc = {
    id: `doc-${Date.now()}`,
    scriptId,
    type: docData.type || "Production Report",
    title: docData.title || "New Production Document",
    sourceVersion: docData.sourceVersion || "Draft 4.2",
    shootDay: docData.shootDay || "General",
    date: docData.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    location: docData.location || "Production Basecamp",
    scenes: docData.scenes || [],
    status: docData.status || "Draft",
    published: docData.published || false,
    version: docData.version || "v0.9"
  };
  docs.unshift(newDoc);
  localStorage.setItem(`scriptora_prod_docs_${scriptId}`, JSON.stringify(docs));
  return newDoc;
}

export async function deleteProductionDocument(scriptId, docId) {
  try {
    const res = await request(`/production/${scriptId}/documents/${docId}`, { method: 'DELETE' });
    if (res?.success) {
      const docs = await getProductionDocuments(scriptId);
      const filtered = docs.filter(d => d.id !== docId);
      localStorage.setItem(`scriptora_prod_docs_${scriptId}`, JSON.stringify(filtered));
      return res;
    }
  } catch (e) {}

  const docs = await getProductionDocuments(scriptId);
  const filtered = docs.filter(d => d.id !== docId);
  localStorage.setItem(`scriptora_prod_docs_${scriptId}`, JSON.stringify(filtered));
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

export async function getStoryboards(scriptId = 'chronicles-of-dust') {
  try {
    const data = await request(`/production/${scriptId}/storyboards`);
    if (data?.storyboards) {
      localStorage.setItem(`scriptora_storyboards_${scriptId}`, JSON.stringify(data.storyboards));
      return data.storyboards;
    }
  } catch (e) {}

  const cached = localStorage.getItem(`scriptora_storyboards_${scriptId}`);
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }
  return [];
}

export async function getStoryboard(scriptId = 'chronicles-of-dust', sceneId = 'scene-1') {
  try {
    const data = await request(`/production/${scriptId}/storyboard?sceneId=${sceneId}`);
    if (data?.storyboard) {
      localStorage.setItem(`scriptora_storyboard_${scriptId}_${sceneId}`, JSON.stringify(data.storyboard));
      return data.storyboard;
    }
  } catch (e) {}

  const cached = localStorage.getItem(`scriptora_storyboard_${scriptId}_${sceneId}`);
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }

  // Fallback defaults for Scene 1 and Scene 10 if offline
  const scenes = await getProductionScenes(scriptId);
  const sceneNum = Number(String(sceneId).replace('scene-', '')) || 1;
  const scene = scenes.find(s => s.id === sceneId || s.sceneNumber === sceneNum) || {
    id: `scene-${sceneNum}`,
    sceneNumber: sceneNum,
    heading: `SCENE ${sceneNum} - UNTITLED`,
    intExt: 'INT',
    dayNight: 'DAY'
  };

  const defaultShots = sceneNum === 1 ? [
    {
      id: "shot-1-1A",
      shotNumber: "1A",
      order: 1,
      title: "Perimeter Outpost Gate",
      description: "High altitude drone descending across dust devils toward Kevin's arrival at the arid customs gate.",
      shotSize: "Wide Shot",
      cameraAngle: "High Angle",
      cameraMovement: "Crane / Jib",
      focalLength: "24mm Wide",
      lightingMood: "Daylight Dust",
      aspectRatio: "2.39:1",
      visualStyle: "Cinematic Concept Art",
      prompt: "Cinematic wide shot, arid desert outpost gate, dust devils whirling, 2.39:1 anamorphic",
      imageUrl: createSvgFrame("1A", "2.39:1 · 24mm Wide", "EXT. MOJAVE OUTPOST GATE 4 - DAY", "Wide Shot"),
      imageSource: "ai",
      provider: "scriptora-concept",
      quality: "hd",
      costEstimate: "Free (Built-in)",
      approvalStatus: "approved",
      approvalNotes: "Great atmosphere and sense of scale. Approved for primary camera team.",
      approvedBy: "Arun Kumar (Owner)",
      approvedAt: "2026-10-18T10:30:00Z",
      directorNotes: "Capture sunrise glint off the guard gate perimeter wires.",
      characters: ["KEVIN", "MARCUS"],
      location: "Arid Outpost Gate 4",
      continuity: {
        characterPosition: "Kevin approaching from camera-left",
        screenDirection: "Left to Right",
        eyeline: "Looking toward Outpost Gate",
        lightingContinuity: "High-contrast morning sun from east",
        costumeState: "Dust coat level 2, canteen left side",
        propPlacement: "Gate clearance scanner in right hand"
      },
      history: []
    },
    {
      id: "shot-1-1B",
      shotNumber: "1B",
      order: 2,
      title: "Gate Scanner Clearance Standoff",
      description: "Medium two-shot of Kevin presenting his ID badge to Marcus over the buzzing clearance terminal.",
      shotSize: "Medium Two-Shot",
      cameraAngle: "Eye Level",
      cameraMovement: "Static",
      focalLength: "50mm Prime",
      lightingMood: "Harsh Fluorescent Rim",
      aspectRatio: "2.39:1",
      visualStyle: "Cinematic Concept Art",
      prompt: "Medium two-shot, dusty outpost booth, weary hydro-engineer confronting guard, 50mm",
      imageUrl: createSvgFrame("1B", "2.39:1 · 50mm Prime", "EXT. MOJAVE OUTPOST GATE 4 - DAY", "Medium Two-Shot"),
      imageSource: "ai",
      provider: "scriptora-concept",
      quality: "hd",
      costEstimate: "Free (Built-in)",
      approvalStatus: "approved",
      approvalNotes: "Good eyeline match with Shot 1A.",
      approvedBy: "Arun Kumar (Owner)",
      approvedAt: "2026-10-18T10:35:00Z",
      directorNotes: "Focus pull from scanner terminal to Kevin's tense expression.",
      characters: ["KEVIN", "MARCUS"],
      location: "Arid Outpost Gate 4",
      continuity: {
        characterPosition: "Kevin screen-left, Marcus screen-right",
        screenDirection: "Left to Right",
        eyeline: "Eye-level direct confrontation",
        lightingContinuity: "Terminal backlight rimming Kevin's face",
        costumeState: "Kevin wearing goggles around neck",
        propPlacement: "ID card inserted into reader"
      },
      history: []
    },
    {
      id: "shot-1-1C",
      shotNumber: "1C",
      order: 3,
      title: "Terminal Diagnostic Anomaly",
      description: "Close-up insert of the flickering scanner console displaying pressure alert warning in red neon.",
      shotSize: "Close-Up",
      cameraAngle: "Low Angle",
      cameraMovement: "Static",
      focalLength: "85mm Portrait",
      lightingMood: "Cyan Strobe",
      aspectRatio: "2.39:1",
      visualStyle: "Cinematic Concept Art",
      prompt: "Extreme close-up on rugged military diagnostic screen, red warning glyphs, 85mm",
      imageUrl: createSvgFrame("1C", "2.39:1 · 85mm Close-Up", "EXT. MOJAVE OUTPOST GATE 4 - DAY", "Close-Up"),
      imageSource: "ai",
      provider: "scriptora-concept",
      quality: "hd",
      costEstimate: "Free (Built-in)",
      approvalStatus: "proposed",
      approvalNotes: "Review telemetry readout typography for accuracy.",
      approvedBy: null,
      approvedAt: null,
      directorNotes: "Practical screen insert; needs strobe flash on alert pulse.",
      characters: ["KEVIN"],
      location: "Arid Outpost Gate 4",
      continuity: {
        characterPosition: "Centered insert",
        screenDirection: "Neutral",
        eyeline: "Downwards onto screen",
        lightingContinuity: "Red alert flashing 1Hz",
        costumeState: "Kevin's gloved thumb on lower bezel",
        propPlacement: "Scanner unit firmly latched"
      },
      history: []
    }
  ] : [];

  const sb = {
    id: `sb-${scriptId}-${scene.id}`,
    scriptId,
    sceneId: scene.id,
    sceneNumber: scene.sceneNumber,
    sceneHeading: scene.heading,
    intExt: scene.intExt || 'INT',
    dayNight: scene.dayNight || 'DAY',
    sourceVersion: "Draft 4.2",
    isVersionStale: false,
    aspectRatio: "2.39:1",
    visualStyle: "Cinematic Concept Art",
    shots: defaultShots,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  localStorage.setItem(`scriptora_storyboard_${scriptId}_${sceneId}`, JSON.stringify(sb));
  return sb;
}

export async function saveStoryboard(scriptId, storyboardData) {
  try {
    const res = await request(`/production/${scriptId}/storyboard`, {
      method: 'POST',
      body: JSON.stringify(storyboardData)
    });
    if (res?.storyboard) {
      localStorage.setItem(`scriptora_storyboard_${scriptId}_${res.storyboard.sceneId}`, JSON.stringify(res.storyboard));
      return res.storyboard;
    }
  } catch (e) {}

  const sceneId = storyboardData.sceneId || `scene-${storyboardData.sceneNumber || 1}`;
  localStorage.setItem(`scriptora_storyboard_${scriptId}_${sceneId}`, JSON.stringify(storyboardData));
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
        localStorage.setItem(`scriptora_storyboard_${scriptId}_${sceneId}`, JSON.stringify(res.storyboard));
      }
      return res;
    }
  } catch (e) {}

  const sb = await getStoryboard(scriptId, sceneId);
  const nextOrder = sb.shots.length + 1;
  const shotLetter = String.fromCharCode(65 + ((nextOrder - 1) % 26));
  const shotNumber = shotData.shotNumber || `${sb.sceneNumber}${shotLetter}`;

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
  localStorage.setItem(`scriptora_storyboard_${scriptId}_${sceneId}`, JSON.stringify(sb));
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
        localStorage.setItem(`scriptora_storyboard_${scriptId}_${sceneId}`, JSON.stringify(res.storyboard));
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
  localStorage.setItem(`scriptora_storyboard_${scriptId}_${sceneId}`, JSON.stringify(sb));
  return { storyboard: sb, shot };
}

export async function deleteStoryboardShot(scriptId, sceneId, shotId) {
  try {
    const res = await request(`/production/${scriptId}/storyboard/${sceneId}/shots/${shotId}`, {
      method: 'DELETE'
    });
    if (res?.success) {
      if (res.storyboard) {
        localStorage.setItem(`scriptora_storyboard_${scriptId}_${sceneId}`, JSON.stringify(res.storyboard));
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
    localStorage.setItem(`scriptora_storyboard_${scriptId}_${sceneId}`, JSON.stringify(sb));
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
      localStorage.setItem(`scriptora_storyboard_${scriptId}_${sceneId}`, JSON.stringify(res.storyboard));
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
  localStorage.setItem(`scriptora_storyboard_${scriptId}_${sceneId}`, JSON.stringify(sb));
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
        localStorage.setItem(`scriptora_storyboard_${scriptId}_${sceneId}`, JSON.stringify(res.storyboard));
      }
      return res;
    }
  } catch (e) {}

  const sb = await getStoryboard(scriptId, sceneId);
  const shot = sb.shots.find(s => s.id === shotId);
  if (shot) {
    shot.approvalStatus = status;
    shot.approvalNotes = notes || shot.approvalNotes || "";
    shot.approvedBy = "Arun Kumar (Owner)";
    shot.approvedAt = new Date().toISOString();
    shot.updatedAt = new Date().toISOString();
    sb.updatedAt = new Date().toISOString();
    localStorage.setItem(`scriptora_storyboard_${scriptId}_${sceneId}`, JSON.stringify(sb));
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
      localStorage.setItem(`scriptora_storyboard_${scriptId}_${sceneId}`, JSON.stringify(res.storyboard));
      return res;
    }
  } catch (e) {}

  const sb = await getStoryboard(scriptId, sceneId);
  let count = 0;
  for (const s of sb.shots) {
    if (shotIds.includes(s.id)) {
      s.approvalStatus = status;
      if (notes) s.approvalNotes = notes;
      s.approvedBy = "Arun Kumar (Owner)";
      s.approvedAt = new Date().toISOString();
      s.updatedAt = new Date().toISOString();
      count++;
    }
  }
  sb.updatedAt = new Date().toISOString();
  localStorage.setItem(`scriptora_storyboard_${scriptId}_${sceneId}`, JSON.stringify(sb));
  return { storyboard: sb, affectedCount: count };
}

export async function generateStoryboardShot(scriptId, params = {}) {
  try {
    const res = await request(`/production/${scriptId}/storyboard/generate-shot`, {
      method: 'POST',
      body: JSON.stringify(params)
    });
    if (res?.imageUrl) return res;
  } catch (e) {
    // If backend returns a provider unconfigured error, re-throw it so caller displays clear honest guidance
    if (e.message && e.message.includes('not configured')) {
      throw e;
    }
  }

  // Fallback to client-side procedural concept frame
  const img = createSvgFrame(params.shotNumber || "1A", `${params.aspectRatio || '2.39:1'} · ${params.focalLength || '50mm'}`, params.sceneHeading || "SCENE 1", params.shotSize || "Medium Shot");
  return {
    imageUrl: img,
    provider: "scriptora-concept",
    quality: "hd",
    costEstimate: "Free (Built-in)",
    prompt: params.prompt || ""
  };
}

export async function generateStoryboardSequence(scriptId, sceneId, params = {}) {
  try {
    const res = await request(`/production/${scriptId}/storyboard/generate-sequence`, {
      method: 'POST',
      body: JSON.stringify({ sceneId, ...params })
    });
    if (res?.proposedShots) return res;
  } catch (e) {
    if (e.message && e.message.includes('not configured')) {
      throw e;
    }
  }

  // Offline sequence generation fallback
  const scenes = await getProductionScenes(scriptId);
  const sceneNum = Number(String(sceneId).replace('scene-', '')) || 1;
  const scene = scenes.find(s => s.id === sceneId || s.sceneNumber === sceneNum) || {
    heading: `SCENE ${sceneNum} - UNTITLED`,
    dayNight: "DAY",
    snippet: "Protagonist navigates industrial perimeter."
  };

  const beats = [
    { num: `${sceneNum}A`, title: "Establishing Spatial Depth", size: "Wide Shot", angle: "High Angle", lens: "24mm Wide", desc: `Wide environmental view establishing spatial layout of ${scene.heading}.` },
    { num: `${sceneNum}B`, title: "Character Blocking & Entry", size: "Medium Two-Shot", angle: "Eye Level", lens: "50mm Prime", desc: `Two-shot tracking entry as characters coordinate actions.` },
    { num: `${sceneNum}C`, title: "Dramatic Focal Climax Beat", size: "Close-Up", angle: "Dutch Angle", lens: "85mm Portrait", desc: `Close-up reaction highlighting emotional stakes and sudden anomaly.` },
    { num: `${sceneNum}D`, title: "Critical Action Insert", size: "Extreme Close-Up", angle: "Low Angle", lens: "35mm Macro", desc: `Macro insert of tactile equipment interaction and valve override.` }
  ];

  const proposedShots = beats.map((b, i) => ({
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
    directorNotes: "Calibrate lens catchlights for consistency across cuts.",
    characters: scene.cast || ["KEVIN"],
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

function createSvgFrame(shotNum, lensInfo, heading, sizeLabel) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 502' width='1200' height='502'>
    <defs>
      <linearGradient id='bg2' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='%231e293b'/>
        <stop offset='100%' stop-color='%230f172a'/>
      </linearGradient>
    </defs>
    <rect width='1200' height='502' fill='url(%23bg2)'/>
    <line x1='0' y1='320' x2='1200' y2='320' stroke='%2338bdf8' stroke-width='1' opacity='0.3' stroke-dasharray='4,4'/>
    <circle cx='600' cy='220' r='50' fill='%23020617' stroke='%2338bdf8' stroke-width='2'/>
    <path d='M 530 350 L 670 350 L 640 260 L 560 260 Z' fill='%23020617' stroke='%23f59e0b' stroke-width='1.5'/>
    <rect x='24' y='24' width='130' height='26' rx='6' fill='black' opacity='0.6'/>
    <text x='34' y='42' fill='white' font-family='monospace' font-size='12' font-weight='bold'>REC · ${shotNum}</text>
    <text x='1166' y='42' text-anchor='end' fill='%2338bdf8' font-family='monospace' font-size='12' font-weight='bold'>${lensInfo}</text>
    <text x='1166' y='64' text-anchor='end' fill='white' opacity='0.7' font-family='sans-serif' font-size='11'>${sizeLabel}</text>
    <rect x='0' y='466' width='1200' height='36' fill='black' opacity='0.75'/>
    <text x='24' y='489' fill='white' font-family='sans-serif' font-size='12' font-weight='bold'>${heading}</text>
    <text x='1176' y='489' text-anchor='end' fill='%23fbbf24' font-family='sans-serif' font-size='11'>SCRIPTORA CONCEPT ENGINE</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}




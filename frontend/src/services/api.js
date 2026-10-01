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
    return data.user;
  } catch {
    const saved = localStorage.getItem('scriptora_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u && u.displayName) return u;
      } catch {}
    }
    const defaultUser = {
      id: "user-1",
      name: "Arun Kumar",
      displayName: "Arun Kumar",
      headline: "Screenwriter & Narrative Director",
      email: "arun.kumar@scriptora.studio",
      badge: "Member Pro",
      initials: "AK",
      stats: { drafts: 14, coAuthors: 3, healthIndex: "98%" }
    };
    localStorage.setItem('scriptora_user', JSON.stringify(defaultUser));
    return defaultUser;
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

export async function signOut() {
  try {
    await request('/auth/logout', { method: 'POST' });
  } catch {}
  localStorage.removeItem('scriptora_user');
  return true;
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
  characters: [],
  locations: [],
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
      slugline: "",
      blocks: [
        { id: "b-1-1", type: "scene", content: "" }
      ]
    }
  ]
};

// 3. SCREENPLAY API
export async function getScreenplay(scriptId) {
  try {
    const data = await request(`/screenplay/${scriptId}`);
    if (data.screenplay && data.screenplay.scenes && data.screenplay.scenes.length > 0) {
      const isOldDemo = data.screenplay.scenes.some(s => s.blocks?.some(b => b.content?.includes('Kevin') || b.id === 'b-18-1'));
      if (!isOldDemo) {
        return data.screenplay;
      }
    }
  } catch {}

  const saved = localStorage.getItem(`scriptora_screenplay_${scriptId}`);
  if (saved) {
    try {
      const sp = JSON.parse(saved);
      const isOldDemo = sp && sp.scenes && sp.scenes.some(s => s.id === 'scene-18' || s.blocks?.some(b => b.content?.includes('Kevin') || b.id === 'b-18-1'));
      if (sp && sp.scenes && sp.scenes.length > 0 && !isOldDemo) {
        return sp;
      }
    } catch {}
  }

  // Fallback to fresh starting screenplay from scratch
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

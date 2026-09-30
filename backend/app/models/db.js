// In-memory / transactional database state for SCRIPTORA backend

export const db = {
  currentUser: {
    id: "user-1",
    name: "Arun Kumar",
    displayName: "Arun Kumar",
    headline: "Screenwriter & Narrative Director",
    email: "arun.kumar@scriptora.studio",
    badge: "Member Pro",
    initials: "AK",
    stats: {
      drafts: 14,
      coAuthors: 3,
      healthIndex: "98%"
    }
  },
  settings: {
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
  },
  scripts: [
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
      joinCode: "V3LV-SHDW"
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
      joinCode: "SLNT-ECH0"
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
      joinCode: "GLSS-KNGD"
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
      joinCode: "RED2-SHFT"
    }
  ],
  screenplays: {
    "chronicles-of-dust": {
      title: "Chronicles of Dust",
      draft: "Draft 4.2",
      pageCount: 96,
      wordCount: 14280,
      scenes: [
        {
          id: "scene-18",
          number: 18,
          slugline: "INT. CUSTOMS OFFICE - NIGHT",
          blocks: [
            { type: "scene", content: "INT. CUSTOMS OFFICE - NIGHT" },
            { type: "action", content: "Kevin kneels over the cracked hydro-sensor junction box. Static hiss whispers through the damp comm-link. A lone flicker illuminates the tarnished brass seal." },
            { type: "action", content: "Water droplets bead along the corroded circuit wires. He slides a copper probe between the connectors." },
            { type: "character", content: "KEVIN" },
            { type: "parenthetical", content: "(whispering into comm)" },
            { type: "dialogue", content: "If the seals break before dawn, the sector won't hold the surge." },
            { type: "character", content: "MEERA (O.S.)" },
            { type: "dialogue", content: "Then don't let them break. Reroute the secondary relay through the floodgate breaker." },
            { type: "transition", content: "CUT TO:" }
          ]
        },
        {
          id: "scene-19",
          number: 19,
          slugline: "EXT. FLOODGATE GANTRY - CONTINUOUS",
          blocks: [
            { type: "scene", content: "EXT. FLOODGATE GANTRY - CONTINUOUS" },
            { type: "action", content: "Sirens pulse through the red fog. Meera anchors her cable to the iron pylon, visor reflecting the rising floodwaters below." },
            { type: "character", content: "MEERA" },
            { type: "dialogue", content: "Pressure holding at four-eighty. Give me three minutes." },
            { type: "action", content: "A massive metallic groan reverberates across the gorge as the emergency intake opens." }
          ]
        }
      ]
    }
  },
  versions: {
    "chronicles-of-dust": [
      {
        id: "v-4.2",
        name: "Draft 4.2",
        tag: "Current Working Cut",
        timestamp: "12m ago",
        author: "AK",
        stats: "96 pages · 14,280 words",
        notes: "Act II pacing compressed; scene 18 dialogue revised.",
        isCurrent: true
      },
      {
        id: "v-4.1",
        name: "Draft 4.1",
        tag: "Director Revision",
        timestamp: "Yesterday",
        author: "HS",
        stats: "98 pages · 14,800 words",
        notes: "Restructured hydroponics bay sequence.",
        isCurrent: false
      },
      {
        id: "v-4.0",
        name: "Draft 4.0",
        tag: "Table Read Draft",
        timestamp: "Oct 12",
        author: "AK",
        stats: "102 pages · 15,400 words",
        notes: "Full table read draft with character arc adjustments.",
        isCurrent: false
      },
      {
        id: "v-3.5",
        name: "Draft 3.5",
        tag: "Writer Polish",
        timestamp: "Sep 28",
        author: "AK",
        stats: "94 pages · 13,950 words",
        notes: "Streamlined third-act reservoir sequence.",
        isCurrent: false
      }
    ]
  },
  collaborators: {
    "chronicles-of-dust": [
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
    ]
  },
  notifications: [
    {
      id: "notif-1",
      title: "Narrative Telemetry Complete",
      message: "Screenplay analysis calibrated for Chronicles of Dust. Overall score: 86/100.",
      timestamp: "12m ago",
      read: false,
      type: "intelligence",
      actionRoute: "/intelligence/dashboard"
    },
    {
      id: "notif-2",
      title: "New Collaborator Joined",
      message: "Elena Rostova (Script Doctor) joined 'Chronicles of Dust' via invite code.",
      timestamp: "2h ago",
      read: false,
      type: "collaboration",
      actionRoute: "/profile/collaborators"
    },
    {
      id: "notif-3",
      title: "Autosave Synced",
      message: "Scene 18 and 19 updates saved to version snapshot Draft 4.2.",
      timestamp: "4h ago",
      read: false,
      type: "editor",
      actionRoute: "/editor/chronicles-of-dust"
    },
    {
      id: "notif-4",
      title: "Version Snapshot Created",
      message: "Heamanth S. created snapshot 'Draft 4.1' with 98 pages.",
      timestamp: "Yesterday",
      read: true,
      type: "version",
      actionRoute: "/editor/chronicles-of-dust"
    },
    {
      id: "notif-5",
      title: "Access Code Validated",
      message: "Join code A7K9-XP42 was validated for project 'Chronicles of Dust'.",
      timestamp: "3d ago",
      read: true,
      type: "security",
      actionRoute: "/profile/collaborators"
    }
  ]
};

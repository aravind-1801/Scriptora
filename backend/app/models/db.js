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
    "script_01": {
      id: "script_01",
      title: "Untitled Screenplay",
      draft: "Draft 1.0",
      pageCount: 1,
      wordCount: 0,
      titlePage: {
        title: "UNTITLED SCREENPLAY",
        author: "Writer",
        contact: "",
        notes: ""
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
        { id: "act-1", name: "ACT I" }
      ],
      characters: [],
      locations: [],
      times: [
        "DAY",
        "NIGHT",
        "MORNING",
        "EVENING",
        "DAWN",
        "DUSK",
        "CONTINUOUS",
        "LATER"
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
    },
    "chronicles-of-dust": {
      id: "chronicles-of-dust",
      title: "Untitled Screenplay",
      draft: "Draft 1.0",
      pageCount: 1,
      wordCount: 0,
      titlePage: {
        title: "UNTITLED SCREENPLAY",
        author: "Writer",
        contact: "",
        notes: ""
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
        { id: "act-1", name: "ACT I" }
      ],
      characters: [],
      locations: [],
      times: [
        "DAY",
        "NIGHT",
        "MORNING",
        "EVENING",
        "DAWN",
        "DUSK",
        "CONTINUOUS",
        "LATER"
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
  ],
  projects: [
    {
      id: "proj-1",
      title: "Badlands Anthology",
      screenplayIds: ["chronicles-of-dust", "the-neon-horizon"],
      ownerId: "user-1",
      status: "Active Pre-Production",
      createdAt: "2026-09-01T10:00:00Z"
    }
  ],
  productionWorkspaces: [
    {
      id: "prod-ws-chronicles-of-dust",
      projectId: "proj-1",
      projectName: "Badlands Anthology",
      scriptId: "chronicles-of-dust",
      screenplayTitle: "Chronicles of Dust",
      pinnedSourceVersion: "Draft 4.2",
      pinnedSourceVersionHash: "v4.2-snap-88f2",
      pinnedTimestamp: "12m ago",
      currentScriptDraft: "Draft 4.2",
      isStale: false,
      mode: "simple",
      userRole: "Owner",
      roles: ["Owner", "Director", "Assistant Director", "Production", "Department Member", "Viewer"],
      stats: {
        totalScenes: 18,
        breakdownElements: 78,
        callSheetsCount: 2,
        shootingDays: 14,
        pendingProposals: 2,
        completedApprovals: 6
      },
      updatedAt: "2026-10-14T10:00:00Z"
    }
  ],
  productionResources: [
    {
      id: "res-1",
      scriptId: "chronicles-of-dust",
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
      scriptId: "chronicles-of-dust",
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
      scriptId: "chronicles-of-dust",
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
      scriptId: "chronicles-of-dust",
      category: "Location",
      name: "Pumping Station Chamber B",
      scenes: ["Scene 18"],
      department: "Locations",
      status: "Confirmed",
      contactRestricted: false,
      contact: "Aqueduct District Coordinator",
      notes: "Heavy echo; sound dampening blankets required."
    },
    {
      id: "res-5",
      scriptId: "chronicles-of-dust",
      category: "Props",
      name: "Hydraulic Bypass Valve Kit",
      scenes: ["Scene 18"],
      department: "Props",
      status: "Confirmed",
      notes: "Hero prop with functional LED pressure gauge."
    },
    {
      id: "res-6",
      scriptId: "chronicles-of-dust",
      category: "Vehicles",
      name: "Solar Patrol Rover (Modified)",
      scenes: ["Scene 1", "Scene 4"],
      department: "Picture Vehicles",
      status: "Awaiting review",
      notes: "Secondary dust filter installed on engine intake."
    }
  ],
  productionDocuments: [
    {
      id: "doc-cs-1",
      scriptId: "chronicles-of-dust",
      type: "Call Sheet",
      title: "Call Sheet #01 — Gate 4 Day Exterior",
      sourceVersion: "Draft 4.2",
      shootDay: "Day 1 of 14",
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
      scriptId: "chronicles-of-dust",
      type: "Call Sheet",
      title: "Call Sheet #02 — Pumping Station Chamber",
      sourceVersion: "Draft 4.2",
      shootDay: "Day 2 of 14",
      date: "Oct 25, 2026",
      callTime: "07:00 AM",
      location: "Chamber B Dry Tank",
      scenes: ["Scene 18"],
      status: "Draft",
      published: false,
      version: "v0.9"
    },
    {
      id: "doc-ds-1",
      scriptId: "chronicles-of-dust",
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
      scriptId: "chronicles-of-dust",
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
      scriptId: "chronicles-of-dust",
      type: "Script Breakdown",
      title: "Full Production Breakdown Sheet",
      sourceVersion: "Draft 4.2",
      status: "Confirmed",
      published: true,
      version: "v1.4",
      elementsCount: 78
    }
  ],
  productionProposals: [
    {
      id: "prop-1",
      scriptId: "chronicles-of-dust",
      sourceVersion: "Draft 4.2",
      title: "Add Water Truck Standby for Chamber B Scene 18",
      description: "SFX coordinator requested a dedicated pressurized water truck for high-velocity valve release practical effect in Scene 18.",
      category: "SFX / Logistics",
      submittedBy: "Elena Rostova",
      submitterRole: "Director",
      status: "Awaiting review",
      impact: "Requires 1 additional standby driver and $1,200 equipment allocation.",
      createdAt: "2026-10-14T08:30:00Z",
      resolvedAt: null,
      resolutionNotes: null
    },
    {
      id: "prop-2",
      scriptId: "chronicles-of-dust",
      sourceVersion: "Draft 4.2",
      title: "Swap Shoot Order for Day 3 and Day 4",
      description: "Shift exterior lakebed shoot earlier by 24 hours due to predicted desert sand squall.",
      category: "Schedule",
      submittedBy: "Marcus Vance",
      submitterRole: "Assistant Director",
      status: "Awaiting review",
      impact: "Affects talent travel call times for Kevin and background extras.",
      createdAt: "2026-10-13T16:45:00Z",
      resolvedAt: null,
      resolutionNotes: null
    }
  ],
  productionAudit: [
    {
      id: "audit-1",
      scriptId: "chronicles-of-dust",
      action: "PIN_SOURCE_VERSION",
      category: "VERSION_INTEGRITY",
      details: "Pinned production source baseline to screenplay draft 'Draft 4.2' (Hash: 88f2)",
      sourceVersion: "Draft 4.2",
      actor: "Arun Kumar (Owner)",
      timestamp: "12m ago",
      createdAt: "2026-10-14T09:45:00Z"
    },
    {
      id: "audit-2",
      scriptId: "chronicles-of-dust",
      action: "CONFIRM_DOCUMENT",
      category: "APPROVAL",
      details: "Confirmed Call Sheet #01 for official release by Owner",
      sourceVersion: "Draft 4.2",
      actor: "Arun Kumar (Owner)",
      timestamp: "2h ago",
      createdAt: "2026-10-14T08:00:00Z"
    },
    {
      id: "audit-3",
      scriptId: "chronicles-of-dust",
      action: "SUBMIT_PROPOSAL",
      category: "CHANGE_MANAGEMENT",
      details: "Proposal 'Add Water Truck Standby for Chamber B' submitted by Director Elena Rostova",
      sourceVersion: "Draft 4.2",
      actor: "Elena Rostova",
      timestamp: "3h ago",
      createdAt: "2026-10-14T07:15:00Z"
    },
    {
      id: "audit-4",
      scriptId: "chronicles-of-dust",
      action: "EXTRACT_BREAKDOWN",
      category: "PRODUCTION_TOOL",
      details: "Automated element breakdown synchronized across 18 scenes from Draft 4.2",
      sourceVersion: "Draft 4.2",
      actor: "System Intelligence",
      timestamp: "Yesterday",
      createdAt: "2026-10-13T14:20:00Z"
    }
  ]
};

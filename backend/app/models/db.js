// In-memory / transactional database state for SCRIPTORA backend
// Initialized in clean-slate state: zero seeded accounts, zero demo scripts, zero preloaded mock records.

export const db = {
  currentUser: null,
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
    },
    storyboard: {
      defaultStyle: "Concept Art",
      defaultAspectRatio: "2.39:1",
      defaultShotSize: "Medium Shot",
      defaultCameraAngle: "Eye Level",
      defaultLens: "50mm Prime",
      defaultLighting: "Auto / Scene-based",
      experienceLevel: "Intermediate"
    }
  },
  scripts: [],
  screenplays: {},
  versions: {},
  collaborators: {},
  joinCodes: {},
  accessRequests: {},
  invitations: {},
  securityActivity: {},
  e2ee: {},
  notifications: [],
  projects: [],
  productionWorkspaces: [],
  productionResources: [],
  productionDocuments: [],
  productionProposals: [],
  productionAudit: [],
  productionScenes: [],
  productionBreakdown: [],
  productionCallSheets: [],
  productionSchedule: [],
  productionReadiness: [],
  storyboards: [],
  storyboardRecycleBin: []
};

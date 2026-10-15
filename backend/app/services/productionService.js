import { db } from '../models/db.js';

// Pre-Production Service: Foundational Data Architecture & Operations
// Supports standalone screenplay production workspaces as well as multi-screenplay projects.

export function getProductionWorkspace(scriptId = 'chronicles-of-dust') {
  let ws = db.productionWorkspaces.find(w => w.scriptId === scriptId);
  if (!ws) {
    const script = db.scripts.find(s => s.id === scriptId) || db.scripts[0];
    ws = {
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
      mode: "simple",
      userRole: "Owner", // Current user role for this workspace
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
    db.productionWorkspaces.push(ws);
  } else {
    // Check staleness against current script draft
    const script = db.scripts.find(s => s.id === scriptId);
    if (script && script.draft !== ws.pinnedSourceVersion) {
      ws.currentScriptDraft = script.draft;
      ws.isStale = true;
    } else {
      ws.isStale = false;
    }
  }
  return ws;
}

export function updateProductionWorkspace(scriptId, updates) {
  const ws = getProductionWorkspace(scriptId);
  Object.assign(ws, updates);
  ws.updatedAt = new Date().toISOString();
  
  // Log audit event
  logProductionAudit(scriptId, {
    action: "UPDATE_WORKSPACE_SETTINGS",
    category: "WORKSPACE",
    details: `Updated workspace configuration (Mode: ${ws.mode}, Role: ${ws.userRole})`,
    sourceVersion: ws.pinnedSourceVersion
  });
  
  return ws;
}

export function pinSourceVersion(scriptId, newVersion) {
  const ws = getProductionWorkspace(scriptId);
  const oldVersion = ws.pinnedSourceVersion;
  ws.pinnedSourceVersion = newVersion;
  ws.pinnedTimestamp = "Just now";
  ws.isStale = false;
  ws.updatedAt = new Date().toISOString();

  logProductionAudit(scriptId, {
    action: "PIN_SOURCE_VERSION",
    category: "VERSION_INTEGRITY",
    details: `Updated pinned source version from ${oldVersion} to ${newVersion}`,
    sourceVersion: newVersion
  });

  return ws;
}

export function getProductionResources(scriptId = 'chronicles-of-dust', category = null) {
  let list = db.productionResources.filter(r => r.scriptId === scriptId);
  if (category && category !== 'all') {
    list = list.filter(r => r.category.toLowerCase() === category.toLowerCase());
  }
  return list;
}

export function getProductionDocuments(scriptId = 'chronicles-of-dust') {
  return db.productionDocuments.filter(d => d.scriptId === scriptId);
}

export function getProductionProposals(scriptId = 'chronicles-of-dust') {
  return db.productionProposals.filter(p => p.scriptId === scriptId);
}

export function createProductionProposal(scriptId, proposalData) {
  const ws = getProductionWorkspace(scriptId);
  const newProposal = {
    id: `prop-${Date.now()}`,
    scriptId,
    sourceVersion: ws.pinnedSourceVersion,
    title: proposalData.title || "Production Schedule Adjustment",
    description: proposalData.description || "",
    category: proposalData.category || "Schedule",
    submittedBy: proposalData.submittedBy || "Elena Rostova",
    submitterRole: proposalData.submitterRole || "Director",
    status: "Awaiting review", // Draft, Proposed change, Awaiting review, Accepted, Rejected, Conflict, Confirmed
    impact: proposalData.impact || "Modifies shoot days for Scene 18 & 19",
    createdAt: new Date().toISOString(),
    resolvedAt: null,
    resolutionNotes: null
  };

  db.productionProposals.unshift(newProposal);

  logProductionAudit(scriptId, {
    action: "SUBMIT_PROPOSAL",
    category: "CHANGE_MANAGEMENT",
    details: `Proposal "${newProposal.title}" submitted by ${newProposal.submittedBy}`,
    sourceVersion: ws.pinnedSourceVersion
  });

  return newProposal;
}

export function reviewProductionProposal(scriptId, proposalId, action, reviewNotes = '') {
  const proposal = db.productionProposals.find(p => p.id === proposalId);
  if (!proposal) {
    throw new Error("Proposal not found");
  }

  const ws = getProductionWorkspace(scriptId);
  if (action === 'accept') {
    proposal.status = "Accepted";
    proposal.resolvedAt = new Date().toISOString();
    proposal.resolutionNotes = reviewNotes || "Accepted by Owner. Production records updated.";

    logProductionAudit(scriptId, {
      action: "ACCEPT_PROPOSAL",
      category: "APPROVAL",
      details: `Proposal "${proposal.title}" approved and confirmed by Owner`,
      sourceVersion: ws.pinnedSourceVersion
    });
  } else if (action === 'reject') {
    proposal.status = "Rejected";
    proposal.resolvedAt = new Date().toISOString();
    proposal.resolutionNotes = reviewNotes || "Declined during review.";

    logProductionAudit(scriptId, {
      action: "REJECT_PROPOSAL",
      category: "APPROVAL",
      details: `Proposal "${proposal.title}" rejected by Owner: ${reviewNotes}`,
      sourceVersion: ws.pinnedSourceVersion
    });
  } else if (action === 'conflict') {
    proposal.status = "Conflict";
    proposal.resolutionNotes = reviewNotes || "Underlying screenplay draft changed. Conflict resolution required.";

    logProductionAudit(scriptId, {
      action: "FLAG_CONFLICT",
      category: "VERSION_INTEGRITY",
      details: `Conflict flagged on proposal "${proposal.title}" against source ${ws.pinnedSourceVersion}`,
      sourceVersion: ws.pinnedSourceVersion
    });
  }

  return proposal;
}

export function getProductionAuditTrail(scriptId = 'chronicles-of-dust') {
  return db.productionAudit.filter(a => a.scriptId === scriptId);
}

export function logProductionAudit(scriptId, event) {
  const logItem = {
    id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    scriptId,
    action: event.action,
    category: event.category || "GENERAL",
    details: event.details,
    sourceVersion: event.sourceVersion || "Draft 4.2",
    actor: event.actor || db.currentUser.name,
    timestamp: "Just now",
    createdAt: new Date().toISOString()
  };
  db.productionAudit.unshift(logItem);
  return logItem;
}

// 1. SCENE HUB WORKFLOWS
export function getProductionScenes(scriptId = 'chronicles-of-dust') {
  let scenes = db.productionScenes.filter(s => s.scriptId === scriptId);
  if (!scenes.length) {
    scenes = db.productionScenes.filter(s => s.scriptId === 'chronicles-of-dust');
  }
  return scenes;
}

export function getProductionScene(scriptId, sceneId) {
  let scene = db.productionScenes.find(s => (s.scriptId === scriptId || s.scriptId === 'chronicles-of-dust') && (s.id === sceneId || s.sceneNumber === Number(sceneId)));
  if (!scene) return null;
  // Link elements and sides
  const elements = db.productionBreakdown.filter(b => (b.scriptId === scriptId || b.scriptId === 'chronicles-of-dust') && (b.sceneId === scene.id || b.sceneNumber === scene.sceneNumber || (Array.isArray(b.scenes) && b.scenes.includes(scene.sceneNumber))));
  return { ...scene, elements };
}

export function updateProductionScene(scriptId, sceneId, updates) {
  const scene = db.productionScenes.find(s => (s.scriptId === scriptId || s.scriptId === 'chronicles-of-dust') && (s.id === sceneId || s.sceneNumber === Number(sceneId)));
  if (!scene) throw new Error("Scene not found");
  Object.assign(scene, updates);
  logProductionAudit(scriptId, {
    action: "UPDATE_SCENE_RECORD",
    category: "SCENE_HUB",
    details: `Updated production logistics for Scene ${scene.sceneNumber}`,
    sourceVersion: "Draft 4.2"
  });
  return scene;
}

// 2. SCRIPT BREAKDOWN WORKFLOWS
export function getProductionBreakdown(scriptId = 'chronicles-of-dust', category = null, sceneId = null) {
  let list = db.productionBreakdown.filter(b => b.scriptId === scriptId);
  if (!list.length) {
    list = db.productionBreakdown.filter(b => b.scriptId === 'chronicles-of-dust');
  }
  if (category && category !== 'all') {
    list = list.filter(b => b.category.toLowerCase() === category.toLowerCase());
  }
  if (sceneId && sceneId !== 'all') {
    const sceneNum = Number(String(sceneId).replace('scene-', ''));
    list = list.filter(b => b.sceneId === sceneId || String(b.sceneNumber) === String(sceneId) || (Array.isArray(b.scenes) && b.scenes.includes(sceneNum)) || b.sceneNumber === sceneNum);
  }
  return list;
}

export function updateBreakdownItem(scriptId, itemId, updates) {
  const item = db.productionBreakdown.find(b => b.id === itemId && b.scriptId === scriptId);
  if (!item) throw new Error("Breakdown item not found");

  // Track user correction if name, description, or category fields modified
  if ((updates.name && updates.name !== item.name) || (updates.description && updates.description !== item.description)) {
    item.userCorrection = {
      previousName: item.name,
      previousDesc: item.description,
      correctedBy: db.currentUser.name + " (Owner)",
      correctedAt: new Date().toISOString()
    };
  }

  Object.assign(item, updates);
  if (updates.status === 'Confirmed') {
    item.isHumanConfirmed = true;
    item.confirmedBy = db.currentUser.name + " (Owner)";
    item.confirmedAt = new Date().toISOString();
  } else if (updates.status === 'Needs Review') {
    item.isHumanConfirmed = false;
  }
  logProductionAudit(scriptId, {
    action: "UPDATE_BREAKDOWN_ITEM",
    category: "BREAKDOWN",
    details: `Updated "${item.name}" (${item.category}) in Scene ${item.sceneNumber} [${item.status}]`,
    sourceVersion: "Draft 4.2"
  });
  return item;
}

export function deleteBreakdownItem(scriptId, itemId) {
  const idx = db.productionBreakdown.findIndex(b => b.id === itemId && b.scriptId === scriptId);
  if (idx === -1) throw new Error("Breakdown item not found");
  const removed = db.productionBreakdown.splice(idx, 1)[0];
  logProductionAudit(scriptId, {
    action: "DELETE_BREAKDOWN_ITEM",
    category: "BREAKDOWN",
    details: `Removed "${removed.name}" (${removed.category}) from Scene ${removed.sceneNumber}`,
    sourceVersion: "Draft 4.2"
  });
  return { success: true, removedId: itemId };
}

export function createBreakdownItem(scriptId, itemData) {
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
    confirmedBy: db.currentUser.name + " (Owner)",
    confirmedAt: new Date().toISOString(),
    notes: itemData.notes || "",
    // Category-specific attributes
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
  db.productionBreakdown.unshift(newItem);
  logProductionAudit(scriptId, {
    action: "ADD_MANUAL_BREAKDOWN_ITEM",
    category: "BREAKDOWN",
    details: `Manually added "${newItem.name}" (${newItem.category}) to Scene ${newItem.sceneNumber}`,
    sourceVersion: "Draft 4.2"
  });
  return newItem;
}

// 3. CALL SHEETS WORKFLOWS
export function getProductionCallSheets(scriptId = 'chronicles-of-dust') {
  return db.productionCallSheets.filter(cs => cs.scriptId === scriptId);
}

export function getProductionCallSheet(scriptId, callSheetId) {
  return db.productionCallSheets.find(cs => cs.scriptId === scriptId && cs.id === callSheetId);
}

export function createProductionCallSheet(scriptId, data) {
  const newCs = {
    id: `cs-${Date.now()}`,
    scriptId,
    callSheetNumber: String(db.productionCallSheets.length + 1).padStart(2, '0'),
    shootDay: data.shootDay || "Day 3 of 14",
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
    parkingNotes: data.parkingNotes || "Crew parking guidelines to be verified.",
    nearestHospital: data.nearestHospital || "Desert Care Network Regional, 1150 N Indian Canyon Dr, Palm Springs, CA",
    weatherSummary: data.weatherSummary || "Clear skies, mild temperature forecast.",
    scenes: data.scenes || [{ sceneNumber: 4, heading: "EXT. NORTHERN PERIMETER FENCE - NIGHT", pages: "5 0/8", cast: ["KEVIN", "MEERA"], desc: "Perimeter fence patrol." }],
    castCalls: data.castCalls || [
      { character: "KEVIN", actor: "Arun Kumar", pickup: "05:00 AM", hmuCall: "05:30 AM", onSet: "06:30 AM", status: "Draft" },
      { character: "MEERA", actor: "Priya Sharma", pickup: "05:15 AM", hmuCall: "05:45 AM", onSet: "06:30 AM", status: "Draft" }
    ],
    specialInstructions: data.specialInstructions || "Standard safety and PPE required.",
    approvedBy: null,
    publishedAt: null
  };
  db.productionCallSheets.push(newCs);
  logProductionAudit(scriptId, {
    action: "CREATE_CALL_SHEET_DRAFT",
    category: "CALL_SHEET",
    details: `Created Draft Call Sheet #${newCs.callSheetNumber} (${newCs.shootDay})`,
    sourceVersion: "Draft 4.2"
  });
  return newCs;
}

export function updateProductionCallSheet(scriptId, callSheetId, updates) {
  const cs = db.productionCallSheets.find(c => c.scriptId === scriptId && c.id === callSheetId);
  if (!cs) throw new Error("Call sheet not found");

  // If editing an already published snapshot, branch into a revision draft
  if ((cs.isPublished || cs.status === 'Confirmed') && updates.isDraftRevision) {
    cs.isPublished = false;
    cs.status = "Draft (Revision)";
    const revNum = (cs.revisionCount || 1) + 1;
    cs.revisionCount = revNum;
    cs.version = `v1.${revNum} (Draft Rev ${revNum})`;
  }

  Object.assign(cs, updates);
  logProductionAudit(scriptId, {
    action: "UPDATE_CALL_SHEET",
    category: "CALL_SHEET",
    details: `Updated details for Call Sheet #${cs.callSheetNumber} (${cs.version || 'Draft'})`,
    sourceVersion: "Draft 4.2"
  });
  return cs;
}

export function publishProductionCallSheet(scriptId, callSheetId) {
  const cs = db.productionCallSheets.find(c => c.scriptId === scriptId && c.id === callSheetId);
  if (!cs) throw new Error("Call sheet not found");
  cs.status = "Confirmed";
  cs.isPublished = true;
  cs.version = "v1.0 (Snapshot)";
  cs.approvedBy = db.currentUser.name + " (Owner)";
  cs.publishedAt = new Date().toISOString();

  // Create immutable document entry as snapshot
  db.productionDocuments.unshift({
    id: `doc-cs-${Date.now()}`,
    scriptId,
    type: "Call Sheet",
    title: `Call Sheet #${cs.callSheetNumber} — ${cs.locationName}`,
    sourceVersion: "Draft 4.2",
    shootDay: cs.shootDay,
    date: cs.shootDate,
    callTime: cs.shootingCall,
    location: cs.locationName,
    scenes: cs.scenes.map(s => `Scene ${s.sceneNumber}`),
    status: "Confirmed",
    published: true,
    version: cs.version
  });

  logProductionAudit(scriptId, {
    action: "PUBLISH_CALL_SHEET_SNAPSHOT",
    category: "APPROVAL",
    details: `Call Sheet #${cs.callSheetNumber} officially approved and published by Owner`,
    sourceVersion: "Draft 4.2"
  });
  return cs;
}

// 4. SHOOTING SCHEDULE WORKFLOWS
export function getProductionSchedule(scriptId = 'chronicles-of-dust') {
  return db.productionSchedule;
}

export function updateProductionScheduleDay(scriptId, dayNumber, updates) {
  const day = db.productionSchedule.find(d => d.dayNumber === Number(dayNumber));
  if (!day) throw new Error("Shoot day not found");
  Object.assign(day, updates);
  logProductionAudit(scriptId, {
    action: "UPDATE_STRIPBOARD_DAY",
    category: "SCHEDULE",
    details: `Updated Day ${day.dayNumber} stripboard order and scene assignments`,
    sourceVersion: "Draft 4.2"
  });
  return day;
}

export function confirmProductionSchedule(scriptId) {
  db.productionSchedule.forEach(day => {
    day.status = "Confirmed";
    day.isLocked = true;
  });
  logProductionAudit(scriptId, {
    action: "CONFIRM_MASTER_SCHEDULE",
    category: "APPROVAL",
    details: "Owner locked and confirmed 14-day master stripboard schedule",
    sourceVersion: "Draft 4.2"
  });
  return db.productionSchedule;
}

// 5. READINESS CHECKS
export function getProductionReadiness(scriptId = 'chronicles-of-dust') {
  return db.productionReadiness.filter(r => r.scriptId === scriptId);
}

export function resolveProductionReadiness(scriptId, readinessId) {
  const item = db.productionReadiness.find(r => r.scriptId === scriptId && r.id === readinessId);
  if (item) {
    item.status = "resolved";
    item.severity = "ready";
  }
  return item;
}

// 6. RESTORE SNAPSHOT
export function restoreProductionSnapshot(scriptId, versionTag) {
  const ws = getProductionWorkspace(scriptId);
  const oldVer = ws.pinnedSourceVersion;
  ws.pinnedSourceVersion = versionTag;
  ws.pinnedTimestamp = "Just now (Restored)";
  ws.isStale = false;

  logProductionAudit(scriptId, {
    action: "RESTORE_VERSION_BASELINE",
    category: "VERSION_INTEGRITY",
    details: `Restored production baseline to ${versionTag} as new version (Preserved audit trail)`,
    sourceVersion: versionTag
  });
  return ws;
}


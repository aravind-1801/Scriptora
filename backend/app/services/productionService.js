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

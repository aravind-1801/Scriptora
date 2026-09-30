import { db } from '../models/db.js';

export function getCollaborators(scriptId) {
  const targetId = scriptId || db.scripts[0]?.id || 'chronicles-of-dust';
  return db.collaborators[targetId] || [];
}

export function inviteCollaborator(scriptId, data) {
  if (!db.collaborators[scriptId]) db.collaborators[scriptId] = [];
  const newCollab = {
    id: `c-${Date.now()}`,
    name: data.name || data.email.split('@')[0],
    email: data.email,
    initials: (data.name || data.email).slice(0, 2).toUpperCase(),
    role: data.role || "Co-Writer",
    avatarBg: "bg-emerald-100 text-emerald-700",
    status: "Invited",
    added: "Just now"
  };
  db.collaborators[scriptId].push(newCollab);
  return newCollab;
}

export function removeCollaborator(scriptId, memberId) {
  if (db.collaborators[scriptId]) {
    db.collaborators[scriptId] = db.collaborators[scriptId].filter(c => c.id !== memberId);
    return true;
  }
  return false;
}

export function updateRole(scriptId, memberId, role) {
  const member = (db.collaborators[scriptId] || []).find(c => c.id === memberId);
  if (member) {
    member.role = role;
    return member;
  }
  return null;
}

export function generateJoinCode(scriptId) {
  const script = db.scripts.find(s => s.id === scriptId);
  if (!script) return null;
  const newCode = `${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  script.joinCode = newCode;
  return newCode;
}

export function validateJoinCode(code) {
  const clean = (code || '').trim().toUpperCase();
  const script = db.scripts.find(s => s.joinCode === clean);
  if (script) {
    return {
      valid: true,
      script: {
        id: script.id,
        title: script.title,
        draft: script.draft,
        collaboratorCount: (db.collaborators[script.id] || []).length
      }
    };
  }
  return { valid: false, error: "Invalid or expired Join Code." };
}

export function redeemJoinCode(code) {
  const validation = validateJoinCode(code);
  if (!validation.valid) return validation;

  const script = db.scripts.find(s => s.id === validation.script.id);
  if (!db.collaborators[script.id]) db.collaborators[script.id] = [];

  const userEmail = db.currentUser?.email || "arun.kumar@scriptora.studio";
  const already = db.collaborators[script.id].find(c => c.email === userEmail);
  if (!already) {
    db.collaborators[script.id].push({
      id: `c-${Date.now()}`,
      name: db.currentUser?.name || "Collaborator",
      email: userEmail,
      initials: db.currentUser?.initials || "AK",
      role: "Co-Writer",
      avatarBg: "bg-blue-100 text-blue-700",
      status: "Active",
      added: "Just now"
    });
  }

  return { success: true, scriptId: script.id };
}

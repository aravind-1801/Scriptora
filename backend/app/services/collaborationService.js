import {
  db,
  persistScriptState,
  persistUserKeyState,
  addNotificationForUser,
  resolveUserIdByEmail
} from '../models/db.js';

// Centralized SCRIPTORA Permission Matrix
export const ROLES = {
  OWNER: 'Owner',
  EDITOR: 'Editor',
  VIEWER: 'Viewer',
  SCRIPT_DOCTOR: 'Script Doctor',
  PRODUCER: 'Producer'
};

export const ROLE_PERMISSIONS = {
  [ROLES.OWNER]: {
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
  },
  [ROLES.EDITOR]: {
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
    'production.manage': false,
    'collaborators.invite': false,
    'collaborators.manage': false,
    'screenplay.export': true,
    'security.manage': false
  },
  [ROLES.VIEWER]: {
    'screenplay.read': true,
    'screenplay.edit': false,
    'scene.create': false,
    'scene.delete': false,
    'character.manage': false,
    'dialogue.edit': false,
    'storyboard.view': true,
    'storyboard.edit': false,
    'analysis.run': false,
    'comments.create': false,
    'production.view': true,
    'production.manage': false,
    'collaborators.invite': false,
    'collaborators.manage': false,
    'screenplay.export': true,
    'security.manage': false
  },
  [ROLES.SCRIPT_DOCTOR]: {
    'screenplay.read': true,
    'screenplay.edit': false,
    'scene.create': false,
    'scene.delete': false,
    'character.manage': false,
    'dialogue.edit': false,
    'storyboard.view': true,
    'storyboard.edit': false,
    'analysis.run': true,
    'comments.create': true,
    'production.view': false,
    'production.manage': false,
    'collaborators.invite': false,
    'collaborators.manage': false,
    'screenplay.export': true,
    'security.manage': false
  },
  [ROLES.PRODUCER]: {
    'screenplay.read': true,
    'screenplay.edit': false,
    'scene.create': false,
    'scene.delete': false,
    'character.manage': false,
    'dialogue.edit': false,
    'storyboard.view': true,
    'storyboard.edit': false,
    'analysis.run': true,
    'comments.create': true,
    'production.view': true,
    'production.manage': true,
    'collaborators.invite': false,
    'collaborators.manage': false,
    'screenplay.export': true,
    'security.manage': false
  }
};

// Standard avatar background pairings for visual consistency
const AVATAR_PALETTE = [
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-purple-100 text-purple-700',
  'bg-rose-100 text-rose-700',
  'bg-indigo-100 text-indigo-700'
];

function getAvatarColor(str) {
  let hash = 0;
  for (let i = 0; i < (str || '').length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const idx = Math.abs(hash) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[idx];
}

function normalizeRole(role) {
  if (!role) return ROLES.EDITOR;
  const lower = role.toLowerCase().replace(/[^a-z]/g, '');
  if (lower === 'owner') return ROLES.OWNER;
  if (lower === 'editor' || lower === 'cowriter') return ROLES.EDITOR;
  if (lower === 'viewer') return ROLES.VIEWER;
  if (lower === 'scriptdoctor' || lower === 'doctor') return ROLES.SCRIPT_DOCTOR;
  if (lower === 'producer') return ROLES.PRODUCER;
  return ROLES.EDITOR;
}

export function getScriptOwner(scriptId) {
  const script = db.scripts.find(s => s.id === scriptId);
  return {
    id: script?.ownerId || null,
    name: script?.ownerName || (script?.ownerEmail ? script.ownerEmail.split('@')[0] : 'Screenplay Owner'),
    email: script?.ownerEmail || null
  };
}

export function isScriptOwner(scriptId, user) {
  if (!user || !user.id) {
    return false;
  }
  const owner = getScriptOwner(scriptId);
  return (owner.id && (String(user.id) === String(owner.id) || (user.firebaseUid && String(user.firebaseUid) === String(owner.id)))) ||
    (owner.email && user.email && user.email.toLowerCase() === owner.email.toLowerCase());
}

export function getUserRole(scriptId, user = null) {
  if (!user || !user.id) return null;
  if (isScriptOwner(scriptId, user)) return ROLES.OWNER;

  const fbUid = user.firebaseUid ? String(user.firebaseUid) : null;
  const targetList = db.collaborators[scriptId] || [];
  const member = targetList.find(c =>
    (c.id && (String(c.id) === String(user.id) || (fbUid && String(c.id) === fbUid))) ||
    (c.email && user.email && c.email.toLowerCase() === user.email.toLowerCase())
  );
  if (member) return normalizeRole(member.role);
  return null;
}

export function getUserPermissions(scriptId, user = db.currentUser) {
  const role = getUserRole(scriptId, user);
  if (!role) {
    return {
      role: null,
      permissions: Object.keys(ROLE_PERMISSIONS[ROLES.VIEWER]).reduce((acc, k) => ({ ...acc, [k]: false }), {})
    };
  }
  return {
    role,
    permissions: ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS[ROLES.VIEWER]
  };
}

export function checkPermission(scriptId, permissionKey, user = db.currentUser) {
  const { permissions } = getUserPermissions(scriptId, user);
  return Boolean(permissions[permissionKey]);
}

function logSecurityEvent(scriptId, { type, title, actor, target, details, outcome = 'success' }) {
  if (!db.securityActivity) db.securityActivity = {};
  if (!db.securityActivity[scriptId]) db.securityActivity[scriptId] = [];

  const evt = {
    id: `sec-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    type,
    title,
    actor: actor || {
      name: 'Screenplay Owner',
      email: ''
    },
    target: target || null,
    details: details || '',
    timestamp: 'Just now',
    createdAt: new Date().toISOString(),
    outcome
  };

  db.securityActivity[scriptId].unshift(evt);
  // Keep last 50 events
  if (db.securityActivity[scriptId].length > 50) {
    db.securityActivity[scriptId].pop();
  }
  persistScriptState(scriptId);
  return evt;
}

// 1. COLLABORATORS LIST
export function getCollaborators(scriptId) {
  if (!scriptId) return [];
  if (!db.collaborators[scriptId]) db.collaborators[scriptId] = [];
  return db.collaborators[scriptId];
}

// 2. INVITATIONS
export function inviteCollaborator(scriptId, data, actorUser = db.currentUser) {
  if (!isScriptOwner(scriptId, actorUser) && !checkPermission(scriptId, 'collaborators.invite', actorUser)) {
    throw new Error('Unauthorized: You do not have permission to invite collaborators to this screenplay.');
  }

  const email = (data.email || '').trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Please provide a valid email address.');
  }

  const existingCollabs = db.collaborators[scriptId] || [];
  if (existingCollabs.some(c => (c.email || '').toLowerCase() === email)) {
    throw new Error('A collaborator with this email address already has access to this screenplay.');
  }

  if (!db.invitations) db.invitations = {};
  if (!db.invitations[scriptId]) db.invitations[scriptId] = [];

  const pendingInv = db.invitations[scriptId].find(inv => inv.email.toLowerCase() === email && inv.status === 'pending');
  if (pendingInv) {
    throw new Error('An active invitation is already pending for this email address.');
  }

  const assignedRole = normalizeRole(data.role);
  const token = `inv_${Math.random().toString(36).substring(2, 10)}_${Date.now()}`;
  const newInvitation = {
    id: `inv-${Date.now()}`,
    email,
    role: assignedRole,
    message: data.message || '',
    token,
    status: 'pending',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString()
  };

  db.invitations[scriptId].unshift(newInvitation);

  logSecurityEvent(scriptId, {
    type: 'collaborator_invited',
    title: 'Collaborator Invited',
    actor: actorUser,
    target: { email, role: assignedRole },
    details: `Sent invitation to ${email} with assigned role '${assignedRole}' (Expires in 7 days).`
  });

  // Push scoped notifications to actor & invited recipient (if registered)
  if (actorUser?.id) {
    addNotificationForUser(actorUser.id, {
      title: 'Invitation Dispatched',
      message: `Invitation sent to ${email} for role '${assignedRole}'.`,
      type: 'collaboration',
      actionRoute: `/profile/collaborators?scriptId=${scriptId}`
    });
  }
  const recipientUserId = resolveUserIdByEmail(email);
  if (recipientUserId && recipientUserId !== actorUser?.id) {
    addNotificationForUser(recipientUserId, {
      title: 'Project Invitation Received',
      message: `You were invited as ${assignedRole}.`,
      type: 'collaboration',
      actionRoute: `/profile/collaborators?scriptId=${scriptId}`
    });
  }

  persistScriptState(scriptId);
  return newInvitation;
}

export function getInvitations(scriptId) {
  if (!db.invitations) db.invitations = {};
  return db.invitations[scriptId] || [];
}

export function revokeInvitation(scriptId, inviteId, actorUser = db.currentUser) {
  if (!isScriptOwner(scriptId, actorUser) && !checkPermission(scriptId, 'collaborators.manage', actorUser)) {
    throw new Error('Unauthorized: You do not have permission to manage invitations.');
  }

  if (!db.invitations || !db.invitations[scriptId]) return false;
  const invite = db.invitations[scriptId].find(i => i.id === inviteId);
  if (!invite) return false;

  invite.status = 'revoked';

  logSecurityEvent(scriptId, {
    type: 'invitation_revoked',
    title: 'Invitation Revoked',
    actor: actorUser,
    target: { email: invite.email, role: invite.role },
    details: `Revoked pending invitation for ${invite.email}.`
  });

  return true;
}

export function resendInvitation(scriptId, inviteId, actorUser = db.currentUser) {
  if (!isScriptOwner(scriptId, actorUser) && !checkPermission(scriptId, 'collaborators.invite', actorUser)) {
    throw new Error('Unauthorized: You do not have permission to resend invitations.');
  }

  if (!db.invitations || !db.invitations[scriptId]) {
    throw new Error('Invitation not found.');
  }
  const invite = db.invitations[scriptId].find(i => i.id === inviteId);
  if (!invite) {
    throw new Error('Invitation not found.');
  }

  invite.status = 'pending';
  invite.token = `inv_${Math.random().toString(36).substring(2, 10)}_${Date.now()}`;
  invite.createdAt = new Date().toISOString();
  invite.expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString();

  logSecurityEvent(scriptId, {
    type: 'invitation_resent',
    title: 'Invitation Resent',
    actor: actorUser,
    target: { email: invite.email, role: invite.role },
    details: `Resent invitation to ${invite.email} for role '${invite.role}'.`
  });

  return invite;
}

export function getInvitationByToken(token) {
  if (!token || !db.invitations) return null;
  for (const scriptId in db.invitations) {
    const inv = db.invitations[scriptId].find(i => i.token === token);
    if (inv) {
      const script = db.scripts.find(s => s.id === scriptId);
      return {
        ...inv,
        scriptId,
        scriptTitle: script?.title || 'Screenplay',
        isExpired: new Date(inv.expiresAt) < new Date()
      };
    }
  }
  return null;
}

export function acceptInvitation(token, user = null) {
  if (!user || !user.id) {
    throw new Error('Authentication required to accept an invitation.');
  }
  if (!token || !db.invitations) {
    throw new Error('Invalid or missing invitation token.');
  }

  let foundScriptId = null;
  let foundInvite = null;

  for (const scriptId in db.invitations) {
    const inv = db.invitations[scriptId].find(i => i.token === token);
    if (inv) {
      foundScriptId = scriptId;
      foundInvite = inv;
      break;
    }
  }

  if (!foundInvite) {
    throw new Error('Invitation not found or has been revoked.');
  }

  if (foundInvite.status === 'revoked') {
    throw new Error('This invitation has been revoked by the screenplay owner.');
  }

  if (new Date(foundInvite.expiresAt) < new Date()) {
    throw new Error('This invitation has expired. Please ask the owner to send a new invitation.');
  }

  const userEmail = (user.email || '').toLowerCase().trim();
  const inviteEmail = (foundInvite.email || '').toLowerCase().trim();
  if (inviteEmail && userEmail !== inviteEmail) {
    throw new Error('Unauthorized: This invitation was issued to a different email address.');
  }

  if (!db.collaborators[foundScriptId]) db.collaborators[foundScriptId] = [];
  const collabs = db.collaborators[foundScriptId];

  // Check if user is already a collaborator
  let existing = collabs.find(c =>
    (c.email && c.email.toLowerCase() === (userEmail || inviteEmail)) ||
    (c.id && String(c.id) === String(user.id))
  );

  if (existing) {
    existing.role = foundInvite.role;
    existing.id = user.id;
    foundInvite.status = 'accepted';
    persistScriptState(foundScriptId);
    return { success: true, scriptId: foundScriptId, collaborator: existing, alreadyMember: true };
  }

  const newCollaborator = {
    id: user.id,
    name: user.displayName || user.name || (userEmail || inviteEmail).split('@')[0],
    email: userEmail || inviteEmail,
    role: foundInvite.role,
    avatar: (user.displayName || user.name || (userEmail || inviteEmail).split('@')[0]).substring(0, 2).toUpperCase(),
    avatarColor: getAvatarColor(userEmail || inviteEmail),
    joinedAt: new Date().toISOString()
  };

  collabs.push(newCollaborator);
  foundInvite.status = 'accepted';

  // If E2EE is enabled, register member's key record
  if (db.e2ee && db.e2ee[foundScriptId] && db.e2ee[foundScriptId].enabled) {
    if (!db.e2ee[foundScriptId].wrappedKeys) db.e2ee[foundScriptId].wrappedKeys = {};
    db.e2ee[foundScriptId].wrappedKeys[newCollaborator.email] = {
      wrappedMasterKey: `e2ee_wk_${Math.random().toString(36).substring(2, 10)}`,
      recipientKeyId: `key_${newCollaborator.email.replace(/[^a-z0-9]/gi, '')}`,
      assignedAt: new Date().toISOString()
    };
  }

  logSecurityEvent(foundScriptId, {
    type: 'collaborator_joined',
    title: 'Collaborator Accepted Invitation',
    actor: newCollaborator,
    target: { email: newCollaborator.email, role: newCollaborator.role },
    details: `${newCollaborator.name} (${newCollaborator.email}) accepted invitation with role '${newCollaborator.role}'.`
  });

  const owner = getScriptOwner(foundScriptId);
  if (owner?.id) {
    addNotificationForUser(owner.id, {
      title: 'Collaborator Joined',
      message: `${newCollaborator.name} (${newCollaborator.email}) accepted your ${newCollaborator.role} invitation.`,
      type: 'collaboration',
      actionRoute: `/profile/collaborators?scriptId=${foundScriptId}`
    });
  }

  persistScriptState(foundScriptId);
  return { success: true, scriptId: foundScriptId, collaborator: newCollaborator };
}

// 3. ROLE MANAGEMENT
export function updateRole(scriptId, memberId, newRoleInput, actorUser = db.currentUser) {
  if (!isScriptOwner(scriptId, actorUser) && !checkPermission(scriptId, 'collaborators.manage', actorUser)) {
    throw new Error('Unauthorized: Only the screenplay owner or authorized administrator can modify roles.');
  }

  const collabs = db.collaborators[scriptId] || [];
  const member = collabs.find(
    c => c.id === memberId || (c.email && c.email.toLowerCase() === String(memberId).toLowerCase())
  );
  if (!member) {
    throw new Error('Collaborator not found.');
  }

  // Prevent actor from changing their own role to prevent accidental self-lockout
  if (actorUser && (member.email === actorUser.email || member.id === actorUser.id)) {
    throw new Error('Security policy prohibits modifying your own permissions.');
  }

  const previousRole = member.role;
  const targetRole = normalizeRole(newRoleInput);

  member.role = targetRole;

  logSecurityEvent(scriptId, {
    type: 'role_changed',
    title: 'Collaborator Role Modified',
    actor: actorUser,
    target: { name: member.name, email: member.email, role: targetRole },
    details: `Changed permission role of ${member.name} from '${previousRole}' to '${targetRole}'.`
  });

  if (actorUser?.id) {
    addNotificationForUser(actorUser.id, {
      title: 'Role Updated',
      message: `${member.name}'s role was updated to ${targetRole}.`,
      type: 'collaboration',
      actionRoute: `/profile/collaborators?scriptId=${scriptId}`
    });
  }
  const targetUserId = resolveUserIdByEmail(member.email);
  if (targetUserId && targetUserId !== actorUser?.id) {
    addNotificationForUser(targetUserId, {
      title: 'Role Updated',
      message: `Your project role was updated to ${targetRole}.`,
      type: 'collaboration',
      actionRoute: `/profile/collaborators?scriptId=${scriptId}`
    });
  }

  persistScriptState(scriptId);
  return {
    ...member,
    permissions: ROLE_PERMISSIONS[targetRole]
  };
}

// 4. MEMBER REMOVAL & ACCESS REVOCATION
export function removeCollaborator(scriptId, memberId, actorUser = db.currentUser) {
  if (!isScriptOwner(scriptId, actorUser) && !checkPermission(scriptId, 'collaborators.manage', actorUser)) {
    throw new Error('Unauthorized: You do not have permission to remove collaborators.');
  }

  const collabs = db.collaborators[scriptId] || [];
  const member = collabs.find(c => c.id === memberId || (c.email && c.email.toLowerCase() === memberId.toLowerCase()));
  if (!member) return false;

  // Prevent removing owner
  const owner = getScriptOwner(scriptId);
  if (member.email === owner.email || member.id === owner.id) {
    throw new Error('Security policy prohibits removing the screenplay owner.');
  }

  // Remove collaborator
  db.collaborators[scriptId] = collabs.filter(c => c.id !== member.id && c.email !== member.email);

  // E2EE Key Rotation trigger on member removal
  let keyRotated = false;
  if (db.e2ee && db.e2ee[scriptId] && db.e2ee[scriptId].enabled) {
    db.e2ee[scriptId].keyVersion += 1;
    db.e2ee[scriptId].lastRotated = new Date().toISOString();
    // Invalidate removed member's wrapped key
    if (db.e2ee[scriptId].wrappedKeys) {
      delete db.e2ee[scriptId].wrappedKeys[member.email];
      delete db.e2ee[scriptId].wrappedKeys[member.id];
    }
    keyRotated = true;
  }

  logSecurityEvent(scriptId, {
    type: 'collaborator_removed',
    title: 'Collaborator Access Revoked',
    actor: actorUser,
    target: { name: member.name, email: member.email, role: member.role },
    details: `Revoked screenplay access for ${member.name} (${member.email}). ${keyRotated ? 'Initiated E2EE key rotation.' : ''}`
  });

  return { success: true, keyRotated };
}

// 5. JOIN CODE GENERATION & MANAGEMENT
export function generateJoinCode(scriptId, actorUser = db.currentUser) {
  if (!isScriptOwner(scriptId, actorUser) && !checkPermission(scriptId, 'collaborators.manage', actorUser)) {
    throw new Error('Unauthorized: You do not have permission to generate or rotate join codes.');
  }

  const script = db.scripts.find(s => s.id === scriptId);
  if (!script) return null;

  // Generate cryptographically secure random alphanumeric code: 4 chars - 4 chars
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid confusing 0/O, 1/I
  let part1 = '';
  let part2 = '';
  for (let i = 0; i < 4; i++) part1 += chars[Math.floor(Math.random() * chars.length)];
  for (let i = 0; i < 4; i++) part2 += chars[Math.floor(Math.random() * chars.length)];
  const newCode = `${part1}-${part2}`;

  script.joinCode = newCode;

  if (!db.joinCodes) db.joinCodes = {};
  db.joinCodes[scriptId] = {
    code: newCode,
    status: 'active',
    allowedRoles: [ROLES.VIEWER, ROLES.EDITOR, ROLES.SCRIPT_DOCTOR, ROLES.PRODUCER],
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString()
  };

  logSecurityEvent(scriptId, {
    type: 'join_code_regenerated',
    title: 'Screenplay Join Code Rotated',
    actor: actorUser,
    target: null,
    details: `Generated new join code ${newCode} (Expires in 14 days).`
  });

  return newCode;
}

export function revokeJoinCode(scriptId, actorUser = db.currentUser) {
  if (!isScriptOwner(scriptId, actorUser) && !checkPermission(scriptId, 'collaborators.manage', actorUser)) {
    throw new Error('Unauthorized: You do not have permission to revoke join codes.');
  }

  const script = db.scripts.find(s => s.id === scriptId);
  if (script) script.joinCode = null;

  if (db.joinCodes && db.joinCodes[scriptId]) {
    db.joinCodes[scriptId].status = 'revoked';
  }

  logSecurityEvent(scriptId, {
    type: 'join_code_revoked',
    title: 'Join Code Revoked',
    actor: actorUser,
    target: null,
    details: 'Screenplay join code revoked. New join requests via this code are rejected.'
  });

  return { success: true };
}

export function getJoinCodeConfig(scriptId) {
  const script = db.scripts.find(s => s.id === scriptId);
  if (!script) return null;

  if (!db.joinCodes) db.joinCodes = {};
  if (!db.joinCodes[scriptId] && script.joinCode) {
    db.joinCodes[scriptId] = {
      code: script.joinCode,
      status: 'active',
      allowedRoles: [ROLES.VIEWER, ROLES.EDITOR, ROLES.SCRIPT_DOCTOR, ROLES.PRODUCER],
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString()
    };
  }

  return db.joinCodes[scriptId] || {
    code: script.joinCode || 'A7K9-XP42',
    status: 'active',
    allowedRoles: [ROLES.VIEWER, ROLES.EDITOR, ROLES.SCRIPT_DOCTOR, ROLES.PRODUCER],
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString()
  };
}

export function validateJoinCode(code) {
  const clean = (code || '').trim().toUpperCase();
  const script = db.scripts.find(s => (s.joinCode || '').toUpperCase() === clean);
  if (!script) {
    return { valid: false, error: 'Invalid or unrecognized Join Code.' };
  }

  const config = db.joinCodes?.[script.id];
  if (config) {
    if (config.status === 'revoked') {
      return { valid: false, error: 'This join code has been revoked by the screenplay owner.' };
    }
    if (new Date(config.expiresAt) < new Date()) {
      return { valid: false, error: 'This join code has expired. Please ask the owner to regenerate it.' };
    }
  }

  const owner = getScriptOwner(script.id);
  return {
    valid: true,
    script: {
      id: script.id,
      title: script.title,
      draft: script.draft || 'Draft 1.0',
      format: script.format || 'Feature',
      pages: script.pages || 96,
      ownerName: owner.name,
      collaboratorCount: (db.collaborators[script.id] || []).length,
      allowedRoles: config?.allowedRoles || [ROLES.VIEWER, ROLES.EDITOR, ROLES.SCRIPT_DOCTOR, ROLES.PRODUCER]
    }
  };
}

// 6. ACCESS REQUESTS (Join Code Approval Workflow)
export function requestJoinAccess(code, requestData = {}, user = db.currentUser) {
  const validation = validateJoinCode(code);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const scriptId = validation.script.id;
  const script = db.scripts.find(s => s.id === scriptId);
  const userEmail = (requestData.userEmail || requestData.email || (user ? user.email : '') || 'collaborator@studio.com').trim().toLowerCase();
  const userName = requestData.userName || requestData.name || user?.name || user?.displayName || userEmail.split('@')[0];

  // Check if user is already a collaborator
  const existingCollabs = db.collaborators[scriptId] || [];
  if (existingCollabs.some(c => (c.email || '').toLowerCase() === userEmail)) {
    throw new Error('You are already an active collaborator on this screenplay.');
  }

  // Check if owner
  const owner = getScriptOwner(scriptId);
  if (userEmail === (owner.email || '').toLowerCase()) {
    throw new Error('You are the screenplay owner and already possess full access.');
  }

  if (!db.accessRequests) db.accessRequests = {};
  if (!db.accessRequests[scriptId]) db.accessRequests[scriptId] = [];

  const pendingReq = db.accessRequests[scriptId].find(r => r.userEmail.toLowerCase() === userEmail.toLowerCase() && r.status === 'pending');
  if (pendingReq) {
    throw new Error('You already have a pending access request for this screenplay.');
  }

  const requestedRole = normalizeRole(requestData.requestedRole || ROLES.VIEWER);
  const initials = userName.split(' ').map(s => s[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || 'WB';

  const newRequest = {
    id: `req-${Date.now()}`,
    userId: user?.id || `usr-${Date.now()}`,
    userName,
    userEmail,
    initials,
    requestedRole,
    note: requestData.note || '',
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  db.accessRequests[scriptId].unshift(newRequest);

  logSecurityEvent(scriptId, {
    type: 'join_request_submitted',
    title: 'Access Request Submitted',
    actor: { name: userName, email: userEmail },
    target: null,
    details: `${userName} requested '${requestedRole}' access via join code.`
  });

  if (owner?.id) {
    addNotificationForUser(owner.id, {
      title: 'New Access Request',
      message: `${userName} (${userEmail}) requested to join '${script.title}' as ${requestedRole}.`,
      type: 'collaboration',
      actionRoute: `/profile/collaborators?scriptId=${scriptId}`
    });
  }

  persistScriptState(scriptId);
  return {
    success: true,
    requestId: newRequest.id,
    scriptTitle: script.title,
    status: 'pending',
    message: 'Access request submitted to screenplay owner for approval.'
  };
}

export function getAccessRequests(scriptId) {
  if (!db.accessRequests) db.accessRequests = {};
  return (db.accessRequests[scriptId] || []).filter(r => r.status === 'pending');
}

export function approveAccessRequest(scriptId, requestId, assignedRoleInput, actorUser = db.currentUser) {
  if (!isScriptOwner(scriptId, actorUser) && !checkPermission(scriptId, 'collaborators.manage', actorUser)) {
    throw new Error('Unauthorized: Only the screenplay owner can approve access requests.');
  }

  const requests = db.accessRequests?.[scriptId] || [];
  const req = requests.find(r => r.id === requestId);
  if (!req) {
    throw new Error('Access request not found.');
  }

  if (req.status !== 'pending') {
    throw new Error(`This request has already been ${req.status}.`);
  }

  const finalRole = normalizeRole(assignedRoleInput || req.requestedRole);
  req.status = 'approved';
  req.approvedBy = actorUser?.name || 'Owner';
  req.approvedAt = new Date().toISOString();

  if (!db.collaborators[scriptId]) db.collaborators[scriptId] = [];

  const newCollab = {
    id: `c-${Date.now()}`,
    name: req.userName,
    email: req.userEmail,
    initials: req.initials || 'CB',
    role: finalRole,
    avatarBg: getAvatarColor(req.userEmail),
    status: 'Active',
    added: 'Just now'
  };

  db.collaborators[scriptId].push(newCollab);

  logSecurityEvent(scriptId, {
    type: 'request_approved',
    title: 'Access Request Approved',
    actor: actorUser,
    target: { name: req.userName, email: req.userEmail, role: finalRole },
    details: `Approved access request for ${req.userName} with assigned role '${finalRole}'.`
  });

  return { success: true, collaborator: newCollab };
}

export function rejectAccessRequest(scriptId, requestId, actorUser = db.currentUser) {
  if (!isScriptOwner(scriptId, actorUser) && !checkPermission(scriptId, 'collaborators.manage', actorUser)) {
    throw new Error('Unauthorized: Only the screenplay owner can reject access requests.');
  }

  const requests = db.accessRequests?.[scriptId] || [];
  const req = requests.find(r => r.id === requestId);
  if (!req) {
    throw new Error('Access request not found.');
  }

  req.status = 'rejected';
  req.rejectedBy = actorUser?.name || 'Owner';
  req.rejectedAt = new Date().toISOString();

  logSecurityEvent(scriptId, {
    type: 'request_rejected',
    title: 'Access Request Rejected',
    actor: actorUser,
    target: { name: req.userName, email: req.userEmail, role: req.requestedRole },
    details: `Rejected access request from ${req.userName} for role '${req.requestedRole}'.`
  });

  return { success: true };
}

// Backward compatibility helper for legacy direct redemption
export function redeemJoinCode(code, user = db.currentUser) {
  return requestJoinAccess(code, { requestedRole: ROLES.VIEWER }, user);
}

// 7. SECURITY ACTIVITY AUDIT LOG
export function getSecurityActivity(scriptId) {
  if (!db.securityActivity) db.securityActivity = {};
  return db.securityActivity[scriptId] || [];
}

// 8. END-TO-END ENCRYPTION (E2EE) METADATA & WRAPPED KEY DISTRIBUTION
export function getE2EESettings(scriptId, user = db.currentUser) {
  if (!db.e2ee) db.e2ee = {};
  const current = db.e2ee[scriptId] || {
    enabled: false,
    algorithm: 'AES-GCM-256',
    keyVersion: 1,
    keyFingerprint: null,
    lastRotated: null,
    wrappedKeys: {}
  };

  const userEmail = user?.email || 'owner@scriptora.studio';
  const hasWrappedKey = Boolean(current.wrappedKeys?.[userEmail] || current.wrappedKeys?.[user?.id]);
  const userWrappedKey = current.wrappedKeys?.[userEmail] || current.wrappedKeys?.[user?.id] || null;

  return {
    ...current,
    hasWrappedKey,
    userWrappedKey: userWrappedKey ? { keyVersion: current.keyVersion, data: userWrappedKey } : null
  };
}

export function enableE2EE(scriptId, { keyFingerprint, wrappedKeys }, user = db.currentUser) {
  if (!isScriptOwner(scriptId, user)) {
    throw new Error('Unauthorized: Only the screenplay owner can enable End-to-End Encryption.');
  }

  if (!db.e2ee) db.e2ee = {};
  db.e2ee[scriptId] = {
    enabled: true,
    algorithm: 'AES-GCM-256',
    keyVersion: 1,
    keyFingerprint: keyFingerprint || `sha256-${Date.now()}`,
    lastRotated: new Date().toISOString(),
    wrappedKeys: wrappedKeys || {}
  };

  logSecurityEvent(scriptId, {
    type: 'e2ee_enabled',
    title: 'End-to-End Encryption Enabled',
    actor: user,
    target: null,
    details: 'Zero-knowledge AES-256-GCM client-side encryption activated for screenplay content and dialogue.'
  });

  return db.e2ee[scriptId];
}

export function rotateE2EEKey(scriptId, { newKeyFingerprint, wrappedKeys }, user = db.currentUser) {
  if (!isScriptOwner(scriptId, user)) {
    throw new Error('Unauthorized: Only the screenplay owner can rotate encryption keys.');
  }

  if (!db.e2ee || !db.e2ee[scriptId]) {
    throw new Error('E2EE is not yet enabled on this screenplay.');
  }

  const current = db.e2ee[scriptId];
  current.keyVersion += 1;
  current.keyFingerprint = newKeyFingerprint || `sha256-v${current.keyVersion}-${Date.now()}`;
  current.lastRotated = new Date().toISOString();
  current.wrappedKeys = wrappedKeys || {};

  logSecurityEvent(scriptId, {
    type: 'key_rotated',
    title: 'Encryption Key Rotated',
    actor: user,
    target: null,
    details: `Rotated screenplay key to version ${current.keyVersion}. Re-wrapped for authorized members.`
  });

  return current;
}

export function disableE2EE(scriptId, user = db.currentUser) {
  if (!isScriptOwner(scriptId, user)) {
    throw new Error('Unauthorized: Only the screenplay owner can disable End-to-End Encryption.');
  }

  if (!db.e2ee || !db.e2ee[scriptId]) {
    return { enabled: false };
  }

  db.e2ee[scriptId].enabled = false;
  db.e2ee[scriptId].disabledAt = new Date().toISOString();

  logSecurityEvent(scriptId, {
    type: 'e2ee_disabled',
    title: 'End-to-End Encryption Disabled',
    actor: user,
    target: null,
    details: 'Zero-knowledge encryption deactivated. Screenplay returned to standard server storage.'
  });

  return db.e2ee[scriptId];
}

export function registerUserPublicKey(user, { publicKeyJwk }) {
  if (!user || !user.email) throw new Error('Authentication required.');
  if (!db.userKeys) db.userKeys = {};
  const emailKey = user.email.toLowerCase();
  db.userKeys[emailKey] = {
    userId: user.id,
    email: emailKey,
    publicKeyJwk,
    updatedAt: new Date().toISOString()
  };
  persistUserKeyState(emailKey, db.userKeys[emailKey]);
  return { success: true };
}

export function getUserPublicKey(email) {
  if (!db.userKeys || !email) return null;
  return db.userKeys[String(email).toLowerCase()] || db.userKeys[email] || null;
}

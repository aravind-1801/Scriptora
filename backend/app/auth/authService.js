import { db } from '../models/db.js';

export function getCurrentUser() {
  return db.currentUser;
}

export function login(credentials) {
  const { email, password, provider, name, displayName, picture, photoURL, sub, token } = credentials || {};
  const isGoogle = provider === 'google';
  const resolvedName = displayName || name || (email ? email.split('@')[0] : "Arun Kumar");
  const initials = resolvedName.split(' ').map(s => s[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || "AK";

  const avatarUrl = picture || photoURL || credentials.avatarUrl || null;
  const user = {
    id: sub || (isGoogle ? `google-${Date.now()}` : "user-1"),
    name: resolvedName,
    displayName: resolvedName,
    headline: isGoogle ? "Screenwriter & Film Director" : "Screenwriter & Narrative Director",
    email: email || "arun.kumar@scriptora.studio",
    badge: "Member Pro",
    initials,
    avatar: avatarUrl,
    avatarUrl: avatarUrl,
    provider: provider || "credentials",
    stats: { drafts: 14, coAuthors: 3, healthIndex: "98%" }
  };
  db.currentUser = user;
  return user;
}

export function register(data) {
  const { name, email } = data || {};
  const user = {
    id: `user-${Date.now()}`,
    name: name || "New Writer",
    displayName: name || "New Writer",
    headline: "Screenwriter",
    email: email || "writer@scriptora.studio",
    badge: "Member Pro",
    initials: (name || "NW").slice(0, 2).toUpperCase(),
    stats: { drafts: 1, coAuthors: 0, healthIndex: "100%" }
  };
  db.currentUser = user;
  return user;
}

export function verifyOtp(phone) {
  const user = {
    id: "user-phone",
    name: "Verified Writer",
    displayName: "Verified Writer",
    headline: "Screenwriter",
    phone: phone || "+1-555-0192",
    email: "phone.writer@scriptora.studio",
    badge: "Member Pro",
    initials: "VW",
    stats: { drafts: 3, coAuthors: 1, healthIndex: "95%" }
  };
  db.currentUser = user;
  return user;
}

export function signOut() {
  db.currentUser = null;
  return { success: true };
}

export function deleteAccount(confirmationText) {
  const currentUser = db.currentUser;
  if (!currentUser) {
    throw new Error('Authentication required to delete account.');
  }

  const cleanConfirmation = (confirmationText || '').trim().toUpperCase();
  if (cleanConfirmation !== 'DELETE MY ACCOUNT') {
    throw new Error('Confirmation mismatch. Please type "DELETE MY ACCOUNT" exactly to confirm account deletion.');
  }

  const deletingEmail = currentUser.email;
  const deletingId = currentUser.id;

  // Preserve shared scripts with remaining collaborators; delete sole-owned scripts
  const scriptsToKeep = [];
  const scriptsToDelete = [];

  for (const script of db.scripts) {
    const collabs = db.collaborators[script.id] || [];
    const remainingCollabs = collabs.filter(c => c.email !== deletingEmail && c.id !== deletingId);

    if (remainingCollabs.length > 0) {
      // Transfer ownership to the first remaining collaborator
      if (!remainingCollabs.some(c => c.role === 'Owner')) {
        remainingCollabs[0].role = 'Owner';
      }
      db.collaborators[script.id] = remainingCollabs;
      scriptsToKeep.push(script);
    } else {
      scriptsToDelete.push(script.id);
    }
  }

  db.scripts = scriptsToKeep;
  for (const scriptId of scriptsToDelete) {
    delete db.screenplays[scriptId];
    delete db.collaborators[scriptId];
    delete db.versions[scriptId];
    if (Array.isArray(db.storyboards)) {
      db.storyboards = db.storyboards.filter(sb => sb.scriptId !== scriptId);
    }
  }

  // De-identify personal signatures in production records
  if (Array.isArray(db.callSheets)) {
    for (const cs of db.callSheets) {
      if (cs.approvedBy && (cs.approvedBy.includes(currentUser.name) || cs.approvedBy.includes(currentUser.displayName))) {
        cs.approvedBy = 'Former Member (Deleted)';
      }
    }
  }

  // Invalidate server session
  db.currentUser = null;

  return {
    success: true,
    message: 'Account and associated personal records have been permanently deleted.',
    deletedUserId: deletingId
  };
}

/**
 * Verify authorization token from request header (supports Firebase ID token, JWT, dev/session tokens)
 */
export function verifyAuthToken(authHeader, allowSessionFallback = true) {
  if (authHeader) {
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    const token = match ? match[1].trim() : authHeader.trim();
    if (token) {
      if (token === 'dev-token' || token === 'test-token') {
        return db.currentUser || { id: 'user-1', name: 'Arun Kumar', email: 'arun.kumar@scriptora.studio' };
      }
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
          const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf8');
          const payload = JSON.parse(payloadJson);
          const nowSec = Math.floor(Date.now() / 1000);
          if (payload.exp && payload.exp < nowSec) return null;
          const uid = payload.user_id || payload.sub || payload.uid;
          return {
            id: uid,
            uid: uid,
            email: payload.email || '',
            name: payload.name || payload.displayName || 'Authenticated User'
          };
        }
      } catch (_) {
        return null;
      }
      if (db.currentUser && (token === db.currentUser.id || token === db.currentUser.email)) {
        return db.currentUser;
      }
      // If token does not match any recognized user or format
      return null;
    }
  }

  // Optional session fallback for existing integration tests in non-strict mode
  if (allowSessionFallback && (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') && db.currentUser) {
    return db.currentUser;
  }

  return null;
}

/**
 * Check if the user is authorized to access the requested script
 */
export function checkScriptAccess(user, scriptId, requiredRole = 'Viewer') {
  if (!user || !user.id) {
    return { allowed: false, status: 401, error: 'Authentication required' };
  }

  // Check script in db
  const script = (db.scripts || []).find(s => s.id === scriptId);

  // Ownership check: If script specifies ownerId, only that user or their verified email is the owner.
  // Default legacy/demo scripts without explicit ownerId belong to user-1 (Arun Kumar).
  const isOwner = (script && script.ownerId)
    ? (script.ownerId === user.id || (user.email && script.ownerEmail === user.email))
    : (user.id === 'user-1' || user.email === 'arun.kumar@scriptora.studio');

  if (isOwner) {
    return { allowed: true, role: 'Owner' };
  }

  if (requiredRole === 'Owner') {
    return { allowed: false, status: 403, error: 'Permission denied: Only the screenplay owner can perform this action.' };
  }

  // Collaborator check
  const collabs = (db.collaborators && db.collaborators[scriptId]) || [];
  const collab = collabs.find(c => c.id === user.id || c.email === user.email);
  if (collab) {
    if (requiredRole === 'Editor' && collab.role === 'Viewer') {
      return { allowed: false, status: 403, error: 'Write permission denied: Viewer role is read-only' };
    }
    return { allowed: true, role: collab.role };
  }

  // If script exists but user is neither owner nor collaborator
  return { allowed: false, status: 403, error: 'Access denied: You do not own or collaborate on this project' };
}

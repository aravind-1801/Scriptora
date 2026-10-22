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

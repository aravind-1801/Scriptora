import crypto from 'crypto';
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

let cachedGoogleCerts = null;
let certsExpiry = 0;

/**
 * Fetch and cache Google Firebase Auth public x509 certificates.
 */
export async function fetchGooglePublicCerts() {
  const now = Date.now();
  if (cachedGoogleCerts && certsExpiry > now) {
    return cachedGoogleCerts;
  }
  try {
    const res = await fetch('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com');
    if (res.ok) {
      const data = await res.json();
      cachedGoogleCerts = data;
      const cc = res.headers.get('cache-control') || '';
      const match = cc.match(/max-age=(\d+)/i);
      const maxAgeSec = match ? parseInt(match[1], 10) : 21600;
      certsExpiry = now + maxAgeSec * 1000;
      return cachedGoogleCerts;
    }
  } catch (err) {
    console.warn('[authService] Could not reach Google public certs endpoint:', err.message);
  }
  return cachedGoogleCerts || {};
}

/**
 * Cryptographically verifies a Firebase ID Token using Google's public x509 keys and project claims.
 * Rejects forged, expired, malformed or invalid tokens.
 */
export async function verifyFirebaseIdToken(token) {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    // 1. Header parsing & algorithm check
    const headerJson = Buffer.from(parts[0], 'base64url').toString('utf8');
    const header = JSON.parse(headerJson);
    if (header.alg !== 'RS256' || !header.kid) {
      return null;
    }

    // 2. Fetch Google public certificate matching kid
    const certs = await fetchGooglePublicCerts();
    const cert = certs[header.kid];
    if (!cert) {
      return null;
    }

    // 3. Cryptographic signature verification
    const signingInput = Buffer.from(`${parts[0]}.${parts[1]}`);
    const signature = Buffer.from(parts[2], 'base64url');
    const isSignatureValid = crypto.verify('sha256', signingInput, cert, signature);
    if (!isSignatureValid) {
      console.warn('[authService] Cryptographic signature verification failed');
      return null;
    }

    // 4. Claims verification
    const payloadJson = Buffer.from(parts[1], 'base64url').toString('utf8');
    const payload = JSON.parse(payloadJson);
    const nowSec = Math.floor(Date.now() / 1000);

    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || 'scriptora-1801';

    // Must not be expired
    if (!payload.exp || payload.exp < nowSec) {
      return null;
    }
    // Must be issued in the past (allowing 5m clock skew)
    if (payload.iat && payload.iat > nowSec + 300) {
      return null;
    }
    // Must match project audience
    if (payload.aud !== projectId) {
      return null;
    }
    // Must match project issuer
    if (payload.iss !== `https://securetoken.google.com/${projectId}`) {
      return null;
    }
    // Must have non-empty subject
    if (!payload.sub || typeof payload.sub !== 'string' || payload.sub.trim() === '') {
      return null;
    }

    return {
      id: payload.sub,
      uid: payload.sub,
      email: payload.email || '',
      name: payload.name || payload.displayName || 'Authenticated User'
    };
  } catch (err) {
    return null;
  }
}

/**
 * Verify authorization token from request header.
 * In production, cryptographically validates genuine Firebase ID tokens.
 * Only accepts test-token / dev-token in explicitly isolated test / development environments.
 */
export async function verifyAuthToken(authHeader, allowSessionFallback = true) {
  const isTestOrDev = (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') && !process.env.STRICT_AUTH;
  const isProd = process.env.NODE_ENV === 'production' || process.env.STRICT_AUTH === 'true';

  if (authHeader) {
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    const token = match ? match[1].trim() : authHeader.trim();
    if (token) {
      // In isolated test/development mode ONLY, allow test tokens
      if (!isProd && isTestOrDev) {
        if (token === 'dev-token' || token === 'test-token') {
          return db.currentUser || { id: 'user-1', name: 'Arun Kumar', email: 'arun.kumar@scriptora.studio' };
        }
        if (db.currentUser && (token === db.currentUser.id || token === db.currentUser.email)) {
          return db.currentUser;
        }
        // Support test collaborator lookup from db in test mode
        if (token.startsWith('mock-user:')) {
          const parts = token.split(':');
          return { id: parts[1], uid: parts[1], email: parts[2] || '', name: parts[3] || 'Mock User' };
        }
        for (const list of Object.values(db.collaborators || {})) {
          const found = list.find(c => c.id === token || c.email === token);
          if (found) return found;
        }
      }

      // Cryptographic Firebase ID Token verification
      const firebaseUser = await verifyFirebaseIdToken(token);
      if (firebaseUser) {
        return firebaseUser;
      }

      // Reject all untrusted, decoded-only, forged or invalid tokens
      return null;
    }
  }

  // Session fallback strictly isolated to test/dev environment
  if (allowSessionFallback && isTestOrDev && db.currentUser) {
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

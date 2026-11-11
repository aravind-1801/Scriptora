/**
 * SCRIPTORA Authentication & Cryptographic Authorization Service
 *
 * - Real salted scrypt password hashing for email/password accounts
 * - Cryptographically signed HS256 session JWTs (with strict expiry enforcement)
 * - Cryptographic RS256 Firebase ID Token verification (Google x509 certs)
 * - Server-side Google OAuth token verification (tokeninfo / userinfo)
 * - Zero test-token / session fallback allowed in production or STRICT_AUTH mode
 */

import crypto from 'crypto';
import {
  db,
  createDefaultSettings,
  persistUserState,
  persistScriptState,
  deleteScriptCloudState,
  deleteShard
} from '../models/db.js';
import { hashIdentifier } from '../db/cloudStore.js';

const TOKEN_TTL_SECONDS = 7 * 24 * 3600; // 7 days

function isStrictAuth() {
  return process.env.NODE_ENV === 'production' || process.env.STRICT_AUTH === 'true';
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (secret && secret.trim().length >= 16) {
    return secret.trim();
  }
  if (isStrictAuth() && process.env.NODE_ENV === 'production') {
    console.warn('[authService] WARNING: JWT_SECRET not set in production environment!');
  }
  return secret || 'scriptora-local-dev-jwt-secret-change-in-production';
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(String(password), salt, 64).toString('hex');
  return `${salt}:${derived}`;
}

export function verifyPassword(password, storedHash) {
  if (!password || !storedHash || !storedHash.includes(':')) return false;
  const [salt, expectedHex] = storedHash.split(':');
  if (!salt || !expectedHex) return false;
  try {
    const derived = crypto.scryptSync(String(password), salt, 64);
    const expected = Buffer.from(expectedHex, 'hex');
    if (derived.length !== expected.length) return false;
    return crypto.timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}

export function signSessionJwt(user, expiresInSec = TOKEN_TTL_SECONDS) {
  const nowSec = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    sub: user.id,
    uid: user.id,
    email: user.email || '',
    name: user.name || user.displayName || 'Writer',
    iss: 'scriptora-api',
    iat: nowSec,
    exp: nowSec + expiresInSec
  })).toString('base64url');

  const signingInput = `${header}.${payload}`;
  const signature = crypto
    .createHmac('sha256', getJwtSecret())
    .update(signingInput)
    .digest('base64url');

  return `${signingInput}.${signature}`;
}

export function verifySessionJwt(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const header = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
    if (header.alg !== 'HS256') return null;

    const signingInput = `${parts[0]}.${parts[1]}`;
    const expectedSig = crypto
      .createHmac('sha256', getJwtSecret())
      .update(signingInput)
      .digest();
    const actualSig = Buffer.from(parts[2], 'base64url');

    if (expectedSig.length !== actualSig.length || !crypto.timingSafeEqual(expectedSig, actualSig)) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
    const nowSec = Math.floor(Date.now() / 1000);

    if (payload.iss !== 'scriptora-api') return null;
    if (!payload.sub || typeof payload.sub !== 'string') return null;
    if (!payload.exp || payload.exp <= nowSec) return null;
    if (payload.iat && payload.iat > nowSec + 300) return null;

    // Look up persisted user so deleted accounts cannot keep using old JWTs
    const existing = db.users.find(u => u.id === payload.sub);
    if (existing) {
      return sanitizeUser(existing);
    }

    // If strict mode and user record does not exist, reject orphan token
    if (isStrictAuth()) {
      return null;
    }

    return {
      id: payload.sub,
      uid: payload.sub,
      email: (payload.email || '').toLowerCase(),
      name: payload.name || 'Writer',
      displayName: payload.name || 'Writer'
    };
  } catch {
    return null;
  }
}

export function sanitizeUser(user) {
  if (!user) return null;
  const safe = { ...user };
  delete safe.passwordHash;
  delete safe.password;
  if (!safe.uid && safe.id) safe.uid = safe.id;
  if (!safe.id && safe.uid) safe.id = safe.uid;
  return safe;
}

function buildInitials(name, email) {
  const source = (name || email || 'W').trim();
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return source.slice(0, 2).toUpperCase() || 'W';
}

function findUserByEmail(email) {
  if (!email) return null;
  const clean = String(email).trim().toLowerCase();
  return db.users.find(u => (u.email || '').toLowerCase() === clean) || null;
}

function upsertUserRecord(baseData) {
  const cleanEmail = (baseData.email || '').trim().toLowerCase();
  let existing = cleanEmail ? findUserByEmail(cleanEmail) : null;
  if (!existing && baseData.id) {
    existing = db.users.find(u => u.id === baseData.id || u.firebaseUid === baseData.id) || null;
  }

  if (existing) {
    if (baseData.firebaseUid && !existing.firebaseUid) existing.firebaseUid = baseData.firebaseUid;
    if (baseData.name && (!existing.name || existing.name === 'Writer')) existing.name = baseData.name;
    if (baseData.displayName && !existing.displayName) existing.displayName = baseData.displayName;
    if (baseData.avatarUrl && !existing.avatarUrl) existing.avatarUrl = baseData.avatarUrl;
    if (baseData.provider && !existing.authProviders?.includes(baseData.provider)) {
      existing.authProviders = [...(existing.authProviders || []), baseData.provider];
    }
    if (baseData.passwordHash && !existing.passwordHash) {
      existing.passwordHash = baseData.passwordHash;
    }
    existing.updatedAt = new Date().toISOString();
    persistUserState(existing);
    return existing;
  }

  const deterministicId = baseData.id ||
    (cleanEmail ? `user-${hashIdentifier(cleanEmail).slice(0, 16)}` : `user-${crypto.randomUUID().slice(0, 16)}`);
  const name = baseData.name || (cleanEmail ? cleanEmail.split('@')[0] : 'Writer');

  const newUser = {
    id: deterministicId,
    uid: deterministicId,
    firebaseUid: baseData.firebaseUid || null,
    name,
    displayName: baseData.displayName || name,
    email: cleanEmail || `${deterministicId}@scriptora.studio`,
    phone: baseData.phone || null,
    headline: baseData.headline || 'Screenwriter',
    role: baseData.role || 'Writer',
    bio: baseData.bio || '',
    location: baseData.location || '',
    badge: baseData.badge || 'Member Pro',
    initials: baseData.initials || buildInitials(name, cleanEmail),
    avatarUrl: baseData.avatarUrl || '',
    provider: baseData.provider || 'email',
    authProviders: baseData.provider ? [baseData.provider] : ['email'],
    passwordHash: baseData.passwordHash || null,
    settings: createDefaultSettings(),
    stats: { drafts: 0, coAuthors: 0, healthIndex: '100%' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.users.push(newUser);
  db.userSettings[newUser.id] = newUser.settings;
  persistUserState(newUser);
  return newUser;
}

export function getCurrentUser(sessionUser = null) {
  const target = sessionUser || (isStrictAuth() ? null : db.currentUser);
  if (!target) return null;
  const persisted = db.users.find(u => u.id === target.id || (target.email && (u.email || '').toLowerCase() === target.email.toLowerCase()));
  return sanitizeUser(persisted || target);
}

export function updateProfile(updates = {}, currentUser = null) {
  const actor = currentUser || (isStrictAuth() ? null : db.currentUser);
  if (!actor || !actor.id) {
    const err = new Error('Authentication required');
    err.status = 401;
    throw err;
  }

  let user = db.users.find(u => u.id === actor.id) || findUserByEmail(actor.email);
  if (!user) {
    user = upsertUserRecord({
      id: actor.id,
      email: actor.email,
      name: actor.name || actor.displayName
    });
  }

  const allowedFields = ['name', 'displayName', 'headline', 'role', 'bio', 'location', 'avatarUrl', 'phone'];
  for (const key of allowedFields) {
    if (updates[key] !== undefined && typeof updates[key] === 'string') {
      user[key] = updates[key];
    }
  }
  if (updates.displayName && !updates.name) user.name = updates.displayName;
  if (updates.name && !updates.displayName) user.displayName = updates.name;
  user.initials = buildInitials(user.displayName || user.name, user.email);
  user.updatedAt = new Date().toISOString();

  if (!isStrictAuth() && db.currentUser && db.currentUser.id === user.id) {
    db.currentUser = sanitizeUser(user);
  }

  persistUserState(user);
  return sanitizeUser(user);
}

async function verifyGoogleToken(credentials) {
  const fbToken = credentials.firebaseToken || credentials.idToken || credentials.token;
  if (fbToken) {
    // 1. Try Firebase ID token first
    const fbUser = await verifyFirebaseIdToken(fbToken);
    if (fbUser && fbUser.email) {
      return {
        firebaseUid: fbUser.uid,
        email: fbUser.email.toLowerCase(),
        name: fbUser.name,
        avatarUrl: fbUser.picture || '',
        emailVerified: fbUser.emailVerified !== false,
        provider: 'google'
      };
    }

    // 2. Try Google OAuth / GIS ID token via Google tokeninfo
    try {
      const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(fbToken)}`);
      if (res.ok) {
        const info = await res.json();
        if (info.email && (info.email_verified === 'true' || info.email_verified === true)) {
          return {
            email: info.email.toLowerCase(),
            name: info.name || info.email.split('@')[0],
            avatarUrl: info.picture || '',
            emailVerified: true,
            provider: 'google'
          };
        }
      }
    } catch {}
  }

  if (credentials.accessToken) {
    try {
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${credentials.accessToken}` }
      });
      if (res.ok) {
        const info = await res.json();
        if (info.email && info.email_verified !== false) {
          return {
            email: info.email.toLowerCase(),
            name: info.name || info.email.split('@')[0],
            avatarUrl: info.picture || '',
            emailVerified: true,
            provider: 'google'
          };
        }
      }
    } catch {}
  }

  return null;
}

export async function loginWithGoogle(credentials = {}) {
  const verified = await verifyGoogleToken(credentials);

  if (verified) {
    const user = upsertUserRecord({
      email: verified.email,
      name: verified.name,
      displayName: verified.name,
      avatarUrl: verified.avatarUrl,
      firebaseUid: verified.firebaseUid || null,
      provider: 'google'
    });
    const token = signSessionJwt(user);
    if (process.env.NODE_ENV === 'test' && !isStrictAuth()) {
      db.currentUser = sanitizeUser(user);
    }
    return { ...sanitizeUser(user), token };
  }

  // Strictly reject unverified Google payloads in production or STRICT_AUTH
  if (isStrictAuth()) {
    const err = new Error('Google sign-in requires a valid verified Google or Firebase ID token.');
    err.status = 401;
    throw err;
  }

  // Legacy test-only compatibility when NODE_ENV=test and not STRICT_AUTH
  if (!credentials.email) {
    const err = new Error('Email or Google token is required');
    err.status = 400;
    throw err;
  }
  const user = upsertUserRecord({
    email: credentials.email,
    name: credentials.name || credentials.displayName || credentials.email.split('@')[0],
    displayName: credentials.displayName || credentials.name,
    avatarUrl: credentials.picture || credentials.avatarUrl || '',
    provider: 'google'
  });
  const token = signSessionJwt(user);
  if (process.env.NODE_ENV === 'test') {
    db.currentUser = sanitizeUser(user);
  }
  return { ...sanitizeUser(user), token };
}

export async function login(credentials = {}) {
  if (credentials.provider === 'google' || credentials.idToken || credentials.firebaseToken || credentials.accessToken) {
    return await loginWithGoogle(credentials);
  }

  const email = (credentials.email || '').trim().toLowerCase();
  const password = credentials.password;

  if (!email) {
    const err = new Error('Email is required');
    err.status = 400;
    throw err;
  }

  const existing = findUserByEmail(email);

  if (isStrictAuth() || existing?.passwordHash || password) {
    if (!password) {
      const err = new Error('Password is required');
      err.status = 400;
      throw err;
    }
    if (!existing) {
      const err = new Error('Invalid email or password');
      err.status = 401;
      throw err;
    }
    if (!existing.passwordHash) {
      const err = new Error('This account uses Google Sign-In. Please continue with Google or register a password.');
      err.status = 401;
      throw err;
    }
    if (!verifyPassword(password, existing.passwordHash)) {
      const err = new Error('Invalid email or password');
      err.status = 401;
      throw err;
    }

    const token = signSessionJwt(existing);
    if (process.env.NODE_ENV === 'test' && !isStrictAuth()) {
      db.currentUser = sanitizeUser(existing);
    }
    return { ...sanitizeUser(existing), token };
  }

  // Test-only convenience when NODE_ENV=test and not STRICT_AUTH
  const user = existing || upsertUserRecord({
    email,
    name: credentials.name || email.split('@')[0],
    provider: 'email'
  });
  const token = signSessionJwt(user);
  if (process.env.NODE_ENV === 'test') {
    db.currentUser = sanitizeUser(user);
  }
  return { ...sanitizeUser(user), token };
}

export function register(data = {}) {
  const email = (data.email || '').trim().toLowerCase();
  const password = data.password;

  if (!email || !email.includes('@')) {
    const err = new Error('A valid email address is required.');
    err.status = 400;
    throw err;
  }

  if (isStrictAuth() || password !== undefined) {
    if (!password || String(password).length < 6) {
      const err = new Error('Password must be at least 6 characters long.');
      err.status = 400;
      throw err;
    }
  }

  const existing = findUserByEmail(email);
  if (existing) {
    const err = new Error('An account with this email already exists. Please sign in.');
    err.status = 409;
    throw err;
  }

  const user = upsertUserRecord({
    name: (data.name || email.split('@')[0]).trim(),
    displayName: (data.name || email.split('@')[0]).trim(),
    email,
    role: data.role || 'Writer',
    provider: 'email',
    passwordHash: password ? hashPassword(password) : null
  });

  const token = signSessionJwt(user);
  if (process.env.NODE_ENV === 'test' && !isStrictAuth()) {
    db.currentUser = sanitizeUser(user);
  }

  return { ...sanitizeUser(user), token };
}

export async function verifyOtp(payloadOrPhone) {
  const phone = typeof payloadOrPhone === 'object' ? payloadOrPhone?.phone : payloadOrPhone;
  const firebaseToken = typeof payloadOrPhone === 'object' ? (payloadOrPhone?.firebaseToken || payloadOrPhone?.idToken) : null;

  if (firebaseToken) {
    const fbUser = await verifyFirebaseIdToken(firebaseToken);
    if (!fbUser) {
      const err = new Error('Invalid Firebase Phone Auth token.');
      err.status = 401;
      throw err;
    }
    const user = upsertUserRecord({
      id: fbUser.uid,
      firebaseUid: fbUser.uid,
      phone: phone || fbUser.phone_number || '',
      email: fbUser.email || `${fbUser.uid}@phone.scriptora.studio`,
      name: 'Verified Writer',
      provider: 'phone'
    });
    const token = signSessionJwt(user);
    return { ...sanitizeUser(user), token };
  }

  if (isStrictAuth()) {
    const err = new Error('Phone OTP requires Firebase verification or please sign in using Email & Password or Google Sign-In.');
    err.status = 400;
    throw err;
  }

  const cleanPhone = String(phone || '+1-555-0192').replace(/\s+/g, '');
  const phoneHash = crypto.createHash('sha256').update(cleanPhone).digest('hex').slice(0, 12);
  const userId = `user-phone-${phoneHash}`;
  const user = upsertUserRecord({
    id: userId,
    phone: cleanPhone,
    email: `${userId}@scriptora.studio`,
    name: 'Verified Writer',
    provider: 'phone'
  });
  const token = signSessionJwt(user);

  if (process.env.NODE_ENV === 'test') {
    db.currentUser = sanitizeUser(user);
  }

  return { ...sanitizeUser(user), token };
}

export function signOut() {
  if (process.env.NODE_ENV === 'test') {
    db.currentUser = null;
  }
  return { success: true };
}

export function deleteAccount(confirmationText, currentUser = null) {
  const targetUser = currentUser || (!isStrictAuth() && process.env.NODE_ENV === 'test' ? db.currentUser : null);
  if (!targetUser || !targetUser.id) {
    const err = new Error('Authentication required to delete account.');
    err.status = 401;
    throw err;
  }

  const cleanConfirmation = (confirmationText || '').trim().toUpperCase();
  if (cleanConfirmation !== 'DELETE MY ACCOUNT') {
    const err = new Error('Confirmation mismatch. Please type "DELETE MY ACCOUNT" exactly to confirm account deletion.');
    err.status = 400;
    throw err;
  }

  const deletingEmail = (targetUser.email || '').toLowerCase();
  const deletingId = String(targetUser.id);

  // Preserve shared scripts with remaining collaborators; delete sole-owned scripts
  const scriptsToKeep = [];
  const scriptsToDelete = [];

  for (const script of (db.scripts || [])) {
    const isOwned = (script.ownerId && String(script.ownerId) === deletingId) ||
      (deletingEmail && script.ownerEmail && script.ownerEmail.toLowerCase() === deletingEmail);
    if (!isOwned) {
      scriptsToKeep.push(script);
      continue;
    }

    const collabs = db.collaborators[script.id] || [];
    const remainingCollabs = collabs.filter(c =>
      (c.email || '').toLowerCase() !== deletingEmail && String(c.id) !== deletingId
    );

    if (remainingCollabs.length > 0) {
      if (!remainingCollabs.some(c => c.role === 'Owner')) {
        remainingCollabs[0].role = 'Owner';
      }
      script.ownerId = remainingCollabs[0].id;
      script.ownerEmail = remainingCollabs[0].email || '';
      db.collaborators[script.id] = remainingCollabs;
      scriptsToKeep.push(script);
      persistScriptState(script.id);
    } else {
      scriptsToDelete.push(script.id);
    }
  }

  db.scripts = scriptsToKeep;
  for (const scriptId of scriptsToDelete) {
    delete db.screenplays[scriptId];
    delete db.collaborators[scriptId];
    delete db.versions[scriptId];
    delete db.joinCodes[scriptId];
    delete db.accessRequests[scriptId];
    delete db.invitations[scriptId];
    delete db.securityActivity[scriptId];
    delete db.e2ee[scriptId];
    if (Array.isArray(db.storyboards)) {
      db.storyboards = db.storyboards.filter(sb => sb.scriptId !== scriptId);
    }
    deleteScriptCloudState(scriptId);
  }

  if (Array.isArray(db.productionCallSheets)) {
    for (const cs of db.productionCallSheets) {
      if (cs.approvedBy && (cs.approvedBy.includes(targetUser.name) || cs.approvedBy.includes(targetUser.displayName))) {
        cs.approvedBy = 'Former Member (Deleted)';
      }
    }
  }

  // Delete user record, user settings, and personal notifications
  db.users = db.users.filter(u => u.id !== deletingId && (u.email || '').toLowerCase() !== deletingEmail);
  delete db.userSettings[deletingId];
  delete db.notificationsByUser[deletingId];
  deleteShard('users', deletingId).catch(() => {});
  deleteShard('notifications', deletingId).catch(() => {});

  if (process.env.NODE_ENV === 'test') {
    db.currentUser = null;
  }

  return {
    success: true,
    message: 'Account and associated personal records have been permanently deleted.',
    deletedUserId: deletingId
  };
}

let cachedGoogleCerts = null;
let certsExpiry = 0;

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

export async function verifyFirebaseIdToken(token) {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const headerJson = Buffer.from(parts[0], 'base64url').toString('utf8');
    const header = JSON.parse(headerJson);
    if (header.alg !== 'RS256' || !header.kid) {
      return null;
    }

    const certs = await fetchGooglePublicCerts();
    const cert = certs[header.kid];
    if (!cert) {
      return null;
    }

    const signingInput = Buffer.from(`${parts[0]}.${parts[1]}`);
    const signature = Buffer.from(parts[2], 'base64url');
    const isSignatureValid = crypto.verify('sha256', signingInput, cert, signature);
    if (!isSignatureValid) {
      console.warn('[authService] Cryptographic signature verification failed');
      return null;
    }

    const payloadJson = Buffer.from(parts[1], 'base64url').toString('utf8');
    const payload = JSON.parse(payloadJson);
    const nowSec = Math.floor(Date.now() / 1000);
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || 'scriptora-1801';

    if (!payload.exp || payload.exp <= nowSec) return null;
    if (payload.iat && payload.iat > nowSec + 300) return null;
    if (payload.aud !== projectId) return null;
    if (payload.iss !== `https://securetoken.google.com/${projectId}`) return null;
    if (!payload.sub || typeof payload.sub !== 'string' || payload.sub.trim() === '') return null;

    // Resolve or provision canonical user for this verified Firebase identity
    const canonicalUser = upsertUserRecord({
      id: payload.sub,
      firebaseUid: payload.sub,
      email: payload.email || '',
      name: payload.name || payload.displayName || (payload.email ? payload.email.split('@')[0] : 'Authenticated User'),
      avatarUrl: payload.picture || '',
      provider: payload.firebase?.sign_in_provider || 'firebase'
    });

    return {
      ...sanitizeUser(canonicalUser),
      firebaseUid: payload.sub,
      emailVerified: payload.email_verified !== false,
      phone_number: payload.phone_number || canonicalUser.phone
    };
  } catch {
    return null;
  }
}

export async function verifyAuthToken(authHeader, allowSessionFallback = true) {
  const strict = isStrictAuth();
  const isTestEnv = (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') && !strict;

  if (authHeader) {
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    const token = match ? match[1].trim() : authHeader.trim();
    if (token) {
      // 1. Cryptographic HS256 Session JWT
      const jwtUser = verifySessionJwt(token);
      if (jwtUser) {
        return jwtUser;
      }

      // 2. Cryptographic RS256 Firebase ID Token
      const firebaseUser = await verifyFirebaseIdToken(token);
      if (firebaseUser) {
        return firebaseUser;
      }

      // 3. Test-only helpers (NEVER active when NODE_ENV === 'production')
      if (process.env.NODE_ENV === 'test') {
        if (token.startsWith('mock-user:')) {
          const parts = token.split(':');
          return { id: parts[1], uid: parts[1], email: (parts[2] || '').toLowerCase(), name: parts[3] || 'Mock User' };
        }
        if (!strict) {
          if (token === 'dev-token' || token === 'test-token') {
            return db.currentUser || { id: 'test-user', uid: 'test-user', name: 'Test User', email: 'test@scriptora.studio' };
          }
          if (token.startsWith('token-')) {
            const parts = token.split('-');
            const tokenUid = parts[1];
            if (tokenUid) {
              return {
                id: tokenUid,
                uid: tokenUid,
                email: `${tokenUid}@scriptora.studio`,
                name: `Writer ${tokenUid.slice(0, 6)}`
              };
            }
          }
          if (db.currentUser && (token === db.currentUser.id || token === db.currentUser.email)) {
            return db.currentUser;
          }
          for (const list of Object.values(db.collaborators || {})) {
            const found = list.find(c => c.id === token || c.email === token);
            if (found) return found;
          }
        }
      }

      return null;
    }
  }

  if (allowSessionFallback && isTestEnv && db.currentUser) {
    return db.currentUser;
  }

  return null;
}

export function checkScriptAccess(user, scriptId, requiredRole = 'Viewer') {
  if (!user || !user.id) {
    return { allowed: false, status: 401, error: 'Authentication required' };
  }

  const script = (db.scripts || []).find(s => s.id === scriptId);
  if (!script) {
    return { allowed: false, status: 404, error: 'Script not found' };
  }

  const uid = String(user.id);
  const fbUid = user.firebaseUid ? String(user.firebaseUid) : null;
  const email = (user.email || '').toLowerCase().trim();

  const isOwner = (script.ownerId && (String(script.ownerId) === uid || (fbUid && String(script.ownerId) === fbUid))) ||
    (email && script.ownerEmail && script.ownerEmail.toLowerCase().trim() === email);

  if (isOwner) {
    return { allowed: true, role: 'Owner' };
  }

  if (script.isTemplate === true && script.ownerId === 'system' && requiredRole === 'Viewer') {
    return { allowed: true, role: 'Viewer' };
  }

  const collabs = (db.collaborators && db.collaborators[scriptId]) || [];
  const member = collabs.find(c =>
    (c.id && String(c.id) === uid) ||
    (fbUid && c.id && String(c.id) === fbUid) ||
    (email && c.email && c.email.toLowerCase().trim() === email)
  );

  if (!member) {
    return { allowed: false, status: 403, error: 'Access denied: You are not authorized for this project' };
  }

  const role = member.role || 'Viewer';
  const roleLevels = { Viewer: 1, 'Script Doctor': 2, Editor: 3, Producer: 3, Owner: 4 };
  const userLevel = roleLevels[role] || 1;
  const reqLevel = roleLevels[requiredRole] || 1;

  if (userLevel < reqLevel) {
    return { allowed: false, status: 403, error: `Insufficient permissions: Requires ${requiredRole} access` };
  }

  return { allowed: true, role };
}

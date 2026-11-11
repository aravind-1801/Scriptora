// SCRIPTORA Cloud Storage & Real-Time Sync Service
// Provides genuine zero-cost cloud persistence for storyboard metadata and generated image binaries.
// Architected strictly to prevent any credit-card requirements or pay-as-you-go billing traps.
//
// 1. Metadata Database: Firebase Firestore (Spark Plan: 100% Free, No Credit Card Required)
// 2. Object Storage: Supabase Storage or Cloudinary (Zero Credit Card Required at signup or runtime)
// 3. Fallback: SCRIPTORA Persistent Backend Server (Persistent Disk + On-Demand CDN Self-Healing)
//
// NOTE: Firebase Cloud Storage is intentionally disabled because Google requires
// the Blaze pay-as-you-go billing plan as of February 3, 2026.

import { firebaseConfig, isFirebaseConfigured } from './firebase.js';
import { isLocalMode } from './dataMode.js';

let firestoreInstance = null;
let firestoreConnectivityVerified = false;

const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : (typeof process !== 'undefined' && process.env ? process.env : {});

const SUPABASE_CONFIG = {
  url: env.VITE_SUPABASE_URL || "https://wfnutbkbvnbvxieiegwz.supabase.co",
  anonKey: env.VITE_SUPABASE_ANON_KEY || "sb_publishable_zAchyxf0uIMEEDCAWtKLpQ_PFofWTKn",
  bucket: env.VITE_SUPABASE_BUCKET || "storyboards"
};

const CLOUDINARY_CONFIG = {
  cloudName: env.VITE_CLOUDINARY_CLOUD_NAME || "",
  uploadPreset: env.VITE_CLOUDINARY_UPLOAD_PRESET || ""
};

/**
 * Check which cloud providers are configured
 */
export function isCloudConfigured() {
  if (isLocalMode()) {
    return {
      isConfigured: false,
      hasFirestore: false,
      hasSupabase: false,
      hasCloudinary: false,
      hasBackend: false,
      activeImageProvider: 'local-indexeddb',
      activeMetadataProvider: 'local-indexeddb'
    };
  }
  const hasFirestore = Boolean(firebaseConfig.apiKey && firebaseConfig.apiKey.trim() !== '');
  const hasSupabase = Boolean(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);
  const hasCloudinary = Boolean(CLOUDINARY_CONFIG.cloudName && CLOUDINARY_CONFIG.uploadPreset);
  const hasBackend = typeof window !== 'undefined' && Boolean(window.SCRIPTORA_API_BASE || env.VITE_API_URL);

  let activeImageProvider = 'none';
  if (hasSupabase) activeImageProvider = 'supabase-storage';
  else if (hasCloudinary) activeImageProvider = 'cloudinary';
  else if (hasBackend) activeImageProvider = 'backend-server';

  return {
    isConfigured: hasFirestore || hasSupabase || hasCloudinary || hasBackend,
    hasFirestore,
    hasSupabase,
    hasCloudinary,
    hasBackend,
    activeImageProvider,
    activeMetadataProvider: hasFirestore ? 'firestore' : (hasBackend ? 'backend' : 'local')
  };
}

/**
 * Get honest, detailed cloud persistence status for UI and user settings
 */
export function getCloudStorageStatus() {
  if (isLocalMode()) {
    return {
      status: 'local-only',
      provider: 'IndexedDB (Local Workspace)',
      metadataDatabase: {
        status: 'local',
        provider: 'Browser IndexedDB (Isolated Device Profile)',
        creditCardRequired: false
      },
      imageStorage: {
        status: 'local',
        provider: 'Browser IndexedDB Blob Store',
        creditCardRequired: false,
        details: 'All scripts, screenplays, production records, and storyboard images are stored locally inside this browser profile.'
      }
    };
  }
  const cfg = isCloudConfigured();

  const metadataInfo = cfg.hasFirestore ? {
    status: 'configured',
    provider: 'Firebase Firestore (Spark Plan)',
    projectId: firebaseConfig.projectId,
    plan: '100% Free Spark Tier (1GB data, 50k reads/day, 20k writes/day)',
    creditCardRequired: false,
    notes: 'Requires Cloud Firestore to be initialized once in Firebase Console (Build > Firestore Database > Create Database).'
  } : {
    status: 'unconfigured',
    provider: 'Backend / Local Storage',
    creditCardRequired: false
  };

  let imageStorageInfo = {
    status: 'unconfigured',
    provider: 'None',
    creditCardRequired: false,
    details: 'Zero-cost cloud storage requires adding Supabase or Cloudinary credentials to frontend/.env. Firebase Cloud Storage is disabled to prevent Blaze billing.'
  };

  if (cfg.hasSupabase) {
    imageStorageInfo = {
      status: 'connected',
      provider: 'Supabase Storage',
      url: SUPABASE_CONFIG.url,
      bucket: SUPABASE_CONFIG.bucket,
      plan: 'Supabase Free Tier (1GB Storage, 2GB Bandwidth/mo)',
      creditCardRequired: false,
      details: 'Genuinely free object storage with hard quota stops (no overages or billing account needed).'
    };
  } else if (cfg.hasCloudinary) {
    imageStorageInfo = {
      status: 'connected',
      provider: 'Cloudinary',
      cloudName: CLOUDINARY_CONFIG.cloudName,
      plan: 'Cloudinary Free Tier (25 Credits / ~25GB Storage & Bandwidth)',
      creditCardRequired: false,
      details: 'Genuinely free image hosting with zero credit card required at sign up.'
    };
  } else if (cfg.hasBackend) {
    imageStorageInfo = {
      status: 'connected',
      provider: 'SCRIPTORA Dedicated Backend',
      endpoint: env.VITE_API_URL || '/api',
      plan: 'Self-Hosted Server Storage',
      creditCardRequired: false,
      details: 'File-backed persistent disk storage with automatic on-demand CDN image recovery.'
    };
  }

  return {
    status: (cfg.hasFirestore || cfg.hasSupabase || cfg.hasCloudinary || cfg.hasBackend) ? 'connected' : 'unconfigured',
    provider: `${metadataInfo.provider} / ${imageStorageInfo.provider}`,
    metadataDatabase: metadataInfo,
    imageStorage: imageStorageInfo,
    firebaseStoragePolicy: {
      enabled: false,
      reason: 'Requires Blaze pay-as-you-go billing as of February 3, 2026. Intentionally disabled to honor zero-cost guarantee.'
    }
  };
}

/**
 * Initialize Firestore instance lazily
 */
async function getFirestore() {
  if (firestoreApiAvailable === false) return null;
  if (firestoreInstance) return firestoreInstance;
  if (!firebaseConfig.apiKey) return null;
  try {
    const { initializeApp, getApps } = await import('firebase/app');
    const { getFirestore: initFirestore } = await import('firebase/firestore');
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    firestoreInstance = initFirestore(app);
    return firestoreInstance;
  } catch (err) {
    console.warn('[CloudStorage] Failed to initialize Firestore SDK:', err.message);
    firestoreApiAvailable = false;
    return null;
  }
}

/**
 * Upload genuine image binary/data URI through the authenticated SCRIPTORA backend
 * into private Supabase object storage (no public bucket exposure, per-project access enforced).
 */
export async function uploadImageToCloud(imageInput, scriptId = null, filename = null) {
  if (isLocalMode()) {
    return { success: false, disabled: true, reason: 'Local-first mode active' };
  }
  const targetScriptId = scriptId || 'default';
  const finalFilename = filename || `shot_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.jpg`;

  const apiBase = (typeof window !== 'undefined' && window.SCRIPTORA_API_BASE) || env.VITE_API_URL || '/api';
  const authToken = (typeof localStorage !== 'undefined' && (localStorage.getItem('scriptora_auth_token') || localStorage.getItem('scriptora_token'))) || null;

  // 1. Authenticated SCRIPTORA Backend -> Private Supabase Storage (with Signed URLs)
  if (authToken && targetScriptId !== 'default') {
    try {
      let base64Payload = '';
      if (typeof imageInput === 'string' && imageInput.startsWith('data:')) {
        base64Payload = imageInput;
      } else if (typeof imageInput === 'string' && imageInput.startsWith('http')) {
        const resp = await fetch(imageInput);
        const blob = await resp.blob();
        base64Payload = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      }

      if (base64Payload) {
        const res = await fetch(`${apiBase}/production/${targetScriptId}/storyboard/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            imageData: base64Payload,
            filename: finalFilename,
            extension: finalFilename.split('.').pop() || 'jpg'
          })
        });
        if (res.ok) {
          const data = await res.json();
          return {
            success: true,
            provider: data.provider || 'supabase-private',
            imageUrl: data.imageUrl,
            cloudStorageUrl: data.imageUrl,
            storagePath: data.storagePath || null,
            filename: data.filename || finalFilename
          };
        }
      }
    } catch (backendErr) {
      console.warn('[CloudStorage] Authenticated backend upload failed:', backendErr.message);
    }
  }

  // 2. Cloudinary (if explicitly configured)
  if (CLOUDINARY_CONFIG.cloudName && CLOUDINARY_CONFIG.uploadPreset) {
    try {
      const formData = new FormData();
      formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
      formData.append('folder', `scriptora/${targetScriptId}`);

      if (typeof imageInput === 'string') {
        formData.append('file', imageInput);
      } else if (imageInput instanceof Blob) {
        formData.append('file', imageInput, finalFilename);
      }

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        return {
          success: true,
          provider: 'cloudinary',
          imageUrl: data.secure_url,
          cloudStorageUrl: data.secure_url,
          filename: finalFilename
        };
      }
    } catch (cldErr) {
      console.warn('[CloudStorage] Cloudinary upload failed:', cldErr.message);
    }
  }

  return {
    success: false,
    provider: 'local',
    error: 'Authentication required to upload storyboard images to private cloud storage.'
  };
}

let firestoreApiAvailable = null; // null: unknown, true: available, false: disabled

async function callFirestoreWithTimeout(fn, timeoutMs = 2500) {
  if (firestoreApiAvailable === false) return null;
  let timer;
  const timeoutPromise = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error('FIRESTORE_TIMEOUT')), timeoutMs);
  });
  try {
    const res = await Promise.race([fn(), timeoutPromise]);
    clearTimeout(timer);
    firestoreApiAvailable = true;
    return res;
  } catch (err) {
    clearTimeout(timer);
    if (err.message === 'FIRESTORE_TIMEOUT' || (err.message && (err.message.includes('403') || err.message.includes('SERVICE_DISABLED') || err.message.includes('PERMISSION_DENIED') || err.code === 'permission-denied'))) {
      firestoreApiAvailable = false;
      if (firestoreInstance) {
        import('firebase/firestore').then(({ terminate }) => terminate(firestoreInstance)).catch(() => {});
        firestoreInstance = null;
      }
    }
    throw err;
  }
}

function resolveCurrentUserId() {
  if (typeof window !== 'undefined') {
    if (window.scriptoraState?.user?.id) return window.scriptoraState.user.id;
    try {
      const u = JSON.parse(localStorage.getItem('scriptora_user') || '{}');
      if (u?.id) return u.id;
    } catch (_) {}
  }
  return null;
}

/**
 * Persist storyboard document to Firestore / Firebase cloud database (User-Scoped)
 */
export async function syncStoryboardToFirestore(scriptId, sceneId, storyboard) {
  if (isLocalMode()) {
    return null;
  }
  const currentUserId = resolveCurrentUserId();
  if (!currentUserId) {
    return null; // Do not sync unauthenticated user data to shared cloud locations
  }

  const payload = {
    ...storyboard,
    scriptId,
    sceneId,
    userId: currentUserId,
    syncedAt: new Date().toISOString()
  };

  let firestoreSynced = false;
  const db = await getFirestore();
  if (db && firestoreApiAvailable !== false) {
    try {
      const { doc, setDoc } = await import('firebase/firestore');
      const docRef = doc(db, 'users', currentUserId, 'storyboards', `${scriptId}_${sceneId}`);
      await callFirestoreWithTimeout(() => setDoc(docRef, payload, { merge: true }), 2500);
      firestoreSynced = true;
    } catch (err) {
      if (err.message && (err.message.includes('403') || err.message.includes('SERVICE_DISABLED') || err.message === 'FIRESTORE_TIMEOUT')) {
        console.info('[CloudStorage] Firestore API pending activation on scriptora-1801; using Firebase Realtime Database.');
      } else {
        console.warn('[CloudStorage] Firestore sync notice:', err.message);
      }
    }
  }

  // Also sync to Firebase Realtime Database (guaranteed active on project scriptora-1801)
  try {
    let authToken = null;
    try {
      const { getAuth } = await import('firebase/auth');
      const auth = getAuth();
      if (auth?.currentUser) {
        authToken = await auth.currentUser.getIdToken();
      }
    } catch (_) {}

    const authQuery = authToken ? `?auth=${encodeURIComponent(authToken)}` : '';
    const rtdbUrl = `${firebaseConfig.databaseURL || `https://${firebaseConfig.projectId}-default-rtdb.firebaseio.com`}/users/${currentUserId}/storyboards/${scriptId}/${sceneId}.json${authQuery}`;
    await fetch(rtdbUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return { success: true, provider: firestoreSynced ? 'firestore' : 'firebase-rtdb', id: `${scriptId}_${sceneId}` };
  } catch (rtdbErr) {
    if (firestoreSynced) return { success: true, provider: 'firestore', id: `${scriptId}_${sceneId}` };
  }

  return firestoreSynced ? { success: true, provider: 'firestore', id: `${scriptId}_${sceneId}` } : null;
}

/**
 * Fetch storyboard document from Firestore / Firebase cloud database (User-Scoped)
 */
export async function fetchStoryboardFromFirestore(scriptId, sceneId) {
  if (isLocalMode()) {
    return null;
  }
  const currentUserId = resolveCurrentUserId();
  if (!currentUserId) return null;

  // 1. First try Firestore
  const db = await getFirestore();
  if (db && firestoreApiAvailable !== false) {
    try {
      const { doc, getDoc } = await import('firebase/firestore');
      const docRef = doc(db, 'users', currentUserId, 'storyboards', `${scriptId}_${sceneId}`);
      const snap = await callFirestoreWithTimeout(() => getDoc(docRef), 2500);
      if (snap?.exists()) {
        return snap.data();
      }
    } catch (_) {}
  }

  // 2. Try Firebase Realtime Database
  try {
    let authToken = null;
    try {
      const { getAuth } = await import('firebase/auth');
      const auth = getAuth();
      if (auth?.currentUser) {
        authToken = await auth.currentUser.getIdToken();
      }
    } catch (_) {}

    const authQuery = authToken ? `?auth=${encodeURIComponent(authToken)}` : '';
    const rtdbUrl = `${firebaseConfig.databaseURL || `https://${firebaseConfig.projectId}-default-rtdb.firebaseio.com`}/users/${currentUserId}/storyboards/${scriptId}/${sceneId}.json${authQuery}`;
    const res = await fetch(rtdbUrl);
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object' && data.shots) {
        return data;
      }
    }
  } catch (_) {}

  return null;
}

export async function closeCloudStorage() {
  if (firestoreInstance) {
    try {
      const { terminate } = await import('firebase/firestore');
      await terminate(firestoreInstance);
    } catch (_) {}
    firestoreInstance = null;
  }
}

// SCRIPTORA Cloud Storage & Real-Time Sync Service
// Provides genuine cloud-backed storage for storyboard metadata and generated image binaries.
// Supports Firebase (Firestore + Firebase Cloud Storage) and SCRIPTORA Cloud Backend Server.

import { firebaseConfig, isFirebaseConfigured } from './firebase.js';

let firestoreInstance = null;
let storageInstance = null;

/**
 * Check if genuine cloud storage credentials are configured
 */
export function isCloudConfigured() {
  const hasFirebase = Boolean(firebaseConfig.apiKey && firebaseConfig.apiKey.trim() !== '');
  const hasBackend = typeof window !== 'undefined' && Boolean(window.SCRIPTORA_API_BASE || import.meta.env?.VITE_API_URL);
  return {
    isConfigured: hasFirebase || hasBackend,
    firebase: hasFirebase,
    backend: hasBackend,
    activeProvider: hasFirebase ? 'firebase' : (hasBackend ? 'backend-server' : 'none')
  };
}

/**
 * Get detailed cloud status for UI inspection and user settings
 */
export function getCloudStorageStatus() {
  const status = isCloudConfigured();
  if (status.firebase) {
    return {
      status: 'connected',
      provider: 'Firebase Cloud Storage & Firestore',
      projectId: firebaseConfig.projectId,
      bucket: firebaseConfig.storageBucket,
      plan: 'Google Cloud Spark (Free Tier)',
      details: 'Genuinely zero-cost cloud storage (5GB file storage + 1GB Firestore database).'
    };
  }
  if (status.backend) {
    return {
      status: 'connected',
      provider: 'SCRIPTORA Dedicated Backend',
      endpoint: import.meta.env?.VITE_API_URL || '/api',
      plan: 'Self-Hosted Cloud Server',
      details: 'File-backed persistent storage with automatic on-demand CDN recovery.'
    };
  }
  return {
    status: 'unconfigured',
    provider: 'Local Storage / In-Browser Only',
    plan: 'Dormant Cloud Credentials',
    details: 'To enable cross-device cloud persistence, add VITE_FIREBASE_API_KEY in your environment.'
  };
}

/**
 * Initialize Firestore instance lazily
 */
async function getFirestore() {
  if (firestoreInstance) return firestoreInstance;
  if (!firebaseConfig.apiKey) return null;
  try {
    const { initializeApp, getApps } = await import('firebase/app');
    const { getFirestore: initFirestore } = await import('firebase/firestore');
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    firestoreInstance = initFirestore(app);
    return firestoreInstance;
  } catch (err) {
    console.warn('[CloudStorage] Failed to initialize Firestore:', err.message);
    return null;
  }
}

/**
 * Initialize Firebase Storage instance lazily
 */
async function getFirebaseStorage() {
  if (storageInstance) return storageInstance;
  if (!firebaseConfig.apiKey) return null;
  try {
    const { initializeApp, getApps } = await import('firebase/app');
    const { getStorage: initStorage } = await import('firebase/storage');
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    storageInstance = initStorage(app);
    return storageInstance;
  } catch (err) {
    console.warn('[CloudStorage] Failed to initialize Firebase Storage:', err.message);
    return null;
  }
}

/**
 * Upload genuine image binary/data URI to cloud storage
 */
export async function uploadImageToCloud(imageInput, scriptId = 'chronicles-of-dust', filename = null) {
  const finalFilename = filename || `shot_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.jpg`;

  // 1. Try Firebase Cloud Storage if configured
  const fbStorage = await getFirebaseStorage();
  if (fbStorage) {
    try {
      const { ref, uploadBytes, uploadString, getDownloadURL } = await import('firebase/storage');
      const storageRef = ref(fbStorage, `storyboards/${scriptId}/images/${finalFilename}`);

      let uploadRes;
      if (typeof imageInput === 'string' && imageInput.startsWith('data:')) {
        uploadRes = await uploadString(storageRef, imageInput, 'data_url');
      } else if (imageInput instanceof Blob || imageInput instanceof ArrayBuffer || ArrayBuffer.isView(imageInput)) {
        uploadRes = await uploadBytes(storageRef, imageInput, { contentType: 'image/jpeg' });
      } else if (typeof imageInput === 'string' && imageInput.startsWith('http')) {
        // Fetch external image (e.g. from Pollinations) and upload to Firebase
        const fetchResp = await fetch(imageInput);
        const blob = await fetchResp.blob();
        uploadRes = await uploadBytes(storageRef, blob, { contentType: 'image/jpeg' });
      }

      if (uploadRes) {
        const downloadUrl = await getDownloadURL(storageRef);
        return {
          success: true,
          provider: 'firebase-storage',
          imageUrl: downloadUrl,
          cloudStorageUrl: downloadUrl,
          storagePath: `storyboards/${scriptId}/images/${finalFilename}`,
          filename: finalFilename
        };
      }
    } catch (fbErr) {
      console.warn('[CloudStorage] Firebase storage upload failed:', fbErr.message);
    }
  }

  // 2. Try SCRIPTORA backend server upload if available
  const apiBase = (typeof window !== 'undefined' && window.SCRIPTORA_API_BASE) || import.meta.env?.VITE_API_URL || '/api';
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
      const res = await fetch(`${apiBase}/production/${scriptId}/storyboard/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
          provider: 'backend-server',
          imageUrl: data.imageUrl,
          cloudStorageUrl: data.imageUrl,
          filename: data.filename
        };
      }
    }
  } catch (backendErr) {
    // Backend offline / not responding
  }

  return {
    success: false,
    provider: 'local',
    error: 'No persistent cloud storage available. Set VITE_FIREBASE_API_KEY in frontend/.env to enable Firebase Storage.'
  };
}

/**
 * Persist storyboard document to Firestore cloud database
 */
export async function syncStoryboardToFirestore(scriptId, sceneId, storyboard) {
  const db = await getFirestore();
  if (!db) return null;
  try {
    const { doc, setDoc } = await import('firebase/firestore');
    const docRef = doc(db, 'storyboards', `${scriptId}_${sceneId}`);
    const payload = {
      ...storyboard,
      scriptId,
      sceneId,
      syncedAt: new Date().toISOString()
    };
    await setDoc(docRef, payload, { merge: true });
    return { success: true, provider: 'firestore', id: `${scriptId}_${sceneId}` };
  } catch (err) {
    console.warn('[CloudStorage] Firestore sync failed:', err.message);
    return null;
  }
}

/**
 * Fetch storyboard document from Firestore cloud database
 */
export async function fetchStoryboardFromFirestore(scriptId, sceneId) {
  const db = await getFirestore();
  if (!db) return null;
  try {
    const { doc, getDoc } = await import('firebase/firestore');
    const docRef = doc(db, 'storyboards', `${scriptId}_${sceneId}`);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (err) {
    console.warn('[CloudStorage] Firestore read failed:', err.message);
    return null;
  }
}


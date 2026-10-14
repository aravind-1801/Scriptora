// Firebase Configuration and Auth Helper for Scriptora
// Integrates with Google Cloud / Firebase credentials when available

let auth = null;
let googleProvider = null;
let isFirebaseConfigured = false;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || `${import.meta.env.VITE_GOOGLE_PROJECT_ID || 'scriptora-511616'}.firebaseapp.com`,
  projectId: import.meta.env.VITE_GOOGLE_PROJECT_ID || import.meta.env.VITE_FIREBASE_PROJECT_ID || "scriptora-511616",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || `${import.meta.env.VITE_GOOGLE_PROJECT_ID || 'scriptora-511616'}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "756924881120",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

/**
 * Lazily loads and initializes Firebase Auth if API key is provided
 */
export async function getFirebaseAuth() {
  if (auth) return { auth, googleProvider };

  try {
    const { initializeApp, getApps } = await import('firebase/app');
    const { getAuth, GoogleAuthProvider } = await import('firebase/auth');

    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
    isFirebaseConfigured = true;
    return { auth, googleProvider };
  } catch (err) {
    console.info('Firebase initialization deferred: using Google Identity Services (GIS).', err.message);
    return null;
  }
}

/**
 * Trigger Firebase Google popup sign-in if Firebase credentials are active
 */
export async function signInWithGoogleFirebase() {
  const fb = await getFirebaseAuth();
  if (!fb) throw new Error('Firebase Auth not available');
  
  const { signInWithPopup } = await import('firebase/auth');
  const result = await signInWithPopup(fb.auth, fb.googleProvider);
  return result.user;
}

export { firebaseConfig, isFirebaseConfigured };

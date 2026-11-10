import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBP-A_C-stn7hDu8GEvrJ-CsarTAKOBkrc",
  authDomain: "scriptora-1801.firebaseapp.com",
  projectId: "scriptora-1801",
  storageBucket: "scriptora-1801.firebasestorage.app",
  messagingSenderId: "971249636867",
  appId: "1:971249636867:web:2a11f1738592a3020b6036",
  measurementId: "G-8PM7S7F91C"
};

async function testLiveFirestore() {
  console.log('[TEST] Initializing Firebase with project:', firebaseConfig.projectId);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  let user = null;
  try {
    console.log('[TEST] Attempting Anonymous Authentication...');
    const authRes = await signInAnonymously(auth);
    user = authRes.user;
    console.log('✓ Firebase Auth: Anonymous sign-in succeeded! UID:', user.uid);
  } catch (authErr) {
    console.log('Notice on Auth (anonymous might be disabled in console):', authErr.code, authErr.message);
  }

  const testDocId = `test_verification_${Date.now()}`;
  const testRef = doc(db, 'storyboards', testDocId);

  console.log('[TEST 1] Attempting to write sample storyboard metadata to Firestore doc:', testDocId);
  const sampleData = {
    scriptId: 'test-script-1',
    sceneId: 'scene-1',
    title: 'Live Firestore Verification Shot',
    shots: [
      {
        id: 'shot-1',
        title: 'Opening Panorama',
        prompt: 'A wide cinematic shot of a sunset over the salt flats',
        aspectRatio: '16:9',
        visualStyle: 'Cinematic Concept Art',
        status: 'approved'
      }
    ],
    userId: user ? user.uid : 'test-user-id',
    createdAt: new Date().toISOString()
  };

  try {
    await setDoc(testRef, sampleData);
    console.log('✓ Step 1 & 2 PASSED: Successfully wrote storyboard metadata to Firestore.');

    console.log('[TEST 3] Reading document back from Firestore...');
    const snap = await getDoc(testRef);
    if (!snap.exists()) {
      throw new Error('Document does not exist after writing!');
    }
    const retrieved = snap.data();
    console.log('✓ Step 3 PASSED: Document retrieved. Title:', retrieved.title, 'Shots count:', retrieved.shots.length);

    console.log('[TEST 4] Updating document contents...');
    await updateDoc(testRef, {
      title: 'Updated Live Verification Shot',
      updatedAt: new Date().toISOString()
    });
    console.log('✓ Step 4 PASSED: Document update succeeded.');

    console.log('[TEST 5] Verifying updated values...');
    const updatedSnap = await getDoc(testRef);
    const updatedData = updatedSnap.data();
    if (updatedData.title !== 'Updated Live Verification Shot') {
      throw new Error(`Title mismatch! Expected 'Updated Live Verification Shot', got '${updatedData.title}'`);
    }
    console.log('✓ Step 5 PASSED: Verified updated values in Firestore.');

    console.log('[TEST 6] Deleting temporary test document...');
    await deleteDoc(testRef);
    const deletedSnap = await getDoc(testRef);
    if (deletedSnap.exists()) {
      throw new Error('Document still exists after deletion!');
    }
    console.log('✓ Step 6 PASSED: Verified deletion from Firestore.');

    console.log('\n======================================================');
    console.log('🎉 ALL LIVE FIRESTORE CRUD OPERATIONS PASSED 100%!');
    console.log('======================================================');
    return true;
  } catch (firestoreErr) {
    console.error('\n✗ Firestore Operation Failed:');
    console.error('Code:', firestoreErr.code);
    console.error('Message:', firestoreErr.message);
    return false;
  }
}

testLiveFirestore().then(success => {
  process.exit(success ? 0 : 1);
});


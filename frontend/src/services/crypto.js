/**
 * SCRIPTORA End-to-End Encryption (E2EE) Module
 * 
 * Standards-compliant client-side cryptography built on the Web Crypto API:
 * - Content Encryption: AES-256-GCM (Authenticated Encryption with 96-bit random IVs)
 * - User Identity & Key Agreement: ECDH (P-256) / AES-KW for wrapping screenplay keys
 * - Tamper Verification: GCM tag validation built into Web Crypto subtle decrypt
 * - Zero Knowledge: Screenplay content keys and private keys NEVER touch the server unencrypted
 */

const DB_NAME = 'scriptora_e2ee_vault';
const STORE_NAME = 'device_keypairs';

// 1. IndexedDB Helper for Protected Local Key Storage
function openVaultDB() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      return resolve(null);
    }
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'keyId' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null); // graceful fallback to memory/session
  });
}

async function saveDeviceKeyPair(userEmail, keyPairJwk) {
  try {
    const db = await openVaultDB();
    if (!db) {
      sessionStorage.setItem(`scriptora_keypair_${userEmail}`, JSON.stringify(keyPairJwk));
      return;
    }
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put({ keyId: `user_${userEmail}`, ...keyPairJwk, updatedAt: Date.now() });
    await new Promise((res) => { tx.oncomplete = res; });
  } catch (e) {
    sessionStorage.setItem(`scriptora_keypair_${userEmail}`, JSON.stringify(keyPairJwk));
  }
}

async function loadDeviceKeyPair(userEmail) {
  try {
    const db = await openVaultDB();
    if (!db) {
      const saved = sessionStorage.getItem(`scriptora_keypair_${userEmail}`);
      return saved ? JSON.parse(saved) : null;
    }
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(`user_${userEmail}`);
    const res = await new Promise((resolve) => {
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    });
    if (res) return res;
    const saved = sessionStorage.getItem(`scriptora_keypair_${userEmail}`);
    return saved ? JSON.parse(saved) : null;
  } catch {
    const saved = sessionStorage.getItem(`scriptora_keypair_${userEmail}`);
    return saved ? JSON.parse(saved) : null;
  }
}

// 2. Base64 & Binary Helpers
export function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function base64ToArrayBuffer(base64) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// 3. User Identity ECDH Key Pair
export async function getOrCreateUserDeviceKeyPair(userEmail) {
  if (!window.crypto?.subtle) {
    throw new Error('Web Crypto API is not supported in this environment.');
  }

  const existing = await loadDeviceKeyPair(userEmail);
  if (existing?.publicKeyJwk && existing?.privateKeyJwk) {
    return existing;
  }

  // Generate new ECDH P-256 keypair for secure key agreement
  const keyPair = await window.crypto.subtle.generateKey(
    { name: 'ECDH', namedCurve: 'P-256' },
    true, // extractable so we can export public JWK to share with owners
    ['deriveKey', 'deriveBits']
  );

  const publicKeyJwk = await window.crypto.subtle.exportKey('jwk', keyPair.publicKey);
  const privateKeyJwk = await window.crypto.subtle.exportKey('jwk', keyPair.privateKey);

  const bundle = { publicKeyJwk, privateKeyJwk };
  await saveDeviceKeyPair(userEmail, bundle);
  return bundle;
}

// 4. Per-Screenplay AES-256-GCM Master Key
export async function generateScreenplayKey() {
  if (!window.crypto?.subtle) {
    throw new Error('Web Crypto API is required for E2EE.');
  }
  return await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
}

export async function exportRawKeyBase64(cryptoKey) {
  const raw = await window.crypto.subtle.exportKey('raw', cryptoKey);
  return arrayBufferToBase64(raw);
}

export async function importRawKeyFromBase64(base64Key) {
  const rawBuffer = base64ToArrayBuffer(base64Key);
  return await window.crypto.subtle.importKey(
    'raw',
    rawBuffer,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
}

export async function computeKeyFingerprint(rawKeyBase64) {
  const buffer = base64ToArrayBuffer(rawKeyBase64);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return `sha256-${hex.substring(0, 16)}...${hex.substring(hex.length - 8)}`;
}

// 5. Authenticated AES-256-GCM Encryption & Decryption
export async function encryptScreenplayContent(plaintext, cryptoKey, keyVersion = 1) {
  if (!plaintext || !cryptoKey) return null;
  const enc = new TextEncoder();
  const data = enc.encode(typeof plaintext === 'string' ? plaintext : JSON.stringify(plaintext));

  // 96-bit (12 bytes) cryptographically random nonce/IV for AES-GCM
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const ciphertext = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    data
  );

  return {
    isEncrypted: true,
    version: keyVersion,
    algorithm: 'AES-GCM-256',
    iv: arrayBufferToBase64(iv),
    ciphertext: arrayBufferToBase64(ciphertext),
    timestamp: new Date().toISOString()
  };
}

export async function decryptScreenplayContent(encryptedPayload, cryptoKey) {
  if (!encryptedPayload || !encryptedPayload.ciphertext) {
    return encryptedPayload; // unencrypted legacy content
  }

  const iv = base64ToArrayBuffer(encryptedPayload.iv);
  const ciphertext = base64ToArrayBuffer(encryptedPayload.ciphertext);

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    ciphertext
  );

  const dec = new TextDecoder();
  const plaintext = dec.decode(decryptedBuffer);

  try {
    return JSON.parse(plaintext);
  } catch {
    return plaintext;
  }
}

// 6. Secure Key Wrapping for Collaborators via ECDH Key Agreement
export async function wrapScreenplayKeyForRecipient(screenplayRawKeyBase64, recipientPublicKeyJwk, senderPrivateKeyJwk) {
  const recipientKey = await window.crypto.subtle.importKey(
    'jwk',
    recipientPublicKeyJwk,
    { name: 'ECDH', namedCurve: 'P-256' },
    false,
    []
  );

  const senderKey = await window.crypto.subtle.importKey(
    'jwk',
    senderPrivateKeyJwk,
    { name: 'ECDH', namedCurve: 'P-256' },
    false,
    ['deriveKey']
  );

  // Derive shared 256-bit AES-GCM wrapping key using ECDH
  const wrappingKey = await window.crypto.subtle.deriveKey(
    { name: 'ECDH', public: recipientKey },
    senderKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const rawKeyData = new TextEncoder().encode(screenplayRawKeyBase64);

  const wrappedCiphertext = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    wrappingKey,
    rawKeyData
  );

  return {
    iv: arrayBufferToBase64(iv),
    wrappedKey: arrayBufferToBase64(wrappedCiphertext)
  };
}

export async function unwrapScreenplayKey(wrappedKeyPackage, senderPublicKeyJwk, recipientPrivateKeyJwk) {
  const senderKey = await window.crypto.subtle.importKey(
    'jwk',
    senderPublicKeyJwk,
    { name: 'ECDH', namedCurve: 'P-256' },
    false,
    []
  );

  const recipientKey = await window.crypto.subtle.importKey(
    'jwk',
    recipientPrivateKeyJwk,
    { name: 'ECDH', namedCurve: 'P-256' },
    false,
    ['deriveKey']
  );

  const wrappingKey = await window.crypto.subtle.deriveKey(
    { name: 'ECDH', public: senderKey },
    recipientKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  const iv = base64ToArrayBuffer(wrappedKeyPackage.iv);
  const ciphertext = base64ToArrayBuffer(wrappedKeyPackage.wrappedKey);

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    wrappingKey,
    ciphertext
  );

  const rawKeyBase64 = new TextDecoder().decode(decryptedBuffer);
  return await importRawKeyFromBase64(rawKeyBase64);
}

// 7. Explicit AI Consent Disclosure for Encrypted Content
export function promptAIConsentForEncryptedScript(scriptTitle, featureName = 'Narrative Intelligence') {
  return new Promise((resolve) => {
    // Check if consent was already granted for this session
    const sessionConsent = sessionStorage.getItem(`scriptora_ai_consent_${scriptTitle}`);
    if (sessionConsent === 'granted') {
      return resolve(true);
    }

    // Create modal dialog
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 fade-in';
    overlay.innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[24px]">lock_open</span>
          </div>
          <div>
            <h3 class="font-heading font-bold text-base text-slate-900">AI Privacy & Cryptographic Boundary</h3>
            <p class="text-xs text-slate-500">Screenplay: ${scriptTitle}</p>
          </div>
        </div>

        <div class="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 space-y-2 text-xs text-amber-900 leading-relaxed">
          <p class="font-semibold flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px] text-amber-700">info</span>
            End-to-End Encryption Disclosure
          </p>
          <p class="text-[11px] text-slate-700">
            This screenplay is protected with zero-knowledge end-to-end encryption. SCRIPTORA servers do not possess your decryption keys.
          </p>
          <p class="text-[11px] text-slate-700">
            Running <strong>${featureName}</strong> requires temporarily decrypting relevant screenplay text on your local device and transmitting it to the AI inference model for narrative processing.
          </p>
          <p class="text-[10px] text-slate-500">
            • Data is transmitted via TLS and not retained in permanent training corpora.<br/>
            • Raw private encryption keys are never disclosed to the AI.
          </p>
        </div>

        <div class="flex items-center justify-end gap-2.5 pt-2">
          <button id="ai-consent-cancel" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors">
            Cancel Analysis
          </button>
          <button id="ai-consent-proceed" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold shadow-xs cursor-pointer transition-all flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px]">verified</span>
            <span>Proceed with AI</span>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const cleanup = () => {
      overlay.remove();
    };

    overlay.querySelector('#ai-consent-cancel').onclick = () => {
      cleanup();
      resolve(false);
    };

    overlay.querySelector('#ai-consent-proceed').onclick = () => {
      sessionStorage.setItem(`scriptora_ai_consent_${scriptTitle}`, 'granted');
      cleanup();
      resolve(true);
    };
  });
}

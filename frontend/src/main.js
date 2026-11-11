import { store } from './state/store.js';
import { router } from './router.js';
import { showToast } from './components/toast.js';
import { isLocalMode } from './services/dataMode.js';

function renderFatalStorageError(err) {
  const root = document.getElementById('app') || document.body;
  if (!root) return;
  const msg = String(err?.message || 'Unable to access persistent local IndexedDB storage.');
  root.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#f8fafc;font-family:system-ui,-apple-system,sans-serif;">
      <div style="max-width:440px;width:100%;background:#ffffff;border:1px solid #fecdd3;border-radius:16px;padding:24px;box-shadow:0 10px 25px rgba(15,23,42,0.06);">
        <h1 style="margin:0 0 8px 0;font-size:18px;font-weight:700;color:#be123c;">Local Storage Unavailable</h1>
        <p style="margin:0 0 14px 0;font-size:13px;line-height:1.5;color:#475569;">${msg}</p>
        <p style="margin:0;font-size:12px;color:#64748b;">SCRIPTORA refuses to fall back to temporary memory-only storage so your work is never silently lost. Ensure cookies/site storage and IndexedDB are enabled in this browser profile, then reload.</p>
      </div>
    </div>
  `;
}

async function bootstrap() {
  try {
    // 1. Initialize store strictly from authoritative IndexedDB (local mode) or API (cloud mode)
    await store.init();

    // 2. Initialize router and mount application
    router.init('#app');

    // 3. Listen for online/offline events without triggering cloud sync in local mode
    window.addEventListener('online', () => {
      if (isLocalMode()) {
        showToast('Online. Local workspace stays stored on this device; AI frame generation is ready.');
      } else {
        showToast('Back online. Synchronizing changes...');
        store.refreshScripts();
        store.refreshNotifications();
      }
    });

    window.addEventListener('offline', () => {
      showToast('Offline mode active. Edits are saved to IndexedDB on this device.', 'info');
    });

    console.log(`Scriptora initialized in ${isLocalMode() ? 'local-first (IndexedDB)' : 'cloud'} mode.`);
  } catch (err) {
    console.error("Scriptora bootstrap failed:", err);
    renderFatalStorageError(err);
  }
}

// Start application
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}

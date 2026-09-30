import { store } from './state/store.js';
import { router } from './router.js';
import { showToast } from './components/toast.js';

async function bootstrap() {
  try {
    // 1. Initialize store from API or local persistence
    await store.init();

    // 2. Initialize router and mount application
    router.init('#app');

    // 3. Listen for online/offline events
    window.addEventListener('online', () => {
      showToast('Back online. Synchronizing changes...');
      store.refreshScripts();
      store.refreshNotifications();
    });

    window.addEventListener('offline', () => {
      showToast('Offline mode active. Edits saved locally.', 'info');
    });

    console.log("Scriptora initialized successfully in production-ready mode.");
  } catch (err) {
    console.error("Scriptora bootstrap failed:", err);
  }
}

// Start application
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}

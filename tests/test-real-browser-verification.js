import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('========================================================================');
console.log('SCRIPTORA — Real Headless Chrome Browser Verification Suite');
console.log('========================================================================\n');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'C:\\Users\\DELL\\AppData\\Local\\Temp\\chrome_debug_verify';
const DEBUG_PORT = 9222;
const FRONTEND_URL = 'http://127.0.0.1:5173';

// 1. Ensure Chrome is running
async function ensureChrome() {
  try {
    const res = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
    if (res.ok) {
      console.log('✓ Chrome DevTools already active on port', DEBUG_PORT);
      return null;
    }
  } catch (_) {}

  console.log('Starting dedicated headless Chrome process...');
  const proc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${USER_DATA_DIR}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  // Wait for DevTools port to become ready
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      const res = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
      if (res.ok) {
        console.log('✓ Chrome launched and listening on port', DEBUG_PORT);
        return proc;
      }
    } catch (_) {}
  }
  throw new Error('Failed to connect to Chrome on port ' + DEBUG_PORT);
}

// 2. CDP Client wrapper
class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.msgId = 1;
    this.callbacks = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (e) => reject(e);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { res, rej } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) rej(new Error(msg.error.message || JSON.stringify(msg.error)));
          else res(msg.result);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((res, rej) => {
      const id = this.msgId++;
      this.callbacks.set(id, { res, rej });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async evaluate(expression) {
    const result = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    return result?.result?.value;
  }

  async captureScreenshot(filepath) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    if (res?.data) {
      fs.writeFileSync(filepath, Buffer.from(res.data, 'base64'));
      console.log(`  📸 Screenshot saved: ${filepath}`);
    }
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function run() {
  const chromeProc = await ensureChrome();

  const outputDir = path.resolve('tests/output');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  // Create new browser tab pointing to Storyboard Studio with correct GitHub Pages / Vite base path
  const targetUrl = `${FRONTEND_URL}/Scriptora/#/production/storyboard?scriptId=chronicles-of-dust`;
  console.log(`Navigating to ${targetUrl}...`);

  const tabRes = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/new?${encodeURIComponent(targetUrl)}`, { method: 'PUT' });
  const tab = await tabRes.json();
  const cdp = new CDPClient(tab.webSocketDebuggerUrl);
  await cdp.connect();

  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');

  cdp.ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      console.log('BROWSER CONSOLE:', msg.params.type, msg.params.args.map(a => a.value || a.description).join(' '));
    }
    if (msg.id && cdp.callbacks.has(msg.id)) {
      const { res, rej } = cdp.callbacks.get(msg.id);
      cdp.callbacks.delete(msg.id);
      if (msg.error) rej(new Error(msg.error.message || JSON.stringify(msg.error)));
      else res(msg.result);
    }
  };

  // Wait 3.5 seconds for scripts and storyboard data to initialize
  await new Promise(r => setTimeout(r, 3500));

  const debugState = await cdp.evaluate(`
    ({
      href: window.location.href,
      htmlSnippet: document.body.innerHTML.slice(0, 500),
      hasStoryboardContainer: Boolean(document.getElementById('storyboard-container')),
      hasViewContainer: Boolean(document.getElementById('storyboard-view-container'))
    })
  `);
  console.log('Debug state on page load:', debugState);

  // --- Step 1: Contact Sheet View ---
  console.log('\n--- 1. Testing Main Storyboard Studio (Contact Sheet View) ---');
  const contactDownloadButtons = await cdp.evaluate(`
    (() => {
      const cardDownloadButtons = document.querySelectorAll('.btn-card-download');
      const hoverDownloadButtons = document.querySelectorAll('.btn-quick-download-card');
      return {
        cardButtonsCount: cardDownloadButtons.length,
        hoverButtonsCount: hoverDownloadButtons.length,
        firstCardText: cardDownloadButtons[0]?.textContent?.trim() || ''
      };
    })()
  `);
  console.log('Contact Sheet Download Buttons detected:', contactDownloadButtons);
  assert.ok(contactDownloadButtons.cardButtonsCount > 0, 'Must have .btn-card-download on storyboard cards');
  assert.ok(contactDownloadButtons.hoverButtonsCount > 0, 'Must have .btn-quick-download-card on card image hover overlay');
  await cdp.captureScreenshot(path.join(outputDir, '01_contact_sheet_download_buttons.png'));
  console.log('✓ Main Contact Sheet Download Buttons verified.');

  // --- Step 2: Shot Inspector Modal ---
  console.log('\n--- 2. Testing Shot Inspector Modal (Entry Points 2 & 3) ---');
  const inspectorOpened = await cdp.evaluate(`
    (() => {
      const firstEditBtn = document.querySelector('.btn-open-inspector');
      if (!firstEditBtn) return false;
      firstEditBtn.click();
      return true;
    })()
  `);
  assert.ok(inspectorOpened, 'Must open shot inspector modal');
  await new Promise(r => setTimeout(r, 1000));

  const inspectorDownloadUI = await cdp.evaluate(`
    (() => {
      const iconDownload = document.getElementById('modal-btn-download-shot');
      const actionDownload = document.getElementById('modal-btn-download-action');
      const postGenBar = document.getElementById('modal-post-gen-actions');
      return {
        iconBtnExists: Boolean(iconDownload),
        iconBtnVisible: iconDownload ? !iconDownload.classList.contains('hidden') : false,
        actionBtnExists: Boolean(actionDownload),
        actionBtnVisible: actionDownload ? !actionDownload.classList.contains('hidden') : false,
        actionBtnText: actionDownload?.textContent?.trim() || ''
      };
    })()
  `);
  console.log('Inspector Modal Download UI detected:', inspectorDownloadUI);
  assert.ok(inspectorDownloadUI.iconBtnExists, 'Post-generation preview bar must have #modal-btn-download-shot');
  assert.ok(inspectorDownloadUI.actionBtnExists, 'Bottom action bar must have #modal-btn-download-action');
  await cdp.captureScreenshot(path.join(outputDir, '02_shot_inspector_download_buttons.png'));
  console.log('✓ Shot Inspector Modal Download Buttons verified.');

  // Close Inspector modal
  await cdp.evaluate(`document.getElementById('modal-shot-close')?.click() || document.getElementById('modal-btn-cancel-shot')?.click()`);
  await new Promise(r => setTimeout(r, 500));

  // --- Step 3: Sequence Editor View ---
  console.log('\n--- 3. Testing Sequence Editor View ---');
  const switchView = await cdp.evaluate(`
    (() => {
      const seqTab = document.getElementById('view-tab-sequence');
      if (!seqTab) return false;
      seqTab.click();
      return true;
    })()
  `);
  assert.ok(switchView, 'Must switch to sequence editor view');
  await new Promise(r => setTimeout(r, 800));

  const sequenceEditorDownloads = await cdp.evaluate(`
    (() => {
      const dlButtons = document.querySelectorAll('.btn-card-download');
      return {
        count: dlButtons.length,
        visibleCount: Array.from(dlButtons).filter(b => b.offsetParent !== null).length
      };
    })()
  `);
  console.log('Sequence Editor Download Buttons detected:', sequenceEditorDownloads);
  assert.ok(sequenceEditorDownloads.count > 0, 'Sequence table must have download button on each shot row');
  await cdp.captureScreenshot(path.join(outputDir, '03_sequence_editor_download_buttons.png'));
  console.log('✓ Sequence Editor Table Download Buttons verified.');

  // Switch back to contact sheet
  await cdp.evaluate(`document.getElementById('view-tab-contact')?.click()`);
  await new Promise(r => setTimeout(r, 600));

  // --- Step 4: Cinematic Lightbox Modal ---
  console.log('\n--- 4. Testing Cinematic Lightbox Modal ---');
  const lightboxOpened = await cdp.evaluate(`
    (() => {
      const openLbBtn = document.querySelector('.btn-open-lightbox');
      if (!openLbBtn) return false;
      openLbBtn.click();
      return true;
    })()
  `);
  assert.ok(lightboxOpened, 'Must open lightbox modal');
  await new Promise(r => setTimeout(r, 800));

  const lightboxDownloadUI = await cdp.evaluate(`
    (() => {
      const dlBtn = document.getElementById('lb-btn-download');
      const approveBtn = document.getElementById('lb-btn-approve');
      const modal = document.getElementById('lightbox-modal');
      return {
        modalVisible: modal ? !modal.classList.contains('hidden') : false,
        dlBtnExists: Boolean(dlBtn),
        dlBtnVisible: dlBtn ? !dlBtn.classList.contains('hidden') : false,
        approveBtnExists: Boolean(approveBtn)
      };
    })()
  `);
  console.log('Lightbox Download UI detected:', lightboxDownloadUI);
  assert.ok(lightboxDownloadUI.dlBtnExists, 'Lightbox must have #lb-btn-download');
  assert.ok(lightboxDownloadUI.dlBtnVisible, 'Lightbox Download button must be visible');
  await cdp.captureScreenshot(path.join(outputDir, '04_cinematic_lightbox_download_button.png'));
  console.log('✓ Cinematic Lightbox Download Button verified.');

  // Close Lightbox
  await cdp.evaluate(`document.getElementById('lb-close')?.click()`);
  await new Promise(r => setTimeout(r, 500));

  // --- Step 5: Sequence Generation Review Step UI ---
  console.log('\n--- 5. Testing Sequence Generation Review Grid (Entry Point 1) ---');
  const seqReviewVerified = await cdp.evaluate(`
    (() => {
      const downloadAllBtn = document.getElementById('gen-btn-download-all-proposed');
      const genModal = document.getElementById('ai-generate-modal');
      return {
        downloadAllExists: Boolean(downloadAllBtn),
        downloadAllTitle: downloadAllBtn?.getAttribute('title') || '',
        genModalExists: Boolean(genModal)
      };
    })()
  `);
  console.log('Sequence Review Step Download UI detected:', seqReviewVerified);
  assert.ok(seqReviewVerified.downloadAllExists, 'Sequence review step must contain #gen-btn-download-all-proposed');
  console.log('✓ Sequence Review Step Download All action verified.');

  // Close tab
  cdp.close();
  await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/close/${tab.id}`, { method: 'PUT' }).catch(() => {});

  if (chromeProc) {
    chromeProc.kill();
  }

  console.log('\n========================================================================');
  console.log('ALL REAL BROWSER VERIFICATION TESTS COMPLETED SUCCESSFULLY! ✓');
  console.log('========================================================================\n');
}

run().catch((err) => {
  console.error('\n✗ Real Browser Verification Failed:', err);
  process.exit(1);
});

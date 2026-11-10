import fs from 'fs';
import assert from 'node:assert/strict';

console.log('================================================================');
console.log('SCRIPTORA — Storyboard Studio Modal Stacking Verification');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// TEST 1: Verify CSS Modal Overlay Rule
// -----------------------------------------------------------------------------
console.log('--- TEST 1: Inspect CSS Overlay Rules ---');
const styleCss = fs.readFileSync('frontend/src/style.css', 'utf-8');
const overlayMatch = styleCss.match(/\.scriptora-modal-overlay\s*\{([^}]+)\}/);
assert.ok(overlayMatch, '.scriptora-modal-overlay rule must exist in style.css');
assert.ok(
  !overlayMatch[1].includes('z-index: 9999 !important'),
  '.scriptora-modal-overlay must not have !important on base z-index so layered modals take precedence'
);
console.log('✓ .scriptora-modal-overlay has flexible z-index without !important lock');

// -----------------------------------------------------------------------------
// TEST 2: Inspect popupPosition.js implementation
// -----------------------------------------------------------------------------
console.log('\n--- TEST 2: Inspect popupPosition.js exports and implementation ---');
const popupPosJs = fs.readFileSync('frontend/src/utils/popupPosition.js', 'utf-8');

assert.ok(popupPosJs.includes('export const activeModalStack = [];'), 'activeModalStack must be exported');
assert.ok(popupPosJs.includes('portal.appendChild(overlayEl);'), 'portalModal must bring opened modal to top of portal DOM');
assert.ok(popupPosJs.includes('BASE_MODAL_Z_INDEX + (stackLevel * Z_INDEX_STEP)'), 'openModal must calculate progressive z-index');
assert.ok(popupPosJs.includes("overlayEl.style.setProperty('z-index'"), 'openModal must assign higher z-index to nested modals');
assert.ok(popupPosJs.includes("overlayEl.style.removeProperty('z-index')"), 'closeModal must clean up inline z-index');
assert.ok(popupPosJs.includes('activeModalStack.indexOf(overlayEl)'), 'closeModal must track and pop modal from stack');
console.log('✓ popupPosition.js has activeModalStack, progressive z-index, and dynamic DOM layering');

// -----------------------------------------------------------------------------
// TEST 3: Inspect storyboard.js Modal Overlay Classes & Handlers
// -----------------------------------------------------------------------------
console.log('\n--- TEST 3: Inspect Storyboard Modals Stacking Setup ---');
const storyboardJs = fs.readFileSync('frontend/src/screens/production/storyboard.js', 'utf-8');

// Ensure all storyboard modals have the scriptora-modal-overlay class for consistent portaling & stacking
const requiredModalIds = [
  'shot-inspector-modal',
  'ai-generate-modal',
  'single-regen-modal',
  'shot-history-modal',
  'recycle-bin-modal',
  'storyboard-preferences-modal',
  'shot-variation-modal',
  'lightbox-modal'
];

requiredModalIds.forEach(id => {
  const regex = new RegExp(`id="${id}"[^>]*class="[^"]*scriptora-modal-overlay[^"]*"`);
  assert.ok(regex.test(storyboardJs), `Modal #${id} must include class 'scriptora-modal-overlay'`);
});
console.log('✓ All 8 Storyboard Studio modals have scriptora-modal-overlay class');

// Ensure openModal and closeModal are used for lightbox
assert.ok(storyboardJs.includes('openModal(lightboxModal)'), 'openLightbox must call openModal(lightboxModal)');
assert.ok(storyboardJs.includes('closeModal(lightboxModal)'), 'lightbox close must call closeModal(lightboxModal)');
console.log('✓ Lightbox uses openModal and closeModal');

// -----------------------------------------------------------------------------
// TEST 4: Runtime Mock DOM Test for Nested Modal Stacking & Form Preservation
// -----------------------------------------------------------------------------
console.log('\n--- TEST 4: Runtime Nested Modal Flow Simulation ---');

class MockClassList {
  constructor() {
    this.classes = new Set();
  }
  add(...cls) { cls.forEach(c => this.classes.add(c)); }
  remove(...cls) { cls.forEach(c => this.classes.delete(c)); }
  contains(c) { return this.classes.has(c); }
  get value() { return Array.from(this.classes).join(' '); }
}

class MockElement {
  constructor(id, tag = 'div') {
    this.id = id;
    this.tagName = tag.toUpperCase();
    this.classList = new MockClassList();
    this.children = [];
    this.parentElement = null;
    this.style = {
      _styles: {},
      setProperty(k, v) { this._styles[k] = String(v); this[k] = String(v); },
      removeProperty(k) { delete this._styles[k]; delete this[k]; },
      get zIndex() { return this._styles['z-index'] || ''; }
    };
    this.value = '';
    this.scrollLockApplied = false;
  }

  appendChild(child) {
    if (child.id) mockDoc.elements[child.id] = child;
    if (child.parentElement) {
      const idx = child.parentElement.children.indexOf(child);
      if (idx !== -1) child.parentElement.children.splice(idx, 1);
    }
    child.parentElement = this;
    this.children.push(child);
    return child;
  }

  get lastElementChild() {
    return this.children[this.children.length - 1] || null;
  }

  querySelector(sel) {
    return this.children.find(c => sel.includes(c.id) || sel.includes(c.tagName.toLowerCase())) || null;
  }
}

const mockDoc = {
  elements: {},
  documentElement: new MockElement('html'),
  body: new MockElement('body'),
  listeners: {},
  getElementById(id) {
    return this.elements[id] || null;
  },
  createElement(tag) {
    return new MockElement('', tag);
  },
  querySelector(sel) {
    if (sel.startsWith('#')) {
      const id = sel.slice(1).split(' ')[0].split('.')[0];
      return this.elements[id] || null;
    }
    return null;
  },
  querySelectorAll() {
    return [];
  },
  addEventListener(evt, fn) {
    this.listeners[evt] = this.listeners[evt] || [];
    this.listeners[evt].push(fn);
  },
  removeEventListener() {}
};

global.window = {
  innerWidth: 1024,
  innerHeight: 768,
  addEventListener() {},
  removeEventListener() {}
};
global.document = mockDoc;
global.requestAnimationFrame = (cb) => cb();

// Import popupPosition dynamically into our mock environment
const {
  getModalPortal,
  openModal,
  closeModal,
  activeModalStack
} = await import('../frontend/src/utils/popupPosition.js');

// Create mock elements
const inspector = new MockElement('shot-inspector-modal');
inspector.classList.add('scriptora-modal-overlay', 'hidden');
mockDoc.elements['shot-inspector-modal'] = inspector;

const genModal = new MockElement('ai-generate-modal');
genModal.classList.add('scriptora-modal-overlay', 'hidden');
mockDoc.elements['ai-generate-modal'] = genModal;

const titleInput = new MockElement('shot-title', 'input');
titleInput.value = 'Initial Shot Title';
inspector.children.push(titleInput);

// 1. User opens inspector (e.g. Add New Shot screen)
openModal(inspector);
assert.equal(inspector.classList.contains('hidden'), false, 'Inspector must not be hidden');
assert.equal(activeModalStack.length, 1, 'activeModalStack has 1 modal');
assert.equal(activeModalStack[0], inspector);
assert.equal(parseInt(inspector.style.zIndex, 10), 10000, 'Inspector base z-index must be 10000');

// User edits title
titleInput.value = 'User Edited Shot 1E';

// 2. User clicks "Generate Image" inside the inspector
openModal(genModal);
assert.equal(genModal.classList.contains('hidden'), false, 'Gen modal must not be hidden');
assert.equal(activeModalStack.length, 2, 'activeModalStack has 2 modals');
assert.equal(activeModalStack[1], genModal, 'Gen modal is at the top of stack');

const portal = getModalPortal();
assert.equal(portal.lastElementChild, genModal, 'Gen modal must be the topmost child in portal DOM');
assert.equal(parseInt(genModal.style.zIndex, 10), 10050, 'Gen modal has higher z-index (10050)');
assert.ok(parseInt(genModal.style.zIndex, 10) > parseInt(inspector.style.zIndex, 10), 'Gen modal is strictly above inspector');

// 3. User cancels or completes AI generation -> returns to Add New Shot screen
closeModal(genModal);
assert.equal(genModal.classList.contains('hidden'), true, 'Gen modal is now hidden');
assert.equal(activeModalStack.length, 1, 'Only inspector remains in active stack');
assert.equal(activeModalStack[0], inspector);
assert.equal(inspector.classList.contains('hidden'), false, 'Inspector remains visible in foreground');
assert.equal(titleInput.value, 'User Edited Shot 1E', 'Input value in inspector is completely preserved');

// 4. User closes inspector
closeModal(inspector);
assert.equal(inspector.classList.contains('hidden'), true, 'Inspector is now hidden');
assert.equal(activeModalStack.length, 0, 'activeModalStack is empty');

console.log('✓ Forward and reverse modal stacking navigation flow verified successfully');
console.log('\n================================================================');
console.log('ALL MODAL STACKING TESTS PASSED');
console.log('================================================================');

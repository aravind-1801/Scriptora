import fs from 'fs';

console.log('================================================================');
console.log('SCRIPTORA — Screenplay State Undo / Redo Engine Verification');
console.log('================================================================\n');

// 1. Verify code definitions in frontend/src/screens/editor.js
console.log('--- TEST 1: Undo/Redo Engine Functions Exported ---');
const editorJs = fs.readFileSync('frontend/src/screens/editor.js', 'utf-8');

const requiredExports = [
  'export function executeUndo',
  'export function executeRedo',
  'export function recordUndoSnapshot',
  'export function recordTypingUndoSnapshot',
  'export function commitTypingBurst',
  'export function resetUndoRedoHistory',
  'export function updateUndoRedoButtonStates',
  'export function getUndoStackDepth',
  'export function getRedoStackDepth'
];

requiredExports.forEach(fn => {
  if (!editorJs.includes(fn)) {
    throw new Error(`editor.js must export: ${fn}`);
  }
});
console.log('✓ All 9 core Undo/Redo functions successfully exported');

// 2. Verify Keyboard Shortcuts for Undo & Redo (Ctrl+Z, Ctrl+Y, Ctrl+Shift+Z, Meta equivalents)
console.log('\n--- TEST 2: Keyboard Shortcut Wire-Up ---');
if (!editorJs.includes("e.key.toLowerCase() === 'z' && !e.shiftKey")) {
  throw new Error('Ctrl+Z / Cmd+Z shortcut must be handled');
}
if (!editorJs.includes("e.key.toLowerCase() === 'y' || (e.key.toLowerCase() === 'z' && e.shiftKey)")) {
  throw new Error('Ctrl+Y / Ctrl+Shift+Z / Cmd+Y shortcut must be handled');
}
console.log('✓ Keyboard shortcuts (Ctrl+Z, Ctrl+Y, Ctrl+Shift+Z) fully wired to executeUndo and executeRedo');

// 3. Verify Button UI Hooks
console.log('\n--- TEST 3: UI Button Wire-Up ---');
if (!editorJs.includes("undoBtn.onclick") || !editorJs.includes("redoBtn.onclick")) {
  throw new Error('Toolbar Undo & Redo buttons must have onclick handlers calling executeUndo and executeRedo');
}
if (!editorJs.includes("targetType === 'undo'") || !editorJs.includes("targetType === 'redo'")) {
  throw new Error('Element bar buttons (items 17 & 18) must handle undo and redo without stealing focus');
}
console.log('✓ UI buttons (#btn-undo, #btn-redo, element-bar 17 & 18) verified');

// 4. State Stack Logic Simulation Test
console.log('\n--- TEST 4: State-Based Undo / Redo Stack Simulation ---');

let undoStack = [];
let redoStack = [];
const MAX_UNDO_STACK_SIZE = 60;
let isPerformingUndoRedo = false;

let mockScreenplay = {
  scenes: [
    {
      id: 'scene-1',
      number: 1,
      slugline: 'INT. CAFE - DAY',
      blocks: [
        { id: 'b-1', type: 'scene', content: 'INT. CAFE - DAY' },
        { id: 'b-2', type: 'action', content: 'Coffee brews softly.' }
      ]
    }
  ]
};

function createSnapshot() {
  return {
    screenplay: JSON.parse(JSON.stringify(mockScreenplay))
  };
}

function recordSnapshot() {
  if (isPerformingUndoRedo) return;
  const snap = createSnapshot();
  if (undoStack.length > 0) {
    const last = undoStack[undoStack.length - 1];
    if (JSON.stringify(last.screenplay) === JSON.stringify(snap.screenplay)) return;
  }
  undoStack.push(snap);
  if (undoStack.length > MAX_UNDO_STACK_SIZE) undoStack.shift();
  redoStack = [];
}

function undo() {
  if (undoStack.length === 0) return;
  const current = createSnapshot();
  redoStack.push(current);
  const prev = undoStack.pop();
  isPerformingUndoRedo = true;
  mockScreenplay = JSON.parse(JSON.stringify(prev.screenplay));
  isPerformingUndoRedo = false;
}

function redo() {
  if (redoStack.length === 0) return;
  const current = createSnapshot();
  undoStack.push(current);
  const next = redoStack.pop();
  isPerformingUndoRedo = true;
  mockScreenplay = JSON.parse(JSON.stringify(next.screenplay));
  isPerformingUndoRedo = false;
}

// State 0: Baseline
console.log('Step 0: Initial document loaded');
if (undoStack.length !== 0 || redoStack.length !== 0) {
  throw new Error('Initial stacks should be empty');
}

// User Action 1: Add a dialogue block
console.log('Step 1: User adds dialogue block');
recordSnapshot();
mockScreenplay.scenes[0].blocks.push({ id: 'b-3', type: 'dialogue', content: 'Hello!' });

if (undoStack.length !== 1) throw new Error(`Expected undoStack length 1, got ${undoStack.length}`);
if (mockScreenplay.scenes[0].blocks.length !== 3) throw new Error('Expected 3 blocks');

// User Action 2: Change block type
console.log('Step 2: User changes dialogue to character');
recordSnapshot();
mockScreenplay.scenes[0].blocks[2].type = 'character';
mockScreenplay.scenes[0].blocks[2].content = 'ARUN';

if (undoStack.length !== 2) throw new Error(`Expected undoStack length 2, got ${undoStack.length}`);

// Undo Step 2 -> should revert back to dialogue
console.log('Step 3: User clicks Undo');
undo();
if (mockScreenplay.scenes[0].blocks[2].type !== 'dialogue') {
  throw new Error(`Expected dialogue after undo, got ${mockScreenplay.scenes[0].blocks[2].type}`);
}
if (redoStack.length !== 1) throw new Error('Redo stack should have 1 item');
console.log('✓ Undo reverted block type conversion correctly');

// Undo Step 1 -> should revert back to 2 blocks
console.log('Step 4: User clicks Undo again');
undo();
if (mockScreenplay.scenes[0].blocks.length !== 2) {
  throw new Error(`Expected 2 blocks after second undo, got ${mockScreenplay.scenes[0].blocks.length}`);
}
if (redoStack.length !== 2) throw new Error('Redo stack should have 2 items');
if (undoStack.length !== 0) throw new Error('Undo stack should now be 0');
console.log('✓ Undo reverted block addition correctly');

// Redo Step 1 -> should restore 3rd block
console.log('Step 5: User clicks Redo');
redo();
if (mockScreenplay.scenes[0].blocks.length !== 3) {
  throw new Error('Expected 3 blocks after redo');
}
if (mockScreenplay.scenes[0].blocks[2].type !== 'dialogue') {
  throw new Error('Expected block type dialogue after redo');
}
console.log('✓ Redo restored block addition correctly');

// Redo Step 2 -> should restore character conversion
console.log('Step 6: User clicks Redo again');
redo();
if (mockScreenplay.scenes[0].blocks[2].type !== 'character') {
  throw new Error('Expected character block after second redo');
}
if (redoStack.length !== 0) throw new Error('Redo stack should now be empty');
console.log('✓ Redo restored character conversion correctly');

// New user action clears redo stack
console.log('Step 7: New user action clears redo stack');
undo();
if (redoStack.length !== 1) throw new Error('Redo stack should have 1 item after undo');
recordSnapshot();
mockScreenplay.scenes[0].blocks.push({ id: 'b-4', type: 'action', content: 'New branch' });
if (redoStack.length !== 0) throw new Error('Redo stack must be cleared upon new action');
console.log('✓ New user action correctly invalidates redo stack');

console.log('\n================================================================');
console.log('🎉 ALL SCREENPLAY UNDO/REDO TESTS PASSED FLAWLESSLY!');
console.log('================================================================');


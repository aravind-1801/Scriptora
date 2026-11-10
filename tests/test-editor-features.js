import {
  STANDARD_CHARACTER_EXTENSIONS,
  COMMON_PARENTHETICALS,
  cleanCharacterName,
  extractCharacterExtension,
  formatCharacterCue
} from '../frontend/src/utils/characters.js';
import fs from 'fs';

console.log('--- TEST 1: Standard Character Extensions ---');
console.log('Extensions:', STANDARD_CHARACTER_EXTENSIONS.map(x => x.code));
if (STANDARD_CHARACTER_EXTENSIONS.length !== 4) {
  throw new Error(`Expected 4 standard character extensions, got ${STANDARD_CHARACTER_EXTENSIONS.length}`);
}
const codes = STANDARD_CHARACTER_EXTENSIONS.map(x => x.code);
if (!codes.includes('V.O.') || !codes.includes('O.S.') || !codes.includes('O.C.') || !codes.includes("CONT'D")) {
  throw new Error('Standard character extensions do not match required 4 options');
}
console.log('✓ Test 1 Passed: Exactly 4 character extensions (V.O., O.S., O.C., CONT\'D)');

console.log('\n--- TEST 2: Character Name Cleaning & Cue Formatting ---');
const cleanName = cleanCharacterName('ARUN(');
console.log(`cleanCharacterName("ARUN(") => "${cleanName}"`);
if (cleanName !== 'ARUN') throw new Error(`Expected 'ARUN', got '${cleanName}'`);

const formattedCue = formatCharacterCue('ARUN', 'V.O.', true);
console.log(`formatCharacterCue("ARUN", "V.O.", true) => "${formattedCue}"`);
if (formattedCue !== "ARUN (V.O.) (CONT'D)") throw new Error(`Expected "ARUN (V.O.) (CONT'D)", got "${formattedCue}"`);
console.log('✓ Test 2 Passed: Accurate character name sanitization & continuation cue formatting');

console.log('\n--- TEST 3: Common Dialogue Parentheticals ---');
console.log(`Parentheticals Count: ${COMMON_PARENTHETICALS.length}`);
if (!COMMON_PARENTHETICALS.includes('sadly') || !COMMON_PARENTHETICALS.includes('beat') || !COMMON_PARENTHETICALS.includes('angrily')) {
  throw new Error('Missing expected dialogue parentheticals');
}
console.log('✓ Test 3 Passed: Dialogue parentheticals accurately maintained');

console.log('\n--- TEST 4: Style CSS A4 Dimensions ---');
const cssContent = fs.readFileSync('frontend/src/style.css', 'utf-8');
if (!cssContent.includes('max-width: 794px;') || !cssContent.includes('min-height: 1123px;')) {
  throw new Error('Missing 794px x 1123px ISO A4 CSS definitions in style.css');
}
if (!cssContent.includes('aspect-ratio: 210 / 297;')) {
  throw new Error('Missing 210 / 297 aspect ratio in style.css');
}
console.log('✓ Test 4 Passed: style.css enforces genuine ISO A4 794px x 1123px geometry with 210/297 aspect ratio');

console.log('\n--- TEST 5: Editor.js Autocomplete & Element Bar Sync Logic ---');
const editorContent = fs.readFileSync('frontend/src/screens/editor.js', 'utf-8');

// Check beforeinput Enter handling
if (!editorContent.includes("e.inputType === 'insertParagraph' || e.inputType === 'insertLineBreak'")) {
  throw new Error('Missing beforeinput Enter handling in editor.js');
}

// Check parenthetical auto detection
if (!editorContent.includes("bType === 'dialogue' || bType === 'action'")) {
  throw new Error('Missing dialogue/action parenthetical detection in editor.js');
}

// Check activeElement check in syncElementBarWithCursor
if (!editorContent.includes('document.activeElement') || !editorContent.includes('syncElementBarWithCursor')) {
  throw new Error('Missing document.activeElement in syncElementBarWithCursor');
}

console.log('✓ Test 5 Passed: editor.js contains all required mobile keyboard, autocomplete, and element bar hooks');

console.log('\n🎉 ALL SCREENPLAY EDITOR FEATURE & INTEGRITY TESTS PASSED SUCCESSFULLY!');

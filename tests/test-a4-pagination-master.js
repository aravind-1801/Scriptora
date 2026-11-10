import {
  A4_PAGE_CAPACITY_LINES,
  getPageCapacityLines,
  countScreenplayTextLines,
  estimateBlockLines,
  paginateScreenplayBlocks
} from '../frontend/src/utils/pagination.js';
import {
  isValidCharacterName,
  cleanCharacterName,
  formatCharacterCue
} from '../frontend/src/utils/characters.js';

console.log('================================================================');
console.log('SCRIPTORA — Comprehensive Master A4 Pagination Test Suite');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// TEST 1: Source of Truth - A4 Capacity Consistency Across Devices
// -----------------------------------------------------------------------------
console.log('--- TEST 1: Authoritative A4 Page Capacity ---');
if (A4_PAGE_CAPACITY_LINES !== 54) {
  throw new Error(`Expected A4_PAGE_CAPACITY_LINES to be 54, got ${A4_PAGE_CAPACITY_LINES}`);
}
if (getPageCapacityLines() !== 54) {
  throw new Error(`Expected getPageCapacityLines() to return 54, got ${getPageCapacityLines()}`);
}
console.log('✓ A4 Page Capacity is authoritative at 54 lines');

// -----------------------------------------------------------------------------
// TEST 2: Empty Document Starts with Page 1 (Retaining Full Capacity)
// -----------------------------------------------------------------------------
console.log('\n--- TEST 2: Empty Document Pagination ---');
const emptyScript = { scenes: [] };
const emptyPages = paginateScreenplayBlocks(emptyScript);
if (emptyPages.length !== 1) {
  throw new Error(`Expected exactly 1 page for empty screenplay, got ${emptyPages.length}`);
}
if (emptyPages[0].pageNumber !== 1) {
  throw new Error(`Expected pageNumber 1, got ${emptyPages[0].pageNumber}`);
}
console.log('✓ Empty document correctly produces Page 1 retaining full writing capacity');

// -----------------------------------------------------------------------------
// TEST 3: Short Content Stays on Page 1 Naturally
// -----------------------------------------------------------------------------
console.log('\n--- TEST 3: Short Content on Page 1 ---');
const shortScript = {
  scenes: [
    {
      id: 'sc-1',
      number: 1,
      slugline: 'INT. COFFEE SHOP - DAY',
      blocks: [
        { id: 'b-1', type: 'scene', content: 'INT. COFFEE SHOP - DAY' },
        { id: 'b-2', type: 'action', content: 'Maya sits by the window, typing on her vintage typewriter.' },
        { id: 'b-3', type: 'character', content: 'MAYA' },
        { id: 'b-4', type: 'parenthetical', content: '(softly)' },
        { id: 'b-5', type: 'dialogue', content: 'Here we go again.' }
      ]
    }
  ]
};
const shortPages = paginateScreenplayBlocks(shortScript);
if (shortPages.length !== 1) {
  throw new Error(`Expected short content to stay on Page 1, got ${shortPages.length} pages`);
}
console.log('✓ Short content occupies Page 1 without premature page break');

// -----------------------------------------------------------------------------
// TEST 4: Automatic Page 2 Creation When A4 Capacity is Exceeded
// -----------------------------------------------------------------------------
console.log('\n--- TEST 4: Automatic Page 2 Creation on Capacity Exceeded ---');
// Create content that takes ~60 lines (> 54 capacity)
const longBlocks = [
  { id: 'b-s1', type: 'scene', content: 'INT. LAB - NIGHT' }
];
// Add 12 action paragraphs of 4 lines each = 48 lines + scene (3 lines) = 51 lines
for (let i = 1; i <= 12; i++) {
  longBlocks.push({
    id: `b-a${i}`,
    type: 'action',
    content: `Action paragraph ${i}: Dr. Aris inspects the glowing isotope humming inside the magnetic containment field with extreme precision.`
  });
}
// Add dialogue block that exceeds remaining space on Page 1
longBlocks.push({ id: 'b-char1', type: 'character', content: 'ARIS' });
longBlocks.push({ id: 'b-dia1', type: 'dialogue', content: 'The reaction is stabilizing, but the core temperature is rising beyond safety tolerances.' });

const scriptExceeding54 = {
  scenes: [{ id: 'sc-1', number: 1, slugline: 'INT. LAB - NIGHT', blocks: longBlocks }]
};
const pages2 = paginateScreenplayBlocks(scriptExceeding54);
console.log(`Script with 14 blocks produced ${pages2.length} pages`);
if (pages2.length !== 2) {
  throw new Error(`Expected exactly 2 pages, got ${pages2.length}`);
}
if (pages2[0].pageNumber !== 1 || pages2[1].pageNumber !== 2) {
  throw new Error('Pages are not numbered sequentially 1 and 2');
}
console.log(`Page 1 has ${pages2[0].items.length} items, Page 2 has ${pages2[1].items.length} items`);
console.log('✓ Page 2 created automatically when Page 1 capacity is reached');

// -----------------------------------------------------------------------------
// TEST 5: Subsequent Pages Follow the Same Rules (Page 3 Creation)
// -----------------------------------------------------------------------------
console.log('\n--- TEST 5: Subsequent Pages (Page 3 Creation) ---');
// Add enough content to span onto Page 3 (~120 lines total)
const extraBlocks = [];
for (let i = 13; i <= 28; i++) {
  extraBlocks.push({
    id: `b-extra-${i}`,
    type: 'action',
    content: `Subsequent beat ${i}: The security alarms blare throughout the subterranean facility as backup generators attempt to engage.`
  });
}
const script3Pages = {
  scenes: [{ id: 'sc-1', number: 1, slugline: 'INT. LAB - NIGHT', blocks: [...longBlocks, ...extraBlocks] }]
};
const pages3 = paginateScreenplayBlocks(script3Pages);
console.log(`Script with 30 blocks produced ${pages3.length} pages`);
if (pages3.length < 3) {
  throw new Error(`Expected at least 3 pages, got ${pages3.length}`);
}
console.log('✓ Page 3 created automatically following the exact same capacity rules');

// -----------------------------------------------------------------------------
// TEST 6: Screenplay Element Integrity - Orphan Scene Heading Prevention
// -----------------------------------------------------------------------------
console.log('\n--- TEST 6: Orphan Scene Heading Prevention ---');
// Fill Page 1 up to line 51 (leaving only ~3 lines)
// Then place a new scene heading. The scene heading must NOT be stranded at line 52-54 alone.
// It must move cleanly to the start of Page 2 along with its scene content!
const orphanTestBlocks = [];
for (let i = 1; i <= 17; i++) {
  orphanTestBlocks.push({
    id: `b-fill-${i}`,
    type: 'action',
    content: `Filler paragraph ${i} for testing line budget and boundary constraints accurately.`
  });
}
// Now add a scene heading at the very bottom
orphanTestBlocks.push({ id: 'b-new-scene', type: 'scene', content: 'EXT. STREET - DAWN' });
orphanTestBlocks.push({ id: 'b-scene-action', type: 'action', content: 'Rain washes the neon reflections from the asphalt.' });

const orphanScript = {
  scenes: [
    { id: 'sc-1', number: 1, slugline: 'INT. ROOM - NIGHT', blocks: orphanTestBlocks.slice(0, 17) },
    { id: 'sc-2', number: 2, slugline: 'EXT. STREET - DAWN', blocks: orphanTestBlocks.slice(17) }
  ]
};
const orphanPages = paginateScreenplayBlocks(orphanScript);
// Check which page 'b-new-scene' ended up on
const pageOfNewScene = orphanPages.find(p => p.items.some(it => it.block.id === 'b-new-scene'));
if (!pageOfNewScene || pageOfNewScene.pageNumber !== 2) {
  throw new Error(`Expected scene heading to be protected from orphan and placed on Page 2, but found on Page ${pageOfNewScene?.pageNumber}`);
}
console.log(`✓ Scene heading correctly moved to Page ${pageOfNewScene.pageNumber} to prevent orphan separation`);

// -----------------------------------------------------------------------------
// TEST 7: Screenplay Element Integrity - Orphan Character Cue Prevention
// -----------------------------------------------------------------------------
console.log('\n--- TEST 7: Orphan Character Cue Prevention ---');
// Fill page near capacity and place character + dialogue.
// Character must NOT be stranded on Page 1 alone while dialogue sits on Page 2.
const charOrphanBlocks = [];
for (let i = 1; i <= 17; i++) {
  charOrphanBlocks.push({
    id: `b-char-fill-${i}`,
    type: 'action',
    content: `Action beat ${i} taking standard vertical space across the page surface.`
  });
}
charOrphanBlocks.push({ id: 'b-target-char', type: 'character', content: 'KAVIN' });
charOrphanBlocks.push({ id: 'b-target-dia', type: 'dialogue', content: 'We need to move before the perimeter closes in on us.' });

const charOrphanScript = {
  scenes: [{ id: 'sc-1', number: 1, slugline: 'INT. HQ - DAY', blocks: charOrphanBlocks }]
};
const charOrphanPages = paginateScreenplayBlocks(charOrphanScript);
const charPage = charOrphanPages.find(p => p.items.some(it => it.block.id === 'b-target-char'));
const diaPage = charOrphanPages.find(p => p.items.some(it => it.block.id === 'b-target-dia'));

if (charPage.pageNumber !== diaPage.pageNumber) {
  throw new Error(`Character cue stranded on Page ${charPage.pageNumber} while dialogue is on Page ${diaPage.pageNumber}!`);
}
console.log(`✓ Character cue and dialogue kept together on Page ${charPage.pageNumber}`);

// -----------------------------------------------------------------------------
// TEST 8: Dynamic Pagination Recalculation on Deletion
// -----------------------------------------------------------------------------
console.log('\n--- TEST 8: Recalculation on Deletion ---');
// Starting from 2-page script, delete half the blocks: should return to 1 page
const reducedBlocks = scriptExceeding54.scenes[0].blocks.slice(0, 5);
const reducedScript = {
  scenes: [{ id: 'sc-1', number: 1, slugline: 'INT. LAB - NIGHT', blocks: reducedBlocks }]
};
const reducedPages = paginateScreenplayBlocks(reducedScript);
if (reducedPages.length !== 1) {
  throw new Error(`Expected 1 page after deleting excess blocks, got ${reducedPages.length}`);
}
console.log('✓ Deleting content recalculates pages and eliminates redundant Page 2');

// -----------------------------------------------------------------------------
// TEST 9: Character Name Validation Prevents Noise Word (CONT'D)
// -----------------------------------------------------------------------------
console.log('\n--- TEST 9: Character Name Validation & CONT\'D Protection ---');
const okValid = isValidCharacterName('OK');
const okExclaimValid = isValidCharacterName('Ok!');
const arunValid = isValidCharacterName('ARUN');

if (okValid || okExclaimValid) {
  throw new Error(`"OK" / "Ok!" must NOT be classified as valid character names (preventing Ok! (CONT'D))`);
}
if (!arunValid) {
  throw new Error(`"ARUN" must be classified as a valid character name`);
}
const cleanArun = cleanCharacterName('ARUN');
const formattedArun = formatCharacterCue(cleanArun, null, true);
if (formattedArun !== "ARUN (CONT'D)") {
  throw new Error(`Expected "ARUN (CONT'D)", got "${formattedArun}"`);
}
console.log('✓ Valid character names accurately distinguished from noise tokens; spurious CONT\'D prevented');

// -----------------------------------------------------------------------------
// TEST 10: Manual Page Breaks Work Correctly
// -----------------------------------------------------------------------------
console.log('\n--- TEST 10: Manual Page Breaks ---');
const manualPbScript = {
  scenes: [
    {
      id: 'sc-1',
      number: 1,
      slugline: 'INT. OFFICE - DAY',
      blocks: [
        { id: 'b-1', type: 'scene', content: 'INT. OFFICE - DAY' },
        { id: 'b-2', type: 'action', content: 'A brief sentence.' },
        { id: 'b-pb', type: 'pagebreak', content: 'PAGE BREAK' },
        { id: 'b-3', type: 'action', content: 'This must start on Page 2 immediately.' }
      ]
    }
  ]
};
const pbPages = paginateScreenplayBlocks(manualPbScript);
if (pbPages.length !== 2) {
  throw new Error(`Expected manual page break to produce 2 pages, got ${pbPages.length}`);
}
if (!pbPages[0].items.some(it => it.block.id === 'b-pb')) {
  throw new Error('Page 1 must contain the manual page break block');
}
if (!pbPages[1].items.some(it => it.block.id === 'b-3')) {
  throw new Error('Page 2 must contain the block following the manual page break');
}
console.log('✓ Manual page break accurately transitions content to next page');

console.log('\n================================================================');
console.log('🎉 ALL 10 MASTER A4 PAGINATION TESTS PASSED FLAWLESSLY!');
console.log('================================================================');

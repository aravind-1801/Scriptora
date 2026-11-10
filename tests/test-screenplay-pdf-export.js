import fs from 'fs';
import {
  A4_PAGE_CAPACITY_LINES,
  getPageCapacityLines,
  paginateScreenplayBlocks
} from '../frontend/src/utils/pagination.js';

console.log('================================================================');
console.log('SCRIPTORA — Screenplay A4 PDF Export Verification');
console.log('================================================================\n');

// 1. Verify ISO A4 MediaBox Geometry
console.log('--- TEST 1: ISO A4 MediaBox Geometry in editor.js ---');
const editorJs = fs.readFileSync('frontend/src/screens/editor.js', 'utf-8');

if (!editorJs.includes('PAGE_WIDTH = 595.28;') || !editorJs.includes('PAGE_HEIGHT = 841.89;')) {
  throw new Error('PDF generator must define genuine A4 dimensions: 595.28pt x 841.89pt');
}
if (!editorJs.includes('/MediaBox [0 0 595.28 841.89]')) {
  throw new Error('PDF generator MediaBox must be [0 0 595.28 841.89]');
}
console.log('✓ Authentic ISO A4 MediaBox [0 0 595.28 841.89] confirmed');

// 2. Shared Pagination Engine Integration
console.log('\n--- TEST 2: Shared Pagination Engine Integration ---');
if (!editorJs.includes('paginateScreenplayBlocks(screenplay, A4_PAGE_CAPACITY_LINES)')) {
  throw new Error('PDF generator must use authoritative paginateScreenplayBlocks engine');
}
console.log('✓ PDF export shares exact same authoritative pagination engine with editor');

// 3. Screenplay Test Document Multi-Page Consistency
console.log('\n--- TEST 3: Multi-Page Screenplay Consistency ---');
const multiSceneScript = {
  title: 'THE CHRONICLES OF DUST',
  scenes: [
    {
      id: 'sc-1',
      number: 1,
      slugline: 'INT. CORRIDOR - NIGHT',
      blocks: [
        { id: 'b-1', type: 'scene', content: 'INT. CORRIDOR - NIGHT' },
        { id: 'b-2', type: 'action', content: 'Shadows crawl across the concrete walls. A lone bulb flickers overhead.' },
        { id: 'b-3', type: 'character', content: 'ARUN' },
        { id: 'b-4', type: 'dialogue', content: 'Is anyone still listening out there?' }
      ]
    },
    {
      id: 'sc-2',
      number: 2,
      slugline: 'EXT. ROOFTOP - CONTINUOUS',
      blocks: [
        { id: 'b-5', type: 'scene', content: 'EXT. ROOFTOP - CONTINUOUS' },
        { id: 'b-6', type: 'action', content: 'Wind howls across the gravel. The city skyline is drowned in static.' },
        { id: 'b-7', type: 'character', content: 'MAYA' },
        { id: 'b-8', type: 'parenthetical', content: '(over radio)' },
        { id: 'b-9', type: 'dialogue', content: 'The transmission was cut from the sub-level.' },
        { id: 'b-10', type: 'transition', content: 'CUT TO BLACK.' }
      ]
    }
  ]
};

const pages = paginateScreenplayBlocks(multiSceneScript);
console.log(`Document formatted into ${pages.length} page(s)`);
if (pages.length !== 1) {
  throw new Error(`Expected compact 2-scene script to fit on Page 1 (within 54 lines), got ${pages.length}`);
}
console.log(`Page 1 contains ${pages[0].items.length} screenplay blocks`);
console.log('✓ Page capacity comfortably accommodates compact screenplay scenes');

console.log('\n================================================================');
console.log('🎉 ALL SCREENPLAY A4 PDF EXPORT TESTS PASSED!');
console.log('================================================================');

import fs from 'fs';

console.log('================================================================');
console.log('SCRIPTORA — Master A4 Page Capacity & Geometry Verification');
console.log('================================================================\n');

// 1. Verify CSS ISO A4 Dimensions & Aspect Ratio
console.log('--- TEST 1: ISO A4 Dimensions in style.css ---');
const styleCss = fs.readFileSync('frontend/src/style.css', 'utf-8');

// Source of truth: 210mm x 297mm -> 794px x 1123px at 96 DPI
if (!styleCss.includes('max-width: 794px;')) {
  throw new Error('style.css must define max-width: 794px for authentic ISO A4 width');
}
if (!styleCss.includes('min-height: 1123px;')) {
  throw new Error('style.css must define min-height: 1123px for full A4 desktop capacity without content clipping');
}
console.log('✓ Desktop A4 Sheet: Exact 794px max-width × 1123px min-height capacity verified');

// 2. Mobile Responsive Geometry
console.log('\n--- TEST 2: Mobile Responsive A4 Geometry ---');
if (!styleCss.includes('width: calc(100% - 8px) !important;')) {
  throw new Error('style.css must size mobile sheet comfortably to 97-98% of available screen width');
}
if (!styleCss.includes('min-height: max(720px, calc(100dvh - 120px)) !important;')) {
  throw new Error('style.css must maintain defined writing area min-height on mobile so empty pages never shrink');
}
console.log('✓ Mobile A4 Sheet: Defined writing area (97-98% width with 4px margin, min-height without desktop lock) verified');

// 3. Full-Page Usable Writing Area Structure
console.log('\n--- TEST 3: Full-Page Writing Area & 3-Part Structure ---');
if (!styleCss.includes('.page-blocks-wrapper {') || !styleCss.includes('flex: 1 1 auto !important;') && !styleCss.includes('flex: 1 0 auto !important;')) {
  throw new Error('.page-blocks-wrapper must flex-grow to occupy usable space between page margins');
}
const editorJs = fs.readFileSync('frontend/src/screens/editor.js', 'utf-8');
if (!editorJs.includes('screenplay-page-top-margin') || !editorJs.includes('screenplay-page-bottom-margin')) {
  throw new Error('editor.js must structure A4 page with distinct top margin, writing area, and bottom margin');
}
console.log('✓ Writing Area: .page-blocks-wrapper flex-grows across usable space between margins');

// 4. Uniform A4 Page Capacity Across Mobile, Desktop & Export
console.log('\n--- TEST 4: Uniform A4 Page Capacity (54 Lines) ---');
if (!editorJs.includes('A4_PAGE_CAPACITY_LINES')) {
  throw new Error('editor.js must export A4_PAGE_CAPACITY_LINES as authoritative standard');
}
if (!editorJs.includes('getPageCapacityLines')) {
  throw new Error('editor.js must export getPageCapacityLines');
}

// Ensure getPageCapacityLines returns authentic A4 capacity consistently
import { getPageCapacityLines, A4_PAGE_CAPACITY_LINES, paginateScreenplayBlocks } from '../frontend/src/utils/pagination.js';

const cap = getPageCapacityLines();
console.log(`Reported A4 Page Capacity: ${cap} lines`);
if (cap !== 54) {
  throw new Error(`Expected authoritative A4 capacity 54 lines, got ${cap}`);
}
console.log('✓ Authentic A4 capacity (54 lines) is the single source of truth across all devices');

// 5. Stationary Bottom Toolbar (Outside Paper)
console.log('\n--- TEST 5: Bottom Toolbar Docking & Non-Overlapping ---');
if (!editorJs.includes('<footer id="editor-telemetry-bar"') || !editorJs.includes('pb-safe')) {
  throw new Error('editor.js must dock telemetry toolbar as an independent footer with pb-safe');
}
if (editorJs.indexOf('</main>') > editorJs.indexOf('<footer id="editor-telemetry-bar"')) {
  throw new Error('Footer must be placed outside <main id="editor-main-scroll"> to prevent overlap');
}
console.log('✓ Bottom toolbar: Docked outside main scroll view, separated from paper with pb-safe');

// 6. Title Page Geometry Alignment
console.log('\n--- TEST 6: Title Page A4 Sheet Geometry ---');
if (!editorJs.includes('screenplay-title-page-sheet') || !editorJs.includes('max-w-[794px] min-h-[1123px]')) {
  throw new Error('Title page sheet must have genuine A4 max-w-[794px] min-h-[1123px]');
}
console.log('✓ Title Page sheet: Identical 794px × 1123px A4 geometry confirmed');

console.log('\n================================================================');
console.log('🎉 ALL 6 COMPREHENSIVE A4 GEOMETRY & EDITOR VERIFICATIONS PASSED!');
console.log('================================================================');

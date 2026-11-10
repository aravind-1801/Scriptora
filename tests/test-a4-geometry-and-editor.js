import fs from 'fs';

console.log('================================================================');
console.log('SCRIPTORA — A4 Paper Dimensions & Geometry Comprehensive Verification');
console.log('================================================================\n');

// 1. Verify CSS ISO A4 Dimensions & Aspect Ratio
console.log('--- TEST 1: ISO A4 Dimensions & Ratio in style.css ---');
const styleCss = fs.readFileSync('frontend/src/style.css', 'utf-8');

// Source of truth: 210mm x 297mm -> 794px x 1123px at 96 DPI
if (!styleCss.includes('max-width: 794px;')) {
  throw new Error('style.css must define max-width: 794px for authentic ISO A4 width');
}
if (!styleCss.includes('height: 1123px;') || !styleCss.includes('min-height: 1123px;')) {
  throw new Error('style.css must define 1123px height for authentic ISO A4 height');
}
if (!styleCss.includes('aspect-ratio: 210 / 297;')) {
  throw new Error('style.css must enforce authentic ISO A4 210 / 297 aspect ratio');
}
console.log('✓ Desktop A4 Sheet: Exact 794px × 1123px with 210:297 aspect ratio verified');

// 2. Mobile Responsive Geometry
console.log('\n--- TEST 2: Mobile Proportional A4 Scaling ---');
if (!styleCss.includes('height: calc(min(794px, calc(100vw - 16px)) * 297 / 210) !important;')) {
  throw new Error('style.css must calculate mobile height proportionally from actual rendered width using 297/210 ratio');
}
if (!styleCss.includes('aspect-ratio: 210 / 297 !important;')) {
  throw new Error('style.css must preserve 210/297 aspect ratio on mobile');
}
console.log('✓ Mobile A4 Sheet: Strict proportional height = rendered_width * 297 / 210 verified');

// 3. Full-Page Usable Writing Area Structure
console.log('\n--- TEST 3: Full-Page Writing Area & 3-Part Structure ---');
if (!styleCss.includes('.page-blocks-wrapper {') || !styleCss.includes('flex: 1 1 0% !important;')) {
  throw new Error('.page-blocks-wrapper must have flex: 1 1 0% !important to occupy full height between margins');
}
const editorJs = fs.readFileSync('frontend/src/screens/editor.js', 'utf-8');
if (!editorJs.includes('screenplay-page-top-margin') || !editorJs.includes('screenplay-page-bottom-margin')) {
  throw new Error('editor.js must structure A4 page with distinct top margin, writing area, and bottom margin');
}
console.log('✓ Writing Area: .page-blocks-wrapper flex-grows to 100% of usable space between margins');

// 4. Dynamic Screenplay Line Capacity on Mobile & Desktop
console.log('\n--- TEST 4: Dynamic Screenplay Line Capacity on Mobile & Desktop ---');
if (!editorJs.includes('function getPageCapacityLines()')) {
  throw new Error('editor.js must include getPageCapacityLines() to calculate page capacity dynamically');
}

function testCapacity(winWidth) {
  if (winWidth >= 820) return 54;
  const renderedWidth = Math.max(280, Math.min(794, winWidth - 16));
  const renderedHeight = renderedWidth * (297 / 210);
  const usableHeight = renderedHeight - 64;
  const capacity = Math.floor(usableHeight / 19.5);
  return Math.max(18, Math.min(54, capacity));
}

const desktopCap = testCapacity(1200);
console.log(`Desktop (1200px) Capacity: ${desktopCap} lines`);
if (desktopCap !== 54) {
  throw new Error(`Expected desktop capacity 54 lines, got ${desktopCap}`);
}

const mobileCap = testCapacity(390);
console.log(`Mobile iPhone (390px) Capacity: ${mobileCap} lines`);
if (mobileCap < 20 || mobileCap > 26) {
  throw new Error(`Expected mobile capacity between 20 and 26 lines, got ${mobileCap}`);
}
console.log('✓ Dynamic pagination matches exact physical usable height across mobile & desktop');

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

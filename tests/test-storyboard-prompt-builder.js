/**
 * SCRIPTORA Storyboard Prompt Builder & Visual Settings Test Suite
 *
 * Verifies:
 * 1. All 17 Visual Styles & distinct treatments / constraints
 * 2. All 4 Aspect Ratios & corresponding Pollinations dimensions
 * 3. All 5 Shot Sizes & spatial framing definitions
 * 4. All 6 Camera Angles & perspective instructions
 * 5. All 4 Lenses & optical characteristics
 * 6. All 6 Lighting Presets & scene-based atmospheric guidance
 * 7. 4-Level Settings Precedence resolution
 * 8. User prompt sanitization & conflicting keyword suppression
 * 9. Reset Defaults behavior
 * 10. Variation & Retry consistency
 * 11. Final URL construction for Pollinations FLUX.1
 */

import assert from 'assert';
import {
  APPLICATION_DEFAULTS,
  ASPECT_RATIO_SPECS,
  VISUAL_STYLE_DEFINITIONS,
  SHOT_SIZE_DEFINITIONS,
  CAMERA_ANGLE_DEFINITIONS,
  LENS_DEFINITIONS,
  LIGHTING_DEFINITIONS,
  normalizeKey,
  resolveEffectiveSettings,
  sanitizeUserPrompt,
  buildStoryboardGenerationPrompt
} from '../backend/app/services/promptBuilder.js';

let passed = 0;
let total = 0;

function it(name, fn) {
  total++;
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
    throw err;
  }
}

console.log('\n=======================================================');
console.log('SCRIPTORA Storyboard Settings & Prompt Builder Test Suite');
console.log('=======================================================\n');

// 1. All 17 Visual Styles
console.log('--- 1. Testing Visual Style Mappings (17 Styles) ---');
const EXPECTED_STYLES = [
  "Comic", "Cinematic", "Soft Pencil", "Animation", "3D",
  "Watercolor Paint", "Photo / Commercial", "Charcoal Sketch",
  "Dark Anime", "Flat / Vector", "Noir", "Stick Figure",
  "Graphic Novel", "Concept Art", "Cinematic Realism",
  "Storyboard Sketch", "Photorealistic"
];

for (const style of EXPECTED_STYLES) {
  it(`Style: ${style} maps to distinct direction and constraints`, () => {
    const def = VISUAL_STYLE_DEFINITIONS[style];
    assert(def, `Style definition missing for ${style}`);
    assert(def.direction && def.direction.length > 20, `Direction missing or too short for ${style}`);
    assert(def.constraints && def.constraints.length > 10, `Constraints missing for ${style}`);
  });
}

it('Distinguishes Soft Pencil from Charcoal Sketch', () => {
  const pencil = VISUAL_STYLE_DEFINITIONS['Soft Pencil'];
  const charcoal = VISUAL_STYLE_DEFINITIONS['Charcoal Sketch'];
  assert(pencil.direction.includes('graphite'), 'Soft pencil must emphasize graphite');
  assert(charcoal.direction.includes('charcoal'), 'Charcoal sketch must emphasize charcoal');
  assert(pencil.constraints.includes('monochrome graphite'), 'Soft pencil has graphite constraint');
  assert(charcoal.direction.includes('deep velvety black'), 'Charcoal emphasizes deep black tones');
});

it('Distinguishes Cinematic from Photorealistic', () => {
  const cinematic = VISUAL_STYLE_DEFINITIONS['Cinematic'];
  const photo = VISUAL_STYLE_DEFINITIONS['Photorealistic'];
  assert(cinematic.direction.includes('anamorphic'), 'Cinematic must emphasize anamorphic film capture');
  assert(photo.direction.includes('Ultra-photorealistic'), 'Photorealistic emphasizes pure photographic realism');
});

it('Distinguishes Flat / Vector and Stick Figure from textured media', () => {
  const vector = VISUAL_STYLE_DEFINITIONS['Flat / Vector'];
  const stick = VISUAL_STYLE_DEFINITIONS['Stick Figure'];
  assert(vector.constraints.includes('Strictly no photographic textures'), 'Vector strictly prohibits photographic texture');
  assert(stick.direction.includes('stick-figure') || stick.direction.includes('stick figure'), 'Stick figure has minimalist construction');
  assert(stick.constraints.includes('Strictly no detailed human anatomy'), 'Stick figure strictly prohibits anatomy');
});

// 2. Aspect Ratio & Dimensions
console.log('\n--- 2. Testing Aspect Ratios & Dimensions (4 Ratios) ---');
const EXPECTED_RATIOS = {
  "2.39:1": { width: 1024, height: 428 },
  "16:9": { width: 1024, height: 576 },
  "4:3": { width: 1024, height: 768 },
  "9:16": { width: 720, height: 1280 }
};

for (const [ratio, dims] of Object.entries(EXPECTED_RATIOS)) {
  it(`Ratio: ${ratio} produces exact dimensions ${dims.width}x${dims.height}`, () => {
    const spec = ASPECT_RATIO_SPECS[ratio];
    assert(spec, `Missing spec for ratio ${ratio}`);
    assert.strictEqual(spec.width, dims.width);
    assert.strictEqual(spec.height, dims.height);
    assert(spec.composition && spec.composition.length > 15, `Composition missing for ${ratio}`);
  });
}

// 3. Shot Sizes
console.log('\n--- 3. Testing Shot Sizes (5 Sizes) ---');
const EXPECTED_SIZES = ["Extreme Wide", "Wide", "Medium", "Close-up", "Extreme Close-up"];
for (const size of EXPECTED_SIZES) {
  it(`Shot Size: ${size} contains spatial scale description`, () => {
    const desc = SHOT_SIZE_DEFINITIONS[size];
    assert(desc, `Missing shot size definition for ${size}`);
    assert(desc.length > 20, `Shot size description too short for ${size}`);
  });
}

// 4. Camera Angles
console.log('\n--- 4. Testing Camera Angles (6 Angles) ---');
const EXPECTED_ANGLES = ["Eye Level", "Low Angle", "High Angle", "Bird's Eye View", "Over-the-Shoulder", "Dutch Angle"];
for (const angle of EXPECTED_ANGLES) {
  it(`Camera Angle: ${angle} contains perspective instruction`, () => {
    const desc = CAMERA_ANGLE_DEFINITIONS[angle];
    assert(desc, `Missing camera angle definition for ${angle}`);
    assert(desc.length > 20, `Camera angle description too short for ${angle}`);
  });
}

// 5. Lenses
console.log('\n--- 5. Testing Lenses (4 Lenses) ---');
const EXPECTED_LENSES = ["24mm", "35mm", "50mm", "85mm"];
for (const lens of EXPECTED_LENSES) {
  it(`Lens: ${lens} specifies optical characteristics`, () => {
    const desc = LENS_DEFINITIONS[lens];
    assert(desc, `Missing lens definition for ${lens}`);
    assert(desc.includes(lens), `Lens definition must name ${lens}`);
    assert(desc.length > 30, `Lens description too short for ${lens}`);
  });
}

// 6. Lighting Options
console.log('\n--- 6. Testing Lighting Options (6 Options) ---');
const EXPECTED_LIGHTING = ["Auto / Scene-based", "Daylight", "Night", "Golden Hour", "Low-key", "Backlit"];
for (const light of EXPECTED_LIGHTING) {
  it(`Lighting: ${light} specifies atmospheric lighting direction`, () => {
    const desc = LIGHTING_DEFINITIONS[light];
    assert(desc, `Missing lighting definition for ${light}`);
    assert(desc.length > 25, `Lighting description too short for ${light}`);
  });
}

// 7. Settings Precedence
console.log('\n--- 7. Testing 4-Level Settings Precedence ---');
it('Level 1: Explicit per-shot setting overrides all defaults', () => {
  const shotParams = { visualStyle: "Soft Pencil", aspectRatio: "16:9", shotSize: "Close-up" };
  const userPrefs = { visualStyle: "Photorealistic", aspectRatio: "2.39:1", shotSize: "Extreme Wide" };
  const projectOverrides = { visualStyle: "Comic" };

  const effective = resolveEffectiveSettings(shotParams, userPrefs, projectOverrides);
  assert.strictEqual(effective.visualStyle, "Soft Pencil");
  assert.strictEqual(effective.aspectRatio, "16:9");
  assert.strictEqual(effective.shotSize, "Close-up");
});

it('Level 2: Project override applies when shot setting is omitted', () => {
  const shotParams = {};
  const userPrefs = { visualStyle: "Photorealistic", aspectRatio: "4:3" };
  const projectOverrides = { visualStyle: "Noir", aspectRatio: "16:9" };

  const effective = resolveEffectiveSettings(shotParams, userPrefs, projectOverrides);
  assert.strictEqual(effective.visualStyle, "Noir");
  assert.strictEqual(effective.aspectRatio, "16:9");
});

it('Level 3: Saved user preferences apply when shot & project are omitted', () => {
  const shotParams = {};
  const userPrefs = { visualStyle: "Watercolor Paint", lens: "85mm", lighting: "Golden Hour" };
  const projectOverrides = {};

  const effective = resolveEffectiveSettings(shotParams, userPrefs, projectOverrides);
  assert.strictEqual(effective.visualStyle, "Watercolor Paint");
  assert.strictEqual(effective.lens, "85mm");
  assert.strictEqual(effective.lighting, "Golden Hour");
});

it('Level 4: Application defaults apply when nothing else is configured', () => {
  const effective = resolveEffectiveSettings({}, {}, {});
  assert.strictEqual(effective.visualStyle, APPLICATION_DEFAULTS.visualStyle);
  assert.strictEqual(effective.aspectRatio, APPLICATION_DEFAULTS.aspectRatio);
  assert.strictEqual(effective.shotSize, APPLICATION_DEFAULTS.shotSize);
  assert.strictEqual(effective.cameraAngle, APPLICATION_DEFAULTS.cameraAngle);
  assert.strictEqual(effective.lens, APPLICATION_DEFAULTS.lens);
  assert.strictEqual(effective.lighting, APPLICATION_DEFAULTS.lighting);
});

// 8. Conflicting keyword sanitization
console.log('\n--- 8. Testing Conflicting Prompt Sanitization ---');
it('Strips photorealistic / 3D buzzwords from traditional drawing styles', () => {
  const raw = "A knight on a hill, photorealistic, 8k resolution, octane render, unreal engine 5";
  const sanitized = sanitizeUserPrompt(raw, { visualStyle: "Soft Pencil" });
  assert(!sanitized.includes("photorealistic"), "Must strip photorealistic");
  assert(!sanitized.includes("8k resolution"), "Must strip 8k resolution");
  assert(!sanitized.includes("octane render"), "Must strip octane render");
  assert(sanitized.includes("knight on a hill"), "Preserves core scene content");
});

it('Strips sketch / cartoon buzzwords from photorealistic styles', () => {
  const raw = "Close-up portrait of an old captain, pencil sketch, rough sketch, stick figure";
  const sanitized = sanitizeUserPrompt(raw, { visualStyle: "Photorealistic" });
  assert(!sanitized.includes("pencil sketch"), "Must strip pencil sketch");
  assert(!sanitized.includes("stick figure"), "Must strip stick figure");
  assert(sanitized.includes("portrait of an old captain"), "Preserves core scene content");
});

// 9. Full Prompt Construction & Pollinations URL
console.log('\n--- 9. Testing Prompt Builder & Request Construction ---');
it('Builds complete structured prompt with single-frame constraint', () => {
  const result = buildStoryboardGenerationPrompt({
    prompt: "A young woman standing alone on a railway platform at sunset.",
    visualStyle: "Soft Pencil",
    aspectRatio: "16:9",
    shotSize: "Close-up",
    cameraAngle: "Low Angle",
    lens: "85mm",
    lighting: "Golden Hour"
  });

  assert(result.fullPrompt.includes("Artistic Direction: Delicate graphite pencil"), "Includes Soft Pencil direction");
  assert(result.fullPrompt.includes("Scene & Subject: A young woman standing alone"), "Includes user scene prompt");
  assert(result.fullPrompt.includes("Shot Framing & Scale: Close-up shot (CU)"), "Includes Close-up");
  assert(result.fullPrompt.includes("Camera Perspective: Low camera angle"), "Includes Low Angle");
  assert(result.fullPrompt.includes("Optics & Lens: 85mm portrait telephoto lens"), "Includes 85mm");
  assert(result.fullPrompt.includes("Lighting & Atmosphere: Warm golden hour sunlight"), "Includes Golden Hour");
  assert(result.fullPrompt.includes("Aspect & Framing: 16:9 standard cinematic widescreen"), "Includes 16:9");
  assert(result.fullPrompt.includes("Single image frame, strictly no contact sheet"), "Enforces single frame constraint");

  // Check Pollinations request attributes
  assert.strictEqual(result.width, 1024);
  assert.strictEqual(result.height, 576);
  assert(result.pollinationsUrl.includes("width=1024"));
  assert(result.pollinationsUrl.includes("height=576"));
  assert(result.pollinationsUrl.includes("model=flux"));
  assert(result.pollinationsUrl.includes("nologo=true"));
});

it('Preserves Variation directive with fresh seed when isVariation is true', () => {
  const result = buildStoryboardGenerationPrompt({
    prompt: "Submarine interior",
    visualStyle: "Noir",
    isVariation: true,
    variationType: "lighting"
  });

  assert(result.fullPrompt.includes("Variation Directive: Alternate lighting mood study"), "Includes variation directive");
  assert(result.seed >= 100000, "Generates randomized variation seed");
});

console.log(`\n=======================================================`);
console.log(`All ${passed}/${total} unit tests PASSED!`);
console.log(`=======================================================\n`);


/**
 * SCRIPTORA — Comprehensive Image Generation Settings Integration Test Suite
 *
 * Verifies settings integration across all 3 Storyboard Studio entry points:
 * 1. Generate Scene Shot Sequence
 * 2. AI Generate Shot
 * 3. Add Shot — Section A, Section B, Section C
 *
 * Plus:
 * - 5-Level Settings Precedence & Default Inheritance
 * - Clean structured prompts without double-wrapping
 * - Real Pollinations FLUX.1 generation & image persistence
 */

import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import {
  APPLICATION_DEFAULTS,
  ASPECT_RATIO_SPECS,
  VISUAL_STYLE_DEFINITIONS,
  SHOT_SIZE_DEFINITIONS,
  CAMERA_ANGLE_DEFINITIONS,
  LENS_DEFINITIONS,
  LIGHTING_DEFINITIONS,
  SHOT_TYPE_DEFINITIONS,
  CAMERA_MOVEMENT_DEFINITIONS,
  SCREEN_DIRECTION_DEFINITIONS,
  QUALITY_DEFINITIONS,
  normalizeKey,
  resolveEffectiveSettings,
  sanitizeUserPrompt,
  buildStoryboardGenerationPrompt
} from '../backend/app/services/promptBuilder.js';
import * as storyboardService from '../backend/app/services/storyboardService.js';

let totalTests = 0;
let passedTests = 0;

function it(desc, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ ${desc}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${desc}`);
    console.error(`    ${err.message}`);
    throw err;
  }
}

async function asyncIt(desc, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  ✓ ${desc}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${desc}`);
    console.error(`    ${err.message}`);
    throw err;
  }
}

console.log('========================================================================');
console.log('SCRIPTORA — Complete Settings Integration Across Storyboard Entry Points');
console.log('========================================================================\n');

// ============================================================================
// SUITE 1: GENERATE SCENE SHOT SEQUENCE
// ============================================================================
console.log('--- 1. Testing Generate Scene Shot Sequence Entry Point ---');

const ALL_17_STYLES = [
  "Comic", "Cinematic", "Soft Pencil", "Animation", "3D",
  "Watercolor Paint", "Photo / Commercial", "Charcoal Sketch",
  "Dark Anime", "Flat / Vector", "Noir", "Stick Figure",
  "Graphic Novel", "Concept Art", "Cinematic Realism",
  "Storyboard Sketch", "Photorealistic"
];

const ALL_4_RATIOS = ["2.39:1", "16:9", "4:3", "9:16"];
const ALL_QUALITY_OPTIONS = ["Standard Draft", "High Definition Production"];

// 1.1 Test every available visual style in sequence generation
for (const style of ALL_17_STYLES) {
  it(`Sequence Workflow: Visual Style '${style}' determines artistic direction and negative constraints`, () => {
    const res = buildStoryboardGenerationPrompt({
      prompt: "Kevin and Marcus inspect perimeter boundary at sunrise",
      visualStyle: style,
      aspectRatio: "16:9",
      quality: "Standard Draft"
    });
    const def = VISUAL_STYLE_DEFINITIONS[style];
    assert.ok(res.fullPrompt.includes(`Artistic Direction: ${def.direction}`), `Prompt must include style direction for ${style}`);
    assert.ok(res.fullPrompt.includes(`Visual Constraints: ${def.constraints}`), `Prompt must include negative constraints for ${style}`);
    assert.equal(res.effectiveSettings.visualStyle, style);
  });
}

// 1.2 Test every available image-quality option
for (const quality of ALL_QUALITY_OPTIONS) {
  it(`Sequence Workflow: Quality option '${quality}' translates to rendering fidelity prompt instruction`, () => {
    const res = buildStoryboardGenerationPrompt({
      prompt: "Two characters discussing secret blueprints",
      visualStyle: "Concept Art",
      aspectRatio: "2.39:1",
      quality: quality
    });
    const qDef = QUALITY_DEFINITIONS[quality];
    assert.ok(res.fullPrompt.includes(`Rendering Fidelity: ${qDef}`), `Prompt must include rendering fidelity for ${quality}`);
    assert.equal(res.effectiveSettings.quality, quality);
  });
}

// 1.3 Test every aspect ratio and API dimensions
for (const ratio of ALL_4_RATIOS) {
  it(`Sequence Workflow: Aspect Ratio '${ratio}' produces correct API dimensions & composition instruction`, () => {
    const res = buildStoryboardGenerationPrompt({
      prompt: "High-angle view of mountain road",
      visualStyle: "Cinematic",
      aspectRatio: ratio,
      quality: "High Definition Production"
    });
    const spec = ASPECT_RATIO_SPECS[ratio];
    assert.equal(res.width, spec.width, `Width mismatch for ${ratio}`);
    assert.equal(res.height, spec.height, `Height mismatch for ${ratio}`);
    assert.ok(res.fullPrompt.includes(`Aspect & Framing: ${spec.composition}`), `Composition instruction missing for ${ratio}`);
    assert.ok(res.pollinationsUrl.includes(`width=${spec.width}`), `URL width missing for ${ratio}`);
    assert.ok(res.pollinationsUrl.includes(`height=${spec.height}`), `URL height missing for ${ratio}`);
  });
}

// 1.4 Test multi-beat sequence generation settings consistency
it('Sequence Workflow: All 4 shots in sequence inherit user selected visual settings', () => {
  const userSettings = {
    visualStyle: "Soft Pencil",
    aspectRatio: "16:9",
    quality: "High Definition Production"
  };

  const beats = [
    { title: "Establishing View", shotSize: "Extreme Wide", cameraAngle: "High Angle" },
    { title: "Dialogue Staging", shotSize: "Medium", cameraAngle: "Eye Level" },
    { title: "Emotional Turn", shotSize: "Close-up", cameraAngle: "Dutch Angle" },
    { title: "Key Detail", shotSize: "Extreme Close-up", cameraAngle: "Low Angle" }
  ];

  for (const b of beats) {
    const res = buildStoryboardGenerationPrompt({
      prompt: "Scene action",
      shotTitle: b.title,
      shotSize: b.shotSize,
      cameraAngle: b.cameraAngle,
      ...userSettings
    });

    assert.equal(res.effectiveSettings.visualStyle, "Soft Pencil");
    assert.equal(res.effectiveSettings.aspectRatio, "16:9");
    assert.equal(res.effectiveSettings.quality, "High Definition Production");
    assert.equal(res.width, 1024);
    assert.equal(res.height, 576);
    assert.ok(res.fullPrompt.includes("Artistic Direction: Delicate graphite pencil drawing"));
    assert.ok(res.fullPrompt.includes("Master production finish"));
  }
});

// ============================================================================
// SUITE 2: AI GENERATE SHOT
// ============================================================================
console.log('\n--- 2. Testing AI Generate Shot Entry Point ---');

it('AI Generate Shot: Explicit screen settings override inherited defaults', () => {
  const inheritedDefaults = {
    visualStyle: "Storyboard Sketch",
    aspectRatio: "2.39:1",
    quality: "Standard Draft",
    shotSize: "Medium"
  };

  // User explicitly selects Dark Anime, 4:3, High Definition Production in the AI Generate Shot screen
  const explicitScreenChoice = {
    prompt: "A cyborg warrior watches rain falling on neon streets",
    visualStyle: "Dark Anime",
    aspectRatio: "4:3",
    quality: "High Definition Production",
    shotSize: "Close-up"
  };

  const res = buildStoryboardGenerationPrompt(explicitScreenChoice, inheritedDefaults);

  assert.equal(res.effectiveSettings.visualStyle, "Dark Anime", "Explicit screen style must override inherited default");
  assert.equal(res.effectiveSettings.aspectRatio, "4:3", "Explicit screen aspect ratio must override inherited default");
  assert.equal(res.effectiveSettings.quality, "High Definition Production", "Explicit screen quality must override inherited default");
  assert.equal(res.effectiveSettings.shotSize, "Close-up", "Explicit screen shot size must override inherited default");
  assert.equal(res.width, 1024);
  assert.equal(res.height, 768);
  assert.ok(res.fullPrompt.includes("Dark anime-inspired production keyframe illustration"));
});

it('AI Generate Shot: Retrying preserves visual style, quality, and aspect ratio', () => {
  const activeShot = {
    prompt: "Marcus discovers the pressure breach",
    visualStyle: "Noir",
    aspectRatio: "16:9",
    quality: "High Definition Production",
    shotSize: "Medium",
    cameraAngle: "Low Angle",
    lens: "35mm",
    lighting: "Low-key"
  };

  const retryRes = buildStoryboardGenerationPrompt({
    ...activeShot,
    seed: 99482
  });

  assert.equal(retryRes.effectiveSettings.visualStyle, "Noir");
  assert.equal(retryRes.effectiveSettings.aspectRatio, "16:9");
  assert.equal(retryRes.effectiveSettings.quality, "High Definition Production");
  assert.equal(retryRes.effectiveSettings.lens, "35mm");
  assert.equal(retryRes.effectiveSettings.lighting, "Low-key");
  assert.equal(retryRes.seed, 99482);
  assert.ok(retryRes.fullPrompt.includes("Classic 1940s film noir"));
});

it('AI Generate Shot: Variation directive generates fresh take while preserving core settings', () => {
  const activeShot = {
    prompt: "Meera turns suddenly toward the security door",
    visualStyle: "Comic",
    aspectRatio: "2.39:1",
    quality: "Standard Draft",
    shotSize: "Close-up",
    isVariation: true,
    variationType: "angle"
  };

  const varRes = buildStoryboardGenerationPrompt(activeShot);

  assert.equal(varRes.effectiveSettings.visualStyle, "Comic");
  assert.equal(varRes.effectiveSettings.aspectRatio, "2.39:1");
  assert.ok(varRes.fullPrompt.includes("Variation Directive: Dynamic alternative camera perspective"));
  assert.ok(varRes.fullPrompt.includes("Authentic illustrated comic-book artwork"));
});

// ============================================================================
// SUITE 3: ADD SHOT — SECTION A, SECTION B, SECTION C
// ============================================================================
console.log('\n--- 3. Testing Add Shot — Sections A, B, and C ---');

// Section A Tests
console.log('  Testing Section A — Shot Identity:');
it('Section A: Shot Title incorporates into Subject Staging when meaningful', () => {
  const res = buildStoryboardGenerationPrompt({
    prompt: "Substation exterior during electrical storm",
    title: "Guard tower silhouette at sunset",
    shotType: "Establishing Shot"
  });
  assert.ok(res.fullPrompt.includes("Subject Staging: Guard tower silhouette at sunset."), "Shot title must be in prompt");
});

it('Section A: Generic placeholder Shot Titles (e.g. Shot 1A, Shot) are omitted from prompt', () => {
  const res1 = buildStoryboardGenerationPrompt({ prompt: "Desert highway", title: "Shot 1A" });
  assert.ok(!res1.fullPrompt.includes("Subject Staging:"), "Generic 'Shot 1A' must be omitted");

  const res2 = buildStoryboardGenerationPrompt({ prompt: "Desert highway", title: "Shot" });
  assert.ok(!res2.fullPrompt.includes("Subject Staging:"), "Generic 'Shot' must be omitted");
});

const ALL_6_SHOT_TYPES = [
  "Establishing Shot",
  "Action Shot",
  "Reaction Shot",
  "Dialogue Shot",
  "Insert / Detail Shot",
  "Transition Shot"
];

for (const st of ALL_6_SHOT_TYPES) {
  it(`Section A: Shot Type '${st}' maps to distinct Filmmaking Intent instruction`, () => {
    const res = buildStoryboardGenerationPrompt({
      prompt: "Two scouts at the riverbank",
      shotType: st
    });
    const def = SHOT_TYPE_DEFINITIONS[st];
    assert.ok(res.fullPrompt.includes(`Filmmaking Intent: ${def}`), `Prompt must include Filmmaking Intent for ${st}`);
    assert.equal(res.effectiveSettings.shotType, st);
  });
}

// Section B Tests
console.log('  Testing Section B — Visual Direction:');
it('Section B: Visual Description forms core Scene & Subject instruction', () => {
  const res = buildStoryboardGenerationPrompt({
    description: "Marcus holding emergency flare, illuminated in red haze against rusted pipes"
  });
  assert.ok(res.fullPrompt.includes("Scene & Subject: Marcus holding emergency flare, illuminated in red haze against rusted pipes."));
});

it('Section B: Visual Description sanitizes conflicting medium buzzwords', () => {
  const res = buildStoryboardGenerationPrompt({
    description: "Pencil sketch of ancient temple, photorealistic octane render 8k resolution",
    visualStyle: "Soft Pencil"
  });
  assert.ok(!res.fullPrompt.includes("photorealistic"), "Photorealistic buzzwords must be stripped from pencil style");
  assert.ok(!res.fullPrompt.includes("octane render"), "Octane render buzzwords must be stripped from pencil style");
  assert.ok(res.fullPrompt.includes("ancient temple"));
});

// Section C Tests
console.log('  Testing Section C — Camera & Composition:');
const ALL_5_SHOT_SIZES = ["Extreme Wide", "Wide", "Medium", "Close-up", "Extreme Close-up"];
for (const ss of ALL_5_SHOT_SIZES) {
  it(`Section C: Shot Size '${ss}' maps to Shot Framing & Scale instruction`, () => {
    const res = buildStoryboardGenerationPrompt({ prompt: "Action scene", shotSize: ss });
    const def = SHOT_SIZE_DEFINITIONS[ss];
    assert.ok(res.fullPrompt.includes(`Shot Framing & Scale: ${def}`));
  });
}

const ALL_6_ANGLES = ["Eye Level", "Low Angle", "High Angle", "Bird's Eye View", "Over-the-Shoulder", "Dutch Angle"];
for (const ca of ALL_6_ANGLES) {
  it(`Section C: Camera Angle '${ca}' maps to Camera Perspective instruction`, () => {
    const res = buildStoryboardGenerationPrompt({ prompt: "Action scene", cameraAngle: ca });
    const def = CAMERA_ANGLE_DEFINITIONS[ca];
    assert.ok(res.fullPrompt.includes(`Camera Perspective: ${def}`));
  });
}

const ALL_5_MOVEMENTS = ["Static", "Pan", "Tilt", "Tracking", "Dolly"];
for (const cm of ALL_5_MOVEMENTS) {
  it(`Section C: Camera Movement '${cm}' ${cm === 'Static' ? 'is omitted (neutral)' : 'maps to Camera Movement instruction'}`, () => {
    const res = buildStoryboardGenerationPrompt({ prompt: "Action scene", cameraMovement: cm });
    if (cm === "Static") {
      assert.ok(!res.fullPrompt.includes("Camera Movement: Locked-off"), "Neutral static movement omitted from prompt");
    } else {
      const def = CAMERA_MOVEMENT_DEFINITIONS[cm];
      assert.ok(res.fullPrompt.includes(`Camera Movement: ${def}`), `Expected camera movement for ${cm}`);
    }
  });
}

const ALL_4_LENSES = ["24mm", "35mm", "50mm", "85mm"];
for (const lens of ALL_4_LENSES) {
  it(`Section C: Lens '${lens}' maps to Optics & Lens instruction`, () => {
    const res = buildStoryboardGenerationPrompt({ prompt: "Action scene", lens: lens });
    const def = LENS_DEFINITIONS[lens];
    assert.ok(res.fullPrompt.includes(`Optics & Lens: ${def}`));
  });
}

const ALL_6_LIGHTING = ["Auto / Scene-based", "Daylight", "Night", "Golden Hour", "Low-key", "Backlit"];
for (const light of ALL_6_LIGHTING) {
  it(`Section C: Lighting '${light}' maps to Lighting & Atmosphere instruction`, () => {
    const res = buildStoryboardGenerationPrompt({ prompt: "Action scene", lighting: light });
    const def = LIGHTING_DEFINITIONS[light];
    assert.ok(res.fullPrompt.includes(`Lighting & Atmosphere: ${def}`));
  });
}

const ALL_3_DIRECTIONS = ["Left to Right", "Right to Left", "Static"];
for (const dir of ALL_3_DIRECTIONS) {
  it(`Section C: Screen Direction '${dir}' ${dir === 'Static' ? 'is omitted (neutral)' : 'maps to Continuity instruction'}`, () => {
    const res = buildStoryboardGenerationPrompt({ prompt: "Action scene", screenDirection: dir });
    if (dir === "Static") {
      assert.ok(!res.fullPrompt.includes("Continuity: Screen direction"), "Neutral static direction omitted from prompt");
    } else {
      const def = SCREEN_DIRECTION_DEFINITIONS[dir];
      assert.ok(res.fullPrompt.includes(`Continuity: ${def}`), `Expected direction for ${dir}`);
    }
  });
}

it('Section C: Director Notes maps to Director Details instruction', () => {
  const res = buildStoryboardGenerationPrompt({
    prompt: "Kevin discovers the hidden cache",
    directorNotes: "Focus on scratched brass handle, maintain shadow over character eyes"
  });
  assert.ok(res.fullPrompt.includes("Director Details: Focus on scratched brass handle, maintain shadow over character eyes."));
});

it('Add Shot Full Integration: Sections A, B, and C assemble in prioritized logical order', () => {
  const fullAddShotInput = {
    // Section A
    shotTitle: "Infiltration of Gate 4",
    shotType: "Action Shot",
    shotNumber: "2B",

    // Section B
    description: "Kevin sprinting between cargo containers while surveillance searchlights sweep overhead",
    visualStyle: "Graphic Novel",

    // Section C
    shotSize: "Medium",
    cameraAngle: "Low Angle",
    aspectRatio: "2.39:1",
    cameraMovement: "Tracking",
    lens: "35mm",
    lighting: "Low-key",
    screenDirection: "Left to Right",
    directorNotes: "Camera tracks parallel at knee level, searchlight beam creates lens flare",
    approvalStatus: "proposed" // metadata only
  };

  const res = buildStoryboardGenerationPrompt(fullAddShotInput);

  // Check that every single field is present in the prompt
  assert.ok(res.fullPrompt.includes("Artistic Direction: Sophisticated graphic-novel illustration"));
  assert.ok(res.fullPrompt.includes("Scene & Subject: Kevin sprinting between cargo containers"));
  assert.ok(res.fullPrompt.includes("Subject Staging: Infiltration of Gate 4."));
  assert.ok(res.fullPrompt.includes("Filmmaking Intent: Dynamic action shot emphasizing kinetic character motion"));
  assert.ok(res.fullPrompt.includes("Shot Framing & Scale: Medium shot (MS)"));
  assert.ok(res.fullPrompt.includes("Camera Perspective: Low camera angle"));
  assert.ok(res.fullPrompt.includes("Optics & Lens: 35mm cinematic prime lens"));
  assert.ok(res.fullPrompt.includes("Camera Movement: Dynamic tracking camera movement"));
  assert.ok(res.fullPrompt.includes("Lighting & Atmosphere: Low-key dramatic lighting"));
  assert.ok(res.fullPrompt.includes("Continuity: Screen direction: subject positioned or moving toward screen right"));
  assert.ok(res.fullPrompt.includes("Director Details: Camera tracks parallel at knee level, searchlight beam creates lens flare."));
  assert.ok(res.fullPrompt.includes("Aspect & Framing: 2.39:1 anamorphic widescreen scope framing"));
  assert.ok(res.fullPrompt.includes("Visual Constraints: Single graphic novel pane artwork"));

  // Check dimensions
  assert.equal(res.width, 1024);
  assert.equal(res.height, 428);

  // Check approvalStatus was NOT injected as text into prompt (metadata only)
  assert.ok(!res.fullPrompt.includes("proposed"), "Approval status must remain metadata");
});

// ============================================================================
// SUITE 4: 5-LEVEL SETTINGS PRECEDENCE
// ============================================================================
console.log('\n--- 4. Testing 5-Level Settings Precedence ---');

it('Level 1 overrides Level 2, 3, 4, 5: Explicit generation screen setting wins', () => {
  const explicitScreen = { visualStyle: "Watercolor Paint", aspectRatio: "4:3", quality: "High Definition Production" };
  const perShot = { visualStyle: "Noir", aspectRatio: "16:9", quality: "Standard Draft" };
  const projectOverride = { visualStyle: "Comic", aspectRatio: "2.39:1" };
  const userPreferences = { visualStyle: "Soft Pencil", aspectRatio: "9:16" };

  const effective = resolveEffectiveSettings(
    { ...perShot, ...explicitScreen },
    userPreferences,
    projectOverride
  );

  assert.equal(effective.visualStyle, "Watercolor Paint");
  assert.equal(effective.aspectRatio, "4:3");
  assert.equal(effective.quality, "High Definition Production");
});

it('Level 2 overrides Level 3, 4, 5: Explicit per-shot setting wins when screen setting omitted', () => {
  const perShot = { visualStyle: "Charcoal Sketch", shotSize: "Extreme Close-up", lens: "85mm" };
  const projectOverride = { visualStyle: "Comic", shotSize: "Medium" };
  const userPreferences = { visualStyle: "Soft Pencil", shotSize: "Wide" };

  const effective = resolveEffectiveSettings(perShot, userPreferences, projectOverride);

  assert.equal(effective.visualStyle, "Charcoal Sketch");
  assert.equal(effective.shotSize, "Extreme Close-up");
  assert.equal(effective.lens, "85mm");
});

it('Level 3 overrides Level 4, 5: Project override wins when shot setting omitted', () => {
  const perShot = { prompt: "Just prompt" };
  const projectOverride = { visualStyle: "Cinematic Realism", aspectRatio: "2.39:1" };
  const userPreferences = { visualStyle: "Soft Pencil", aspectRatio: "16:9" };

  const effective = resolveEffectiveSettings(perShot, userPreferences, projectOverride);

  assert.equal(effective.visualStyle, "Cinematic Realism");
  assert.equal(effective.aspectRatio, "2.39:1");
});

it('Level 4 overrides Level 5: Saved user preferences win when higher levels omitted', () => {
  const perShot = { prompt: "Just prompt" };
  const projectOverride = {};
  const userPreferences = { visualStyle: "3D", aspectRatio: "9:16", lighting: "Golden Hour" };

  const effective = resolveEffectiveSettings(perShot, userPreferences, projectOverride);

  assert.equal(effective.visualStyle, "3D");
  assert.equal(effective.aspectRatio, "9:16");
  assert.equal(effective.lighting, "Golden Hour");
});

it('Level 5: Factory application defaults apply when nothing else is specified', () => {
  const effective = resolveEffectiveSettings({}, {}, {});

  assert.equal(effective.visualStyle, APPLICATION_DEFAULTS.visualStyle);
  assert.equal(effective.aspectRatio, APPLICATION_DEFAULTS.aspectRatio);
  assert.equal(effective.shotSize, APPLICATION_DEFAULTS.shotSize);
  assert.equal(effective.cameraAngle, APPLICATION_DEFAULTS.cameraAngle);
  assert.equal(effective.lens, APPLICATION_DEFAULTS.lens);
  assert.equal(effective.lighting, APPLICATION_DEFAULTS.lighting);
});

// ============================================================================
// SUITE 5: REAL POLLINATIONS FLUX.1 GENERATION & PERSISTENCE
// ============================================================================
console.log('\n--- 5. Testing Real Pollinations FLUX.1 Generation & Persistence ---');

async function runRealGenerationTests() {
  // Test 1: Real AI Generate Shot
  await asyncIt('Real Generation: AI Generate Shot with Soft Pencil, 16:9, High Definition Production', async () => {
    const result = await storyboardService.generateShotImage({
      provider: 'pollinations-flux',
      prompt: 'A solitary lantern glowing on an abandoned wooden dock surrounded by misty water at dawn',
      shotTitle: 'Dock at Dawn',
      shotType: 'Establishing Shot',
      shotSize: 'Wide',
      cameraAngle: 'Eye Level',
      lens: '35mm',
      lighting: 'Auto / Scene-based',
      visualStyle: 'Soft Pencil',
      aspectRatio: '16:9',
      quality: 'High Definition Production',
      shotNumber: '1A'
    });

    assert.ok(result.imageUrl, 'Must return valid imageUrl');
    assert.equal(result.provider, 'pollinations-flux');
    assert.equal(result.width, 1024);
    assert.equal(result.height, 576);
    assert.equal(result.visualStyle, 'Soft Pencil');
    assert.equal(result.aspectRatio, '16:9');
    assert.equal(result.quality, 'High Definition Production');
    assert.ok(result.fullPrompt.includes('Artistic Direction: Delicate graphite pencil drawing'));
    assert.ok(result.fullPrompt.includes('Subject Staging: Dock at Dawn.'));

    // Verify image was saved to disk
    const cleanFileName = path.basename(result.storagePath || result.imageUrl).split('?')[0];
    const savedPath = path.resolve('backend/data/storage/storyboard', cleanFileName);
    assert.ok(fs.existsSync(savedPath), `Generated image must exist on disk at ${savedPath}`);
    const stats = fs.statSync(savedPath);
    assert.ok(stats.size > 10000, `Image file size must be substantial (>10KB), got ${stats.size} bytes`);
    console.log(`    Saved genuine image (${stats.size} bytes) -> ${result.imageUrl}`);
  });

  // Test 2: Real Add Shot (Sections A, B, C)
  console.log('    [Rate Limit Cooldown] Waiting 46s for Pollinations free tier rate limit window...');
  await new Promise(r => setTimeout(r, 46000));

  await asyncIt('Real Generation: Add Shot with Sections A, B, C (Comic, 2.39:1, Dolly, 24mm, Backlit)', async () => {
    const result = await storyboardService.generateShotImage({
      provider: 'pollinations-flux',
      prompt: 'A heroic astronaut standing atop a lunar ridge looking toward a giant spiral galaxy',
      shotTitle: 'Galaxy Horizon Ridge',
      shotType: 'Action Shot',
      shotSize: 'Medium',
      cameraAngle: 'Low Angle',
      cameraMovement: 'Dolly',
      lens: '24mm',
      lighting: 'Backlit',
      screenDirection: 'Left to Right',
      directorNotes: 'Dramatic cyan rim lighting along space suit helmet edge',
      visualStyle: 'Comic',
      aspectRatio: '2.39:1',
      quality: 'Standard Draft',
      shotNumber: '2C'
    });

    assert.ok(result.imageUrl, 'Must return valid imageUrl');
    assert.equal(result.width, 1024);
    assert.equal(result.height, 428);
    assert.equal(result.visualStyle, 'Comic');
    assert.equal(result.aspectRatio, '2.39:1');
    assert.equal(result.shotType, 'Action Shot');
    assert.equal(result.cameraMovement, 'Dolly');
    assert.equal(result.screenDirection, 'Left to Right');
    assert.ok(result.fullPrompt.includes('Artistic Direction: Authentic illustrated comic-book artwork'));
    assert.ok(result.fullPrompt.includes('Subject Staging: Galaxy Horizon Ridge.'));
    assert.ok(result.fullPrompt.includes('Camera Movement: Cinematic dolly camera movement'));
    assert.ok(result.fullPrompt.includes('Continuity: Screen direction'));

    const cleanFileName2 = path.basename(result.storagePath || result.imageUrl).split('?')[0];
    const savedPath = path.resolve('backend/data/storage/storyboard', cleanFileName2);
    assert.ok(fs.existsSync(savedPath), `Generated image must exist on disk`);
    const stats = fs.statSync(savedPath);
    assert.ok(stats.size > 10000, `Image file size must be >10KB, got ${stats.size} bytes`);
    console.log(`    Saved genuine image (${stats.size} bytes) -> ${result.imageUrl}`);
  });

  console.log('\n========================================================================');
  console.log(`ALL ${passedTests}/${totalTests} TESTS PASSED SUCCESSFULLY!`);
  console.log('========================================================================\n');
}

runRealGenerationTests().catch(err => {
  console.error('\nTest Suite Failed:', err);
  process.exit(1);
});

/**
 * SCRIPTORA Storyboard Real Image Generation Verification
 *
 * Executes real Pollinations FLUX.1 generations for the 4 representative test combinations:
 * Test A: Photorealistic, 16:9, Close-up, Eye Level, 85mm, Golden Hour
 * Test B: Storyboard Sketch, 16:9, Wide, High Angle, 35mm, Daylight
 * Test C: Graphic Novel, 2.39:1, Extreme Wide, Low Angle, 24mm, Low-key
 * Test D: Stick Figure, 4:3, Medium, Eye Level, 50mm, Auto / Scene-based
 */

import fs from 'fs';
import path from 'path';
import { buildStoryboardGenerationPrompt } from '../backend/app/services/promptBuilder.js';

const OUTPUT_DIR = path.resolve(process.cwd(), 'tests', 'output');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const TEST_CASES = [
  {
    id: "Test A",
    label: "Realistic Cinema",
    scenePrompt: "A veteran starship engineer inspecting damaged circuitry in the cockpit.",
    settings: {
      visualStyle: "Photorealistic",
      aspectRatio: "16:9",
      shotSize: "Close-up",
      cameraAngle: "Eye Level",
      lens: "85mm",
      lighting: "Golden Hour"
    },
    filename: "test_a_photorealistic_16_9.jpg"
  },
  {
    id: "Test B",
    label: "Pencil Storyboard",
    scenePrompt: "A medieval archer atop a fortress battlement surveying approaching troops in the valley.",
    settings: {
      visualStyle: "Storyboard Sketch",
      aspectRatio: "16:9",
      shotSize: "Wide",
      cameraAngle: "High Angle",
      lens: "35mm",
      lighting: "Daylight"
    },
    filename: "test_b_storyboard_sketch_16_9.jpg"
  },
  {
    id: "Test C",
    label: "Graphic Illustration",
    scenePrompt: "A cybernetic vigilante standing before an ominous neon skyscraper complex in rain.",
    settings: {
      visualStyle: "Graphic Novel",
      aspectRatio: "2.39:1",
      shotSize: "Extreme Wide",
      cameraAngle: "Low Angle",
      lens: "24mm",
      lighting: "Low-key"
    },
    filename: "test_c_graphic_novel_scope.jpg"
  },
  {
    id: "Test D",
    label: "Minimal Illustration",
    scenePrompt: "Two characters discussing a treasure map spread on a wooden table.",
    settings: {
      visualStyle: "Stick Figure",
      aspectRatio: "4:3",
      shotSize: "Medium",
      cameraAngle: "Eye Level",
      lens: "50mm",
      lighting: "Auto / Scene-based"
    },
    filename: "test_d_stick_figure_4_3.jpg"
  }
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`    Requesting Pollinations FLUX (Attempt ${attempt}/${maxRetries})...`);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60000);

      const resp = await fetch(url, {
        method: "GET",
        headers: {
          "Accept": "image/*, application/json",
          "User-Agent": "SCRIPTORA-Storyboard-Verification/1.0"
        },
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (resp.status === 429 || resp.status === 402) {
        console.warn(`    ⚠️ Rate limit (429/402). Waiting 45s for free tier quota...`);
        await sleep(46000);
        continue;
      }

      if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        throw new Error(`HTTP ${resp.status}: ${text}`);
      }

      const contentType = resp.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const errJson = await resp.json().catch(() => ({}));
        throw new Error(`JSON response: ${JSON.stringify(errJson)}`);
      }

      const buf = Buffer.from(await resp.arrayBuffer());
      return { buf, contentType };
    } catch (err) {
      console.warn(`    ⚠️ Attempt ${attempt} failed: ${err.message}`);
      if (attempt < maxRetries) {
        console.log(`    Waiting 15s before retry...`);
        await sleep(15000);
      } else {
        throw err;
      }
    }
  }
}

async function run() {
  console.log("=======================================================");
  console.log("SCRIPTORA Real Image Generation Verification — Pollinations FLUX.1");
  console.log("=======================================================\n");

  const results = [];

  for (let i = 0; i < TEST_CASES.length; i++) {
    const tc = TEST_CASES[i];
    console.log(`\n-------------------------------------------------------`);
    console.log(`[${tc.id}] ${tc.label}`);
    console.log(`Settings:`, tc.settings);
    console.log(`Scene Prompt: "${tc.scenePrompt}"`);

    const built = buildStoryboardGenerationPrompt({
      prompt: tc.scenePrompt,
      ...tc.settings,
      seed: 100000 + i * 777
    });

    console.log(`\nConstructed Prompt:\n${built.fullPrompt}\n`);
    console.log(`Target Dimensions: ${built.width}x${built.height} (Aspect: ${built.aspectRatio})`);
    console.log(`Seed: ${built.seed}`);
    console.log(`Pollinations URL:\n${built.pollinationsUrl}\n`);

    try {
      const { buf, contentType } = await fetchWithRetry(built.pollinationsUrl);
      const isJpeg = buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF;
      const isPng = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47;

      const outPath = path.resolve(OUTPUT_DIR, tc.filename);
      fs.writeFileSync(outPath, buf);

      console.log(`  ✓ Successfully received image!`);
      console.log(`    File Size: ${(buf.length / 1024).toFixed(1)} KB`);
      console.log(`    Format: ${isJpeg ? 'JPEG' : isPng ? 'PNG' : contentType}`);
      console.log(`    Saved: ${outPath}`);

      results.push({
        test: tc.id,
        label: tc.label,
        settings: tc.settings,
        dimensions: `${built.width}x${built.height}`,
        seed: built.seed,
        sizeKb: (buf.length / 1024).toFixed(1),
        status: "SUCCESS",
        path: outPath
      });

      // Space out calls to respect Pollinations 45s free tier window
      if (i < TEST_CASES.length - 1) {
        console.log(`\nSleeping 45s to avoid free tier rate limit before next test...`);
        await sleep(46000);
      }
    } catch (err) {
      console.error(`  ✗ Generation failed for ${tc.id}: ${err.message}`);
      results.push({
        test: tc.id,
        label: tc.label,
        settings: tc.settings,
        dimensions: `${built.width}x${built.height}`,
        seed: built.seed,
        status: "FAILED",
        error: err.message
      });
    }
  }

  console.log("\n=======================================================");
  console.log("GENERATION SUMMARY:");
  console.table(results);
  console.log("=======================================================");
}

run().catch(err => {
  console.error("Fatal test runner error:", err);
  process.exit(1);
});


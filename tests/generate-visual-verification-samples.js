/**
 * Generates sample images for visual verification:
 * 1. Cinematic Realism (Portrait 9:16, Close-up, Low-key, 85mm)
 * 2. Stick Figure (Standard 4:3, Wide, High Angle, Minimalist)
 *
 * Honors the 46s rate limit cooldown.
 */

import fs from 'fs';
import path from 'path';
import * as storyboardService from '../backend/app/services/storyboardService.js';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('--- Generating Sample 1: Cinematic Realism (Portrait 9:16) ---');
  const sample1 = await storyboardService.generateShotImage({
    scriptId: 'chronicles-of-dust',
    provider: 'pollinations-flux',
    prompt: 'Intense detective in trenchcoat standing under neon rain in dark cyber city alleyway',
    visualStyle: 'Cinematic Realism',
    aspectRatio: '9:16',
    quality: 'High Definition Production',
    shotSize: 'Close-Up',
    cameraAngle: 'Eye Level',
    lens: '85mm',
    lighting: 'Low-key'
  });
  console.log('Sample 1 Generated:');
  console.log('  Persistent URL:', sample1.persistentUrl);
  console.log('  Supabase URL:', sample1.imageUrl);
  console.log('  Dimensions:', sample1.width, 'x', sample1.height);

  console.log('\n[Cooldown] Waiting 46s for Pollinations rate limit window...');
  await sleep(46000);

  console.log('\n--- Generating Sample 2: Stick Figure (Standard 4:3) ---');
  const sample2 = await storyboardService.generateShotImage({
    scriptId: 'chronicles-of-dust',
    provider: 'pollinations-flux',
    prompt: 'Minimalist stick figure runner jumping over high hurdle on a track, simple stick drawing with black lines on clean white paper',
    visualStyle: 'Stick Figure',
    aspectRatio: '4:3',
    quality: 'Standard Draft',
    shotSize: 'Wide',
    cameraAngle: 'High Angle',
    lens: '35mm',
    lighting: 'Daylight'
  });
  console.log('Sample 2 Generated:');
  console.log('  Persistent URL:', sample2.persistentUrl);
  console.log('  Supabase URL:', sample2.imageUrl);
  console.log('  Dimensions:', sample2.width, 'x', sample2.height);

  console.log('\nBoth verification samples generated successfully!');
}

run().catch(console.error);


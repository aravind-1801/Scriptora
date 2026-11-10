import assert from 'node:assert/strict';
import fs from 'fs';
import * as storyboardService from '../backend/app/services/storyboardService.js';

console.log('================================================================');
console.log('SCRIPTORA — Real AI Storyboard Generation & Persistence E2E Test');
console.log('================================================================\n');

async function runTests() {
  // ---------------------------------------------------------------------------
  // TEST 1: Provider Catalog & Free Tier Enforcement
  // ---------------------------------------------------------------------------
  console.log('--- TEST 1: Inspect Provider Catalog & Defaults ---');
  const providers = storyboardService.getAiProviders();
  const pollProv = providers.find(p => p.id === 'pollinations-flux');

  assert.ok(pollProv, "Provider 'pollinations-flux' must exist in getAiProviders()");
  assert.equal(pollProv.model, 'flux', "Model must be 'flux' (FLUX.1)");
  assert.equal(pollProv.pricingType, 'free', "Pricing must be free");
  assert.equal(pollProv.requiresApiKey, false, "Must not require an API key");
  assert.ok(pollProv.aspectRatios.includes('2.39:1'), "Must support 2.39:1 aspect ratio");
  assert.ok(pollProv.aspectRatios.includes('16:9'), "Must support 16:9 aspect ratio");
  console.log('✓ Pollinations FLUX.1 registered as verified Free AI generation provider');

  // ---------------------------------------------------------------------------
  // TEST 2: Asynchronous Job Lifecycle (Queued -> Processing -> Completed)
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST 2: Asynchronous Generation Job Queue ---');
  const scriptId = 'test-script-flux';
  const sceneId = 'scene-1';

  const testParams = {
    provider: 'pollinations-flux',
    prompt: 'A cinematic medium-wide shot of a young woman standing alone at a railway platform during golden hour, realistic Indian cinema cinematography, natural lighting, detailed environment.',
    shotNumber: '1A',
    shotSize: 'Medium Shot',
    cameraAngle: 'Eye Level',
    focalLength: '50mm Prime',
    lightingMood: 'Golden Hour Warm Sunlight',
    aspectRatio: '2.39:1',
    visualStyle: 'Cinematic Concept Art',
    sceneHeading: 'EXT. RAILWAY PLATFORM - DUSK'
  };

  // Immediate job dispatch (< 50ms)
  const jobInit = storyboardService.createGenerationJob(scriptId, testParams);
  assert.ok(jobInit.jobId, 'createGenerationJob must return a jobId');
  assert.equal(jobInit.status, 'queued', 'Initial status must be queued');
  console.log(`✓ Job ${jobInit.jobId} created instantly without blocking`);

  // Poll job status until completed
  console.log('Polling job status...');
  const pollStart = Date.now();
  let finalJob = null;
  while (Date.now() - pollStart < 45000) {
    await new Promise(r => setTimeout(r, 1500));
    const job = storyboardService.getGenerationJob(jobInit.jobId);
    assert.ok(job, 'Job must exist in job store');
    console.log(`  [+${((Date.now() - pollStart)/1000).toFixed(1)}s] Status: ${job.status} (${job.progress}%) - ${job.statusMessage}`);
    if (job.status === 'completed' || job.status === 'failed') {
      finalJob = job;
      break;
    }
  }

  assert.ok(finalJob, 'Job must complete within polling window');
  assert.equal(finalJob.status, 'completed', `Job should complete successfully. Error if any: ${finalJob.error}`);
  assert.ok(finalJob.result, 'Job must contain result object');
  assert.ok(finalJob.result.imageUrl, 'Result must contain imageUrl');
  console.log(`✓ Real image generation finished in ${((Date.now() - pollStart)/1000).toFixed(1)}s`);

  // ---------------------------------------------------------------------------
  // TEST 3: Image Data Validation (Real base64 Data URI & Magic Bytes)
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST 3: Validate Generated Image Data ---');
  const imageUrl = finalJob.result.imageUrl;
  assert.ok(imageUrl.startsWith('data:image/'), 'Image URL must be a base64 Data URI');
  
  const matches = imageUrl.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
  assert.ok(matches, 'Image URL must match valid Data URL pattern');
  const mimeType = matches[1];
  const imgBuffer = Buffer.from(matches[2], 'base64');
  
  console.log(`Image MIME: ${mimeType}, Decoded Size: ${imgBuffer.length} bytes`);
  assert.ok(imgBuffer.length > 10000, 'Image buffer must be greater than 10KB (real graphic)');
  
  // Verify JPEG/PNG magic bytes
  const isJpeg = imgBuffer[0] === 0xFF && imgBuffer[1] === 0xD8;
  const isPng = imgBuffer[0] === 0x89 && imgBuffer[1] === 0x50 && imgBuffer[2] === 0x4E && imgBuffer[3] === 0x47;
  assert.ok(isJpeg || isPng, 'Image must have genuine JPEG (FF D8) or PNG (89 50 4E 47) magic headers');
  console.log('✓ Authentic image headers and non-empty binary confirmed');

  // ---------------------------------------------------------------------------
  // TEST 4: Storyboard Shot Persistence & Retrieval
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST 4: Shot Persistence in Storyboard Storage ---');
  // Add shot with the real generated image
  const addResult = storyboardService.addShot(scriptId, sceneId, {
    shotNumber: '1A',
    title: 'Platform Solitude',
    description: testParams.prompt,
    imageUrl: imageUrl,
    aspectRatio: '2.39:1',
    provider: 'pollinations-flux',
    quality: 'hd'
  });

  const shotId = addResult.shot.id;
  assert.ok(shotId, 'Shot must receive unique ID');

  // Re-read storyboard from storage (simulating refresh/reload)
  const sbAfterSave = storyboardService.getStoryboardByScene(scriptId, sceneId);
  const persistedShot = sbAfterSave.shots.find(s => s.id === shotId);
  assert.ok(persistedShot, 'Shot must be retrieved from storyboard storage');
  assert.equal(persistedShot.imageUrl, imageUrl, 'Saved imageUrl must match generated image exactly');
  assert.equal(persistedShot.aspectRatio, '2.39:1', 'Aspect ratio must persist');
  assert.equal(persistedShot.provider, 'pollinations-flux', 'Provider must persist');
  console.log('✓ Shot with real generated image persisted and retrieved reliably');

  // ---------------------------------------------------------------------------
  // TEST 5: Variation Generation & History Stacking
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST 5: Variation Generation & Version History ---');
  // Respect Pollinations public free tier window (1 image per 45s per IP)
  const elapsedSinceFirst = (Date.now() - pollStart) / 1000;
  if (elapsedSinceFirst < 46) {
    const waitSec = Math.ceil(46 - elapsedSinceFirst);
    console.log(`Waiting ${waitSec}s to respect free tier rate limit window before variation...`);
    await new Promise(r => setTimeout(r, waitSec * 1000));
  }

  const variationParams = {
    ...testParams,
    shotId,
    isVariation: true,
    variationType: 'lighting',
    prompt: testParams.prompt + ' (alternative twilight mood)',
    seed: 98765
  };

  const variationJobInit = storyboardService.createGenerationJob(scriptId, variationParams);
  let finalVarJob = null;
  const varStart = Date.now();
  while (Date.now() - varStart < 45000) {
    await new Promise(r => setTimeout(r, 1500));
    const job = storyboardService.getGenerationJob(variationJobInit.jobId);
    if (job.status === 'completed' || job.status === 'failed') {
      finalVarJob = job;
      break;
    }
  }

  assert.ok(finalVarJob && finalVarJob.status === 'completed', 'Variation job must complete');
  const variationImageUrl = finalVarJob.result.imageUrl;
  assert.ok(variationImageUrl, 'Variation must produce new image');
  assert.notEqual(variationImageUrl, imageUrl, 'Variation must produce distinct image bytes from original');

  // Update shot with variation
  const updateResult = storyboardService.updateShot(scriptId, sceneId, shotId, {
    imageUrl: variationImageUrl,
    prompt: variationParams.prompt,
    isVariation: true,
    variationType: 'lighting'
  });

  assert.equal(updateResult.shot.imageUrl, variationImageUrl, 'Current shot image should be updated to variation');
  assert.ok(Array.isArray(updateResult.shot.history), 'Shot history array must exist');
  assert.equal(updateResult.shot.history.length, 1, 'History must contain 1 archived take');
  assert.equal(updateResult.shot.history[0].previousImageUrl, imageUrl, 'History must archive original take 1 image');
  console.log('✓ Variation generated, shot updated, and original image safely preserved in version history');

  // ---------------------------------------------------------------------------
  // TEST 6: Version History Restoration
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST 6: Restore Previous Version from History ---');
  const restored = storyboardService.restoreShotVersion(scriptId, sceneId, shotId, 0);
  assert.equal(restored.shot.imageUrl, imageUrl, 'Restored shot must reinstate original take 1 image');
  assert.equal(restored.shot.history.length, 2, 'Restoring must append current state to history for non-destructive undo');
  console.log('✓ Previous take restored cleanly without data loss');

  console.log('\n================================================================');
  console.log('🎉 ALL REAL AI IMAGE GENERATION & PERSISTENCE TESTS PASSED!');
  console.log('================================================================');
}

runTests().catch(err => {
  console.error('\n❌ TEST RUN FAILED:', err);
  process.exit(1);
});

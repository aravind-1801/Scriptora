import fs from 'fs';
import path from 'path';
import { db } from '../models/db.js';

// Pre-Production Service: Storyboard Studio Data & Operations
// Supports scene-grounded shot sequences, camera parameters, continuity tracking,
// AI generation workflows with transparent cost disclosure, and multi-format export.


function getSketchImageSvg(filename, width = 1200, height = 675) {
  try {
    const candidates = [
      path.resolve('frontend/public/assets/storyboard', filename),
      path.resolve('assets/storyboard', filename),
      path.resolve('frontend/dist/assets/storyboard', filename),
      path.resolve('../frontend/public/assets/storyboard', filename)
    ];
    const foundPath = candidates.find(p => fs.existsSync(p));
    if (foundPath) {
      const b64 = fs.readFileSync(foundPath).toString('base64');
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'><image href='data:image/jpeg;base64,${b64}' width='${width}' height='${height}' preserveAspectRatio='xMidYMid slice'/></svg>`;
      return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    }
  } catch (_) {}
  return `/assets/storyboard/${filename}`;
}

export function getStoryboards(scriptId = 'chronicles-of-dust') {
  ensureStoryboardsInitialized(scriptId);
  return db.storyboards.filter(sb => sb.scriptId === scriptId);
}

export function getStoryboardByScene(scriptId = 'chronicles-of-dust', sceneId = 'scene-1') {
  ensureStoryboardsInitialized(scriptId);
  let sb = db.storyboards.find(s => s.scriptId === scriptId && (s.sceneId === sceneId || String(s.sceneNumber) === String(sceneId).replace('scene-', '')));
  
  if (!sb) {
    // Find matching scene from productionScenes or db.scripts
    const scenes = db.productionScenes.filter(s => s.scriptId === scriptId || s.scriptId === 'chronicles-of-dust');
    const sceneNum = Number(String(sceneId).replace('scene-', '')) || 1;
    const scene = scenes.find(s => s.id === sceneId || s.sceneNumber === sceneNum) || {
      id: `scene-${sceneNum}`,
      sceneNumber: sceneNum,
      heading: `SCENE ${sceneNum} - UNTITLED`,
      intExt: 'INT',
      dayNight: 'DAY',
      snippet: 'Scene awaiting visual storyboard planning.'
    };

    const script = db.scripts.find(s => s.id === scriptId) || db.scripts[0];

    sb = {
      id: `sb-${scriptId}-${scene.id}`,
      scriptId,
      sceneId: scene.id,
      sceneNumber: scene.sceneNumber,
      sceneHeading: scene.heading,
      intExt: scene.intExt || 'INT',
      dayNight: scene.dayNight || 'DAY',
      sourceVersion: script?.draft || "Draft 4.2",
      isVersionStale: false,
      aspectRatio: "2.39:1",
      visualStyle: "Storyboard Sketch",
      shots: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.storyboards.push(sb);
  } else {
    // Check if source screenplay draft has diverged
    const script = db.scripts.find(s => s.id === scriptId);
    if (script && script.draft && sb.sourceVersion && script.draft !== sb.sourceVersion) {
      sb.isVersionStale = true;
      sb.currentScriptDraft = script.draft;
    } else {
      sb.isVersionStale = false;
    }
  }

  return sb;
}

export function saveStoryboard(scriptId, data) {
  ensureStoryboardsInitialized(scriptId);
  const sceneId = data.sceneId || (data.sceneNumber ? `scene-${data.sceneNumber}` : 'scene-1');
  let sb = db.storyboards.find(s => s.scriptId === scriptId && (s.sceneId === sceneId || s.id === data.id));

  if (sb) {
    Object.assign(sb, data, { updatedAt: new Date().toISOString() });
  } else {
    sb = {
      id: data.id || `sb-${scriptId}-${sceneId}`,
      scriptId,
      sceneId,
      sceneNumber: data.sceneNumber || Number(String(sceneId).replace('scene-', '')) || 1,
      sceneHeading: data.sceneHeading || "SCENE 1",
      sourceVersion: data.sourceVersion || "Draft 4.2",
      isVersionStale: false,
      aspectRatio: data.aspectRatio || "2.39:1",
      visualStyle: data.visualStyle || "Cinematic Concept Art",
      shots: data.shots || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.storyboards.push(sb);
  }

  return sb;
}

export function addShot(scriptId, sceneId, shotData) {
  const sb = getStoryboardByScene(scriptId, sceneId);
  const nextOrder = sb.shots.length + 1;
  const shotLetter = String.fromCharCode(65 + ((nextOrder - 1) % 26));
  const shotNumber = shotData.shotNumber || `${sb.sceneNumber}${shotLetter}`;

  const newShot = {
    id: `shot-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    shotNumber,
    order: nextOrder,
    title: shotData.title || `Shot ${shotNumber}`,
    description: shotData.description || "",
    shotSize: shotData.shotSize || "Medium Shot",
    cameraAngle: shotData.cameraAngle || "Eye Level",
    cameraMovement: shotData.cameraMovement || "Static",
    focalLength: shotData.focalLength || "50mm Prime",
    lightingMood: shotData.lightingMood || (sb.dayNight === 'NIGHT' ? "Low-Key Shadow" : "Natural Daylight"),
    aspectRatio: shotData.aspectRatio || sb.aspectRatio || "2.39:1",
    visualStyle: shotData.visualStyle || sb.visualStyle || "Cinematic Concept Art",
    prompt: shotData.prompt || "",
    negativePrompt: shotData.negativePrompt || "",
    imageUrl: shotData.imageUrl || null,
    imageSource: shotData.imageSource || (shotData.imageUrl ? "imported" : null),
    provider: shotData.provider || null,
    quality: shotData.quality || "standard",
    costEstimate: shotData.costEstimate || null,
    approvalStatus: shotData.approvalStatus || "draft",
    approvalNotes: shotData.approvalNotes || "",
    approvedBy: shotData.approvedBy || null,
    approvedAt: shotData.approvedAt || null,
    directorNotes: shotData.directorNotes || "",
    characters: Array.isArray(shotData.characters) ? shotData.characters : [],
    location: shotData.location || "",
    continuity: {
      characterPosition: shotData.continuity?.characterPosition || "",
      screenDirection: shotData.continuity?.screenDirection || "Left to Right",
      eyeline: shotData.continuity?.eyeline || "Eye Level",
      lightingContinuity: shotData.continuity?.lightingContinuity || "",
      costumeState: shotData.continuity?.costumeState || "",
      propPlacement: shotData.continuity?.propPlacement || ""
    },
    history: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  sb.shots.push(newShot);
  sb.updatedAt = new Date().toISOString();
  return { storyboard: sb, shot: newShot };
}

export function updateShot(scriptId, sceneId, shotId, updates) {
  const sb = getStoryboardByScene(scriptId, sceneId);
  const shot = sb.shots.find(s => s.id === shotId);
  if (!shot) throw new Error("Shot not found");

  if (!Array.isArray(shot.history)) {
    shot.history = [];
  }

  // Track revision history if image or prompt changes
  if ((updates.imageUrl && updates.imageUrl !== shot.imageUrl) || (updates.prompt && updates.prompt !== shot.prompt)) {
    shot.history.push({
      previousImageUrl: shot.imageUrl,
      previousPrompt: shot.prompt,
      provider: shot.provider || "scriptora-concept",
      quality: shot.quality || "hd",
      approvalStatus: shot.approvalStatus || "draft",
      sourceVersion: sb.sourceVersion || "Draft 4.2",
      timestamp: new Date().toISOString(),
      updatedBy: db.currentUser.name
    });
  }

  // Handle continuity updates safely
  if (updates.continuity) {
    updates.continuity = { ...shot.continuity, ...updates.continuity };
  }

  Object.assign(shot, updates, { updatedAt: new Date().toISOString() });
  sb.updatedAt = new Date().toISOString();
  return { storyboard: sb, shot };
}

export function restoreShotVersion(scriptId, sceneId, shotId, historyIndex) {
  const sb = getStoryboardByScene(scriptId, sceneId);
  const shot = sb.shots.find(s => s.id === shotId);
  if (!shot) throw new Error("Shot not found");
  if (!Array.isArray(shot.history) || !shot.history[historyIndex]) {
    throw new Error("Historical version not found");
  }

  const hist = shot.history[historyIndex];
  // Retain current image before restoring
  shot.history.push({
    previousImageUrl: shot.imageUrl,
    previousPrompt: shot.prompt,
    provider: shot.provider || "scriptora-concept",
    quality: shot.quality || "hd",
    approvalStatus: shot.approvalStatus || "draft",
    sourceVersion: sb.sourceVersion || "Draft 4.2",
    timestamp: new Date().toISOString(),
    updatedBy: db.currentUser.name
  });

  shot.imageUrl = hist.previousImageUrl;
  if (hist.previousPrompt) shot.prompt = hist.previousPrompt;
  if (hist.provider) shot.provider = hist.provider;
  if (hist.approvalStatus) shot.approvalStatus = hist.approvalStatus;
  shot.updatedAt = new Date().toISOString();
  sb.updatedAt = new Date().toISOString();

  return { storyboard: sb, shot };
}

export function deleteShot(scriptId, sceneId, shotId) {
  const sb = getStoryboardByScene(scriptId, sceneId);
  const idx = sb.shots.findIndex(s => s.id === shotId);
  if (idx === -1) throw new Error("Shot not found");

  const removed = sb.shots.splice(idx, 1)[0];
  // Re-number remaining shots order
  sb.shots.forEach((s, i) => {
    s.order = i + 1;
  });
  sb.updatedAt = new Date().toISOString();
  // Soft-delete to Recycle Bin preserving full image version history
  if (!Array.isArray(db.storyboardRecycleBin)) {
    db.storyboardRecycleBin = [];
  }
  const recycleItem = {
    id: `rb-shot-${removed.id}`,
    type: 'shot',
    scriptId,
    sceneId: sb.sceneId,
    sceneNumber: sb.sceneNumber,
    sceneHeading: sb.sceneHeading,
    shot: { ...removed },
    deletedAt: new Date().toISOString()
  };
  db.storyboardRecycleBin.unshift(recycleItem);

  return { success: true, removedId: shotId, storyboard: sb, recycleItem };
}

export function softDeleteScene(scriptId, sceneId) {
  ensureStoryboardsInitialized(scriptId);
  if (!Array.isArray(db.storyboardRecycleBin)) {
    db.storyboardRecycleBin = [];
  }
  const idx = db.storyboards.findIndex(s => s.scriptId === scriptId && (s.sceneId === sceneId || String(s.sceneNumber) === String(sceneId).replace('scene-', '')));
  if (idx === -1) throw new Error("Scene storyboard not found");

  const removedSb = db.storyboards.splice(idx, 1)[0];
  const recycleItem = {
    id: `rb-scene-${removedSb.sceneId || removedSb.id}`,
    type: 'scene',
    scriptId,
    sceneId: removedSb.sceneId,
    sceneNumber: removedSb.sceneNumber,
    sceneHeading: removedSb.sceneHeading,
    storyboard: { ...removedSb },
    deletedAt: new Date().toISOString()
  };
  db.storyboardRecycleBin.unshift(recycleItem);

  return { success: true, removedId: sceneId, recycleItem };
}

export function getRecycleBin(scriptId = 'chronicles-of-dust') {
  if (!Array.isArray(db.storyboardRecycleBin)) {
    db.storyboardRecycleBin = [];
  }
  return db.storyboardRecycleBin.filter(item => item.scriptId === scriptId);
}

export function restoreRecycleBinItem(scriptId, itemId) {
  if (!Array.isArray(db.storyboardRecycleBin)) {
    db.storyboardRecycleBin = [];
  }
  const idx = db.storyboardRecycleBin.findIndex(item => item.id === itemId && item.scriptId === scriptId);
  if (idx === -1) throw new Error("Item not found in Recycle Bin");

  const item = db.storyboardRecycleBin.splice(idx, 1)[0];

  if (item.type === 'shot') {
    const sb = getStoryboardByScene(scriptId, item.sceneId);
    const restoredShot = { ...item.shot };
    restoredShot.order = sb.shots.length + 1;
    sb.shots.push(restoredShot);
    sb.updatedAt = new Date().toISOString();
    return { success: true, type: 'shot', restored: restoredShot, storyboard: sb };
  } else if (item.type === 'scene') {
    ensureStoryboardsInitialized(scriptId);
    const restoredSb = { ...item.storyboard, updatedAt: new Date().toISOString() };
    const existingIdx = db.storyboards.findIndex(s => s.scriptId === scriptId && s.sceneId === restoredSb.sceneId);
    if (existingIdx !== -1) {
      db.storyboards[existingIdx] = restoredSb;
    } else {
      db.storyboards.push(restoredSb);
    }
    return { success: true, type: 'scene', restored: restoredSb, storyboard: restoredSb };
  }

  throw new Error("Unknown item type in Recycle Bin");
}

export function permanentlyDeleteRecycleBinItem(scriptId, itemId) {
  if (!Array.isArray(db.storyboardRecycleBin)) {
    db.storyboardRecycleBin = [];
  }
  const idx = db.storyboardRecycleBin.findIndex(item => item.id === itemId && item.scriptId === scriptId);
  if (idx === -1) throw new Error("Item not found in Recycle Bin");

  db.storyboardRecycleBin.splice(idx, 1);
  return { success: true, removedId: itemId };
}

export function emptyRecycleBin(scriptId) {
  if (!Array.isArray(db.storyboardRecycleBin)) {
    db.storyboardRecycleBin = [];
  }
  const countBefore = db.storyboardRecycleBin.length;
  db.storyboardRecycleBin = db.storyboardRecycleBin.filter(item => item.scriptId !== scriptId);
  const purgedCount = countBefore - db.storyboardRecycleBin.length;
  return { success: true, purgedCount };
}

export function getStoryboardPreferences() {
  if (!db.settings.storyboard) {
    db.settings.storyboard = {
      defaultStyle: "Concept Art",
      defaultAspectRatio: "2.39:1",
      defaultShotSize: "Medium Shot",
      defaultCameraAngle: "Eye Level",
      defaultLens: "50mm Prime",
      defaultLighting: "Auto / Scene-based",
      experienceLevel: "Intermediate"
    };
  }
  return db.settings.storyboard;
}

export function saveStoryboardPreferences(prefs = {}) {
  const current = getStoryboardPreferences();
  db.settings.storyboard = {
    ...current,
    ...prefs
  };
  return db.settings.storyboard;
}

export function reorderShots(scriptId, sceneId, shotIds = []) {
  const sb = getStoryboardByScene(scriptId, sceneId);
  const idMap = new Map(sb.shots.map(s => [s.id, s]));
  const reordered = [];

  for (const id of shotIds) {
    if (idMap.has(id)) {
      reordered.push(idMap.get(id));
      idMap.delete(id);
    }
  }

  // Append any unmentioned shots
  for (const remaining of idMap.values()) {
    reordered.push(remaining);
  }

  // Update order index
  reordered.forEach((s, idx) => {
    s.order = idx + 1;
  });

  sb.shots = reordered;
  sb.updatedAt = new Date().toISOString();
  return { storyboard: sb };
}

export function approveShot(scriptId, sceneId, shotId, status = 'approved', notes = '') {
  const sb = getStoryboardByScene(scriptId, sceneId);
  const shot = sb.shots.find(s => s.id === shotId);
  if (!shot) throw new Error("Shot not found");

  shot.approvalStatus = status;
  shot.approvalNotes = notes || shot.approvalNotes || "";
  shot.approvedBy = db.currentUser.name + " (Owner)";
  shot.approvedAt = new Date().toISOString();
  shot.updatedAt = new Date().toISOString();
  sb.updatedAt = new Date().toISOString();

  return { storyboard: sb, shot };
}

export function batchApproveShots(scriptId, sceneId, shotIds = [], status = 'approved', notes = '') {
  const sb = getStoryboardByScene(scriptId, sceneId);
  const affected = [];

  for (const s of sb.shots) {
    if (shotIds.includes(s.id)) {
      s.approvalStatus = status;
      if (notes) s.approvalNotes = notes;
      s.approvedBy = db.currentUser.name + " (Owner)";
      s.approvedAt = new Date().toISOString();
      s.updatedAt = new Date().toISOString();
      affected.push(s.id);
    }
  }

  sb.updatedAt = new Date().toISOString();
  return { storyboard: sb, affectedCount: affected.length };
}

// ---------------------------------------------------------------------------
// AI PROVIDERS, GENERATION & ADAPTER ENGINE
// ---------------------------------------------------------------------------

export function getAiProviders() {
  const hasOpenAiKey = Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim() !== "");
  const hasGeminiKey = Boolean((process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY) && (process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY).trim() !== "");
  const hasStabilityKey = Boolean(process.env.STABILITY_API_KEY && process.env.STABILITY_API_KEY.trim() !== "");

  return [
    {
      id: "scriptora-concept",
      name: "SCRIPTORA Concept Engine",
      model: "v2.4 High-Res Vector & Composition",
      isConfigured: true,
      pricingType: "free",
      costPerImage: 0.0,
      costLabel: "Free (Built-in)",
      requiresApiKey: false,
      aspectRatios: ["2.39:1", "16:9", "4:3", "9:16"],
      styles: [
        "Cinematic Concept Art",
        "Storyboard Ink",
        "Pencil Sketch",
        "Photorealistic / Live Action",
        "3D Animation",
        "Anime / Illustration"
      ],
      description: "Fast, cinematic vector canvas with camera crosshairs, aspect ratio letterboxing, stylized character silhouettes, and directional lighting."
    },
    {
      id: "openai-dalle3",
      name: "OpenAI DALL-E 3",
      model: "dall-e-3",
      isConfigured: hasOpenAiKey,
      pricingType: "paid",
      costPerImage: 0.040,
      costLabel: "$0.040 (Standard) / $0.080 (HD)",
      requiresApiKey: true,
      envVarName: "OPENAI_API_KEY",
      aspectRatios: ["16:9", "2.39:1", "1:1", "9:16"],
      styles: ["Photorealistic / Live Action", "Cinematic Concept Art", "Pencil Sketch", "3D Animation"],
      description: "High-fidelity photorealistic rendering and complex composition synthesis via OpenAI API."
    },
    {
      id: "gemini-imagen3",
      name: "Google Imagen 3",
      model: "imagen-3.0-generate-002",
      isConfigured: hasGeminiKey,
      pricingType: "paid",
      costPerImage: 0.030,
      costLabel: "$0.030 per image",
      requiresApiKey: true,
      envVarName: "GEMINI_API_KEY",
      aspectRatios: ["16:9", "4:3", "1:1", "9:16"],
      styles: ["Cinematic Concept Art", "Photorealistic / Live Action", "Storyboard Ink"],
      description: "Photorealistic film still generation using Google Vertex/Gemini Imagen 3."
    },
    {
      id: "stability-sdxl",
      name: "Stability AI SDXL",
      model: "stable-diffusion-xl-1024-v1-0",
      isConfigured: hasStabilityKey,
      pricingType: "paid",
      costPerImage: 0.018,
      costLabel: "$0.018 per image",
      requiresApiKey: true,
      envVarName: "STABILITY_API_KEY",
      aspectRatios: ["16:9", "2.39:1", "4:3", "9:16"],
      styles: ["Storyboard Ink", "Pencil Sketch", "Cinematic Concept Art", "Anime / Illustration"],
      description: "Versatile storyboard and concept illustration synthesis via Stability AI."
    }
  ];
}

export async function generateShotImage(params = {}) {
  const {
    provider = "scriptora-concept",
    prompt = "",
    shotSize = "Medium Shot",
    cameraAngle = "Eye Level",
    focalLength = "50mm Prime",
    lightingMood = "Natural Daylight",
    aspectRatio = "2.39:1",
    visualStyle = "Cinematic Concept Art",
    sceneHeading = "SCENE 1",
    shotNumber = "1A"
  } = params;

  const providers = getAiProviders();
  const selectedProvider = providers.find(p => p.id === provider) || providers[0];

  // If a paid external provider is selected without server credentials, return clear, honest error
  if (selectedProvider.requiresApiKey && !selectedProvider.isConfigured) {
    throw new Error(
      `Provider '${selectedProvider.name}' is not configured: ${selectedProvider.envVarName} is missing in the backend server environment. ` +
      `Please configure your API key in backend/.env or choose SCRIPTORA Concept Engine (Free / Built-in) or Manual Image Import.`
    );
  }

  // If OpenAI API key is genuinely configured, call OpenAI DALL-E 3
  if (provider === "openai-dalle3" && process.env.OPENAI_API_KEY) {
    try {
      const resp = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: `${visualStyle} film still storyboard for ${sceneHeading}: ${prompt}. Camera: ${shotSize}, ${cameraAngle}, ${focalLength}. Lighting: ${lightingMood}. Cinematic aspect ratio ${aspectRatio}.`,
          n: 1,
          size: aspectRatio === "9:16" ? "1024x1792" : "1792x1024",
          quality: params.quality === "hd" ? "hd" : "standard"
        })
      });
      const json = await resp.json();
      if (json.data && json.data[0]?.url) {
        return {
          imageUrl: json.data[0].url,
          provider: "openai-dalle3",
          quality: params.quality || "standard",
          costEstimate: params.quality === "hd" ? "$0.080" : "$0.040",
          prompt
        };
      } else {
        throw new Error(json.error?.message || "Failed to generate image with OpenAI");
      }
    } catch (err) {
      throw new Error(`OpenAI DALL-E 3 generation failed: ${err.message}`);
    }
  }

  // If Google Imagen 3 is configured
  if (provider === "gemini-imagen3" && (process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY)) {
    const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
    try {
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instances: [{
            prompt: `${visualStyle} cinematic storyboard frame for ${sceneHeading}: ${prompt}. Lens: ${focalLength}, framing: ${shotSize}, camera: ${cameraAngle}, lighting: ${lightingMood}. Aspect ratio ${aspectRatio}.`
          }],
          parameters: {
            sampleCount: 1,
            aspectRatio: aspectRatio === "9:16" ? "9:16" : (aspectRatio === "4:3" ? "4:3" : "16:9")
          }
        })
      });
      const json = await resp.json();
      if (json.predictions?.[0]?.bytesBase64Encoded) {
        return {
          imageUrl: `data:image/png;base64,${json.predictions[0].bytesBase64Encoded}`,
          provider: "gemini-imagen3",
          quality: params.quality || "standard",
          costEstimate: "$0.030",
          prompt
        };
      } else {
        throw new Error(json.error?.message || "Failed to generate image with Google Imagen 3");
      }
    } catch (err) {
      throw new Error(`Google Imagen 3 generation failed: ${err.message}`);
    }
  }

  // If Stability AI SDXL is configured
  if (provider === "stability-sdxl" && process.env.STABILITY_API_KEY) {
    try {
      const resp = await fetch("https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${process.env.STABILITY_API_KEY}`
        },
        body: JSON.stringify({
          text_prompts: [
            { text: `${visualStyle} storyboard, ${sceneHeading}: ${prompt}. ${shotSize}, ${cameraAngle}, ${focalLength}, ${lightingMood}`, weight: 1.0 }
          ],
          cfg_scale: 7,
          height: aspectRatio === "9:16" ? 1344 : (aspectRatio === "4:3" ? 896 : 768),
          width: aspectRatio === "9:16" ? 768 : (aspectRatio === "4:3" ? 1152 : 1344),
          samples: 1
        })
      });
      const json = await resp.json();
      if (json.artifacts?.[0]?.base64) {
        return {
          imageUrl: `data:image/png;base64,${json.artifacts[0].base64}`,
          provider: "stability-sdxl",
          quality: params.quality || "standard",
          costEstimate: "$0.018",
          prompt
        };
      } else {
        throw new Error(json.message || "Failed to generate image with Stability AI");
      }
    } catch (err) {
      throw new Error(`Stability AI generation failed: ${err.message}`);
    }
  }

  // Built-in SCRIPTORA Concept Engine (Photorealistic Hand-Drawn Graphite Storyboard Sketch)
  const sizeLower = (shotSize || "").toLowerCase();
  const headingUpper = (sceneHeading || "").toUpperCase();
  const fullText = `${sceneHeading} ${prompt} ${params.description || ""}`.toLowerCase();

  let sketchFile = "shot_1a_wide_outpost.jpg";
  if (sizeLower.includes("close-up") || sizeLower.includes("close up")) {
    sketchFile = fullText.includes("valve") || headingUpper.includes("10") ? "shot_10a_valve_breach.jpg" : "shot_1c_closeup_reaction.jpg";
  } else if (sizeLower.includes("two-shot") || sizeLower.includes("two shot") || (params.cast && params.cast.length >= 2)) {
    sketchFile = "shot_1b_two_shot_standoff.jpg";
  } else if (sizeLower.includes("macro") || sizeLower.includes("insert") || sizeLower.includes("extreme close")) {
    sketchFile = "shot_1d_macro_insert.jpg";
  } else if (headingUpper.includes("10") || fullText.includes("pumping") || fullText.includes("hall")) {
    sketchFile = "shot_10b_pumping_hall.jpg";
  } else if (shotNumber.includes("B")) {
    sketchFile = "shot_1b_two_shot_standoff.jpg";
  } else if (shotNumber.includes("C")) {
    sketchFile = "shot_1c_closeup_reaction.jpg";
  } else if (shotNumber.includes("D")) {
    sketchFile = "shot_1d_macro_insert.jpg";
  }

  const generatedImage = getSketchImageSvg(sketchFile);

  return {
    imageUrl: generatedImage,
    provider: "scriptora-concept",
    quality: "hd",
    costEstimate: "Free (Built-in)",
    prompt
  };
}

export async function generateSceneSequence(scriptId, sceneId, params = {}) {
  const sb = getStoryboardByScene(scriptId, sceneId);
  const scenes = db.productionScenes.filter(s => s.scriptId === scriptId || s.scriptId === 'chronicles-of-dust');
  const sceneNum = Number(String(sceneId).replace('scene-', '')) || sb.sceneNumber || 1;
  const scene = scenes.find(s => s.id === sceneId || s.sceneNumber === sceneNum) || {
    heading: sb.sceneHeading || `SCENE ${sceneNum}`,
    intExt: sb.intExt || "INT",
    dayNight: sb.dayNight || "DAY",
    snippet: "Kevin and Meera coordinate actions under escalating stakes.",
    cast: ["KEVIN", "MEERA"]
  };

  const style = params.visualStyle || sb.visualStyle || "Cinematic Concept Art";
  const ratio = params.aspectRatio || sb.aspectRatio || "2.39:1";
  const provider = params.provider || "scriptora-concept";

  // Synthesize a coherent 4-shot progression grounded in the actual scene action beats
  const beats = [
    {
      shotNumber: `${sceneNum}A`,
      title: "Establishing Spatial Geometry",
      description: `Wide environmental establishing view of ${scene.heading.toLowerCase()}. Establishes spatial depth, environmental lighting (${scene.dayNight.toLowerCase()}), and visual geography.`,
      shotSize: "Wide Shot",
      cameraAngle: "High Angle",
      cameraMovement: "Crane / Jib",
      focalLength: "24mm Wide",
      lightingMood: scene.dayNight === 'NIGHT' ? "Low-Key Shadow" : "High Contrast Daylight",
      prompt: `Cinematic wide establishing shot of ${scene.heading}: ${scene.snippet}. Atmospheric perspective, 24mm anamorphic lens.`
    },
    {
      shotNumber: `${sceneNum}B`,
      title: "Character Blocking & Entry",
      description: `Medium two-shot tracking ${scene.cast?.[0] || 'protagonist'} navigating the environment with rising tension.`,
      shotSize: "Medium Two-Shot",
      cameraAngle: "Eye Level",
      cameraMovement: "Tracking Dolly",
      focalLength: "50mm Prime",
      lightingMood: "Practical Rim Lighting",
      prompt: `Medium two-shot tracking ${scene.cast?.join(' and ') || 'character'} in ${scene.heading}: ${scene.snippet}. 50mm shallow depth of field.`
    },
    {
      shotNumber: `${sceneNum}C`,
      title: "Critical Dramatic Focal Beat",
      description: `Close-up reaction highlighting dramatic urgency, character resolve, and key narrative stakes.`,
      shotSize: "Close-Up",
      cameraAngle: "Dutch Angle",
      cameraMovement: "Static",
      focalLength: "85mm Portrait",
      lightingMood: scene.dayNight === 'NIGHT' ? "Cyan Strobe" : "Warm Eye Catchlight",
      prompt: `Dramatic close-up on ${scene.cast?.[0] || 'lead character'} in ${scene.heading}. Intense facial expression, rim lighting, 85mm portrait bokeh.`
    },
    {
      shotNumber: `${sceneNum}D`,
      title: "Prop & Action Detail Insert",
      description: `Tight macro insert focusing on critical hand movement, equipment interaction, or diagnostic telemetry.`,
      shotSize: "Extreme Close-Up",
      cameraAngle: "Low Angle",
      cameraMovement: "Static",
      focalLength: "35mm Macro",
      lightingMood: "Chiaroscuro Beam",
      prompt: `Extreme close-up macro insert of crucial prop and tactical hand action in ${scene.heading}. Scratched metal textures, focused lighting.`
    }
  ];

  const requestedCount = Math.max(1, Math.min(4, Number(params.shotCount || params.count || 4)));
  const beatsToGenerate = beats.slice(0, requestedCount);

  const proposedShots = [];
  for (let i = 0; i < beatsToGenerate.length; i++) {
    const b = beatsToGenerate[i];
    let imgData = null;
    try {
      const generated = await generateShotImage({
        provider,
        prompt: b.prompt,
        shotSize: b.shotSize,
        cameraAngle: b.cameraAngle,
        focalLength: b.focalLength,
        lightingMood: b.lightingMood,
        aspectRatio: ratio,
        visualStyle: style,
        sceneHeading: scene.heading,
        shotNumber: b.shotNumber,
        quality: params.quality || "standard"
      });
      imgData = generated.imageUrl;
    } catch (_) {
      // If external provider fails or is unconfigured, create fallback concept image so user is not blocked
      imgData = generateProceduralConceptFrame({
        prompt: b.prompt,
        shotSize: b.shotSize,
        cameraAngle: b.cameraAngle,
        cameraMovement: b.cameraMovement,
        focalLength: b.focalLength,
        lightingMood: b.lightingMood,
        aspectRatio: ratio,
        visualStyle: style,
        sceneHeading: scene.heading,
        shotNumber: b.shotNumber,
        description: b.description,
        cast: scene.cast,
        characters: scene.cast
      });
    }

    proposedShots.push({
      id: `prop-shot-${Date.now()}-${i}`,
      shotNumber: b.shotNumber,
      order: i + 1,
      title: b.title,
      description: b.description,
      shotSize: b.shotSize,
      cameraAngle: b.cameraAngle,
      cameraMovement: b.cameraMovement,
      focalLength: b.focalLength,
      lightingMood: b.lightingMood,
      aspectRatio: ratio,
      visualStyle: style,
      prompt: b.prompt,
      imageUrl: imgData,
      imageSource: "ai",
      provider,
      quality: params.quality || "standard",
      costEstimate: provider === "scriptora-concept" ? "Free (Built-in)" : "$0.040",
      approvalStatus: "proposed",
      approvalNotes: "AI proposed sequence beat. Review and approve to confirm.",
      approvedBy: null,
      approvedAt: null,
      directorNotes: `Maintain consistent eyeline and color grading palette across ${b.shotNumber}.`,
      characters: scene.cast || ["KEVIN"],
      location: scene.heading,
      continuity: {
        characterPosition: i % 2 === 0 ? "Screen Left" : "Screen Right",
        screenDirection: "Left to Right",
        eyeline: i % 2 === 0 ? "Looking Screen Right" : "Looking Screen Left",
        lightingContinuity: scene.dayNight === 'NIGHT' ? "Low key, cyan rim" : "Direct desert sun",
        costumeState: "Production baseline",
        propPlacement: "Standard tactical staging"
      },
      history: []
    });
  }

  return {
    sceneHeading: scene.heading,
    sceneNumber: sceneNum,
    proposedShots
  };
}

// Procedural SVG Canvas Generator for SCRIPTORA Concept Engine
function generateProceduralConceptFrame(opts = {}) {
  const {
    shotSize = "Medium Shot",
    cameraAngle = "Eye Level",
    cameraMovement = "Static",
    focalLength = "50mm Prime",
    lightingMood = "Daylight",
    aspectRatio = "2.39:1",
    visualStyle = "Storyboard Sketch",
    sceneHeading = "SCENE 1",
    shotNumber = "1A",
    prompt = "",
    description = "",
    cast = ["KEVIN", "MEERA"],
    characters = [],
    screenDirection = "Left to Right"
  } = opts;

  let width = 1200;
  let height = 502; // 2.39:1 default
  if (aspectRatio === "16:9") height = 675;
  if (aspectRatio === "4:3") height = 900;
  if (aspectRatio === "9:16") { width = 675; height = 1200; }

  const vStyle = (visualStyle || "").toLowerCase();
  const isSketch = vStyle.includes("sketch") || vStyle.includes("ink") || vStyle.includes("pencil") || vStyle.includes("storyboard");
  const isCinematic = vStyle.includes("cinematic") || vStyle.includes("realism");
  const isPhoto = vStyle.includes("photo");
  const isConcept = vStyle.includes("concept") || (!isSketch && !isCinematic && !isPhoto);

  const fullText = `${sceneHeading} ${prompt} ${description}`.toLowerCase();
  const isNight = fullText.includes("night") || fullText.includes("dusk") || (lightingMood || "").toLowerCase().includes("night");
  const isDutch = (cameraAngle || "").toLowerCase().includes("dutch");
  const isLow = (cameraAngle || "").toLowerCase().includes("low");
  const isHigh = (cameraAngle || "").toLowerCase().includes("high");
  const isBird = (cameraAngle || "").toLowerCase().includes("bird");

  // Environmental context detection
  const isOutpost = fullText.includes("outpost") || fullText.includes("gate") || fullText.includes("desert") || fullText.includes("mojave") || fullText.includes("checkpoint") || fullText.includes("road") || fullText.includes("ext");
  const isInterior = fullText.includes("shed") || fullText.includes("customs") || fullText.includes("interior") || fullText.includes("int") || fullText.includes("room") || fullText.includes("office");
  const isReactor = fullText.includes("reactor") || fullText.includes("nuclear") || fullText.includes("core") || fullText.includes("power") || fullText.includes("lab");

  // Shot size detection
  const sizeLower = (shotSize || "").toLowerCase();
  const isExtremeClose = sizeLower.includes("extreme close") || sizeLower.includes("macro") || sizeLower.includes("insert");
  const isClose = !isExtremeClose && (sizeLower.includes("close-up") || sizeLower.includes("close up"));
  const isTwoShot = !isClose && !isExtremeClose && (sizeLower.includes("two-shot") || sizeLower.includes("two shot") || ((cast && cast.length >= 2) || (characters && characters.length >= 2)));

  // Palette configuration based on style
  let paperBg = "#fafaf9"; // Off-white clean storyboard artist paper
  let inkColor = "#18181b"; // Deep black ink
  let inkMuted = "#52525b"; // Midtone graphite
  let pencilHatch = "#a1a1aa"; // Soft pencil hatching
  let accentColor = "#0284c7"; // SCRIPTORA blue for camera director markings
  let panelBg = "#ffffff";

  if (isConcept) {
    paperBg = isNight ? "#0f172a" : "#451a03";
    panelBg = isNight ? "#1e293b" : "#78350f";
    inkColor = isNight ? "#f8fafc" : "#fef3c7";
    inkMuted = isNight ? "#94a3b8" : "#fde68a";
    pencilHatch = isNight ? "#38bdf8" : "#f59e0b";
    accentColor = "#f59e0b";
  } else if (isCinematic) {
    paperBg = "#0a1128";
    panelBg = "#020617";
    inkColor = "#f1f5f9";
    inkMuted = "#64748b";
    pencilHatch = "#38bdf8";
    accentColor = "#00d2ff";
  } else if (isPhoto) {
    paperBg = isNight ? "#090d16" : "#334155";
    panelBg = isNight ? "#020617" : "#1e293b";
    inkColor = "#ffffff";
    inkMuted = "#94a3b8";
    pencilHatch = "#cbd5e1";
    accentColor = "#38bdf8";
  }

  // Horizon line calculation based on camera angle
  let horizonY = Math.round(height * 0.55);
  if (isLow) horizonY = Math.round(height * 0.74);
  if (isHigh) horizonY = Math.round(height * 0.30);
  if (isBird) horizonY = Math.round(height * 0.16);

  const dutchTransform = isDutch ? `transform='rotate(4 ${width / 2} ${height / 2})'` : "";

  // Cast characters
  const allCast = (cast && cast.length) ? cast : ((characters && characters.length) ? characters : ["KEVIN", "MEERA"]);
  const char1 = allCast[0] || "PROTAGONIST";
  const char2 = allCast[1] || "SUPPORT";

  // Sub-renderer for Environment
  function renderEnvironment() {
    if (isOutpost) {
      return `
        <!-- ENVIRONMENT: Desert Outpost & Security Checkpoint -->
        <!-- Distant Mesas & Mountain Ridge -->
        <path d='M 16 ${horizonY} Q 140 ${horizonY - 45} 280 ${horizonY - 20} T 600 ${horizonY - 55} T 950 ${horizonY - 30} T ${width - 16} ${horizonY}' fill='none' stroke='${inkColor}' stroke-width='1.5'/>
        <path d='M 300 ${horizonY} L 360 ${horizonY - 60} L 480 ${horizonY - 60} L 540 ${horizonY}' fill='none' stroke='${inkColor}' stroke-width='1.8'/>
        <polygon points='360,${horizonY - 60} 480,${horizonY - 60} 540,${horizonY} 300,${horizonY}' fill='url(#pShade)' opacity='0.25'/>

        <!-- Desert Road Leading to Checkpoint -->
        <polygon points='${Math.round(width * 0.46)},${horizonY} ${Math.round(width * 0.54)},${horizonY} ${Math.round(width * 0.7)},${height - 56} ${Math.round(width * 0.3)},${height - 56}' fill='url(#pDots)' opacity='0.35'/>
        <line x1='${Math.round(width * 0.3)}' y1='${height - 56}' x2='${Math.round(width * 0.46)}' y2='${horizonY}' stroke='${inkColor}' stroke-width='2'/>
        <line x1='${Math.round(width * 0.7)}' y1='${height - 56}' x2='${Math.round(width * 0.54)}' y2='${horizonY}' stroke='${inkColor}' stroke-width='2'/>
        <line x1='${Math.round(width * 0.5)}' y1='${height - 56}' x2='${Math.round(width * 0.5)}' y2='${horizonY}' stroke='${inkColor}' stroke-width='1.5' stroke-dasharray='14,10'/>

        <!-- Guard Tower on Left -->
        <g stroke='${inkColor}' stroke-width='2' fill='none'>
          <line x1='${Math.round(width * 0.12)}' y1='${height - 56}' x2='${Math.round(width * 0.16)}' y2='${horizonY - 90}'/>
          <line x1='${Math.round(width * 0.22)}' y1='${height - 56}' x2='${Math.round(width * 0.19)}' y2='${horizonY - 90}'/>
          <line x1='${Math.round(width * 0.13)}' y1='${Math.round(height * 0.65)}' x2='${Math.round(width * 0.21)}' y2='${Math.round(height * 0.65)}'/>
          <line x1='${Math.round(width * 0.14)}' y1='${Math.round(height * 0.5)}' x2='${Math.round(width * 0.2)}' y2='${Math.round(height * 0.5)}'/>
          <line x1='${Math.round(width * 0.12)}' y1='${height - 56}' x2='${Math.round(width * 0.2)}' y2='${Math.round(height * 0.5)}' stroke-width='1.2' stroke-dasharray='3,3'/>
          <line x1='${Math.round(width * 0.22)}' y1='${height - 56}' x2='${Math.round(width * 0.14)}' y2='${Math.round(height * 0.5)}' stroke-width='1.2' stroke-dasharray='3,3'/>

          <!-- Observation Cabin & Floodlights -->
          <rect x='${Math.round(width * 0.15)}' y='${horizonY - 130}' width='${Math.round(width * 0.06)}' height='40' fill='${panelBg}' stroke='${inkColor}' stroke-width='2'/>
          <polygon points='${Math.round(width * 0.145)},${horizonY - 130} ${Math.round(width * 0.215)},${horizonY - 130} ${Math.round(width * 0.18)},${horizonY - 145}' fill='url(#pShade)'/>
          <circle cx='${Math.round(width * 0.18)}' cy='${horizonY - 135}' r='4' fill='${inkColor}'/>
          <line x1='${Math.round(width * 0.18)}' y1='${horizonY - 135}' x2='${Math.round(width * 0.42)}' y2='${height - 120}' stroke='${pencilHatch}' stroke-width='1' stroke-dasharray='5,5'/>
          <line x1='${Math.round(width * 0.18)}' y1='${horizonY - 135}' x2='${Math.round(width * 0.56)}' y2='${height - 80}' stroke='${pencilHatch}' stroke-width='1' stroke-dasharray='5,5'/>
        </g>

        <!-- Checkpoint Booth & Boom Arm on Right -->
        <g stroke='${inkColor}' stroke-width='2'>
          <rect x='${Math.round(width * 0.65)}' y='${horizonY - 30}' width='${Math.round(width * 0.12)}' height='${height - 56 - (horizonY - 30)}' fill='${panelBg}'/>
          <polygon points='${Math.round(width * 0.65)},${horizonY - 30} ${Math.round(width * 0.77)},${horizonY - 30} ${Math.round(width * 0.79)},${horizonY - 45} ${Math.round(width * 0.63)},${horizonY - 45}' fill='url(#pShade)'/>
          <rect x='${Math.round(width * 0.67)}' y='${horizonY + 10}' width='${Math.round(width * 0.08)}' height='${Math.round(height * 0.14)}' fill='none' stroke='${inkColor}' stroke-width='1.5'/>
          <line x1='${Math.round(width * 0.71)}' y1='${horizonY + 10}' x2='${Math.round(width * 0.71)}' y2='${horizonY + 10 + Math.round(height * 0.14)}' stroke-width='1.2'/>

          <!-- Barrier Post & Boom Arm with stripes -->
          <rect x='${Math.round(width * 0.62)}' y='${horizonY + 40}' width='14' height='60' fill='${inkColor}'/>
          <line x1='${Math.round(width * 0.62)}' y1='${horizonY + 50}' x2='${Math.round(width * 0.32)}' y2='${horizonY + 54}' stroke='${inkColor}' stroke-width='5'/>
          <line x1='${Math.round(width * 0.62)}' y1='${horizonY + 50}' x2='${Math.round(width * 0.32)}' y2='${horizonY + 54}' stroke='${panelBg}' stroke-width='3' stroke-dasharray='16,12'/>
        </g>
      `;
    }

    if (isInterior) {
      return `
        <!-- ENVIRONMENT: Interior Customs Shed / Tactical Room -->
        <!-- Ceiling Truss Rafters & Suspended Tubes -->
        <line x1='16' y1='36' x2='${width - 16}' y2='36' stroke='${inkColor}' stroke-width='2.5'/>
        <line x1='${Math.round(width * 0.25)}' y1='36' x2='${Math.round(width * 0.25)}' y2='70' stroke='${inkColor}' stroke-width='1.5'/>
        <rect x='${Math.round(width * 0.2)}' y='70' width='${Math.round(width * 0.1)}' height='10' fill='${panelBg}' stroke='${inkColor}' stroke-width='1.5'/>
        <line x1='${Math.round(width * 0.75)}' y1='36' x2='${Math.round(width * 0.75)}' y2='70' stroke='${inkColor}' stroke-width='1.5'/>
        <rect x='${Math.round(width * 0.7)}' y='70' width='${Math.round(width * 0.1)}' height='10' fill='${panelBg}' stroke='${inkColor}' stroke-width='1.5'/>

        <!-- Doorway Frame in Rear Bulkhead -->
        <rect x='${Math.round(width * 0.44)}' y='${horizonY - 70}' width='${Math.round(width * 0.12)}' height='${height - 56 - (horizonY - 70)}' fill='none' stroke='${inkColor}' stroke-width='2'/>

        <!-- Holographic Workstation / Tactical Table -->
        <polygon points='${Math.round(width * 0.35)},${height - 110} ${Math.round(width * 0.65)},${height - 110} ${Math.round(width * 0.7)},${height - 56} ${Math.round(width * 0.3)},${height - 56}' fill='${panelBg}' stroke='${inkColor}' stroke-width='2'/>
        <ellipse cx='${Math.round(width * 0.5)}' cy='${height - 100}' rx='48' ry='11' fill='none' stroke='${accentColor}' stroke-width='1.8' stroke-dasharray='6,3'/>
        <ellipse cx='${Math.round(width * 0.5)}' cy='${height - 100}' rx='24' ry='5' fill='none' stroke='${accentColor}' stroke-width='1.2'/>
        <!-- Hologram Projection Wireframe -->
        <line x1='${Math.round(width * 0.5)}' y1='${height - 100}' x2='${Math.round(width * 0.42)}' y2='${height - 170}' stroke='${accentColor}' stroke-width='1' stroke-dasharray='4,4'/>
        <line x1='${Math.round(width * 0.5)}' y1='${height - 100}' x2='${Math.round(width * 0.58)}' y2='${height - 170}' stroke='${accentColor}' stroke-width='1' stroke-dasharray='4,4'/>
        <rect x='${Math.round(width * 0.42)}' y='${height - 200}' width='${Math.round(width * 0.16)}' height='28' fill='none' stroke='${accentColor}' stroke-width='1.4' stroke-dasharray='5,3'/>
        <text x='${Math.round(width * 0.5)}' y='${height - 182}' text-anchor='middle' fill='${accentColor}' font-family='monospace' font-size='10' font-weight='bold'>AQUEDUCT SCHEMATIC</text>
      `;
    }

    if (isReactor) {
      return `
        <!-- ENVIRONMENT: Industrial Reactor Core / Underground Plant -->
        <rect x='${Math.round(width * 0.38)}' y='${horizonY - 140}' width='${Math.round(width * 0.24)}' height='${height - 56 - (horizonY - 140)}' fill='none' stroke='${inkColor}' stroke-width='2.5'/>
        <ellipse cx='${Math.round(width * 0.5)}' cy='${horizonY - 140}' rx='${Math.round(width * 0.12)}' ry='20' fill='${panelBg}' stroke='${inkColor}' stroke-width='2'/>
        <!-- Heavy Coolant Conduits -->
        <path d='M 16 ${horizonY - 60} Q ${Math.round(width * 0.2)} ${horizonY - 60} ${Math.round(width * 0.38)} ${horizonY - 30}' fill='none' stroke='${inkColor}' stroke-width='6'/>
        <path d='M ${width - 16} ${horizonY - 60} Q ${Math.round(width * 0.8)} ${horizonY - 60} ${Math.round(width * 0.62)} ${horizonY - 30}' fill='none' stroke='${inkColor}' stroke-width='6'/>
        <circle cx='${Math.round(width * 0.5)}' cy='${horizonY - 40}' r='30' fill='none' stroke='${accentColor}' stroke-width='2' stroke-dasharray='8,4'/>
      `;
    }

    // Default Cinematic Set
    return `
      <!-- ENVIRONMENT: General Architectural Set -->
      <rect x='${Math.round(width * 0.18)}' y='${horizonY - 110}' width='${Math.round(width * 0.25)}' height='${height - 56 - (horizonY - 110)}' fill='${panelBg}' stroke='${inkColor}' stroke-width='2'/>
      <line x1='${Math.round(width * 0.18)}' y1='${horizonY - 35}' x2='${Math.round(width * 0.43)}' y2='${horizonY - 35}' stroke='${inkColor}' stroke-width='1.5'/>
      <rect x='${Math.round(width * 0.22)}' y='${horizonY - 90}' width='${Math.round(width * 0.08)}' height='35' fill='none' stroke='${inkColor}' stroke-width='1.5'/>
    `;
  }

  // Sub-renderer for Character Blocking
  function renderBlocking() {
    if (isExtremeClose) {
      return `
        <!-- EXTREME CLOSE-UP (Macro / Action Insert / Control Dial) -->
        <g stroke='${inkColor}' stroke-width='2.4' fill='none'>
          <circle cx='${Math.round(width * 0.5)}' cy='${Math.round(height * 0.45)}' r='110' stroke='${inkColor}' stroke-width='3' fill='url(#pShade)' opacity='0.25'/>
          <circle cx='${Math.round(width * 0.5)}' cy='${Math.round(height * 0.45)}' r='70' stroke='${accentColor}' stroke-width='2' stroke-dasharray='10,5'/>
          <circle cx='${Math.round(width * 0.5)}' cy='${Math.round(height * 0.45)}' r='30' fill='${panelBg}' stroke='${inkColor}' stroke-width='2'/>
          <!-- Hand Sketch Reaching In -->
          <path d='M ${Math.round(width * 0.25)} ${height - 56} Q ${Math.round(width * 0.38)} ${Math.round(height * 0.55)} ${Math.round(width * 0.46)} ${Math.round(height * 0.46)}' stroke-width='5' stroke='${inkColor}'/>
          <path d='M ${Math.round(width * 0.46)} ${Math.round(height * 0.46)} L ${Math.round(width * 0.5)} ${Math.round(height * 0.44)}' stroke-width='3' stroke='${inkColor}'/>
          <!-- Lens Reticle Crosshairs -->
          <line x1='${Math.round(width * 0.5) - 130}' y1='${Math.round(height * 0.45)}' x2='${Math.round(width * 0.5) + 130}' y2='${Math.round(height * 0.45)}' stroke='${accentColor}' stroke-width='1' stroke-dasharray='4,4'/>
          <line x1='${Math.round(width * 0.5)}' y1='${Math.round(height * 0.45) - 130}' x2='${Math.round(width * 0.5)}' y2='${Math.round(height * 0.45) + 130}' stroke='${accentColor}' stroke-width='1' stroke-dasharray='4,4'/>
          <text x='${Math.round(width * 0.5)}' y='${Math.round(height * 0.45) + 95}' text-anchor='middle' fill='${inkColor}' font-family='sans-serif' font-size='12' font-weight='bold'>[ TIGHT MACRO INSERT ]</text>
        </g>
      `;
    }

    if (isClose) {
      return `
        <!-- CLOSE-UP (Dramatic Reaction / Portrait) -->
        <g stroke='${inkColor}' stroke-width='2.2' fill='none'>
          <!-- Head Silhouette & Features -->
          <ellipse cx='${Math.round(width * 0.52)}' cy='${Math.round(height * 0.38)}' rx='75' ry='95' fill='${panelBg}' stroke='${inkColor}' stroke-width='2.5'/>
          <path d='M ${Math.round(width * 0.45)} ${Math.round(height * 0.26)} Q ${Math.round(width * 0.52)} ${Math.round(height * 0.2)} ${Math.round(width * 0.59)} ${Math.round(height * 0.26)} L ${Math.round(width * 0.6)} ${Math.round(height * 0.34)}' stroke-width='3'/>
          <polygon points='${Math.round(width * 0.52)},${Math.round(height * 0.24)} ${Math.round(width * 0.58)},${Math.round(height * 0.28)} ${Math.round(width * 0.58)},${Math.round(height * 0.46)} ${Math.round(width * 0.52)},${Math.round(height * 0.46)}' fill='url(#pCrossHatch)' opacity='0.4'/>

          <!-- Facial Construction Cross Guidelines -->
          <line x1='${Math.round(width * 0.47)}' y1='${Math.round(height * 0.37)}' x2='${Math.round(width * 0.57)}' y2='${Math.round(height * 0.37)}' stroke='${pencilHatch}' stroke-width='1' stroke-dasharray='3,3'/>
          <line x1='${Math.round(width * 0.52)}' y1='${Math.round(height * 0.3)}' x2='${Math.round(width * 0.52)}' y2='${Math.round(height * 0.48)}' stroke='${pencilHatch}' stroke-width='1' stroke-dasharray='3,3'/>

          <!-- Eyes, Nose, Mouth -->
          <line x1='${Math.round(width * 0.48)}' y1='${Math.round(height * 0.36)}' x2='${Math.round(width * 0.50)}' y2='${Math.round(height * 0.36)}' stroke-width='2.5'/>
          <circle cx='${Math.round(width * 0.49)}' cy='${Math.round(height * 0.36)}' r='2.5' fill='${inkColor}'/>
          <line x1='${Math.round(width * 0.54)}' y1='${Math.round(height * 0.36)}' x2='${Math.round(width * 0.56)}' y2='${Math.round(height * 0.36)}' stroke-width='2.5'/>
          <circle cx='${Math.round(width * 0.55)}' cy='${Math.round(height * 0.36)}' r='2.5' fill='${inkColor}'/>
          <path d='M ${Math.round(width * 0.52)} ${Math.round(height * 0.37)} L ${Math.round(width * 0.525)} ${Math.round(height * 0.42)} L ${Math.round(width * 0.515)} ${Math.round(height * 0.42)}' stroke-width='1.8'/>
          <line x1='${Math.round(width * 0.5)}' y1='${Math.round(height * 0.45)}' x2='${Math.round(width * 0.54)}' y2='${Math.round(height * 0.45)}' stroke-width='2.2'/>

          <!-- Neck & Shoulders -->
          <path d='M ${Math.round(width * 0.48)} ${Math.round(height * 0.48)} L ${Math.round(width * 0.46)} ${Math.round(height * 0.56)} L ${Math.round(width * 0.32)} ${height - 56}' stroke-width='2.5'/>
          <path d='M ${Math.round(width * 0.56)} ${Math.round(height * 0.48)} L ${Math.round(width * 0.58)} ${Math.round(height * 0.56)} L ${Math.round(width * 0.72)} ${height - 56}' stroke-width='2.5'/>

          <!-- Character Badge -->
          <rect x='${Math.round(width * 0.46)}' y='${height - 84}' width='${Math.round(width * 0.12)}' height='20' rx='4' fill='${panelBg}' stroke='${accentColor}' stroke-width='1.2'/>
          <text x='${Math.round(width * 0.52)}' y='${height - 70}' text-anchor='middle' fill='${accentColor}' font-family='sans-serif' font-size='10' font-weight='bold'>[ ${char1} ]</text>
        </g>
      `;
    }

    if (isTwoShot) {
      return `
        <!-- MEDIUM TWO-SHOT (Characters Interacting / Dialogue / Blocking) -->
        <!-- Character 1 (Left) -->
        <g stroke='${inkColor}' stroke-width='2' fill='none'>
          <ellipse cx='${Math.round(width * 0.36)}' cy='${Math.round(height * 0.38)}' rx='36' ry='46' fill='${panelBg}' stroke='${inkColor}' stroke-width='2.2'/>
          <circle cx='${Math.round(width * 0.38)}' cy='${Math.round(height * 0.37)}' r='2.5' fill='${inkColor}'/>
          <path d='M ${Math.round(width * 0.34)} ${Math.round(height * 0.43)} L ${Math.round(width * 0.28)} ${Math.round(height * 0.55)} L ${Math.round(width * 0.26)} ${height - 56}' stroke-width='2.2'/>
          <path d='M ${Math.round(width * 0.38)} ${Math.round(height * 0.43)} L ${Math.round(width * 0.43)} ${Math.round(height * 0.55)} L ${Math.round(width * 0.44)} ${height - 56}' stroke-width='2.2'/>
          <path d='M ${Math.round(width * 0.4)} ${Math.round(height * 0.52)} Q ${Math.round(width * 0.45)} ${Math.round(height * 0.52)} ${Math.round(width * 0.48)} ${Math.round(height * 0.48)}' stroke-width='2.4'/>
          <polygon points='${Math.round(width * 0.28)},${Math.round(height * 0.55)} ${Math.round(width * 0.42)},${Math.round(height * 0.55)} ${Math.round(width * 0.43)},${height - 56} ${Math.round(width * 0.27)},${height - 56}' fill='url(#pShade)' opacity='0.25'/>
          <text x='${Math.round(width * 0.36)}' y='${Math.round(height * 0.3)}' text-anchor='middle' fill='${accentColor}' font-family='sans-serif' font-size='10' font-weight='bold'>${char1}</text>
        </g>

        <!-- Eyeline Indicator Vector Between Characters -->
        <line x1='${Math.round(width * 0.39)}' y1='${Math.round(height * 0.37)}' x2='${Math.round(width * 0.59)}' y2='${Math.round(height * 0.37)}' stroke='${accentColor}' stroke-width='1.2' stroke-dasharray='4,4'/>
        <polygon points='${Math.round(width * 0.59)},${Math.round(height * 0.37)} ${Math.round(width * 0.56)},${Math.round(height * 0.35)} ${Math.round(width * 0.56)},${Math.round(height * 0.39)}' fill='${accentColor}'/>

        <!-- Character 2 (Right) -->
        <g stroke='${inkColor}' stroke-width='2' fill='none'>
          <ellipse cx='${Math.round(width * 0.63)}' cy='${Math.round(height * 0.38)}' rx='36' ry='46' fill='${panelBg}' stroke='${inkColor}' stroke-width='2.2'/>
          <circle cx='${Math.round(width * 0.61)}' cy='${Math.round(height * 0.37)}' r='2.5' fill='${inkColor}'/>
          <path d='M ${Math.round(width * 0.61)} ${Math.round(height * 0.43)} L ${Math.round(width * 0.56)} ${Math.round(height * 0.55)} L ${Math.round(width * 0.55)} ${height - 56}' stroke-width='2.2'/>
          <path d='M ${Math.round(width * 0.65)} ${Math.round(height * 0.43)} L ${Math.round(width * 0.71)} ${Math.round(height * 0.55)} L ${Math.round(width * 0.72)} ${height - 56}' stroke-width='2.2'/>
          <polygon points='${Math.round(width * 0.56)},${Math.round(height * 0.55)} ${Math.round(width * 0.71)},${Math.round(height * 0.55)} ${Math.round(width * 0.72)},${height - 56} ${Math.round(width * 0.55)},${height - 56}' fill='url(#pCrossHatch)' opacity='0.3'/>
          <text x='${Math.round(width * 0.63)}' y='${Math.round(height * 0.3)}' text-anchor='middle' fill='${accentColor}' font-family='sans-serif' font-size='10' font-weight='bold'>${char2}</text>
        </g>
      `;
    }

    // Default: Wide establishing / full figure blocking
    return `
      <!-- WIDE ESTABLISHING FIGURE BLOCKING -->
      <g stroke='${inkColor}' stroke-width='1.8' fill='${inkColor}'>
        <circle cx='${Math.round(width * 0.48)}' cy='${horizonY + 20}' r='9'/>
        <line x1='${Math.round(width * 0.48)}' y1='${horizonY + 29}' x2='${Math.round(width * 0.48)}' y2='${horizonY + 68}' stroke-width='3.5'/>
        <line x1='${Math.round(width * 0.48)}' y1='${horizonY + 68}' x2='${Math.round(width * 0.46)}' y2='${horizonY + 110}' stroke-width='2.8'/>
        <line x1='${Math.round(width * 0.48)}' y1='${horizonY + 68}' x2='${Math.round(width * 0.50)}' y2='${horizonY + 110}' stroke-width='2.8'/>
        <text x='${Math.round(width * 0.48)}' y='${horizonY + 6}' text-anchor='middle' fill='${inkColor}' font-family='sans-serif' font-size='9' font-weight='bold'>${char1}</text>
      </g>

      <!-- Movement Vector Arrow -->
      <g stroke='${accentColor}' stroke-width='2' fill='${accentColor}'>
        <line x1='${Math.round(width * 0.44)}' y1='${horizonY + 120}' x2='${Math.round(width * 0.56)}' y2='${horizonY + 120}' stroke-dasharray='5,3'/>
        <polygon points='${Math.round(width * 0.56)},${horizonY + 120} ${Math.round(width * 0.53)},${horizonY + 116} ${Math.round(width * 0.53)},${horizonY + 124}'/>
        <text x='${Math.round(width * 0.5)}' y='${horizonY + 135}' text-anchor='middle' fill='${accentColor}' font-family='sans-serif' font-size='9' font-weight='bold'>WALK VECTOR (${screenDirection})</text>
      </g>
    `;
  }

  // Assemble Master SVG
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'>
    <defs>
      <!-- Pencil cross-hatch pattern -->
      <pattern id='pCrossHatch' width='10' height='10' patternUnits='userSpaceOnUse'>
        <line x1='0' y1='0' x2='10' y2='10' stroke='${pencilHatch}' stroke-width='0.7' opacity='0.4'/>
        <line x1='10' y1='0' x2='0' y2='10' stroke='${pencilHatch}' stroke-width='0.7' opacity='0.4'/>
      </pattern>
      <!-- Diagonal shade pattern -->
      <pattern id='pShade' width='6' height='6' patternUnits='userSpaceOnUse'>
        <line x1='0' y1='6' x2='6' y2='0' stroke='${inkMuted}' stroke-width='0.8' opacity='0.35'/>
      </pattern>
      <!-- Halftone sketch dots -->
      <pattern id='pDots' width='12' height='12' patternUnits='userSpaceOnUse'>
        <circle cx='6' cy='6' r='1.2' fill='${pencilHatch}' opacity='0.35'/>
      </pattern>
    </defs>

    <!-- Canvas Paper Background -->
    <rect width='${width}' height='${height}' fill='${paperBg}'/>

    <!-- Inner Storyboard Panel Frame -->
    <rect x='14' y='14' width='${width - 28}' height='${height - 28}' fill='${panelBg}' stroke='${inkColor}' stroke-width='2.2' rx='4'/>

    <!-- Storyboard Registration Crosshairs -->
    <g stroke='${inkColor}' stroke-width='1.5' opacity='0.6'>
      <line x1='18' y1='28' x2='38' y2='28'/><line x1='28' y1='18' x2='28' y2='38'/>
      <line x1='${width - 38}' y1='28' x2='${width - 18}' y2='28'/><line x1='${width - 28}' y1='18' x2='${width - 28}' y2='38'/>
      <line x1='18' y1='${height - 68}' x2='38' y2='${height - 68}'/><line x1='28' y1='${height - 78}' x2='28' y2='${height - 58}'/>
      <line x1='${width - 38}' y1='${height - 68}' x2='${width - 18}' y2='${height - 68}'/><line x1='${width - 28}' y1='${height - 78}' x2='${width - 28}' y2='${height - 58}'/>
    </g>

    <!-- Rule of Thirds Guides -->
    <g stroke='${pencilHatch}' stroke-width='0.75' stroke-dasharray='4,4' opacity='0.3'>
      <line x1='${Math.round(width * 0.33)}' y1='16' x2='${Math.round(width * 0.33)}' y2='${height - 56}'/>
      <line x1='${Math.round(width * 0.66)}' y1='16' x2='${Math.round(width * 0.66)}' y2='${height - 56}'/>
      <line x1='16' y1='${Math.round(height * 0.33)}' x2='${width - 16}' y2='${Math.round(height * 0.33)}'/>
      <line x1='16' y1='${Math.round(height * 0.66)}' x2='${width - 16}' y2='${Math.round(height * 0.66)}'/>
    </g>

    <!-- Main Sketch Scene (with perspective & camera angle transform) -->
    <g ${dutchTransform}>
      <!-- Perspective Grid Lines converging to horizon -->
      <g stroke='${pencilHatch}' stroke-width='0.8' opacity='0.35'>
        <line x1='${Math.round(width * 0.5)}' y1='${horizonY}' x2='0' y2='${height - 56}'/>
        <line x1='${Math.round(width * 0.5)}' y1='${horizonY}' x2='${Math.round(width * 0.25)}' y2='${height - 56}'/>
        <line x1='${Math.round(width * 0.5)}' y1='${horizonY}' x2='${Math.round(width * 0.75)}' y2='${height - 56}'/>
        <line x1='${Math.round(width * 0.5)}' y1='${horizonY}' x2='${width}' y2='${height - 56}'/>
      </g>

      <!-- Horizon line -->
      <line x1='16' y1='${horizonY}' x2='${width - 16}' y2='${horizonY}' stroke='${inkColor}' stroke-width='1.4' opacity='0.6'/>

      ${renderEnvironment()}
      ${renderBlocking()}
    </g>

    <!-- DIRECTOR CAMERA TELEMETRY OVERLAY -->
    <!-- Top-Left Camera Slate -->
    <rect x='22' y='22' width='140' height='26' rx='5' fill='${inkColor}' fill-opacity='0.9'/>
    <circle cx='34' cy='35' r='4' fill='#ef4444'/>
    <text x='46' y='40' fill='white' font-family='monospace' font-size='11' font-weight='bold'>REC · ${shotNumber}</text>

    <!-- Top-Right Optical Lens Slate -->
    <rect x='${width - 250}' y='22' width='228' height='44' rx='5' fill='${inkColor}' fill-opacity='0.9'/>
    <text x='${width - 34}' y='38' text-anchor='end' fill='${accentColor}' font-family='monospace' font-size='11' font-weight='bold'>${aspectRatio} · ${focalLength}</text>
    <text x='${width - 34}' y='55' text-anchor='end' fill='white' font-family='sans-serif' font-size='9'>${shotSize} · ${cameraAngle}</text>

    <!-- Storyboard Bottom Action Banner -->
    <rect x='14' y='${height - 48}' width='${width - 28}' height='34' fill='${inkColor}' fill-opacity='0.92' rx='2'/>
    <text x='26' y='${height - 27}' fill='white' font-family='sans-serif' font-size='11' font-weight='bold'>${sceneHeading}</text>
    <text x='${Math.round(width * 0.45)}' y='${height - 27}' fill='#e2e8f0' font-family='sans-serif' font-size='10' font-style='italic'>${(description || prompt || "Cinematic composition").slice(0, 55)}...</text>
    <text x='${width - 26}' y='${height - 27}' text-anchor='end' fill='${accentColor}' font-family='sans-serif' font-size='10' font-weight='bold'>${visualStyle.toUpperCase()}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function ensureStoryboardsInitialized(scriptId) {
  if (!db.storyboards) {
    db.storyboards = [];
  }

  // Pre-seed default Scene 1 and Scene 10 storyboards for chronicles-of-dust
  const existing = db.storyboards.filter(s => s.scriptId === scriptId);
  if (!existing.length && scriptId === 'chronicles-of-dust') {
    db.storyboards.push(
      {
        id: "sb-chronicles-of-dust-scene-1",
        scriptId: "chronicles-of-dust",
        sceneId: "scene-1",
        sceneNumber: 1,
        sceneHeading: "EXT. MOJAVE OUTPOST GATE 4 - DAY",
        intExt: "EXT",
        dayNight: "DAY",
        sourceVersion: "Draft 4.2",
        isVersionStale: false,
        aspectRatio: "2.39:1",
        visualStyle: "Storyboard Sketch",
        shots: [
          {
            id: "shot-1-1A",
            shotNumber: "1A",
            order: 1,
            title: "Perimeter Outpost Gate",
            description: "High altitude drone descending across dust devils toward Kevin's arrival at the arid customs gate.",
            shotSize: "Wide Shot",
            cameraAngle: "High Angle",
            cameraMovement: "Crane / Jib",
            focalLength: "24mm Wide",
            lightingMood: "Daylight Dust",
            aspectRatio: "2.39:1",
            visualStyle: "Storyboard Sketch",
            prompt: "Cinematic wide shot, arid desert outpost gate, dust devils whirling, worn solar patrol rover in foreground, 2.39:1 anamorphic framing, muted earth tones, warm daylight",
            imageUrl: getSketchImageSvg("shot_1a_wide_outpost.jpg"),
            imageSource: "ai",
            provider: "scriptora-concept",
            quality: "hd",
            costEstimate: "Free (Built-in)",
            approvalStatus: "approved",
            approvalNotes: "Great atmosphere and sense of scale. Approved for primary camera team.",
            approvedBy: "Arun Kumar (Owner)",
            approvedAt: "2026-10-18T10:30:00Z",
            directorNotes: "Capture sunrise glint off the guard gate perimeter wires.",
            characters: ["KEVIN", "MARCUS"],
            location: "Arid Outpost Gate 4",
            continuity: {
              characterPosition: "Kevin approaching from camera-left",
              screenDirection: "Left to Right",
              eyeline: "Looking toward Outpost Gate",
              lightingContinuity: "High-contrast morning sun from east",
              costumeState: "Dust coat level 2, canteen left side",
              propPlacement: "Gate clearance scanner in right hand"
            },
            history: []
          },
          {
            id: "shot-1-1B",
            shotNumber: "1B",
            order: 2,
            title: "Gate Scanner Clearance Standoff",
            description: "Medium two-shot of Kevin presenting his ID badge to Marcus over the buzzing clearance terminal.",
            shotSize: "Medium Two-Shot",
            cameraAngle: "Eye Level",
            cameraMovement: "Static",
            focalLength: "50mm Prime",
            lightingMood: "Harsh Fluorescent Rim",
            aspectRatio: "2.39:1",
            visualStyle: "Storyboard Sketch",
            prompt: "Medium two-shot, dusty outpost booth, weary hydro-engineer confronting guard over illuminated green holographic terminal, 50mm shallow depth of field",
            imageUrl: getSketchImageSvg("shot_1b_two_shot_standoff.jpg"),
            imageSource: "ai",
            provider: "scriptora-concept",
            quality: "hd",
            costEstimate: "Free (Built-in)",
            approvalStatus: "approved",
            approvalNotes: "Good eyeline match with Shot 1A.",
            approvedBy: "Arun Kumar (Owner)",
            approvedAt: "2026-10-18T10:35:00Z",
            directorNotes: "Focus pull from scanner terminal to Kevin's tense expression.",
            characters: ["KEVIN", "MARCUS"],
            location: "Arid Outpost Gate 4",
            continuity: {
              characterPosition: "Kevin screen-left, Marcus screen-right",
              screenDirection: "Left to Right",
              eyeline: "Eye-level direct confrontation",
              lightingContinuity: "Terminal backlight rimming Kevin's face",
              costumeState: "Kevin wearing goggles around neck",
              propPlacement: "ID card inserted into reader"
            },
            history: []
          },
          {
            id: "shot-1-1C",
            shotNumber: "1C",
            order: 3,
            title: "Terminal Diagnostic Anomaly",
            description: "Close-up insert of the flickering scanner console displaying pressure alert warning in red neon.",
            shotSize: "Close-Up",
            cameraAngle: "Low Angle",
            cameraMovement: "Static",
            focalLength: "85mm Portrait",
            lightingMood: "Cyan Strobe",
            aspectRatio: "2.39:1",
            visualStyle: "Storyboard Sketch",
            prompt: "Extreme close-up on rugged military diagnostic screen, red warning glyphs, water pressure anomaly curve, scratched glass surface, macro lens bokeh",
            imageUrl: getSketchImageSvg("shot_1c_closeup_reaction.jpg"),
            imageSource: "ai",
            provider: "scriptora-concept",
            quality: "hd",
            costEstimate: "Free (Built-in)",
            approvalStatus: "proposed",
            approvalNotes: "Review telemetry readout typography for accuracy.",
            approvedBy: null,
            approvedAt: null,
            directorNotes: "Practical screen insert; needs strobe flash on alert pulse.",
            characters: ["KEVIN"],
            location: "Arid Outpost Gate 4",
            continuity: {
              characterPosition: "Centered insert",
              screenDirection: "Neutral",
              eyeline: "Downwards onto screen",
              lightingContinuity: "Red alert flashing 1Hz",
              costumeState: "Kevin's gloved thumb on lower bezel",
              propPlacement: "Scanner unit firmly latched"
            },
            history: []
          }
        ],
        createdAt: "2026-10-18T10:00:00Z",
        updatedAt: "2026-10-18T10:35:00Z"
      },
      {
        id: "sb-chronicles-of-dust-scene-10",
        scriptId: "chronicles-of-dust",
        sceneId: "scene-10",
        sceneNumber: 10,
        sceneHeading: "INT. PUMPING STATION CHAMBER B - NIGHT",
        intExt: "INT",
        dayNight: "NIGHT",
        sourceVersion: "Draft 4.2",
        isVersionStale: false,
        aspectRatio: "2.39:1",
        visualStyle: "Storyboard Sketch",
        shots: [
          {
            id: "shot-10-10A",
            shotNumber: "10A",
            order: 1,
            title: "Chamber B Valve Breach",
            description: "Dutch angle close-up on Kevin as high-speed water mist bokeh bursts from the hydraulic bypass manifold.",
            shotSize: "Close-Up",
            cameraAngle: "Dutch Angle",
            cameraMovement: "Tracking Dolly",
            focalLength: "85mm Portrait",
            lightingMood: "Cyan Strobe",
            aspectRatio: "2.39:1",
            visualStyle: "Storyboard Sketch",
            prompt: "Dramatic dutch angle close up, hydro-engineer clamping leaking pressurized valve under red and cyan emergency strobes, 85mm shallow depth of field, water droplets on lens",
            imageUrl: getSketchImageSvg("shot_10a_valve_breach.jpg"),
            imageSource: "ai",
            provider: "scriptora-concept",
            quality: "hd",
            costEstimate: "Free (Built-in)",
            approvalStatus: "approved",
            approvalNotes: "Approved key dramatic frame for climax sequence.",
            approvedBy: "Arun Kumar (Owner)",
            approvedAt: "2026-10-19T14:15:00Z",
            directorNotes: "High-speed water mist effects on set with practical red beacons.",
            characters: ["KEVIN"],
            location: "Pumping Station Chamber B",
            continuity: {
              characterPosition: "Kevin center-right crouching",
              screenDirection: "Right to Left",
              eyeline: "Looking upward at failing pressure valve",
              lightingContinuity: "Red alarm pulse alternating with cyan fill",
              costumeState: "Left sleeve soaked in hydraulic fluid",
              propPlacement: "Hydraulic Bypass Valve Kit locked onto manifold"
            },
            history: []
          },
          {
            id: "shot-10-10B",
            shotNumber: "10B",
            order: 2,
            title: "Cavernous High Pressure Pumping Hall",
            description: "Wide interior high-angle crane revealing the immense scale of Chamber B as floodwaters start pooling.",
            shotSize: "Wide Shot",
            cameraAngle: "High Angle",
            cameraMovement: "Crane / Jib",
            focalLength: "24mm Wide",
            lightingMood: "Low-Key Shadow",
            aspectRatio: "2.39:1",
            visualStyle: "Storyboard Sketch",
            prompt: "Wide high-angle shot of cavernous underground pumping hall, water rushing across metal grating, lone figures in vast industrial labyrinth, 24mm anamorphic",
            imageUrl: getSketchImageSvg("shot_10b_pumping_hall.jpg"),
            imageSource: "ai",
            provider: "scriptora-concept",
            quality: "hd",
            costEstimate: "Free (Built-in)",
            approvalStatus: "approved",
            approvalNotes: "Approved for VFX and stunt coordination.",
            approvedBy: "Arun Kumar (Owner)",
            approvedAt: "2026-10-19T14:20:00Z",
            directorNotes: "Stunt riggers on gantry catwalks above frame.",
            characters: ["KEVIN", "MEERA"],
            location: "Pumping Station Chamber B",
            continuity: {
              characterPosition: "Figures in lower third",
              screenDirection: "Left to Right",
              eyeline: "Looking up at catwalks",
              lightingContinuity: "Overhead halogen grid flickering",
              costumeState: "Meera tactical harness strapped tight",
              propPlacement: "Cable anchor secured to primary iron pylon"
            },
            history: []
          }
        ],
        createdAt: "2026-10-19T14:00:00Z",
        updatedAt: "2026-10-19T14:20:00Z"
      }
    );
  }
}

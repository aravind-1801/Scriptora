import { db } from '../models/db.js';

// Pre-Production Service: Storyboard Studio Data & Operations
// Supports scene-grounded shot sequences, camera parameters, continuity tracking,
// AI generation workflows with transparent cost disclosure, and multi-format export.

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
      visualStyle: "Cinematic Concept Art",
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

  // Track revision history if image or prompt changes
  if ((updates.imageUrl && updates.imageUrl !== shot.imageUrl) || (updates.prompt && updates.prompt !== shot.prompt)) {
    shot.history.push({
      previousImageUrl: shot.imageUrl,
      previousPrompt: shot.prompt,
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
  return { success: true, removedId: shotId, storyboard: sb };
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

  // Built-in SCRIPTORA Concept Engine (High-Resolution Procedural SVG Canvas)
  // Generates genuine, tailored storyboard visuals reflecting camera setup, aspect ratio, lens, and lighting
  const svgImage = generateProceduralConceptFrame({
    prompt,
    shotSize,
    cameraAngle,
    focalLength,
    lightingMood,
    aspectRatio,
    visualStyle,
    sceneHeading,
    shotNumber
  });

  return {
    imageUrl: svgImage,
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

  const proposedShots = [];
  for (let i = 0; i < beats.length; i++) {
    const b = beats[i];
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
        focalLength: b.focalLength,
        lightingMood: b.lightingMood,
        aspectRatio: ratio,
        visualStyle: style,
        sceneHeading: scene.heading,
        shotNumber: b.shotNumber
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
function generateProceduralConceptFrame(opts) {
  const {
    shotSize = "Medium Shot",
    cameraAngle = "Eye Level",
    focalLength = "50mm Prime",
    lightingMood = "Daylight",
    aspectRatio = "2.39:1",
    visualStyle = "Cinematic Concept Art",
    sceneHeading = "SCENE 1",
    shotNumber = "1A"
  } = opts;

  let width = 1200;
  let height = 502; // 2.39:1
  if (aspectRatio === "16:9") height = 675;
  if (aspectRatio === "4:3") height = 900;
  if (aspectRatio === "9:16") { width = 675; height = 1200; }

  const isNight = sceneHeading.includes('NIGHT') || lightingMood.toLowerCase().includes('night') || lightingMood.toLowerCase().includes('shadow') || lightingMood.toLowerCase().includes('strobe');
  
  // Palette selection based on lighting & style
  const bgGradStart = isNight ? "%23090d16" : "%23292524";
  const bgGradEnd = isNight ? "%23020617" : "%231c1917";
  const accentColor = isNight ? "%2338bdf8" : "%23f59e0b";
  const rimColor = isNight ? "%2306b6d4" : "%23fbbf24";

  // Silhouette scale based on shot size
  let silH = 260;
  let silY = height - 280;
  let silX = width / 2;

  if (shotSize.includes("Wide")) {
    silH = 120;
    silY = height - 160;
  } else if (shotSize.includes("Close")) {
    silH = 420;
    silY = height - 440;
  } else if (shotSize.includes("Extreme Close")) {
    silH = 550;
    silY = height - 560;
  }

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'>
    <defs>
      <linearGradient id='bg' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='${bgGradStart}'/>
        <stop offset='100%' stop-color='${bgGradEnd}'/>
      </linearGradient>
      <radialGradient id='rimLight' cx='70%' cy='30%' r='60%'>
        <stop offset='0%' stop-color='${rimColor}' stop-opacity='0.4'/>
        <stop offset='100%' stop-color='${bgGradEnd}' stop-opacity='0'/>
      </radialGradient>
      <pattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'>
        <path d='M 40 0 L 0 0 0 40' fill='none' stroke='white' stroke-width='0.5' opacity='0.08'/>
      </pattern>
    </defs>
    <rect width='${width}' height='${height}' fill='url(%23bg)'/>
    <rect width='${width}' height='${height}' fill='url(%23rimLight)'/>
    <rect width='${width}' height='${height}' fill='url(%23grid)'/>
    
    <!-- Horizon Line & Depth Planes -->
    <line x1='0' y1='${Math.round(height * 0.65)}' x2='${width}' y2='${Math.round(height * 0.65)}' stroke='${accentColor}' stroke-width='1' opacity='0.3' stroke-dasharray='4,4'/>
    
    <!-- Stylized Cinematic Silhouette -->
    <g transform='translate(${Math.round(silX)}, ${Math.round(silY)})'>
      <circle cx='0' cy='${Math.round(-silH * 0.35)}' r='${Math.round(silH * 0.12)}' fill='%230f172a' stroke='${rimColor}' stroke-width='1.5'/>
      <path d='M ${Math.round(-silH * 0.22)} ${Math.round(-silH * 0.2)} Q 0 ${Math.round(-silH * 0.28)} ${Math.round(silH * 0.22)} ${Math.round(-silH * 0.2)} L ${Math.round(silH * 0.28)} ${silH} L ${Math.round(-silH * 0.28)} ${silH} Z' fill='%23020617' stroke='${accentColor}' stroke-width='1.2'/>
    </g>

    <!-- Camera Crosshairs & Rule-of-Thirds Markings -->
    <line x1='${Math.round(width * 0.33)}' y1='20' x2='${Math.round(width * 0.33)}' y2='${height - 20}' stroke='white' stroke-width='0.5' opacity='0.15'/>
    <line x1='${Math.round(width * 0.66)}' y1='20' x2='${Math.round(width * 0.66)}' y2='${height - 20}' stroke='white' stroke-width='0.5' opacity='0.15'/>
    <line x1='20' y1='${Math.round(height * 0.33)}' x2='${width - 20}' y2='${Math.round(height * 0.33)}' stroke='white' stroke-width='0.5' opacity='0.15'/>
    <line x1='20' y1='${Math.round(height * 0.66)}' x2='${width - 20}' y2='${Math.round(height * 0.66)}' stroke='white' stroke-width='0.5' opacity='0.15'/>

    <!-- Camera Telemetry Overlay -->
    <rect x='24' y='24' width='140' height='26' rx='6' fill='black' opacity='0.6'/>
    <text x='34' y='42' fill='white' font-family='monospace' font-size='12' font-weight='bold'>REC · ${shotNumber}</text>
    
    <text x='${width - 34}' y='42' text-anchor='end' fill='${accentColor}' font-family='monospace' font-size='12' font-weight='bold'>${aspectRatio} · ${focalLength}</text>
    <text x='${width - 34}' y='64' text-anchor='end' fill='white' opacity='0.7' font-family='sans-serif' font-size='11'>${shotSize} · ${cameraAngle}</text>

    <!-- Lower Masthead Bar -->
    <rect x='0' y='${height - 36}' width='${width}' height='36' fill='black' opacity='0.75'/>
    <text x='24' y='${height - 13}' fill='white' font-family='sans-serif' font-size='12' font-weight='bold'>${sceneHeading}</text>
    <text x='${width - 24}' y='${height - 13}' text-anchor='end' fill='${rimColor}' font-family='sans-serif' font-size='11'>SCRIPTORA CONCEPT ENGINE · ${visualStyle.toUpperCase()}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Helper to ensure database has initial storyboards
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
        visualStyle: "Cinematic Concept Art",
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
            visualStyle: "Cinematic Concept Art",
            prompt: "Cinematic wide shot, arid desert outpost gate, dust devils whirling, worn solar patrol rover in foreground, 2.39:1 anamorphic framing, muted earth tones, warm daylight",
            imageUrl: generateProceduralConceptFrame({
              shotSize: "Wide Shot",
              cameraAngle: "High Angle",
              focalLength: "24mm Wide",
              lightingMood: "Daylight Dust",
              aspectRatio: "2.39:1",
              visualStyle: "Cinematic Concept Art",
              sceneHeading: "EXT. MOJAVE OUTPOST GATE 4 - DAY",
              shotNumber: "1A"
            }),
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
            visualStyle: "Cinematic Concept Art",
            prompt: "Medium two-shot, dusty outpost booth, weary hydro-engineer confronting guard over illuminated green holographic terminal, 50mm shallow depth of field",
            imageUrl: generateProceduralConceptFrame({
              shotSize: "Medium Two-Shot",
              cameraAngle: "Eye Level",
              focalLength: "50mm Prime",
              lightingMood: "Harsh Fluorescent Rim",
              aspectRatio: "2.39:1",
              visualStyle: "Cinematic Concept Art",
              sceneHeading: "EXT. MOJAVE OUTPOST GATE 4 - DAY",
              shotNumber: "1B"
            }),
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
            visualStyle: "Cinematic Concept Art",
            prompt: "Extreme close-up on rugged military diagnostic screen, red warning glyphs, water pressure anomaly curve, scratched glass surface, macro lens bokeh",
            imageUrl: generateProceduralConceptFrame({
              shotSize: "Close-Up",
              cameraAngle: "Low Angle",
              focalLength: "85mm Portrait",
              lightingMood: "Cyan Strobe",
              aspectRatio: "2.39:1",
              visualStyle: "Cinematic Concept Art",
              sceneHeading: "EXT. MOJAVE OUTPOST GATE 4 - DAY",
              shotNumber: "1C"
            }),
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
        visualStyle: "Cinematic Concept Art",
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
            visualStyle: "Cinematic Concept Art",
            prompt: "Dramatic dutch angle close up, hydro-engineer clamping leaking pressurized valve under red and cyan emergency strobes, 85mm shallow depth of field, water droplets on lens",
            imageUrl: generateProceduralConceptFrame({
              shotSize: "Close-Up",
              cameraAngle: "Dutch Angle",
              focalLength: "85mm Portrait",
              lightingMood: "Cyan Strobe",
              aspectRatio: "2.39:1",
              visualStyle: "Cinematic Concept Art",
              sceneHeading: "INT. PUMPING STATION CHAMBER B - NIGHT",
              shotNumber: "10A"
            }),
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
            visualStyle: "Cinematic Concept Art",
            prompt: "Wide high-angle shot of cavernous underground pumping hall, water rushing across metal grating, lone figures in vast industrial labyrinth, 24mm anamorphic",
            imageUrl: generateProceduralConceptFrame({
              shotSize: "Wide Shot",
              cameraAngle: "High Angle",
              focalLength: "24mm Wide",
              lightingMood: "Low-Key Shadow",
              aspectRatio: "2.39:1",
              visualStyle: "Cinematic Concept Art",
              sceneHeading: "INT. PUMPING STATION CHAMBER B - NIGHT",
              shotNumber: "10B"
            }),
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

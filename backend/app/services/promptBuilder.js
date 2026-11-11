/**
 * SCRIPTORA Storyboard Generation Prompt Builder (Backend Mirror)
 *
 * Centralized, deterministic translation of all SCRIPTORA visual settings:
 * - Visual Art Style (17 styles + custom)
 * - Aspect Ratio & Dimensions (2.39:1, 16:9, 4:3, 9:16)
 * - Shot Size (5 framing options)
 * - Camera Angle (6 perspective options)
 * - Lens / Focal Length (4 optical options)
 * - Lighting (6 atmospheric options)
 * - Shot Type (Section A: 6 filmmaking intent options)
 * - Camera Movement (Section C: 5 kinetic options)
 * - Screen Direction (Section C: 3 continuity options)
 * - Image Quality (Standard Draft vs High Definition Production)
 * - Shot Title (Section A) & Director Notes (Section C)
 *
 * Enforces 5-level precedence and negative medium constraints.
 */

export const APPLICATION_DEFAULTS = Object.freeze({
  visualStyle: "Concept Art",
  aspectRatio: "2.39:1",
  shotSize: "Medium",
  cameraAngle: "Eye Level",
  lens: "50mm",
  lighting: "Auto / Scene-based",
  quality: "Standard Draft",
  cameraMovement: "Static",
  screenDirection: "Static",
  shotType: "",
  experienceLevel: "Intermediate"
});

export const ASPECT_RATIO_SPECS = Object.freeze({
  "2.39:1": {
    width: 1024,
    height: 428,
    label: "2.39:1",
    composition: "2.39:1 anamorphic widescreen scope framing, expansive horizontal cinema composition with panoramic letterbox scope"
  },
  "16:9": {
    width: 1024,
    height: 576,
    label: "16:9",
    composition: "16:9 standard cinematic widescreen landscape framing, balanced 1.78:1 screen composition"
  },
  "4:3": {
    width: 1024,
    height: 768,
    label: "4:3",
    composition: "4:3 classic Academy ratio framing, balanced vertical height composition with traditional cinematic proportions"
  },
  "9:16": {
    width: 720,
    height: 1280,
    label: "9:16",
    composition: "9:16 vertical portrait composition, mobile cinematic vertical framing"
  }
});

export const VISUAL_STYLE_DEFINITIONS = Object.freeze({
  "Comic": {
    name: "Comic",
    mediumCategory: "illustration",
    direction: "Authentic illustrated comic-book artwork, expressive dynamic black ink outlines, bold linework, controlled cel shading, halftone Ben-Day dot accents, vibrant graphic color palette, print comic visual storytelling",
    constraints: "Single comic illustration frame. Strictly no 3D CGI render, strictly no realistic photography, strictly no photorealism"
  },
  "Cinematic": {
    name: "Cinematic",
    mediumCategory: "film",
    direction: "High-end cinematic motion picture film still, 35mm anamorphic film capture, dramatic cinematic visual storytelling, rich atmospheric depth, professional motion picture cinematography, nuanced filmic color grading with moody contrast",
    constraints: "Single movie still frame. Strictly no multi-panel layout, no collage, no split screen, no amateur snapshot"
  },
  "Soft Pencil": {
    name: "Soft Pencil",
    mediumCategory: "traditional-drawing",
    direction: "Delicate graphite pencil drawing on textured white archival paper, soft graphite shading, subtle paper grain texture, traditional hand-drawn fine art sketch, light pencil strokes, gentle cross-hatching, nuanced tonal graphite values",
    constraints: "Traditional monochrome graphite pencil drawing on paper only. Strictly no photography, strictly no 3D render, strictly no ink outlines, strictly no saturated colors, strictly no digital gloss"
  },
  "Animation": {
    name: "Animation",
    mediumCategory: "animation",
    direction: "Consistent stylized animated-film frame, hand-crafted feature animation production art, expressive character design with clean stylized silhouettes, cohesive production animation keyframe, rich stylized color palettes",
    constraints: "Single animation production still. Strictly no live-action photography, strictly no photorealism, strictly no CGI mesh textures"
  },
  "3D": {
    name: "3D",
    mediumCategory: "3d-cgi",
    direction: "Three-dimensional CGI rendered scene, physically-based materials, dimensional volumetric lighting, raytraced ambient occlusion, subsurface scattering, stylized high-end 3D animated studio render",
    constraints: "Single 3D animated studio frame. Strictly no 2D flat sketch, strictly no pencil drawing, strictly no paper texture"
  },
  "Animation 3D": {
    name: "Animation 3D",
    mediumCategory: "3d-cgi",
    direction: "Three-dimensional CGI rendered animated film scene, physically-based materials, dimensional volumetric lighting, raytraced ambient occlusion, subsurface scattering, stylized high-end 3D animated studio render",
    constraints: "Single 3D animated studio frame. Strictly no 2D flat sketch, strictly no pencil drawing, strictly no paper texture"
  },
  "Watercolor Paint": {
    name: "Watercolor Paint",
    mediumCategory: "traditional-paint",
    direction: "Authentic watercolour painting, luminous wet-in-wet watercolor washes, delicate pigment bleeds, soft dissolved edges, organic paint granulations, visible rough cold-press watercolor paper texture",
    constraints: "Traditional fine-art watercolor painting on textured paper. Strictly no digital vectors, strictly no CGI 3D, strictly no sharp photographic realism"
  },
  "Photo / Commercial": {
    name: "Photo / Commercial",
    mediumCategory: "photography",
    direction: "Professional commercial photography, immaculate studio lighting, pristine clarity, high-end commercial advertising production still, razor-sharp focus, polished commercial color grading",
    constraints: "Single high-end commercial photo. Strictly no cartoon, strictly no pencil drawing, strictly no sketch, strictly no painterly brushstrokes"
  },
  "Charcoal Sketch": {
    name: "Charcoal Sketch",
    mediumCategory: "traditional-drawing",
    direction: "Heavy charcoal sketch, raw compressed charcoal strokes, smudged textured shading, intense deep velvety black tones, dramatic tonal chiaroscuro contrast, fibrous rough charcoal paper grain",
    constraints: "Raw traditional charcoal drawing on heavy paper. Distinguishable from pencil with dense black charcoal dust and rough smudged grain. Strictly no clean digital vectors, strictly no color paint, strictly no photorealism"
  },
  "Dark Anime": {
    name: "Dark Anime",
    mediumCategory: "anime",
    direction: "Dark anime-inspired production keyframe illustration, sharp dramatic cel shading, intense moody atmospheric backdrops, crisp stylized anime line art, cinematic anime contrast and dramatic shadows",
    constraints: "Single dark anime keyframe illustration. Strictly no Western comic halftone, strictly no photorealism, strictly no 3D CGI"
  },
  "Flat / Vector": {
    name: "Flat / Vector",
    mediumCategory: "vector",
    direction: "Clean 2D vector artwork, crisp geometric shapes, solid flat color fills, razor-sharp contour outlines, minimalist graphic design aesthetic, zero photographic noise",
    constraints: "Strictly flat 2D vector graphic art. Strictly no photographic textures, strictly no painterly brushwork, strictly no 3D volumetric shading, strictly no paper grain"
  },
  "Noir": {
    name: "Noir",
    mediumCategory: "film-noir",
    direction: "Classic 1940s film noir monochrome cinematography, deep pitch-black shadows, extreme chiaroscuro contrast, dramatic hard light beams, venetian blind stripe shadows, smoky haze, silhouetted mystery",
    constraints: "Single black and white film noir movie frame. Strictly monochrome, strictly no bright or modern colors, strictly high-contrast black and white"
  },
  "Stick Figure": {
    name: "Stick Figure",
    mediumCategory: "minimalist",
    direction: "Deliberately minimalist stick-figure illustration, simple black stick-line limbs, clean circle head, readable minimalist blocking, clear storyboard schematic layout, stripped-down visual essence",
    constraints: "Ultra-simple stick figure drawing on plain background. Strictly no detailed human anatomy, strictly no photorealistic features, strictly no 3D rendering, strictly no realistic textures"
  },
  "Graphic Novel": {
    name: "Graphic Novel",
    mediumCategory: "illustration",
    direction: "Sophisticated graphic-novel illustration, deliberate intricate ink line work, dramatic cross-hatch shading, high visual fidelity, cinematic graphic contrast, mature narrative graphic storytelling",
    constraints: "Single graphic novel pane artwork. Strictly no live-action photography, strictly no 3D render"
  },
  "Concept Art": {
    name: "Concept Art",
    mediumCategory: "digital-painting",
    direction: "Detailed production concept artwork, painterly digital environment brushwork, strong cinematic visual development, atmospheric depth, epic mood and visual worldbuilding",
    constraints: "Single digital concept art painting. Strictly no amateur snapshot, strictly no flat vector, strictly no stick figure"
  },
  "Cinematic Realism": {
    name: "Cinematic Realism",
    mediumCategory: "film",
    direction: "Realistic film-still appearance, authentic motion picture cinematography, natural human skin and wardrobe textures, subtle 35mm film emulsion grain, nuanced cinematic color timing, atmospheric motivated lighting",
    constraints: "Authentic 35mm motion picture film frame. Natural cinematic realism, strictly not a digital 3D render, strictly not a cartoon or sketch"
  },
  "Storyboard Sketch": {
    name: "Storyboard Sketch",
    mediumCategory: "traditional-drawing",
    direction: "Authentic director's storyboard pencil sketch, loose exploratory construction lines, expressive quick pencil gestures, clear staging and character blocking, readable animatic draft illustration on production storyboard paper",
    constraints: "Authentic production storyboard pencil illustration. Strictly no glossy CGI render, strictly no photorealism, strictly no colorful painting"
  },
  "Photorealistic": {
    name: "Photorealistic",
    mediumCategory: "photography",
    direction: "Ultra-photorealistic photograph, genuine real-world optical characteristics, natural skin pores and micro-textures, authentic fabric weaves and environmental surface details, unstylized physical reality",
    constraints: "Genuine true-to-life photograph. Strictly no stylized illustration, strictly no drawing or painting, strictly no CGI"
  }
});

export const SHOT_SIZE_DEFINITIONS = Object.freeze({
  "Extreme Wide": "Extreme wide shot (EWS), vast panoramic scale, environment dominates the entire frame, subject appears very small and distant within the massive surrounding landscape, emphasizing environmental scale and isolation",
  "Wide": "Wide shot (WS) / full shot, full subject visible from head to toe with substantial surrounding environment and location context clearly established",
  "Medium": "Medium shot (MS), subject framed naturally from the waist or torso up, balanced visual relationship between character action and readable background environment",
  "Close-up": "Close-up shot (CU), intimate framing where the subject's face or primary focal element fills most of the frame, capturing subtle emotional nuances, facial expressions, and fine details",
  "Extreme Close-up": "Extreme close-up (ECU / Macro), very tight framing focused on a specific facial detail (eyes, lips) or a critical small object, cutting out all background to create intense psychological focus"
});

export const CAMERA_ANGLE_DEFINITIONS = Object.freeze({
  "Eye Level": "Eye-level camera angle, neutral lens positioned directly at the subject's natural eye height, grounded objective perspective",
  "Low Angle": "Low camera angle, camera positioned low looking upward at the subject, emphasizing height, dominance, and towering presence",
  "High Angle": "High camera angle, camera positioned elevated looking downward on the subject, emphasizing vulnerability and spatial overview",
  "Bird's Eye View": "Bird's-eye view / overhead top-down shot, camera positioned directly overhead looking vertically straight down at a 90-degree angle, showing spatial layout and ground geometry",
  "Over-the-Shoulder": "Over-the-shoulder (OTS) camera angle, framed from behind the shoulder and head of a foreground character looking toward the subject across the dialogue space",
  "Dutch Angle": "Dutch angle / canted angle, deliberately tilted camera horizon with dynamic diagonal composition, conveying psychological tension or disorientation"
});

export const LENS_DEFINITIONS = Object.freeze({
  "24mm": "24mm wide-angle prime lens, expansive field of view with pronounced spatial depth, wide environmental immersion, accentuated foreground-to-background perspective",
  "35mm": "35mm cinematic prime lens, natural environmental context, classic cinematic storytelling perspective with gentle spatial depth and wide readable background",
  "50mm": "50mm normal prime lens, natural human-eye perspective, neutral proportions with zero optical distortion, balanced depth and realistic focal field",
  "85mm": "85mm portrait telephoto lens, flattering perspective compression, beautiful subject isolation with natural optical separation and shallow depth of field where appropriate"
});

export const LIGHTING_DEFINITIONS = Object.freeze({
  "Auto / Scene-based": "Organically motivated atmospheric lighting matching the scene context, environment, and time of day, natural atmospheric illumination",
  "Daylight": "Natural daylight illumination, clear sunlit ambient exposure, open sky fill and coherent natural shadows",
  "Night": "Nighttime lighting, deep ambient dark environment punctuated by motivated practical light sources, streetlights, or cool moonlit highlights",
  "Golden Hour": "Warm golden hour sunlight, low-angle setting sun illumination, rich warm directional amber light, glowing highlights and long cinematic shadows",
  "Low-key": "Low-key dramatic lighting, dark moody atmosphere with high contrast, deep shadows, selective pools of light, moody dramatic chiaroscuro",
  "Backlit": "Strong backlight illumination, primary light source positioned directly behind the subject, pronounced rim lighting along silhouettes, radiant halo edges and atmospheric depth"
});

export const SHOT_TYPE_DEFINITIONS = Object.freeze({
  "Establishing Shot": "Establishing shot establishing environmental layout, geographical scale, and spatial context of the scene",
  "Action Shot": "Dynamic action shot emphasizing kinetic character motion, physical energy, and immediate tension",
  "Reaction Shot": "Intimate reaction shot capturing subtle character emotion, facial response, and psychological stakes",
  "Dialogue Shot": "Dialogue staging emphasizing conversational blocking, conversational eyeline, and relational dynamic",
  "Insert / Detail Shot": "Narrative insert shot focusing intensely on crucial object detail, tactical telemetry, or hand interaction",
  "Transition Shot": "Atmospheric transition shot conveying spatial progression, passage of time, or environmental mood"
});

export const CAMERA_MOVEMENT_DEFINITIONS = Object.freeze({
  "Static": "Locked-off static camera, stable balanced composition",
  "Pan": "Horizontal panning camera movement capturing spatial breadth across the environment",
  "Tilt": "Vertical tilting camera movement emphasizing towering height and scale",
  "Tracking": "Dynamic tracking camera movement moving parallel alongside the subject's path",
  "Dolly": "Cinematic dolly camera movement pushing in toward the focal center"
});

export const SCREEN_DIRECTION_DEFINITIONS = Object.freeze({
  "Left to Right": "Screen direction: subject positioned or moving toward screen right, maintaining left-to-right axis continuity",
  "Right to Left": "Screen direction: subject positioned or moving toward screen left, maintaining right-to-left axis continuity",
  "Static": "Centered neutral screen position"
});

export const QUALITY_DEFINITIONS = Object.freeze({
  "High Definition Production": "Quality: Master production finish, pristine visual definition, high fidelity details, sharp focal clarity",
  "Standard Draft": "Quality: Production storyboard draft, readable concept blocking"
});

/**
 * Normalizes input key to standard dictionary keys
 */
export function normalizeKey(val, dictionary, defaultKey = null) {
  if (!val || typeof val !== 'string') return defaultKey;
  const clean = val.trim();
  if (dictionary[clean]) return clean;

  const lower = clean.toLowerCase();
  for (const k of Object.keys(dictionary)) {
    if (k.toLowerCase() === lower) return k;
  }

  for (const k of Object.keys(dictionary)) {
    const kLower = k.toLowerCase();
    if (lower.includes(kLower) || kLower.includes(lower)) return k;
  }

  if (dictionary === SHOT_SIZE_DEFINITIONS) {
    if (lower.includes('extreme wide') || lower.includes('ews')) return "Extreme Wide";
    if (lower.includes('extreme close') || lower.includes('ecu') || lower.includes('macro')) return "Extreme Close-up";
    if (lower.includes('close') || lower.includes('cu')) return "Close-up";
    if (lower.includes('wide') || lower.includes('ws') || lower.includes('full')) return "Wide";
    if (lower.includes('medium') || lower.includes('mid') || lower.includes('ms')) return "Medium";
  }

  if (dictionary === CAMERA_ANGLE_DEFINITIONS) {
    if (lower.includes('bird') || lower.includes('overhead') || lower.includes('top-down')) return "Bird's Eye View";
    if (lower.includes('shoulder') || lower.includes('ots')) return "Over-the-Shoulder";
    if (lower.includes('dutch') || lower.includes('canted') || lower.includes('tilt')) return "Dutch Angle";
    if (lower.includes('low')) return "Low Angle";
    if (lower.includes('high')) return "High Angle";
    if (lower.includes('eye')) return "Eye Level";
  }

  if (dictionary === LENS_DEFINITIONS) {
    if (lower.includes('24')) return "24mm";
    if (lower.includes('35')) return "35mm";
    if (lower.includes('85')) return "85mm";
    if (lower.includes('50')) return "50mm";
  }

  if (dictionary === LIGHTING_DEFINITIONS) {
    if (lower.includes('golden') || lower.includes('sunset') || lower.includes('magic hour')) return "Golden Hour";
    if (lower.includes('night') || lower.includes('nocturnal')) return "Night";
    if (lower.includes('day') || lower.includes('sun')) return "Daylight";
    if (lower.includes('low') || lower.includes('moody') || lower.includes('chiaroscuro')) return "Low-key";
    if (lower.includes('back') || lower.includes('rim') || lower.includes('silhouette')) return "Backlit";
    if (lower.includes('auto') || lower.includes('scene')) return "Auto / Scene-based";
  }

  if (dictionary === SHOT_TYPE_DEFINITIONS) {
    if (lower.includes('establishing')) return "Establishing Shot";
    if (lower.includes('action')) return "Action Shot";
    if (lower.includes('reaction')) return "Reaction Shot";
    if (lower.includes('dialogue')) return "Dialogue Shot";
    if (lower.includes('insert') || lower.includes('detail')) return "Insert / Detail Shot";
    if (lower.includes('transition')) return "Transition Shot";
  }

  if (dictionary === CAMERA_MOVEMENT_DEFINITIONS) {
    if (lower.includes('pan')) return "Pan";
    if (lower.includes('tilt')) return "Tilt";
    if (lower.includes('track')) return "Tracking";
    if (lower.includes('dolly')) return "Dolly";
    if (lower.includes('static')) return "Static";
  }

  if (dictionary === SCREEN_DIRECTION_DEFINITIONS) {
    if (lower.includes('left to right') || lower.includes('ltr')) return "Left to Right";
    if (lower.includes('right to left') || lower.includes('rtl')) return "Right to Left";
    if (lower.includes('static') || lower.includes('center')) return "Static";
  }

  if (dictionary === QUALITY_DEFINITIONS) {
    if (lower.includes('high') || lower.includes('hd') || lower.includes('production')) return "High Definition Production";
    if (lower.includes('standard') || lower.includes('draft')) return "Standard Draft";
  }

  if (dictionary === ASPECT_RATIO_SPECS) {
    if (lower.includes('2.39') || lower.includes('21:9') || lower.includes('anamorphic') || lower.includes('scope')) return "2.39:1";
    if (lower.includes('16:9') || lower.includes('1.78') || lower.includes('widescreen')) return "16:9";
    if (lower.includes('4:3') || lower.includes('1.33') || lower.includes('academy')) return "4:3";
    if (lower.includes('9:16') || lower.includes('vertical') || lower.includes('portrait')) return "9:16";
  }

  if (dictionary === VISUAL_STYLE_DEFINITIONS) {
    if (lower.includes('pencil')) return "Soft Pencil";
    if (lower.includes('charcoal')) return "Charcoal Sketch";
    if (lower.includes('storyboard')) return "Storyboard Sketch";
    if (lower.includes('comic')) return "Comic";
    if (lower.includes('graphic novel')) return "Graphic Novel";
    if (lower.includes('stick')) return "Stick Figure";
    if (lower.includes('water')) return "Watercolor Paint";
    if (lower.includes('dark anime') || lower.includes('anime')) return "Dark Anime";
    if (lower.includes('flat') || lower.includes('vector')) return "Flat / Vector";
    if (lower.includes('noir')) return "Noir";
    if (lower.includes('photoreal')) return "Photorealistic";
    if (lower.includes('photo') || lower.includes('commercial')) return "Photo / Commercial";
    if (lower.includes('realism')) return "Cinematic Realism";
    if (lower.includes('concept')) return "Concept Art";
    if (lower.includes('3d') && lower.includes('animation')) return "3D";
    if (lower.includes('3d')) return "3D";
    if (lower.includes('animation')) return "Animation";
    if (lower.includes('cine')) return "Cinematic";
  }

  return defaultKey;
}

/**
 * Resolves settings according to strict 5-level precedence:
 * 1. Explicit settings selected in current generation screen (e.g. sequence / AI modal)
 * 2. Explicit per-shot settings (e.g. Add Shot Section A, B, C values)
 * 3. Applicable project / scene level override
 * 4. User's saved Default Storyboard Settings
 * 5. Original application defaults
 */
export function resolveEffectiveSettings(shotParams = {}, userPreferences = {}, projectOverrides = {}) {
  const p = shotParams || {};
  const proj = projectOverrides || {};
  const user = userPreferences || {};
  const app = APPLICATION_DEFAULTS;

  // 1. Visual Style
  const rawStyle = p.visualStyle || p.style || proj.visualStyle || user.visualStyle || user.defaultStyle || app.visualStyle;
  const visualStyle = normalizeKey(rawStyle, VISUAL_STYLE_DEFINITIONS, app.visualStyle);

  // 2. Aspect Ratio
  const rawRatio = p.aspectRatio || p.ratio || proj.aspectRatio || user.aspectRatio || user.defaultAspectRatio || app.aspectRatio;
  const aspectRatio = normalizeKey(rawRatio, ASPECT_RATIO_SPECS, app.aspectRatio);

  // 3. Shot Size
  const rawSize = p.shotSize || p.size || proj.shotSize || user.shotSize || user.defaultShotSize || app.shotSize;
  const shotSize = normalizeKey(rawSize, SHOT_SIZE_DEFINITIONS, app.shotSize);

  // 4. Camera Angle
  const rawAngle = p.cameraAngle || p.angle || proj.cameraAngle || user.cameraAngle || user.defaultCameraAngle || app.cameraAngle;
  const cameraAngle = normalizeKey(rawAngle, CAMERA_ANGLE_DEFINITIONS, app.cameraAngle);

  // 5. Lens
  const rawLens = p.lens || p.focalLength || proj.lens || proj.focalLength || user.lens || user.defaultLens || app.lens;
  const lens = normalizeKey(rawLens, LENS_DEFINITIONS, app.lens);

  // 6. Lighting
  const rawLighting = p.lighting || p.lightingMood || proj.lighting || proj.lightingMood || user.lighting || user.defaultLighting || app.lighting;
  const lighting = normalizeKey(rawLighting, LIGHTING_DEFINITIONS, app.lighting);

  // 7. Shot Type (Section A)
  const rawType = p.shotType || p.type || proj.shotType || user.shotType || app.shotType;
  const shotType = normalizeKey(rawType, SHOT_TYPE_DEFINITIONS, null);

  // 8. Camera Movement (Section C)
  const rawMovement = p.cameraMovement || p.movement || proj.cameraMovement || user.cameraMovement || app.cameraMovement;
  const cameraMovement = normalizeKey(rawMovement, CAMERA_MOVEMENT_DEFINITIONS, "Static");

  // 9. Screen Direction (Section C)
  const rawDirection = p.screenDirection || p.direction || p.continuity?.screenDirection || proj.screenDirection || user.screenDirection || app.screenDirection;
  const screenDirection = normalizeKey(rawDirection, SCREEN_DIRECTION_DEFINITIONS, "Static");

  // 10. Image Quality
  const rawQuality = p.quality || proj.quality || user.quality || app.quality;
  const quality = normalizeKey(rawQuality, QUALITY_DEFINITIONS, "Standard Draft");

  // 11. Shot Title & Director Notes
  const shotTitle = (p.title || p.shotTitle || "").trim();
  const directorNotes = (p.directorNotes || p.notes || "").trim();

  return {
    visualStyle,
    aspectRatio,
    shotSize,
    cameraAngle,
    lens,
    lighting,
    shotType,
    cameraMovement,
    screenDirection,
    quality,
    shotTitle,
    directorNotes
  };
}

/**
 * Neutralizes keywords in user free-text prompt that conflict with selected controls
 */
export function sanitizeUserPrompt(rawPrompt = "", effectiveSettings = {}) {
  let prompt = (rawPrompt || "").trim();
  if (!prompt) return "Atmospheric scene";

  const styleDef = VISUAL_STYLE_DEFINITIONS[effectiveSettings.visualStyle] || VISUAL_STYLE_DEFINITIONS["Concept Art"];
  const isNonPhotographic = ["traditional-drawing", "traditional-paint", "vector", "minimalist", "illustration", "anime"].includes(styleDef.mediumCategory);
  const isPhotographic = styleDef.mediumCategory === "photography" || styleDef.name === "Photorealistic" || styleDef.name === "Photo / Commercial";

  if (isNonPhotographic) {
    prompt = prompt.replace(/\b(photorealistic|hyperrealistic|hyper-realistic|ultra-realistic|realistic photo|dslr|35mm photo|8k resolution|octane render|unreal engine|unreal engine 5)\b/gi, "").trim();
  }

  if (isPhotographic) {
    prompt = prompt.replace(/\b(pencil sketch|rough sketch|stick figure|flat vector|cartoon drawing|watercolor wash)\b/gi, "").trim();
  }

  prompt = prompt.replace(/,\s*,/g, ",").replace(/\s{2,}/g, " ").replace(/^,\s*/, "").replace(/,\s*$/, "").trim();

  return prompt || (rawPrompt || "").trim() || "Atmospheric scene";
}

/**
 * Builds the centralized generation prompt and dimensions for Pollinations FLUX.1
 */
export function buildStoryboardGenerationPrompt(params = {}, userPreferences = {}, projectOverrides = {}) {
  const effective = resolveEffectiveSettings(params, userPreferences, projectOverrides);
  const ratioSpec = ASPECT_RATIO_SPECS[effective.aspectRatio] || ASPECT_RATIO_SPECS["2.39:1"];
  const styleDef = VISUAL_STYLE_DEFINITIONS[effective.visualStyle] || VISUAL_STYLE_DEFINITIONS["Concept Art"];
  const shotSizeDef = SHOT_SIZE_DEFINITIONS[effective.shotSize] || SHOT_SIZE_DEFINITIONS["Medium"];
  const cameraAngleDef = CAMERA_ANGLE_DEFINITIONS[effective.cameraAngle] || CAMERA_ANGLE_DEFINITIONS["Eye Level"];
  const lensDef = LENS_DEFINITIONS[effective.lens] || LENS_DEFINITIONS["50mm"];
  const lightingDef = LIGHTING_DEFINITIONS[effective.lighting] || LIGHTING_DEFINITIONS["Auto / Scene-based"];

  const shotTypeDef = effective.shotType ? SHOT_TYPE_DEFINITIONS[effective.shotType] : null;
  const movementDef = effective.cameraMovement && effective.cameraMovement !== "Static" ? CAMERA_MOVEMENT_DEFINITIONS[effective.cameraMovement] : null;
  const directionDef = effective.screenDirection && effective.screenDirection !== "Static" ? SCREEN_DIRECTION_DEFINITIONS[effective.screenDirection] : null;
  const qualityDef = effective.quality ? QUALITY_DEFINITIONS[effective.quality] : null;

  // Extract core user prompt / scene description
  const userPrompt = params.prompt || params.userDescription || params.description || "";
  const cleanUserPrompt = sanitizeUserPrompt(userPrompt, effective);

  // Clean Shot Title (Section A) - exclude default placeholders like "Shot 1A" or "Shot"
  const cleanTitle = effective.shotTitle;
  const isGenericTitle = !cleanTitle || /^shot\s+[0-9]+[a-z]?$/i.test(cleanTitle) || cleanTitle.toLowerCase() === 'shot';

  // Build variation instruction if requested
  let variationClause = "";
  if (params.isVariation) {
    const vType = params.variationType || "auto";
    if (vType === "composition") {
      variationClause = "Variation Directive: Alternative staging and rearranged subject placement within the environment.";
    } else if (vType === "angle") {
      variationClause = "Variation Directive: Dynamic alternative camera perspective while preserving scene actions.";
    } else if (vType === "lighting") {
      variationClause = "Variation Directive: Alternate lighting mood study with dramatic shadow contrast.";
    } else if (vType === "framing") {
      variationClause = "Variation Directive: Alternative focal framing and spatial perspective.";
    } else {
      variationClause = "Variation Directive: Dynamic alternative take with fresh cinematic staging and visual nuance.";
    }
  }

  // Construct structured prompt sections with strict priority ordering
  const sections = [
    `Artistic Direction: ${styleDef.direction}.`,
    `Scene & Subject: ${cleanUserPrompt}.`
  ];

  if (!isGenericTitle) {
    sections.push(`Subject Staging: ${cleanTitle}.`);
  }

  sections.push(`Shot Framing & Scale: ${shotSizeDef}.`);

  if (shotTypeDef) {
    sections.push(`Filmmaking Intent: ${shotTypeDef}.`);
  }

  sections.push(`Camera Perspective: ${cameraAngleDef}.`);
  sections.push(`Optics & Lens: ${lensDef}.`);

  if (movementDef) {
    sections.push(`Camera Movement: ${movementDef}.`);
  }

  sections.push(`Lighting & Atmosphere: ${lightingDef}.`);

  if (directionDef) {
    sections.push(`Continuity: ${directionDef}.`);
  }

  if (effective.directorNotes) {
    sections.push(`Director Details: ${effective.directorNotes}.`);
  }

  sections.push(`Aspect & Framing: ${ratioSpec.composition}.`);

  if (qualityDef) {
    sections.push(`Rendering Fidelity: ${qualityDef}.`);
  }

  if (variationClause) {
    sections.push(variationClause);
  }

  // Append strict visual constraints & single-frame enforcement
  sections.push(`Visual Constraints: ${styleDef.constraints}. Single image frame, strictly no contact sheet, no multi-panel layout, no collage, no split screen.`);

  const fullPrompt = sections.join(" ");

  // Seed resolution: preserve explicit seed or generate fresh variation seed
  const seed = params.seed !== undefined && params.seed !== null
    ? params.seed
    : (params.isVariation ? Math.floor(Math.random() * 900000) + 100000 : 42);

  const encodedPrompt = encodeURIComponent(fullPrompt);
  const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${ratioSpec.width}&height=${ratioSpec.height}&seed=${seed}&model=flux&nologo=true`;

  return {
    fullPrompt,
    cleanUserPrompt,
    effectiveSettings: effective,
    aspectRatio: effective.aspectRatio,
    width: ratioSpec.width,
    height: ratioSpec.height,
    seed,
    model: "flux",
    pollinationsUrl
  };
}

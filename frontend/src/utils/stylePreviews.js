// SCRIPTORA Storyboard Studio - Full 12 Visual Style Previews Library
// Matches user reference: Comic, Cinematic, Soft Pencil, Animation 3D, Watercolor Paint,
// Photo / Commercial, Charcoal Sketch, Dark Anime, Flat / Vector, Noir, Stick Figure, Graphic Novel, and Custom Style (+)

function svgData(content) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(content.trim())}`;
}

// 1. Comic (Action comic book art with bold ink lines, Ben-Day halftone dots, primary colors)
function createComicSvg() {
  return svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <defs>
    <pattern id="comic-dots" width="8" height="8" patternUnits="userSpaceOnUse">
      <circle cx="4" cy="4" r="1.5" fill="#facc15" opacity="0.6"/>
    </pattern>
    <linearGradient id="comic-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#fde047"/>
    </linearGradient>
  </defs>
  <rect width="400" height="225" fill="url(#comic-sky)"/>
  <rect width="400" height="225" fill="url(#comic-dots)"/>
  
  <!-- Comic City Backdrop -->
  <polygon points="20,160 20,90 60,70 90,90 90,160" fill="#f43f5e" stroke="#000" stroke-width="3"/>
  <polygon points="90,160 90,60 140,50 170,70 170,160" fill="#3b82f6" stroke="#000" stroke-width="3"/>
  <polygon points="260,160 260,80 310,70 330,90 330,160" fill="#10b981" stroke="#000" stroke-width="3"/>
  
  <!-- Ground -->
  <rect x="0" y="160" width="400" height="65" fill="#e2e8f0" stroke="#000" stroke-width="3"/>
  
  <!-- Running Comic Hero (Blue shirt, dynamic pose) -->
  <g stroke="#000" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Action Speedlines -->
    <line x1="80" y1="120" x2="150" y2="120" stroke="#000" stroke-width="2" stroke-dasharray="8 6"/>
    <line x1="90" y1="140" x2="160" y2="140" stroke="#000" stroke-width="2" stroke-dasharray="10 5"/>
    <!-- Head -->
    <ellipse cx="230" cy="85" rx="16" ry="18" fill="#fed7aa"/>
    <path d="M 218 80 Q 230 65 244 76" fill="#78350f"/>
    <!-- Torso (Blue Jacket) -->
    <path d="M 220 102 L 195 130 L 235 145 L 245 105 Z" fill="#2563eb"/>
    <!-- Arms running -->
    <path d="M 220 105 L 180 115 L 175 105" fill="none" stroke="#2563eb" stroke-width="8"/>
    <path d="M 240 105 L 270 115 L 285 105" fill="none" stroke="#2563eb" stroke-width="8"/>
    <!-- Legs running -->
    <path d="M 210 145 L 185 175 L 160 180" fill="none" stroke="#1e293b" stroke-width="7"/>
    <path d="M 235 145 L 260 175 L 285 190" fill="none" stroke="#1e293b" stroke-width="7"/>
  </g>
  
  <!-- Sound Effect Burst -->
  <polygon points="320,40 335,25 345,45 365,30 360,55 385,60 365,75 380,95 355,85 345,105 335,85 315,95 325,75 305,65 325,55" fill="#facc15" stroke="#000" stroke-width="2.5"/>
  <text x="345" y="68" text-anchor="middle" font-family="Impact, sans-serif" font-size="14" font-weight="bold" fill="#dc2626">POW!</text>
  
  <rect x="0" y="0" width="400" height="225" fill="none" stroke="#000" stroke-width="6"/>
</svg>`);
}

// 2. Cinematic (35mm Anamorphic Film Still, dramatic lighting, subtle grain)
function createCinematicSvg() {
  return svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <defs>
    <linearGradient id="cine-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="60%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>
    <radialGradient id="cine-glow" cx="80%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#0284c7" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#020617" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="cine-rim" cx="20%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#020617" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="225" fill="url(#cine-bg)"/>
  <rect width="400" height="225" fill="url(#cine-glow)"/>
  <rect width="400" height="225" fill="url(#cine-rim)"/>
  
  <!-- City Bokeh / Window Lights -->
  <circle cx="280" cy="70" r="12" fill="#38bdf8" opacity="0.3"/>
  <circle cx="340" cy="90" r="18" fill="#fbbf24" opacity="0.25"/>
  <circle cx="310" cy="110" r="14" fill="#f43f5e" opacity="0.2"/>
  
  <!-- Two Men in Standoff Dialogue (Silhouette + Rim Lighting) -->
  <g>
    <!-- Figure Left -->
    <path d="M 60 225 L 75 130 Q 110 110 130 135 L 145 225 Z" fill="#020617" stroke="#f59e0b" stroke-width="1.8"/>
    <ellipse cx="105" cy="95" rx="22" ry="26" fill="#090d16" stroke="#f59e0b" stroke-width="2"/>
    <!-- Figure Right (Officer / Detective) -->
    <path d="M 230 225 L 245 135 Q 275 110 305 130 L 325 225 Z" fill="#020617" stroke="#38bdf8" stroke-width="2"/>
    <ellipse cx="275" cy="95" rx="22" ry="26" fill="#090d16" stroke="#38bdf8" stroke-width="2"/>
    <!-- Detective Hat Silhouette -->
    <path d="M 245 80 L 305 80 L 295 62 L 255 62 Z" fill="#020617"/>
    <line x1="235" y1="80" x2="315" y2="80" stroke="#38bdf8" stroke-width="2.5"/>
  </g>
  
  <!-- Anamorphic Blue Lens Streak -->
  <line x1="0" y1="100" x2="400" y2="100" stroke="#38bdf8" stroke-width="1.5" opacity="0.5"/>
  <line x1="0" y1="100" x2="400" y2="100" stroke="#ffffff" stroke-width="0.7" opacity="0.8"/>
</svg>`);
}

// 3. Soft Pencil (Delicate graphite pencil drawing on off-white paper, fine shading)
function createSoftPencilSvg() {
  return svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <defs>
    <pattern id="pencil-hatch" width="6" height="6" patternUnits="userSpaceOnUse">
      <line x1="0" y1="6" x2="6" y2="0" stroke="#a1a1aa" stroke-width="0.8" opacity="0.4"/>
    </pattern>
  </defs>
  <rect width="400" height="225" fill="#fbfbfa"/>
  
  <!-- Basketball Court lines -->
  <line x1="20" y1="180" x2="380" y2="180" stroke="#a1a1aa" stroke-width="1.2"/>
  <ellipse cx="200" cy="180" rx="90" ry="25" fill="none" stroke="#d4d4d8" stroke-width="1"/>
  
  <!-- Basketball Hoop on Right -->
  <line x1="330" y1="180" x2="330" y2="60" stroke="#71717a" stroke-width="2.5"/>
  <rect x="310" y="50" width="30" height="24" fill="none" stroke="#52525b" stroke-width="1.8"/>
  <line x1="310" y1="74" x2="295" y2="74" stroke="#52525b" stroke-width="2.5"/>
  <polygon points="295,74 310,74 305,95 300,95" fill="none" stroke="#a1a1aa" stroke-width="1" stroke-dasharray="2 2"/>
  
  <!-- Two figures playing basketball (Soft pencil sketchy lines) -->
  <g stroke="#3f3f46" stroke-width="1.8" fill="none">
    <!-- Player 1 dribbling -->
    <circle cx="160" cy="90" r="14" fill="#fafafa"/>
    <path d="M 160 104 L 155 140 L 140 175" stroke-width="2"/>
    <path d="M 155 140 L 175 175" stroke-width="2"/>
    <path d="M 160 115 L 180 135 L 190 155" stroke-width="1.8"/>
    <!-- Ball -->
    <circle cx="192" cy="162" r="9" fill="url(#pencil-hatch)" stroke="#3f3f46" stroke-width="1.5"/>
    
    <!-- Player 2 defending -->
    <circle cx="230" cy="85" r="14" fill="#fafafa"/>
    <path d="M 230 99 L 235 135 L 225 175" stroke-width="2"/>
    <path d="M 235 135 L 250 175" stroke-width="2"/>
    <path d="M 230 110 L 210 100 L 200 90" stroke-width="1.8"/>
  </g>
</svg>`);
}

// 4. Animation 3D (Pixar/Disney animated style, warm volumetric lighting, soft 3D shapes)
function createAnimation3DSvg() {
  return svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <defs>
    <linearGradient id="a3d-room" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffedd5"/>
      <stop offset="50%" stop-color="#fed7aa"/>
      <stop offset="100%" stop-color="#fb923c"/>
    </linearGradient>
    <radialGradient id="a3d-sun" cx="30%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#fde047" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="225" fill="url(#a3d-room)"/>
  
  <!-- Window with Warm Sunbeam Rays -->
  <polygon points="40,20 120,20 280,225 80,225" fill="#fef08a" opacity="0.35"/>
  <rect x="50" y="25" width="65" height="75" fill="#bae6fd" stroke="#fff" stroke-width="4" rx="4"/>
  <line x1="82" y1="25" x2="82" y2="100" stroke="#fff" stroke-width="3"/>
  <line x1="50" y1="62" x2="115" y2="62" stroke="#fff" stroke-width="3"/>
  
  <!-- Teddy Bear on Bed -->
  <g transform="translate(180, 110)">
    <circle cx="20" cy="30" r="16" fill="#b45309"/>
    <circle cx="10" cy="18" r="6" fill="#92400e"/>
    <circle cx="30" cy="18" r="6" fill="#92400e"/>
    <circle cx="20" cy="55" r="22" fill="#d97706"/>
    <ellipse cx="20" cy="32" rx="7" ry="5" fill="#fed7aa"/>
    <circle cx="20" cy="30" r="2.5" fill="#451a03"/>
  </g>
  
  <!-- Animated Little Girl Character (Big expressive 3D animated eyes) -->
  <g transform="translate(280, 80)">
    <circle cx="30" cy="40" r="28" fill="#ffedd5"/>
    <!-- Curly Hair -->
    <circle cx="12" cy="25" r="14" fill="#451a03"/>
    <circle cx="30" cy="15" r="16" fill="#451a03"/>
    <circle cx="48" cy="25" r="14" fill="#451a03"/>
    <!-- Big Anime / Pixar Eyes -->
    <ellipse cx="22" cy="40" rx="6" ry="8" fill="#fff"/>
    <circle cx="23" cy="40" r="4" fill="#6366f1"/>
    <circle cx="24" cy="38" r="1.5" fill="#fff"/>
    <ellipse cx="38" cy="40" rx="6" ry="8" fill="#fff"/>
    <circle cx="39" cy="40" r="4" fill="#6366f1"/>
    <circle cx="40" cy="38" r="1.5" fill="#fff"/>
    <!-- Cute smile -->
    <path d="M 26 54 Q 30 58 34 54" stroke="#e11d48" stroke-width="2" fill="none"/>
    <!-- Dress -->
    <path d="M 12 70 L 48 70 L 56 120 L 4 120 Z" fill="#ec4899" rx="6"/>
  </g>
</svg>`);
}

// 5. Watercolor Paint (Fluid watercolor wash, pastel hues, soft bleeding pigment)
function createWatercolorSvg() {
  return svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <defs>
    <linearGradient id="wc-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#bae6fd" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#fed7aa" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#fbcfe8" stop-opacity="0.5"/>
    </linearGradient>
    <linearGradient id="wc-sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.7"/>
      <stop offset="60%" stop-color="#0284c7" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#fde047" stop-opacity="0.4"/>
    </linearGradient>
  </defs>
  <rect width="400" height="225" fill="#fafaf9"/>
  <rect width="400" height="130" fill="url(#wc-sky)"/>
  
  <!-- Watercolor Sea Wash with Soft Edge -->
  <path d="M 0 115 Q 100 110 200 118 T 400 112 L 400 170 Q 280 180 160 165 T 0 175 Z" fill="url(#wc-sea)"/>
  <!-- Shoreline Wet Sand -->
  <path d="M 0 160 Q 150 175 280 165 T 400 180 L 400 225 L 0 225 Z" fill="#fef3c7" opacity="0.8"/>
  
  <!-- Couple Walking on Beach (Soft painterly watercolor silhouettes) -->
  <g opacity="0.75">
    <ellipse cx="185" cy="130" rx="6" ry="8" fill="#b45309"/>
    <path d="M 180 140 L 190 140 L 193 185 L 177 185 Z" fill="#3b82f6"/>
    
    <ellipse cx="205" cy="134" rx="5.5" ry="7" fill="#92400e"/>
    <path d="M 200 143 L 210 143 L 218 185 L 195 185 Z" fill="#f43f5e"/>
    
    <!-- Water reflections -->
    <ellipse cx="185" cy="190" rx="8" ry="2" fill="#93c5fd" opacity="0.5"/>
    <ellipse cx="205" cy="190" rx="8" ry="2" fill="#fbcfe8" opacity="0.5"/>
  </g>
</svg>`);
}

// 6. Photo / Commercial (Razor-sharp photographic clarity, warm indoor cafe bokeh, DSLR depth)
function createPhotoCommercialSvg() {
  return svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <defs>
    <radialGradient id="photo-bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#451a03"/>
      <stop offset="50%" stop-color="#1c1917"/>
      <stop offset="100%" stop-color="#0c0a09"/>
    </radialGradient>
  </defs>
  <rect width="400" height="225" fill="url(#photo-bg)"/>
  
  <!-- Cafe Background Bokeh Circles -->
  <circle cx="60" cy="50" r="28" fill="#fef08a" opacity="0.18"/>
  <circle cx="120" cy="80" r="16" fill="#fdba74" opacity="0.22"/>
  <circle cx="320" cy="60" r="35" fill="#fcd34d" opacity="0.15"/>
  <circle cx="360" cy="120" r="20" fill="#f97316" opacity="0.2"/>
  
  <!-- Realistic Woman Drinking from Bottle (Foreground subject in crisp focus) -->
  <g transform="translate(150, 40)">
    <ellipse cx="50" cy="50" rx="30" ry="38" fill="#fed7aa"/>
    <!-- Bob Haircut -->
    <path d="M 20 40 C 15 10 75 10 80 40 C 85 70 82 85 75 90 C 65 60 30 60 25 90 Z" fill="#292524"/>
    <!-- Glass Bottle -->
    <rect x="0" y="55" width="28" height="8" rx="2" fill="#78350f" transform="rotate(-30 14 59)"/>
    <rect x="-8" y="58" width="12" height="4" fill="#a1a1aa" transform="rotate(-30 14 59)"/>
    <!-- Eye & Facial Detail -->
    <path d="M 38 48 Q 44 45 48 49" stroke="#451a03" stroke-width="2" fill="none"/>
    <ellipse cx="44" cy="52" rx="3.5" ry="2.5" fill="#451a03"/>
    <path d="M 30 68 Q 36 72 44 68" stroke="#be123c" stroke-width="3" fill="none"/>
    <!-- Dress Straps -->
    <path d="M 22 95 L 78 95 L 90 160 L 10 160 Z" fill="#18181b"/>
    <line x1="28" y1="88" x2="30" y2="105" stroke="#000" stroke-width="3"/>
    <line x1="72" y1="88" x2="70" y2="105" stroke="#000" stroke-width="3"/>
  </g>
</svg>`);
}

// 7. Charcoal Sketch (Heavy expressive charcoal drawing, smudged shadows, rich blacks)
function createCharcoalSvg() {
  return svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <defs>
    <filter id="charcoal-blur">
      <feGaussianBlur stdDeviation="1.5"/>
    </filter>
  </defs>
  <rect width="400" height="225" fill="#f4f4f5"/>
  
  <!-- Charcoal Smudged Background Wash -->
  <path d="M 50 40 Q 150 20 300 50 Q 380 90 320 180 Q 200 210 80 180 Z" fill="#71717a" opacity="0.25" filter="url(#charcoal-blur)"/>
  
  <!-- Woman petting dog (Deep charcoal strokes) -->
  <g stroke="#18181b" fill="none">
    <!-- Dog Silhouette with dense charcoal hatching -->
    <ellipse cx="140" cy="140" rx="38" ry="28" fill="#27272a"/>
    <circle cx="110" cy="115" r="18" fill="#18181b"/>
    <!-- Floppy ears -->
    <path d="M 100 110 Q 90 135 105 140" stroke-width="5" stroke="#18181b"/>
    <circle cx="104" cy="114" r="2.5" fill="#fff"/>
    <ellipse cx="94" cy="122" rx="4" ry="3" fill="#000"/>
    
    <!-- Woman sitting and smiling -->
    <ellipse cx="230" cy="90" rx="22" ry="28" fill="#e4e4e7" stroke-width="3"/>
    <!-- Dark charcoal hair -->
    <path d="M 205 90 C 200 55 260 55 255 90 C 258 120 240 130 235 110 Z" fill="#09090b"/>
    <!-- Reaching arm petting dog -->
    <path d="M 215 115 Q 170 115 130 118" stroke-width="4.5" stroke="#27272a"/>
    <path d="M 230 120 L 255 185" stroke-width="5" stroke="#18181b"/>
  </g>
</svg>`);
}

// 8. Dark Anime (Japanese anime / manga aesthetic with cel shading, sharp highlights, glowing city)
function createDarkAnimeSvg() {
  return svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <defs>
    <linearGradient id="anime-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="60%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
  </defs>
  <rect width="400" height="225" fill="url(#anime-sky)"/>
  
  <!-- Cyberpunk City Skyline with Glowing Windows -->
  <polygon points="10,140 10,60 50,60 50,140" fill="#020617"/>
  <polygon points="60,140 60,30 110,30 110,140" fill="#020617"/>
  <polygon points="120,140 120,80 160,80 160,140" fill="#020617"/>
  <!-- Windows -->
  <circle cx="85" cy="45" r="2" fill="#38bdf8"/>
  <circle cx="95" cy="65" r="2" fill="#f43f5e"/>
  <circle cx="75" cy="85" r="2" fill="#facc15"/>
  
  <!-- Anime Girl (Blonde hair, sharp bangs, blue uniform, cel-shaded) -->
  <g transform="translate(180, 50)">
    <!-- Pointy anime chin -->
    <polygon points="35,35 65,35 50,65" fill="#fde68a" stroke="#000" stroke-width="1.5"/>
    <ellipse cx="50" cy="35" rx="18" ry="16" fill="#fde68a"/>
    <!-- Anime Eye (Large, sharp lashes) -->
    <path d="M 38 32 Q 44 26 50 32" stroke="#020617" stroke-width="2.5" fill="none"/>
    <ellipse cx="44" cy="35" rx="3.5" ry="5" fill="#38bdf8"/>
    <circle cx="45" cy="33" r="1.5" fill="#fff"/>
    <!-- Yellow / Blonde Anime Hair with sharp spiky bangs -->
    <path d="M 28 25 L 34 45 L 42 22 L 52 48 L 58 20 L 70 38 L 72 10 L 25 10 Z" fill="#facc15" stroke="#000" stroke-width="1.8"/>
    <path d="M 72 20 Q 90 50 85 95" stroke="#facc15" stroke-width="10" fill="none"/>
    <!-- Blue school uniform with red ribbon -->
    <path d="M 30 65 L 70 65 L 85 130 L 15 130 Z" fill="#1e3a8a" stroke="#000" stroke-width="2"/>
    <polygon points="46,70 54,70 50,85" fill="#ef4444"/>
  </g>
  
  <!-- Anime Boy in Shadow on Right -->
  <g transform="translate(290, 60)">
    <polygon points="35,35 65,35 50,65" fill="#fed7aa" stroke="#000" stroke-width="1.5"/>
    <!-- Black spiky anime hair -->
    <path d="M 25 20 L 35 38 L 45 15 L 55 40 L 68 18 L 75 35 L 75 5 L 20 5 Z" fill="#0f172a" stroke="#38bdf8" stroke-width="1"/>
    <!-- Dark Jacket -->
    <path d="M 25 65 L 75 65 L 90 120 L 10 120 Z" fill="#020617"/>
  </g>
</svg>`);
}

// 9. Flat / Vector (Clean 2D vector art, bold flat shapes, colorful modern editorial style)
function createFlatVectorSvg() {
  return svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <!-- Bright Blue Sky & Crisp Sun -->
  <rect width="400" height="225" fill="#38bdf8"/>
  <circle cx="70" cy="50" r="28" fill="#fde047"/>
  
  <!-- Vector Campus Ground & Building -->
  <rect x="0" y="145" width="400" height="80" fill="#4ade80"/>
  <rect x="260" y="90" width="140" height="55" fill="#f87171" rx="2"/>
  <rect x="280" y="105" width="20" height="18" fill="#ffffff"/>
  <rect x="320" y="105" width="20" height="18" fill="#ffffff"/>
  <rect x="360" y="105" width="20" height="18" fill="#ffffff"/>
  
  <!-- Vector Characters (Clean solid color blocks) -->
  <!-- Kid 1 (Backpack) -->
  <circle cx="100" cy="90" r="14" fill="#78350f"/>
  <rect x="90" y="106" width="20" height="40" fill="#ef4444" rx="3"/>
  <rect x="80" y="110" width="10" height="25" fill="#1e3a8a" rx="4"/>
  <rect x="92" y="146" width="6" height="30" fill="#1e293b"/>
  <rect x="102" y="146" width="6" height="30" fill="#1e293b"/>
  
  <!-- Kid 2 with Phone -->
  <circle cx="145" cy="92" r="14" fill="#fbcfe8"/>
  <rect x="135" y="108" width="20" height="38" fill="#ffffff" rx="3"/>
  <rect x="145" y="120" width="8" height="14" fill="#0284c7" rx="1"/>
  <rect x="137" y="146" width="6" height="30" fill="#2563eb"/>
  <rect x="147" y="146" width="6" height="30" fill="#2563eb"/>
  
  <!-- Teacher gesturing -->
  <circle cx="210" cy="80" r="15" fill="#fed7aa"/>
  <polygon points="195,96 225,96 235,160 185,160" fill="#1e1b4b"/>
  <line x1="200" y1="105" x2="165" y2="115" stroke="#1e1b4b" stroke-width="5" stroke-linecap="round"/>
</svg>`);
}

// 10. Noir (Classic high-contrast black & white film noir, deep shadows, rainy streetlights)
function createNoirSvg() {
  return svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <defs>
    <radialGradient id="noir-light" cx="30%" cy="15%" r="70%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#ffffff" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- Deep Jet Black Base -->
  <rect width="400" height="225" fill="#000000"/>
  
  <!-- Streetlamp Cone Beam -->
  <polygon points="120,0 260,225 30,225" fill="url(#noir-light)"/>
  
  <!-- Wet Asphalt Street Reflections -->
  <line x1="40" y1="180" x2="160" y2="180" stroke="#ffffff" stroke-width="1.5" opacity="0.4"/>
  <line x1="80" y1="195" x2="220" y2="195" stroke="#ffffff" stroke-width="2" opacity="0.3"/>
  <line x1="120" y1="210" x2="280" y2="210" stroke="#ffffff" stroke-width="1" opacity="0.5"/>
  
  <!-- Woman Crying on Street Curb (Chiaroscuro Silhouette) -->
  <g transform="translate(160, 75)">
    <!-- Head leaning down with flowing dark hair -->
    <ellipse cx="40" cy="35" rx="18" ry="24" fill="#ffffff"/>
    <path d="M 22 15 Q 40 45 35 65 Q 15 45 18 15 Z" fill="#000000"/>
    <!-- Intense shadow covering half face -->
    <path d="M 40 12 L 40 58 Q 58 55 56 35 Z" fill="#000000"/>
    <!-- Slumped shoulders and leather jacket -->
    <path d="M 15 58 L 65 58 L 75 125 L 5 125 Z" fill="#18181b" stroke="#ffffff" stroke-width="1.8"/>
  </g>
  
  <!-- Film Noir Film Border -->
  <rect x="0" y="0" width="400" height="225" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.3"/>
</svg>`);
}

// 11. Stick Figure (Minimalist modern line drawing, clean whimsical outlines)
function createStickFigureSvg() {
  return svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <rect width="400" height="225" fill="#ffffff"/>
  
  <!-- Room Horizon line -->
  <line x1="20" y1="170" x2="380" y2="170" stroke="#000000" stroke-width="2.5"/>
  <!-- Minimalist picture frame on wall -->
  <rect x="60" y="45" width="50" height="40" fill="none" stroke="#000000" stroke-width="2"/>
  <line x1="75" y1="70" x2="95" y2="55" stroke="#000000" stroke-width="1.5"/>
  
  <!-- Couple in minimal line art (Stylized expressive stick figures) -->
  <g stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <!-- Figure 1 (Female on Left) -->
    <circle cx="170" cy="85" r="16" fill="#ffffff"/>
    <!-- Ponytail hair -->
    <path d="M 156 85 Q 140 90 145 105" stroke-width="2.5"/>
    <line x1="170" y1="101" x2="175" y2="145"/>
    <!-- Arms embracing -->
    <path d="M 172 115 L 195 125 L 210 115"/>
    <!-- Legs -->
    <line x1="175" y1="145" x2="165" y2="170"/>
    <line x1="175" y1="145" x2="182" y2="170"/>
    
    <!-- Figure 2 (Male on Right) -->
    <circle cx="215" cy="85" r="16" fill="#ffffff"/>
    <!-- Curly hair spikes -->
    <path d="M 215 69 Q 225 65 230 75 Q 235 85 231 92" stroke-width="2"/>
    <line x1="215" y1="101" x2="210" y2="145"/>
    <!-- Arms embracing -->
    <path d="M 213 115 L 190 120 L 175 112"/>
    <!-- Legs -->
    <line x1="210" y1="145" x2="205" y2="170"/>
    <line x1="210" y1="145" x2="225" y2="170"/>
  </g>
  
  <!-- Floating Heart above -->
  <path d="M 192 65 C 192 58 184 55 184 62 C 184 70 192 75 192 78 C 192 75 200 70 200 62 C 200 55 192 58 192 65 Z" fill="#ef4444"/>
</svg>`);
}

// 12. Graphic Novel (Stylized graphic novel illustration, stark shadow blocking, gritty comic noir)
function createGraphicNovelSvg() {
  return svgData(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" width="100%" height="100%">
  <defs>
    <linearGradient id="gn-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#451a03"/>
      <stop offset="50%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
  </defs>
  <rect width="400" height="225" fill="url(#gn-bg)"/>
  
  <!-- Venetian Blind Window Shadows in Warm Orange -->
  <g fill="#f59e0b" opacity="0.3">
    <polygon points="220,20 400,20 380,35 200,35"/>
    <polygon points="190,50 370,50 350,65 170,65"/>
    <polygon points="160,80 340,80 320,95 140,95"/>
    <polygon points="130,110 310,110 290,125 110,125"/>
  </g>
  
  <!-- Detectives on Leather Sofa (Stark black and white shadow blocking) -->
  <g stroke="#000000" stroke-width="2.5">
    <!-- Sofa -->
    <rect x="40" y="130" width="320" height="55" rx="6" fill="#18181b" stroke="#ffffff" stroke-width="1.5"/>
    
    <!-- Detective Woman (Blonde, Suit, Stark Shadows) -->
    <path d="M 90 85 L 115 85 L 105 110 Z" fill="#ffffff"/>
    <path d="M 75 105 L 125 105 L 135 160 L 65 160 Z" fill="#000000" stroke="#ffffff" stroke-width="2"/>
    <polygon points="95,110 105,110 100,125" fill="#f59e0b"/>
    
    <!-- Detective Man (Cigarette / Drink, Deep Shadows) -->
    <path d="M 270 80 L 295 80 L 285 105 Z" fill="#fed7aa"/>
    <path d="M 250 100 L 315 100 L 330 160 L 240 160 Z" fill="#000000" stroke="#ffffff" stroke-width="2"/>
  </g>
  
  <!-- Harsh Graphic Novel Border -->
  <rect x="0" y="0" width="400" height="225" fill="none" stroke="#000000" stroke-width="6"/>
</svg>`);
}

export const VISUAL_STYLE_PREVIEWS = [
  {
    id: "Comic",
    name: "Comic",
    tagline: "Bold Ink & Halftone Dots",
    description: "Classic action comic illustration with thick outlines, halftone Ben-Day dots, and primary pop colors.",
    previewImage: "/assets/styles/comic.jpg",
    fallbackSvg: createComicSvg()
  },
  {
    id: "Cinematic",
    name: "Cinematic",
    tagline: "35mm Film Still",
    description: "Atmospheric 35mm film still with moody natural lighting, shallow depth of field, and filmic grain.",
    previewImage: "/assets/styles/cinematic-realism.jpg",
    fallbackSvg: createCinematicSvg()
  },
  {
    id: "Soft Pencil",
    name: "Soft Pencil",
    tagline: "Light Graphite & Fine Shading",
    description: "Delicate graphite pencil drawing on clean off-white paper with soft tonal cross-hatching.",
    previewImage: "/assets/styles/storyboard-sketch.jpg",
    fallbackSvg: createSoftPencilSvg()
  },
  {
    id: "Animation 3D",
    name: "Animation 3D",
    tagline: "Pixar / Studio 3D CGI",
    description: "Warm 3D rendered character animation with soft volumetric lighting and expressive stylized anatomy.",
    previewImage: "/assets/styles/animation-3d.jpg",
    fallbackSvg: createAnimation3DSvg()
  },
  {
    id: "Watercolor Paint",
    name: "Watercolor Paint",
    tagline: "Pastel Pigments & Fluid Wash",
    description: "Artistic watercolor wash on textured paper with soft bleeding pigments and dreamy translucent hues.",
    previewImage: "/assets/styles/watercolor-paint.jpg",
    fallbackSvg: createWatercolorSvg()
  },
  {
    id: "Photo / Commercial",
    name: "Photo / Commercial",
    tagline: "Sharp Advertising Photography",
    description: "Commercial editorial photography with razor-sharp lens focus, natural daylight, and bokeh.",
    previewImage: "/assets/styles/photorealistic.jpg",
    fallbackSvg: createPhotoCommercialSvg()
  },
  {
    id: "Charcoal Sketch",
    name: "Charcoal Sketch",
    tagline: "Smudged Shadows & Rich Charcoal",
    description: "Dramatic expressive charcoal drawing with deep velvety blacks, smudged shadows, and coarse tooth paper.",
    previewImage: "/assets/styles/charcoal-sketch.jpg",
    fallbackSvg: createCharcoalSvg()
  },
  {
    id: "Dark Anime",
    name: "Dark Anime",
    tagline: "Cyberpunk Cel-Shading",
    description: "Japanese anime aesthetic with sharp cel-shaded lines, intense city backlight, and glowing neon rim.",
    previewImage: "/assets/styles/dark-anime.jpg",
    fallbackSvg: createDarkAnimeSvg()
  },
  {
    id: "Flat / Vector",
    name: "Flat / Vector",
    tagline: "Clean 2D Vector Art",
    description: "Modern editorial 2D vector art with bold flat silhouettes, vibrant solid colors, and clean geometry.",
    previewImage: "/assets/styles/flat-vector.jpg",
    fallbackSvg: createFlatVectorSvg()
  },
  {
    id: "Noir",
    name: "Noir",
    tagline: "High-Contrast Chiaroscuro",
    description: "Classic black-and-white film noir with stark shadows, dramatic streetlights, and rainy street reflections.",
    previewImage: "/assets/styles/noir.jpg",
    fallbackSvg: createNoirSvg()
  },
  {
    id: "Stick Figure",
    name: "Stick Figure",
    tagline: "Minimalist Modern Line Art",
    description: "Clean minimalist black line art with whimsical expressive poses and uncluttered white space.",
    previewImage: "/assets/styles/stick-figure.jpg",
    fallbackSvg: createStickFigureSvg()
  },
  {
    id: "Graphic Novel",
    name: "Graphic Novel",
    tagline: "Gritty Stark Shadow Blocking",
    description: "High-contrast graphic novel panel with heavy ink shadows and dramatic amber and violet duotone.",
    previewImage: "/assets/styles/graphic-novel.jpg",
    fallbackSvg: createGraphicNovelSvg()
  }
];

export function getStylePreview(styleId) {
  const norm = (styleId || '').trim().toLowerCase();
  return VISUAL_STYLE_PREVIEWS.find(s => {
    const sId = s.id.toLowerCase();
    const sName = s.name.toLowerCase();
    return sId === norm || sName === norm ||
      norm.includes(sId) || sId.includes(norm) ||
      (norm.includes('comic') && sId.includes('comic')) ||
      (norm.includes('cine') && sId.includes('cinematic')) ||
      (norm.includes('pencil') && sId.includes('pencil')) ||
      (norm.includes('3d') && sId.includes('3d')) ||
      (norm.includes('water') && sId.includes('water')) ||
      (norm.includes('photo') && sId.includes('photo')) ||
      (norm.includes('charcoal') && sId.includes('charcoal')) ||
      (norm.includes('anime') && sId.includes('anime')) ||
      (norm.includes('vector') && sId.includes('vector')) ||
      (norm.includes('noir') && sId.includes('noir')) ||
      (norm.includes('stick') && sId.includes('stick')) ||
      (norm.includes('graphic') && sId.includes('graphic'));
  }) || VISUAL_STYLE_PREVIEWS[2]; // Default to Soft Pencil
}

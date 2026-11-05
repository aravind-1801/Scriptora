// SCRIPTORA Storyboard Studio - Intermediate Visual Style Previews
// Four distinct artistic treatments of the SAME cinematic scene (Desert Security Checkpoint)

function createConceptArtSvg() {
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" width="100%" height="100%">
  <defs>
    <linearGradient id="ca-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="45%" stop-color="#1e293b"/>
      <stop offset="70%" stop-color="#7c2d12"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="ca-sand" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#92400e"/>
      <stop offset="40%" stop-color="#b45309"/>
      <stop offset="100%" stop-color="#451a03"/>
    </linearGradient>
    <linearGradient id="ca-glow" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#d97706" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="ca-sun" cx="75%" cy="35%" r="35%">
      <stop offset="0%" stop-color="#fde68a" stop-opacity="0.9"/>
      <stop offset="30%" stop-color="#f59e0b" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#b45309" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="640" height="360" fill="url(#ca-sky)"/>
  <circle cx="480" cy="130" r="140" fill="url(#ca-sun)"/>

  <path d="M0,220 Q160,170 340,210 T640,195 L640,360 L0,360 Z" fill="#78350f" opacity="0.85"/>
  <path d="M0,240 Q220,200 440,235 T640,225 L640,360 L0,360 Z" fill="url(#ca-sand)"/>

  <polygon points="260,360 380,360 330,230 310,230" fill="#292524" opacity="0.9"/>
  <line x1="320" y1="230" x2="315" y2="360" stroke="#f59e0b" stroke-width="2" stroke-dasharray="10 8" opacity="0.6"/>

  <line x1="0" y1="260" x2="640" y2="245" stroke="#475569" stroke-width="2" opacity="0.7"/>
  <line x1="0" y1="250" x2="640" y2="235" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4 2" opacity="0.6"/>
  <line x1="0" y1="242" x2="640" y2="227" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2 3" opacity="0.5"/>

  <line x1="70" y1="310" x2="95" y2="140" stroke="#1e293b" stroke-width="4"/>
  <line x1="140" y1="310" x2="115" y2="140" stroke="#0f172a" stroke-width="4"/>
  <line x1="80" y1="230" x2="130" y2="230" stroke="#334155" stroke-width="3"/>
  <line x1="88" y1="180" x2="122" y2="180" stroke="#334155" stroke-width="3"/>
  <line x1="75" y1="300" x2="125" y2="230" stroke="#1e293b" stroke-width="2"/>
  <line x1="135" y1="300" x2="85" y2="230" stroke="#1e293b" stroke-width="2"/>
  <line x1="83" y1="230" x2="120" y2="180" stroke="#1e293b" stroke-width="2"/>
  <line x1="127" y1="230" x2="90" y2="180" stroke="#1e293b" stroke-width="2"/>
  <polygon points="65,145 145,145 135,90 75,90" fill="#0f172a" stroke="#d97706" stroke-width="1.5"/>
  <rect x="80" y="100" width="50" height="18" fill="#06b6d4" opacity="0.85"/>
  <polygon points="60,90 150,90 140,75 70,75" fill="#1e293b"/>
  <line x1="105" y1="75" x2="105" y2="45" stroke="#334155" stroke-width="2"/>
  <circle cx="105" cy="45" r="4" fill="#d97706"/>
  <polygon points="135,140 280,240 250,290 135,150" fill="url(#ca-glow)" opacity="0.6"/>

  <rect x="230" y="240" width="55" height="40" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
  <rect x="240" y="248" width="22" height="14" fill="#f59e0b" opacity="0.75"/>
  <polygon points="280,280 305,280 310,295 275,295" fill="#475569"/>
  <line x1="300" y1="285" x2="430" y2="280" stroke="#ef4444" stroke-width="6"/>
  <line x1="300" y1="285" x2="430" y2="280" stroke="#f8fafc" stroke-width="6" stroke-dasharray="14 14"/>
  <circle cx="300" cy="285" r="5" fill="#0284c7"/>

  <rect x="16" y="16" width="115" height="24" rx="6" fill="#0f172a" fill-opacity="0.85" stroke="#d97706" stroke-width="1"/>
  <text x="24" y="32" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="10" font-weight="bold" letter-spacing="1">CONCEPT ART</text>
</svg>
`)}`;
}

function createCinematicRealismSvg() {
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" width="100%" height="100%">
  <defs>
    <linearGradient id="cr-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="35%" stop-color="#bae6fd"/>
      <stop offset="70%" stop-color="#fed7aa"/>
      <stop offset="100%" stop-color="#fde047"/>
    </linearGradient>
    <linearGradient id="cr-sand" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ca8a04"/>
      <stop offset="50%" stop-color="#a16207"/>
      <stop offset="100%" stop-color="#713f12"/>
    </linearGradient>
    <linearGradient id="cr-flare" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="45%" stop-color="#38bdf8" stop-opacity="0.4"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="55%" stop-color="#f59e0b" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="640" height="360" fill="url(#cr-sky)"/>
  <circle cx="510" cy="115" r="28" fill="#fef08a" opacity="0.85"/>

  <path d="M0,205 Q170,180 350,200 T640,190 L640,360 L0,360 Z" fill="#b45309" opacity="0.7"/>
  <path d="M0,225 Q230,205 450,225 T640,218 L640,360 L0,360 Z" fill="url(#cr-sand)"/>

  <polygon points="255,360 385,360 332,228 308,228" fill="#3f3f46"/>
  <line x1="320" y1="228" x2="318" y2="360" stroke="#fef08a" stroke-width="2" stroke-dasharray="12 10" opacity="0.8"/>

  <line x1="0" y1="250" x2="640" y2="238" stroke="#475569" stroke-width="1.8"/>
  <line x1="0" y1="242" x2="640" y2="230" stroke="#64748b" stroke-width="1.2" stroke-dasharray="5 3"/>

  <line x1="72" y1="305" x2="96" y2="135" stroke="#18181b" stroke-width="3.5"/>
  <line x1="138" y1="305" x2="114" y2="135" stroke="#27272a" stroke-width="3.5"/>
  <line x1="82" y1="225" x2="128" y2="225" stroke="#3f3f46" stroke-width="2.5"/>
  <line x1="89" y1="175" x2="121" y2="175" stroke="#3f3f46" stroke-width="2.5"/>
  <line x1="76" y1="295" x2="124" y2="225" stroke="#27272a" stroke-width="1.8"/>
  <line x1="134" y1="295" x2="86" y2="225" stroke="#27272a" stroke-width="1.8"/>
  <polygon points="68,140 142,140 133,88 77,88" fill="#18181b" stroke="#52525b" stroke-width="1"/>
  <rect x="82" y="98" width="46" height="16" fill="#0284c7" opacity="0.9"/>
  <polygon points="63,88 147,88 138,74 72,74" fill="#27272a"/>
  <line x1="105" y1="74" x2="105" y2="42" stroke="#52525b" stroke-width="2"/>
  <circle cx="105" cy="42" r="3" fill="#dc2626"/>

  <rect x="232" y="238" width="54" height="38" fill="#27272a" stroke="#52525b" stroke-width="1.5"/>
  <rect x="242" y="246" width="20" height="12" fill="#38bdf8" opacity="0.85"/>
  <polygon points="280,276 304,276 308,290 276,290" fill="#71717a"/>
  <line x1="298" y1="282" x2="425" y2="277" stroke="#dc2626" stroke-width="5"/>
  <line x1="298" y1="282" x2="425" y2="277" stroke="#ffffff" stroke-width="5" stroke-dasharray="14 14"/>
  <circle cx="298" cy="282" r="4.5" fill="#0284c7"/>

  <line x1="0" y1="115" x2="640" y2="115" stroke="url(#cr-flare)" stroke-width="4" opacity="0.65"/>

  <rect x="0" y="0" width="640" height="30" fill="#000000"/>
  <rect x="0" y="330" width="640" height="30" fill="#000000"/>

  <rect x="16" y="38" width="135" height="22" rx="5" fill="#000000" fill-opacity="0.85" stroke="#38bdf8" stroke-width="1"/>
  <text x="24" y="53" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="10" font-weight="bold" letter-spacing="1">CINEMATIC REALISM</text>
</svg>
`)}`;
}

function createStoryboardSketchSvg() {
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" width="100%" height="100%">
  <defs>
    <pattern id="sk-hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#334155" stroke-width="1.2"/>
    </pattern>
    <pattern id="sk-dense-hatch" width="4" height="4" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="4" stroke="#0f172a" stroke-width="1.4"/>
    </pattern>
  </defs>

  <rect width="640" height="360" fill="#f8fafc"/>

  <line x1="213" y1="0" x2="213" y2="360" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 6" opacity="0.7"/>
  <line x1="426" y1="0" x2="426" y2="360" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 6" opacity="0.7"/>
  <line x1="0" y1="120" x2="640" y2="120" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 6" opacity="0.7"/>
  <line x1="0" y1="240" x2="640" y2="240" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 6" opacity="0.7"/>

  <line x1="320" y1="220" x2="0" y2="340" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2 4"/>
  <line x1="320" y1="220" x2="640" y2="340" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2 4"/>

  <circle cx="500" cy="110" r="30" fill="none" stroke="#0f172a" stroke-width="2" stroke-dasharray="6 3"/>

  <path d="M0,210 Q160,185 340,205 T640,195" fill="none" stroke="#0f172a" stroke-width="2.5"/>
  <path d="M0,230 Q220,210 440,230 T640,220" fill="none" stroke="#334155" stroke-width="2"/>
  <path d="M0,235 Q220,215 440,235 T640,225 L640,270 L0,270 Z" fill="url(#sk-hatch)" opacity="0.35"/>

  <polygon points="260,360 380,360 330,220 310,220" fill="#f1f5f9" stroke="#0f172a" stroke-width="2"/>
  <line x1="320" y1="220" x2="315" y2="360" stroke="#0f172a" stroke-width="1.8" stroke-dasharray="8 6"/>

  <line x1="0" y1="255" x2="640" y2="240" stroke="#0f172a" stroke-width="2"/>
  <line x1="0" y1="245" x2="640" y2="230" stroke="#334155" stroke-width="1.5"/>
  <line x1="50" y1="240" x2="50" y2="270" stroke="#0f172a" stroke-width="2"/>
  <line x1="160" y1="235" x2="160" y2="265" stroke="#0f172a" stroke-width="2"/>
  <line x1="480" y1="230" x2="480" y2="260" stroke="#0f172a" stroke-width="2"/>
  <line x1="580" y1="225" x2="580" y2="255" stroke="#0f172a" stroke-width="2"/>

  <line x1="70" y1="310" x2="95" y2="135" stroke="#0f172a" stroke-width="4"/>
  <line x1="140" y1="310" x2="115" y2="135" stroke="#0f172a" stroke-width="4"/>
  <line x1="80" y1="225" x2="130" y2="225" stroke="#0f172a" stroke-width="2.5"/>
  <line x1="88" y1="175" x2="122" y2="175" stroke="#0f172a" stroke-width="2.5"/>
  <line x1="75" y1="300" x2="125" y2="225" stroke="#334155" stroke-width="2"/>
  <line x1="135" y1="300" x2="85" y2="225" stroke="#334155" stroke-width="2"/>
  <line x1="83" y1="225" x2="120" y2="175" stroke="#334155" stroke-width="2"/>
  <line x1="127" y1="225" x2="90" y2="175" stroke="#334155" stroke-width="2"/>
  <polygon points="65,140 145,140 135,85 75,85" fill="#f8fafc" stroke="#0f172a" stroke-width="3"/>
  <polygon points="65,140 145,140 135,85 75,85" fill="url(#sk-dense-hatch)" opacity="0.6"/>
  <rect x="80" y="95" width="50" height="18" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
  <polygon points="60,85 150,85 140,70 70,70" fill="#f8fafc" stroke="#0f172a" stroke-width="3"/>
  <line x1="105" y1="70" x2="105" y2="40" stroke="#0f172a" stroke-width="2.5"/>
  <circle cx="105" cy="40" r="3.5" fill="#0f172a"/>

  <rect x="230" y="235" width="55" height="40" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
  <rect x="230" y="235" width="55" height="40" fill="url(#sk-hatch)" opacity="0.4"/>
  <rect x="240" y="243" width="22" height="14" fill="#ffffff" stroke="#0f172a" stroke-width="1.8"/>
  <polygon points="280,275 305,275 310,290 275,290" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
  <line x1="300" y1="280" x2="430" y2="275" stroke="#0f172a" stroke-width="6"/>
  <line x1="300" y1="280" x2="430" y2="275" stroke="#ffffff" stroke-width="6" stroke-dasharray="14 14"/>
  <line x1="300" y1="280" x2="430" y2="275" stroke="#0f172a" stroke-width="1.5"/>

  <path d="M12,24 L12,12 L24,12" fill="none" stroke="#0f172a" stroke-width="2"/>
  <path d="M628,24 L628,12 L616,12" fill="none" stroke="#0f172a" stroke-width="2"/>
  <path d="M12,336 L12,348 L24,348" fill="none" stroke="#0f172a" stroke-width="2"/>
  <path d="M628,336 L628,348 L616,348" fill="none" stroke="#0f172a" stroke-width="2"/>

  <rect x="30" y="16" width="135" height="24" rx="4" fill="#0f172a"/>
  <text x="38" y="32" fill="#ffffff" font-family="system-ui, sans-serif" font-size="10" font-weight="bold" letter-spacing="1">STORYBOARD SKETCH</text>
</svg>
`)}`;
}

function createPhotorealisticSvg() {
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" width="100%" height="100%">
  <defs>
    <linearGradient id="pr-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="40%" stop-color="#38bdf8"/>
      <stop offset="75%" stop-color="#bae6fd"/>
      <stop offset="100%" stop-color="#ffedd5"/>
    </linearGradient>
    <linearGradient id="pr-sand" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#d97706"/>
      <stop offset="35%" stop-color="#b45309"/>
      <stop offset="80%" stop-color="#78350f"/>
      <stop offset="100%" stop-color="#451a03"/>
    </linearGradient>
    <linearGradient id="pr-metal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#94a3b8"/>
      <stop offset="50%" stop-color="#475569"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <radialGradient id="pr-sun-disc" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="30%" stop-color="#fef08a"/>
      <stop offset="70%" stop-color="#fde047" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#fde047" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="640" height="360" fill="url(#pr-sky)"/>
  <circle cx="515" cy="95" r="45" fill="url(#pr-sun-disc)"/>
  <circle cx="515" cy="95" r="14" fill="#ffffff"/>

  <path d="M0,195 Q150,175 330,190 T640,185 L640,360 L0,360 Z" fill="#92400e" opacity="0.6"/>
  <path d="M0,215 Q210,195 420,215 T640,205 L640,360 L0,360 Z" fill="url(#pr-sand)"/>

  <polygon points="250,360 390,360 334,220 306,220" fill="#262626"/>
  <line x1="320" y1="220" x2="316" y2="360" stroke="#facc15" stroke-width="2.5" stroke-dasharray="14 12"/>
  <line x1="324" y1="220" x2="320" y2="360" stroke="#facc15" stroke-width="2.5" stroke-dasharray="14 12"/>

  <line x1="0" y1="245" x2="640" y2="230" stroke="#94a3b8" stroke-width="1.8"/>
  <line x1="0" y1="237" x2="640" y2="222" stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="6 3"/>
  <line x1="0" y1="230" x2="640" y2="215" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="3 4"/>
  <line x1="60" y1="230" x2="60" y2="265" stroke="#334155" stroke-width="2.5"/>
  <line x1="60" y1="265" x2="90" y2="275" stroke="#451a03" stroke-width="2" opacity="0.4"/>
  <line x1="170" y1="225" x2="170" y2="260" stroke="#334155" stroke-width="2.5"/>
  <line x1="470" y1="220" x2="470" y2="255" stroke="#334155" stroke-width="2.5"/>
  <line x1="570" y1="215" x2="570" y2="250" stroke="#334155" stroke-width="2.5"/>

  <polygon points="70,305 140,305 210,335 150,335" fill="#451a03" opacity="0.45"/>
  <line x1="72" y1="305" x2="96" y2="130" stroke="url(#pr-metal)" stroke-width="4"/>
  <line x1="138" y1="305" x2="114" y2="130" stroke="url(#pr-metal)" stroke-width="4"/>
  <line x1="82" y1="220" x2="128" y2="220" stroke="#334155" stroke-width="2.5"/>
  <line x1="89" y1="170" x2="121" y2="170" stroke="#334155" stroke-width="2.5"/>
  <line x1="76" y1="295" x2="124" y2="220" stroke="#1e293b" stroke-width="2"/>
  <line x1="134" y1="295" x2="86" y2="220" stroke="#1e293b" stroke-width="2"/>
  <polygon points="68,135 142,135 133,82 77,82" fill="url(#pr-metal)" stroke="#0f172a" stroke-width="1"/>
  <rect x="82" y="92" width="46" height="16" fill="#0284c7" stroke="#38bdf8" stroke-width="0.8"/>
  <line x1="84" y1="94" x2="126" y2="106" stroke="#ffffff" stroke-width="1.5" opacity="0.6"/>
  <polygon points="63,82 147,82 138,68 72,68" fill="#334155"/>
  <line x1="105" y1="68" x2="105" y2="38" stroke="#94a3b8" stroke-width="2.5"/>
  <circle cx="105" cy="38" r="3.5" fill="#ef4444"/>

  <polygon points="230,270 284,270 330,295 280,295" fill="#451a03" opacity="0.5"/>
  <rect x="230" y="232" width="54" height="38" fill="#334155" stroke="#475569" stroke-width="1.5"/>
  <rect x="240" y="240" width="20" height="12" fill="#0284c7" stroke="#0ea5e9" stroke-width="0.8"/>
  <polygon points="278,270 302,270 306,284 274,284" fill="#64748b" stroke="#334155" stroke-width="1"/>
  <line x1="296" y1="276" x2="425" y2="271" stroke="#dc2626" stroke-width="6"/>
  <line x1="296" y1="276" x2="425" y2="271" stroke="#ffffff" stroke-width="6" stroke-dasharray="14 14"/>
  <circle cx="296" cy="276" r="5" fill="#0284c7"/>

  <rect x="16" y="16" width="125" height="24" rx="6" fill="#0f172a" fill-opacity="0.9" stroke="#38bdf8" stroke-width="1"/>
  <text x="24" y="32" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="10" font-weight="bold" letter-spacing="1">PHOTOREALISTIC</text>
</svg>
`)}`;
}

export const VISUAL_STYLE_PREVIEWS = [
  {
    id: "Concept Art",
    name: "Concept Art",
    tagline: "Atmospheric & Painterly",
    description: "Rich digital painting with painterly brushwork, volumetric dust haze, and dramatic cinematic lighting.",
    previewImage: "/assets/styles/concept-art.jpg",
    fallbackSvg: createConceptArtSvg()
  },
  {
    id: "Cinematic Realism",
    name: "Cinematic Realism",
    tagline: "35mm Film Still",
    description: "35mm anamorphic film look with naturalistic depth-of-field, warm desert palette, and subtle grain.",
    previewImage: "/assets/styles/cinematic-realism.jpg",
    fallbackSvg: createCinematicRealismSvg()
  },
  {
    id: "Storyboard Sketch",
    name: "Storyboard Sketch",
    tagline: "Charcoal & Ink",
    description: "Classic high-contrast ink and charcoal line art with cross-hatching and framing crosshairs.",
    previewImage: "/assets/styles/storyboard-sketch.jpg",
    fallbackSvg: createStoryboardSketchSvg()
  },
  {
    id: "Photorealistic",
    name: "Photorealistic",
    tagline: "Documentary Optics",
    description: "Razor-sharp photographic clarity with physical lens optics, accurate metallic reflections, and crisp daylight.",
    previewImage: "/assets/styles/photorealistic.jpg",
    fallbackSvg: createPhotorealisticSvg()
  }
];

export function getStylePreview(styleId) {
  const norm = (styleId || '').trim().toLowerCase();
  return VISUAL_STYLE_PREVIEWS.find(s => {
    const sId = s.id.toLowerCase();
    return sId === norm ||
      (norm.includes('concept') && sId.includes('concept')) ||
      (norm.includes('cinematic') && sId.includes('cinematic')) ||
      (norm.includes('sketch') && sId.includes('sketch')) ||
      (norm.includes('ink') && sId.includes('sketch')) ||
      (norm.includes('pencil') && sId.includes('sketch')) ||
      (norm.includes('photo') && sId.includes('photo'));
  }) || VISUAL_STYLE_PREVIEWS[0];
}


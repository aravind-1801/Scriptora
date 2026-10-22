# SCRIPTORA — Screenplay Studio & Narrative Intelligence Engine

[![Live Demo](https://img.shields.io/badge/Demo-GitHub%20Pages-blue?style=flat-square)](https://aravind-1801.github.io/Scriptora)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=flat-square)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple?style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square)](https://tailwindcss.com/)

**SCRIPTORA** is an end-to-end cinematic screenplay writing workspace, professional script editor, pre-production planning studio, and narrative intelligence platform built for screenwriters, showrunners, directors, and production crews.

---

## 🌟 Key Modules & Workflows

### 🎬 Professional Screenplay Studio & Editor
- **Industry-Standard Formatting**: Write and format screenplay elements with precision — Scene Headings (`INT./EXT.`), Action (`Act`), Characters (`Char`), Dialogue (`Dia`), Parentheticals (`()`), Transitions (`Trans`), Shots, Script Notes, Outline Beats, Act Breaks, Sequences, Dual Dialogue, and Musical Lyrics.
- **Authentic A4 Continuous Layout**: Authentic A4 page canvas (`800px × 1130px`, matching the 210mm × 297mm international paper ratio) with Courier Prime typography, live page-break indicators, and page counter telemetry.
- **Parallel Title Page View**: Dedicated Title Page document sheet with clean metadata editing (Title, Author, Contact, Email, Revision/Draft info) and one-click `X` tab close and reopen controls.
- **Rich Text Formatting Toolbar**: Single-symbol controls (`B` Bold, `I` Italic, `U` Underline, `S` Strikethrough) right of the Draft version button using standard app Material Symbols, active selection formatting, solid blue active-state indicators, and keyboard shortcuts (`Ctrl+B`, `Ctrl+I`, `Ctrl+U`).
- **Cursor-Targeted Storyboard Images**: Upload and embed storyboard images directly at the active cursor/block position with captions and deletion management.
- **Smart Formatting Automation**:
  - Sentence auto-capitalization for Action lines and Dialogue (at start of line and after periods).
  - Dynamic Character Name memory and suggestion dropdown.
  - Scene Heading autocomplete for time/lighting (`- DAY`, `- NIGHT`, `- CONTINUOUS`, etc.).
  - Automatic parenthetical cursor placement directly inside `()`.
  - **Complete Tab Navigation Cycle**: Full, predictable industry screenplay cycle using Tab (`Scene Heading → Character → Dialogue → Transition → Scene Heading`) and Shift+Tab (reverse cycle), preserving existing Action-to-Character flow, block contents, and cursor positioning across both empty and populated blocks.
  - **Automatic Transition Suggestions**: Compact, scrollable autocomplete panel appearing instantly when focusing or entering an empty Transition line with 18 standard screenplay transitions (`CUT TO:`, `FADE IN:`, `FADE OUT.`, `DISSOLVE TO:`, `MATCH CUT TO:`, `SMASH CUT TO:`, `SLAM TO:`, etc.), case-insensitive letter filtering with exact-prefix ranking, keyboard navigation, and mobile virtual-keyboard collision avoidance.
  - **Context-Aware Space Key Navigation (Mobile)**: Sequential rapid format cycling on empty lines (`Empty Action + Space → Character → Transition → Action`) with mobile virtual-keyboard (`beforeinput` / Gboard) debouncing, zero-width space normalization, and undo/redo integration without affecting regular text editing.
- **Page Management & Navigation**:
  - Add Page at End, Insert Page Before, and Insert Page Break.
  - Scene Jump dropdown and Go to Page jump dialog.
  - Find & Replace compact floating popup overlay.
  - Focus Mode for distraction-free writing (smooth full-screen transition with floating exit control).
  - Bilingual English / Tamil (`EN / தமிழ்`) language toggle.
- **Authentic PDF 1.4 Vector Export**: Export authentic, industry-standard A4 PDF files (built with pure vector PDF 1.4 syntax, standard Courier/Courier-Bold typography, headers, and margins) that open without error in Adobe Acrobat, Apple Books, and Chrome. Also supports Final Draft (`FDX`), Fountain, and Plain Text (`TXT`) with custom page range options (`All`, `Current`, or custom ranges e.g. `1-3, 5`).
- **Unified Save & Auto-Save**: Single-pill unified save control with real-time auto-save toggle and Draft version history snapshots.

---

### 🎥 Dedicated Pre-Production Workspaces & Production Workflows
Every core production tool opens as a **dedicated workspace** with stable screenplay context tracking (`Chronicles of Dust • Draft 4.2 Pinned`), role-based permissions, and end-to-end local/cloud persistence:

1. **Category-Aware Script Breakdown Workspace (`/production/breakdown`)**:
   - **9 Distinct Production Categories**: Tailored data models and dedicated visual presentation for Cast & Characters, Locations, Props, Costumes & Wardrobe, Practical FX, Stunts & Action, Vehicles & Equipment, Sound, and Hair & Makeup.
   - **Sleek Mobile Category Filter Bar**: Equal-height category filter pill boxes with clean two-line text wrapping (`text-[9px]`), centered icons, and responsive horizontal scroll designed to never overflow or misalign on mobile viewports.
   - **Screenplay Characters vs. Cast Members**: Strict separation between the screenplay-linked character entity and assigned real-world talent. Supports uncast open roles without forcing fake actor assignments, casting lifecycle statuses (`Confirmed Cast`, `Offer Out`, `Auditioning`, `Uncast / Open`), and actor availability schedules.
   - **Full User Editability**: Every displayed field is editable by authorized users via dedicated inline expandable card editors — edit names, descriptions, categories, multi-scene associations, statuses, quantities, readiness, sourcing, safety planning, and continuity notes with real-time Save & Cancel persistence.
   - **AI Suggestions vs. Production Decisions**: Immutable screenplay evidence quotations (`sourceSnippet`), original AI extraction tracking (`originalAiSuggestion`), and separate user correction audit logging (`userCorrection`) without altering source evidence.
   - **Dynamic Modal & Multi-Scene Linking**: Add production elements manually with dynamic category-specific input fields and link items to single or multiple scenes simultaneously.
   - **Direct Vector PDF Export**: Single-click high-fidelity PDF export of the complete breakdown catalogue.

2. **Master Shooting Schedule & Calendar Matrix (`/production/schedule`)**:
   - **Streamlined 7-Day Calendar Stripboard**: Interactive 7-day master calendar with Day/Night indicators, Interior/Exterior color badges, estimated shooting page counts, and scene listings.
   - **Integrated Scene Logistics**: Direct inline progressive expansion for scenes within each shoot day, surfacing cast lists, props, locations, and director notes in context without needing a disconnected scene hub.
   - **Interactive Shoot Day Details Modal**:
     - Edit shoot day titles, call times, location notes, and weather/crew advisories.
     - Interactive date picker to reschedule shoot dates with live validation.
     - Day locking toggles to prevent accidental modifications during active production.
     - Real shoot day element deletion with safety confirmation modal.
     - Contextual 3-dot kebab menu with leak-free, idempotent event wiring and viewport-relative positioning.
   - **Authentic Schedule PDF Export**: Export publication-ready shooting schedules formatted for call-time distribution and callboard posting.

3. **Daily Call Sheets Workspace (`/production/call-sheets`)**:
   - **Dual Creation Paths**: Direct schedule-linked generation from confirmed shooting days or standalone manual creation.
   - **Comprehensive Production Details**: General crew call time, individual talent call schedule, scene-by-scene shooting blocks, hospital/emergency contacts, weather advisories, parking instructions, and Director/Producer signatures.
   - **Approval & Distribution**: Owner publication approval workflow with immutable snapshot versioning and vector PDF export.

4. **Dialogue Sheets & Actor Sides (`/production/dialogue-sides`)**:
   - **Dual-Mode Document Layout**:
     - **Character Dialogue Sheets**: Full dialogue streams arranged in screenplay sequence for rehearsals and table reads.
     - **Actor Sides**: Filtered sides by character and scene, formatted in authentic physical paper sides style.
   - **Draft Tracking & Navigation**: Pinned source draft metadata stamps, dedicated subnav heading with robust multi-stage back navigation, and instantaneous vector PDF export.

5. **Storyboard Studio Workspace (`/production/storyboard`)**:
   - **Dual Working Views**: Seamless switching between **Contact Sheet** (responsive visual grid) and **Sequence Editor** (chronological ordering timeline with screenplay context).
   - **Scene-Grounded Source Context**: Direct linkage to actual screenplay scenes (Scenes 1 to 10), displaying INT/EXT, DAY/NIGHT, shoot days, scene snippets, and cast lists with instant navigation to Shooting Schedule contexts.
   - **AI Shot & Sequence Generation**: Single-shot and 4-shot scene sequence generation with genuine provider configuration checks, cost disclosure ($0.040 DALL-E 3, $0.030 Imagen 3, $0.018 SDXL, Free Built-in Concept Engine), and honest error handling when keys are not configured.
   - **Camera & Cinematic Controls**: Aspect ratios (2.39:1, 16:9, 4:3, 9:16), lenses (18mm to 105mm, Anamorphic), shot sizes, camera movements, lighting moods, and 7 visual style presets.
   - **Visual Continuity Tracking**: Screen direction, eyeline, and lighting continuity tracking across consecutive cuts with automated conflict detection.
   - **Shot Lifecycle & Approval**: Frame inspection drawer, drag/touch reordering, single and batch approval workflows, manual reference photo import, and authentic multi-page vector PDF export.

---

### 🌐 Persistent Global Shell & Ergonomic Navigation
- **Global Application Shell**: Single reusable application shell (`#scriptora-app-shell`) encapsulating `#scriptora-global-header`, dynamic content area `#scriptora-global-content`, and `#scriptora-global-nav`.
- **Persistent Global Header**: Available across all application routes, maintaining consistent branding, section subtitles, notification bell with live unread indicator, and user profile avatar.
- **Refined Floating Center AI Chat Button**:
  - Centered at the exact horizontal midpoint (3rd destination in 5-column grid).
  - Raised visibly above the bottom navigation bar (`-translate-y-3.5`) with a protective cutout halo ring (`ring-4 ring-surface/95`).
  - Formed in SCRIPTORA's signature light-blue, white, and royal blue palette.
  - Inactive: Crisp white surface, subtle blue border, soft blue elevation, and primary blue chat icon.
  - Active: Rich royal blue (`bg-blue-600 text-white`) with soft blue ring.
  - Symbol-only presentation with full accessibility (`aria-label="AI Chat"` and tooltip discoverability hint).
- **Persistent 5-Destination Bottom Navigation**:
  1. Workspace
  2. Intelligence
  3. AI Chat *(floating raised center button)*
  4. Production
  5. Profile
- **Multi-Stage Back Navigation Stack**:
  - Global router interceptor (`window.scriptoraRouter.back()`) with prioritized dismissal:
    1. First closes registered sub-views (edit modes, inline forms).
    2. Closes open modal dialogs (both portaled and in-page).
    3. Dismisses open popups, contextual dropdowns, and kebab menus.
    4. Navigates back along the user's authentic history stack with sensible route fallbacks.
- **Global Viewport-Relative Modal & Popup Portal Engine (`popupPosition.js`)**:
  - Reparents modals and dropdowns to `#scriptora-modal-portal` on `document.body` to eliminate container clipping and z-index stacking context traps.
  - Non-destructive body scroll locking that preserves scroll position and prevents background page scrolling on mobile and desktop.
  - Smart viewport bounding and overflow avoidance.

---

### 🧠 Narrative Intelligence Engine
- **Script Selector & Context Setup**: Canonical multi-step narrative intelligence flow (`/intelligence` → `/intelligence/context` → `/intelligence/dashboard`).
- **Script Analysis Dashboard**: Deep narrative breakdown including Pacing Analysis, Character Arc Trajectories, Dialogue Density, Scene Transitions, Emotional Resonance, and Structure Progression.
- **Individual Deep-Dive Analysis**: Dedicated views for Pacing, Emotion, Character, Structure, and Dialogue with direct links to open corresponding scenes in the editor.

---

### 👥 Collaboration & Account Management
- **Draft & Version Management**: Snapshot screenplay drafts, restore previous iterations, and compare screenplay diffs side-by-side.
- **Collaborator Management**: Invite co-writers and editors via Join Codes with role-based permissions (`Owner`, `Editor`, `Viewer`, `Production`).
- **Profile & Preferences**: Local profile photo upload and preview with persistent avatar sync, global editor typography controls, line spacing (`1.0`, `1.5`, `2.0`), scene number display toggles, and notification feeds.
- **Authentication & Security**: Email/password authentication with session persistence, Google OAuth 2.0 readiness, and Firebase integration support.

---

## 🏗️ Project Architecture

```
SCRIPTORA/
├── frontend/                     # UI Client (Vite, SPA Router, Tailwind Design Tokens)
│   ├── public/assets/            # Canonical SCRIPTORA brand logo & assets
│   ├── src/
│   │   ├── components/           # Universal Header, BottomNav, Toasts
│   │   ├── screens/              # Top-level screen components
│   │   │   ├── production/       # Dedicated Pre-Production workspaces
│   │   │   │   ├── prodNav.js    # Shared contextual subnav (script, draft, role)
│   │   │   │   ├── breakdown.js  # Script Breakdown workspace
│   │   │   │   ├── schedule.js   # Shooting Schedule, Stripboard & Scene Logistics
│   │   │   │   ├── callSheets.js # Call Sheets creation & publishing
│   │   │   │   ├── dialogueSides.js # Dialogue Sheets & Actor Sides
│   │   │   │   └── storyboard.js # Storyboard Studio discovery staging
│   │   │   ├── workspace.js      # Main Scriptora screenplay workspace
│   │   │   ├── editor.js         # Continuous A4 Screenplay Editor
│   │   │   ├── aiChat.js         # Universal AI Chat Assistant
│   │   │   ├── intelligence*.js  # Narrative Intelligence suite
│   │   │   ├── notifications.js  # Activity stream
│   │   │   ├── profile.js        # User account & local photo upload
│   │   │   ├── collaborators.js  # Team access & Join Code invitations
│   │   │   ├── auth.js           # Authentication & sign-in screens
│   │   │   └── production.js     # Production Tools hub
│   │   ├── services/             # API client, PDF generation & local storage cache
│   │   ├── state/                # Reactive store & navigation history stack
│   │   ├── utils/                # Brand tokens, popup positioning, character sanitizer
│   │   │   └── popupPosition.js  # Global modal/popup portal & scroll-lock engine
│   │   ├── router.js             # SPA Router with Persistent Global Shell & Back Interceptor
│   │   └── main.js               # Application bootstrap
│   ├── index.html
│   ├── package.json
│   ├── vercel.json               # Vercel deployment configuration
│   └── vite.config.js            # Vite bundler configuration
│
├── backend/                      # API Service (Node.js REST Engine)
│   ├── app/
│   │   ├── auth/                 # Session, password & OTP authentication
│   │   ├── services/             # Production, Screenplay, Intelligence services
│   │   ├── models/               # Datastore models (scenes, breakdown, schedule...)
│   │   ├── middleware/           # CORS & security headers
│   │   └── server.js             # Express REST API routes
│   ├── tests/                    # Integration test suite
│   └── package.json
│
├── package.json                  # Root workspace runner scripts & gh-pages deployment
├── .env.example                  # Environment configuration reference
└── README.md                     # Project documentation
```

---

## 🚀 Quick Setup & Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or higher
- `npm` v9.0.0 or higher

### 1. Install Dependencies
```bash
# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Configure Environment Variables
```bash
# Frontend environment
cp frontend/.env.example frontend/.env

# Backend environment
cp backend/.env.example backend/.env
```

### 3. Start Backend Service
```bash
npm run dev:backend
# Backend server runs on http://localhost:8000
```

### 4. Start Frontend Client
In a separate terminal:
```bash
npm run dev:frontend
# Vite development server runs on http://localhost:3000 (or available port)
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build & Deployment

### Build Frontend
```bash
npm run build:frontend
```
This compiles Vite assets into `frontend/dist/` and synchronizes root deployment assets (`index.html`, `404.html`, and `assets/`).

### Deploy to GitHub Pages
```bash
npm run deploy
```
Publishes the compiled production build directly to the `gh-pages` branch via official GitHub Actions workflows.

### Deploy to Vercel / Cloud Providers
- **Frontend**: Deploy `/frontend` to [Vercel](https://vercel.com/) with build command `npm run build` and output directory `dist`. Set `VITE_API_URL` to your production backend.
- **Backend**: Deploy `/backend` to [Render](https://render.com/), [Railway](https://railway.app/), or [Fly.io](https://fly.io/). Set `PORT=8000` and `FRONTEND_URL` to your frontend production domain.

---

## 📄 License
Private & Proprietary — SCRIPTORA. All rights reserved.

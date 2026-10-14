# SCRIPTORA — Screenplay Studio & Narrative Intelligence Engine

[![Live Demo](https://img.shields.io/badge/Demo-GitHub%20Pages-blue?style=flat-square)](https://aravind-1801.github.io/Scriptora)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=flat-square)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple?style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square)](https://tailwindcss.com/)

**SCRIPTORA** is a cinematic screenplay writing workspace, professional script editor, pre-production planning studio, and narrative intelligence platform built for screenwriters, showrunners, directors, and production teams.

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
Every major production tool opens as a **dedicated screen** (no modal popups) with stable context tracking (`Chronicles of Dust • Draft 4.2 Pinned`), role-based permissions, and end-to-end persistence:

1. **Script Breakdown Workspace (`/production/breakdown`)**:
   - Granular screenplay element extraction across Cast, Props, Practical FX, Vehicles, Stunts, Locations, Wardrobe, Equipment, and Sound.
   - Traceable script evidence for every extracted item.
   - Status lifecycle (`Confirmed`, `Needs Review`, `Rejected`, `Changed`).
   - Human review controls (Confirm, Edit, Reject, Re-review) and manual item addition.
2. **Scene Hub & Logistics (`/production/scenes` & `/production/scenes/:sceneId`)**:
   - Master 18-scene index with completion filters, day/night badges, and cast appearance lists.
   - Dedicated Scene Detail inspector with linked confirmed breakdown elements, actor sides shortcuts, shooting day schedules, and separate editable Director & Continuity Notes.
3. **Call Sheets Workspace (`/production/call-sheets`)**:
   - Dual creation paths: schedule-linked generation from confirmed shooting days or standalone manual creation.
   - Call times, crew calls, talent call schedule, hospital/emergency contacts, weather advisories, parking instructions, and Director/Producer signatures.
   - Owner publication approval workflow with immutable snapshot versioning and vector PDF export.
4. **Dialogue Sheets & Actor Sides (`/production/dialogue-sides`)**:
   - Dual-mode tool: **Character Dialogue Sheets** in screenplay order or **Actor Sides** filtered by character and scene.
   - Pinned source draft metadata stamps and single-click PDF export.
5. **Master Shooting Schedule & Stripboard (`/production/schedule`)**:
   - 14-day stripboard calendar with day/night, interior/exterior color indicators, and estimated shooting page counts.
   - Day locking toggles, company move detection, conflict validation, and Owner confirmation.
6. **Production Resource Directory (`/production/directory`)**:
   - Comprehensive directory for Cast, Crew, Locations, Props, Vehicles, and Equipment.
   - Department-based access control with contact masking (`[Restricted — Production Authorized Only]`) for non-Owner/Production roles.
7. **Production Documents Workspace (`/production/documents`)**:
   - Searchable document catalogue organized by Script Preparation, Actors & Rehearsal, Scheduling, On-Set Production, and Management.
   - Formatted document viewer, printable PDF export, and revocable 24-hour sharing link generator.
8. **Production Change Proposals & Approvals (`/production/changes`)**:
   - Consolidated Owner review queue for pending collaborator proposals.
   - Side-by-side value diffs, author attribution, conflict detection, and Accept/Reject workflows with explanatory notes.
9. **Unified History & Version Management (`/production/history`)**:
   - Centralized audit trail stream tracking breakdowns, call sheets, schedule edits, approvals, and documents.
   - Version comparison diff modal and non-destructive restoration to earlier script or production drafts.
10. **Guided Readiness & Validation (`/production/readiness`)**:
    - Pre-flight checklist classifying blockers by Critical, Warning, and Passed.
    - Direct "Fix Issue" routing to offending records before production documents are locked or published.
11. **Storyboard Studio Preview (`/production/storyboard`)**:
    - Concept frame gallery with focal length lenses (24mm, 50mm, 85mm), aspect ratio framing (2.39:1, 16:9), and scene linkage staging.

---

### 🌐 Persistent Global Shell & Navigation
- **Global Application Shell**: Single reusable application shell (`#scriptora-app-shell`) encapsulating `#scriptora-global-header`, dynamic content area `#scriptora-global-content`, and `#scriptora-global-nav`.
- **Persistent Global Header**: Available on every screen (Workspace, Intelligence, AI Chat, Pre-Production, Editor, Notifications, Profile), maintaining consistent branding, section subtitles, notification bell with live unread indicator, and user profile avatar.
- **Refined Floating Center AI Chat Button**:
  - Centered at the exact horizontal midpoint (3rd destination in 5-column grid).
  - Raised visibly above the bottom navigation bar (`-translate-y-3.5`) with a protective cutout halo ring (`ring-4 ring-surface/95`).
  - Formed in SCRIPTORA's signature light-blue, white, and royal blue palette (no dark block).
  - Inactive: Crisp white surface, subtle blue border, soft blue elevation, and primary blue chat icon.
  - Active: Rich royal blue (`bg-blue-600 text-white`) with soft blue ring.
  - Symbol-only presentation with full accessibility (`aria-label="AI Chat"` and tooltip discoverability hint).
- **Persistent 5-Destination Bottom Navigation**:
  1. Workspace
  2. Intelligence
  3. AI Chat *(floating raised center button)*
  4. Production
  5. Profile
- **Smooth Inward Transition**: Reuses SCRIPTORA's inward `.fade-in` animation on screen content only, keeping the global header and bottom navigation stable and flicker-free during transitions.

---

### 🧠 Narrative Intelligence Engine
- **Script Selector & Context Setup**: Canonical multi-step narrative intelligence flow (`/intelligence` → `/intelligence/context` → `/intelligence/dashboard`).
- **Script Analysis Dashboard**: Deep narrative breakdown including Pacing Analysis, Character Arc Trajectories, Dialogue Density, Scene Transitions, Emotional Resonance, and Structure Progression.
- **Individual Deep-Dive Analysis**: Dedicated views for Pacing, Emotion, Character, Structure, and Dialogue with direct links to open corresponding scenes in the editor.

---

### 👥 Collaboration & Account Management
- **Draft & Version Management**: Snapshot screenplay drafts, restore previous iterations, and compare screenplay diffs side-by-side.
- **Collaborator Management**: Invite co-writers and editors via Join Codes with role-based permissions (`Owner`, `Editor`, `Viewer`, `Production`).
- **Profile & Preferences**: Local profile photo upload and preview, global editor typography controls, line spacing (`1.0`, `1.5`, `2.0`), scene number display toggles, and notification feeds.

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
│   │   │   │   ├── scenes.js     # Scene Hub & Scene Detail inspector
│   │   │   │   ├── callSheets.js # Call Sheets creation & publishing
│   │   │   │   ├── dialogueSides.js # Dialogue Sheets & Actor Sides
│   │   │   │   ├── schedule.js   # Shooting Schedule & Stripboard
│   │   │   │   ├── directory.js  # Production Resource Directory
│   │   │   │   ├── documents.js  # Documents catalogue & exports
│   │   │   │   ├── changes.js    # Change Proposals & Owner Approvals
│   │   │   │   ├── history.js    # Version History & Audit Trail
│   │   │   │   ├── readiness.js  # Guided Readiness & Validation
│   │   │   │   └── storyboard.js # Storyboard Studio discovery staging
│   │   │   ├── workspace.js      # Main Scriptora workspace
│   │   │   ├── editor.js         # Continuous A4 Screenplay Editor
│   │   │   ├── aiChat.js         # Universal AI Chat Assistant
│   │   │   ├── intelligence*.js  # Narrative Intelligence suite
│   │   │   ├── notifications.js  # Activity stream
│   │   │   └── profile.js        # User account & local photo upload
│   │   ├── services/             # API client & local offline cache fallback
│   │   ├── state/                # Reactive store & navigation history stack
│   │   ├── utils/                # Brand tokens, character sanitizer, formatting
│   │   ├── router.js             # SPA Router with Persistent Global Shell
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
Publishes the compiled production build directly to the `gh-pages` branch.

### Deploy to Vercel / Cloud Providers
- **Frontend**: Deploy `/frontend` to [Vercel](https://vercel.com/) with build command `npm run build` and output directory `dist`. Set `VITE_API_URL` to your production backend.
- **Backend**: Deploy `/backend` to [Render](https://render.com/), [Railway](https://railway.app/), or [Fly.io](https://fly.io/). Set `PORT=8000` and `FRONTEND_URL` to your frontend production domain.

---

## 📄 License
Private & Proprietary — SCRIPTORA. All rights reserved.

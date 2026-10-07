# SCRIPTORA — Screenplay Studio & Narrative Intelligence Engine

[![Live Demo](https://img.shields.io/badge/Demo-GitHub%20Pages-blue?style=flat-square)](https://aravind-1801.github.io/Scriptora)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=flat-square)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple?style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square)](https://tailwindcss.com/)

**SCRIPTORA** is a cinematic screenplay writing workspace, professional script editor, and narrative intelligence platform built for screenwriters, showrunners, and production teams.

---

## 🌟 Key Features

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
  - Focus Mode for distraction-free writing.
  - Bilingual English / Tamil (`EN / தமிழ்`) language toggle.
- **Authentic PDF 1.4 Vector Export**: Export authentic, industry-standard A4 PDF files (built with pure vector PDF 1.4 syntax, standard Courier/Courier-Bold typography, headers, and margins) that open without error in Adobe Acrobat, Apple Books, and Chrome. Also supports Final Draft (`FDX`), Fountain, and Plain Text (`TXT`) with custom page range options (`All`, `Current`, or custom ranges e.g. `1-3, 5`).
- **Unified Save & Auto-Save**: Single-pill unified save control with real-time auto-save toggle and Draft version history snapshots.

### 🧠 Narrative Intelligence Engine
- **Script Selector & Context Setup**: Canonical multi-step narrative intelligence flow (`/intelligence` → `/intelligence/context` → `/intelligence/dashboard`).
- **Script Analysis Dashboard**: Deep narrative breakdown including Pacing Analysis, Character Arc Trajectories, Dialogue Density, Scene Transitions, Emotional Resonance, and Structure Progression.
- **Individual Deep-Dive Analysis**: Dedicated views for Pacing, Emotion, Character, Structure, and Dialogue with direct links to open corresponding scenes in the editor.
- **Production Breakdown**: Seamless handoff between the screenplay editor and production breakdown reporting.

### 👥 Collaboration & Account Management
- **Draft & Version Management**: Snapshot screenplay drafts, restore previous iterations, and compare screenplay diffs side-by-side.
- **Collaborator Management**: Invite co-writers and editors via Join Codes with role-based permissions (`Owner`, `Editor`, `Viewer`).
- **Profile & Preferences**: Global editor typography controls, line spacing (`1.0`, `1.5`, `2.0`), scene number display toggles, and notification feeds.

---

## 🏗️ Project Architecture

```
SCRIPTORA/
├── frontend/                     # UI Client (Vite, SPA Router, Tailwind Design Tokens)
│   ├── public/assets/            # Canonical SCRIPTORA brand logo & assets
│   ├── src/
│   │   ├── components/           # Universal Header, BottomNav, Toasts
│   │   ├── screens/              # Canonical screens (Workspace, Editor, Intelligence, Profile...)
│   │   ├── services/             # Centralized API service & offline sync
│   │   ├── state/                # Reactive state & navigation history stack
│   │   ├── utils/                # Brand assets, typography, helper functions
│   │   ├── router.js             # SPA Router with canonical intelligence reset flow
│   │   └── main.js               # Application bootstrap
│   ├── index.html
│   ├── package.json
│   ├── vercel.json               # Independent Vercel frontend deployment configuration
│   └── vite.config.js            # Vite bundler & proxy configuration
│
├── backend/                      # API Service (Node.js REST Engine)
│   ├── app/
│   │   ├── auth/                 # Session, password & OTP authentication
│   │   ├── services/             # Screenplay, Collaboration, Intelligence logic
│   │   ├── models/               # Transactional datastore & seed models
│   │   ├── middleware/           # CORS & security headers
│   │   └── server.js             # HTTP REST API server
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
# Vite development server runs on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build & Deployment

### Build Frontend
```bash
npm run build:frontend
```
This compiles Vite assets into `frontend/dist/` and updates root deployment assets (`index.html`, `404.html`, and `assets/`).

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

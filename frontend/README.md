# SCRIPTORA Frontend Client

The official user interface for SCRIPTORA — a modern, mobile-first Screenplay Studio and Narrative Intelligence Engine.

---

## 1. Framework & Tech Stack
* **Build Tool:** Vite 5.4+
* **Core:** Vanilla JavaScript (ES Modules), HTML5 Semantic Architecture
* **Design System & Styling:** Custom extended Tailwind CSS tokens (`surface`, `surface-container-*`, `primary`, `on-surface`)
* **Typography:** Plus Jakarta Sans (Headings), Inter (Body & UI), Courier Prime (Screenplay Editor), Material Symbols Outlined (Icons)
* **Assets:** Canonical SCRIPTORA brand logo in `/public/assets/scriptora-logo.png`
* **Routing:** Client-side SPA Router with protected route enforcement, canonical Intelligence reset flow, and hierarchical back navigation.

```
frontend/
├── public/
│   ├── assets/
│   │   └── scriptora-logo.png     # Canonical SCRIPTORA brand identity
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── header.js              # Universal app header with brand logo & notifications
│   │   ├── bottomNav.js           # 3 primary tabs: Workspace, Intelligence, Profile
│   │   └── toast.js               # Global notification toast system
│   ├── screens/
│   │   ├── auth.js                # Sign In, Create ID, Phone OTP
│   │   ├── welcome.js             # Onboarding hero screen
│   │   ├── workspace.js           # Screenplays library, New Script modal, actions
│   │   ├── editor.js              # Full screenplay editor, scenes, exports, versions
│   │   ├── intelligenceSelector.js# Intelligence Entry: Script Selector
│   │   ├── intelligenceContext.js # Format, industry, runtime calibration
│   │   ├── intelligenceDashboard.js # Narrative scores & overview
│   │   ├── individualAnalysisSelector.js # 11 Narrative vector cards
│   │   ├── individualAnalysis.js  # Dedicated vector breakdown (Pacing, Dialogue, etc.)
│   │   ├── profile.js             # Member Pro, 7 settings sheets, account actions
│   │   ├── collaborators.js       # Teammate management & Join Code generation/entry
│   │   └── notifications.js       # Notification feed & filter states
│   ├── services/
│   │   └── api.js                 # Centralized API service & offline fallback
│   ├── state/
│   │   └── store.js               # Reactive state & history stack
│   ├── router.js                  # Client SPA router
│   ├── main.js                    # Entry bootstrap
│   └── style.css                  # Typography, safe-area & micro-animations
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vercel.json                    # Vercel deployment configuration
├── vite.config.js                 # Vite bundler & backend proxy config
└── README.md
```

---

## 2. Canonical Application Structure

The SCRIPTORA application is organized into exactly three primary navigation sections:
1. **Workspace** (`/workspace`): Library, screenplay cards, draft status, and Screenplay Editor (`/editor/:scriptId`).
2. **Intelligence** (`/intelligence`):
   * **STRICT ENTRY RESET RULE:** Every time the user navigates to Intelligence from primary navigation, it ALWAYS opens `/intelligence` (Script Selector).
   * **Flow:** Script Selector (`/intelligence`) → Context Setup (`/intelligence/context`) → Script Analysis (`/intelligence/dashboard`) → Analyse Individually (`/intelligence/analysis`) → Individual Analysis (`/intelligence/analysis/:type`) → Open in Editor (`/editor/:scriptId?scene=XX`).
3. **Profile** (`/profile`): Member badge, 7 Settings sheets, Collaborator management (`/profile/collaborators`), Join Code generator/validator, and Account actions (Sign Out & Delete).
4. **Notifications** (`/notifications`): Contextual view opened from the header bell icon with reliable back navigation returning to the exact previous screen.

---

## 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base URL of the backend API service | `http://localhost:8000/api` |
| `VITE_APP_NAME` | Application display name | `SCRIPTORA` |
| `VITE_APP_ENV` | Environment identifier | `development` |

---

## 4. Installation & Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local dev server (default port 3000)
npm run dev

# 3. Build production bundle to dist/
npm run build

# 4. Preview compiled production bundle
npm run preview
```

---

## 5. Vercel Deployment

The frontend is completely self-contained and prepared for independent Vercel deployment:
1. In Vercel Project Settings, set **Root Directory** to `frontend`.
2. Configure **Environment Variables**:
   * `VITE_API_URL`: URL of your deployed backend service (e.g. `https://api.scriptora.studio/api`).
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. `vercel.json` provides built-in SPA rewrite rules ensuring all deep routes (`/editor/*`, `/intelligence/*`, etc.) route cleanly to `/index.html`.

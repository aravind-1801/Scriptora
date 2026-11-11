# SCRIPTORA

**Screenplay Writing & Production Management Platform**

SCRIPTORA is an all-in-one cinematic workspace that unifies industry-standard screenplay writing, narrative intelligence, AI creative assistance, pre-production planning, storyboarding, and secure team collaboration into a single web platform.

**Live Application:** [https://aravind-1801.github.io/Scriptora/](https://aravind-1801.github.io/Scriptora/)

---

## Key Features

- **Screenplay Editor**: Continuous A4 multi-page canvas with industry-standard formatting, smart writing shortcuts (parentheticals, character extensions, transitions), draft versioning, autosave, and vector PDF/FDX exports.
- **Narrative Intelligence**: Deep script analysis evaluating narrative pacing, emotional resonance, character arc trajectories, dialogue density, and three-act story structure.
- **Production Management**: Category-aware script breakdown (cast, props, locations, stunts), interactive 7-day shooting schedule stripboard, daily call sheets, and actor sides.
- **Storyboard Studio**: AI-assisted cinematic shot generation via Pollinations FLUX.1 with full camera controls (size, angle, lens, lighting), aspect ratios, visual styles, sequence timeline, approval tracking, and private storage with signed URLs.
- **AI Assistant**: Context-aware production and narrative assistant for scene analysis, logistics planning, and screenplay inquiries with zero-knowledge encryption consent protection.
- **Collaboration & Security**: Real-time project sharing with granular role-based access control (Owner, Editor, Viewer), join-code access request approvals, client-side end-to-end encryption (AES-256-GCM), and audit logging.

---

## Technology Stack

- **Frontend**: Vanilla JavaScript (ES modules), Vite 5.4, Tailwind CSS, PDF-Lib (vector PDF export)
- **Backend**: Node.js (native HTTP REST service), JWT session authentication
- **Database & Auth**: Firebase Authentication, Cloud Firestore & Realtime Database (metadata sync with local cache fallback)
- **Cloud Storage**: Supabase Storage (private object storage with time-limited signed URLs)
- **AI & Image Generation**: Pollinations AI (FLUX.1 model, zero-cost / no API key required), SCRIPTORA Procedural Concept Canvas (offline fallback)
- **Deployment**: GitHub Pages (frontend via GitHub Actions), Render (backend web service via `render.yaml`)

---

## Project Structure

```text
SCRIPTORA/
├── .github/workflows/    # CI/CD deployment workflow for GitHub Pages
├── backend/              # Node.js REST API service
│   ├── app/
│   │   ├── auth/         # Token verification and RBAC authorization
│   │   ├── middleware/   # Production CORS and security headers
│   │   ├── models/       # In-memory data models & disk persistence
│   │   ├── services/     # Screenplay, storyboard, and collaboration logic
│   │   └── server.js     # HTTP server and REST API route handlers
│   ├── tests/            # Backend integration and security test suite
│   └── package.json      # Backend scripts and dependencies
├── frontend/             # Single-Page Application client
│   ├── public/assets/    # Static assets, branding, and icons
│   ├── src/
│   │   ├── components/   # Global shell, navigation, modals, and toasts
│   │   ├── screens/      # Application screens (Editor, Production, Storyboard, AI)
│   │   ├── services/     # API client, Firebase sync, and PDF generators
│   │   ├── state/        # Reactive client store
│   │   ├── utils/        # E2EE crypto, prompt builder, and DOM helpers
│   │   └── main.js       # Frontend entry point
│   ├── index.html        # Main HTML document
│   ├── package.json      # Frontend dependencies and Vite scripts
│   └── vite.config.js    # Vite build and proxy configuration
├── tests/                # Cross-device, RBAC, and storyboard verification suites
├── render.yaml           # Render Web Service deployment specification
├── package.json          # Root workspace orchestration scripts
└── README.md             # Project documentation
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0+ (v20 LTS recommended)
- **npm**: v9.0.0+

### 1. Clone the Repository

```bash
git clone https://github.com/aravind-1801/Scriptora.git
cd Scriptora
```

### 2. Install Dependencies

Install dependencies for both frontend and backend:

```bash
# Frontend dependencies
npm --prefix frontend install

# Backend dependencies
npm --prefix backend install
```

### 3. Environment Configuration

Create local environment files from the provided templates:

```bash
# Frontend environment
cp frontend/.env.example frontend/.env

# Backend environment
cp backend/.env.example backend/.env
```

**Frontend (`frontend/.env`):**
- `VITE_API_URL`: Backend API URL (`http://localhost:8000/api` for local development).
- `VITE_FIREBASE_*`: Firebase public configuration for optional cloud sync (Spark free plan).
- `VITE_SUPABASE_*`: Supabase URL and anon key for cloud image storage (optional).

**Backend (`backend/.env`):**
- `PORT`: Local port (defaults to `8000`).
- `NODE_ENV`: Set to `development`.
- `FRONTEND_URL` / `CORS_ORIGINS`: Allowed client origins (`http://localhost:3000,http://localhost:5173`).
- `JWT_SECRET`: Secret string for signing session tokens (private).
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for generating private signed URLs (private).

*Note: AI image generation via Pollinations FLUX.1 requires no API key or billing configuration.*

---

## Running SCRIPTORA Locally

For full functionality (screenplay storage, AI generation, and collaboration), run both the backend and frontend services:

**Terminal 1 — Backend Service:**
```bash
npm run dev:backend
# Server runs on http://localhost:8000 (binds to 0.0.0.0)
```

**Terminal 2 — Frontend Application:**
```bash
npm run dev:frontend
# Vite development server runs on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

### Frontend (GitHub Pages)

- **Workflow**: Automated deployment via `.github/workflows/deploy.yml` on every push to `main`.
- **API Connection**: Configure the repository variable `VITE_API_URL` under **Settings > Secrets and variables > Actions > Variables** pointing to your live backend (e.g. `https://<service-name>.onrender.com/api`).

### Backend (Render Web Service)

- **Blueprint**: Deployed as a web service via `render.yaml`.
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Port**: Binds to `0.0.0.0` using the platform-assigned `process.env.PORT`.
- **Health Check**: `/api/health` returns HTTP 200.
- **Environment Variables**: Set `NODE_ENV=production`, `FRONTEND_URL=https://aravind-1801.github.io`, `CORS_ORIGINS`, `SUPABASE_*`, and `JWT_SECRET` in the Render dashboard.

---

## License

Private & Proprietary — SCRIPTORA. All rights reserved.

# SCRIPTORA

SCRIPTORA is a browser-based screenwriting, narrative intelligence, pre-production planning, and storyboard studio web application.

By default (`VITE_DATA_MODE=local`), SCRIPTORA runs in **Local-First Workspace Mode**: every browser profile maintains its own completely isolated, persistent workspace stored in IndexedDB (`scriptora_local_v1`) with multi-tab `BroadcastChannel` synchronization and zero cross-device or cross-account cloud data sharing.

## Key Features

- **Screenplay Studio**: A4-paginated screenplay editor with scene headings, action, character, dialogue, parentheticals, transitions, title page editor, undo/redo, version snapshots, and PDF export.
- **Local-First IndexedDB Persistence**: Automatic browser-profile isolation via IndexedDB (`kv`, `scripts`, `screenplays`, `versions`, `storyboards`, `storyboardBlobs`, `storyboardRecycleBin`, `productionData`, `intelligence`) with binary `Blob` storage for storyboard images and JSON backup export/restore.
- **Narrative Intelligence**: Local scene telemetry, character metrics, pacing indicators, and contextual writing assistance.
- **Production Hub**: Scene breakdowns, shooting schedules, call sheets, and production reports.
- **Storyboard Studio**: Multi-workflow storyboard frame creation, AI image generation via Pollinations FLUX.1 (saved directly into IndexedDB binary blobs), uploaded reference/frame images, frame history, and PDF/image export.

## Technology Stack

- **Frontend**: Vanilla ES Modules, Vite, Tailwind CSS, IndexedDB (`scriptora_local_v1`), Web Crypto API, PDF export utilities
- **Storyboard Generation**: Pollinations FLUX.1 image endpoint (`image.pollinations.ai`) persisted locally as binary `Blob` records
- **Optional Cloud Backend** *(inactive by default unless `VITE_DATA_MODE=cloud`)*: Node.js (`backend/`), Firebase Auth / Firestore / Realtime Database, Supabase Storage, PostgreSQL (`pg`)
- **Deployment**: GitHub Pages (`.github/workflows/deploy.yml` builds with `VITE_DATA_MODE=local`), optional Render (`render.yaml`)

## Project Structure

```text
SCRIPTORA/
├── .github/workflows/    # GitHub Pages build & deploy workflow (VITE_DATA_MODE=local)
├── backend/              # Optional Node.js API server for VITE_DATA_MODE=cloud
│   ├── app/              # Server routes, auth, storage, and services
│   └── tests/            # Backend unit and isolation tests
├── frontend/             # Vite + Tailwind CSS frontend application
│   ├── .env.example      # Frontend environment template (defaults VITE_DATA_MODE=local)
│   └── src/
│       ├── assets/       # Static visual assets
│       ├── components/   # Reusable UI header, nav, and toast components
│       ├── screens/      # Editor, workspace, production, storyboard, intelligence, profile
│       ├── services/     # dataMode, localDatabase, localRepository, localBackup, api, pdfExport
│       ├── state/        # Application state store
│       └── utils/        # Prompt/style helpers, popup positioning, brand assets
├── tests/                # Verification scripts for editor, storyboard, and local isolation
├── package.json          # Root scripts (dev:frontend, dev:backend, build, test:backend)
└── render.yaml           # Optional Render Web Service blueprint
```

## Getting Started

### Prerequisites

- Node.js 20+ and npm

### Installation

```bash
npm install
npm --prefix frontend install
npm --prefix backend install
```

### Environment Configuration

Copy the environment template if you want to customize frontend settings:

```bash
cp frontend/.env.example frontend/.env
```

Key frontend environment variable:

- `VITE_DATA_MODE=local` *(default when unset)* — keeps all workspace data strictly in the user's browser profile via IndexedDB, disabling automatic Render/Firebase/Supabase workspace sync.
- `VITE_DATA_MODE=cloud` *(optional)* — re-enables backend API (`VITE_API_URL`) and optional Firebase/Supabase integrations defined in `frontend/.env.example`.

## Running Locally

Start the frontend development server in Local Workspace mode (no backend required):

```bash
npm run dev:frontend
```

Build the production frontend bundle:

```bash
npm run build
```

Run tests:

```bash
npm run test:backend
node tests/test-local-indexeddb-mode.mjs
```

### Optional Cloud Mode

To run the optional backend server alongside a `VITE_DATA_MODE=cloud` frontend:

```bash
cp backend/.env.example backend/.env
npm run dev:backend
```

## Backup & Data Portability

In Local Workspace mode, each browser profile keeps its own private IndexedDB database. From **Profile > Local IndexedDB Storage**, users can:

- **Export Workspace Backup** (`scriptora-local-workspace-backup` JSON including embedded storyboard images)
- **Import / Restore JSON Backup** with schema validation
- **Reset Local Workspace** to clear all locally stored projects on that browser profile

## License

ISC

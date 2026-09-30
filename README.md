# SCRIPTORA — Screenplay Studio & Narrative Intelligence Engine

SCRIPTORA is a cinematic screenplay writing workspace and narrative intelligence platform. The repository is organized into a clean, decoupled **Frontend + Backend** architecture.

---

## 1. Project Organization

```
SCRIPTORA/
│
├── frontend/                     # UI Client (Vite, SPA Router, Tailwind Design Tokens)
│   ├── public/assets/            # Canonical SCRIPTORA brand logo
│   ├── src/
│   │   ├── components/           # Universal Header, BottomNav, Toasts
│   │   ├── screens/              # Canonical screens (Workspace, Editor, Intelligence, Profile...)
│   │   ├── services/             # Centralized API service & offline sync
│   │   ├── state/                # Reactive state & navigation history stack
│   │   ├── router.js             # SPA Router with canonical intelligence reset flow
│   │   └── main.js               # Application bootstrap
│   ├── index.html
│   ├── package.json
│   ├── vercel.json               # Independent Vercel frontend deployment
│   ├── vite.config.js            # Vite bundler & proxy configuration
│   └── README.md
│
├── backend/                      # API Service (Node.js REST Engine)
│   ├── app/
│   │   ├── auth/                 # Session, password & OTP authentication
│   │   ├── services/             # Screenplay, Collaboration, Intelligence logic
│   │   ├── models/               # Transactional datastore & seed models
│   │   ├── middleware/           # CORS & security headers
│   │   └── server.js             # HTTP REST API server
│   ├── tests/                    # Integration test suite
│   ├── package.json
│   └── README.md
│
├── .env.example                  # Root environment reference
├── .gitignore                    # Workspace gitignore
├── package.json                  # Root workspace runner scripts
└── README.md
```

### Separation of Concerns
* **Frontend (`/frontend`):** Handles all user interface interactions, screenplay formatting, live typography, autosave events, vector analysis visualizations, and canonical navigation flow.
* **Backend (`/backend`):** Handles API endpoints, authentication, user profiles, screenplay persistence, version snapshots, collaborator permissions, join code generation/validation, and narrative intelligence metrics.

---

## 2. Quick Setup & Local Run

### Step 1: Install Dependencies
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

### Step 2: Configure Environment Files
```bash
# Frontend configuration
cp frontend/.env.example frontend/.env

# Backend configuration
cp backend/.env.example backend/.env
```

### Step 3: Start the Backend Service
In a terminal:
```bash
cd backend
npm run dev
# Backend starts at http://localhost:8000
```

### Step 4: Start the Frontend Application
In a separate terminal:
```bash
cd frontend
npm run dev
# Frontend starts at http://localhost:3000
```

### Step 5: Open Application
Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 3. Canonical Architecture & Flows

### Three Primary Sections
1. **Workspace (`/workspace`):** Screenplay library, draft status, and Screenplay Editor (`/editor/:scriptId`).
2. **Intelligence (`/intelligence`):**
   * **Mandatory Entry Flow:** Clicking Intelligence from primary navigation ALWAYS resets and enters at **Script Selector** (`/intelligence`).
   * **Flow:** Script Selector (`/intelligence`) → Context Setup (`/intelligence/context`) → Script Analysis (`/intelligence/dashboard`) → Analyse Individually (`/intelligence/analysis`) → Individual Analysis (`/intelligence/analysis/:type`) → Open in Editor (`/editor/:scriptId?scene=XX`).
3. **Profile (`/profile`):** Settings sheets, Collaborators (`/profile/collaborators`), Join Code generator & validator, Sign Out, and Delete Account.

### Contextual Features
* **Notifications (`/notifications`):** Opened from the top header bell icon with reliable back navigation returning to the exact previous screen.
* **Brand Identity:** Integrated canonical SCRIPTORA logo asset across Header, Editor, Welcome, Auth, and Notifications.

---

## 4. Deployment

* **Frontend:** Deploy the `frontend/` directory to **Vercel** with build command `npm run build` and output directory `dist`. Configure `VITE_API_URL` to point to your live backend.
* **Backend:** Deploy the `backend/` directory to **Render**, **Railway**, **Fly.io**, or any standard Node.js serverless/container provider. Set `PORT=8000` and `FRONTEND_URL` to your production frontend domain.

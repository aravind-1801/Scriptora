# SCRIPTORA Backend Service

The SCRIPTORA backend is a decoupled, high-performance Node.js REST API service managing screenplay storage, narrative telemetry, version snapshots, collaboration access, join-code validation, and user profile state.

---

## 1. Architecture & Framework
* **Runtime:** Node.js (ES Modules)
* **Architecture:** Modular Services & Transactional Datastore
* **Protocol:** HTTP / JSON REST
* **Port:** `8000` (Default, configurable via `PORT`)

```
backend/
├── app/
│   ├── auth/
│   │   └── authService.js         # Authentication, OTP, session logic
│   ├── services/
│   │   ├── scriptService.js       # Scripts CRUD, duplicate, archive, restore
│   │   ├── screenplayService.js   # Screenplay scenes & blocks persistence
│   │   ├── collaborationService.js# Team members, roles & Join Code validation
│   │   └── intelligenceService.js # Narrative metrics & AI query engine
│   ├── models/
│   │   └── db.js                  # Canonical data model & state store
│   ├── middleware/
│   │   ├── cors.js                # CORS policy handler
│   │   └── errorHandler.js        # Global error responses
│   └── server.js                  # Primary HTTP server entry point
├── tests/
│   └── test.js                    # Comprehensive integration test suite
├── .env.example                   # Environment configuration template
├── package.json                   # Backend scripts & manifest
└── README.md
```

---

## 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | HTTP port for backend server | `8000` |
| `NODE_ENV` | Runtime environment | `development` |
| `FRONTEND_URL` | Trusted frontend origin for CORS | `http://localhost:3000` |
| `CORS_ORIGINS` | Comma-separated list of allowed CORS origins | `http://localhost:3000,http://localhost:5173` |
| `DATABASE_URL` | Optional external DB connection (e.g., PostgreSQL/Supabase) | *(Optional)* |
| `JWT_SECRET` | Secret key for production token signing | *(Optional)* |

---

## 3. Installation & Running

### Install Dependencies
The backend uses native Node.js ES modules and requires zero external binary dependencies.
```bash
npm install
```

### Start Development Server
```bash
npm run dev
# Starts server at http://localhost:8000 with auto-restart
```

### Start Production Server
```bash
npm start
```

### Run Test Suite
```bash
npm test
```

---

## 4. Major API Endpoints

### Health Check
* `GET /api/health` — Verifies service status, version, and uptime.

### Authentication (`/api/auth`)
* `GET /api/auth/me` — Returns active session user profile.
* `POST /api/auth/login` — Authenticates user via email/password or Google SSO.
* `POST /api/auth/register` — Registers a new screenwriter account.
* `POST /api/auth/otp` — Verifies 6-digit phone authorization.
* `POST /api/auth/logout` — Destroys active session.

### Screenplays & Scripts (`/api/scripts`, `/api/screenplay`)
* `GET /api/scripts` — Lists portfolio screenplays.
* `POST /api/scripts` — Creates a new screenplay with initialized scenes.
* `GET /api/scripts/:id` — Retrieves script metadata.
* `PUT /api/scripts/:id` — Updates title, genre, logline, or tags.
* `DELETE /api/scripts/:id` — Deletes screenplay and associated history.
* `POST /api/scripts/:id/duplicate` — Duplicates screenplay and content.
* `PUT /api/scripts/:id/archive` — Archives screenplay from active view.
* `PUT /api/scripts/:id/restore` — Restores archived screenplay.
* `GET /api/screenplay/:id` — Fetches screenplay scenes and block hierarchy.
* `PUT /api/screenplay/:id` — Saves screenplay edits (autosave engine).

### Versions (`/api/versions`)
* `GET /api/versions/:id` — Lists historical draft snapshots.
* `POST /api/versions/:id` — Creates an immutable point-in-time snapshot.

### Collaboration & Join Codes (`/api/collaborators`, `/api/join-code`)
* `GET /api/collaborators/:id` — Retrieves project teammates and roles.
* `POST /api/collaborators/:id/invite` — Sends collaborator invitation.
* `DELETE /api/collaborators/:id/:memberId` — Revokes collaborator access.
* `POST /api/join-code/generate/:id` — Generates a unique 8-character join code.
* `POST /api/join-code/validate` — Validates code without exposing full script content.
* `POST /api/join-code/redeem` — Grants access and joins team workspace.

### Narrative Intelligence (`/api/intelligence`)
* `GET /api/intelligence/:id` — Computes 10 category vector scores and loglines.
* `PUT /api/intelligence/:id/context` — Calibrates format, industry, and duration targets.
* `POST /api/intelligence/query` — Generates narrative telemetry and beat analysis.

### Notifications (`/api/notifications`)
* `GET /api/notifications` — Fetches notifications list and unread count.
* `PUT /api/notifications/:id/read` — Marks single notification as read.
* `PUT /api/notifications/read-all` — Marks all notifications as read.

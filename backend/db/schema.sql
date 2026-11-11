-- SCRIPTORA Multi-User PostgreSQL Schema & Row-Level Security Policies
-- Supports full cross-device persistence and strict tenant/account isolation.

CREATE TABLE IF NOT EXISTS app_shards (
  shard_key TEXT PRIMARY KEY,
  kind TEXT NOT NULL,
  owner_id TEXT,
  payload JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app_users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  display_name TEXT,
  initials TEXT,
  role TEXT DEFAULT 'Writer',
  phone TEXT,
  bio TEXT DEFAULT '',
  location TEXT DEFAULT '',
  avatar_bg TEXT,
  password_hash TEXT,
  settings JSONB DEFAULT '{}'::jsonb,
  auth_providers JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app_scripts (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
  owner_email TEXT NOT NULL,
  title TEXT NOT NULL,
  draft TEXT DEFAULT 'Draft 1.0',
  format TEXT DEFAULT 'Feature',
  archived BOOLEAN DEFAULT FALSE,
  pinned BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}'::jsonb,
  screenplay JSONB DEFAULT '{}'::jsonb,
  versions JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app_collaborators (
  id TEXT PRIMARY KEY,
  script_id TEXT NOT NULL REFERENCES app_scripts(id) ON DELETE CASCADE,
  user_id TEXT,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT NOT NULL,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(script_id, email)
);

CREATE TABLE IF NOT EXISTS app_invitations (
  id TEXT PRIMARY KEY,
  script_id TEXT NOT NULL REFERENCES app_scripts(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  token TEXT,
  invited_by TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app_access_requests (
  id TEXT PRIMARY KEY,
  script_id TEXT NOT NULL REFERENCES app_scripts(id) ON DELETE CASCADE,
  user_id TEXT,
  user_email TEXT NOT NULL,
  requested_role TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  payload JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app_storyboards (
  id TEXT PRIMARY KEY,
  script_id TEXT NOT NULL REFERENCES app_scripts(id) ON DELETE CASCADE,
  scene_id TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(script_id, scene_id)
);

CREATE TABLE IF NOT EXISTS app_production_records (
  script_id TEXT PRIMARY KEY REFERENCES app_scripts(id) ON DELETE CASCADE,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app_notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security on all application tables
ALTER TABLE app_shards ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_access_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_storyboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_production_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_notifications ENABLE ROW LEVEL SECURITY;

-- Strict Row Level Security policies (using current_setting('app.current_user_id', true))
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'users_self_access') THEN
    CREATE POLICY users_self_access ON app_users
      USING (id = current_setting('app.current_user_id', true));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'scripts_owner_or_collab') THEN
    CREATE POLICY scripts_owner_or_collab ON app_scripts
      USING (
        owner_id = current_setting('app.current_user_id', true)
        OR EXISTS (
          SELECT 1 FROM app_collaborators c
          WHERE c.script_id = app_scripts.id
            AND (c.user_id = current_setting('app.current_user_id', true)
                 OR LOWER(c.email) = LOWER(current_setting('app.current_user_email', true)))
        )
      );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'notifications_self_only') THEN
    CREATE POLICY notifications_self_only ON app_notifications
      USING (user_id = current_setting('app.current_user_id', true));
  END IF;
END $$;


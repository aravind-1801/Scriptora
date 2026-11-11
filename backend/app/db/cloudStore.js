/**
 * Durable Multi-User Cloud Persistence Adapter
 *
 * Automatically selects the best configured durable backend:
 * 1. PostgreSQL via `pg` when `DATABASE_URL` is a `postgres://` or `postgresql://` URI.
 * 2. Supabase Private Storage Shards (`storyboards/_db/...`) via `SUPABASE_URL` +
 *    `SUPABASE_SERVICE_ROLE_KEY` when `DATABASE_URL` is not a Postgres URI.
 * 3. Fast in-memory isolation in `NODE_ENV=test` (unless `ENABLE_CLOUD_DB=true`).
 */

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

function getDbPrefix() {
  const custom = (process.env.CLOUD_DB_PREFIX || '').trim().replace(/^\/+|\/+$/g, '');
  return custom || '_db';
}

function isPostgresUrl(val) {
  return typeof val === 'string' && /^postgres(?:ql)?:\/\//i.test(val.trim());
}

export function getPersistenceMode() {
  if (process.env.NODE_ENV === 'test' && process.env.ENABLE_CLOUD_DB !== 'true') {
    return 'memory';
  }
  if (isPostgresUrl(process.env.DATABASE_URL)) {
    return 'postgres';
  }
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return 'supabase-storage';
  }
  return 'memory';
}

let pgPool = null;
const writeQueue = new Map();
const pendingPromises = new Set();

function enqueueShardOp(key, fn) {
  const prev = writeQueue.get(key) || Promise.resolve();
  const next = prev
    .catch(() => {})
    .then(fn)
    .finally(() => {
      if (writeQueue.get(key) === next) {
        writeQueue.delete(key);
      }
      pendingPromises.delete(next);
    });
  writeQueue.set(key, next);
  pendingPromises.add(next);
  return next;
}

export async function flushCloudWrites() {
  while (pendingPromises.size > 0) {
    await Promise.allSettled([...pendingPromises]);
  }
}

async function initPostgresSchema(pool) {
  const schemaPath = path.resolve(process.cwd(), 'db', 'schema.sql');
  const altSchemaPath = path.resolve(process.cwd(), 'backend', 'db', 'schema.sql');
  const sqlFile = fs.existsSync(schemaPath) ? schemaPath : (fs.existsSync(altSchemaPath) ? altSchemaPath : null);
  if (sqlFile) {
    const sql = fs.readFileSync(sqlFile, 'utf8');
    await pool.query(sql);
  } else {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS app_shards (
        shard_key TEXT PRIMARY KEY,
        kind TEXT NOT NULL,
        owner_id TEXT,
        payload JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      ALTER TABLE app_shards ENABLE ROW LEVEL SECURITY;
    `);
  }
}

const STATE_BUCKET = 'scriptora-state';
let stateBucketEnsured = false;

function getSupabaseHeaders(extra = {}) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    ...extra
  };
}

async function ensureStateBucket() {
  if (stateBucketEnsured) return true;
  const baseUrl = (process.env.SUPABASE_URL || '').replace(/\/+$/, '');
  if (!baseUrl || !process.env.SUPABASE_SERVICE_ROLE_KEY) return false;

  try {
    const checkRes = await fetch(`${baseUrl}/storage/v1/bucket/${STATE_BUCKET}`, {
      headers: getSupabaseHeaders()
    });
    if (checkRes.ok) {
      stateBucketEnsured = true;
      return true;
    }
    const createRes = await fetch(`${baseUrl}/storage/v1/bucket`, {
      method: 'POST',
      headers: getSupabaseHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        id: STATE_BUCKET,
        name: STATE_BUCKET,
        public: false,
        allowed_mime_types: ['application/json']
      })
    });
    if (createRes.ok || createRes.status === 409) {
      stateBucketEnsured = true;
      return true;
    }
  } catch (err) {
    console.warn('[CloudStore] Failed ensuring state bucket:', err.message);
  }
  return false;
}

async function listSupabaseFolder(folderPath) {
  const baseUrl = (process.env.SUPABASE_URL || '').replace(/\/+$/, '');
  if (!baseUrl || !process.env.SUPABASE_SERVICE_ROLE_KEY) return [];
  await ensureStateBucket();

  const allItems = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const res = await fetch(`${baseUrl}/storage/v1/object/list/${STATE_BUCKET}`, {
      method: 'POST',
      headers: getSupabaseHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ prefix: folderPath, limit, offset })
    });
    if (!res.ok) break;
    const rows = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) break;
    for (const row of rows) {
      if (row && row.name && row.id !== null) {
        allItems.push(`${folderPath}/${row.name}`);
      }
    }
    if (rows.length < limit) break;
    offset += limit;
  }
  return allItems;
}

async function readSupabaseJson(objectPath) {
  const baseUrl = (process.env.SUPABASE_URL || '').replace(/\/+$/, '');
  if (!baseUrl || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  await ensureStateBucket();

  const res = await fetch(`${baseUrl}/storage/v1/object/authenticated/${STATE_BUCKET}/${objectPath}`, {
    method: 'GET',
    headers: getSupabaseHeaders()
  });
  if (res.status === 404 || res.status === 400) return null;
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Supabase shard read failed (${res.status}): ${errText}`);
  }
  return await res.json();
}

async function writeSupabaseJson(objectPath, data) {
  const baseUrl = (process.env.SUPABASE_URL || '').replace(/\/+$/, '');
  if (!baseUrl || !process.env.SUPABASE_SERVICE_ROLE_KEY) return false;
  await ensureStateBucket();

  const body = JSON.stringify(data);
  const res = await fetch(`${baseUrl}/storage/v1/object/${STATE_BUCKET}/${objectPath}`, {
    method: 'POST',
    headers: getSupabaseHeaders({
      'Content-Type': 'application/json',
      'x-upsert': 'true'
    }),
    body
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Supabase shard write failed (${res.status}): ${errText}`);
  }
  return true;
}

async function deleteSupabaseObjects(paths) {
  const baseUrl = (process.env.SUPABASE_URL || '').replace(/\/+$/, '');
  if (!baseUrl || !process.env.SUPABASE_SERVICE_ROLE_KEY || !paths.length) return;
  await ensureStateBucket();

  await fetch(`${baseUrl}/storage/v1/object/${STATE_BUCKET}`, {
    method: 'DELETE',
    headers: getSupabaseHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ prefixes: paths })
  }).catch(() => {});
}

export async function saveShard(kind, id, payload, ownerId = null) {
  const mode = getPersistenceMode();
  if (mode === 'memory') return false;

  const safeId = encodeURIComponent(String(id));
  const shardKey = `${getDbPrefix()}/${kind}/${safeId}.json`;

  return enqueueShardOp(shardKey, async () => {
    if (mode === 'postgres' && pgPool) {
      await pgPool.query(
        `INSERT INTO app_shards (shard_key, kind, owner_id, payload, updated_at)
         VALUES ($1, $2, $3, $4::jsonb, NOW())
         ON CONFLICT (shard_key)
         DO UPDATE SET payload = EXCLUDED.payload, owner_id = EXCLUDED.owner_id, updated_at = NOW()`,
        [shardKey, kind, ownerId, JSON.stringify(payload)]
      );
      return true;
    }

    if (mode === 'supabase-storage') {
      return await writeSupabaseJson(shardKey, payload);
    }
    return false;
  });
}

export async function loadShard(kind, id) {
  const mode = getPersistenceMode();
  if (mode === 'memory') return null;

  const safeId = encodeURIComponent(String(id));
  const shardKey = `${getDbPrefix()}/${kind}/${safeId}.json`;

  if (mode === 'postgres' && pgPool) {
    const res = await pgPool.query('SELECT payload FROM app_shards WHERE shard_key = $1', [shardKey]);
    return res.rows[0]?.payload || null;
  }
  if (mode === 'supabase-storage') {
    return await readSupabaseJson(shardKey);
  }
  return null;
}

export async function deleteShard(kind, id) {
  const mode = getPersistenceMode();
  if (mode === 'memory') return false;

  const safeId = encodeURIComponent(String(id));
  const shardKey = `${getDbPrefix()}/${kind}/${safeId}.json`;

  return enqueueShardOp(shardKey, async () => {
    if (mode === 'postgres' && pgPool) {
      await pgPool.query('DELETE FROM app_shards WHERE shard_key = $1', [shardKey]);
      return true;
    }
    if (mode === 'supabase-storage') {
      await deleteSupabaseObjects([shardKey]);
      return true;
    }
    return false;
  });
}

export async function loadAllShards() {
  const mode = getPersistenceMode();
  const result = {
    users: [],
    scripts: [],
    storyboards: [],
    notifications: [],
    userkeys: []
  };

  if (mode === 'memory') return result;

  if (mode === 'postgres') {
    if (!pgPool) {
      const pgMod = await import('pg');
      const Pool = pgMod.default?.Pool || pgMod.Pool;
      pgPool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 10000
      });
      await initPostgresSchema(pgPool);
    }
    const prefix = `${getDbPrefix()}/`;
    const rows = (await pgPool.query(
      'SELECT kind, shard_key, payload FROM app_shards WHERE shard_key LIKE $1',
      [`${prefix}%`]
    )).rows;
    for (const row of rows) {
      if (result[row.kind]) {
        result[row.kind].push({ key: row.shard_key, data: row.payload });
      }
    }
    return result;
  }

  if (mode === 'supabase-storage') {
    const prefix = getDbPrefix();
    const kinds = ['users', 'scripts', 'storyboards', 'notifications', 'userkeys'];
    const listings = await Promise.all(kinds.map(k => listSupabaseFolder(`${prefix}/${k}`)));

    const fetchPromises = [];
    kinds.forEach((kind, idx) => {
      for (const fullPath of listings[idx]) {
        fetchPromises.push(
          readSupabaseJson(fullPath)
            .then(data => {
              if (data) result[kind].push({ key: fullPath, data });
            })
            .catch(err => console.warn(`[CloudStore] Failed loading ${fullPath}:`, err.message))
        );
      }
    });
    await Promise.all(fetchPromises);
  }

  return result;
}

export async function cleanupPrefixForTests(prefix) {
  if (!prefix || prefix === '_db') {
    throw new Error('Refusing to wipe default _db namespace');
  }
  const mode = getPersistenceMode();
  if (mode === 'postgres' && pgPool) {
    await pgPool.query('DELETE FROM app_shards WHERE shard_key LIKE $1', [`${prefix}/%`]);
    return;
  }
  if (mode === 'supabase-storage') {
    const kinds = ['users', 'scripts', 'storyboards', 'notifications', 'userkeys'];
    const listings = await Promise.all(kinds.map(k => listSupabaseFolder(`${prefix}/${k}`)));
    const allPaths = listings.flat();
    if (allPaths.length > 0) {
      await deleteSupabaseObjects(allPaths);
    }
  }
}

export function hashIdentifier(value) {
  return crypto.createHash('sha256').update(String(value || '').trim().toLowerCase()).digest('hex');
}

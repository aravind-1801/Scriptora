const DEFAULT_ALLOWED_ORIGINS = [
  'https://aravind-1801.github.io',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:8000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173'
];

export function handleCors(req, res) {
  const reqOrigin = req.headers.origin;
  const envOrigins = (process.env.CORS_ORIGINS || process.env.FRONTEND_URL || '')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean);

  const allowedOrigins = [...DEFAULT_ALLOWED_ORIGINS, ...envOrigins];

  let matchedOrigin = 'https://aravind-1801.github.io';
  if (reqOrigin) {
    if (
      allowedOrigins.includes(reqOrigin) ||
      reqOrigin.endsWith('.github.io') ||
      reqOrigin.includes('localhost') ||
      reqOrigin.includes('127.0.0.1')
    ) {
      matchedOrigin = reqOrigin;
    }
  }

  res.setHeader('Access-Control-Allow-Origin', matchedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Cache-Control, X-Auth-Token');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return true;
  }
  return false;
}

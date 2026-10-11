// Utility for sanitizing and managing character names across Scriptora
// Filters typing prefixes, incomplete keystrokes, pronouns, and noise tokens.

export const PRONOUNS_AND_NOISE = new Set([
  'HE', 'SHE', 'IT', 'ITS', 'HIM', 'HER', 'HERS', 'HIS', 'THEY', 'THEM', 'THEIR', 'THEIRS',
  'WE', 'US', 'OUR', 'OURS', 'YOU', 'YOUR', 'YOURS', 'ME', 'MY', 'MINE', 'I',
  'WHO', 'WHOM', 'WHOSE', 'WHAT', 'WHICH', 'WHEN', 'WHERE', 'WHY', 'HOW',
  'AND', 'OR', 'BUT', 'IF', 'SO', 'FOR', 'NOR', 'YET', 'BECAUSE', 'AS', 'AT', 'BY',
  'FROM', 'IN', 'INTO', 'OF', 'OFF', 'ON', 'ONTO', 'OUT', 'OVER', 'TO', 'UP', 'WITH',
  'THE', 'A', 'AN', 'THIS', 'THAT', 'THESE', 'THOSE',
  'YES', 'NO', 'NOT', 'OK', 'NOW', 'THEN', 'HERE', 'THERE',
  'SH', 'SA', 'AR', 'ARA', 'SAN', 'SANT', 'SANTH', 'SANTHO', 'SO'
]);

export function cleanCharacterName(raw) {
  if (!raw || typeof raw !== 'string') return '';
  // Remove parentheticals (V.O.), (O.S.), (CONT'D), etc.
  let clean = raw.replace(/\([^)]*\)/g, '').replace(/[^a-zA-Z0-9\s'-]/g, '').trim().toUpperCase();

  // Normalize common typing mistakes / variations
  if (clean === 'ARAF') clean = 'ARAVIND';

  return clean;
}

export function isValidCharacterName(name) {
  if (!name || typeof name !== 'string') return false;
  const clean = cleanCharacterName(name);
  if (!clean || clean.length < 3) return false;
  if (PRONOUNS_AND_NOISE.has(clean)) return false;
  // Exclude scene direction / transitions / slugline tokens
  if (/\b(INT|EXT|SCENE|DAY|NIGHT|MORNING|EVENING|DUSK|DAWN|CUT TO|FADE|TRANSITION)\b/i.test(clean)) return false;
  // Maximum 3 words and 30 characters
  if (clean.split(/\s+/).length > 3 || clean.length > 30) return false;
  return true;
}

export function sanitizeCharacterList(rawList) {
  if (!Array.isArray(rawList)) return [];

  const candidates = [];
  const seen = new Set();

  rawList.forEach(item => {
    const raw = typeof item === 'string' ? item : (item?.name || item?.content || '');
    const clean = cleanCharacterName(raw);
    if (isValidCharacterName(clean)) {
      if (!seen.has(clean)) {
        seen.add(clean);
        candidates.push(clean);
      }
    }
  });

  // Prune any candidate that is a prefix or partial typing fragment of another candidate
  const pruned = candidates.filter(name => {
    // 1. Strict prefix of a longer name (e.g. 'SAN' of 'SANTHOSH', 'ARA' of 'ARAVIND')
    const isPrefix = candidates.some(other => other !== name && other.startsWith(name) && other.length > name.length);
    if (isPrefix) return false;

    // 2. Fragment sharing first 3 letters with a longer name (e.g. 'ARAF' vs 'ARAVIND')
    const isFragment = candidates.some(other => other !== name && other.length >= 5 && name.length <= 4 && other.startsWith(name.slice(0, 3)));
    if (isFragment) return false;

    return true;
  });

  return pruned;
}

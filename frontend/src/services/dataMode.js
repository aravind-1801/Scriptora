/**
 * SCRIPTORA Data Mode Resolver
 * Local-first workspace mode is the primary, default operating mode.
 * Cloud mode is inactive unless VITE_DATA_MODE is explicitly set to 'cloud'.
 */

function readViteDataMode() {
  try {
    if (typeof globalThis !== 'undefined' && globalThis.__SCRIPTORA_DATA_MODE__) {
      return String(globalThis.__SCRIPTORA_DATA_MODE__).trim().toLowerCase();
    }
  } catch (_) {}

  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_DATA_MODE) {
      return String(import.meta.env.VITE_DATA_MODE).trim().toLowerCase();
    }
  } catch (_) {}

  try {
    if (typeof process !== 'undefined' && process.env && process.env.VITE_DATA_MODE) {
      return String(process.env.VITE_DATA_MODE).trim().toLowerCase();
    }
  } catch (_) {}

  return '';
}

export function getDataMode() {
  const configured = readViteDataMode();
  return configured === 'cloud' ? 'cloud' : 'local';
}

export function isLocalMode() {
  return getDataMode() === 'local';
}

export function isCloudMode() {
  return getDataMode() === 'cloud';
}

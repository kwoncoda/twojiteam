const prefix = 'travel-pick:';
export function readLocal<T>(key: string, fallback: T): T { try { const value = localStorage.getItem(prefix + key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; } }
export function writeLocal<T>(key: string, value: T): void { localStorage.setItem(prefix + key, JSON.stringify(value)); }
export function removeLocal(key: string): void { localStorage.removeItem(prefix + key); }

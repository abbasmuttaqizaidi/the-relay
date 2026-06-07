type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

class ServerCache {
  private cache = new Map<string, CacheEntry<any>>();

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.value as T;
  }

  set<T>(key: string, value: T, ttlSeconds: number): void {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.cache.set(key, { value, expiresAt });
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

// Persist the cache store across hot reloads in development and warm serverless environments
const globalRef = global as any;
if (!globalRef.serverCache) {
  globalRef.serverCache = new ServerCache();
}

export const serverCache = globalRef.serverCache as ServerCache;

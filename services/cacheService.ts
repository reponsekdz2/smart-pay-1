/**
 * @class CacheService
 * Simulates a simple in-memory cache.
 * A real implementation would use localStorage, sessionStorage, or IndexedDB
 * for more persistent and robust client-side caching.
 */
export class CacheService {
    private cache: Map<string, { data: any; expiry: number }> = new Map();

    set(key: string, value: any, ttl: number = 300000) { // 5 minutes default TTL
        const expiry = Date.now() + ttl;
        this.cache.set(key, { data: value, expiry });
        console.log(`CACHE_SERVICE: Set key "${key}"`);
    }

    get<T>(key: string): T | null {
        const item = this.cache.get(key);
        if (!item) {
            console.log(`CACHE_SERVICE: Miss for key "${key}"`);
            return null;
        }
        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            console.log(`CACHE_SERVICE: Expired key "${key}"`);
            return null;
        }
        console.log(`CACHE_SERVICE: Hit for key "${key}"`);
        return item.data as T;
    }

    delete(key: string) {
        this.cache.delete(key);
        console.log(`CACHE_SERVICE: Deleted key "${key}"`);
    }

    clear() {
        this.cache.clear();
        console.log('CACHE_SERVICE: Cache cleared');
    }
}

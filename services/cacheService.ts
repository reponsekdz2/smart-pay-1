/**
 * @class CacheService
 * Simulates an advanced multi-layer caching system (L1, L2, L3)
 * to improve data retrieval performance.
 */
export class CacheService {
    // L1 Cache: In-memory Map for fastest access (cleared on page reload)
    private l1Cache = new Map<string, { value: any; expiry: number }>();
    
    // L2 Cache: SessionStorage (persists for the session)
    private l2Cache = sessionStorage;
    
    // L3 Cache: LocalStorage (persists across sessions)
    private l3Cache = localStorage;

    private get(storage: Storage | Map<string, any>, key: string): any | null {
        try {
            if (storage instanceof Map) {
                const item = storage.get(key);
                if (item && item.expiry > Date.now()) {
                    console.log(`CACHE_SERVICE: L1 hit for key: ${key}`);
                    return item.value;
                }
                if (item) storage.delete(key); // Expired
                return null;
            }
            const itemStr = storage.getItem(key);
            if (!itemStr) return null;
            
            const item = JSON.parse(itemStr);
            if (item.expiry > Date.now()) {
                console.log(`CACHE_SERVICE: ${storage === this.l2Cache ? 'L2' : 'L3'} hit for key: ${key}`);
                return item.value;
            }
            storage.removeItem(key); // Expired
            return null;

        } catch (error) {
            console.error("Cache get error:", error);
            return null;
        }
    }

    // FIX: Renamed private set to _set to avoid conflict with public async set.
    private _set(storage: Storage | Map<string, any>, key: string, value: any, ttlSeconds: number) {
        try {
            const expiry = Date.now() + ttlSeconds * 1000;
            const item = { value, expiry };

            if (storage instanceof Map) {
                storage.set(key, item);
            } else {
                storage.setItem(key, JSON.stringify(item));
            }
        } catch (error) {
            console.error("Cache set error:", error);
        }
    }

    async getOrSet<T>(key: string, fetcher: () => Promise<T | undefined>, ttlSeconds: number): Promise<T | undefined> {
        // Try L1, L2, L3 in order
        let data = this.get(this.l1Cache, key);
        if (data) return data;
        
        data = this.get(this.l2Cache, key);
        if (data) {
            // FIX: Use renamed private _set method.
            this._set(this.l1Cache, key, data, Math.min(60, ttlSeconds)); // Promote to L1
            return data;
        }
        
        data = this.get(this.l3Cache, key);
        if (data) {
            // FIX: Use renamed private _set method.
            this._set(this.l1Cache, key, data, Math.min(60, ttlSeconds)); // Promote to L1
            this._set(this.l2Cache, key, data, Math.min(300, ttlSeconds)); // Promote to L2
            return data;
        }

        // Fetch from source if not in any cache
        console.log(`CACHE_SERVICE: Cache miss for key: ${key}. Fetching from source.`);
        const freshData = await fetcher();
        if (freshData !== undefined) {
            // FIX: Use renamed private _set method.
            this._set(this.l3Cache, key, freshData, ttlSeconds);
            this._set(this.l2Cache, key, freshData, Math.min(300, ttlSeconds));
            this._set(this.l1Cache, key, freshData, Math.min(60, ttlSeconds));
        }
        return freshData;
    }

    async set(key: string, value: any, ttlSeconds: number) {
         // FIX: Use renamed private _set method.
         this._set(this.l3Cache, key, value, ttlSeconds);
         this._set(this.l2Cache, key, value, Math.min(300, ttlSeconds));
         this._set(this.l1Cache, key, value, Math.min(60, ttlSeconds));
    }

    async del(key: string) {
        this.l1Cache.delete(key);
        this.l2Cache.removeItem(key);
        this.l3Cache.removeItem(key);
    }
}
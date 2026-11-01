export interface RedisAdapterOptions extends Record<string, unknown> {
    /** Env var holding the Redis URL. @default "REDIS_URL" */
    readonly urlEnv?: string;
    readonly appPrefix?: string;
    /** Default key TTL in seconds. @default 2592000 (30 days) */
    readonly ttlSeconds?: number;
    readonly tagCacheTtlMs?: number;
}
declare const createRedisDataCacheAdapter: ({ env, options, }: {
    env?: Record<string, unknown>;
    options?: RedisAdapterOptions;
}) => {
    get(key: string, ctx?: Record<string, unknown>): Promise<{
        lastModified: number;
        value: Record<string, unknown> | null;
        cacheState: string;
        cacheControl: import("./shared.js").StoredCacheControl | undefined;
    } | {
        cacheState?: undefined;
        lastModified: number;
        value: Record<string, unknown> | null;
        cacheControl: import("./shared.js").StoredCacheControl | undefined;
    } | null>;
    set(key: string, data: Record<string, unknown> | null, ctx?: Record<string, unknown>): Promise<void>;
    revalidateTag(tags: string | Array<string>): Promise<void>;
    resetRequestCache(): void;
};
export default createRedisDataCacheAdapter;

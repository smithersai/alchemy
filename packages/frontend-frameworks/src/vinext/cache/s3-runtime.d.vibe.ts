export interface S3AdapterOptions extends Record<string, unknown> {
    /** Env var holding the bucket name. @default "CACHE_BUCKET_NAME" */
    readonly bucketEnv?: string;
    /** Key prefix inside the bucket. @default "vinext-cache/" */
    readonly prefix?: string;
    readonly appPrefix?: string;
    readonly ttlSeconds?: number;
    readonly tagCacheTtlMs?: number;
}
declare const createS3DataCacheAdapter: ({ env, options, }: {
    env?: Record<string, unknown>;
    options?: S3AdapterOptions;
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
export default createS3DataCacheAdapter;

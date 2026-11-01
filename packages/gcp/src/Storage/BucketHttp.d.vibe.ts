import * as Effect from "effect/Effect";
import type { Bucket } from "./Bucket.vibe";
import type { ReadBucketClient } from "./ReadBucket.vibe";
import type { WriteBucketClient } from "./WriteBucket.vibe";
/**
 * Shared HTTP scaffolding for the Storage Read/Write/ReadWrite bindings:
 * resolves the distilled operations and media endpoints once at Layer
 * construction and grants `role` on the bound bucket at deploy time.
 *
 * NOT exported from `index.ts`.
 */
export declare const makeStorageBucketHelpers: Effect.Effect<{
    makeRead: (bucketName: Effect.Effect<string>) => ReadBucketClient;
    makeWrite: (bucketName: Effect.Effect<string>) => WriteBucketClient;
}, never, never>;
/** Build a bucket binding that grants `role` and returns `makeClient`'s client. */
export declare const makeStorageBucketBinding: <Client>(options: {
    tag: string;
    role: string;
    makeClient: (helpers: Effect.Success<typeof makeStorageBucketHelpers>, bucketName: Effect.Effect<string>) => Client;
}) => Effect.Effect<(bucket: Bucket) => Effect.Effect<Client, never, never>, never, never>;

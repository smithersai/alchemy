import * as Binding from "alchemy/Binding";
import * as Effect from "effect/Effect";
import type { Bucket } from "./Bucket.ts";
import type { ReadBucketClient } from "./ReadBucket.vibe";
import type { WriteBucketClient } from "./WriteBucket.vibe";
/**
 * @binding
 * @product R2
 * @category Storage & Databases
 */
export interface ReadWriteBucket extends Binding.Service<ReadWriteBucket, "Cloudflare.R2.ReadWriteBucket", (bucket: Bucket) => Effect.Effect<ReadWriteBucketClient>> {
}
export declare const ReadWriteBucket: ReadWriteBucket;
export interface ReadWriteBucketClient extends ReadBucketClient, WriteBucketClient {
}

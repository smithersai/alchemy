import * as Binding from "alchemy/Binding";
import type * as Effect from "effect/Effect";
import type { ReadRedisClient } from "./ReadRedis.vibe";
import type { Redis } from "./Redis.js";
import type { WriteRedisClient } from "./WriteRedis.vibe";
/**
 * Bind a {@link Redis} database with read + write access.
 *
 * `ReadWriteRedis` is the Context tag, the type, and the callable —
 * `yield* Railway.ReadWriteRedis(Cache)`. Provide {@link ReadWriteRedisHttp}.
 *
 *
 * ### Read and write
 * **Example:** Round-trip a key
 * ```typescript
 * const cache = yield* Railway.ReadWriteRedis(Cache);
 * yield* cache.set("marker", "hello");
 * const value = yield* cache.get("marker");
 * ```
 *
 * @binding
 * @product Redis
 */
export interface ReadWriteRedis extends Binding.Service<ReadWriteRedis, "Railway.ReadWriteRedis", (redis: Redis) => Effect.Effect<ReadWriteRedisClient>> {
}
export declare const ReadWriteRedis: ReadWriteRedis;
export interface ReadWriteRedisClient extends ReadRedisClient, WriteRedisClient {
}

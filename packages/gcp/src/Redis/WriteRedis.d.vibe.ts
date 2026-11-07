import type { WriteClient } from "@alchemy.run/redis";
import * as Binding from "alchemy/Binding";
import type * as Effect from "effect/Effect";
import type { Instance } from "./Instance.ts";
/**
 * Bind a Memorystore {@link Instance} with write access.
 *
 * Uses the shared `@alchemy.run/redis` RESP client. Provide
 * {@link WriteRedisHttp}.
 *
 * @binding
 * @category Redis
 */
export interface WriteRedis extends Binding.Service<WriteRedis, "GCP.Redis.WriteRedis", (instance: Instance) => Effect.Effect<WriteRedisClient>> {
}
export declare const WriteRedis: WriteRedis;
export type WriteRedisClient = WriteClient;

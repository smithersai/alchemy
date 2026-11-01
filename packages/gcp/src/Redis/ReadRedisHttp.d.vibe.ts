import * as Layer from "effect/Layer";
import { ReadRedis } from "./ReadRedis.vibe";
/**
 * HTTP/RESP implementation of {@link ReadRedis}.
 *
 * @layer
 * @provides GCP.Redis.ReadRedis
 */
export declare const ReadRedisHttp: Layer.Layer<ReadRedis, never, never>;

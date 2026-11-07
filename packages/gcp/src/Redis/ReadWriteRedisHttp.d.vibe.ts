import * as Layer from "effect/Layer";
import { ReadWriteRedis } from "./ReadWriteRedis.vibe";
/**
 * HTTP/RESP implementation of {@link ReadWriteRedis}.
 *
 * @layer
 * @provides GCP.Redis.ReadWriteRedis
 */
export declare const ReadWriteRedisHttp: Layer.Layer<ReadWriteRedis, never, never>;

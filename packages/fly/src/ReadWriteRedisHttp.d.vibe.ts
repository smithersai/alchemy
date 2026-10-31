import * as Layer from "effect/Layer";
import { ReadWriteRedis } from "./ReadWriteRedis.js";
/**
 * HTTP implementation of {@link ReadWriteRedis}.
 *
 * @layer
 * @product Redis
 * @provides Fly.ReadWriteRedis
 */
export declare const ReadWriteRedisHttp: Layer.Layer<ReadWriteRedis, never, never>;

import * as Layer from "effect/Layer";
import { ReadWriteRedis } from "./ReadWriteRedis.js";
/**
 * HTTP implementation of {@link ReadWriteRedis}.
 *
 * @layer
 * @product Redis
 * @provides Railway.ReadWriteRedis
 */
export declare const ReadWriteRedisHttp: Layer.Layer<ReadWriteRedis, never, never>;

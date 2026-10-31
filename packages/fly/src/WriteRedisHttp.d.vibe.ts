import * as Layer from "effect/Layer";
import { WriteRedis } from "./WriteRedis.js";
/**
 * HTTP implementation of {@link WriteRedis}.
 *
 * @layer
 * @product Redis
 * @provides Fly.WriteRedis
 */
export declare const WriteRedisHttp: Layer.Layer<WriteRedis, never, never>;

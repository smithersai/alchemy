import * as Layer from "effect/Layer";
import { WriteRedis } from "./WriteRedis.js";
/**
 * HTTP/RESP implementation of {@link WriteRedis}.
 *
 * @layer
 * @provides GCP.Redis.WriteRedis
 */
export declare const WriteRedisHttp: Layer.Layer<WriteRedis, never, never>;

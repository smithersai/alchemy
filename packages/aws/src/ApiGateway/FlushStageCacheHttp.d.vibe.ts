import * as Layer from "effect/Layer";
import { FlushStageCache } from "./FlushStageCache.vibe";
/**
 * HTTP implementation of the {@link FlushStageCache} binding. Grants
 * `apigateway:DELETE` on the stage's `/cache/data` path and calls the API
 * with the host Function's credentials.
 */
export declare const FlushStageCacheHttp: Layer.Layer<FlushStageCache, never, never>;

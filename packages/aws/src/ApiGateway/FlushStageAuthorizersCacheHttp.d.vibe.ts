import * as Layer from "effect/Layer";
import { FlushStageAuthorizersCache } from "./FlushStageAuthorizersCache.vibe";
/**
 * HTTP implementation of the {@link FlushStageAuthorizersCache} binding.
 * Grants `apigateway:DELETE` on the stage's `/cache/authorizers` path and
 * calls the API with the host Function's credentials.
 */
export declare const FlushStageAuthorizersCacheHttp: Layer.Layer<FlushStageAuthorizersCache, never, never>;

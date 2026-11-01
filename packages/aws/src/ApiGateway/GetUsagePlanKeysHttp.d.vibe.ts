import * as Layer from "effect/Layer";
import { GetUsagePlanKeys } from "./GetUsagePlanKeys.vibe";
/**
 * HTTP implementation of the {@link GetUsagePlanKeys} binding. Grants
 * `apigateway:GET` on the plan's `/keys` path and calls the API with the
 * host Function's credentials.
 */
export declare const GetUsagePlanKeysHttp: Layer.Layer<GetUsagePlanKeys, never, never>;

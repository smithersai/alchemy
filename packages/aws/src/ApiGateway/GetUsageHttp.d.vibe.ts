import * as Layer from "effect/Layer";
import { GetUsage } from "./GetUsage.vibe";
/**
 * HTTP implementation of the {@link GetUsage} binding. Grants
 * `apigateway:GET` on the plan's `/usage` path and calls the API with the
 * host Function's credentials.
 */
export declare const GetUsageHttp: Layer.Layer<GetUsage, never, never>;

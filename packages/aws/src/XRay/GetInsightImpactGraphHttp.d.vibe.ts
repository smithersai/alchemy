import * as Layer from "effect/Layer";
import { GetInsightImpactGraph } from "./GetInsightImpactGraph.vibe";
/**
 * HTTP implementation of the `XRay.GetInsightImpactGraph` binding.
 *
 * At deploy time it grants `xray:GetInsightImpactGraph` on `*` to the host Lambda
 * Function (the action does not support resource-level permissions); at
 * runtime it calls the X-Ray API with the function's execution role
 * credentials.
 *
 * @example Provide on the Function effect
 * ```typescript
 * import * as XRay from "@alchemy.run/aws/XRay";
 *
 * Effect.gen(function* () {
 *   const getInsightImpactGraph = yield* XRay.GetInsightImpactGraph();
 *   // ...
 * }).pipe(Effect.provide(XRay.GetInsightImpactGraphHttp));
 * ```
 */
export declare const GetInsightImpactGraphHttp: Layer.Layer<GetInsightImpactGraph, never, never>;

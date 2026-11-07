import * as Layer from "effect/Layer";
import { GetSamplingRules } from "./GetSamplingRules.vibe";
/**
 * HTTP implementation of the `XRay.GetSamplingRules` binding.
 *
 * At deploy time it grants `xray:GetSamplingRules` on `*` to the host Lambda
 * Function (the action does not support resource-level permissions); at
 * runtime it calls the X-Ray API with the function's execution role
 * credentials.
 *
 * @example Provide on the Function effect
 * ```typescript
 * import * as XRay from "@alchemy.run/aws/XRay";
 *
 * Effect.gen(function* () {
 *   const getSamplingRules = yield* XRay.GetSamplingRules();
 *   // ...
 * }).pipe(Effect.provide(XRay.GetSamplingRulesHttp));
 * ```
 */
export declare const GetSamplingRulesHttp: Layer.Layer<GetSamplingRules, never, never>;

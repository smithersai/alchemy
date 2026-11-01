import * as Layer from "effect/Layer";
import { GetPlatformsPolicy } from "./GetPlatformsPolicy.js";
/**
 * HTTP implementation of {@link GetPlatformsPolicy}.
 *
 * @layer
 * @provides GCP.BinaryAuthorization.GetPlatformsPolicy
 */
export declare const GetPlatformsPolicyHttp: Layer.Layer<GetPlatformsPolicy, never, never>;

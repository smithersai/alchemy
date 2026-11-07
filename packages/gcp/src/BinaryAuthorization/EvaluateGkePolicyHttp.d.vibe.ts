import * as Layer from "effect/Layer";
import { EvaluateGkePolicy } from "./EvaluateGkePolicy.vibe";
/**
 * HTTP implementation of {@link EvaluateGkePolicy}.
 *
 * @layer
 * @provides GCP.BinaryAuthorization.EvaluateGkePolicy
 */
export declare const EvaluateGkePolicyHttp: Layer.Layer<EvaluateGkePolicy, never, never>;

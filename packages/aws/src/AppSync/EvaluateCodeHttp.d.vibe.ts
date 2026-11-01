import * as Layer from "effect/Layer";
import { EvaluateCode } from "./EvaluateCode.vibe";
/**
 * HTTP implementation of the {@link EvaluateCode} binding. Calls
 * `appsync:EvaluateCode` with the host Function's IAM role. The action
 * defines no IAM resource types, so the grant is necessarily
 * `Resource: "*"`.
 */
export declare const EvaluateCodeHttp: Layer.Layer<EvaluateCode, never, never>;

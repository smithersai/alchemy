import * as Layer from "effect/Layer";
import { EvaluateMappingTemplate } from "./EvaluateMappingTemplate.vibe";
/**
 * HTTP implementation of the {@link EvaluateMappingTemplate} binding. Calls
 * `appsync:EvaluateMappingTemplate` with the host Function's IAM role. The
 * action defines no IAM resource types, so the grant is necessarily
 * `Resource: "*"`.
 */
export declare const EvaluateMappingTemplateHttp: Layer.Layer<EvaluateMappingTemplate, never, never>;

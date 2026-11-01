import * as Layer from "effect/Layer";
import { GetParameterVersion } from "./GetParameterVersion.vibe";
/**
 * HTTP implementation of {@link GetParameterVersion}.
 *
 * @layer
 * @provides GCP.ParameterManager.GetParameterVersion
 */
export declare const GetParameterVersionHttp: Layer.Layer<GetParameterVersion, never, never>;

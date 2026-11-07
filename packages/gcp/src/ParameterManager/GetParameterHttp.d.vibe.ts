import * as Layer from "effect/Layer";
import { GetParameter } from "./GetParameter.vibe";
/**
 * HTTP implementation of {@link GetParameter}.
 *
 * @layer
 * @provides GCP.ParameterManager.GetParameter
 */
export declare const GetParameterHttp: Layer.Layer<GetParameter, never, never>;

import * as Layer from "effect/Layer";
import { GetWorkstationConfig } from "./GetWorkstationConfig.vibe";
/**
 * HTTP implementation of {@link GetWorkstationConfig}.
 *
 * @layer
 * @provides GCP.Workstations.GetWorkstationConfig
 */
export declare const GetWorkstationConfigHttp: Layer.Layer<GetWorkstationConfig, never, never>;

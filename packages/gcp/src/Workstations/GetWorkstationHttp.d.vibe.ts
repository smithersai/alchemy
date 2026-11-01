import * as Layer from "effect/Layer";
import { GetWorkstation } from "./GetWorkstation.js";
/**
 * HTTP implementation of {@link GetWorkstation}.
 *
 * @layer
 * @provides GCP.Workstations.GetWorkstation
 */
export declare const GetWorkstationHttp: Layer.Layer<GetWorkstation, never, never>;

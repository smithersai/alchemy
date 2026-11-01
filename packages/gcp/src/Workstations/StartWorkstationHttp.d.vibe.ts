import * as Layer from "effect/Layer";
import { StartWorkstation } from "./StartWorkstation.vibe";
/**
 * HTTP implementation of {@link StartWorkstation}.
 *
 * @layer
 * @provides GCP.Workstations.StartWorkstation
 */
export declare const StartWorkstationHttp: Layer.Layer<StartWorkstation, never, never>;

import * as Layer from "effect/Layer";
import { GetWorkstationCluster } from "./GetWorkstationCluster.vibe";
/**
 * HTTP implementation of {@link GetWorkstationCluster}.
 *
 * @layer
 * @provides GCP.Workstations.GetWorkstationCluster
 */
export declare const GetWorkstationClusterHttp: Layer.Layer<GetWorkstationCluster, never, never>;

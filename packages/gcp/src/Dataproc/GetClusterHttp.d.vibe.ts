import * as Layer from "effect/Layer";
import { GetCluster } from "./GetCluster.js";
/**
 * HTTP implementation of {@link GetCluster}.
 *
 * @layer
 * @provides GCP.Dataproc.GetCluster
 */
export declare const GetClusterHttp: Layer.Layer<GetCluster, never, never>;

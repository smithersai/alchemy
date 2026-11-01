import * as Layer from "effect/Layer";
import { GetCluster } from "./GetCluster.vibe";
/**
 * HTTP implementation of {@link GetCluster}.
 *
 * @layer
 * @provides GCP.AlloyDB.GetCluster
 */
export declare const GetClusterHttp: Layer.Layer<GetCluster, never, never>;

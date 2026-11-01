import * as Layer from "effect/Layer";
import { GetCluster } from "./GetCluster.vibe";
/**
 * HTTP implementation of {@link GetCluster}.
 *
 * @layer
 * @provides GCP.Bigtable.GetCluster
 */
export declare const GetClusterHttp: Layer.Layer<GetCluster, never, never>;

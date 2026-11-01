import * as Layer from "effect/Layer";
import { GetNodePool } from "./GetNodePool.js";
/**
 * HTTP implementation of {@link GetNodePool}.
 *
 * @layer
 * @provides GCP.Container.GetNodePool
 */
export declare const GetNodePoolHttp: Layer.Layer<GetNodePool, never, never>;

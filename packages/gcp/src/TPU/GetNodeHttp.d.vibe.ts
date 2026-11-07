import * as Layer from "effect/Layer";
import { GetNode } from "./GetNode.vibe";
/**
 * HTTP implementation of {@link GetNode}.
 *
 * @layer
 * @provides GCP.TPU.GetNode
 */
export declare const GetNodeHttp: Layer.Layer<GetNode, never, never>;

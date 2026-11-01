import * as Layer from "effect/Layer";
import { Pull } from "./Pull.js";
/**
 * HTTP implementation of {@link Pull}.
 *
 * @layer
 * @provides GCP.PubSub.Pull
 */
export declare const PullHttp: Layer.Layer<Pull, never, never>;

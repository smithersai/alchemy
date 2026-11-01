import * as Layer from "effect/Layer";
import { Pull } from "./Pull.vibe";
/**
 * HTTP implementation of {@link Pull}.
 *
 * @layer
 * @provides GCP.PubSub.Pull
 */
export declare const PullHttp: Layer.Layer<Pull, never, never>;

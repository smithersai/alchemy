import * as Layer from "effect/Layer";
import { Acknowledge } from "./Acknowledge.js";
/**
 * HTTP implementation of {@link Acknowledge}.
 *
 * @layer
 * @provides GCP.PubSub.Acknowledge
 */
export declare const AcknowledgeHttp: Layer.Layer<Acknowledge, never, never>;

import * as Layer from "effect/Layer";
import { Acknowledge } from "./Acknowledge.vibe";
/**
 * HTTP implementation of {@link Acknowledge}.
 *
 * @layer
 * @provides GCP.PubSub.Acknowledge
 */
export declare const AcknowledgeHttp: Layer.Layer<Acknowledge, never, never>;

import * as Layer from "effect/Layer";
import { Publish } from "./Publish.js";
/**
 * HTTP implementation of {@link Publish}.
 *
 * @layer
 * @provides GCP.PubSub.Publish
 */
export declare const PublishHttp: Layer.Layer<Publish, never, never>;

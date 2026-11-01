import * as Layer from "effect/Layer";
import { ReadSubscription } from "./ReadSubscription.js";
/**
 * HTTP implementation of {@link ReadSubscription} over the Pub/Sub REST API.
 *
 * @layer
 * @provides GCP.PubSub.ReadSubscription
 * @category PubSub
 */
export declare const ReadSubscriptionHttp: Layer.Layer<ReadSubscription, never, never>;

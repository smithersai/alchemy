import * as Layer from "effect/Layer";
import { GetSubscription } from "./GetSubscription.js";
/**
 * HTTP implementation of {@link GetSubscription}.
 *
 * @layer
 * @provides GCP.PubSubLite.GetSubscription
 */
export declare const GetSubscriptionHttp: Layer.Layer<GetSubscription, never, import("@distilled.cloud/gcp/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;

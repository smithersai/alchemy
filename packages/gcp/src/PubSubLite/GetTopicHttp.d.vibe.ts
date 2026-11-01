import * as Layer from "effect/Layer";
import { GetTopic } from "./GetTopic.js";
/**
 * HTTP implementation of {@link GetTopic}.
 *
 * @layer
 * @provides GCP.PubSubLite.GetTopic
 */
export declare const GetTopicHttp: Layer.Layer<GetTopic, never, import("@distilled.cloud/gcp/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;

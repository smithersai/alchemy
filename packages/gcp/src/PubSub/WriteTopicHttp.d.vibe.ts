import * as Layer from "effect/Layer";
import { WriteTopic } from "./WriteTopic.vibe";
/**
 * HTTP implementation of {@link WriteTopic} over the Pub/Sub REST API.
 *
 * @layer
 * @provides GCP.PubSub.WriteTopic
 * @category PubSub
 */
export declare const WriteTopicHttp: Layer.Layer<WriteTopic, never, never>;

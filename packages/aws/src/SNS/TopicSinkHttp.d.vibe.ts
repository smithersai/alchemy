import * as Layer from "effect/Layer";
import { PublishBatch } from "./PublishBatch.vibe";
import { TopicSink } from "./TopicSink.vibe";
export declare const TopicSinkHttp: Layer.Layer<TopicSink, never, PublishBatch>;

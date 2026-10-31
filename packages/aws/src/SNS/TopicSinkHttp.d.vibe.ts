import * as Layer from "effect/Layer";
import { PublishBatch } from "./PublishBatch.js";
import { TopicSink } from "./TopicSink.js";
export declare const TopicSinkHttp: Layer.Layer<TopicSink, never, PublishBatch>;

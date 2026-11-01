import * as Layer from "effect/Layer";
import { QueueSink } from "./QueueSink.vibe";
import { SendMessageBatch } from "./SendMessageBatch.vibe";
export declare const QueueSinkHttp: Layer.Layer<QueueSink, never, SendMessageBatch>;

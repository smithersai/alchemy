import * as Layer from "effect/Layer";
import { QueueSink } from "./QueueSink.js";
import { SendMessageBatch } from "./SendMessageBatch.js";
export declare const QueueSinkHttp: Layer.Layer<QueueSink, never, SendMessageBatch>;

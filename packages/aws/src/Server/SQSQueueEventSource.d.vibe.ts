import { ServerHost } from "alchemy/Runtime/Process";
import * as Layer from "effect/Layer";
import * as SQS from "../SQS/index.js";
export declare const SQSQueueEventSource: Layer.Layer<SQS.QueueEventSource, never, SQS.DeleteMessageBatch | SQS.ReceiveMessage | ServerHost>;

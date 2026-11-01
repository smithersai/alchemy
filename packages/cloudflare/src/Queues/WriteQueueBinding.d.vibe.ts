import * as Layer from "effect/Layer";
import { makeQueueHelpers } from "./QueueBinding.js";
import { WriteQueue, type WriteQueueClient } from "./WriteQueue.vibe";
/**
 * Implementation of the {@link WriteQueue} service that uses a native Worker
 * queue binding.
 */
export declare const WriteQueueBinding: Layer.Layer<WriteQueue, never, import("../index.js").WorkerEnvironment | import("../index.js").Worker<any>>;
/** Build the producer client over a native Worker queue binding. */
export declare const makeWriteQueueClient: ({ raw, use, }: ReturnType<typeof makeQueueHelpers>) => WriteQueueClient;

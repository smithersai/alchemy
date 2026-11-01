import type * as pipes from "@distilled.cloud/aws/pipes";
import type * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import type { Table } from "../DynamoDB/Table.js";
import type { Stream } from "../Kinesis/Stream.js";
import type { Function } from "../Lambda/Function.js";
import type { Queue } from "../SQS/Queue.js";
import { Pipe, type PipeDesiredState } from "./Pipe.js";
/**
 * Resources the {@link from} builder accepts as a pipe source. DynamoDB
 * tables must have streams enabled (`latestStreamArn` defined).
 */
export type PipeSource = Queue | Stream | Table;
export interface PipeSourceOptions {
    /**
     * Maximum number of source records per delivered batch.
     */
    batchSize?: number;
    /**
     * Maximum time to gather records before delivering a batch (e.g.
     * `"30 seconds"` or `Duration.seconds(30)`). Sent to the API in whole
     * seconds.
     */
    maximumBatchingWindow?: Duration.Input;
    /**
     * Where to start reading a Kinesis or DynamoDB stream source. Ignored
     * for SQS sources. Changing it triggers a replacement.
     * @default "LATEST"
     */
    startingPosition?: "TRIM_HORIZON" | "LATEST";
}
export interface PipeTargetOptions {
    /**
     * Explicit physical pipe name. Also used as the logical ID, so it must
     * be deterministic. If omitted, a logical ID is derived from the source
     * and target logical IDs and the physical name is auto-generated.
     */
    name?: string;
    /**
     * A description of the pipe.
     */
    description?: string;
    /**
     * The state the pipe should be in.
     * @default "RUNNING"
     */
    desiredState?: PipeDesiredState;
    /**
     * Input template applied to each record before delivery to the target.
     */
    inputTemplate?: string;
}
export interface LambdaTargetOptions extends PipeTargetOptions {
    /**
     * How the target Lambda function is invoked.
     * @default "REQUEST_RESPONSE"
     */
    invocationType?: "REQUEST_RESPONSE" | "FIRE_AND_FORGET";
}
export interface QueueTargetOptions extends PipeTargetOptions {
    /**
     * Message group ID for FIFO target queues.
     */
    messageGroupId?: string;
    /**
     * Message deduplication ID for FIFO target queues.
     */
    messageDeduplicationId?: string;
}
/**
 * Start building an EventBridge Pipe from a source resource. The terminal
 * `.toLambda(...)` / `.toQueue(...)` call synthesizes the
 * `pipes.amazonaws.com` execution role — source-read plus target-invoke
 * (plus enrichment-invoke) policies scoped to the exact resource ARNs —
 * and yields the {@link Pipe}.
 *
 * ```typescript
 * const pipe = yield* AWS.Pipes.from(queue, { batchSize: 1 })
 *   .filter(JSON.stringify({ body: { type: ["order.created"] } }))
 *   .toLambda(fn);
 * ```
 */
export declare const from: any;

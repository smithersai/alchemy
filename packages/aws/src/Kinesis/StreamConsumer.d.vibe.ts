import type { Input } from "alchemy/Input";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.js";
import type { StreamArn } from "./Stream.vibe";
declare const StreamConsumerUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "StreamConsumerUnexpectedResponse";
} & Readonly<A>;
export declare class StreamConsumerUnexpectedResponse extends StreamConsumerUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export type ConsumerName = string;
export type ConsumerArn = string;
export type ConsumerStatus = "CREATING" | "DELETING" | "ACTIVE";
export interface StreamConsumerProps {
    /**
     * ARN of the stream that owns the consumer.
     */
    streamArn: Input<StreamArn>;
    /**
     * Name of the stream consumer.
     * @default ${app}-${stage}-${id}
     */
    consumerName?: string;
    /**
     * Tags to associate with the consumer.
     */
    tags?: Record<string, string>;
}
export interface StreamConsumer extends Resource<"AWS.Kinesis.StreamConsumer", StreamConsumerProps, {
    /**
     * The consumer's physical name.
     */
    consumerName: ConsumerName;
    /**
     * ARN of the registered consumer.
     */
    consumerArn: ConsumerArn;
    /**
     * Current lifecycle status of the consumer.
     */
    consumerStatus: ConsumerStatus;
    /**
     * ARN of the stream the consumer is registered on.
     */
    streamArn: StreamArn;
    /**
     * When the consumer was registered.
     */
    consumerCreationTimestamp: Date;
    /**
     * Current tags reported for the consumer.
     */
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * A registered Kinesis enhanced fan-out consumer.
 *
 * `StreamConsumer` is the canonical lifecycle resource for
 * `RegisterStreamConsumer` / `DeregisterStreamConsumer`.
 * ### Creating Consumers
 * **Example:** Register a Consumer
 * ```typescript
 * const consumer = yield* StreamConsumer("AnalyticsConsumer", {
 *   streamArn: stream.streamArn,
 * });
 * ```
 *
 * @resource
 */
export declare const StreamConsumer: import("alchemy").ResourceClass<StreamConsumer>;
export declare const StreamConsumerProvider: () => import("effect/Layer").Layer<Provider.Provider<StreamConsumer>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};

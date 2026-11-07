import * as eventbridge from "@distilled.cloud/aws/eventbridge";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { AWSEnvironment, type AccountID } from "../Environment.ts";
import type { Providers } from "../Providers.ts";
import type { RegionID } from "../Region.ts";
import type { QueueArn } from "../SQS/Queue.vibe";
export type { IncludeDetail, Level, LogConfig } from "@distilled.cloud/aws/eventbridge";
export type EventBusName = string;
export type EventBusArn = `arn:aws:events:${RegionID}:${AccountID}:event-bus/${EventBusName}`;
export interface EventBusDeadLetterConfig {
    /** ARN of the SQS queue used as the dead-letter queue. */
    Arn?: QueueArn;
}
export interface EventBusProps {
    /**
     * Name of the event bus. Must match [/\.\-_A-Za-z0-9]+, 1-256 characters.
     * If omitted, a unique name will be generated.
     * Cannot be "default" — use the default event bus by omitting eventBusName on rules.
     */
    name?: EventBusName;
    /**
     * The partner event source to associate with this event bus.
     * Only used when creating a partner event bus.
     */
    eventSourceName?: string;
    /**
     * Description of the event bus.
     */
    description?: string;
    /**
     * The identifier of the KMS customer managed key for EventBridge to use
     * to encrypt events on this event bus.
     */
    kmsKeyIdentifier?: string;
    /**
     * Dead-letter queue configuration for undeliverable events.
     */
    deadLetterConfig?: EventBusDeadLetterConfig;
    /**
     * Logging configuration for the event bus.
     */
    logConfig?: eventbridge.LogConfig;
    /**
     * Whether to delete any rules remaining on the bus (removing their
     * targets first) when the bus is destroyed. Rules managed by the same
     * stack are always deleted before the bus by the engine, and AWS-managed
     * rules (e.g. the hidden archival rule an Archive leaves behind while
     * AWS's async cleanup lags) are always force-swept; `forceDestroy`
     * additionally sweeps rules created out-of-band (or leaked by an
     * interrupted deploy), which would otherwise block bus deletion with
     * `EventBusHasRules` forever.
     * @default false
     */
    forceDestroy?: boolean;
    /**
     * Tags to assign to the event bus.
     */
    tags?: Record<string, string>;
    /**
     * AWS region to create the event bus in. Defaults to the stack's region.
     * Set it to place the secondary bus of a global {@link Endpoint} in its
     * failover region. Changing the region replaces the event bus.
     */
    region?: string;
}
/**
 * An Amazon EventBridge event bus for receiving and routing events.
 * ### Creating Event Buses
 * **Example:** Custom Event Bus
 * ```typescript
 * const bus = yield* EventBus("MyAppEvents", {
 *   description: "Custom event bus for my application",
 * });
 * ```
 *
 * **Example:** Event Bus with Dead Letter Queue
 * ```typescript
 * const bus = yield* EventBus("ReliableBus", {
 *   deadLetterConfig: {
 *     Arn: yield* dlq.queueArn,
 *   },
 * });
 * ```
 *
 * **Example:** Event Bus in Another Region
 * ```typescript
 * const secondary = yield* EventBus("SecondaryBus", {
 *   name: "orders",
 *   region: "us-east-2",
 * });
 * ```
 *
 * **Example:** Event Bus with KMS Encryption
 * ```typescript
 * const bus = yield* EventBus("EncryptedBus", {
 *   kmsKeyIdentifier: yield* key.keyArn(),
 * });
 * ```
 *
 * @resource
 */
export interface EventBus extends Resource<"AWS.EventBridge.EventBus", EventBusProps, {
    /** The name of the event bus. */
    eventBusName: EventBusName;
    /** The ARN of the event bus. */
    eventBusArn: EventBusArn;
    /** Description of the event bus, if set. */
    description?: string;
}, never, Providers> {
}
export declare const EventBus: import("alchemy").ResourceClass<EventBus>;
export declare const EventBusProvider: () => import("effect/Layer").Layer<Provider.Provider<EventBus>, never, AWSEnvironment | import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;

import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.vibe";
export interface EventTypeProps {
    /**
     * Name of the event type. If omitted, a unique lowercase name is generated
     * from the app, stage, and logical ID. Changing the name replaces the event
     * type.
     */
    name?: string;
    /**
     * Human-readable description. This is an in-place update.
     */
    description?: string;
    /**
     * Names of the variables that belong to this event type. Must reference
     * existing Fraud Detector variables. This is an in-place update.
     */
    eventVariables: string[];
    /**
     * Names of the labels used to classify events (e.g. `fraud`, `legit`). This
     * is an in-place update.
     */
    labels?: string[];
    /**
     * Names of the entity types associated with this event type. Must reference
     * existing Fraud Detector entity types. This is an in-place update.
     */
    entityTypes: string[];
    /**
     * Whether to enable stored-event ingestion (`ENABLED` or `DISABLED`). This is
     * an in-place update.
     */
    eventIngestion?: string;
    /**
     * Whether to forward events to EventBridge. This is an in-place update.
     */
    eventBridgeEnabled?: boolean;
    /**
     * User-defined tags for the event type.
     */
    tags?: Record<string, string>;
}
export interface EventType extends Resource<"AWS.FraudDetector.EventType", EventTypeProps, {
    /** The name of the event type. */
    name: string;
    /** The ARN of the event type. */
    arn: string;
}, never, Providers> {
}
/**
 * An Amazon Fraud Detector event type — the schema of an event (its variables,
 * labels, and entity types) that detectors evaluate. Event types are cheap
 * metadata objects.
 *
 * ### Creating an Event Type
 * **Example:** Basic Event Type
 * ```typescript
 * const purchase = yield* FraudDetector.EventType("purchase", {
 *   eventVariables: ["email", "ip"],
 *   entityTypes: ["customer"],
 *   labels: ["fraud", "legit"],
 * });
 * ```
 *
 * @resource
 */
export declare const EventType: import("alchemy").ResourceClass<EventType>;
export declare const EventTypeProvider: () => import("effect/Layer").Layer<Provider.Provider<EventType>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;

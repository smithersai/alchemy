import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.vibe";
declare const TrackerUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "TrackerUnexpectedResponse";
} & Readonly<A>;
export declare class TrackerUnexpectedResponse extends TrackerUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export type PositionFiltering = "TimeBased" | "DistanceBased" | "AccuracyBased";
export interface TrackerProps {
    /**
     * Name of the tracker. Immutable — changing it replaces the tracker.
     * @default ${app}-${stage}-${id}
     */
    trackerName?: string;
    /**
     * KMS key ID used to encrypt the tracker's position data. Immutable —
     * changing it replaces the tracker.
     */
    kmsKeyId?: string;
    /**
     * The position filtering method applied to device updates.
     * @default "TimeBased"
     */
    positionFiltering?: PositionFiltering;
    /**
     * Whether to publish device position updates to EventBridge.
     * @default false
     */
    eventBridgeEnabled?: boolean;
    /**
     * Optional description of the tracker resource.
     */
    description?: string;
    /**
     * Tags to associate with the tracker.
     */
    tags?: Record<string, string>;
}
export interface Tracker extends Resource<"AWS.Location.Tracker", TrackerProps, {
    /** Physical name of the tracker. */
    trackerName: string;
    /** ARN of the tracker. */
    trackerArn: string;
    /** KMS key ID backing the tracker, if configured. */
    kmsKeyId: string | undefined;
    /** Position filtering method applied to updates. */
    positionFiltering: string | undefined;
    /** Whether device updates are published to EventBridge. */
    eventBridgeEnabled: boolean | undefined;
    /** Description of the tracker. */
    description: string | undefined;
    /** Tags currently associated with the tracker. */
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * An Amazon Location Service tracker. A tracker records device positions and
 * evaluates them against linked geofence collections. The KMS key is
 * immutable; position filtering, EventBridge publishing, and the description
 * can be updated in place.
 *
 * ### Creating Trackers
 * **Example:** Basic Tracker
 * ```typescript
 * import * as Location from "@alchemy.run/aws/Location";
 *
 * const tracker = yield* Location.Tracker("Devices", {});
 * ```
 *
 * **Example:** Distance-Filtered Tracker with EventBridge
 * ```typescript
 * const tracker = yield* Location.Tracker("Fleet", {
 *   positionFiltering: "DistanceBased",
 *   eventBridgeEnabled: true,
 * });
 * ```
 *
 * @resource
 */
export declare const Tracker: import("alchemy").ResourceClass<Tracker>;
export declare const TrackerProvider: () => import("effect/Layer").Layer<Provider.Provider<Tracker>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};

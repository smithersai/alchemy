import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.vibe";
declare const IoTFleetWiseFleetUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "IoTFleetWiseFleetUnexpectedResponse";
} & Readonly<A>;
export declare class IoTFleetWiseFleetUnexpectedResponse extends IoTFleetWiseFleetUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface FleetProps {
    /**
     * ID of the fleet. Must be 1-100 characters of `[a-zA-Z0-9:_-]`. If
     * omitted, a deterministic physical name is generated. Changing the ID
     * replaces the fleet.
     */
    fleetId?: string;
    /**
     * ARN of the {@link SignalCatalog} the fleet is associated with.
     * Changing the signal catalog replaces the fleet.
     */
    signalCatalogArn: string;
    /**
     * Human-readable description of the fleet.
     */
    description?: string;
    /**
     * User-defined tags for the fleet.
     */
    tags?: Record<string, string>;
}
export interface Fleet extends Resource<"AWS.IoTFleetWise.Fleet", FleetProps, {
    /** The unique ID of the fleet. */
    fleetId: string;
    /** The ARN of the fleet. */
    fleetArn: string;
    /** The signal catalog associated with the fleet. */
    signalCatalogArn: string;
}, never, Providers> {
}
/**
 * An AWS IoT FleetWise fleet — a group of vehicles that campaigns can
 * target collectively.
 *
 * Fleets are free, provisioned near-instantly, and only carry a
 * description besides their signal-catalog association. AWS IoT FleetWise
 * is allowlist-gated and offered in `us-east-1`/`eu-central-1` only.
 * ### Creating a Fleet
 * **Example:** Basic Fleet
 * ```typescript
 * const fleet = yield* Fleet("TestFleet", {
 *   signalCatalogArn: catalog.signalCatalogArn,
 *   description: "west-coast pilot vehicles",
 * });
 * ```
 *
 * @resource
 */
export declare const Fleet: import("alchemy").ResourceClass<Fleet>;
export declare const FleetProvider: () => import("effect/Layer").Layer<Provider.Provider<Fleet>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("@distilled.cloud/aws/Region").Region | import("alchemy").Stack | import("alchemy").Stage>;
export {};

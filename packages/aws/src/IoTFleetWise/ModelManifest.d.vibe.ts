import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.ts";
declare const ModelManifestUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ModelManifestUnexpectedResponse";
} & Readonly<A>;
export declare class ModelManifestUnexpectedResponse extends ModelManifestUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface ModelManifestProps {
    /**
     * Name of the model manifest. Must be 1-100 characters of
     * `[a-zA-Z0-9:_-]`. If omitted, a deterministic physical name is
     * generated. Changing the name replaces the manifest.
     */
    modelManifestName?: string;
    /**
     * ARN of the {@link SignalCatalog} the manifest's nodes come from.
     * Changing the signal catalog replaces the manifest.
     */
    signalCatalogArn: string;
    /**
     * Fully qualified names of the signal-catalog nodes included in the
     * vehicle model, e.g. `["Vehicle.Speed"]`. Updated in place via
     * `nodesToAdd`/`nodesToRemove` deltas (only while the manifest is in
     * `DRAFT` status).
     */
    nodes: string[];
    /**
     * Human-readable description of the model manifest.
     */
    description?: string;
    /**
     * Status of the manifest. Vehicles can only be created from an `ACTIVE`
     * manifest; node changes require `DRAFT`.
     * @default "DRAFT"
     */
    status?: "ACTIVE" | "DRAFT";
    /**
     * User-defined tags for the model manifest.
     */
    tags?: Record<string, string>;
}
export interface ModelManifest extends Resource<"AWS.IoTFleetWise.ModelManifest", ModelManifestProps, {
    /** The name of the model manifest. */
    modelManifestName: string;
    /** The ARN of the model manifest. */
    modelManifestArn: string;
    /** The current status of the manifest (`ACTIVE`, `DRAFT`, ...). */
    status: string;
    /** The signal catalog the manifest's nodes come from. */
    signalCatalogArn: string | undefined;
}, never, Providers> {
}
/**
 * An AWS IoT FleetWise model manifest (vehicle model) — the subset of
 * signal-catalog nodes that describes one vehicle type.
 *
 * A manifest is created in `DRAFT` status; set `status: "ACTIVE"` to make
 * it usable by decoder manifests and vehicles. AWS IoT FleetWise is
 * allowlist-gated and offered in `us-east-1`/`eu-central-1` only.
 * ### Creating a Model Manifest
 * **Example:** Active Vehicle Model
 * ```typescript
 * const model = yield* ModelManifest("SedanModel", {
 *   signalCatalogArn: catalog.signalCatalogArn,
 *   nodes: ["Vehicle.Speed"],
 *   status: "ACTIVE",
 * });
 * ```
 *
 * **Example:** Draft Model with Description
 * ```typescript
 * const model = yield* ModelManifest("SedanModel", {
 *   signalCatalogArn: catalog.signalCatalogArn,
 *   nodes: ["Vehicle.Speed", "Vehicle.VIN"],
 *   description: "2026 sedan line",
 * });
 * ```
 *
 * @resource
 */
export declare const ModelManifest: import("alchemy").ResourceClass<ModelManifest>;
export declare const ModelManifestProvider: () => import("effect/Layer").Layer<Provider.Provider<ModelManifest>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("@distilled.cloud/aws/Region").Region | import("alchemy").Stack | import("alchemy").Stage>;
export {};

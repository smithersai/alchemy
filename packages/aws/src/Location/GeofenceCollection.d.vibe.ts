import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.ts";
declare const GeofenceCollectionUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GeofenceCollectionUnexpectedResponse";
} & Readonly<A>;
export declare class GeofenceCollectionUnexpectedResponse extends GeofenceCollectionUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface GeofenceCollectionProps {
    /**
     * Name of the geofence collection. Immutable — changing it replaces the
     * collection.
     * @default ${app}-${stage}-${id}
     */
    collectionName?: string;
    /**
     * KMS key ID used to encrypt the collection's geofence data. Immutable —
     * changing it replaces the collection.
     */
    kmsKeyId?: string;
    /**
     * Optional description of the geofence collection.
     */
    description?: string;
    /**
     * Tags to associate with the geofence collection.
     */
    tags?: Record<string, string>;
}
export interface GeofenceCollection extends Resource<"AWS.Location.GeofenceCollection", GeofenceCollectionProps, {
    /** Physical name of the geofence collection. */
    collectionName: string;
    /** ARN of the geofence collection. */
    collectionArn: string;
    /** KMS key ID backing the collection, if configured. */
    kmsKeyId: string | undefined;
    /** Description of the collection. */
    description: string | undefined;
    /** Tags currently associated with the collection. */
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * An Amazon Location Service geofence collection. A geofence collection stores
 * geofences and evaluates device positions against them. The KMS key is
 * immutable; the description can be updated in place.
 *
 * ### Creating Geofence Collections
 * **Example:** Basic Geofence Collection
 * ```typescript
 * import * as Location from "@alchemy.run/aws/Location";
 *
 * const collection = yield* Location.GeofenceCollection("Fences", {});
 * ```
 *
 * **Example:** Encrypted Geofence Collection
 * ```typescript
 * const collection = yield* Location.GeofenceCollection("SecureFences", {
 *   kmsKeyId: "alias/my-key",
 *   description: "Encrypted geofence collection",
 * });
 * ```
 *
 * @resource
 */
export declare const GeofenceCollection: import("alchemy").ResourceClass<GeofenceCollection>;
export declare const GeofenceCollectionProvider: () => import("effect/Layer").Layer<Provider.Provider<GeofenceCollection>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};

import * as apigee from "@distilled.cloud/gcp/apigee_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
export type ApisKeyvaluemapsEntryProps = {
    /**
     * Apigee organization id. Defaults to the GCP project id. Immutable.
     */
    organizationId?: string;
    /**
     * Parent API proxy id. Immutable.
     */
    api: string;
    /**
     * Parent key value map id. Immutable.
     */
    map: string;
    /**
     * Entry key. If omitted, a unique name is generated. Immutable.
     */
    entryId?: string;
    /**
     * Value stored for this key.
     */
    value: string;
};
export type ApisKeyvaluemapsEntry = Resource<"GCP.Apigee.ApisKeyvaluemapsEntry", ApisKeyvaluemapsEntryProps, {
    /** Full resource name `.../keyvaluemaps/{map}/entries/{entry}`. */
    name: string;
    /** Entry key. */
    entryId: string;
    /** Parent map id. */
    mapId: string;
    /** Parent API proxy id. */
    apiId: string;
    /** Organization id. */
    organizationId: string;
    /** Project id. */
    project: string;
    /** Stored value. */
    value: string;
}, never, Providers>;
/**
 * A key/value entry in an API-proxy-scoped Apigee key value map.
 *
 * Entries have no labels. Alchemy treats entries inside a map that
 * carries the `__alchemy` sentinel as owned so `list` / nuke can find
 * them. Changing `entryId`, `map`, `api`, or `organizationId` replaces
 * the entry. The reserved key `__alchemy` is used for map ownership and
 * is not a user entry.
 *
 * ### Creating an Entry
 * **Example:** Put a config value
 * ```typescript
 * const entry = yield* GCP.Apigee.ApisKeyvaluemapsEntry("Timeout", {
 *   api: proxy.apiId,
 *   map: map.mapId,
 *   entryId: "timeout-ms",
 *   value: "5000",
 * });
 * ```
 *
 * @resource
 * @category Apigee
 */
export declare const ApisKeyvaluemapsEntry: import("alchemy/Resource").ResourceClass<ApisKeyvaluemapsEntry>;
declare const ApisKeyvaluemapsEntryNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.Apigee.ApisKeyvaluemapsEntryNotResolved";
} & Readonly<A>;
export declare class ApisKeyvaluemapsEntryNotResolved extends ApisKeyvaluemapsEntryNotResolved_base<{
    resourceName: string;
}> {
}
export declare const ApisKeyvaluemapsEntryProvider: () => import("effect/Layer").Layer<Provider.Provider<ApisKeyvaluemapsEntry>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | apigee.GcpOpContext>;
export {};

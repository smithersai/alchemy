import * as apigee from "@distilled.cloud/gcp/apigee_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
export type EnvironmentsKeyvaluemapsEntryProps = {
    /**
     * Apigee organization id or `organizations/{org}`. Defaults to the
     * current GCP project id. Immutable — changing it replaces the entry.
     */
    organization?: string;
    /**
     * Environment id or `organizations/{org}/environments/{env}`. Immutable —
     * changing it replaces the entry.
     */
    environment: string;
    /**
     * Parent key value map id or
     * `organizations/{org}/environments/{env}/keyvaluemaps/{map}`. Immutable
     * — changing it replaces the entry.
     */
    keyvaluemap: string;
    /**
     * Entry key (last path segment). If omitted, a unique name is generated
     * from the stack, stage, and logical id. Immutable — changing it
     * replaces the entry.
     */
    entryId?: string;
    /**
     * Value stored under `entryId`.
     */
    value: string;
};
export type EnvironmentsKeyvaluemapsEntry = Resource<"GCP.Apigee.EnvironmentsKeyvaluemapsEntry", EnvironmentsKeyvaluemapsEntryProps, {
    /** Full resource name `.../keyvaluemaps/{map}/entries/{entry}`. */
    name: string;
    /** Entry key. */
    entryId: string;
    /** Parent map id. */
    keyvaluemapId: string;
    /** Apigee organization id. */
    organizationId: string;
    /** Environment id. */
    environmentId: string;
    /** Stored value (may be masked). */
    value: string | undefined;
}, never, Providers>;
/**
 * An entry in an environment-scoped Apigee key value map.
 *
 * Entries have no labels. `list` walks every map in Apigee environments
 * mapped to this GCP project. Key, map, organization, and environment are
 * identity; `value` updates in place.
 *
 * ### Creating an Entry
 * **Example:** Put a value
 * ```typescript
 * const map = yield* GCP.Apigee.EnvironmentsKeyvaluemap("Config", {
 *   environment: "eval",
 * });
 * const entry = yield* GCP.Apigee.EnvironmentsKeyvaluemapsEntry("ApiKey", {
 *   environment: "eval",
 *   keyvaluemap: map.keyvaluemapId,
 *   value: "secret",
 * });
 * ```
 *
 * @resource
 * @category Apigee
 */
export declare const EnvironmentsKeyvaluemapsEntry: import("alchemy/Resource").ResourceClass<EnvironmentsKeyvaluemapsEntry>;
declare const EnvironmentsKeyvaluemapsEntryNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.Apigee.EnvironmentsKeyvaluemapsEntryNotResolved";
} & Readonly<A>;
export declare class EnvironmentsKeyvaluemapsEntryNotResolved extends EnvironmentsKeyvaluemapsEntryNotResolved_base<{
    resourceName: string;
}> {
}
export declare const EnvironmentsKeyvaluemapsEntryProvider: () => import("effect/Layer").Layer<Provider.Provider<EnvironmentsKeyvaluemapsEntry>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | apigee.GcpOpContext>;
export {};

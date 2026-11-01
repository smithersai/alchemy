import * as apigee from "@distilled.cloud/gcp/apigee_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
export type EnvgroupProps = {
    /**
     * Apigee organization id or `organizations/{org}`. Defaults to the
     * current GCP project id. Immutable — changing it replaces the group.
     */
    organization?: string;
    /**
     * Environment group id (the `{envgroup}` segment of
     * `organizations/{org}/envgroups/{envgroup}`). If omitted, a unique
     * name is generated. Immutable — changing it replaces the group.
     */
    envgroupId?: string;
    /**
     * Host names for this environment group.
     */
    hostnames: string[];
};
export type Envgroup = Resource<"GCP.Apigee.Envgroup", EnvgroupProps, {
    /** Full resource name `organizations/{org}/envgroups/{envgroup}`. */
    name: string;
    /** Environment group id (last path segment). */
    envgroupId: string;
    /** Apigee organization id. */
    organization: string;
    /** Host names routed to this group. */
    hostnames: string[];
    /** Server-reported state (`CREATING`, `ACTIVE`, …). */
    state: string | undefined;
    /** Creation time in milliseconds since epoch. */
    createdAt: string | undefined;
    /** Last modification time in milliseconds since epoch. */
    lastModifiedAt: string | undefined;
}, never, Providers>;
/**
 * An Apigee environment group that maps hostnames to one or more
 * environments.
 *
 * The API has no labels or description, so Alchemy identifies its groups
 * by the generated `envgroupId`: `read` reports a group with an explicit
 * `envgroupId` as unowned (adopt it with `--adopt`), and nuke cannot
 * discover groups. Name is identity — changing `envgroupId` replaces the
 * group. Hostnames update in place.
 *
 * ### Creating an Environment Group
 * **Example:** Group with a hostname
 * ```typescript
 * const group = yield* GCP.Apigee.Envgroup("Api", {
 *   hostnames: ["api.example.com"],
 * });
 * ```
 *
 * **Example:** Named group
 * ```typescript
 * const group = yield* GCP.Apigee.Envgroup("Api", {
 *   envgroupId: "prod-group",
 *   hostnames: ["api.example.com", "api.example.net"],
 * });
 * ```
 *
 * @resource
 * @category Apigee
 */
export declare const Envgroup: import("alchemy/Resource").ResourceClass<Envgroup>;
declare const EnvgroupNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.Apigee.EnvgroupNotResolved";
} & Readonly<A>;
export declare class EnvgroupNotResolved extends EnvgroupNotResolved_base<{
    resourceName: string;
}> {
}
export declare const EnvgroupProvider: () => import("effect/Layer").Layer<Provider.Provider<Envgroup>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | apigee.GcpOpContext>;
export {};

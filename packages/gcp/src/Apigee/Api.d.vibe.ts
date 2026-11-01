import * as apigee from "@distilled.cloud/gcp/apigee_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
export type ApiProps = {
    /**
     * Apigee organization id. Defaults to the GCP project id. Immutable.
     */
    organizationId?: string;
    /**
     * API proxy id (`A-Za-z0-9._-`). If omitted, a unique name is
     * generated. Immutable.
     */
    apiId?: string;
    /**
     * User labels. Alchemy ownership labels are merged in automatically.
     */
    labels?: Record<string, string>;
    /**
     * Parent Space resource id. Only applied on create.
     */
    space?: string;
};
export type Api = Resource<"GCP.Apigee.Api", ApiProps, {
    /** Full resource name `organizations/{org}/apis/{api}`. */
    name: string;
    /** API proxy id. */
    apiId: string;
    /** Organization id. */
    organizationId: string;
    /** Project id. */
    project: string;
    /** User labels (Alchemy ownership labels stripped). */
    labels: Record<string, string>;
    /** Parent Space id, if any. */
    space: string | undefined;
    /** Latest revision id. */
    latestRevisionId: string | undefined;
    /** Defined revisions. */
    revision: string[];
    /** API proxy type. */
    apiProxyType: string | undefined;
    /** Whether the proxy is read-only (archive-generated). */
    readOnly: boolean;
    /** Creation time in milliseconds since epoch. */
    createdAt: string | undefined;
    /** Last modification time in milliseconds since epoch. */
    lastModifiedAt: string | undefined;
}, never, Providers>;
/**
 * An Apigee API proxy. The proxy is not serving traffic until a revision
 * is deployed to an environment.
 *
 * Labels (`alchemy-stack` / `alchemy-stage` / `alchemy-id`) stamp
 * ownership so `list` / nuke can find proxies. Changing `apiId` or
 * `organizationId` replaces the proxy.
 *
 * ### Creating a Proxy
 * **Example:** Generated name
 * ```typescript
 * const proxy = yield* GCP.Apigee.Api("Orders", {});
 * ```
 *
 * **Example:** Explicit id and labels
 * ```typescript
 * const proxy = yield* GCP.Apigee.Api("Orders", {
 *   apiId: "orders-v1",
 *   labels: { env: "prod" },
 * });
 * ```
 *
 * @resource
 * @category Apigee
 */
export declare const Api: import("alchemy/Resource").ResourceClass<Api>;
declare const ApiNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.Apigee.ApiNotResolved";
} & Readonly<A>;
export declare class ApiNotResolved extends ApiNotResolved_base<{
    resourceName: string;
}> {
}
export declare const ApiProvider: () => import("effect/Layer").Layer<Provider.Provider<Api>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | apigee.GcpOpContext>;
export {};

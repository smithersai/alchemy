import * as apigee from "@distilled.cloud/gcp/apigee_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.ts";
import type { Providers } from "../Providers.ts";
import { type Attribute } from "./ownership.ts";
export type AppgroupProps = {
    /**
     * Apigee organization id. Defaults to the GCP project id. Immutable.
     */
    organizationId?: string;
    /**
     * AppGroup name (`A-Z0-9._-$ %`). If omitted, a unique name is
     * generated. Immutable.
     */
    appgroupId?: string;
    /**
     * Name shown in the UI.
     */
    displayName?: string;
    /**
     * Contact email for the AppGroup.
     */
    email?: string;
    /**
     * Channel identifier of the owner maintaining this grouping.
     */
    channelId?: string;
    /**
     * Reference to the associated storefront or marketplace.
     */
    channelUri?: string;
    /**
     * `active` or `inactive`. Status is synced via the update `action`
     * query parameter.
     * @default "active"
     */
    status?: string;
    /**
     * Customer attributes. Alchemy ownership attributes are merged in
     * automatically so `list` / nuke can find the group.
     */
    attributes?: Attribute[];
};
export type Appgroup = Resource<"GCP.Apigee.Appgroup", AppgroupProps, {
    /** Full resource name `organizations/{org}/appgroups/{appgroup}`. */
    name: string;
    /** AppGroup id. */
    appgroupId: string;
    /** Organization id. */
    organizationId: string;
    /** Project id. */
    project: string;
    /** Display name. */
    displayName: string | undefined;
    /** Contact email. */
    email: string | undefined;
    /** Channel id. */
    channelId: string | undefined;
    /** Channel URI. */
    channelUri: string | undefined;
    /** `active` or `inactive`. */
    status: string | undefined;
    /** User attributes (Alchemy ownership attributes stripped). */
    attributes: Attribute[];
    /** Internal AppGroup id. */
    appGroupId: string | undefined;
    /** Creation time in milliseconds since epoch. */
    createdAt: string | undefined;
    /** Last modification time in milliseconds since epoch. */
    lastModifiedAt: string | undefined;
}, never, Providers>;
/**
 * An Apigee AppGroup — a logical grouping of apps that share credentials.
 *
 * AppGroups have no labels field. Alchemy stamps ownership into
 * attributes so `list` / nuke can find them. The name is immutable.
 *
 * ### Creating an AppGroup
 * **Example:** Generated name
 * ```typescript
 * const group = yield* GCP.Apigee.Appgroup("Partners", {
 *   displayName: "Partners",
 *   email: "partners@example.com",
 * });
 * ```
 *
 * **Example:** Inactive group
 * ```typescript
 * const group = yield* GCP.Apigee.Appgroup("Partners", {
 *   appgroupId: "partners",
 *   status: "inactive",
 * });
 * ```
 *
 * @resource
 * @category Apigee
 */
export declare const Appgroup: import("alchemy/Resource").ResourceClass<Appgroup>;
declare const AppgroupNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.Apigee.AppgroupNotResolved";
} & Readonly<A>;
export declare class AppgroupNotResolved extends AppgroupNotResolved_base<{
    resourceName: string;
}> {
}
export declare const AppgroupProvider: () => import("effect/Layer").Layer<Provider.Provider<Appgroup>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | apigee.GcpOpContext>;
export {};

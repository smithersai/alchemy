import * as cci from "@distilled.cloud/gcp/contactcenterinsights_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
export type AuthorizedViewSetProps = {
    /**
     * AuthorizedViewSet id (the `{authorized_view_set}` segment of
     * `projects/{project}/locations/{location}/authorizedViewSets/{authorized_view_set}`).
     * If omitted, a unique id is generated. Must match
     * `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`. Immutable — changing it replaces
     * the set.
     */
    authorizedViewSetId?: string;
    /**
     * Location (`us-central1`, …). Immutable — changing it replaces the set.
     * `US-CENTRAL1` is accepted and normalized to `us-central1`.
     * @default the stack's GCP region (`GCP.Region`, else the profile region, else `us-central1`)
     */
    location?: string;
    /**
     * Display name (max 64 characters including Alchemy's ownership
     * marker). AuthorizedViewSets have no labels field, so ownership is
     * stored in a `[alchemy …]` prefix and stripped from attributes.
     */
    displayName?: string;
};
export type AuthorizedViewSet = Resource<"GCP.ContactCenterInsights.AuthorizedViewSet", AuthorizedViewSetProps, {
    /** Full resource name `projects/{project}/locations/{location}/authorizedViewSets/{authorized_view_set}`. */
    name: string;
    /** AuthorizedViewSet id (last path segment). */
    authorizedViewSetId: string;
    /** Location id. */
    location: string;
    /** Project id. */
    project: string;
    /** User display name with the Alchemy ownership prefix stripped. */
    displayName: string | undefined;
    /** RFC3339 creation timestamp. */
    createTime: string | undefined;
    /** RFC3339 last-update timestamp. */
    updateTime: string | undefined;
}, never, Providers>;
/**
 * A Contact Center AI Insights AuthorizedViewSet, a container for
 * AuthorizedView resources.
 *
 * AuthorizedViewSets have no labels field — Alchemy stamps ownership into
 * the display name. Location and id are immutable. Display name updates
 * in place.
 *
 * ### Creating an AuthorizedViewSet
 * **Example:** Generated id
 * ```typescript
 * const set = yield* GCP.ContactCenterInsights.AuthorizedViewSet("QaViews", {
 *   displayName: "qa-reviewers",
 * });
 * ```
 *
 * **Example:** Named set
 * ```typescript
 * const set = yield* GCP.ContactCenterInsights.AuthorizedViewSet("QaViews", {
 *   authorizedViewSetId: "qa-reviewers",
 *   displayName: "qa-reviewers",
 * });
 * ```
 *
 * @resource
 * @category ContactCenterInsights
 */
export declare const AuthorizedViewSet: import("alchemy/Resource").ResourceClass<AuthorizedViewSet>;
declare const AuthorizedViewSetNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.ContactCenterInsights.AuthorizedViewSetNotResolved";
} & Readonly<A>;
export declare class AuthorizedViewSetNotResolved extends AuthorizedViewSetNotResolved_base<{
    resourceName: string;
}> {
}
export declare const AuthorizedViewSetProvider: () => import("effect/Layer").Layer<Provider.Provider<AuthorizedViewSet>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | cci.GcpOpContext>;
export {};

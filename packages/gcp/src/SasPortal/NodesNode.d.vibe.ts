import * as sasportal from "@distilled.cloud/gcp/sasportal_v1alpha1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
export type NodesNodeProps = {
    /**
     * Parent SAS node, as `nodes/{node}` or
     * `customers/{customer}/nodes/{node}`. Immutable — changing it
     * replaces the child node.
     */
    parent: string;
    /**
     * Server-assigned node resource name. Immutable — changing it
     * replaces the node.
     */
    name?: string;
    /**
     * Display name. SAS Portal nodes have no labels field, so Alchemy
     * stamps ownership into a `[alchemy …]` prefix and strips it from
     * attributes.
     */
    displayName?: string;
    /**
     * SAS user ids used by devices that belong to this node.
     */
    sasUserIds?: string[];
};
export type NodesNode = Resource<"GCP.SasPortal.NodesNode", NodesNodeProps, {
    /** Resource name of the child node. */
    name: string;
    /** Node id (last path segment). */
    nodeId: string;
    /** Parent node resource name. */
    parent: string;
    /** Project id used when the node was reconciled. */
    project: string;
    /** User-facing display name with the Alchemy prefix stripped. */
    displayName: string | undefined;
    /** SAS user ids on the node. */
    sasUserIds: string[] | undefined;
}, never, Providers>;
/**
 * A Spectrum Access System (SAS) Portal node nested under another node.
 *
 * SAS Portal nodes have no labels field, so Alchemy stamps ownership
 * into `displayName` for `list` / nuke. Parent node is identity.
 * Display name and SAS user ids update in place.
 *
 * ### Creating a Child Node
 * **Example:** Under a customer node
 * ```typescript
 * const child = yield* GCP.SasPortal.NodesNode("Sector", {
 *   parent: node.name,
 *   displayName: "sector-1",
 * });
 * ```
 *
 * ### Updating a Child Node
 * Change props on the same logical id; the engine keeps the physical id.
 *
 * **Example:** Rename
 * ```typescript
 * const child = yield* GCP.SasPortal.NodesNode("Sector", {
 *   parent: node.name,
 *   displayName: "sector-2",
 * });
 * ```
 *
 * @resource
 * @category SasPortal
 */
export declare const NodesNode: import("alchemy/Resource").ResourceClass<NodesNode>;
declare const NodesNodeNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.SasPortal.NodesNodeNotResolved";
} & Readonly<A>;
export declare class NodesNodeNotResolved extends NodesNodeNotResolved_base<{
    parent: string;
    resourceName: string;
}> {
}
export declare const NodesNodeProvider: () => import("effect/Layer").Layer<Provider.Provider<NodesNode>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | sasportal.GcpOpContext>;
export {};

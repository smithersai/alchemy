import * as discoveryengine from "@distilled.cloud/gcp/discoveryengine_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
export type CollectionsDataStoresSessionProps = {
    /**
     * Parent data store resource name. Immutable — changing it replaces
     * the session.
     */
    dataStore: string;
    /**
     * Session id (`[a-z0-9]`, 1-63 characters). If omitted, a unique id is
     * generated. Immutable — changing it replaces the session.
     */
    sessionId?: string;
    /**
     * Display name used in the UI (max 128 characters).
     */
    displayName?: string;
    /**
     * Session state.
     * @default "IN_PROGRESS"
     */
    state?: "STATE_UNSPECIFIED" | "IN_PROGRESS" | (string & {});
    /**
     * End-user id.
     */
    userPseudoId?: string;
    /**
     * Session labels.
     */
    labels?: string[];
    /**
     * Pin the session to the top of the session list.
     * @default false
     */
    isPinned?: boolean;
};
export type CollectionsDataStoresSession = Resource<"GCP.DiscoveryEngine.CollectionsDataStoresSession", CollectionsDataStoresSessionProps, {
    /** Full resource name. */
    name: string;
    /** Session id. */
    sessionId: string;
    /** Parent data store resource name. */
    dataStore: string;
    /** Project id. */
    project: string;
    /** Location id. */
    location: string;
    /** Display name. */
    displayName: string | undefined;
    /** Session state. */
    state: string | undefined;
    /** End-user id. */
    userPseudoId: string | undefined;
    /** Labels. */
    labels: string[];
    /** Whether the session is pinned. */
    isPinned: boolean;
    /** RFC3339 start time. */
    startTime: string | undefined;
    /** RFC3339 end time. */
    endTime: string | undefined;
}, never, Providers>;
/**
 * A Discovery Engine session on a collection data store.
 *
 * Without labels, ownership rests on the deterministic id: `read` reports a
 * resource it finds without prior state as unowned (adopt it with `--adopt`).
 * Parent and session id are immutable.
 *
 * ### Creating a Session
 * **Example:** Pinned session
 * ```typescript
 * const store = yield* GCP.DiscoveryEngine.CollectionsDataStore("Docs", {});
 * const session = yield* GCP.DiscoveryEngine.CollectionsDataStoresSession(
 *   "Chat",
 *   {
 *     dataStore: store.name,
 *     displayName: "support chat",
 *     isPinned: true,
 *   },
 * );
 * ```
 *
 * @resource
 * @category DiscoveryEngine
 */
export declare const CollectionsDataStoresSession: import("alchemy/Resource").ResourceClass<CollectionsDataStoresSession>;
declare const CollectionsDataStoresSessionNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.DiscoveryEngine.CollectionsDataStoresSessionNotResolved";
} & Readonly<A>;
export declare class CollectionsDataStoresSessionNotResolved extends CollectionsDataStoresSessionNotResolved_base<{
    resourceName: string;
}> {
}
export declare const CollectionsDataStoresSessionProvider: () => import("effect/Layer").Layer<Provider.Provider<CollectionsDataStoresSession>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | discoveryengine.GcpOpContext>;
export {};

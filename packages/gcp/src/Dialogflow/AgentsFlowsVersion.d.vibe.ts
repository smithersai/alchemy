import * as dialogflow from "@distilled.cloud/gcp/dialogflow_v3";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
export type AgentsFlowsVersionProps = {
    /**
     * Parent flow resource name
     * `projects/{project}/locations/{location}/agents/{agent}/flows/{flow}`.
     * Immutable — changing it replaces the version.
     */
    flow: string;
    /**
     * Version id (the `{version}` segment). Server-assigned on create.
     * Immutable — changing it replaces the version.
     */
    versionId?: string;
    /** Human-readable name, unique within the flow. */
    displayName?: string;
    /**
     * Description. Versions have no labels field, so Alchemy stamps
     * ownership into this field for `list` / nuke.
     */
    description?: string;
};
export type AgentsFlowsVersion = Resource<"GCP.Dialogflow.AgentsFlowsVersion", AgentsFlowsVersionProps, {
    /** Full resource name. */
    name: string;
    /** Version id (last path segment). */
    versionId: string;
    /** Parent flow resource name. */
    flow: string;
    /** Project id. */
    project: string;
    /** Location id. */
    location: string;
    /** Display name. */
    displayName: string | undefined;
    /** User description with the Alchemy ownership prefix stripped. */
    description: string | undefined;
    /** Version state (`RUNNING`, `SUCCEEDED`, `FAILED`). */
    state: string | undefined;
    /** RFC3339 creation timestamp. */
    createTime: string | undefined;
}, never, Providers>;
/**
 * A Dialogflow CX flow version (snapshot of a flow).
 *
 * Versions have no labels field, so Alchemy stamps ownership into
 * `description` for `list` / nuke. Parent flow and version id are
 * immutable. Display name and description update in place. Creating a
 * version is a long-running operation.
 *
 * ### Creating a Version
 * **Example:** Snapshot
 * ```typescript
 * const version = yield* GCP.Dialogflow.AgentsFlowsVersion("V1", {
 *   flow: flow.name,
 *   displayName: "v1",
 *   description: "initial snapshot",
 * });
 * ```
 *
 * ### Updating a Version
 * Change props on the same logical id; the engine keeps the physical id.
 *
 * **Example:** Rename
 * ```typescript
 * const version = yield* GCP.Dialogflow.AgentsFlowsVersion("V1", {
 *   flow: flow.name,
 *   displayName: "v1-ga",
 *   description: "ga snapshot",
 * });
 * ```
 *
 * @resource
 * @category Dialogflow
 */
export declare const AgentsFlowsVersion: import("alchemy/Resource").ResourceClass<AgentsFlowsVersion>;
declare const AgentsFlowsVersionNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.Dialogflow.AgentsFlowsVersionNotResolved";
} & Readonly<A>;
export declare class AgentsFlowsVersionNotResolved extends AgentsFlowsVersionNotResolved_base<{
    resourceName: string;
}> {
}
export declare const AgentsFlowsVersionProvider: () => import("effect/Layer").Layer<Provider.Provider<AgentsFlowsVersion>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | dialogflow.GcpOpContext>;
export {};

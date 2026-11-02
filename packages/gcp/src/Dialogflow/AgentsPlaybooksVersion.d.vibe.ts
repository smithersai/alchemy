import * as dialogflow from "@distilled.cloud/gcp/dialogflow_v3";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.ts";
import type { Providers } from "../Providers.ts";
export type AgentsPlaybooksVersionProps = {
    /**
     * Parent playbook resource name
     * `projects/{project}/locations/{location}/agents/{agent}/playbooks/{playbook}`.
     * Immutable — changing it replaces the version.
     */
    playbook: string;
    /**
     * Version id (the `{version}` segment). Server-assigned when omitted.
     * Immutable — changing it replaces the version.
     */
    versionId?: string;
    /**
     * Snapshot description. Playbook versions have no labels field, so
     * Alchemy stamps ownership into this field and strips it from
     * attributes. Versions are immutable snapshots — changing the
     * description after create is a no-op.
     */
    description?: string;
};
export type AgentsPlaybooksVersion = Resource<"GCP.Dialogflow.AgentsPlaybooksVersion", AgentsPlaybooksVersionProps, {
    /** Full resource name `.../playbooks/{playbook}/versions/{version}`. */
    name: string;
    /** Version id (last path segment). */
    versionId: string;
    /** Parent playbook resource name. */
    playbook: string;
    /** Location id. */
    location: string;
    /** Project id. */
    project: string;
    /** User description with the Alchemy ownership prefix stripped. */
    description: string | undefined;
    /** RFC3339 snapshot timestamp. */
    updateTime: string | undefined;
}, never, Providers>;
/**
 * A Dialogflow CX playbook version (immutable snapshot of a playbook).
 *
 * Versions have no labels field and no update RPC — Alchemy stamps
 * ownership into `description` so `list` / nuke can find them. Reconcile
 * is observe-ensure: if the snapshot is missing it is created; later
 * description edits are ignored.
 *
 * ### Creating a Playbook Version
 * **Example:** Snapshot
 * ```typescript
 * const version = yield* GCP.Dialogflow.AgentsPlaybooksVersion("v1", {
 *   playbook: playbook.name,
 *   description: "initial",
 * });
 * ```
 *
 * @resource
 * @category Dialogflow
 */
export declare const AgentsPlaybooksVersion: import("alchemy/Resource").ResourceClass<AgentsPlaybooksVersion>;
declare const AgentsPlaybooksVersionNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.Dialogflow.AgentsPlaybooksVersionNotResolved";
} & Readonly<A>;
export declare class AgentsPlaybooksVersionNotResolved extends AgentsPlaybooksVersionNotResolved_base<{
    resourceName: string;
}> {
}
export declare const AgentsPlaybooksVersionProvider: () => import("effect/Layer").Layer<Provider.Provider<AgentsPlaybooksVersion>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | dialogflow.GcpOpContext>;
export {};

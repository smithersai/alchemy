import * as gkebackup from "@distilled.cloud/gcp/gkebackup_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
export type RestoreChannelProps = {
    /**
     * Restore channel id (the `{restoreChannel}` segment of
     * `projects/{project}/locations/{location}/restoreChannels/{restoreChannel}`).
     * If omitted, a unique RFC1035 name is generated from the stack, stage,
     * and logical id. Immutable — changing it replaces the channel.
     */
    restoreChannelId?: string;
    /**
     * Region (`us-central1`, `us-east1`, …). Immutable — changing it
     * replaces the channel. `US-CENTRAL1` is accepted and normalized to
     * `us-central1`.
     * @default the stack's GCP region (`GCP.Region`, profile region, `us-central1`)
     */
    location?: string;
    /**
     * Project that is allowed to restore backups via this channel. Full
     * name `projects/{project}` or a project id. Must differ from the
     * source project. Immutable — changing it replaces the channel.
     */
    destinationProject: string;
    /**
     * Human-readable description.
     */
    description?: string;
    /**
     * User labels. Alchemy ownership labels are merged in automatically.
     */
    labels?: Record<string, string>;
};
export type RestoreChannel = Resource<"GCP.GKEBackup.RestoreChannel", RestoreChannelProps, {
    /** Full resource name. */
    name: string;
    /** Restore channel id (last path segment). */
    restoreChannelId: string;
    /** Project id. */
    project: string;
    /** Location id. */
    location: string;
    /** Destination project resource name. */
    destinationProject: string | undefined;
    /** Destination project id. */
    destinationProjectId: string | undefined;
    /** Human-readable description. */
    description: string | undefined;
    /** User labels (Alchemy ownership labels stripped). */
    labels: Record<string, string>;
    /** Server-generated resource uid. */
    uid: string | undefined;
    /** RFC3339 creation timestamp. */
    createTime: string | undefined;
    /** RFC3339 last-update timestamp. */
    updateTime: string | undefined;
}, never, Providers>;
/**
 * A Backup for GKE restore channel that authorizes restoring backups
 * into a destination project.
 *
 * Changing `restoreChannelId`, `location`, or `destinationProject`
 * replaces the channel. Description and labels update in place.
 *
 * ### Creating a Restore Channel
 * **Example:** Generated name
 * ```typescript
 * const channel = yield* GCP.GKEBackup.RestoreChannel("CrossProject", {
 *   destinationProject: "projects/my-restore-project",
 * });
 * ```
 *
 * **Example:** Explicit id, destination, and labels
 * ```typescript
 * const channel = yield* GCP.GKEBackup.RestoreChannel("CrossProject", {
 *   restoreChannelId: "app-restores",
 *   destinationProject: "projects/my-restore-project",
 *   description: "cross-project restores",
 *   labels: { env: "prod" },
 * });
 * ```
 *
 * ### Updating a Restore Channel
 * **Example:** Description and labels
 * ```typescript
 * const channel = yield* GCP.GKEBackup.RestoreChannel("CrossProject", {
 *   destinationProject: "projects/my-restore-project",
 *   description: "cross-project restores v2",
 *   labels: { env: "prod", team: "platform" },
 * });
 * ```
 *
 * @resource
 * @category GKEBackup
 */
export declare const RestoreChannel: import("alchemy/Resource").ResourceClass<RestoreChannel>;
export declare const RestoreChannelProvider: () => import("effect/Layer").Layer<Provider.Provider<RestoreChannel>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | gkebackup.GcpOpContext>;

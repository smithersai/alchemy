import * as apihub from "@distilled.cloud/gcp/apihub_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
export type RuntimeProjectAttachmentProps = {
    /**
     * Runtime project to attach, as `projects/{project}` or a bare project
     * id. Immutable — changing it replaces the attachment. The attachment
     * id must equal this project's id. Defaults to the stack project.
     */
    runtimeProject?: string;
    /**
     * Attachment id. Must equal the project id of `runtimeProject`. If
     * omitted, that project id is used. Immutable — changing it replaces
     * the attachment.
     */
    runtimeProjectAttachmentId?: string;
    /**
     * Location of the API Hub host (`us-central1`, …). Immutable —
     * changing it replaces the attachment.
     * @default the stack's GCP region (`GCP.Region`, else the profile region, else `us-central1`)
     */
    location?: string;
};
export type RuntimeProjectAttachment = Resource<"GCP.ApiHub.RuntimeProjectAttachment", RuntimeProjectAttachmentProps, {
    /** Full resource name. */
    name: string;
    /** Attachment id (last path segment, equal to the runtime project id). */
    runtimeProjectAttachmentId: string;
    /** Host project id. */
    project: string;
    /** Location id. */
    location: string;
    /** Runtime project resource name (`projects/{number}` on output). */
    runtimeProject: string | undefined;
    /** RFC3339 creation timestamp. */
    createTime: string | undefined;
}, never, Providers>;
/**
 * An API Hub runtime project attachment. Attaching a runtime project
 * lets API Hub discover deployments in that project.
 *
 * Attachments have no labels, description, or display name, and the id
 * is forced to the runtime project id, so `list` cannot stamp ownership.
 * The resource is existence-only: runtime project and location are
 * identity, and there is nothing mutable to sync.
 *
 * ### Creating a Runtime Project Attachment
 * **Example:** Attach the stack project
 * ```typescript
 * const attachment = yield* GCP.ApiHub.RuntimeProjectAttachment(
 *   "Runtime",
 *   {},
 * );
 * ```
 *
 * **Example:** Attach a specific runtime project
 * ```typescript
 * const attachment = yield* GCP.ApiHub.RuntimeProjectAttachment(
 *   "Runtime",
 *   {
 *     runtimeProject: "projects/my-runtime",
 *     location: "us-central1",
 *   },
 * );
 * ```
 *
 * @resource
 * @category ApiHub
 */
export declare const RuntimeProjectAttachment: import("alchemy/Resource").ResourceClass<RuntimeProjectAttachment>;
export declare const RuntimeProjectAttachmentProvider: () => import("effect/Layer").Layer<Provider.Provider<RuntimeProjectAttachment>, never, GcpEnvironment | apihub.GcpOpContext>;

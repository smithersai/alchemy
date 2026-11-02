import * as dataproc from "@distilled.cloud/gcp/dataproc_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.ts";
import type { Providers } from "../Providers.ts";
import type { WorkflowTemplateProps } from "./WorkflowTemplate.vibe";
export type RegionsWorkflowTemplateProps = Omit<WorkflowTemplateProps, "location"> & {
    /**
     * Region (`us-central1`, …). Immutable — changing it replaces the
     * template. `US-CENTRAL1` is accepted and normalized to `us-central1`.
     * @default the stack's GCP region (`GCP.Region`, profile region, `us-central1`)
     */
    region?: string;
};
export type RegionsWorkflowTemplate = Resource<"GCP.Dataproc.RegionsWorkflowTemplate", RegionsWorkflowTemplateProps, {
    /** Full resource name `projects/{project}/regions/{region}/workflowTemplates/{template}`. */
    name: string;
    /** Template id (last path segment). */
    templateId: string;
    /** Project id. */
    project: string;
    /** Region id. */
    region: string;
    /** User labels (Alchemy ownership labels stripped). */
    labels: Record<string, string>;
    /** Server version used for optimistic updates. */
    version: number | undefined;
    /** DAG timeout. */
    dagTimeout: string | undefined;
    /** RFC3339 creation timestamp. */
    createTime: string | undefined;
    /** RFC3339 last-update timestamp. */
    updateTime: string | undefined;
}, never, Providers>;
/**
 * A Dataproc workflow template (regions API).
 *
 * Same resource as {@link WorkflowTemplate} addressed via
 * `projects/{project}/regions/{region}/workflowTemplates/{template}`.
 *
 * ### Creating a Template
 * **Example:** Generated name
 * ```typescript
 * const template = yield* GCP.Dataproc.RegionsWorkflowTemplate("Nightly", {});
 * ```
 *
 * **Example:** Explicit id and labels
 * ```typescript
 * const template = yield* GCP.Dataproc.RegionsWorkflowTemplate("Nightly", {
 *   templateId: "nightly-etl-reg",
 *   region: "us-central1",
 *   labels: { env: "prod" },
 * });
 * ```
 *
 * @resource
 * @category Dataproc
 */
export declare const RegionsWorkflowTemplate: import("alchemy/Resource").ResourceClass<RegionsWorkflowTemplate>;
declare const RegionsWorkflowTemplateNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.Dataproc.RegionsWorkflowTemplateNotResolved";
} & Readonly<A>;
export declare class RegionsWorkflowTemplateNotResolved extends RegionsWorkflowTemplateNotResolved_base<{
    resourceName: string;
}> {
}
export declare const RegionsWorkflowTemplateProvider: () => import("effect/Layer").Layer<Provider.Provider<RegionsWorkflowTemplate>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | dataproc.GcpOpContext>;
export {};

import * as GCP from "@alchemy.run/gcp";
import * as Effect from "effect/Effect";
declare const Drain_base: Effect.Effect<import("effect/Pipeable").Pipeable & import("alchemy").ResourceLike<"GCP.Run.Job", GCP.Run.JobProps, {
    name: string;
    jobId: string;
    project: string;
    location: string;
    labels: Record<string, string>;
    annotations: Record<string, string>;
    uid: string | undefined;
    generation: string | undefined;
    reconciling: boolean;
    createTime: string | undefined;
    updateTime: string | undefined;
    executionCount: number | undefined;
    terminalConditionState: string | undefined;
    latestCreatedExecutionName: string | undefined;
    image: string | undefined;
    maxRetries: number | undefined;
    timeout: string | undefined;
    taskCount: number | undefined;
    parallelism: number | undefined;
    serviceAccount: string | undefined;
    serviceAccountUniqueId: string | undefined;
    managedServiceAccount: boolean;
    iamGrants: import("@alchemy.run/gcp/Host").AppliedIamGrant[];
    codeHash: string | undefined;
}, import("@alchemy.run/gcp/Host").GcpHostBinding, GCP.Providers> & {
    bind(sid: import("alchemy").Input<string>, binding: import("alchemy").Input<import("@alchemy.run/gcp/Host").GcpHostBinding>): Effect.Effect<void>;
    bind(template: TemplateStringsArray, ...args: any[]): (binding: import("alchemy").Input<import("@alchemy.run/gcp/Host").GcpHostBinding>) => Effect.Effect<void>;
} & {
    name: import("alchemy").Output<string, never>;
    jobId: import("alchemy").Output<string, never>;
    project: import("alchemy").Output<string, never>;
    location: import("alchemy").Output<string, never>;
    labels: import("alchemy/Output").ObjectExpr<Record<string, string>, never>;
    annotations: import("alchemy/Output").ObjectExpr<Record<string, string>, never>;
    uid: import("alchemy").Output<string | undefined, never>;
    generation: import("alchemy").Output<string | undefined, never>;
    reconciling: import("alchemy").Output<boolean, never>;
    createTime: import("alchemy").Output<string | undefined, never>;
    updateTime: import("alchemy").Output<string | undefined, never>;
    executionCount: import("alchemy").Output<number | undefined, never>;
    terminalConditionState: import("alchemy").Output<string | undefined, never>;
    latestCreatedExecutionName: import("alchemy").Output<string | undefined, never>;
    image: import("alchemy").Output<string | undefined, never>;
    maxRetries: import("alchemy").Output<number | undefined, never>;
    timeout: import("alchemy").Output<string | undefined, never>;
    taskCount: import("alchemy").Output<number | undefined, never>;
    parallelism: import("alchemy").Output<number | undefined, never>;
    serviceAccount: import("alchemy").Output<string | undefined, never>;
    serviceAccountUniqueId: import("alchemy").Output<string | undefined, never>;
    managedServiceAccount: import("alchemy").Output<boolean, never>;
    iamGrants: import("alchemy").Output<import("@alchemy.run/gcp/Host").AppliedIamGrant[], never>;
    codeHash: import("alchemy").Output<string | undefined, never>;
} & import("alchemy").Rpc<Drain>, never, GCP.Providers> & import("alchemy").Named<"Drain"> & import("alchemy").PlatformIdentity<"Drain"> & (new (_: never) => {
    run: Effect.Effect<void, never, import("alchemy").RuntimeContext>;
} & import("alchemy").Named<"Drain"> & import("alchemy/Named").Tag<"GCP.Run.Job">);
/**
 * The batch half of the pipeline: drain Pub/Sub into BigQuery.
 *
 * A Cloud Run Job is the right host for this. It runs to completion and
 * exits, so nothing is billed between drains, and Cloud Scheduler or an
 * operator can start it whenever a batch is due.
 *
 * The order matters: insert first, ack second. A crash between them
 * redelivers the batch and duplicates rows, which a `SELECT DISTINCT id`
 * removes; acking first would lose events outright.
 */
export default class Drain extends Drain_base {
}
export {};

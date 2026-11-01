import * as AWS from "@alchemy.run/aws";
import * as Kubernetes from "@alchemy.run/kubernetes";
import * as Effect from "effect/Effect";
/**
 * The HIGH-LEVEL tier: an effectful `Kubernetes.Job` running ON HyperPod
 * nodes, written in plain Kubernetes vocabulary. The Effect program is
 * bundled into a generated image (`main: import.meta.url`), and the
 * HyperPod resources expose everything the job needs as attributes
 * referenced through the resource graph:
 *
 * - `quota.namespace` — the governed `hyperpod-ns-<team>` namespace,
 * - `quota.queueName` — the team's Kueue LocalQueue, set under the
 *   well-known `KUEUE_QUEUE_NAME_LABEL`,
 * - `instanceGroups.workers.nodeSelector` — health-checked nodes of the
 *   `workers` group (typed per key; a typo'd group name is a compile
 *   error).
 *
 * Swap `run` for a real training/eval harness; bindings (DynamoDB, S3, SQS,
 * ...) resolve in init and land IAM on the pod-identity role, exactly like
 * any other Kubernetes Job on EKS.
 */
declare const _default: Effect.Effect<Kubernetes.Job & import("alchemy").Rpc<{
    run: Effect.Effect<void, never, never>;
}> & import("alchemy").Named<"TrainJob">, never, import("effect/process/ChildProcessSpawner").ChildProcessSpawner | import("@distilled.cloud/aws/Credentials").Credentials | import("effect/FileSystem").FileSystem | import("effect/http/HttpClient").HttpClient | import("effect/Path").Path | Kubernetes.Providers | AWS.Providers | AWS.Region | import("effect/Scope").Scope | import("alchemy").Stack> & import("alchemy").Named<"TrainJob"> & import("alchemy").PlatformIdentity<"TrainJob">;
export default _default;

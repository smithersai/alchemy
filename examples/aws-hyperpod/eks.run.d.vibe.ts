import * as AWS from "@alchemy.run/aws";
import * as Kubernetes from "@alchemy.run/kubernetes";
/**
 * An EKS-orchestrated SageMaker HyperPod cluster with every DX tier:
 *
 * - `src/eks-infra.ts` — network → EKS control plane → HyperPod cluster →
 *   task governance (the amazon-sagemaker-hyperpod-taskgovernance add-on,
 *   an `AWS.SageMaker.ClusterSchedulerConfig` policy, and a team
 *   `AWS.SageMaker.ComputeQuota`),
 * - LOW LEVEL: a raw batch/v1 Job applied via `Kubernetes.Manifest`, pinned
 *   to HyperPod nodes with the well-known node labels and submitted
 *   through task governance with the Kueue labels (below),
 * - HIGH LEVEL: `src/TrainJob.ts`, an effectful `Kubernetes.Job` bundled from
 *   TypeScript and pinned + governed through HyperPod resource attributes
 *   (`quota.namespace`, `quota.queueName`, the group's `nodeSelector`).
 *
 * Deploy with `bun alchemy deploy --config ./eks.run.ts`. The EKS control plane
 * takes ~10-15 minutes and the HyperPod cluster another ~10-20.
 */
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    eksClusterName: Alchemy.Output<string, never>;
    hyperpodClusterArn: Alchemy.Output<string, never>;
    hyperpodStatus: Alchemy.Output<import("@distilled.cloud/aws/sagemaker").ClusterStatus, never>;
    schedulerPolicyId: Alchemy.Output<string, never>;
    researchTeam: Alchemy.Output<string, never>;
    governedJobName: Alchemy.Output<string, never>;
    trainJobName: Alchemy.Output<string, never>;
}, NoInfer<import("effect/process/ChildProcessSpawner").ChildProcessSpawner | import("@distilled.cloud/aws/Credentials").Credentials | import("effect/FileSystem").FileSystem | import("effect/http/HttpClient").HttpClient | import("effect/Path").Path | Kubernetes.Providers | AWS.Providers | AWS.Region | import("effect/Scope").Scope | Alchemy.Stack>>;
export default _default;

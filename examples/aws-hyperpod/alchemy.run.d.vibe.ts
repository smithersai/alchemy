import * as AWS from "@alchemy.run/aws";
/**
 * A minimal SageMaker HyperPod training cluster:
 *
 * - a lifecycle-script bucket + instance execution role (`src/infra.ts`),
 * - a deploy-time Action that uploads `on_create.sh` to the bucket
 *   (`src/lifecycle.ts`) — bucket → script → cluster ordering is inferred
 *   from the data flow,
 * - a Slurm-orchestrated `AWS.SageMaker.Cluster` with one instance group.
 *
 * The demo instance group is a single ml.t3.medium to keep the example
 * cheap; swap in ml.g5/ml.p5 groups (and more of them) for real training.
 * Provisioning takes ~5 minutes at this size, 10-25 minutes for large GPU
 * groups.
 */
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    clusterName: Alchemy.Output<string, never>;
    clusterArn: Alchemy.Output<string, never>;
    clusterStatus: Alchemy.Output<import("@distilled.cloud/aws/sagemaker").ClusterStatus, never>;
    lifecycleBucket: Alchemy.Output<string, never>;
}, NoInfer<import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | AWS.Providers | Alchemy.Stack>>;
export default _default;

import * as AWS from "@alchemy.run/aws";
import * as Kubernetes from "@alchemy.run/kubernetes";
/**
 * A "guestbook" app on EKS Auto Mode that exercises the full Kubernetes
 * container surface:
 *
 * - a stack-owned network + `compute: "auto"` cluster + DynamoDB table +
 *   a namespace applied as a raw manifest via `Kubernetes.Manifest` (`src/infra.ts`),
 * - `Api` — an effectful `Kubernetes.Deployment` (bundled `main:` image source)
 *   behind an internet-facing NLB with DynamoDB bindings on the pod-identity
 *   role, plus the typed `podTemplate` escape hatch (`src/Api.ts`),
 * - `Web` — an EXTERNAL `Kubernetes.Deployment` (registry `image:` source, no
 *   Effect runtime in the container), nginx behind its own NLB,
 * - `SeedJob` — an inline-effect one-shot `Kubernetes.Job` (`{ run }`) that
 *   seeds the guestbook table when the batch/v1 Job is applied on deploy
 *   (`src/SeedJob.ts`).
 */
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    clusterName: Alchemy.Output<string, never>;
    apiUrl: Alchemy.Output<string | undefined, never>;
    webUrl: Alchemy.Output<string | undefined, never>;
    tableName: Alchemy.Output<string, never>;
    namespace: Alchemy.Output<string, never>;
    seedJobName: Alchemy.Output<string, never>;
}, NoInfer<import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | Kubernetes.Providers | AWS.Providers | AWS.Region>>;
export default _default;

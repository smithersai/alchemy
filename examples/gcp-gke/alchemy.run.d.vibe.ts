import * as GCP from "@alchemy.run/gcp";
import * as Kubernetes from "@alchemy.run/kubernetes";
/**
 * A "guestbook" app on GKE Autopilot that exercises the full Kubernetes
 * container surface:
 *
 * - a stack-owned Autopilot cluster + Firestore database + a namespace
 *   applied as a raw manifest via `Kubernetes.Manifest` (`src/infra.ts`),
 * - `Api` — an effectful `Kubernetes.Deployment` (bundled `main:` image source)
 *   behind an external Network Load Balancer, with a Firestore binding
 *   granted to its Kubernetes ServiceAccount's Workload Identity principal,
 *   plus the typed `podTemplate` escape hatch (`src/Api.ts`),
 * - `Web` — an EXTERNAL `Kubernetes.Deployment` (registry `image:` source, no
 *   Effect runtime in the container), nginx behind its own load balancer,
 * - `SeedJob` — an inline-effect one-shot `Kubernetes.Job` (`{ run }`) that
 *   seeds the guestbook database when the batch/v1 Job is applied on deploy
 *   (`src/SeedJob.ts`).
 */
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    clusterId: Alchemy.Output<string, never>;
    clusterName: Alchemy.Output<string, never>;
    apiUrl: Alchemy.Output<string | undefined, never>;
    webUrl: Alchemy.Output<string | undefined, never>;
    databaseName: Alchemy.Output<string, never>;
    namespace: Alchemy.Output<string, never>;
    apiServiceAccount: Alchemy.Output<string, never>;
    seedJobName: Alchemy.Output<string, never>;
    seedJobServiceAccount: Alchemy.Output<string, never>;
}, NoInfer<GCP.Providers | Kubernetes.Providers>>;
export default _default;

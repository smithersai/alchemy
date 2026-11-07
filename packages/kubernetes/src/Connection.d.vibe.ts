import type { Connection, ContainerRegistry } from "./Connection.vibe.throwing.js";
export { toConnection } from "./Connection.vibe.throwing.js";
export type { AuthRegistry, ClusterLike, Connection, ConnectionAuth, ContainerRegistry } from "./Connection.vibe.throwing.js";
/**
 * Connect `Kubernetes.*` workloads to any cluster your local kubeconfig can
 * reach — k3s, kind, on-prem, AKS, GKE, anything `kubectl` works against.
 * Exec credential plugins declared in the file (`aws eks get-token`,
 * `kubelogin`, `gke-gcloud-auth-plugin`) are honored, so cloud-CLI-managed
 * contexts work as-is.
 *
 * This is a plain helper, not a resource: nothing is provisioned and the
 * cluster appears in no plan — it only describes how to reach the API
 * server.
 *
 * ```ts
 * const cluster = Kubernetes.KubeConfig({ context: "prod-east" });
 *
 * const api = yield* Kubernetes.Deployment("Api", {
 *   cluster,
 *   image: "ghcr.io/acme/api:v3",
 *   port: 8080,
 * });
 * ```
 *
 * Add a `registry` to build `main` programs and `context` Dockerfiles for
 * the cluster:
 *
 * ```ts
 * const cluster = Kubernetes.KubeConfig({
 *   context: "prod-east",
 *   registry: { server: "ghcr.io/acme" },
 * });
 * ```
 */
export declare const KubeConfig: (options?: {
    /**
     * Path to the kubeconfig file.
     * @default `$KUBECONFIG` or `~/.kube/config`
     */
    path?: string;
    /**
     * The context to use.
     * @default the file's `current-context`
     */
    context?: string;
    /**
     * Where `main` and `context` workloads push their images. The cluster's
     * nodes must be able to pull from it.
     */
    registry?: ContainerRegistry;
    /**
     * CPU architecture of the cluster's nodes, used as the default image
     * build target.
     * @default "amd64"
     */
    architecture?: "amd64" | "arm64";
}) => Connection;

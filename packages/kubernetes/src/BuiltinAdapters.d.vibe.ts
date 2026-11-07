/**
 * The built-in {@link ClusterAdapter} implementations shipped by
 * `Kubernetes.providers()`: `kubeconfig`, `token`, `client-cert`, and
 * `exec`. They cover any cluster `kubectl` can reach; managed-cloud
 * adapters (EKS's `aws-eks`) are contributed by their provider layers.
 *
 * These adapters are auth-only — no workload identity and no managed image
 * registry. Workloads on such clusters bind through environment variables
 * and run pre-built `image` references (or images pushed by the user's own
 * pipeline).
 */
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import * as ChildProcessSpawner from "effect/process/ChildProcessSpawner";
import { type ClusterAdapterService } from "./ClusterAdapter.ts";
declare const BuiltinAdaptersInvalidProps_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "BuiltinAdaptersInvalidProps";
} & Readonly<A>;
export declare class BuiltinAdaptersInvalidProps extends BuiltinAdaptersInvalidProps_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
/**
 * `kubeconfig` — resolve the cluster and credentials from a kubeconfig
 * file, honoring static tokens, client certificates, and `exec` credential
 * plugins.
 */
export declare const KubeConfigAdapter: Layer.Layer<ClusterAdapterService, never, FileSystem.FileSystem | Path.Path | ChildProcessSpawner.ChildProcessSpawner>;
/** `token` — a static bearer token against an explicit endpoint. */
export declare const TokenAdapter: Layer.Layer<ClusterAdapterService>;
/** `client-cert` — mutual TLS against an explicit endpoint. */
export declare const ClientCertAdapter: Layer.Layer<ClusterAdapterService>;
/**
 * `exec` — mint credentials with a kubeconfig-style exec credential plugin
 * against an explicit endpoint.
 */
export declare const ExecAdapter: Layer.Layer<ClusterAdapterService, never, ChildProcessSpawner.ChildProcessSpawner>;
/** All built-in adapters, merged for `Kubernetes.providers()`. */
export declare const builtinAdapters: () => Layer.Layer<ClusterAdapterService, never, FileSystem.FileSystem | Path.Path | ChildProcessSpawner.ChildProcessSpawner>;
export {};

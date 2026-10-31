import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import * as Storage from "../../globals/Storage.vibe";
import * as Plugin from "../../Plugin.vibe";
import type { BindingHook } from "../../PluginContext.js";
import { ConfigError } from "../../RuntimeError.shared.js";
import type * as WorkerdConfig from "../../workerd/Config.js";
import type { R2BucketProps, R2ServiceProps, S3Credentials } from "./R2BucketOptions.shared.js";
declare const R2Bucket_base: import("effect/Context").ServiceClass<R2Bucket, "cloudflare-runtime/plugin/R2Bucket", Plugin.PluginBuilder<{
    /**
     * Record that a bucket is in use (so the R2 services are only emitted
     * when at least one binding exists) and resolve the service designator
     * the binding should target: the shared `r2` service, with the bucket
     * name carried via designator props.
     *
     * Buckets registered with `s3Credentials` are also served over the local
     * S3-compatible endpoint (`/cdn-cgi/local/r2/s3/{bucketName}`).
     */
    readonly register: (props: R2ServiceProps, options?: {
        readonly s3Credentials?: S3Credentials;
    }) => Effect.Effect<WorkerdConfig.ServiceDesignator>;
}>>;
export declare class R2Bucket extends R2Bucket_base {
}
export declare const R2BucketLive: Layer.Layer<R2Bucket, never, FileSystem.FileSystem | Path.Path | Storage.Storage>;
/**
 * Bind a local R2 bucket (`env.<binding>.get()` / `.put()` / `.list()` /
 * `.delete()` / multipart uploads).
 *
 * Data is persisted under `{storage}/r2`, keyed by the bucket id, so bindings
 * with the same `id` share data (including across workers and restarts when
 * disk-backed storage is configured).
 *
 * With `s3Credentials`, the bucket is also served over the local
 * S3-compatible endpoint at `{worker url}/cdn-cgi/local/r2/s3/{id}` —
 * SigV4-authenticated with those credentials, so S3 clients and presigned
 * URLs (e.g. browser uploads) work against the local bucket.
 */
export declare const local: (props: R2BucketProps) => BindingHook<R2Bucket>;
export declare const remote: (binding: string, bucketName: string, jurisdiction?: string) => Effect.Effect<WorkerdConfig.Worker_Binding, ConfigError, import("../../PluginContext.js").PluginContext | import("../../remote-bindings/RemoteBindings.js").RemoteBindings>;
export {};

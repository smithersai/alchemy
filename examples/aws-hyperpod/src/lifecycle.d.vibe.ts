/**
 * Deploy-time Action that uploads the lifecycle script to the bucket. It
 * runs after the bucket exists (its input captures the bucket's resolved
 * name) and before the cluster is created (the cluster's props capture its
 * output) — the dependency chain is inferred, and the body only re-runs
 * when its input changes.
 */
export declare const UploadLifecycleScript: import("alchemy/Action").ActionClass<never, "UploadLifecycleScript", {
    bucketName: string;
}, {
    sourceS3Uri: string;
    onCreate: string;
}, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;

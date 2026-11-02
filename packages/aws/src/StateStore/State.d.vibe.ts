import type { Credentials } from "@distilled.cloud/aws/Credentials";
import type { Region } from "@distilled.cloud/aws/Region";
import * as s3 from "@distilled.cloud/aws/s3";
import { State, StateStoreError } from "alchemy/State/State";
import * as Effect from "effect/Effect";
import type { HttpClient } from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import * as Scope from "effect/Scope";
import { AWSEnvironment } from "../Environment.ts";
import { type BucketEncryption } from "../S3/Bucket.ts";
export interface S3StateOptions {
    /**
     * A store other than the account's default, by logical name: its bucket is
     * `alchemy-state-<name>-<accountId>-<region>-an`. The bucket is created on
     * first use, except in CI, where `alchemy state bootstrap --backend aws
     * --name <name>` provisions it ahead.
     *
     * @default the account's default store, `alchemy-state-<accountId>-<region>-an`
     */
    name?: string;
    /**
     * A full bucket name instead of one derived from {@link S3StateOptions.name},
     * e.g. an existing bucket. Created on first use like a named store's, in the
     * account-regional namespace, so it must follow the
     * `<prefix>-<accountId>-<region>-an` convention.
     *
     * @see https://docs.aws.amazon.com/AmazonS3/latest/userguide/gpbucketnamespaces.html#account-regional-gp-buckets
     */
    bucketName?: string;
    /**
     * Key prefix within the bucket under which all state objects are
     * stored, e.g. `"alchemy"`. A trailing `/` is appended automatically.
     *
     * @default "" (bucket root)
     */
    prefix?: string;
    /**
     * Default encryption enforced on every fresh state-service initialization.
     * Omission restores AES256, no KMS key, bucket keys disabled, and no blocked
     * encryption types. Set `blockedEncryptionTypes: ["SSE-C"]` to block
     * customer-provided keys. Existing encrypted state objects are not rewritten.
     *
     * @default `{ sseAlgorithm: "AES256", bucketKeyEnabled: false, blockedEncryptionTypes: [] }`
     */
    encryption?: BucketEncryption;
}
/** Whether a state bucket exists. */
export declare const stateBucketExists: (bucket: string) => Effect.Effect<boolean, s3.ParseError | s3.RequestLimitExceeded | s3.SlowDown | import("@distilled.cloud/aws/Errors").CommonErrors, Credentials | HttpClient>;
/** Context required by the distilled S3 operations. */
type S3Deps = Credentials | HttpClient | Region;
/**
 * Run with Debug and Trace records switched off.
 *
 * The AWS client logs every request payload and parsed response at Debug. For
 * this store those are the serialized state objects, whose values include
 * secrets Alchemy generated and keeps, so a Debug floor inherited from where
 * the store is built (the CLI's run log sets one) must not reach them. Floors
 * already stricter than Info are left alone.
 */
export declare const withoutSdkDebugLogs: <XA, E, R>(self: Effect.Effect<XA, E, R>) => Effect.Effect<XA, E, R>;
/**
 * State store backed by an AWS S3 bucket.
 *
 * Stack state is persisted as JSON objects in an account-regional S3
 * bucket, laid out exactly like the local state store's file tree with
 * the bucket (plus optional `prefix`) taking the place of the
 * `.alchemy/state` directory:
 *
 * ```
 * s3://{bucket}/{prefix}{stack}/{stage}/{fqn}.json
 * s3://{bucket}/{prefix}{stack}/{stage}/__stack_output__.json
 * s3://{bucket}/{prefix}{stack}/{stage}/__lease__.json
 * ```
 *
 * Concurrent deploys of one stack and stage share an `__lease__.json`
 * object written with `If-None-Match` / `If-Match`. The second deploy
 * fails immediately instead of mixing rows. The holder refreshes the
 * lease until the store closes. A killed process stops refreshing, the
 * lease expires, and the next deploy can take it.
 *
 * The bucket is created lazily on the first state operation if it does
 * not already exist — nothing touches AWS credentials at layer
 * construction time.
 *
 * ### Using the S3 State Store
 * Pass `AWS.state({ backend: "s3" })` as the `state` option of a Stack. By
 * default the state is stored in an account-regional bucket named
 * `alchemy-state-{accountId}-{region}-an`.
 *
 * **Example:** Default bucket
 * ```typescript
 * import * as Alchemy from "alchemy";
 * import * as AWS from "@alchemy.run/aws";
 *
 * const Stack = Alchemy.Stack(
 *   "my-stack",
 *   { providers: AWS.providers(), state: AWS.state({ backend: "s3" }) },
 *   Effect.gen(function* () {
 *     // ...
 *   }),
 * );
 * ```
 *
 * **Example:** Custom bucket and key prefix
 * ```typescript
 * const Stack = Alchemy.Stack(
 *   "my-stack",
 *   {
 *     providers: AWS.providers(),
 *     state: AWS.state({
 *       name: "my-company-state",
 *       prefix: "alchemy",
 *       encryption: {
 *         sseAlgorithm: "aws:kms",
 *         kmsMasterKeyId: "alias/alchemy-state",
 *       },
 *     }),
 *   },
 *   Effect.gen(function* () {
 *     // ...
 *   }),
 * );
 * ```
 *
 * ### Supplying the AWS Environment
 * The store resolves its account, region and credentials from the configured
 * profile, CI credentials or the ambient AWS environment. Provide an
 * `AWSEnvironment` to use another credential source; provide the same layer
 * to `AWS.providers()` so the state bucket and every resource share it.
 *
 * **Example:** Deploy-role credentials shared with the providers
 * ```typescript
 * const Stack = Alchemy.Stack(
 *   "my-stack",
 *   {
 *     providers: AWS.providers().pipe(Layer.provide(environment)),
 *     state: AWS.state({ name: "my-company-state" }).pipe(Layer.provide(environment)),
 *   },
 *   Effect.gen(function* () {
 *     // ...
 *   }),
 * );
 * ```
 *
 * ### Managing SSE-C Restrictions
 * **Example:** Block customer-provided encryption keys on the state bucket
 * ```typescript
 * const stateStore = AWS.state({
 *   encryption: {
 *     sseAlgorithm: "AES256",
 *     blockedEncryptionTypes: ["SSE-C"],
 *   },
 * });
 * ```
 *
 * Omitted `blockedEncryptionTypes` is equivalent to `[]`: no encryption types
 * are blocked, so SSE-C writes are permitted via AWS's `NONE` value. Removing
 * an explicit block clears it. Omitting `encryption` restores AES256, no KMS
 * key, disabled bucket keys, and no encryption restrictions. Existing objects
 * are not rewritten.
 */
export declare const s3State: (options?: S3StateOptions) => Layer.Layer<AWSEnvironment | Credentials | import("alchemy/Auth/Credentials").CredentialsStore | Region | State, never, import("alchemy").AuthProviders | import("effect/process/ChildProcessSpawner").ChildProcessSpawner | import("effect/FileSystem").FileSystem | HttpClient | import("effect/Path").Path | import("alchemy/Auth/Profile").ProfileStore>;
/**
 * Construct an S3-backed {@link StateService}.
 *
 * Construction itself never touches AWS — environment resolution and
 * the ensure-bucket-exists check are deferred into a cached Effect
 * that runs once, on the first state operation.
 */
export declare const makeS3State: (options?: S3StateOptions) => Effect.Effect<import("alchemy/State/State").StateService, never, AWSEnvironment | Scope.Scope | S3Deps>;
/**
 * Build the default account-regional state bucket name.
 *
 * Account-regional buckets must follow the naming convention:
 *   `<prefix>-<accountId>-<region>-an`
 *
 * @see https://docs.aws.amazon.com/AmazonS3/latest/userguide/gpbucketnamespaces.html#account-regional-gp-buckets
 */
export declare const createStateBucketName: (accountId: string, region: string, name?: string) => string;
/** The profile's AWS environment, resolved the way {@link state} resolves it. */
export declare const stateEnvironment: () => Layer.Layer<AWSEnvironment | Credentials | import("alchemy/Auth/Credentials").CredentialsStore | Region, never, import("alchemy").AuthProviders | import("effect/process/ChildProcessSpawner").ChildProcessSpawner | import("effect/FileSystem").FileSystem | HttpClient | import("effect/Path").Path | import("alchemy/Auth/Profile").ProfileStore>;
/**
 * Create the state bucket with its secure defaults, or converge an existing
 * one to them: what first use of {@link state} does. With `kmsKeyId`,
 * objects are encrypted with that KMS key.
 */
export declare const provisionStateBucket: (bucket: string, region: string, kmsKeyId?: string) => Effect.Effect<void, StateStoreError, S3Deps>;
export {};

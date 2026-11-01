import * as SigV4 from "@distilled.cloud/aws4signer";
import * as Effect from "effect/Effect";
import { Worker, WorkerEnvironment } from "../Workers/Worker.js";
import type { Bucket } from "./Bucket.js";
import type { PresignError } from "./BucketTypes.vibe";
import { type S3CredentialsAccess, type S3CredentialsValue } from "./S3Credentials.js";
/**
 * Shared scaffolding for the R2 presign bindings (`PresignGetObjectToken`,
 * `PresignPutObjectToken`): resolve the bucket's `S3Credentials` and
 * sign each request locally with SigV4. `makeS3Credentials` handles the
 * per-mode wiring (a scoped API token when deployed, the Worker's local S3
 * endpoint under `alchemy dev`).
 *
 * NOT exported from `index.ts`.
 */
export declare const makePresignBinding: <Request>(options: {
    name: string;
    access: S3CredentialsAccess;
    presign: (credentials: S3CredentialsValue, request: Request) => Effect.Effect<string, PresignError>;
}) => Effect.Effect<(bucket: Bucket) => Effect.Effect<(request: Request) => Effect.Effect<string, SigV4.SigningError, import("alchemy").RuntimeContext>, never, never>, never, WorkerEnvironment | Worker<any>>;
export interface PresignR2UrlOptions {
    method: "GET" | "PUT";
    key: string;
    /** @default 900 */
    expiresIn?: number;
    /** Headers the consumer must send verbatim (signed into the URL). */
    headers?: Record<string, string>;
    /** Extra query parameters signed into the URL (e.g. `response-content-type`). */
    query?: Record<string, string>;
}
/**
 * Presign a path-style R2 object URL (`{endpoint}/{bucket}/{key}`) with the
 * given {@link S3CredentialsValue}. Pure SigV4 — no request is made.
 */
export declare const presignR2Url: (credentials: S3CredentialsValue, options: PresignR2UrlOptions) => Effect.Effect<string, PresignError>;

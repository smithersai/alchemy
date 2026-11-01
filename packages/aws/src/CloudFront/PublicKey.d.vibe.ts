import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import * as Redacted from "effect/Redacted";
import type { Providers } from "../Providers.js";
declare const PublicKeyConflict_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "PublicKeyConflict";
} & Readonly<A>;
export declare class PublicKeyConflict extends PublicKeyConflict_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
declare const PublicKeyUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "PublicKeyUnexpectedResponse";
} & Readonly<A>;
export declare class PublicKeyUnexpectedResponse extends PublicKeyUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface PublicKeyProps {
    /**
     * Name of the public key. If omitted, a deterministic name is generated.
     *
     * Names must be unique per AWS account. Changing the name triggers
     * a replacement.
     */
    name?: string;
    /**
     * PEM-encoded public key body. Changing the key material triggers a
     * replacement (CloudFront does not allow rotating an existing public
     * key in place).
     */
    encodedKey: Redacted.Redacted<string> | string;
    /**
     * Optional comment describing the key.
     */
    comment?: string;
}
export interface PublicKey extends Resource<"AWS.CloudFront.PublicKey", PublicKeyProps, {
    /**
     * CloudFront-assigned public key identifier. Used by KeyGroups to
     * reference the key.
     */
    publicKeyId: string;
    /**
     * Name of the public key.
     */
    name: string;
    /**
     * PEM-encoded public key body.
     */
    encodedKey: string;
    /**
     * Caller reference used at create time. Stable across updates.
     */
    callerReference: string;
    /**
     * Most recent entity tag for update/delete operations.
     */
    etag: string | undefined;
    /**
     * Current comment on the key.
     */
    comment: string | undefined;
}, never, Providers> {
}
/**
 * A CloudFront public key.
 *
 * Public keys are uploaded ahead of being grouped into a {@link KeyGroup} and
 * used by Distributions for signed URL or signed cookie verification.
 *
 * The key body is immutable after creation — changing `encodedKey` triggers
 * a replacement (CloudFront returns no API to rotate a key in place).
 * ### Creating Public Keys
 * **Example:** PEM-encoded RSA public key
 * ```typescript
 * const key = yield* PublicKey("SignedUrlKey", {
 *   encodedKey: Redacted.make(yield* fs.readFileString("./public_key.pem")),
 *   comment: "RSA-2048 signed URL key for /private",
 * });
 * ```
 *
 * @resource
 */
export declare const PublicKey: import("alchemy").ResourceClass<PublicKey>;
export declare const PublicKeyProvider: () => import("effect/Layer").Layer<Provider.Provider<PublicKey>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};

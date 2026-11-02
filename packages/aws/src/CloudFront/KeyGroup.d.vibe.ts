import type { Input } from "alchemy/Input";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.ts";
declare const KeyGroupConflict_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "KeyGroupConflict";
} & Readonly<A>;
export declare class KeyGroupConflict extends KeyGroupConflict_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
declare const KeyGroupUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "KeyGroupUnexpectedResponse";
} & Readonly<A>;
export declare class KeyGroupUnexpectedResponse extends KeyGroupUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface KeyGroupProps {
    /**
     * Name of the key group. If omitted, a deterministic name is generated.
     *
     * Names must be unique per AWS account. Changing the name triggers
     * a replacement.
     */
    name?: string;
    /**
     * Public key IDs that belong to the group. Order is preserved.
     */
    items: Input<string>[];
    /**
     * Optional comment describing the group.
     */
    comment?: string;
}
export interface KeyGroup extends Resource<"AWS.CloudFront.KeyGroup", KeyGroupProps, {
    /**
     * CloudFront-assigned key group identifier. Used by Distributions in
     * `TrustedKeyGroups` to authorize signed URLs/cookies.
     */
    keyGroupId: string;
    /**
     * Name of the key group.
     */
    name: string;
    /**
     * Public key IDs that belong to the group.
     */
    items: string[];
    /**
     * Most recent entity tag for update/delete operations.
     */
    etag: string | undefined;
    /**
     * Current comment on the group.
     */
    comment: string | undefined;
}, never, Providers> {
}
/**
 * A CloudFront key group.
 *
 * Key groups bundle one or more {@link PublicKey} resources for use as
 * `TrustedKeyGroups` on a Distribution's cache behavior. CloudFront uses
 * the keys in the group to verify the signatures on signed URLs and
 * signed cookies for that behavior.
 * ### Creating Key Groups
 * **Example:** Group two public keys for signed URL verification
 * ```typescript
 * const primary = yield* PublicKey("PrimarySigningKey", {
 *   encodedKey: yield* fs.readFileString("./primary.pem"),
 * });
 * const secondary = yield* PublicKey("SecondarySigningKey", {
 *   encodedKey: yield* fs.readFileString("./secondary.pem"),
 * });
 *
 * const keyGroup = yield* KeyGroup("SignedUrlKeys", {
 *   comment: "Trusted signers for /private",
 *   items: [primary.publicKeyId, secondary.publicKeyId],
 * });
 * ```
 *
 * @resource
 */
export declare const KeyGroup: import("alchemy").ResourceClass<KeyGroup>;
export declare const KeyGroupProvider: () => import("effect/Layer").Layer<Provider.Provider<KeyGroup>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};

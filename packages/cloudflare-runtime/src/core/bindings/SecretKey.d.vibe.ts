import type { BindingHook } from "../PluginContext.js";
/**
 * Props for a `secret_key` (CryptoKey) binding, mirroring the Cloudflare
 * API's `secret_key` binding shape (WebCrypto `importKey` parameters plus
 * the key material).
 */
export interface SecretKeyProps {
    binding: string;
    /**
     * Data format of the key material — the WebCrypto `importKey` format.
     */
    format: "raw" | "pkcs8" | "spki" | "jwk" | (string & {});
    /**
     * WebCrypto `importKey` algorithm: a name (e.g. `"AES-GCM"`) or a full
     * algorithm object (e.g. `{ name: "HMAC", hash: "SHA-256" }`).
     */
    algorithm: unknown;
    /**
     * Allowed key operations (WebCrypto `keyUsages`).
     */
    usages: ReadonlyArray<string>;
    /**
     * Base64-encoded key material (raw bytes for `"raw"`, DER for `"pkcs8"`
     * / `"spki"`). Required unless `format` is `"jwk"`.
     */
    keyBase64?: string | null | undefined;
    /**
     * Key material in JSON Web Key format (an object, or pre-serialized JSON
     * text). Required when `format` is `"jwk"`.
     */
    keyJwk?: unknown;
    /**
     * Whether the worker may export the key material.
     * @default false
     */
    extractable?: boolean | undefined;
}
export declare const local: (props: SecretKeyProps) => BindingHook;

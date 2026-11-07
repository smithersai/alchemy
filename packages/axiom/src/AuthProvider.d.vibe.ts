import { type StoredAuthConfig } from "alchemy/Auth/StoredAuthProvider";
import * as Redacted from "effect/Redacted";
export declare const AXIOM_AUTH_PROVIDER_NAME = "Axiom";
export type AxiomAuthConfig = StoredAuthConfig;
/**
 * Resolved Axiom credentials. The provider values are a flat record
 * (token + optional orgId/apiBaseUrl); the `apiToken`/`pat` distinction is
 * derived at resolution time from orgId presence — an org id means the token
 * is treated as a personal access token, mirroring how the CI environment
 * resolution has always classified `AXIOM_ORG_ID`.
 */
export type AxiomResolvedCredentials = {
    type: "apiToken";
    apiToken: Redacted.Redacted<string>;
    apiBaseUrl: string;
    orgId?: string;
    source: {
        type: AxiomAuthConfig["method"] | "env";
        details?: string;
    };
} | {
    type: "pat";
    apiToken: Redacted.Redacted<string>;
    apiBaseUrl: string;
    orgId: string;
    source: {
        type: AxiomAuthConfig["method"] | "env";
        details?: string;
    };
};
/**
 * Layer that registers the Axiom {@link AuthProvider} into the
 * {@link AuthProviders} registry when built. Include this in the Axiom
 * `providers()` layer so the alchemy CLI can discover it.
 */
export declare const AxiomAuth: import("effect/Layer").Layer<never, never, import("alchemy/Auth/Registry").AuthProviders | import("effect/FileSystem").FileSystem | import("effect/Path").Path>;
/** Schema of Axiom's inline static-token values. */
export declare const AxiomStoredCredentials: import("effect/Schema").Codec<import("alchemy/Auth/StoredAuthProvider").StoredValues, import("alchemy/Auth/StoredAuthProvider").StoredValues, never, never>;
export type AxiomStoredCredentials = typeof AxiomStoredCredentials.Type;

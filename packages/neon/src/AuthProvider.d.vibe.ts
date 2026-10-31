import { type StoredAuthConfig } from "alchemy/Auth/StoredAuthProvider";
import * as Redacted from "effect/Redacted";
export declare const NEON_AUTH_PROVIDER_NAME = "Neon";
export type NeonAuthConfig = StoredAuthConfig;
export type NeonResolvedCredentials = {
    type: "apiKey";
    apiKey: Redacted.Redacted<string>;
    source: {
        type: NeonAuthConfig["method"] | "env";
        details?: string;
    };
};
/**
 * Layer that registers the Neon {@link AuthProvider} into the
 * {@link AuthProviders} registry.
 */
export declare const NeonAuth: import("effect/Layer").Layer<never, never, import("alchemy/Auth/Registry").AuthProviders | import("effect/FileSystem").FileSystem | import("effect/Path").Path>;

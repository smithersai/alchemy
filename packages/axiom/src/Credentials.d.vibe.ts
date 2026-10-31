import { Credentials } from "@distilled.cloud/axiom/Credentials";
import * as Layer from "effect/Layer";
export { Credentials, CredentialsFromEnv, DEFAULT_API_BASE_URL } from "@distilled.cloud/axiom/Credentials";
/**
 * Build a `Credentials` layer that resolves Axiom credentials via the Alchemy
 * AuthProvider using the configured profile (defaults to "default", overridable
 * with the current Alchemy profile).
 */
export declare const fromAuthProvider: () => Layer.Layer<Credentials, never, import("alchemy/Auth/Registry").AuthProviders | import("alchemy/Auth/Profile").ProfileStore>;

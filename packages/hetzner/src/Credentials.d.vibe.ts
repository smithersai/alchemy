import { Credentials } from "@distilled.cloud/hetzner";
import * as Layer from "effect/Layer";
export { type Config as CredentialsConfig, Credentials, credentials, CredentialsFromEnv, DEFAULT_API_BASE_URL, } from "@distilled.cloud/hetzner";
/**
 * Build a `Credentials` layer that resolves Hetzner credentials via the
 * Alchemy AuthProvider using the configured profile (defaults to "default",
 * overridable with the `ALCHEMY_PROFILE` env/config value).
 *
 * Maps onto `@distilled.cloud/hetzner`'s `{ token, apiBaseUrl }` shape.
 */
export declare const fromAuthProvider: () => Layer.Layer<Credentials, never, import("alchemy/Auth/Registry").AuthProviders | import("alchemy/Auth/Profile").ProfileStore>;

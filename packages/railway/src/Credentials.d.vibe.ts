import { Credentials } from "@distilled.cloud/railway";
import * as Layer from "effect/Layer";
export { type Config as CredentialsConfig, Credentials, CredentialsFromEnv, CredentialsFromToken, DEFAULT_API_BASE_URL, type TokenKind, } from "@distilled.cloud/railway";
/**
 * Build a `Credentials` layer that resolves Railway credentials via the
 * current Alchemy profile, or directly from environment variables in CI.
 *
 * Maps onto `@distilled.cloud/railway`'s
 * `{ token, tokenKind: "account", apiBaseUrl }` shape. Alchemy itself only
 * reads `RAILWAY_API_TOKEN` (account Bearer). Distilled's own
 * `CredentialsFromEnv` also accepts `RAILWAY_TOKEN` / `RAILWAY_PROJECT_TOKEN`
 * as fallbacks.
 */
export declare const fromAuthProvider: () => Layer.Layer<Credentials, never, import("alchemy/Auth/Registry").AuthProviders | import("alchemy/Auth/Profile").ProfileStore>;

import { Credentials } from "@distilled.cloud/stripe";
import * as Layer from "effect/Layer";
export { type Config as CredentialsConfig, Credentials, credentials, CredentialsFromEnv, DEFAULT_API_BASE_URL, } from "@distilled.cloud/stripe";
/**
 * Build a Stripe `Credentials` layer that resolves credentials via the
 * Alchemy AuthProvider using the configured profile (defaults to "default",
 * overridable with the `ALCHEMY_PROFILE` env/config value).
 *
 * Maps onto `@distilled.cloud/stripe`'s `{ apiKey, apiBaseUrl }` shape.
 * Distilled's `Credentials` service is an `Effect<Config>` resolved per
 * request. Environment credentials (`STRIPE_API_KEY`) take precedence;
 * otherwise the selected profile is used.
 */
export declare const fromAuthProvider: () => Layer.Layer<Credentials, never, import("alchemy/Auth/Registry").AuthProviders | import("alchemy/Auth/Profile").ProfileStore>;

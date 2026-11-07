import { type Config, Credentials } from "@distilled.cloud/github/Credentials";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
export { Credentials } from "@distilled.cloud/github/Credentials";
declare module "@distilled.cloud/github/Credentials" {
    interface Credentials {
        readonly kind: "Credentials";
    }
}
/** The User-Agent alchemy sends; GitHub rejects requests without one. */
export declare const USER_AGENT = "alchemy";
/**
 * Distilled credentials for a token on a REST API base URL (`undefined`, from
 * {@link normalizeGitHubBaseUrl}, is github.com).
 */
export declare const config: (token: Redacted.Redacted<string>, apiBaseUrl: string | undefined) => Config;
/**
 * Build a `Credentials` layer from a literal token. Useful for
 * tests or when callers already have a PAT in hand.
 *
 * Pass `baseUrl` to target a GitHub Enterprise instance. It accepts a
 * hostname or URL and is normalized into the REST API base URL — a GitHub
 * Enterprise Server host gets `/api/v3` appended, a `*.ghe.com`
 * data-residency host gets the `api.` prefix.
 */
export declare const fromToken: (token: string | Redacted.Redacted<string>, options?: {
    readonly baseUrl?: string;
}) => Layer.Layer<Credentials, never, never>;
/**
 * Build a `Credentials` layer that reads the token from
 * `GITHUB_ACCESS_TOKEN` or `GITHUB_TOKEN` at layer build time.
 *
 * GitHub Enterprise is resolved from the environment too: `GITHUB_BASE_URL`,
 * `GITHUB_API_URL` (set by GitHub Actions runners), or `GH_HOST` select the
 * host, and on an enterprise host `GH_ENTERPRISE_TOKEN` /
 * `GITHUB_ENTERPRISE_TOKEN` are checked before the standard token variables.
 */
export declare const fromEnv: () => Layer.Layer<Credentials, never, never>;
/**
 * Build a `Credentials` layer that resolves a token via the
 * Alchemy AuthProvider for the configured profile (defaults to
 * the current Alchemy profile).
 *
 * Pass `baseUrl` to hard-code the GitHub host — it takes precedence over
 * whatever host the auth provider resolved from the profile config or
 * environment. `GitHub.providers({ baseUrl })` threads its option here.
 */
export declare const fromAuthProvider: (options?: {
    readonly baseUrl?: string;
}) => Layer.Layer<Credentials, never, import("alchemy/Auth/Registry").AuthProviders | import("alchemy/Auth/Profile").ProfileStore>;

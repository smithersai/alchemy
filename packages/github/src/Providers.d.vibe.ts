import * as Provider from "alchemy/Provider";
import * as Layer from "effect/Layer";
import { type GitHubAuthOptions } from "./AuthProvider.ts";
import * as Credentials from "./Credentials.vibe";
export { Credentials } from "./Credentials.vibe";
declare const Providers_base: Provider.ProviderCollection<Providers, "GitHub">;
export declare class Providers extends Providers_base {
}
export type ProviderRequirements = Layer.Services<ReturnType<typeof providers>>;
export interface ProvidersOptions extends GitHubAuthOptions {
}
/**
 * GitHub resource providers and the GitHub AuthProvider discovered by the CLI.
 *
 * Pass `baseUrl` to pin every GitHub resource to a GitHub Enterprise host
 * without relying on the auth provider's configuration:
 *
 * ```typescript
 * providers: GitHub.providers({ baseUrl: "github.example.com" })
 * ```
 *
 * The auth provider receives the same value, so the configure flow skips the
 * host prompt and authenticates against the pinned host (`gh auth token
 * --hostname`, enterprise token env vars). Individual resources can still
 * override the host per-resource via their own `baseUrl` prop.
 */
export declare const providers: (options?: ProvidersOptions) => Layer.Layer<Credentials.Credentials | import("alchemy/Auth/Credentials").CredentialsStore | import("@distilled.cloud/core/graphql").GqlTransport | import("alchemy/Auth/Profile").ProfileStore | Providers, never, import("alchemy/Auth/Registry").AuthProviders | import("effect/process/ChildProcessSpawner").ChildProcessSpawner | import("effect/FileSystem").FileSystem | import("effect/http/HttpClient").HttpClient | import("effect/Path").Path>;

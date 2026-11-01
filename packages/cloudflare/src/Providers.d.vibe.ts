import * as Command from "alchemy/Command";
import { KeyPair } from "alchemy/KeyPair";
import * as Provider from "alchemy/Provider";
import { Random } from "alchemy/Random";
import * as Layer from "effect/Layer";
import * as Access from "./Access.js";
import * as CloudflareEnvironment from "./CloudflareEnvironment.js";
import * as Containers from "./Containers/index.js";
import * as LoadBalancer from "./LoadBalancer/index.js";
export { Credentials } from "@distilled.cloud/cloudflare/Credentials";
declare const Providers_base: Provider.ProviderCollection<Providers, "Cloudflare">;
export declare class Providers extends Providers_base {
}
export type ProviderRequirements = Layer.Services<ReturnType<typeof providers>>;
/**
 * Cloudflare providers, bindings, and credentials for Worker-based stacks.
 */
export declare const providers: () => Layer.Layer<Access.Access | CloudflareEnvironment.CloudflareEnvironment | Containers.Credentials | import("alchemy/Auth/Credentials").CredentialsStore | import("alchemy/DNS/Adapter").DnsAdapter<any> | import("@alchemy.run/acme/DnsSolver").DnsSolverFactory | import("@alchemy.run/docker/Docker").Docker | import("./Access/GetIdentityProvider.vibe").GetIdentityProvider | import("effect/http/HttpClient").HttpClient | import("alchemy/Auth/Profile").ProfileStore | Provider.Provider<Command.Build> | Provider.Provider<Command.Dev> | Provider.Provider<Command.Exec> | Provider.Provider<KeyPair> | Provider.Provider<LoadBalancer.LoadBalancer> | Provider.Provider<LoadBalancer.Monitor> | Provider.Provider<LoadBalancer.MonitorGroup> | Provider.Provider<LoadBalancer.Pool> | Provider.Provider<Random> | Providers, never, import("alchemy").AlchemyContext | import("alchemy/Artifacts").ArtifactStore | import("alchemy").AuthProviders | import("effect/process/ChildProcessSpawner").ChildProcessSpawner | import("effect/FileSystem").FileSystem | import("effect/http/HttpClient").HttpClient | import("effect/Path").Path | import("effect/Scope").Scope | import("alchemy").Stack | import("alchemy").Stage>;
/**
 * The foundation every effect tree that talks to the Cloudflare API
 * shares — credentials resolved through the Alchemy auth provider,
 * account environment, Access, profile + credential store.
 *
 * Used by {@link providers} and the Cloudflare state store
 * ({@link ../Cloudflare/StateStore/State.ts state}) so that provider
 * lifecycle operations and state-store init/bootstrap probes run under
 * the same services.
 *
 * No retry policy is installed here: every Cloudflare API call already
 * runs under the SDK's `makeDefault` (throttling / 5xx / network, server
 * retry-after hints, bounded backoff) when no policy is in context, and
 * the Cloudflare-specific misleadingly-tagged transient cases (10001
 * "internal error", 10001 "Unable to authenticate request", 10000
 * "Authentication error" under load) are tagged retryable at the source
 * in the SDK's global error map, so that default covers them.
 *
 * Every request goes out over HTTP/1.1 ({@link Http1FetchHttpClient}):
 * Node 26's `fetch` negotiates HTTP/2 by default and funnels the engine's
 * unbounded fan-out onto one session, where undici 8's HTTP/2 path has
 * been resetting streams under load. HTTP/1.1 measured no slower here.
 */
export declare const CloudflareApiLive: () => Layer.Layer<Access.Access | CloudflareEnvironment.CloudflareEnvironment | Containers.Credentials | import("alchemy/Auth/Credentials").CredentialsStore | import("effect/http/HttpClient").HttpClient | import("alchemy/Auth/Profile").ProfileStore, import("effect/PlatformError").PlatformError, import("alchemy").AuthProviders | import("effect/process/ChildProcessSpawner").ChildProcessSpawner | import("effect/FileSystem").FileSystem | import("effect/http/HttpClient").HttpClient | import("effect/Path").Path>;

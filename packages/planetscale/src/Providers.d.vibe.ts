import * as Provider from "alchemy/Provider";
import * as Layer from "effect/Layer";
import * as Credentials from "./Credentials.vibe";
declare const Providers_base: Provider.ProviderCollection<Providers, "Planetscale">;
/**
 * Service tag bundling all PlanetScale providers + auth + credentials. Use
 * `Planetscale.providers()` to materialize the full layer.
 */
export declare class Providers extends Providers_base {
}
export type ProviderRequirements = Layer.Services<ReturnType<typeof providers>>;
/**
 * Build the complete PlanetScale providers Layer. Provide this on a Stack
 * (or via `Effect.provide` at test time) to enable all PlanetScale
 * resources, the AuthProvider registration, and credential resolution.
 *
 * @example
 * ```ts
 * Effect.provide(Planetscale.providers())
 * ```
 */
export declare const providers: () => Layer.Layer<Credentials.Credentials | import("alchemy/Auth/Credentials").CredentialsStore | import("effect/http/HttpClient").HttpClient | import("alchemy/Auth/Profile").ProfileStore | Providers, never, import("alchemy/Auth/Registry").AuthProviders | import("effect/process/ChildProcessSpawner").ChildProcessSpawner | import("effect/crypto/Digest").Digest | import("effect/FileSystem").FileSystem | import("effect/Path").Path | import("effect/crypto/SecureRandom").SecureRandom | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage>;
export {};

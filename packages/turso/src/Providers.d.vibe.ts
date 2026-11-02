import * as Provider from "alchemy/Provider";
import * as Layer from "effect/Layer";
import * as Credentials from "./Credentials.ts";
declare const Providers_base: Provider.ProviderCollection<Providers, "Turso">;
/**
 * Service tag bundling all Turso providers + auth + credentials. Use
 * `Turso.providers()` to materialize the full layer.
 */
export declare class Providers extends Providers_base {
}
export type ProviderRequirements = Layer.Services<ReturnType<typeof providers>>;
/**
 * Build the complete Turso providers Layer: every Turso resource, the
 * Turso AuthProvider registration (so `alchemy profile edit` can configure
 * it), and credential resolution.
 *
 * @example
 * ```ts
 * Alchemy.Stack("App", { providers: Turso.providers() }, ...)
 * ```
 */
export declare const providers: () => Layer.Layer<Credentials.Credentials | import("alchemy/Auth/Credentials").CredentialsStore | import("effect/http/HttpClient").HttpClient | Credentials.Organization | import("alchemy/Auth/Profile").ProfileStore | Providers, never, import("alchemy/Auth/Registry").AuthProviders | import("effect/FileSystem").FileSystem | import("effect/Path").Path | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage>;
export {};

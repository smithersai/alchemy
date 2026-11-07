import * as Provider from "alchemy/Provider";
import * as Layer from "effect/Layer";
import * as Credentials from "./Credentials.vibe";
export { Credentials } from "@distilled.cloud/axiom/Credentials";
declare const Providers_base: Provider.ProviderCollection<Providers, "Axiom">;
export declare class Providers extends Providers_base {
}
export type ProviderRequirements = Layer.Services<ReturnType<typeof providers>>;
/**
 * Axiom providers and credentials. Wires up Dataset, ApiToken, Notifier,
 * Monitor, Dashboard, VirtualField, View and Annotation resources, and
 * registers the Axiom AuthProvider so `alchemy profile edit` can configure it.
 */
export declare const providers: () => Layer.Layer<Credentials.Credentials | import("alchemy/Auth/Credentials").CredentialsStore | import("effect/http/HttpClient").HttpClient | import("alchemy/Auth/Profile").ProfileStore | Providers, never, import("alchemy/Auth/Registry").AuthProviders | import("effect/FileSystem").FileSystem | import("effect/Path").Path | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage>;

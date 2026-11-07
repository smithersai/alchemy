import * as Command from "alchemy/Command";
import * as Provider from "alchemy/Provider";
import * as Layer from "effect/Layer";
import * as Credentials from "./Credentials.vibe";
declare const Providers_base: Provider.ProviderCollection<Providers, "Hetzner">;
export declare class Providers extends Providers_base {
}
export type ProviderRequirements = Layer.Services<ReturnType<typeof providers>>;
/**
 * Build a layer that registers all Hetzner resource providers, the Hetzner
 * `AuthProvider`, the resolved `Credentials`, and an `HttpClient`. Include
 * this from your stack alongside other cloud `providers()` layers.
 *
 * Resource providers are inserted into {@link Provider.collection} as they
 * land.
 *
 * @example
 * ```typescript
 * import * as Alchemy from "alchemy";
 * import * as Hetzner from "@alchemy.run/hetzner";
 * import * as Effect from "effect/Effect";
 *
 * export default Alchemy.Stack(
 *   "MyStack",
 *   {
 *     providers: Hetzner.providers(),
 *     state: Alchemy.localState(),
 *   },
 *   Effect.gen(function* () {
 *     return {};
 *   }),
 * );
 * ```
 */
export declare const providers: () => Layer.Layer<Credentials.Credentials | import("alchemy/Auth/Credentials").CredentialsStore | import("alchemy/DNS/Adapter").DnsAdapter<any> | import("./Environment.ts").HetznerEnvironment | import("effect/http/HttpClient").HttpClient | import("./MountVolume.vibe").MountVolume | import("alchemy/Auth/Profile").ProfileStore | Provider.Provider<Command.Build> | Provider.Provider<Command.Dev> | Provider.Provider<Command.Exec> | Providers | import("./ReadDns.vibe").ReadDns | import("./ReadWriteDns.vibe").ReadWriteDns | import("./Ssh.ts").Ssh | import("./WriteDns.vibe").WriteDns, never, import("alchemy/AlchemyContext").AlchemyContext | import("alchemy/Artifacts").ArtifactStore | import("alchemy/Auth/Registry").AuthProviders | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | import("./Ssh.ts").SshServices>;
export {};

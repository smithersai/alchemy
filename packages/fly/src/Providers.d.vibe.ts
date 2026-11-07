import * as Command from "alchemy/Command";
import * as Provider from "alchemy/Provider";
import * as Layer from "effect/Layer";
import * as Credentials from "./Credentials.ts";
declare const Providers_base: Provider.ProviderCollection<Providers, "Fly">;
export declare class Providers extends Providers_base {
}
export type ProviderRequirements = Layer.Services<ReturnType<typeof providers>>;
/**
 * Build a layer that registers Fly resource providers, the Fly
 * `AuthProvider`, the resolved `Credentials`, and an `HttpClient`. Include
 * this from your stack alongside other cloud `providers()` layers.
 *
 * Resource providers are inserted into {@link Provider.collection} as they
 * land. The collection starts empty so App / Machine / Service agents can
 * make a single minimal insertion.
 *
 * @example
 * ```typescript
 * import * as Alchemy from "alchemy";
 * import * as Fly from "@alchemy.run/fly";
 * import * as Effect from "effect/Effect";
 *
 * export default Alchemy.Stack(
 *   "MyStack",
 *   {
 *     providers: Fly.providers(),
 *     state: Alchemy.localState(),
 *   },
 *   Effect.gen(function* () {
 *     return {};
 *   }),
 * );
 * ```
 */
export declare const providers: () => Layer.Layer<import("./Checkpoint.vibe").Checkpoint | import("./ConnectPostgres.vibe").ConnectPostgres | Credentials.Credentials | import("alchemy/Auth/Credentials").CredentialsStore | import("./Decrypt.vibe").Decrypt | import("./DeleteObject.vibe").DeleteObject | import("./Encrypt.vibe").Encrypt | import("./Exec.vibe").Exec | import("./Environment.ts").FlyEnvironment | import("./GetObject.vibe").GetObject | import("./GetSecret.vibe").GetSecret | import("./HeadObject.vibe").HeadObject | import("effect/http/HttpClient").HttpClient | import("./ListObjectsV2.vibe").ListObjectsV2 | import("./ListSecrets.vibe").ListSecrets | import("./MountVolume.vibe").MountVolume | import("alchemy/Auth/Profile").ProfileStore | Provider.Provider<Command.Build> | Provider.Provider<Command.Dev> | Provider.Provider<Command.Exec> | Providers | import("./PutObject.vibe").PutObject | import("./ReadRedis.vibe").ReadRedis | import("./ReadWriteRedis.vibe").ReadWriteRedis | import("./Sign.vibe").Sign | import("./Verify.vibe").Verify | import("./WriteCertificates.vibe").WriteCertificates | import("./WriteRedis.vibe").WriteRedis | import("./WriteSecret.vibe").WriteSecret, never, import("alchemy/AlchemyContext").AlchemyContext | import("alchemy/Artifacts").ArtifactStore | import("alchemy/Auth/Registry").AuthProviders | import("effect/process/ChildProcessSpawner").ChildProcessSpawner | import("effect/FileSystem").FileSystem | import("effect/Path").Path | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage>;
export {};

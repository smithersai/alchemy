import { Retry } from "@distilled.cloud/aws/Retry";
import * as Command from "alchemy/Command";
import { KeyPair } from "alchemy/KeyPair";
import * as Provider from "alchemy/Provider";
import { Random } from "alchemy/Random";
import * as Layer from "effect/Layer";
import * as Assets from "./Assets.js";
import * as Credentials from "./Credentials.js";
import * as EC2 from "./EC2/index.js";
import * as Region from "./Region.js";
declare const Providers_base: Provider.ProviderCollection<Providers, "AWS">;
export declare class Providers extends Providers_base {
}
/**
 * Every AWS provider, pinned to one AWS environment (account, region and
 * credentials).
 *
 * By default the environment resolves lazily from the configured profile, CI
 * credentials or the ambient AWS environment. Provide your own
 * `AWSEnvironment` to deploy with another credential source, e.g. a role
 * assumed at runtime; provide the same layer to {@link state} so resources and
 * state share it.
 *
 * ```typescript
 * const environment = Layer.effect(
 *   AWS.AWSEnvironment,
 *   Effect.gen(function* () {
 *     const session = yield* assumeDeployRole;
 *     return Effect.succeed({
 *       accountId: session.accountId,
 *       region: session.region,
 *       credentials: session.credentials,
 *     });
 *   }),
 * );
 *
 * const Stack = Alchemy.Stack(
 *   "my-stack",
 *   {
 *     providers: AWS.providers().pipe(Layer.provide(environment)),
 *     state: AWS.state({ bucketName: "my-company-state" }).pipe(Layer.provide(environment)),
 *   },
 *   program,
 * );
 * ```
 */
export declare const providers: () => Layer.Layer<import("./Environment.js").AWSEnvironment | Assets.Assets | import("@alchemy.run/kubernetes").ClusterAdapterService | Credentials.Credentials | import("alchemy/Auth/Credentials").CredentialsStore | import("alchemy/DNS/Adapter").DnsAdapter<any> | import("@alchemy.run/docker/Docker").Docker | EC2.GetAmi | Provider.Provider<Command.Build> | Provider.Provider<Command.Dev> | Provider.Provider<Command.Exec> | Provider.Provider<KeyPair> | Provider.Provider<Random> | Providers | Region.Region | Retry, never, import("alchemy").AlchemyContext | import("alchemy/Artifacts").ArtifactStore | import("alchemy").AuthProviders | import("effect/process/ChildProcessSpawner").ChildProcessSpawner | import("effect/FileSystem").FileSystem | import("effect/http/HttpClient").HttpClient | import("effect/Path").Path | import("alchemy/Auth/Profile").ProfileStore | import("effect/Scope").Scope | import("alchemy").Stack | import("alchemy").Stage>;
export {};

import * as Command from "alchemy/Command";
import * as Provider from "alchemy/Provider";
import { Server } from "alchemy/Website/Server";
import * as Layer from "effect/Layer";
import { Auth } from "./Auth.vibe";
import { AuthOAuthProvider } from "./AuthOAuthProvider.vibe";
import { AuthTrustedDomain } from "./AuthTrustedDomain.vibe";
import { Branch } from "./Branch.ts";
import { Bucket } from "./Bucket.ts";
import { Credential } from "./Credential.ts";
import * as Credentials from "./Credentials.vibe";
import { CustomDomain } from "./CustomDomain.vibe";
import { DataApi } from "./DataApi.vibe";
import { Function } from "./Function.vibe";
import { FunctionTrigger } from "./FunctionTrigger.vibe";
import { Object } from "./Object.ts";
import { OrganizationApiKey } from "./OrganizationApiKey.ts";
import { OrganizationMemberRole } from "./OrganizationMemberRole.ts";
import { OrganizationSpendingLimit } from "./OrganizationSpendingLimit.ts";
import { OrganizationVPCEndpoint } from "./OrganizationVPCEndpoint.ts";
import { Project } from "./Project.ts";
import { ProjectMemberRole } from "./ProjectMemberRole.ts";
import { ProjectVPCEndpoint } from "./ProjectVPCEndpoint.vibe";
import { Role } from "./Role.vibe";
import { WebsiteArtifact } from "./Website/Artifact.ts";
declare const Providers_base: Provider.ProviderCollection<Providers, "Neon">;
export declare class Providers extends Providers_base {
}
/**
 * Build a layer that registers all Neon resource providers, the Neon
 * `AuthProvider`, the resolved `Credentials`, and an `HttpClient`. Include
 * this from your stack alongside other cloud `providers()` layers.
 *
 * @example
 * ```typescript
 * import * as Alchemy from "alchemy";
 * import * as Cloudflare from "@alchemy.run/cloudflare";
 * import * as Neon from "@alchemy.run/neon";
 * import * as Effect from "effect/Effect";
 * import * as Layer from "effect/Layer";
 *
 * export default Alchemy.Stack(
 *   "MyStack",
 *   {
 *     providers: Layer.mergeAll(Cloudflare.providers(), Neon.providers()),
 *     state: Alchemy.localState(),
 *   },
 *   Effect.gen(function* () {
 *     const project = yield* Neon.Project("app-db");
 *     const branch = yield* Neon.Branch("app-branch", { project });
 *     return { branchId: branch.branchId };
 *   }),
 * );
 * ```
 */
export declare const providers: () => Layer.Layer<Credentials.Credentials | import("alchemy/Auth/Credentials").CredentialsStore | import("effect/http/HttpClient").HttpClient | import("alchemy/Auth/Profile").ProfileStore | Provider.Provider<Auth> | Provider.Provider<AuthOAuthProvider> | Provider.Provider<AuthTrustedDomain> | Provider.Provider<Bucket> | Provider.Provider<Command.Build> | Provider.Provider<Credential> | Provider.Provider<CustomDomain> | Provider.Provider<DataApi> | Provider.Provider<Command.Dev> | Provider.Provider<Command.Exec> | Provider.Provider<Function> | Provider.Provider<FunctionTrigger> | Provider.Provider<Object<unknown>> | Provider.Provider<OrganizationApiKey> | Provider.Provider<OrganizationMemberRole> | Provider.Provider<OrganizationSpendingLimit> | Provider.Provider<OrganizationVPCEndpoint> | Provider.Provider<ProjectMemberRole> | Provider.Provider<ProjectVPCEndpoint> | Provider.Provider<Role> | Provider.Provider<Server> | Provider.Provider<WebsiteArtifact> | Provider.Provider<Branch> | Provider.Provider<Project> | Providers, never, import("alchemy/AlchemyContext").AlchemyContext | import("alchemy/Artifacts").ArtifactStore | import("alchemy/Auth/Registry").AuthProviders | import("effect/process/ChildProcessSpawner").ChildProcessSpawner | import("effect/FileSystem").FileSystem | import("effect/Path").Path | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage>;
export {};

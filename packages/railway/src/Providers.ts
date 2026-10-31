import { GraphQLLive } from "@distilled.cloud/railway";
import { CredentialsStoreLive } from "alchemy/Auth/Credentials";
import { ProfileStoreLive } from "alchemy/Auth/Profile";
import * as Command from "alchemy/Command";
import * as Provider from "alchemy/Provider";
import { Random, RandomProvider } from "alchemy/Random";
import {
  Server as WebsiteServer,
  ServerProvider as WebsiteServerProvider,
} from "alchemy/Website/Server";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Layer from "effect/Layer";
import { RailwayAuth } from "./AuthProvider.ts";
import { Bucket, BucketProvider } from "./Bucket.ts";
import { CloudAgent, CloudAgentProvider } from "./CloudAgent.vibe";
import { ConnectMongoHttp } from "./ConnectMongoHttp.ts";
import { ConnectMySQLHttp } from "./ConnectMySQLHttp.ts";
import { ConnectPostgresHttp } from "./ConnectPostgresHttp.ts";
import * as Credentials from "./Credentials.vibe";
import { CustomDomain, CustomDomainProvider } from "./CustomDomain.vibe";
import { DeleteObjectHttp } from "./DeleteObjectHttp.vibe";
import { fromCredentials } from "./Environment.ts";
import { Function, FunctionProvider } from "./Function.ts";
import { GetObjectHttp } from "./GetObjectHttp.vibe";
import { Group, GroupProvider } from "./Group.ts";
import { HeadObjectHttp } from "./HeadObjectHttp.vibe";
import { ListObjectsV2Http } from "./ListObjectsV2Http.vibe";
import { Mongo, MongoProvider } from "./Mongo.ts";
import { MountVolumeLive } from "./MountVolume.ts";
import { MySQL, MySQLProvider } from "./MySQL.ts";
import { Postgres, PostgresProvider } from "./Postgres.ts";
import {
  PrivateNetwork,
  PrivateNetworkEndpoint,
  PrivateNetworkEndpointProvider,
  PrivateNetworkProvider,
} from "./PrivateNetwork.ts";
import { Project, ProjectProvider } from "./Project.ts";
import { Environment, EnvironmentProvider } from "./ProjectEnvironment.ts";
import { PutObjectHttp } from "./PutObjectHttp.vibe";
import { ReadRedisHttp } from "./ReadRedisHttp.vibe";
import { ReadWriteRedisHttp } from "./ReadWriteRedisHttp.vibe";
import { Redis, RedisProvider } from "./Redis.ts";
import { ExecHttp, Sandbox, SandboxProvider } from "./Sandbox.ts";
import { SandboxCheckpoint, SandboxCheckpointProvider } from "./SandboxCheckpoint.vibe";
import { Service } from "./Service.vibe";
import { ServiceProvider } from "./ServiceProvider.ts";
import { TcpProxy, TcpProxyProvider } from "./TcpProxy.vibe";
import { Template, TemplateProvider } from "./Template.ts";
import { UsageLimit, UsageLimitProvider } from "./Usage.ts";
import { Variable, VariableProvider } from "./Variable.ts";
import { Volume, VolumeProvider } from "./Volume.ts";
import { VolumeBackup, VolumeBackupProvider } from "./VolumeBackup.ts";
import { Cdn, CdnProvider } from "./Website/Cdn.vibe";
import { WriteRedisHttp } from "./WriteRedisHttp.vibe";

export class Providers extends Provider.ProviderCollection<Providers>()("Railway") {}

export type ProviderRequirements = Layer.Services<ReturnType<typeof providers>>;

/**
 * Build a layer that registers Railway resource providers, the Railway
 * `AuthProvider`, the resolved `Credentials`, and an `HttpClient`. Include
 * this from your stack alongside other cloud `providers()` layers.
 *
 * Resource providers are inserted into {@link Provider.collection} as they
 * land. The collection starts empty so Project / Service agents can make a
 * single minimal insertion.
 *
 * @example
 * ```typescript
 * import * as Alchemy from "alchemy";
 * import * as Railway from "@alchemy.run/railway";
 * import * as Effect from "effect/Effect";
 *
 * export default Alchemy.Stack(
 *   "MyStack",
 *   {
 *     providers: Railway.providers(),
 *     state: Alchemy.localState(),
 *   },
 *   Effect.gen(function* () {
 *     return {};
 *   }),
 * );
 * ```
 */
export const providers = () =>
  Layer.effect(
    Providers,
    Provider.collection([
      Project,
      Postgres,
      PrivateNetwork,
      PrivateNetworkEndpoint,
      MySQL,
      Mongo,
      Cdn,
      CustomDomain,
      Environment,
      Function,
      Group,
      Service,
      TcpProxy,
      Template,
      UsageLimit,
      Variable,
      Volume,
      VolumeBackup,
      Redis,
      Bucket,
      CloudAgent,
      Sandbox,
      SandboxCheckpoint,
      Random,
      WebsiteServer,
    ]),
  ).pipe(
    Layer.provide(
      Layer.mergeAll(
        ProjectProvider(),
        PostgresProvider(),
        PrivateNetworkProvider(),
        PrivateNetworkEndpointProvider(),
        MySQLProvider(),
        MongoProvider(),
        CdnProvider(),
        CustomDomainProvider(),
        EnvironmentProvider(),
        FunctionProvider(),
        GroupProvider(),
        ServiceProvider(),
        TcpProxyProvider(),
        TemplateProvider(),
        UsageLimitProvider(),
        VariableProvider(),
        VolumeProvider(),
        VolumeBackupProvider(),
        RedisProvider(),
        BucketProvider(),
        CloudAgentProvider(),
        SandboxProvider(),
        SandboxCheckpointProvider(),
        RandomProvider(),
        WebsiteServerProvider(),
      ),
    ),
    Layer.provideMerge(
      Layer.mergeAll(
        MountVolumeLive,
        ConnectPostgresHttp,
        ConnectMySQLHttp,
        ConnectMongoHttp,
        PutObjectHttp,
        GetObjectHttp,
        DeleteObjectHttp,
        HeadObjectHttp,
        ListObjectsV2Http,
        ReadRedisHttp,
        WriteRedisHttp,
        ReadWriteRedisHttp,
        ExecHttp,
      ),
    ),
    Layer.provideMerge(fromCredentials()),
    Layer.provideMerge(GraphQLLive),
    Layer.provideMerge(Credentials.fromAuthProvider()),
    Layer.provideMerge(RailwayAuth),
    Layer.provideMerge(ProfileStoreLive),
    Layer.provideMerge(CredentialsStoreLive),
    Layer.provideMerge(FetchHttpClient.layer),
    Layer.provideMerge(Command.providers()),
    Layer.orDie,
  );

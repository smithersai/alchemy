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
import { App, AppProvider } from "./App.ts";
import { FlyAuth } from "./AuthProvider.vibe";
import { Bucket, BucketProvider } from "./Bucket.ts";
import { Certificate, CertificateProvider } from "./Certificate.ts";
import { CheckpointHttp } from "./CheckpointHttp.vibe";
import { ConnectPostgresHttp } from "./ConnectPostgresHttp.ts";
import * as Credentials from "./Credentials.ts";
import { DecryptHttp } from "./DecryptHttp.vibe";
import { DeleteObjectHttp } from "./DeleteObjectHttp.vibe";
import { EncryptHttp } from "./EncryptHttp.vibe";
import { fromCredentials } from "./Environment.ts";
import { ExecHttp } from "./ExecHttp.vibe";
import { GetObjectHttp } from "./GetObjectHttp.vibe";
import { GetSecretHttp } from "./GetSecretHttp.ts";
import { HeadObjectHttp } from "./HeadObjectHttp.vibe";
import { IpAssignment, IpAssignmentProvider } from "./IpAssignment.ts";
import { ListObjectsV2Http } from "./ListObjectsV2Http.vibe";
import { ListSecretsHttp } from "./ListSecretsHttp.vibe";
import { Machine, MachineProvider } from "./Machine.ts";
import { MountVolumeLive } from "./MountVolume.vibe";
import { Postgres, PostgresProvider } from "./Postgres.ts";
import { PutObjectHttp } from "./PutObjectHttp.vibe";
import { ReadRedisHttp } from "./ReadRedisHttp.vibe";
import { ReadWriteRedisHttp } from "./ReadWriteRedisHttp.vibe";
import { Redis, RedisProvider } from "./Redis.ts";
import { Secret, SecretProvider } from "./Secret.ts";
import { SecretKey, SecretKeyProvider } from "./SecretKey.ts";
import { Service, ServiceProvider } from "./Service.ts";
import { SignHttp } from "./SignHttp.vibe";
import { Sprite, SpriteProvider } from "./Sprite.ts";
import { VerifyHttp } from "./VerifyHttp.vibe";
import { VolumeSnapshot, VolumeSnapshotProvider } from "./VolumeSnapshot.ts";
import { AssetDeployment, AssetDeploymentProvider } from "./Website/AssetDeployment.ts";
import { WriteCertificatesHttp } from "./WriteCertificatesHttp.vibe";
import { WriteRedisHttp } from "./WriteRedisHttp.vibe";
import { WriteSecretHttp } from "./WriteSecretHttp.vibe";

export class Providers extends Provider.ProviderCollection<Providers>()("Fly") {}

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
export const providers = () =>
  Layer.effect(
    Providers,
    Provider.collection([
      App,
      AssetDeployment,
      Bucket,
      Certificate,
      IpAssignment,
      Machine,
      Postgres,
      Random,
      Redis,
      Secret,
      SecretKey,
      Service,
      Sprite,
      VolumeSnapshot,
      WebsiteServer,
    ]),
  ).pipe(
    Layer.provide(
      Layer.mergeAll(
        AppProvider(),
        AssetDeploymentProvider(),
        BucketProvider(),
        CertificateProvider(),
        IpAssignmentProvider(),
        MachineProvider(),
        PostgresProvider(),
        RandomProvider(),
        RedisProvider(),
        SecretProvider(),
        SecretKeyProvider(),
        ServiceProvider(),
        SpriteProvider(),
        VolumeSnapshotProvider(),
        WebsiteServerProvider(),
      ),
    ),
    // The binding layers are mutually independent — they all draw on the
    // Credentials/HttpClient layers below. Merge them into one group so
    // `.pipe` stays under its 20-argument overload ceiling.
    Layer.provideMerge(
      Layer.mergeAll(
        MountVolumeLive,
        ConnectPostgresHttp,
        PutObjectHttp,
        GetObjectHttp,
        DeleteObjectHttp,
        HeadObjectHttp,
        ListObjectsV2Http,
        ReadRedisHttp,
        WriteRedisHttp,
        ReadWriteRedisHttp,
        CheckpointHttp,
        ExecHttp,
        GetSecretHttp,
        ListSecretsHttp,
        WriteSecretHttp,
        WriteCertificatesHttp,
        EncryptHttp,
        DecryptHttp,
        SignHttp,
        VerifyHttp,
      ),
    ),
    Layer.provideMerge(fromCredentials()),
    Layer.provideMerge(Credentials.fromAuthProvider()),
    Layer.provideMerge(FlyAuth),
    Layer.provideMerge(ProfileStoreLive),
    Layer.provideMerge(CredentialsStoreLive),
    Layer.provideMerge(FetchHttpClient.layer),
    Layer.provideMerge(Command.providers()),
    Layer.orDie,
  );

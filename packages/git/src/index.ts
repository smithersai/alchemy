/**
 * @alchemy.run/git — a Git hosting service on Cloudflare Workers,
 * Durable Objects, and R2, built with Alchemy Effect-native Workers.
 *
 * Public surface:
 * - The HTTP contract ({@link GitApi}, aliased {@link Api}): every plane as
 *   one `HttpApi`, each endpoint an `HttpApiEndpoint`, each group a
 *   class, with the schemas and tagged errors.
 * - {@link Handlers} and {@link ApiHandlersLive}: shared handler implementations.
 *   {@link ApiLive} registers public routes; merge it beside application routes.
 *   {@link GroupsLive} exposes native group implementations for overrides.
 * - {@link Engine}: transport-independent operations, with scoped prepare/commit
 *   for application authorization and validation. HTTP codecs live in `@alchemy.run/git/Http`.
 * - The deployable pieces: {@link ApiLive} + {@link InternalApiLive}, the
 *   {@link GitRepo} / {@link Registry} Durable Objects, and the storage and
 *   hasher blocks.
 *
 * Internals (wire-protocol codecs under `Protocol/`, storage under `Store/`,
 * alarm jobs under `Jobs/`) are deliberately not re-exported here — deep
 * import them via `@alchemy.run/git/Protocol/Pkt` style paths when
 * needed.
 */
export * from "./Api.vibe";
export { GitApi as Api } from "./Api.vibe";
export { Engine, EngineLive } from "./Engine.vibe";
export type { PushInput, PreparedPush, RefUpdate } from "./Push.vibe";
export * as Http from "./Http.ts";
export * as Push from "./PushInput.vibe";
export * from "./Server.vibe";
export { parseCommit, parseTree, ZERO_OID, ObjectType } from "./Protocol/ObjectCodec.vibe";
export { StoreError } from "./Protocol/Store.vibe";
export { WireProtocolError, PackIngestError } from "./RepoObject.vibe";
export {
  BlobStore,
  BlobStoreError,
  type BlobBody,
  type BlobMeta,
  type BlobMultipart,
  type BlobStoreShape,
} from "./BlobStore.vibe";
export { BlobStoreR2 } from "./BlobStoreR2.vibe";
export { BlobStoreS3 } from "./BlobStoreS3.vibe";
export { RegistryD1 } from "./RegistryD1.vibe";
export {
  GitRepo,
  GitRepoLive,
  MAX_PACK_BYTES,
  type CommitPushInput,
  type CommitPushResult,
  type GitRepoShape,
  type RepoMetaData,
  RepoStore,
  type RepoStoreShape,
  type RepoStub,
} from "./RepoObject.vibe";
export {
  Registry,
  RegistryDurableObject,
  RegistryLive,
  RegistryStore,
  REGISTRY_DO_NAME,
  RESERVED_OWNERS,
} from "./RegistryObject.vibe";

export { Hasher, HasherInline, HasherSelf, HASHER_BINDING } from "./Hasher/Hasher.vibe";

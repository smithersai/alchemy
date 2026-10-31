import * as HttpApi from "effect/http-api/HttpApi";
import type * as HttpServerRequest from "effect/http/HttpServerRequest";
import { GitHub } from "./Api/GitHub.js";
import { Objects } from "./Api/Objects.js";
import { Protocol } from "./Api/Protocol.js";
import { Pulls } from "./Api/Pulls.js";
import { Refs } from "./Api/Refs.js";
import { Repos } from "./Api/Repos.js";
/**
 * The typed HTTP contract for git-service (DESIGN.md §5): every plane as
 * one Effect `HttpApi`, so the Worker, the clients
 * (`HttpApiClient.make(GitApi, ...)`), and OpenAPI share one schema-checked
 * surface.
 *
 * Endpoints use `HttpApiEndpoint`; groups are implemented with
 * `HttpApiBuilder.group`. The exported groups can also form a smaller API.
 *
 * | Group | Path | Routes |
 * | --- | --- | --- |
 * | {@link Repos} | `/api/v1/repos` | create, get, update, list, delete, fork, import, compact |
 * | {@link Refs} | `/api/v1/repos/:owner/:repo/ref(s)` | list, get, update, remove |
 * | {@link Objects} | `/api/v1/repos/:owner/:repo/…` | commit, log, tree, blob, diff, compare, blobRaw, file |
 * | {@link Pulls} | `/api/v1/repos/:owner/:repo/pulls` | create, list, get, update, merge |
 * | {@link Protocol} | `/:owner/:repo/…` | infoRefs, uploadPack, receivePack |
 * | {@link GitHub} | `/api/v3` | the GitHub REST v3 facade |
 *
 * No route carries middleware: apply application HttpRouter middleware to
 * Git.ApiLive when composing the public routes. The engine's own hash route is
 * {@link InternalApi}, mounted separately. Shared schemas and tagged
 * errors live in `Api/Schema.ts` and are re-exported flatly from here.
 */
export * from "./Api/Schema.js";
export * from "./Api/GitHub.js";
export * from "./Api/Internal.js";
export * from "./Api/Objects.js";
export * from "./Api/Protocol.js";
export * from "./Api/Pulls.js";
export * from "./Api/Refs.js";
export * from "./Api/Repos.js";
declare const GitApi_base: HttpApi.HttpApi<"git-service", typeof GitHub | typeof Objects | typeof Protocol | typeof Pulls | typeof Refs | typeof Repos>;
/**
 * The complete git-service API: the REST plane at `/api/v1`, the git wire
 * protocol at the root, and the GitHub facade at `/api/v3`. Compose client
 * schemas with `AppApi.addHttpApi(Git.Api)`, or build one from the groups.
 */
export declare class GitApi extends GitApi_base {
}
/**
 * Whether a request to one of the engine's routes only reads: the REST
 * and raw reads, the GitHub facade's `GET`s, the ref advertisement for a
 * fetch, and `git-upload-pack`. The advertisement for a push
 * (`info/refs?service=git-receive-pack`) is not a read. A middleware that
 * lets anonymous callers read public repositories asks this.
 *
 * ```typescript
 * (httpEffect) =>
 *   Effect.gen(function* () {
 *     const request = yield* HttpServerRequest.HttpServerRequest;
 *     if (Git.isRead(request) && (yield* isPublic)) return yield* httpEffect;
 *     // …
 *   })
 * ```
 */
export declare const isRead: (request: HttpServerRequest.HttpServerRequest) => boolean;

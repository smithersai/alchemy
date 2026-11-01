import { type Rpc } from "alchemy/Rpc";
import { type RuntimeContext } from "alchemy/RuntimeContext";
import * as Effect from "effect/Effect";
import type * as HttpApi from "effect/http-api/HttpApi";
import type * as HttpApiClient from "effect/http-api/HttpApiClient";
import type * as HttpApiGroup from "effect/http-api/HttpApiGroup";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import type { Rpc as EffectRpc, RpcClient, RpcGroup } from "effect/rpc";
import type * as RpcClientError from "effect/rpc/RpcClientError";
import type { Container } from "./Container.vibe";
declare const BoundContainerUnavailable_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.Run.BoundContainerUnavailable";
} & Readonly<A>;
/** The bound container has no port, or the caller was deployed before the binding existed. */
export declare class BoundContainerUnavailable extends BoundContainerUnavailable_base<{
    container: string;
}> {
    get message(): string;
}
/**
 * Client for a container bound with {@link bindContainer}: its RPC
 * methods, plus `fetch` for its HTTP routes.
 */
export type ContainerClient<Shape> = Omit<Shape, "fetch" | "run"> & {
    /**
     * Send a request to the container's `fetch` handler. A relative URL such
     * as `/health` resolves against `http://localhost:<port>`.
     */
    fetch(request: HttpClientRequest.HttpClientRequest): Effect.Effect<HttpClientResponse.HttpClientResponse, HttpClientError.HttpClientError | BoundContainerUnavailable, RuntimeContext>;
    /**
     * An `HttpClient` whose relative requests go to the container, for an
     * Effect RPC or HttpApi client.
     */
    httpClient: HttpClient.HttpClient.With<HttpClientError.HttpClientError | BoundContainerUnavailable>;
};
/** A port of a container bound with {@link bindPort}. */
export interface PortClient {
    /** Always `localhost`: sidecars share the instance's network. */
    host: "localhost";
    /** The bound port. */
    port: number;
    /** `http://localhost:{port}`, for a port that serves plain HTTP. */
    url: string;
    /** An `HttpClient` whose relative requests go to {@link url}. */
    client: HttpClient.HttpClient;
}
type Target<Shape> = Container & Rpc<Shape>;
/** A container to bind: a `GCP.Run.Container` class, or an image-only declaration. */
type Bindable<Shape, Req> = Target<Shape> | Effect.Effect<Target<Shape>, never, Req> | Effect.Effect<Container, never, Req>;
/**
 * Run a {@link Container} as a sidecar of this Cloud Run service (or of
 * another Container) and call it over `localhost`.
 *
 * At deploy time the binding adds the container to the host's revision
 * and to the host's `dependsOn`, so the host starts only after the
 * container passes its startup probe. The container's binding roles are
 * granted to the revision's service account. At runtime it returns a
 * client with the container's methods (schemaless RPC on `/__rpc__/*`)
 * plus `fetch` for its HTTP routes.
 *
 * ### Calling a sidecar
 * **Example:** Methods on the container
 * ```typescript
 * export default class Worker extends GCP.Run.Container<Worker>()(
 *   "Worker",
 *   { main: import.meta.url, port: 3000 },
 *   Effect.gen(function* () {
 *     return {
 *       greet: (name: string) => Effect.succeed(`hello ${name}`),
 *       count: () => Stream.make(1, 2, 3),
 *     };
 *   }),
 * ) {}
 * ```
 *
 * **Example:** Bind it and call a method
 * ```typescript
 * export default class Api extends GCP.Run.Service<Api>()(
 *   "Api",
 *   { main: import.meta.url },
 *   Effect.gen(function* () {
 *     const worker = yield* GCP.Run.bindContainer(Worker);
 *     return {
 *       fetch: Effect.gen(function* () {
 *         const greeting = yield* worker.greet("sam");
 *         return HttpServerResponse.text(greeting);
 *       }),
 *     };
 *   }),
 * ) {}
 * ```
 *
 * ### Streams and HTTP
 * **Example:** A method that returns a Stream
 * ```typescript
 * const counts = yield* worker.count().pipe(Stream.runCollect);
 * ```
 *
 * **Example:** Send a request to the container's `fetch`
 * ```typescript
 * const response = yield* worker.fetch(HttpClientRequest.get("/health"));
 * ```
 *
 * ### Sidecars that bind sidecars
 * **Example:** A container that starts after another
 * ```typescript
 * export default class Worker extends GCP.Run.Container<Worker>()(
 *   "Worker",
 *   { main: import.meta.url, port: 3000 },
 *   Effect.gen(function* () {
 *     const cache = yield* GCP.Run.bindPort(Cache, 6379);
 *     return { ping: () => Effect.succeed(cache.url) };
 *   }),
 * ) {}
 * ```
 * Every sidecar a bound container binds joins the same revision.
 *
 * @binding
 * @product Run
 */
/** `fetch` and `httpClient` of a bound container, alongside a typed client. */
export type ContainerTransport = Pick<ContainerClient<{}>, "fetch" | "httpClient">;
/** Options for {@link bindContainer}: the API the container serves, if typed. */
export type BindContainerOptions<Rpcs extends EffectRpc.Any, Groups extends HttpApiGroup.Constraint> = {
    schema: RpcGroup.RpcGroup<Rpcs>;
} | {
    api: HttpApi.HttpApi<string, Groups>;
};
export declare function bindContainer<Shape = {}, Req = never>(target: Bindable<Shape, Req>): Effect.Effect<ContainerClient<Shape>, never, Req | HttpClient.HttpClient>;
export declare function bindContainer<Rpcs extends EffectRpc.Any, Req = never>(target: Bindable<unknown, Req>, options: {
    schema: RpcGroup.RpcGroup<Rpcs>;
}): Effect.Effect<RpcClient.RpcClient<Rpcs, RpcClientError.RpcClientError> & ContainerTransport, never, Req | HttpClient.HttpClient>;
export declare function bindContainer<Groups extends HttpApiGroup.Constraint, Req = never>(target: Bindable<unknown, Req>, options: {
    api: HttpApi.HttpApi<string, Groups>;
}): Effect.Effect<HttpApiClient.Client<Groups, HttpClientError.HttpClientError | BoundContainerUnavailable> & ContainerTransport, never, Req | HttpClient.HttpClient>;
/**
 * Run a {@link Container} as a sidecar and reach one of its ports
 * directly — for a protocol other than HTTP, such as Redis or Postgres.
 * See {@link bindContainer}.
 *
 * ### Binding a port
 * **Example:** A Redis sidecar
 * ```typescript
 * export const Cache = GCP.Run.Container("Cache", {
 *   image: "docker.io/library/redis:7",
 *   port: 6379,
 *   startupProbe: { tcpSocket: {} },
 * });
 *
 * // inside the service's Effect.Effect
 * const cache = yield* GCP.Run.bindPort(Cache, 6379);
 * // cache.url === "http://localhost:6379"; connect with `redis://localhost:${cache.port}`
 * ```
 *
 * @binding
 * @product Run
 */
export declare const bindPort: <Req = never>(target: Bindable<unknown, Req>, port: number) => Effect.Effect<PortClient, never, Req | HttpClient.HttpClient>;
export {};

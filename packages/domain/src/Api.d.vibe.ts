import type { HttpEffect } from "alchemy/Http";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import type * as Headers from "effect/http/Headers";
import * as HttpClient from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import * as Rpc from "effect/rpc/Rpc";
import * as RpcClient from "effect/rpc/RpcClient";
import * as RpcClientError from "effect/rpc/RpcClientError";
import * as RpcGroup from "effect/rpc/RpcGroup";
import type * as RpcMiddleware from "effect/rpc/RpcMiddleware";
import * as Schema from "effect/Schema";
import type * as Scope from "effect/Scope";
import * as Socket from "effect/socket/Socket";
import * as Stream from "effect/Stream";
import type * as Aggregate from "./Aggregate.js";
import * as Command from "./Command.vibe";
import { type Filter } from "./Filter.vibe";
import * as Key from "./Key.js";
import * as Middleware from "./Middleware.js";
import * as Model from "./Model.js";
import type * as Read from "./Read.vibe";
import type * as DomainStream from "./Stream.vibe";
import type * as View from "./View.vibe";
/**
 * What an Api exposes: commands (writes); views, streams, and aggregates that
 * declare a `read` contract (reads).
 */
export type Entry = Command.Any | View.Any | Aggregate.Any | DomainStream.Any;
type Commands<E extends Entry> = Extract<E, Command.Any>;
type Views<E extends Entry> = Extract<E, View.Any>;
type Streams<E extends Entry> = Extract<E, DomainStream.Any>;
type Aggregates<E extends Entry> = Exclude<E, Command.Any | View.Any | DomainStream.Any>;
type ContractOf<D> = D extends Read.AnyContract ? D : never;
type RejectionOf<D> = Aggregate.InstanceOf<NonNullable<ContractOf<D>["rejects"]>[number]>;
type MiddlewareOf<D> = NonNullable<ContractOf<D>["middleware"]>;
/** Everything a read can fail with: the declared rejections, the middleware's errors, transport. */
export type ReadError<D> = RejectionOf<D> | Middleware.Errors<MiddlewareOf<D>> | RpcClientError.RpcClientError;
interface CallOptions {
    readonly headers?: Headers.Input;
}
/** The typed client of a view exposed in an Api. */
export interface ViewClient<V extends View.Any> {
    /** The key's current state (`null` if it does not exist or the filter excludes it). */
    readonly get: (key: Key.IdOf<View.KeyOf<V>>, options?: CallOptions & {
        /** Wait until the view has applied this write (a command's `stream` and `version`). */
        readonly atLeast?: {
            readonly stream: string;
            readonly version: number;
        };
        readonly where?: Filter<View.StateOf<V>>;
    }) => Effect.Effect<View.StateOf<V> | null, ReadError<V["definition"]> | View.ConsistencyTimeout>;
    /**
     * The key's state with its cursor, then every change. Ends with a rejection
     * when `validate` stops allowing it.
     */
    readonly watch: (key: Key.IdOf<View.KeyOf<V>>, options?: CallOptions & {
        readonly where?: Filter<View.StateOf<V>>;
    }) => Stream.Stream<Read.Snapshot<View.StateOf<V> | null>, ReadError<V["definition"]>>;
    /**
     * The events the key emitted, each with the state after it: history from
     * `after` (a cursor), a {@link Read.CaughtUp} frame, then live events.
     */
    readonly events: (key: Key.IdOf<View.KeyOf<V>>, options?: CallOptions & {
        readonly after?: number;
        readonly where?: Filter<View.EventOf<V>>;
    }) => Stream.Stream<View.Entry<View.StateOf<V>, View.EventOf<V>, Key.IdOf<View.KeyOf<V>>> | Read.CaughtUp, ReadError<V["definition"]>>;
    /** A page of the key's emitted events. */
    readonly list: (key: Key.IdOf<View.KeyOf<V>>, options?: CallOptions & {
        /** Wait until the view has applied this write (a command's `stream` and `version`). */
        readonly atLeast?: {
            readonly stream: string;
            readonly version: number;
        };
        readonly where?: Filter<View.EventOf<V>>;
        readonly order?: "asc" | "desc";
        readonly take?: number;
        readonly after?: number;
    }) => Effect.Effect<View.Page<View.Entry<View.StateOf<V>, View.EventOf<V>, Key.IdOf<View.KeyOf<V>>>>, ReadError<V["definition"]> | View.ConsistencyTimeout>;
    /**
     * The key's state and the cursor it is valid at, read together. Render the
     * state, then follow `events(key, { after: cursor })`: every later change
     * arrives once, and none is missed.
     */
    readonly snapshot: (key: Key.IdOf<View.KeyOf<V>>, options?: CallOptions & {
        /** Wait until the view has applied this write (a command's `stream` and `version`). */
        readonly atLeast?: {
            readonly stream: string;
            readonly version: number;
        };
        readonly where?: Filter<View.StateOf<V>>;
    }) => Effect.Effect<Read.Snapshot<View.StateOf<V> | null>, ReadError<V["definition"]> | View.ConsistencyTimeout>;
}
/** The typed client of a stream exposed in an Api. */
export interface StreamClient<S extends DomainStream.Any> {
    /** The key's latest entry, or `null` if nothing was appended. */
    readonly peek: (key: Key.IdOf<DomainStream.KeyOf<S>>, options?: CallOptions & {
        /** Wait until the stream's writer has handled this write (a command's `stream` and `version`). */
        readonly atLeast?: {
            readonly stream: string;
            readonly version: number;
        };
    }) => Effect.Effect<DomainStream.Entry<DomainStream.EventOf<S>, Key.IdOf<DomainStream.KeyOf<S>>> | null, ReadError<S["definition"]> | View.ConsistencyTimeout>;
    /**
     * The key's latest entry (`null` before any) with its cursor, then each new
     * one. Ends with a rejection when `validate` stops allowing it.
     */
    readonly watch: (key: Key.IdOf<DomainStream.KeyOf<S>>, options?: CallOptions) => Stream.Stream<Read.Snapshot<DomainStream.Entry<DomainStream.EventOf<S>, Key.IdOf<DomainStream.KeyOf<S>>> | null>, ReadError<S["definition"]>>;
    /** The key's entries from `after` (a cursor), a {@link Read.CaughtUp} frame, then live ones. */
    readonly events: (key: Key.IdOf<DomainStream.KeyOf<S>>, options?: CallOptions & {
        readonly after?: number;
        readonly where?: Filter<DomainStream.EventOf<S>>;
    }) => Stream.Stream<DomainStream.Entry<DomainStream.EventOf<S>, Key.IdOf<DomainStream.KeyOf<S>>> | Read.CaughtUp, ReadError<S["definition"]>>;
    /** A page of the key's entries. */
    readonly list: (key: Key.IdOf<DomainStream.KeyOf<S>>, options?: CallOptions & {
        readonly where?: Filter<DomainStream.EventOf<S>>;
        readonly order?: "asc" | "desc";
        readonly take?: number;
        readonly after?: number;
    }) => Effect.Effect<View.Page<DomainStream.Entry<DomainStream.EventOf<S>, Key.IdOf<DomainStream.KeyOf<S>>>>, ReadError<S["definition"]>>;
}
/** A committed event of an aggregate, as a client receives it. */
export interface Recorded<E, Id> {
    readonly event: E;
    readonly envelope: Aggregate.Envelope<Id>;
}
/** The typed client of an aggregate exposed in an Api (through its `read` contract). */
export interface AggregateClient<A extends Aggregate.Any> {
    /** The instance's current state. */
    readonly get: (key: Aggregate.IdOf<A>, options?: CallOptions) => Effect.Effect<Aggregate.StateOf<A>, ReadError<A["definition"]["read"]>>;
    /** The instance's state with its cursor, then its state after every commit. */
    readonly watch: (key: Aggregate.IdOf<A>, options?: CallOptions) => Stream.Stream<Read.Snapshot<Aggregate.StateOf<A>>, ReadError<A["definition"]["read"]>>;
    /**
     * The instance's committed events: history from `after` (a cursor), a
     * {@link Read.CaughtUp} frame, then live.
     */
    readonly events: (key: Aggregate.IdOf<A>, options?: CallOptions & {
        readonly after?: number;
    }) => Stream.Stream<Recorded<Aggregate.EventOf<A>, Aggregate.IdOf<A>> | Read.CaughtUp, ReadError<A["definition"]["read"]>>;
}
/** How a command is sent: its idempotency key and the call's headers. */
export interface CommandOptions extends CallOptions {
    /** A resend with the same id returns the first receipt instead of deciding again. */
    readonly commandId?: string;
}
/** The input and options after a command's target. The input may be left out when it has no required field. */
type CommandArgs<Input> = {} extends Input ? [input?: Input, options?: CommandOptions] : [input: Input, options?: CommandOptions];
/** The typed client of a command exposed in an Api: `bank.WithdrawMoney(target, input, options)`. */
export type CommandClient<C extends Command.Any> = C["rpc"] extends Rpc.Rpc<infer _Tag, infer Payload, infer Success, infer Error, infer Middleware, infer _Requires> ? Payload["Type"] extends {
    readonly target: infer Target;
    readonly input: infer Input;
} ? (target: Target, ...args: CommandArgs<Input>) => Effect.Effect<Success["Type"], Error["Type"] | Middleware["error"]["Type"] | Middleware["~ClientError"] | RpcClientError.RpcClientError, Payload["EncodingServices"] | Success["DecodingServices"] | Error["DecodingServices"] | Middleware["error"]["DecodingServices"]> : never : never;
/**
 * The typed client of an Api: commands as methods (`bank.WithdrawMoney(...)`),
 * views and aggregates as namespaces (`bank.AccountSummary.watch(...)`).
 */
export type ApiClient<E extends Entry> = {
    readonly [C in Commands<E> as C["tag"]]: CommandClient<C>;
} & {
    readonly [V in Views<E> as V["viewName"]]: ViewClient<V>;
} & {
    readonly [S in Streams<E> as S["streamName"]]: StreamClient<S>;
} & {
    readonly [A in Aggregates<E> as A["aggregateName"]]: AggregateClient<A>;
};
/** Type-level identity of an Api's client service. */
export interface ClientKey<Name extends string> {
    readonly "~alchemy/Domain/Api/Client": Name;
}
/** What `yield* MyApi` gives a Worker: the Api served over HTTP. */
export interface ApiServer {
    /** Use as the Worker's `fetch`. Commands and reads over HTTP; live reads over WebSockets. */
    readonly fetch: HttpEffect;
}
/**
 * The class type returned by {@link make}. The class is itself an Effect:
 * `yield* MyApi` serves it, requiring the hosted Domain and the Layers of every
 * middleware its entries declare.
 */
export interface ApiClass<Name extends string, Entries extends ReadonlyArray<Entry>> extends Effect.Effect<ApiServer, never, Model.Internals | MiddlewareServices<Entries>> {
    new (_: never): {};
    readonly kind: "Api";
    readonly apiName: Name;
    /** The commands, views and aggregates this Api exposes. */
    readonly entries: Entries;
    /** The command classes this Api exposes, in the order it lists them. */
    readonly commands: ReadonlyArray<Commands<Entries[number]>>;
    /**
     * One Schema for every rejection this Api's commands declare: a union of the
     * rejection classes, each once, decoding to class instances as the client
     * fails with them. `Schema.Never` when no command rejects.
     */
    readonly rejections: RejectionUnion<Commands<Entries[number]>["rejects"][number]>;
    /** The underlying Effect RPC group. */
    readonly group: RpcGroup.RpcGroup<Rpc.Any>;
    /**
     * Apply an `RpcMiddleware` to every entry (logging, rate limits). Middleware
     * that provides services, such as a session, is declared by each command,
     * view or aggregate instead, so what they may read stays typed.
     */
    middleware<M extends RpcMiddleware.AnyService>(middleware: [RpcMiddleware.Provides<M["Identifier"]>] extends [never] ? M : "Middleware that provides services is declared on each command, view or aggregate"): ApiClass<Name, Entries>;
    /**
     * A typed client. Provide a protocol: {@link protocolHttp},
     * {@link protocolWebSocket} or {@link protocolInProcess}.
     */
    readonly client: Effect.Effect<ApiClient<Entries[number]>, never, Scope.Scope | RpcClient.Protocol | MiddlewareClients<Entries>>;
    /** The client as a service, for code that uses it without owning the connection. */
    readonly Client: Context.Service<ClientKey<Name>, ApiClient<Entries[number]>>;
    /** Build {@link Client} for the life of the Layer.Layer, over the protocol provided to it. */
    readonly layerClient: Layer.Layer<ClientKey<Name>, never, RpcClient.Protocol | MiddlewareClients<Entries>>;
    /** {@link client} over {@link protocolHttp}. */
    readonly clientHttp: (url: string) => Effect.Effect<ApiClient<Entries[number]>, never, Scope.Scope | HttpClient.HttpClient | MiddlewareClients<Entries>>;
    /** {@link layerClient} over {@link protocolHttp}. */
    readonly layerClientHttp: (url: string) => Layer.Layer<ClientKey<Name>, never, HttpClient.HttpClient | MiddlewareClients<Entries>>;
    /** {@link client} over {@link protocolWebSocket}. */
    readonly clientWebSocket: (url: string) => Effect.Effect<ApiClient<Entries[number]>, never, Scope.Scope | HttpClient.HttpClient | Socket.WebSocketConstructor | MiddlewareClients<Entries>>;
    /** {@link layerClient} over {@link protocolWebSocket}. */
    readonly layerClientWebSocket: (url: string) => Layer.Layer<ClientKey<Name>, never, HttpClient.HttpClient | Socket.WebSocketConstructor | MiddlewareClients<Entries>>;
    /** {@link client} over {@link protocolInProcess}. In a Worker, build it per request. */
    readonly clientInProcess: Effect.Effect<ApiClient<Entries[number]>, never, Scope.Scope | Model.Internals | MiddlewareServices<Entries> | MiddlewareClients<Entries>>;
    /** {@link layerClient} over {@link protocolInProcess}. */
    readonly layerClientInProcess: Layer.Layer<ClientKey<Name>, never, Model.Internals | MiddlewareServices<Entries> | MiddlewareClients<Entries>>;
}
type EntryMiddleware<E> = E extends Command.Any ? E["middleware"][number] : E extends View.Any | DomainStream.Any ? NonNullable<E["definition"]["middleware"]>[number] : E extends Aggregate.Any ? NonNullable<NonNullable<E["definition"]["read"]>["middleware"]>[number] : never;
/** The middleware services the server needs for every entry. */
type MiddlewareServices<Entries extends ReadonlyArray<Entry>> = EntryMiddleware<Entries[number]> extends infer M ? M extends RpcMiddleware.AnyService ? M["Identifier"] : never : never;
/** The client-side middleware every entry needs (e.g. attaching a session token). */
type MiddlewareClients<Entries extends ReadonlyArray<Entry>> = EntryMiddleware<Entries[number]> extends infer M ? M extends RpcMiddleware.AnyService ? M extends {
    readonly requiredForClient: true;
} ? RpcMiddleware.ForClient<M["Identifier"]> : never : never : never;
/**
 * The public surface of a domain for one kind of client: the commands it may
 * send, and the views and aggregates (with a `read` contract) it may read.
 * Nothing in an Api needs a handler. The class is an Effect: `yield* MyApi`
 * gives a Worker its `fetch`. Call it with a typed client over
 * `Domain.protocolHttp`, `Domain.protocolWebSocket` or
 * `Domain.protocolInProcess`, or with `clientHttp`, `clientWebSocket` or
 * `clientInProcess`, which provide them.
 *
 * ### Declaring an Api
 * **Example:** What customers may reach
 * ```typescript
 * import * as Domain from "@alchemy.run/domain";
 * import { Account, DepositMoney, WithdrawMoney } from "./Account.ts";
 * import { AccountSummary } from "./AccountSummary.ts";
 *
 * export class CustomerApi extends Domain.Api(
 *   "CustomerApi",
 *   DepositMoney,
 *   WithdrawMoney,
 *   Account,
 *   AccountSummary,
 * ) {}
 * ```
 *
 * ### Serving it from a Worker
 * **Example:** The Api as a Worker's fetch
 * ```typescript
 * import * as Cloudflare from "@alchemy.run/cloudflare";
 * import * as DomainCloudflare from "@alchemy.run/cloudflare/Domain";
 * import * as Effect from "effect/Effect";
 * import * as Layer from "effect/Layer";
 * import { Bank, BankPolicies } from "./Bank.ts";
 * import { CustomerApi } from "./CustomerApi.ts";
 * import { SessionLive } from "./Session.ts";
 *
 * const BankLive = SessionLive.pipe(
 *   Layer.provideMerge(Bank.layer(BankPolicies)),
 *   Layer.provide(DomainCloudflare.layerDurableObjects()),
 * );
 *
 * export default class BankWorker extends Cloudflare.Worker<BankWorker>()(
 *   "BankWorker",
 *   { main: import.meta.url },
 *   Effect.gen(function* () {
 *     const api = yield* CustomerApi;
 *     return { fetch: api.fetch };
 *   }).pipe(Effect.provide(BankLive)),
 * ) {}
 * ```
 *
 * ### Calling it
 * `Domain.protocolWebSocket` sends commands, `get` and `list` over HTTP, and
 * opens a WebSocket for each `watch` and `events`, pushed by the object that
 * owns the key. `Domain.protocolHttp` sends everything over HTTP.
 *
 * **Example:** A typed client
 * ```typescript
 * const bank = yield* CustomerApi.client;
 * const { reply } = yield* bank.DepositMoney(accountId, { amount: 1_000 });
 * const summary = yield* bank.AccountSummary.get(accountId);
 * yield* bank.AccountSummary.watch(accountId).pipe(
 *   Stream.runForEach(({ state }) => Effect.log(state?.balance)),
 * );
 * ```
 *
 * ### Calling it in process
 * `clientInProcess` serves the Api in the caller's process, through every
 * entry's middleware, with nothing sent over a network. Code that has
 * already authenticated its caller provides a middleware Layer that trusts it.
 *
 * **Example:** A webhook that deposits as the system
 * ```typescript
 * const asSystem = Layer.succeed(Session, (effect) =>
 *   Effect.provideService(effect, CurrentActor, system("payments-webhook")),
 * );
 * const bank = yield* CustomerApi.clientInProcess.pipe(Effect.provide(asSystem));
 * yield* bank.DepositMoney(accountId, { amount: 1_000 });
 * ```
 *
 * @primitive
 */
export declare const make: <const Name extends string, const Entries extends ReadonlyArray<Entry>>(name: Name, ...entries: Entries) => ApiClass<Name, Entries>;
/**
 * The HTTP protocol for an Api client (NDJSON, so streams work). Live reads
 * are streamed responses, which the platform feeds by polling the key; use
 * {@link protocolWebSocket} to have them pushed instead. Requires an
 * `HttpClient`, e.g. `FetchHttpClient.layer`.
 */
export declare const protocolHttp: (url: string) => Layer.Layer<RpcClient.Protocol, never, HttpClient.HttpClient>;
/**
 * The protocol for a client in the same process as the model. It serves the
 * Api right there: every entry's middleware runs, from the middleware Layers
 * in scope, and nothing leaves memory. Requires the hosted Domain, like
 * serving the Api.
 * In a Worker, build it per request.
 */
export declare const protocolInProcess: <Name extends string, Entries extends ReadonlyArray<Entry>>(api: ApiClass<Name, Entries>) => Layer.Layer<RpcClient.Protocol, never, Model.Internals | MiddlewareServices<Entries>>;
/**
 * The WebSocket protocol for an Api client. Calls (commands, `get`, `list`)
 * go over HTTP like {@link protocolHttp}; every live read (`watch`,
 * `events`) opens its own WebSocket, which the Api hands to the object that
 * owns the key (on Cloudflare, its Durable Object). Each commit is pushed
 * down the socket, so nothing polls and the object hibernates in between. A
 * dropped socket reconnects and resumes after the last value it delivered.
 *
 * A browser cannot set headers on a WebSocket, and a URL ends up in logs,
 * so headers client middleware attaches apply to calls only. A live read
 * authenticates with what its upgrade request carries: in a browser, the
 * cookies of the Api's origin, so serve the app and the Api from one origin
 * and keep sessions in an `HttpOnly`, `SameSite` cookie. Requires an
 * `HttpClient` and a `Socket.WebSocketConstructor`
 * (`Socket.layerWebSocketConstructorGlobal` in browsers and Workers).
 *
 * **Example:** Watching a view over a WebSocket
 * ```typescript
 * const BankConnection = CustomerApi.layerClient.pipe(
 *   Layer.provide(Domain.protocolWebSocket("https://bank.example.com/api")),
 *   Layer.provide(Layer.mergeAll(FetchHttpClient.layer, Socket.layerWebSocketConstructorGlobal)),
 * );
 * ```
 */
export declare const protocolWebSocket: (url: string) => Layer.Layer<RpcClient.Protocol, never, HttpClient.HttpClient | Socket.WebSocketConstructor>;
/** The Schema of a union of rejection classes; `Schema.Never` when there are none. */
type RejectionUnion<R> = [R] extends [never] ? typeof Schema.Never : Schema.Codec<Aggregate.InstanceOf<R>, Schema.Codec.Encoded<R>>;
/**
 * Any Api class. Use it to write code that works with every Api, such as a
 * helper that turns each command of an Api into a UI action. `ApiClass` does
 * not fit there: its client type is exact, so a concrete Api is not an
 * `ApiClass<string, ReadonlyArray<Entry>>`.
 *
 * **Example:** A helper for any Api
 * ```typescript
 * const tagsOf = <A extends Domain.Api.Any>(api: A): ReadonlyArray<Domain.Api.CommandsOf<A>["tag"]> =>
 *   api.commands.map((command) => command.tag);
 *
 * tagsOf(CustomerApi); // ["DepositMoney", "WithdrawMoney"]
 * ```
 */
export interface Any {
    readonly kind: "Api";
    readonly apiName: string;
    /** The commands, views and aggregates the Api exposes. */
    readonly entries: ReadonlyArray<Entry>;
    /** The command classes the Api exposes, in order. */
    readonly commands: ReadonlyArray<Command.Any>;
    /** One Schema for every rejection the Api's commands declare. */
    readonly rejections: Schema.Top;
    /** The Api's client service. */
    readonly Client: Context.Key<ClientKey<string>, unknown>;
}
/** The command classes an Api exposes. */
export type CommandsOf<A extends Any> = A["commands"][number];
/** The rejection classes the commands of an Api declare. */
export type RejectionsOf<A extends Any> = CommandsOf<A>["rejects"][number];
/** The client an Api's `Client` service gives (`yield* MyApi.Client`). */
export type ClientOf<A extends Any> = A["Client"]["Service"];
export {};

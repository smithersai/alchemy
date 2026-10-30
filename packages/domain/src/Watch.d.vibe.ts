import * as Effect from "effect/Effect";
import * as Rpc from "effect/rpc/Rpc";
import * as Schema from "effect/Schema";
import type * as Aggregate from "./Aggregate.js";
import { type Kernel } from "./Kernel.js";
import type { Json, Push, StoredEvent, StreamEntry, StreamMeta, Subscription, ViewEntry, ViewSnapshot } from "./Platform.js";
import type * as DomainStream from "./Stream.vibe";
import type * as View from "./View.js";
/** Encode a read's refusal (a middleware error) as the `Exit` that ends it. */
export declare const refuse: (rpc: Rpc.Any, error: unknown) => Effect.Effect<Json, Schema.SchemaError>;
/** What a view key's subscriber receives after a commit (or when it connects). */
export declare const viewPush: (kernel: Kernel, view: View.Any) => (key: string, subscription: Subscription, snapshot: ViewSnapshot, entries: ReadonlyArray<ViewEntry>) => Effect.Effect<Push>;
/** What an aggregate instance's subscriber receives after a commit (or when it connects). */
export declare const aggregatePush: (kernel: Kernel, aggregate: Aggregate.Any) => (id: string, subscription: Subscription, current: {
    readonly state: Json;
    readonly version: number;
}, events: ReadonlyArray<StoredEvent>) => Effect.Effect<Push>;
/** What a stream key's subscriber receives after an append (or when it connects). */
export declare const streamPush: (kernel: Kernel, stream: DomainStream.Any) => (key: string, subscription: Subscription, meta: StreamMeta, entries: ReadonlyArray<StreamEntry>, latest: StreamEntry | undefined) => Effect.Effect<Push>;

import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
/**
 * A lookup-through cache on the registry's KV namespace, shared by every
 * isolate of the Worker.
 *
 * Concurrent misses each run the lookup and each write; the last write wins.
 * That is deliberate: a cache that shares an in-flight lookup, like Effect's
 * `Cache`, has later callers join the first caller's fiber, and workerd drops
 * a fiber resumed from another request's context once that request
 * completes, which surfaces as the joining request hanging.
 *
 * Reads set `cacheTtl`, so a value can still be served from the colo's edge
 * cache for up to a minute after it expired; a lookup's `ttl` must leave
 * that margin. Values with less than a minute left are not stored. KV
 * failures are logged and fall through to the lookup.
 */
export declare const make: <K, A, I, E, R>(key: (input: K) => string, value: Schema.Codec<A, I>, lookup: (input: K) => Effect.Effect<{
    value: A;
    ttl: Duration.Duration;
}, E, R>) => (input: K) => Effect.Effect<A, E, R | Cloudflare.Providers | Cloudflare.KV.ReadWriteNamespace | import("alchemy").RuntimeContext>;

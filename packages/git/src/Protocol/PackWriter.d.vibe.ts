/**
 * No-delta pack emission (DESIGN §3.5) — streaming, constant memory:
 *
 * ```
 * PACK + version(2) + count(manifest.length)     — count known upfront
 * for each entry:  varint(type, size) + zdata    — stored zlib bytes, verbatim
 * sha1 trailer                                   — incremental over everything
 * ```
 *
 * No compression CPU at all: objects are stored pre-deflated (`zdata` is
 * `zlib(content)` without the loose header), so pack generation is literally
 * concatenation + SHA-1. Serving no deltas / no thin packs is legal
 * (thin-pack/ofs-delta are protocol MAYs).
 *
 * The writer emits {@link PackEvent}s — raw pack bytes plus optional progress
 * marks — so the choreography layer can mux data onto side-band 1 and
 * progress onto band 2 without this module knowing about sideband framing.
 */
import * as Stream from "effect/Stream";
import type { ManifestEntry, ObjectSource, StoreError } from "./Store.vibe";
/**
 * One item of the pack emission stream: raw pack bytes, or a progress mark
 * after an entry finished (`written` of `total` objects emitted).
 */
export type PackEvent = {
    readonly _tag: "data";
    readonly bytes: Uint8Array;
} | {
    readonly _tag: "progress";
    readonly written: number;
    readonly total: number;
};
/**
 * Builds the 12-byte pack header: `"PACK"`, version 2, entry count (both
 * 32-bit big-endian).
 */
export declare const packHeader: (count: number) => Uint8Array;
/**
 * Options for {@link writePack}.
 */
export interface WritePackOptions {
    /**
     * Emit a `progress` event after every N entries (and after the last). When
     * omitted, no progress events are emitted.
     */
    readonly progressEvery?: number | undefined;
}
/**
 * Streams a complete no-delta pack for the given manifest: header + count,
 * per-object `varint(type, size)` + stored zlib bytes (read from the
 * {@link ObjectSource}), and the incremental SHA-1 trailer.
 *
 * The manifest is materialized by the closure walk before streaming so the
 * header count is exact. Emission is sequential and constant-memory: one
 * object's zdata chunks are in flight at a time.
 */
export declare const writePack: (entries: ReadonlyArray<ManifestEntry>, objects: ObjectSource, options?: WritePackOptions) => Stream.Stream<PackEvent, StoreError>;
/**
 * Drops progress events, keeping only the raw pack bytes (the non-sideband
 * response shape).
 */
export declare const packDataBytes: <E, R>(events: Stream.Stream<PackEvent, E, R>) => Stream.Stream<Uint8Array, E, R>;
/**
 * Convenience: the raw pack byte stream for a manifest, with no progress
 * events.
 */
export declare const writePackBytes: (entries: ReadonlyArray<ManifestEntry>, objects: ObjectSource) => Stream.Stream<Uint8Array, StoreError>;

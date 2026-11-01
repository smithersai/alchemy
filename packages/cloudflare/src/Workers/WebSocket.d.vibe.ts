import type * as cf from "@cloudflare/workers-types";
import * as Effect from "effect/Effect";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
import * as Schema from "effect/Schema";
import { DurableObjectState } from "./DurableObjectState.js";
export type RawWebSocket = cf.WebSocket;
declare const WebSocketAttachmentError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "WebSocketAttachmentError";
} & Readonly<A>;
/**
 * An application attachment could not be encoded, decoded, read, or written.
 * Catch this tag to choose whether to fail, ignore the attachment, or close the
 * connection. Codec failures and native exceptions are preserved in `cause`.
 */
export declare class WebSocketAttachmentError extends WebSocketAttachmentError_base<{
    /** The failed attachment operation, or `missing` for a nullish attachment. */
    readonly reason: "encode" | "decode" | "missing" | "read" | "write";
    /** A description of the failed operation. */
    readonly message: string;
    /** The original schema error or native exception, when present. */
    readonly cause?: unknown;
}> {
}
export interface WebSocket {
    readonly ws: RawWebSocket;
    send(data: string | Uint8Array): Effect.Effect<void>;
    close(code: number, reason: string): Effect.Effect<void>;
    /**
     * Encode an application value and persist the encoded representation alongside
     * this socket. The native structured-clone and serialized-size limits apply;
     * schema validation does not guarantee that the encoded value is cloneable.
     * Requires only the codec's encoding services. Does not close the socket.
     *
     * @example
     * ```ts
     * yield* socket.setAttachment(Schema.NumberFromString, 42);
     * // The unchecked deserializeAttachment() now returns "42".
     * ```
     */
    setAttachment<S extends Schema.Constraint>(schema: S, value: NoInfer<S["Type"]>): Effect.Effect<void, WebSocketAttachmentError, S["EncodingServices"]>;
    /**
     * Read and decode an application attachment, including after hibernation.
     * A nullish native value fails with reason `missing`; other values are decoded
     * from the codec's encoded side. Requires only its decoding services.
     * No envelope or schema version is added, so unchecked attachments interoperate
     * and applications own migrations and invalid-attachment policy.
     *
     * @example
     * ```ts
     * const count = yield* socket.getAttachment(Schema.NumberFromString);
     * // count is a number, not the stored string.
     * ```
     */
    getAttachment<S extends Schema.Constraint>(schema: S): Effect.Effect<S["Type"], WebSocketAttachmentError, S["DecodingServices"]>;
    serializeAttachment<T>(value: T): void;
    deserializeAttachment<T>(): T | null;
}
export declare const fromWebSocket: (ws: RawWebSocket) => WebSocket;
export interface UpgradeOptions {
    /**
     * Hibernation tags for the accepted socket. Look up every socket with a tag
     * via `state.getWebSockets(tag)` and read a socket's tags with
     * `state.getTags(socket.ws)`; both work after the Durable Object wakes from
     * hibernation, so group membership needs no in-memory state.
     *
     * Cloudflare allows at most 10 tags per WebSocket, each at most 256
     * characters.
     */
    readonly tags?: ReadonlyArray<string>;
}
/**
 * Accept a hibernatable WebSocket in a Durable Object's `fetch` handler.
 * Returns the `101 Switching Protocols` response to return from `fetch`, and
 * the server-side socket.
 *
 * @example
 * ```ts
 * const [response, socket] = yield* Cloudflare.upgrade({
 *   tags: [`user:${userId}`, "role:admin"],
 * });
 * // Later, even after hibernation:
 * for (const peer of yield* state.getWebSockets("role:admin")) {
 *   yield* peer.send("hello admins");
 * }
 * ```
 */
export declare const upgrade: (options?: UpgradeOptions | undefined) => Effect.Effect<readonly [HttpServerResponse.HttpServerResponse, WebSocket], never, DurableObjectState | import("alchemy").RuntimeContext>;
export {};

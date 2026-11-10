import * as Effect from "effect/Effect";

/** Whether `value` is a web `Response`. */
export const isWebResponse = (value: unknown): value is Response => value instanceof Response;

/** A `101 Switching Protocols` web `Response` carrying `webSocket`. */
export const webSocketUpgradeResponse = (webSocket: unknown): Response =>
  new Response(null, { status: 101, webSocket } as ResponseInit);

/** A random UUID from the host's `crypto`, generated when the Effect runs. */
export const randomUuid = Effect.sync(() => crypto.randomUUID());

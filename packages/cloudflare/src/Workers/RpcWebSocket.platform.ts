import type * as cf from "@cloudflare/workers-types";

/** The workerd globals the RPC WebSocket transport constructs. */
export const workerdGlobals = globalThis as unknown as {
  WebSocketPair: typeof cf.WebSocketPair;
  WebSocketRequestResponsePair: typeof cf.WebSocketRequestResponsePair;
  Response: typeof cf.Response;
};

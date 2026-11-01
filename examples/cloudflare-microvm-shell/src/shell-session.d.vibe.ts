import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Effect from "effect/Effect";
/**
 * The session's MicroVM coordinates: its endpoint host and the already-resolved
 * auth header map (from `AWS.Lambda.microvmAuthHeaders`). The DO speaks only
 * the VM's data plane — it never touches AWS credentials, so these plain
 * strings are all it needs.
 */
export interface MicrovmCoords {
    readonly endpoint: string;
    readonly headers: Record<string, string>;
}
declare const ShellSession_base: Effect.Effect<Cloudflare.DurableObject<ShellSession>, never, Cloudflare.Worker> & (new (_: never) => {
    /** Pin this session to a provisioned MicroVM (called by the Worker). */
    init: (next: MicrovmCoords) => Effect.Effect<void, never, Cloudflare.DurableObjectState | import("alchemy").RuntimeContext>;
    fetch: Effect.Effect<import("effect/http/HttpServerResponse").HttpServerResponse, never, Cloudflare.DurableObjectState | import("alchemy").RuntimeContext>;
    webSocketMessage: (socket: Cloudflare.WebSocket, message: string | ArrayBuffer) => Effect.Effect<void, TypeError, Cloudflare.DurableObjectState | import("alchemy").RuntimeContext>;
    webSocketClose: (socket: Cloudflare.WebSocket, code: number, reason: string) => Effect.Effect<void, never, never>;
});
/**
 * One terminal session. The hosting Worker provisions the session's MicroVM
 * (assume-role control plane) and hands the coordinates here via the `init`
 * RPC; the same VM is reused for every command in the session (no re-boot per
 * command).
 *
 * Each command received on the WebSocket is POSTed to the VM's streaming
 * `/exec` route; the combined stdout/stderr is forwarded back to the browser
 * chunk-by-chunk as the process produces it.
 */
export default class ShellSession extends ShellSession_base {
}
export {};

import * as Effect from "effect/Effect";
import { Runtime } from "./Runtime.js";
/**
 * Publish an HTTP dev server under a Worker name for local service bindings.
 * The scoped Worker forwards to a fixed upstream address through workerd's
 * HTTP service, preserving the original request URL, headers, streaming body,
 * and WebSocket upgrades. Its registry entry is removed on shutdown.
 */
export declare const registerHttpServer: (name: string, url: URL) => Effect.Effect<URL, import("./RuntimeError.shared.js").RuntimeError, Runtime | import("effect/Scope").Scope>;

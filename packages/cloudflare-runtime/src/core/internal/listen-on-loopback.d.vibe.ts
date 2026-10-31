import type * as NodeNet from "node:net";
import * as Effect from "effect/Effect";
import { SystemError } from "../RuntimeError.shared.js";
/** Listen on loopback; the owning scope closes the server, including failed starts. */
export declare const listenOnLoopback: (server: NodeNet.Server) => Effect.Effect<number, SystemError, import("effect/Scope").Scope>;

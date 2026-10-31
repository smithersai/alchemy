import type * as NodeHttp from "node:http";
import * as Effect from "effect/Effect";
import { SystemError } from "../RuntimeError.shared.js";
/** Maps listen-all/unspecified hosts to a loopback host that is safe to connect to on every platform. */
export declare const toConnectableHost: (host: string) => string;
export declare const getAddress: (server: NodeHttp.Server) => Effect.Effect<string, SystemError>;

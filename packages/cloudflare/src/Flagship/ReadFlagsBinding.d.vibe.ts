import type * as cf from "@cloudflare/workers-types";
import type { RuntimeContext } from "alchemy/RuntimeContext";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { Worker, WorkerEnvironment } from "../Workers/Worker.js";
import { ReadFlags, type ReadFlagsClient } from "./ReadFlags.vibe";
export declare const ReadFlagsBinding: Layer.Layer<ReadFlags, never, WorkerEnvironment | Worker<any>>;
/** @internal */
export declare const makeFlagshipClient: (raw: Effect.Effect<cf.Flagship, never, RuntimeContext>) => ReadFlagsClient;

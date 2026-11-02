import * as Layer from "effect/Layer";
import { Worker, WorkerEnvironment } from "../Workers/Worker.ts";
import { QuerySearchNamespace } from "./QuerySearchNamespace.vibe";
/**
 * Runtime layer for {@link QuerySearchNamespace}.
 */
export declare const QuerySearchNamespaceBinding: Layer.Layer<QuerySearchNamespace, never, WorkerEnvironment | Worker<any>>;

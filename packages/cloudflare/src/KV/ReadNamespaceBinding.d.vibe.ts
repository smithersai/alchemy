import * as Layer from "effect/Layer";
import { makeKVNamespaceHelpers } from "./NamespaceBinding.js";
import { ReadNamespace, type ReadNamespaceClient } from "./ReadNamespace.vibe";
/**
 * Implementation of the {@link ReadNamespace} binding that uses a Worker
 * binding.
 */
export declare const ReadNamespaceBinding: Layer.Layer<ReadNamespace, never, import("../index.js").WorkerEnvironment | import("../index.js").Worker<any>>;
/** Build the read half of the binding client. */
export declare const makeReadKVClient: ({ raw, use, }: ReturnType<typeof makeKVNamespaceHelpers>) => ReadNamespaceClient;

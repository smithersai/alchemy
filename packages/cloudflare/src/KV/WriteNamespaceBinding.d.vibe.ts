import * as Layer from "effect/Layer";
import { makeKVNamespaceHelpers } from "./NamespaceBinding.js";
import { WriteNamespace, type WriteNamespaceClient } from "./WriteNamespace.vibe";
/**
 * Implementation of the {@link WriteNamespace} binding that uses a Worker
 * binding.
 */
export declare const WriteNamespaceBinding: Layer.Layer<WriteNamespace, never, import("../index.js").WorkerEnvironment | import("../index.js").Worker<any>>;
/** Build the write half of the binding client. */
export declare const makeWriteKVClient: ({ use, }: ReturnType<typeof makeKVNamespaceHelpers>) => WriteNamespaceClient;

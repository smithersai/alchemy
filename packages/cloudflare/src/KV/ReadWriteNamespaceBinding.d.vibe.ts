import * as Layer from "effect/Layer";
import { type makeKVNamespaceHelpers } from "./NamespaceBinding.js";
import { ReadWriteNamespace, type ReadWriteNamespaceClient } from "./ReadWriteNamespace.vibe";
/**
 * Implementation of the {@link ReadWriteNamespace} binding that uses a
 * Worker binding.
 */
export declare const ReadWriteNamespaceBinding: Layer.Layer<ReadWriteNamespace, never, import("../index.js").WorkerEnvironment | import("../index.js").Worker<any>>;
/** Build the read-write binding client from its read and write halves. */
export declare const makeReadWriteKVClient: (helpers: ReturnType<typeof makeKVNamespaceHelpers>) => ReadWriteNamespaceClient;

import type { RuntimeContext } from "alchemy/RuntimeContext";
import * as Effect from "effect/Effect";
import type { EncodedRecord, ProduceError, RecordSchema } from "./K2Types.vibe";
import type { WriteStreamClient } from "./WriteStream.vibe";
/**
 * Build a {@link WriteStreamClient} over a transport that appends encoded
 * records. Shared by the binding, HTTP, and local implementations — they
 * differ only in `sendEncoded`. Internal — not exported from the K2 barrel.
 */
export declare const makeWriteStreamClient: (schema: RecordSchema<any> | undefined, sendEncoded: (records: ReadonlyArray<EncodedRecord>) => Effect.Effect<void, ProduceError, RuntimeContext>) => WriteStreamClient<any>;

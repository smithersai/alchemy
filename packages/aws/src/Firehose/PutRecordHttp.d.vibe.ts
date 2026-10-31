import * as Layer from "effect/Layer";
import { PutRecord } from "./PutRecord.js";
/**
 * HTTP implementation of {@link PutRecord}. At deploy time it grants
 * `firehose:PutRecord` on the bound delivery stream; at runtime it calls the
 * Firehose API with the host Function's credentials. Provide this layer on
 * the Function using the binding.
 */
export declare const PutRecordHttp: Layer.Layer<PutRecord, never, never>;

import * as Layer from "effect/Layer";
import { RecordsSink } from "./RecordsSink.js";
import { WriteRecords } from "./WriteRecords.js";
export declare const RecordsSinkHttp: Layer.Layer<RecordsSink, never, WriteRecords>;

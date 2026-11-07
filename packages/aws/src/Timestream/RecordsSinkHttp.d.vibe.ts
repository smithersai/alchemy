import * as Layer from "effect/Layer";
import { RecordsSink } from "./RecordsSink.vibe";
import { WriteRecords } from "./WriteRecords.vibe";
export declare const RecordsSinkHttp: Layer.Layer<RecordsSink, never, WriteRecords>;

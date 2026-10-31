import * as Layer from "effect/Layer";
import { PutRecords } from "./PutRecords.js";
import { StreamSink } from "./StreamSink.js";
export declare const StreamSinkHttp: Layer.Layer<StreamSink, never, PutRecords>;

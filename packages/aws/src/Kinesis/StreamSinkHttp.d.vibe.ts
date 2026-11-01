import * as Layer from "effect/Layer";
import { PutRecords } from "./PutRecords.vibe";
import { StreamSink } from "./StreamSink.vibe";
export declare const StreamSinkHttp: Layer.Layer<StreamSink, never, PutRecords>;

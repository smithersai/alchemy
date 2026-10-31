import * as Layer from "effect/Layer";
import { LogEventSink } from "./LogEventSink.js";
import { PutLogEvents } from "./PutLogEvents.js";
export declare const LogEventSinkHttp: Layer.Layer<LogEventSink, never, PutLogEvents>;

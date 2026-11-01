import * as Layer from "effect/Layer";
import { LogEventSink } from "./LogEventSink.vibe";
import { PutLogEvents } from "./PutLogEvents.vibe";
export declare const LogEventSinkHttp: Layer.Layer<LogEventSink, never, PutLogEvents>;

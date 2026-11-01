import * as Layer from "effect/Layer";
import { MetricSink } from "./MetricSink.vibe";
import { PutMetricData } from "./PutMetricData.vibe";
export declare const MetricSinkHttp: Layer.Layer<MetricSink, never, PutMetricData>;

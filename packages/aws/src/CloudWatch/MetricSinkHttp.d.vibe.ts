import * as Layer from "effect/Layer";
import { MetricSink } from "./MetricSink.js";
import { PutMetricData } from "./PutMetricData.js";
export declare const MetricSinkHttp: Layer.Layer<MetricSink, never, PutMetricData>;

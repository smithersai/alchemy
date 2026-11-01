import type lambda from "aws-lambda";
import * as Layer from "effect/Layer";
import { StreamEventSource as KinesisStreamEventSource } from "../Kinesis/StreamEventSource.vibe";
import * as Lambda from "./Function.js";
export declare const isKinesisStreamEvent: (event: any) => event is lambda.KinesisStreamEvent;
/** @binding */
export declare const StreamEventSource: Layer.Layer<KinesisStreamEventSource, never, Lambda.Function>;

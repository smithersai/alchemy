import type lambda from "aws-lambda";
import * as Layer from "effect/Layer";
import { QueueEventSource as SQSQueueEventSource } from "../SQS/QueueEventSource.js";
import * as Lambda from "./Function.js";
export declare const isSQSEvent: (event: any) => event is lambda.SQSEvent;
/** @binding */
export declare const QueueEventSource: Layer.Layer<SQSQueueEventSource, never, Lambda.Function>;

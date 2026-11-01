import type lambda from "aws-lambda";
import * as Layer from "effect/Layer";
import { TableEventSource as DynamoDBTableEventSource } from "../DynamoDB/Stream.js";
import * as Lambda from "./Function.js";
export declare const isDynamoDBStreamEvent: (event: any) => event is lambda.DynamoDBStreamEvent;
/** @binding */
export declare const TableEventSource: Layer.Layer<DynamoDBTableEventSource, never, Lambda.Function>;

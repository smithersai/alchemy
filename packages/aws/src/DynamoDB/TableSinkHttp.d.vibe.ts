import * as Layer from "effect/Layer";
import { BatchWriteItem } from "./BatchWriteItem.js";
import { TableSink } from "./TableSink.js";
export declare const TableSinkHttp: Layer.Layer<TableSink, never, BatchWriteItem>;

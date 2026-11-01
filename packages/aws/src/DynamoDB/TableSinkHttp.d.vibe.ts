import * as Layer from "effect/Layer";
import { BatchWriteItem } from "./BatchWriteItem.vibe";
import { TableSink } from "./TableSink.vibe";
export declare const TableSinkHttp: Layer.Layer<TableSink, never, BatchWriteItem>;

import * as Layer from "effect/Layer";
import { TableStreams } from "./TableStreams.vibe";
/**
 * HTTP implementation of {@link TableStreams}: grants the CDC stream read
 * actions (`cassandra:ListStreams` / `GetStream` / `GetShardIterator` /
 * `GetRecords`) on the bound table and its streams, and calls the Keyspaces
 * streams HTTP API with the function's IAM credentials.
 */
export declare const TableStreamsHttp: Layer.Layer<TableStreams, never, never>;

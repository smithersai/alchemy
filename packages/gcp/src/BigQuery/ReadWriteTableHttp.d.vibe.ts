import * as Layer from "effect/Layer";
import { ReadWriteTable } from "./ReadWriteTable.js";
/**
 * HTTP implementation of {@link ReadWriteTable} over the BigQuery REST API.
 *
 * @layer
 * @provides GCP.BigQuery.ReadWriteTable
 * @category BigQuery
 */
export declare const ReadWriteTableHttp: Layer.Layer<ReadWriteTable, never, never>;

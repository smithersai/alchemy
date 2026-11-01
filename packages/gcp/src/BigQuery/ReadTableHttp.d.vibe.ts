import * as Layer from "effect/Layer";
import { ReadTable } from "./ReadTable.js";
/**
 * HTTP implementation of {@link ReadTable} over the BigQuery REST API.
 *
 * @layer
 * @provides GCP.BigQuery.ReadTable
 * @category BigQuery
 */
export declare const ReadTableHttp: Layer.Layer<ReadTable, never, never>;

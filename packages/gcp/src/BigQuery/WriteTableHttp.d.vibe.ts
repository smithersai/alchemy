import * as Layer from "effect/Layer";
import { WriteTable } from "./WriteTable.vibe";
/**
 * HTTP implementation of {@link WriteTable} over the BigQuery REST API.
 *
 * @layer
 * @provides GCP.BigQuery.WriteTable
 * @category BigQuery
 */
export declare const WriteTableHttp: Layer.Layer<WriteTable, never, never>;

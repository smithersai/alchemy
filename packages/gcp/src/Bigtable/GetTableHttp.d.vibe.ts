import * as Layer from "effect/Layer";
import { GetTable } from "./GetTable.js";
/**
 * HTTP implementation of {@link GetTable}.
 *
 * @layer
 * @provides GCP.Bigtable.GetTable
 */
export declare const GetTableHttp: Layer.Layer<GetTable, never, never>;

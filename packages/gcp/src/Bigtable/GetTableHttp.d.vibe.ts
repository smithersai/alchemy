import * as Layer from "effect/Layer";
import { GetTable } from "./GetTable.vibe";
/**
 * HTTP implementation of {@link GetTable}.
 *
 * @layer
 * @provides GCP.Bigtable.GetTable
 */
export declare const GetTableHttp: Layer.Layer<GetTable, never, never>;

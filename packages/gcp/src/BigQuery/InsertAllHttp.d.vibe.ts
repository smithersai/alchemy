import * as Layer from "effect/Layer";
import { InsertAll } from "./InsertAll.vibe";
/**
 * HTTP implementation of {@link InsertAll}.
 *
 * @layer
 * @provides GCP.BigQuery.InsertAll
 */
export declare const InsertAllHttp: Layer.Layer<InsertAll, never, never>;

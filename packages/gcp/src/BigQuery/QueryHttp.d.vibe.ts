import * as Layer from "effect/Layer";
import { Query } from "./Query.vibe";
/**
 * HTTP implementation of {@link Query}.
 *
 * @layer
 * @provides GCP.BigQuery.Query
 */
export declare const QueryHttp: Layer.Layer<Query, never, never>;

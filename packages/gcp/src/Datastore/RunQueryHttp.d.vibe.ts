import * as Layer from "effect/Layer";
import { RunQuery } from "./RunQuery.vibe";
/**
 * HTTP implementation of {@link RunQuery}.
 *
 * @layer
 * @provides GCP.Datastore.RunQuery
 */
export declare const RunQueryHttp: Layer.Layer<RunQuery, never, never>;

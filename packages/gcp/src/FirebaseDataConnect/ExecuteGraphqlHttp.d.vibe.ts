import * as Layer from "effect/Layer";
import { ExecuteGraphql } from "./ExecuteGraphql.js";
/**
 * HTTP implementation of {@link ExecuteGraphql}.
 *
 * @layer
 * @provides GCP.FirebaseDataConnect.ExecuteGraphql
 */
export declare const ExecuteGraphqlHttp: Layer.Layer<ExecuteGraphql, never, never>;

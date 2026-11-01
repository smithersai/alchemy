import * as Layer from "effect/Layer";
import { ExecuteSql } from "./ExecuteSql.vibe";
/**
 * HTTP implementation of {@link ExecuteSql}.
 *
 * @layer
 * @provides GCP.SQL.ExecuteSql
 */
export declare const ExecuteSqlHttp: Layer.Layer<ExecuteSql, never, never>;

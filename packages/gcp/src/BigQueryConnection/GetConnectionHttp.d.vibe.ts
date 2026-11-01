import * as Layer from "effect/Layer";
import { GetConnection } from "./GetConnection.vibe";
/**
 * HTTP implementation of {@link GetConnection}.
 *
 * @layer
 * @provides GCP.BigQueryConnection.GetConnection
 */
export declare const GetConnectionHttp: Layer.Layer<GetConnection, never, never>;

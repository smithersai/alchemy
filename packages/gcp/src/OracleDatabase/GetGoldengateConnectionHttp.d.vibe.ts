import * as Layer from "effect/Layer";
import { GetGoldengateConnection } from "./GetGoldengateConnection.vibe";
/**
 * HTTP implementation of {@link GetGoldengateConnection}.
 *
 * @layer
 * @provides GCP.OracleDatabase.GetGoldengateConnection
 */
export declare const GetGoldengateConnectionHttp: Layer.Layer<GetGoldengateConnection, never, never>;

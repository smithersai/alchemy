import * as Layer from "effect/Layer";
import { GetOdbNetwork } from "./GetOdbNetwork.vibe";
/**
 * HTTP implementation of {@link GetOdbNetwork}.
 *
 * @layer
 * @provides GCP.OracleDatabase.GetOdbNetwork
 */
export declare const GetOdbNetworkHttp: Layer.Layer<GetOdbNetwork, never, never>;

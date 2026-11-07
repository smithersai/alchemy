import * as Layer from "effect/Layer";
import { GetConnectionInfo } from "./GetConnectionInfo.vibe";
/**
 * HTTP implementation of {@link GetConnectionInfo}.
 *
 * @layer
 * @provides GCP.AlloyDB.GetConnectionInfo
 */
export declare const GetConnectionInfoHttp: Layer.Layer<GetConnectionInfo, never, never>;

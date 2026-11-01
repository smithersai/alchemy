import * as Layer from "effect/Layer";
import { GetDbSystem } from "./GetDbSystem.vibe";
/**
 * HTTP implementation of {@link GetDbSystem}.
 *
 * @layer
 * @provides GCP.OracleDatabase.GetDbSystem
 */
export declare const GetDbSystemHttp: Layer.Layer<GetDbSystem, never, never>;

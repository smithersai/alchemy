import * as Layer from "effect/Layer";
import { GetDdl } from "./GetDdl.vibe";
/**
 * HTTP implementation of {@link GetDdl}.
 *
 * @layer
 * @provides GCP.Spanner.GetDdl
 */
export declare const GetDdlHttp: Layer.Layer<GetDdl, never, never>;

import * as Layer from "effect/Layer";
import { GetVersion } from "./GetVersion.js";
/**
 * HTTP implementation of {@link GetVersion}.
 *
 * @layer
 * @provides GCP.ML.GetVersion
 */
export declare const GetVersionHttp: Layer.Layer<GetVersion, never, never>;

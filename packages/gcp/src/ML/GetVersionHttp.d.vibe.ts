import * as Layer from "effect/Layer";
import { GetVersion } from "./GetVersion.vibe";
/**
 * HTTP implementation of {@link GetVersion}.
 *
 * @layer
 * @provides GCP.ML.GetVersion
 */
export declare const GetVersionHttp: Layer.Layer<GetVersion, never, never>;

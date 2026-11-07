import * as Layer from "effect/Layer";
import { GetEnvironment } from "./GetEnvironment.vibe";
/**
 * HTTP implementation of {@link GetEnvironment}.
 *
 * @layer
 * @provides GCP.Composer.GetEnvironment
 */
export declare const GetEnvironmentHttp: Layer.Layer<GetEnvironment, never, never>;

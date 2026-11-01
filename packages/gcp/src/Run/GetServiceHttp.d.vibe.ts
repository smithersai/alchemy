import * as Layer from "effect/Layer";
import { GetService } from "./GetService.vibe";
/**
 * HTTP implementation of {@link GetService}.
 *
 * @layer
 * @provides GCP.Run.GetService
 */
export declare const GetServiceHttp: Layer.Layer<GetService, never, never>;

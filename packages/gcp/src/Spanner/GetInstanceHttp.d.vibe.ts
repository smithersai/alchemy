import * as Layer from "effect/Layer";
import { GetInstance } from "./GetInstance.vibe";
/**
 * HTTP implementation of {@link GetInstance}.
 *
 * @layer
 * @provides GCP.Spanner.GetInstance
 */
export declare const GetInstanceHttp: Layer.Layer<GetInstance, never, never>;

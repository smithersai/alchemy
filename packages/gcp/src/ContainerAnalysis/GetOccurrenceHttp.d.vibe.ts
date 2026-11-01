import * as Layer from "effect/Layer";
import { GetOccurrence } from "./GetOccurrence.vibe";
/**
 * HTTP implementation of {@link GetOccurrence}.
 *
 * @layer
 * @provides GCP.ContainerAnalysis.GetOccurrence
 */
export declare const GetOccurrenceHttp: Layer.Layer<GetOccurrence, never, never>;

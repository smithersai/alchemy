import * as Layer from "effect/Layer";
import { Recognize } from "./Recognize.vibe";
/**
 * HTTP implementation of {@link Recognize}.
 *
 * @layer
 * @provides GCP.Speech.Recognize
 */
export declare const RecognizeHttp: Layer.Layer<Recognize, never, never>;

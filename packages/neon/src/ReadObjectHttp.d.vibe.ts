import * as Layer from "effect/Layer";
import { ReadObject } from "./ReadObject.vibe";
/**
 * Typed object reads using injected or automatically scoped credentials.
 *
 * @layer
 * @product Bucket
 * @provides ReadObject
 */
export declare const ReadObjectHttp: Layer.Layer<ReadObject, never, never>;

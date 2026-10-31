import * as Layer from "effect/Layer";
import { WriteObject } from "./WriteObject.vibe";
/**
 * Typed object writes using injected or automatically scoped credentials.
 *
 * @layer
 * @product Bucket
 * @provides WriteObject
 */
export declare const WriteObjectHttp: Layer.Layer<WriteObject, never, never>;

import * as Layer from "effect/Layer";
import { PutObject } from "./PutObject.js";
/**
 * HTTP implementation of {@link PutObject}. Calls distilled S3
 * `putObject` against the Tigris endpoint with the bucket's credentials.
 *
 * @layer
 * @product Bucket
 * @provides Fly.PutObject
 */
export declare const PutObjectHttp: Layer.Layer<PutObject, never, never>;

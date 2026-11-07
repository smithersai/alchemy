import * as Layer from "effect/Layer";
import { WriteBucket } from "./WriteBucket.vibe";
/**
 * HTTP implementation of {@link WriteBucket} over the Cloud Storage JSON API.
 *
 * @layer
 * @provides GCP.Storage.WriteBucket
 * @category Storage
 */
export declare const WriteBucketHttp: Layer.Layer<WriteBucket, never, never>;

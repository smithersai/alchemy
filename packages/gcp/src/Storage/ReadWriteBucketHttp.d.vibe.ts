import * as Layer from "effect/Layer";
import { ReadWriteBucket } from "./ReadWriteBucket.js";
/**
 * HTTP implementation of {@link ReadWriteBucket} over the Cloud Storage JSON API.
 *
 * @layer
 * @provides GCP.Storage.ReadWriteBucket
 * @category Storage
 */
export declare const ReadWriteBucketHttp: Layer.Layer<ReadWriteBucket, never, never>;

import * as Layer from "effect/Layer";
import { ReadBucket } from "./ReadBucket.vibe";
/**
 * HTTP implementation of {@link ReadBucket} over the Cloud Storage JSON API.
 *
 * @layer
 * @provides GCP.Storage.ReadBucket
 * @category Storage
 */
export declare const ReadBucketHttp: Layer.Layer<ReadBucket, never, never>;

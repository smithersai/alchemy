import * as Layer from "effect/Layer";
import { GetPartitions } from "./GetPartitions.js";
/**
 * HTTP implementation of {@link GetPartitions}.
 *
 * @layer
 * @provides GCP.PubSubLite.GetPartitions
 */
export declare const GetPartitionsHttp: Layer.Layer<GetPartitions, never, import("@distilled.cloud/gcp/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;

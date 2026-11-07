import * as Layer from "effect/Layer";
import { ComputeHeadCursor } from "./ComputeHeadCursor.vibe";
/**
 * HTTP implementation of {@link ComputeHeadCursor}.
 *
 * @layer
 * @provides GCP.PubSubLite.ComputeHeadCursor
 */
export declare const ComputeHeadCursorHttp: Layer.Layer<ComputeHeadCursor, never, import("@distilled.cloud/gcp/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;

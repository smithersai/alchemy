import * as Layer from "effect/Layer";
import { CommitCursor } from "./CommitCursor.vibe";
/**
 * HTTP implementation of {@link CommitCursor}.
 *
 * @layer
 * @provides GCP.PubSubLite.CommitCursor
 */
export declare const CommitCursorHttp: Layer.Layer<CommitCursor, never, import("@distilled.cloud/gcp/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;

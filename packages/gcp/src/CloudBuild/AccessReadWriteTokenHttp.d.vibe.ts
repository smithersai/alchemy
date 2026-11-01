import * as cloudbuild from "@distilled.cloud/gcp/cloudbuild_v2";
import * as Layer from "effect/Layer";
import { AccessReadWriteToken } from "./AccessReadWriteToken.vibe";
/**
 * HTTP implementation of {@link AccessReadWriteToken}.
 *
 * @layer
 * @provides GCP.CloudBuild.AccessReadWriteToken
 */
export declare const AccessReadWriteTokenHttp: Layer.Layer<AccessReadWriteToken, never, cloudbuild.GcpOpContext>;

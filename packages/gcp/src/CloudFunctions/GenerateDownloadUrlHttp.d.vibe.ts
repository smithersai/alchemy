import * as Layer from "effect/Layer";
import { GenerateDownloadUrl } from "./GenerateDownloadUrl.vibe";
/**
 * HTTP implementation of {@link GenerateDownloadUrl}.
 *
 * @layer
 * @provides GCP.CloudFunctions.GenerateDownloadUrl
 */
export declare const GenerateDownloadUrlHttp: Layer.Layer<GenerateDownloadUrl, never, never>;

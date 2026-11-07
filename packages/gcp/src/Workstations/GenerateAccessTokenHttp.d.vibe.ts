import * as Layer from "effect/Layer";
import { GenerateAccessToken } from "./GenerateAccessToken.vibe";
/**
 * HTTP implementation of {@link GenerateAccessToken}.
 *
 * @layer
 * @provides GCP.Workstations.GenerateAccessToken
 */
export declare const GenerateAccessTokenHttp: Layer.Layer<GenerateAccessToken, never, never>;

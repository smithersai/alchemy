import * as Layer from "effect/Layer";
import { FetchReadWriteToken } from "./FetchReadWriteToken.js";
/**
 * HTTP implementation of {@link FetchReadWriteToken}.
 *
 * @layer
 * @provides GCP.DeveloperConnect.FetchReadWriteToken
 */
export declare const FetchReadWriteTokenHttp: Layer.Layer<FetchReadWriteToken, never, never>;

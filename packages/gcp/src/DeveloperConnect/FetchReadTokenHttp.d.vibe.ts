import * as Layer from "effect/Layer";
import { FetchReadToken } from "./FetchReadToken.vibe";
/**
 * HTTP implementation of {@link FetchReadToken}.
 *
 * @layer
 * @provides GCP.DeveloperConnect.FetchReadToken
 */
export declare const FetchReadTokenHttp: Layer.Layer<FetchReadToken, never, never>;

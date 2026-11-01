import * as Layer from "effect/Layer";
import { GetUserWorkloadsSecret } from "./GetUserWorkloadsSecret.vibe";
/**
 * HTTP implementation of {@link GetUserWorkloadsSecret}.
 *
 * @layer
 * @provides GCP.Composer.GetUserWorkloadsSecret
 */
export declare const GetUserWorkloadsSecretHttp: Layer.Layer<GetUserWorkloadsSecret, never, never>;

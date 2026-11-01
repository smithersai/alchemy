import * as Layer from "effect/Layer";
import { GetUserWorkloadsSecret } from "./GetUserWorkloadsSecret.js";
/**
 * HTTP implementation of {@link GetUserWorkloadsSecret}.
 *
 * @layer
 * @provides GCP.Composer.GetUserWorkloadsSecret
 */
export declare const GetUserWorkloadsSecretHttp: Layer.Layer<GetUserWorkloadsSecret, never, never>;

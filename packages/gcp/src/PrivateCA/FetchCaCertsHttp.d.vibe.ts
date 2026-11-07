import * as Layer from "effect/Layer";
import { FetchCaCerts } from "./FetchCaCerts.vibe";
/**
 * HTTP implementation of {@link FetchCaCerts}.
 *
 * @layer
 * @provides GCP.PrivateCA.FetchCaCerts
 */
export declare const FetchCaCertsHttp: Layer.Layer<FetchCaCerts, never, never>;

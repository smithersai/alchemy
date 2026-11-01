import * as Layer from "effect/Layer";
import { GetReservation } from "./GetReservation.js";
/**
 * HTTP implementation of {@link GetReservation}.
 *
 * @layer
 * @provides GCP.PubSubLite.GetReservation
 */
export declare const GetReservationHttp: Layer.Layer<GetReservation, never, import("@distilled.cloud/gcp/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;

import * as Layer from "effect/Layer";
import { ValidateAttestation } from "./ValidateAttestation.vibe";
/**
 * HTTP implementation of {@link ValidateAttestation}.
 *
 * @layer
 * @provides GCP.BinaryAuthorization.ValidateAttestation
 */
export declare const ValidateAttestationHttp: Layer.Layer<ValidateAttestation, never, never>;

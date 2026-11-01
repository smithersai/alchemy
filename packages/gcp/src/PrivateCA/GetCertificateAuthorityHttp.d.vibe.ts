import * as Layer from "effect/Layer";
import { GetCertificateAuthority } from "./GetCertificateAuthority.vibe";
/**
 * HTTP implementation of {@link GetCertificateAuthority}.
 *
 * @layer
 * @provides GCP.PrivateCA.GetCertificateAuthority
 */
export declare const GetCertificateAuthorityHttp: Layer.Layer<GetCertificateAuthority, never, never>;

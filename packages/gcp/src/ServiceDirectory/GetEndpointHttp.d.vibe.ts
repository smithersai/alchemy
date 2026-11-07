import * as Layer from "effect/Layer";
import { GetEndpoint } from "./GetEndpoint.vibe";
/**
 * HTTP implementation of {@link GetEndpoint}.
 *
 * @layer
 * @provides GCP.ServiceDirectory.GetEndpoint
 */
export declare const GetEndpointHttp: Layer.Layer<GetEndpoint, never, never>;

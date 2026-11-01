import * as Layer from "effect/Layer";
import { GetVpcEndpointServiceName } from "./GetVpcEndpointServiceName.vibe";
/**
 * HTTP implementation of {@link GetVpcEndpointServiceName}. At deploy time
 * it grants `dsql:GetVpcEndpointServiceName` on the cluster to the host
 * Function; at runtime it calls the DSQL control plane with the Function's
 * own credentials.
 */
export declare const GetVpcEndpointServiceNameHttp: Layer.Layer<GetVpcEndpointServiceName, never, never>;

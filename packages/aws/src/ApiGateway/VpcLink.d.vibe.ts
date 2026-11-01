import * as ag from "@distilled.cloud/aws/api-gateway";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { AWSEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.vibe";
export interface VpcLinkProps {
    /**
     * Name of the VPC link.
     *
     * If omitted, Alchemy generates a deterministic physical name.
     */
    name?: string;
    /**
     * Target ARNs for the integration (e.g. load balancer ARNs).
     */
    targetArns: string[];
    /** Description of the VPC link. */
    description?: string;
    /** User-defined tags for the VPC link. */
    tags?: Record<string, string>;
}
/** @resource */
export interface VpcLink extends Resource<"AWS.ApiGateway.VpcLink", VpcLinkProps, {
    vpcLinkId: string;
    name: string | undefined;
    description: string | undefined;
    targetArns: string[] | undefined;
    status: ag.VpcLinkStatus | undefined;
    statusMessage: string | undefined;
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * VPC link for private integrations (`connectionType: "VPC_LINK"` on a method integration).
 *
 * ### Private integrations
 * **Example:** Create a VPC link
 * ```typescript
 * const link = yield* ApiGateway.VpcLink("NlbLink", {
 *   description: "Link to internal NLB",
 *   targetArns: [nlb.loadBalancerArn],
 * });
 *
 * yield* ApiGateway.Method("PrivateGet", {
 *   restApiId: api.restApiId,
 *   resourceId: resource.resourceId,
 *   httpMethod: "GET",
 *   integration: {
 *     type: "HTTP_PROXY",
 *     integrationHttpMethod: "GET",
 *     uri: "https://api.internal.example.com/hello",
 *     connectionType: "VPC_LINK",
 *     connectionId: link.vpcLinkId,
 *   },
 * });
 * ```
 */
declare const VpcLinkResource: import("alchemy").ResourceClass<VpcLink>;
export { VpcLinkResource as VpcLink };
export declare const VpcLinkProvider: () => import("effect/Layer").Layer<Provider.Provider<VpcLink>, never, AWSEnvironment | import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;

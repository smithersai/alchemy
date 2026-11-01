import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.js";
declare const ServiceNetworkVpcAssociationUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ServiceNetworkVpcAssociationUnexpectedResponse";
} & Readonly<A>;
export declare class ServiceNetworkVpcAssociationUnexpectedResponse extends ServiceNetworkVpcAssociationUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface ServiceNetworkVpcAssociationProps {
    /**
     * ID or ARN of the service network to associate. Immutable — changing it
     * replaces the association.
     */
    serviceNetworkIdentifier: string;
    /**
     * ID of the VPC to associate. Immutable — changing it replaces the
     * association.
     */
    vpcIdentifier: string;
    /**
     * Security group IDs controlling access from the VPC to the service network.
     */
    securityGroupIds?: string[];
    /**
     * User-defined tags to apply to the association.
     */
    tags?: Record<string, string>;
}
export interface ServiceNetworkVpcAssociation extends Resource<"AWS.VpcLattice.ServiceNetworkVpcAssociation", ServiceNetworkVpcAssociationProps, {
    /**
     * Service-assigned unique ID of the association.
     */
    associationId: string;
    /**
     * ARN of the association.
     */
    associationArn: string;
    /**
     * Current lifecycle status (e.g. `ACTIVE`, `CREATE_IN_PROGRESS`).
     */
    status: string;
    /**
     * ID of the associated service network.
     */
    serviceNetworkId?: string;
    /**
     * ID of the associated VPC.
     */
    vpcId?: string;
    /**
     * Current tags reported for the association.
     */
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * Associates a VPC with a VPC Lattice service network, letting workloads in the
 * VPC reach every service in the network (subject to auth policies). The most
 * common VPC Lattice wiring step.
 *
 * ### Associating a VPC
 * **Example:** Basic Association
 * ```typescript
 * const assoc = yield* ServiceNetworkVpcAssociation("AppVpcLink", {
 *   serviceNetworkIdentifier: network.serviceNetworkId,
 *   vpcIdentifier: vpc.vpcId,
 *   securityGroupIds: [sg.groupId],
 * });
 * ```
 *
 * @resource
 */
export declare const ServiceNetworkVpcAssociation: import("alchemy").ResourceClass<ServiceNetworkVpcAssociation>;
export declare const ServiceNetworkVpcAssociationProvider: () => import("effect/Layer").Layer<Provider.Provider<ServiceNetworkVpcAssociation>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};

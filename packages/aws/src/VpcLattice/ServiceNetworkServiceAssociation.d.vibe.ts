import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.ts";
declare const ServiceNetworkServiceAssociationUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ServiceNetworkServiceAssociationUnexpectedResponse";
} & Readonly<A>;
export declare class ServiceNetworkServiceAssociationUnexpectedResponse extends ServiceNetworkServiceAssociationUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface ServiceNetworkServiceAssociationProps {
    /**
     * ID or ARN of the service network. Immutable — changing it replaces the
     * association.
     */
    serviceNetworkIdentifier: string;
    /**
     * ID or ARN of the lattice service to associate. Immutable — changing it
     * replaces the association.
     */
    serviceIdentifier: string;
    /**
     * User-defined tags to apply to the association.
     */
    tags?: Record<string, string>;
}
export interface ServiceNetworkServiceAssociation extends Resource<"AWS.VpcLattice.ServiceNetworkServiceAssociation", ServiceNetworkServiceAssociationProps, {
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
     * ID of the associated lattice service.
     */
    serviceId?: string;
    /**
     * ID of the service network.
     */
    serviceNetworkId?: string;
    /**
     * DNS name clients in associated VPCs resolve the service by.
     */
    dnsName?: string;
    /**
     * Current tags reported for the association.
     */
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * Associates a VPC Lattice service with a service network, making the
 * service reachable from every VPC associated with that network.
 *
 * ### Associating a Service
 * **Example:** Basic Association
 * ```typescript
 * const assoc = yield* ServiceNetworkServiceAssociation("PaymentsLink", {
 *   serviceNetworkIdentifier: network.serviceNetworkId,
 *   serviceIdentifier: service.serviceId,
 * });
 * ```
 *
 * @resource
 */
export declare const ServiceNetworkServiceAssociation: import("alchemy").ResourceClass<ServiceNetworkServiceAssociation>;
export declare const ServiceNetworkServiceAssociationProvider: () => import("effect/Layer").Layer<Provider.Provider<ServiceNetworkServiceAssociation>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};

import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type * as Duration from "effect/Duration";
import type { Providers } from "../Providers.ts";
import type { ServiceNetworkAuthType } from "./ServiceNetwork.ts";
declare const VpcLatticeServiceUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "VpcLatticeServiceUnexpectedResponse";
} & Readonly<A>;
export declare class VpcLatticeServiceUnexpectedResponse extends VpcLatticeServiceUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface ServiceProps {
    /**
     * Name of the service. If omitted, a unique name is generated. Immutable —
     * changing it replaces the resource.
     */
    name?: string;
    /**
     * Authorization type for the service.
     * @default "NONE"
     */
    authType?: ServiceNetworkAuthType;
    /**
     * Custom domain name for the service. Immutable — changing it replaces the
     * resource.
     */
    customDomainName?: string;
    /**
     * ARN of an ACM certificate for the custom domain (HTTPS listeners).
     */
    certificateArn?: string;
    /**
     * Idle timeout for connections to the service, e.g. `"60 seconds"` or
     * `Duration.minutes(1)` (a bare number is milliseconds). Rounded to whole
     * seconds on the wire.
     */
    idleTimeout?: Duration.Input;
    /**
     * User-defined tags to apply to the service.
     */
    tags?: Record<string, string>;
}
export interface Service extends Resource<"AWS.VpcLattice.Service", ServiceProps, {
    /**
     * Service-assigned unique ID of the service.
     */
    serviceId: string;
    /**
     * ARN of the service.
     */
    serviceArn: string;
    /**
     * Physical name of the service.
     */
    name: string;
    /**
     * Current lifecycle status (e.g. `ACTIVE`).
     */
    status: string;
    /**
     * Lattice-generated DNS name clients resolve the service by.
     */
    dnsName?: string;
    /**
     * Effective authorization type.
     */
    authType: ServiceNetworkAuthType;
    /**
     * Current tags reported for the service.
     */
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * An Amazon VPC Lattice service — an independently deployable unit of software
 * (running on Lambda, ECS, EC2, or elsewhere) that is made discoverable through
 * a service network. Cheap control-plane resource.
 *
 * ### Creating Services
 * **Example:** Basic Service
 * ```typescript
 * const service = yield* Service("PaymentsService", {});
 * ```
 *
 * **Example:** Service with Custom Domain
 * ```typescript
 * const service = yield* Service("PaymentsService", {
 *   customDomainName: "payments.internal.example.com",
 *   certificateArn: cert.certificateArn,
 *   authType: "AWS_IAM",
 *   idleTimeout: "60 seconds",
 * });
 * ```
 *
 * @resource
 */
export declare const Service: import("alchemy").ResourceClass<Service>;
export declare const ServiceProvider: () => import("effect/Layer").Layer<Provider.Provider<Service>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};

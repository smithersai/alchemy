import * as ag from "@distilled.cloud/aws/api-gateway";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import * as Redacted from "effect/Redacted";
import type { Providers } from "../Providers.js";
export interface DomainNameProps {
    /** The custom domain name (e.g. `api.example.com`). */
    domainName: string;
    /** Display name of a self-managed edge certificate. */
    certificateName?: string;
    /** PEM body of a self-managed edge certificate. */
    certificateBody?: string;
    /**
     * The private key of the server certificate (self-managed certificates).
     * Secret key material — wrap with `Redacted.make` so state encoding
     * preserves redaction.
     */
    certificatePrivateKey?: Redacted.Redacted<string>;
    /** PEM chain of a self-managed edge certificate. */
    certificateChain?: string;
    /** ARN of an ACM certificate for EDGE endpoints (must live in us-east-1). */
    certificateArn?: string;
    /** Display name of the regional certificate. */
    regionalCertificateName?: string;
    /** ARN of an ACM certificate for REGIONAL endpoints (same region as the API). */
    regionalCertificateArn?: string;
    /** Endpoint type for the domain (EDGE, REGIONAL, or PRIVATE). */
    endpointConfiguration?: ag.EndpointConfiguration;
    /**
     * Minimum TLS version served (e.g. `TLS_1_2`).
     * @default "TLS_1_2"
     */
    securityPolicy?: ag.SecurityPolicy;
    /** Access mode of the domain name endpoint. */
    endpointAccessMode?: ag.EndpointAccessMode;
    /** Mutual TLS (client certificate) authentication configuration. */
    mutualTlsAuthentication?: ag.MutualTlsAuthenticationInput;
    /** ARN of the certificate proving domain ownership when mutual TLS is enabled. */
    ownershipVerificationCertificateArn?: string;
    /** Resource policy (JSON) for private custom domain names. */
    policy?: string;
    /** Routing mode of the domain name (base-path vs routing-rule based). */
    routingMode?: ag.RoutingMode;
    /** User-defined tags for the domain name. */
    tags?: Record<string, string>;
}
/** @resource */
export interface DomainName extends Resource<"AWS.ApiGateway.DomainName", DomainNameProps, {
    domainName: string;
    regionalDomainName: string | undefined;
    regionalHostedZoneId: string | undefined;
    distributionDomainName: string | undefined;
    distributionHostedZoneId: string | undefined;
    domainNameArn: string | undefined;
    tags: Record<string, string>;
    /**
     * Certificates, TLS policy, endpoint configuration and mutual TLS
     * settings, as observed. Lets `alchemy drift` detect out-of-band
     * changes.
     */
    configuration?: {
        certificateArn?: string;
        regionalCertificateArn?: string;
        securityPolicy?: string;
        endpointTypes?: string[];
        ipAddressType?: string;
        mutualTlsAuthentication?: {
            truststoreUri?: string;
            truststoreVersion?: string;
        };
    };
}, never, Providers> {
}
/**
 * Custom domain name for an Amazon API Gateway REST API.
 *
 * ### Custom domain
 * **Example:** Regional custom domain
 * ```typescript
 * const domain = yield* ApiGateway.DomainName("ApiDomain", {
 *   domainName: "api.example.com",
 *   regionalCertificateArn: cert.certificateArn,
 *   endpointConfiguration: { types: ["REGIONAL"] },
 *   securityPolicy: "TLS_1_2",
 * });
 * ```
 */
declare const DomainNameResource: import("alchemy").ResourceClass<DomainName>;
export { DomainNameResource as DomainName };
export declare const DomainNameProvider: () => import("effect/Layer").Layer<Provider.Provider<DomainName>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;

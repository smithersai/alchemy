import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type * as Duration from "effect/Duration";
import type { Providers } from "../Providers.ts";
export interface PrivateDnsNamespaceProps {
    /**
     * Name of the namespace — services are discoverable in DNS as
     * `{service}.{name}` inside the associated VPC (e.g. `internal.example.com`
     * yields `backend.internal.example.com`). Changing the name replaces the
     * namespace.
     * @default a generated DNS-compatible physical name
     */
    name?: string;
    /**
     * The ID of the Amazon VPC that the private DNS namespace is associated
     * with (a Route 53 private hosted zone is created and associated with it).
     * Changing the VPC replaces the namespace.
     */
    vpc: string;
    /**
     * A description for the namespace.
     */
    description?: string;
    /**
     * The TTL of the SOA record for the namespace's Route 53 private hosted
     * zone (e.g. `"60 seconds"` or `Duration.seconds(60)`; a bare number is
     * milliseconds).
     */
    ttl?: Duration.Input;
    /**
     * Tags to apply to the namespace. Merged with internal Alchemy tags.
     */
    tags?: Record<string, string>;
}
export interface PrivateDnsNamespace extends Resource<"AWS.CloudMap.PrivateDnsNamespace", PrivateDnsNamespaceProps, {
    /**
     * The unique identifier of the namespace.
     */
    namespaceId: string;
    /**
     * The ARN of the namespace.
     */
    namespaceArn: string;
    /**
     * Name of the namespace (the private DNS domain, e.g. `internal.example`).
     */
    namespaceName: string;
    /**
     * The private Route 53 hosted zone Cloud Map created for the namespace.
     */
    hostedZoneId: string | undefined;
}, {}, Providers> {
}
/**
 * An AWS Cloud Map private DNS namespace — the DNS-based service registry
 * that ECS Service Connect and `serviceRegistries` point at. Services
 * registered in the namespace are discoverable inside the associated VPC via
 * DNS (`{service}.{namespace}`) and from anywhere via the
 * `DiscoverInstances` API.
 *
 * Namespace creation and deletion are asynchronous — the provider polls the
 * Cloud Map operations API (bounded) until they complete, which typically
 * takes 30-60 seconds.
 * ### Creating Namespaces
 * **Example:** Private DNS Namespace in a VPC
 * ```typescript
 * import * as AWS from "@alchemy.run/aws";
 *
 * const vpc = yield* AWS.EC2.Vpc("AppVpc", { cidrBlock: "10.0.0.0/16" });
 * const namespace = yield* AWS.CloudMap.PrivateDnsNamespace("AppNamespace", {
 *   name: "internal.example.com",
 *   vpc: vpc.vpcId,
 * });
 * ```
 *
 * **Example:** Namespace with SOA TTL and Description
 * ```typescript
 * const namespace = yield* AWS.CloudMap.PrivateDnsNamespace("AppNamespace", {
 *   name: "internal.example.com",
 *   vpc: vpc.vpcId,
 *   description: "service discovery for the app tier",
 *   ttl: "60 seconds",
 * });
 * ```
 *
 * ### Registering Services
 * **Example:** Service with A Records
 * ```typescript
 * const service = yield* AWS.CloudMap.Service("Backend", {
 *   namespaceId: namespace.namespaceId,
 *   dnsRecords: [{ type: "A", ttl: "10 seconds" }],
 *   routingPolicy: "MULTIVALUE",
 * });
 * ```
 *
 * @resource
 */
export declare const PrivateDnsNamespace: import("alchemy").ResourceClass<PrivateDnsNamespace>;
export declare const PrivateDnsNamespaceProvider: () => import("effect/Layer").Layer<Provider.Provider<PrivateDnsNamespace>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;

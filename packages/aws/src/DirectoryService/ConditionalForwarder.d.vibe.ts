import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.ts";
declare const ConditionalForwarderUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ConditionalForwarderUnexpectedResponse";
} & Readonly<A>;
export declare class ConditionalForwarderUnexpectedResponse extends ConditionalForwarderUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface ConditionalForwarderProps {
    /**
     * Id of the {@link Directory} (AWS Managed Microsoft AD or AD Connector)
     * the conditional forwarder is configured on. Simple AD does not support
     * conditional forwarders. Changing the directory replaces the forwarder.
     */
    directoryId: string;
    /**
     * Fully qualified domain name of the remote domain DNS queries are
     * forwarded to, e.g. `partner.example.com`. Changing the domain replaces
     * the forwarder.
     */
    remoteDomainName: string;
    /**
     * IP addresses of the remote domain's DNS servers. Updated in place.
     */
    dnsIpAddrs: string[];
}
export interface ConditionalForwarder extends Resource<"AWS.DirectoryService.ConditionalForwarder", ConditionalForwarderProps, {
    /** The ID of the directory the forwarder is attached to. */
    directoryId: string;
    /** The fully qualified domain name the forwarder resolves. */
    remoteDomainName: string;
    /** The IP addresses of the remote DNS servers. */
    dnsIpAddrs: string[];
    /** The replication scope of the forwarder, e.g. `Domain`. */
    replicationScope: string | undefined;
}, never, Providers> {
}
/**
 * A conditional forwarder on an AWS Managed Microsoft AD (or AD Connector)
 * directory — forwards DNS queries for a remote domain to that domain's DNS
 * servers. Conditional forwarders are the prerequisite for trust
 * relationships with other domains.
 * ### Creating a Conditional Forwarder
 * **Example:** Forward a Partner Domain
 * ```typescript
 * const directory = yield* Directory("Corp", {
 *   type: "MicrosoftAD",
 *   name: "corp.example.com",
 *   password: Redacted.make("SuperSecret123!"),
 *   vpcId: vpc.vpcId,
 *   subnetIds: [subnetA.subnetId, subnetB.subnetId],
 * });
 * const forwarder = yield* ConditionalForwarder("Partner", {
 *   directoryId: directory.directoryId,
 *   remoteDomainName: "partner.example.com",
 *   dnsIpAddrs: ["10.10.0.2", "10.10.1.2"],
 * });
 * ```
 *
 * @resource
 */
export declare const ConditionalForwarder: import("alchemy").ResourceClass<ConditionalForwarder>;
export declare const ConditionalForwarderProvider: () => import("effect/Layer").Layer<Provider.Provider<ConditionalForwarder>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;
export {};

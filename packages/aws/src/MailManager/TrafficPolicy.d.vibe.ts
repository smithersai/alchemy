import * as mm from "@distilled.cloud/aws/mailmanager";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.ts";
declare const TrafficPolicyUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "TrafficPolicyUnexpectedResponse";
} & Readonly<A>;
export declare class TrafficPolicyUnexpectedResponse extends TrafficPolicyUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface TrafficPolicyProps {
    /**
     * Name of the traffic policy. If omitted, a deterministic physical name is
     * generated from the app, stage, and logical ID. Renames apply in place.
     */
    trafficPolicyName?: string;
    /**
     * Conditional statements evaluated against incoming SMTP connections and
     * message metadata (sender IP, recipient, TLS protocol, analyzer verdicts,
     * address-list membership). Each statement ALLOWs or DENYs matching
     * traffic. Updates apply in place.
     * @default []
     */
    policyStatements?: mm.PolicyStatement[];
    /**
     * Action applied to traffic that matches no policy statement.
     */
    defaultAction: mm.AcceptAction;
    /**
     * Maximum message size in bytes; larger messages are rejected.
     */
    maxMessageSizeBytes?: number;
    /**
     * Tags applied to the traffic policy. Alchemy ownership tags are merged in
     * automatically.
     */
    tags?: Record<string, string>;
}
export interface TrafficPolicy extends Resource<"AWS.MailManager.TrafficPolicy", TrafficPolicyProps, {
    /** Server-assigned ID of the traffic policy. */
    trafficPolicyId: string;
    /** ARN of the traffic policy. */
    trafficPolicyArn: string;
    /** Name of the traffic policy. */
    trafficPolicyName: string;
}, never, Providers> {
}
/**
 * An SES Mail Manager traffic policy — connection-level ALLOW/DENY rules an
 * ingress point applies before email reaches the rule set (sender CIDRs,
 * recipient patterns, TLS floor, message size cap).
 *
 * All aspects (name, statements, default action, size cap, tags) update in
 * place.
 * ### Creating Traffic Policies
 * **Example:** Deny-by-Default with an Allowed CIDR
 * ```typescript
 * import * as MailManager from "@alchemy.run/aws/MailManager";
 *
 * const policy = yield* MailManager.TrafficPolicy("Edge", {
 *   defaultAction: "DENY",
 *   policyStatements: [
 *     {
 *       Action: "ALLOW",
 *       Conditions: [
 *         {
 *           IpExpression: {
 *             Evaluate: { Attribute: "SENDER_IP" },
 *             Operator: "CIDR_MATCHES",
 *             Values: ["10.0.0.0/8"],
 *           },
 *         },
 *       ],
 *     },
 *   ],
 * });
 * ```
 *
 * **Example:** Allow All with a Size Cap
 * ```typescript
 * const policy = yield* MailManager.TrafficPolicy("Edge", {
 *   defaultAction: "ALLOW",
 *   maxMessageSizeBytes: 10 * 1024 * 1024,
 * });
 * ```
 *
 * @resource
 */
export declare const TrafficPolicy: import("alchemy").ResourceClass<TrafficPolicy>;
export declare const TrafficPolicyProvider: () => import("effect/Layer").Layer<Provider.Provider<TrafficPolicy>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};

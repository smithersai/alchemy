import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { AccountID } from "../Environment.js";
import type { Providers } from "../Providers.js";
import type { RegionID } from "../Region.js";
export type { EndpointState } from "@distilled.cloud/aws/eventbridge";
export type EndpointName = string;
export type EndpointArn = `arn:aws:events:${RegionID}:${AccountID}:endpoint/${EndpointName}`;
export interface EndpointFailoverConfig {
    /**
     * The Route 53 health check that decides when to fail over: while it is
     * unhealthy, events sent to the endpoint go to the secondary region.
     * Accepts the health check ID (`healthCheck.healthCheckId`) or its ARN.
     */
    healthCheck: string;
    /**
     * The region events are routed to while the health check is unhealthy.
     * It must be the region of the second event bus in `eventBuses`.
     */
    secondaryRegion: string;
}
export interface EndpointProps {
    /**
     * Name of the endpoint. Must match [\.\-_A-Za-z0-9]+, 1-64 characters.
     * If omitted, a unique name will be generated. Changing it replaces the
     * endpoint.
     */
    name?: EndpointName;
    /**
     * Description of the endpoint. Max 512 characters.
     */
    description?: string;
    /**
     * ARNs of the two event buses the endpoint routes to: the primary bus in
     * the stack's region and the secondary bus in `failover.secondaryRegion`.
     * Both buses must have the same name.
     */
    eventBuses: [primary: string, secondary: string];
    /**
     * When to fail over, and to which region.
     */
    failover: EndpointFailoverConfig;
    /**
     * Whether events are replicated to the secondary region's bus, so they
     * keep being processed there after a failover.
     * @default true
     */
    replication?: boolean;
    /**
     * ARN of the IAM role EventBridge assumes to replicate events. It must
     * trust `events.amazonaws.com`, allow `events:PutEvents` on both buses, and
     * let EventBridge manage its replication rule on each bus
     * (`rule/<bus>/GlobalEndpointManagedRule-*`) and pass the role to that rule's
     * target (`iam:PassRole` on the role, for `events.amazonaws.com`). See the
     * `Endpoint` examples for a least-privilege policy.
     * Required when `replication` is enabled.
     */
    roleArn?: string;
}
declare const EndpointFailed_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "EndpointFailed";
} & Readonly<A>;
/** The endpoint ended in `CREATE_FAILED` or `UPDATE_FAILED`. */
export declare class EndpointFailed extends EndpointFailed_base<{
    readonly endpointName: string;
    readonly state: string;
    readonly reason: string | undefined;
}> {
    get message(): string;
}
/**
 * An Amazon EventBridge global endpoint: one URL for publishing events that
 * EventBridge routes to an event bus in the primary region, or to the
 * same-named bus in a secondary region when a Route 53 health check fails.
 *
 * Create the same-named bus in both regions, a health check that reflects
 * the primary region's health, and (for replication) a role EventBridge can
 * use to forward events to the secondary bus. Publish through the endpoint by
 * passing it to the `PutEvents` binding.
 *
 * Endpoints do not support tags, so ownership is tracked by the
 * deterministic physical name.
 * ### Creating a Global Endpoint
 * **Example:** Fail Over Between Two Regions
 * ```typescript
 * const primary = yield* AWS.EventBridge.EventBus("Primary", { name: "orders" });
 * const secondary = yield* AWS.EventBridge.EventBus("Secondary", {
 *   name: "orders",
 *   region: "us-east-2",
 * });
 *
 * // Healthy while the primary region's API answers its health route.
 * const health = yield* AWS.Route53.HealthCheck("PrimaryHealth", {
 *   type: "HTTPS",
 *   fullyQualifiedDomainName: "api.us-east-1.example.com",
 *   resourcePath: "/health",
 *   port: 443,
 * });
 *
 * const replication = yield* AWS.IAM.Role("ReplicationRole", {
 *   // `iam:PassRole` below is scoped to roles on this path.
 *   path: "/eventbridge-replication/",
 *   assumeRolePolicyDocument: {
 *     Version: "2012-10-17",
 *     Statement: [
 *       {
 *         Effect: "Allow",
 *         Principal: { Service: "events.amazonaws.com" },
 *         Action: "sts:AssumeRole",
 *       },
 *     ],
 *   },
 *   inlinePolicies: {
 *     Replicate: {
 *       Version: "2012-10-17",
 *       Statement: [
 *         {
 *           Effect: "Allow",
 *           Action: "events:PutEvents",
 *           Resource: [primary.eventBusArn, secondary.eventBusArn],
 *         },
 *         // EventBridge manages a replication rule on each bus.
 *         {
 *           Effect: "Allow",
 *           Action: [
 *             "events:PutRule",
 *             "events:PutTargets",
 *             "events:DeleteRule",
 *             "events:RemoveTargets",
 *           ],
 *           Resource: [
 *             "arn:aws:events:us-east-1:123456789012:rule/orders/GlobalEndpointManagedRule-*",
 *             "arn:aws:events:us-east-2:123456789012:rule/orders/GlobalEndpointManagedRule-*",
 *           ],
 *         },
 *         // ...and passes this role to those rules' targets.
 *         {
 *           Effect: "Allow",
 *           Action: "iam:PassRole",
 *           Resource: "arn:aws:iam::123456789012:role/eventbridge-replication/*",
 *           Condition: { StringEquals: { "iam:PassedToService": "events.amazonaws.com" } },
 *         },
 *       ],
 *     },
 *   },
 * });
 *
 * const endpoint = yield* AWS.EventBridge.Endpoint("Orders", {
 *   eventBuses: [primary.eventBusArn, secondary.eventBusArn],
 *   failover: {
 *     healthCheck: health.healthCheckId,
 *     secondaryRegion: "us-east-2",
 *   },
 *   roleArn: replication.roleArn,
 * });
 * ```
 *
 * **Example:** Fail Over Without Replication
 * ```typescript
 * const endpoint = yield* AWS.EventBridge.Endpoint("Orders", {
 *   eventBuses: [primary.eventBusArn, secondary.eventBusArn],
 *   failover: {
 *     healthCheck: health.healthCheckId,
 *     secondaryRegion: "us-east-2",
 *   },
 *   replication: false,
 * });
 * ```
 *
 * ### Publishing Through the Endpoint
 * **Example:** Publish from a Function
 * ```typescript
 * // init — bind the endpoint (provide AWS.EventBridge.PutEventsHttp)
 * const putEvents = yield* AWS.EventBridge.PutEvents(endpoint);
 *
 * // runtime — EventBridge routes the event to the healthy region
 * yield* putEvents({
 *   Entries: [
 *     {
 *       Source: "my.app",
 *       DetailType: "OrderCreated",
 *       Detail: JSON.stringify({ orderId: "123" }),
 *     },
 *   ],
 * });
 * ```
 *
 * @resource
 */
export interface Endpoint extends Resource<"AWS.EventBridge.Endpoint", EndpointProps, {
    /** The name of the endpoint. */
    endpointName: EndpointName;
    /** The ARN of the endpoint. */
    endpointArn: EndpointArn;
    /** The ID of the endpoint, used as `EndpointId` when calling `PutEvents`. */
    endpointId: string;
    /** The URL events are published to. */
    endpointUrl: string;
    /** The ARNs of the primary and secondary event buses. */
    eventBusArns: string[];
}, never, Providers> {
}
export declare const Endpoint: import("alchemy").ResourceClass<Endpoint>;
export declare const EndpointProvider: () => import("effect/Layer").Layer<Provider.Provider<Endpoint>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;

import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.ts";
import type { PolicyDocument } from "./Policy.vibe";
export interface GroupProps {
    /**
     * Group name. If omitted, a deterministic name is generated.
     */
    groupName?: string;
    /**
     * Optional IAM path prefix.
     * @default "/"
     */
    path?: string;
    /**
     * Managed policy ARNs attached to the group.
     */
    managedPolicyArns?: string[];
    /**
     * Inline policies embedded in the group.
     */
    inlinePolicies?: Record<string, PolicyDocument>;
}
export interface Group extends Resource<"AWS.IAM.Group", GroupProps, {
    /** The ARN of the group. */
    groupArn: string;
    /** The name of the group. */
    groupName: string;
    /** The stable unique ID of the group. */
    groupId: string | undefined;
    /** The IAM path of the group. */
    path: string | undefined;
    /** Managed policy ARNs attached to the group. */
    managedPolicyArns: string[];
    /** Inline policies embedded in the group, keyed by policy name. */
    inlinePolicies: Record<string, PolicyDocument>;
}, never, Providers> {
}
/**
 * An IAM group that can own managed and inline policies.
 *
 * `Group` manages a shared authorization container for IAM users, including
 * attached managed policies and embedded inline policies.
 * ### Creating IAM Groups
 * **Example:** Group with an Inline Policy
 * ```typescript
 * const group = yield* Group("SupportGroup", {
 *   groupName: "support",
 *   inlinePolicies: {
 *     SupportReadOnly: {
 *       Version: "2012-10-17",
 *       Statement: [{
 *         Effect: "Allow",
 *         Action: ["cloudwatch:Get*", "cloudwatch:List*"],
 *         Resource: ["*"],
 *       }],
 *     },
 *   },
 * });
 * ```
 *
 * @resource
 */
export declare const Group: import("alchemy").ResourceClass<Group>;
export declare const GroupProvider: () => import("effect/Layer").Layer<Provider.Provider<Group>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;

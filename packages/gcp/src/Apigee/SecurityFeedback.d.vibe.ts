import * as apigee from "@distilled.cloud/gcp/apigee_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
export type SecurityFeedbackContext = {
    /**
     * Attribute the feedback constrains.
     */
    attribute: apigee.GoogleCloudApigeeV1SecurityFeedbackFeedbackContextAttributeEnum | (string & {});
    /**
     * Values of that attribute.
     */
    values: string[];
};
export type SecurityFeedbackProps = {
    /**
     * Apigee organization id. Defaults to the current GCP project id.
     * Immutable — changing it replaces the feedback report.
     */
    organization?: string;
    /**
     * Feedback id (the `{feedback}` segment of
     * `organizations/{org}/securityFeedback/{feedback}`). If omitted, a
     * unique name is generated from the stack, stage, and logical id.
     * Immutable — changing it replaces the report.
     */
    securityFeedbackId?: string;
    /**
     * Display name.
     */
    displayName?: string;
    /**
     * Feedback type.
     * @default "EXCLUDED_DETECTION"
     */
    feedbackType?: apigee.GoogleCloudApigeeV1SecurityFeedbackFeedbackTypeEnum | (string & {});
    /**
     * Reason for the feedback.
     */
    reason?: apigee.GoogleCloudApigeeV1SecurityFeedbackReasonEnum | (string & {});
    /**
     * Attribute/value pairs constraining the feedback.
     */
    feedbackContexts: SecurityFeedbackContext[];
    /**
     * Free-form comment. Alchemy ownership is stored in a `[alchemy …]`
     * prefix and stripped from attributes. Feedback reports have no
     * labels field.
     */
    comment?: string;
};
export type SecurityFeedback = Resource<"GCP.Apigee.SecurityFeedback", SecurityFeedbackProps, {
    /** Full resource name `organizations/{org}/securityFeedback/{feedback}`. */
    name: string;
    /** Feedback id (last path segment). */
    securityFeedbackId: string;
    /** Apigee organization id. */
    organization: string;
    /** Display name. */
    displayName: string | undefined;
    /** Feedback type. */
    feedbackType: string | undefined;
    /** Reason. */
    reason: string | undefined;
    /** Constraining contexts. */
    feedbackContexts: SecurityFeedbackContext[];
    /** User comment with the Alchemy ownership prefix stripped. */
    comment: string | undefined;
    /** RFC3339 creation timestamp. */
    createTime: string | undefined;
    /** RFC3339 last-update timestamp. */
    updateTime: string | undefined;
}, never, Providers>;
/**
 * An Advanced API Security customer feedback report.
 *
 * Feedback reports have no labels field, so Alchemy stamps ownership
 * into the comment for `list` / nuke. Name and organization are
 * identity — changing them replaces the report. Display name, type,
 * reason, contexts, and comment update in place.
 *
 * ### Creating Feedback
 * **Example:** Exclude detections from an environment
 * ```typescript
 * const feedback = yield* GCP.Apigee.SecurityFeedback("PenTest", {
 *   reason: "PENETRATION_TEST",
 *   feedbackContexts: [{
 *     attribute: "ATTRIBUTE_ENVIRONMENTS",
 *     values: ["eval"],
 *   }],
 * });
 * ```
 *
 * @resource
 * @category Apigee
 */
export declare const SecurityFeedback: import("alchemy/Resource").ResourceClass<SecurityFeedback>;
declare const SecurityFeedbackNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.Apigee.SecurityFeedbackNotResolved";
} & Readonly<A>;
export declare class SecurityFeedbackNotResolved extends SecurityFeedbackNotResolved_base<{
    resourceName: string;
}> {
}
export declare const SecurityFeedbackProvider: () => import("effect/Layer").Layer<Provider.Provider<SecurityFeedback>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | apigee.GcpOpContext>;
export {};

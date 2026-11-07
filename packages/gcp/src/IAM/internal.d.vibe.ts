import * as iam from "@distilled.cloud/gcp/iam_v2";
import * as Effect from "effect/Effect";
import { alchemyLabelKeys, sanitizeLabelValue } from "../Labels.ts";
import { type LongRunningOperation } from "../Operation.ts";
export declare const MAX_POLICY_ID = 63;
declare const ResourceNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.IAM.ResourceNotResolved";
} & Readonly<A>;
export declare class ResourceNotResolved extends ResourceNotResolved_base<{
    resourceName: string;
}> {
}
export declare const lastSegment: (value: string) => string;
export declare const attachmentPointOf: (project: string, attachmentPoint?: string) => string;
export declare const denypoliciesParent: (attachmentPoint: string) => string;
export declare const policyName: (attachmentPoint: string, policyId: string) => string;
export declare const parsePolicyName: (name: string) => {
    attachmentPoint: string;
    policyId: string;
};
export declare const toPolicyId: (id: string, requested: string | undefined, existing?: string) => Effect.Effect<string, never, import("alchemy/ResourceContext").ResourceContext | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage>;
export declare const ownershipAnnotations: (id: string) => Effect.Effect<Record<string, string>, never, import("alchemy/Stack").Stack | import("alchemy/Stage").Stage>;
export declare const hasOwnershipAnnotations: (annotations: Record<string, string | undefined> | null | undefined) => boolean;
export declare const ownedByAlchemy: (id: string, annotations: Record<string, string | undefined> | null | undefined) => Effect.Effect<boolean, never, import("alchemy/Stack").Stack | import("alchemy/Stage").Stage>;
export declare const userAnnotations: (annotations: Record<string, string | undefined> | null | undefined) => Record<string, string>;
export { alchemyLabelKeys, sanitizeLabelValue };
/** IAM descriptions are capped at 256 characters. */
export declare const DESCRIPTION_MAX = 256;
/**
 * Ownership marker for IAM resources that have no labels (service accounts,
 * workload identity pools and providers). Alchemy stamps `[alchemy alchemy-stack=… alchemy-stage=…
 * alchemy-id=…]` in front of the user description and strips it back out of
 * the `description` attribute.
 */
export declare const encodeOwnedDescription: (labels: Record<string, string>, description: string | undefined, maxLength?: number) => string;
export declare const parseOwnedDescription: (description: string | undefined) => {
    labels: Record<string, string>;
    description: string | undefined;
};
export declare const hasOwnedDescription: (description: string | undefined) => boolean;
/**
 * Wait for a long-running operation. ALREADY_EXISTS (code 6) means a
 * concurrent create won the race; reconcile observes the resource next.
 */
export declare const waitForOperation: (operation: LongRunningOperation) => Effect.Effect<LongRunningOperation, import("../Operation.ts").OperationFailed | import("../Operation.ts").OperationTimedOut | iam.GetPoliciesOperationsError, iam.GcpOpContext>;
/**
 * Wait for a delete operation. A vanished operation or NOT_FOUND (code 5)
 * means the resource is already gone.
 */
export declare const waitForDeleteOperation: (operation: LongRunningOperation) => Effect.Effect<LongRunningOperation, import("../Operation.ts").OperationFailed | import("../Operation.ts").OperationTimedOut | iam.GetPoliciesOperationsError, iam.GcpOpContext>;

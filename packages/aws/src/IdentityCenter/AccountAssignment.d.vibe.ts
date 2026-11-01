import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.js";
declare const AccountAssignmentUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "AccountAssignmentUnexpectedResponse";
} & Readonly<A>;
export declare class AccountAssignmentUnexpectedResponse extends AccountAssignmentUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
declare const AccountAssignmentOperationFailed_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "AccountAssignmentOperationFailed";
} & Readonly<A>;
export declare class AccountAssignmentOperationFailed extends AccountAssignmentOperationFailed_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface AccountAssignmentProps {
    /**
     * Explicit Identity Center instance ARN.
     * If omitted, Alchemy adopts the only visible instance.
     */
    instanceArn?: string;
    /**
     * Permission set ARN to assign.
     */
    permissionSetArn: string;
    /**
     * Principal ID from the IAM Identity Center identity store.
     */
    principalId: string;
    /**
     * Principal type.
     */
    principalType: "USER" | "GROUP";
    /**
     * Target AWS account ID.
     */
    targetId: string;
}
export interface AccountAssignment extends Resource<"AWS.IdentityCenter.AccountAssignment", AccountAssignmentProps, {
    /** The Identity Center instance the assignment lives in. */
    instanceArn: string;
    /** The permission set provisioned to the target. */
    permissionSetArn: string;
    /** The user or group ID that was assigned. */
    principalId: string;
    /** Whether the principal is a `USER` or `GROUP`. */
    principalType: "USER" | "GROUP";
    /** The AWS account ID the assignment targets. */
    targetId: string;
    /** The target type (`AWS_ACCOUNT`). */
    targetType: "AWS_ACCOUNT";
}, never, Providers> {
}
/**
 * Assigns an IAM Identity Center permission set to a user or group in an AWS
 * account.
 * ### Creating Assignments
 * **Example:** Assign A Group To A Workload Account
 * ```typescript
 * const assignment = yield* AccountAssignment("ProdAdminAssignment", {
 *   permissionSetArn: admin.permissionSetArn,
 *   principalType: "GROUP",
 *   principalId: engineers.groupId,
 *   targetId: prod.accountId,
 * });
 * ```
 *
 * @resource
 */
export declare const AccountAssignment: import("alchemy").ResourceClass<AccountAssignment>;
export declare const AccountAssignmentProvider: () => import("effect/Layer").Layer<Provider.Provider<AccountAssignment>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;
export {};

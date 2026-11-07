import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import * as Duration from "effect/Duration";
import type { Providers } from "../Providers.ts";
declare const PermissionSetUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "PermissionSetUnexpectedResponse";
} & Readonly<A>;
export declare class PermissionSetUnexpectedResponse extends PermissionSetUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface PermissionSetProps {
    /**
     * Explicit IAM Identity Center instance ARN.
     * If omitted, Alchemy adopts the only visible instance.
     */
    instanceArn?: string;
    /**
     * Permission set name.
     */
    name: string;
    /**
     * Optional human-readable description.
     */
    description?: string;
    /**
     * Optional session duration, e.g. `"8 hours"` or `Duration.hours(8)`.
     * Sent to Identity Center as an ISO-8601 string such as `PT8H` (a bare
     * number is milliseconds).
     */
    sessionDuration?: Duration.Input;
    /**
     * Optional relay state passed to supported applications.
     */
    relayState?: string;
}
export interface PermissionSet extends Resource<"AWS.IdentityCenter.PermissionSet", PermissionSetProps, {
    /** The Identity Center instance the permission set lives in. */
    instanceArn: string;
    /** The ARN of the permission set. */
    permissionSetArn: string;
    /** The name of the permission set. */
    name: string;
    /** The description of the permission set. */
    description: string | undefined;
    /** The session duration in ISO-8601 format (e.g. `PT8H`). */
    sessionDuration: string | undefined;
    /** The relay state URL users land on after federating, if set. */
    relayState: string | undefined;
    /** When the permission set was created. */
    createdDate: Date | undefined;
}, never, Providers> {
}
/**
 * An IAM Identity Center permission set.
 * ### Creating Permission Sets
 * **Example:** Administrator Access
 * ```typescript
 * const admin = yield* PermissionSet("AdministratorAccess", {
 *   name: "AdministratorAccess",
 *   description: "Administrator access for platform engineers",
 *   sessionDuration: "8 hours",
 * });
 * ```
 *
 * @resource
 */
export declare const PermissionSet: import("alchemy").ResourceClass<PermissionSet>;
export declare const PermissionSetProvider: () => import("effect/Layer").Layer<Provider.Provider<PermissionSet>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;
export {};

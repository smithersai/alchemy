import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.ts";
declare const ACLNotReady_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ACLNotReady";
} & Readonly<A>;
export declare class ACLNotReady extends ACLNotReady_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
declare const ACLUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ACLUnexpectedResponse";
} & Readonly<A>;
export declare class ACLUnexpectedResponse extends ACLUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface ACLProps {
    /**
     * Name of the Access Control List. Must be 1-40 alphanumeric characters. If
     * omitted, a deterministic physical name is generated. Changing the name
     * replaces the ACL.
     */
    aclName?: string;
    /**
     * Names of the {@link User}s in this ACL. The account's built-in `default`
     * user belongs to the reserved `open-access` ACL and cannot be added to a
     * custom ACL — reference your own {@link User}s here instead.
     * @default [] (an empty ACL)
     */
    userNames?: string[];
    /**
     * User-defined tags for the ACL.
     */
    tags?: Record<string, string>;
}
export interface ACL extends Resource<"AWS.MemoryDB.ACL", ACLProps, {
    /** Name of the ACL. */
    aclName: string;
    /** ARN of the ACL. */
    aclArn: string;
    /** Current lifecycle status (e.g. `creating`, `active`). */
    status: string;
    /** Names of the users in the ACL. */
    userNames: string[];
    /** Minimum engine version the ACL is compatible with. */
    minimumEngineVersion: string | undefined;
    /** Tags on the ACL (user + internal Alchemy tags). */
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * A MemoryDB Access Control List (ACL) — a named collection of {@link User}s
 * that a cluster authenticates against. Attach an ACL to a
 * {@link Cluster} via `aclName`.
 *
 * ACLs are free and provision quickly.
 * ### Creating an ACL
 * **Example:** ACL with a Custom User
 * ```typescript
 * const appUser = yield* User("AppUser", {
 *   authenticationMode: { type: "password", passwords: [appPassword] },
 *   accessString: "on ~* +@all",
 * });
 * const acl = yield* ACL("AppAcl", {
 *   userNames: [appUser.userName],
 * });
 * ```
 *
 * @resource
 */
export declare const ACL: import("alchemy").ResourceClass<ACL>;
export declare const ACLProvider: () => import("effect/Layer").Layer<Provider.Provider<ACL>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};

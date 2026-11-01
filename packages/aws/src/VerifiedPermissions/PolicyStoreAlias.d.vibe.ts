import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.vibe";
declare const PolicyStoreAliasUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "PolicyStoreAliasUnexpectedResponse";
} & Readonly<A>;
export declare class PolicyStoreAliasUnexpectedResponse extends PolicyStoreAliasUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface PolicyStoreAliasProps {
    /**
     * The ID of the policy store the alias points at. There is no update API
     * for aliases — changing the store replaces the alias.
     */
    policyStoreId: string;
    /**
     * Name of the alias. AWS requires every alias name to start with
     * `policy-store-alias/`; the prefix is added automatically when omitted,
     * so `"photo-app-prod"` and `"policy-store-alias/photo-app-prod"` name the
     * same alias. The full name may be at most 150 characters of letters,
     * digits, `-`, `_`, and `/`, and must be unique per account and region.
     * If omitted, a unique name is generated from the app, stage, and logical
     * ID. Changing the name replaces the alias.
     */
    aliasName?: string;
    /**
     * How the alias is deleted when the resource is destroyed. `SoftDelete`
     * keeps the alias name reserved in `PendingDeletion` state for a recovery
     * window; `HardDelete` frees the name immediately.
     * @default "HardDelete"
     */
    deletionMode?: "SoftDelete" | "HardDelete";
}
export interface PolicyStoreAlias extends Resource<"AWS.VerifiedPermissions.PolicyStoreAlias", PolicyStoreAliasProps, {
    /**
     * Full name of the alias, including the `policy-store-alias/` prefix —
     * usable in place of a policy store ID in authorization requests.
     */
    aliasName: string;
    /**
     * ID of the policy store the alias points at.
     */
    policyStoreId: string;
    /**
     * ARN of the alias.
     */
    aliasArn: string;
}, {}, Providers> {
}
/**
 * A named alias for a Verified Permissions policy store. Aliases let callers
 * reference a policy store by a stable name (e.g. in `IsAuthorized`
 * requests) so the underlying store can be swapped without reconfiguring
 * clients. Alias names always carry the `policy-store-alias/` prefix AWS
 * requires; it is added automatically to generated and user-supplied names.
 *
 * ### Creating an Alias
 * **Example:** Alias with a Generated Name
 * ```typescript
 * import * as AWS from "@alchemy.run/aws";
 *
 * const store = yield* AWS.VerifiedPermissions.PolicyStore("Store", {});
 *
 * const alias = yield* AWS.VerifiedPermissions.PolicyStoreAlias("Alias", {
 *   policyStoreId: store.policyStoreId,
 * });
 * ```
 *
 * **Example:** Named Alias with Hard Delete
 * ```typescript
 * yield* AWS.VerifiedPermissions.PolicyStoreAlias("Alias", {
 *   policyStoreId: store.policyStoreId,
 *   // created as "policy-store-alias/photo-app-prod"
 *   aliasName: "photo-app-prod",
 *   deletionMode: "HardDelete",
 * });
 * ```
 *
 * @resource
 */
export declare const PolicyStoreAlias: import("alchemy").ResourceClass<PolicyStoreAlias>;
export declare const PolicyStoreAliasProvider: () => import("effect/Layer").Layer<Provider.Provider<PolicyStoreAlias>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};

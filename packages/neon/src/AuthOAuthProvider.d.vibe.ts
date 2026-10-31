import * as Neon from "@distilled.cloud/neon";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import * as Redacted from "effect/Redacted";
import type { Providers } from "./Providers.js";
declare const AuthOAuthProviderUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "AuthOAuthProviderUnexpectedResponse";
} & Readonly<A>;
export declare class AuthOAuthProviderUnexpectedResponse extends AuthOAuthProviderUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface AuthOAuthProviderProps {
    /** Managed Auth integration; its scope is inherited without owning the parent. */
    auth: {
        projectId: string;
        branchId: string;
    };
    /** Supported OAuth provider identity. Changing it replaces this child. */
    provider: Neon.NeonAuthOauthProviderId;
    /** OAuth client ID. Omit for Neon-managed development credentials. */
    clientId?: string;
    /** OAuth secret, never included in resource outputs. */
    clientSecret?: Redacted.Redacted<string>;
    /** Microsoft tenant ID; write-only in the current read schema. */
    microsoftTenantId?: string;
}
export interface AuthOAuthProviderAttributes {
    /** Neon project identity. */
    projectId: string;
    /** Owning branch identity. */
    branchId: string;
    /** OAuth provider identity. */
    provider: Neon.NeonAuthOauthProviderId;
    /** Whether Neon-managed development or application credentials are active. */
    type: Neon.NeonAuthOauthProviderType;
    /** Public OAuth client identifier, when configured. */
    clientId: string | undefined;
}
export interface AuthOAuthProvider extends Resource<"Neon.AuthOAuthProvider", AuthOAuthProviderProps, AuthOAuthProviderAttributes, never, Providers> {
}
/**
 * Independently own one managed Auth OAuth provider. Shared credentials are for
 * development only. Existing providers, including inherited providers, require
 * explicit adoption. Removing managed credential fields is rejected; replace the
 * child explicitly to switch back to development credentials.
 *
 * ### Configure an OAuth application
 * **Example:** GitHub sign-in
 * ```typescript
 * yield* Neon.AuthOAuthProvider("GitHub", {
 *   auth, provider: "github", clientId: "application-id",
 *   clientSecret: yield* Config.Redacted("GITHUB_CLIENT_SECRET"),
 * });
 * ```
 *
 * @resource
 * @product Auth
 */
export declare const AuthOAuthProvider: import("alchemy/Resource").ResourceClass<AuthOAuthProvider>;
export declare const AuthOAuthProviderProvider: () => import("effect/Layer").Layer<Provider.Provider<AuthOAuthProvider>, never, Neon.NeonOpContext>;
export {};

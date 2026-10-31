import * as Neon from "@distilled.cloud/neon";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "./Providers.js";
declare const AuthTrustedDomainUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "AuthTrustedDomainUnexpectedResponse";
} & Readonly<A>;
export declare class AuthTrustedDomainUnexpectedResponse extends AuthTrustedDomainUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface AuthTrustedDomainProps {
    /** Managed Auth integration to trust the origin on. */
    auth: {
        projectId: string;
        branchId: string;
    };
    /** Exact trusted origin, including scheme and optional port. */
    domain: string;
}
export interface AuthTrustedDomainAttributes {
    /** Neon project identity. */
    projectId: string;
    /** Branch identity. */
    branchId: string;
    /** Trusted origin owned by this child. */
    domain: string;
}
export interface AuthTrustedDomain extends Resource<"Neon.AuthTrustedDomain", AuthTrustedDomainProps, AuthTrustedDomainAttributes, never, Providers> {
}
/**
 * Own one trusted origin without replacing the Auth integration or overwriting
 * other origins. Existing entries require explicit adoption.
 *
 * ### Trust a deployed frontend
 * **Example:** Resolve the site URL after creating Auth
 * ```typescript
 * yield* Neon.AuthTrustedDomain("SiteOrigin", { auth, domain: site.url });
 * ```
 *
 * @resource
 * @product Auth
 */
export declare const AuthTrustedDomain: import("alchemy/Resource").ResourceClass<AuthTrustedDomain>;
export declare const AuthTrustedDomainProvider: () => import("effect/Layer").Layer<Provider.Provider<AuthTrustedDomain>, never, Neon.NeonOpContext>;
export {};

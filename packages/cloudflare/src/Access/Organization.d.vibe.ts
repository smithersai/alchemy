import * as zeroTrust from "@distilled.cloud/cloudflare/zero-trust";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { CloudflareEnvironment } from "../CloudflareEnvironment.ts";
import type { Providers } from "../Providers.ts";
export type OrganizationProps = {
    /**
     * The unique subdomain assigned to your Zero Trust organization, e.g.
     * `acme.cloudflareaccess.com`. Per-account this is functionally immutable —
     * Cloudflare allocates exactly one team domain when the account first
     * enables Zero Trust and changing it is a manual support operation.
     *
     * @see https://developers.cloudflare.com/cloudflare-one/setup/#1-create-a-team-name
     */
    authDomain: string;
    /**
     * Human-readable display name of your Zero Trust organization. Usually the
     * same as `authDomain`. Mutable.
     *
     * @see https://developers.cloudflare.com/api/operations/zero-trust-organization-update-your-zero-trust-organization
     */
    name?: string;
    /**
     * Default session lifetime for Access applications. Must be a Go duration
     * string (e.g. `30m`, `2h45m`, `24h`). Valid units: `ns`, `us`, `ms`, `s`,
     * `m`, `h`. Per-application settings override this default.
     *
     * @see https://developers.cloudflare.com/cloudflare-one/identity/users/session-management/
     */
    sessionDuration?: string;
    /**
     * When `true`, users may authenticate to Access applications via the WARP
     * client without going through the configured identity providers. Per-app
     * settings take precedence.
     *
     * @default false
     * @see https://developers.cloudflare.com/cloudflare-one/identity/devices/warp-authentication-identity/
     */
    allowAuthenticateViaWarp?: boolean;
    /**
     * When `true`, all Zero Trust settings in the Cloudflare dashboard are
     * read-only and may only be modified via the API or Terraform.
     *
     * @default false
     */
    isUiReadOnly?: boolean;
    /**
     * When `true`, users skip the identity provider selection step on login.
     * Only valid when exactly one IdP is configured (or one is set as default).
     *
     * @default false
     */
    autoRedirectToIdentity?: boolean;
    /**
     * Free-form description of why `isUiReadOnly` is toggled. Surfaced in the
     * Cloudflare dashboard.
     */
    uiReadOnlyToggleReason?: string;
    /**
     * Duration of user-seat inactivity before the user is removed as an active
     * seat and stops counting against the Teams seat quota. Go duration string.
     */
    userSeatExpirationInactiveTime?: string;
    /**
     * Lifetime of tokens issued by the WARP authentication flow. Go duration
     * string limited to `m` and `h` units, e.g. `30m` or `2h45m`.
     */
    warpAuthSessionDuration?: string;
    /**
     * Branding for the Access login screen.
     *
     * @see https://developers.cloudflare.com/cloudflare-one/identity/users/login-page/
     */
    loginDesign?: Organization.LoginDesign;
    /**
     * Pointers to custom HTML pages shown when Access blocks a request.
     *
     * @see https://developers.cloudflare.com/cloudflare-one/policies/access/custom-pages/
     */
    customPages?: Organization.CustomPages;
    /**
     * When `true`, Access denies requests to hostnames on the account's zones
     * that no Access application matches.
     *
     * @default false
     * @see https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/require-access-protection/
     */
    denyUnmatchedRequests?: boolean;
    /**
     * Zones exempted from `denyUnmatchedRequests`, by zone name (e.g.
     * `example.com`).
     */
    denyUnmatchedRequestsExemptedZoneNames?: string[];
    /**
     * When `true`, users can't create their own Access applications from the
     * App Launcher.
     *
     * @default false
     */
    disableEndUserAppCreation?: boolean;
    /**
     * Organization-wide multi-factor authentication settings, applied to
     * applications that require Access MFA.
     *
     * @see https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/
     */
    mfaConfig?: Organization.MfaConfig;
    /**
     * Requirements for PIV keys and FIDO2 SSH keys used as MFA for
     * infrastructure applications.
     */
    mfaPivKeyRequirements?: Organization.MfaPivKeyRequirements;
    /**
     * When `true`, every Access application requires MFA unless it opts out.
     *
     * @default false
     */
    mfaRequiredForAllApps?: boolean;
    /**
     * What happens to service tokens that go unused for a number of days.
     */
    serviceTokenInactivity?: Organization.ServiceTokenInactivity;
    /**
     * When `true`, a request that presents a service token is evaluated only
     * against service-token policies.
     *
     * @default false
     */
    strictServiceTokenAuth?: boolean;
    /**
     * When `true`, WARP authentication answers non-browser requests that lack
     * a session with `401` instead of redirecting to login.
     *
     * @default false
     */
    warpAuthNonBrowser401?: boolean;
};
export declare namespace Organization {
    /**
     * Branding for the Access login screen.
     */
    interface LoginDesign {
        /** URL of the logo image rendered at the top of the login form. */
        logoPath?: string;
        /** CSS color for the header background, e.g. `#1a1a1a`. */
        headerBgColor?: string;
        /** CSS color for the page background. */
        backgroundColor?: string;
        /** CSS color for the body text. */
        textColor?: string;
        /** Markdown rendered at the top of the login form (legacy). */
        headerText?: string;
        /** Markdown rendered at the bottom of the login form. */
        footerText?: string;
    }
    /**
     * Pointers to custom HTML pages shown when Access denies a request.
     */
    interface CustomPages {
        /**
         * UUID of a custom forbidden page (created via the Access Custom Pages
         * API) shown when a policy denies access.
         */
        forbidden?: string;
        /**
         * UUID of a custom identity-denied page shown when the identity provider
         * rejects the user.
         */
        identityDenied?: string;
    }
    /**
     * Organization-wide MFA settings.
     */
    interface MfaConfig {
        /**
         * MFA methods users can authenticate with. `piv_key` and
         * `ssh_fido2_key` apply only to infrastructure applications.
         */
        allowedAuthenticators?: ("totp" | "biometrics" | "security_key" | "piv_key" | "ssh_fido2_key")[];
        /**
         * How long a user may skip Access MFA when their identity provider
         * already reports MFA in the `amr` claim, e.g. `12h`. Minutes or hours,
         * `0m` to `720h`.
         */
        amrMatchingSessionDuration?: string;
        /** ID of a Cloudflare List of allowed FIDO2 authenticator AAGUIDs. */
        requiredAaguids?: string;
        /** Lifetime of an MFA session, e.g. `24h`. Minutes or hours, `0m` to `720h`. */
        sessionDuration?: string;
    }
    /**
     * Requirements for PIV and SSH keys used as MFA.
     */
    interface MfaPivKeyRequirements {
        /** When a PIN is required to use the key. */
        pinPolicy?: "never" | "once" | "always";
        /** Require a FIPS 140-2 Level 1 (or higher) validated device. */
        requireFipsDevice?: boolean;
        /** Allowed SSH key sizes in bits. Ed25519 keys have a fixed size. */
        sshKeySize?: (256 | 384 | 521 | 2048 | 3072 | 4096)[];
        /** Allowed SSH key types. */
        sshKeyType?: ("ecdsa" | "ed25519" | "rsa")[];
        /** When a physical touch is required (`cached` lasts 15 seconds). */
        touchPolicy?: "never" | "always" | "cached";
    }
    /**
     * Automatic handling of inactive service tokens.
     */
    interface ServiceTokenInactivity {
        /** Whether inactive service tokens are acted on. */
        enabled: boolean;
        /** What to do with an inactive token. */
        action: "disable" | "delete";
        /** Days without use before a token counts as inactive. */
        inactivityThresholdDays: number;
    }
}
export type Organization = Resource<"Cloudflare.Access.Organization", OrganizationProps, {
    /** Cloudflare account that owns the Zero Trust organization. */
    accountId: string;
    /** The Zero Trust team domain, e.g. `acme.cloudflareaccess.com`. */
    authDomain: string;
    /** Display name of the organization. */
    name: string;
    /** Default Access application session duration. */
    sessionDuration: string | undefined;
    /** WARP-as-IdP toggle observed on Cloudflare. */
    allowAuthenticateViaWarp: boolean | undefined;
    /** Dashboard read-only lock observed on Cloudflare. */
    isUiReadOnly: boolean | undefined;
    /** Skip-IdP-picker toggle observed on Cloudflare. */
    autoRedirectToIdentity: boolean | undefined;
    /** Free-form note explaining the `isUiReadOnly` setting. */
    uiReadOnlyToggleReason: string | undefined;
    /** User-seat inactivity expiration observed on Cloudflare. */
    userSeatExpirationInactiveTime: string | undefined;
    /** WARP authentication session duration observed on Cloudflare. */
    warpAuthSessionDuration: string | undefined;
    /** Login-page branding observed on Cloudflare. */
    loginDesign: Organization.LoginDesign | undefined;
    /** Custom-pages pointers observed on Cloudflare. */
    customPages: Organization.CustomPages | undefined;
    /** Whether unmatched requests are denied. */
    denyUnmatchedRequests: boolean | undefined;
    /** Zones exempted from `denyUnmatchedRequests`. */
    denyUnmatchedRequestsExemptedZoneNames: string[] | undefined;
    /** Whether end users are blocked from creating applications. */
    disableEndUserAppCreation: boolean | undefined;
    /** Organization-wide MFA settings observed on Cloudflare. */
    mfaConfig: Organization.MfaConfig | undefined;
    /** PIV and SSH key requirements observed on Cloudflare. */
    mfaPivKeyRequirements: Organization.MfaPivKeyRequirements | undefined;
    /** Whether every application requires MFA. */
    mfaRequiredForAllApps: boolean | undefined;
    /** Inactive service token handling observed on Cloudflare. */
    serviceTokenInactivity: Organization.ServiceTokenInactivity | undefined;
    /** Whether service-token requests are evaluated only against service-token policies. */
    strictServiceTokenAuth: boolean | undefined;
    /** Whether WARP authentication answers non-browser requests with `401`. */
    warpAuthNonBrowser401: boolean | undefined;
}, never, Providers>;
/**
 * Account-level Cloudflare Zero Trust organization settings — the team
 * domain, login branding, session lifetimes, MFA, WARP authentication, etc.
 *
 * Wraps `PUT /accounts/{account_id}/access/organizations`.
 * @remarks
 * **This resource is a singleton.** Every Cloudflare account owns exactly one
 * Access Organization; you cannot create a second one and you cannot delete
 * the existing one without deleting the entire Cloudflare account. As a
 * result:
 *
 * - The `reconcile` lifecycle always **adopts** the existing organization on
 *   first deploy rather than failing on conflict.
 * - The `delete` lifecycle is a **no-op** that logs a warning. Removing the
 *   resource from your stack leaves the Cloudflare-side settings untouched.
 * - Every deploy converges the whole organization on the declared props. A
 *   setting you don't declare goes back to Cloudflare's default, including
 *   one changed in the dashboard — declare MFA, `denyUnmatchedRequests` and
 *   the rest here to keep them.
 *
 * ### Configuring the organization
 * **Example:** Adopt and brand the organization
 * ```typescript
 * const org = yield* Cloudflare.Access.Organization("Org", {
 *   authDomain: "acme.cloudflareaccess.com",
 *   name: "Acme",
 *   sessionDuration: "24h",
 *   allowAuthenticateViaWarp: true,
 *   loginDesign: {
 *     logoPath: "https://acme.example/logo.png",
 *     backgroundColor: "#111111",
 *     textColor: "#ffffff",
 *   },
 * });
 * ```
 *
 * ### Branding the login page
 * Keep the branding assets in your repo. An assets-only Worker serves the
 * logo, and a custom page takes its HTML from a file.
 *
 * **Example:** Logo and block page from files
 * ```typescript
 * const fs = yield* FileSystem.FileSystem;
 * const branding = yield* Cloudflare.Worker("Branding", {
 *   assets: "./branding/public", // logo.svg
 * });
 * const forbidden = yield* Cloudflare.Access.CustomPage("Forbidden", {
 *   type: "forbidden",
 *   customHtml: yield* fs.readFileString("./branding/forbidden.html"),
 * });
 * const org = yield* Cloudflare.Access.Organization("Org", {
 *   authDomain: "acme.cloudflareaccess.com",
 *   loginDesign: {
 *     logoPath: Output.interpolate`${branding.url}/logo.svg`,
 *     backgroundColor: "#111111",
 *     textColor: "#ffffff",
 *     footerText: "Acme employees only",
 *   },
 *   customPages: { forbidden: forbidden.customPageId },
 * });
 * ```
 *
 * ### Securing the organization
 * **Example:** Require MFA and deny unmatched requests
 * ```typescript
 * const org = yield* Cloudflare.Access.Organization("Org", {
 *   authDomain: "acme.cloudflareaccess.com",
 *   mfaRequiredForAllApps: true,
 *   mfaConfig: {
 *     allowedAuthenticators: ["totp", "security_key"],
 *     sessionDuration: "12h",
 *   },
 *   denyUnmatchedRequests: true,
 *   denyUnmatchedRequestsExemptedZoneNames: ["public.example.com"],
 *   strictServiceTokenAuth: true,
 *   serviceTokenInactivity: {
 *     enabled: true,
 *     action: "disable",
 *     inactivityThresholdDays: 90,
 *   },
 * });
 * ```
 *
 * @resource
 * @product Access
 * @category Cloudflare One (Zero Trust)
 */
export declare const Organization: import("alchemy").ResourceClass<Organization>;
declare const OrganizationNotObserved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "OrganizationNotObserved";
} & Readonly<A>;
/**
 * Cloudflare returned `OrganizationAlreadyExists` on create, but the
 * organization could not be read back afterwards.
 */
export declare class OrganizationNotObserved extends OrganizationNotObserved_base<{
    readonly accountId: string;
}> {
}
export declare const OrganizationProvider: () => import("effect/Layer").Layer<Provider.Provider<Organization>, never, CloudflareEnvironment | zeroTrust.CloudflareOpContext>;
export {};

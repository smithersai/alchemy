import * as emailRouting from "@distilled.cloud/cloudflare/email-routing";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { CloudflareEnvironment } from "../CloudflareEnvironment.ts";
import type { Providers } from "../Providers.ts";
import { type Reference } from "../Zone/index.ts";
export type RoutingStatus = "ready" | "unconfigured" | "misconfigured" | "misconfigured/locked" | "unlocked";
export type RoutingProps = {
    /**
     * Zone to enable email routing on. Accepts a zone id, a zone name
     * (`example.com`), or a `{ zoneId, name? }` object.
     */
    zone: Reference;
    /**
     * Whether to enable Email Routing on the zone.
     *
     * @default true
     */
    enabled?: boolean;
    /**
     * Whether routing rules honor subaddressing (plus addressing, RFC 5233):
     * mail to `user+detail@example.com` matches the rule for
     * `user@example.com`, with the full address kept in `message.to`. A rule
     * for the exact subaddress still takes precedence. Omit to leave the
     * setting as Cloudflare has it.
     *
     * @see https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/#subaddressing
     */
    subaddressing?: boolean;
};
export type Routing = Resource<"Cloudflare.Email.Routing", RoutingProps, {
    routingId: string;
    zoneId: string;
    name: string;
    enabled: boolean;
    status: RoutingStatus | undefined;
    /** Whether routing rules honor subaddressing (plus addressing). */
    subaddressing: boolean | undefined;
}, never, Providers>;
/**
 * Enables Cloudflare Email Routing on a zone. This is the prerequisite for
 * receiving mail at any address on the domain and for sending email from a
 * Worker via `send_email` bindings.
 * ### Enabling Email Routing
 * **Example:** Enable on a zone you own
 * ```typescript
 * const routing = yield* Cloudflare.Email.Routing("Routing", {
 *   zone: "example.com",
 * });
 * ```
 *
 * ### Subaddressing
 * **Example:** Route `docs+anything@example.com` through the `docs@` rule
 * ```typescript
 * const routing = yield* Cloudflare.Email.Routing("Routing", {
 *   zone: "example.com",
 *   subaddressing: true,
 * });
 * ```
 *
 * @resource
 * @product Email
 * @category Email
 */
export declare const Routing: import("alchemy").ResourceClass<Routing>;
export declare const RoutingProvider: () => import("effect/Layer").Layer<Provider.Provider<Routing>, never, CloudflareEnvironment | emailRouting.CloudflareOpContext>;

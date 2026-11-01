import * as apihub from "@distilled.cloud/gcp/apihub_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
type AttributeValuesMap = apihub.GoogleCloudApihubV1AttributeValuesMap;
type Documentation = apihub.GoogleCloudApihubV1Documentation;
export type ExternalApiProps = {
    /**
     * External API id (the `{externalApi}` segment of
     * `projects/{project}/locations/{location}/externalApis/{externalApi}`).
     * If omitted, a unique id is generated. Immutable — changing it replaces
     * the External API.
     */
    externalApiId?: string;
    /**
     * Location of the API Hub instance (`us-central1`, …). Immutable —
     * changing it replaces the External API.
     * @default the stack's GCP region (`GCP.Region`, else the profile region, else `us-central1`)
     */
    location?: string;
    /**
     * Display name. Max 63 characters.
     */
    displayName?: string;
    /**
     * Human-readable description. External APIs have no labels field, so
     * Alchemy stamps ownership into a `[alchemy …]` prefix and strips it
     * from attributes.
     */
    description?: string;
    /**
     * Documentation URI.
     */
    documentation?: Documentation;
    /**
     * Endpoints on which this API is accessible.
     */
    endpoints?: string[];
    /**
     * Paths served by this API.
     */
    paths?: string[];
    /**
     * User-defined attributes keyed by attribute resource name.
     */
    attributes?: AttributeValuesMap;
};
export type ExternalApi = Resource<"GCP.ApiHub.ExternalApi", ExternalApiProps, {
    /** Full resource name. */
    name: string;
    /** External API id (last path segment). */
    externalApiId: string;
    /** Project id. */
    project: string;
    /** Location id. */
    location: string;
    /** Display name. */
    displayName: string | undefined;
    /** User description with the Alchemy ownership prefix stripped. */
    description: string | undefined;
    /** Documentation. */
    documentation: Documentation | undefined;
    /** Endpoints. */
    endpoints: string[];
    /** Paths. */
    paths: string[];
    /** User-defined attributes. */
    attributes: AttributeValuesMap | undefined;
    /** RFC3339 creation timestamp. */
    createTime: string | undefined;
    /** RFC3339 last-update timestamp. */
    updateTime: string | undefined;
}, never, Providers>;
/**
 * An API Hub External API — a third-party API modeled so it can be
 * referenced from dependencies.
 *
 * External APIs have no labels, so Alchemy stamps ownership into the
 * description for `list` / nuke. Location and id are identity — changing
 * them replaces the resource. Display name, description, documentation,
 * endpoints, and paths update in place.
 *
 * ### Creating an External API
 * **Example:** Generated id
 * ```typescript
 * const stripe = yield* GCP.ApiHub.ExternalApi("Stripe", {
 *   displayName: "Stripe",
 *   endpoints: ["https://api.stripe.com"],
 *   paths: ["/v1/charges"],
 * });
 * ```
 *
 * **Example:** Named External API
 * ```typescript
 * const stripe = yield* GCP.ApiHub.ExternalApi("Stripe", {
 *   externalApiId: "stripe-prod",
 *   displayName: "Stripe",
 *   description: "payments",
 *   endpoints: ["https://api.stripe.com"],
 * });
 * ```
 *
 * ### Updating an External API
 * **Example:** Change description and paths
 * ```typescript
 * const stripe = yield* GCP.ApiHub.ExternalApi("Stripe", {
 *   displayName: "Stripe",
 *   description: "payments (updated)",
 *   paths: ["/v1/charges", "/v1/customers"],
 * });
 * ```
 *
 * @resource
 * @category ApiHub
 */
export declare const ExternalApi: import("alchemy/Resource").ResourceClass<ExternalApi>;
export declare const ExternalApiProvider: () => import("effect/Layer").Layer<Provider.Provider<ExternalApi>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | apihub.GcpOpContext>;
export {};

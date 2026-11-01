import * as cci from "@distilled.cloud/gcp/contactcenterinsights_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
export type QaScorecardProps = {
    /**
     * Scorecard id (the `{qa_scorecard}` segment of
     * `projects/{project}/locations/{location}/qaScorecards/{qa_scorecard}`).
     * If omitted, a unique id is generated. Must match `^[a-z0-9-]{4,64}$`.
     * Immutable — changing it replaces the scorecard.
     */
    qaScorecardId?: string;
    /**
     * Location (`us-central1`, …). Immutable — changing it replaces the
     * scorecard. `US-CENTRAL1` is accepted and normalized to `us-central1`.
     * @default the stack's GCP region (`GCP.Region`, else the profile region, else `us-central1`)
     */
    location?: string;
    /**
     * User-facing display name.
     */
    displayName?: string;
    /**
     * Human-readable description. Scorecards have no labels field, so
     * Alchemy ownership is stored in a `[alchemy …]` prefix and stripped
     * from attributes.
     */
    description?: string;
    /**
     * Whether this scorecard is the project default. Default scorecards
     * cannot be deleted.
     * @default false
     */
    isDefault?: boolean;
};
export type QaScorecard = Resource<"GCP.ContactCenterInsights.QaScorecard", QaScorecardProps, {
    /** Full resource name `projects/{project}/locations/{location}/qaScorecards/{qa_scorecard}`. */
    name: string;
    /** Scorecard id (last path segment). */
    qaScorecardId: string;
    /** Location id. */
    location: string;
    /** Project id. */
    project: string;
    /** User-facing display name. */
    displayName: string | undefined;
    /** User description with the Alchemy ownership prefix stripped. */
    description: string | undefined;
    /** Whether this is the project default scorecard. */
    isDefault: boolean;
    /** Server-reported scorecard source. */
    source: string | undefined;
    /** RFC3339 creation timestamp. */
    createTime: string | undefined;
    /** RFC3339 last-update timestamp. */
    updateTime: string | undefined;
}, never, Providers>;
/**
 * A Contact Center AI Insights QA scorecard — a collection of questions
 * scored during analysis.
 *
 * Scorecards have no labels field — Alchemy stamps ownership into the
 * description. Location and id are immutable. Display name and
 * description update in place. Delete uses `force` so child revisions
 * and questions are removed.
 *
 * ### Creating a QA Scorecard
 * **Example:** Generated id
 * ```typescript
 * const card = yield* GCP.ContactCenterInsights.QaScorecard("Quality", {
 *   displayName: "quality",
 *   description: "call quality",
 * });
 * ```
 *
 * @resource
 * @category ContactCenterInsights
 */
export declare const QaScorecard: import("alchemy/Resource").ResourceClass<QaScorecard>;
declare const QaScorecardNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.ContactCenterInsights.QaScorecardNotResolved";
} & Readonly<A>;
export declare class QaScorecardNotResolved extends QaScorecardNotResolved_base<{
    resourceName: string;
}> {
}
export declare const QaScorecardProvider: () => import("effect/Layer").Layer<Provider.Provider<QaScorecard>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | cci.GcpOpContext>;
export {};

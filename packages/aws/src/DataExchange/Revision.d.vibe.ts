import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.ts";
export interface RevisionProps {
    /**
     * The unique identifier of the data set the revision belongs to.
     * Changing it replaces the revision.
     */
    dataSetId: string;
    /**
     * An optional comment about the revision (up to 16,348 characters).
     * Mutable in place.
     */
    comment?: string;
    /**
     * Whether the revision is finalized. A revision can only be finalized once
     * it contains at least one asset (imported via a DataExchange job) —
     * finalizing an empty revision fails with a `ValidationException`.
     * @default false
     */
    finalized?: boolean;
    /**
     * Tags to apply to the revision. Merged with internal Alchemy tags.
     */
    tags?: Record<string, string>;
}
export interface Revision extends Resource<"AWS.DataExchange.Revision", RevisionProps, {
    /**
     * The unique identifier of the revision.
     */
    revisionId: string;
    /**
     * The ARN of the revision.
     */
    revisionArn: string;
    /**
     * The unique identifier of the data set the revision belongs to.
     */
    dataSetId: string;
    /**
     * Whether the revision is finalized.
     */
    finalized: boolean;
}, never, Providers> {
}
/**
 * A revision of an AWS Data Exchange data set — a versioned container of
 * assets. Providers import assets into a revision (via DataExchange jobs) and
 * then finalize it to make the snapshot available to subscribers.
 *
 * ### Creating Revisions
 * **Example:** Revision with a comment
 * ```typescript
 * import * as AWS from "@alchemy.run/aws";
 *
 * const dataSet = yield* AWS.DataExchange.DataSet("Prices", {
 *   description: "Daily commodity price snapshots",
 * });
 *
 * const revision = yield* AWS.DataExchange.Revision("PricesV1", {
 *   dataSetId: dataSet.dataSetId,
 *   comment: "Initial snapshot",
 * });
 * ```
 *
 * ### Finalizing
 * Once assets have been imported into the revision (via a DataExchange
 * import job), flip `finalized` to publish it. Finalizing an empty revision
 * fails.
 *
 * **Example:** Finalize a revision that has assets
 * ```typescript
 * const revision = yield* AWS.DataExchange.Revision("PricesV1", {
 *   dataSetId: dataSet.dataSetId,
 *   comment: "Initial snapshot",
 *   finalized: true,
 * });
 * ```
 *
 * @resource
 */
export declare const Revision: import("alchemy").ResourceClass<Revision>;
export declare const RevisionProvider: () => import("effect/Layer").Layer<Provider.Provider<Revision>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;

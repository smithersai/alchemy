import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.vibe";
export interface NamespaceProps {
    /**
     * ARN of the table bucket that owns the namespace. Changing it replaces
     * the namespace.
     */
    tableBucket: string;
    /**
     * Name of the namespace. Must be 1-255 characters of lowercase letters,
     * numbers, and underscores, beginning with a letter or number. Changing
     * the name replaces the namespace.
     * @default a deterministic name derived from the app, stage, and logical ID
     */
    namespace?: string;
}
export interface Namespace extends Resource<"AWS.S3Tables.Namespace", NamespaceProps, {
    tableBucketArn: string;
    namespace: string;
    namespaceId: string | undefined;
    createdAt: Date;
    createdBy: string;
    ownerAccountId: string;
}, never, Providers> {
}
/**
 * A namespace within an Amazon S3 Tables {@link TableBucket} — a logical
 * grouping of {@link Table}s, equivalent to a database in an Iceberg catalog.
 * ### Creating Namespaces
 * **Example:** Basic Namespace
 * ```typescript
 * import * as S3Tables from "@alchemy.run/aws/S3Tables";
 *
 * const bucket = yield* S3Tables.TableBucket("Analytics");
 * const ns = yield* S3Tables.Namespace("Events", {
 *   tableBucket: bucket.tableBucketArn,
 * });
 * ```
 *
 * **Example:** Named Namespace
 * ```typescript
 * const ns = yield* S3Tables.Namespace("Events", {
 *   tableBucket: bucket.tableBucketArn,
 *   namespace: "raw_events",
 * });
 * ```
 *
 * @resource
 */
export declare const Namespace: import("alchemy").ResourceClass<Namespace>;
export declare const NamespaceProvider: () => import("effect/Layer").Layer<Provider.Provider<Namespace>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;

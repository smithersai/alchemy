import * as quicksight from "@distilled.cloud/aws/quicksight";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { AWSEnvironment } from "../Environment.ts";
import type { Providers } from "../Providers.ts";
declare const QuickSightDataSetUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "QuickSightDataSetUnexpectedResponse";
} & Readonly<A>;
export declare class QuickSightDataSetUnexpectedResponse extends QuickSightDataSetUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
/**
 * Properties for an Amazon QuickSight dataset — a prepared, queryable model
 * built on top of one or more data sources.
 */
export interface DataSetProps {
    /**
     * Unique id of the dataset within the account. Stable — changing it
     * replaces the dataset. If omitted, a unique id is generated.
     */
    dataSetId?: string;
    /**
     * Display name of the dataset.
     */
    name: string;
    /**
     * Declares the physical tables in the dataset, keyed by a physical table
     * id. Each maps to a relational table, custom SQL, or an S3 source.
     */
    physicalTableMap: {
        [key: string]: quicksight.PhysicalTable | undefined;
    };
    /**
     * Whether the data is imported into SPICE or queried directly.
     */
    importMode: quicksight.DataSetImportMode;
    /**
     * Declares logical tables (joins, transforms) keyed by logical table id.
     */
    logicalTableMap?: {
        [key: string]: quicksight.LogicalTable | undefined;
    };
    /**
     * Column groupings (e.g. geospatial hierarchies).
     */
    columnGroups?: quicksight.ColumnGroup[];
    /**
     * Field folders that organize the dataset's fields.
     */
    fieldFolders?: {
        [key: string]: quicksight.FieldFolder | undefined;
    };
    /**
     * Resource-level permissions on the dataset.
     */
    permissions?: quicksight.ResourcePermission[];
    /**
     * Row-level permission configuration backed by a permissions dataset.
     */
    rowLevelPermissionDataSet?: quicksight.RowLevelPermissionDataSet;
    /**
     * Usage configuration controlling how the dataset can be used
     * (e.g. as a source for other datasets).
     */
    dataSetUsageConfiguration?: quicksight.DataSetUsageConfiguration;
    /**
     * Parameters exposed by the dataset.
     */
    datasetParameters?: quicksight.DatasetParameter[];
    /**
     * Tags to apply to the dataset.
     */
    tags?: Record<string, string>;
}
export interface DataSet extends Resource<"AWS.QuickSight.DataSet", DataSetProps, {
    /** Unique id of the dataset within the account. */
    dataSetId: string;
    /** ARN of the dataset. */
    arn: string;
    /** Display name of the dataset. */
    name: string;
}, never, Providers> {
}
/**
 * An Amazon QuickSight dataset — a prepared, queryable model built on top of
 * one or more data sources.
 *
 * QuickSight requires an active account subscription in the region. Without
 * one, create operations fail with the typed `QuickSightSubscriptionRequired`
 * error.
 *
 * ### Creating a Dataset
 * **Example:** SPICE Dataset from a Relational Table
 * ```typescript
 * const dataset = yield* DataSet("sales", {
 *   name: "Sales",
 *   importMode: "SPICE",
 *   physicalTableMap: {
 *     sales: {
 *       RelationalTable: {
 *         DataSourceArn: source.arn,
 *         Name: "sales",
 *         InputColumns: [{ Name: "amount", Type: "DECIMAL" }],
 *       },
 *     },
 *   },
 * });
 * ```
 *
 * @resource
 */
export declare const DataSet: import("alchemy").ResourceClass<DataSet>;
export declare const DataSetProvider: () => import("effect/Layer").Layer<Provider.Provider<DataSet>, never, AWSEnvironment | import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};

import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.js";
declare const PersonalizeDatasetNotReady_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "PersonalizeDatasetNotReady";
} & Readonly<A>;
export declare class PersonalizeDatasetNotReady extends PersonalizeDatasetNotReady_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface DatasetProps {
    /**
     * Name of the dataset. If omitted, a unique name is generated from the app,
     * stage, and logical ID. Changing the name replaces the dataset.
     */
    name?: string;
    /**
     * ARN of the schema that describes this dataset's fields. Immutable —
     * changing it replaces the dataset.
     */
    schemaArn: string;
    /**
     * ARN of the dataset group this dataset belongs to. Immutable — changing it
     * replaces the dataset.
     */
    datasetGroupArn: string;
    /**
     * The type of dataset: `Interactions`, `Items`, `Users`, `Actions`, or
     * `Action_Interactions`. Immutable — changing it replaces the dataset.
     */
    datasetType: string;
    /**
     * User-defined tags for the dataset.
     */
    tags?: Record<string, string>;
}
export interface Dataset extends Resource<"AWS.Personalize.Dataset", DatasetProps, {
    /**
     * ARN of the dataset.
     */
    datasetArn: string;
    /**
     * Name of the dataset.
     */
    name: string;
    /**
     * Dataset type (`Interactions`, `Items`, `Users`, or `Actions`).
     */
    datasetType: string;
    /**
     * Dataset status (e.g. `ACTIVE`, `CREATE PENDING`).
     */
    status: string;
    /**
     * ARN of the schema the dataset conforms to.
     */
    schemaArn: string;
    /**
     * ARN of the dataset group the dataset belongs to.
     */
    datasetGroupArn: string;
}, never, Providers> {
}
/**
 * An Amazon Personalize dataset — a typed collection (Interactions, Items,
 * Users, …) inside a dataset group, backed by a schema. Creating the dataset
 * is a cheap metadata operation; bulk imports and training happen through
 * separate import jobs and solutions.
 *
 * ### Creating a Dataset
 * **Example:** Interactions Dataset
 * ```typescript
 * const dataset = yield* Personalize.Dataset("Interactions", {
 *   schemaArn: schema.schemaArn,
 *   datasetGroupArn: group.datasetGroupArn,
 *   datasetType: "Interactions",
 * });
 * ```
 *
 * @resource
 */
export declare const Dataset: import("alchemy").ResourceClass<Dataset>;
export declare const DatasetProvider: () => import("effect/Layer").Layer<Provider.Provider<Dataset>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};

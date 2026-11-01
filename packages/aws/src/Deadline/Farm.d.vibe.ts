import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.js";
declare const FarmInvalidProps_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "FarmInvalidProps";
} & Readonly<A>;
export declare class FarmInvalidProps extends FarmInvalidProps_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
declare const FarmUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "FarmUnexpectedResponse";
} & Readonly<A>;
export declare class FarmUnexpectedResponse extends FarmUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface FarmProps {
    /**
     * Display name of the farm.
     * @default ${app}-${stage}-${id}
     */
    displayName?: string;
    /**
     * A description of the farm.
     */
    description?: string;
    /**
     * ARN of the KMS key used to encrypt farm data. Changing it replaces the
     * farm.
     * @default an AWS-owned key
     */
    kmsKeyArn?: string;
    /**
     * Multiplier applied to the cost of renders on this farm when computing
     * budget usage.
     * @default 1
     */
    costScaleFactor?: number;
    /**
     * Tags to associate with the farm.
     */
    tags?: Record<string, string>;
}
export interface Farm extends Resource<"AWS.Deadline.Farm", FarmProps, {
    /**
     * Service-assigned unique identifier of the farm (`farm-...`).
     */
    farmId: string;
    /**
     * ARN of the farm.
     */
    farmArn: string;
    /**
     * The farm's display name.
     */
    displayName: string;
    /**
     * ARN of the KMS key encrypting farm data, when customer-managed.
     */
    kmsKeyArn: string | undefined;
    /**
     * The configured cost scale factor.
     */
    costScaleFactor: number;
    /**
     * Current tags reported for the farm.
     */
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * An AWS Deadline Cloud farm — the top-level container for render-farm
 * queues, fleets, storage profiles, and budgets.
 *
 * ### Creating Farms
 * **Example:** Basic Farm
 * ```typescript
 * import * as AWS from "@alchemy.run/aws";
 *
 * const farm = yield* AWS.Deadline.Farm("RenderFarm", {});
 * ```
 *
 * **Example:** Farm with Description and Cost Scaling
 * ```typescript
 * const farm = yield* AWS.Deadline.Farm("RenderFarm", {
 *   displayName: "studio-renders",
 *   description: "Production render farm",
 *   costScaleFactor: 1.5,
 *   tags: { team: "vfx" },
 * });
 * ```
 *
 * @resource
 */
export declare const Farm: import("alchemy").ResourceClass<Farm>;
export declare const FarmProvider: () => import("effect/Layer").Layer<Provider.Provider<Farm>, never, import("../Environment.js").AWSEnvironment | import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};

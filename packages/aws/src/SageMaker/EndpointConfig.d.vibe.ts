import * as sagemaker from "@distilled.cloud/aws/sagemaker";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.js";
declare const EndpointConfigInvalidProps_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "EndpointConfigInvalidProps";
} & Readonly<A>;
export declare class EndpointConfigInvalidProps extends EndpointConfigInvalidProps_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
declare const EndpointConfigUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "EndpointConfigUnexpectedResponse";
} & Readonly<A>;
export declare class EndpointConfigUnexpectedResponse extends EndpointConfigUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface EndpointConfigProps {
    /**
     * Name of the endpoint configuration. Maximum 63 characters.
     * @default ${app}-${stage}-${id}
     */
    endpointConfigName?: string;
    /**
     * The models to host and the resources (instances or serverless capacity)
     * to deploy each on. At least one variant is required. Use
     * `ServerlessConfig` for pay-per-request serverless inference or
     * `InstanceType` + `InitialInstanceCount` for provisioned instances.
     */
    productionVariants: sagemaker.ProductionVariant[];
    /**
     * Shadow variants that receive a copy of the traffic for testing a new
     * model behind the production variant.
     */
    shadowProductionVariants?: sagemaker.ProductionVariant[];
    /**
     * Capture inference request/response payloads to S3 (for monitoring or
     * retraining).
     */
    dataCaptureConfig?: sagemaker.DataCaptureConfig;
    /**
     * KMS key that SageMaker uses to encrypt data on the storage volume of the
     * hosting instances. Not supported for serverless variants.
     */
    kmsKeyId?: string;
    /**
     * Configure the endpoint for asynchronous inference.
     */
    asyncInferenceConfig?: sagemaker.AsyncInferenceConfig;
    /**
     * SageMaker Clarify explainer configuration.
     */
    explainerConfig?: sagemaker.ExplainerConfig;
    /**
     * IAM role used by the endpoint (when variants require one).
     */
    executionRoleArn?: string;
    /**
     * VPC configuration for the hosted models.
     */
    vpcConfig?: sagemaker.VpcConfig;
    /**
     * Isolate the hosted containers from the network.
     * @default false
     */
    enableNetworkIsolation?: boolean;
    /**
     * Tags to associate with the endpoint configuration. Merged with internal
     * Alchemy tags.
     */
    tags?: Record<string, string>;
}
export interface EndpointConfig extends Resource<"AWS.SageMaker.EndpointConfig", EndpointConfigProps, {
    /**
     * The endpoint configuration's name.
     */
    endpointConfigName: string;
    /**
     * ARN of the endpoint configuration.
     */
    endpointConfigArn: string;
}, never, Providers> {
}
/**
 * An Amazon SageMaker EndpointConfig — the deployment recipe that maps one
 * or more `Model`s to hosting resources (provisioned instances or serverless
 * capacity). Pure configuration: it costs nothing until an `Endpoint`
 * references it.
 *
 * Endpoint configurations are immutable — any change other than tags
 * replaces the configuration. To roll a live endpoint onto new settings,
 * point the `Endpoint` at the replacement config (alchemy creates the new
 * config first, updates the endpoint, then deletes the old config).
 * ### Creating Endpoint Configurations
 * **Example:** Serverless Variant
 * ```typescript
 * import * as AWS from "@alchemy.run/aws";
 *
 * const config = yield* AWS.SageMaker.EndpointConfig("MyConfig", {
 *   productionVariants: [{
 *     VariantName: "AllTraffic",
 *     ModelName: model.modelName,
 *     ServerlessConfig: { MemorySizeInMB: 2048, MaxConcurrency: 5 },
 *   }],
 * });
 * ```
 *
 * **Example:** Provisioned Instances
 * ```typescript
 * const config = yield* AWS.SageMaker.EndpointConfig("MyConfig", {
 *   productionVariants: [{
 *     VariantName: "AllTraffic",
 *     ModelName: model.modelName,
 *     InstanceType: "ml.m5.large",
 *     InitialInstanceCount: 1,
 *   }],
 * });
 * ```
 *
 * @resource
 */
export declare const EndpointConfig: import("alchemy").ResourceClass<EndpointConfig>;
export declare const EndpointConfigProvider: () => import("effect/Layer").Layer<Provider.Provider<EndpointConfig>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};

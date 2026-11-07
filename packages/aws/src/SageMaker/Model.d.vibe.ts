import * as sagemaker from "@distilled.cloud/aws/sagemaker";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.ts";
declare const ModelInvalidProps_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ModelInvalidProps";
} & Readonly<A>;
export declare class ModelInvalidProps extends ModelInvalidProps_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
declare const ModelUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ModelUnexpectedResponse";
} & Readonly<A>;
export declare class ModelUnexpectedResponse extends ModelUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface ModelProps {
    /**
     * Name of the model. Must be unique within the account/region.
     * Maximum 63 characters, alphanumeric and hyphens.
     * @default ${app}-${stage}-${id}
     */
    modelName?: string;
    /**
     * The primary inference container: the ECR image (and optionally model
     * artifacts in S3) SageMaker runs when the model is deployed to an
     * endpoint. Exactly one of `primaryContainer` or `containers` is required.
     */
    primaryContainer?: sagemaker.ContainerDefinition;
    /**
     * Containers for an inference pipeline (executed as a sequence) or a
     * multi-container model. Mutually exclusive with `primaryContainer`.
     */
    containers?: sagemaker.ContainerDefinition[];
    /**
     * How containers in a multi-container model are run (`Serial` pipeline or
     * `Direct` invocation of a specific container).
     */
    inferenceExecutionConfig?: sagemaker.InferenceExecutionConfig;
    /**
     * ARN of the IAM role SageMaker assumes to pull the container image and
     * model artifacts. The role must trust `sagemaker.amazonaws.com`.
     */
    executionRoleArn: string;
    /**
     * VPC configuration for the model's containers.
     */
    vpcConfig?: sagemaker.VpcConfig;
    /**
     * Isolate the model containers from the network (no outbound calls).
     * @default false
     */
    enableNetworkIsolation?: boolean;
    /**
     * Tags to associate with the model. Merged with internal Alchemy tags.
     */
    tags?: Record<string, string>;
}
export interface Model extends Resource<"AWS.SageMaker.Model", ModelProps, {
    /**
     * The model's name.
     */
    modelName: string;
    /**
     * ARN of the model.
     */
    modelArn: string;
}, never, Providers> {
}
/**
 * An Amazon SageMaker Model — the immutable pairing of an inference
 * container image (and optional S3 model artifacts) with an execution role.
 * A model is pure configuration: it costs nothing until it is deployed to an
 * endpoint via an `EndpointConfig` + `Endpoint`.
 *
 * SageMaker models are immutable — any change other than tags replaces the
 * model.
 * ### Creating Models
 * **Example:** Model from an ECR image
 * ```typescript
 * import * as AWS from "@alchemy.run/aws";
 *
 * const role = yield* AWS.IAM.Role("SageMakerRole", {
 *   assumeRolePolicyDocument: {
 *     Version: "2012-10-17",
 *     Statement: [{
 *       Effect: "Allow",
 *       Principal: { Service: "sagemaker.amazonaws.com" },
 *       Action: ["sts:AssumeRole"],
 *     }],
 *   },
 *   managedPolicyArns: ["arn:aws:iam::aws:policy/AmazonSageMakerFullAccess"],
 * });
 *
 * const model = yield* AWS.SageMaker.Model("MyModel", {
 *   executionRoleArn: role.roleArn,
 *   primaryContainer: {
 *     Image: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-inference:latest",
 *     ModelDataUrl: "s3://my-bucket/model.tar.gz",
 *   },
 * });
 * ```
 *
 * **Example:** Serverless deployment (Model → EndpointConfig → Endpoint)
 * ```typescript
 * const config = yield* AWS.SageMaker.EndpointConfig("MyConfig", {
 *   productionVariants: [{
 *     VariantName: "AllTraffic",
 *     ModelName: model.modelName,
 *     ServerlessConfig: { MemorySizeInMB: 2048, MaxConcurrency: 5 },
 *   }],
 * });
 * const endpoint = yield* AWS.SageMaker.Endpoint("MyEndpoint", {
 *   endpointConfigName: config.endpointConfigName,
 * });
 * ```
 *
 * @resource
 */
export declare const Model: import("alchemy").ResourceClass<Model>;
export declare const ModelProvider: () => import("effect/Layer").Layer<Provider.Provider<Model>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};

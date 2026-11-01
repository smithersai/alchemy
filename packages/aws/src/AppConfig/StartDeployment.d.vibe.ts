import type * as appconfig from "@distilled.cloud/aws/appconfig";
import * as Binding from "alchemy/Binding";
import type * as Effect from "effect/Effect";
import type { Application } from "./Application.js";
import type { ConfigurationProfile } from "./ConfigurationProfile.js";
import type { DeploymentStrategy } from "./DeploymentStrategy.js";
import type { Environment } from "./Environment.js";
export interface StartDeploymentRequest extends Omit<appconfig.StartDeploymentRequest, "ApplicationId" | "EnvironmentId" | "ConfigurationProfileId" | "DeploymentStrategyId"> {
}
/**
 * Start an AppConfig deployment from a Lambda (or other AWS runtime) — roll a
 * configuration version out to an environment following a deployment
 * strategy. Pairs with {@link CreateHostedConfigurationVersion} to build
 * runtime feature-flag/configuration management services.
 *
 * Provide `AppConfig.StartDeploymentHttp` on the hosting function's Effect to
 * implement the binding.
 *
 * ### Deploying Configuration at Runtime
 * **Example:** Roll out a configuration version
 * ```typescript
 * const startDeployment = yield* AppConfig.StartDeployment(
 *   app,
 *   env,
 *   profile,
 *   strategy,
 * );
 * const deployment = yield* startDeployment({
 *   ConfigurationVersion: "2",
 * });
 * // deployment.DeploymentNumber, deployment.State ("DEPLOYING", ...)
 * ```
 *
 * @binding
 */
export interface StartDeployment extends Binding.Service<StartDeployment, "AWS.AppConfig.StartDeployment", (application: Application, environment: Environment, configurationProfile: ConfigurationProfile, deploymentStrategy: DeploymentStrategy) => Effect.Effect<((request: StartDeploymentRequest) => Effect.Effect<appconfig.Deployment, appconfig.StartDeploymentError>)>> {
}
export declare const StartDeployment: StartDeployment;

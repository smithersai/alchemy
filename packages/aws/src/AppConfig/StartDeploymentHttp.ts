import * as appconfig from "@distilled.cloud/aws/appconfig";
import * as Output from "alchemy/Output";
import type { Application } from "./Application.vibe";
import { makeAppConfigHttpBinding } from "./BindingHttp.vibe";
import type { ConfigurationProfile } from "./ConfigurationProfile.vibe";
import type { DeploymentStrategy } from "./DeploymentStrategy.vibe";
import type { Environment } from "./Environment.vibe";
import { StartDeployment } from "./StartDeployment.vibe";

/**
 * HTTP implementation of the {@link StartDeployment} binding. Calls
 * `appconfig:StartDeployment` with the Lambda's IAM role, scoped to the bound
 * application, environment, configuration profile, and deployment strategy.
 */
export const StartDeploymentHttp = makeAppConfigHttpBinding(StartDeployment, {
  operation: appconfig.startDeployment,
  spec: (
    application: Application,
    environment: Environment,
    configurationProfile: ConfigurationProfile,
    deploymentStrategy: DeploymentStrategy,
  ) => ({
    identifiers: {
      ApplicationId: application.applicationId,
      EnvironmentId: environment.environmentId,
      ConfigurationProfileId: configurationProfile.configurationProfileId,
      DeploymentStrategyId: deploymentStrategy.deploymentStrategyId,
    },
    iam: ({ region, accountId }) => ({
      actions: ["appconfig:StartDeployment"],
      resources: [
        Output.interpolate`arn:aws:appconfig:${region}:${accountId}:application/${application.applicationId}`,
        Output.interpolate`arn:aws:appconfig:${region}:${accountId}:application/${application.applicationId}/environment/${environment.environmentId}`,
        Output.interpolate`arn:aws:appconfig:${region}:${accountId}:application/${application.applicationId}/configurationprofile/${configurationProfile.configurationProfileId}`,
        Output.interpolate`arn:aws:appconfig:${region}:${accountId}:deploymentstrategy/${deploymentStrategy.deploymentStrategyId}`,
      ],
    }),
  }),
});

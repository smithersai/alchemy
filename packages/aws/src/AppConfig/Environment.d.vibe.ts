import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { AWSEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
/**
 * A CloudWatch alarm AppConfig monitors during a deployment. If the alarm
 * fires while the configuration is rolling out, the deployment rolls back.
 */
export interface EnvironmentMonitor {
    /** ARN of the CloudWatch alarm to monitor. */
    alarmArn: string;
    /** ARN of an IAM role AppConfig assumes to read the alarm's state. */
    alarmRoleArn?: string;
}
export interface EnvironmentProps {
    /**
     * ID of the application this environment belongs to. Changing it replaces
     * the environment.
     */
    applicationId: string;
    /**
     * Name of the environment. Must be 1-64 characters. If omitted, a
     * deterministic physical name is generated. Changing the name replaces the
     * environment.
     */
    environmentName?: string;
    /**
     * Description of the environment.
     */
    description?: string;
    /**
     * CloudWatch alarms AppConfig monitors during deployments to this
     * environment.
     */
    monitors?: EnvironmentMonitor[];
    /**
     * User-defined tags for the environment.
     */
    tags?: Record<string, string>;
}
export interface Environment extends Resource<"AWS.AppConfig.Environment", EnvironmentProps, {
    environmentId: string;
    environmentName: string;
    applicationId: string;
    environmentArn: string;
    state: string;
}, never, Providers> {
}
/**
 * An AWS AppConfig environment — a deployment group of AppConfig targets
 * (e.g. `Beta`, `Production`) within an application. CloudWatch alarms
 * attached via `monitors` trigger an automatic rollback if they fire during a
 * deployment.
 *
 * ### Creating an Environment
 * **Example:** Basic Environment
 * ```typescript
 * const app = yield* AppConfig.Application("MyApp", {});
 * const env = yield* AppConfig.Environment("Prod", {
 *   applicationId: app.applicationId,
 * });
 * ```
 *
 * **Example:** Environment with Rollback Alarm
 * ```typescript
 * const env = yield* AppConfig.Environment("Prod", {
 *   applicationId: app.applicationId,
 *   monitors: [{ alarmArn: alarm.alarmArn, alarmRoleArn: role.roleArn }],
 * });
 * ```
 *
 * @resource
 */
export declare const Environment: import("alchemy").ResourceClass<Environment>;
export declare const EnvironmentProvider: () => import("effect/Layer").Layer<Provider.Provider<Environment>, never, AWSEnvironment | import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;

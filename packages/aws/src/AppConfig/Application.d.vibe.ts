import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { AWSEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
export interface ApplicationProps {
    /**
     * Name of the application. Must be 1-64 characters. If omitted, a
     * deterministic physical name is generated. Changing the name replaces the
     * application.
     */
    applicationName?: string;
    /**
     * Description of the application.
     */
    description?: string;
    /**
     * User-defined tags for the application.
     */
    tags?: Record<string, string>;
}
export interface Application extends Resource<"AWS.AppConfig.Application", ApplicationProps, {
    applicationId: string;
    applicationName: string;
    applicationArn: string;
}, never, Providers> {
}
/**
 * An AWS AppConfig application — the top-level container that groups the
 * environments and configuration profiles for one application's configuration.
 *
 * ### Creating an Application
 * **Example:** Basic Application
 * ```typescript
 * const app = yield* AppConfig.Application("MyApp", {
 *   description: "Configuration for my service",
 * });
 * ```
 *
 * **Example:** Named Application with Tags
 * ```typescript
 * const app = yield* AppConfig.Application("MyApp", {
 *   applicationName: "my-service",
 *   tags: { team: "platform" },
 * });
 * ```
 *
 * @resource
 */
export declare const Application: import("alchemy").ResourceClass<Application>;
export declare const ApplicationProvider: () => import("effect/Layer").Layer<Provider.Provider<Application>, never, AWSEnvironment | import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;

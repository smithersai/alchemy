import * as sitewise from "@distilled.cloud/aws/iotsitewise";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.ts";
declare const IoTSiteWiseGatewayConflict_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "IoTSiteWiseGatewayConflict";
} & Readonly<A>;
export declare class IoTSiteWiseGatewayConflict extends IoTSiteWiseGatewayConflict_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
declare const IoTSiteWiseGatewayInvalidProps_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "IoTSiteWiseGatewayInvalidProps";
} & Readonly<A>;
export declare class IoTSiteWiseGatewayInvalidProps extends IoTSiteWiseGatewayInvalidProps_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
declare const IoTSiteWiseGatewayUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "IoTSiteWiseGatewayUnexpectedResponse";
} & Readonly<A>;
export declare class IoTSiteWiseGatewayUnexpectedResponse extends IoTSiteWiseGatewayUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export type GatewayPlatform = sitewise.GatewayPlatform;
export interface GatewayProps {
    /**
     * A unique name for the gateway.
     * @default ${app}-${stage}-${id}
     */
    gatewayName?: string;
    /**
     * The gateway's platform: exactly one of `greengrassV2` (an IoT
     * Greengrass V2 core device), `siemensIE` (a Siemens Industrial Edge
     * device), or the legacy `greengrass` group. Changing the platform
     * replaces the gateway.
     */
    gatewayPlatform: GatewayPlatform;
    /**
     * The version of the gateway to create (`"2.0"` or `"3.0"` for
     * Greengrass V2 platforms). Changing the version replaces the gateway.
     */
    gatewayVersion?: string;
    /**
     * Tags to associate with the gateway.
     */
    tags?: Record<string, string>;
}
export interface Gateway extends Resource<"AWS.IoTSiteWise.Gateway", GatewayProps, {
    /**
     * Service-assigned UUID of the gateway.
     */
    gatewayId: string;
    /**
     * ARN of the gateway.
     */
    gatewayArn: string;
    /**
     * The gateway's name.
     */
    gatewayName: string;
    /**
     * The gateway's platform, as reported by the service.
     */
    gatewayPlatform: GatewayPlatform | undefined;
    /**
     * The gateway's version, as reported by the service.
     */
    gatewayVersion: string | undefined;
    /**
     * Current tags reported for the gateway.
     */
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * An AWS IoT SiteWise gateway — the ingestion point that connects
 * on-premises industrial data sources (e.g. OPC UA servers) to IoT
 * SiteWise, hosted on an IoT Greengrass V2 core device or a Siemens
 * Industrial Edge device.
 *
 * The cloud-side gateway resource registers immediately; the edge
 * software syncs to it asynchronously once the referenced core device is
 * online (the device does not need to exist to create the gateway).
 *
 * ### Creating Gateways
 * **Example:** Greengrass V2 Gateway
 * ```typescript
 * import * as AWS from "@alchemy.run/aws";
 *
 * const gateway = yield* AWS.IoTSiteWise.Gateway("FactoryGateway", {
 *   gatewayPlatform: {
 *     greengrassV2: { coreDeviceThingName: "FactoryCoreDevice" },
 *   },
 * });
 * ```
 *
 * @resource
 */
export declare const Gateway: import("alchemy").ResourceClass<Gateway>;
export declare const GatewayProvider: () => import("effect/Layer").Layer<Provider.Provider<Gateway>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};

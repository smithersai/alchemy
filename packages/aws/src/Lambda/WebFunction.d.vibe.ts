import type { Credentials } from "@distilled.cloud/aws/Credentials";
import type { Region } from "@distilled.cloud/aws/Region";
import { Platform, type Main, type PlatformProps } from "alchemy/Platform";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { type HostRuntimeContext } from "alchemy/Runtime/Process";
import { Stack } from "alchemy/Stack";
import * as Duration from "effect/Duration";
import { Assets } from "../Assets.js";
import { AWSEnvironment } from "../Environment.js";
import type { PolicyStatement } from "../IAM/Policy.vibe";
import type { Providers } from "../Providers.vibe";
import type { FunctionBuildOptions } from "./Function.js";
import { type WebFunctionAuthType, type WebFunctionCanary, type WebFunctionEndpointType, type WebFunctionRevisionWeight } from "./WebFunctionEndpointSync.js";
export type { WebFunctionAuthType, WebFunctionCanary, WebFunctionEndpointType, WebFunctionRevisionWeight, } from "./WebFunctionEndpointSync.js";
export declare const WebFunctionTypeId: "AWS.Lambda.WebFunction";
export type WebFunctionTypeId = typeof WebFunctionTypeId;
export declare const isWebFunction: (value: unknown) => value is WebFunction;
/** Subnets and security groups for a Web Function's outbound VPC traffic. */
export interface WebFunctionVpc {
    /** Subnets the connector creates network interfaces in. */
    subnetIds: string[];
    /** Security groups applied to the connector's network interfaces. */
    securityGroupIds: string[];
}
declare const WebFunctionVpcRequiresHomeRegion_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "WebFunctionVpcRequiresHomeRegion";
} & Readonly<A>;
/** `vpc` was combined with `regions`; VPC egress works only in the home Region. */
export declare class WebFunctionVpcRequiresHomeRegion extends WebFunctionVpcRequiresHomeRegion_base<{
    functionId: string;
    message: string;
}> {
}
export interface WebFunctionProps extends PlatformProps {
    /**
     * Entry module of the web server.
     *
     * With an Effect implementation (the class form), Alchemy serves the
     * returned `fetch` handler. Without one, `main` is your own Node server
     * and is bundled as-is: it must listen on the `host:port` Lambda passes
     * in `AWS_LAMBDA_HTTP_ENDPOINT`.
     */
    main: string;
    /**
     * Set to `false` to skip bundling and deploy `main`'s directory as-is,
     * e.g. a framework's standalone server output (`.output/server`,
     * Next.js `.next/standalone`). Lambda starts `main`, which must listen
     * on `AWS_LAMBDA_HTTP_ENDPOINT`.
     * @default true
     */
    bundle?: false;
    /**
     * Name of the Web Function. If omitted, a unique name is generated from
     * the stack, stage, and logical ID. Changing it replaces the function.
     */
    functionName?: string;
    /**
     * Description recorded on each revision.
     */
    description?: string;
    /**
     * Node.js runtime of the revision. Web Functions run on Arm64.
     * @default "nodejs24.x"
     */
    runtime?: "nodejs24.x";
    /**
     * Environment variables available to the server. Each change creates a
     * new revision.
     */
    env?: Record<string, any>;
    /**
     * Maximum time a single HTTP request can run, rounded up to whole
     * seconds. Valid range: 3 seconds to 15 minutes.
     * @default 30 seconds
     */
    timeout?: Duration.Duration;
    /**
     * Upper bound on concurrent HTTP requests per execution environment.
     * Lambda manages a dynamic per-environment limit that can be lower, but
     * never exceeds this value. This is not a total: the endpoint's peak is
     * `maxEnvironments × maxConcurrencyPerEnvironment`. Valid range: 1–128.
     * Lower it for CPU- or memory-bound servers: every environment has a
     * fixed 2 GB of memory and 2 vCPUs. Changing it creates a new revision.
     * @default 64
     */
    maxConcurrencyPerEnvironment?: number;
    /**
     * Who may call the built-in endpoint. `"ApplicationManaged"` forwards
     * every request (a public endpoint; authenticate in your application).
     * `"IamAuth"` requires SigV4-signed requests from principals with
     * `lambda:InvokeWebFunctionEndpoint`, such as a CloudFront distribution
     * with origin access control. Changes apply in place.
     */
    authType: WebFunctionAuthType;
    /**
     * Name of the built-in endpoint. Your server receives it in the
     * `lambda-web-endpoint-name` request header. Changing it recreates the
     * endpoint, which gets a new URL.
     * @default "default"
     */
    endpointName?: string;
    /**
     * Additional AWS Regions the built-in endpoint serves from. When set, the
     * endpoint is `MultiRegion`: one global domain with latency-based routing
     * across the home Region and these Regions. Changing it recreates the
     * endpoint, which gets a new URL.
     */
    regions?: string[];
    /**
     * Maximum number of execution environments the built-in endpoint uses per
     * Region (2–10,000). Changes apply in place.
     */
    maxEnvironments?: number;
    /**
     * Maximum requests per second the built-in endpoint accepts, enforced per
     * Region. Excess requests receive HTTP 429; `0` disables the endpoint.
     * Changes apply in place.
     */
    rateLimit?: number;
    /**
     * Roll out deploys gradually on the built-in endpoint: the revision a
     * deploy publishes gets `weight` percent of traffic and the revision it
     * served before keeps the rest. Raise `weight` to shift more traffic,
     * set it to `100` (or remove `canary`) to promote, or `0` to roll back.
     * Each endpoint has its own split.
     */
    canary?: WebFunctionCanary;
    /**
     * Route the server's outbound traffic through your VPC so it can reach
     * private resources such as RDS. Alchemy creates a Lambda network
     * connector (and the operator role Lambda uses to manage its network
     * interfaces) in these subnets and attaches it to every revision. Use at
     * least two subnets in different Availability Zones; private subnets need
     * a NAT gateway to reach the internet. Bindings such as `AWS.RDS.Connect`
     * can request the same access, and both are merged.
     *
     * VPC access works only with single-Region endpoints, so it can't be
     * combined with `regions`. Changing it creates a new revision. Removing
     * it deletes the connector and its operator role once no endpoint serves
     * a revision that uses them.
     */
    vpc?: WebFunctionVpc;
    /**
     * Tags applied to the Web Function.
     */
    tags?: Record<string, string>;
    /**
     * Bundler configuration for {@link main}: rolldown input options,
     * `output` overrides, `install` for native packages (built for Linux
     * Arm64), `pure`, and the bundle analyzer.
     */
    build?: FunctionBuildOptions;
    /**
     * Ship source maps with the bundle and enable `--enable-source-maps`.
     * @default true
     */
    uploadSourceMap?: boolean;
    exports?: string[];
}
export interface WebFunction extends Resource<WebFunctionTypeId, WebFunctionProps, {
    /** Name of the Web Function. */
    functionName: string;
    /** ARN of the Web Function (`arn:aws:lambda:…:web-function/<name>`). */
    functionArn: string;
    /** Name of the built-in endpoint. */
    endpointName: string;
    /** ARN of the built-in endpoint, the resource for `lambda:InvokeWebFunctionEndpoint`. */
    endpointArn: string;
    /** Lambda-allocated domain of the built-in endpoint. */
    domainName: string;
    /** HTTPS URL of the built-in endpoint (`https://<domainName>`). */
    url: string;
    /** Auth type of the built-in endpoint. */
    authType: WebFunctionAuthType;
    /**
     * `HomeRegion`, or `MultiRegion` when `regions` is set: one global
     * domain that routes each request to the nearest Region.
     */
    endpointType: WebFunctionEndpointType;
    /**
     * Revision the latest deploy published. Endpoints route all traffic to
     * it, or `canary.weight` percent while a canary runs.
     */
    revisionId: string;
    /**
     * How the built-in endpoint splits traffic: one revision at 100, or the
     * stable revision and the canary while a canary runs.
     */
    revisionWeights: WebFunctionRevisionWeight[];
    /** Name of the execution role. */
    roleName: string;
    /** ARN of the execution role. */
    roleArn: string;
    code: {
        hash: string;
    };
    /**
     * Requests per second the built-in endpoint allows, as observed. Lets
     * `alchemy drift` detect out-of-band changes.
     */
    rateLimit?: number;
    /**
     * Cap on the built-in endpoint's execution environments, as observed.
     * Lets `alchemy drift` detect out-of-band changes.
     */
    maxEnvironments?: number;
    /**
     * Tags on the web function, as observed. Lets `alchemy drift` detect
     * out-of-band changes.
     */
    tags?: Record<string, string>;
    /**
     * Inline policies Alchemy writes on the execution role (binding grants
     * and the log-group guard), as observed. Lets `alchemy drift` detect
     * out-of-band edits.
     */
    executionRolePolicies?: Record<string, unknown>;
}, {
    env?: Record<string, any>;
    policyStatements?: PolicyStatement[];
    /**
     * VPC access requested by a binding (e.g. `AWS.RDS.Connect` with
     * `subnetIds`/`securityGroupIds`). Merged with the `vpc` prop.
     */
    vpc?: WebFunctionVpc;
}, Providers> {
}
export type WebFunctionServices = Credentials | Region | AWSEnvironment | WebFunction;
export type WebFunctionShape = Main<WebFunctionServices>;
/** HTTP-only host context: `serve` registers the `fetch` handler. */
export type WebFunctionRuntimeContext = Omit<HostRuntimeContext, "run">;
export declare const WebFunction: Platform<WebFunction, WebFunctionServices, WebFunctionShape, WebFunctionRuntimeContext, {}, WebFunctionProps>;
export declare const WebFunctionProvider: () => import("effect/Layer").Layer<Provider.Provider<WebFunction>, never, Assets | Stack | import("alchemy").Stage | import("../Assets.js").AssetsRequirements | (import("effect/process/ChildProcessSpawner").ChildProcessSpawner | import("effect/FileSystem").FileSystem | import("effect/Path").Path)>;

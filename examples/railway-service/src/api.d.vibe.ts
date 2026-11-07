import * as Railway from "@alchemy.run/railway";
import * as Effect from "effect/Effect";
import { HttpServerRequest } from "effect/http/HttpServerRequest";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
declare const Api_base: Effect.Effect<import("effect/Pipeable").Pipeable & import("alchemy").ResourceLike<"Railway.Service", Railway.ServiceProps, {
    serviceId: string;
    name: string;
    projectId: string;
    environmentId: string;
    image: string | undefined;
    repo: string | undefined;
    healthcheckPath: string | undefined;
    healthcheckTimeout: number | undefined;
    replicas: number | undefined;
    buildCommand: string | undefined;
    startCommand: string | undefined;
    cronSchedule: string | undefined;
    rootDirectory: string | undefined;
    region: string | undefined;
    port: number | undefined;
    url: string | undefined;
    domain: string | undefined;
    dnsName: string;
    rpcToken: string;
    domainId: string | undefined;
    deploymentId: string | undefined;
    deploymentStatus: string | undefined;
    code: {
        hash: string;
    };
}, Railway.ServiceBinding, Railway.Providers> & {
    bind(sid: import("alchemy").Input<string>, binding: import("alchemy").Input<Railway.ServiceBinding>): Effect.Effect<void>;
    bind(template: TemplateStringsArray, ...args: any[]): (binding: import("alchemy").Input<Railway.ServiceBinding>) => Effect.Effect<void>;
} & {
    serviceId: import("alchemy").Output<string, never>;
    name: import("alchemy").Output<string, never>;
    projectId: import("alchemy").Output<string, never>;
    environmentId: import("alchemy").Output<string, never>;
    image: import("alchemy").Output<string | undefined, never>;
    repo: import("alchemy").Output<string | undefined, never>;
    healthcheckPath: import("alchemy").Output<string | undefined, never>;
    healthcheckTimeout: import("alchemy").Output<number | undefined, never>;
    replicas: import("alchemy").Output<number | undefined, never>;
    buildCommand: import("alchemy").Output<string | undefined, never>;
    startCommand: import("alchemy").Output<string | undefined, never>;
    cronSchedule: import("alchemy").Output<string | undefined, never>;
    rootDirectory: import("alchemy").Output<string | undefined, never>;
    region: import("alchemy").Output<string | undefined, never>;
    port: import("alchemy").Output<number | undefined, never>;
    url: import("alchemy").Output<string | undefined, never>;
    domain: import("alchemy").Output<string | undefined, never>;
    dnsName: import("alchemy").Output<string, never>;
    rpcToken: import("alchemy").Output<string, never>;
    domainId: import("alchemy").Output<string | undefined, never>;
    deploymentId: import("alchemy").Output<string | undefined, never>;
    deploymentStatus: import("alchemy").Output<string | undefined, never>;
    code: import("alchemy/Output").ObjectExpr<{
        hash: string;
    }, never>;
} & import("alchemy").Rpc<Api>, never, Railway.Providers> & import("alchemy").Named<"Api"> & import("alchemy").PlatformIdentity<"Api"> & (new (_: never) => {
    fetch: Effect.Effect<HttpServerResponse.HttpServerResponse, import("effect/http/HttpBody").HttpBodyError, HttpServerRequest | import("@alchemy.run/redis/RuntimeContext").RuntimeContext>;
} & import("alchemy").Named<"Api"> & import("alchemy/Named").Tag<"Railway.Service">);
/**
 * HTTP Service. Binds Postgres, Redis, and the Bucket. Reads the
 * shared {@link Marker} variable from env.
 */
export default class Api extends Api_base {
}
export {};

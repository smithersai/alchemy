import * as GCP from "@alchemy.run/gcp";
import * as Effect from "effect/Effect";
import { HttpServerRequest } from "effect/http/HttpServerRequest";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
/** Hits allowed per key per window. */
export declare const LIMIT = 5;
/** Length of a fixed window, in seconds. */
export declare const WINDOW_SECONDS = 60;
declare const Api_base: Effect.Effect<import("effect/Pipeable").Pipeable & import("alchemy").ResourceLike<"GCP.Run.Service", GCP.Run.ServiceProps, {
    name: string;
    serviceId: string;
    project: string;
    location: string;
    labels: Record<string, string>;
    annotations: Record<string, string>;
    description: string | undefined;
    uri: string | undefined;
    urls: ReadonlyArray<string>;
    uid: string | undefined;
    ingress: string | undefined;
    invokerIamDisabled: boolean;
    latestCreatedRevision: string | undefined;
    latestReadyRevision: string | undefined;
    terminalConditionState: string | undefined;
    reconciling: boolean;
    generation: string | undefined;
    createTime: string | undefined;
    updateTime: string | undefined;
    serviceAccount: string | undefined;
    serviceAccountUniqueId: string | undefined;
    managedServiceAccount: boolean;
    iamGrants: import("@alchemy.run/gcp/Host").AppliedIamGrant[];
    codeHash: string | undefined;
}, import("@alchemy.run/gcp/Host").GcpHostBinding, GCP.Providers> & {
    bind(sid: import("alchemy").Input<string>, binding: import("alchemy").Input<import("@alchemy.run/gcp/Host").GcpHostBinding>): Effect.Effect<void>;
    bind(template: TemplateStringsArray, ...args: any[]): (binding: import("alchemy").Input<import("@alchemy.run/gcp/Host").GcpHostBinding>) => Effect.Effect<void>;
} & {
    name: import("alchemy").Output<string, never>;
    serviceId: import("alchemy").Output<string, never>;
    project: import("alchemy").Output<string, never>;
    location: import("alchemy").Output<string, never>;
    labels: import("alchemy/Output").ObjectExpr<Record<string, string>, never>;
    annotations: import("alchemy/Output").ObjectExpr<Record<string, string>, never>;
    description: import("alchemy").Output<string | undefined, never>;
    uri: import("alchemy").Output<string | undefined, never>;
    urls: import("alchemy/Output").ObjectExpr<readonly string[], never>;
    uid: import("alchemy").Output<string | undefined, never>;
    ingress: import("alchemy").Output<string | undefined, never>;
    invokerIamDisabled: import("alchemy").Output<boolean, never>;
    latestCreatedRevision: import("alchemy").Output<string | undefined, never>;
    latestReadyRevision: import("alchemy").Output<string | undefined, never>;
    terminalConditionState: import("alchemy").Output<string | undefined, never>;
    reconciling: import("alchemy").Output<boolean, never>;
    generation: import("alchemy").Output<string | undefined, never>;
    createTime: import("alchemy").Output<string | undefined, never>;
    updateTime: import("alchemy").Output<string | undefined, never>;
    serviceAccount: import("alchemy").Output<string | undefined, never>;
    serviceAccountUniqueId: import("alchemy").Output<string | undefined, never>;
    managedServiceAccount: import("alchemy").Output<boolean, never>;
    iamGrants: import("alchemy").Output<import("@alchemy.run/gcp/Host").AppliedIamGrant[], never>;
    codeHash: import("alchemy").Output<string | undefined, never>;
} & import("alchemy").Rpc<Api>, never, GCP.Providers> & import("alchemy").Named<"Api"> & import("alchemy").PlatformIdentity<"Api"> & (new (_: never) => {
    fetch: Effect.Effect<HttpServerResponse.HttpServerResponse, import("effect/http/HttpBody").HttpBodyError, HttpServerRequest | import("@alchemy.run/redis/RuntimeContext").RuntimeContext>;
} & import("alchemy").Named<"Api"> & import("alchemy/Named").Tag<"GCP.Run.Service">);
/**
 * A fixed-window rate limiter on Cloud Run, counting in Memorystore.
 *
 * - `POST /hit/:key` — count one hit against `key`. `200` while the key is
 *   within {@link LIMIT} hits per {@link WINDOW_SECONDS}, `429` (with
 *   `retry-after`) once it is over.
 * - `GET /count/:key` — the current count and seconds until the window
 *   resets, without counting a hit.
 *
 * Memorystore only has a private IP, so the service joins the `default`
 * VPC with Direct VPC egress (`template.vpcAccess`). `PRIVATE_RANGES_ONLY`
 * routes just the private ranges (the Redis IP) through the VPC; every
 * other request still leaves the normal way.
 *
 * `invokerIamDisabled: true` makes the API public. Drop it and Cloud Run
 * requires a Google identity token on every request.
 */
export default class Api extends Api_base {
}
export {};

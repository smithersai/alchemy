import * as GCP from "@alchemy.run/gcp";
import * as Effect from "effect/Effect";
import { HttpServerRequest } from "effect/http/HttpServerRequest";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
declare const Admin_base: Effect.Effect<import("effect/Pipeable").Pipeable & import("alchemy").ResourceLike<"GCP.Run.Service", GCP.Run.ServiceProps, {
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
} & import("alchemy").Rpc<Admin>, never, GCP.Providers> & import("alchemy").Named<"Admin"> & import("alchemy").PlatformIdentity<"Admin"> & (new (_: never) => {
    fetch: Effect.Effect<HttpServerResponse.HttpServerResponse, import("effect/http/HttpBody").HttpBodyError, HttpServerRequest | import("alchemy").RuntimeContext>;
} & import("alchemy").Named<"Admin"> & import("alchemy/Named").Tag<"GCP.Run.Service">);
/**
 * An admin endpoint for running the nightly batch on demand — after a
 * backfill, say, instead of waiting for the schedule.
 *
 * - `POST /run` — start a {@link Summarize} execution and return its
 *   operation name. Cloud Run Jobs are asynchronous: this answers as soon
 *   as the execution is created, not when it finishes.
 *
 * The service is public so the example can be driven with `curl`. In
 * production, drop `invokerIamDisabled` and call it with an identity
 * token instead.
 */
export default class Admin extends Admin_base {
}
export {};

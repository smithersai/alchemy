import * as GCP from "@alchemy.run/gcp";
import * as Effect from "effect/Effect";
import { HttpServerRequest } from "effect/http/HttpServerRequest";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
declare const Chat_base: Effect.Effect<import("effect/Pipeable").Pipeable & import("alchemy").ResourceLike<"GCP.Run.Service", GCP.Run.ServiceProps, {
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
} & import("alchemy").Rpc<Chat>, never, GCP.Providers> & import("alchemy").Named<"Chat"> & import("alchemy").PlatformIdentity<"Chat"> & (new (_: never) => {
    fetch: Effect.Effect<HttpServerResponse.HttpServerResponse, never, HttpServerRequest | import("alchemy").RuntimeContext>;
} & import("alchemy").Named<"Chat"> & import("alchemy/Named").Tag<"GCP.Run.Service">);
/**
 * A public chat endpoint on Cloud Run that answers with Gemini on
 * Vertex AI.
 *
 * - `GET /` — health check.
 * - `POST /chat` — `{ prompt, system?, temperature?, maxOutputTokens? }`
 *   in, `{ text, finishReason, modelVersion, usage }` out.
 *
 * There is no API key anywhere: the container calls Vertex AI as its own
 * runtime service account, which the binding grants
 * `roles/aiplatform.user` at deploy time.
 *
 * `invokerIamDisabled: true` makes the service publicly reachable. Drop it
 * and Cloud Run requires a signed Google identity token on every request —
 * worth doing before this endpoint spends real money on strangers' prompts.
 */
export default class Chat extends Chat_base {
}
export {};

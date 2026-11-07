import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Effect from "effect/Effect";
import { HttpServerRequest } from "effect/http/HttpServerRequest";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
declare const _default: Effect.Effect<import("effect/Pipeable").Pipeable & import("alchemy").ResourceLike<"Cloudflare.Worker", Cloudflare.WorkerProps<any, Cloudflare.WorkerAssetsConfig | undefined>, {
    workerId: string;
    workerName: string;
    namespace: string | undefined;
    logpush: boolean | undefined;
    url: string | undefined;
    urls: string[];
    domain: {
        name: string;
        aliases: string[];
        redirects: string[];
        zone?: Cloudflare.Zone.Reference;
        previews?: boolean;
    } | undefined;
    tags: string[] | undefined;
    durableObjectNamespaces: Record<string, string>;
    accountId: string;
    routes: {
        id: string;
        pattern: string;
        zoneId: string;
        url?: string;
    }[];
    crons: string[];
    tailConsumers?: {
        service: string;
    }[] | undefined;
    streamingTailConsumers?: {
        service: string;
    }[] | undefined;
    versionOf?: string | undefined;
    previewOf?: string | undefined;
    previewId?: string | undefined;
    previewName?: string | undefined;
    previewSlug?: string | undefined;
    previewDoClasses?: string[] | undefined;
    versionId?: string | undefined;
    versionAlias?: string | undefined;
    deploymentId?: string | undefined;
    affinityZoneIds?: string[] | undefined;
    secretNames?: string[] | undefined;
    hash?: {
        assets: string | undefined;
        bundle: string | undefined;
        input: string | undefined;
        additionalWorkspaces: string[] | undefined;
        metadata?: string | undefined;
    };
}, {
    bindings?: Cloudflare.WorkerBinding[];
    env?: Record<string, any>;
    cache?: Cloudflare.WorkerCache;
    observability?: Pick<Cloudflare.WorkerObservability, "traces">;
    containers?: {
        className: string;
        attachedBy?: "binding";
        name?: string;
        images?: Record<string, string>;
        devImages?: Record<string, Cloudflare.DevContainerImage>;
        dev: Cloudflare.DevContainerImage | undefined;
        hash: string | undefined;
    }[];
    crons?: string[];
    hyperdrives?: Record<string, Required<Cloudflare.Hyperdrive.DevOrigin>>;
    devRemote?: Record<string, boolean>;
}, Cloudflare.Providers> & {
    bind(sid: import("alchemy").Input<string>, binding: import("alchemy").Input<{
        bindings?: Cloudflare.WorkerBinding[];
        env?: Record<string, any>;
        cache?: Cloudflare.WorkerCache;
        observability?: Pick<Cloudflare.WorkerObservability, "traces">;
        containers?: {
            className: string;
            attachedBy?: "binding";
            name?: string;
            images?: Record<string, string>;
            devImages?: Record<string, Cloudflare.DevContainerImage>;
            dev: Cloudflare.DevContainerImage | undefined;
            hash: string | undefined;
        }[];
        crons?: string[];
        hyperdrives?: Record<string, Required<Cloudflare.Hyperdrive.DevOrigin>>;
        devRemote?: Record<string, boolean>;
    }>): Effect.Effect<void>;
    bind(template: TemplateStringsArray, ...args: any[]): (binding: import("alchemy").Input<{
        bindings?: Cloudflare.WorkerBinding[];
        env?: Record<string, any>;
        cache?: Cloudflare.WorkerCache;
        observability?: Pick<Cloudflare.WorkerObservability, "traces">;
        containers?: {
            className: string;
            attachedBy?: "binding";
            name?: string;
            images?: Record<string, string>;
            devImages?: Record<string, Cloudflare.DevContainerImage>;
            dev: Cloudflare.DevContainerImage | undefined;
            hash: string | undefined;
        }[];
        crons?: string[];
        hyperdrives?: Record<string, Required<Cloudflare.Hyperdrive.DevOrigin>>;
        devRemote?: Record<string, boolean>;
    }>) => Effect.Effect<void>;
} & {
    workerId: import("alchemy").Output<string, never>;
    workerName: import("alchemy").Output<string, never>;
    namespace: import("alchemy").Output<string | undefined, never>;
    logpush: import("alchemy").Output<boolean | undefined, never>;
    url: import("alchemy").Output<string | undefined, never>;
    urls: import("alchemy").Output<string[], never>;
    domain: import("alchemy").Output<{
        name: string;
        aliases: string[];
        redirects: string[];
        zone?: Cloudflare.Zone.Reference;
        previews?: boolean;
    } | undefined, never>;
    tags: import("alchemy").Output<string[] | undefined, never>;
    durableObjectNamespaces: import("alchemy/Output").ObjectExpr<Record<string, string>, never>;
    accountId: import("alchemy").Output<string, never>;
    routes: import("alchemy").Output<{
        id: string;
        pattern: string;
        zoneId: string;
        url?: string;
    }[], never>;
    crons: import("alchemy").Output<string[], never>;
    tailConsumers: import("alchemy").Output<{
        service: string;
    }[] | undefined, never>;
    streamingTailConsumers: import("alchemy").Output<{
        service: string;
    }[] | undefined, never>;
    versionOf: import("alchemy").Output<string | undefined, never>;
    previewOf: import("alchemy").Output<string | undefined, never>;
    previewId: import("alchemy").Output<string | undefined, never>;
    previewName: import("alchemy").Output<string | undefined, never>;
    previewSlug: import("alchemy").Output<string | undefined, never>;
    previewDoClasses: import("alchemy").Output<string[] | undefined, never>;
    versionId: import("alchemy").Output<string | undefined, never>;
    versionAlias: import("alchemy").Output<string | undefined, never>;
    deploymentId: import("alchemy").Output<string | undefined, never>;
    affinityZoneIds: import("alchemy").Output<string[] | undefined, never>;
    secretNames: import("alchemy").Output<string[] | undefined, never>;
    hash: import("alchemy").Output<{
        assets: string | undefined;
        bundle: string | undefined;
        input: string | undefined;
        additionalWorkspaces: string[] | undefined;
        metadata?: string | undefined;
    } | undefined, never>;
} & Cloudflare.Rpc<{
    fetch: Effect.Effect<HttpServerResponse.HttpServerResponse, never, HttpServerRequest | import("alchemy").RuntimeContext>;
}>, never, Cloudflare.Providers> & import("alchemy").Named<"Api"> & import("alchemy").PlatformIdentity<"Api">;
export default _default;

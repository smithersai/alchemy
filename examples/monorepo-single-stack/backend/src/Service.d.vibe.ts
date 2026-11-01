import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Effect from "effect/Effect";
declare const Service_base: Effect.Effect<import("effect/Pipeable").Pipeable & import("alchemy/Resource").ResourceLike<"Cloudflare.Worker", Cloudflare.WorkerProps<any, Cloudflare.WorkerAssetsConfig | undefined>, {
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
    bind(sid: import("alchemy/Input").Input<string>, binding: import("alchemy/Input").Input<{
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
    bind(template: TemplateStringsArray, ...args: any[]): (binding: import("alchemy/Input").Input<{
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
    workerId: import("alchemy/Output").Output<string, never>;
    workerName: import("alchemy/Output").Output<string, never>;
    namespace: import("alchemy/Output").Output<string | undefined, never>;
    logpush: import("alchemy/Output").Output<boolean | undefined, never>;
    url: import("alchemy/Output").Output<string | undefined, never>;
    urls: import("alchemy/Output").Output<string[], never>;
    domain: import("alchemy/Output").Output<{
        name: string;
        aliases: string[];
        redirects: string[];
        zone?: Cloudflare.Zone.Reference;
        previews?: boolean;
    } | undefined, never>;
    tags: import("alchemy/Output").Output<string[] | undefined, never>;
    durableObjectNamespaces: import("alchemy/Output").ObjectExpr<Record<string, string>, never>;
    accountId: import("alchemy/Output").Output<string, never>;
    routes: import("alchemy/Output").Output<{
        id: string;
        pattern: string;
        zoneId: string;
        url?: string;
    }[], never>;
    crons: import("alchemy/Output").Output<string[], never>;
    tailConsumers: import("alchemy/Output").Output<{
        service: string;
    }[] | undefined, never>;
    streamingTailConsumers: import("alchemy/Output").Output<{
        service: string;
    }[] | undefined, never>;
    versionOf: import("alchemy/Output").Output<string | undefined, never>;
    previewOf: import("alchemy/Output").Output<string | undefined, never>;
    previewId: import("alchemy/Output").Output<string | undefined, never>;
    previewName: import("alchemy/Output").Output<string | undefined, never>;
    previewSlug: import("alchemy/Output").Output<string | undefined, never>;
    previewDoClasses: import("alchemy/Output").Output<string[] | undefined, never>;
    versionId: import("alchemy/Output").Output<string | undefined, never>;
    versionAlias: import("alchemy/Output").Output<string | undefined, never>;
    deploymentId: import("alchemy/Output").Output<string | undefined, never>;
    affinityZoneIds: import("alchemy/Output").Output<string[] | undefined, never>;
    secretNames: import("alchemy/Output").Output<string[] | undefined, never>;
    hash: import("alchemy/Output").Output<{
        assets: string | undefined;
        bundle: string | undefined;
        input: string | undefined;
        additionalWorkspaces: string[] | undefined;
        metadata?: string | undefined;
    } | undefined, never>;
} & Cloudflare.Rpc<Service>, never, Cloudflare.Providers> & import("alchemy/Named").Named<"Service"> & import("alchemy/Platform").PlatformIdentity<"Service"> & (new () => {
    fetch: Effect.Effect<Effect.Effect<import("effect/http/HttpServerResponse").HttpServerResponse, import("effect/http/HttpServerError").HttpServerError, import("effect/http/HttpServerRequest").HttpServerRequest | import("effect/Scope").Scope>, never, import("effect/FileSystem").FileSystem | import("effect/Path").Path | import("effect/Scope").Scope>;
} & {
    fetch?: Effect.Effect<import("alchemy/Http").HttpEffect<import("alchemy/RuntimeContext").RuntimeContext | import("alchemy/Platform").PlatformServices | Cloudflare.WorkerServices>, never, import("alchemy/Platform").PlatformServices | Cloudflare.WorkerServices> | import("alchemy/Http").HttpEffect<import("alchemy/RuntimeContext").RuntimeContext | import("alchemy/Platform").PlatformServices | Cloudflare.WorkerServices> | undefined;
} & import("alchemy/Platform").MainRpc<Cloudflare.WorkerServices> & import("alchemy/Named").Named<"Service"> & import("alchemy/Named").Tag<"Cloudflare.Worker">);
export default class Service extends Service_base {
}
export {};

import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Alchemy from "alchemy";
import * as Effect from "effect/Effect";
import Backend from "./src/backend.js";
declare const Website_base: Effect.Effect<Website, never, Cloudflare.Providers> & (new () => Cloudflare.Worker<{
    ASSETS: Cloudflare.Assets;
    readonly GREETING: "Hello from TanStack Start on Cloudflare!";
    readonly BUCKET: Cloudflare.R2.Bucket;
    readonly BACKEND: import("effect/Pipeable").Pipeable & Alchemy.ResourceLike<"Cloudflare.Worker", Cloudflare.WorkerProps<any, Cloudflare.WorkerAssetsConfig | undefined>, {
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
        bind(sid: Alchemy.Input<string>, binding: Alchemy.Input<{
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
        bind(template: TemplateStringsArray, ...args: any[]): (binding: Alchemy.Input<{
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
        workerId: Alchemy.Output<string, never>;
        workerName: Alchemy.Output<string, never>;
        namespace: Alchemy.Output<string | undefined, never>;
        logpush: Alchemy.Output<boolean | undefined, never>;
        url: Alchemy.Output<string | undefined, never>;
        urls: Alchemy.Output<string[], never>;
        domain: Alchemy.Output<{
            name: string;
            aliases: string[];
            redirects: string[];
            zone?: Cloudflare.Zone.Reference;
            previews?: boolean;
        } | undefined, never>;
        tags: Alchemy.Output<string[] | undefined, never>;
        durableObjectNamespaces: import("alchemy/Output").ObjectExpr<Record<string, string>, never>;
        accountId: Alchemy.Output<string, never>;
        routes: Alchemy.Output<{
            id: string;
            pattern: string;
            zoneId: string;
            url?: string;
        }[], never>;
        crons: Alchemy.Output<string[], never>;
        tailConsumers: Alchemy.Output<{
            service: string;
        }[] | undefined, never>;
        streamingTailConsumers: Alchemy.Output<{
            service: string;
        }[] | undefined, never>;
        versionOf: Alchemy.Output<string | undefined, never>;
        previewOf: Alchemy.Output<string | undefined, never>;
        previewId: Alchemy.Output<string | undefined, never>;
        previewName: Alchemy.Output<string | undefined, never>;
        previewSlug: Alchemy.Output<string | undefined, never>;
        previewDoClasses: Alchemy.Output<string[] | undefined, never>;
        versionId: Alchemy.Output<string | undefined, never>;
        versionAlias: Alchemy.Output<string | undefined, never>;
        deploymentId: Alchemy.Output<string | undefined, never>;
        affinityZoneIds: Alchemy.Output<string[] | undefined, never>;
        secretNames: Alchemy.Output<string[] | undefined, never>;
        hash: Alchemy.Output<{
            assets: string | undefined;
            bundle: string | undefined;
            input: string | undefined;
            additionalWorkspaces: string[] | undefined;
            metadata?: string | undefined;
        } | undefined, never>;
    } & Cloudflare.Rpc<Backend>;
}>);
export declare class Website extends Website_base {
}
export type WebsiteEnv = Cloudflare.InferEnv<typeof Website>;
declare const _default: Alchemy.ConfiguredStack<{
    backendUrl: Alchemy.Output<string, never>;
    websiteUrl: Alchemy.Output<string, never>;
}, NoInfer<Cloudflare.Providers>>;
export default _default;

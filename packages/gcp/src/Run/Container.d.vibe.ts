import { Credentials } from "@distilled.cloud/gcp/Credentials";
import type * as Bundle from "alchemy/Bundle/Bundle";
import type { PackageInstall } from "alchemy/Bundle/InstalledPackages";
import { Platform, type Main, type PlatformProps } from "alchemy/Platform";
import * as Provider from "alchemy/Provider";
import { Resource, type ResourceBinding } from "alchemy/Resource";
import { type ServerHost } from "alchemy/Runtime/Process";
import type { ExtraFile } from "alchemy/Util/extraFiles";
import { GcpEnvironment } from "../Environment.js";
import type { GcpHostBinding, GcpIamGrant } from "../Host.js";
import { type GcpHostRuntimeContext } from "../HostContext.js";
import type { Providers } from "../Providers.js";
import type { ContainerSpec } from "./Service.js";
/** Env var a sidecar's program listens on (Cloud Run sets `PORT` only on the ingress container). */
export declare const CONTAINER_PORT_ENV = "ALCHEMY_HTTP_PORT";
/**
 * A container a host binds as a sidecar: its resolved spec, the IAM its
 * bindings need on the revision's service account, and the sidecars it
 * binds in turn.
 */
export type BoundContainer = {
    spec: ContainerSpec;
    iam: GcpIamGrant[];
    sidecars: BoundContainer[];
};
export type ContainerProps = PlatformProps & Omit<ContainerSpec, "image" | "env" | "ports"> & {
    /**
     * Container image. Required unless `main` is set, in which case
     * Alchemy builds and pushes the image.
     */
    image?: string;
    /**
     * Port the container listens on. A `main` program serves HTTP and
     * bound RPC on it; bound callers reach it on `localhost`.
     * @default 3000
     */
    port?: number;
    /**
     * Region of the Artifact Registry repository a `main` image is pushed
     * to.
     * @default the stack's GCP region
     */
    location?: string;
    /**
     * Module entrypoint for an Effect-native container (typically
     * `import.meta.url`). Alchemy bundles the program and builds its image.
     */
    main?: string;
    /**
     * Named export to load from `main`.
     * @default "default"
     */
    handler?: string;
    /**
     * Environment variables. Merged after binding-injected `env`.
     */
    env?: Record<string, any>;
    /** Bundler configuration for `main`. */
    build?: Bundle.BundleConfig & {
        install?: PackageInstall;
    };
    /** Host files or directories baked into the image next to `main`. */
    extraFiles?: ReadonlyArray<ExtraFile>;
};
export type Container = Resource<"GCP.Run.Container", ContainerProps, {
    /** Container name in the revision (DNS_LABEL). */
    name: string;
    /** Image the container runs. */
    image: string;
    /** Port the container listens on. */
    port: number | undefined;
    /** The container's spec, as a host adds it to its revision. */
    spec: ContainerSpec;
    /** IAM roles the container's bindings need on the revision's service account. */
    iam: GcpIamGrant[];
    /** Sidecars this container binds, which join the same revision. */
    sidecars: BoundContainer[];
    /** Project id. */
    project: string;
    /** Region of the image repository. */
    location: string;
    /** Artifact Registry repository a `main` image is pushed to. */
    repository: string | undefined;
    /** Hash of the bundled `main` program (Effect-native only). */
    codeHash: string | undefined;
}, GcpHostBinding, Providers>;
export type ContainerRuntimeContext = GcpHostRuntimeContext;
export type ContainerServices = Credentials | GcpEnvironment | ServerHost;
export type ContainerShape = Main<ContainerServices>;
/**
 * A container that runs next to a Cloud Run service's main container, in
 * the same instance. Bind it from the service with
 * {@link bindContainer} (typed RPC and `fetch`) or {@link bindPort} (a raw
 * port): binding adds it to the service's revision and holds the service
 * back until the container passes its startup probe.
 *
 * Give it `main` and an Effect implementation to run your own program —
 * Alchemy bundles it into its own image — or just an `image`.
 *
 * ### Declaring a Container
 * **Example:** An Effect-native container with RPC methods
 * ```typescript
 * export default class Worker extends GCP.Run.Container<Worker>()(
 *   "Worker",
 *   {
 *     main: import.meta.url,
 *     port: 3000,
 *     startupProbe: { httpGet: { path: "/health" } },
 *   },
 *   Effect.gen(function* () {
 *     return {
 *       greet: (name: string) => Effect.succeed(`hello ${name}`),
 *       fetch: Effect.succeed(HttpServerResponse.text("ok")),
 *     };
 *   }),
 * ) {}
 * ```
 *
 * **Example:** An image
 * ```typescript
 * export const Cache = GCP.Run.Container("Cache", {
 *   image: "docker.io/library/redis:7",
 *   port: 6379,
 *   startupProbe: { tcpSocket: {} },
 * });
 * ```
 *
 * ### Using bindings
 * **Example:** Bindings inside a Container
 * ```typescript
 * export default class Worker extends GCP.Run.Container<Worker>()(
 *   "Worker",
 *   { main: import.meta.url, port: 3000 },
 *   Effect.gen(function* () {
 *     const publish = yield* GCP.PubSub.Publish(Tweets);
 *     return {
 *       post: (text: string) =>
 *         publish({ body: { messages: [{ data: btoa(text) }] } }),
 *     };
 *   }).pipe(Effect.provide(GCP.PubSub.PublishHttp)),
 * ) {}
 * ```
 * The binding's env lands on this container. Its IAM roles go to the
 * service account of the revision the container joins.
 *
 * @resource
 * @category Run
 */
export declare const Container: Platform<Container, ContainerServices, ContainerShape, ContainerRuntimeContext>;
declare const ContainerImageMissing_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.Run.ContainerImageMissing";
} & Readonly<A>;
/** A Container declares neither `image` nor `main`. */
export declare class ContainerImageMissing extends ContainerImageMissing_base<{
    id: string;
}> {
    get message(): string;
}
/** Containers bound by this container's own bindings, flattened. */
export declare const boundContainersOf: (bindings: readonly ResourceBinding<GcpHostBinding>[]) => BoundContainer[];
/** These containers and every sidecar they bind, once each by name. */
export declare const flattenContainers: (containers: readonly BoundContainer[]) => BoundContainer[];
/**
 * A `GCP.Run.Container` listed in a revision template reaches the
 * provider as its attributes (the engine resolves resource references in
 * props).
 */
export declare const isContainerAttributes: (value: unknown) => value is Container["Attributes"];
/** Names of the containers bound directly by these bindings. */
export declare const directContainerNames: (bindings: readonly ResourceBinding<GcpHostBinding>[]) => string[];
export declare const ContainerProvider: () => import("effect/Layer").Layer<Provider.Provider<Container>, never, import("alchemy/AlchemyContext").AlchemyContext | import("effect/process/ChildProcessSpawner").ChildProcessSpawner | import("@alchemy.run/docker/Docker").Docker | import("effect/FileSystem").FileSystem | GcpEnvironment | import("effect/Path").Path | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | import("@distilled.cloud/gcp/Protocol").GcpOpContext>;
export {};

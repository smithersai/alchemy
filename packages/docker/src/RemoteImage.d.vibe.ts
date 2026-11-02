import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { Docker } from "./Docker.ts";
import type { Providers } from "./Providers.vibe";
import { type ImageRegistry } from "./Registry.vibe";
export interface RemoteImageProps {
    /** Docker image name to use as the source, without tag. */
    name: string;
    /** Docker source image tag. @default "latest" */
    tag?: string;
    /** Pull for this platform when the source is not already local or alwaysPull is enabled. */
    platform?: string;
    /**
     * Always pull the source image, even when that reference exists locally.
     *
     * @default true
     */
    alwaysPull?: boolean;
    /**
     * Re-tag the pulled image under this repository/name. When omitted the pulled
     * `name` is kept.
     */
    targetName?: string;
    /**
     * Tag applied to the re-tagged image.
     *
     * @default The pulled `tag`.
     */
    targetTag?: string;
    /** Registry credentials. When set, the (re-tagged) image is pushed. */
    registry?: ImageRegistry;
    /**
     * Skip registry push even when `registry` is set.
     *
     * @default false
     */
    skipPush?: boolean;
    /** Docker context name or context resource. */
    context?: Docker.ContextRef;
}
export interface RemoteImage extends Resource<"Docker.RemoteImage", RemoteImageProps, {
    /** Final image reference. Includes the registry host when pushed there. */
    imageRef: string;
    /** Local image id after reuse or pull. */
    imageId: string;
    /** Source image id used for the last reconcile, preserved across refresh. */
    sourceImageId?: string;
    /** Pull timestamp in milliseconds since epoch. */
    createdAt: number;
    /** Final image repository/name. */
    name: string;
    /** Final image tag. */
    tag: string;
    /** Registry digest after push when available. */
    repoDigest?: string;
}, never, Providers> {
}
/**
 * Makes a source Docker image available through the active Docker context,
 * optionally re-tagging it and pushing it to a registry.
 *
 * The image is available to other Docker resources by `imageRef`. Use
 * `alwaysPull: false` reuses the source tag when it exists in the configured
 * Docker daemon, pulling only when it is missing. Set `targetName`/`targetTag`
 * to re-tag the source image, and `registry` to push it (mirroring it from a
 * source registry into your own, for example).
 *
 * ### Pulling Images
 * **Example:** Pull nginx
 * ```typescript
 * const nginx = yield* Docker.RemoteImage("nginx", {
 *   name: "nginx",
 *   tag: "alpine",
 * });
 * ```
 *
 * **Example:** Reuse an existing daemon tag
 * ```typescript
 * const postgres = yield* Docker.RemoteImage("postgres", {
 *   name: "postgres",
 *   tag: "18-alpine",
 *   alwaysPull: false,
 * });
 * ```
 *
 * ### Re-tagging and Pushing
 * **Example:** Mirror a public image into your registry
 * ```typescript
 * const mirrored = yield* Docker.RemoteImage("nginx-mirror", {
 *   name: "nginx",
 *   tag: "alpine",
 *   targetName: "acme/nginx",
 *   targetTag: "alpine",
 *   registry: {
 *     server: "ghcr.io",
 *     username: "octocat",
 *     password: Config.Redacted("GITHUB_TOKEN"),
 *   },
 * });
 * ```
 *
 * ### Docker Context
 * **Example:** Pull through a named Docker context
 * ```typescript
 * const nginx = yield* Docker.RemoteImage("nginx", {
 *   name: "nginx",
 *   tag: "alpine",
 *   context: "remote-build",
 * });
 * ```
 *
 * @resource
 * @product Image
 */
export declare const RemoteImage: import("alchemy/Resource").ResourceClass<RemoteImage>;
export declare const RemoteImageProvider: () => import("effect/Layer").Layer<Provider.Provider<RemoteImage>, never, Docker>;

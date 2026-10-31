import * as Effect from "effect/Effect";
import type { Redis } from "../Redis.vibe";
import { type FrameworkSiteProps } from "./FrameworkSite.js";
/**
 * The vinext-on-Node framework module (vinext's Vite build +
 * `startProdServer`). Not the Cloudflare Worker source.
 */
export declare const VINEXT_NODE_FRAMEWORK_SPECIFIER = "@alchemy.run/frontend-frameworks/vinext/node";
export interface VinextProps extends FrameworkSiteProps {
    /**
     * Optional Upstash Redis for ISR / `"use cache"`. Bound onto the
     * hosted Service so Alchemy writes `REDIS_URL` as an App secret.
     * The resource injects the Redis data-cache adapter automatically.
     */
    redis?: Redis;
}
/**
 * Deploy a [vinext](https://vinext.dev) application to Fly as a
 * long-running Node process: vinext's Vite build, then vinext's production
 * server (`startProdServer`). The `dist/` output is baked into the
 * image; `vinext` is installed unbundled.
 *
 * Do not use the Cloudflare Worker entry (`vinext/server/fetch-handler`)
 * — that is workerd.
 *
 * ISR / `"use cache"` persist in Redis when you pass {@link VinextProps.redis}.
 * The resource injects the adapter automatically. Missing `REDIS_URL`
 * (local `vinext start` / `alchemy dev`) falls back to memory.
 *
 * During `alchemy dev` the site is `vinext dev` and no cloud resources
 * are declared; `Alchemy.remote()` opts back into the live Service path.
 *
 * ### Creating vinext Sites
 * **Example:** Basic vinext App
 * ```typescript
 * const site = yield* Fly.Website.Vinext("Web", {
 *   rootDir: "./app",
 * });
 * ```
 *
 * **Example:** Redis data cache
 * ```typescript
 * const redis = yield* Fly.Redis("Cache", { eviction: true });
 * const site = yield* Fly.Website.Vinext("Web", {
 *   redis,
 * });
 * ```
 *
 * **Example:** Custom Domain
 * ```typescript
 * const site = yield* Fly.Website.Vinext("Web", {
 *   rootDir: "./app",
 *   domain: "app.example.com",
 * });
 * ```
 *
 * @resource
 * @product Website
 */
export declare const Vinext: (id: string, propsIn?: VinextProps) => Effect.Effect<{
    url: import("alchemy/Output").Output<string | undefined, never>;
    app: undefined;
    service: undefined;
    ip: undefined;
    certificate: undefined;
} | {
    url: string | import("alchemy/Output").Output<string, never>;
    app: import("../App.vibe").App;
    service: import("../Service.js").Service;
    ip: import("../IpAssignment.vibe").IpAssignment;
    certificate: import("../Certificate.vibe").Certificate | undefined;
}, never, import("alchemy/AlchemyContext").AlchemyContext | import("effect/FileSystem").FileSystem | import("effect/Path").Path | import("alchemy/Provider").Provider<import("alchemy/Website/Server").Server> | import("../Providers.js").Providers>;

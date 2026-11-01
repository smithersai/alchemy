import type { InputProps } from "alchemy/Input";
import * as Effect from "effect/Effect";
import { type FrameworkSiteProps } from "./FrameworkSite.js";
/** The framework-integration package that drives the Astro build. */
export declare const ASTRO_FRAMEWORK_SPECIFIER = "@alchemy.run/frontend-frameworks/astro";
/** The AWS Lambda deploy target for the Astro build. */
export declare const ASTRO_AWS_TARGET_SPECIFIER = "@alchemy.run/frontend-frameworks/astro/aws";
/** The Node deploy target for the Lambda Web Function server (the default). */
export declare const ASTRO_WEB_TARGET_SPECIFIER = "@alchemy.run/frontend-frameworks/astro/node";
export type AstroProps = FrameworkSiteProps<{
    /**
     * Deploy-time Astro config overrides, merged OVER your natively-loaded
     * `astro.config.*` (values here win). Use it for values that vary per
     * stage or derive from other resources' Outputs — everything else
     * belongs in the config file.
     */
    astro?: {
        /** Deployed URL origin (astro's `site`). */
        site?: string;
        /** Base path the site is served from (astro's `base`). */
        base?: string;
        /**
         * Astro output target — a deploy-topology decision (whether a
         * server function exists). `"server"` renders pages on demand in
         * the Lambda; individual pages opt into prerendering with
         * `export const prerender = true`. `"static"` prerenders every
         * page at build time and deploys assets-only (no Lambda).
         * Overrides the `output` in your `astro.config.*`; leave it unset to
         * use the file's value.
         * @default the config file's `output`, else `"server"`
         */
        output?: "server" | "static";
        /** Source directory (astro's `srcDir`). */
        srcDir?: string;
        /** Public assets directory (astro's `publicDir`). */
        publicDir?: string;
        /** Build output directory (astro's `outDir`). */
        outDir?: string;
        /** Trailing-slash handling (astro's `trailingSlash`). */
        trailingSlash?: "always" | "never" | "ignore";
    };
    /**
     * Path to an alternate astro config file, relative to `rootDir`.
     * Defaults to astro's own config discovery.
     */
    config?: string;
    /**
     * Serve the built error page (e.g. astro's `404.html`) for requests that
     * match no uploaded file. Only applies to `output: "static"`
     * sites — a server-backed site forwards misses to the Lambda instead.
     */
    errorPage?: string;
    /**
     * Answer misses with the index page (200) instead of a 404. Only applies
     * to `output: "static"` sites.
     */
    spa?: boolean;
}>;
/**
 * Deploy an [Astro](https://astro.build) application to AWS: the server
 * bundle on a Lambda Web Function, static assets (prerendered pages
 * included) in S3, and a CloudFront distribution whose edge router serves
 * uploaded files from S3 and forwards everything else to the server.
 *
 * The server runs on a Lambda Web Function: the framework's Node server
 * (built with the `@alchemy.run/frontend-frameworks/astro/node` deploy
 * target) serves many requests per environment and streams responses. Set
 * `server: "function"` to use a Lambda Function behind a streaming Function
 * URL instead, built with the `/aws` target below, for Regions without Web
 * Functions.
 *
 * The build runs through `@alchemy.run/frontend-frameworks/astro` with the
 * `@alchemy.run/frontend-frameworks/astro/aws` deploy target (a wrangler-free
 * AWS Lambda adapter is injected — your `astro.config.*` must not declare
 * one) — the package must be installed in your project.
 *
 * Pages render on demand by default (`output: "server"`); pages that
 * `export const prerender = true` are prerendered at build time and served
 * from S3. When your `astro.config.*` or `astro: { output: "static" }`
 * declares a static site, every page is prerendered and the deploy is
 * assets-only — no Lambda.
 *
 * Your `astro.config.*` is the home for Astro configuration and loads
 * natively; the `astro` prop is a deploy-time override bag merged OVER
 * the file for values that vary per stage or derive from other
 * resources' Outputs. `config` points at an alternate config file
 * (relative to `rootDir`).
 *
 * ### Creating Astro Sites
 * **Example:** Basic Astro App
 * ```typescript
 * const site = yield* AWS.Website.Astro("Web", {
 *   rootDir: "./app",
 * });
 * ```
 *
 * **Example:** Per-stage site URL override
 * ```typescript
 * const site = yield* AWS.Website.Astro("Blog", {
 *   rootDir: "./blog",
 *   astro: { site: "https://blog.example.com" },
 * });
 * ```
 *
 * **Example:** Custom Domain
 * ```typescript
 * const site = yield* AWS.Website.Astro("Web", {
 *   rootDir: "./app",
 *   domain: {
 *     name: "app.example.com",
 *     hostedZoneId: zone.hostedZoneId,
 *   },
 * });
 * ```
 *
 * ### Static Sites
 * **Example:** Fully Static Astro Site
 * ```typescript
 * const site = yield* AWS.Website.Astro("Docs", {
 *   rootDir: "./docs",
 *   astro: { output: "static" },
 *   errorPage: "404.html",
 * });
 * ```
 *
 * ### Server Configuration
 * **Example:** Tune The Server Function
 * ```typescript
 * const site = yield* AWS.Website.Astro("Web", {
 *   rootDir: "./app",
 *   memorySize: 2048,
 *   env: {
 *     API_BASE: api.url,
 *   },
 * });
 * ```
 *
 * @resource
 */
export declare const Astro: (id: string, props?: InputProps<AstroProps, "server">) => Effect.Effect<{
    bucket: undefined;
    build: import("alchemy/Website/Server").Server;
    files: undefined;
    distribution: undefined;
    invalidation: undefined;
    kvNamespace: string | undefined;
    server: undefined;
    serverUrl: undefined;
    url: import("alchemy").Output<string | undefined, never>;
    urls: import("alchemy").Output<string | undefined, never>[];
} | {
    bucket: import("../S3/Bucket.js").Bucket;
    files: import("./AssetDeployment.js").AssetDeployment;
    distribution: import("../CloudFront/Distribution.js").Distribution | undefined;
    invalidation: import("../CloudFront/Invalidation.vibe").Invalidation | undefined;
    kvNamespace: string;
    url: import("alchemy").Input<string>;
    urls: import("alchemy").Input<string>[];
    build: import("alchemy/Website/Server").Server;
    server: undefined;
    serverUrl: undefined;
} | {
    bucket: import("../S3/Bucket.js").Bucket;
    files: import("./AssetDeployment.js").AssetDeployment;
    distribution: import("../CloudFront/Distribution.js").Distribution | undefined;
    invalidation: import("../CloudFront/Invalidation.vibe").Invalidation | undefined;
    kvNamespace: string;
    url: import("alchemy").Input<string>;
    urls: import("alchemy").Input<string>[];
    build: import("alchemy/Website/Server").Server;
    server: import("../Lambda/WebFunction.vibe").WebFunction;
    serverUrl: import("alchemy").Output<string, never>;
} | {
    bucket: import("../S3/Bucket.js").Bucket;
    files: import("./AssetDeployment.js").AssetDeployment;
    distribution: import("../CloudFront/Distribution.js").Distribution | undefined;
    invalidation: import("../CloudFront/Invalidation.vibe").Invalidation | undefined;
    kvNamespace: string;
    url: import("alchemy").Input<string>;
    urls: import("alchemy").Input<string>[];
    build: import("alchemy/Website/Server").Server;
    server: import("../Lambda/Function.js").Function;
    serverUrl: import("alchemy").Output<string | undefined, never>;
}, never, import("alchemy").AlchemyContext | import("alchemy").Provider<import("alchemy/Command/Build").Build> | import("alchemy").Provider<import("alchemy/Website/Server").Server> | import("../Providers.vibe").Providers | import("alchemy").Stack | import("alchemy").Stage>;

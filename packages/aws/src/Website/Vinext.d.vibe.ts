import { AlchemyContext } from "alchemy/AlchemyContext";
import type { InputProps } from "alchemy/Input";
import * as Output from "alchemy/Output";
import * as Effect from "effect/Effect";
import { Bucket } from "../S3/Bucket.js";
import { type FrameworkSiteProps } from "./FrameworkSite.js";
/**
 * The vinext-on-AWS framework module (it is its own deploy target — not
 * OpenNext, not the Cloudflare Worker source).
 */
export declare const VINEXT_AWS_FRAMEWORK_SPECIFIER = "@alchemy.run/frontend-frameworks/vinext/aws";
/** The AWS Lambda deploy target for the vinext build. */
export declare const VINEXT_AWS_TARGET_SPECIFIER = "@alchemy.run/frontend-frameworks/vinext/aws";
/** Env var the S3 data-cache adapter reads for the ISR/fetch cache bucket. */
export declare const VINEXT_CACHE_BUCKET_ENV = "CACHE_BUCKET_NAME";
export type VinextProps = FrameworkSiteProps;
/**
 * Deploy a [vinext](https://vinext.dev) App Router application to AWS: the RSC
 * server on a Lambda Web Function, static assets in S3, and a CloudFront
 * distribution whose edge router serves uploaded files from S3 and
 * forwards everything else to the server. Set `server: "function"` to run
 * it on a streaming Lambda Function URL instead, for Regions without Web
 * Functions.
 *
 * ISR / `"use cache"` persistence is an S3 bucket (not Cloudflare KV).
 * This resource provisions the bucket, sets `CACHE_BUCKET_NAME`, and
 * grants the server Get/Put/Delete/List. Alchemy injects the S3 data-cache
 * adapter during the build; no Alchemy plugin is needed in `vite.config.ts`.
 * A dedicated cache bucket keeps the graph acyclic (the asset bucket
 * is bound to CloudFront).
 *
 * Requires vinext 1.0.0-beta.10 or newer. The Lambda build uses vinext's
 * standalone packaging to include external runtime dependencies. Pages Router
 * applications require a Node deployment target instead of Lambda.
 *
 * This is **not** `AWS.Website.Nextjs` (OpenNext) and **not**
 * `Cloudflare.Website.Vinext`. During `alchemy dev` the site is
 * `vinext dev` and no cloud resources are declared.
 *
 * ### Creating vinext Sites
 * **Example:** Basic vinext App
 * ```typescript
 * const site = yield* AWS.Website.Vinext("Web", {
 *   rootDir: "./app",
 * });
 * ```
 *
 * **Example:** vite.config.ts (platform-agnostic)
 * ```typescript
 * import { defineConfig } from "vite";
 * import vinext from "vinext";
 *
 * export default defineConfig({
 *   plugins: [vinext({ prerender: true })],
 * });
 * ```
 *
 * @resource
 * @product Website
 * @category Frontend
 */
export declare const Vinext: (id: string, propsIn?: InputProps<VinextProps, "server">) => Effect.Effect<{
    bucket: undefined;
    build: import("alchemy/Website/Server").Server;
    files: undefined;
    distribution: undefined;
    invalidation: undefined;
    kvNamespace: string | undefined;
    server: undefined;
    serverUrl: undefined;
    url: Output.Output<string | undefined, never>;
    urls: Output.Output<string | undefined, never>[];
    cacheBucket: undefined;
} | {
    bucket: Bucket;
    files: import("./AssetDeployment.js").AssetDeployment;
    distribution: import("../CloudFront/Distribution.js").Distribution | undefined;
    invalidation: import("../CloudFront/Invalidation.vibe").Invalidation | undefined;
    kvNamespace: string;
    url: import("alchemy").Input<string>;
    urls: import("alchemy").Input<string>[];
    build: import("alchemy/Website/Server").Server;
    server: undefined;
    serverUrl: undefined;
    cacheBucket: undefined;
} | {
    bucket: Bucket;
    files: import("./AssetDeployment.js").AssetDeployment;
    distribution: import("../CloudFront/Distribution.js").Distribution | undefined;
    invalidation: import("../CloudFront/Invalidation.vibe").Invalidation | undefined;
    kvNamespace: string;
    url: import("alchemy").Input<string>;
    urls: import("alchemy").Input<string>[];
    build: import("alchemy/Website/Server").Server;
    server: import("../Lambda/WebFunction.js").WebFunction;
    serverUrl: Output.Output<string, never>;
    cacheBucket: undefined;
} | {
    bucket: Bucket;
    files: import("./AssetDeployment.js").AssetDeployment;
    distribution: import("../CloudFront/Distribution.js").Distribution | undefined;
    invalidation: import("../CloudFront/Invalidation.vibe").Invalidation | undefined;
    kvNamespace: string;
    url: import("alchemy").Input<string>;
    urls: import("alchemy").Input<string>[];
    build: import("alchemy/Website/Server").Server;
    server: import("../Lambda/Function.js").Function;
    serverUrl: Output.Output<string | undefined, never>;
    cacheBucket: undefined;
} | {
    bucket: undefined;
    build: import("alchemy/Website/Server").Server;
    files: undefined;
    distribution: undefined;
    invalidation: undefined;
    kvNamespace: string | undefined;
    server: undefined;
    serverUrl: undefined;
    url: Output.Output<string | undefined, never>;
    urls: Output.Output<string | undefined, never>[];
    cacheBucket: Bucket;
} | {
    bucket: Bucket;
    files: import("./AssetDeployment.js").AssetDeployment;
    distribution: import("../CloudFront/Distribution.js").Distribution | undefined;
    invalidation: import("../CloudFront/Invalidation.vibe").Invalidation | undefined;
    kvNamespace: string;
    url: import("alchemy").Input<string>;
    urls: import("alchemy").Input<string>[];
    build: import("alchemy/Website/Server").Server;
    server: undefined;
    serverUrl: undefined;
    cacheBucket: Bucket;
} | {
    bucket: Bucket;
    files: import("./AssetDeployment.js").AssetDeployment;
    distribution: import("../CloudFront/Distribution.js").Distribution | undefined;
    invalidation: import("../CloudFront/Invalidation.vibe").Invalidation | undefined;
    kvNamespace: string;
    url: import("alchemy").Input<string>;
    urls: import("alchemy").Input<string>[];
    build: import("alchemy/Website/Server").Server;
    server: import("../Lambda/WebFunction.js").WebFunction;
    serverUrl: Output.Output<string, never>;
    cacheBucket: Bucket;
} | {
    bucket: Bucket;
    files: import("./AssetDeployment.js").AssetDeployment;
    distribution: import("../CloudFront/Distribution.js").Distribution | undefined;
    invalidation: import("../CloudFront/Invalidation.vibe").Invalidation | undefined;
    kvNamespace: string;
    url: import("alchemy").Input<string>;
    urls: import("alchemy").Input<string>[];
    build: import("alchemy/Website/Server").Server;
    server: import("../Lambda/Function.js").Function;
    serverUrl: Output.Output<string | undefined, never>;
    cacheBucket: Bucket;
}, never, AlchemyContext | import("alchemy").Provider<import("alchemy/Command/Build").Build> | import("alchemy").Provider<import("alchemy/Website/Server").Server> | import("../Providers.js").Providers | import("alchemy").Stack | import("alchemy").Stage>;

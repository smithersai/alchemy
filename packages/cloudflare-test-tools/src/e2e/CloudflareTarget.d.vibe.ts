import { type DeployTarget } from "@alchemy.run/frontend-frameworks/core";
import type * as Options from "./Options.js";
/**
 * The e2e harness's Cloudflare deploy target: a framework-core `DeployTarget`
 * value whose `serve` boots miniflare over a `BuildOutput` (the
 * preview-parity engine the harness has always used for `e2e preview` / the
 * Playwright `live` mode). Serving built output is *architecturally* the
 * target's concern — the implementation lives in the harness for now because
 * miniflare is a harness dependency.
 */
export interface CloudflareTarget extends DeployTarget<Options.CloudflareTargetOptions> {
    /** Always available on the harness's cloudflare target. */
    readonly serve: NonNullable<DeployTarget["serve"]>;
}
export declare const makeCloudflareTarget: (config: Options.CloudflareTargetOptions) => CloudflareTarget;

import * as Layer from "effect/Layer";
import { MergePullRequest } from "./MergePullRequest.js";
/**
 * Implementation of {@link MergePullRequest} with the provider's current credentials.
 * Provide it on an `Action` or another deploy-time Effect.
 *
 * @layer
 * @product Pull Request
 * @provides GitHub.MergePullRequest
 */
export declare const MergePullRequestLocal: Layer.Layer<MergePullRequest, import("@distilled.cloud/github").ConfigError, import("@distilled.cloud/github").Credentials>;

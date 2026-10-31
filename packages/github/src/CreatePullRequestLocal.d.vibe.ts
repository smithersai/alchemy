import * as Layer from "effect/Layer";
import { CreatePullRequest } from "./CreatePullRequest.js";
/**
 * Implementation of {@link CreatePullRequest} with the provider's current credentials.
 * Provide it on an `Action` or another deploy-time Effect.
 *
 * @layer
 * @product Pull Request
 * @provides GitHub.CreatePullRequest
 */
export declare const CreatePullRequestLocal: Layer.Layer<CreatePullRequest, import("@distilled.cloud/github").ConfigError, import("@distilled.cloud/github").Credentials>;

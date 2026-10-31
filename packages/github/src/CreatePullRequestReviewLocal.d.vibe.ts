import * as Layer from "effect/Layer";
import { CreatePullRequestReview } from "./CreatePullRequestReview.js";
/**
 * Implementation of {@link CreatePullRequestReview} with the provider's current credentials.
 * Provide it on an `Action` or another deploy-time Effect.
 *
 * @layer
 * @product Pull Request
 * @provides GitHub.CreatePullRequestReview
 */
export declare const CreatePullRequestReviewLocal: Layer.Layer<CreatePullRequestReview, import("@distilled.cloud/github").ConfigError, import("@distilled.cloud/github").Credentials>;

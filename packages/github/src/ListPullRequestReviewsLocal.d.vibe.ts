import * as Layer from "effect/Layer";
import { ListPullRequestReviews } from "./ListPullRequestReviews.js";
/**
 * Implementation of {@link ListPullRequestReviews} with the provider's current credentials.
 * Provide it on an `Action` or another deploy-time Effect.
 *
 * @layer
 * @product Pull Request
 * @provides GitHub.ListPullRequestReviews
 */
export declare const ListPullRequestReviewsLocal: Layer.Layer<ListPullRequestReviews, import("@distilled.cloud/github").ConfigError, import("@distilled.cloud/github").Credentials>;

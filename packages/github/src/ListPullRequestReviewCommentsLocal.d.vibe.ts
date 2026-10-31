import * as Layer from "effect/Layer";
import { ListPullRequestReviewComments } from "./ListPullRequestReviewComments.js";
/**
 * Implementation of {@link ListPullRequestReviewComments} with the provider's current credentials.
 * Provide it on an `Action` or another deploy-time Effect.
 *
 * @layer
 * @product Pull Request
 * @provides GitHub.ListPullRequestReviewComments
 */
export declare const ListPullRequestReviewCommentsLocal: Layer.Layer<ListPullRequestReviewComments, import("@distilled.cloud/github").ConfigError, import("@distilled.cloud/github").Credentials>;

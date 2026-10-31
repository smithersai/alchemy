import * as Layer from "effect/Layer";
import { ListPullRequests } from "./ListPullRequests.js";
/**
 * Implementation of {@link ListPullRequests} with the provider's current credentials.
 * Provide it on an `Action` or another deploy-time Effect.
 *
 * @layer
 * @product Pull Request
 * @provides GitHub.ListPullRequests
 */
export declare const ListPullRequestsLocal: Layer.Layer<ListPullRequests, import("@distilled.cloud/github").ConfigError, import("@distilled.cloud/github").Credentials>;

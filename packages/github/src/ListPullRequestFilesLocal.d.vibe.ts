import * as Layer from "effect/Layer";
import { ListPullRequestFiles } from "./ListPullRequestFiles.js";
/**
 * Implementation of {@link ListPullRequestFiles} with the provider's current credentials.
 * Provide it on an `Action` or another deploy-time Effect.
 *
 * @layer
 * @product Pull Request
 * @provides GitHub.ListPullRequestFiles
 */
export declare const ListPullRequestFilesLocal: Layer.Layer<ListPullRequestFiles, import("@distilled.cloud/github").ConfigError, import("@distilled.cloud/github").Credentials>;

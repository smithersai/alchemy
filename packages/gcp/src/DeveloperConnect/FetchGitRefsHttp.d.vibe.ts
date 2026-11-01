import * as Layer from "effect/Layer";
import { FetchGitRefs } from "./FetchGitRefs.js";
/**
 * HTTP implementation of {@link FetchGitRefs}.
 *
 * @layer
 * @provides GCP.DeveloperConnect.FetchGitRefs
 */
export declare const FetchGitRefsHttp: Layer.Layer<FetchGitRefs, never, never>;

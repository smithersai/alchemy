import * as cloudbuild from "@distilled.cloud/gcp/cloudbuild_v2";
import * as Layer from "effect/Layer";
import { FetchGitRefs } from "./FetchGitRefs.vibe";
/**
 * HTTP implementation of {@link FetchGitRefs}.
 *
 * @layer
 * @provides GCP.CloudBuild.FetchGitRefs
 */
export declare const FetchGitRefsHttp: Layer.Layer<FetchGitRefs, never, cloudbuild.GcpOpContext>;

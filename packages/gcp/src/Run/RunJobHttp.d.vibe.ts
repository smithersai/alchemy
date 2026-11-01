import * as Layer from "effect/Layer";
import { RunJob } from "./RunJob.vibe";
/**
 * HTTP implementation of {@link RunJob}.
 *
 * @layer
 * @provides GCP.Run.RunJob
 */
export declare const RunJobHttp: Layer.Layer<RunJob, never, never>;

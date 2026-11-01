import * as Layer from "effect/Layer";
import { CreateJob } from "./CreateJob.vibe";
/**
 * HTTP implementation of {@link CreateJob}.
 *
 * @layer
 * @provides GCP.Transcoder.CreateJob
 */
export declare const CreateJobHttp: Layer.Layer<CreateJob, never, never>;

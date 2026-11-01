import * as Layer from "effect/Layer";
import { SubmitJob } from "./SubmitJob.js";
/**
 * HTTP implementation of {@link SubmitJob}.
 *
 * Grants `roles/dataproc.editor` on the project because
 * `dataproc.jobs.create` is checked on the project (jobs are not children
 * of the cluster, so neither a cluster-level grant nor an IAM Condition on
 * the cluster name applies) and no narrower predefined role contains it.
 *
 * @layer
 * @provides GCP.Dataproc.SubmitJob
 */
export declare const SubmitJobHttp: Layer.Layer<SubmitJob, never, never>;

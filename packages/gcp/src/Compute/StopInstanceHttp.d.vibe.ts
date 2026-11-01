import * as Layer from "effect/Layer";
import { StopInstance } from "./StopInstance.js";
/**
 * HTTP implementation of {@link StopInstance}.
 *
 * Grants `roles/compute.instanceAdmin.v1` on the bound instance only,
 * because no narrower predefined role contains `compute.instances.stop`.
 *
 * @layer
 * @provides GCP.Compute.StopInstance
 */
export declare const StopInstanceHttp: Layer.Layer<StopInstance, never, never>;

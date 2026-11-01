import * as Layer from "effect/Layer";
import { StartInstance } from "./StartInstance.vibe";
/**
 * HTTP implementation of {@link StartInstance}.
 *
 * Grants `roles/compute.instanceAdmin.v1` on the bound instance only,
 * because no narrower predefined role contains `compute.instances.start`.
 *
 * @layer
 * @provides GCP.Compute.StartInstance
 */
export declare const StartInstanceHttp: Layer.Layer<StartInstance, never, never>;

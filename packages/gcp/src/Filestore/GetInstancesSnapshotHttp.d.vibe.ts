import * as Layer from "effect/Layer";
import { GetInstancesSnapshot } from "./GetInstancesSnapshot.vibe";
/**
 * HTTP implementation of {@link GetInstancesSnapshot}.
 *
 * @layer
 * @provides GCP.Filestore.GetInstancesSnapshot
 */
export declare const GetInstancesSnapshotHttp: Layer.Layer<GetInstancesSnapshot, never, never>;

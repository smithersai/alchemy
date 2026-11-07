import * as Layer from "effect/Layer";
import { GetQueuedResource } from "./GetQueuedResource.vibe";
/**
 * HTTP implementation of {@link GetQueuedResource}.
 *
 * @layer
 * @provides GCP.TPU.GetQueuedResource
 */
export declare const GetQueuedResourceHttp: Layer.Layer<GetQueuedResource, never, never>;

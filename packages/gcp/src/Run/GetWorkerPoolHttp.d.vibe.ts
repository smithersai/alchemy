import * as Layer from "effect/Layer";
import { GetWorkerPool } from "./GetWorkerPool.vibe";
/**
 * HTTP implementation of {@link GetWorkerPool}.
 *
 * @layer
 * @provides GCP.Run.GetWorkerPool
 */
export declare const GetWorkerPoolHttp: Layer.Layer<GetWorkerPool, never, never>;

import * as Layer from "effect/Layer";
import { Worker, WorkerEnvironment } from "../Workers/Worker.js";
import { Get } from "./Get.vibe";
/**
 * Implementation of the {@link Get} binding that uses a native
 * `dispatch_namespace` Worker binding.
 */
export declare const GetBinding: Layer.Layer<Get, never, WorkerEnvironment | Worker<any>>;

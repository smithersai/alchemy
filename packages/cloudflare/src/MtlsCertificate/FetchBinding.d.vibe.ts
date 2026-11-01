import * as Layer from "effect/Layer";
import { WorkerEnvironment } from "../Workers/Worker.js";
import { Fetch } from "./Fetch.js";
/**
 * Implementation of {@link Fetch} over the native `mtls_certificate` Worker
 * binding. Provide it on the Worker's Effect.
 */
export declare const FetchBinding: Layer.Layer<Fetch, never, WorkerEnvironment>;

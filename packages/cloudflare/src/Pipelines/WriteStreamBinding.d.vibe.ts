import * as Layer from "effect/Layer";
import { Worker, WorkerEnvironment } from "../Workers/Worker.js";
import { type LegacyPipeline } from "./LegacyPipeline.js";
import type { Stream } from "./Stream.js";
import { WriteStream, type WriteStreamClient } from "./WriteStream.js";
/**
 * Implementation of the {@link WriteStream} service over a native Worker
 * `pipelines` binding. Registers the binding on the host Worker and, when
 * the stream has an Effect Schema, encodes records with it before
 * `send`.
 * ### Providing the Layer
 * **Example:** Send from a Worker
 * ```typescript
 * Effect.gen(function* () {
 *   const views = yield* Cloudflare.Basin.WriteStream(PageViews);
 *   // ...
 * }).pipe(Effect.provide(Cloudflare.Basin.WriteStreamBinding));
 * ```
 *
 * @layer
 * @provides Cloudflare.Pipelines.WriteStream
 * @product Pipelines
 * @category Storage & Databases
 */
export declare const WriteStreamBinding: Layer.Layer<WriteStream, never, WorkerEnvironment | Worker<any>>;
/** Build the producer client over a native Worker `pipelines` binding. */
export declare const makeWriteStreamClient: (env: Record<string, any>, stream: Stream<any> | LegacyPipeline) => WriteStreamClient<any>;

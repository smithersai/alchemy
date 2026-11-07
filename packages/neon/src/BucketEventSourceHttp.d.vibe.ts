import * as Layer from "effect/Layer";
import { BucketEventSource } from "./BucketEventSource.vibe";
import { Function } from "./Function.vibe";
/**
 * Neon Function HTTP object-event dispatch and deployment wiring.
 *
 * ### Subscribe to uploads
 * **Example:** Provide the subscription implementation
 * ```typescript
 * const application = Effect.gen(function* () {
 *   yield* Neon.BucketEventSource(uploads, { name: "Uploads" }, event =>
 *     Effect.log(event.objectKey),
 *   );
 *   return { fetch: Effect.succeed(HttpServerResponse.text("ok")) };
 * }).pipe(Effect.provide(Neon.BucketEventSourceHttp));
 * ```
 *
 * @layer
 * @product Bucket
 * @provides Neon.BucketEventSource
 */
export declare const BucketEventSourceHttp: Layer.Layer<BucketEventSource, never, Function>;

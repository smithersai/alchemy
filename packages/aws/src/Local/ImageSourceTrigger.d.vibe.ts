/** @effect-diagnostics anyUnknownInErrorContext:off */
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import * as Stream from "effect/Stream";
import { type ImageSourceLike } from "../ECR/ImageSource.vibe";
/**
 * A stream of "the image source changed" triggers for a props bag:
 *
 * - `main` — a `Bundle.watch` over the exact module graph the deploy
 *   bundles (rebuild successes are the trigger; rebuild errors are logged
 *   and swallowed);
 * - `context` — a debounced recursive `fs.watch` of the build context (and
 *   the Dockerfile's directory when it lives outside the context);
 * - `image` (registry ref) / inline-dockerfile-only — nothing local to
 *   watch: an empty stream.
 */
export declare const imageSourceTrigger: (options: {
    /** Logical id, for log prefixes. */
    id: string;
    source: ImageSourceLike;
    isExternal: boolean | undefined;
}) => Effect.Effect<Stream.Stream<void, never, never>, import("effect/PlatformError").PlatformError, import("alchemy").AlchemyContext | import("@alchemy.run/docker/Docker").Docker | FileSystem.FileSystem | Path.Path>;

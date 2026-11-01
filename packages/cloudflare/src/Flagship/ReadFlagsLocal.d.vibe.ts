import type { AlchemyContext } from "alchemy/AlchemyContext";
import type * as FileSystem from "effect/FileSystem";
import type * as HttpClient from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import type * as Path from "effect/Path";
import { CloudflareEnvironment } from "../CloudflareEnvironment.js";
import type { Credentials } from "../Credentials.js";
import { ReadFlags } from "./ReadFlags.vibe";
/**
 * Local implementation of the {@link ReadFlags} binding — evaluates Flagship
 * feature flags over the Cloudflare HTTP API (`GET .../flagship/apps/{appId}/evaluate`)
 * using the **current credentials** instead of a native Worker binding
 * ({@link ReadFlagsBinding}).
 *
 * Provide it on an {@link Action} (or any deploy-time Effect) so you can read
 * flag values with the same `getBooleanValue`/`getStringValue`/… client you'd
 * use inside a Worker:
 *
 * @example Reading a flag from an Action
 * ```typescript
 * const CheckFlag = Alchemy.Action(
 *   "CheckFlag",
 *   Effect.gen(function* () {
 *     const flags = yield* Cloudflare.Flagship.ReadFlags(app);
 *     return Effect.fn(function* () {
 *       return yield* flags.getBooleanValue("new-checkout", false);
 *     });
 *   }).pipe(Effect.provide(Cloudflare.Flagship.ReadFlagsLocal)),
 * );
 * ```
 *
 * The app id is resolved at apply time through the ambient {@link RuntimeContext}
 * (in an Action, that's the resolve context the engine provides around the
 * body), so `ReadFlags(app)` works even though the app is created in the same
 * deploy.
 *
 * Under `alchemy dev`, a locally-emulated app (a `dev:` app id) is evaluated
 * against the local Flagship simulator's definitions with the same rules a
 * dev Worker's binding applies, so the full evaluation context is honored.
 *
 * Limitations vs. the Worker binding for a live app: the HTTP evaluate
 * endpoint only accepts a single `targetingKey` (read from
 * `context.targetingKey`), so attribute-based targeting rules that key off
 * other context fields cannot be exercised. The `raw` runtime binding has no
 * HTTP equivalent and dies if used — see {@link makeHttpFlagshipClient}.
 */
export declare const ReadFlagsLocal: Layer.Layer<ReadFlags, never, AlchemyContext | CloudflareEnvironment | Credentials | FileSystem.FileSystem | HttpClient.HttpClient | Path.Path>;

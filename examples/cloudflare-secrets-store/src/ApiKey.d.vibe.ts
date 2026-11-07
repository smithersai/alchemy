import * as Cloudflare from "@alchemy.run/cloudflare";
import { Random } from "alchemy";
import * as Effect from "effect/Effect";
/**
 * An API key secret in the Secrets Store.
 *
 * Uses `Random` to generate a stable random value that persists
 * across deploys (only regenerated if the resource is replaced).
 */
export declare const ApiKey: Effect.Effect<Cloudflare.SecretsStore.Secret, never, import("alchemy").Provider<Random> | Cloudflare.Providers>;

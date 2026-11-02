import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Effect from "effect/Effect";
import { RegistryConfig } from "./Bindings.vibe";
import * as GitHub from "./GitHub.ts";
/**
 * Expiry sweep. Tags tied to pull requests are extended while any of those
 * pull requests is open and pinned to the latest close time plus TTL once
 * they all close. Expired tags go away, and tarballs nothing points at are
 * deleted from R2.
 */
export declare const sweep: Effect.Effect<void, Cloudflare.R2.R2Error | import("effect/Schema").SchemaError | import("effect/sql/SqlError").SqlError, GitHub.GitHubApp | Cloudflare.Providers | Cloudflare.R2.ReadWriteBucket | Cloudflare.KV.ReadWriteNamespace | RegistryConfig | import("alchemy").RuntimeContext | import("effect/sql/SqlClient").SqlClient>;

import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Drizzle from "@alchemy.run/drizzle";
import * as Neon from "@alchemy.run/neon";
import * as Alchemy from "alchemy";
import * as Effect from "effect/Effect";
/**
 * A Drizzle schema + Neon project + feature branch. The branch's
 * `migrations` prop is wired to the schema resource, so the
 * provider order becomes:
 *
 *   1. `Drizzle.Schema` regenerates pending migration SQL files.
 *   2. `Neon.Branch` scans the directory and applies any new migrations
 *      transactionally.
 */
export declare const NeonDb: Effect.Effect<{
    project: Neon.Project;
    branch: Neon.Branch;
    schema: Drizzle.Schema;
}, never, Drizzle.Providers | Neon.Providers | Alchemy.Stack>;
export declare const Hyperdrive: Effect.Effect<Cloudflare.Hyperdrive.Connection, never, Cloudflare.Providers | Drizzle.Providers | Neon.Providers | Alchemy.Stack>;

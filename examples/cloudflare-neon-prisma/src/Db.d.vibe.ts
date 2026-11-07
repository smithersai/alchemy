import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Neon from "@alchemy.run/neon";
import * as Prisma from "@alchemy.run/prisma";
import * as Alchemy from "alchemy";
import * as Effect from "effect/Effect";
/**
 * A Prisma contract + Neon project + branch. Passing the contract's
 * output to `Prisma.Migrate` orders the deploy:
 *
 *   1. `Prisma.Contract` re-emits the contract and plans a migration
 *      package when the contract drifted from the migration graph.
 *   2. `Prisma.Migrate` applies pending packages to the branch
 *      (graph-ordered, tracked by the database's contract marker).
 */
export declare const NeonDb: Effect.Effect<{
    project: Neon.Project;
    branch: Neon.Branch;
    contract: Prisma.Contract;
    migrate: Prisma.Migrate;
}, never, Neon.Providers | Prisma.Providers | Alchemy.Stack>;
export declare const Hyperdrive: Effect.Effect<Cloudflare.Hyperdrive.Connection, never, Cloudflare.Providers | Neon.Providers | Prisma.Providers | Alchemy.Stack>;

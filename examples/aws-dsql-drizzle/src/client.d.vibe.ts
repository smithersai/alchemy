import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
export declare const connectDatabase: Effect.Effect<import("drizzle-orm/effect-postgres").EffectPgDatabase<import("drizzle-orm").EmptyRelations> & {
    $client: import("@effect/sql-pg/PgClient").PgClient;
}, never, AWS.DSQL.Connect | AWS.Providers>;

import * as AWS from "@alchemy.run/aws";
import * as Layer from "effect/Layer";
export declare const DatabaseLive: Layer.Layer<import("@effect/sql-pg/PgClient").PgClient | import("effect/sql/SqlClient").SqlClient, never, AWS.Providers>;

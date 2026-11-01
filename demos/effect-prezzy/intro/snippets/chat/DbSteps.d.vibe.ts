import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Neon from "@alchemy.run/neon";
import * as Layer from "effect/Layer";
import * as SqlClient from "effect/sql/SqlClient";
/** The Database module's interface: a SQL client. */
export declare const Database: import("effect/Context").Service<SqlClient.SqlClient, SqlClient.SqlClient>;
export declare const DatabaseLive: Layer.Layer<import("@effect/sql-pg/PgClient").PgClient | SqlClient.SqlClient, never, Cloudflare.Providers | Neon.Providers | Cloudflare.WorkerEnvironment | Cloudflare.Worker<any>>;

import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Neon from "@alchemy.run/neon";
import * as Layer from "effect/Layer";
export declare const DatabaseLive: Layer.Layer<import("@effect/sql-pg/PgClient").PgClient | import("effect/sql/SqlClient").SqlClient, never, Cloudflare.Providers | Neon.Providers | Cloudflare.WorkerEnvironment | Cloudflare.Worker<any>>;

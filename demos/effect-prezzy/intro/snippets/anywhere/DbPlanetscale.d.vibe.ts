import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Planetscale from "@alchemy.run/planetscale";
import * as Layer from "effect/Layer";
export declare const DatabaseLive: Layer.Layer<import("@effect/sql-pg/PgClient").PgClient | import("effect/sql/SqlClient").SqlClient, never, Cloudflare.Providers | Planetscale.Providers | Cloudflare.WorkerEnvironment | Cloudflare.Worker<any>>;

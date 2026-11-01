import * as Drizzle from "@alchemy.run/drizzle";
import * as Fly from "@alchemy.run/fly";
/**
 * Fly.io Managed Postgres + Drizzle, queried from an HTTP Service.
 *
 * Billed (~$38/mo Basic).
 */
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    appName: Alchemy.Output<string, never>;
    clusterId: Alchemy.Output<string, never>;
    clusterName: Alchemy.Output<string, never>;
    region: Alchemy.Output<string, never>;
    migrations: Alchemy.Output<string[], never>;
    apiUrl: Alchemy.Output<string | undefined, never>;
}, NoInfer<Fly.Providers | Drizzle.Providers>>;
export default _default;

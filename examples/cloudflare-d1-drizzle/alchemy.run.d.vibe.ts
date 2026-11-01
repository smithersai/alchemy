import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Drizzle from "@alchemy.run/drizzle";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string, never>;
    databaseName: Alchemy.Output<string, never>;
}, NoInfer<Cloudflare.Providers | Drizzle.Providers>>;
export default _default;

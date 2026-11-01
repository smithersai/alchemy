import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Alchemy from "alchemy";
/**
 * One URL, four Workers, no gateway Worker in between.
 *
 * `Home` owns the hostname as a custom domain; `Products`, `Orders` and
 * `Admin` each claim a path with a zone route. Cloudflare matches routes
 * before custom domains, so a request goes straight to the Worker that
 * owns its path. `alchemy dev` emulates the same routing table on `Home`'s
 * local URL.
 */
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string, never>;
}, NoInfer<Cloudflare.Providers>>;
export default _default;

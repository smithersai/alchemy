import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    api: Alchemy.Output<string, never>;
    web: Alchemy.Output<string | undefined, never>;
}, NoInfer<Cloudflare.Providers>>;
export default _default;

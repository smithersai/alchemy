import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string, never>;
    destinationEmail: Alchemy.Output<string, never>;
    destinationVerified: Alchemy.Output<boolean, never>;
    inbox: string;
}, NoInfer<Cloudflare.Providers>>;
export default _default;

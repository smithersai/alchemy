import * as Hetzner from "@alchemy.run/hetzner";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    ipv4: Alchemy.Output<string | undefined, never>;
    ipv6: Alchemy.Output<string | undefined, never>;
}, NoInfer<Hetzner.Providers>>;
export default _default;

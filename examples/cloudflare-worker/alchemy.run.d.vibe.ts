import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string, never>;
    bucket: Alchemy.Output<string, never>;
    gatewayId: Alchemy.Output<string, never>;
    workerTagUrl: Alchemy.Output<string, never>;
    secondaryApiUrl: Alchemy.Output<string, never>;
    deployedAt: Alchemy.Output<string, never>;
}, NoInfer<Cloudflare.Providers | Alchemy.Stack>>;
export default _default;

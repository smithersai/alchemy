import * as GCP from "@alchemy.run/gcp";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string | undefined, never>;
    gatewayName: Alchemy.Output<string, never>;
    gatewayServiceAccount: Alchemy.Output<string | undefined, never>;
    quotesUrl: Alchemy.Output<string | undefined, never>;
    quotesName: Alchemy.Output<string, never>;
}, NoInfer<GCP.Providers>>;
export default _default;

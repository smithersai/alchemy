import * as GCP from "@alchemy.run/gcp";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string | undefined, never>;
    serviceName: Alchemy.Output<string, never>;
    serviceAccount: Alchemy.Output<string | undefined, never>;
}, NoInfer<GCP.Providers>>;
export default _default;

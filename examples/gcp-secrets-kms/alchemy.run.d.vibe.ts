import * as GCP from "@alchemy.run/gcp";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string | undefined, never>;
    serviceName: Alchemy.Output<string, never>;
    keyRingName: Alchemy.Output<string, never>;
    cryptoKeyName: Alchemy.Output<string, never>;
    secretId: Alchemy.Output<string, never>;
    secretName: Alchemy.Output<string, never>;
}, NoInfer<GCP.Providers>>;
export default _default;

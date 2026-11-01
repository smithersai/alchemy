import * as GCP from "@alchemy.run/gcp";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string | undefined, never>;
    functionName: Alchemy.Output<string, never>;
    serviceName: Alchemy.Output<string | undefined, never>;
    databaseName: Alchemy.Output<string, never>;
}, NoInfer<GCP.Providers>>;
export default _default;

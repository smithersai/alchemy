import * as GCP from "@alchemy.run/gcp";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string | undefined, never>;
    jobName: Alchemy.Output<string, never>;
    subscriptionId: Alchemy.Output<string, never>;
    tableId: Alchemy.Output<string, never>;
}, NoInfer<GCP.Providers>>;
export default _default;

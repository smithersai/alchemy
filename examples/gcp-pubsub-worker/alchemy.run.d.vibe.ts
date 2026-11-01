import * as GCP from "@alchemy.run/gcp";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string | undefined, never>;
    topicName: Alchemy.Output<string, never>;
    databaseName: Alchemy.Output<string, never>;
    workerPoolName: Alchemy.Output<string, never>;
}, NoInfer<GCP.Providers>>;
export default _default;

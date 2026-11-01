import * as GCP from "@alchemy.run/gcp";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string | undefined, never>;
    project: Alchemy.Output<string, never>;
    location: Alchemy.Output<string, never>;
    tableName: Alchemy.Output<string, never>;
    datasetId: Alchemy.Output<string, never>;
    tableId: Alchemy.Output<string, never>;
}, NoInfer<GCP.Providers>>;
export default _default;

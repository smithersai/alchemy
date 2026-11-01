import * as Drizzle from "@alchemy.run/drizzle";
import * as GCP from "@alchemy.run/gcp";
import * as Alchemy from "alchemy";
import * as Layer from "effect/Layer";
export declare const providers: () => Layer.Layer<any, never, import("effect/FileSystem").FileSystem | import("effect/Path").Path>;
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string | undefined, never>;
    serviceName: Alchemy.Output<string, never>;
    instanceName: Alchemy.Output<string, never>;
    connectionName: Alchemy.Output<string | undefined, never>;
    databaseName: Alchemy.Output<string, never>;
    userName: Alchemy.Output<string, never>;
    passwordSecretName: Alchemy.Output<string, never>;
}, NoInfer<Alchemy.Provider<Alchemy.Random> | GCP.Providers | Drizzle.Providers | Alchemy.Stack>>;
export default _default;

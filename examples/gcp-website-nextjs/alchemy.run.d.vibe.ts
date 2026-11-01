import * as GCP from "@alchemy.run/gcp";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string | undefined, never>;
}, NoInfer<Alchemy.AlchemyContext | import("effect/FileSystem").FileSystem | import("effect/Path").Path | Alchemy.Provider<import("alchemy/Website/Server").Server> | GCP.Providers>>;
export default _default;

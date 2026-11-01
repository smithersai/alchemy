import * as Railway from "@alchemy.run/railway";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: string | Alchemy.Output<string | undefined, never>;
}, NoInfer<Alchemy.AlchemyContext | import("effect/FileSystem").FileSystem | import("effect/Path").Path | Alchemy.Provider<import("alchemy/Website/Server").Server> | Railway.Providers>>;
export default _default;

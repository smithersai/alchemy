import * as Fly from "@alchemy.run/fly";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: string | Alchemy.Output<string, never> | Alchemy.Output<string | undefined, never>;
}, NoInfer<Alchemy.AlchemyContext | import("effect/FileSystem").FileSystem | import("effect/Path").Path | Alchemy.Provider<import("alchemy/Website/Server").Server> | Fly.Providers>>;
export default _default;

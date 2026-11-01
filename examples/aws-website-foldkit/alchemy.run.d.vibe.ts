import * as AWS from "@alchemy.run/aws";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string | undefined, never> | Alchemy.Input<string>;
}, NoInfer<Alchemy.AlchemyContext | Alchemy.Provider<import("alchemy/Command/Build").Build> | Alchemy.Provider<import("alchemy/Website/Server").Server> | AWS.Providers | Alchemy.Stack | Alchemy.Stage>>;
export default _default;

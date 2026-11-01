import * as AWS from "@alchemy.run/aws";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    /** `https://<id>.cloudfront.net` deployed, `http://localhost:<port>` in dev. */
    url: Alchemy.Input<string>;
    web: Alchemy.Output<string | undefined, never> | Alchemy.Input<string>;
    docs: Alchemy.Output<string | undefined, never> | Alchemy.Input<string>;
    distributionId: Alchemy.Output<string, never>;
}, NoInfer<Alchemy.AlchemyContext | Alchemy.Provider<import("alchemy/Command/Build").Build> | Alchemy.Provider<import("alchemy/Website/Server").Server> | AWS.Providers | Alchemy.Stack | Alchemy.Stage>>;
export default _default;

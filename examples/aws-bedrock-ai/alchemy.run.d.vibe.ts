import * as AWS from "@alchemy.run/aws";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string | undefined, never>;
    streamUrl: Alchemy.Output<string, never>;
    weatherUrl: Alchemy.Output<string, never>;
}, NoInfer<AWS.Providers>>;
export default _default;

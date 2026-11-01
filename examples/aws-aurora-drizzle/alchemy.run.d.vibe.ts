import * as AWS from "@alchemy.run/aws";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string | undefined, never>;
    functionName: Alchemy.Output<string, never>;
    clusterId: Alchemy.Output<string, never>;
    writerId: Alchemy.Output<string, never>;
    vpcId: Alchemy.Output<`vpc-${string}`, never>;
}, NoInfer<AWS.Providers>>;
export default _default;

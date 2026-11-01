import * as AWS from "@alchemy.run/aws";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    invokeUrl: Alchemy.Output<string, never>;
    restApiId: Alchemy.Output<string, never>;
}, NoInfer<AWS.AWSEnvironment | AWS.Providers | Alchemy.Stack>>;
export default _default;

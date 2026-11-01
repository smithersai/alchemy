import * as AWS from "@alchemy.run/aws";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    instanceId: Alchemy.Output<`i-${string}`, never>;
    publicIpAddress: Alchemy.Output<string | undefined, never>;
    instanceUrl: Alchemy.Output<string, never>;
    enqueueExample: Alchemy.Output<string, never>;
}, NoInfer<import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | AWS.Providers | AWS.Region>>;
export default _default;

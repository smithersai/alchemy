import * as AWS from "@alchemy.run/aws";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: Alchemy.Output<string | undefined, never>;
    functionName: Alchemy.Output<string, never>;
    roleName: Alchemy.Output<string, never>;
    clusterId: Alchemy.Output<string, never>;
    schemaVersion: Alchemy.Output<string, never>;
}, NoInfer<AWS.Providers | Alchemy.Stack | import("@distilled.cloud/aws/Presign").PresignContext>>;
export default _default;

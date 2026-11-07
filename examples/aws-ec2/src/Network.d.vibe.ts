import * as AWS from "@alchemy.run/aws";
import type { Output } from "alchemy/Output";
import * as Context from "effect/Context";
import * as Layer from "effect/Layer";
export interface ExampleNetwork {
    network: AWS.EC2.Network;
    publicSubnetIds: Output<AWS.EC2.SubnetId>[];
    appSecurityGroupId: Output<AWS.EC2.SecurityGroupId>;
}
declare const Network_base: Context.ServiceClass<Network, "Network", ExampleNetwork>;
export declare class Network extends Network_base {
}
export declare const NetworkLive: Layer.Layer<Network, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | AWS.Providers | AWS.Region>;
export {};

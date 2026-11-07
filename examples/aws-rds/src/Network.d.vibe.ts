import * as AWS from "@alchemy.run/aws";
import * as Context from "effect/Context";
import * as Layer from "effect/Layer";
export interface ExampleNetwork {
    vpc: AWS.EC2.Network;
    functionSecurityGroup: AWS.EC2.SecurityGroup;
    databaseSecurityGroup: AWS.EC2.SecurityGroup;
    privateSecurityGroups: AWS.EC2.SecurityGroup[];
}
declare const Network_base: Context.ServiceClass<Network, "Network", ExampleNetwork>;
export declare class Network extends Network_base {
}
export declare const NetworkLive: Layer.Layer<Network, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | AWS.Providers | AWS.Region>;
export {};

import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
export declare const database: Effect.Effect<{
    secret: AWS.SecretsManager.Secret;
    subnetGroup: AWS.RDS.DBSubnetGroup;
    clusterParameterGroup?: AWS.RDS.DBClusterParameterGroup;
    parameterGroup?: AWS.RDS.DBParameterGroup;
    cluster: AWS.RDS.DBCluster;
    writer: AWS.RDS.DBInstance;
    readers: AWS.RDS.DBInstance[];
    instances: [AWS.RDS.DBInstance, ...AWS.RDS.DBInstance[]];
    proxy?: {
        role: AWS.IAM.Role;
        proxy: AWS.RDS.DBProxy;
        targetGroup: AWS.RDS.DBProxyTargetGroup;
        endpoint?: AWS.RDS.DBProxyEndpoint;
    };
    vpc: AWS.EC2.Vpc;
    subnetIds: import("alchemy").Output<`subnet-${string}`, never>[];
    lambdaSecurityGroup: AWS.EC2.SecurityGroup;
}, never, AWS.Providers>;

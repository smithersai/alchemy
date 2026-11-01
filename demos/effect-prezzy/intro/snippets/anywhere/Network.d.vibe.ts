import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
/** The private subnets and security group Aurora runs in (stands in for a real VPC setup). */
export declare const Private: Effect.Effect<{
    subnetIds: import("alchemy").Output<`subnet-${string}`, never>[];
    securityGroupIds: import("alchemy").Output<`sg-${string}`, never>[];
}, never, AWS.Providers>;

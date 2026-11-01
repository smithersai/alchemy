import * as Neon from "@alchemy.run/neon";
import * as Effect from "effect/Effect";
export declare const gateway: Effect.Effect<{
    FQN: string;
    LogicalId: string;
    Props: Neon.AIGatewayProps;
    projectId: import("alchemy").Output<string, any>;
    branchId: import("alchemy").Output<string, any>;
    baseUrl: import("alchemy").Output<string, any>;
    credential: Neon.Credential | undefined;
}, never, Neon.Providers>;

import * as Effect from "effect/Effect";
import { PrismaPaginationError } from "./Pagination.js";
declare const DeploymentIdentityConflict_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "DeploymentIdentityConflict";
} & Readonly<A>;
export declare class DeploymentIdentityConflict extends DeploymentIdentityConflict_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
/** Prove that a deployment belongs to an App before mutating or deleting it. */
export declare const ensureDeploymentMembership: (appId: string, deployment: {
    id: string;
    foundryVersionId: string;
}, knownLatestDeploymentId?: string | null | undefined) => Effect.Effect<undefined, DeploymentIdentityConflict | PrismaPaginationError | import("@distilled.cloud/prisma/management").GetServiceDeploymentsError, import("@distilled.cloud/prisma").PrismaOpContext>;
export {};

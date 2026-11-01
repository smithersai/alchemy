import * as Prisma from "@alchemy.run/prisma";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    projectId: Alchemy.Output<string, never>;
    branchId: Alchemy.Output<string | null, never>;
    databaseId: Alchemy.Output<string, never>;
    connectionId: Alchemy.Output<string, never>;
    appId: Alchemy.Output<string, never>;
    deploymentId: Alchemy.Output<string | undefined, never>;
    url: Alchemy.Output<string | undefined, never>;
}, NoInfer<Prisma.Providers>>;
export default _default;

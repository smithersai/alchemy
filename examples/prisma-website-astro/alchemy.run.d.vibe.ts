import * as Prisma from "@alchemy.run/prisma";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: string | Alchemy.Output<string | undefined, any> | undefined;
    staticUrl: string | Alchemy.Output<string | undefined, any> | undefined;
}, NoInfer<Alchemy.AlchemyContext | Alchemy.Provider<import("alchemy/Website/Server").Server> | Alchemy.Provider<import("@alchemy.run/prisma/Website/Artifact").WebsiteArtifact> | Prisma.Providers>>;
export default _default;

import * as Neon from "@alchemy.run/neon";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: string | Alchemy.Output<string | undefined, any> | undefined;
}, NoInfer<Alchemy.AlchemyContext | Alchemy.Provider<import("alchemy/Website/Server").Server> | Alchemy.Provider<import("@alchemy.run/neon/Website/Artifact").WebsiteArtifact> | Neon.Providers>>;
export default _default;

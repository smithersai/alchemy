import * as Neon from "@alchemy.run/neon";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: string | Alchemy.Output<string | undefined, any> | undefined;
}, NoInfer<Alchemy.AlchemyContext | import("effect/Path").Path | Alchemy.Provider<import("alchemy/Command/Build").Build> | Alchemy.Provider<import("alchemy/Command/Dev").Dev> | Alchemy.Provider<import("@alchemy.run/neon/Website/Artifact").WebsiteArtifact> | Neon.Providers>>;
export default _default;

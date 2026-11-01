import * as Neon from "@alchemy.run/neon";
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    url: string | Alchemy.Output<string | undefined, any>;
    apiUrl: Alchemy.Output<string, never>;
    authUrl: Alchemy.Output<string, never>;
    projectId: Alchemy.Output<string, never>;
    branchId: Alchemy.Output<string, never>;
    bucketName: Alchemy.Output<string, never>;
    publicBucketName: Alchemy.Output<string, never>;
    ai: {
        nativeUrl: Alchemy.Output<string, never>;
        effectUrl: Alchemy.Output<string, never>;
        gatewayUrl: Alchemy.Output<string, any>;
    } | undefined;
    forms: {
        nativeUrl: Alchemy.Output<string, never>;
        bareUrl: Alchemy.Output<string, never>;
        honoUrl: Alchemy.Output<string, never>;
        layerUrl: Alchemy.Output<string, never>;
    } | undefined;
}, NoInfer<Alchemy.AlchemyContext | Alchemy.Provider<import("alchemy/Website/Server").Server> | Alchemy.Provider<import("@alchemy.run/neon/Website/Artifact").WebsiteArtifact> | Neon.Providers>>;
export default _default;

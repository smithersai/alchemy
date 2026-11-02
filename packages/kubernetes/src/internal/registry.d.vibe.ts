import * as Effect from "effect/Effect";
import type { WorkloadImageSource } from "../ClusterAdapter.ts";
import type { ContainerRegistry } from "../Connection.ts";
export declare const makeConnectionRegistry: Effect.Effect<{
    resolve: (options: {
        id: string;
        registry: ContainerRegistry;
        source: WorkloadImageSource;
        platform: string;
        port?: number | undefined;
        isExternal?: boolean | undefined;
        bootstrap: (importPath: string) => string;
        state: Record<string, unknown> | undefined;
        session: {
            note: (message: string) => Effect.Effect<void>;
        };
    }) => Effect.Effect<{
        imageUri: string;
        codeHash: string;
        state: {
            kind: "registry";
            server: string;
            repository: string;
        };
    }, any, import("effect/FileSystem").FileSystem | import("effect/Path").Path | import("alchemy/ResourceContext").ResourceContext | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage>;
    hash: (options: {
        source: WorkloadImageSource;
        platform: string;
        port?: number | undefined;
        isExternal?: boolean | undefined;
        bootstrap: (importPath: string) => string;
    }) => Effect.Effect<string | undefined, import("alchemy/Bundle/Bundle").BundleError | import("effect/PlatformError").PlatformError, import("effect/FileSystem").FileSystem | import("effect/Path").Path>;
}, never, import("alchemy/AlchemyContext").AlchemyContext | import("@alchemy.run/docker/Docker").Docker | import("effect/Path").Path>;
/** The publisher returned by {@link makeConnectionRegistry}. */
export interface ConnectionRegistry extends Effect.Success<typeof makeConnectionRegistry> {
}

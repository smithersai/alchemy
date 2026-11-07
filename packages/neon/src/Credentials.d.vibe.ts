import { Credentials } from "@distilled.cloud/neon";
import * as Layer from "effect/Layer";
export { Credentials } from "@distilled.cloud/neon";
export declare const fromAuthProvider: () => Layer.Layer<Credentials, never, import("alchemy/Auth/Registry").AuthProviders | import("alchemy/Auth/Profile").ProfileStore>;

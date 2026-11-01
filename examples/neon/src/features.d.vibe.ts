import * as Config from "effect/Config";
import * as Effect from "effect/Effect";
export declare const features: Effect.Effect<{
    ai: {
        nativeUrl: import("alchemy").Output<string, never>;
        effectUrl: import("alchemy").Output<string, never>;
        gatewayUrl: import("alchemy").Output<string, any>;
    } | undefined;
    forms: {
        nativeUrl: import("alchemy").Output<string, never>;
        bareUrl: import("alchemy").Output<string, never>;
        honoUrl: import("alchemy").Output<string, never>;
        layerUrl: import("alchemy").Output<string, never>;
    } | undefined;
}, Config.ConfigError, import("@alchemy.run/neon").Providers>;

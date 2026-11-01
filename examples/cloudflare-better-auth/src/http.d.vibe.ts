import * as Config from "effect/Config";
import * as Layer from "effect/Layer";
import { Authentication } from "./middleware.js";
export declare const PublicLive: Layer.Layer<import("effect/http-api/HttpApiGroup").Service<"app", "public">, Config.ConfigError, never>;
export declare const PrivateLive: Layer.Layer<import("effect/http-api/HttpApiGroup").Service<"app", "private">, never, Authentication>;
export declare const HttpLive: Layer.Layer<never, Config.ConfigError, import("./auth.js").Auth | import("effect/http/HttpRouter").HttpRouter>;

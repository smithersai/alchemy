import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Plugin from "../Plugin.vibe";
import type * as WorkerdConfig from "../workerd/Config.js";
import * as LoopbackServer from "./LoopbackServer.js";
declare const Loopback_base: import("effect/Context").ServiceClass<Loopback, "cloudflare-runtime/plugin/Loopback", Plugin.PluginBuilder<{
    readonly route: (target: string, handler: LoopbackServer.RouteHandler) => Effect.Effect<WorkerdConfig.ServiceDesignator>;
}>>;
export declare class Loopback extends Loopback_base {
}
export declare const LoopbackLive: Layer.Layer<Loopback, never, LoopbackServer.LoopbackServer>;
export {};

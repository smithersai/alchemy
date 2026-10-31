import * as Loopback from "../globals/Loopback.vibe";
import type * as LoopbackServer from "../globals/LoopbackServer.js";
import type { BindingHook } from "../PluginContext.js";
export interface LoopbackProps {
    /**
     * Name of the binding to register.
     */
    readonly binding: string;
    /**
     * Name of the route to register. This must be unique within the current loopback server.
     */
    readonly name: string;
    /**
     * Handler to invoke when the route is matched.
     */
    readonly handler: LoopbackServer.RouteHandler;
}
export declare const local: ({ binding, name, handler }: LoopbackProps) => BindingHook<Loopback.Loopback>;

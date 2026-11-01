import * as Hetzner from "@alchemy.run/hetzner";
import * as Effect from "effect/Effect";
declare const Worker_base: Effect.Effect<import("effect/Pipeable").Pipeable & import("alchemy").ResourceLike<"Hetzner.Service", Hetzner.ServiceProps, {
    serverId: number;
    ipv4: string | undefined;
    port: number;
    url: string | undefined;
    unitName: string;
    code: {
        hash: string;
    };
}, Hetzner.ServiceBinding, Hetzner.Providers> & {
    bind(sid: import("alchemy").Input<string>, binding: import("alchemy").Input<Hetzner.ServiceBinding>): Effect.Effect<void>;
    bind(template: TemplateStringsArray, ...args: any[]): (binding: import("alchemy").Input<Hetzner.ServiceBinding>) => Effect.Effect<void>;
} & {
    serverId: import("alchemy").Output<number, never>;
    ipv4: import("alchemy").Output<string | undefined, never>;
    port: import("alchemy").Output<number, never>;
    url: import("alchemy").Output<string | undefined, never>;
    unitName: import("alchemy").Output<string, never>;
    code: import("alchemy/Output").ObjectExpr<{
        hash: string;
    }, never>;
} & import("alchemy").Rpc<Worker>, never, Hetzner.Providers> & import("alchemy").Named<"Worker"> & import("alchemy").PlatformIdentity<"Worker"> & (new (_: never) => import("alchemy").Named<"Worker"> & import("alchemy/Named").Tag<"Hetzner.Service">);
/**
 * Background Service: mounts the shared Volume and writes a marker file
 * that {@link Api} reads over HTTP.
 */
export default class Worker extends Worker_base {
}
export {};

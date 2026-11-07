import * as Hetzner from "@alchemy.run/hetzner";
import * as Effect from "effect/Effect";
import { HttpServerRequest } from "effect/http/HttpServerRequest";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
declare const _default: Effect.Effect<import("effect/Pipeable").Pipeable & import("alchemy").ResourceLike<"Hetzner.Service", Hetzner.ServiceProps, {
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
} & import("alchemy").Rpc<{
    fetch: Effect.Effect<HttpServerResponse.HttpServerResponse, never, HttpServerRequest | import("alchemy").RuntimeContext>;
}> & import("alchemy").Named<"Api">, never, Hetzner.Providers> & import("alchemy").Named<"Api"> & import("alchemy").PlatformIdentity<"Api">;
export default _default;

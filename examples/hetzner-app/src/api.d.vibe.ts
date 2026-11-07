import * as Hetzner from "@alchemy.run/hetzner";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import { HttpServerRequest } from "effect/http/HttpServerRequest";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
declare const Api_base: Effect.Effect<import("effect/Pipeable").Pipeable & import("alchemy").ResourceLike<"Hetzner.Service", Hetzner.ServiceProps, {
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
} & import("alchemy").Rpc<Api>, never, Hetzner.Providers> & import("alchemy").Named<"Api"> & import("alchemy").PlatformIdentity<"Api"> & (new (_: never) => {
    fetch: Effect.Effect<HttpServerResponse.HttpServerResponse, import("effect/http/HttpBody").HttpBodyError, FileSystem.FileSystem | HttpServerRequest>;
} & import("alchemy").Named<"Api"> & import("alchemy/Named").Tag<"Hetzner.Service">);
/**
 * HTTP Service: mounts the shared Volume and serves the marker file
 * {@link Worker} writes.
 */
export default class Api extends Api_base {
}
export {};

import * as Fly from "@alchemy.run/fly";
import * as Effect from "effect/Effect";
import { HttpServerRequest } from "effect/http/HttpServerRequest";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
declare const Box_base: Effect.Effect<import("effect/Pipeable").Pipeable & import("alchemy").ResourceLike<"Fly.Sprite", Fly.SpriteProps, {
    spriteId: string;
    name: string;
    url: string;
    status: Fly.SpriteStatus;
    urlAuth: Fly.UrlAuth;
    orgSlug: string | undefined;
    code: {
        hash: string;
    };
}, Fly.SpriteBinding, Fly.Providers> & {
    bind(sid: import("alchemy").Input<string>, binding: import("alchemy").Input<Fly.SpriteBinding>): Effect.Effect<void>;
    bind(template: TemplateStringsArray, ...args: any[]): (binding: import("alchemy").Input<Fly.SpriteBinding>) => Effect.Effect<void>;
} & {
    spriteId: import("alchemy").Output<string, never>;
    name: import("alchemy").Output<string, never>;
    url: import("alchemy").Output<string, never>;
    status: import("alchemy").Output<Fly.SpriteStatus, never>;
    urlAuth: import("alchemy").Output<Fly.UrlAuth, never>;
    orgSlug: import("alchemy").Output<string | undefined, never>;
    code: import("alchemy/Output").ObjectExpr<{
        hash: string;
    }, never>;
} & import("alchemy").Rpc<Box>, never, Fly.Providers> & import("alchemy").Named<"Box"> & import("alchemy").PlatformIdentity<"Box"> & (new (_: never) => {
    fetch: Effect.Effect<HttpServerResponse.HttpServerResponse, import("effect/http/HttpBody").HttpBodyError, HttpServerRequest>;
} & import("alchemy").Named<"Box"> & import("alchemy/Named").Tag<"Fly.Sprite">);
/**
 * HTTP Sprite. Yield FileSystem in init, not inside fetch.
 * Config.Redacted is written onto the Sprite at deploy time.
 */
export default class Box extends Box_base {
}
export {};

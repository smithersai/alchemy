import * as Prisma from "@alchemy.run/prisma";
import * as Effect from "effect/Effect";
import { HttpServerRequest } from "effect/http/HttpServerRequest";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
declare const Api_base: Effect.Effect<Prisma.Compute & import("alchemy").Rpc<Api>, never, Prisma.Providers> & import("alchemy").Named<"Api"> & import("alchemy").PlatformIdentity<"Api"> & (new (_: never) => {
    fetch: Effect.Effect<HttpServerResponse.HttpServerResponse, import("effect/http/HttpBody").HttpBodyError, HttpServerRequest | import("alchemy").RuntimeContext>;
} & import("alchemy").Named<"Api"> & import("alchemy/Named").Tag<"Prisma.Compute">);
export default class Api extends Api_base {
}
export {};

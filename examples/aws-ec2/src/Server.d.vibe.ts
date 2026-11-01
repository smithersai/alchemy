import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
import * as HttpServerRequest from "effect/http/HttpServerRequest";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
import { Network } from "./Network.js";
declare const Server_base: Effect.Effect<AWS.EC2.Instance & import("alchemy").Rpc<Server>, never, Network | AWS.Providers> & import("alchemy").Named<"ServerInstance"> & import("alchemy").PlatformIdentity<"ServerInstance"> & (new (_: never) => {
    fetch: Effect.Effect<HttpServerResponse.HttpServerResponse, never, HttpServerRequest.HttpServerRequest>;
} & import("alchemy").Named<"ServerInstance"> & import("alchemy/Named").Tag<"AWS.EC2.Instance">);
export default class Server extends Server_base {
}
export {};

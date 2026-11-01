import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
import { HttpServerRequest } from "effect/http/HttpServerRequest";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
declare const Ec2Box_base: Effect.Effect<AWS.EC2.Instance & import("alchemy").Rpc<Ec2Box>, never, AWS.Providers> & import("alchemy").Named<"StressEc2Box"> & import("alchemy").PlatformIdentity<"StressEc2Box"> & (new (_: never) => {
    fetch: Effect.Effect<HttpServerResponse.HttpServerResponse, import("effect/http/HttpBody").HttpBodyError, HttpServerRequest>;
} & import("alchemy").Named<"StressEc2Box"> & import("alchemy/Named").Tag<"AWS.EC2.Instance">);
/**
 * A hosted **EC2 instance**: the fourth floci compute unit in the stack
 * (after Lambda, the MicroVM, and ECS). Under `alchemy dev` the instance
 * runs as a real docker container in the emulator — its userData boots the
 * bundled program below — and floci publishes the security-group app port
 * behind a host-routing mux, so the box answers at
 * `http://<instanceId>.localhost.floci.io:<port>` on the developer's
 * machine.
 *
 * Unlike the Workers/Lambda (sidecar hot swap) and ECS (image rebuild +
 * container roll), the hosted instance reloads through the ENGINE: a
 * content edit re-plans, the provider re-uploads the bundle in place and
 * reboots the instance — same instance id, same address, new code.
 */
export default class Ec2Box extends Ec2Box_base {
}
export {};

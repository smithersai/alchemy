import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Effect from "effect/Effect";
import { HttpServerRequest } from "effect/http/HttpServerRequest";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
import { SandboxContainer } from "./SandboxContainer.ts";
declare const SandboxDO_base: Effect.Effect<Cloudflare.DurableObject<SandboxDO>, never, Cloudflare.Container.Application<SandboxContainer> | Cloudflare.Worker> & (new (_: never) => {
    fetch: Effect.Effect<HttpServerResponse.HttpServerResponse, Cloudflare.ContainerCrashedError | Cloudflare.ContainerError | Cloudflare.ContainerNotRunningError | Cloudflare.ContainerRateLimitedError | import("effect/http/HttpClientError").HttpClientError | Cloudflare.NoContainerInstanceError, HttpServerRequest | import("alchemy").RuntimeContext>;
});
/**
 * Durable Object that fronts {@link SandboxContainer} — the only way a
 * Worker reaches a Container. `EchoWorker` proxies `GET /sandbox` here.
 */
export default class SandboxDO extends SandboxDO_base {
}
export {};

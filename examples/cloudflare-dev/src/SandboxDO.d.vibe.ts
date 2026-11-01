import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Effect from "effect/Effect";
import { HttpServerResponse } from "effect/http";
import { SandboxContainer } from "./SandboxContainer.js";
declare const SandboxDO_base: Effect.Effect<Cloudflare.DurableObject<SandboxDO>, never, Cloudflare.Container.Application<SandboxContainer> | Cloudflare.Worker> & (new (_: never) => {
    fetch: Effect.Effect<HttpServerResponse.HttpServerResponse, Cloudflare.ContainerCrashedError | Cloudflare.ContainerError | Cloudflare.ContainerNotRunningError | Cloudflare.ContainerRateLimitedError | import("effect/http/HttpClientError").HttpClientError | Cloudflare.NoContainerInstanceError, import("alchemy").RuntimeContext>;
});
export default class SandboxDO extends SandboxDO_base {
}
export {};

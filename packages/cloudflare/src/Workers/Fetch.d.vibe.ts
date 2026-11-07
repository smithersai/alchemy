import * as Binding from "alchemy/Binding";
import type { RuntimeContext } from "alchemy/RuntimeContext";
import * as Effect from "effect/Effect";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import { type Worker, WorkerEnvironment } from "./Worker.ts";
/**
 * @binding
 * @product Workers
 * @category Workers & Compute
 */
export interface Fetch extends Binding.Service<Fetch, "Cloudflare.Workers.Fetch", (worker: Worker) => Effect.Effect<(request: HttpClientRequest.HttpClientRequest) => Effect.Effect<HttpClientResponse.HttpClientResponse, HttpClientError.RequestError, RuntimeContext>>> {
}
export declare const Fetch: Fetch;
export declare const FetchBinding: Layer.Layer<Fetch, never, WorkerEnvironment>;

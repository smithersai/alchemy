import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Effect from "effect/Effect";
declare const LinkRoom_base: Effect.Effect<Cloudflare.DurableObject<LinkRoom>, never, Cloudflare.Worker> & (new (_: never) => {
    record: () => Effect.Effect<void, never, import("alchemy").RuntimeContext>;
    fetch: Effect.Effect<import("effect/http/HttpServerResponse").HttpServerResponse, never, Cloudflare.DurableObjectState | import("alchemy").RuntimeContext>;
});
export default class LinkRoom extends LinkRoom_base {
}
export {};

import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Effect from "effect/Effect";
declare const LinkRoom_base: Effect.Effect<Cloudflare.DurableObject<LinkRoom>, never, Cloudflare.Worker> & (new (_: never) => {
    record: (n: number) => Effect.Effect<number, never, import("alchemy").RuntimeContext>;
    fetch: Effect.Effect<import("effect/http/HttpServerResponse").HttpServerResponse, never, Cloudflare.DurableObjectState | import("alchemy").RuntimeContext>;
});
/**
 * One instance per short link. It keeps the link's click count in
 * transactional storage and pushes every change to the dashboards watching
 * it. The WebSockets are hibernatable: the object can be evicted while they
 * stay open.
 */
export default class LinkRoom extends LinkRoom_base {
}
export {};

import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Effect from "effect/Effect";
declare const Digest_base: Effect.Effect<Cloudflare.WorkflowHandle<{
    room: string;
}, void>, never, Cloudflare.Worker> & (new (_: never) => Cloudflare.WorkflowImpl<{
    room: string;
}, void, never>);
export default class Digest extends Digest_base {
}
export {};

import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
declare const Digest_base: Effect.Effect<AWS.Lambda.DurableFunction<{
    room: string;
}, void>, never, AWS.Providers> & (new (_: never) => AWS.Lambda.DurableFunctionImpl<{
    room: string;
}, void>);
export default class Digest extends Digest_base {
}
export {};

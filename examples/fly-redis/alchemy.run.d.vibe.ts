import * as Fly from "@alchemy.run/fly";
/**
 * Fly.io Upstash Redis attached to an HTTP Service.
 *
 * Redis is not reachable from CI — the Service PING's it over 6PN
 * and exposes `{ pong: true }` at `/`.
 */
import * as Alchemy from "alchemy";
declare const _default: Alchemy.ConfiguredStack<{
    appName: Alchemy.Output<string, never>;
    redisId: Alchemy.Output<string, never>;
    redisName: Alchemy.Output<string, never>;
    apiUrl: Alchemy.Output<string | undefined, never>;
}, NoInfer<Fly.Providers>>;
export default _default;

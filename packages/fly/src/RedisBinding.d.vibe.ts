import type { Url } from "@alchemy.run/redis";
import * as Effect from "effect/Effect";
import { type Redis } from "./Redis.vibe";
export declare const makeRedisBinding: <Client>(options: {
    makeClient: (url: Url) => Client;
}) => Effect.Effect<(redis: Redis) => Effect.Effect<Client, never, never>, never, never>;

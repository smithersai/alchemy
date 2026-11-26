import * as Cloudflare from "@alchemy.run/cloudflare";
import type * as Alchemy from "alchemy";
import * as Effect from "effect/Effect";
import type * as HttpServerResponse from "effect/http/HttpServerResponse";
import { History } from "./History.ts";

// #region show
interface RoomShape {
  fetch: Effect.Effect<
    HttpServerResponse.HttpServerResponse,
    never,
    Alchemy.RuntimeContext | Cloudflare.DurableObjectState
  >;
  webSocketMessage: (
    from: Cloudflare.WebSocket,
    text: string,
  ) => Effect.Effect<void, never, Alchemy.RuntimeContext>;
}

export default class Room extends Cloudflare.DurableObject<Room, RoomShape>()("Room") {}

export const RoomLive = Room.make(
  Effect.gen(function* () {
    const state = yield* Cloudflare.DurableObjectState;
    // #region history
    const history = yield* History;
    // #endregion history

    return Effect.gen(function* () {
      return {
        // #region connect
        fetch: Effect.gen(function* () {
          const [response] = yield* Cloudflare.upgrade();
          return response;
        }),
        // #endregion connect
        // #region message
        webSocketMessage: Effect.fn(function* (_from, text) {
          // #region broadcast
          for (const socket of yield* state.getWebSockets()) {
            yield* socket.send(text);
          }
          // #endregion broadcast
          // #region send
          yield* history.append(state.id.name!, text);
          // #endregion send
        }),
        // #endregion message
      };
    });
  }),
);
// #endregion show

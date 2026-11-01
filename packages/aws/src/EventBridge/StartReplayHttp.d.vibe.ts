import * as Layer from "effect/Layer";
import { StartReplay } from "./StartReplay.vibe";
/**
 * HTTP implementation of {@link StartReplay}. At deploy time it grants
 * `events:StartReplay` on the account's replays (replay names are chosen at
 * runtime, so the grant is the `replay/*` wildcard); at runtime it calls the
 * EventBridge API with the host Function's credentials, injecting the bound
 * archive's ARN as the `EventSourceArn`. Provide this layer on the Function
 * using the binding.
 */
export declare const StartReplayHttp: Layer.Layer<StartReplay, never, never>;

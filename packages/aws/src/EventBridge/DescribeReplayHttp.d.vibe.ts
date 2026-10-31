import * as Layer from "effect/Layer";
import { DescribeReplay } from "./DescribeReplay.js";
/**
 * HTTP implementation of {@link DescribeReplay}. At deploy time it grants
 * `events:DescribeReplay` on the account's replays; at runtime it calls the
 * EventBridge API with the host Function's credentials. Provide this layer
 * on the Function using the binding.
 */
export declare const DescribeReplayHttp: Layer.Layer<DescribeReplay, never, never>;

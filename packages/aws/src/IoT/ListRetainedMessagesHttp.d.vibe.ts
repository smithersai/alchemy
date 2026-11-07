import * as Layer from "effect/Layer";
import { ListRetainedMessages } from "./ListRetainedMessages.vibe";
/**
 * HTTP implementation of the {@link ListRetainedMessages} capability —
 * grants `iot:ListRetainedMessages` on `*` and calls the IoT data-plane
 * `ListRetainedMessages` API.
 */
export declare const ListRetainedMessagesHttp: Layer.Layer<ListRetainedMessages, never, never>;

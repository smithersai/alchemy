import * as Layer from "effect/Layer";
import { GetRetainedMessage } from "./GetRetainedMessage.vibe";
/**
 * HTTP implementation of the {@link GetRetainedMessage} capability — grants
 * `iot:GetRetainedMessage` on the bound topic filter and calls the IoT
 * data-plane `GetRetainedMessage` API.
 */
export declare const GetRetainedMessageHttp: Layer.Layer<GetRetainedMessage, never, never>;

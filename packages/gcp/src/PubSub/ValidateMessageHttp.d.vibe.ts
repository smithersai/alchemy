import * as Layer from "effect/Layer";
import { ValidateMessage } from "./ValidateMessage.vibe";
/**
 * HTTP implementation of {@link ValidateMessage}.
 *
 * @layer
 * @provides GCP.PubSub.ValidateMessage
 */
export declare const ValidateMessageHttp: Layer.Layer<ValidateMessage, never, never>;

import * as Layer from "effect/Layer";
import { ListSubscriptions } from "./ListSubscriptions.vibe";
/**
 * HTTP implementation of the {@link ListSubscriptions} capability — grants
 * `iot:ListSubscriptions` on the bound client filter and calls the IoT
 * data-plane `ListSubscriptions` API.
 */
export declare const ListSubscriptionsHttp: Layer.Layer<ListSubscriptions, never, never>;

import * as Layer from "effect/Layer";
import { ListEventBuses } from "./ListEventBuses.js";
/**
 * HTTP implementation of {@link ListEventBuses}. At deploy time it grants
 * `events:ListEventBuses`; at runtime it calls the EventBridge API with the
 * host Function's credentials. Provide this layer on the Function using the
 * binding.
 */
export declare const ListEventBusesHttp: Layer.Layer<ListEventBuses, never, never>;

import * as Layer from "effect/Layer";
import { PutEvents } from "./PutEvents.vibe";
/**
 * HTTP implementation of {@link PutEvents}. At deploy time it grants
 * `events:PutEvents` on the bound bus (or the default bus, or both buses of a
 * global endpoint); at runtime it calls the EventBridge API with the host
 * Function's credentials. Provide this layer on the Function using the
 * binding.
 */
export declare const PutEventsHttp: Layer.Layer<PutEvents, never, never>;

import * as Layer from "effect/Layer";
import { ListDeliveryStreams } from "./ListDeliveryStreams.vibe";
/**
 * HTTP implementation of {@link ListDeliveryStreams}. At deploy time it
 * grants `firehose:ListDeliveryStreams` on `*` (the action does not support
 * resource-level permissions); at runtime it calls the Firehose API with the
 * host Function's credentials. Provide this layer on the Function using the
 * binding.
 */
export declare const ListDeliveryStreamsHttp: Layer.Layer<ListDeliveryStreams, never, never>;

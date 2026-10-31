import * as Layer from "effect/Layer";
import { ListRules } from "./ListRules.js";
/**
 * HTTP implementation of {@link ListRules}. At deploy time it grants
 * `events:ListRules`; at runtime it calls the EventBridge API with the host
 * Function's credentials. Provide this layer on the Function using the
 * binding.
 */
export declare const ListRulesHttp: Layer.Layer<ListRules, never, never>;

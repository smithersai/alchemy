import * as Layer from "effect/Layer";
import { EnableRule } from "./EnableRule.vibe";
/**
 * HTTP implementation of {@link EnableRule}. At deploy time it grants
 * `events:EnableRule` on the bound rule; at runtime it calls the EventBridge
 * API with the host Function's credentials. Provide this layer on the
 * Function using the binding.
 */
export declare const EnableRuleHttp: Layer.Layer<EnableRule, never, never>;

import * as Layer from "effect/Layer";
import { DescribeRule } from "./DescribeRule.js";
/**
 * HTTP implementation of {@link DescribeRule}. At deploy time it grants
 * `events:DescribeRule` on the bound rule; at runtime it calls the
 * EventBridge API with the host Function's credentials. Provide this layer on
 * the Function using the binding.
 */
export declare const DescribeRuleHttp: Layer.Layer<DescribeRule, never, never>;

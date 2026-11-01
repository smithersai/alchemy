import * as Layer from "effect/Layer";
import { GetTelemetryRule } from "./GetTelemetryRule.vibe";
/**
 * HTTP implementation of {@link GetTelemetryRule}: grants
 * `observabilityadmin:GetTelemetryRule` on the bound rule's ARN and calls
 * the Observability Admin HTTP API with the function's IAM credentials,
 * injecting the rule's name as the `RuleIdentifier`.
 */
export declare const GetTelemetryRuleHttp: Layer.Layer<GetTelemetryRule, never, never>;

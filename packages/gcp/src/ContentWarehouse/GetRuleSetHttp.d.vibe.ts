import * as Layer from "effect/Layer";
import { GetRuleSet } from "./GetRuleSet.vibe";
/**
 * HTTP implementation of {@link GetRuleSet}.
 *
 * Grants `roles/contentwarehouse.admin` on the project because
 * `contentwarehouse.ruleSets.get` is in no narrower predefined role.
 *
 * @layer
 * @provides GCP.ContentWarehouse.GetRuleSet
 */
export declare const GetRuleSetHttp: Layer.Layer<GetRuleSet, never, never>;

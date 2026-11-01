import * as Layer from "effect/Layer";
import { GetSynonymSet } from "./GetSynonymSet.js";
/**
 * HTTP implementation of {@link GetSynonymSet}.
 *
 * Grants `roles/contentwarehouse.admin` on the project because
 * `contentwarehouse.synonymSets.get` is in no narrower predefined role.
 *
 * @layer
 * @provides GCP.ContentWarehouse.GetSynonymSet
 */
export declare const GetSynonymSetHttp: Layer.Layer<GetSynonymSet, never, never>;

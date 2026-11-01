import * as Layer from "effect/Layer";
import { GetAclPolicy } from "./GetAclPolicy.js";
/**
 * HTTP implementation of {@link GetAclPolicy}.
 *
 * @layer
 * @provides GCP.Redis.GetAclPolicy
 */
export declare const GetAclPolicyHttp: Layer.Layer<GetAclPolicy, never, never>;

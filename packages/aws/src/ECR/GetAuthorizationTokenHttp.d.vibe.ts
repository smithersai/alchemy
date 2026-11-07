import * as Layer from "effect/Layer";
import { GetAuthorizationToken } from "./GetAuthorizationToken.vibe";
/**
 * HTTP implementation of {@link GetAuthorizationToken} over the ECR API.
 * Registry-level (not repository-scoped): the token authorizes Docker
 * `login` against the whole private registry, and `ecr:GetAuthorizationToken`
 * supports no resource-level permissions, so the grant is on `"*"`.
 */
export declare const GetAuthorizationTokenHttp: Layer.Layer<GetAuthorizationToken, never, never>;

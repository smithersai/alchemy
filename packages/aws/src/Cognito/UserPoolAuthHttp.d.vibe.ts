import * as Layer from "effect/Layer";
import { UserPoolAuth } from "./UserPoolAuth.vibe";
/**
 * HTTP implementation of {@link UserPoolAuth}. The token-based auth-flow
 * operations are unauthenticated (Cognito does not evaluate IAM for them),
 * so the deploy-time half only records the binding — no policy statements
 * are attached.
 */
export declare const UserPoolAuthHttp: Layer.Layer<UserPoolAuth, never, never>;

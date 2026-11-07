import * as Layer from "effect/Layer";
import { UserPoolAdmin } from "./UserPoolAdmin.vibe";
/**
 * HTTP implementation of {@link UserPoolAdmin}: grants the admin
 * `cognito-idp:*` actions on the bound pool's ARN and calls the Cognito
 * HTTP API with the function's IAM credentials.
 */
export declare const UserPoolAdminHttp: Layer.Layer<UserPoolAdmin, never, never>;

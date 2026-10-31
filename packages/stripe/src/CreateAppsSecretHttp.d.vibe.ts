import * as Layer from "effect/Layer";
import { CreateAppsSecret } from "./CreateAppsSecret.js";
/**
 * HTTP implementation of {@link CreateAppsSecret}. Provide it on the
 * Function or Worker Effect.
 *
 * @layer
 * @product Secrets
 * @provides Stripe.CreateAppsSecret
 */
export declare const CreateAppsSecretHttp: Layer.Layer<CreateAppsSecret, never, never>;

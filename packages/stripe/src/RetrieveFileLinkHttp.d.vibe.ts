import * as Layer from "effect/Layer";
import { RetrieveFileLink } from "./RetrieveFileLink.vibe";
/**
 * HTTP implementation of {@link RetrieveFileLink}. Provide it on the
 * Function or Worker Effect.
 *
 * @layer
 * @product Files
 * @provides Stripe.RetrieveFileLink
 */
export declare const RetrieveFileLinkHttp: Layer.Layer<RetrieveFileLink, never, never>;

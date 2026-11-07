import * as Layer from "effect/Layer";
import { ListAttachedLinks } from "./ListAttachedLinks.vibe";
/**
 * HTTP implementation of {@link ListAttachedLinks}: grants
 * `oam:ListAttachedLinks` on the bound sink and calls the OAM HTTP API with
 * the function's IAM credentials, injecting the sink's ARN as the
 * `SinkIdentifier`.
 */
export declare const ListAttachedLinksHttp: Layer.Layer<ListAttachedLinks, never, never>;

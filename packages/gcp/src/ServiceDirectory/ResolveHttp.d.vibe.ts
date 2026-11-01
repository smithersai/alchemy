import * as Layer from "effect/Layer";
import { Resolve } from "./Resolve.vibe";
/**
 * HTTP implementation of {@link Resolve}.
 *
 * @layer
 * @provides GCP.ServiceDirectory.Resolve
 */
export declare const ResolveHttp: Layer.Layer<Resolve, never, never>;

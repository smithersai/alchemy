import * as Layer from "effect/Layer";
import { Lookup } from "./Lookup.js";
/**
 * HTTP implementation of {@link Lookup}.
 *
 * @layer
 * @provides GCP.Datastore.Lookup
 */
export declare const LookupHttp: Layer.Layer<Lookup, never, never>;

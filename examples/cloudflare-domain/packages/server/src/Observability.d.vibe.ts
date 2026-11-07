import * as Axiom from "@alchemy.run/axiom";
import * as Layer from "effect/Layer";
/**
 * The bank's telemetry in Axiom: a traces and a logs dataset, and an ingest
 * token that may only write to them. The Worker exports its own spans and
 * logs here, and relays the app's spans here too, with this token, so it
 * never reaches a browser.
 */
export declare const Observability: Layer.Layer<never, never, Axiom.Providers>;

import * as Axiom from "@alchemy.run/axiom";
import * as Alchemy from "alchemy";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
/** Where traces and logs go. Names carry the stage, so dev, test and prod never mix. */
export declare const Observability: Effect.Effect<{
    traces: Axiom.Dataset;
    logs: Axiom.Dataset;
    ingest: Axiom.ApiToken;
}, never, Axiom.Providers | Alchemy.Stack>;
/** Export the Worker's spans and logs to Axiom. */
export declare const Telemetry: Layer.Layer<never, never, Axiom.Providers | Alchemy.Stack>;

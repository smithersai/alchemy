import * as Layer from "effect/Layer";
import { Commit } from "./Commit.vibe";
/**
 * HTTP implementation of {@link Commit}.
 *
 * @layer
 * @provides GCP.Datastore.Commit
 */
export declare const CommitHttp: Layer.Layer<Commit, never, never>;

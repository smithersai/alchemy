import * as Layer from "effect/Layer";
import { ReadDatabase } from "./ReadDatabase.vibe";
/**
 * HTTP implementation of {@link ReadDatabase} over the Firestore REST API.
 *
 * @layer
 * @provides GCP.Firestore.ReadDatabase
 * @category Firestore
 */
export declare const ReadDatabaseHttp: Layer.Layer<ReadDatabase, never, never>;

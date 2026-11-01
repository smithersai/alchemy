import * as Layer from "effect/Layer";
import { ReadWriteDatabase } from "./ReadWriteDatabase.js";
/**
 * HTTP implementation of {@link ReadWriteDatabase} over the Firestore REST API.
 *
 * @layer
 * @provides GCP.Firestore.ReadWriteDatabase
 * @category Firestore
 */
export declare const ReadWriteDatabaseHttp: Layer.Layer<ReadWriteDatabase, never, never>;

import * as Layer from "effect/Layer";
import { WriteDatabase } from "./WriteDatabase.js";
/**
 * HTTP implementation of {@link WriteDatabase} over the Firestore REST API.
 *
 * @layer
 * @provides GCP.Firestore.WriteDatabase
 * @category Firestore
 */
export declare const WriteDatabaseHttp: Layer.Layer<WriteDatabase, never, never>;

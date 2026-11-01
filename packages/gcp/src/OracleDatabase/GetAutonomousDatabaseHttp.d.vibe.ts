import * as Layer from "effect/Layer";
import { GetAutonomousDatabase } from "./GetAutonomousDatabase.vibe";
/**
 * HTTP implementation of {@link GetAutonomousDatabase}.
 *
 * @layer
 * @provides GCP.OracleDatabase.GetAutonomousDatabase
 */
export declare const GetAutonomousDatabaseHttp: Layer.Layer<GetAutonomousDatabase, never, never>;

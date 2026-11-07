import * as Layer from "effect/Layer";
import { StartAutonomousDatabase } from "./StartAutonomousDatabase.vibe";
/**
 * HTTP implementation of {@link StartAutonomousDatabase}.
 *
 * @layer
 * @provides GCP.OracleDatabase.StartAutonomousDatabase
 */
export declare const StartAutonomousDatabaseHttp: Layer.Layer<StartAutonomousDatabase, never, never>;

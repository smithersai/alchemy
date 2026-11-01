import * as Layer from "effect/Layer";
import { RestartAutonomousDatabase } from "./RestartAutonomousDatabase.vibe";
/**
 * HTTP implementation of {@link RestartAutonomousDatabase}.
 *
 * @layer
 * @provides GCP.OracleDatabase.RestartAutonomousDatabase
 */
export declare const RestartAutonomousDatabaseHttp: Layer.Layer<RestartAutonomousDatabase, never, never>;

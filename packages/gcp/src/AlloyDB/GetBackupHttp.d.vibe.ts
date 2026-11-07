import * as Layer from "effect/Layer";
import { GetBackup } from "./GetBackup.vibe";
/**
 * HTTP implementation of {@link GetBackup}.
 *
 * @layer
 * @provides GCP.AlloyDB.GetBackup
 */
export declare const GetBackupHttp: Layer.Layer<GetBackup, never, never>;

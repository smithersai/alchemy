import * as Layer from "effect/Layer";
import { Connect } from "./Connect.vibe";
/**
 * HTTP implementation of {@link Connect}: reads the password through
 * `GCP.SecretManager.ReadSecret` and connects over the Cloud Run
 * `cloudsql` socket volume.
 *
 * @layer
 * @provides GCP.SQL.Connect
 * @category SQL
 */
export declare const ConnectHttp: Layer.Layer<Connect, never, never>;

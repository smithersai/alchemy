import * as Layer from "effect/Layer";
import { ExecuteAirflowCommand } from "./ExecuteAirflowCommand.vibe";
/**
 * HTTP implementation of {@link ExecuteAirflowCommand}.
 *
 * Grants `roles/composer.editor` on the project because
 * `composer.environments.executeAirflowCommand` is in no narrower
 * predefined role and Composer environments have no resource-level IAM.
 *
 * @layer
 * @provides GCP.Composer.ExecuteAirflowCommand
 */
export declare const ExecuteAirflowCommandHttp: Layer.Layer<ExecuteAirflowCommand, never, never>;

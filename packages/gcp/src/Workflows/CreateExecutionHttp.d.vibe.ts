import * as Layer from "effect/Layer";
import { CreateExecution } from "./CreateExecution.vibe";
/**
 * HTTP implementation of {@link CreateExecution}.
 *
 * @layer
 * @provides GCP.Workflows.CreateExecution
 */
export declare const CreateExecutionHttp: Layer.Layer<CreateExecution, never, never>;

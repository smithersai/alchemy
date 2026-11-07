import * as Layer from "effect/Layer";
import { CreateTask } from "./CreateTask.vibe";
/**
 * HTTP implementation of {@link CreateTask}.
 *
 * @layer
 * @provides GCP.CloudTasks.CreateTask
 */
export declare const CreateTaskHttp: Layer.Layer<CreateTask, never, never>;

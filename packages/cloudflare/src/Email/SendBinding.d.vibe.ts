import * as Layer from "effect/Layer";
import { Worker, WorkerEnvironment } from "../Workers/Worker.ts";
import { Send } from "./Send.vibe";
export declare const SendBinding: Layer.Layer<Send, never, WorkerEnvironment | Worker<any>>;

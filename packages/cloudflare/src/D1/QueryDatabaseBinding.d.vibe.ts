import * as Layer from "effect/Layer";
import { Worker, WorkerEnvironment } from "../Workers/Worker.js";
import { QueryDatabase } from "./QueryDatabase.js";
export declare const QueryDatabaseBinding: Layer.Layer<QueryDatabase, never, WorkerEnvironment | Worker<any>>;

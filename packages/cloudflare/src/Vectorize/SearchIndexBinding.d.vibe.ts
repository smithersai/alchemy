import * as Layer from "effect/Layer";
import { Worker, WorkerEnvironment } from "../Workers/Worker.ts";
import { SearchIndex } from "./SearchIndex.vibe";
export declare const SearchIndexBinding: Layer.Layer<SearchIndex, never, WorkerEnvironment | Worker<any>>;

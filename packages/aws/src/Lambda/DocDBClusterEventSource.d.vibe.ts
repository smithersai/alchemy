import * as Layer from "effect/Layer";
import { ClusterEventSource as DocDBClusterEventSourceContract } from "../DocDB/ClusterEventSource.vibe";
import * as Lambda from "./Function.js";
export declare const isDocumentDBEvent: (event: any) => event is {
    eventSourceArn?: string;
    events: unknown[];
};
/** @binding */
export declare const DocDBClusterEventSource: Layer.Layer<DocDBClusterEventSourceContract, never, Lambda.Function>;

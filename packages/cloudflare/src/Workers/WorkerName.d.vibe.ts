import * as Effect from "effect/Effect";
export declare const createWorkerName: (id: string, name: string | undefined) => Effect.Effect<string, never, import("alchemy").ResourceContext | import("alchemy").Stack | import("alchemy").Stage>;
